/**
 * Created by Welcome on 5/28/2019.
 */

(function () {
    cc.CardDemoPool = cc.Class({
        "extends": cc.Component,
        properties: {
            prefab: cc.Prefab,
        },

        createNodePool: function () {
            this.nodePool = new cc.NodePool();
            let initCount = 14;
            for (let i = 0; i < initCount; ++i) {
                this.nodePool.put(cc.instantiate(this.prefab));
            }
        },

        putToPool: function (node) {
            this.nodePool.put(node);
        },

        clearPool: function () {
            if (this.nodePool)
                this.nodePool.clear();

        },

        createNode: function () {
            let node = null;
            if (this.nodePool.size() > 0) {
                node = this.nodePool.get();
            } else {
                node = cc.instantiate(this.prefab);
            }

            return node;
        },
    });
}).call(this);
