---
layout: post
title:  "Setup VM notes for hacking VM ref"
date:   2021-01-07
categories:  code software web programming networking hosting
video: false
---

Download a file:
scp -i eg-file azureuser@0.0.0.0:/home/azureuser/goldman/hosts /Users/johnmckay/Desktop/
scp -i ReconandAttack_key.pem azureuser@0.0.0.0:/home/azureuser/smartsheet/hosts /Users/johnmckay/recon/smartsheet/

- 

- `sudo apt install -y golang` or `sudo apt install golang-go`
- sudo apt install apache2
- git clone https://github.com/0xdekster/deksterecon.git
- cd deksterecon
- chmod +x install.sh then `./install.sh`

Installs httprobe / Subfinder / MassDNS / Dirsearch / Amass

>>

- sudo apt-get install nmap
- sudo apt-get install ffuf
- sudo apt-get install sslscan
- sudo apt install git

- `sudo apt install -y golang` or `sudo apt install golang-go`
  - Add the following to your .bashrc 
  `export GOROOT=/usr/lib/go
   export GOPATH=$HOME/go
   export PATH=$GOPATH/bin:$GOROOT/bin:$PATH
   source .bashrc
   `
- go get -u github.com/tomnomnom/httprobe

- git clone https://github.com/m3n0sd0n4ld/uDork
	- cd uDork
	- chmod +x uDork.sh
	- Then setup cookies

- wget github.com/cabal-club/cabal-cli/releases/download/v13.3.4/cabal-13.3.4-linux-x64.zip
- sudo tar -xzvf cabal-13.3.4-linux-x64.tar.gz
- mv cabal /usr/bin/

- wget github.com/tomnomnom/assetfinder/releases/download/v0.1.0/assetfinder-linux-amd64-0.1.0.tgz
- sudo tar -xzvf scabal-13.3.4-linux-x64.tar.gz
- mv assetfinder /usr/bin/

- wget github.com/OWASP/Amass/releases/download/v3.10.5/amass_linux_amd64.zip
- mv amass /usr/bin/
<!-- Check [AMASS latest](//github.com/OWASP/Amass/releases/tag/v3.10.5) -->

- wget github.com/projectdiscovery/subfinder/releases/download/v2.4.5/subfinder_2.4.5_linux_amd64.tar.gz
- sudo tar -xzvf subfinder_2.4.5_linux_amd64.tar.gz
- mv subfinder /usr/bin/

- wget github.com/projectdiscovery/nuclei/releases/download/v2.2.0/nuclei_2.2.0_linux_amd64.tar.gz
- sudo tar -xzvf nuclei-linux-amd64.tar.gz
- mv nuclei /usr/local/bin/

- wget github.com /ffuf/ffuf/releases/download/v1.1.0/ffuf_1.1.0_linux_amd64.tar.gz
- sudo tar -xzvf ffuf_1.1.0_linux_amd64.tar.gz
- mv ffuf /usr/bin/

- wget -c https://github.com/danielmiessler/SecLists/archive/master.zip -O SecList.zip
- unzip SecList.zip
- mv SecList /usr/bin/

- git clone https://github.com/robertdavidgraham/masscan
- sudo apt-get --assume-yes install git make gcc
- cd masscan

- load resolvedns bash

- wget gist.github.com/jhaddix/86a06c5dc309d08580a018c66354a056/archive/96f4e51d96b2203f19f6381c8c545b278eaa0837.zip

- VPN/PROXYCHAINS?
- https://openvpn.net/quick-start-guide/
- https://medium.com/cyberxerx/how-to-setup-proxychains-in-kali-linux-by-terminal-618e2039b663
- https://medium.com/@sukhdevkumar/how-to-hide-your-public-ip-address-kali-linux-e7ee282a33be
- http://www.techt

- openVPN tutorial: https://www.kalilinux.in/2019/12/own-vpn-server-on-kali-linux-openvpn-in-kali.html


<!-- Get haddix subdomin bruteforce list: -->

<!-- - 
  Change SSH locally to keep alive connections, add to `/etc/ssh/sshd_config`: 
  ClientAliveInterval 300
  ClientAliveCountMax 2` 
-->

