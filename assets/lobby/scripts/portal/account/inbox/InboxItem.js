/**sprite
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.InboxItem = cc.Class({
        "extends": cc.Component,
        properties: {
            sprite: cc.Sprite,

            lbTitle: cc.Label,
            lbTime: cc.Label,
            lbContent: cc.Label,

            nodeDetail: cc.Node,
            nodeOpen: cc.Node,
            nodeClose: cc.Node,
            nodeGiftCode: cc.Node,
            nodeSelect: cc.Node,

            sfRead: cc.SpriteFrame,
            sfUnRead: cc.SpriteFrame
        },

        initItem: function (item, parent) {
            this.parent = parent;
            this.lbTitle.string = item.Title;
            this.lbTime.string = cc.Tool.getInstance().convertUTCTime(item.CreatedTime);

            if (item.Status.toString() === cc.MailStatus.READ) {
                //this.sprite.spriteFrame = this.sfRead;
            } else {
                //this.sprite.spriteFrame = this.sfUnRead;
            }
            //this.sprite.enabled = true;

            this.nodeDetail.active = false;
            this.nodeOpen.active = true;
            //this.nodeClose.active = false;

            var content = item.Content;

            //tim xem co GC ko?
            var isGC = content.includes("<gc>");
            if (isGC) {
                //lay giftcode ra
                this.giftcode =  content.substring(content.indexOf("<gc>") + 4, content.indexOf("</gc>"));

                //xoa the <gc>
                content = content.replace("<gc>", "");
                content = content.replace("</gc>", "");
            } else {
                this.giftcode = '';
            }

            this.lbContent.string = content;

            this.item = item;
        },

        updateItem: function (item) {

        },

        onUpdateStatusMailResponse: function (response, status) {
            switch (status.toString()) {
                case cc.MailStatus.READ:
                    this.item.Status = status;
                    //this.sprite.spriteFrame = this.sfRead;
                    break;
                case cc.MailStatus.DELETE:
                    this.node.destroy();

                    //goi refresh lai inbox
                    cc.InboxController.getInstance().getInbox();
                    break;
            }

            //update xong -> kiem tra lai trang thai
            cc.LobbyController.getInstance().getMailUnRead();
        },

        openClicked: function () {
            this.parent.inboxUnselect();
            this.parent.inboxSetContent(this.lbTitle.string, this.lbContent.string);

            this.nodeOpen.active = false;
            //this.nodeClose.active = true;
            //this.nodeDetail.active = true;
            //this.sprite.enabled = false;
            this.nodeSelect.active = true;

            //Tim xem co giftcode ko?
            if (this.giftcode !== '') {
                this.nodeGiftCode.active = true;
            } else {
                this.nodeGiftCode.active = false;
            }

            if (this.item.Status.toString() === cc.MailStatus.UNREAD) {
                var updateStatusMailCommand = new cc.UpdateStatusMailCommand;
                updateStatusMailCommand.execute(this, parseInt(cc.MailStatus.READ));
            }
        },

        closeClicked: function () {
            this.nodeOpen.active = true;
            //this.nodeClose.active = false;
            //this.nodeDetail.active = false;
            this.nodeGiftCode.active = false;
            //this.sprite.enabled = true;
            this.nodeSelect.active = false;
        },

        deleteClicked: function () {
            //chuyen sang status = -1 -> da xoa
            var updateStatusMailCommand = new cc.UpdateStatusMailCommand;
            updateStatusMailCommand.execute(this, parseInt(cc.MailStatus.DELETE));
        },

        openGiftcodeClicked: function () {
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.Tool.getInstance().setItem('@GC', this.giftcode);
                cc.LobbyController.getInstance().createGiftcodeView();
                cc.LobbyController.getInstance().destroyAccountView();
            }
        },
    });
}).call(this);
