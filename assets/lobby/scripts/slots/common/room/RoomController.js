/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var RoomController;

    RoomController = (function () {
        var instance;

        function RoomController() {

        }

        instance = void 0;

        RoomController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        RoomController.prototype.setRoomView = function (roomView) {
            return this.roomView = roomView;
        };

        RoomController.prototype.setRoomId = function (roomId) {
            return this.roomId = roomId;
        };

        RoomController.prototype.setGameId = function (gameId) {
            return this.gameId = gameId;
        };

        RoomController.prototype.getRoomId = function () {
            return this.roomId;
        };

        RoomController.prototype.getGameId = function () {
            return this.gameId;
        };

        RoomController.prototype.activeRoom = function () {
            return this.roomView.activeRoom();
        };

        RoomController.prototype.activeMain = function () {
            return this.roomView.activeMain();
        };

        RoomController.prototype.sendRequestOnHub = function (method, data1, data2) {
            return this.roomView.sendRequestOnHub(method, data1, data2);
        };

        return RoomController;

    })();

    cc.RoomController = RoomController;

}).call(this);

