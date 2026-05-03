(function(){
    cc.LodeItemNumber = cc.Class({
        extends: cc.Component,
        properties: {
            numberValue: -1,
            sfChoose: cc.SpriteFrame,
            sfUnChoose: cc.SpriteFrame,
            spriteNumber: cc.Sprite,
            lbNumber: cc.Label
        },
        onLoad:function(){
            this.isChoose = false;
            this.node.on('touchend', function () {
                this.onChoose();
            }, this);
        },
        reset: function(){
          this.isChoose = false;
          this.spriteNumber.spriteFrame = this.sfUnChoose;
        },
        //Set value cho so
        setNumber: function(number){
            let typeBet = cc.LodeController.getInstance().getTypeBet();
            typeBet = parseInt(typeBet);
            let strNumber = (number < 10) ? "0"+number : number;
            if(typeBet == cc.LodeType.DE_DAU || typeBet == cc.LodeType.DE_CUOI) {
                strNumber = number;
            }

            this.lbNumber.string = strNumber;
            this.numberValue = number;
        },
        //Chon so
        onChoose: function(){
            this.isChoose = !this.isChoose;
            this.spriteNumber.spriteFrame =(this.isChoose) ? this.sfChoose : this.sfUnChoose;
            if(this.isChoose) {
                //Kiem tra so luong so
                if(!cc.LodeController.getInstance().isMaxChoose()) {
                    cc.LodeController.getInstance().setNumberChooses(this.numberValue);
                }else {
                    this.spriteNumber.spriteFrame = this.sfUnChoose;
                }
            }else {
                cc.LodeController.getInstance().unChooseNumber(this.numberValue);
            }
            cc.LodeController.getInstance().showTitleChooseNumber();
        }
    });
}).call(this);
