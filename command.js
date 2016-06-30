#!/usr/bin/env casperjs

var system  = require('system');
var helpers = require('./helpers');
var Casper  = require('casper');
var casper  = helpers.buildCasper(Casper);

var TWITTER_USERNAME = system.env.TWITTER_USERNAME;
var TWITTER_PASSWORD = system.env.TWITTER_PASSWORD;

if(!TWITTER_USERNAME || !TWITTER_PASSWORD) {
  console.log('Missing required env: TWITTER_USERNAME or TWITTER_PASSWORD')
  this.exit(1)
}

helpers.thenWithErrors(casper, function() {
  casper.click('.auth__button--twitter');
})

casper.waitForSelector("#oauth_form");

helpers.thenWithErrors(casper, function() {
  casper.fillLabels('#oauth_form', {
    'Username or email': TWITTER_USERNAME,
    'Password': TWITTER_PASSWORD
  })
  casper.click("#allow");
})

helpers.assertOnOctobluDashboard(casper);
helpers.thenWithErrors(casper, function(){
  helpers.logout(casper);
});
helpers.thenWithErrors(casper, function(){
  casper.echo("success");
  casper.exit(0);
})

casper.run();
