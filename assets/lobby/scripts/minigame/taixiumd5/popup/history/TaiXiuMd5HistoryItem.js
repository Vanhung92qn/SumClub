/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TaiXiuMd5HistoryItem = cc.Class({
        "extends": cc.Component,
        properties: {
            // nodeBG: cc.Node,

            lbSession: cc.Label,
            lbTime: cc.Label,
            lbSide: cc.Label,
            lbResult: cc.Label,
            lbBet: cc.Label,
            lbRefund: cc.Label,
            lbWin: cc.Label,
			lbchitiet: cc.Label,
        },

        updateItem: function(item, itemID) {
            // this.nodeBG.active = itemID % 2 !== 0;
            this.lbSession.string = item.SessionID;
            this.lbTime.string = cc.Tool.getInstance().convertUTCTime(item.CreateTime);
            this.lbSide.string = item.BetSide === cc.TaiXiuMd5BetSide.TAI ? 'Tài' : 'Xỉu';

            this.lbBet.string = cc.Tool.getInstance().formatNumber(item.Bet);
			
			
           // this.lbResult.string = item.Result;
			console.log(this.lbResult.string);
            this.lbRefund.string = cc.Tool.getInstance().formatNumber(item.Refund);
            
			var tiennhancuoc = (item.Bet-item.Refund);
			
			
			
			if (item.Award > 0){
				this.lbWin.node.color = cc.color(0, 255, 0, 255)
				var tongtiennhan = cc.Tool.getInstance().formatNumber(item.Award+item.Refund);
				this.lbWin.string = '+'+cc.Tool.getInstance().formatNumber(item.Award);
				this.lbResult.string = item.Result;
			}else if (item.Bet === item.Refund){
				this.lbWin.string = 'HÒA';
				var tongtiennhan = cc.Tool.getInstance().formatNumber(0+item.Refund);
				this.lbWin.node.color = cc.color(255, 255, 255, 255)
				this.lbResult.string = item.Result;
			}else if (item.Result === ''){
				var tongtiennhan = '-';
				this.lbWin.string = '-';
				 this.lbResult.string = 'chờ kq';
			}else{
				this.lbResult.string = item.Result;
				this.lbWin.string = cc.Tool.getInstance().formatNumber(item.Award-item.Bet+item.Refund);
				var tongtiennhan = cc.Tool.getInstance().formatNumber(0+item.Refund);
				this.lbWin.node.color = cc.color(255, 0, 0, 255)
			}
			
			this.lbchitiet.string = 'Đặt '+this.lbSide.string+' Kết quả '+this.lbResult.string+', Tổng đặt '+this.lbBet.string+' Hoàn trả '+this.lbRefund.string+', Nhận '+tongtiennhan;

            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);
