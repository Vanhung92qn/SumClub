/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var ChatController;

    ChatController = (function () {
        var instance;

        function ChatController() {

        }

        instance = void 0;

        ChatController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        ChatController.prototype.setChatView = function (chatView) {
            return this.chatView = chatView;
        };

        ChatController.prototype.sendRequestOnHub = function (method, data) {
            return this.chatView.sendRequestOnHub(method, data);
        };

        return ChatController;

    })();

    cc.ChatController = ChatController;

}).call(this);

