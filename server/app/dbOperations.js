const config = require('./config/db.config');
const sql = require('mssql');




// const createTable = async () => {
//     await sql.connect(config);
//     const table = new sql.Table('Users');
//     table.create = true;
//     table.columns.add('id', sql.Int, { nullable: false, primary: true });
//     table.columns.add('username', sql.VarChar(50), { nullable: false });
//     table.columns.add('favTeams', sql.VarChar(100), { nullable: false });
//     table.columns.add('favLeagues', sql.VarChar(100), { nullable: false });
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
        // updating the data type of user.favTeams back to array
        for (user of users) {
            user.favTeams = favToJson(user.favTeams);
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
        let products = pool.request().query(`INSERT INTO Users VALUES
        (${User.id}, '${User.name}', '${User.favTeams}', '${User.favLeagues}')`);
        return products;
    } catch (error) {
        console.log(error);
    }
}

// get favTeams of user by user id, returning array of teams id(id as string)
const getFavTeams = async (userId) => {
    try {
        let pool = await sql.connect(config);
        let products = (await pool.request().query(`SELECT favTeams from Users WHERE id=${userId}`)).recordset;
        return favToJson(products[0].favTeams);
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

// adding team id to favTeams of user (by user id)
const addToFavTeams = async (userId, teamId) => {
    try {
        let favTeams = await getFavTeams(userId).then(result => result);
        favTeams.push(teamId);
        let pool = await sql.connect(config);
        pool.request().query(
            `UPDATE Users 
            SET favTeams = '${favToString(favTeams)}'
            WHERE id = ${userId}`
        );
    } catch (error) {
        console.log(error);
    }
}

// removing team id from favTeams of user (by user id)
const rmvFromFavTeams = async (userId, teamId) => {
    try {
        let favTeams = await getFavTeams(userId).then(result => result);
        let newFavTeams = favTeams.filter(team => {
            return team !== teamId;
        });
        let pool = await sql.connect(config);
        pool.request().query(
            `UPDATE Users 
            SET favTeams = '${favToString(newFavTeams)}'
            WHERE id = ${userId}`
        );
    } catch (error) {
        console.log(error);
    }
}

// adding league id to favLeagues of user (by user id)
const addToFavLeagues = async (userId, leagueId) => {
    try {
        let favLeagues = await getFavLeagues(userId).then(result => result);
        favLeagues.push(leagueId);
        let pool = await sql.connect(config);
        pool.request().query(
            `UPDATE Users 
            SET favLeagues = '${favToString(favLeagues)}'
            WHERE id = ${userId}`
        );
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
    addToFavTeams,
    addToFavLeagues,
    getFavTeams,
    getFavLeagues,
    rmvFromFavTeams,
    rmvFromFavLeagues
    // createTable
};