#!/usr/bin/env casperjs

var system = require('system');
var casper = require('casper').create({
  onError: (function(error){
    casper.echo("failure due to error: " + error)
    casper.exit(1)
  })
});


var TWITTER_USERNAME = system.env.TWITTER_USERNAME;
var TWITTER_PASSWORD = system.env.TWITTER_PASSWORD;

if(!TWITTER_USERNAME || !TWITTER_PASSWORD) casper.die('Missing required env: TWITTER_USERNAME or TWITTER_PASSWORD')

casper.start('https://app.octoblu.com/');

casper.waitForText("Twitter")

casper.then(function() {
  this.click('.auth__button--twitter');
})

casper.waitForText("access to use your account")

casper.then(function(){
  this.fillLabels('#oauth_form', {
    'Username or email': TWITTER_USERNAME,
    'Password': TWITTER_PASSWORD
  })
  this.click("#allow")
})

casper.waitForText("dashboard", function(){
  this.echo("success");
  this.exit()
}, function(){
  this.die("failure")
})

casper.run();
