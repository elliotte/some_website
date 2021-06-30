---
layout: post
title:  "Lets code a TCP/IP stack, 1: Ethernet & ARP"
date:   2021-06-08
categories: software technology networking software code
video: false
---

The core specification, however, is seemingly compact1 - the important parts being TCP header parsing, the state machine, congestion control and retransmission timeout computation.

The most common layer 2 and layer 3 protocols, Ethernet and IP respectively, pale in comparison to TCP’s complexity. In this blog series, we will implement a minimal userspace TCP/IP stack for Linux.

The purpose of these posts and the resulting software is purely educational - to learn network and system programming at a deeper level

[Link](//www.saminiir.com/lets-code-tcp-ip-stack-1-ethernet-arp/)

