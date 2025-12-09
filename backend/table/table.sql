CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','teacher','student') NOT NULL DEFAULT 'student',
   
);

create table teacher(
id int auto_increment primary key,
name varchar(100) not null,
email varchar(255) NOT null unique,
position varchar(255) not null,
phone varchar(20) not null,
img VARCHAR(255) NULL,
);

create table vacancy (
    id int auto_increment primary key,
    position varchar(255) not null,
    description text null,
    deadline varchar (100) not null,
created _at timestamp default current_timestamp
);

//Use school_management_system:
ALTER TABLE teacher ADD column img VARCHAR(255) NULL;//
