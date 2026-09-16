#!/usr/bin/env ruby
# Fetches the title and description of every link in _posts and saves them to
# _data/link_meta.json, which the post layout uses to show link previews.
#
#   ruby scripts/fetch_link_meta.rb           # only fetch links not seen before
#   ruby scripts/fetch_link_meta.rb --retry   # also retry links that failed last time
#
# Standard library only. Re-run after adding posts, then commit _data/link_meta.json.

require "json"
require "net/http"
require "uri"
require "cgi"

ROOT = File.expand_path("..", __dir__)
OUT = File.join(ROOT, "_data", "link_meta.json")
THREADS = 16
URL_RE = %r{(?:https?:)?//[\w-]+(?:\.[\w-]+)+[^\s)<>"'\]]*}i
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36"
SKIP = /youtube\.com\/embed|\.(png|jpe?g|gif|svg|pdf|mp3|mp4|zip)(\?|$)/i

retry_failed = ARGV.include?("--retry")
cache = File.exist?(OUT) ? JSON.parse(File.read(OUT)) : {}

# post key => raw URLs exactly as written in the markdown
posts = Dir[File.join(ROOT, "_posts", "*")].sort.to_h do |path|
  body = File.read(path).sub(/\A---.*?---/m, "")
  urls = body.scan(URL_RE).map { |u| u.sub(/[.,;:!?]+\z/, "") }.reject { |u| u =~ SKIP }.uniq
  [File.basename(path, ".*"), urls]
end

known = {}
cache.each_value { |links| links.each { |u, m| known[u] = m } }
todo = posts.values.flatten.uniq.reject { |u| known.key?(u) && (known[u] || !retry_failed) }
puts "#{posts.values.flatten.uniq.size} links, fetching #{todo.size}"

def fetch(url, limit = 5)
  uri = URI(url.start_with?("//") ? "https:#{url}" : url)
  limit.times do
    res = Net::HTTP.start(uri.host, uri.port, use_ssl: uri.scheme == "https",
                          open_timeout: 6, read_timeout: 8) do |http|
      req = Net::HTTP::Get.new(uri)
      req["User-Agent"] = UA
      req["Accept"] = "text/html"
      http.request(req) do |r|
        next unless r.is_a?(Net::HTTPSuccess)
        buf = +""
        r.read_body { |chunk| buf << chunk; break if buf.bytesize > 400_000 }
        r.instance_variable_set(:@partial, buf)
      end
    end
    if res.is_a?(Net::HTTPRedirection) && res["location"]
      uri = URI.join(uri, res["location"])
      next
    end
    return nil unless res.is_a?(Net::HTTPSuccess) && res["content-type"].to_s.include?("html")
    return res.instance_variable_get(:@partial)
  end
  nil
rescue StandardError, Timeout::Error
  nil
end

def meta(html, *names)
  names.each do |n|
    tag = html[/<meta[^>]+(?:property|name)=["']#{Regexp.escape(n)}["'][^>]*>/i] or next
    val = tag[/content=["']([^"']*)["']/i, 1]
    return val unless val.to_s.strip.empty?
  end
  nil
end

def clean(s, max)
  return nil if s.nil?
  s = CGI.unescapeHTML(s.dup.force_encoding("UTF-8").scrub("")).gsub(/\s+/, " ").strip
  return nil if s.empty?
  s.length > max ? s[0, max].sub(/\s+\S*\z/, "") + "…" : s
end

queue = Queue.new
todo.each { |u| queue << u }
done = 0
lock = Mutex.new

Array.new(THREADS) do
  Thread.new do
    while (url = (queue.pop(true) rescue nil))
      html = fetch(url)
      m = if html
        title = clean(meta(html, "og:title", "twitter:title") || html[%r{<title[^>]*>(.*?)</title>}im, 1], 120)
        desc = clean(meta(html, "og:description", "twitter:description", "description"), 220)
        { "title" => title, "description" => desc }.compact
      end
      m = nil if m && m.empty?
      lock.synchronize do
        known[url] = m
        done += 1
        print "\r#{done}/#{todo.size}" if (done % 10).zero? || done == todo.size
      end
    end
  end
end.each(&:join)
puts

out = posts.to_h { |key, urls| [key, urls.to_h { |u| [u, known[u]] }] }
           .reject { |_, links| links.empty? }
File.write(OUT, JSON.pretty_generate(out) + "\n")
found = out.values.flat_map(&:values).count { |m| m && m["description"] }
puts "Wrote #{OUT} — #{found} links have descriptions"
