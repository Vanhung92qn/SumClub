/**
 * Created by Nofear on 6/8/2017.
 */

(function () {
    cc.AudioPoolCardGame = cc.Class({
        "extends": cc.AudioPool,
        properties: {
            musicBackground: cc.AudioSource,

            chipSelect: cc.AudioSource,
            chipBet: cc.AudioSource,
            drawCard: cc.AudioSource,
            handWin: cc.AudioSource,
        },

        enableMusic: function (enable) {
            if (this.musicBackground) {
                this.musicBackground.mute = enable;
            }
        },

        enableSound: function (enable) {
            this.chipSelect.mute = !enable;
            this.chipBet.mute = !enable;
            this.drawCard.mute = !enable;
            this.handWin.mute = !enable;

            this.enableMusic(!enable);
        },

        getAudioClip: function (clipType) {
            var audioClip;
            audioClip = null;
            switch (clipType) {
                case cc.AudioTypes.CHIP_SELECT:
                    audioClip = this.chipSelect;
                    break;
                case cc.AudioTypes.CHIP_BET:
                    audioClip = this.chipBet;
                    break;
                case cc.AudioTypes.DRAW_CARD:
                    audioClip = this.drawCard;
                    break;
                case cc.AudioTypes.HAND_WIN:
                    audioClip = this.handWin;
                    break;
            }
            return audioClip;
        }
    });

}).call(this);
