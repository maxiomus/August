/**
 * Created by tech on 3/8/2016.
 */
Ext.define('August.view.Multiview', {
    extend: 'Ext.panel.Panel',

    requires: [
        'August.view.MultiviewController',
        'August.view.MultiviewModel',
        'Ext.Responsive'
    ],

    alias: 'widget.multiview',

    controller: "multiview",
    viewModel: {
        type: "multiview"
    },
    
    layout:{
        type: "border"
    },

    defaultType: "container",

    publishes: ['items', 'mainItems'],    

    style: {
        borderTop: '1px solid #cfcfcf'
        //borderBottom: '1px solid #cfcfcf'
    },

    mainItems: null,
    displayItems: null,

    initComponent: function(){
        var me = this;

        Ext.applyIf(me,{
            items: [{
                layout: {
                    type: "card"
                },
                region: "center",
                reference: "center",
                defaultType: "container",
                flex: 3,
                //height: 300,
                //width: 300,
                items: me.mainItems
            },{
                layout: "fit",
                reference: "preview",
                //plugins: "responsive",
                responsiveConfig: {
                    "wide || width >= 960":{
                        region: "east"
                    },
                    "tall || width < 960":{
                        region: "south"
                    }
                },
                border: false,
                split: {
                    size: 1
                },
                flex: 2,
                hidden: true,
                //width: 150,
                //height: 300,
                items: me.displayItems
            }]
        });

        me.callParent(arguments);
    },

    applyMainItems: function(c){
        var me = this;
        me.lookupReference("center").add(c);
    },

    applyDisplayItems: function(c){
        var me = this;
        me.lookupReference("preview").add(c);
    }
});
