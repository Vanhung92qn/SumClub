/**
 * Created by Nofear on 3/15/2019.
 */

var helper = require('Helper');
(function () {
    cc.BankingView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeStep1: cc.Node,
            // nodeStep2: cc.Node,
            // nodeHelp: cc.Node,

            // nodeLogoUSDTs: [cc.Node],

            //step1
            toggleChooseValue: cc.ToggleChooseValue,
            lbSelectedBank: cc.Label,
            animationMenuBank: cc.Animation,
            editBoxValue: cc.EditBox,
            editBoxtentk: cc.EditBox,
            editBoxnoidung: cc.EditBox,
            //  editBoxCaptcha: cc.EditBox,
            lbMoney: cc.Label,
            // imageUrlCaptcha: cc.ImageUrl,
            btnConfirm: cc.Button,
            // lbConfirms: [cc.Label],

            //step2
            // lbInfoBank: cc.Label,
            lbInfoBankAccountNumber: cc.Label,
            lbInfoBankAccountName: cc.Label,

            lbInfoBankDesc: cc.Label,
            // lbInfoMoney: cc.Label,
            //lbInfoTranID: cc.Label,

            // lbMinimum: cc.Label,
            // lbMaximum: cc.Label,
            // lbRate: cc.Label,

            //lbRule: cc.Label,
            //lbRule2: cc.Label,
            audioClick: cc.AudioSource,
            audioClickNap: cc.AudioSource,
            audioErorr: cc.AudioSource,
            abcdSprite: cc.Sprite,// Tạo thuộc tính cho sprite ABCD
            QRCODE: cc.Sprite
        },

        onLoad: function () {
            this.animOpenName = 'showDropdownMenu';
            this.animCloseName = 'hideDropdownMenu';
            this.contentChuyen = "dantri " + cc.LoginController.getInstance().getLoginResponse().AccountName;

            // cc.TopupController.getInstance().setTopupView(this);

            // this.editBoxValue.placeholder = 'Số ' + cc.Config.getInstance().currency() + ' muốn nạp';

            cc.PopupController.getInstance().showBusy();
            this.getListTopupBank();

            // Ẩn ABCD sprite và Label đếm ngược ban đầu
            this.abcdSprite.node.active = false;
        },

        onEnable: function () {
            this.animationMenuBank.node.scaleY = 0;
          //  this.getCaptcha();
            this.resetInput();

            //3s click confirm 1 lan
            this.isTimerConfirm = false;
            this.timerConfirm = 0;
            this.timePerConfirm = 3;
            this.processTimeConfirm();

            this.nodeStep1.active = true;
            //this.nodeStep2.active = false;
           // this.nodeHelp.active = false;

            if (cc.Config.getInstance().getServiceId() === cc.ServiceId.BLOCK_BUSTER_3) {
               // this.activateLogo(true);
                // switch (cc.ShopController.getInstance().getChargeDefault()) {
                //     case 'CARD':
                //         this.activateLogo(true);
                //         break;
                //     case 'BANK':
                //         this.activateLogo(true);
                //         break;
                //     default:
                //         this.activateLogo(false);
                // }
            } else {
               // this.activateLogo(false);
            }
        },

        update: function (dt) {
            if (this.isTimerConfirm) {
                this.timerConfirm -= dt;

                this.processTimeConfirm();
            }
        },

        activateLogo: function (enabled) {
            this.nodeLogoUSDTs.forEach(function (nodeLogo) {
                nodeLogo.active = enabled;
            });
        },

        getListTopupBank: function () {
            var getListTopupBankCommand = new cc.GetListTopupBankCommand;
            getListTopupBankCommand.execute(this);
        },


        onGetListTopupBankResponse: function (response) {
            cc.BankController.getInstance().setResponseTopupBanks(response);
            //this.rate = response.Rate;
            //this.min = response.Min;
            //this.max = response.Max;
            //this.contentChuyen = "thanhno " + response.Content;

            if (response.Type) {
                this.type = response.Type;
            }

            //this.lbMinimum.string = cc.Tool.getInstance().formatNumber(response.Min) + ' đ'; // + cc.Config.getInstance().currency();
            //this.lbMaximum.string = cc.Tool.getInstance().formatNumber(response.Max) + ' đ'; // + cc.Config.getInstance().currency();
            // this.lbRate.string = 'Nạp 100.000 đ nhận ' + cc.Tool.getInstance().formatNumber(Math.round(response.Rate * 100000)) + ' ' +  cc.Config.getInstance().currency();
            //this.lbRule.string = '\n' +  'Người chuyển chịu phí.\n' +
            '\n' +
                'Nhập chính xác số tiền và nội dung khi chuyển khoản. Nếu sai sẽ không nhận được ' + cc.Config.getInstance().currency() + '.\n' +
                '\n' +
                'Hệ thống tự động cộng ' + cc.Config.getInstance().currency() + ' trong vòng 3 phút kể từ khi nhận được tiền trong tài khoản ngân hàng.\n' +
                '\n' +
                'Lưu ý: Chỉ chuyển trực tiếp trong hệ thống ngân hàng hoặc chuyển nhanh 24/7  qua Napas.';

            // this.lbRule2.string = 'Nhập chính xác số tiền và nội dung khi chuyển khoản. Nếu sai sẽ không nhận được ' + cc.Config.getInstance().currency();

            // {
            //     "ResponseCode": 1,
            //     "Banks": [
            //     {
            //         "BankName": "VPBank"
            //     },
            //     {
            //         "BankName": "Techcombank"
            //     },
            //     {
            //         "BankName": "Vietcombank"
            //     },
            //     {
            //         "BankName": "ACB"
            //     }
            // ],
            //     "Rate": 1.15
            // }

            var list = response.Banks;

            this.toggleChooseValue.resetListChooseValue();

            var self = this;
            var posY = -35;// Vi tri dau tien cua Item -> fix bug
            var index = 0;
            list.forEach(function (bank) {
                self.toggleChooseValue.initializeToggleChooseValue(
                    self,
                    "BankingView",
                    "selectBankEvent",
                    bank,
                    bank.OperatorName,
                    posY
                );
                //if (index === 0) {
                //    self.setLBSelectedBank(bank);
                //}
                //index++;

                //Moi phan tu cac nhau 50 (do ko dung layout de fix bug)
                posY -= 50;
            })
        },


        activeTimeConfirm: function () {
            this.isTimerConfirm = true;
            this.timerConfirm = this.timePerConfirm;
        },

        processTimeConfirm: function () {
            if (this.timerConfirm <= 0) {
                this.isTimerConfirm = false;
                this.btnConfirm.interactable = true;

                // this.lbConfirms.forEach(function (lbConfirm) {
                // lbConfirm.string = 'Lấy thông tin';
                // });
            } else {
                var self = this;
                var time = Math.round(self.timerConfirm);
                this.isTimerConfirm = true;
                this.btnConfirm.interactable = false;
                //   this.lbConfirms.forEach(function (lbConfirm) {
                //  lbConfirm.string = time;
                // });
            }
        },

        resetScale: function () {
            this.animationMenuBank.node.scaleY = 0;
            this.animationMenuBank.node.opacity = 255;
        },

        restoreScale: function () {
            this.animationMenuBank.node.scaleY = 1;
            this.animationMenuBank.node.opacity = 0;
        },

        resetInput: function () {
            if (this.editBoxValue) {
                this.editBoxValue.string = '';
                this.lbMoney.string = 'Số tiền nhận được: ' + '0';
            }
        },

        getCaptcha: function () {
            var getCaptchaCommand = new cc.GetCaptchaCommand;
            getCaptchaCommand.execute(this);
        },

        createSpriteWithTexture(texture) {
            // Create a SpriteFrame using the loaded texture
            var spriteFrame = new cc.SpriteFrame(texture);

            // Create a Sprite with the created SpriteFrame
            var sprite = new cc.Sprite(spriteFrame);

            // Set position, scale, rotation, etc. if needed
            sprite.setPosition(cc.v2(0, 0));

            // Add the sprite to the scene or a specific node
            this.QRCODE.addChild(sprite);
        },


        randomCharacter(num_character) {
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let randomString = 'S86';
            for (let i = 0; i < num_character; i++) {
                randomString += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return randomString;
        },
        CheckBanker(codebank) {
            let Banker = 'BIDV' 
            if (codebank === 'Techcombank'){
                Banker = 'TCB'
            }else if(codebank === 'MSB'){
                 Banker = 'MSB'
            }else if(codebank === 'MB BANK'){
                Banker = 'MB'
            }else if(codebank === 'MB BANK (1)'){
                Banker = 'MB'
            }else if(codebank === 'SHB SAHA'){
                Banker = 'SHB'
            }else if(codebank === 'VIETCOMBANK'){
                Banker = 'VCB'
            }else if(codebank === 'Agribank'){
                Banker = 'VBA'
            }else if(codebank === 'ACB Á Châu'){
                Banker = 'ACB'
            }else if(codebank === 'VP BANK Việt Nam Thịnh Vượng'){
                Banker = 'VPB'
            }else if(codebank === 'TP BANK'){
                Banker = 'TPB'
            }else if(codebank === 'OCB Phương Đông'){
                Banker = 'OCB'    
            }else if(codebank === 'HDBANK'){
                Banker = 'HDB' 
            }else if(codebank === 'Sacombank'){
                Banker = 'STB'     
            }else if(codebank === 'Đông Á Bank'){
                Banker = 'DOB'
            }else if(codebank === 'CB BANK'){
                Banker = 'CBB'
            }else if(codebank === 'AB BANK'){
                Banker = 'ABB'
            }else if(codebank === 'VIỆT Á BANK'){
                Banker = 'VAB'    
            }else if(codebank === 'Nam Á Bank'){
                Banker = 'NAB' 
            }else if(codebank === 'VIB BANK Quốc Tế'){
                Banker = 'VIB'  

           }
           
            return Banker
        },

        setLBSelectedBank: function (bank) {
            this.lbSelectedBank.string = bank.OperatorName;
            var banks = bank.BankItems;
            if (banks !== null && banks !== undefined) {
                this.lbInfoBankAccountNumber.string = banks[0].BankNumber;
                this.lbInfoBankAccountName.string = banks[0].BankName;
            } else {
                this.lbInfoBankAccountNumber.string = "Vui lòng chọn ngân hàng!";
                this.lbInfoBankAccountName.string = "Vui lòng chọn ngân hàng!";
            }
            // this.lbInfoTranID.string = this.contentChuyen;
            this.bankCode = bank.OperatorName;
            this.BankNumber = banks[0].BankNumber;
            this.BankAccName = banks[0].BankName;
            this.lbInfoBankDesc.string = this.randomCharacter(5);
            // Load the image using cc.loader
            // cc.loader.load('path/to/your/image', (err, texture) => {
            //     if (err) {
            //         cc.error('Failed to load texture:', err);
            //         return;
            //     }

            //     // Create a SpriteFrame using the loaded texture
            //     const spriteFrame = new cc.SpriteFrame(texture);

            //     // Assign the SpriteFrame to the sprite component
            //     this.sprite.spriteFrame = spriteFrame;
            // });

            // Load image from URL

            // Load the image using cc.loader
            // Base64 string of the image
           // const self = this
           // http://localhost:7456/res/import/8e/
          //  cc.loader.load({ url: 'https://bay789x.me/res/raw-assets/QR/' + self.BankNumber + '.png', type: 'png', width: 150, height: 150 }, function (err, tex) {
          //      self.QRCODE.spriteFrame = new cc.SpriteFrame(tex);
         //   });



            // // Load the base64 image data into the texture
            // texture.initWithElement(img);
            // texture.handleLoadedTexture();

            // // Create a SpriteFrame from the loaded texture
            // var spriteFrame = new cc.SpriteFrame(texture);

            // // Set the sprite frame to the sprite node
            // this.QRCODE.spriteFrame = spriteFrame;



            // cc.loader.loadImg('https://baohothuonghieu.com/wp-content/uploads/2021/10/1536893974-QR-CODE-LA-GI-sblaw.jpeg', { isCrossOrigin: true }, (err, img) => {
            //     if (err) {
            //         cc.error("Failed to load image:", err);
            //         return;
            //     }

            //     // Create a texture from the loaded image
            //     var texture = new cc.Texture2D();
            //     texture.initWithElement(img);
            //     texture.handleLoadedTexture();

            //     // Call your function to create sprite with loaded texture
            //     this.createSpriteWithTexture(texture);
            // });


           // http://localhost:7456/res/import/8e/
            // console.log('bank code:', this.bankCode)
            this.Bankers = this.CheckBanker(this.bankCode);   
        },

        selectBank: function (value) {
            this.bankType = value;
        },

        onGetCaptchaResponse: function (response) {
            if (this.imageUrlCaptcha)
                this.imageUrlCaptcha.get('data:image/png;base64,' + cc.Tool.getInstance().removeStr(response[1], '\r\n'));
        },

        onChargeBankResponse: function (response) {
            //if (response.Message)
            //    cc.PopupController.getInstance().showMessage(response.Message);
            //else if (response.Description)
            //    cc.PopupController.getInstance().showMessage(response.Description);
            //else {
            if (response != null) {
                var orders = response.Orders;
                this.orders = orders;
                this.banks = orders.List;

                //this.lbInfoBank.string = orders.List.ID;
                this.lbInfoBankAccountNumber.string = orders.List.BankNumber;
                this.lbInfoBankAccountName.string = orders.List.BankName;
                //this.lbInfoMoney.string = cc.Tool.getInstance().formatNumber(orders.Amount);
                var macode = helper.randomStringABC(5);
                var name = cc.LoginController.getInstance().getLoginResponse();
                //this.lbInfoTranID.string = "Btc "+macode+name.AccountName;
                // this.lbInfoTranID.string = orders.List.code+" "+macode+name.AccountName;
                //HH:MM ngày DDMMYY
                //var lateTime = cc.Tool.getInstance().getLocalDateNow3(-2);
                //this.lbRule2.string = 'Hãy chuyển tiền vào tài khoản ngân hàng theo nội dung bên dưới.\nThời gian chuyển chậm nhất ' + lateTime + ' (2 giờ).'
            }

            //cc.PopupController.getInstance().showMessage('Gửi yêu cầu nạp thành công.');

            //this.getCaptcha();
            this.resetInput();
        },

        onChargeBankResponseError: function (response) {
            if (response.Description)
                cc.PopupController.getInstance().showMessageError(response.Description);
            else
                cc.PopupController.getInstance().showMessageError(response.Message, response.ResponseCode);

            // this.getCaptcha();
            //nap that bai thi reset captcha
            //this.editBoxCaptcha.string = '';
        },

        copyBankClicked: function () {

        },

        copyBankAccountNumberClicked: function () {
            this.audioClick.loop = false;
            this.audioClick.play();
            if (cc.Tool.getInstance().copyToClipboard(this.lbInfoBankAccountNumber.string)) {
                cc.PopupController.getInstance().showMessage('Đã sao chép số tài khoản.');
            }
        },

        copyBankAccountNameClicked: function () {
            this.audioClick.loop = false;
            this.audioClick.play();
            if (cc.Tool.getInstance().copyToClipboard(this.lbInfoBankAccountName.string)) {
                cc.PopupController.getInstance().showMessage('Đã sao chép tên tài khoản.');
            }
        },

        copyMoneyValueClicked: function () {

        },

        copylbInfoBankDesc: function () {
            this.audioClick.loop = false;
            this.audioClick.play();
            if (cc.Tool.getInstance().copyToClipboard(this.lbInfoBankDesc.string)) {
                cc.PopupController.getInstance().showMessage('Đã sao chép nội dung chuyển khoản.');
            }
        },

        copyTranIDClicked: function () {
            this.audioClick.loop = false;
            this.audioClick.play();
            if (this.banks != null && cc.Tool.getInstance().copyToClipboard(this.lbInfoTranID.string)) {
                cc.PopupController.getInstance().showMessage('Đã sao chép nội dung chuyển khoản.');
            }
        },

        onEditingValueChanged: function () {
            var val = cc.Tool.getInstance().removeDot(this.editBoxValue.string);
            this.editBoxValue.string = cc.Tool.getInstance().formatNumberkvn1102(val);

            //fix loi lam tron
            // if (this.rate === 1.15
            //     && (val === 100 || val === 100000 || val === 100000000 ||
            //         val === 200 || val === 200000 || val === 200000000 ||
            //         val === 400 || val === 400000 || val === 400000000 ||
            //         val === 700 || val === 700000 || val === 700000000 ||
            //         val === 800 || val === 800000 || val === 800000000
            //     )) {
            //     var receive = Math.floor(val * this.rate) + 1;
            // } else {
            //     receive = Math.floor(val * this.rate);
            // }
            var receive = Math.round(val * this.rate);

            this.lbMoney.string = 'Số ' + cc.Config.getInstance().currency() + ' nhận được: ' + cc.Tool.getInstance().formatNumber(receive);
        },

        onEditingValueDidEnd: function () {
            var val = cc.Tool.getInstance().removeDot(this.editBoxValue.string);
            this.editBoxValue.string = cc.Tool.getInstance().formatNumberkvn1102(val);

            //fix loi lam tron
            // if (this.rate === 1.15
            //     && (val === 100 || val === 100000 || val === 100000000 ||
            //         val === 200 || val === 200000 || val === 200000000 ||
            //         val === 400 || val === 400000 || val === 400000000 ||
            //         val === 700 || val === 700000 || val === 700000000 ||
            //         val === 800 || val === 800000 || val === 800000000
            //     )) {
            //     var receive = Math.floor(val * this.rate) + 1;
            // } else {
            //     receive = Math.floor(val * this.rate);
            // }

            var receive = Math.round(val * this.rate);

            this.lbMoney.string = 'Số ' + cc.Config.getInstance().currency() + ' nhận được: ' + cc.Tool.getInstance().formatNumber(receive);
        },

        openMenuBankClicked: function () {
            this.animationMenuBank.play(this.animOpenName);
            this.audioClick.loop = false;
            this.audioClick.play();
        },

        hideMenuBankClicked: function () {
            this.animationMenuBank.play(this.animCloseName);
        },

        selectBankEvent: function (event, data) {
            this.bankCode = data.bankCode;
            this.selectBank(data.BankName);
            this.setLBSelectedBank(data);
            this.animationMenuBank.play(this.animCloseName);
            this.audioClick.loop = false;
            this.audioClick.play();
        },

        chooseBankClicked: function (event, data) {
            this.selectBank(data.toString());
            this.setLBSelectedBank(data.toString());
        },

        refreshCaptchaClicked: function () {
            this.getCaptcha();
        },

        historyClicked: function () {
            cc.LobbyController.getInstance().createHistoryView(cc.HistoryTab.BANK);
        },

        continueClicked: function () {
            this.nodeStep1.active = true;
            this.nodeStep2.active = false;
            this.resetInput();
        },

        topupClicked: function () {
            this.VarAmount = helper.getOnlyNumberInString(this.editBoxValue.string);
            this.amount = cc.Tool.getInstance().removeDot(this.editBoxValue.string);
            // this.captcha = this.editBoxCaptcha.string;
            if (this.lbSelectedBank.string === 'CHỌN NGÂN HÀNG') {
                cc.PopupController.getInstance().showMessage('Vui lòng chọn ngân hàng.');
                this.audioErorr.loop = false;
                this.audioErorr.play();
                return;
            }
            if (this.editBoxValue.string === '') {
                cc.PopupController.getInstance().showMessage('Vui lòng nhập số tiền muốn nạp.');
                this.audioErorr.loop = false;
                this.audioErorr.play();
                return;
            }

            if (this.editBoxtentk === '') {
                cc.PopupController.getInstance().showMessage('Vui lòng nhập tên người gửi.');
                this.audioErorr.loop = false;
                this.audioErorr.play();
                return;
            }
            if (this.editBoxnoidung === '') {
                cc.PopupController.getInstance().showMessage('Vui lòng nhập nội dung chuyển tiền.');
                this.audioErorr.loop = false;
                this.audioErorr.play();
                return;
            }

            if (this.amount > 300000000) {
                cc.PopupController.getInstance().showMessage('Số tiền nạp tối đa là 300.000.000 đ');
                this.audioErorr.loop = false;
                this.audioErorr.play();
                return;
            }

            if (this.amount < this.min) {
                cc.PopupController.getInstance().showMessage('Số tiền nạp tối thiểu là ' + cc.Tool.getInstance().formatNumber(this.min) + ' đ');
                this.audioErorr.loop = false;
                this.audioErorr.play();
                return;
            }
            if (this.amount < 50000) {
                cc.PopupController.getInstance().showMessage('Số tiền nạp tối thiểu là 50.000 đ');
                this.audioErorr.loop = false;
                this.audioErorr.play();
                return;
                }
                const self = this;
                var urlPay = `https://img.vietqr.io/image/${this.Bankers}-${this.BankNumber}-qr_only.jpg?amount=${this.VarAmount}&addInfo=${this.lbInfoBankDesc.string}`;
                
                cc.loader.load({ url: `${urlPay}`, type: 'jpg', width: 150, height: 150 }, function (err, tex) {
                    if (err) {
                        cc.error('Failed to load image:', err);
                        return;
                    }
                    
                    var qrSpriteNode = new cc.Node('QRprite');
                    var qrSprite = qrSpriteNode.addComponent(cc.Sprite);
                    qrSprite.spriteFrame = new cc.SpriteFrame(tex);
                    var targetSize = 200;
                    var originalSize = qrSprite.spriteFrame.getOriginalSize();
                    var scale = targetSize / Math.max(originalSize.width, originalSize.height);
                    qrSpriteNode.setScale(scale);
                    qrSpriteNode.setPosition(0, 0);
                    
                    self.QRCODE.node.addChild(qrSpriteNode);
                    qrSpriteNode.zIndex = 0;
                    
                    var abcdSpriteNode = new cc.Node('ABCD');
                    var abcdSprite = abcdSpriteNode.addComponent(cc.Sprite);
                    abcdSpriteNode.setPosition(0, 0);
                    abcdSpriteNode.setScale(scale);
                    self.QRCODE.node.addChild(abcdSpriteNode);
                    abcdSpriteNode.zIndex = 1;
                    
                    self.abcdSprite.node.active = true;
                    self.QRCODE.node.active = true;
                });
            this.VarNganHang = this.lbSelectedBank.string;
            this.VarSoTk = this.lbInfoBankAccountNumber.string;
            this.VarNameTk = this.lbInfoBankAccountName.string;

            this.VarNguoigui = this.lbInfoBankDesc.string;
            this.VarAmount = helper.getOnlyNumberInString(this.editBoxValue.string);
            this.VarCodeValue = this.editBoxnoidung.string;
            this.VarBankName = this.lbSelectedBank.string;

            var Naptienbanking = new cc.Naptienbanking;
            Naptienbanking.execute(this);
            this.activeTimeConfirm();
            this.audioClickNap.loop = false;
            this.audioClickNap.play();
        },
        onNaptienbankingResponse: function (data) {
            cc.PopupController.getInstance().showMessage(data.Message);
        },
        onNaptienbankingResponseError: function (data) {
            cc.PopupController.getInstance().showMessageError(data.Message);
        },
        helpClicked: function () {
            // this.nodeHelp.active = true;
        },

        closeHelpClicked: function () {
            this.nodeHelp.active = false;
        },
    });
}).call(this);
