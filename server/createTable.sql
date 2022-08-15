
CREATE TABLE Users
(
    id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    username [NVARCHAR](50) NOT NULL,
    password [CHAR](60) NOT NULL,
    favLeagues [NVARCHAR](max) NOT NULL

);
