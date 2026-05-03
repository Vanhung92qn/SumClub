(function () {
    var LodeController;
    LodeController = (function () {
        var instance;

        function LodeController() {
        }

        instance = void 0;

        LodeController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        // Cap nhat game theo HubOn
        //LodeView
        LodeController.prototype.setLodeView = function (view) {
            return (this.LodeView = view);
        };
        LodeController.prototype.setLodeResultView = function (view) {
            return (this.LodeResultView = view);
        };
        //Hien thi ket qua
        LodeController.prototype.updateDataResult = function (data) {
            return this.LodeResultView.updateDataResult(data);
        };
        //ChooseView
        LodeController.prototype.setChooseView = function (view) {
            return (this.chooseView = view);
        };
        LodeController.prototype.showTitleChooseNumber = function () {
            return this.chooseView.showTitleChooseNumber();
        };
        LodeController.prototype.hideTitleChooseNumber = function () {
            return this.chooseView.hideTitleChooseNumber();
        };
        LodeController.prototype.isMaxChoose = function () {
            return this.chooseView.isMaxChoose();
        };
        //TabView
        LodeController.prototype.setLodeTabView = function (view) {
            return this.LodeTabView = view;
        };
        LodeController.prototype.updateListBetted = function(betItem) {
            return this.LodeTabView.updateListBetted(betItem);
        };
        LodeController.prototype.updateListBetting = function(betItem) {
            return this.LodeTabView.updateListBetting(betItem);
        };
        LodeController.prototype.fillDataBetted = function (data) {
            return this.LodeTabView.fillDataBetted(data);
        };
        LodeController.prototype.fillDataBetting = function (data) {
            return this.LodeTabView.fillDataBetting(data);
        };

        LodeController.prototype.sendRequestOnHub = function (method, gateId, amount, betData) {
            if (this.LodeView)
                return this.LodeView.sendRequestOnHub(method, gateId, amount, betData);
        };
        LodeController.prototype.initNumberChooses = function () {
            return this.numberChoose = [];
        };
        LodeController.prototype.getNumberChooses = function () {
            return this.numberChoose;
        };
        LodeController.prototype.setNumberChooses = function (number) {
            return this.numberChoose.push(number);
        };
        LodeController.prototype.unChooseNumber = function (number) {
            return (this.numberChoose = this.numberChoose.filter(nb => nb != number));
        };
        LodeController.prototype.popNumberChoose = function () {
            if (this.numberChoose && this.numberChoose.length > 0) {
                return this.numberChoose.pop();
            }
        };
        LodeController.prototype.isValidNumberBetOfType = function (number) {
            return this.chooseView.isValidNumberBetOfType();
        };

        LodeController.prototype.unChooseNumberBefore = function () {
            return this.chooseView.unChooseNumberBefore();
        };

        //Loai Bet
        LodeController.prototype.setTypeBet = function (type) {
            return (this.typeBet = type);
        };
        LodeController.prototype.getTypeBet = function () {
            return this.typeBet;
        };
        LodeController.prototype.setCurrDateResult = function (date) {
            this.currentDateResult = date;
        };
        LodeController.prototype.getCurrentDateResult = function () {
            return this.currentDateResult;
        };
        LodeController.prototype.setOpenDate = function (date) {
            this.openDate = date;
        };
        LodeController.prototype.getOpenDate = function () {
            return this.openDate;
        };
        LodeController.prototype.setCurrPharse = function (pharse) {
            return this.currPharse = pharse;
        };
        LodeController.prototype.getCurrPharse = function () {
            return this.currPharse;
        };
        return LodeController;
    })();
    cc.LodeController = LodeController;
}.call(this));
