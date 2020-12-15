---
layout: post
title:  "Sockets in your shell - very cool!"
date:   2020-12-10
categories: code programming bash
video: false
---

Bash supports tcp and udp connections out of the box.

We can use exec to create a connection we can read and write to with <>, and create a super simple curl:

`
exec 3<>/dev/tcp/"$1"/80
echo -e "GET / HTTP/1.1\n" >&3
cat <&3
`

[1]

[1]: //who23.github.io/2020/12/03/sockets-in-your-shell.html


