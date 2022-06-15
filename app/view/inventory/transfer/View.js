
Ext.define('August.view.inventory.transfer.View',{
    extend: 'Ext.view.View',

    requires: [
        'August.view.inventory.transfer.ViewController',
        'August.view.inventory.transfer.ViewModel'
    ],

    alias: 'widget.transfer-view',

    controller: 'transfer-view',
    viewModel: {
        type: 'transfer-view'
    },

    //scrollable: "y",
    //loadMask: true,
    //loadingHeight: 300,
    //trackOver: false,
    //cls: "multi-view",
    loadMask: true,
    overItemCls: "x-item-over",
    itemSelector: "div.item-selector",
    preserveScrollOnRefresh: true,
    deferInitialRefresh: true,
    publishes: ['selection'],

    config: {
        selection: null
    },

    prepareData: function(f, d, e){
        Ext.apply(f, {
            //viewStatus: localStorage.getItem("pow-seen-" + f.powhId) == "true" ? "visited" : ""
        });

        return f;
    },

    listeners: {
        beforecontainerclick: function(){
            return false;
        }
    },

    initComponent: function(c){
        var me = this;

        Ext.applyIf(me, {

        });

        me.callParent(arguments);
    }
});
