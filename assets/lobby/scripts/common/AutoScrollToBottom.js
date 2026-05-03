(function () {
    cc.AutoScrollToBottom = cc.Class({
        "extends": cc.Component,
        properties: {
            scrollView: cc.ScrollView,
        },

        onEnable: function () {
            this.scrollView.scrollToBottom();
        },

    });

}).call(this);
