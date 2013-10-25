var express = require('express');
var poweredBy = require('connect-powered-by');
var util = require('util');

module.exports = function() {
	// Warn of version mismatch between global "lcm" binary and local installation of Locomotive.
	if (this.version !== require('locomotive').version) {
		console.warn(util.format('version mismatch between local (%s) and global (%s) Locomotive module', require('locomotive').version, this.version));
	}

	this.set('views', __dirname + '/../../app/views');
	this.set('view engine', 'ejs');

	this.engine('ejs', require('ejs').__express);

	this.use(poweredBy('Locomotive'));
	this.use(express.logger());
	this.use(express.favicon());
	this.use(express.static(__dirname + '/../../public'));
	this.use(express.bodyParser());
	this.use(express.methodOverride());
	this.use(this.router);
}