/**
 * Created by Nofear on 6/7/2017.
 *
 * LAZY-LOAD POPUP (mod 2026-05-10):
 *  Truoc: 3 field cc.Prefab → engine load LUON khi mo taixiumd5View.
 *  Sau:   load tu bundle 'taixiumd5' khi user click nut tuong ung.
 */
(function () {
    var BUNDLE_NAME = 'taixiumd5';
    var PREFAB_GRAPH = 'prefabs/taiXiuMd5GraphView';
    var PREFAB_JACKPOT_HISTORY = 'prefabs/taiXiuMd5JackpotHistoryView';
    var PREFAB_RULE = 'prefabs/taiXiuMd5RuleView';

    cc.TaiXiuMd5MainView = cc.Class({
        "extends": cc.PopupViewBase,
        properties: {},

        onLoad: function () {
            cc.TaiXiuMd5MainController.getInstance().setTaiXiuMd5MainView(this);
        },

        _loadPopupPrefab: function (path, cb) {
            var bundle = cc.assetManager.getBundle(BUNDLE_NAME);
            if (!bundle) {
                console.error('[TaiXiuMd5MainView] bundle "' + BUNDLE_NAME + '" chua load, khong mo duoc popup:', path);
                return;
            }
            bundle.load(path, cc.Prefab, function (err, prefab) {
                if (err) {
                    console.error('[TaiXiuMd5MainView] Load prefab fail:', path, err);
                    return;
                }
                cb(prefab);
            });
        },

        createGraphView: function () {
            var self = this;
            if (self.nodeGraphView && cc.isValid(self.nodeGraphView)) return;
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
            if (self.jackpotHistoryView && cc.isValid(self.jackpotHistoryView)) return;
            self._loadPopupPrefab(PREFAB_JACKPOT_HISTORY, function (prefab) {
                self.jackpotHistoryView = self.createView(prefab);
            });
        },

        destroyJackpotHistoryView: function () {
            if (this.jackpotHistoryView)
                this.jackpotHistoryView.destroy();
        },

        createRuleView: function () {
            var self = this;
            if (self.ruleView && cc.isValid(self.ruleView)) return;
            self._loadPopupPrefab(PREFAB_RULE, function (prefab) {
                self.ruleView = self.createView(prefab);
            });
        },

        destroyRuleView: function () {
            if (this.ruleView)
                this.ruleView.destroy();
        },
    });
}).call(this);
