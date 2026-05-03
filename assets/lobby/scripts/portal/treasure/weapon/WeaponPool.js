/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.WeaponPool = cc.Class({
        "extends": cc.Component,
        properties: {
            prefab: cc.Prefab,
        },

        onLoad: function () {
            cc.WeaponController.getInstance().setWeaponPool(this);
            this.createNodePool();
        },

        createNodePool: function () {
            this.nodePool = new cc.NodePool();
            let initCount = 5;
            for (let i = 0; i < initCount; ++i) {
                let node = cc.instantiate(this.prefab);
                this.nodePool.put(node);
            }
        },

        putToPool: function (node) {
            this.nodePool.put(node);
        },

        clearPool: function () {
            if (this.nodePool)
                this.nodePool.clear();

        },

        createNode: function (start, end) {
            let node = null;
            if (this.nodePool.size() > 0) {
                node = this.nodePool.get();
            } else {
                node = cc.instantiate(this.prefab);
            }

            node.parent = this.node;
            node.setPosition(start);

            //delay -> play animation
            var self = this;

            // node.getComponent(cc.WeaponItem).playFx();
            node.getComponent(cc.WeaponItem).moveTo(end);
        },
    });
}).call(this);
