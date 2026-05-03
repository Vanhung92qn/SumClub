/**
 * SicBoLog - logger cho game Sicbo, prefix [Sicbo] cho de filter o devtools.
 *
 * Toggle qua console:
 *   cc.SicBoLog.enabled = false              // tat het
 *   cc.SicBoLog.verbose = true               // log them payload
 *   cc.SicBoLog.muteHubEvents = ['updateRoomTime', 'sessionInfo', 'summaryPlayer']  // tat hub event noisy
 *
 * Mac dinh: bat, KHONG verbose, mute 4 hub event lap di lap lai (updateRoomTime,
 * sessionInfo, notifyChangePhrase, summaryPlayer). Cac event critical (betSuccess,
 * playerBet, winResult, joinGame, vipPlayers, message, etc) van log.
 */

(function () {
    var SicBoLog = {
        enabled: true,
        verbose: false,
        prefix: '[Sicbo]',
        // Hub events bat lap moi giay - tat default cho do roi log
        muteHubEvents: ['updateRoomTime', 'sessionInfo', 'notifyChangePhrase', 'summaryPlayer'],

        _ts: function () {
            var d = new Date();
            return d.toLocaleTimeString();
        },

        _fmt: function (tag, msg) {
            return this.prefix + '[' + this._ts() + '][' + tag + '] ' + msg;
        },

        info: function (tag, msg, data) {
            if (!this.enabled) return;
            if (data !== undefined && this.verbose) console.log(this._fmt(tag, msg), data);
            else console.log(this._fmt(tag, msg));
        },

        warn: function (tag, msg, data) {
            if (!this.enabled) return;
            if (data !== undefined && this.verbose) console.warn(this._fmt(tag, msg), data);
            else console.warn(this._fmt(tag, msg));
        },

        error: function (tag, msg, data) {
            if (!this.enabled) return;
            if (data !== undefined) console.error(this._fmt(tag, msg), data);
            else console.error(this._fmt(tag, msg));
        },

        hub: function (eventName, payload) {
            if (!this.enabled) return;
            if (this.muteHubEvents.indexOf(eventName) >= 0) return;
            if (this.verbose) console.log(this._fmt('HUB <-', eventName), payload);
            else console.log(this._fmt('HUB <-', eventName));
        },

        cmd: function (cmdName, kind, data) {
            if (!this.enabled) return;
            var arrow = kind === 'request' ? '->' : '<-';
            if (this.verbose && data !== undefined) console.log(this._fmt('CMD ' + arrow, cmdName), data);
            else console.log(this._fmt('CMD ' + arrow, cmdName));
        }
    };

    cc.SicBoLog = SicBoLog;
}).call(this);
