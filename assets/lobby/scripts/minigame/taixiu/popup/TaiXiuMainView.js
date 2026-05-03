/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.TaiXiuMainView = cc.Class({
        "extends": cc.PopupViewBase,
        properties: {
            prefabGraph: cc.Prefab, //soi cau
			prefabJackpotHistory: cc.Prefab,
			nodeonoff: cc.Node,
        },

        onLoad: function () {
            cc.TaiXiuMainController.getInstance().setTaiXiuMainView(this);
        },

        createGraphView: function () {
            this.nodeGraphView = this.createView(this.prefabGraph);
        },

        destroyGraphView: function () {
            if (this.nodeGraphView)
                this.nodeGraphView.destroy();
        },
        createJackpotHistoryView: function () {
            this.jackpotHistoryView = this.createView(this.prefabJackpotHistory);
        },
		 clickonoff: function () {
            this.jackpotHistoryView = this.createView(this.prefabJackpotHistory);
        },
        destroyJackpotHistoryView: function () {
            if (this.jackpotHistoryView)
                this.jackpotHistoryView.destroy();
        },
    });
}).call(this);
