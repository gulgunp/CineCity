/**
 * Created by talha on 7.12.2015.
 */
var oracledb    = require('oracledb'),
    dbConfig    = require('./dbconfig'),
    numRows     = 50;
oracledb.outFormat = oracledb.OBJECT;
var Member      = require('../entity/Member');

var members = [];

function addMember(member, callback) {
    oracledb.getConnection(
        {
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        },
        function (err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            var bindvars = {
                p_name: member.name,
                p_surname: member.surname,
                p_email: member.email,
                p_phone: member.phone,
                p_password: member.password
            };
            connection.execute(
                "BEGIN SP_ADDMEMBER(:p_name, " +
                "       :p_surname, " +
                "       :p_email," +
                "       :p_phone," +
                "       :p_password); END;",
                bindvars,
                { autoCommit: true },
                function (err, result) {
                    if (err) {
                        callback(err,result);
                        doRelease(connection);
                        return;
                    }
                    callback(err,result);
                    console.log(result.rowsAffected + " Member inserted.");
                });
        });
};

function addCardToMember(memberId, cardNumber, callback) {

    oracledb.getConnection(
        {
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        },
        function (err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            var bindvars = {
                p_member: memberId,
                p_card: cardNumber
            };
            console.log("bindvars:" , bindvars);
            connection.execute(
                "BEGIN SP_ADDCARDTOMEMBER(:p_member, " +
                "       :p_card); END;",
                bindvars,
                { autoCommit: true },
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        callback(err,result);
                        return;
                    }
                    callback(err,result);
                    console.log("Card added to member.");
                });
        });
}

function getMemberWithEmail(email, callback) {//Movie is a function
    members = [];
    oracledb.getConnection(
        {
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        },
        function (err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            var bindvars = {
                p_email: email,
                cursor: {type: oracledb.CURSOR, dir: oracledb.BIND_OUT}
            };
            connection.execute(
                "BEGIN SP_GETMEMBERWITHEMAIL(:p_email, :cursor); END;",
                bindvars,
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        callback(err, null);
                        doRelease(connection);
                        return;
                    }
                    fetchRowsFromRS(connection, result.outBinds.cursor, numRows, callback);
                });
        });
};

function getMember(id, callback) {
    members = [];
    oracledb.getConnection(
        {
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        },
        function (err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            var bindvars = {
                p_id: id,
                cursor: {type: oracledb.CURSOR, dir: oracledb.BIND_OUT}
            };
            connection.execute(
                "BEGIN SP_GETMEMBER(:p_id, :cursor); END;",
                bindvars,
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        callback(err, null);
                        doRelease(connection);
                        return;
                    }
                    fetchRowsFromRS(connection, result.outBinds.cursor, numRows, callback);
                });
        });
}

function deleteMember(id, callback) {
    oracledb.getConnection(
        {
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        },
        function (err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            var bindvars = {
                p_id: id
            };

            connection.execute(
                "BEGIN SP_DELETEMEMBER(:p_id); END;",
                bindvars,
                { autoCommit: true },
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        callback(err,result);
                        return;
                    }
                    callback(err,result);
                    console.log(JSON.stringify(result) + " Member deleted.");
                });
        });
};

function updateMember(member, callback) {
    oracledb.getConnection(
        {
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        },
        function (err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            var bindvars = {
                p_id: member.id,
                p_name: member.name,
                p_surname: member.surname,
                p_email: member.email,
                p_phone: member.phone,
                p_password: member.password,
                p_cine_card: member.cineCardId == -1 ? null : member.cineCardId,
                p_admin: member.admin
            };
            connection.execute(
                "BEGIN SP_UPDATEMEMBER(" +
                "       :p_id," +
                "       :p_name, " +
                "       :p_surname, " +
                "       :p_email," +
                "       :p_phone," +
                "       :p_password," +
                "       :p_cine_card," +
                "       :p_admin); END;",
                bindvars,
                { autoCommit: true },
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        callback(err,result);
                        return;
                    }
                    callback(err,result);
                    console.log("("+ member.id +")Member updated.");
                });
        });
}


var getMembers = function (callback) {
    members = [];
    oracledb.getConnection(
        {
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        },
        function (err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            var bindvars = {
                cursor: {type: oracledb.CURSOR, dir: oracledb.BIND_OUT}
            };
            connection.execute(
                "BEGIN SP_GETMEMBERS(:cursor); END;",
                bindvars,
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    console.log("result", result);
                    fetchRowsFromRS(connection, result.outBinds.cursor, numRows, callback);
                });
        });
};

module.exports = {
    getMember: getMember,
    getMembers: getMembers,
    addMember: addMember,
    getMemberWithEmail: getMemberWithEmail,
    deleteMember: deleteMember,
    updateMember: updateMember,
    addCardToMember: addCardToMember
};

function fetchRowsFromRS(connection, resultSet, numRows, callback) {
    resultSet.getRows( // get numRows rows
        numRows,
        function (err, rows) {
            if (err) {
                console.error(err);
                callback(err, members);
                doClose(connection, resultSet); // always close the result set
            } else if (rows.length === 0) {    // no rows, or no more rows
                callback(err, members);
                doClose(connection, resultSet); // always close the result set
            } else if (rows.length > 0) {
                for(var i = 0; i < rows.length; i++) {
                    var newMember = new Member(rows[i]);
                    members.push(newMember);
                }
                fetchRowsFromRS(connection, resultSet, numRows, callback);
            }
        });
}

function doRelease(connection) {
    connection.release(
        function (err) {
            if (err) {
                console.error(err.message);
            }
        });
}

function doClose(connection, resultSet) {
    resultSet.close(
        function (err) {
            if (err) {
                console.error(err.message);
            }
            doRelease(connection);
        });
}
