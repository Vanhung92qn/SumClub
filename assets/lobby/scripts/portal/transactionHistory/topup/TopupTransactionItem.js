/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TopupTransactionItem = cc.Class({
        "extends": cc.Component,
        properties: {
            lbTime: cc.Label,
            lbInfo: cc.Label, //Thong tin Nap
            lbValue: cc.Label, //Gia tri
            lbState: cc.Label, //Trang thai
            btKhieuNai: cc.Node, //Khieu nai
        },

        onLoad: function () {
            // this.sprite = this.node.getComponent(cc.Sprite);

            this.lbValue.node.color = cc.Color.YELLOW;
            this.lbState.node.color = cc.Color.GREEN;
        },

        updateItem: function(item, itemID) {
            // this.sprite.enabled = itemID % 2 === 0;
            this.lbTime.string = cc.Tool.getInstance().convertUTCTime(item.CreateDate); //UpdateDate
            if (item.SerialNumber === undefined || item.CardNumber === undefined) {
                this.lbInfo.string = 'Serial: undefined' + '\n' + 'PIN: undefined';
            } else {
                this.lbInfo.string = 'Serial: ' + item.SerialNumber + '\n' + 'PIN: ' + item.CardNumber;
            }
            this.lbValue.string = cc.Tool.getInstance().formatNumber(item.CardValue); //PrizeValue
            this.lbState.string = item.StatusStr;

            switch (item.Status.toString()) {
                //Thành công
                case cc.TopupState.SUCCESS:
                case cc.TopupState.ADMIN_SUCCESS:
                    this.lbState.node.color = cc.Color.GREEN;
                    this.btKhieuNai.active = false;
                    break;

                //Chờ xử lý
                case cc.TopupState.PENDING:
                case cc.TopupState.PENDING1:
                case cc.TopupState.PENDING3:
                    this.lbState.node.color = cc.Color.ORANGE;
                    this.btKhieuNai.active = false;
                    break;

                //Thất bại
                case cc.TopupState.FAILED:
                case cc.TopupState.FAILED2:
                    this.lbState.node.color = cc.Color.RED;
                    this.btKhieuNai.active = true;
                    break;

                //Thất bại
                default:
                    this.lbState.node.color = cc.Color.RED;
                    this.btKhieuNai.active = true;
                    break;
            }

            this.item = item;
            this.itemID = itemID;
        },

    });
}).call(this);
