---
layout: post
title:  "A Weird and Wonderful Trip through Ruby’s Standard Library"
date:   2019-01-07 16:24:28 +0100
categories: ruby code software dev web programming
vid_link: false
---

Oh use Net::POP3! for emails instead of Net::HTTP.

`
inbox = Net::POP3.new('pop.gmail.com')
`

`
inbox.start('your-email-here@gmail.com', 'supersecret')
`

`
inbox.each_mail { |m| puts m.pop.split("\n").grep(/Subject/) }
pop.finish
`

Article [here]

"I use Ruby primarily for writing web applications, but Ruby’s rich history as a scripting language means that there’s lots of functionality I don’t use every day, and probably lots that I don’t even know existed."

[here]: //medium.com/@mctaylorpants/a-weird-and-wonderful-trip-through-rubys-standard-library-762ddcf7a908






