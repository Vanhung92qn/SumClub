/**
 * Created by Nofear on 3/15/2019.
 */
//var InboxListData = require('InboxListData');

(function () {
    cc.InboxView = cc.Class({
        "extends": cc.Component,
        properties: {
            inboxTemp: cc.Node,
            inboxParent: cc.Node,

            lbInfo: cc.Label,

            tabs: [cc.Node],
            tabName: [cc.Label],

            lblTitle: cc.Label,
            lblDesc: cc.Label,
        },

        onLoad: function () {
            cc.InboxController.getInstance().setInboxView(this);
            this.getInbox(1);
			this.animation = this.node.getComponent(cc.Animation);
        },
		onEnable: function () {
          this.animation.play('openPopup');
        },

        getInbox: function (index) {
            var children = this.inboxParent.children;
            for (var i = children.length - 1; i >= 0; i--) {
                this.inboxParent.removeChild(children[i]);
            }
            this.inboxItems = [];

            switch (Number.parseInt(index)) {
                case 0:
                    this.inboxSetContent(index==0? 'Hộp thư cá nhân rỗng!' : '', '');
                    break;
                case 1:
                    var userMailCommand = new cc.UserMailCommand;
                    userMailCommand.execute(this);
                    break;
            }
        },

        inboxUnselect: function() {
            var children = this.inboxParent.children;
            for (var i = children.length - 1; i >= 0; i--) {
                children[i].getComponent('InboxItem').closeClicked();
            }
        },

        inboxSetContent: function(title, desc) {
            this.lblTitle.string = title;
            this.lblDesc.string = desc;
        },

        onUserMailResponse: function (response) {
            var list = response.List;
            //list = InboxListData; //test
            this.tabInboxCount(0, 0);
            this.tabInboxCount(1, list.length);

            // add default msg
            var item = {
                Title: "Chào mừng quý khách",
                CreatedTime: new Date(),
                Status: '1',
                Content: 'Chào mừng quý khách đến với cổng giải trí trực tuyến Hot nhất hiện nay.\nQuý khách có thể trải nghiệm hàng loạt trò chơi vô cùng hấp dẫn, đăng ký dễ dàng, giao dịch nhanh chóng qua nhiều cổng giao dịch rất tiện lợi.\nTỷ lệ quy đổi 1-1 không mất phí.\nHệ thống nạp tiền đa dạng qua ngân hàng, momo và thẻ cào.\nHỗ trợ khách hàng 24/7 tất cả các ngày. Chúc quý khách luôn vui vẻ và gặp nhiều may mắn.',
            }
            var nodeInbox = cc.instantiate(this.inboxTemp);
            nodeInbox.parent = this.inboxParent;
            var inboxItem = nodeInbox.getComponent(cc.InboxItem);
            inboxItem.initItem(item, this);
            this.inboxItems.push(inboxItem);
            inboxItem.openClicked();

            if (list !== null && list.length > 0) {
                this.lbInfo.string = '';

                var self = this;
                list.forEach(function (item) {
                    var nodeInbox = cc.instantiate(self.inboxTemp);
                    nodeInbox.parent = self.inboxParent;
                    var inboxItem = nodeInbox.getComponent(cc.InboxItem);
                    inboxItem.initItem(item, self);
                    self.inboxItems.push(inboxItem);
                });
            // } else {
            //     this.lbInfo.string = 'Không có thông báo nào';
            }
        },

        onSystemMailResponseError: function (response) {
            this.lbInfo.string = 'Không có thông báo nào';
        },

        tabSelect: function(data, index) {
            for (var i = 0; i < this.tabs.length; i++) {
                this.tabs[i].active = false;
            }

            this.tabs[index].active = true;
            this.getInbox(index);
        },

        tabInboxCount: function(index, amount) {
            this.tabName[index].string = (index==0? 'CÁ NHÂN' : 'HỆ THỐNG') + ' (' + amount + ')';
        }
    });
}).call(this);
