/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.SlotsLBJackpotListView = cc.Class({
        "extends": cc.ListView,
        properties: {

        },

        initialize: function (messages) {
            this.messages = messages;
            var countMessage = this.messages.length;

            this.content.height = countMessage * (this.itemTemplate.height + this.spacing) + this.spacing;

            var spawnCountReal = Math.min(this.spawnCount, countMessage);

            for (var i = 0; i < spawnCountReal; ++i) {
                var item = cc.instantiate(this.itemTemplate);
                this.content.addChild(item);
                item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
                item.getComponent(cc.SlotsLBJackpotItem).updateItem(this.messages[i], i);
                this.items.push(item);
            }
            this.rootContentY = this.content.y;
        },

        update: function (dt) {
            this.updateTimer += dt;
            if (this.updateTimer < this.updateInterval) return; // we don't need to do the math every frame
            this.updateTimer = 0;
            var items = this.items;
            var buffer = this.bufferZone;
            var isDown = this.scrollView.content.y < this.lastContentPosY; // scrolling direction
            var offset = (this.itemTemplate.height + this.spacing) * items.length;
            for (var i = 0; i < items.length; ++i) {
                var viewPos = this.getPositionInView(items[i]);
                if (isDown) {
                    // if away from buffer zone and not reaching top of content
                    if (viewPos.y < -buffer && items[i].y + offset < 0) {
                        items[i].y  = (items[i].y + offset);
                        var item = items[i].getComponent(cc.SlotsLBJackpotItem);
                        var itemId = item.itemID - items.length; // update item id
                        item.updateItem(this.messages[itemId], itemId);
                    }
                } else {
                    // if away from buffer zone and not reaching bottom of content
                    if (viewPos.y > buffer && items[i].y - offset > -this.content.height) {
                        items[i].y  = (items[i].y - offset);
                        item = items[i].getComponent(cc.SlotsLBJackpotItem);
                        itemId = item.itemID + items.length;
                        item.updateItem(this.messages[itemId], itemId);
                    }
                }
            }
            // update lastContentPosY
            this.lastContentPosY = this.scrollView.content.y;
        }
    });
}).call(this);
