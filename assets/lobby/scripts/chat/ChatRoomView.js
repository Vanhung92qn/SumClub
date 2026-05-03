/**
 * Created by Nofear on 6/7/2017.
 */


(function () {
    cc.ChatRoomView = cc.Class({
        "extends": cc.Component,
        properties: {
            chatListView: cc.ChatRoomListView,
            editBoxChat: cc.EditBox,
            btnSendChat: cc.Button,

            nodeEmotion: cc.Node,
            nodeNormalChat: cc.Node,
        },

        onLoad: function () {
            cc.ChatRoomController.getInstance().setChatView(this);

            var posX = -cc.view.getVisibleSize().width / 2;
            //set vi tri x
            this.node.x = posX;

            this.listChat = [];
            this.animation = this.node.getComponent(cc.Animation);

            this.emotionStr = [
                '1-waaaht',
                '2-misdoubt',
                '3-boss',
                '4-beauty',
                '5-byebye',
                '6-after_boom',
                '7-matrix',
                '8-sweat',
                '9-choler',
                '10-beated',
                '11-angry',
                '12-ah',
                '13-beat',
                '14-adore',
                '15-beat_shot',
                '16-extreme', //
                '20-burn_joss_stick',
                '21-baffle',
                '22-cool',
                '23-dribble',
                '24-tire',
                '25-BigSmile'
            ];

            this.chatShortcuts = [
                'Nói nhiều quá đánh đi!',
                'Ngại gì vết bẩn?',
                'Chơi thì chơi ko chơi thì té',
                'Ahihi!',
                'Max nhọ !!!',
                'Ngon quá hehe!'
            ];
        },

        checkIsEmotion: function (message) {
            return this.emotionStr.includes(message[1]);
        },

        getIndexEmotion: function (message) {
            return this.emotionStr.indexOf(message[1]);
        },

        addChatContent: function (message) {
            //neu chua ky tu emotion thi ko hien thi text ra khung chat
            if (this.emotionStr.includes(message[1])) {
                this.chatListView.scrollView.scrollToBottom();
                return;
            }

            this.listChat.push(message);
            if (this.listChat.length > 15) {
                this.listChat.splice(0, 1);
                this.chatListView.updateList(this.listChat);
            } else {
                this.chatListView.resetList();
                this.chatListView.initialize(this.listChat);
            }

            this.chatListView.scrollView.scrollToBottom();
        },

        editingReturn: function () {
            if (this.editBoxChat.string === '') {
                //thong bao?

                return;
            }
            // this.sendRequestOnHub(cc.MethodHubName.SEND_MESSAGE, this.editBoxChat.string);
            cc.ChatRoomController.getInstance().sendRequestOnHub(cc.MethodHubName.SEND_MESSAGE, this.editBoxChat.string);

            //xoa noi dung nhap
            this.editBoxChat.string = '';
        },

        showChat: function () {
            this.animation.play('showChatRoom');
            this.nodeEmotion.active = false;
            this.nodeNormalChat.active = true;
        },

        sendChatClicked: function () {
            if (this.editBoxChat.string === '') {
                //thong bao?

                return;
            }
            // this.sendRequestOnHub(cc.MethodHubName.SEND_MESSAGE, this.editBoxChat.string);
            cc.ChatRoomController.getInstance().sendRequestOnHub(cc.MethodHubName.SEND_MESSAGE, this.editBoxChat.string);

            //xoa noi dung nhap
            this.editBoxChat.string = '';

            this.animation.play('hideChatRoom');
        },

        chatShortcutClicked: function (event, data) {
            var index = parseInt(data.toString());
            cc.ChatRoomController.getInstance().sendRequestOnHub(cc.MethodHubName.SEND_MESSAGE, this.chatShortcuts[index]);
            this.animation.play('hideChatRoom');
        },

        chatEmotionClicked: function (event, data) {
            var index = parseInt(data.toString());
            cc.ChatRoomController.getInstance().sendRequestOnHub(cc.MethodHubName.SEND_MESSAGE, this.emotionStr[index]);
            this.animation.play('hideChatRoom');
        },

        showEmotionClicked: function () {
            if (this.nodeEmotion.active) {
                this.nodeEmotion.active = false;
                this.nodeNormalChat.active = true;
            } else {
                this.nodeEmotion.active = true;
                this.nodeNormalChat.active = false;
            }
        },

        showChatClicked: function () {
            this.showChat();
        },

        hideChatClicked: function () {
            this.animation.play('hideChatRoom');
        },
    });
}).call(this);
