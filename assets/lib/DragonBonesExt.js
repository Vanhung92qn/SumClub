cc.game.once(cc.game.EVENT_ENGINE_INITED, function () {
    cc.js.mixin(dragonBones.ArmatureDisplay.prototype, {
        timeScale: -1.0, // Mặc định là 1.0, bạn có thể điều chỉnh giá trị này

        update (dt) {
            // Cho phép xem trước animation trong Editor
            if (CC_EDITOR) {
                cc.engine._animatingInEditMode = 1;
                cc.engine.animatingInEditMode = 1;
            }

            if (this.paused) return;

            // Áp dụng timeScale để điều chỉnh tốc độ
            dt *= this.timeScale;

            // Gọi update gốc nếu có
            if (typeof this._super === "function") {
                this._super(dt);
            } else if (this._factory && this._factory.clock) {
                // Cập nhật clock của DragonBones
                this._factory.clock.advanceTime(dt);
            }
        }
    });
});