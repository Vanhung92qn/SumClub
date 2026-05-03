/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.TreasureItemPool = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeParent: cc.Node,
            prefab: cc.Prefab,
            prefabDemo: cc.Prefab,


        },

        onLoad: function () {
            cc.TreasureItemController.getInstance().setTreasureItemPool(this);
            this.createNodePool();
            // this.createNodePoolDemo();
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
            if (this.nodePool)
                this.nodePool.put(node);
        },

        clearPool: function () {
            if (this.nodePool)
                this.nodePool.clear();

        },

        createNode: function (start, itemType, amount, parent) {
            let node = null;
            if (this.nodePool.size() > 0) {
                node = this.nodePool.get();
            } else {
                node = cc.instantiate(this.prefab);
            }

            //truong hop tao item khi mo ruong
            if (parent) {
                node.parent = parent;
                node.setPosition(cc.v2(0, 100)); //lay truoc toa do o editor
            }
            //tao item khi jump
            else {
                node.parent = this.nodeParent;
                node.setPosition(cc.v2(-353, -234)); //lay truoc toa do o editor
            }


            node.getComponent(cc.TreasureItem).playFx(itemType, amount);
        },

        createNodePoolDemo: function () {
            this.nodePool = new cc.NodePool();
            let initCount = 5;
            for (let i = 0; i < initCount; ++i) {
                let node = cc.instantiate(this.prefab);
                this.nodePool.put(node);
            }
        },

        putToPoolDemo: function (node) {
            this.nodePool.put(node);
        },

        clearPoolDemo: function () {
            if (this.nodePool)
                this.nodePool.clear();

        },

        createNodeDemo: function (start, itemType, amount, parent) {
            let node = null;
            if (this.nodePool.size() > 0) {
                node = this.nodePool.get();
            } else {
                node = cc.instantiate(this.prefab);
            }

            //truong hop tao item khi mo ruong
            if (parent) {
                node.parent = parent;
                node.setPosition(cc.v2(0, 100)); //lay truoc toa do o editor
            }
            //tao item khi jump
            else {
                node.parent = this.nodeParent;
                node.setPosition(cc.v2(-353, -234)); //lay truoc toa do o editor
            }


            node.getComponent(cc.TreasureItemDemo).playFx(itemType, amount);
        },
    });
}).call(this);
