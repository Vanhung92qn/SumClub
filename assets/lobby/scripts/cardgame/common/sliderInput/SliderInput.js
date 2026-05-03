/**
 * Created by Welcome on 5/28/2019.
 */

(function () {
    cc.SliderInput = cc.Class({
        "extends": cc.Component,
        properties: {
            progressBar: cc.ProgressBar,

            lbMinChip: cc.Label,
            lbMaxChip: cc.Label,
            lbChip: cc.Label, //value hien tai
        },

        onLoad: function () {
            this.slider = this.node.getComponent(cc.Slider);
        },

        //khoi tao gia tri min, max
        init: function (minValue, maxValue, callback, target) {
            //set gia tri min max
            this.minValue = minValue;
            this.maxValue = maxValue;

            //tinh toan gia tri mac dinh
            var roundVal = Math.floor((this.maxValue / 2) / 1000) * 1000;
            this.lbChip.string = cc.Tool.getInstance().formatNumberKTX(roundVal);

            if (this.slider) {
                this.slider.progress = 0.5;
            } else {
                this.slider = this.node.getComponent(cc.Slider);
                this.slider.progress = 0.5;
            }
            this.progressBar.progress = 0.5;


            //set label min/max chip neu co
            if (this.lbMinChip)
                this.lbMinChip.string = cc.Tool.getInstance().formatNumberK(minValue);
            if (this.lbMaxChip)
                this.lbMaxChip.string = cc.Tool.getInstance().formatNumberK(maxValue);

            //set function callback
            this.callback = callback;
            this.target = target;

            this.callback(this.target, roundVal);
        },

        slideEvent: function () {
            //gan progress = slider progress
            this.progressBar.progress = this.slider.progress;

            //tinh gia tri theo progress slider
            var val = this.minValue + ((this.maxValue - this.minValue) * this.slider.progress);
            //lam tron gia tri
            var roundVal = Math.floor(val / 1000) * 1000;

            //set gia tri chip hien tri
            this.lbChip.string = cc.Tool.getInstance().formatNumberKTX(roundVal);

            //goi ham callback
            this.callback(this.target, roundVal);
        }
    });
}).call(this);
