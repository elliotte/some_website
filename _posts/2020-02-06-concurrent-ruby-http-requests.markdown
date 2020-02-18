---
layout: post
title:  "How to Perform Concurrent HTTP Requests in Ruby and Rail"
date:   2020-02-06
categories: code software http kernal
video: false
---

Nice article well explained.

Ruby MRI does not support parallel CPU bound operations due to the dependency on non-thread safe C extensions.


Let’s start by describing what’s a blocking I/O. Long story short, any operation that does not directly use the CPU cycles from its thread, but instead delegates the work to external processes is a blocking I/O.

Typical examples in the context of Ruby on Rails web apps are SQL database queries, reading/writing to files, or HTTP requests.

[1]

[1]: //pawelurbanek.com/ruby-concurrent-requests


