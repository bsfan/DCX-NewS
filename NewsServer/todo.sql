/*
MySQL Data Transfer
Source Host: localhost
Source Database: 
Target Host: localhost
Target Database: dcxnews
Date: 2011/6/25 21:57:10
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for allnews
-- ----------------------------
DROP TABLE IF EXISTS `allnews`;
CREATE TABLE `allnews` (
  `id` int(11) NOT NULL auto_increment,
  `ctg` int(11) NOT NULL,
  `site` varchar(50) NOT NULL,
  `title` varchar(300) default NULL,
  `filepath` int(11) default '0',
  `post_date` datetime default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

CREATE TABLE `rawurl` (
  `id` int(11) NOT NULL auto_increment,
  `ctg` int(11) NOT NULL,
  `title` varchar(300) default NULL,
  `link` varchar(300) default NULL,
  `post_date` datetime default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;


-- ----------------------------
-- Records
-- ----------------------------
INSERT INTO `allnews` VALUES ('4', '1', 'neteasy','about todays news', '','2011-06-03 06:08:10');
INSERT INTO `allnews` VALUES ('5', '2', 'sina','about todays news', '','2011-06-03 06:08:37');
INSERT INTO `allnews` VALUES ('6', '3', 'sina','test news','', '2011-06-03 06:09:18');
INSERT INTO `allnews` VALUES ('7', '3', 'neteasy','test news','', '2011-06-03 06:09:41');

-------------------------------
-- import all the site into site
-------------------------------
CREATE TABLE `site` (
  `id' int(11) NOT NULL auto_increment,
  `ctg` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `filepath` int(11) ,
  `url` varchar(100) NOT NULL,
  `post_date` datetime default NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-------------------------------
CREATE TABLE `status` (
  `id` int(11) NOT NULL auto_increment,
  `text` varchar(300) default NULL,
  `created_at` datetime default NULL,
  `user_name` varchar(200),
  `json` longtext,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;