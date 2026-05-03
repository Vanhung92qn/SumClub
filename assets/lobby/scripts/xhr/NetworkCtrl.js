
cc.Class({
    extends: cc.Component,

    properties: {
        xhr: cc.Label,
        xhrAB: cc.Label,
        xhrTimeout: cc.Label,
        websocket: cc.Label,
        socketIO: cc.Label,
        
        xhrResp: cc.Label,
        xhrABResp: cc.Label,
        xhrTimeoutResp: cc.Label,
        websocketResp: cc.Label,
        socketIOResp: cc.Label,

        nodeRoot: cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        this._wsiSendBinary = null;
        this._xhrXHR = null;
        this._xhrHRAB = null;
        this._xhrXHRTimeout = null;

        /*
        this.xhrResp.string = 'NetworkCtrl1';
        this.xhrABResp.string = 'NetworkCtrl2';
        this.xhrTimeoutResp.string = 'NetworkCtrl3';
        this.websocketResp.string = 'NetworkCtrl4';
        this.socketIOResp.string = 'NetworkCtrl5';*/
        
        //this.sendXHR();
        //this.sendXHRAB();
        //this.sendXHRTimeout();
        //this.prepareWebSocket();
        //this.sendSocketIO();
    },

    onDisable: function () {
        var wsiSendBinary = this._wsiSendBinary;
        if (wsiSendBinary) {
            wsiSendBinary.onopen = null;
            wsiSendBinary.onmessage = null;
            wsiSendBinary.onerror = null;
            wsiSendBinary.onclose = null;
        }
        this.rmXhrEventListener(this._xhrXHR);
        this.rmXhrEventListener(this._xhrHRAB);
        this.rmXhrEventListener(this._xhrXHRTimeout);
    },

    loadBgClicked: function () {
        console.log('loadBgClicked');
        // loading all resource in the test assets directory
        cc.loader.loadResDir("bg", function (err, assets) {
            console.log(err);
            console.log(assets);
        });
    },

    loadIconClicked: function () {
        console.log('loadIconClicked');
        // loading all resource in the test assets directory
        cc.loader.loadResDir("icon", function (err, assets) {
            console.log(err);
            console.log(assets);
        });
    },

    loadAllClicked: function () {
        console.log('loadAllClicked');
        // loading all resource in the test assets directory
        var self = this;
        cc.loader.loadRes("prefabs/bg", function (err, prefab) {
            console.log(err);
            console.log(prefab);
            var newNode = cc.instantiate(prefab);
            newNode.parent = self.nodeRoot;
            newNode.x = 0;
            newNode.y = 0;
        });
    },

    sendXHR: function () {
        var xhr = cc.loader.getXMLHttpRequest();
        this.streamXHREventsToLabel(xhr, this.xhr, this.xhrResp, 'GET');

        xhr.open("GET", "https://httpbin.org/get?show_env=1", true);
        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept-Encoding","gzip,deflate");
        }

        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 10000;// 10 seconds for timeout

        xhr.send();
        this._xhrXHR = xhr;
    },
    
    sendXHRAB: function () {
        var xhr = cc.loader.getXMLHttpRequest();
        this.streamXHREventsToLabel(xhr, this.xhrAB, this.xhrABResp, "POST");

        xhr.open("POST", "https://httpbin.org/post");
        //set Content-type "text/plain" to post ArrayBuffer or ArrayBufferView
        xhr.setRequestHeader("Content-Type","text/plain");
        // Uint8Array is an ArrayBufferView
        xhr.send(new Uint8Array([1,2,3,4,5]));
        this._xhrHRAB = xhr;
    },
    
    sendXHRTimeout: function () {
        var xhr = new XMLHttpRequest();
        this.streamXHREventsToLabel(xhr, this.xhrTimeout, this.xhrTimeoutResp, 'GET');

        xhr.open("GET", "https://192.168.22.222", true);

        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 5000;// 5 seconds for timeout
        xhr.send();
        this._xhrXHRTimeout = xhr;
    },
    
    prepareWebSocket: function () {
        console.log('prepareWebSocket');
        var self = this;
        var websocketLabel = this.websocket;
        var respLabel = this.websocketResp;
        //var url = 'ws://taixiu.daiphong.club/signalr/connect?transport=webSockets&connectionToken=vzMUKdJ6YLJHxcHzNFlW4aC5xBtSs7GHc5Uno%2B6fQTbyyXu%2FdsMJaNKOY0JrFWSmgYSm0x46Z6YnfNjE3pJUfnA45c1mpFp4mT9%2F0q6nzhIWd68FXMACjG%2BidZvFOE8FvSOYDb%2Bte1l0vDW9xEXUQv5brJhyToOPw1o6xwHlBw26WS3XizWgHmVmFeNqZo3WIEyZ0p12%2BurbLY3qJYwwCZdK9C%2BpqfqynD85Og%2BGDP955qvg5mCU93qOMjZnaCYEJhwrA4KXpohREnsBrqy%2BZVLOVbY2bIesc1f92p4lR6Y%2FGryQe7TOcEhJ6iyjfXxOcWMwDeCx139V37K9wnm2T8A3Dzw%3D&connectionData=%5B%7B%22name%22%3A%22LuckyDice%22%7D%5D&tid=9';
        var urlTest = "ws://echo.websocket.org";
        this._wsiSendBinary = new WebSocket(urlTest);
        this._wsiSendBinary.binaryType = "arraybuffer";
        this._wsiSendBinary.onopen = function(evt) {
            console.log('websocket onopen');
            console.log(evt.data);
            websocketLabel.textKey = 'NetworkCtrl5';
            self.websocket.string = 'CONNECTED';
        };

        this._wsiSendBinary.onmessage = function(evt) {
            //console.log('evt');
            //console.log(evt);
            console.log(evt.data);
            var binary = new Uint16Array(evt.data);
            var binaryStr = 'response bin msg: ';
            //console.log('binary')
            //console.log(binary);
            var str = '';

            for (var i = 0; i < binary.length; i++) {
                if (binary[i] === 0)
                {
                    str += "\'\\0\'";
                }
                else
                {
                    var hexChar = '0x' + binary[i].toString('16').toUpperCase();
                    str += String.fromCharCode(hexChar);
                }
            }

            binaryStr += str;
            respLabel.string = 'onmessage: ' + evt.data;
            websocketLabel.textKey = 'NetworkCtrl6';
        };

        this._wsiSendBinary.onerror = function(evt) {
            console.log('websocket onerror');
            console.log(evt.data);
            websocketLabel.textKey = 'NetworkCtrl7';
            self.websocket.string = 'ERROR: ' + evt.data;
        };

        this._wsiSendBinary.onclose = function(evt) {
            console.log('websocket onclose');
            console.log(evt.data);
            websocketLabel.textKey = 'NetworkCtrl8';
            self.websocket.string = 'DISCONNECT';
            // After close, it's no longer possible to use it again, 
            // if you want to send another request, you need to create a new websocket instance
            self._wsiSendBinary = null;
        };
        
        //this.scheduleOnce(this.sendWebSocketBinary, 1);
    },

    sendWebSocketMessage: function() {
        if (!this._wsiSendBinary) { return; }
        if (this._wsiSendBinary.readyState === WebSocket.OPEN)
        {
            this._wsiSendBinary.send('Hello WebSocket');
        }
    },

    sendWebSocketBinary: function() {
        if (!this._wsiSendBinary) { return; }
        if (this._wsiSendBinary.readyState === WebSocket.OPEN)
        {
            this.websocket.textKey = 'NetworkCtrl9';
            var buf = "Hello WebSocket中文,\0 I'm\0 a\0 binary\0 message\0.";
            
            var arrData = new Uint16Array(buf.length);
            for (var i = 0; i < buf.length; i++) {
                arrData[i] = buf.charCodeAt(i);
            }
            
            this._wsiSendBinary.send(arrData.buffer);
        }
        else
        {
            var warningStr = "send binary websocket instance wasn't ready...";
            this.websocket.textKey = 'NetworkCtrl11' + warningStr;
            this.scheduleOnce(function () {
                this.sendWebSocketBinary();
            }, 1);
        }
    },

    // Socket IO callbacks for testing
    testevent: function(data) {
        if (!this.socketIO) { return; }

        var msg = this.tag + " says 'testevent' with data: " + data;
        this.socketIO.textKey = 'NetworkCtrl11' + msg;
    },

    message: function(data) {
        if (!this.socketIO) { return; }

        var msg = this.tag + " received message: " + data;
        this.socketIOResp.string = msg;
    },

    disconnection: function() {
        if (!this.socketIO) { return; }

        var msg = this.tag + " disconnected!";
        this.socketIO.textKey = 'NetworkCtrl1' + msg;
    },
    
    sendSocketIO: function () {
        var self = this;
        if (typeof io === 'undefined') {
            cc.error('You should import the socket.io.js as a plugin!');
            return;
        }
        //create a client by using this static method, url does not need to contain the protocol
        var sioclient = io.connect("ws://tools.itharbors.com:4000", {"force new connection" : true});
        this._sioClient = sioclient;

        //if you need to track multiple sockets it is best to store them with tags in your own array for now
        this.tag = sioclient.tag = "Test Client";
        
        //register event callbacks
        //this is an example of a handler declared inline
        sioclient.on("connect", function() {
            if (!self.socketIO) { return; }

            var msg = sioclient.tag + " Connected!";
            self.socketIO.textKey = 'NetworkCtrl13' + msg;

            // Send message after connection
            self._sioClient.send("Hello Socket.IO!");
        });

        //example of a handler that is shared between multiple clients
        sioclient.on("message", this.message.bind(this));

        sioclient.on("echotest", function (data) {
            if (!self.socketIO) { return; }

            cc.log("echotest 'on' callback fired!");
            var msg = self.tag + " says 'echotest' with data: " + data;
            self.socketIO.textKey = 'NetworkCtrl14' + msg;
        });

        sioclient.on("testevent", this.testevent.bind(this));

        sioclient.on("disconnect", this.disconnection.bind(this));
    },
    
    streamXHREventsToLabel: function ( xhr, eventLabel, label, method, responseHandler ) {
        var handler = responseHandler || function (response) {
            return method + " Response (30 chars): " + response.substring(0, 30) + "...";
        };
        
        var eventLabelOrigin = eventLabel.string;
        // Simple events
        ['loadstart', 'abort', 'error', 'load', 'loadend', 'timeout'].forEach(function (eventname) {
            xhr["on" + eventname] = function () {
                eventLabel.string = eventLabelOrigin + "\nEvent : " + eventname;
                if (eventname === 'timeout') {
                    label.string = '(timeout)';
                }
            };
        });
    
        // Special event
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status >= 200) {
                label.string = handler(xhr.responseText);
            }
        };
    },

    rmXhrEventListener: function (xhr) {
        if (!xhr) {
            return;
        }
        ['loadstart', 'abort', 'error', 'load', 'loadend', 'timeout'].forEach(function (eventname) {
            xhr["on" + eventname] = null;
        });
        xhr.onreadystatechange = null;
    }
});
