/**
 * Created by Nofear on 6/8/2017.
 */

(function () {
    var Tool;

    Tool = (function () {
        var instance;

        function Tool() {
        }

        instance = void 0;

        Tool.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        Tool.prototype.copyToClipboard = function (content) {
            if (cc.sys.isNative) {
                if (jsb) {
                    jsb.copyTextToClipboard(content);
                    return true;
                } else {
                    return false;
                }
            } else {
                var input = document.createElement('input');
                input.value = content;
                input.id = 'inputID';
                document.body.appendChild(input);
                input.select();
                document.execCommand('copy');
                document.body.removeChild(input);
                return true;
            }
        };

        Tool.prototype.formatNumber = function (number) {
            if (number || number === '0' || number === 0) {
                return parseInt(number).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            } else {
                return '';
            }
        };

        Tool.prototype.numberRemoveDecimal = function(x, fix=1) {
            var int_part = Math.trunc(x);
            var float_part = Number((x-int_part).toFixed(fix));
            var rs = int_part + (fix>0? float_part : '');

            return rs.toString().replace(',','.');
        };
        
        Tool.prototype.formatMoney = function(number, fix=1) {
            if (number > 999999 || number < -999999) {
                return this.numberRemoveDecimal(number/1000000, fix).toLocaleString('es-ES') + 'M';
            } else if (number > 999 || number < -999) {
                return this.numberRemoveDecimal(number/1000, fix).toLocaleString('es-ES') + 'K';
            } else {
                return number.toLocaleString('es-ES');
            }
        };

        Tool.prototype.formatNumberM = function (number) {
            if (number > 999999 || number < -999999) {
                return Math.floor(number / 1000000).toLocaleString('es-ES') + 'M';
            } else {
                return number.toLocaleString('es-ES');
            }
        };

        Tool.prototype.formatNumberK = function (number) {
            if (number > 999 || number < -999) {
                return Math.floor(number / 1000).toLocaleString('es-ES') + 'K';
            } else {
                return number.toLocaleString('es-ES');
            }
        };

		Tool.prototype.formatNumberkvn1102 = function (number) {
            if (number || number === '0' || number === 0) {
                return parseInt(number).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            } else {
                return '';
            }
        };

        Tool.prototype.formatNumberKTX = function (number) {
            if (number > 999999999 || number < -999999999) {
                return Math.floor(number / 1000000).toLocaleString('es-ES') + 'M';
            } else if (number > 999999 || number < -999999) {
                return Math.floor(number / 1000).toLocaleString('es-ES') + 'K';
            } else {
                return number.toLocaleString('es-ES');
            }
        };
		 Tool.prototype.convertUTCTime99 = function (dateFormat) {
            var date = new Date(dateFormat + 'Z');

            function pad(v) {
                return v < 10 ? "0" + v : v;
            }

            return [pad(date.getUTCHours()), pad(date.getUTCMinutes()), pad(date.getUTCSeconds())].join(":") + ' ' + [pad(date.getUTCDate()), pad(date.getUTCMonth() + 1), date.getUTCFullYear()].join("-");

            // if (cc.sys.isNative) {
            //     return [pad(date.getUTCDate()), pad(date.getUTCMonth() + 1), date.getUTCFullYear()].join("-") + ' ' + [pad(date.getUTCHours()), pad(date.getUTCMinutes())].join(":") ;
            // } else {
            //     return [pad(date.getDate()), pad(date.getMonth() + 1), date.getFullYear()].join("-") + ' ' + [pad(date.getHours()), pad(date.getMinutes())].join(":") ;
            // }

            //return (new Date(dateFormat)).toLocaleString("es-ES");
        };

        Tool.prototype.removeDot = function (val) {
            return parseInt((val.split(',').join("")).split('+').join(""));
        };

        Tool.prototype.formatRichTextGray = function (str1, str2) {
            return this.formatRichText(str1, str2, '#AEC4D5');
        };

        Tool.prototype.formatRichTextYellow = function (str1, str2) {
            return this.formatRichText(str1, str2, '#FFCA23');
        };

        Tool.prototype.formatRichTextBlue = function (str1, str2) {
            return this.formatRichText(str1, str2, '#03BEEC');
        };

        Tool.prototype.formatRichTextRed = function (str1, str2) {
            return this.formatRichText(str1, str2, '#EE3148');
        };

        Tool.prototype.formatRichText = function (str1, str2, colorStr) {
            //<color=#ffffff>Tổng số lần quay: </c><color=#EE3148>0</color>
            return '<color=#ffffff>' + str1 + ' </c><color=' + colorStr + '>' + str2 + '</color>';
        };

        Tool.prototype.toTimeString = function (seconds) {
            return (new Date(seconds * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
        };

        Tool.prototype.toTimeString4 = function (seconds) {
            return (new Date(seconds * 1000)).toUTCString().match(/(\d\d:\d\d)/)[0];
        };

        Tool.prototype.getTimestamp = function () {
            var d = new Date();
            return d.getUTCFullYear() + '-' + (d.getUTCMonth() + 1) + '-' + d.getUTCDate() + ' ' + d.getUTCHours() + ':' + d.getUTCMinutes() + ':' + d.getUTCSeconds() + '.' + d.getUTCMilliseconds();
        };

        Tool.prototype.getDateNow = function () {
            var d = new Date();
            return d.getUTCFullYear() + '-' + ((d.getUTCMonth() + 1) < 10 ? '0' + (d.getUTCMonth() + 1) : (d.getUTCMonth() + 1)) + '-' + d.getUTCDate();
        };

        Tool.prototype.getLocalMonth = function () {
            var d = new Date();
            return d.getMonth() + 1;
        };

        //yyyy-mm-dd
        Tool.prototype.getLocalDateNow = function (daysAgo) {
            var d = new Date();

            if (daysAgo !== undefined) {
                d.setDate(d.getDate() - daysAgo);
            }

            return d.getFullYear()
                + '-' + ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1))
                + '-' + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate());
        };

        //dd/mm/yyyy
        Tool.prototype.getLocalDateNow2 = function (daysAgo) {
            var d = new Date();

            if (daysAgo !== undefined) {
                d.setDate(d.getDate() - daysAgo);
            }

            return ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1))
                + '/' + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate())
                + '/' + d.getFullYear();
        };
        //dd/mm/yyyy
        Tool.prototype.formatDate = function (date) {
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            day = (day < 10) ? '0' + day : day;
            month = (month < 10) ? '0' + month : month;
            return `${day}/${month}/${year}`;
        };

        //dd/mm/yyyy
        Tool.prototype.formatDate2 = function (date) {
            let newDate = new Date(date);
            let day = newDate.getDate();
            let month = newDate.getMonth() + 1;
            day = (day < 10) ? '0' + day : day;
            month = (month < 10) ? '0' + month : month;
            return `${day}/${month}`;
        };

        //hh:mm dd/mm/yyyy
        Tool.prototype.getLocalDateNow3 = function (hoursAgo) {
            var d = new Date();

            if (hoursAgo !== undefined) {
                d.setHours(d.getHours() - hoursAgo);
            }

            return (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + ':'
                + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()) + ' '
                + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate())
                + '/' + ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1))
                + '/' + d.getFullYear();
        };

        Tool.prototype.generateUUID = function () {
            var d = new Date().getTime();
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        };


        Tool.prototype.getParameterByName = function (name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        };

        Tool.prototype.getHref = function () {
            if (cc.sys.isNative) return;
            // host: "luhanhvietnam.com.vn"
            // hostname: "luhanhvietnam.com.vn"
            // href: "https://luhanhvietnam.com.vn/tour-du-lich/?utm_source=VnExpress&utm_medium=statis&utm_campaign=C192858"
            // origin: "https://luhanhvietnam.com.vn"
            // pathname: "/tour-du-lich/"
            // port: ""
            // protocol: "https:"
            return window.location.href;
        };

        Tool.prototype.getHostName = function () {
            if (cc.sys.isNative) return;
            return window.location.hostname;
        };

        Tool.prototype.shuffle = function (array) {
            var j, x, i;
            for (i = array.length; i; i--) {
                j = Math.floor(Math.random() * i);
                x = array[i - 1];
                array[i - 1] = array[j];
                array[j] = x;
            }

            return array;
        };

        Tool.prototype.convertStringArrayToIntArray = function (strArray) {
            return strArray.split(',').map(function (item) {
                return parseInt(item, 10);
            });
        };

        Tool.prototype.listToMatrix = function (list, elementsPerSubArray) {
            var matrix = [], i, k;
            for (i = 0, k = -1; i < list.length; i++) {
                if (i % elementsPerSubArray === 0) {
                    k++;
                    matrix[k] = [];
                }
                matrix[k].push(list[i]);
            }
            return matrix;
        };

        Tool.prototype.convertSecondToTimeWithDay = function (second) {
            if (second < 0) {
                second = 0;
            }

            var d = Math.floor(second / 3600 / 24);
            var h = Math.floor(second / 3600 % 24);
            var m = Math.floor(second % 3600 / 60);
            var s = Math.floor(second % 3600 % 60);

            if (d < 1) {
                if (h < 10) {
                    return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
                } else {
                    return h + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
                }
            } else {
                if (h < 10) {
                    return d + "N " + ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
                } else {
                    return d + "N " + h + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
                }
            }

        };

        Tool.prototype.convertSecondToTime = function (second) {
            if (second < 0) {
                second = 0;
            }
            var h = Math.floor(second / 3600);
            var m = Math.floor(second % 3600 / 60);
            var s = Math.floor(second % 3600 % 60);

            if (h < 10) {
                return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
            } else {
                return h + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
            }
        };

        Tool.prototype.convertSecondToTime2 = function (second) {
            if (second < 0) {
                second = 0;
            }
            var m = Math.floor(second % 3600 / 60);
            var s = Math.floor(second % 3600 % 60);
            return ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);

        };

        Tool.prototype.convertTime = function (dateFormat) {
            var date = new Date(dateFormat);

            function pad(v) {
                return v < 10 ? "0" + v : v;
            }

            return [pad(date.getDate()), pad(date.getMonth() + 1), date.getFullYear()].join("-") + ' ' + [pad(date.getHours()), pad(date.getMinutes())].join(":");
        };

        Tool.prototype.convertUTCTime = function (dateFormat) {
            var date = new Date(dateFormat + 'Z');

            function pad(v) {
                return v < 10 ? "0" + v : v;
            }

            return [pad(date.getUTCDate()), pad(date.getUTCMonth() + 1), date.getUTCFullYear()].join("-") + ' ' + [pad(date.getUTCHours()), pad(date.getUTCMinutes())].join(":");

            // if (cc.sys.isNative) {
            //     return [pad(date.getUTCDate()), pad(date.getUTCMonth() + 1), date.getUTCFullYear()].join("-") + ' ' + [pad(date.getUTCHours()), pad(date.getUTCMinutes())].join(":") ;
            // } else {
            //     return [pad(date.getDate()), pad(date.getMonth() + 1), date.getFullYear()].join("-") + ' ' + [pad(date.getHours()), pad(date.getMinutes())].join(":") ;
            // }

            //return (new Date(dateFormat)).toLocaleString("es-ES");
        };

        Tool.prototype.convertUTCTime3 = function (dateFormat) {
            var date = new Date(dateFormat + 'Z');

            function pad(v) {
                return v < 10 ? "0" + v : v;
            }

            return [pad(date.getUTCDate()), pad(date.getUTCMonth() + 1), date.getUTCFullYear()].join("-") + ' ' + [pad(date.getUTCHours()), pad(date.getUTCMinutes())].join(":");

            // if (cc.sys.isNative) {
            //     return [pad(date.getUTCDate()), pad(date.getUTCMonth() + 1), date.getUTCFullYear()].join("-") + ' ' + [pad(date.getUTCHours()), pad(date.getUTCMinutes())].join(":") ;
            // } else {
            //     return [pad(date.getDate()), pad(date.getMonth() + 1), date.getFullYear()].join("-") + ' ' + [pad(date.getHours()), pad(date.getMinutes())].join(":") ;
            // }
            // return (new Date(dateFormat)).toLocaleString("es-ES");
        };

        Tool.prototype.convertUTCTime2 = function (dateFormat) {
            var date = new Date(dateFormat + 'Z');
            // var date2 = (new Date(dateFormat)).toLocaleString("es-ES");
            // var date = (new Date(date2));

            function pad(v) {
                return v < 10 ? "0" + v : v;
            }

            return [pad(date.getUTCHours()), pad(date.getUTCMinutes()), pad(date.getUTCSeconds())].join(":");

            // if (cc.sys.isNative) {
            //     return [pad(date.getUTCHours()), pad(date.getUTCMinutes()), pad(date.getUTCSeconds())].join(":");
            // } else {
            //     return [pad(date.getHours()), pad(date.getMinutes()), pad(date.getSeconds())].join(":");
            // }

            //return (new Date(dateFormat)).toLocaleString("es-ES");
        };

        Tool.prototype.convertUTCDate = function (dateFormat) {
            var date = new Date(dateFormat + 'Z');

            function pad(v) {
                return v < 10 ? "0" + v : v;
            }

            return [pad(date.getUTCDate()), pad(date.getUTCMonth() + 1), date.getUTCFullYear()].join("-");

            // if (cc.sys.isNative) {
            //     return [pad(date.getUTCDate()), pad(date.getUTCMonth() + 1), date.getUTCFullYear()].join("-");
            // } else {
            //     return [pad(date.getDate()), pad(date.getMonth() + 1), date.getFullYear()].join("-");
            // }
            // return (new Date(dateFormat)).toLocaleString("es-ES");
        };

        Tool.prototype.convertGMT0Time = function (date) {
            //add datestr
            var dateStr = date// + "T00:00:00.000Z";
            var d = (new Date(dateStr).getTime() - 7 * 60 * 60 * 1000);

            var newDate = new Date(d);

            return newDate;
        };

        Tool.prototype.rtrim = function (str, ch) {
            for (var i = str.length - 1; i >= 0; i--) {
                if (ch !== str.charAt(i)) {
                    str = str.substring(0, i + 1);
                    break;
                }
            }
            return str;
        };

        Tool.prototype.removeStr = function (str, strip) {
            return str.replace('/' + strip + '/g', ''); ///gi = case insensitive, g = case sensitive
        };

        Tool.prototype.setItem = function (key, value) {
            return cc.sys.localStorage.setItem(key, value);
        };

        Tool.prototype.getItem = function (key) {
            return cc.sys.localStorage.getItem(key);
        };

        Tool.prototype.removeItem = function (key) {
            return cc.sys.localStorage.removeItem(key);
        };

        Tool.prototype.openOnce = function (url, target) {
            // open a blank "target" window
            // or get the reference to the existing "target" window
            var winRef = window.open('', target, '', true);

            // if the "target" window was just opened, change its url
            if (winRef.location.href === 'about:blank') {
                winRef.location.href = url;
            }
            return winRef;
        };

        Tool.prototype.deleteAllCookies = function () {
            var cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                var eqPos = cookie.indexOf("=");
                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
        };

        Tool.prototype.mergeJSON = function (source1, source2) {
            /*
             * Properties from the Souce1 object will be copied to Source2 Object.
             * Note: This method will return a new merged object, Source1 and Source2 original values will not be replaced.
             * */
            var mergedJSON = Object.create(source2);// Copying Source2 to a new Object

            for (var attrname in source1) {
                if (mergedJSON.hasOwnProperty(attrname)) {
                    if (source1[attrname] != null && source1[attrname].constructor == Object) {
                        /*
                         * Recursive call if the property is an object,
                         * Iterate the object and set all properties of the inner object.
                         */
                        mergedJSON[attrname] = mergeJSON(source1[attrname], mergedJSON[attrname]);
                    }
                } else {//else copy the property from source1
                    mergedJSON[attrname] = source1[attrname];

                }
            }

            return mergedJSON;
        };

        //Lay random so tu min -> max
        Tool.prototype.getRandomFromTo = function (min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        };

        //Unique array
        Tool.prototype.arrUnique = function (array) {
            return array.filter((v, i, a) => a.indexOf(v) === i);
        };
        //Push 0 if number < 10
        Tool.prototype.pushZero = function (number) {
            number = parseInt(number);
            return (number < 10) ? "0"+number : number;
        };
        return Tool;

    })();

    cc.Tool = Tool;

}).call(this);
