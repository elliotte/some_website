---
layout: post
title:  "VIM & target recon: terminal tools for pentest"
date:   2021-01-06
categories:  code hacking software programming bash
video: true
vid_link: //www.youtube.com/embed/l8iXMgk2nnYa
---

Sick work, tools self-built and shows filtering of data to get files/wordlists for fuzzing and intruder etc.   

`vim & awk` commands are ridiculous, see tricks.

## [assetfinder](//github.com/tomnomnom/assetfinder)

Added to `bash_profile` file (written in go, got binary)

Search and write output to a file by `assetfinder > domains.txt`

## [httprobe](//github.com/tomnomnom/httprobe)

Feed a domains file, loops for open internet ports 80/443.

Concurrency `httprobe -c 50` and timeout `httprobe -t 20000`

`cat domains | httprobe | tee hosts`

## [meg](//github.com/tomnomnom/meg)

- What is running onsystem?  Fetch many paths for many hosts, and saves output to file.
- Give it a list of hosts, and filepaths

`meg -d 1000 - v / hostsfile`

- Basic output goes to `./out` 
- Without any arguments, meg will read paths from a file called ./paths, and hosts from a file called ./hosts.

## [gf](//github.com/tomnomnom/gf)

A wrapper around grep to avoid typing common patterns.

## [html](//github.com/tomnomnom/hacks/tree/master/html-tool)
Make URLs or filenames for HTML documents on stdin and extract tag contents, attribute values, or comments.

## [gron](//github.com/tomnomnom/gron)
Make JSON greppable!
Gron makes diffing JSON easy too:
The output of gron is valid JavaScript:
`gron http://headers.jsontest.com/`

Uses, tags, attribs, comments:

`   cat urls.txt | html-tool tags title a strong
	find . -type f -name "*.html" | html-tool attribs src href
	cat urls.txt | html-tool comments`

## Tricks

- `grep '\.js'` search files ending
- `tee` command prints to screen and saves to file.
- `tee -A` = `>>`
- `grep -Hnri xx *`
- vim `%! sort-u`
- vim `%! grep -v filterOutThis `

- vim `%!awk -F':' '{print $3}'` (13min, filter by : and print 3)
	- visual block mode `ctrl-v`

- `%s/search_term/replace_item`
	- `/\.$` dollar is end of line
- `sort -u` remove duplicates

- `%!xargs`takes multiple lines of input and runs a command on each line.
	- `n1` one at a time (see min 17.22)
- `%!xargs -n1 -I{} sh -c 'echo {} | base64 -d'`

- `find . -type f | html-tool attribs src`
- `find . -type f | html-tool tags title | vim -`
- `find . -type f -name "*.html" | html-tool attribs src href`

- `proxychains nmap -sT -PO -p 80 -iR`

- Grep index output for 200 `sudo grep -Hnri "200 OK" index | vim -`
- Search recursively directory and grep file for ub.. `grep -Hnri uberinternal *`
- Search out folder: `grep -Hnri '< Server:' out/`
- Search recursive over directories: `grep -Hnri uberinternal *`

[1]

[1]: //www.youtube.com/watch?v=l8iXMgk2nnY