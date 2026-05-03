/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    cc.SMSPartnerItem = cc.Class({
        "extends": cc.Component,
        properties: {
            lbDesc: cc.Label,
        },

        updateItem: function (item) {

        },

        openSMSClicked: function () {
            var phoneNumber = 9029;
            var message = '';
            if (cc.sys.isNative) {
                // encodeURIComponent
                if (cc.sys.os === cc.sys.OS_IOS) {
                    cc.sys.openURL('sms:' + phoneNumber + '&body=' + message);
                } else {
                    cc.sys.openURL('sms:' + phoneNumber + '?body=' + message);
                }
            } else {
                cc.Tool.getInstance().copyToClipboard(content);
                cc.PopupController.getInstance().showMessage('Đã sao chép nội dung tin nhắn nạp SMS.');
            }
        }
    });
}).call(this);
