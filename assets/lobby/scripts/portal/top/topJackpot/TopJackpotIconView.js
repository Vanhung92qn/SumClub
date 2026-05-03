/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TopJackpotIconView = cc.Class({
        "extends": cc.Component,
        properties: {
            sfEgypt: cc.SpriteFrame,
            sfThreeKingdom: cc.SpriteFrame,
            sfAquarium: cc.SpriteFrame,
            sfDragonBall: cc.SpriteFrame,
            sfBumBum: cc.SpriteFrame,
            sfCowboy: cc.SpriteFrame,

            sf777: cc.SpriteFrame,
            sfMiniPoker: cc.SpriteFrame,
            sfBlockBuster: cc.SpriteFrame,
            sfLuckyWild: cc.SpriteFrame,
            sfThuongHai: cc.SpriteFrame,
            sfGaiNhay: cc.SpriteFrame,
        },

        onLoad: function () {
            cc.TopController.getInstance().setTopJackpotIconView(this);
        },

        getIcon: function(gameId) {
            switch (gameId.toString()) {
                case cc.GameId.EGYPT:
                    return this.sfEgypt;
                case cc.GameId.THREE_KINGDOM:
                    return this.sfThreeKingdom;
                case cc.GameId.AQUARIUM:
                    return this.sfAquarium;
                case cc.GameId.DRAGON_BALL:
                    return this.sfDragonBall;
                case cc.GameId.BUM_BUM:
                    return this.sfBumBum;
                case cc.GameId.COWBOY:
                    return this.sfCowboy;

                case cc.GameId.SEVEN77:
                    return this.sf777;
                case cc.GameId.MINI_POKER:
                    return this.sfMiniPoker;
                case cc.GameId.BLOCK_BUSTER:
                    return this.sfBlockBuster;
                case cc.GameId.LUCKY_WILD:
                    return this.sfLuckyWild;
                case cc.GameId.THUONG_HAI:
                    return this.sfThuongHai;
                case cc.GameId.GAINHAY:
                    return this.sfGaiNhay;
                default:
                    return null;
            }
        },
    });
}).call(this);
