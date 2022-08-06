class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.favTeams = []; //need totake in consider the size of the string and limitations
        this.favLeagues = []; //same
    }
}

module.exports = User;