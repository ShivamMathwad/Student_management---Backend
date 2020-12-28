let e = require('../util.json');


exports.signup = (req,res) => {
    const { firstname, lastname, email, phone, password, dept, age, dob } = req.body;

    const check_sql = "SELECT * FROM Student WHERE email='" + email + "'";

    mysqldbconnection.query(check_sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send(e.errorOccured);
        } else {
            if (result.length > 0) {
                res.send(e.accountAlreadyExists);
            } else {
                insert();
            }
        }
    });
    function insert() {
        const sql = "INSERT INTO Student (firstname, lastname, email, phone, password, dept, age, dob) VALUES ?";

        const value = [
            [firstname, lastname, email, phone, password, dept, age, dob]
        ];

        mysqldbconnection.query(sql, [value], (err, result) => {
            if (err) {
                console.log(err);
                res.send(e.errorOccured);
            } else {
                e.addedSuccessfully.result = result;
                res.send(e.addedSuccessfully);
            }
        });   
    }
}


exports.update = (req, res) => {
    const { firstname, lastname, email, phone, dept, age, dob } = req.body;

    const check_sql = "SELECT * FROM Student WHERE email='" + email + "'";

    mysqldbconnection.query(check_sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send(e.errorOccured);
        } else {
            if (result.length <= 0) {
                res.send(e.accountDoesNotExist);
            } else {
                updateEverything();
            }
        }
    });
    function updateEverything() {
        const sql = "UPDATE Student SET firstname = ?, lastname = ?, phone = ?, dept = ?, age = ?, dob = ? WHERE email = ?";

        const values = [firstname, lastname, phone, dept, age, dob, email];

        mysqldbconnection.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                res.send(e.errorOccured);
            } else {
                e.updatedSuccessfully.result = result;
                res.send(e.updatedSuccessfully);
            }
        });
    }
}


exports.updatePassword = (req, res) => {
    const { email, password } = req.body;

    const check_sql = "SELECT * FROM Student WHERE email='" + email + "'";

    mysqldbconnection.query(check_sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send(e.errorOccured);
        } else {
            if (result.length <= 0) {
                res.send(e.accountDoesNotExist);
            } else {
                update();
            }
        }
    });
    function update() {
        const sql = "UPDATE Student SET password = ? WHERE email = ?";

        mysqldbconnection.query(sql, [password, email], (err, result) => {
            if (err) {
                console.log(err);
                res.send(e.errorOccured);
            } else {
                e.updatedSuccessfully.result = result;
                res.send(e.updatedSuccessfully);
            }
        });
    }
}


exports.updateName = (req, res) => {
    const { email, firstname, lastname } = req.body;

    const check_sql = "SELECT * FROM Student WHERE email='" + email + "'";

    mysqldbconnection.query(check_sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send(e.errorOccured);
        } else {
            if (result.length <= 0) {
                res.send(e.accountDoesNotExist);
            } else {
                update();
            }
        }
    });
    function update() {
        const sql = "UPDATE Student SET firstname = ?, lastname = ? WHERE email = ?";

        mysqldbconnection.query(sql, [firstname, lastname, email], (err, result) => {
            if (err) {
                console.log(err);
                res.send(e.errorOccured);
            } else {
                e.updatedSuccessfully.result = result;
                res.send(e.updatedSuccessfully);
            }
        });
    }
}


exports.login = (req, res) => {
    const { email, password } = req.body;

    const check_sql = "SELECT * FROM Student WHERE email = ?";

    mysqldbconnection.query(check_sql, [email], (err, result) => {
        if (err) {
            console.log(err);
            res.send(e.errorOccured);
        } else {
            if (result.length <= 0) {
                res.send(e.accountCredentialsWrong);
            } else {

                if(result[0].Password === password){
                    delete result[0].Password;
                    e.loginSuccess.result = result[0];
                    res.send(e.loginSuccess);
                } else {
                    res.send(e.accountCredentialsWrong);
                }
            }
        }
    });
}


exports.deleteStudent = (req, res) => {
    const { email, password } = req.body;

    const check_sql = "SELECT * FROM Student WHERE email = ? AND password = ?";

    mysqldbconnection.query(check_sql, [email, password], (err, result) => {
        if (err) {
            console.log(err);
            res.send(e.errorOccured);
        } else {
            if (result.length <= 0) {
                res.send(e.accountCredentialsWrong);
            } else {
                update();
            }
        }
    });
    function update() {
        const sql = "UPDATE Student SET isDeleted = true WHERE email = ?";

        mysqldbconnection.query(sql, [email], (err, result) => {
            if (err) {
                console.log(err);
                res.send(e.errorOccured);
            } else {
                res.send(e.deletedSuccessfully);
            }
        });
    }
}


exports.deactivateStudent = (req, res) => {
    const { email, password } = req.body;

    const check_sql = "SELECT * FROM Student WHERE email = ? AND password = ?";

    mysqldbconnection.query(check_sql, [email, password], (err, result) => {
        if (err) {
            console.log(err);
            res.send(e.errorOccured);
        } else {
            if (result.length <= 0) {
                res.send(e.accountCredentialsWrong);
            } else {
                update();
            }
        }
    });
    function update() {
        const sql = "UPDATE Student SET isActive = false WHERE email = ?";

        mysqldbconnection.query(sql, [email], (err, result) => {
            if (err) {
                console.log(err);
                res.send(e.errorOccured);
            } else {
                res.send(e.deactivatedSuccessfully);
            }
        });
    }
}


exports.getStudent = (req, res) => {
    if (req.body.studentID == null) {
        let total_record_count;
        const count_sql = "SELECT COUNT(*) AS total_count FROM Student";

        mysqldbconnection.query(count_sql, (err, result) => {
            if (err) {
                console.log(err);
                res.send(e.errorOccured);
            } else {
                total_record_count = result[0].total_count;
            }
        });

        const sql = "SELECT * FROM Student WHERE isDeleted = false AND isActive = true LIMIT 5";

        mysqldbconnection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                res.send(e.errorOccured);
            } else {
                e.recordsFound.total_record_count = total_record_count;
                e.recordsFound.record_limit = 5;
                e.recordsFound.result = result;
                res.send(e.recordsFound);
            }
        });
    } else {
        const studentID = req.body.studentID;
        const sql2 = "SELECT * FROM Student WHERE studentID = ? AND isDeleted = false AND isActive = true";

        mysqldbconnection.query(sql2, [studentID], (err, result) => {
            if (err) {
                console.log(err);
                res.send(e.errorOccured);
            } else {
                e.recordsFound.result = result[0];
                res.send(e.recordsFound);
            }
        });
    }   
}


exports.findEmailMatch = (req,res) => {
    const string = req.body.string;

    const sql = "SELECT * FROM Student WHERE email LIKE '%" + string + "%' ";

    mysqldbconnection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send(e.errorOccured);
        } else {
            e.recordsFound.result = result;
            res.send(e.recordsFound);
        }
    });
}


exports.findMatch = (req,res) => {
    const obj = req.body;

    const baseQuery = "SELECT * FROM Student WHERE ";
    let appendQuery = "";

    /* In case null is passed as value of one of the fields
    for (let key in obj) {
        if (obj[key] == null) {
            delete obj[key];
        }
    }
    */
    for (let key in obj) {
        appendQuery += key + " LIKE '%" + obj[key] + "%' AND ";
    }

    appendQuery = appendQuery.slice(0, appendQuery.length - 4);  //remove the last 'AND' from string

    const finalQuery = baseQuery + appendQuery;

    mysqldbconnection.query(finalQuery, (err, result) => {
        if (err) {
            console.log(err);
            res.send(e.errorOccured);
        } else {
            e.recordsFound.result = result;
            res.send(e.recordsFound);
        }
    });
}