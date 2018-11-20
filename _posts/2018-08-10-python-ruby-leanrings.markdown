---
layout: post
title:  "From Ruby to Python || Virtual Environments"
date:   2018-08-10 16:24:28 +0100
categories: ruby python flask code software
vid_link: false
---

A flying summary of interesting differences I found whilst transferring to a Python & Flask based web-dev project.  

It’s not aimed as a technical assessment, but a log of frustrating confusions that hindered my learning.  Aim being apps for users ( using a MAC ).

**Virtual Environments & Shell**

*Fast track: use pyCharm IDE*

`#Gotcha_1`

*In my view annoyingly, everytime you jump into a web-project directory, you have to run a `pipenv shell` command to load a Virtual Environment.*

Off hand I don't know much on technicals, but good article I thought [here].

`#Learning_1`

I prefer using my terminal over an IDE.  Not for Python though.  Due to shell and ENV differences.  Use [pyCharm].

Forget understanding the shell sessions stuff, just learn the IDE interface as it manages all this in the background and you get to outputting apps quicker.

Otherwise, `cd` into your directory, then run `pipenv shell` in your terminal. Within this window you can then execute any `filename.py` like `ruby filename.rb`

Access `IRB` equivalent shell using `python` and stop it using `exit()`, execute your test suite using `pytest`, boot up web apps `flask run`.

`#Setup_1`

From Ruby I use Homebrew to setup my environment from my terminal.  A useful [pyenv and pipenv] setup tutorial.  

For me `Pipenv` is equivalent to `bundler` in Ruby projects.  Setup a directory and from terminal do your `pip` jazz to install dependencies. Good article here by the [code-pros].

All installed OK from memory and I fired into [Flask] to try and fire a basic `Hello World` web-app from my terminal.

Run `pip intall` for dependencies as per `bundler`.

Command line tasks still will not run.  You cannot run your `pytest` suite for exampe.

**What you are meant to do unlike in ruby projects** is load a Virtual environment via `pipenv shell`.  This loads up a terminal session connected to the directory path of a tmp app from which you can boot up your server or run your test suite commands.

Booting up a simple web-app and running tests was a normal experience. 

The driver to switch was due to limitations within the terminal shell when `debugging`.  

Using `pdb` library within Python env, the de-bug session often timed out. 

I tried to look into it but I started losing time and eventually I picked up pyCharm and regretablly I should have done this sooner :)

Fail and repeat.

{% highlight ruby %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

[pyenv and pipenv]: //medium.com/@andrewzheng_1846/getting-started-with-python-web-development-on-macos-environment-setup-using-homebrew-pyenv-and-77a7ada4cc85

[code-pros]: //robots.thoughtbot.com/how-to-manage-your-python-projects-with-pipenv

[Flask]: //flask.pocoo.org/

[pyCharm]: //www.jetbrains.com/pycharm/

[here]: //pythonrants.wordpress.com/2013/12/06/why-i-hate-virtualenv-and-pip/