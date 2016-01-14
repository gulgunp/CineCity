/**
 * Created by talha on 21.12.2015.
 */
var Campaign = function (obj) {
    this.cmpCode = obj.CMP_CODE || obj.cmp_code || -1;
    this.description = obj.description || obj.DESCRIPTION;
    this.img = obj.img || obj.IMG;
    this.available = obj.available || obj.AVAILABLE || 0;
}

module.exports = Campaign;