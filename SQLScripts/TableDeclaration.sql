
/* still need cleanup in database, for duplicated anime rows */
 
select title, count(title) as NumOfDups from AnimeInfo
group by title
having count(title) > 1

select * from AnimeInfo
where title = '3-gatsu no Lion'












Drop Table if exists UserInfo;
Create Table UserInfo (
	UserId smallint not null,
	Constraint PK_UserId primary key (UserId),

	UserName Nvarchar(100) not null,
	Password Nvarchar(100) not null

);




Drop Table if exists FavoriteList;
Create Table FavoriteList (
	ListId smallint not null,
	Constraint PK_ListId primary key (ListId),

	UserId smallint not null,
	ListName Nvarchar(100) not null,
	AnimeId Nvarchar(100) not null

);



















