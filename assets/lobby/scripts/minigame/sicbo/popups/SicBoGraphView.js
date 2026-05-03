/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.SicBoGraphView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
			background: [cc.SpriteFrame],
			nodePanel: cc.Sprite,
            sicboGraph100View: cc.SicBoGraph100View,
            sicboGraphCatCauView: cc.SicBoGraphCatCauView,
            sicboGraphDiceSumView: cc.SicBoGraphDiceSumView,
            sicboGraphDice3View: cc.SicBoGraphDice3View,
            pageView: cc.PageView,
            btnNext: cc.Button,
            btnBack: cc.Button,
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.timeSwitchPage = 0.3;
            this.totalPages = 2;
            this.currentPageIndex = this.pageView.getCurrentPageIndex();
			this.pageView.node.on('scroll-ended', this.onScrollEnded, this);
            this.checkStatusButton();
            this.node.zIndex = cc.NoteDepth.POPUP_SICBO;
            this.btnBack.node.active = false;
            this.nodePanel.spriteFrame = this.background[0];
        },

        onEnable: function () {
            var self = this;
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                self.getSoiCau();
            }, this, 1, 0, delay, false);

            this.animation.play('openPopup');

            //set tam du lieu de demo
        },

        getSoiCau: function () {
            var sbGetSoiCauCommand = new cc.SBGetSoiCauCommand;
            sbGetSoiCauCommand.execute(this)
        },

        onSBGetSoiCauResponse: function (list) {
            this.sicboGraphCatCauView.draw(list);
            this.sicboGraph100View.draw(list);

            this.sicboGraphDiceSumView.draw(list);
            this.sicboGraphDice3View.draw(list);
        },

        pageEvent: function () {
            this.checkStatusButton();
        },

        closeClicked: function () {
            //reset truoc khi close cho ko lag
            this.sicboGraph100View.resetDraw();
            this.sicboGraphCatCauView.resetDraw();
            this.sicboGraphDiceSumView.resetDraw();
            this.sicboGraphDice3View.resetDraw();

            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.SicBoController.getInstance().destroyGraphView();
            }, this, 1, 0, delay, false);
        },

        nextPageClicked: function() {
            this.currentPageIndex++;
            this.pageView.scrollToPage(this.currentPageIndex, this.timeSwitchPage);
            this.checkStatusButton();
        },

        backPageClicked: function() {
            this.currentPageIndex--;
            this.pageView.scrollToPage(this.currentPageIndex, this.timeSwitchPage);
            this.checkStatusButton();
        },

		onScrollEnded: function () {
			this.checkStatusButton();
		},
	
        checkStatusButton: function () {
            this.currentPageIndex = this.pageView.getCurrentPageIndex();
            if (this.currentPageIndex <  this.totalPages - 1) {
                this.btnNext.interactable = true;
                this.btnNext.node.active = true;
                this.nodePanel.spriteFrame = this.background[0];
            } else {
                this.btnNext.interactable = false;
                this.btnNext.node.active = false;
                this.nodePanel.spriteFrame = this.background[1];
            }

            if (this.currentPageIndex > 0) {
                this.btnBack.interactable = true;
                this.btnBack.node.active = true;
                this.nodePanel.spriteFrame = this.background[1];
            } else {
                this.btnBack.interactable = false;
                this.btnBack.node.active = false;
               this.nodePanel.spriteFrame = this.background[0];
            }
        },
    });
}).call(this);
