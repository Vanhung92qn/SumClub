(function () {
    cc.LodeTabView = cc.Class({
        extends: cc.Component,
        properties: {

            btnNodeBetted: cc.Node,
            btnNodeBetting: cc.Node,
			btnNodeResult:	cc.Node,

            nodeBetted: cc.Node,
            nodeBetting: cc.Node,
			nodeResult:	cc.Node,

            itemTemplate: cc.Prefab,
            contentBetted: cc.Node,
            contentBetting: cc.Node
        },
        onLoad: function () {
            this.controller = cc.LodeController.getInstance();
            this.controller.setLodeTabView(this);
            this.nodeBettedActive = this.btnNodeBetted.getChildByName('active');
            this.nodeBettedDeActive = this.btnNodeBetted.getChildByName('deactive');
            this.nodeBettingActive = this.btnNodeBetting.getChildByName('active');
            this.nodeBettingDeActive = this.btnNodeBetting.getChildByName('deactive');
			this.nodeResultActive = this.btnNodeResult.getChildByName('active');
			this.nodeResultDeActive = this.btnNodeResult.getChildByName('deactive');
        },
        onEnable: function () {
            this.bettingOnDayCommand = new cc.LodeBettingOnDayCommand();
            this.isEnableBetted = true;
            this.onReloadDataBetting();
        },
        enableNodeBetted: function (enable) {
            this.isEnableBetted = enable;
            this.nodeBetted.active = enable;
            this.nodeBetting.active = !enable;
			this.nodeResult.active = !enable;

            this.nodeBettedActive.active = enable;
            this.nodeBettedDeActive.active = !enable;

            this.nodeBettingActive.active = !enable;
            this.nodeBettingDeActive.active = enable;

            this.nodeResultActive.active = !enable;
            this.nodeResultDeActive.active = enable;
        },
		
        enableNodeResult: function (enable) {
            this.nodeBetted.active = !enable;
            this.nodeBetting.active = !enable;
			this.nodeResult.active = enable;

            this.nodeBettedActive.active = !enable;
            this.nodeBettedDeActive.active = enable;

            this.nodeBettingActive.active = !enable;
            this.nodeBettingDeActive.active = enable;

            this.nodeResultActive.active = enable;
            this.nodeResultDeActive.active = !enable;
        },
		
		enableNodeBetting: function (enable) {
            this.nodeBetted.active = !enable;
            this.nodeBetting.active = enable;
			this.nodeResult.active = !enable;

            this.nodeBettedActive.active = !enable;
            this.nodeBettedDeActive.active = enable;

            this.nodeBettingActive.active = enable;
            this.nodeBettingDeActive.active = !enable;

            this.nodeResultActive.active = !enable;
            this.nodeResultDeActive.active = enable;
        },
		
        fillDataBetted: function (data) {
            //Loai - So Tien
            //reverse list
            data = data.reverse();
            data.map(betItem => {
                this.initItemBettedUI(betItem);
            }, this);
        },
        updateListBetted: function (betItem) {
            try {
                this.contentBetted.removeAllChildren();
            } catch (e) {

            }
            this.initItemBettedUI(betItem);
        },
        updateListBetting: function (betItem) {
            this.initItemBettingUI(betItem);
        },
        onGetBettingOnDayResponse: function (data) {
            if (data) {
                data = data.reverse();
                this.contentBetting.removeAllChildren();
                data.map(betItem => {
                    this.initItemBettingUI(betItem);
                }, this)
            }
        },
        //Khoi tao item UI cho tab da dat
        initItemBettedUI: function (betItem) {
            let item = cc.instantiate(this.itemTemplate);
            let richText = item.getComponent(cc.RichText);
            let totalBet = cc.Tool.getInstance().formatNumber(betItem.TotalBetValue);//cc.Tool.getInstance().formatNumberK(betItem.TotalBetValue);
            let dateBet = betItem.CreatedDateFm;
            richText.string = `Đặt <color=#FCFE03>${totalBet} ${betItem.GateName} </color><color=#22F0FF>(${betItem.BetData})</c> - ${dateBet}</color>`;
            item.parent = this.contentBetted;
        },
        //Khoi tao item UI cho tab dang dat
        initItemBettingUI: function (betItem) {
            let item = cc.instantiate(this.itemTemplate);
            let richText = item.getComponent(cc.RichText);
            let totalBet = cc.Tool.getInstance().formatNumber(betItem.TotalBetValue);//cc.Tool.getInstance().formatNumberK(betItem.TotalBetValue);
            let dateBet = betItem.CreatedDateFm;
            let displayName = betItem.DisplayName;

            richText.string = `<color=#FCFE03>${displayName}</c> đặt cược <color=#FCFE03>${totalBet} ${betItem.GateName}</c> <color=#22F0FF>(${betItem.BetData})</c> - ${dateBet}</color>`;
            item.parent = this.contentBetting;
        },
        //Cap nhat danh sach
        updateListBetting: function (data) {
            this.initItemBettingUI(data);
        },
        //Hien thi tab da dat
        onReloadDataBetted: function () {
            this.enableNodeBetted(true);
        },
        //Hien thi tab dang dat
        onReloadDataBetting: function () {
			this.enableNodeBetting(true);
            this.bettingOnDayCommand.execute(this, cc.LodeBettingType.BETTING);
        },
		//Hien thi tab ket qua
        onLoadResult: function () {
			this.enableNodeResult(true);
        }
    });
}).call(this);
