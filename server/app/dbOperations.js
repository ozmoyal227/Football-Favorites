const config = require('./config/db.config');
const sql = require('mssql');


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
        (${User.id}, '${User.name}', '${User.favTeams}')`);
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

// adding team id to favTeams of user (by user id)
// const addToFavTeams = async (userId, teamId) => {
//     try {
//         let favTeams = getFavTeams(userId).then(result => result);
//         console.log('sdsdsdsdsd', favTeams);
//         favTeams.push(teamId);

//         let pool = await sql.connect(config);
//         let products = (await pool.request().query(
//             `UPDATE Users 
//                     SET favTeams = ${favToString(result)} 
//                     WHERE id = ${userId}`
//         ));
//     } catch (error) {
//         console.log(error);
//     }
// }

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
    // addToFavTeams,
    getFavTeams
};