/**
 * Created by Nofear on 6/8/2017.
 */

(function () {
    cc.AudioPoolEgypt = cc.Class({
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

            bonusClick: cc.AudioSource,
            bonusMiss: cc.AudioSource,
            bonusWin: cc.AudioSource,

            openCard: cc.AudioSource,

            miniGameActive: cc.AudioSource,

            x2Click: cc.AudioSource,
            x2Win: cc.AudioSource,

            expandWild: cc.AudioSource,
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

                this.bonusClick.mute = !enable;
                this.bonusMiss.mute = !enable;
                this.bonusWin.mute = !enable;
                this.openCard.mute = !enable;
                this.miniGameActive.mute = !enable;
                this.x2Click.mute = !enable;
                this.x2Win.mute = !enable;
                this.expandWild.mute = !enable;
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

                case cc.AudioTypes.BONUS_CLICK:
                    audioClip = this.bonusClick;
                    break;
                case cc.AudioTypes.BONUS_MISS:
                    audioClip = this.bonusMiss;
                    break;
                case cc.AudioTypes.BONUS_WIN:
                    audioClip = this.bonusWin;
                    break;
                case cc.AudioTypes.OPEN_CARD:
                    audioClip = this.openCard;
                    break;
                case cc.AudioTypes.MINI_GAME_ACTIVE:
                    audioClip = this.miniGameActive;
                    break;
                case cc.AudioTypes.X2_CLICK:
                    audioClip = this.x2Click;
                    break;
                case cc.AudioTypes.X2_WIN:
                    audioClip = this.x2Win;
                    break;
                case cc.AudioTypes.EXPAND_WILD:
                    audioClip = this.expandWild;
                    break;
            }
            return audioClip;
        }
    });

}).call(this);
