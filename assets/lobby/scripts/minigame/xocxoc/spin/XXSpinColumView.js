/**
 * XXSpinColumView - 1 cot slot 4-dice (4 cot tong cong).
 * Gan tren moi node con cua "slots" (1, 2, 3, 4).
 *
 * REQUIRES:
 *  - cc.Animation component cung node, voi 3 clip:
 *      + columnSpin   : loop (tween position y de cuon vo cuc)
 *      + columnStop   : dung (tween cham lai, snap ve final position)
 *      + columnStop2  : fast stop variant (optional)
 *  - 2 cc.Sprite (slot0, slot1) trong node con - de tao hieu ung 2-half cuon vo cuc.
 *  - spriteBlurIcons: 6 sprite frame blur (luc spin loop random)
 *  - maskNode: cc.Node mask de an phan tran ra ngoai khung
 *
 * Node name (1..4) duoc parseInt -> colId (0..3) - mapping cot ket qua dice.
 */
(function () {
  cc.XXSpinColumView = cc.Class({
    extends: cc.Component,
    properties: {
      spriteIcons: [cc.Sprite],
      spriteBlurIcons: [cc.SpriteFrame],
      maskNode: cc.Node,
    },

    onLoad: function () {
      if (this.maskNode) {
        this.maskNode.active = false;
      }
      this.scheduler = cc.director.getScheduler();
      this.animCol = this.getComponent(cc.Animation);
    },

    start: function () {
      this.colId = parseInt(this.node.name) - 1;
      this.icons = cc.XXSpinController.getInstance().getSFDices();
      this.blurIcons = this.spriteBlurIcons;
    },

    randomAllIcon: function () {
      if (!this.spriteIcons || !this.blurIcons || this.blurIcons.length === 0) return;
      var n = Math.min(2, this.spriteIcons.length);
      for (var i = 0; i < n; i++) {
        var s = this.spriteIcons[i];
        if (!s) continue;
        var ran = Math.floor(Math.random() * this.blurIcons.length);
        var bf = this.blurIcons[ran];
        if (bf) s.spriteFrame = bf;
      }
    },

    randomIcon: function (indexIcon) {},

    randomIcon2: function (indexIcon) {},

    setData: function () {
      if (this.maskNode) {
        this.maskNode.active = false;
      }
      if (!this.spriteIcons || !this.icons || this.icons.length === 0) return;
      for (var i = 0; i < this.spriteIcons.length; i++) {
        var s = this.spriteIcons[i];
        if (!s) continue;
        var ran = Math.floor(Math.random() * this.icons.length);
        var f = this.icons[ran];
        if (f) s.spriteFrame = f;
      }
    },

    finishSpin: function () {
      cc.XXSpinController.getInstance().stopSpinFinish();
      if (this.maskNode) {
        this.maskNode.active = false;
      }
    },

    spin: function (lineId) {
      this.lineId = lineId;
      this.unscheduleAllCallbacks();

      // Hieu ung random blur muot luc spin
      this.schedule(function () {
        this.randomAllIcon();
      }.bind(this), 0.1);

      if (this.animCol) this.animCol.play("columnSpin");
      if (this.maskNode) this.maskNode.active = true;
    },

    stop: function () {
      this.isFastSpin = false;
      this.unscheduleAllCallbacks();
      if (this.animCol) this.animCol.play("columnStop");
      var colId = this.colId;
      var ketQua = cc.XXSpinController.getInstance().getKetQua();
      if (!ketQua || !this.icons || !this.spriteIcons) return;
      var diceValue = ketQua[colId] != null ? ketQua[colId] : 1;
      // Tim spriteFrame co name chua so dice (vd "dice_1", "dice_2", ...)
      var iconFrame = null;
      for (var i = 0; i < this.icons.length; i++) {
        var sf = this.icons[i];
        if (sf && sf.name && sf.name.indexOf(diceValue.toString()) !== -1) {
          iconFrame = sf;
          break;
        }
      }
      if (!iconFrame) {
        console.warn("[XXSpinColumView] Khong tim thay spriteFrame cho dice:", diceValue);
        return;
      }
      var icon = this.spriteIcons[0];
      if (icon) icon.spriteFrame = iconFrame;
      var icon2 = this.spriteIcons[1];
      if (icon2) icon2.spriteFrame = iconFrame;
      if (this.maskNode) this.maskNode.active = false;
    },

    fastStop: function () {
      this.isFastSpin = true;
      this.setData();
      if (this.animCol) this.animCol.play("columnStop2");
    },
  });
}).call(this);
