/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var BannerController;

    BannerController = (function () {
        var instance;

        function BannerController() {

        }

        instance = void 0;

        BannerController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        BannerController.prototype.setBannerView = function (bannerView) {
            return this.bannerView = bannerView;
        };

        BannerController.prototype.switchPage = function () {
            return this.bannerView.switchPage();
        };

        return BannerController;

    })();

    cc.BannerController = BannerController;

}).call(this);

