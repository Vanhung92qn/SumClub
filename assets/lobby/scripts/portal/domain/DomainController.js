/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var DomainController;

    DomainController = (function () {
        var instance;

        function DomainController() {

        }

        instance = void 0;

        DomainController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        DomainController.prototype.setDomainView = function (domainView) {
            return this.domainView = domainView;
        };

        DomainController.prototype.checkErrorDomain = function () {
            return this.domainView.checkErrorDomain();
        };

        return DomainController;

    })();

    cc.DomainController = DomainController;

}).call(this);

