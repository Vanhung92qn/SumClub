/**
 * Ket qua, effect ket qua,
 */

var taiXiuConfig = require("TaiXiuSieuTocConfig");

(function () {
  cc.TaiXiuSieuTocResultView = cc.Class({
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
      //animationDice: cc.Animation,
      xnAnimation: {
        default: [],
        type: sp.Skeleton,
      },
      xnAnimationplay: cc.Node,
      xnEffect: sp.Skeleton,
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
      //spriteFrame 6 dice
      nodeLBBetTai: cc.Label,
      nodeLBBetXiu: cc.Label,
      animationBetResult: cc.Animation,
      nodeLBBetResult: cc.Label,
    },

    onLoad: function () {
      //setView
      cc.TaiXiuSieuTocController.getInstance().setTaiXiuSieuTocResultView(this);
      this.rootPasBowl = this.nodeBowl.position; //save lai vi tri goc
      this.reset();
    },

    onDestroy: function () {
      cc.TaiXiuSieuTocController.getInstance().setTaiXiuSieuTocResultView(null);
    },

    reset: function () {
      this.currentState = 999;
      this.resetUI();
    },

    resetUI: function () {
      //dang play anim dice?
      this.animationOpenPlaying = false;
      // this.animationDice.stop();
      // this.animationDice.node.active = false;
      this.nodeResult.active = false;
      this.nodeResultDice.active = false;
      this.nodeBowl.active = false;
      this.nodeBGTimer.active = false;
      // this.nodeDiceAnim.active = false;
      this.xnAnimationplay.active = false;
      this.nodeBgTotalDice.active = false;
      this.lbTotalDice.node.active = false;

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

    updateResult: function (sessionInfo) {
      if (sessionInfo.CurrentState !== this.currentState) {
        //check state de xu ly hien thi
        switch (sessionInfo.CurrentState) {
          case cc.TaiXiuSieuTocState.BETTING: //54
            //reset lai UI
            this.resetUI();
            break;
          case cc.TaiXiuSieuTocState.END_BETTING:
            //Ko cho dat cuoc nua
            //reset lai UI
            this.resetUI();
            break;
          case cc.TaiXiuSieuTocState.RESULT: //15
            this.playAnimationAndSetResult(sessionInfo);
            break;

          case cc.TaiXiuSieuTocState.PREPARE_NEW_SESSION:
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
      //tinh total Dice
      this.totalDice =
        sessionInfo.Result.Dice1 +
        sessionInfo.Result.Dice2 +
        sessionInfo.Result.Dice3;

      //bat node Result
      this.nodeResult.active = true;

      this.xnAnimationplay.active = true;

      //set thong so diem cua Dice
      this.lbTotalDice.string = this.totalDice;

      //set ket qua vao sprite Dice
      if (cc.TaiXiuSieuTocController.getInstance().getIsNan()) {
        setTimeout(
          function () {
            this.nodeBowl.active = true;
          }.bind(this),
          2100
        );
      }
      this.xnAnimation[0].setAnimation(
        0,
        `xi ngau bay ${sessionInfo.Result.Dice1}`,
        false
      );
      this.xnAnimation[1].setAnimation(
        0,
        `xi ngau bay ${sessionInfo.Result.Dice2}`,
        false
      );
      this.xnAnimation[2].setAnimation(
        0,
        `xi ngau bay ${sessionInfo.Result.Dice3}`,
        false
      );
      this.rollDice.play();
      //this.amthanhxucxac.play();
      this.xnEffect.node.active = true;
      this.xnEffect.setAnimation(0, "effect", false);

      this.xnAnimation[0].setCompleteListener(
        function () {
          this.nodeBGTimer.active = true;
          this.diceAnimFinish();
        }.bind(this)
      );

      //Tat node Dice Ket qua (3 Dice)
      this.nodeResultDice.active = false;

      //anim mới
      // this.nodeDiceAnim.active = true;
      // this.animXocBat.__preload();

      //Bat node Dice Anim
      // this.animationDice.node.active = true;
      // this.animationDice.play('diceAnimNew'); //diceAnimationOld

      //danh dau la dang play
      this.animationOpenPlaying = true;
    },

    //chi bat ket qua xuc xac (che do Nan)
    setResultDice: function (sessionInfo) {
      //bat node Result

      this.nodeResult.active = true;

      //set ket qua vao sprite Dice
      this.xnAnimation[0].setAnimation(
        0,
        `xi ngau bay ${sessionInfo.Result.Dice1}`,
        false
      );
      this.xnAnimation[1].setAnimation(
        0,
        `xi ngau bay ${sessionInfo.Result.Dice2}`,
        false
      );
      this.xnAnimation[2].setAnimation(
        0,
        `xi ngau bay ${sessionInfo.Result.Dice3}`,
        false
      );

      //this.amthanhxucxac.play();
      this.xnEffect.node.active = true;
      this.xnEffect.setAnimation(0, "effect", false);
      this.diceAnimFinish();
      this.xnAnimation[0].setCompleteListener(
        function () {
          this.nodeBGTimer.active = true;
        }.bind(this),
        100
      );

      //Bat node Dice Ket qua (3 Dice)
      this.nodeResultDice.active = true;
    },

    //goi set ket qua luon (ko chay animation dice)
    setResult: function (sessionInfo) {
      //neu dang play animation dice thi return luon. Ket qua se tu hien sau khi anim ket thuc
      if (this.animationOpenPlaying) return;

      //hien luon ket qua
      this.totalDice =
        sessionInfo.Result.Dice1 +
        sessionInfo.Result.Dice2 +
        sessionInfo.Result.Dice3;

      //bat node Result
      this.nodeResult.active = true;

      //set thong so diem cua Dice
      this.lbTotalDice.string = this.totalDice;

      //set ket qua vao sprite Dice
      this.xnAnimation[0].setAnimation(
        0,
        `xi ngau bay ${sessionInfo.Result.Dice1}`,
        false
      );
      this.xnAnimation[1].setAnimation(
        0,
        `xi ngau bay ${sessionInfo.Result.Dice2}`,
        false
      );
      this.xnAnimation[2].setAnimation(
        0,
        `xi ngau bay ${sessionInfo.Result.Dice3}`,
        false
      );

      //this.amthanhxucxac.play();
      this.xnEffect.node.active = true;
      this.xnEffect.setAnimation(0, "effect", false);
      this.diceAnimFinish();
      this.xnAnimation[0].setCompleteListener(
        function () {
          this.nodeBGTimer.active = true;
        }.bind(this),
        100
      );
      // this.spriteDice1.spriteFrame = this.sfDice1s[sessionInfo.Result.Dice1 - 1];
      //this.spriteDice2.spriteFrame = this.sfDice2s[sessionInfo.Result.Dice2 - 1];
      //this.spriteDice3.spriteFrame = this.sfDice3s[sessionInfo.Result.Dice3 - 1];

      //Bat node Dice Ket qua (3 Dice)
      this.nodeResultDice.active = true;

      //effect
      this.startEffectResult();
    },

    startEffectResult: function () {
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
    //sau khi play xong animation Dice
    diceAnimFinish: function () {
      this.nodeBGTimer.active = true;
      // anim mới xong
      // this.nodeDiceAnim.active = false;
      //dang mo bat de nan -> ko chay animation thang
      if (cc.TaiXiuSieuTocController.getInstance().getIsNan()) {
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
