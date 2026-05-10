/**
 * XocDiaSettingMenu.js
 * ─────────────────────────────────────────────────────────────────
 * Gan vao node Popup chua menu setting cua game Xoc Dia.
 *
 * YEU CAU:
 *  - Node co cc.Animation component voi 2 clip:
 *      - 'openMenu'   : animation hien menu (slide in / fade in)
 *      - 'closeMenu'  : animation an menu  (slide out / fade out)
 *
 * CACH GAN BUTTON:
 *  - Button "Open menu":  Click Events -> XocDiaSettingMenu -> menuOpenClicked
 *  - Button "Close menu": Click Events -> XocDiaSettingMenu -> menuCloseClicked
 *  - Hoac dung 1 button: Click Events -> XocDiaSettingMenu -> menuToggleClicked
 *
 * Cac uu diem so version don gian:
 *  - Defensive null check (animation/clip thieu khong crash).
 *  - Track state isOpen → toggle dung.
 *  - Prevent double-click khi dang play animation (tranh chong clip).
 *  - Log debug nhe.
 * ─────────────────────────────────────────────────────────────────
 */
cc.Class({
    extends: cc.Component,

    properties: {
        // Tuy chon: gan node menu rieng neu animation o node khac.
        // Bo trong → dung this.node.
        nodeMenu: {
            default: null,
            type: cc.Node,
            tooltip: 'Bo trong neu animation gan ngay tren node nay'
        },

        // Auto-close khi click ben ngoai menu? Mac dinh false.
        autoCloseOnTouchOutside: {
            default: false,
            tooltip: 'Click ngoai vung menu se tu dong dong'
        },
    },

    onLoad: function () {
        var target = this.nodeMenu || this.node;
        this.animation = target.getComponent(cc.Animation);

        if (!this.animation) {
            cc.warn('[XocDiaSettingMenu] Khong tim thay cc.Animation tren node:', target.name);
        }

        this.isOpen = false;
        this.isAnimating = false;

        // Lang nghe animation finish de unlock isAnimating
        if (this.animation) {
            this.animation.on(cc.Animation.EventType.FINISHED, this._onAnimationFinished, this);
        }

        // Click outside → close (optional)
        if (this.autoCloseOnTouchOutside) {
            cc.Canvas.instance.node.on(cc.Node.EventType.TOUCH_END, this._onCanvasTouch, this);
        }
    },

    onDestroy: function () {
        // Khi exit game, parent node co the destroy TRUOC component nay
        // -> animation._callbackTable da null -> off() throw "cannot read 'finished' of null".
        // Wrap try/catch + cc.isValid check de an toan.
        try {
            if (this.animation && cc.isValid(this.animation) && cc.isValid(this.animation.node)) {
                this.animation.off(cc.Animation.EventType.FINISHED, this._onAnimationFinished, this);
            }
        } catch (e) {}
        try {
            if (this.autoCloseOnTouchOutside && cc.Canvas.instance && cc.isValid(cc.Canvas.instance.node)) {
                cc.Canvas.instance.node.off(cc.Node.EventType.TOUCH_END, this._onCanvasTouch, this);
            }
        } catch (e) {}
        this.animation = null;
    },

    // ─────────────────────────────────────────────────────────────
    //  PUBLIC: Click handlers (gan vao Button trong Cocos Creator)
    // ─────────────────────────────────────────────────────────────
    menuOpenClicked: function () {
        if (this.isOpen || this.isAnimating) return;
        this._playClip('openMenu');
        this.isOpen = true;
    },

    menuCloseClicked: function () {
        if (!this.isOpen || this.isAnimating) return;
        this._playClip('closeMenu');
        this.isOpen = false;
    },

    menuToggleClicked: function () {
        if (this.isAnimating) return;
        if (this.isOpen) {
            this.menuCloseClicked();
        } else {
            this.menuOpenClicked();
        }
    },

    // ─────────────────────────────────────────────────────────────
    //  PRIVATE
    // ─────────────────────────────────────────────────────────────
    _playClip: function (clipName) {
        if (!this.animation) return;

        // Verify clip ton tai
        var clip = this.animation.getClips().find(function (c) {
            return c && c.name === clipName;
        });
        if (!clip) {
            cc.warn('[XocDiaSettingMenu] Khong tim thay clip:', clipName);
            return;
        }

        this.animation.stop();
        this.animation.play(clipName);
        this.isAnimating = true;
    },

    _onAnimationFinished: function () {
        this.isAnimating = false;
    },

    _onCanvasTouch: function (event) {
        if (!this.isOpen || this.isAnimating) return;
        // Chi close khi touch NGOAI vung menu
        var target = this.nodeMenu || this.node;
        var touchPos = event.getLocation();
        var localPos = target.convertToNodeSpaceAR(touchPos);
        var size = target.getContentSize();
        var anchor = target.getAnchorPoint();
        var minX = -size.width * anchor.x;
        var maxX = size.width * (1 - anchor.x);
        var minY = -size.height * anchor.y;
        var maxY = size.height * (1 - anchor.y);
        var inside = localPos.x >= minX && localPos.x <= maxX
                  && localPos.y >= minY && localPos.y <= maxY;
        if (!inside) {
            this.menuCloseClicked();
        }
    },
});
