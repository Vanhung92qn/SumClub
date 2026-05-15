/*
 * XX Setting Menu View
 * Menu thiet lap cho XocDia - copy pattern tu DragonTigerSettingRoomView
 * + bo sung cac nut mo popup: Top, History, Help, GroupUser
 */
(function () {
    cc.XXSettingMenuView = cc.Class({
        "extends": cc.Component,
        properties: {
            //Animation chua 2 clip: openSettingMenu + closeSettingMenu
            animation: cc.Animation,

            //Sound / Music toggle
            spriteSound: cc.Sprite,
            spriteMusic: cc.Sprite,
            sfSounds: [cc.SpriteFrame], //0=on, 1=off
            sfMusics: [cc.SpriteFrame], //0=on, 1=off

            //auto close menu sau khi an 1 nut popup (Top/History/Help/GroupUser)
            autoCloseOnPopup: true
        },

        onLoad: function () {
            this.openPopup = false;
        },

        start: function () {
            //Check Sound + Music tu local storage
            this.sound = cc.Tool.getInstance().getItem("@Sound").toString() === 'true';
            this.music = cc.Tool.getInstance().getItem("@Music").toString() === 'true';

            if (this.spriteSound && this.sfSounds && this.sfSounds.length >= 2) {
                this.spriteSound.spriteFrame = this.sound ? this.sfSounds[0] : this.sfSounds[1];
            }
            if (this.spriteMusic && this.sfMusics && this.sfMusics.length >= 2) {
                this.spriteMusic.spriteFrame = this.music ? this.sfMusics[0] : this.sfMusics[1];
            }

            cc.AudioController.getInstance().enableSound(this.sound);
            cc.AudioController.getInstance().enableMusic(this.music);
        },

        //=====================
        // Toggle menu
        //=====================
        openSettingClicked: function () {
            if (this.openPopup === false) {
                this.openPopup = true;
                if (this.animation) this.animation.play('openSettingMenu');
            } else {
                this._closeMenu();
            }
        },

        closeSettingClicked: function () {
            this._closeMenu();
        },

        _closeMenu: function () {
            this.openPopup = false;
            if (this.animation) this.animation.play('closeSettingMenu');
        },

        //=====================
        // Sound / Music
        //=====================
        soundClicked: function () {
            this.sound = !this.sound;
            cc.Tool.getInstance().setItem("@Sound", this.sound);
            if (this.spriteSound && this.sfSounds && this.sfSounds.length >= 2) {
                this.spriteSound.spriteFrame = this.sound ? this.sfSounds[0] : this.sfSounds[1];
            }
            cc.AudioController.getInstance().enableSound(this.sound);
        },

        musicClicked: function () {
            this.music = !this.music;
            cc.Tool.getInstance().setItem("@Music", this.music);
            if (this.spriteMusic && this.sfMusics && this.sfMusics.length >= 2) {
                this.spriteMusic.spriteFrame = this.music ? this.sfMusics[0] : this.sfMusics[1];
            }
            cc.AudioController.getInstance().enableMusic(this.music);
        },

        //=====================
        // Popup buttons - dung lai XXPopupController co san
        //=====================
        topClicked: function () {
            cc.XXPopupController.getInstance().createTopView();
            if (this.autoCloseOnPopup) this._closeMenu();
        },

        historyClicked: function () {
            cc.XXPopupController.getInstance().createHistoryView();
            if (this.autoCloseOnPopup) this._closeMenu();
        },

        helpClicked: function () {
            cc.XXPopupController.getInstance().createHelpView();
            if (this.autoCloseOnPopup) this._closeMenu();
        },

        groupUserClicked: function () {
            cc.XXPopupController.getInstance().createGroupUserView();
            if (this.autoCloseOnPopup) this._closeMenu();
        }
    });
}).call(this);
