# pumpkin-express

1) To run the server
   node server.js 

2) SQL SCHEMAS

CREATE TABLE 'users' (
	'id'uniqueidentifier default newid(),
	'username' varchar(25) NOT NULL,
	'email' varchar(25) NOT NULL,
	'password' varchar(25) NOT NULL,
	'type' varchar(10) NOT NULL DEFAULT 'normal'
);


CREATE TABLE `images` (
  `id` varchar(50) PRIMARY KEY,
  `name` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `downlaods` int, `author` varchar(50),
  FOREIGN KEY (`author`) REFERENCES users(`id`)
);

Sample data
![Screenshot from 2021-08-15 22-51-52](https://user-images.githubusercontent.com/48689666/129486888-de7ad867-2397-45c9-802f-ef8ce75c64db.png)
