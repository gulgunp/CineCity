/**
 * Created by talha on 21.12.2015.
 */
var oracledb    = require('oracledb'),
    dbConfig    = require('./dbconfig'),
    numRows     = 50;
oracledb.outFormat = oracledb.OBJECT;
var Campaign = require("../entity/Campaign");
var campaigns = [];

function addCampaign(campaign, callback) {
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
                p_description: campaign.description,
                p_img: campaign.img
            };
            connection.execute(
                "BEGIN SP_ADDCAMPAIGN(:p_description, :p_img); END;",
                bindvars,
                { autoCommit: true },
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        callback(err, null);
                        doRelease(connection);
                        return;
                    }
                    callback(err,result);
                    console.log("Campaign added.");
                });
        });
}

function getCampaigns(callback) {
    campaigns = [];
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
                "BEGIN SP_GETCAMPAIGNS(:cursor); END;",
                bindvars,
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    fetchRowsFromRS(connection, result.outBinds.cursor, numRows, callback);
                });
        });
}

function getCampaign(cmpCode, callback) {
    campaigns = [];
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
                p_cmp_code: cmpCode,
                cursor: {type: oracledb.CURSOR, dir: oracledb.BIND_OUT}
            };
            connection.execute(
                "BEGIN SP_GETCAMPAIGN(:p_cmp_code,:cursor); END;",
                bindvars,
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    fetchRowsFromRS(connection, result.outBinds.cursor, numRows, callback);
                });
        });
}

function updateCampaign(campaign, callback) {
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
                p_cmp_code: campaign.cmpCode,
                p_description: campaign.description,
                p_img: campaign.img,
                p_available: campaign.available
            };
            connection.execute(
                "BEGIN SP_UPDATECAMPAIGN(" +
                "       :p_cmp_code," +
                "       :p_description, " +
                "       :p_img, " +
                "       :p_available); END;",
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
                    console.log(result.rowsAffected + " Campaign updated.");
                });
        });
}

function deleteCampaign(cmpCode, callback) {
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
                p_cmp_code: cmpCode
            };
            connection.execute(
                "BEGIN SP_DELETECAMPAIGN(:p_cmp_code); END;",
                bindvars,
                { autoCommit: true },
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    callback(err,result);
                    console.log("Campaign deleted.");
                });
        });
}

function toggleCampaign(cmpCode, callback) {
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
                p_cmp_code: cmpCode
            };
            connection.execute(
                "BEGIN SP_TOGGLECAMPAIGN(:p_cmp_code); END;",
                bindvars,
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    callback(err,result);
                    console.log("Campaign toggled.");
                });
        });
}

module.exports = {
    addCampaign: addCampaign,
    getCampaigns: getCampaigns,
    getCampaign: getCampaign,
    updateCampaign: updateCampaign,
    deleteCampaign: deleteCampaign,
    toggleCampaign: toggleCampaign
}

function fetchRowsFromRS(connection, resultSet, numRows, callback) {
    resultSet.getRows( // get numRows rows
        numRows,
        function (err, rows) {
            if (err) {
                console.error(err);
                callback(err, campaigns);
                doClose(connection, resultSet); // always close the result set
            } else if (rows.length === 0) {    // no rows, or no more rows
                callback(err, campaigns);
                doClose(connection, resultSet); // always close the result set
            } else if (rows.length > 0) {
                for(var i = 0; i < rows.length; i++) {
                    var newCampaign = new Campaign(rows[i]);
                    campaigns.push(newCampaign);
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