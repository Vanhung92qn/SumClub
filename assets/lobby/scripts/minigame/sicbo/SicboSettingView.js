
(function () {
    cc.SicboSettingView = cc.Class({
        "extends": cc.Component,
        properties: {
            animation: cc.Animation,
            toogleChat: cc.Toggle,
            toogleEffect: cc.Toggle,
            toogleMusic: cc.Toggle,
			btnChat: cc.Node,
			black: cc.Node,
			menuView: cc.SicBoMenuView
        },

        onLoad: function () {
            this.openPopup = false;
        },

        start: function () {
            this.sound = cc.Tool.getInstance().getItem("@Sound").toString() === 'true';
			this.music = cc.Tool.getInstance().getItem("@Music") === 'true';
            this.toogleEffect.isChecked = this.sound;
			this.toogleMusic.isChecked = this.music;
            cc.AudioController.getInstance().enableSound(this.sound);
            cc.AudioController.getInstance().enableMusic(this.music);
        },

        openSettingClicked: function () {
            this.openPopup = !this.openPopup;
            this.animation.play('openSetting');
			this.black.active = true;
			this.menuView.onClickHideMenu();
        },

        closeSettingClicked: function () {
            this.animation.play('closeSetting');
			this.black.active = false;
        },

        soundClicked: function () {
            this.sound = !this.sound;
            cc.Tool.getInstance().setItem("@Sound", this.sound);
            this.toogleEffect.isChecked = this.sound ? true : false;
            cc.AudioController.getInstance().enableSound(this.sound);
        },

        musicClicked: function () {
            this.music = !this.music;
            cc.Tool.getInstance().setItem("@Music", this.music);
            this.toogleMusic.isChecked = this.music ? true : false;
            cc.AudioController.getInstance().enableMusic(this.music);
        },

		chatClicked: function () {
			if (this.toogleChat.isChecked) {
				this.btnChat.active = true;
			} else {
				this.btnChat.active = false;
			}
		}
    });
}).call(this);
