cc.TaiXiuJackpotHistoryItem = cc.Class({
    extends: cc.Component,

    properties: {
        bg: cc.Node,
        line: cc.Node,
        lblSession: cc.Label,
        lblTime: cc.Label,
        lblResult: cc.Label,
        lblJackpot: cc.Label,
        lblUserCount: cc.Label,
        vinhDanh: cc.Node,
        btnMore: cc.Button
    },

    updateItem(itemData, idx) {
        this.lblSession.string = itemData.session;
        this.lblTime.string = cc.Tool.getInstance().convertUTCTime(itemData.time);
        this.lblResult.string = itemData.result;
        this.lblUserCount.string = `${itemData.userCount}`;
        this.lblJackpot.string = `${cc.Tool.getInstance().formatNumber(itemData.jackpot)}`;
        this.btnMore.node.off("click");
        this.btnMore.node.active = true;
        this.btnMore.node.on("click", function () {
            this.btnMore.node.active = false;
            for (let i = 0; i < itemData.vinhDanh.length || i < this.vinhDanh.childrenCount; i++) {
                let vItem = this.vinhDanh.children[i];
                if (i < itemData.vinhDanh.length) {
                    let vItemData = itemData.vinhDanh[i];
                    if (!vItem || vItem.name == "1") {
                        vItem = cc.instantiate(this.vinhDanh.children[0]);
                        vItem.parent = this.vinhDanh;
                    }
                    vItem.active = true;
                    vItem.getChildByName("lblNickname").getComponent(cc.Label).string = vItemData.nickname;
                    vItem.getChildByName("lblCoin").getComponent(cc.Label).string = cc.Tool.getInstance().formatNumber(vItemData.coin);
                     
                } else if (vItem) {
                    vItem.active = false;
                }
                this.vinhDanh.getChildByName("1").setSiblingIndex(this.vinhDanh.childrenCount - 1);
                this.vinhDanh.getChildByName("1").active = true;
            }
        }.bind(this));

        for (let i = 0; i < itemData.vinhDanh.length || i < this.vinhDanh.childrenCount; i++) {
            let vItem = this.vinhDanh.children[i];
            if (i < itemData.vinhDanh.length && i < 3) {
                let vItemData = itemData.vinhDanh[i];
                if (!vItem || vItem.name == "1") {
                    vItem = cc.instantiate(this.vinhDanh.children[0]);
                    vItem.parent = this.vinhDanh;
                    vItem.setSiblingIndex(1);
                }
                vItem.active = true;
                vItem.getChildByName("lblNickname").getComponent(cc.Label).string = vItemData.nickname;
                vItem.getChildByName("lblCoin").getComponent(cc.Label).string = cc.Tool.getInstance().formatNumber(vItemData.coin);
                 
            } else if (vItem) {
                vItem.active = false;
            }
        }
        this.vinhDanh.getChildByName("1").setSiblingIndex(this.vinhDanh.childrenCount - 1);
        this.vinhDanh.getChildByName("1").active = true;
    },

    update() {
        this.bg.height = this.node.height - 12;
        this.line.height = this.bg.height;
    }
});
