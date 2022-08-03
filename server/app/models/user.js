class User {
    constructor(id, name, favTeams) {
        this.id = id;
        this.name = name;
        this.favTeams = favTeams; //need totake in consider the size of the string and limitations
    }
}

module.exports = User;