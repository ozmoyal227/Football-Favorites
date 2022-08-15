const config = require('../config/db.config');
const sql = require('mssql');




// const createTable = async () => {
//     try {
//         let pool = await sql.connect(config);
//         // pool.request().query(
//         //     'IF OBJECT_ID(Users) IS NOT NULL DROP TABLE Users'
//         // );
//         pool.request().query('CREATE TABLE IF NOT EXISTS [football_favorites.]Users(id INT NOT NULL PRIMARY KEY,username[NVARCHAR](50) NOT NULL,favTeams[NVARCHAR](100) NOT NULL),favLeagues[NVARCHAR](100) NOT NULL)');
//     } catch (error) {
//         console.log('error in create table:', error);
//     }

// await sql.connect(config);
// const table = new sql.Table('Users');
// table.create = true;
// table.columns.add('id', sql.Int, { nullable: false, primary: true });
// table.columns.add('username', sql.VarChar(50), { nullable: false });
// table.columns.add('favLeagues', sql.VarChar(100), { nullable: false });
// }


// useful functions:

const favToString = (favArray) => {
    return JSON.stringify(favArray);
}

const favToJson = (favString) => {
    return JSON.parse(favString);
}

// db operations:

const getUsers = async () => {
    try {
        let pool = await sql.connect(config);
        let products = pool.request().query('SELECT * from Users');
        const users = (await products).recordset;
        // updating the data type of user.favLeagues back to array
        for (user of users) {
            user.favLeagues = favToJson(user.favLeagues);
        }
        return users;
    } catch (error) {
        console.log(error);
    }
}

const getUserById = async (id) => {
    try {
        let pool = await sql.connect(config);
        let products = pool.request().query(`SELECT * from Users WHERE id=${id}`);
        return (await products).recordset;
    } catch (error) {
        console.log(error);
    }
}

const addUser = async (User) => {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request()
            .input('username', sql.VarChar(50), User.username)
            .input('password', sql.Char(60), User.password)
            .input('favLeagues', sql.VarChar(100), User.favLeagues)
            .query('insert into Users(username, password, favLeagues) values(@username, @password, @favLeagues)');
        if (products)
            return true;
        else
            return false;
    } catch (error) {
        console.log(error);
    }
}


// get favLeagues of user by user id, returning array of leagues id(id as string)
const getFavLeagues = async (userId) => {
    try {
        let pool = await sql.connect(config);
        let products = (await pool.request().query(`SELECT favLeagues from Users WHERE id=${userId}`)).recordset;
        return favToJson(products[0].favLeagues);
    } catch (error) {
        console.log(error);
    }
}


// adding league id to favLeagues of user (by user id)
const addToFavLeagues = async (userId, leagueId) => {
    try {
        let favLeagues = await getFavLeagues(userId).then(result => result);
        if (favLeagues && !favLeagues.includes(leagueId))
            favLeagues.push(leagueId);
        let pool = await sql.connect(config);

        pool.request().query(
            `UPDATE Users 
            SET favLeagues = '${favToString(favLeagues)}'
            WHERE id = ${userId}`
        );
        return favLeagues;
    } catch (error) {
        console.log(error);
    }
}

// removing league id from favLeagues of user (by user id)
const rmvFromFavLeagues = async (userId, leagueId) => {
    try {
        let favLeagues = await getFavLeagues(userId).then(result => result);
        let newFavLeagues = favLeagues.filter(league => {
            return league !== leagueId;
        });
        let pool = await sql.connect(config);
        pool.request().query(
            `UPDATE Users 
            SET favLeagues = '${favToString(newFavLeagues)}'
            WHERE id = ${userId}`
        );
        return newFavLeagues;
    } catch (error) {
        console.log(error);
    }
}

// empty table data
const clearTable = async () => {
    try {
        let pool = await sql.connect(config);
        let products = pool.request().query('DELETE FROM Users');
        return;
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    getUsers,
    addUser,
    getUserById,
    clearTable,
    addToFavLeagues,
    getFavLeagues,
    rmvFromFavLeagues,
    // createTable
};