var netConfig = require('NetConfig');

 (function () {
     var BBOffCheckCommand;
 
     BBOffCheckCommand = (function () {
         function BBOffCheckCommand() {
         }
 
         BBOffCheckCommand.prototype.execute = function (controller) {
            var url = 'api/ServiceOff/BBOffCheck';
           
             return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url,function (response) {
                 var obj = JSON.parse(response);
                 if (obj.ResponseCode === 1) {
                     return controller.onBBOffCheckResponse(obj);
                 } else {
                     cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode); 
                 }
             });
         };
 
         return BBOffCheckCommand;
 
     })();
 
     cc.BBOffCheckCommand = BBOffCheckCommand;
 
 }).call(this);
 