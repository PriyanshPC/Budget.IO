var userdb ={

    insertData: function (user) {
        db.transaction(function (tx) {
            var sql = `INSERT INTO Users (FirstName, LastName, Email, Phone, Username, Password) VALUES (?, ?, ?, ?, ?, ?)`;
            var options = [user.FirstName, user.LastName, user.Email, user.Phone, user.Username, user.Password];
            function successCallback() {
            }
            tx.executeSql(sql, options, successCallback, errorHandler);
        });
    },

    selectUser: function (options, callback) {
        db.transaction(function (tx) {
            var sql = `SELECT * FROM Users WHERE Username=?`;
            tx.executeSql(sql, options, callback, errorHandler);
        });
    },

    selectAll: function (options, callback) {
        db.transaction(function (tx) {
            var sql = `SELECT * FROM Users`;
            tx.executeSql(sql, options, callback, errorHandler);
        });
    },

    update:function (userDetails) {
        db.transaction(function (tx) {
            var sql = `UPDATE Users SET Email=?, Phone=?, Password=? WHERE Username=?`;
            var options = [userDetails.Email, userDetails.Phone, userDetails.Password, userDetails.Username];
            function successCallback() {
            }
            tx.executeSql(sql, options, successCallback, errorHandler);
        });
    },

    delete:function (userId) {
        db.transaction(function (tx) {
            var sql = `DELETE FROM users WHERE id=?`;
            var options = [userId];

            function successCallback() {
            }

            tx.executeSql(sql, options, successCallback, errorHandler);
        });
    }
}

var expensedb ={

    insertData: function (expense) {
        db.transaction(function (tx) {
            var sql = `INSERT INTO Expenses (User, Category, SubCategory, Amount, Frequency, Type, Date, Details) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            var options = [expense.User, expense.Category, expense.SubCategory, expense.Amount, expense.Frequency, expense.Type, expense.Date, expense.Details];
            function successCallback() {
            }
            tx.executeSql(sql, options, successCallback, errorHandler);
        });
    },

    selectId: function (options, callback) {
        db.transaction(function (tx) {
            var sql = `SELECT * FROM Expenses WHERE id=?`;
            tx.executeSql(sql, options, callback, errorHandler);
        });
    },

    selectExpense: function (options, callback) {
        db.transaction(function (tx) {
            var sql = `SELECT * FROM Expenses WHERE User=?`;
            tx.executeSql(sql, options, callback, errorHandler);
        });
    },

    selectCategory: function (options, callback) {
        db.transaction(function (tx) {
            var sql = `SELECT * FROM Expenses WHERE Category=? AND User=?`;
            tx.executeSql(sql, options, callback, errorHandler);
        });
    },

    delete:function (options) {
        db.transaction(function (tx) {
            var sql = `DELETE FROM Expenses WHERE id=?`;
            function successCallback() {
                console.log('deleted')
            }

            tx.executeSql(sql, options, successCallback, errorHandler);
        });
    }
}

var incomedb ={

    insertData: function (income) {
        db.transaction(function (tx) {
            var sql = `INSERT INTO Incomes (User, Income, Frequency, Savings, Debts) VALUES (?, ?, ?, ?, ?)`;
            var options = [income.User, income.Income, income.Frequency, income.Savings, income.Debts];
            function successCallback() {
            }
            tx.executeSql(sql, options, successCallback, errorHandler);
        });
    },

    selectIncome: function (options, callback) {
        db.transaction(function (tx) {
            var sql = `SELECT * FROM Incomes WHERE User=?`;
            tx.executeSql(sql, options, callback, errorHandler);
        });
    },
    update:function (income, user) {
        db.transaction(function (tx) {
            var sql = `UPDATE Incomes SET Income=?, Frequency=?, Savings=?, Debts=? WHERE User=?`;
            var options = [income.Income, income.Frequency, income.Savings, income.Debts, user];
            function successCallback() {
            }
            tx.executeSql(sql, options, successCallback, errorHandler);
        });
    }
}