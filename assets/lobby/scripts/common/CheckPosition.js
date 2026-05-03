(function () {
    cc.CheckPosition = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        update: function () {
            console.log(this.node.name + ': ' + this.node.y);
        }
    });

}).call(this);
