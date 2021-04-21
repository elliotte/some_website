---
layout: post
title:  "Are the top websites using WebGL for fingerprinting?"
date:   2021-04-21
categories: code programming web internet data
video: false
---

e.g. Google

```
g.CU = $a(function () { var a = ''; try { var b = g.Fe('CANVAS').getContext('webgl'); b && (b.getExtension('WEBGL_debug_renderer_info'), a = b.getParameter(37446), a = a.replace(/[ :]/g, '_')) } catch (c) { } return a });
```

[Link](//jonatron.github.io/webgl-fingerprinting/)