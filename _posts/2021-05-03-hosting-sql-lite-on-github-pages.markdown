---
layout: post
title:  "Hosting SQLite databases on Github Pages"
date:   2021-05-04
categories: web cool programming code sql github hosting awesome
video: false
---

Super neat stuff, and practically could use all the time!

Hosting a static website is much easier than a "real" server - there’s many free and reliable options (like GitHub, GitLab Pages, Netlify, etc), and it scales to basically infinity without any effort.

So I wrote a tool to be able to use a real SQL database in a statically hosted website!

So how do you use a database on a static file hoster? Firstly, SQLite (written in C) is compiled to WebAssembly. SQLite can be compiled with emscripten without any modifications, and the sql.js library is a thin JS wrapper around the wasm code.

Bonus: Since we’re already running a database in our browser, why not use our browser as a database using a virtual table called dom?

[Link](https://phiresky.github.io/blog/2021/hosting-sqlite-databases-on-github-pages/)

