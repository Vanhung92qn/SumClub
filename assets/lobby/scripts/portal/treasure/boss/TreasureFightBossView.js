/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TreasureFightBossView = cc.Class({
        "extends": cc.Component,
        properties: {
            treasureBoss: [cc.TreasureBoss],
            nodeParentHP: cc.Node,
            prefabHP: cc.Prefab,
        },

        onLoad: function() {
            cc.TreasureController.getInstance().setTreasureFightBossView(this);
            this.showBoss(0);
            this.createNodePool();
        },

        createNodePool: function () {
            this.nodePool = new cc.NodePool();
            let initCount = 3;
            for (let i = 0; i < initCount; ++i) {
                let node = cc.instantiate(this.prefabHP);
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

        createNodeHP: function (hp) {
            var self = this;
            let node = null;
            if (this.nodePool.size() > 0) {
                node = this.nodePool.get();
            } else {
                node = cc.instantiate(this.prefab);
            }

            node.parent = this.nodeParentHP;
            node.setPosition(0,0);

            node.getComponent(cc.Label).string = '-' + cc.Tool.getInstance().formatNumber(hp);
            node.getComponent(cc.Animation).play('subHP');

            setTimeout(function () {
                self.putToPool(node);
            }, 1010);
        },

        showBoss: function (index) {
            for (var i = 0; i < this.treasureBoss.length; i++) {
                if (index === i) {
                    this.treasureBoss[i].node.active = true;
                    this.boss = this.treasureBoss[i];
                } else {
                    this.treasureBoss[i].node.active = false;
                }
            }
        },

        bossPlayAnimation: function (name) {
            switch (name) {
                case cc.BossAnimationName.IDLE:
                    this.boss.idle();
                    break;
                case cc.BossAnimationName.IDLE_LOW_HP:
                    this.boss.idle1();
                    break;
                case cc.BossAnimationName.DEAD:
                    this.boss.dead();
                    break;
                case cc.BossAnimationName.HIT:
                    this.boss.hit();
                    break;
            }
        },

        hit: function () {
            this.boss.hit();
        },

        dead: function () {
            this.boss.dead();
        },

        idle: function () {
            this.boss.idle();
        },

        idle1: function () {
            this.boss.idle1();
        },

        attackBoss: function () {
            cc.WeaponController.getInstance().createNode(0, this.boss.node.position);
        }
    });
}).call(this);
