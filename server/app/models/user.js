class User {
    constructor(id, name, favTeams, favLeagues) {
        this.id = id;
        this.name = name;
        this.favTeams = favTeams; //need totake in consider the size of the string and limitations
        this.favLeagues = favLeagues; //same
    }
}

module.exports = User;