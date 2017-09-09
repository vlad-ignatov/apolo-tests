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

module.exports = {
    all(sql, ...params) {
        return new Promise((resolve, reject) => {
            DB.all(sql, ...params, (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
    },
    get(sql, ...params) {
        return new Promise((resolve, reject) => {
            DB.get(sql, ...params, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}