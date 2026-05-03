/**
 * Created by Nofear on 3/15/2019.
 */

//var agencyListData = require('AgencyListData');

(function () {
    cc.AgencyView = cc.Class({
        "extends": cc.Component,
        properties: {
            agencyListView: cc.AgencyListView,
        },

        onLoad: function () {
            
        },

        onEnable: function () {
            var self = this;
            var delay = 0.4;
            cc.director.getScheduler().schedule(function () {
                self.getAgencyList();
            }, this, 1, 0, delay, false);
        },

        getAgencyList: function () {
            var getListAgencyCommand = new cc.GetListAgencyCommand;
            getListAgencyCommand.execute(this);
        },

        onGetListAgencyResponse: function (response) {
            if (response !== null) {
                var agencyList = response.List;
                cc.ShopController.getInstance().setListAgency(agencyList);
    
                //agencyList = agencyListData;
                if (agencyList !== null && agencyList.length > 0) {
                    this.agencyListView.resetList();
                    this.agencyListView.initialize(agencyList);
                }
            }            
        }
    });
}).call(this);
