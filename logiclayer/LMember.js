/**
 * Created by talha on 8.12.2015.
 */
var Member = require("../facade/FMember"),
    bcrypt = require("bcrypt-node");

module.exports = {
    addMember: function (member, callback) {
        bcrypt.hash(member.password, null, null, function (err, hash) {
            if (err) {
                callback(err, null);
            } else {
                member.password = hash;
                Member.addMember(member, callback);
            }
        });
    },
    authMember: function (authCredentials, callback) {
        Member.getMemberWithEmail(authCredentials.email, function (err, result) {
            var authData = {};
            if (err) {
                callback(err, null);
            } else {
                if (!(result.length > 0)) {
                    callback({
                        message: "There is no user with this email."
                    }, null);
                    return;
                }
                authData.id = result[0].id;
                authData.name = result[0].name;
                authData.surname = result[0].surname;
                authData.email = result[0].email;
                authData.admin = result[0].isAdmin();
                var valid = bcrypt.compareSync(authCredentials.password, result[0].password)
                if (valid) {
                    callback(null, authData);
                    return;
                } else {
                    callback({
                        message: "Invalid password!!"
                    }, null);
                    return;
                }
            }
        });
    },
    getMemberWithEmail: function (email, callback) {
        Member.getMemberWithEmail(email, callback);
    },
    getMember: function (id, callback) {
        Member.getMember(id, function (err, result) {
            if (err) {
                callback(err, null);
                return;
            }
            var member = result[0];
            member.getCineCard(function (err, result) {
                if (result != null && result.hasCinecard == true)
                    member.cineCard = result.cineCard;
                callback(null, member);
            });
        });
    },
    getMembers: function (callback, limit, reverse) {
        var resLimit = limit || -1;
        var resReverse = reverse || false;
        if (resLimit == -1)
            Member.getMembers(function (err, result) {
                if (err) {
                    callback(err, null);
                    return;
                }
                if (resReverse)
                    result = result.reverse();
                callback(err, result);
                return;
            });
        else {
            Member.getMembers(function (err, result) {
                if (err) {
                    callback(err, null);
                    return;
                }

                if (resReverse) {
                    result = result.reverse();
                }
                if (resLimit > result.length) {
                    resLimit = result.length;
                }
                result = result.slice(0, resLimit);
                callback(err, result);
                return;
            });
        }
    },
    updateMemberPassword: function (member, callback) {
        bcrypt.hash(member.password, null, null, function (err, hash) {
            if (err) {
                callback(err, null);
            } else {
                member.password = hash;
                Member.updateMember(member, callback);
            }
        });
    },
    updateMember: function (member, callback) {
        Member.updateMember(member, callback);
    },
    deleteMember: function (id, callback) {
        Member.deleteMember(id, callback);
    },
    addCardToMember: function (memberId,callback) {
        var cardNumber = "" + memberId;
        var pad = "0000000000000"
        cardNumber = pad.substring(0, pad.length - cardNumber.length) + cardNumber;
        var CineCard = require("./LCineCard");
        CineCard.addCineCard(cardNumber, function (err, result) {
            if(err) {
                callback(err, null);
                return;
            }
            Member.addCardToMember(memberId, cardNumber, function (err, result) {
                if(err) {
                    callback(err, result);
                    return;
                }
                callback(null, result);
            });
        });
    }
};