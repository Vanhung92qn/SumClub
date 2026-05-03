/**
 * Created by Nofear on 6/7/2017.
 */

var netConfig = require('NetConfig');

(function () {
    cc.ChatView2 = cc.Class({
        "extends": cc.Component,
        properties: {
            chatListView: cc.ChatListView,

            scrollView: cc.ScrollView,
            rtContent: cc.RichText,
            editBoxChat: cc.EditBox,
            btnSendChat: cc.Button,
            channelId: 'taixiu',
        },

        onLoad: function () {
            cc.ChatController.getInstance().setChatView(this);

            this.lastTimeReconnect = (new Date()).getTime();
            this.listChatFormat = [];
        },

        onEnable: function () {
            var chatNegotiateCommand = new cc.ChatNegotiateCommand;
            chatNegotiateCommand.execute(this);
        },

        onDisable: function () {
            this.rtContent.string = '';

            if (this.chatHub)
                this.chatHub.disconnect();
            this.unscheduleAllCallbacks();
        },

        reconnect: function () {
            // console.log('chatHub reconnect');
            this.lastTimeReconnect = (new Date()).getTime();
            this.chatHub.connect(this, cc.HubName.ChatHub, this.connectionToken, true, this.channelId);
        },

        sendRequestOnHub: function (method, data) {
            // console.log('sendRequestOnHub: ' + method);
            switch (method) {
                case cc.MethodHubName.REGISTER_CHAT:
                    this.chatHub.register();
                    break;
                case cc.MethodHubName.UNREGISTER_CHAT:
                    this.chatHub.unregister();
                    break;
                case cc.MethodHubName.SEND_MESSAGE:
                    this.chatHub.sendMessage(data);
                    break;
            }
        },

        showChat: function () {
            var length = this.listChat.length;
            var start = Math.max(this.listChat.length - 15, 0);

            if (length > 15) {
                this.listChat = this.listChat.splice(start, length);
            }

            var lengthChat = this.listChat.length;
            var content = '';
            for (var i = 0; i < lengthChat; i++) {
                if (content !== '') {
                    var chatLine = ('\n' + this.formatChatUser(this.listChat[i]));
                    content += chatLine;
                    this.listChatFormat.push(chatLine);
                } else {
                    chatLine = (this.formatChatUser(this.listChat[i]));
                    content += chatLine ;
                    this.listChatFormat.push(chatLine);
                }
            }

            this.rtContent.string = content;

            this.scrollView.scrollToBottom();
        },

        addChatContent: function (message) {
            var chatLine = '\n' + this.formatChatUser(message);
            this.listChatFormat.push(chatLine);

            var length = this.listChatFormat.length;

            if (length > 15) {
                this.listChatFormat = this.listChatFormat.splice(1, length);
            }

            var lengthChat = this.listChatFormat.length;
            var content = '';
            for (var i = 0; i < lengthChat; i++) {
                content += this.listChatFormat[i];
            }

            this.rtContent.string = content;

            this.scrollView.scrollToBottom();
        },

//
        formatChatUser: function (chatItem) {//
            //var hubName = cc.Config.getInstance().getServiceName(chatItem.s.toString());
            //chat cua admin
            if (chatItem.ad) {//
                return '<color=#FCE700>' + chatItem.n + ': </color>' + chatItem.c;
            } else {
                return '<color=#06EEFA>' + chatItem.n + ': </color>' + chatItem.c;
            }
        },

        onChatNegotiateResponse: function (response) {
            this.connectionToken = response.ConnectionToken;
            this.chatHub = new cc.Hub;
            this.chatHub.connect(this, cc.HubName.ChatHub, response.ConnectionToken, false, this.channelId);
            cc.PopupController.getInstance().hideBusy();
        },

        onHubMessage: function (response) {
            if (response.M !== undefined && response.M.length > 0) {
                var m = (response.M)[0];
                switch (m.M) {
                    //danh sach chat cuoi
                    case cc.MethodHubOnName.LIST_LAST_MESSAGES:

                        var data = m.A[0];
                        this.listChat = JSON.parse(data);
                        this.showChat();
                        break;
                    //message nhan dc
                    case cc.MethodHubOnName.RECEIVE_MESSAGE:
                        this.addChatContent(m.A[0]);
                        break;
                    //message he thon
                    case cc.MethodHubOnName.SYSTEM_MESSAGE:
                        this.addChatContent(m.A[0]);
                        break;
                    case cc.MethodHubOnName.MESSAGE:
                        cc.PopupController.getInstance().showMessage(m.A[0]);
                        break;
                }
            } else {
                //PING PONG
                if (response.I) {
                    this.chatHub.pingPongResponse(response.I);
                }
            }
        },

        onHubOpen: function () {
            //Mo nut send Chat
            this.btnSendChat.interactable = true;
            //reset content
            this.rtContent.string = '';
            this.sendRequestOnHub(cc.MethodHubName.REGISTER_CHAT);
        },

        onHubClose: function () {
            //khoa nut send Chat
            this.btnSendChat.interactable = false;

            if ((new Date()).getTime() - this.lastTimeReconnect >= netConfig.RECONNECT_TIME * 1000) {
                this.reconnect();
            } else {
                cc.director.getScheduler().schedule(this.reconnect, this, netConfig.RECONNECT_TIME, 0, 0, false);
            }
        },

        onHubError: function () {
            // if ((new Date()).getTime() - this.lastTimeReconnect >= netConfig.RECONNECT_TIME * 1000) {
            //     this.reconnect();
            // } else {
            //     cc.director.getScheduler().schedule(this.reconnect, this, netConfig.RECONNECT_TIME, 0, 0, false);
            // }
        },

        editingReturn: function () {
            if (this.editBoxChat.string === '') {
                //thong bao?

                return;
            }
            this.sendRequestOnHub(cc.MethodHubName.SEND_MESSAGE, this.editBoxChat.string);

            //xoa noi dung nhap
            this.editBoxChat.string = '';
        },

        sendChatClicked: function () {
            if (this.editBoxChat.string === '') {
                //thong bao?

                return;
            }
            this.sendRequestOnHub(cc.MethodHubName.SEND_MESSAGE, this.editBoxChat.string);

            //xoa noi dung nhap
            this.editBoxChat.string = '';
        }
    });
}).call(this);
