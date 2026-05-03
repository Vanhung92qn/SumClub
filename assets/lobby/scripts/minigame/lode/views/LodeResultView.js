(function () {
    cc.LodeResultView = cc.Class({
        extends: cc.Component,
        properties: {
            lbTitle: cc.Label,
			lbChanel: cc.Label,
            lbTimer: cc.Label,
            lbGDB: cc.Label,
            lbG1: cc.Label,
            lbG2: [cc.Label],
            lbG3: [cc.Label],
            lbG4: [cc.Label],
            lbG5: [cc.Label],
            lbG6: [cc.Label],
            lbG7: [cc.Label],
            btnPrevResult: cc.Button,
            btnNextResult: cc.Button,
            colorWait: cc.Color,
            colorBet: cc.Color,
            lbNotifyTimeWait: cc.Label
        },
        onLoad: function () {
            this.controller = cc.LodeController.getInstance();
            this.controller.setLodeResultView(this);
            this.fixTime = null;
            let self = this;
            this.clearResult();
            self.updateTimeCount();
            this.interval = setInterval(function () {
                self.updateTimeCount();
            }, 1000);
        },
        onEnable: function () {
            this.dayAgo = 0;
        },
        onDestroy: function () {
            try {
                clearInterval(this.interval);
            } catch (e) {
                console.log(e);
            }
        },
        updateTimeCount: function () {			
            if (!this.fixTime) {
                return;
            }

            this.fixTime--;
            if(this.fixTime <= 0) {
                this.fixTime = 0;
            }
            let msec = this.fixTime * 1000;
            let hh = Math.floor(msec / 1000 / 60 / 60);
            msec -= hh * 1000 * 60 * 60;
            let mm = Math.floor(msec / 1000 / 60);
            msec -= mm * 1000 * 60;
            let ss = Math.floor(msec / 1000);
            msec -= ss * 1000;

            hh = hh < 10 ? "0" + hh : hh;
            mm = mm < 10 ? "0" + mm : mm;
            ss = ss < 10 ? "0" + ss : ss;

            this.lbTimer.string = `${hh}:${mm}:${ss}`;
        },
        updateDataResult: function (data) {
            this.currPharse = parseInt(data.Phrase);
            this.controller.setCurrPharse(this.currPharse);
            this.fixTime = parseInt(data.Elapsed);
            this.updateUITimer();
            let result = data.Result;
            try {
                //Format currentDateResult
                //dd/mm/yyyy --> mm/dd/yyyy
                let lstDate = result.DateResult.split("/");
                let strFormatDate = `${lstDate[1]}/${lstDate[0]}/${lstDate[2]}`;
                this.controller.setCurrDateResult(new Date(strFormatDate));
                this.setResultUI(result);
            } catch (e) {
                let setCurrDateResult = new Date(data.OpenDate);
                setCurrDateResult.setDate(setCurrDateResult.getDate() - 1);
                this.controller.setCurrDateResult(setCurrDateResult);
                this.setResultUI(result);
            }

            this.controller.setOpenDate(new Date(data.OpenDate));

        },
        updateUITimer: function () {
            let color = this.colorBet;
            let strNotifyTime = "Thời gian còn lại:";
            if (this.currPharse === cc.LodePharse.WAITING) {
                color = this.colorWait;
                strNotifyTime = "Thời gian chờ:"
            }
            this.lbNotifyTimeWait.string = strNotifyTime;
            this.lbNotifyTimeWait.node.color = color;
            this.lbTimer.node.color = color;
        },

        //Hien thi ket qua ra UI
        setResultUI: function (result) {
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth() + 1;
			var yyyy = today.getFullYear();
			var today = dd + '-' + mm;
            let strTile = "XSMB ";
            if (result.DateResult && result.DateResult.length > 0) {
                strTile += result.DateResult;
            }else {
                strTile+= cc.Tool.getInstance().formatDate(cc.LodeController.getInstance().getCurrentDateResult());
            }
			let strChanel = today;
            this.lbTitle.string = strTile;
			this.lbChanel.string = strChanel;
            //DB
            let specialPrizeData = result.SpecialPrizeData;
            //G1
            let firstPrizeData = result.FirstPrizeData;
            //G2
            let secondPrizeData = result.SecondPrizeData;
            //G3
            let thirdPrizeData = result.ThirdPrizeData;
            //G4
            let fourthPrizeData = result.FourthPrizeData;
            //G5
            let fifthPrizeData = result.FifthPrizeData;
            //G6
            let sixthPrizeData = result.SixthPrizeData;
            //G7
            let seventhPrizeData = result.SeventhPrizeData;
            if (result) {
                this.lbGDB.string = (specialPrizeData) ? specialPrizeData : "";
                this.lbG1.string = (firstPrizeData) ? firstPrizeData : "";

                this.mapResultPrizeToUI(secondPrizeData, this.lbG2);
                this.mapResultPrizeToUI(thirdPrizeData, this.lbG3);
                this.mapResultPrizeToUI(fourthPrizeData, this.lbG4);
                this.mapResultPrizeToUI(fifthPrizeData, this.lbG5);
                this.mapResultPrizeToUI(sixthPrizeData, this.lbG6);
                this.mapResultPrizeToUI(seventhPrizeData, this.lbG7);

            }else {
                this.clearResult();
            }
        },
        //Map lb ket qua
        mapResultPrizeToUI: function (dataPrizes, lbPrizes) {
            lbPrizes.map((lb, index) => {
                lb.string = (dataPrizes) ? dataPrizes.split(",")[index] : "";
            });
        },
        //Xem ket qua ngay trc
        getPreviousResult: function () {
            this.dayAgo--;
            this.checkActiveBtnViewHistory();
            this.getHistoryResult(-1);
        },
        //Xem ket qua ngay tiep theo
        getNextResult: function () {
            this.dayAgo++;
            this.checkActiveBtnViewHistory();
            this.getHistoryResult(1);
        },
        //Xu ly click xem ket qua
        checkActiveBtnViewHistory: function () {
            this.btnNextResult.interactable = true;
            this.btnNextResult.node.opacity = 255;
            this.btnPrevResult.interactable = true;
            this.btnPrevResult.node.opacity = 255;
            //Cho phep click xem 1 ngay tiep theo
            if (this.dayAgo >= 1) {
                this.dayAgo = 1;
                //deactive next
                this.btnNextResult.interactable = false;
                this.btnNextResult.node.opacity = 150;
            }
            //Cho phep click xem ket qua 7 ngay trc
            if (this.dayAgo <= -7) {
                this.dayAgo = -7;
                this.btnPrevResult.interactable = false;
                this.btnPrevResult.node.opacity = 150;
            }
        },
        //Goi service xem ket qua
        //Params direct: xem ngay hom trc (-1) / ngay hom sau (1)
        getHistoryResult: function (direct) {
            let sessionResultCommand = new cc.LodeGetSessionResultCommand();
            let currentDateResult = new Date(this.controller.getCurrentDateResult());
            let date = currentDateResult.getDate();
            //direct -1: ngay hom truoc
            //diect 1: ngay tiep theo
            currentDateResult.setDate(date + direct);
            this.controller.setCurrDateResult(currentDateResult);
            let day = cc.Tool.getInstance().formatDate(currentDateResult);
            this.lbTitle.string = "XSMB " + day;
            let openDate = `${currentDateResult.getMonth() +
            1}-${currentDateResult.getDate()}-${currentDateResult.getFullYear()}`;
            sessionResultCommand.execute(this, openDate);
        },
        //API response ket qua
        onGetHistoryResponse: function (result) {
            try {
                if (result) {
                    this.setResultUI(result);
                } else {
                    this.clearResult();
                }
            } catch (e) {
                this.clearResult();
            }
        },
        //Reset view UI lb ket qua
        clearResult: function () {
            this.lbGDB.string = "";
            this.lbG1.string = "";
            this.mapResultPrizeToUI(null, this.lbG2);
            this.mapResultPrizeToUI(null, this.lbG3);
            this.mapResultPrizeToUI(null, this.lbG4);
            this.mapResultPrizeToUI(null, this.lbG5);
            this.mapResultPrizeToUI(null, this.lbG6);
            this.mapResultPrizeToUI(null, this.lbG7);
        }
    });
}.call(this));
