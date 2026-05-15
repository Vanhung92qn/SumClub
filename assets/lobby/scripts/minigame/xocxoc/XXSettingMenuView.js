/*
 * XX Setting Menu View (combined)
 * Gan 1 lan tren node MenuChonPopup (root) - quan ly CA 2 lop:
 *  - Lop ngoai (popup) : openMenu / closeMenu  -> chua cac nut Top/History/Help/Exit/Setting
 *  - Lop trong (settingMenu) : openSettingMenu / closeSettingMenu  -> chua sound/music
 *
 * Khong can wire cross-node. Tat ca button deu tro ve component nay.
 */
(function () {
    cc.XXSettingMenuView = cc.Class({
        "extends": cc.Component,
        properties: {
            //=== Lop NGOAI: MenuChonPopup ===
            //Animation gan tren node `popup` - co 2 clip: openMenu / closeMenu
            animationMenu: cc.Animation,

            //=== Lop TRONG: settingMenu (sound/music panel) ===
            //Animation gan tren node `settingMenu` - co 2 clip: openSettingMenu / closeSettingMenu
            animationSetting: cc.Animation,

            //Sound / Music toggle
            spriteSound: cc.Sprite,
            spriteMusic: cc.Sprite,
            sfSounds: [cc.SpriteFrame], //0=on, 1=off
            sfMusics: [cc.SpriteFrame], //0=on, 1=off

            //Tu dong dong settingMenu sau khi an nut popup khac (Top/History/Help/GroupUser)
            autoCloseSettingOnPopup: true
        },

        onLoad: function () {
            this.isMenuOpen = false;       //lop ngoai
            this.isSettingOpen = false;    //lop trong
            this.isMenuAnimating = false;
            this.isSettingAnimating = false;

            if (this.animationMenu) {
                this.animationMenu.on(cc.Animation.EventType.FINISHED, this._onMenuAnimFinished, this);
            }
            if (this.animationSetting) {
                this.animationSetting.on(cc.Animation.EventType.FINISHED, this._onSettingAnimFinished, this);
            }
        },

        onDestroy: function () {
            try {
                if (this.animationMenu && cc.isValid(this.animationMenu) && cc.isValid(this.animationMenu.node)) {
                    this.animationMenu.off(cc.Animation.EventType.FINISHED, this._onMenuAnimFinished, this);
                }
            } catch (e) {}
            try {
                if (this.animationSetting && cc.isValid(this.animationSetting) && cc.isValid(this.animationSetting.node)) {
                    this.animationSetting.off(cc.Animation.EventType.FINISHED, this._onSettingAnimFinished, this);
                }
            } catch (e) {}
        },

        start: function () {
            //Sound + Music tu local storage
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
        // LOP NGOAI - MenuChonPopup
        //=====================
        menuOpenClicked: function () {
            if (this.isMenuOpen || this.isMenuAnimating) return;
            this._playClip(this.animationMenu, 'openMenu');
            this.isMenuOpen = true;
            this.isMenuAnimating = true;
        },

        menuCloseClicked: function () {
            if (!this.isMenuOpen || this.isMenuAnimating) return;
            this._playClip(this.animationMenu, 'closeMenu');
            this.isMenuOpen = false;
            this.isMenuAnimating = true;
            //dong luon settingMenu neu dang mo
            if (this.isSettingOpen) this._closeSetting();
        },

        menuToggleClicked: function () {
            if (this.isMenuAnimating) return;
            if (this.isMenuOpen) this.menuCloseClicked();
            else this.menuOpenClicked();
        },

        //=====================
        // LOP TRONG - settingMenu (sound/music panel)
        //=====================
        openSettingClicked: function () {
            if (this.isSettingOpen || this.isSettingAnimating) return;
            this._playClip(this.animationSetting, 'openSettingMenu');
            this.isSettingOpen = true;
            this.isSettingAnimating = true;
        },

        closeSettingClicked: function () {
            this._closeSetting();
        },

        _closeSetting: function () {
            if (!this.isSettingOpen || this.isSettingAnimating) return;
            this._playClip(this.animationSetting, 'closeSettingMenu');
            this.isSettingOpen = false;
            this.isSettingAnimating = true;
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
        // Cac nut popup - dung lai XXPopupController co san
        //=====================
        topClicked: function () {
            cc.XXPopupController.getInstance().createTopView();
            if (this.autoCloseSettingOnPopup && this.isSettingOpen) this._closeSetting();
        },

        historyClicked: function () {
            cc.XXPopupController.getInstance().createHistoryView();
            if (this.autoCloseSettingOnPopup && this.isSettingOpen) this._closeSetting();
        },

        helpClicked: function () {
            cc.XXPopupController.getInstance().createHelpView();
            if (this.autoCloseSettingOnPopup && this.isSettingOpen) this._closeSetting();
        },

        groupUserClicked: function () {
            cc.XXPopupController.getInstance().createGroupUserView();
            if (this.autoCloseSettingOnPopup && this.isSettingOpen) this._closeSetting();
        },

        exitClicked: function () {
            cc.LobbyController.getInstance().destroyDynamicView(null);
        },

        //=====================
        // PRIVATE
        //=====================
        _playClip: function (anim, clipName) {
            if (!anim) {
                cc.warn('[XXSettingMenuView] animation chua gan, bo qua clip:', clipName);
                return;
            }
            var clip = anim.getClips().find(function (c) {
                return c && c.name === clipName;
            });
            if (!clip) {
                cc.warn('[XXSettingMenuView] khong tim thay clip:', clipName);
                return;
            }
            anim.stop();
            anim.play(clipName);
        },

        _onMenuAnimFinished: function () {
            this.isMenuAnimating = false;
        },

        _onSettingAnimFinished: function () {
            this.isSettingAnimating = false;
        }
    });
}).call(this);
