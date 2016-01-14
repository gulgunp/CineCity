/**
 * Created by talha on 21.12.2015.
 */
var Campaign = require("../facade/FCampaign");

module.exports = {
    addCampaign: function (campaign, callback) {
        Campaign.addCampaign(campaign, callback);
    },
    getCampaign : function (cmpCode, callback) {
        Campaign.getCampaign(cmpCode, callback);
    },
    getCampaigns: function (callback) {
        Campaign.getCampaigns(callback);
    },
    updateCampaign: function (campaign, callback) {
        Campaign.updateCampaign(campaign, callback);
    },
    toggleCampaign: function (cmpCode, callback) {
        Campaign.toggleCampaign(cmpCode, callback);
    },
    deleteCampaign: function (cmpCode, callback) {
        Campaign.deleteCampaign(cmpCode, callback);
    }
}