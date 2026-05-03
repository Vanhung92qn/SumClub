

(function () {
    cc.StretchSprite = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        start: function () {
            // console.log('getFrameSize: ' + cc.view.getFrameSize());
            // console.log('getVisibleSize: ' + cc.view.getVisibleSize());
            // console.log('getVisibleSizeInPixel: ' + cc.view.getVisibleSizeInPixel());
            // console.log('getDesignResolutionSize: ' + cc.view.getDesignResolutionSize());
            var visibleSize = cc.view.getVisibleSize();
            var baseWidth = 1398;
            var baseHeight = 786;

            var baseRatio = baseWidth / baseHeight;
            var ratio = visibleSize.width / visibleSize.height;

            //man rong
            if (ratio >= baseRatio) {
                this.node.width = visibleSize.width;
                this.node.height =  (visibleSize.width / baseWidth) * baseHeight;
            } else {
                //man hinh cao (iPad, ...)
                this.node.height = visibleSize.height;
                this.node.width =  (visibleSize.height / baseHeight) * baseWidth;
            }

            // if (cc.sys.isNative) {
            // }
        },

    });
}).call(this);