---
layout: post
title:  "Git as a NoSql database (sick free database)"
date:   2021-04-06
categories: code hacking programming learning cool databases sql
video: false
---

Assume use of git file system to store files!

```
# saving a document 
echo '{"id": 1, "name": "kenneth"}' > 1.json 
git add 1.json 
git commit -m "added a file" 
# reading a document 
git show master:1.json => {"id": 1, "name": "kenneth"}
```

That works, but you’re now using the file system as a database.

Git is a content-addressable file system. This means that it’s a simple key-value store.

Followed by Git Blobs, Git Trees.

[Link](//www.kenneth-truyers.net/2016/10/13/git-nosql-database/)


