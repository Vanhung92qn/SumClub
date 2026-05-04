/**
 * Created by Nofear on 2/27/2019.
 */

var netConfig = require('NetConfig');
(function () {
    var GetConfigCommand;

    GetConfigCommand = (function () {
        function GetConfigCommand() {
        }

        GetConfigCommand.prototype.execute = function (controller) {
            var e, request;
            try {
                request = cc.loader.getXMLHttpRequest();
                var urlRequest = 'https://raw.githubusercontent.com/folder/master/' + netConfig.PORTAL + '.info';

                request.timeout = 60000;
                request.open(cc.RequestType.GET, urlRequest); //+ '?' + Math.random()

                request.onreadystatechange = function () {
                    if (request.readyState === 4 && request.status === 200) {
                        // console.log('sendRequest GetConfigCommand responseText: ');
                        // console.log(request.responseText);

                        // //moi them -> sau nay sua parse JSON o day luon
                        var obj = JSON.parse(request.responseText);

                        return controller.onGetConfigResponse(obj);
                    }
                };
                return request.send();
            } catch (error) {
                e = error;
                return console.log('Caught Exception: ' + e.message);
            }
        };

        return GetConfigCommand;

    })();

    cc.GetConfigCommand = GetConfigCommand;

}).call(this);
