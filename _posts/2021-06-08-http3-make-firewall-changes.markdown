---
layout: post
title:  "HTTP/3 needs us (and other people) to make firewall changes"
date:   2021-06-08
categories: software technology networking software code
video: false
---

For obvious reasons, all of our firewalls allow outbound traffic to TCP port 443 (and port 80, and a number of others). However, some of them don't allow outbound traffic to UDP port 443, because there's been no protocol that used that. Until now. HTTP/3 uses QUIC, which runs over UDP, and so it thus generates traffic to UDP port 443. Right now any such traffic is probably not getting through.

[Link](//utcc.utoronto.ca/~cks/space/blog/sysadmin/HTTP3AndOurFirewalls)

