/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TreasureBGLoop = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeMushRoom: cc.Node,
            nodeBG: cc.Node,

            mushrooms: [cc.MushroomTrigger],

            bunny: cc.Bunny,

        },

        onLoad: function() {
            cc.TreasureController.getInstance().setTreasureBGLoop(this);

            this.secondPerJump = 0.5;
            this.speed = 100; //toc do
            this.spaceMR = 125; //khoang cach giua mushroom

            this.stepJump = 7; //số bước nhảy thực tế dựa trên giao diện

            this.indexAdd = 0;
        },

        hardResetMushroom: function () {
            this.mushrooms[1].hardResetItemDemo();
        },

    //sap xep lai mang theo vi tri
        sortArrayMushroom: function () {
            this.mushrooms = this.mushrooms.sort(function (mrA, mrB) {
                return mrA.node.x - mrB.node.x;
            });

            // console.log('sortArrayMushroom');
            // this.mushrooms.forEach(function (mushroom) {
            //     console.log('nodeMR name: ' + mushroom.node.name);
            //     console.log('nodeMR x: ' + mushroom.node.x);
            // });
            // console.log(this.mushrooms);
        },

        //reset các biến đánh dấu của mushroom
        resetMushroom: function () {
            this.mushrooms.forEach(function (mushroom) {
                mushroom.resetItemDemo();
            });
        },

        reSetPrizeToMushroom: function () {
            if (this.dataList) {
                this.setPrizeToMushroom(this.dataList, this.treasureList);
            }
        },

        setPrizeToMushroom: function (dataList, treasureList) {
            this.dataList = dataList;
            this.treasureList = treasureList;

            var dataPrize = dataList.split(':');

            // console.log('dataList');
            // console.log(dataList);
            // console.log('treasureList');
            // console.log(treasureList);

            var treasurePrize = treasureList.split(';');

            //reset het cac bien truoc
            this.resetMushroom();
            this.sortArrayMushroom();

            //tinh toán vị trí nấm cuối cùng để set giá trị (dựa vào index + vị trí)

            //chuyen thanh mang cac phan thuong
            var dataArray = dataPrize[0].split(';');
            var step = dataArray.length;

            var multi = cc.TreasureController.getInstance().getMultiProcess();

            // console.log('multi: ' + multi);

            var totalStep = step * multi;

            if (totalStep >= 50) {
                var indexMR = (totalStep % 50) + 1; //tính vị trí
            }
            else if (totalStep + 1 >= 50) {
                indexMR = 0; //tính vị trí
            }
            else {
                indexMR = totalStep + 1; //tính vị trí
            }

            //lay gia tri cuoi cung
            var prizeData = dataArray[step - 1].split(',');

            //lay treasure
            var treasureData = treasurePrize[0].split(',');
            // console.log(treasureData);
            //cos kho bau
            if (treasureData[1] > 0) {
                var prize = treasureData[0];

                if (treasureData[0] % 4 === 0) {
                    var prizeType = cc.TreasureItemType.GOLDEN_CHEST;
                } else {
                    prizeType = cc.TreasureItemType.CHEST;
                }
            }
            //coin
            else if (prizeData[2] > 0) {
                prize = prizeData[2];
                prizeType = cc.TreasureItemType.COIN;
            }
            //carrot
            else if (prizeData[3] > 0) {
                prize = prizeData[3];
                prizeType = cc.TreasureItemType.CARROT;
            } else {
                prize = 0;
                prizeType = cc.TreasureItemType.NOTHING;
            }

            // console.log('setPrizeToMushroom totalStep: ' + totalStep);
            // console.log('setPrizeToMushroom indexMR: ' + indexMR);
            // console.log('this.mushrooms[indexMR] name: ' + this.mushrooms[indexMR].node.name);

            this.mushrooms[indexMR].setItemDemo(prizeType);

            var indexMR1 = indexMR;
            // console.log('index MR: ', indexMR, prizeType, prize);


            //TINH BUOC SO HAI
            //chuyen thanh mang cac phan thuong
            dataArray = dataPrize[1].split(';');
            step = dataArray.length;

            multi = cc.TreasureController.getInstance().getMultiProcess();

            var totalStep2 = (step * multi) + totalStep;

            if (totalStep2 >= 50) {
                indexMR = (totalStep2 % 50) + 1; //tính vị trí
            }
            else if (totalStep2 + 1 >= 50) {
                indexMR = 0; //tính vị trí
            }
            else {
                indexMR = totalStep2 + 1; //tính vị trí
            }

            //lay gia tri cuoi cung
            prizeData = dataArray[step - 1].split(',');

            //lay treasure
            treasureData = treasurePrize[1].split(',');
            // console.log(treasureData);
            //cos kho bau
            if (treasureData[1] > 0) {
                // prize = treasureData[0];
                //
                // if (treasureData[0] % 4 === 0) {
                //     prizeType = cc.TreasureItemType.GOLDEN_CHEST;
                // } else {
                //     prizeType = cc.TreasureItemType.CHEST;
                // }

                prize = 0;
            }
            //coin
            else if (prizeData[2] > 0) {
                prize = prizeData[2];
                prizeType = cc.TreasureItemType.COIN;
            }
            //carrot
            else if (prizeData[3] > 0) {
                prize = prizeData[3];
                prizeType = cc.TreasureItemType.CARROT;
            } else {
                prize = 0;
                prizeType = cc.TreasureItemType.NOTHING;
            }

            // console.log('setPrizeToMushroom totalStep: ' + totalStep);
            // console.log('setPrizeToMushroom indexMR: ' + indexMR);
            // console.log('this.mushrooms[indexMR] name: ' + this.mushrooms[indexMR].node.name);

            var indexMR2 = -1;
            if (indexMR !== indexMR1) {
                indexMR2 = indexMR;
                this.mushrooms[indexMR].setItemDemo(prizeType);
                // console.log('index MR 2: ', indexMR, prizeType, prize);
            }

            //TINH BUOC SO BA
            //chuyen thanh mang cac phan thuong
            dataArray = dataPrize[2].split(';');
            step = dataArray.length;

            multi = cc.TreasureController.getInstance().getMultiProcess();

            var totalStep3 = (step * multi) + totalStep2;

            if (totalStep3 >= 50) {
                indexMR = (totalStep3 % 50) + 1; //tính vị trí
            }
            else if (totalStep3 + 1 >= 50) {
                indexMR = 0; //tính vị trí
            }
            else {
                indexMR = totalStep3 + 1; //tính vị trí
            }

            //lay gia tri cuoi cung
            prizeData = dataArray[step - 1].split(',');

            //lay treasure
            treasureData = treasurePrize[2].split(',');
            // console.log(treasureData);
            //cos kho bau
            if (treasureData[1] > 0) {
                // prize = treasureData[0];
                //
                // if (treasureData[0] % 4 === 0) {
                //     prizeType = cc.TreasureItemType.GOLDEN_CHEST;
                // } else {
                //     prizeType = cc.TreasureItemType.CHEST;
                // }

                prize = 0;
            }
            //coin
            else if (prizeData[2] > 0) {
                prize = prizeData[2];
                prizeType = cc.TreasureItemType.COIN;
            }
            //carrot
            else if (prizeData[3] > 0) {
                prize = prizeData[3];
                prizeType = cc.TreasureItemType.CARROT;
            }  else {
                prize = 0;
                prizeType = cc.TreasureItemType.NOTHING;
            }

            // console.log('setPrizeToMushroom totalStep: ' + totalStep);
            // console.log('setPrizeToMushroom indexMR: ' + indexMR);
            // console.log('this.mushrooms[indexMR] name: ' + this.mushrooms[indexMR].node.name);

            var indexMR3 = -1;
            if (indexMR !== indexMR1 && indexMR !== indexMR2) {
                indexMR3 = indexMR;
                this.mushrooms[indexMR].setItemDemo(prizeType);
                // console.log('index MR 3: ', indexMR, prizeType, prize);
            }


            //TINH BUOC SO BON
            //chuyen thanh mang cac phan thuong
            dataArray = dataPrize[3].split(';');
            step = dataArray.length;

            multi = cc.TreasureController.getInstance().getMultiProcess();

            var totalStep4 = (step * multi) + totalStep3;

            if (totalStep4 >= 50) {
                indexMR = (totalStep4 % 50) + 1; //tính vị trí
            }
            else if (totalStep4 + 1 >= 50) {
                indexMR = 0; //tính vị trí
            }
            else {
                indexMR = totalStep4 + 1; //tính vị trí
            }

            //lay gia tri cuoi cung
            prizeData = dataArray[step - 1].split(',');

            //lay treasure
            treasureData = treasurePrize[2].split(',');
            // console.log(treasureData);
            //cos kho bau
            if (treasureData[1] > 0) {
                // prize = treasureData[0];
                //
                // if (treasureData[0] % 4 === 0) {
                //     prizeType = cc.TreasureItemType.GOLDEN_CHEST;
                // } else {
                //     prizeType = cc.TreasureItemType.CHEST;
                // }

                prize = 0;
            }
            //coin
            else if (prizeData[2] > 0) {
                prize = prizeData[2];
                prizeType = cc.TreasureItemType.COIN;
            }
            //carrot
            else if (prizeData[3] > 0) {
                prize = prizeData[3];
                prizeType = cc.TreasureItemType.CARROT;
            }  else {
                prize = 0;
                prizeType = cc.TreasureItemType.NOTHING;
            }

            // console.log('setPrizeToMushroom totalStep: ' + totalStep);
            // console.log('setPrizeToMushroom indexMR: ' + indexMR);
            // console.log('this.mushrooms[indexMR] name: ' + this.mushrooms[indexMR].node.name);

            if (indexMR !== indexMR1 && indexMR !== indexMR2 && indexMR !== indexMR3) {
                this.mushrooms[indexMR].setItemDemo(prizeType);
                // console.log('index MR 4: ', indexMR, prizeType, prize);
            }
        },

        jump: function (step, multi) {
            // console.log('jump: ' + step + ' - multi: ' + multi);
            // this.setPrizeToMushroom(null, step, multi);

            //tinh thoi gian nhay
            if (multi <= 5) {
                this.secondPerJump = 0.5;
            } else if (multi <= 15) {
                this.secondPerJump = 1;
            } else if (multi <= 20) {
                this.secondPerJump = 2;
            } else {
                this.secondPerJump = 3;
            }

            var self = this;

            //jump lan 1
            self.bunny.jump(step, multi, self.spaceMR * multi, this.secondPerJump);
            self.showFxPrize(self.secondPerJump);

            //jump lan 2->n
            this.step = step;
            for (var i = 1; i < step; i++) {
                setTimeout(function () {
                    if (self.bunny === undefined) {
                        return;
                    }
                    self.bunny.moveTo();
                    self.showFxPrize(self.secondPerJump);
                }, this.secondPerJump * i * 1000);
            }

            //play fx run backround
            var endPosMR = cc.v2(this.nodeMushRoom.x - (this.spaceMR * step * multi), this.nodeMushRoom.y);
            var endPosBG = cc.v2(this.nodeBG.x - (this.spaceMR * step * multi), this.nodeBG.y);
            //
            var actionMR = cc.moveTo(this.secondPerJump * step, endPosMR);
            var actionBG = cc.moveTo(this.secondPerJump * step, endPosBG);
            //
            this.nodeMushRoom.runAction(actionMR);
            this.nodeBG.runAction(actionBG);

            //set timeout sau khi play xong fx -> goi SPIN FINISH
            setTimeout(function () {
                cc.TreasureController.getInstance().spinFinish();
            }, this.secondPerJump * step * 1000);
        },

        //kiem tra xem co prize ko? -> co thi show
        showFxPrize: function (delay) {
            setTimeout(function () {

                var jumpIndex = cc.TreasureController.getInstance().getJumpIndex();

                //lay gia tri
                var jumpData = cc.TreasureController.getInstance().getJumpData()[jumpIndex].split(',');

                //coin
                if (jumpData[2] > 0) {
                    cc.TreasureItemController.getInstance().createNode(null, cc.TreasureItemType.COIN, jumpData[2]);
                }
                //carrot
                else if (jumpData[3] > 0) {
                    cc.TreasureItemController.getInstance().createNode(null, cc.TreasureItemType.CARROT, jumpData[3]);
                }

                //tang index
                cc.TreasureController.getInstance().increJumpIndex();
            }, delay + (this.secondPerJump * 1000));
        },
    });
}).call(this);
