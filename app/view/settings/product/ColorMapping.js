
Ext.define('August.view.settings.product.ColorMapping',{
    extend: 'Ext.tab.Panel',

    requires: [
        //'August.view.settings.product.ColorController',
        //'August.view.settings.product.ColorModel',
        'August.model.ColorMapping'
    ],

    alias: 'widget.product-colormapping',

    controller: 'product-colormapping',
    viewModel: 'product-colormapping',

    session: true,

    listeners: {
        //render: 'onRender',             
    },

    initComponent: function(c){
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'settings-grid',
                //reference: 'grid',
                title: 'Color Mapping',
                iconCls: 'x-fa fa-map-signs',
                bind: {
                    store: '{colormappings}'
                },

                columns: me.buildColumns()
            }]
        });

        me.callParent(arguments);    
        
        var topbar = me.down('settings-topbar'),
            grid = me.down('settings-grid');

        topbar.insert(0, {
            xtype: "searchgrid",
            reference: 'searchgrid',
            width: 300,
            grid: grid,
            paramName: "color"
        });

        topbar.insert(8, 
            ['->', 
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-upload',
                    text: 'Upload',
                    tooltip: 'Upload Color Mapping Templates',
                    action: 'upload',
                    handler: 'onUploadClick',
                    scope: me.controller
                }
            ]
        );
    },

    buildColumns: function(){
        return [{
            text: "N41 Color",
            dataIndex: "color",
            width: 160,
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: "combo",
                name: 'color',
                reference: 'color',
                //fieldLabel: 'Color',
                //fieldStyle: 'text-transform:uppercase',
                fieldCls: 'required',                                
                //hideTrigger: false,
                //publishes: 'value',
                valueField: 'value',
                displayField: 'label',                
                store: 'memColors',
                remoteStore: 'Colors',
                matchFieldWidth: false,
                autoLoadOnValue: true,
                allowBlank: false,
                //forceSelection: true,
                selectOnFocus: true,
                pageSize: 50,
                minChars: 1,
                queryMode: 'local',
                //queryParam: 'filter',
                //queryDelay: 800,
                //triggerAction: 'all',
                lastQuery: '',
                listConfig: {
                    loadindText: 'Searching...',
                    emptyText: 'No matching items found.',
                    width: 340
                },
                plugins: [{
                    ptype: "cleartrigger"
                }],
                listeners: {
                    beforequery: {
                        fn: function(qe){
                            delete qe.combo.lastQuery;
                        }
                    },
                    change: function(c){
                        c.getStore().load();
                    },                     
                    triggerClear: function(c){
                        c.getStore().load();                                
                    }
                }
            }
        },
        {
            text: "Market Place",
            dataIndex: "customer",
            width: 160,            
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'combo',                                
                displayField: 'label',
                valueField: 'value',  
                fieldCls: 'required',                   
                //selectOnFocus: true,                
                forceSelection: false,
                //matchFieldWidth: true,
                //msgTarget: 'side',
                minChars: 1,
                queryMode: 'local',
                //queryParam: 'filter',
                //triggerAction: 'all',
                //store: ['00', 'OS', 'SA'],
                bind: {
                    store: '{colorCustomers}'                    
                },                        
                plugins: [{
                    ptype: "cleartrigger"
                }]
            }
        },
        {
            text: "Market Color",
            dataIndex: "customerColor",
            width: 160,
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'combo',                                
                displayField: 'label',
                valueField: 'value',  
                fieldCls: 'required',                   
                //selectOnFocus: true,                
                forceSelection: false,
                //matchFieldWidth: true,
                //msgTarget: 'side',
                minChars: 1,
                queryMode: 'local',
                //queryParam: 'filter',
                //triggerAction: 'all',
                //store: ['00', 'OS', 'SA'],
                bind: {
                    store: '{belkColors}'                    
                },                        
                plugins: [{
                    ptype: "cleartrigger"
                }]
            }
        }];
    }
});
    