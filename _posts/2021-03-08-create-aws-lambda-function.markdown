---
layout: post
title:  "Creating AWS lambda function and import libraries"
date:   2021-03-08
categories: code web software programming aws serverless lambda
video: false
---

Easier to setup than thought, but not behind a http gateway yet.  Different to deploying a serverless app to AWS.

Generally, create a function from, e.g. sendTwilio msg.

Then import library as a 'layer'.   

Use helloworld blueprint(function) and basic permissions(layer) settings.

Locally, `mkdir nodejs` then inside directory `npm init - y` , `npm install twilio --save`

Then zip up folder and upload as a layer.  You can do for any node libary(or ruby, python etc)

[Main tutorial](//www.twilio.com/blog/aws-lambda-layers-node-js-twilio-sms)
[Other with example](//www.serverless.com/examples/aws-node-twilio-send-text-message)
[nodejs packages in lambda](//aws.amazon.com/blogs/compute/nodejs-packages-in-lambda/)