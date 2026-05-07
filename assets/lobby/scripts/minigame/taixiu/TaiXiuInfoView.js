/**
 * Thong tin phien
 */
//fix by Telegram: @sharkdn Chuyên cung cấp mã nguồn sàn BO, viết game Casino, fix game, viết WEBSITE

var taiXiuConfig = require("TaiXiuConfig");
import Utils from "../../shootFish/common/Utils";
import Tween from "../../shootFish/common/Tween";
var helper = require("Helper");
(function () {
  cc.TaiXiuInfoView = cc.Class({
    extends: cc.Component,
    properties: {
      animationBigTimer: cc.Animation,
      nodeBGTimer: cc.Node,
      lbSessionID: cc.Label,
      lbBigTimer: cc.Label, //thoi gian to chinh giua
      lbTimer: cc.Label, //thoi gian nho khi dang o man ket qua,
      lbTotalBetTai: cc.Label, //tong tien bet Tai
      lbTotalBetXiu: cc.Label, //tong tien bet Xiu
      lbUserBetTai: cc.Label, //so user bet Tai
      lbUserBetXiu: cc.Label, //so user bet Xiu
      lblTextNotiNewGame: cc.Label,
      nodeMain: cc.Node,
      Jackpot: cc.Label,
      //nodeNewSesion: cc.Node,
      //nodeCanCua: cc.Node,
    },

    onLoad: function () {
      cc.TaiXiuController.getInstance().setTaiXiuInfoView(this);
      this.animationMess = this.lblTextNotiNewGame.node.parent.getComponent(
        cc.Animation
      );
      this.reset();
      this.Jackpot.string = "0";
    },

    onEnable: function () {
      this.Jackpot.string = "0";
      if (
        cc.sys.isNative &&
        this.nodeMain !== null &&
        this.nodeMain !== undefined
      ) {
        this.nodeMain.scaleX = 1;
        this.nodeMain.scaleY = 1;
      }
    },

    onDestroy: function () {
      cc.TaiXiuController.getInstance().setTaiXiuInfoView(null);
    },

    reset: function () {
      this.currentState = 999;
      this.lastTime = 999;
    },

    updateInfo: function (sessionInfo) {
      //check state de xu ly hien thi
      switch (sessionInfo.CurrentState) {
        //giai doan dat cuoc
        case cc.TaiXiuState.BETTING: //54
          if (this.currentState !== sessionInfo.CurrentState) {
            //goi reset thong tin betInfo
            cc.TaiXiuController.getInstance().resetBetAndResultInfo();
            this.animationBigTimer.play('timer');
          }
          this.lbBigTimer.node.active = true;
          this.lbTimer.node.active = false;
          this.nodeBGTimer.active = false;
          helper.numberToEfect(this.lbTotalBetTai, sessionInfo.TotalBetTai);
          helper.numberToEfect(this.lbTotalBetXiu, sessionInfo.TotalBetXiu);
          break;
        //giai doan cho ket qua (ko cho dat cuoc)
        case cc.TaiXiuState.END_BETTING:
          let TotalTai = sessionInfo.TotalBetTai;
          let TotalXiu = sessionInfo.TotalBetXiu;
          this.lbBigTimer.node.active = true;
          this.lbTimer.node.active = false;
          this.nodeBGTimer.active = false;
          //return;
          if (TotalTai > TotalXiu) {
            let lechtai = TotalTai - TotalXiu;
            let Cancua = TotalTai - lechtai;
            this.lbTotalBetTai.string =
              cc.Tool.getInstance().formatNumber(Cancua);
            this.lbTotalBetXiu.string =
              cc.Tool.getInstance().formatNumber(Cancua);
          } else {
            let lechxiu = TotalXiu - TotalTai;
            let Cancua = TotalXiu - lechxiu;
            this.lbTotalBetTai.string =
              cc.Tool.getInstance().formatNumber(Cancua);
            this.lbTotalBetXiu.string =
              cc.Tool.getInstance().formatNumber(Cancua);
          }
          break;

        //giai doan ket qua
        case cc.TaiXiuState.RESULT: //15
          this.Jackpot.getComponent(cc.LabelIncrement).tweenValueto(
            sessionInfo.Jackpot
          );
          //dem thoi gian o local
          this.lbBigTimer.node.active = false;
          this.lbTimer.node.active = true;
          this.nodeBGTimer.active = true;
          break;

        //giai doan cho phien moi
        case cc.TaiXiuState.PREPARE_NEW_SESSION:
          //kiem tra neu chua start timer -> start
          cc.TaiXiuController.getInstance().resetBetInfo();
          this.lbBigTimer.node.active = false;
          this.lbTimer.node.active = true;
          this.nodeBGTimer.active = true;

          break;
      }

      //luu lai state hien tai
      this.currentState = sessionInfo.CurrentState;

      //set thong tin
      this.lbSessionID.string = "#" + sessionInfo.SessionID;
      this.lbUserBetTai.string = cc.Tool.getInstance().formatNumber(
        sessionInfo.TotalTai
      );
      this.lbUserBetXiu.string = cc.Tool.getInstance().formatNumber(
        sessionInfo.TotalXiu
      );
      this.Jackpot.getComponent(cc.LabelIncrement).tweenValueto(
        sessionInfo.Jackpot
      );
    },

    updateTimerInfo: function (time) {
      //console.log('updateTimer: ' +time);
      switch (this.currentState) {
        case cc.TaiXiuState.BETTING: //54
          if (time === 49) {
            this.animationMess.play("openMessage");
            this.lblTextNotiNewGame.string = "Phiên mới.";
          }
          this.lbBigTimer.string = time;
          this.lbBigTimer.node.color = time > 5 ? cc.Color.WHITE : cc.Color.RED;
          this.lbTimer.string = time;
          if (time <= taiXiuConfig.TIME_FAST) {
            if (this.lastTime !== time) {
              this.animationBigTimer.play('timerFast');
            }
          } else if (time <= taiXiuConfig.TIME_ENABLE_TORNADO) {
            if (this.lastTime !== time) {
              this.animationBigTimer.play('timer');
            }
          } else {
            this.animationBigTimer.play('timer');
          }
          break;
        case cc.TaiXiuState.END_BETTING: //15
          if (this.lastTime !== time) {
            this.animationBigTimer.play('timerFast');
          }
          this.lbBigTimer.string = time;
          if (time === 2) {
            this.animationMess.play("openMessage");
            this.lblTextNotiNewGame.string = "Trả tiền cân cửa.";
          }
          if (time === 1 || time <= 2) this.lbTimer.string = 15;
          else this.lbTimer.string = time;
          break;
        case cc.TaiXiuState.RESULT: //15
          this.lbTimer.string = time;
          this.lbBigTimer.node.color = cc.Color.WHITE;
          this.lbBigTimer.string = time;
          this.elapsedTime = 0;
          if (time === 10 || time === 5) {
            cc.LobbyController.getInstance().refreshAccountInfo();
          }
          break;

        case cc.TaiXiuState.PREPARE_NEW_SESSION:
          this.lbTimer.string = time;
          this.lbBigTimer.node.color = cc.Color.WHITE;
          if (time === 1) {
            this.lbBigTimer.string = 51;
          } else {
            this.lbBigTimer.string = time;
          }
          break;
      }
      this.lastTime = time;
    },
  });
}.call(this));
