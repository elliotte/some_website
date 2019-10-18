---
layout: post
title:  "Some neat and useful articles on Ruby technical bits"
date:   2019-10-18
categories: code ruby programming software
vid_link: false
---

- To understand recursion, you must understand recursion :)

Cool article [1] explains it well and uses a nice factorial example

{% highlight ruby %}
def factorial(num)
  if (0..1).include?(num)
    return 1
  end
  num * factorial(num - 1)
end
{% endhighlight %}

- Dependency Injection in Ruby [2] - uses a nice Inbox example.  

"But making use of dependency injection, I was able to reuse the form".  A bit more confusing technical look at a tool for dependency injection [3]

- Defining singleton methods, explains commonly used below method and more [4].   Cool stack summary [5].  API docs [6].

{% highlight ruby %}
class A
  class << self # opens the singleton class
    def coolio; end
  end # closes singleton class
end
A.singleton_methods # => [:coolio]
{% endhighlight %}

[1]: //vaidehijoshi.github.io/blog/2014/12/14/to-understand-recursion-you-must-first-understand-recursion/
[2]: //dev.to/eligoh/dependency-injection-in-ruby-55ja
[3]: //medium.com/@Bakku1505/introduction-to-dependency-injection-in-ruby-dc238655a278
[5]: //stackoverflow.com/questions/15448982/how-does-the-objectdefine-singleton-methodsymbol-method-works-in-ruby
[4]: //codequizzes.wordpress.com/2014/05/06/ways-to-define-singleton-methods-in-ruby/
[6]: //apidock.com/ruby/Object/define_singleton_method
