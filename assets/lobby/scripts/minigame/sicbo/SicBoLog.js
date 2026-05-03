/**
 * SicBoLog - debug logger cho game Sicbo, prefix [Sicbo] cho de filter o devtools.
 *
 * Su dung:
 *   cc.SicBoLog.info('TAG', 'message', extraData)
 *   cc.SicBoLog.warn('TAG', 'message')
 *   cc.SicBoLog.error('TAG', 'message')
 *   cc.SicBoLog.hub('SESSION_INFO', payload)   // log hub message
 *   cc.SicBoLog.cmd('SBGetHistory', 'request' | 'response', data)
 *
 * Bat/tat:
 *   cc.SicBoLog.enabled = false  // tat het log
 *   cc.SicBoLog.verbose = true   // log them payload du dai
 */

(function () {
    var SicBoLog = {
        enabled: true,    // bat/tat toan bo log
        verbose: true,    // true = log them payload, false = chi log ten
        prefix: '[Sicbo]',

        _ts: function () {
            var d = new Date();
            return d.toLocaleTimeString() + '.' + (d.getMilliseconds() + '').padStart(3, '0');
        },

        info: function (tag, msg, data) {
            if (!this.enabled) return;
            if (data !== undefined && this.verbose) {
                console.log(this.prefix + '[' + this._ts() + '][' + tag + '] ' + msg, data);
            } else {
                console.log(this.prefix + '[' + this._ts() + '][' + tag + '] ' + msg);
            }
        },

        warn: function (tag, msg, data) {
            if (!this.enabled) return;
            if (data !== undefined && this.verbose) {
                console.warn(this.prefix + '[' + this._ts() + '][' + tag + '] ' + msg, data);
            } else {
                console.warn(this.prefix + '[' + this._ts() + '][' + tag + '] ' + msg);
            }
        },

        error: function (tag, msg, data) {
            if (!this.enabled) return;
            if (data !== undefined) {
                console.error(this.prefix + '[' + this._ts() + '][' + tag + '] ' + msg, data);
            } else {
                console.error(this.prefix + '[' + this._ts() + '][' + tag + '] ' + msg);
            }
        },

        hub: function (eventName, payload) {
            if (!this.enabled) return;
            if (this.verbose) {
                console.log(this.prefix + '[' + this._ts() + '][HUB <-] ' + eventName, payload);
            } else {
                console.log(this.prefix + '[' + this._ts() + '][HUB <-] ' + eventName);
            }
        },

        cmd: function (cmdName, kind, data) {
            if (!this.enabled) return;
            var arrow = kind === 'request' ? '->' : '<-';
            if (this.verbose && data !== undefined) {
                console.log(this.prefix + '[' + this._ts() + '][CMD ' + arrow + '] ' + cmdName, data);
            } else {
                console.log(this.prefix + '[' + this._ts() + '][CMD ' + arrow + '] ' + cmdName);
            }
        }
    };

    cc.SicBoLog = SicBoLog;
}).call(this);
