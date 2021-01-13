---
layout: post
title:  "My ISP Is Killing My Idle SSH Sessions. Yours Might Be Too."
date:   2021-01-12
categories: history economics business politics
video: false
---

Nice NAT-TCP testing [here](//github.com/AndersTrier/NAT-TCP-test)

Cool article in testing why ssh terminal drops ( im getting in azure ).  

"If the session is not already dead, the only way to gain control over my terminal again, is to send the ‘terminate connection’.""

Covers NAT, CGN, timeouts, TCP servers and resets.

Fix: "I verified that by setting `ServerAliveInterval` to 300 (5 min), my problems disappeared. We could stop now that I found a workaround, but let’s keep digging.

The TCP keepalive interval on Linux is configured by `net.ipv4.tcp_keepalive_time,` which by default is set to 2 hours (7200)."

[1]: //anderstrier.dk/2021/01/11/my-isp-is-killing-my-idle-ssh-sessions-yours-might-be-too/

