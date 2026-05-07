/**
 * Ket qua, effect ket qua,
 */

var taiXiuConfig = require("TaiXiuConfig");

(function () {
  cc.TaiXiuResultView = cc.Class({
    extends: cc.Component,
    properties: {
      //node ket qua
      nodeResult: cc.Node,
      //node 3 dice ket qua
      nodeResultDice: cc.Node,

      //bat de nan
      nodeBowl: cc.Node,

      //animation Dice
      nodeBGTimer: cc.Node,
      //3 cc.Sprite hien thi mat xuc xac ket qua (keo Sprite component cua tung dice vao theo thu tu 1,2,3)
      spDice: {
        default: [],
        type: cc.Sprite,
      },
      //6 SpriteFrame tuong ung mat 1..6 (keo 1.png..6.png tu dice.plist theo dung thu tu)
      sfDices: {
        default: [],
        type: cc.SpriteFrame,
      },
      xnAnimationplay: cc.Node,
      //Spine effect tung xuc xac
      xnEffect: sp.Skeleton,
      //ten clip Spine cua animation tung
      diceShakeAnimName: 'animation',
      //sprite 3 dice

      //label tong diem cua 3 dice
      nodeBgTotalDice: cc.Node,
      lbTotalDice: cc.Label,
      //amthanhmodia: cc.AudioSource,

      //node effect bat len khi win
      nodeTaiWins: [cc.Node],
      nodeXiuWins: [cc.Node],
      winSound: cc.AudioSource,
      //node Tai/Xiu tat di khi chay fx
      nodeTai: cc.Node,
      nodeXiu: cc.Node,
      rollDice: cc.AudioSource,
      Jackpot: cc.Node,
      //spriteFrame 6 dice
      nodeLBBetTai: cc.Label,
      nodeLBBetXiu: cc.Label,
      animationBetResult: cc.Animation,
      nodeLBBetResult: cc.Label,
    },

    onLoad: function () {
      //setView
      cc.TaiXiuController.getInstance().setTaiXiuResultView(this);
      this.rootPasBowl = this.nodeBowl.position; //save lai vi tri goc
      this.reset();
    },

    onDestroy: function () {
      cc.TaiXiuController.getInstance().setTaiXiuResultView(null);
    },

    reset: function () {
      this.currentState = 999;
      this.resetUI();
    },

    resetUI: function () {
      this.animationOpenPlaying = false;
      this.nodeResult.active = false;
      this.nodeResultDice.active = false;
      this.nodeBowl.active = false;
      this.Jackpot.active = false;
      this.nodeBGTimer.active = false;
      this.xnAnimationplay.active = false;
      this.nodeBgTotalDice.active = false;
      this.lbTotalDice.node.active = false;

      //an 3 sprite dice
      if (this.spDice && this.spDice.length) {
        this.spDice.forEach(function (sp) {
          if (sp && sp.node) sp.node.active = false;
        });
      }
      //tat Spine tung
      if (this.xnEffect && this.xnEffect.node) {
        this.xnEffect.node.active = false;
      }

      //reset lai vi tri bowl
      this.nodeBowl.position = this.rootPasBowl;

      this.nodeTaiWins.forEach(function (nodeTaiWin) {
        nodeTaiWin.active = false;
      });
      this.nodeXiuWins.forEach(function (nodeXiuWin) {
        nodeXiuWin.active = false;
      });

      this.nodeTai.active = true;
      this.nodeXiu.active = true;
    },

    getIsBowl: function () {
      return this.nodeBowl.active;
    },

    //gan mat 1..6 cho 3 sprite dice
    applyDiceFaces: function (result) {
      var dice = [result.Dice1, result.Dice2, result.Dice3];
      for (var i = 0; i < this.spDice.length; i++) {
        var v = dice[i];
        var sp = this.spDice[i];
        if (!sp || !sp.node) continue;
        if (v >= 1 && v <= 6 && this.sfDices[v - 1]) {
          sp.spriteFrame = this.sfDices[v - 1];
          sp.node.active = true;
        }
      }
    },

    updateResult: function (sessionInfo) {
      if (sessionInfo.CurrentState !== this.currentState) {
        //check state de xu ly hien thi
        switch (sessionInfo.CurrentState) {
          case cc.TaiXiuState.BETTING: //54
            //reset lai UI
            this.resetUI();
            break;
          case cc.TaiXiuState.END_BETTING:
            //Ko cho dat cuoc nua
            //reset lai UI
            this.resetUI();
            break;
          case cc.TaiXiuState.RESULT: //15
            this.playAnimationAndSetResult(sessionInfo);
            break;

          case cc.TaiXiuState.PREPARE_NEW_SESSION:
            //neu dang hien thi bat de nan -> tat bat di + play fx
            if (this.nodeBowl.active) {
              //this.amthanhmodia.play();
              this.nodeBowl.active = false;
              this.startEffectResult();
              //hien effect
            } else {
              this.setResult(sessionInfo);
            }
            break;
        }
      }

      this.currentState = sessionInfo.CurrentState;
    },

    playAnimationAndSetResult: function (sessionInfo) {
      this.totalDice =
        sessionInfo.Result.Dice1 +
        sessionInfo.Result.Dice2 +
        sessionInfo.Result.Dice3;

      this.nodeResult.active = true;
      this.xnAnimationplay.active = true;
      this.lbTotalDice.string = this.totalDice;

      //che do Nan: ung dia che 3 dice sau khi tung xong
      if (cc.TaiXiuController.getInstance().getIsNan()) {
        setTimeout(
          function () {
            this.nodeBowl.active = true;
          }.bind(this),
          2100
        );
      }

      //an 3 sprite dice + node ket qua trong khi tung
      this.spDice.forEach(function (sp) {
        if (sp && sp.node) sp.node.active = false;
      });
      this.nodeResultDice.active = false;

      if (this.rollDice) this.rollDice.play();

      var self = this;
      if (this.xnEffect && this.xnEffect.node) {
        //phat Spine tung
        this.xnEffect.node.active = true;
        this.xnEffect.setAnimation(0, this.diceShakeAnimName, false);
        this.xnEffect.setCompleteListener(function () {
          self.applyDiceFaces(sessionInfo.Result);
          self.xnEffect.node.active = false;
          self.nodeBGTimer.active = true;
          self.diceAnimFinish();
        });
      } else {
        cc.warn('[TaiXiuResultView] xnEffect chua wire, skip animation tung');
        self.applyDiceFaces(sessionInfo.Result);
        self.nodeBGTimer.active = true;
        self.diceAnimFinish();
      }

      this.animationOpenPlaying = true;
    },

    //chi bat ket qua xuc xac (che do Nan)
    setResultDice: function (sessionInfo) {
      this.nodeResult.active = true;
      this.applyDiceFaces(sessionInfo.Result);
      this.nodeBGTimer.active = true;
      this.diceAnimFinish();
      this.nodeResultDice.active = true;
    },

    //goi set ket qua luon (ko chay animation dice — vao giua phien)
    setResult: function (sessionInfo) {
      if (this.animationOpenPlaying) return;

      this.totalDice =
        sessionInfo.Result.Dice1 +
        sessionInfo.Result.Dice2 +
        sessionInfo.Result.Dice3;

      this.nodeResult.active = true;
      this.lbTotalDice.string = this.totalDice;

      this.applyDiceFaces(sessionInfo.Result);
      this.nodeBGTimer.active = true;
      this.diceAnimFinish();
      this.nodeResultDice.active = true;
      this.startEffectResult();
    },

    startEffectResult: function () {
      if (this.totalDice == 3 || this.totalDice == 18) {
        this.SetJackpot();
      } else if (this.totalDice == 10 || this.totalDice == 15) {
        // cc.TaiXiuController.getInstance().taiXiuInfoView.showToast("Xuất hiện Tổng ("+this.totalDice+") tiền Win sẽ được x1.5");
      }
      console.log("nan xong");
      this.winSound.play();
      //Kiem tra xem ban nao thang
      if (this.totalDice > 10) {
        //TAI
        this.nodeTaiWins.forEach(function (nodeTaiWin) {
          nodeTaiWin.active = true;
        });
        this.nodeXiuWins.forEach(function (nodeXiuWin) {
          nodeXiuWin.active = false;
        });
        this.nodeTai.active = false;

        // tài
        if (this.nodeLBBetTai.string.length > 2) {
          let bet = Number.parseInt(this.nodeLBBetTai.string.replace(/,/g, ""));
          this.nodeLBBetResult.string =
            "+" + cc.Tool.getInstance().formatNumber(bet + (bet * 98) / 100);
          this.animationBetResult.play("openMessage");
        }
      } else if (this.totalDice > 2 && this.totalDice <= 10) {
        //XIU
        this.nodeTaiWins.forEach(function (nodeTaiWin) {
          nodeTaiWin.active = false;
        });
        this.nodeXiuWins.forEach(function (nodeXiuWin) {
          nodeXiuWin.active = true;
        });
        this.nodeXiu.active = false;
        // xỉu
        if (this.nodeLBBetXiu.string.length > 2) {
          let bet = Number.parseInt(this.nodeLBBetXiu.string.replace(/,/g, ""));
          this.nodeLBBetResult.string =
            "+" + cc.Tool.getInstance().formatNumber(bet + (bet * 98) / 100);
          this.animationBetResult.play("openMessage");
        }
      }
    },
    openEndDiaNan: function () {
      if (this.nodeBowl.active) {
        this.nodeBowl.active = false;
        this.startEffectResult();
      }
    },
    SetJackpot: function () {
      this.Jackpot.active = true;
      this.node.runAction(
        cc.sequence(
          cc.delayTime(6),
          cc.callFunc(
            function () {
              this.Jackpot.active = false;
            }.bind(this)
          )
        )
      );
    },
    //sau khi play xong animation Dice
    diceAnimFinish: function () {
      this.nodeBGTimer.active = true;
      // anim mới xong
      // this.nodeDiceAnim.active = false;
      //dang mo bat de nan -> ko chay animation thang
      if (cc.TaiXiuController.getInstance().getIsNan()) {
        this.nodeBowl.active = true;
        //tat node Dice Anim
        // this.animationDice.node.active = false;

        //Bat node Dice Ket qua (3 Dice)
        this.nodeResultDice.active = true;
      } else {
        //tat node Dice Anim
        // this.animationDice.node.active = false;

        //Bat node Dice Ket qua (3 Dice)
        //this.amthanhmodia.play();
        this.nodeResultDice.active = true;

        //Bat node ket qua tong
        this.nodeBgTotalDice.active = true;
        this.lbTotalDice.node.active = true;

        //effect
        this.startEffectResult();
      }
    },
  });
}.call(this));
