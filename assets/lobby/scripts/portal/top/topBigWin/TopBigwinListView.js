/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TopBigWinListView = cc.Class({
        "extends": cc.ListView,
        properties: {

        },

        // onEnable: function () {
        //     this.content.x = 0;
        // },

        initialize: function (messages) {
            this.scrollView.node.active = true;

            this.messages = messages;
            var countMessage = this.messages.length;

            this.content.height = countMessage * (this.itemTemplate.height + this.spacing) + this.spacing;

            var spawnCountReal = Math.min(this.spawnCount, countMessage);

            for (var i = 0; i < spawnCountReal; ++i) {
                var item = cc.instantiate(this.itemTemplate);
                this.content.addChild(item);
                //this.content.x = 0;
                //item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
                item.getComponent(cc.TopBigWinItem).updateItem(this.messages[i], i);
                this.items.push(item);
            }
            this.rootContentY = this.content.y;
        },
    });
}).call(this);
