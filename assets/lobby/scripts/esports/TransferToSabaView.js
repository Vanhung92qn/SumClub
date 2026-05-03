// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
(function () {
    cc.TransferToSabaView  = cc.Class({
        extends: cc.Component,
        properties: {
            lbCoin: cc.Label,
            lbCoinNhan: cc.Label,
            lbCoinChuyen: cc.Label,
            lbCoinHoan: cc.Label,
            lbNameG63: cc.Label,
            lbNameGame: cc.Label,
            editBoxCoin: cc.EditBox,
            _status:1,
            _game:"G63",
            _esports:"SabaEsports",
            _links:null
        },

        // LIFE-CYCLE CALLBACKS:

         onLoad () {
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.Config.getInstance().getZINDEX();
           
         },

        start () {
            this._rate = 0.00083;
            this._fee = 0;
            this._loading = false;
            this._status = 1;
            this._links = {};
            this._gamePlay = "Saba";
            this.lbNameG63.string = this._game;
            this.lbNameGame.string = this._esports;
         
           
            this.loadAccountInfo();
        },
        hideBusy(){
            this._step--;
            if(this._step <= 0){
                cc.PopupController.getInstance().hideBusy();
            }
        },
        showBusy(step){
            this._step = step;
            cc.PopupController.getInstance().showBusy();
        },
        loadAccountInfo(){
           
            this.showBusy(2);
            
            var EsportsAccountInfoCommand = new cc.EsportsAccountInfoCommand;
            EsportsAccountInfoCommand.execute(this);
            var EsportsLinkCommand = new cc.EsportsLinkCommand;
            EsportsLinkCommand.execute(this);
        },
        onTransactionResponseError(response){
            this._loading = false;
          
            cc.PopupController.getInstance().showMessageError(response.Message);
            this.hideBusy();

        },
        onTransactionResponse(response){
           
            this._loading = false;
            if(response.ResponseCode == 1){
                this.lbCoin.string = response.EsportBalance;
                cc.BalanceController.getInstance().updateBalance(response.Balance);
            }
            cc.PopupController.getInstance().showMessage(response.Message);
            this.hideBusy();
        },
        onGetLinkResponse: function (response) {
      
            this.hideBusy();
            this._links['Sabe'] = {
                d : response['SabeLink'][0],
                m : response['SabeLink'][0],
            };
            this._links['Casino'] = {
                d : response['CasinoLink'][0],
                m : response['CasinoLink'][0],
            }

            // if (response.Message) {
            //     cc.PopupController.getInstance().showMessage(response.Message);
            // } else {
            //     cc.PopupController.getInstance().showMessage('Nhập Giftcode thành công');
            // }
            // cc.LobbyController.getInstance().refreshAccountInfo();

            // this.resetInput();
            // this.getCaptcha();

            // if (response.GiftCodeAmount) {
            //     cc.DDNA.getInstance().applyGiftcode(response.GiftCodeAmount, this.gc);
            // }
        },
        onGetLinkResponseError: function (response) {
         
            this.hideBusy();
            cc.PopupController.getInstance().showMessageError(response.Message);
           // cc.PopupController.getInstance().showMessageError(response.Message, response.ResponseCode);
           // this.getCaptcha();
        },
        onGetAccountInfoResponse: function (response) {
        
            this.lbCoin.string = response.SabeCoin;
            this.hideBusy();
            if(cc.BalanceController.getInstance().getBalance() <= 0){
                cc.PopupController.getInstance().showMessageError('Không đủ số dư từ ví G63. Số tiền chuyển ví 100K G trở lên');
            }

            // if (response.Message) {
            //     cc.PopupController.getInstance().showMessage(response.Message);
            // } else {
            //     cc.PopupController.getInstance().showMessage('Nhập Giftcode thành công');
            // }
            // cc.LobbyController.getInstance().refreshAccountInfo();

            // this.resetInput();
            // this.getCaptcha();

            // if (response.GiftCodeAmount) {
            //     cc.DDNA.getInstance().applyGiftcode(response.GiftCodeAmount, this.gc);
            // }
        },

        onGetAccountInfoResponseError: function (response) {
         
            this.hideBusy();
            cc.PopupController.getInstance().showMessageError(response.Message);
           // cc.PopupController.getInstance().showMessageError(response.Message, response.ResponseCode);
           // this.getCaptcha();
        },
        onClickPlay(){
            if(parseInt(this.lbCoin.string)<=0){
                cc.PopupController.getInstance().showMessageError('Số tiền của bạn trong Ví không đủ chơi game!');
                return;
            }
            this.showBusy(1);
            cc.sys.openURL(this._links['Sabe'].d);
           // this.closeClicked();
            var EsportsLinkCommand = new cc.EsportsLinkCommand;
            EsportsLinkCommand.execute(this);
        },
        onClickTransfer(){
            if(this._loading){
                cc.PopupController.getInstance().showMessageError("Thao tác quá nhanh");
                return;
            }
            var coin = parseInt(this.lbCoin.string);
            var amount = this.editBoxCoin.string;
            if ( amount == 0) {
                cc.PopupController.getInstance().showMessageError('Nhập số tiền cần Giao dịch');
                return;
            }
            if( this.lbNameG63.string ==  this._game){
                if ( amount > cc.BalanceController.getInstance().getBalance()) {
                    cc.PopupController.getInstance().showMessageError('Số tiền của bạn trong Game không đủ để thực hiện giao dịch');
                    return;
                }
            }else{
                if ( amount > coin) {
                    cc.PopupController.getInstance().showMessageError('Số tiền của bạn trong ví không đủ để thực hiện giao dịch');
                    return;
                }
            }
            this.amount = amount;
            this.wallet = this._esports;
            this.type =  this.lbNameG63.string == this._game && this.lbNameGame.string == this._esports?"Deposit":"Withdrawal";
            this._loading = true;
            var EsportsTransactionCommand = new cc.EsportsTransactionCommand;
            this.showBusy(1);
            
            EsportsTransactionCommand.execute(this);
        },
        onSwitch(){
            if( this.lbNameG63.string ==  this._game){
                this.lbNameG63.string = this._esports;
                this.lbNameGame.string = this._game;
            }else{
                this.lbNameG63.string = this._game;
                this.lbNameGame.string = this._esports;
            }
            this.calculator((this.editBoxCoin.string));
        },
        
        onEnable: function () {
            this.animation.play('openPopup');
           
        },

        onDestroy: function () {
            if (cc.sys.isNative) {
                cc.loader.releaseResDir('eports/prefabs');
            }
        },
        closeClicked: function () {
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LobbyController.getInstance().destroyDynamicView(cc.GameId.ESPORTS);
            }, this, 1, 0, delay, false);
        },
        calculator: function(coin){

            coin = parseFloat(coin); 

            if(isNaN(coin)) coin = 0;
             if(this.lbNameG63.string ==  this._game){
                var c =  coin *this._rate;
                
                this.lbCoinNhan.string = cc.Tool.getInstance().formatNumber(parseInt(c));   
                this.lbCoinChuyen.string = cc.Tool.getInstance().formatNumber(coin+coin*this._fee); 
                this.lbCoinHoan.string =  cc.Tool.getInstance().formatNumber(Math.round((c - parseInt(c))/this._rate));   
             }else{
                var c =  coin/this._rate;  
              
                this.lbCoinNhan.string = cc.Tool.getInstance().formatNumber(parseInt(c));   
                this.lbCoinChuyen.string = cc.Tool.getInstance().formatNumber(coin); 
                
                this.lbCoinHoan.string =  cc.Tool.getInstance().formatNumber((Math.floor(c - parseInt(c)).toFixed(2)));  
             }

            
        },
        onEditDidBegan: function(editbox, customEventData) {
             
            
            this.calculator((editbox.string));
            // The editbox here is a cc.EditBox object.
            // The customEventData parameter here is equal to the "foobar" you set earlier.
        },
        // Suppose this callback is for the editingDidEnded event.
        onEditDidEnded: function(editbox, customEventData) {
            
            this.calculator((editbox.string));
            // The editbox here is a cc.EditBox object.
            // The customEventData parameter here is equal to the "foobar" you set earlier.
        },
        // Suppose this callback is for the textChanged event.
        onTextChanged: function(text, editbox, customEventData) {
             
            this.calculator((editbox.string));
            // The text here indicates the text content of the modified EditBox.
            // The editbox here is a cc.EditBox object.
            // The customEventData parameter here is equal to the "foobar" you set earlier.
        },
        // Suppose this callback is for the editingReturn event.
        onEditingReturn: function(editbox,  customEventData) {
          
            this.calculator((editbox.string));
            // The editbox here is a cc.EditBox object.
            // The customEventData parameter here is equal to the "foobar" you set earlier.
        },
        onScale: function() {
            if (!this.isScale) {
                this.isScale = true;
                this.nodeScale.scaleX = 1.0;
                this.nodeScale.scaleY = 1.0;
            } else {
                this.isScale = false;
                this.nodeScale.scaleX = 0.8;
                this.nodeScale.scaleY = 0.8;
            }
        }
        // update (dt) {},
    });
}).call(this);