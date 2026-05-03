
(function () {
    cc.BalanceView = cc.Class({
        "extends": cc.Component,
        properties: {
        },

        onLoad: function () {
            this.lbiBalance = this.node.getComponent(cc.LabelIncrement);
            cc.BalanceController.getInstance().addBalanceView(this);
        },

        onDestroy: function () {
            cc.BalanceController.getInstance().removeBalanceView(this);
        },

        updateBalance: function (balance) {
            this.balance = balance;
            this.lbiBalance.tweenValueto(balance);
        },

        refreshBalance: function () {
            this.lbiBalance.tweenValueto(this.balance);
        },

        // setBalance: function (balance) {
        //     this.lbiBalance.setValue(balance);
        // },
    });

}).call(this);