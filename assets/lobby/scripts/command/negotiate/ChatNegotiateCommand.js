/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var ChatNegotiateCommand;

    ChatNegotiateCommand = (function () {
        function ChatNegotiateCommand() {
        }

        ChatNegotiateCommand.prototype.execute = function (controller) {
            var url = 'signalr/negotiate';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.CHAT, url, function (response) {
                var obj = JSON.parse(response);
                /*
                {
                  "Url": "/signalr",
                  "ConnectionToken": "UqvDZZJm1H8TXZaT/OyIoxfkKyXdqnAatkTFtinKL6WtJHT22z3D7JEELRPYYS1w0ZKTHZY+eLBfvCHOhWapuETV5SNUrL/6o2KSkB+SHZbfDMnN",
                  "ConnectionId": "c44953d0-33c5-4c8e-9509-db5f71162ee3",
                  "KeepAliveTimeout": 20,
                  "DisconnectTimeout": 30,
                  "ConnectionTimeout": 110,
                  "TryWebSockets": true,
                  "ProtocolVersion": "1.2",
                  "TransportConnectTimeout": 5,
                  "LongPollDelay": 0
                }
                * */
                return controller.onChatNegotiateResponse(obj);

            }, true);
        };

        return ChatNegotiateCommand;

    })();

    cc.ChatNegotiateCommand = ChatNegotiateCommand;

}).call(this);
