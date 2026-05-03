
(function () {
    cc.BalanceTryView = cc.Class({
        "extends": cc.Component,
        properties: {
        },

        onLoad: function () {
            this.lbiBalance = this.node.getComponent(cc.LabelIncrement);
            cc.BalanceController.getInstance().setBalanceTryView(this);
        },

        onDestroy: function () {
            cc.BalanceController.getInstance().setBalanceTryView(null);
        },

        updateTryBalance: function (balance) {
            this.balance = balance;
            this.lbiBalance.tweenValueto(balance);
        },

        subTryBalance: function (amount) {
            this.balance -= amount;
            this.lbiBalance.tweenValueto(this.balance);
        },
    });

}).call(this);