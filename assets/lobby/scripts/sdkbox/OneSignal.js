

(function () {
    cc.OneSignal = cc.Class({
        "extends": cc.Component,
        properties: {

        },


        onLoad: function () {
            //chi chay tren NATIVE
            if (cc.sys.isNative) {
                if (sdkbox) {
                    cc.OneSignalController.getInstance().setOneSignal(this);

                    //INIT
                    sdkbox.PluginOneSignal.init();

                    //setListener
                    sdkbox.PluginOneSignal.setListener({
                        onSendTag :function (success, key, message) {
                            console.log('onSendTag: ' + success);
                            console.log('onSendTag key: ' + key);
                            console.log('onSendTag message: ' + message);
                        },
                        onGetTags :function (jsonString) {
                            console.log('onGetTags jsonString: ' + jsonString);
                        },
                        onIdsAvailable :function (userId,  pushToken) {
                            console.log('onIdsAvailable userId: ' + userId);
                            console.log('onIdsAvailable pushToken: ' + pushToken);
                        },
                        onPostNotification :function (success,  message) {
                            console.log('onPostNotification success: ' + success);
                            console.log('onPostNotification message: ' + message);
                        },
                        onNotification :function (isActive,  message, additionalData) {
                            console.log('onNotification: ' + isActive);
                            console.log('onNotification message: ' + message);
                            console.log('onNotification additionalData: ' + additionalData);
                        }
                    });

                    // Only use if you set "auto_register":false in sdkbox_config.json (iOS only)
                    // sdkbox.PluginOneSignal.registerForPushNotifications();
                }
            }
        },

        sendTag: function (key, value) {
            if (cc.sys.isNative) {
                console.log('OneSignal sendTag key: ' + key);
                console.log('OneSignal sendTag value: ' + value);
                sdkbox.PluginOneSignal.sendTag(key, value);
            }
        },

        deleteTag: function (key) {
            if (cc.sys.isNative) {
                sdkbox.PluginOneSignal.deleteTag(key);
            }
        },

        getTags: function () {
            if (cc.sys.isNative) {
                sdkbox.PluginOneSignal.getTags();
            }
        },

        setEmail: function (email) {
            if (cc.sys.isNative) {
                sdkbox.PluginOneSignal.setEmail(email);
            }
        },

        // Lets you retrieve the OneSignal user id and the Google registration id. Your handler is called after the device is successfully registered with OneSignal.
        idsAvailable: function () {
            if (cc.sys.isNative) {
                sdkbox.PluginOneSignal.idsAvailable();
            }
        },

        // By default this is false and notifications will not be shown when the user is in your app, instead the NotificationOpenedHandler is fired.
        // If set to true notifications will be shown as native alert boxes if a notification is received when the user is in your app.
        // The NotificationOpenedHandler is then fired after the alert box is closed.
        enableInAppAlertNotification: function (enable) {
            if (cc.sys.isNative) {
                sdkbox.PluginOneSignal.enableInAppAlertNotification(enable);
            }
        },

        // You can call this method with false to opt users out of receiving all notifications through OneSignal.
        // You can pass true later to opt users back into notifications.
        setSubscription: function (enable) {
            if (cc.sys.isNative) {
                sdkbox.PluginOneSignal.setSubscription(enable);
            }
        },

        // Allows you to send notifications from user to user or schedule ones in the future to be delivered to the current device.
        postNotification: function (jsonString) {
            if (cc.sys.isNative) {
                sdkbox.PluginOneSignal.postNotification(jsonString);
            }
        },
    });
}).call(this);
