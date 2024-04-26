var db;

function errorHandler(error) {
    console.error("SQL error: " + error.message );
}

var DB = {
    createDatabase: function () {
        var shortName = "Budget-DB";
        var version = "1.0";
        var displayName = "DB for Budget.io";
        var dbSize = 5 * 1024 * 1024;

        function dbCreateSuccess() {
            console.info("Success: Database created successfully");
        }
        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);
    },

    createTables: function () {
        db.transaction(function (tx) {
            var createUserTable = `CREATE TABLE IF NOT EXISTS Users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                FirstName VARCHAR(100),
                LastName VARCHAR(100),
                Email VARCHAR(100),
                Phone VARCHAR(15),
                Username VARCHAR(50),
                Password VARCHAR(50)
            );`;
            var createExpenseTable = `CREATE TABLE IF NOT EXISTS Expenses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                User VARCHAR(50),
                Category VARCHAR(100),
                SubCategory VARCHAR(100),
                Amount DOUBLE(10),
                Frequency VARCHAR(50),
                Type VARCHAR(50),
                Date VARCHAR(50),
                Details TEXT
            );`;
            var createIncomesTable = `CREATE TABLE IF NOT EXISTS Incomes (
                User VARCHAR(50),
                Income DOUBLE(10),
                Frequency VARCHAR(100),
                Savings DOUBLE(10),
                Debts DOUBLE(50)
            );`;
            // var dropTable = `DROP TABLE Expenses`;
            tx.executeSql(createUserTable, [], null, errorHandler);
            tx.executeSql(createExpenseTable, [], null, errorHandler);
            tx.executeSql(createIncomesTable, [], null, errorHandler);
            // tx.executeSql(dropTable, [], null, errorHandler);

        });
    },

};