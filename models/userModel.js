const { getQuery } = require("./dbConnection");

class userModel{
    static table = "user";

    static async getUser(){
        const result = await getQuery("SELECT * from user",[]);
        return result;
    }
}

module.exports = {userModel};