CREATE TABLE `user` (
  `id` int(5) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `rule` int(1) DEFAULT '0',
  `nick` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `phone` char(13) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;