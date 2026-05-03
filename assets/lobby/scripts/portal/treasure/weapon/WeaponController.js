/**
 * Created by Nofear on 3/14/2019.
 */

(function () {
    var WeaponController;

    WeaponController = (function () {
        var instance;

        function WeaponController() {
        }

        instance = void 0;

        WeaponController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        WeaponController.prototype.setWeaponPool = function (weaponPool) {
            return this.weaponPool = weaponPool;
        };

        WeaponController.prototype.getWeaponPool = function () {
            return this.weaponPool;
        };

        WeaponController.prototype.createNode = function (start, end) {
            var height = Math.floor(Math.random() * 40);

            var endRandom = cc.v2(end.x, end.y + height);

            return this.weaponPool.createNode(cc.v2(-440, -200), endRandom);
        };

        WeaponController.prototype.putToPool = function (node) {
            return this.weaponPool.putToPool(node);
        };

        return WeaponController;

    })();

    cc.WeaponController = WeaponController;

}).call(this);

