# GitCooking
## Overview

Learn how to cook for yourself and save money by developing a comprehensive cooking regimine. You'll first log your diet for a week to determine what foods you regularly spend too much money on. After that, the app finds similar recipes that help you learn how to make your own meals. Share your new cooking expertise with your friends by sending them recipe recommendations and pictures of your food. A great way to learn tasty, useful recipes, save money, and interact with your friends.

## Rationale

A struggle for many college students is finding healthy cheap food. Many students spend a great deal of time at food courts and dining halls where they end up spending lots of money on food that is not very nutritious. While cooking at home is a healthier, cheaper alternative, it is often viewed by students as difficult and time consuming. For this reason we decided to design an app that attempts to encourage users to step into the kitchen and spare their wallets. 

The first part of our solution is demonstrating to our users how much money they can save by preparing their own food at home. By asking our users to create a log of what food they eat, and how much they spent on it, it becomes easy to show them through a direct price comparison how much they can actually save. 

There are many other recipe apps on the market. However, these are often recipe aggregators, that can easily overwhelm users with choices. By providing a selection of recipes that are guaranteed to be simple to prepare and require easy to obtain ingredients, we make a promise to our users that they will be able to make the recipes they find on our app. 

## Screens

```
need to add
```

Mohanad Almiski

An application I helped to create in CS 321

## Install Instructions
First clone the repository from this page:
```bash 
    git clone https://malmiski.github.com/GitCooking.git
```
Then install ```awsmobile``` from ```npm``` with the following command:
```bash
  npm install awsmobile-cli -g
```
Afterwards use awsmobile to initialize your aws-backend with the following commands
```bash
    awsmobile init
    awsmobile configure
```
This will ask you for your AWS credentials and access key. After that you can enable AWS Cognito and AWS AppSync to enable your backend:
```bash
    awsmobile user-signin enable
    awsmobile appsync enable
```
After you have done this you can then proceed to replace the schema on AWS AppSync with the one provided in the project under awsmobilejs/appSync/schema.graphql.
After this you will need to attach the resolvers for the Query, Mutatations, and Subscription as well as the custom fields in the types. All these are provided as well under awsmobilejs/resolvers/

Finally after this you can install the dependencies with a simple ```npm install```. To run the application make sure to connect a phone or have available a virtual device to install the application on. Running ```npm run android``` will install it onto your android device.
