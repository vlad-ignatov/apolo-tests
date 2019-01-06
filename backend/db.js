const sqlite3 = require('sqlite3');

if (process.env.NODE_ENV == "development") {
    sqlite3.verbose();
}

const DB = new sqlite3.Database("./db.db");

if (process.env.LOG_SQL) {
    DB.on('profile', (sql, ms) => {
        console.log(`[SQL][${ms}ms] ${sql}`);
    });
}

function promise(method) {
    return function(...params) {
        return new Promise((resolve, reject) => {
            DB[method](...params, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    };
}

module.exports = {
    promise,
    all: promise("all"),
    get: promise("get")
}