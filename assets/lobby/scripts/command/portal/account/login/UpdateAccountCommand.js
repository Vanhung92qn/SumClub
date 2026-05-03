/**
 * Created by Nofear on 2/27/2019.
 */

 var netConfig = require('NetConfig');

 (function () {
     var UpdateAccountCommand;
 
     UpdateAccountCommand = (function () {
         function UpdateAccountCommand() {
         }
 
         UpdateAccountCommand.prototype.execute = function (controller) {
            var url = 'api/ServiceOff/BBOffUpdate';
            
            let params = JSON.stringify({
                UserName: controller.username,
                NickName: controller.nickname,
                Otp: controller.otp,
                Password: controller.password,            
            });
             
 
             return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                 var obj = JSON.parse(response);
                 if (obj.ResponseCode === 1) {
                     /*
                     {
                         ResponseCode: 1,
                         Message: "Cập nhật thành công!"
                     }
                     * */
                     return controller.onUpdateAccountResponse(obj);
                 } else {
                     return controller.onUpdateAccountResponseError(obj);
                     //cc.PopupController.getInstance().show(obj.Message, cc.PopupStyle.NOTHING);
                 }
             });
         };
 
         return UpdateAccountCommand;
 
     })();
 
     cc.UpdateAccountCommand = UpdateAccountCommand;
 
 }).call(this);
 