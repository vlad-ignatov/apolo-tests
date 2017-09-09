const DB = require("./db");

module.exports = {
    Query: {
        projects(obj, args, context) {
            return DB.all(`SELECT * FROM projects`, args);
        },
        project(obj, args, context) {
            return DB.get(`SELECT * FROM projects WHERE id=?`, args.id);
        },
        technologies(obj, args, context) {
            return DB.all(`SELECT * FROM technologies`, args);
        },
        technology(obj, args, context) {
            return DB.get(`SELECT * FROM technologies WHERE id=?`, args.id);
        }
    }
};
