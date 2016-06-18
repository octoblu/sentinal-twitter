#!/usr/bin/env casperjs

var system = require('system');
var casper = require('casper').create({
  onError: (function(error){
    console.log("failure due to error: " + error)
    console.log(this.echo(casper.captureBase64('png')))
    casper.exit(1)
  })
});


var TWITTER_USERNAME = system.env.TWITTER_USERNAME;
var TWITTER_PASSWORD = system.env.TWITTER_PASSWORD;

if(!TWITTER_USERNAME || !TWITTER_PASSWORD)  {
  console.log('Missing required env: TWITTER_USERNAME or TWITTER_PASSWORD')
  this.exit(1)
}

casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36');
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
  console.log("failure")
  console.log(this.echo(casper.captureBase64('png')))
  this.exit(1)
})

casper.run();
