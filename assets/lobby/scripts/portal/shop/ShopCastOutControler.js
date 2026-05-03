 (function () {
    var ShopCastOutControler;
        ShopCastOutControler = (function () {
        var instance;
        function ShopCastOutControler() {
        }
        instance = void 0;
        
        ShopCastOutControler.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };
        ShopCastOutControler.prototype.setShopCastOutView = function (shopCastOutView) {
            return this.shopCastOutView = shopCastOutView;
        };
        ShopCastOutControler.prototype.activeTopupTab = function (tabName, displayName) {
            return this.shopCastOutView.activeTopupTab(tabName, displayName);
        };
        return ShopCastOutControler;
    })();

    cc.ShopCastOutControler = ShopCastOutControler;

}).call(this);

