/**
 * Created by Welcome on 4/18/2019.
 */

(function () {
    cc.E1TabFeedbackView = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        feedbackClicked: function () {
            cc.sys.openURL('https://bit.ly');
        },
    });
}).call(this);
