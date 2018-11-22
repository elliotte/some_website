---
layout: post
title:  "Building a conversational business intelligence bot with Amazon Lex"
date:   2018-10-11 16:24:28 +0100
categories: code software alexa programming
vid_link: false
---

Data data and data - awesome article [here]

"The Amazon Lex bot then passes the intent and slot data to an AWS Lambda function, which uses the data to construct a SQL query, and execute it against an Amazon Athena database. Athena retrieves the query results from a set of CSV files stored in an Amazon S3 bucket, and returns the result set back to the Lambda function, which converts it into a natural language response"

[here]: //aws.amazon.com/blogs/machine-learning/building-a-conversational-business-intelligence-bot-with-amazon-lex/