
Ext.define('August.view.shopify.windows.InventorySync',{
    extend: 'Ext.window.Window',

    requires: [
         
    ],

    alias: 'widget.shopify-windows-inventorysync',        

    viewModel: {},

    header: {
        title: 'Shopify Product Inventory Sync with N41',
        iconCls: 'x-fa fa-sync',
        titlePosition: 0,
        titleAlign: 'left'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    padding: 10,

    bind: {
        title: '{title}'
    },

    width: 480,
    height: 240,

    //minWidth: 720,
    //minHeight: 480,

    //modal: true,
    monitorResize: true,
    maximizable: true,
    constrain: true,
    closable: true,

    tools: [{
        type: 'pin'
    }],    

    initComponent: function() {
        var me = this;

        // Calculating the textfield height...
        var field = new Ext.form.field.Text({
                renderTo: document.body
            }), fieldHeight = field.getHeight(),
            padding = 5,
            remainingHeight;

        field.destroy();

        remainingHeight = padding + fieldHeight * 5;       

        me.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            //reference: 'topbar',
            ui: 'footer',
            defaults: {
                //minWidth: 200
            },
            items: ['->', {
                action: 'sync',
                text: 'Sync',                
                //glyph: 86,
                iconCls: 'x-fa fa-sync',
                handler: function(btn){
                    me.fireEvent('syncclick', btn, me);
                }
            },{
                action: 'close',
                text: 'Close',
                //glyph: 88,
                iconCls: 'x-far fa-times-circle',
                handler: function(btn){
                    me.close();
                }
            }]
        }],

        Ext.applyIf(me, {

            items: [{                             
                xtype: 'tagfield',
                name: 'targetStores',
                fieldLabel: 'Select stores',

                bind: {
                    store: '{shopifyStores}'
                },
            
                reference: 'stores',
                displayField: 'label',
                valueField: 'name',
                filterPickList: true,
                queryMode: 'local',
                publishes: 'name',

                listeners: {
                    select: {
                        fn: 'onTagSelected'
                    }
                }
            }],
            
            buttons: this.buildButtons
        });

        me.callParent(arguments);

    }
})