/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var FacebookController;

    FacebookController = (function () {
        var instance;

        function FacebookController() {
        }

        instance = void 0;

        FacebookController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        FacebookController.prototype.setFacebookView = function (facebookView) {
            return this.facebookView = facebookView;
        };

        FacebookController.prototype.loginFacebookMobile = function (controller) {
            return this.facebookView.loginFacebookMobile(controller);
        };

        FacebookController.prototype.getFBUserId = function () {
            return this.fbUserId;
        };

        FacebookController.prototype.setFBUserId = function (id) {
            return this.fbUserId = id;
        };

        FacebookController.prototype.getFBEmail = function () {
            return this.fbEmail;
        };

        FacebookController.prototype.setFBEmail = function (email) {
            return this.fbEmail = email;
        };

        FacebookController.prototype.getFBAccessToken = function () {
            return this.fbToken;
        };

        FacebookController.prototype.setFBAccessToken = function (token) {
            return this.fbToken = token;
        };

        return FacebookController;

    })();
    cc.FacebookController = FacebookController;

}).call(this);

