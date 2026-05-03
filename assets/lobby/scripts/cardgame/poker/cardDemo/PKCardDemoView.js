/**
 * Created by Welcome on 5/28/2019.
 */

(function () {
    cc.PKCardDemoView = cc.Class({
        "extends": cc.Component,
        properties: {
            skeDealer: sp.Skeleton,

            //vi tri bai tam thoi
            cardTempEndPos1: [cc.Node],
            cardTempEndPos2: [cc.Node],
            nodeParentCardTemp: cc.Node,
        },

        onLoad: function () {
            this.countPos = this.cardTempEndPos1.length;

            this.timePerDraw = 200;

            //vi tri dealer
            this.dealerPos = cc.v2(0, 180);
            //goc quay 1 cua card
            this.endRot1 = -6;
            //goc quay 2 cua card
            this.endRot2 = 15;
            //luu node tao ra
            this.nodeDemos = [];

            this.cardDemoPool = cc.PKController.getInstance().getCardDemoPool();
        },
        
        drawCardDemo: function (positions, dealerIndex) {
            var self = this;
            var indexTime = 0;
            for (var i = dealerIndex; i < this.countPos; i++) {
                //neu vi tri co nguoi choi thi moi chia bai
                if (positions[i] > 0) {
                    var pos = this.cardTempEndPos1[i].position;
                    setTimeout(function(position){
                        var nodeDemo = self.cardDemoPool.createNode();
                        nodeDemo.parent = self.nodeParentCardTemp;
                        nodeDemo.position = self.dealerPos;
                        nodeDemo.rotation = self.endRot1;
                        nodeDemo.getComponent(cc.CardDemoItem).moveTo(position);

                        self.playAnimationDealerDraw();

                        self.nodeDemos.push(nodeDemo);
                    }, indexTime * this.timePerDraw, pos);
                    indexTime++;
                }
            }

            for (var i = 0; i < dealerIndex; i++) {
                //neu vi tri co nguoi choi thi moi chia bai
                if (positions[i] > 0) {
                    var pos = this.cardTempEndPos1[i].position;
                    setTimeout(function(position){
                        var nodeDemo = self.cardDemoPool.createNode();
                        nodeDemo.parent = self.nodeParentCardTemp;
                        nodeDemo.position = self.dealerPos;
                        nodeDemo.rotation = self.endRot1;
                        nodeDemo.getComponent(cc.CardDemoItem).moveTo(position);

                        self.playAnimationDealerDraw();

                        self.nodeDemos.push(nodeDemo);
                    }, indexTime * this.timePerDraw, pos);
                    indexTime++;
                }
            }

            for (var i = dealerIndex; i < self.countPos; i++) {
                if (positions[i] > 0) {
                    var pos = self.cardTempEndPos2[i].position;
                    setTimeout(function (position) {
                        var nodeDemo = self.cardDemoPool.createNode();
                        nodeDemo.parent = self.nodeParentCardTemp;
                        nodeDemo.position = self.dealerPos;
                        nodeDemo.rotation = self.endRot2;

                        self.playAnimationDealerDraw();

                        nodeDemo.getComponent(cc.CardDemoItem).moveTo(position);
                        self.nodeDemos.push(nodeDemo);
                    }, indexTime * self.timePerDraw, pos);
                    indexTime++;
                }
            }

            for (var i = 0; i < dealerIndex; i++) {
                if (positions[i] > 0) {
                    var pos = self.cardTempEndPos2[i].position;
                    setTimeout(function (position) {
                        var nodeDemo = self.cardDemoPool.createNode();
                        nodeDemo.parent = self.nodeParentCardTemp;
                        nodeDemo.position = self.dealerPos;
                        nodeDemo.rotation = self.endRot2;

                        self.playAnimationDealerDraw();

                        nodeDemo.getComponent(cc.CardDemoItem).moveTo(position);
                        self.nodeDemos.push(nodeDemo);
                    }, indexTime * self.timePerDraw, pos);
                    indexTime++;
                }
            }
        },

        playAnimationDealerDraw: function () {
            //play anim dealer draw
            this.skeDealer.clearTracks();
            this.skeDealer.setToSetupPose();
            this.skeDealer.setAnimation(1, 'deal', false);
        },

        playAnimationDealerIdle: function () {
            //play anim dealer draw
            this.skeDealer.clearTracks();
            this.skeDealer.setToSetupPose();
            this.skeDealer.setAnimation(0, 'animation', true);
        },

        getTimeDraw: function (countPlayer) {
            return (countPlayer * this.timePerDraw * 2);
        },

        removeCardDemo: function () {
            var self = this;
            this.nodeDemos.forEach(function (nodeDemo) {
                self.cardDemoPool.putToPool(nodeDemo);
            });

            this.nodeDemos = [];
        },
    });
}).call(this);
