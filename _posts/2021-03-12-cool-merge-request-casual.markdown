---
layout: post
title:  "Cool pull request - drop millions of allocations by using a linked list"
date:   2021-03-12
categories: web networking cool code ruby programming
video: false
---

Use a linked list to drop array allocations. The previous
implementation would dup arrays on every call to traverse. This patch
uses a linked list so that any block that is interested in keeping a
reference to trail can just keep the trail node around (the trail node
points at it's parents).

This approach reduces allocations from 11173668, to 2940.

[Ruby](//github.com/rubygems/rubygems/pull/1188)