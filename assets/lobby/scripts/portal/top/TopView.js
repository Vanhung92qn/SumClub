/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TopView = cc.Class({
        "extends": cc.Component,
        properties: {
            animationTOP: cc.Animation,
            nodeBigWin: cc.Node,
            nodeJackpot: cc.Node,

            AudioClick: cc.AudioSource,
        },

        onLoad: function () {
            this.nodeTop = this.node.children[0];
            this.startPos = cc.v2(77, 206);
            this.endPos = cc.v2(181, 262);
            this.duration = 0.2;

            this.node.zIndex = cc.NoteDepth.MINI_EVENT_VIEW;
    
        },

        onEnable: function () {
            this.isOpen = true;
            this.nodeBigWin.active = false;
            this.nodeJackpot.active = false;

            //this.nodeTop.scaleX = 0;
            cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'TOP', cc.DDNAUIType.BUTTON);
        },

        openClicked: function () {
            if (this.isOpen) {
                this.animationTOP.play('closeTOP');
                //tao action di chuyen
                this.action = cc.moveTo(this.duration, this.startPos);
                this.nodeBigWin.active = false;
                this.nodeJackpot.active = false;
            } else {
                this.animationTOP.play('openTOP');
                //tao action di chuyen
                this.action = cc.moveTo(this.duration, this.endPos);
                this.nodeBigWin.active = false;
                this.nodeJackpot.active = true;

                cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'TOP', cc.DDNAUIType.BUTTON);
            }
            this.action.easing(cc.easeOut(3.0));
            this.node.runAction(this.action);

            this.isOpen = !this.isOpen;
        },

        bigWinClicked: function () {
            this.nodeBigWin.active = true;
            this.nodeJackpot.active = false;
        },
		jackpotClicked: function () {
            this.AudioClick.loop = false;
            this.AudioClick.play();
            this.nodeBigWin.active = false;
            this.nodeJackpot.active = !this.nodeJackpot.active;
        }
    });
}).call(this);
