const config = require('./config/db.config');
const sql = require('mssql');

const getUsers = async () => {
    try {
        let pool = await sql.connect(config);
        let products = pool.request().query('SELECT * from test');
        return (await products).recordset;
    } catch (error) {
        console.log(error);
    }
}

const getUserById = async (id) => {
    try {
        let pool = await sql.connect(config);
        let products = pool.request().query(`SELECT * from test WHERE id=${id}`);
        console.log('the user:', products);

        return (await products).recordset;
    } catch (error) {
        console.log(error);
    }
}

const addUser = async (User) => {
    try {
        let pool = await sql.connect(config);
        let products = pool.request().query(`INSERT INTO test VALUES
        (${User.id}, '${User.name}')`);
        return products;
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getUsers,
    addUser,
    getUserById
};