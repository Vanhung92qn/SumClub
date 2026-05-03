/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.ChatRoomListView = cc.Class({
        "extends": cc.ListView,
        properties: {

        },

        initialize: function (messages) {
            this.messages = messages;
            var countMessage = this.messages.length;

            for (var i = 0; i < countMessage; ++i) {
                var item = cc.instantiate(this.itemTemplate);
                this.content.addChild(item);
                //item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
                item.getComponent(cc.ChatRoomItem).updateItem(this.messages[i], i);
                this.items.push(item);
            }
            //this.rootContentY = this.content.y;
        },

        updateList: function (messages) {
            var items = this.items;
            for (var i = 0; i < items.length; ++i) {
                var item = items[i].getComponent(cc.ChatRoomItem);
                item.updateItem(messages[i], i);
            }
        },
    });
}).call(this);
