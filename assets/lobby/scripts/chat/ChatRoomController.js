/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var ChatRoomController;

    ChatRoomController = (function () {
        var instance;

        function ChatRoomController() {

        }

        instance = void 0;

        ChatRoomController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        ChatRoomController.prototype.setChatView = function (chatView) {
            return this.chatView = chatView;
        };

        ChatRoomController.prototype.setHubView = function (hubView) {
            return this.hubView = hubView;
        };

        ChatRoomController.prototype.sendRequestOnHub = function (method, data1, data2) {
            if (this.hubView)
                return this.hubView.sendRequestOnHub(method, data1, data2);
        };

        ChatRoomController.prototype.showChat = function () {
            return this.chatView.showChat();
        };

        ChatRoomController.prototype.addChatContent = function (message) {
            return this.chatView.addChatContent(message);
        };

        ChatRoomController.prototype.getIndexEmotion = function (message) {
            return this.chatView.getIndexEmotion(message);
        };

        ChatRoomController.prototype.checkIsEmotion = function (message) {
            return this.chatView.checkIsEmotion(message);
        };


        return ChatRoomController;

    })();

    cc.ChatRoomController = ChatRoomController;

}).call(this);

