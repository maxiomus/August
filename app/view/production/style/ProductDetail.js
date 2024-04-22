
Ext.define('August.view.production.style.ProductDetail',{
    extend: 'Ext.tab.Panel',

    requires: [
        'August.view.production.style.ProductDetailController',
        'August.view.production.style.ProductDetailModel'
    ],

    controller: 'productdetail',
    viewModel: {
        type: 'productdetail'
    },

    alias: 'widget.productdetail',        

    cls: 'viewer',
    
    maxTabWidth: 180,
    minTabWidth: 50,
    minWidth: 300,
    border: false,

    tabBar: {
        defaults: {
            flex: 1, // if you want them to stretch all the way
            height: 29, // set the height,
            //padding: 6, // set the padding
            textAlign: 'left',
            width: '100%', // set the width for text ellipsis works when tab size smaller than text...
            border: true,
            style: {
                //border: '1px solid #ccc'
            }
        }
    },

    plugins: [{
        pluginId: 'tabreorderer',
        ptype: 'tabreorderer'
    }],

    listeners: {
        //beforetabchange: 'onBeforeTabChange',
        //tabchange: 'onTabChange'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            
        });

        me.callParent(arguments);
    }    
});
