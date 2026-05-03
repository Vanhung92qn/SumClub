/**
 * Created by Nofear on 6/7/2017.
 */


(function () {
    cc.SbChatRoomView = cc.Class({
        "extends": cc.Component,
        properties: {
            chatListView: cc.ChatRoomListView,
			btnHidechat: cc.Node,
			nodeChat: cc.Node,
            editBoxChat: cc.EditBox,
            nodeEmotion: cc.Node,
            nodeNormalChat: cc.Node,
			btnTxtChat: cc.Node,
			btnEmoj: cc.Node,
        },

        onLoad: function () {
            cc.ChatRoomController.getInstance().setChatView(this);
            this.listChat = [];
            this.emotionStr = [
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12'
            ];

            this.xxShortcuts = [
				'Tất tay nào anh em!',
				'Bạc đỏ muốn thua cũng khó',
				'Má! bẻ cầu lại thua đau thật',
				'Ăn thông nhé bà con. Toàn chuẩn vị.',
				'Cầu này khó quá. Đánh chậm lại nhé ae!',
				'Đặt chẵn ra lẻ, đặt lẻ ra chẵn',
				'Tới cầu của tôi rồi nhé. Các ông theo tôi kiếm tiền',
				'Đm cầu ảo vãi',
				'Xin 1 tay chuẩn vị nào anh em',
				'Chẵn đi ae',
				'Lẻ đi ae',
				'Gãy phát này đau quá',
				'Thôi rồi Lẻ ơi!',
				'Chẵn ơi em ở đâu!',
				'1 ván thành vô sản luôn, đậu xanh!!!',
				'Móa lại sập cầu',
				'Thời tới khó cản',
				'Đỏ rồi ae ơi',
				'Hũ ơi em ở đâu?',
				'Mày chạy đâu cho thoát Hũ ơi'
            ];
			
			this.baucuaChatShortcuts = [
				'Thanh xuân chờ hũ nổ.',
				'Dễ ăn vcl',
				'Im đi!!!',
				'Anh em cho xin cái lộc nào!',
				'Gấp mấy tay ra đảo luôn.',
				'Bỏ lại ra. Má nó !!!',
				'1 phát ăn luôn hũ, dm.',
				'Gà ăn cám nãy giờ.',
				'Nuôi con nào đây ae?',
				'Hũ sắp nổ anh em vô tiền mạnh nào.',
				'Trúng không trượt phát nào',
				'Hôm nay đen quá!',
				'Đặt vui để ăn cái hũ thôi',
				'Nuôi nãy giờ toàn tịt.',
				'Tôm, Cua hết ngon cmnr.',
				'Nhắm mắt đưa tay lại ăn.',
				'Nai ra đúng lúc keo bỏ.',
				'Cá dạo này phất nè.'
			];
			
			this.bacaratChatShortcuts = [
				'Thua 1 điểm ăn cứt à, dkm',
				'Clgt, Tây Tây cái đầu buồi',
				'Tất đê, bất quá ngủ gầm cầu',
				'Đôi cái nào, xin tý lộc đi bé',
				'Toang! Ai nhảy cầu chung ko?',
				'Hòa thế chó nào... Ngu người',
				'Ván này đôi chắc, tin tao đê',
				'Bố mày trùm Bacarat đây!'
			];
			
			this.sicboChatShortcuts = [
				'ĐM ván này về Tài nha.',
				'Tài đê anh em. Tài đêêê',
				'Có thằng nào xỉu với tao không?',
				'Không Xỉu tao làm con tụi bây',
				'Cho em xin Bão 1 ván.',
				'Anh phán như thần.',
				'Thời của anh tới rồi!',
				'Mẹ, xuống xác là banh xác.',
				'Cầu như...cái cầu tiêu'
			];
			
			this.tlmnChatShortcuts = [
				'Đánh nhanh đê.',
				'Bài to khiếp.',
				'Không xong rồi đại vương ơi.',
				'Đút ngay 3 Bích chén ngay con gà.',
				'Bài toàn thiếu nhi.',
				'Thốn vãi.',
				'Hàng đâu hết rồi ta.',
				'Bài tốt đánh dốt cũng thắng.',
				'Đánh hay đánh tiếp đi cưng.',
				'Nhanh đi cha nội.',
				'Mình anh chấp hết.',
				'Móa lại thua nữa.',
				'Heo cả đàn.',
				'Ôi cái cuộc đời.',
				'Cây này đúng nhọ.',
				'Bài đẹp vô đối.',
				'Nghĩ thật lâu, đánh thật ngu.',
				'Nhớ bài hay thế.'
			];
			
			this.pokerChatShortcuts = [
				'Nghĩ gì lâu thế cha??',
				'Chống tao chỉ có chếttt :)))))',
				'Thua hoài, chắc tao chếttt',
				'Chơi vui không quạu nha!',
				'Tất tay mất ngay tạ thóc',
				'Ván này ra đảo rồi',
				'Tuổi gì sánh với tao ván này',
				'Tao nhòn mà tao tứcccc',
				'Tới luôn bác tài ơiiiiiiiii',
				'Úp bài đi mấy chú',
				'Câu đúng ao cá.:))',
				'Méo tin được',
				'Thích thì nhích',
				'Bài xấu quá',
				'Bài này tố thì có bán nhà',
				'Đỏ thôi đen quên đi',
				'Cưng thích a khô máu với cưng',
				'Nhẹ tay thôi ae!'
			];
			
			this.mbChatShortcuts = [
				  'Binh không cần suy nghĩ',
				  'Sập chết các chú',
				  'Cù lũ tàng hình rồi',
				  'Tèn tén ten tennnnn',
				  'Bài này bán nhà luôn',
				  'Toang rồi Ông Giáo ạ',
				  'Thùng phá sảnh nhỏ thôi',
				  'Vậy mà nó méo sập',
				  'Chi cuối cứu cả làng',
				  'Suy nghĩ lâu nhỉ',
				  'Bài thế này thì chịu',
				  'Hôm nay không may rồi',
				  'Chia bài đen thế',
				  'Bài đẹp vô đối',
				  'Xếp bài đúng ngu',
				  'Xếp đỉnh vãi'
			];
        },

        onBacaratShowChat: function () {
			this.btnHidechat.active = true;
            this.nodeEmotion.active = false;
			this.btnTxtChat.active = false;
			this.btnEmoj.active = true;
            this.nodeNormalChat.active = true;
            cc.tween(this.nodeChat)
                .to(0.3, { position: cc.v2(570, this.nodeChat.y) })
                .start();
        },
		
        onClickShowChat: function () {
			this.btnHidechat.active = true;
            this.nodeEmotion.active = false;
			this.btnTxtChat.active = false;
			this.btnEmoj.active = true;
            this.nodeNormalChat.active = true;
            cc.tween(this.nodeChat)
                .to(0.3, { position: cc.v2(550, this.nodeChat.y) })
                .start();
        },

        onClickHideChat: function () {
            cc.tween(this.nodeChat)
                .to(0.3, { position: cc.v2(1020, this.nodeChat.y) })
                .start();
			this.btnHidechat.active = false;
        },
		
        checkIsEmotion: function (message) {
            return this.emotionStr.includes(message[1]);
        },

        getIndexEmotion: function (message) {
            return this.emotionStr.indexOf(message[1]);
        },

        addChatContent: function (message) {
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
                return;
            }
            cc.ChatRoomController.getInstance().sendRequestOnHub(cc.MethodHubName.SEND_MESSAGE, this.editBoxChat.string);
            this.editBoxChat.string = '';
			this.onClickHideChat();
        },

        showChat: function () {
            this.nodeEmotion.active = false;
            this.nodeNormalChat.active = true;
        },

        sendChatClicked: function () {
            if (this.editBoxChat.string === '') {
                return;
            }
            cc.ChatRoomController.getInstance().sendRequestOnHub(cc.MethodHubName.SEND_MESSAGE, this.editBoxChat.string);
            this.editBoxChat.string = '';
            this.onClickHideChat();
        },

        xxChatShortcutClicked: function (event, data) {
            var index = parseInt(data.toString());
            cc.ChatRoomController.getInstance().sendRequestOnHub(cc.MethodHubName.SEND_MESSAGE, this.xxShortcuts[index]);
			this.onClickHideChat();
        },
		
        baucuaChatShortcutClicked: function (event, data) {
            var index = parseInt(data.toString());
            cc.ChatRoomController.getInstance().sendRequestOnHub(cc.MethodHubName.SEND_MESSAGE, this.baucuaChatShortcuts[index]);
			this.onClickHideChat();
        },

        bacaratChatShortcutClicked: function (event, data) {
            var index = parseInt(data.toString());
            cc.ChatRoomController.getInstance().sendRequestOnHub(cc.MethodHubName.SEND_MESSAGE, this.bacaratChatShortcuts[index]);
			this.onClickHideChat();
        },

        sicboChatShortcutClicked: function (event, data) {
            var index = parseInt(data.toString());
            cc.ChatRoomController.getInstance().sendRequestOnHub(cc.MethodHubName.SEND_MESSAGE, this.sicboChatShortcuts[index]);
			this.onClickHideChat();
        },

        tlmnChatShortcutClicked: function (event, data) {
            var index = parseInt(data.toString());
            cc.ChatRoomController.getInstance().sendRequestOnHub(cc.MethodHubName.SEND_MESSAGE, this.tlmnChatShortcuts[index]);
			this.onClickHideChat();
        },
		
        pokerChatShortcutClicked: function (event, data) {
            var index = parseInt(data.toString());
            cc.ChatRoomController.getInstance().sendRequestOnHub(cc.MethodHubName.SEND_MESSAGE, this.pokerChatShortcuts[index]);
			this.onClickHideChat();
        },

        mbChatShortcutClicked: function (event, data) {
            var index = parseInt(data.toString());
            cc.ChatRoomController.getInstance().sendRequestOnHub(cc.MethodHubName.SEND_MESSAGE, this.mbChatShortcuts[index]);
			this.onClickHideChat();
        },
		
        chatEmotionClicked: function (event, data) {
            var index = parseInt(data.toString());
            cc.ChatRoomController.getInstance().sendRequestOnHub(cc.MethodHubName.SEND_MESSAGE, this.emotionStr[index]);
            this.onClickHideChat();
        },

        showEmotionClicked: function () {
            if (this.nodeEmotion.active) {
				this.btnTxtChat.active = true;
				this.btnEmoj.active = false;
                this.nodeEmotion.active = false;
                this.nodeNormalChat.active = true;
            } else {
				this.btnEmoj.active = false;
				this.btnTxtChat.active = true;				
                this.nodeEmotion.active = true;
                this.nodeNormalChat.active = false;
            }
        },
		
		showShorcutClicked: function () {
			if (this.nodeNormalChat.active) {
				this.btnEmoj.active = true;
				this.btnTxtChat.active = false;
				this.nodeEmotion.active = false;
				this.nodeNormalChat.active = true;
			} else {
				this.btnEmoj.active = true;
				this.btnTxtChat.active = false;
				this.nodeEmotion.active = false;
				this.nodeNormalChat.active = true;
			}
		},		

        showChatClicked: function () {
            this.onClickShowChat();
        },

        hideChatClicked: function () {
            this.onClickHideChat();
        },
    });
}).call(this);
