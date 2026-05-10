/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.TaiXiuSieuTocMainView = cc.Class({
        "extends": cc.PopupViewBase,
        properties: {
            prefabGraph: cc.Prefab, //soi cau
			prefabJackpotHistory: cc.Prefab,
			nodeonoff: cc.Node,
        },

        onLoad: function () {
            cc.TaiXiuSieuTocMainController.getInstance().setTaiXiuSieuTocMainView(this);
        },

        createGraphView: function () {
            this.nodeGraphView = this.createView(this.prefabGraph);
        },

        destroyGraphView: function () {
            if (this.nodeGraphView && cc.isValid(this.nodeGraphView)) {
                this.nodeGraphView.destroy();
            }
            this.nodeGraphView = null;
        },
        createJackpotHistoryView: function () {
            this.jackpotHistoryView = this.createView(this.prefabJackpotHistory);
        },
		 clickonoff: function () {
            this.jackpotHistoryView = this.createView(this.prefabJackpotHistory);
        },
        destroyJackpotHistoryView: function () {
            if (this.jackpotHistoryView && cc.isValid(this.jackpotHistoryView)) {
                this.jackpotHistoryView.destroy();
            }
            this.jackpotHistoryView = null;
        },
    });
}).call(this);
