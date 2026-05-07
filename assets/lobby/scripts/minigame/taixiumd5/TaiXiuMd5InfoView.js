/**
 * Thong tin phien
 */

var taiXiuMd5Config = require('TaiXiuMd5Config');
import Utils from "../../shootFish/common/Utils";
import Tween from "../../shootFish/common/Tween";
var helper = require('Helper');
(function () {
    cc.TaiXiuMd5InfoView = cc.Class({
        "extends": cc.Component,
        properties: {
            //animationBigTimer: cc.Animation,
            nodeBGTimer: cc.Node,
            lbSessionID: cc.Label,
            lbBigTimer: cc.Label, //thoi gian to chinh giua
            lbTimer: cc.Label, //thoi gian nho khi dang o man ket qua,
            lbTotalBetTai: cc.Label, //tong tien bet Tai
            lbTotalBetXiu: cc.Label, //tong tien bet Xiu
            lbUserBetTai: cc.Label, //so user bet Tai
            lbUserBetXiu: cc.Label, //so user bet Xiu            
            nodeMain: cc.Node,
			nodeBowl: cc.Node,
			nodeketqua: cc.Node,
			nodekeymd5: cc.Node,
			 //node effect bat len khi win
            nodeTaiWins: cc.Node,
            nodeXiuWins: cc.Node,
            lblTextNotiNewGame: cc.Label,
            //node Tai/Xiu tat di khi chay fx
            nodeTai: cc.Node,
            nodeXiu: cc.Node,
			// animation dice bat
			nodebaton: cc.Node,
			rollDice: cc.AudioSource,
			winSound: cc.AudioSource,
			//am thanh phien moi
			newSessionSound: cc.AudioSource,
			Showketqua: cc.Node,
        },

        onLoad: function () {
            cc.TaiXiuMd5Controller.getInstance().setTaiXiuMd5InfoView(this);
			this.animationMess = this.lblTextNotiNewGame.node.parent.getComponent(cc.Animation);
			this.rootPasBowl = this.nodeBowl.position; //save lai vi tri goc
            this.reset();
        },

        onEnable: function () {
            if (cc.sys.isNative && this.nodeMain !== null && this.nodeMain !== undefined) {
                this.nodeMain.scaleX = 1;
                this.nodeMain.scaleY = 1;
            }
        },
        
        onDestroy: function () {
            cc.TaiXiuMd5Controller.getInstance().setTaiXiuMd5InfoView(null);
        },

        reset: function () {
            this.currentState = 999;
            this.lastTime = 999;
        },
		
        updateInfo: function (md5sessionInfo) {
			//console.log(md5sessionInfo);

            //check state de xu ly hien thi
            switch (md5sessionInfo.CurrentState) {
                //giai doan dat cuoc
                case cc.TaiXiuMd5State.BETTING: //54
                    if (this.currentState !== md5sessionInfo.CurrentState) {
                        //phien moi: reset bet info
                        cc.TaiXiuMd5Controller.getInstance().resetBetAndResultInfo();
                        this.nodekeymd5.active = true;
                        this.nodebaton.active = true;
                        this.Showketqua.active = false;
                        //chi thong bao "Phien moi" khi thuc su vua bat dau (Ellapsed gan 50)
                        //tranh hien khi reload game o giua phien
                        if (md5sessionInfo.Ellapsed >= 48) {
                            if (this.animationMess) this.animationMess.play('openMessage');
                            if (this.lblTextNotiNewGame) this.lblTextNotiNewGame.string = 'Phiên mới.';
                            if (this.newSessionSound) this.newSessionSound.play();
                        }
                    }
                    this.lbBigTimer.node.active = true;
                    this.lbTimer.node.active = false;
                    this.nodeBGTimer.active = false;
                    helper.numberToEfect(this.lbTotalBetTai, md5sessionInfo.TotalBetTai);
                    helper.numberToEfect(this.lbTotalBetXiu, md5sessionInfo.TotalBetXiu);
                    break;
                //giai doan cho ket qua (ko cho dat cuoc)
                case cc.TaiXiuMd5State.END_BETTING:
                    this.lbBigTimer.node.active = true;
                    this.lbTimer.node.active = false;
                    this.nodeBGTimer.active = false;	
					//return;					
                    break;

                //giai doan ket qua
                case cc.TaiXiuMd5State.RESULT: //15
				    helper.numberToEfect(this.lbTotalBetTai, md5sessionInfo.TotalBetTai);
			        helper.numberToEfect(this.lbTotalBetXiu, md5sessionInfo.TotalBetXiu);
				    this.nodebaton.active = false;
					this.nodekeymd5.active = false;
					this.nodeketqua.active = true;
                    //dem thoi gian o local
                    this.lbBigTimer.node.active = false;
                    this.lbTimer.node.active = true;
                    this.nodeBGTimer.active = true;
					//this.modiaplay();
                    break;

                //giai doan cho phien moi
                case cc.TaiXiuMd5State.PREPARE_NEW_SESSION:
                    //kiem tra neu chua start timer -> start
                    cc.TaiXiuMd5Controller.getInstance().resetBetInfo();
                    this.lbBigTimer.node.active = false;
                    this.lbTimer.node.active = true;
                    this.nodeBGTimer.active = true;
					this.nodeketqua.active = true;
                    break;

            }
            //luu lai state hien tai
            this.currentState = md5sessionInfo.CurrentState;
            //set thong tin
            this.lbSessionID.string = '#' + md5sessionInfo.SessionID;
            this.lbUserBetTai.string = cc.Tool.getInstance().formatNumber(md5sessionInfo.TotalTai);
            this.lbUserBetXiu.string = cc.Tool.getInstance().formatNumber(md5sessionInfo.TotalXiu);
        },
		modiaplay: function () {
			if (this.nodeBowl.x >= 172) {
					   
					//this.nodeBowl.active = false;
					this.nodeketqua.active = true;
					//this.winSound.play();
					//this.nodeBowl.position = this.rootPasBowl;
				}if (this.nodeBowl.x <= -172) {
					
					//this.nodeBowl.active = false;
					this.nodeketqua.active = true;
					//this.winSound.play();
					//this.nodeBowl.position = this.rootPasBowl;
				}
				if (this.nodeBowl.y >= 172) {
					
					//this.nodeBowl.active = false;
					this.nodeketqua.active = true;
					//this.winSound.play();
					//this.nodeBowl.position = this.rootPasBowl;
				}if (this.nodeBowl.y <= -172) {
				
					//this.nodeBowl.active = false;
					this.nodeketqua.active = true;
					//this.winSound.play();
					//this.nodeBowl.position = this.rootPasBowl;
				}
		},


        updateTimerInfo: function (time) {			
            switch (this.currentState) {				
                case cc.TaiXiuMd5State.BETTING: //54
                    this.lbBigTimer.string = time;
                    //this.lbBigTimer.node.color = time > 5 ? cc.Color.WHITE : cc.Color.RED;
					this.lbTimer.string = time;
					if (time >= 48) {
						cc.TaiXiuMd5Controller.getInstance().playAnimation();						
					}
                    break;
                case cc.TaiXiuMd5State.END_BETTING: //15
                    //kiem tra thoi gian de dieu chinh animation
                    this.lbBigTimer.string = time;
                //    this.lbBigTimer.node.color = cc.Color.RED;
                    if (time === 1 || time <= 2){
						this.lbTimer.string = 15;
                    } else {
						this.lbTimer.string = time;
					}
                    break;
                case cc.TaiXiuMd5State.RESULT: //15
					this.lbTimer.string = time;
                    this.lbBigTimer.node.color = cc.Color.WHITE;
                    this.lbBigTimer.string = time;
                    this.elapsedTime = 0;
                    if (time === 10 || time === 5) {
                        cc.LobbyController.getInstance().refreshAccountInfo();
                    }
                    break;

                case cc.TaiXiuMd5State.PREPARE_NEW_SESSION:
					this.lbTimer.string = time;
                    this.lbBigTimer.node.color = cc.Color.WHITE;
                    if (time === 1){
						
						this.lbBigTimer.string = 50;
					}else{
						this.lbBigTimer.string = time;
					} 
					
                    break;
            }
            this.lastTime = time;
        },
		
		showRuleClick: function()
		{
			cc.TaiXiuMd5MainController.getInstance().createRuleView();
		}
    });
}).call(this);