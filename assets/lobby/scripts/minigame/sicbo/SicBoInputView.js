/**
 * Created by Nobita on 01/09/2022.
 */

const players = require('PlayerData').players;

(function () {
    cc.SicBoInputView = cc.Class({
        extends: cc.Component,

        properties: {
            nodeParentChip: cc.Node,
            btnBetTaiXiuVals: [cc.Button],
            btnBetChanLeVals: [cc.Button],
            btnBetDoiVals: [cc.Button],
            btnBetBaoVals: [cc.Button],
            btnBetTongVals: [cc.Button],
            btnBetTongCapVals: [cc.Button],
            btnBetDonVals: [cc.Button],
            btn1K: cc.Node,
            btn5K: cc.Node,
            btn10K: cc.Node,
			btn50K: cc.Node,
            btn100K: cc.Node,
            btn500K: cc.Node,
			btn1M: cc.Node,
			btn5M: cc.Node,
			btn10M: cc.Node,
			btn50M: cc.Node,
			scrollView: cc.ScrollView,
            btnNextChip: cc.Button,
            btnPrevChip: cc.Button,
        },

        onLoad() {
            this.controller = cc.SicBoController.getInstance();
			this.totalOffset = 0;
			this.listButton = [this.btn1K, this.btn5K, this.btn10K, this.btn50K,
				this.btn100K, this.btn500K, this.btn1M, this.btn5M, this.btn10M, this.btn50M];
			this.betVals = [1000, 5000, 10000, 50000, 100000, 500000, 1000000, 5000000, 10000000, 50000000];
			this.onChipClicked({ target: this.btn1K }, 1000);
            let self = this;
			this.btnPrevChip.interactable = false;
			this.btnNextChip.interactable = true;
            this.controller.setSicBoInputView(this);
        },

        start() {

        },

        onChipClicked: function (event, value) {
            value = parseInt(value);
            if (value != this.betValue) {
                this.betValue = value;

                cc.AudioController.getInstance().playSound(cc.AudioTypes.CHIP_SELECT);

                this.resetSpriteButton();
                this.setActiveButton(event.target);
            }
        },
		
        setActiveButton: function (node) {
            node.getChildByName('chipPress').active = true;
            let moveUp = cc.moveTo(0.3, cc.v2(node.x, 10));
            node.runAction(moveUp);
        },

        resetSpriteButton: function () {
            let self = this;
            this.listButton.forEach(function (btn, index) {
                self.setDefaultSfButton(btn, index);
            });

        },
		
        setDefaultSfButton: function (node, type) {
            node.getChildByName('chipPress').active = false;
            let moveBack = cc.moveTo(0.3, cc.v2(node.x, 0));
            node.runAction(moveBack);
        },

		nextChipClicked: function () {
			let activeButtonIndex = this.listButton.findIndex(btn => btn.getChildByName('chipPress').active);
			if (activeButtonIndex !== -1 && activeButtonIndex < this.listButton.length - 1) {				
				let nextButton = this.listButton[activeButtonIndex + 1];
				let index = this.listButton.indexOf(nextButton);
				if (index !== -1) {
					let value = this.betVals[index];
					this.onChipClicked({ target: nextButton }, value);
					let btnSize = nextButton.getContentSize();
					let offset = cc.v2(this.totalOffset + btnSize.width, 0);
					this.scrollView.scrollToOffset(offset, 0.1);
					this.totalOffset += btnSize.width;
					if (activeButtonIndex === this.listButton.length - 2) {
						this.btnNextChip.interactable = false;
					}
					this.btnPrevChip.interactable = true;
				}
			}
		},

		prevChipClicked: function () {
			let activeButtonIndex = this.listButton.findIndex(btn => btn.getChildByName('chipPress').active);
			if (activeButtonIndex > 0) {
				let prevButton = this.listButton[activeButtonIndex - 1];
				let index = this.listButton.indexOf(prevButton);
				if (index !== -1) {
					let value = this.betVals[index];
					this.onChipClicked({ target: prevButton }, value);
					let btnSize = prevButton.getContentSize();
					let offset = cc.v2(this.totalOffset - btnSize.width, 0);
					this.scrollView.scrollToOffset(offset, 0.1);
					this.totalOffset -= btnSize.width;
					if (activeButtonIndex === 1) {
						this.btnPrevChip.interactable = false;
					}
					this.btnNextChip.interactable = true;
				}
			}
		},

        // update (dt) {},
        activeAllButtonBet: function (enable) {
            this.btnBetTaiXiuVals.forEach(function (btnBet) {
                btnBet.interactable = enable;
            });

            this.btnBetChanLeVals.forEach(function (btnBet) {
                btnBet.interactable = enable;
            });

            this.btnBetDoiVals.forEach(function (btnBet) {
                btnBet.interactable = enable;
            });

            this.btnBetBaoVals.forEach(function (btnBet) {
                btnBet.interactable = enable;
            });

            this.btnBetTongVals.forEach(function (btnBet) {
                btnBet.interactable = enable;
            });

            this.btnBetTongCapVals.forEach(function (btnBet) {
                btnBet.interactable = enable;
            });

            this.btnBetDonVals.forEach(function (btnBet) {
                btnBet.interactable = enable;
            });
        },

        resetTable: function () {

        },

        onBetClick: function (sender, betSide) {
            this.controller.onBet(this.betValue, betSide);
        },

        onBet: function (betSide) {
            this.disableBetAgain(true);
            cc.AudioController.getInstance().playSound(cc.AudioTypes.CHIP_BET);
            this.sendRequestBet(this.betValue, betSide);
        },

        enableClickBet: function (enable) {

        },

        disableBetAgain: function (isDisable) {

        },

        sendRequestBet: function (betValue, betSide) {
            return this.controller.sendRequestOnHub(cc.MethodHubName.BET, betValue, betSide);
        },

        playAnimationWin: function (sideWin) {

        },

    });
}).call(this);
