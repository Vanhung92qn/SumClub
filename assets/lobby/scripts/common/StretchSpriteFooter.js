

(function () {
    cc.StretchSprite = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        start: function () {
            var visibleSize = cc.view.getVisibleSize();
            var baseWidth = 1398;
            var baseHeight = 120;

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