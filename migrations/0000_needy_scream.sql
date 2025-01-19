CREATE TABLE `customers` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`age` int NOT NULL,
	`email` varchar(255) NOT NULL,
	`debt` int NOT NULL,
	`test` int,
	`hello` int,
	`hello2` int,
	`hello3` int,
	`hell` int,
	`ancien` int NOT NULL,
	CONSTRAINT `customers_id` PRIMARY KEY(`id`),
	CONSTRAINT `customers_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `factures` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`desc` varchar(255),
	`test` varchar(255),
	`oro` varchar(255),
	`waki` varchar(255),
	`yousef` varchar(255),
	`ikram` varchar(255),
	`debt` int NOT NULL,
	CONSTRAINT `factures_id` PRIMARY KEY(`id`)
);
