/**
 * Created by Nofear on 6/8/2017.
 */

(function () {
    cc.AudioPoolSlots = cc.Class({
        "extends": cc.AudioPool,
        properties: {
            musicBackground: cc.AudioSource,

            normalWin: cc.AudioSource,
            bigWin: cc.AudioSource,
            getBonus: cc.AudioSource,
            spin: cc.AudioSource,
            stopSpin1: cc.AudioSource,
            stopSpin2: cc.AudioSource,
            stopSpin3: cc.AudioSource,
            stopSpin4: cc.AudioSource,
            stopSpin5: cc.AudioSource,
        },

        onLoad: function () {
            cc.AudioController.getInstance().setAudioPool(this);
        },

        enableMusic: function (enable) {
            if (this.musicBackground) {
                if (enable) {
                    if (!this.musicBackground.isPlaying) {
                        this.musicBackground.play();
                    }
                } else {
                    this.musicBackground.stop();
                }
            }
        },

        enableSound: function (enable) {
            if (this.normalWin) {
                this.normalWin.mute = !enable;
                this.bigWin.mute = !enable;
                this.getBonus.mute = !enable;
                this.spin.mute = !enable;
                this.stopSpin1.mute = !enable;
                this.stopSpin2.mute = !enable;
                this.stopSpin3.mute = !enable;
                this.stopSpin4.mute = !enable;
                this.stopSpin5.mute = !enable;
            }
        },

        getAudioClip: function (clipType) {
            var audioClip;
            audioClip = null;
            switch (clipType) {
                case cc.AudioTypes.BACKGROUND:
                    audioClip = this.musicBackground;
                    break;
                case cc.AudioTypes.NORMAL_WIN:
                    audioClip = this.normalWin;
                    break;
                case cc.AudioTypes.BIG_WIN:
                    audioClip = this.bigWin;
                    break;
                case cc.AudioTypes.GET_BONUS:
                    audioClip = this.getBonus;
                    break;
                case cc.AudioTypes.SPIN:
                    audioClip = this.spin;
                    break;
                case cc.AudioTypes.STOP_SPIN_1:
                    audioClip = this.stopSpin1;
                    break;
                case cc.AudioTypes.STOP_SPIN_2:
                    audioClip = this.stopSpin2;
                    break;
                case cc.AudioTypes.STOP_SPIN_3:
                    audioClip = this.stopSpin3;
                    break;
                case cc.AudioTypes.STOP_SPIN_4:
                    audioClip = this.stopSpin4;
                    break;
                case cc.AudioTypes.STOP_SPIN_5:
                    audioClip = this.stopSpin5;
                    break;
            }
            return audioClip;
        }
    });

}).call(this);
