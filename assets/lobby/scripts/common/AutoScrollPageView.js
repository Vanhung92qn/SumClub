/**
 * Created by Nofear on 7/14/2017.
 */

(function () {
    cc.AutoScrollPageView = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        onLoad: function () {

        },

        getTotalPage: function () {
            this.timePerPage = 3;
            this.timeSwitchPage = 1;

            this.pageView = this.node.getComponent(cc.PageView);
            this.totalPages = this.pageView.content.children.length;
            this.currentPageIndex = this.pageView.getCurrentPageIndex();

            var self = this;
            cc.director.getScheduler().schedule(this.switchPage, this, self.timePerPage, cc.macro.REPEAT_FOREVER, 0, false);
        },

        switchPage: function() {
            this.currentPageIndex = this.pageView.getCurrentPageIndex();
            if (this.currentPageIndex === this.totalPages - 1) {
                this.currentPageIndex = 0;
            } else {
                this.currentPageIndex++;
            }
            this.pageView.scrollToPage(this.currentPageIndex, this.timeSwitchPage);
        }
    });

}).call(this);