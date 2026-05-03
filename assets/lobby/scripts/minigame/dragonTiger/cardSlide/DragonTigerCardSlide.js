/**
 * Created by BeChicken on 6/22/2019.
 * Vsersion 1.0
 */
(function () {
    cc.DragonTigerCardSlide = cc.Class({
        extends: cc.Component,
        properties: {
            skeletonBox: sp.Skeleton,
            skeletonBurn: sp.Skeleton,
        },
        onLoad: function () {
            cc.DragonTigerController.getInstance().dragonTigerCardSlide= this;
        },
        playBoxAnimation: function (name) {
            let index = 0;
            switch(name) {
                case 'd1':
                    index = 0;
                    break;
                case 'd2':
                    index = 1;
                    break;
                case 'd3':
                    index = 2;
                    break;
                case 'd4':
                    index = 3;
                    break;
                case 'd5':
                    index = 4;
                    break;
                case 'd6':
                    index = 5;
                    break;
                case 'd7':
                    index = 6;
                    break;
                case 'd8':
                    index = 7;
                    break;
                case 'd9':
                    index = 8;
                    break;
                case 'redeal':
                    index = 9;
                    break;
            }
            this.skeletonBox.clearTracks();
            this.skeletonBox.setAnimation(0, name, false);
        },
        playBurnAnimation: function (name) {
            let index = 0;
            switch(name) {
                case 'down':
                    index = 0;
                    break;
                case 'empty':
                    index = 1;
                    break;
                case 'up1':
                    index = 2;
                    break;
                case 'up2':
                    index = 3;
                    break;
                case 'up3':
                    index = 4;
                    break;
                case 'up4':
                    index = 5;
                    break;
                case 'up5':
                    index = 6;
                    break;
                case 'up6':
                    index = 7;
                    break;
                case 'up7':
                    index = 8;
                    break;
                case 'up8':
                    index = 9;
                    break;
                case 'up9':
                    index = 10;
                    break;
            }
            this.skeletonBurn.clearTracks();
            this.skeletonBurn.setAnimation(index, name, false);
        },
        burnStopAnimation: function () {
            this.skeletonBurn.clearTracks();
        }
    })
}).call(this);
