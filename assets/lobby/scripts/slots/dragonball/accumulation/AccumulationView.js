/**
 * Created by Nofear on 3/15/2019.
 */

//Cot tich luy FreeSpin
(function () {
    cc.AccumulationView = cc.Class({
        "extends": cc.Component,
        properties: {
            progressBar: cc.ProgressBar,
            // skeletonPower: sp.Skeleton,
            nodeS: cc.Node, //node cua sóng

            powerPrefab: cc.Prefab,
            nodePosPowers: [cc.Node],
        },

        onLoad: function () {
            cc.AccumulationController.getInstance().setAccumulationView(this);
            this.max = 1837; //So diem duoc 8 luot mien phi
            // this.endPosition = cc.v2(521, -147);
            this.createNodePool();

            this.minS = -159.8; // min Y cua song
            this.maxS = 112; // max Y cua song
            this.heightS = this.maxS - this.minS; //chieu cao cua Song
        },

        // binh_finish
        // binh_idle
        // binh_stand
        setAccumulation: function (value, isPointFree) {
            var progress = value / this.max;

            this.progressBar.progress = progress;

            var yS = this.minS + (this.heightS * progress);
            this.nodeS.y = yS; //set vi tri cua sóng

            // if (isPointFree) {
            //     this.skeletonPower.setAnimation(0, 'binh_finish', true);
            // } else {
            //     this.skeletonPower.setAnimation(1, 'binh_idle', true);
            // }
        },

        createNodePool: function () {
            this.powerPool = new cc.NodePool();
            let initCount = 5;
            for (let i = 0; i < initCount; ++i) {
                let nodePower = cc.instantiate(this.powerPrefab);
                this.powerPool.put(nodePower);
            }
        },

        putPowerToPool: function (nodePower) {
            this.powerPool.put(nodePower);
        },

        clearPowerPool: function () {
            if (this.powerPool)
                this.powerPool.clear();

        },

        createPower: function (indexItem) {
            let power = null;
            if (this.powerPool.size() > 0) {
                power = this.powerPool.get();
            } else {
                power = cc.instantiate(this.powerPrefab);
            }

            power.parent = this.node;
            power.setPosition(this.nodePosPowers[indexItem - 1].position);

            //delay -> play animation
            var self = this;

            power.getComponent(cc.AccumulationItem).playFx();

            cc.director.getScheduler().schedule(function () {
                power.getComponent(cc.AccumulationItem).moveTo(self.nodeS.position);
            }, this, 0, 0, 0.5, false);
        },
    });
}).call(this);
