
(function () {
    var DDNAUI;

    DDNAUI = (function () {
        var instance;

        function DDNAUI() {

        }

        instance = void 0;

        DDNAUI.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        return DDNAUI;

    })();

    cc.DDNAUI = DDNAUI;

}).call(this);
