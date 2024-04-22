
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
                        value: 'https://jirho.com/web-images/{source}'
                    }
                },                
                {
                    xtype: 'grid',
                    anchor: '100% 85%',                    
                    bind: {
                        store: '{options}'
                    },
                    columns: [
                        /*
                        { header: 'Variant Color', dataIndex: 'color', width: 200 },
                        { header: 'Uploaded Photos #', dataIndex: 'uploaded', flex: 1 },
                        { 
                            header: 'Adding Photos #', dataIndex: 'addition', flex: 1,
                            editor: {                                
                                field: {
                                    xtype: 'tagfield',
                                    name: 'extnum',                                    
                                    hideTrigger: false,
                                    valueField: 'name',
                                    displayField: 'name',
                                    bind: {
                                        store: '{extensions}'
                                    },
                                    queryMode: 'local',
                                    //forceSelection: false,
                                    //selectOnFocus: true,
                                    //pageSize: 50,                                                                      
                                    filterPickList: true,                                    
                                    matchFieldWidth: true,
                                    plugins: [{
                                        ptype: "cleartrigger"
                                    }]                                
                                }
                            }                            
                        }
                        */
                        { header: 'Src', dataIndex: 'src', flex: 1 },
                        { header: 'Position', dataIndex: 'position', width: 80,
                            editor: {                                
                                field: {
                                    xtype: 'textfield'
                                }
                            }
                        },
                        { header: 'Alt', dataIndex: 'alt', width: 200 }
                    ],
                    plugins: {
                        cellediting: {
                            clicksToEdit: 1
                        }
                    }
                }                
                ],

                buttons: [{
                    action: 'upload',
                    text: 'Upload',
                    formBind: true,
                    //glyph: 86,
                    iconCls: 'x-fa fa-save',
                    handler: function(btn){
                        me.fireEvent('uploadclick', btn, me);
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