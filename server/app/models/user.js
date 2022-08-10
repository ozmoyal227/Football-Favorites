class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.favLeagues = '[]'; //need totake in consider the size of the string and limitations
    }
}

module.exports = User;