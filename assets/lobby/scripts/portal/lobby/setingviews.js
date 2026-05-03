// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
		
		nhacoff: cc.Node,
		nhacon: cc.Node,
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },
     onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
        },
	onEnable: function () {
        this.animation.play('openPopup');
        
        // Sync the initial UI state according to saved audio settings
        var isAudioOn = true;
        var tool = cc.Tool.getInstance();
        var savedAudio = tool.getItem("@onAudioBg");
        if (savedAudio !== null) {
            isAudioOn = (savedAudio === "true" || savedAudio === true);
        }
        
        this.nhacon.active = isAudioOn;
        this.nhacoff.active = !isAudioOn;
    },
	clickon: function(){
        // Turn ON
		this.nhacon.active = true;
		this.nhacoff.active = false;
        if (cc.LobbyController && cc.LobbyController.getInstance()) {
            cc.LobbyController.getInstance().setIsOnAudioBg(true);
        }
	},
	clickoff: function(){
        // Turn OFF
		this.nhacon.active = false;
		this.nhacoff.active = true;
        if (cc.LobbyController && cc.LobbyController.getInstance()) {
            cc.LobbyController.getInstance().setIsOnAudioBg(false);
        }
	},
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
