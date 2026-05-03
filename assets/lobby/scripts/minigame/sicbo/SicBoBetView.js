
cc.Class({
    extends: cc.Component,

    properties: {
        nodeLayoutInput: cc.Node,
		nodeBetX2: cc.Node,
        nodeBetAgain: cc.Node,
		spriteBtnNan: cc.Sprite,
    },

    onLoad() {
        this.controller = cc.SicBoController.getInstance();
		this.controller.setSicBoBetView(this);
        this.sideWins = [];
        this.gateBets = {
            [cc.SicBoGateTai]: this.getChildInNodeLayoutInput("btnTai"),
            [cc.SicBoGateXiu]: this.getChildInNodeLayoutInput("btnXiu"),

            [cc.SicBoGateChan]: this.getChildInNodeLayoutInput("btnChan"),
            [cc.SicBoGateLe]: this.getChildInNodeLayoutInput("btnLe"),

            [cc.SicBoGateDoi[1]]: this.getChildInchildNodeLayoutInput("doi", "btnDoi1"),
            [cc.SicBoGateDoi[2]]: this.getChildInchildNodeLayoutInput("doi", "btnDoi2"),
            [cc.SicBoGateDoi[3]]: this.getChildInchildNodeLayoutInput("doi", "btnDoi3"),
            [cc.SicBoGateDoi[4]]: this.getChildInchildNodeLayoutInput("doi", "btnDoi4"),
            [cc.SicBoGateDoi[5]]: this.getChildInchildNodeLayoutInput("doi", "btnDoi5"),
            [cc.SicBoGateDoi[6]]: this.getChildInchildNodeLayoutInput("doi", "btnDoi6"),

            [cc.SicBoGateBaoRandom]: this.getChildInchildNodeLayoutInput("bao", "btnBao"),
            [cc.SicBoGateBao[1]]: this.getChildInchildNodeLayoutInput("bao", "btnBao1"),
            [cc.SicBoGateBao[2]]: this.getChildInchildNodeLayoutInput("bao", "btnBao2"),
            [cc.SicBoGateBao[3]]: this.getChildInchildNodeLayoutInput("bao", "btnBao3"),
            [cc.SicBoGateBao[4]]: this.getChildInchildNodeLayoutInput("bao", "btnBao4"),
            [cc.SicBoGateBao[5]]: this.getChildInchildNodeLayoutInput("bao", "btnBao5"),
            [cc.SicBoGateBao[6]]: this.getChildInchildNodeLayoutInput("bao", "btnBao6"),


            [cc.SicBoGateTong[4]]: this.getChildInchildNodeLayoutInput("tong", "btnTong4"),
            [cc.SicBoGateTong[5]]: this.getChildInchildNodeLayoutInput("tong", "btnTong5"),
            [cc.SicBoGateTong[6]]: this.getChildInchildNodeLayoutInput("tong", "btnTong6"),
            [cc.SicBoGateTong[7]]: this.getChildInchildNodeLayoutInput("tong", "btnTong7"),
            [cc.SicBoGateTong[8]]: this.getChildInchildNodeLayoutInput("tong", "btnTong8"),
            [cc.SicBoGateTong[9]]: this.getChildInchildNodeLayoutInput("tong", "btnTong9"),
            [cc.SicBoGateTong[10]]: this.getChildInchildNodeLayoutInput("tong", "btnTong10"),
            [cc.SicBoGateTong[11]]: this.getChildInchildNodeLayoutInput("tong", "btnTong11"),
            [cc.SicBoGateTong[12]]: this.getChildInchildNodeLayoutInput("tong", "btnTong12"),
            [cc.SicBoGateTong[13]]: this.getChildInchildNodeLayoutInput("tong", "btnTong13"),
            [cc.SicBoGateTong[14]]: this.getChildInchildNodeLayoutInput("tong", "btnTong14"),
            [cc.SicBoGateTong[15]]: this.getChildInchildNodeLayoutInput("tong", "btnTong15"),
            [cc.SicBoGateTong[16]]: this.getChildInchildNodeLayoutInput("tong", "btnTong16"),
            [cc.SicBoGateTong[17]]: this.getChildInchildNodeLayoutInput("tong", "btnTong17"),

            [cc.SicBoGateCap[12]]: this.getChildInchildNodeLayoutInput("doiTong", "btnDoiTong12"),
            [cc.SicBoGateCap[13]]: this.getChildInchildNodeLayoutInput("doiTong", "btnDoiTong13"),
            [cc.SicBoGateCap[14]]: this.getChildInchildNodeLayoutInput("doiTong", "btnDoiTong14"),
            [cc.SicBoGateCap[15]]: this.getChildInchildNodeLayoutInput("doiTong", "btnDoiTong15"),
            [cc.SicBoGateCap[16]]: this.getChildInchildNodeLayoutInput("doiTong", "btnDoiTong16"),
            [cc.SicBoGateCap[23]]: this.getChildInchildNodeLayoutInput("doiTong", "btnDoiTong23"),
            [cc.SicBoGateCap[24]]: this.getChildInchildNodeLayoutInput("doiTong", "btnDoiTong24"),
            [cc.SicBoGateCap[25]]: this.getChildInchildNodeLayoutInput("doiTong", "btnDoiTong25"),
            [cc.SicBoGateCap[26]]: this.getChildInchildNodeLayoutInput("doiTong", "btnDoiTong26"),
            [cc.SicBoGateCap[34]]: this.getChildInchildNodeLayoutInput("doiTong", "btnDoiTong34"),
            [cc.SicBoGateCap[35]]: this.getChildInchildNodeLayoutInput("doiTong", "btnDoiTong35"),
            [cc.SicBoGateCap[36]]: this.getChildInchildNodeLayoutInput("doiTong", "btnDoiTong36"),
            [cc.SicBoGateCap[45]]: this.getChildInchildNodeLayoutInput("doiTong", "btnDoiTong45"),
            [cc.SicBoGateCap[46]]: this.getChildInchildNodeLayoutInput("doiTong", "btnDoiTong46"),
            [cc.SicBoGateCap[56]]: this.getChildInchildNodeLayoutInput("doiTong", "btnDoiTong56"),

            [cc.SicBoGateDon[1]]: this.getChildInchildNodeLayoutInput("don", "btnDon1"),
            [cc.SicBoGateDon[2]]: this.getChildInchildNodeLayoutInput("don", "btnDon2"),
            [cc.SicBoGateDon[3]]: this.getChildInchildNodeLayoutInput("don", "btnDon3"),
            [cc.SicBoGateDon[4]]: this.getChildInchildNodeLayoutInput("don", "btnDon4"),
            [cc.SicBoGateDon[5]]: this.getChildInchildNodeLayoutInput("don", "btnDon5"),
            [cc.SicBoGateDon[6]]: this.getChildInchildNodeLayoutInput("don", "btnDon6"),
        }
        //Btn Bet
        this.btnBetX2 = this.nodeBetX2.getComponent(cc.Button);
        this.btnBetAgain = this.nodeBetAgain.getComponent(cc.Button);
        this.resetUserBets();        
		this.controller.setIsNan(false);
    },

    resetUserBets: function () {
        for (let i = 1; i <= 52; i++) {
            const item = this.gateBets[i];
            const userBet = item.getChildByName("userBet");
            const value = userBet.getChildByName("value");
            value.getComponent(cc.Label).string = "";
            userBet.active = false;
        }
		this.enableBetAgain(true);
    },

    getChildInNodeLayoutInput: function (name) {
        return this.nodeLayoutInput.getChildByName(name);
    },

    getChildInchildNodeLayoutInput: function (name, childName) {
        const doi = this.getChildInNodeLayoutInput(name);

        return doi.getChildByName(childName);
    },
		
    //Bet lai
    onBetAgain: function (sender, unit) {
		unit = parseInt(unit); //He so bet
        let logBet = this.controller.getBetLogBySessionID(this.controller.getBetLogSession());
        if (logBet.length === 0) {
			cc.PopupController.getInstance().showMessage("Chưa có dữ liệu của phiên trước.")
            return;
		}
		let currLog = this.getLogBetInfo(unit);
        currLog.map((betData, index) => {
        let timeOut = setTimeout(function () {
			if (this.controller.getCurrentState() === cc.SicBoState.Betting && betData.sessionID === this.controller.getBetLogSession() - 1) {
            this.sendRequestBet(betData.value, betData.betSide);
            } else {
				try {
					clearTimeout(timeOut);
                } catch (e) {
					console.log(e);
                }
           }
        }.bind(this), index * 100);
		}, this);
        this.disableBetAgain(true);
	},

        //Lay thong tin lich su bet
        getLogBetInfo: function (unit) {
            let logBet = this.controller.getBetLogBySessionID(this.controller.getBetLogSession());
            let listSide = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52];
            let dataLogSide = [];

            //Map thong tin log bet cac cua bet
            if (logBet.length > 0) {
                listSide.map(side => {
                    dataLogSide[side] = logBet.filter(betData => betData.betSide == side);
                }, this);
            }

            //Tinh toan chip tung cua bet
            let finalLog = [];

            //Test Total
            dataLogSide.map((logSide) => {
                if (logSide.length > 0) {
                    let bet = this.calcLogBet(logSide, unit);
                    finalLog.push(...bet);
                }
            }, this);

            return finalLog;
        },
        //Tinh tong tien bet cua tung cua
        getTotalMoneyBetSide: function (logsBetSide, unit) {
            let totalMoney = 0;
            logsBetSide.map(betData => {
                totalMoney += parseInt(betData.value);
            }, this);
            return totalMoney * unit;
        },
        //Tinh toan luot bet
        calcLogBet: function (logsBetSide, unit) {

            let listChip = [5000000, 10000000, 5000000, 1000000, 500000, 100000, 50000, 10000, 5000, 1000];
            let totalMoney = this.getTotalMoneyBetSide(logsBetSide, unit);
            let listCalc = [];

            // Duyet tung chip trong danh sach chip
            for (let i in listChip) {
                let chip = listChip[i];
                // So luong chip tuong ung voi tong tien hien tai
                let countBets = Math.floor(totalMoney / chip);
                // Tinh toan so luong chip con lai tuong ung voi so tien con lai
                totalMoney -= countBets * chip;
                // gan chip vao list
                listCalc.push([chip, countBets]);
            }
            // Lay chip co so luong > 0
            let listLogBet = listCalc.filter(chip => chip[1] !== 0);

            //Chuyen data sang thong tin bet
            let logsBet = [];
            listLogBet.map(chipItem => {
                let countBets = chipItem[1];
                let value = chipItem[0];
                for (let i = 0; i < countBets; i++) {
                    logsBet.push({value: value, betSide: logsBetSide[0].betSide, sessionID: logsBetSide[0].sessionID});
                }
            }, this);
            return logsBet;
        },
		
    //Disable button bet lai, bet x2
    disableBetAgain: function (isDisable) {
		this.btnBetAgain.interactable = !isDisable;
        this.btnBetX2.interactable = !isDisable;
    },
	
	enableBetAgain: function (isEnable) {
		this.btnBetX2.interactable = isEnable;
		this.btnBetAgain.interactable = isEnable;
	},

	
    playAnimationWin: function (sideWin) {
        this.gateBets[sideWin].getChildByName("win").active = true;
        this.sideWins.push(sideWin);
    },

    stopAnimationWin: function () {
        this.sideWins.forEach(sideWin =>
            this.gateBets[sideWin].getChildByName("win").active = false
        );

        this.sideWins = [];
    },

    onBetClick: function (sender, betSide) {
		this.disableBetAgain(true);
        this.onBet(betSide);
    },
    //onBet dat cua
    onBet: function (betValue, betSide) {
        this.betValue = betValue;
        this.disableBetAgain(true);
        cc.AudioController.getInstance().playSound(cc.AudioTypes.CHIP_BET);
        //Gui request bet
        this.sendRequestBet(this.betValue, betSide);
    },
    //Update betValue
    updateTotalUserBetSide: function (betSide, totalBet) {
        betSide = parseInt(betSide);
        this.enableUserBet(betSide);
        let label = this.getLabelTotalBetBySide(betSide);
        label.string = this.controller.nFormatter(totalBet);
    },
    //HubOn betOfAccount
    updateBetOfAccount: function (data) {
		console.log(data);
        data.map(betSide => {
            if (betSide.BetValue > 0) {
                let side = parseInt(betSide.BetSide);
                this.enableUserBet(side);
                let label = this.getLabelTotalBetBySide(side);
                label.label.string = this.controller.nFormatter(betSide.BetValue);
            }
        });
    },
	
    enableUserBet: function (betSide) {
        const gateBet = this.gateBets[betSide];
        const userBet = gateBet.getChildByName("userBet");
        userBet.active = true;
    },
	
    getLabelTotalBetBySide: function (betSide) {
        const gateBet = this.gateBets[betSide];
        const userBet = gateBet.getChildByName("userBet");
        const valueUserBet = userBet.getChildByName("value").getComponent(cc.Label);

        return valueUserBet;
    },

    updateTotalBet: function (data) {
        this.setStringValue(this.lbTotalUserBetDeer, data.TotalBetDeer);
        this.setStringValue(this.lbTotalUserBetGourd, data.TotalBetGourd);
        this.setStringValue(this.lbTotalUserBetRooster, data.TotalBetChicken);
        this.setStringValue(this.lbTotalUserBetFish, data.TotalBetFish);
        this.setStringValue(this.lbTotalUserBetCrab, data.TotalBetCrab);
        this.setStringValue(this.lbTotalUserBetLobster, data.TotalBetShrimp);
    },
	
    setStringValue: function (label, strNum) {
        label.string = strNum === 0 ? "" : cc.Tool.getInstance().formatNumber(strNum);
    },
	
    sendRequestBet: function (betValue, betSide) {
        return this.controller.sendRequestOnHub(cc.MethodHubName.BET, betValue, betSide);
    },

	setSpriteBtnNan: function () {
		this.spriteBtnNan.spriteFrame = this.controller.getSfNan(this.getIsNan());
    },
	
    onNanClick: function () {
		this.controller.setIsNan(!this.getIsNan());
        this.setSpriteBtnNan();
	},
	
    getIsNan: function () {
		return this.controller.getIsNan();
	}
});
