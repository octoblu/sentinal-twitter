#!/usr/bin/env casperjs

var system = require('system');


var TWITTER_USERNAME = system.env.TWITTER_USERNAME;
var TWITTER_PASSWORD = system.env.TWITTER_PASSWORD;

if(!TWITTER_USERNAME || !TWITTER_PASSWORD) throw new Error('Missing required env: TWITTER_USERNAME or TWITTER_PASSWORD')

var casper = require('casper').create();
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
  this.capture("success.png");
}, function(){
  this.echo("failure");
  this.capture("failure.png");
})



// casper.thenOpen('http://phantomjs.org', function() {
//     this.echo('Second Page: ' + this.getTitle());
// });

casper.run();
