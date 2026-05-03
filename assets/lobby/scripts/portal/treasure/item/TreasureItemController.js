/**
 * Created by Nofear on 3/14/2019.
 */

(function () {
    var TreasureItemController;

    TreasureItemController = (function () {
        var instance;

        function TreasureItemController() {
        }

        instance = void 0;

        TreasureItemController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        TreasureItemController.prototype.setTreasureItemPool = function (treasureItemPool) {
            return this.treasureItemPool = treasureItemPool;
        };

        TreasureItemController.prototype.getTreasureItemPool = function () {
            return this.treasureItemPool;
        };

        TreasureItemController.prototype.createNode = function (start, itemType, amount, parent) {
            return this.treasureItemPool.createNode(start, itemType, amount, parent);
        };

        TreasureItemController.prototype.putToPool = function (node) {
            return this.treasureItemPool.putToPool(node);
        };

        TreasureItemController.prototype.createNodeDemo = function (start, itemType, amount, parent) {
            return this.treasureItemPool.createNodeDemo(start, itemType, amount, parent);
        };

        TreasureItemController.prototype.putToPoolDemo = function (node) {
            return this.treasureItemPool.putToPoolDemo(node);
        };


        return TreasureItemController;

    })();

    cc.TreasureItemController = TreasureItemController;

}).call(this);

