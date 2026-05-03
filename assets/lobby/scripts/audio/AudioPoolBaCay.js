/**
 * Created by Nofear on 6/8/2017.
 */

(function () {
    cc.AudioPoolBaCay = cc.Class({
        "extends": cc.AudioPool,
        properties: {
            musicBackground: cc.AudioSource,

            moveCard: cc.AudioSource,
            chipBet: cc.AudioSource,
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
            this.chipBet.mute = !enable;
            this.moveCard.mute = !enable;

            this.enableMusic(enable);
        },

        getAudioClip: function (clipType) {
            var audioClip;
            audioClip = null;
            switch (clipType) {
                case cc.AudioTypes.MOVE_CARD:
                    audioClip = this.moveCard;
                    break;                    
                case cc.AudioTypes.CHIP_BET:
                    audioClip = this.chipBet;
                    break;
            }
            return audioClip;
        }
    });

}).call(this);
