/**
 * Created by Nofear on 3/22/2019.
 */

var slotsConfig = require('SlotsConfig');

(function () {
    cc.GNSpinColumnView = cc.Class({
        "extends": cc.Component,
        properties: {
            /*
            spriteBgs: [cc.Sprite],
            spriteHls: [cc.Sprite],*/
            nodeParentWildUpper: cc.Node,
            nodeWild: cc.Node,
            spriteIcons: [cc.Sprite],
            skeletonIcons: [sp.Skeleton],
            animCol: cc.Animation,
        },

        onLoad: function () {
            this.scheduler = cc.director.getScheduler();
            this.nodeParentWild = this.nodeWild.parent;


            this.listStickyWilds = [];//chua sticky wild sau khi tao ra

            this.colId = parseInt(this.node.name) - 1;

            this.icons = cc.SpinController.getInstance().getIconView().icons;
            this.fsIcons = cc.SpinController.getInstance().getIconView().fsIcons;
            this.skeletonDataIcons = cc.SpinController.getInstance().getIconView().skeletonDataIcons;
            this.skeletonDataIconsFs = cc.SpinController.getInstance().getIconView().skeletonDataIconsFs;
            this.skeletonWild = this.nodeWild.getComponent(sp.Skeleton);

            this.freeSpinController = cc.FreeSpinController.getInstance();
        },

        // init: function () {
        //     this.animCol = this.getComponent(cc.Animation);
        //     this.rootPosY = [];
        //     //Luu lai toa do Y default
        //     for (var i = 0; i < this.nodeCols.length; i++) {
        //         this.rootPosY.push(this.nodeCols[i].y);
        //     }
        // },

        start: function () {
            this.freeSpinController = cc.FreeSpinController.getInstance();
        },

        randomAllIcon: function () {
            //Tat Expand WILD
            this.nodeWild.active = false;
            //xem có stickyWild ko thì xoá đi
            this.listStickyWilds.forEach(function (stickyWild) {
                stickyWild.destroy();
            });

            for (var i = 0; i < 4; i++) {
                this.randomIcon2(i);
            }
        },

        //ham nay goi trong animation spin (bo? -> ko set lai icon khi quay)
        randomIcon: function () {

        },

        randomIcon2: function (indexIcon) {

            //neu la freespin mode thi lay icon freespin
            if (this.freeSpinController && this.freeSpinController.getStateFreeSpin()) {
                var length = this.fsIcons.length;
                do {
                    var iconId = Math.floor((Math.random() * length) + 1);
                }
                while (iconId === 2 || iconId === 3);

                this.setIcon(parseInt(indexIcon.toString()), iconId);
            } else {
                length = this.icons.length;
                iconId = Math.floor((Math.random() * length));

                this.setIcon(parseInt(indexIcon.toString()), iconId);
            }
        },

        setIcon: function (indexIcon, iconId) {
            if (this.freeSpinController && this.freeSpinController.getStateFreeSpin()) {
                if (iconId >= 4 && iconId <= 6) {
                    this.skeletonIcons[indexIcon].node.active = true;
                    this.spriteIcons[indexIcon].enabled = false;

                    this.skeletonIcons[indexIcon].skeletonData = this.skeletonDataIconsFs[iconId - 1];
                    this.skeletonIcons[indexIcon].setAnimation(0, 'animation', true);
                } else {

                    this.skeletonIcons[indexIcon].node.active = false;
                    this.spriteIcons[indexIcon].enabled = true;
                    this.spriteIcons[indexIcon].spriteFrame = this.fsIcons[iconId - 1];
                }
            } else {
                if (iconId <= 6) {
                    this.skeletonIcons[indexIcon].node.active = true;
                    this.spriteIcons[indexIcon].enabled = false;

                    if (this.skeletonDataIcons[iconId - 1]) {
                        this.skeletonIcons[indexIcon].skeletonData = this.skeletonDataIcons[iconId - 1];
                        this.skeletonIcons[indexIcon].setAnimation(0, 'animation', true);
                    }
                } else {
                    this.skeletonIcons[indexIcon].node.active = false;
                    this.spriteIcons[indexIcon].enabled = true;

                    this.spriteIcons[indexIcon].spriteFrame = this.icons[iconId - 1];
                }
            }
        },

        //set du lieu tu server
        setData: function () {
            //neu la freespin mode thi lay icon freespin
            if (this.freeSpinController.getStateFreeSpin()) {
                //Lay data
                var slotsData = cc.SpinController.getInstance().getSpinResponse().FreeSpinData.SlotsData;

            } else {
                //Lay data
                slotsData = cc.SpinController.getInstance().getSpinResponse().SpinData.SlotsData;
            }

            //chuyen list data -> matrix
            this.matrixData = cc.Tool.getInstance().listToMatrix(slotsData, 5); //listToMatrix(slotsData, 3);
            for (var i = 1; i <= 3; i++) {
                //var iconId = this.matrixData[this.colId][i - 1];
                var iconId = this.matrixData[i - 1][this.colId];
                //iconId = 0 la co WILD trong cot
                if (iconId === 1) {
                    this.haveWild = true;
                }

                this.setIcon(i, iconId);
            }
        },

        checkActiveWild: function () {
            //Neu co WILD trong cot thi chay animation hien thi Expand WILD
            if (this.haveWild) {
                if (this.freeSpinController.getStateFreeSpin()) {
                    //Kiem tra vi tri Wild va Tao Sticky WILD
                    for (var i = 1; i <= 3; i++) {
                        //var iconId = this.matrixData[this.colId][i - 1];
                        var iconId = this.matrixData[i - 1][this.colId];
                        //iconId = 0 la co WILD trong cot
                        if (iconId === 1) {
                            //Tao 1 Sticky WILD
                            var nodeStickyWild = cc.instantiate(this.freeSpinController.getStickyWild());
                            nodeStickyWild.parent = this.node;

                            //lay ve vi tri icon
                            var pos = this.spriteIcons[i].node.parent.position;

                            //Set ve dung vi tri icon co Wild
                            nodeStickyWild.position = pos;

                            this.listStickyWilds.push(nodeStickyWild);
                        }
                    }
                } else {
                    //bat expand WILD
                    this.nodeWild.active = true;
                    var self = this;
                    self.skeletonWild.clearTracks();
                    if (this.isFastSpin) {
                        //tang toc do hien thi khi Quay nhanh
                        self.skeletonWild.timeScale = slotsConfig.TIME_SCALE_ANIMATION_WILD_FAST;
                        self.skeletonWild.setAnimation(0, 'animation', true);
                        self.nodeWild.parent = self.nodeParentWildUpper;
                        this.scheduler.schedule(function () {
                            self.nodeWild.parent = self.nodeParentWild;
                        }, this, 0, 0, slotsConfig.TIME_WILD_3X_APPEAR_FAST, false);
                    } else {
                        //chuyen ve toc do binh thuong khi quay normal
                        self.skeletonWild.timeScale = slotsConfig.TIME_SCALE_ANIMATION_WILD;
                        self.skeletonWild.setAnimation(0, 'animation', true);
                        self.nodeWild.parent = self.nodeParentWildUpper;
                        this.scheduler.schedule(function () {
                            self.nodeWild.parent = self.nodeParentWild;
                        }, this, 0, 0, slotsConfig.TIME_WILD_3X_APPEAR, false);
                    }
                }
                return true;
            } else {
                return false;
            }
        },

        finishSpin: function () {
            cc.SpinController.getInstance().stopSpinFinish();
            switch (this.colId) {
                case 0:
                    cc.AudioController.getInstance().playSound(cc.AudioTypes.STOP_SPIN_1);
                    break;
                case 1:
                    cc.AudioController.getInstance().playSound(cc.AudioTypes.STOP_SPIN_2);
                    break;
                case 2:
                    cc.AudioController.getInstance().playSound(cc.AudioTypes.STOP_SPIN_3);
                    break;
                case 3:
                    cc.AudioController.getInstance().playSound(cc.AudioTypes.STOP_SPIN_4);
                    break;
                case 4:
                    cc.AudioController.getInstance().playSound(cc.AudioTypes.STOP_SPIN_5);
                    break;
            }
        },

        spin: function () {
            this.unscheduleAllCallbacks();

            //Tat Expand WILD
            this.nodeWild.active = false;

            this.animCol.play('columnSpin');
        },

        stop:  function () {
            this.isFastSpin = false;
            this.haveWild = false;
            this.animCol.play('columnStop');
            this.setData();
        },

        fastStop:  function () {
            this.isFastSpin = true;
            this.haveWild = false;
            this.animCol.play('columnStop2');
            this.setData();
        },
    });

}).call(this);