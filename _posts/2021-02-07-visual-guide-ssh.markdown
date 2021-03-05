---
layout: post
title:  "A visual guide to SSH tunnels"
date:   2021-02-07
categories:  software archive history media newspapers cool
video: false
---

If you want to open a privileged port (ports 1-1023) to forward traffic, you'll need to run SSH with superuser privileges on the system that opens the port.

`sudo ssh -L 80:example.com:80 ssh-server`

Forwards connections to 127.0.0.1:8080 on your local system to port 80 on example.org through ssh-server.

[SSH Tunnels](//robotmoon.com/ssh-tunnels/)
