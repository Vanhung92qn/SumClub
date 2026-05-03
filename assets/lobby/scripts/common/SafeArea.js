/**
 * Created by Nofear on 7/14/2017.
 */

(function () {
    cc.SafeArea = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        onLoad: function () {
            if (!cc.sys.isNative) {
                this.node.getComponent(cc.Canvas).fitHeight = true;
                //comment lai do bi loi Soi Cau chan ra ngoai tren web
                // this.node.getComponent(cc.Canvas).fitWidth = true;
                return;
            }

            //lay ti le man hinh
            var ratio = cc.view.getFrameSize().width / cc.view.getFrameSize().height;

            //tren cac thiet bi < 16 : 9 (tablet, iPad ...)
            if (ratio < 1.7) {
                this.node.getComponent(cc.Canvas).fitWidth = true;
                this.node.getComponent(cc.Canvas).fitHeight = false;
            } else {
                this.node.getComponent(cc.Canvas).fitWidth = false;
                this.node.getComponent(cc.Canvas).fitHeight = true;
            }
        },
    });

}).call(this);