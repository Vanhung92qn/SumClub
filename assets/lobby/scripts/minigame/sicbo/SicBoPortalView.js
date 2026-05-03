/**
 * SicBoPortalView - stub component gan tren button "Sicbo" o lobby chinh.
 *
 * Lich su: S86 cu co TaiXiuSicboPortalView lam background daemon -> connect hub
 * Sicbo tu lobby de hien thi realtime timer/jackpot/bet info tren thumbnail
 * button. XMEN khong co concept nay (chi connect khi vao game).
 *
 * Stub nay giu UUID cu de binding tren node btnTaiXiu-SicboPortalView trong
 * MainGame.fire khong vo. Khi can realtime info tren thumbnail -> mo rong
 * theo pattern TaiXiuPortalView (file lobby/scripts/minigame/taixiu/...).
 *
 * Khong connect hub. Khong nhan event. No-op cho moi method neu duoc goi.
 */

(function () {
    cc.SicBoPortalView = cc.Class({
        extends: cc.Component,

        properties: {},

        onLoad: function () {
            cc.SicBoController.getInstance().setSicBoPortalView(this);
        },

        onDestroy: function () {
            cc.SicBoController.getInstance().setSicBoPortalView(null);
        },

        // Cac no-op stub de tuong thich neu controller goi tu cho khac.
        reset: function () { },
        startTimer: function (remaining) { },
        stopTimer: function () { },
        updateTimer: function (time) { },
        updateInfo: function (sicbosessionInfo) { },
    });
}).call(this);
