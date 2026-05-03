/**
 * Created by Nofear on 3/14/2019.
 */

(function () {
    var ShopController;

    ShopController = (function () {
        var instance;

        function ShopController() {
        }

        instance = void 0;

        ShopController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        ShopController.prototype.setShopView = function (shopView) {
            return this.shopView = shopView;
        };

        ShopController.prototype.setShopTopupView = function (shopTopupView) {
            return this.shopTopupView = shopTopupView;
        };

        ShopController.prototype.getChargeDefault = function () {
            return this.chargeDefault;
        };

        ShopController.prototype.setChargeDefault = function (chargeDefault) {
            return this.chargeDefault = chargeDefault;
        };

        ShopController.prototype.getListAgency = function () {
            return this.listAgency;
        };

        ShopController.prototype.setListAgency = function (listAgency) {
            return this.listAgency = listAgency;
        };

        ShopController.prototype.checkNickNameAgency = function (nickName) {
            if (this.listAgency !== undefined) {
                var val = false;
                this.listAgency.forEach(function (agency) {
                    if (agency.DisplayName === nickName) {
                        val = true;
                    }
                });

                return val;
            } else {
                return false;
            }
        };

        ShopController.prototype.showShopBusy = function () {
            return this.shopView.showShopBusy();
        };

        ShopController.prototype.hideShopBusy = function () {
            return this.shopView.hideShopBusy();
        };

        ShopController.prototype.activeTab = function (tabName, displayName) {
            return this.shopView.activeTab(tabName, displayName);
        };

        ShopController.prototype.activeTopupTab = function (tabName, displayName) {
            return this.shopTopupView.activeTopupTab(tabName, displayName);
        };

        ShopController.prototype.getTotalCardBonus = function () {
            if (this.shopTopupView) {
                return this.shopTopupView.getTotalCardBonus();
            }
        };

        return ShopController;

    })();

    cc.ShopController = ShopController;

}).call(this);

