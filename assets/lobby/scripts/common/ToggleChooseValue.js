/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    cc.ToggleChooseValue = cc.Class({
        "extends": cc.Component,
        properties: {
            chooseValue: cc.Node,
        },

        resetListChooseValue: function () {
            var children = this.node.children;
            for (var i = children.length - 1; i >= 0; i--) {
                this.node.removeChild(children[i]);
            }
        },

        initializeToggleChooseValue: function (target, componentName, callbackName, eventData, displayValue, posY, nodeName, isChecked) {
            //this.node.position.x = 0;
            //this.node.position.y = 0;

            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = target; //This node is the node to which your event handler code component belongs
            clickEventHandler.component = componentName;//This is the code file name
            clickEventHandler.handler = callbackName;
            clickEventHandler.customEventData = eventData;

            var nodeChooseValue = cc.instantiate(this.chooseValue);
            this.node.addChild(nodeChooseValue);

            if (nodeName) {
                //tham so phu -> de truyen them value gui len backend
                nodeChooseValue.name = nodeName;
            }

            // if (posY !== undefined) {
            //     nodeChooseValue.y = posY;
            // }

            var toggle = nodeChooseValue.getComponent(cc.Toggle);
            if (isChecked) {
                toggle.isChecked = isChecked;
            } else {
                toggle.isChecked = false;
            }

            toggle.clickEvents.push(clickEventHandler);
            nodeChooseValue.getComponent(cc.ToggleSetValue).setValue(displayValue);
        },

    });
}).call(this);