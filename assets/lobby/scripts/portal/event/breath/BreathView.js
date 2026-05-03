/**
 * Created by Welcome on 4/18/2019.
 */

(function () {
    cc.BreathView = cc.Class({
        "extends": cc.TabEventView,
        properties: {
            //list nguoi choi trong TOP
            eventListView: cc.BreathListView,
            //phan thuong hien tai cua user
            // lbReward: cc.Label,
            // lbValue: cc.Label,
            // lbRank: cc.Label,

            // //menu chon game
            // menuGameView: cc.BreathMenuGameView,
            // //menu chon hu
            // menuJackpotView: cc.BreathMenuJackpotView,

            //ngay thang + day dang chon
            // lbGameValue: cc.Label,
            //Time dang chon
            // lbJackpotValue: cc.Label,

            //animation menu
            // animationMenuGame: cc.Animation,
            // animationMenuJackpot: cc.Animation,
        },

        onLoad: function () {
            this.isShowSelectBox = false;
            this.isShowSelectBoxTime = false;

            this.searchBoxs = null;
        },

        onEnable: function () {
            //reset scale
            // this.animationMenuGame.node.scaleY = 0;

            //khoi tao -> truyen controler sang menu
            // this.menuGameView.init(this.node);
            // this.menuJackpotView.init(this.node);

            this.btnRule.interactable = true;
            this.btnTop.interactable = false;

            this.nodeRule.active = false;
            this.nodeTop.active = true;

            // if (this.lbJackpotValue.string !== '') {
            //     this.getBreathRanking();
            // }

            var self = this;
            setTimeout(function () {
                self.getBreathRanking();
            }, 200);
        },

        onDisable: function () {
            this.eventListView.resetList();
        },

        setLBJackpot: function (jackpotId, jackpot) {
            this.jackpotId = jackpotId;
            this.lbJackpotValue.string = jackpot;
        },

        setLBGame: function (gameId, game) {
            this.gameId = gameId;
            this.lbGameValue.string = game;
        },

        getBreathRanking: function () {
            if ( cc.EventController.getInstance().showEventBusy()) {
                this.eventListView.resetList();
                var getBreathRankingCommand = new cc.GetBreathRankingCommand;
                getBreathRankingCommand.execute(this);
            }
        },

        onGetBreathRankingResponse: function (response) {
            cc.EventController.getInstance().hideEventBusy();
            //co ket qua -> kiem tra xem con dang bat cua so Event ko
            if (response && response.length > 0) {
                var list = response;

                // this.lbReward.string = cc.Tool.getInstance().formatNumber(response.PrizeValue);
                // this.lbRank.string = response.Position;
                // this.lbValue.string = response.TotalBoom;

                if (list && list.length > 0) {
                    this.eventListView.initialize(list);
                }
            }
        },

        selectGameValueEvent: function (event, data) {
            this.gameId = event.target.name;

            // var isFound = false;
            // //tim jackpotId dau tien
            // for (var i = 0; i < this.searchBoxs.length; i++) {
            //     var search = this.searchBoxs[i];
            //     if (search.GameID.toString() === this.gameId) {
            //         if (!isFound) {
            //             this.jackpotId = search.SBJackpotID.toString();
            //             isFound = true;
            //         }
            //         this.lbJackpotValue.string = search.SearchCode;
            //         break;
            //     }
            // }
            this.menuJackpotView.updateList();

            this.lbGameValue.string = data.toString();
            this.animationMenuGame.play('hideDropdownMenu');

            this.isShowSelectBox = false;

            // this.getBreathRanking();
        },

        selectJackpotValueEvent: function (event, data) {
            this.jackpotId = event.target.name;
            this.lbJackpotValue.string = data.toString();
            this.animationMenuJackpot.play('hideDropdownMenu');

            this.isShowSelectBoxTime = false;

            this.getBreathRanking();
        },

        openMenuGameClicked: function () {
            if (!this.isShowSelectBox) {
                this.isShowSelectBox = true;
                this.animationMenuGame.play('showDropdownMenu');
            } else {
                this.isShowSelectBox = false;
                this.animationMenuGame.play('hideDropdownMenu');
            }
        },

        closeMenuGameClicked: function () {
            this.animationMenuGame.play('hideDropdownMenu');
            this.isShowSelectBox = false;
        },

        openMenuJackpotClicked: function () {
            if (!this.isShowSelectBoxTime) {
                this.isShowSelectBoxTime = true;
                this.animationMenuJackpot.play('showDropdownMenu');
            } else {
                this.isShowSelectBoxTime = false;
                this.animationMenuJackpot.play('hideDropdownMenu');
            }
        },

        closeMenuJackpotClicked: function () {
            this.animationMenuJackpot.play('hideDropdownMenu');
            this.isShowSelectBoxTime = false;
        },
    });
}).call(this);
