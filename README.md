Callbacks
=========
A simple application for tracking calls that need to be returned. Built with AngularJS, using PHP/MySQL as a backend.

Features
--------
* Add a call, including caller name, phone, time call received, and message.
* Multiple notes per call, tracked by employee.

Todo
----
1. Admin area to review previous calls.

2. Cleaner integration with its sister app, Timeclock

License
-------
[![Creative Commons by-sa](http://i.creativecommons.org/l/by-sa/3.0/us/88x31.png)](http://creativecommons.org/licenses/by-sa/3.0/us/deed.en_US)

Callbacks by [Sean Ryan](http://designingsean.com) is licensed under a [Creative Commons Attribution-ShareAlike 3.0 United States License](http://creativecommons.org/licenses/by-sa/3.0/us/deed.en_US).

Required Libraries
------------------
jQuery 1.8.3

AngularJS 1.0.7

MomentJS 2.0.0 (not yet)

Meekro 2.1

Database Structure
------------------
User table:

	CREATE TABLE `users` (
	  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
	  `name` varchar(20) NOT NULL DEFAULT '',
	  `active` tinyint(1) NOT NULL,
	  PRIMARY KEY (`id`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8;

Calls table:

	CREATE TABLE `calls` (
	  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
	  `name` varchar(40) DEFAULT NULL,
	  `phone` varchar(10) DEFAULT NULL,
	  `message` text,
	  `received` datetime DEFAULT NULL,
	  `completed` tinyint(1) NOT NULL DEFAULT '0',
	  PRIMARY KEY (`id`)
	) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

Notes table:

	CREATE TABLE `notes` (
	  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
	  `callID` int(11) NOT NULL,
	  `userID` int(11) NOT NULL,
	  `notesDate` datetime NOT NULL,
	  `comments` text NOT NULL,
	  PRIMARY KEY (`id`)
	) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

Misc
----
db.config.php file omitted for obvious reasons. Format is below:

	DB::$user = 'DBUSER';
	DB::$password = 'DBPASS';
	DB::$dbName = 'DBNAME';