/**
 * Created by Nofear on 3/15/2019.
 */

var helper = require('Helper');

(function () {
    cc.MomoView = cc.Class({
        "extends": cc.Component,
        properties: {
            node1: cc.Node,
            QRCODEMOMO: cc.Node,
            nodeActive: cc.Node,
            nodeDeActive: cc.Node,
            nodeDeForm:cc.Node,
            lbMoMoName: cc.Label,
            lbMoMoPhone: cc.Label,
            lbMoMoContent: cc.Label,
            lbMoMoContent2: cc.Label,
            lbMoMos: [cc.Label],
            lbCoins: [cc.Label],

            nodeRates: [cc.Node],
            lbColCoin: cc.Label,
            lbRule: cc.Label,
            editBoxMenhGia: cc.EditBox,
            valueRandomCode: cc.Label,
            audioClick: cc.AudioSource,
            audioClickNap: cc.AudioSource,
            audioErorr: cc.AudioSource,


            editBoxValue: cc.EditBox
        },

        onLoad: function () {
            this.lbColCoin.string = cc.Config.getInstance().currency() + ' nhận';
            this.lbRule.string = 'Lưu ý:\n' +
                '- Nhập SAI: Số điện thoại, nội dung chuyển khoản sẽ không nhận\n' +
                'được ' + cc.Config.getInstance().currency() + '\n' +
                '- Chỉ chuyển khoản tối thiểu 10.000.\n' +
                '- Kiểm tra nội dung chuyển khoản trước khi thực hiện chuyển khoản.\n' +
                '- Hệ thống sẽ tự động cộng ' + cc.Config.getInstance().currency() + ' trong vòng 3 phút kể từ khi nhận \n' +
                'được tiền trong tài khoản MoMo';
            this._action = false;
                
            var url = 'api/Kpay/Deposit';
            var params = {
                method: "BT",
                amount: 100000,
                bank: "VCB"
            }
         //   this.getCodeMoMo();
          //  cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, JSON.stringify(params), function (response) {
           //     console.log(response);
          //  });
        },
        onStart :function () {
            this._action = false;
             
            this.nodeActive.active = false;
            this.nodeDeForm.active = true;
            this.nodeDeActive.active =false;
            this.node1.active =false;
            
        },
        onEnable: function () {
            this.nodeRates.forEach(function (nodeRate) {
                nodeRate.active = false;
            });
            this._action = false;
            // var response = {
            //     ResponseCode: 1,
            //     Orders: {
            //         Message: "MAX 15665119",
            //         WalletAccountName: "Nguyen Van Canh",
            //         WalletAccount: "0398665428",
            //         Rate: 1.15,
            //         List: [
            //             10000,
            //             20000,
            //             50000,
            //             100000,
            //             200000,
            //             500000,
            //             100000
            //         ]
            //     }
            // };

            // this.onGetListMomoResponse(response);

            // this.onGetListMomoResponseError(response);

          //  this.amountNap = 10000;

          //  var getListMomoCommand = new cc.GetListMomoCommand;
           // getListMomoCommand.execute(this);

            this.nodeActive.active = false;
            this.nodeDeForm.active = true;
            this.nodeDeActive.active =false;
            this.node1.active =false;

        },

        onGetListMomoResponse: function (response) {
            this.lbMoMoName.string = response.Orders.WalletAccountName;
            this.lbMoMoPhone.string = response.Orders.WalletAccount;
            this.lbMoMoContent.string = response.Orders.Message;
			this.lbMoMoContent2.string = response.Orders.Message;

            var self = this;
            var index = 0;

            response.Orders.List.forEach(function (item) {
                if (index < 7) {
                    self.lbMoMos[index].string = cc.Tool.getInstance().formatNumber(item.Amount);
                    self.lbCoins[index].string = cc.Tool.getInstance().formatNumber(item.AmountReceive);
                    self.nodeRates[index].active = true;
                }
                index++;
            });
            
            if(this._action){
                this.nodeActive.active = true;
                this.nodeDeActive.active = false;
                this.nodeDeForm.active = false;
            }else{
                this.nodeActive.active = false;
                this.nodeDeActive.active = false;
                this.nodeDeForm.active = true;
            }
           
        },

        onGetListMomoResponseError: function (response) {
            this.nodeActive.active = false;
            this.nodeDeForm.active = false;
            this.nodeDeActive.active = true;
        },

        copyMoMoAccountClicked: function () {
            this.audioClick.loop = false;
            this.audioClick.play();
            if(cc.Tool.getInstance().copyToClipboard(this.lbMoMoPhone.string)) {
                cc.PopupController.getInstance().showMessage('Đã sao chép số tài khoản.');
            }
        },

        copyMoMoContentClicked: function () {
            this.audioClick.loop = false;
            this.audioClick.play();
            if(cc.Tool.getInstance().copyToClipboard(this.valueRandomCode.string)) {
                cc.PopupController.getInstance().showMessage('Đã sao chép nội dung chuyển khoản.');
            }
        },

        napTien: function (event) {
            this._action = true;
            //this.amountNap = cc.Tool.getInstance().removeDot(this.editBoxMenhGia.string);
			this.amountNap = "500000";
            var getListMomoCommand = new cc.GetListMomoCommand;
            getListMomoCommand.execute(this);
            
           this.nodeActive.active = true;
           this.nodeDeForm.active = false;
        },
        onEditingValueChanged: function () {
            var val = cc.Tool.getInstance().removeDot(this.editBoxMenhGia.string);
            this.editBoxMenhGia.string = cc.Tool.getInstance().formatNumber(val);
           // this.lbValueTransfer.string = 'Số ' + cc.Config.getInstance().currency() + ' cần chuyển: ' + this.editBoxMenhGia.string;
        },

        onEditingValueDidEnd: function () {
            var val = cc.Tool.getInstance().removeDot(this.editBoxMenhGia.string);
            this.editBoxMenhGia.string = cc.Tool.getInstance().formatNumber(val);
           //this.lbValueTransfer.string = 'Số ' + cc.Config.getInstance().currency() + ' cần chuyển: ' + this.editBoxMenhGia.string;
        },

        onEditingValueChangedMoney: function () {
            var val = cc.Tool.getInstance().removeDot(this.editBoxValue.string);
            this.editBoxValue.string = cc.Tool.getInstance().formatNumber(val);
        },

        onEditingValueDidEndMoney: function () {
            var val = cc.Tool.getInstance().removeDot(this.editBoxValue.string);
            this.editBoxValue.string = cc.Tool.getInstance().formatNumber(val);
           //this.lbValueTransfer.string = 'Số ' + cc.Config.getInstance().currency() + ' cần chuyển: ' + this.editBoxMenhGia.string;
        },

        getCodeMoMo: function () {
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let randomString = '';
            for (let i = 0; i < 3; i++) {
                randomString += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            
            this.valueRandomCode.string = `${cc.LoginController.getInstance().getNickname()}`//_${randomString} 
        },

        openAppMomo() {
            // Chuyển đổi giá trị từ editBoxValue
            this.VarAmount = helper.getOnlyNumberInString(this.editBoxValue.string);
        
            // Kiểm tra điều kiện số tiền nạp
            if (this.VarAmount < 50000) {
                cc.PopupController.getInstance().showMessage('Số tiền nạp tối thiểu là 50.000 VNĐ.');
                this.node1.active = false; // Ẩn node1 nếu số tiền không hợp lệ
                return; // Không thực hiện tiếp
            }
            
            if (this.VarAmount > 300000000) {
                cc.PopupController.getInstance().showMessage('Số tiền nạp tối đa là 300.000.000 VNĐ.');
                this.node1.active = false; // Ẩn node1 nếu số tiền không hợp lệ
                return; // Không thực hiện tiếp
            }
        
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let randomString = '';
            for (let i = 0; i < 3; i++) {
                randomString += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            
            this.valueRandomCode.string = `${cc.LoginController.getInstance().getNickname()}`; // Thay đổi nội dung mã
            this.VarNganHang = "MoMo";
            this.VarSoTk = "";
            this.VarNameTk = cc.LoginController.getInstance().getNickname();
            this.VarNguoigui = "";
            this.VarBankName = "Momo";
        
            // Hiện các thông tin cần thiết
            this.QRCODEMOMO.active = true;
            this.lbMoMoName.node.active = true;
            this.lbMoMoPhone.node.active = true;
            this.lbMoMoContent.node.active = true;
            this.valueRandomCode.node.active = true;
        
            console.log("cc.Naptienbanking", cc.Naptienbanking);
            var Naptienbanking = new cc.Naptienbanking;
            Naptienbanking.execute(this);
            cc.PopupController.getInstance().showMessage('Đã Tạo Nội Dung Giao Dịch');
            this.audioClickNap.loop = false;
            this.audioClickNap.play();
            this.node1.active = true; // Chỉ hiển thị node1 khi điều kiện hợp lệ
        },
        
        onNaptienbankingResponse: function (data) {
            cc.PopupController.getInstance().showMessage(data.Message);
        },

        onNaptienbankingResponseError: function (data) {
            cc.PopupController.getInstance().showMessageError(data.Message);
        },

    });
}).call(this);
