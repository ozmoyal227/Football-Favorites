const config = require('./config/db.config');
const sql = require('mssql');

const getUsers = async () => {
    try {
        let pool = await sql.connect(config);
        let products = pool.request().query('SELECT * from Users');
        const users = (await products).recordset;
        // updating the data type of user.favTeams back to array
        for (user of users) {
            user.favTeams = JSON.parse(user.favTeams);
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
        console.log('the user:', products);

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

const dltTable = async () => {
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
    dltTable
};