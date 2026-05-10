/**
 * Created by Nofear on 6/7/2017.
 *
 * LAZY-LOAD POPUP (mod 2026-05-10):
 *  Truoc: prefabGraph + prefabJackpotHistory la field cc.Prefab → engine load
 *         LUON khi mo taixiuView (~30 file PNG/JSON dep tree thua).
 *  Sau:   load tu bundle 'taixiu' khi user click nut → mo game taixiu nhanh hon ~1.5-2s.
 */
(function () {
    var BUNDLE_NAME = 'taixiu';
    var PREFAB_GRAPH = 'prefabs/taiXiuGraphView';
    var PREFAB_JACKPOT_HISTORY = 'prefabs/taiXiuJackpotHistoryView';

    cc.TaiXiuMainView = cc.Class({
        "extends": cc.PopupViewBase,
        properties: {
            nodeonoff: cc.Node,
        },

        onLoad: function () {
            cc.TaiXiuMainController.getInstance().setTaiXiuMainView(this);
        },

        _loadPopupPrefab: function (path, cb) {
            var bundle = cc.assetManager.getBundle(BUNDLE_NAME);
            if (!bundle) {
                console.error('[TaiXiuMainView] bundle "' + BUNDLE_NAME + '" chua load, khong mo duoc popup:', path);
                return;
            }
            bundle.load(path, cc.Prefab, function (err, prefab) {
                if (err) {
                    console.error('[TaiXiuMainView] Load prefab fail:', path, err);
                    return;
                }
                cb(prefab);
            });
        },

        createGraphView: function () {
            var self = this;
            if (self.nodeGraphView && cc.isValid(self.nodeGraphView)) {
                // Da co - khong tao moi (tranh trung lap khi user spam click)
                return;
            }
            self._loadPopupPrefab(PREFAB_GRAPH, function (prefab) {
                self.nodeGraphView = self.createView(prefab);
            });
        },

        destroyGraphView: function () {
            if (this.nodeGraphView)
                this.nodeGraphView.destroy();
        },

        createJackpotHistoryView: function () {
            var self = this;
            if (self.jackpotHistoryView && cc.isValid(self.jackpotHistoryView)) {
                return;
            }
            self._loadPopupPrefab(PREFAB_JACKPOT_HISTORY, function (prefab) {
                self.jackpotHistoryView = self.createView(prefab);
            });
        },

        clickonoff: function () {
            this.createJackpotHistoryView();
        },

        destroyJackpotHistoryView: function () {
            if (this.jackpotHistoryView)
                this.jackpotHistoryView.destroy();
        },
    });
}).call(this);
