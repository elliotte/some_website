---
layout: post
title:  "Setup VM notes for hacking VM ref"
date:   2021-01-07
categories:  code software web programming networking hosting
video: false
---

Install nmap (apt-get)

Downloaded Meg binary from Tomnomnom github ( to scan assets and download )

Download [AMASS](//github.com/OWASP/Amass) binary then `cp amass /usr/bin/`

Install [Subfinder](http://github.com/projectdiscovery/subfinder/releases/download/v2.4.5/subfinder_2.4.5_linux_amd64.tar.gz) | `sudo tar -xzvf subfinder_2.4.5_linux_amd64.tar.gz`

Install [nuclei] 
wget github.com/projectdiscovery/nuclei/releases/download/v2.2.0/nuclei_2.2.0_linux_amd64.tar.gz
tar -xzvf nuclei-linux-amd64.tar.gz
mv nuclei /usr/local/bin/

[FuFF] sudo apt-get install ffuf

sudo apt install sslscan 
The next step is to identify the SSL Ciphers that are supported by the webserver: sslscan http://target/ | grep Accep

