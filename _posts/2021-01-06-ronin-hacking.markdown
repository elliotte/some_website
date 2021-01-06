---
layout: post
title:  "Ronin is a Ruby platform for vulnerability research and exploit development."
date:   2020-12-29
categories:  code hacking software programming ruby
video: false
---

Great ruby tool/platform... ships with irb console and a database.  Has lots of other playful bits.  Have pulled so can run in dev.

Sick work, tools self-built and shows filtering of data to get files/wordlists for fuzzing and intruder etc.   

[Ronin](//github.com/ronin-rb)
[Ronin-Web](//github.com/ronin-rb/ronin-web)
[RoninExploits](//github.com/ronin-rb/ronin-exploits#readme)

e.g.

  - Example [RoninExploits](//github.com/ronin-rb/ronin-exploits#readme) gem
  - `http_get_headers :url => 'http://example.com/'`
  - `"hello\x00\x90\a\b\t\r\n".hexdump`
  - udp_open?('4.2.2.1',53)
  - tcp_open?('example.com',80)
  - ronin net:proxy --port 53 --server 4.2.2.1 --udp --hexdump
  - ronin net:proxy --port 8080 --server google.com:80
