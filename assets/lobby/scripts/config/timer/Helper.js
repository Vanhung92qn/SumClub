
function isEmpty(str) {
	return (!str || 0 === str.length)
}
function validateEmail(t) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t);
}
function checkPhoneValid(phone) {
	return /^[\+]?(?:[(][0-9]{1,3}[)]|(?:84|0))[0-9]{7,10}$/im.test(phone);
}
function nFormatter(t, e) {
	for (var i = [{
		value: 1e18,
		symbol: "E"
	}, {
		value: 1e15,
		symbol: "P"
	}, {
		value: 1e12,
		symbol: "T"
	}, {
		value: 1e9,
		symbol: "G"
	}, {
		value: 1e6,
		symbol: "M"
	}, {
		value: 1e3,
		symbol: "K"
	}], o = /\.0+$|(\.[0-9]*[1-9])0+$/, n = 0; n < i.length; n++)
		if (t >= i[n].value)
			return (t / i[n].value).toFixed(e).replace(o, "$1") + i[n].symbol;
	return t.toFixed(e).replace(o, "$1")
}
function numberWithCommas(number) {
	if (number) {
		var result = (number = parseInt(number)).toString().split(",");
		return result[0] = result[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","),
		result.join(",")
	}
	return "0"
}
function getOnlyNumberInString(t) {
	var e = t.match(/\d+/g);
	return e ? e.join("") : ""
}

function numberToTime(t) {
	t < 0 && (t = 0),
	t = parseInt(t);
	let e = parseInt(t / 60)
	, i = t % 60;
	return e < 10 && (e = "0" + e),
	i < 10 && (i = "0" + i),
	e + ":" + i
}
function numberPad(number, length) {
	let str = '' + number;
	while(str.length < length)
		str = '0' + str;
	return str;
}
// tao chuoi ky tu ngau nhien
function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}
function randomStringABC(len, charSet) {
    charSet = charSet || 'Kabcdefghijklmnopqrstuvwxyz0123456789';
    var randomStringABC = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomStringABC += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomStringABC;
}
function inputNumber(obj){
	var onShift = false
	obj.addEventListener('keydown', function(e){if (e.keyCode === 16) {e.preventDefault();onShift = true;}});
	obj.addEventListener('keyup',   function(e){if (e.keyCode === 16) {e.preventDefault();onShift = false;}});
	obj.addEventListener('keydown', function(e){
		if (!onShift && ((e.keyCode >= 48 && e.keyCode <= 57)  ||
			(e.keyCode >= 96 && e.keyCode <= 105) ||
			(e.keyCode >= 37 && e.keyCode <= 40) ||
			e.keyCode === 107 ||
			e.keyCode === 109 ||
			e.keyCode === 189 ||
			e.keyCode === 8 ||
			e.keyCode === 13)) {
		} else {
			e.preventDefault();
		}
	});
}
function numberToEfect(obj,  end){
	
	// obj.node.scale = 1.2
	let a = numberWithCommas(end) 
	if(obj.string == a) return;
	obj.node.runAction(cc.sequence(
		cc.scaleTo(0.1,1.2),
		cc.callFunc(function(){
			obj.string = numberWithCommas(end)
		}),
		cc.scaleTo(0.4,1)
	))
}
function numberTo(obj, start, end, duration, currency = false){
	clearInterval(obj.timer);
	var range = end - start;
	var minTimer = 50;
	var stepTime = Math.abs(Math.floor(duration / range));
	stepTime = Math.max(stepTime, minTimer);
	var startTime = new Date().getTime();
	var endTime = startTime + duration;

	obj.timer = setInterval(function(){
		if (!!obj.node) {
			var now = new Date().getTime();
			var remaining = Math.max((endTime - now) / duration, 0);
			var value = (end - (remaining * range))>>0;
			obj.string = currency ? numberWithCommas(value) : value;
			if (value == end) {
				clearInterval(obj.timer);
			}
		}else clearInterval(obj.timer);
	}, stepTime);
}
function getStringDateByTime(t) {
	var e = new Date(t)
	  , i = e.getHours()
	  , o = e.getMinutes()
	  , n = e.getDate()
	  , s = e.getMonth() + 1;
	return i < 10 && (i = "0" + i),
	o < 10 && (o = "0" + o),
	n < 10 && (n = "0" + n),
	s < 10 && (s = "0" + s),
	i + ":" + o + " " + n + "/" + s + "/" + e.getFullYear()
}
function getDateByTime(t) {
	var e = new Date(t);
	return e.getDate() + "/" + (e.getMonth() + 1) + "/" + e.getFullYear()
}
function getStringHourByTime(t) {
	var e = new Date(t)
	  , i = e.getHours()
	  , o = e.getMinutes()
	  , n = e.getSeconds();
	return i < 10 && (i = "0" + i),
	o < 10 && (o = "0" + o),
	n < 10 && (n = "0" + n),
	i + ":" + o + ":" + n
}

function anPhanTram(bet, so_nhan, ti_le, type = false){
	// so_nhan: số nhân
	// ti_le: tỉ lệ thuế
	// type: Thuế tổng, thuế gốc
	var vV = bet*so_nhan;
	var vT = !!type ? v1 : bet;
	return vV-Math.ceil(vT*ti_le/100);
}

function addZero10(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}

function md5cycle(x, k) {
  let a = x[0];
  let b = x[1];
  let c = x[2];
  let d = x[3];

  a = ff(a, b, c, d, k[0], 7, -680876936);
  d = ff(d, a, b, c, k[1], 12, -389564586);
  c = ff(c, d, a, b, k[2], 17,  606105819);
  b = ff(b, c, d, a, k[3], 22, -1044525330);
  a = ff(a, b, c, d, k[4], 7, -176418897);
  d = ff(d, a, b, c, k[5], 12,  1200080426);
  c = ff(c, d, a, b, k[6], 17, -1473231341);
  b = ff(b, c, d, a, k[7], 22, -45705983);
  a = ff(a, b, c, d, k[8], 7,  1770035416);
  d = ff(d, a, b, c, k[9], 12, -1958414417);
  c = ff(c, d, a, b, k[10], 17, -42063);
  b = ff(b, c, d, a, k[11], 22, -1990404162);
  a = ff(a, b, c, d, k[12], 7,  1804603682);
  d = ff(d, a, b, c, k[13], 12, -40341101);
  c = ff(c, d, a, b, k[14], 17, -1502002290);
  b = ff(b, c, d, a, k[15], 22,  1236535329);

  a = gg(a, b, c, d, k[1], 5, -165796510);
  d = gg(d, a, b, c, k[6], 9, -1069501632);
  c = gg(c, d, a, b, k[11], 14,  643717713);
  b = gg(b, c, d, a, k[0], 20, -373897302);
  a = gg(a, b, c, d, k[5], 5, -701558691);
  d = gg(d, a, b, c, k[10], 9,  38016083);
  c = gg(c, d, a, b, k[15], 14, -660478335);
  b = gg(b, c, d, a, k[4], 20, -405537848);
  a = gg(a, b, c, d, k[9], 5,  568446438);
  d = gg(d, a, b, c, k[14], 9, -1019803690);
  c = gg(c, d, a, b, k[3], 14, -187363961);
  b = gg(b, c, d, a, k[8], 20,  1163531501);
  a = gg(a, b, c, d, k[13], 5, -1444681467);
  d = gg(d, a, b, c, k[2], 9, -51403784);
  c = gg(c, d, a, b, k[7], 14,  1735328473);
  b = gg(b, c, d, a, k[12], 20, -1926607734);

  a = hh(a, b, c, d, k[5], 4, -378558);
  d = hh(d, a, b, c, k[8], 11, -2022574463);
  c = hh(c, d, a, b, k[11], 16,  1839030562);
  b = hh(b, c, d, a, k[14], 23, -35309556);
  a = hh(a, b, c, d, k[1], 4, -1530992060);
  d = hh(d, a, b, c, k[4], 11,  1272893353);
  c = hh(c, d, a, b, k[7], 16, -155497632);
  b = hh(b, c, d, a, k[10], 23, -1094730640);
  a = hh(a, b, c, d, k[13], 4,  681279174);
  d = hh(d, a, b, c, k[0], 11, -358537222);
  c = hh(c, d, a, b, k[3], 16, -722521979);
  b = hh(b, c, d, a, k[6], 23,  76029189);
  a = hh(a, b, c, d, k[9], 4, -640364487);
  d = hh(d, a, b, c, k[12], 11, -421815835);
  c = hh(c, d, a, b, k[15], 16,  530742520);
  b = hh(b, c, d, a, k[2], 23, -995338651);

  a = ii(a, b, c, d, k[0], 6, -198630844);
  d = ii(d, a, b, c, k[7], 10,  1126891415);
  c = ii(c, d, a, b, k[14], 15, -1416354905);
  b = ii(b, c, d, a, k[5], 21, -57434055);
  a = ii(a, b, c, d, k[12], 6,  1700485571);
  d = ii(d, a, b, c, k[3], 10, -1894986606);
  c = ii(c, d, a, b, k[10], 15, -1051523);
  b = ii(b, c, d, a, k[1], 21, -2054922799);
  a = ii(a, b, c, d, k[8], 6,  1873313359);
  d = ii(d, a, b, c, k[15], 10, -30611744);
  c = ii(c, d, a, b, k[6], 15, -1560198380);
  b = ii(b, c, d, a, k[13], 21,  1309151649);
  a = ii(a, b, c, d, k[4], 6, -145523070);
  d = ii(d, a, b, c, k[11], 10, -1120210379);
  c = ii(c, d, a, b, k[2], 15,  718787259);
  b = ii(b, c, d, a, k[9], 21, -343485551);

  x[0] = add32(a, x[0]);
  x[1] = add32(b, x[1]);
  x[2] = add32(c, x[2]);
  x[3] = add32(d, x[3]);
}

function cmn(q, a, b, x, s, t) {
  a = add32(add32(a, q), add32(x, t));
  return add32((a << s) | (a >>> (32 - s)), b);
}

function ff(a, b, c, d, x, s, t) {
  return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

function gg(a, b, c, d, x, s, t) {
  return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

function hh(a, b, c, d, x, s, t) {
  return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(a, b, c, d, x, s, t) {
  return cmn(c ^ (b | (~d)), a, b, x, s, t);
}

function md51(s) {
  const n = s.length;
  const state = [1732584193, -271733879, -1732584194, 271733878];
  let i;
  for (i=64; i<=s.length; i+=64) {
    md5cycle(state, md5blk(s.substring(i-64, i)));
  }
  s = s.substring(i-64);
  const tail = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
  for (i=0; i<s.length; i++)
    tail[i>>2] |= s.charCodeAt(i) << ((i%4) << 3);
  tail[i>>2] |= 0x80 << ((i%4) << 3);
  if (i > 55) {
    md5cycle(state, tail);
    for (i=0; i<16; i++) tail[i] = 0;
  }
  tail[14] = n*8;
  md5cycle(state, tail);
  return state;
}

/* there needs to be support for Unicode here,
 * unless we pretend that we can redefine the MD-5
 * algorithm for multi-byte characters (perhaps
 * by adding every four 16-bit characters and
 * shortening the sum to 32 bits). Otherwise
 * I suggest performing MD-5 as if every character
 * was two bytes--e.g., 0040 0025 = @%--but then
 * how will an ordinary MD-5 sum be matched?
 * There is no way to standardize text to something
 * like UTF-8 before transformation; speed cost is
 * utterly prohibitive. The JavaScript standard
 * itself needs to look at this: it should start
 * providing access to strings as preformed UTF-8
 * 8-bit unsigned value arrays.
 */
function md5blk(s) {
  /* I figured global was faster.   */
  const md5blks = [];

  let i;
  /* Andy King said do it this way. */
  for (i=0; i<64; i+=4) {
    md5blks[i>>2] = s.charCodeAt(i)
      + (s.charCodeAt(i+1) << 8)
      + (s.charCodeAt(i+2) << 16)
      + (s.charCodeAt(i+3) << 24);
  }
  return md5blks;
}

const hex_chr = '0123456789abcdef'.split('');

function rhex(n)
{
  let s='';
  let j=0;
  for(; j<4; j++)
    s += hex_chr[(n >> (j * 8 + 4)) & 0x0F]
      + hex_chr[(n >> (j * 8)) & 0x0F];
  return s;
}

function hex(x) {
  for (let i=0; i<x.length; i++)
    x[i] = rhex(x[i]);
  return x.join('');
}

function md5(s) {
  return hex(md51(s));
}

/* this function is much faster,
so if possible we use it. Some IEs
are the only ones I know of that
need the idiotic second function,
generated by an if clause.  */

function add32(a, b) {
  return (a + b) & 0xFFFFFFFF;
}

module.exports = {
	checkPhoneValid:       checkPhoneValid,
	nFormatter:            nFormatter,
	numberWithCommas:      numberWithCommas,
	isEmpty:               isEmpty,
	getOnlyNumberInString: getOnlyNumberInString,
	numberPad:             numberPad,
	inputNumber:           inputNumber,
	anPhanTram:            anPhanTram,
	numberTo:              numberTo,
	numberToEfect:			numberToEfect,
	getStringDateByTime:   getStringDateByTime,
	getStringHourByTime:   getStringHourByTime,
	numberToTime:          numberToTime,
	validateEmail:         validateEmail,
	randomString:    randomString,
	randomStringABC: randomStringABC,
	md5:                   md5,
	addZero10:             addZero10,
}
