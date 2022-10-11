
Ext.define('August.view.shopify.windows.PhotoUpdate',{
    extend: 'Ext.window.Window',

    requires: [
        'August.view.shopify.windows.PhotoUpdateController',
        'August.view.shopify.windows.PhotoUpdateModel'
        //'Ext.view.MultiSelector',
        //'Ext.ux.form.ItemSelector',
        //'August.view.shopify.windows.PhotoUpdateModel'
    ],

    alias: 'widget.shopify-windows-photoupdate',

    controller: 'shopify-windows-photoupdate',
    viewModel: {
        type: 'shopify-windows-photoupdate'
    },

    layout: {
        type: 'fit'
    },

    header: {
        title: 'Shopify Product Photo Update',
        iconCls: 'x-fa fa-camera',
        titlePosition: 0,
        titleAlign: 'left'
    },

    padding: 10,

    bind: {
        title: '{title}'
    },
    
    session: true,
            
    minHeight: 480,
    maximized: false,

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
        remainingHeight = padding + fieldHeight * 3;

        me.width = document.body.clientWidth - 660;
        me.height = document.body.clientHeight - 320;       

        Ext.applyIf(me, {

            items: [{
                xtype: 'form',
                layout: {
                    type: 'anchor'
                },
                defaults: {
                    margin: '0 0 10 0',
                    anchor: '100%',
                    allowBlank: false,
                    msgTarget: 'side',
                    labelWidth: 100
                },
                items: [{
                    xtype: 'textfield',                    
                    fieldLabel: 'Product Title',
                    bind: {
                        value: '{title}'
                    }
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Location',
                    bind: {
                        value: '{source}'
                    }
                },{
                    xtype: 'grid',
                    anchor: '100% 85%',                    
                    bind: {
                        store: '{options}'
                    },
                    columns: [
                        /*{ header: 'Product', dataIndex: 'handle', flex: 2 },*/
                        { header: 'Variant Color', dataIndex: 'color', flex: 1 },
                        { header: '# of Photos', dataIndex: 'qty' },
                        { 
                            header: 'Total #', dataIndex: 'total',
                            editor: {
                                completeOnEnter: false,
                                field: {
                                    xtype: 'numberfield',
                                    allowBlank: false
                                }
                            }
                        }
                    ],
                    plugins: {
                        cellediting: {
                            clicksToEdit: 1
                        }
                    }
                }],

                buttons: [{
                    action: 'update',
                    text: 'Update',
                    formBind: true,
                    //glyph: 86,
                    iconCls: 'x-fa fa-save',
                    handler: function(btn){
                        me.fireEvent('updateclick', btn, me);
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

            }]            
        });

        me.callParent(arguments);

    }
})