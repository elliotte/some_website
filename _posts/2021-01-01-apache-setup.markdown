---
layout: post
title:  "Apache 2, config, setup and networking"
date:   2021-01-01
categories:  code software web programming networking hosting
vid_link: false
---

Linux and Mac based operations, (LAMP, MAMP), the A stands for apache.

You can host multiple sites etc, with this tool.  Being setup to target from Kali.

Notes: 
 - Appears best for unix, to brew uninstall apache and resintall via 'httpd'
 - need to install php, not 8, 7,4 `https://getgrav.org/blog/macos-bigsur-apache-multiple-php-versions`
 - need xcode for pythong 3.9 built from source
 - You change config via `httpd.conf` file.   Document root and /etc folders differ per OS.
 - Big Sur Apache and PHP [article](//getgrav.org/blog/macos-bigsur-apache-multiple-php-versions)
   - `echo 'export PATH="/usr/local/opt/php@7.4/sbin:$PATH"' >> /Users/johnmckay/.bash_profile`
   - `brew unlink php && brew link --overwrite --force php@7.4`

And we need to add the FilesMatch directive so that Apache will now process PHP files.
`<FilesMatch \.php$>
    SetHandler application/x-httpd-php
</FilesMatch>
`

ConfigTest: `sudo apachectl configtest`

Settings: `/usr/local/etc/httpd/httpd.conf`
DocumentRoot: `/usr/local/var/www`

Nice commands:
`sudo apachectl start
sudo apachectl stop
sudo apachectl -k restart
tail -f /usr/local/var/log/httpd/error_log
tail -f /usr/local/var/log/httpd/access_log
tail -f /usr/local/var/log/httpd/access_log
open /usr/local/etc/httpd/httpd.conf
tail-f /usr/local/var/log/httpd/ssl_request_log
`


Good article [here](//joostvanveen.com/a-28/install-and-configure-apache-2-on-mojave-with-homebrew) on installing on Mojave and homebrew.

Good github config readme [here](//gist.github.com/karlhillx/5cd68430aeb25e5e242a3e2c30f238d1)
