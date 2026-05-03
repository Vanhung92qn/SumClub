/**
 * Created by Nofear on 3/14/2019.
 */

(function () {
    var AccountController;

    AccountController = (function () {
        var instance;

        function AccountController() {
        }

        instance = void 0;

        AccountController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        AccountController.prototype.setAccountView = function (accountView) {
            return this.accountView = accountView;
        };

        AccountController.prototype.setProfileView = function (profileView) {
            return this.profileView = profileView;
        };

        AccountController.prototype.setAppSafeSatus = function (appSafeStatus) {
            return this.appSafeStatus = appSafeStatus;
        };

        AccountController.prototype.getAppSafeSatus = function () {
            return this.appSafeStatus;
        };

        AccountController.prototype.refreshAvatar = function () {
            return this.profileView.refreshAvatar();
        };

        AccountController.prototype.activeTab = function (tabName) {
            return this.accountView.activeTab(tabName);
        };

        AccountController.prototype.getAvatarImage = function (id) {
            if (this.avatarImages)
                return this.avatarImages.getAvatarImage(id);
        };

        AccountController.prototype.setAvatarImages = function (avatarImages) {
            return this.avatarImages = avatarImages;
        };

        AccountController.prototype.getIcon = function (id) {
            return this.vipIcons.getIcon(id);
        };

        AccountController.prototype.setVIPIcons = function (vipIcons) {
            return this.vipIcons = vipIcons;
        };

        AccountController.prototype.getVipAssets = function () {
            return this.vipIcons;
        };

        return AccountController;

    })();

    cc.AccountController = AccountController;

}).call(this);

