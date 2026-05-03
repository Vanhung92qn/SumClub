/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.LabelIncrement = cc.Class({
        "extends": cc.Component,
        properties: {
            label: cc.Label,

            surfix: '',

            duration: 1.5,
            fromValue: 0,
            toValue: 0,
            range: 0,

            sign: 0,
            canRun: false,
            delta: 0,
            formatCurrencyUnit: false,
        },

        // use this for initialization
        onLoad: function () {
            this.label = this.node.getComponent(cc.Label);

            if (this.duration >= 2.4) {
                this.rootDuration = 3;
            } else {
                this.rootDuration = 1;
            }

            this.duration = 1;

            this.durationNormal = 1.5;
            this.durationAn = 2;
            this.durationDam = 4;
            this.durationKhung = 6;
            this.durationAnHu = 8;
        },

        update: function (dt) {
            if (this.canRun) {

                //Tính toán và hiệu chỉnh delta
                this.delta += dt;

                if (this.delta > this.duration) {
                    this.label.string = (this.formatCurrencyUnit)? this.surfix + this.formatMoney(this.toValue) : this.formatNumber(this.toValue) + this.surfix;
                    this.canRun = false;
                }
                else {
                    let _value = Math.round(this.fromValue + this.delta / this.duration * this.range * this.sign);
                    this.label.string = (this.formatCurrencyUnit)? this.surfix + this.formatMoney(_value, 0) : this.formatNumber(_value) + this.surfix;
                }
            }
        },

        formatMoney: function (val) {
            return cc.Tool.getInstance().formatMoney(val);
        },

        formatNumber: function (val) {
            return cc.Tool.getInstance().formatNumber(val);
        },

        tweenValueto: function (to, time) {
            if (time) {
                this.duration = time;
            } else {
                this.duration = this.rootDuration;
            }
            this.tweenValue(this.toValue, to, time);
        },

        tweenValueWithTime: function (from, to, time) {
            this.duration = time;
            this.startTween(from, to);
        },

        tweenValue: function (from, to, time) {
            if (time) {
                this.duration = time;
            } else {
                this.duration = this.rootDuration;
            }

            this.canRun = false;
            this.startTween(from, to);
        },

        startTween: function (from, to) {
            this.fromValue = from;
            this.toValue = to;
            this.range = Math.abs(this.toValue - this.fromValue);
            if (this.toValue >= this.fromValue) {
                this.sign = 1;
            }
            else {
                this.sign = -1;
            }

            this.delta = 0;

            if (this.fromValue !== this.toValue) {
                this.canRun = true;
            } else {
                this.canRun = false;
            }

            if (this.canRun === false) {
                if (this.label === null)
                    this.label = this.node.getComponent(cc.Label);
                this.label.string = (this.formatCurrencyUnit)? this.surfix + this.formatMoney(this.toValue) : this.formatNumber(this.toValue) + this.surfix;
            }
        },

        setValue: function (value) {
            this.canRun = false;
            this.fromValue = value;
            this.toValue = value;
            if (this.label === null)
                this.label = this.node.getComponent(cc.Label);
            this.label.string = (this.formatCurrencyUnit)? this.surfix + this.formatMoney(this.toValue) : this.formatNumber(this.toValue) + this.surfix;
        },

        setValueText: function(valueText)
        {
            if (this.label === null)
                this.label = this.node.getComponent(cc.Label);
            this.label.string = valueText;
        }
    });

}).call(this);
