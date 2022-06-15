
Ext.define('August.view.reports.inventory.AgingInterval',{
    extend: 'Ext.panel.Panel',

    requires: [
        'August.view.reports.inventory.AgingIntervalController',
        'August.view.reports.inventory.AgingIntervalModel',
        'August.plugin.grid.Exporter'
    ],

    alias: "widget.inventory-aginginterval",

    controller: 'inventory-aginginterval',
    viewModel: {
        type: 'inventory-aginginterval'
    },

    cls: "physical shadow-panel",

    title: 'Inventory Aging By Warehouse - 30 days Interval',

    margin: '0 0 0 4',

    layout: 'fit',

    listeners: {        
        actrefresh: 'onActionRefresh',
        actExport: 'onActionExport',
        gridafterrender: 'onAfterGridRender'
    },

    initComponent: function(){
        var me = this;

        me.actRefresh = Ext.create('Ext.Action', {
            text: "Refresh",
            tooltip: "Refresh report",
            ui: "default",
            //reference: 'refresh',
            iconCls: "x-fa fa-sync-alt",
            hidden: false,
            handler: function(item, e){
                me.fireEvent("actrefresh", me, item);
            },
            scope: me
        }),

        /*
        j.saveDocumentAs({
            type: 'xlsx',
            title: 'Invoice Monthly Summary by Sales Order Type',
            fileName: 'Invoice Summary ' + Ext.Date.format(new Date(), 'Y-m-d')
        });
        */

        me.actExport = Ext.create('Ext.Action', {
            
            text: "Export",
            tooltip: "Close the window",
            ui: "default",
            //reference: 'delete',
            iconCls: 'x-fa fa-external-link-alt',            
            handler: function(item, e){
                me.fireEvent('actexport', me, item);
            },
            scope: me
        }), 
        
        me.dockedItems = me.buildDockedItems();

        Ext.applyIf(me, {
            items: [{
                xtype: "grid",

                reference: "inventoryAgingGrid",
                scrollable: true,
                
                style: {
                    borderTop: '1px solid #cfcfcf',
                    borderBottom: '1px solid #cfcfcf'
                },

                bind: {
                    store: '{inventoryagings}'
                },                

                columns: me.buildGridColumns(),

                selModel: {
                    pruneRemoved: false
                },

                viewConfig: {
                    loadMask: true,
                    stripeRows: true,
                    trackOver: true,
                    preserveScrollOnRefresh: true,
                    preserveScrollOnReload: true,
                    deferInitialRefresh: true,
                    emptyText: '<h1 style="margin: 20px">No matching results</h1>',
                    getRowClass: function(a, g, f, h){
                        return "custom-row-style";
                    },
                    listeners: {
                        
                    }
                },

                plugins: [{
                    ptype: "gridfilters"
                },{
                    ptype: 'grid-exporter'
                }]
            }]
        });

        me.callParent(arguments);        

        var mnuItems = [me.actRefresh,
            {
                text: "Print",
                iconCls: "x-fa fa-print",
                action: "printlabel",
                //handler: 'onOpenLabeltagClick',
                scope: me.controller
            }];

        me.contextmenu = Ext.create("Ext.menu.Menu", {
            items: mnuItems
        });                

        var grid = me.lookupReference("inventoryAgingGrid"),
            topbar = me.lookupReference("topbar");

        me.relayEvents(grid, ["itemcontextmenu", "afterrender"], 'grid');
        me.relayEvents(topbar, ["actrefresh", "actexport"]);
    },

    buildGridColumns: function(){
        return [{
            text: "Division",
            dataIndex: "division",
            width: 120,
            hidden: false,
            locked: false,            
            renderer: function(f, e, a){
                return f;
            }
        },                
        {
            text: "Style",
            dataIndex: "style",             
            width: 160,
            hidden: false,
            locked: false,         
            filter: {type: "string"},
            renderer: function(f, e, a){
                return f;
            }
        },        
        {
            text: "Color",
            dataIndex: "color",
            width: 160,
            hidden: false,
            locked: false,  
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Description",
            dataIndex: "descript",             
            width: 220,
            hidden: false,
            locked: false,         
            filter: {type: "string"},
            renderer: function(f, e, a){
                return f;
            }
        },        
        {
            text: "Season",
            dataIndex: "season",
            width: 100,
            hidden: false,
            locked: false,  
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Grp",
            dataIndex: "grp",             
            width: 100,
            hidden: false,
            locked: false,         
            filter: {type: "string"},
            renderer: function(f, e, a){
                return f;
            }
        },        
        {
            text: "Style Type",
            dataIndex: "type",
            width: 100,
            hidden: false,
            locked: false,  
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Status",
            dataIndex: "status",             
            width: 100,
            hidden: false,
            locked: false,         
            filter: {type: "string"},
            renderer: function(f, e, a){
                return f;
            }
        },                
        {
            xtype: 'numbercolumn',
            header: "Price",
            dataIndex: "price",                                
            menuDisabled: true,
            sortable: false,  
            format: '0,000.00'            
        },
        {
            xtype: 'numbercolumn',
            header: "Cost",
            dataIndex: "cost",                              
            menuDisabled: true,
            sortable: false,  
            format: '0,000.00'            
        },
        {
            xtype: 'numbercolumn',
            header: "1-30 days",
            dataIndex: "1",
            width: 100,                     
            menuDisabled: true,
            sortable: false,  
            format: '0,000'            
        },
        {
            xtype: 'numbercolumn',
            header: "31-60 days",
            dataIndex: "2",
            width: 100,                     
            menuDisabled: true,
            sortable: false,  
            format: '0,000'            
        },
        {
            xtype: 'numbercolumn',
            header: "61-90 days",
            dataIndex: "3",
            width: 100,                     
            menuDisabled: true,
            sortable: false,  
            format: '0,000'            
        },
        {
            xtype: 'numbercolumn',
            header: "91-120 days",
            dataIndex: "4",
            width: 100,                         
            menuDisabled: true,
            sortable: false,  
            format: '0,000'            
        },
        {
            xtype: 'numbercolumn',
            header: "121-150 days",
            dataIndex: "5",
            width: 100,                          
            menuDisabled: true,
            sortable: false,  
            format: '0,000'            
        },
        {
            xtype: 'numbercolumn',
            header: "151-180 days",
            dataIndex: "6",
            width: 100,                       
            menuDisabled: true,
            sortable: false,  
            format: '0,000'            
        },
        {
            xtype: 'numbercolumn',
            header: "Over 180",
            dataIndex: "7",
            width: 100,                      
            menuDisabled: true,
            sortable: false,  
            format: '0,000'            
        },
        {
            xtype: 'numbercolumn',
            header: "Total",
            dataIndex: "total",
            width: 100,                     
            menuDisabled: true,
            sortable: false,  
            format: '0,000'            
        },
        {
            xtype: 'numbercolumn',
            header: "OTS",
            dataIndex: "ots",
            width: 100,                        
            menuDisabled: true,
            sortable: false,  
            format: '0,000'            
        },
        {
            xtype: 'numbercolumn',
            header: "Act. Cost",
            dataIndex: "actcost",
            width: 100,                       
            menuDisabled: true,
            sortable: false,  
            format: '0,000'            
        },
        {
            text: "LDP",
            dataIndex: "ldp",
            width: 100,
            hidden: false,
            locked: false,  
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Category",
            dataIndex: "category",             
            width: 140,
            hidden: false,
            locked: false,         
            filter: {type: "string"},
            renderer: function(f, e, a){
                return f;
            }
        },   
        {
            xtype: 'datecolumn',
            text: "Last Received Date",
            dataIndex: "current",
            format: 'Y-m-d',
            filter: {
                type: "date",
                format: 'Y-m-d',
                dateFormat: 'C'
            }
        },  
        {
            xtype: 'numbercolumn',
            header: "Aging",
            dataIndex: "aging",
            width: 100,                        
            menuDisabled: true,
            sortable: false,  
            format: '0,000'            
        },
        {
            xtype: 'datecolumn',
            text: "Last Received Date",
            dataIndex: "asof",
            format: 'Y-m-d',
            filter: {
                type: "date",
                format: 'Y-m-d',
                dateFormat: 'C'
            }
        },   
        {
            xtype: 'numbercolumn',
            header: "OHS",
            dataIndex: "ohs",
            width: 100,                        
            menuDisabled: true,
            sortable: false,  
            format: '0,000'            
        },           
        {
            xtype: 'numbercolumn',
            header: "ATS",
            dataIndex: "ats",
            width: 100,                  
            menuDisabled: true,
            sortable: false,  
            format: '0,000'            
        },
        {
            xtype: 'numbercolumn',
            header: "Total Cost",
            dataIndex: "totalcost",
            width: 100,                      
            menuDisabled: true,
            sortable: false,  
            format: '0,000'            
        },
        {
            xtype: 'numbercolumn',
            header: "Total Price",
            dataIndex: "totalprice",
            width: 100,           
            menuDisabled: true,
            sortable: false,  
            format: '0,000'            
        }];
    },

    buildDockedItems: function(){
        var me = this,
            config = {},
            items = [];

        config.xtype = 'toolbar';
        config.dock = 'top';
        config.reference = 'topbar';        

        items.push(
            {
                xtype: 'datefield',
                name: 'asofDate',                
                fieldLabel: 'Asof Date',
                labelWidth: 65,            
                width: 180,      
                format: 'Y-m-d'                
            },
            '-',
            {
                xtype: 'combo',   
                name: 'fromWH',        
                fieldLabel: 'From WH',                     
                labelWidth: 60,
                width: 160,
                displayField: 'label',
                valueField: 'value',                    
                //selectOnFocus: true,                
                forceSelection: false,
                matchFieldWidth: false,
                //msgTarget: 'side',
                
                minChars: 1,
                queryMode: 'local',
                //queryParam: 'filter',
                //triggerAction: 'all',
                //store: ['00', 'OS', 'SA'],
                bind: {
                    store: '{warehouses}'                    
                },
                listConfig: {
                    loadindText: 'Searching...',
                    emptyText: 'No matching items found.',
                    width: 120
                },   
                plugins: [{
                    ptype: "cleartrigger"
                }]
                
            },
            {
               
                xtype: 'combo',           
                name: 'toWH',
                fieldLabel: 'To WH',     
                labelWidth: 45,      
                width: 145,          
                displayField: 'label',
                valueField: 'value',
                           
                //selectOnFocus: true,                
                forceSelection: false,
                matchFieldWidth: false,
                //msgTarget: 'side',
                minChars: 1,
                queryMode: 'local',
                //queryParam: 'filter',
                //triggerAction: 'all',
                //store: ['00', 'OS', 'SA'],
                bind: {
                    store: '{warehouses}'                    
                },
                listConfig: {
                    loadindText: 'Searching...',
                    emptyText: 'No matching items found.',
                    width: 120
                },   
                plugins: [{
                    ptype: "cleartrigger"
                }]                                            
                
            },
            '-',
            {                                                            
                xtype: "combo",
                name: 'fromStyle',               
                fieldLabel: 'From Style',
                fieldCls: 'required',                
                labelWidth: 70,                               
                valueField: 'value',
                displayField: 'label',                
                store: 'memStyles',
                remoteStore: 'Styles',
                matchFieldWidth: false,
                autoLoadOnValue: true,
                
                //forceSelection: false,
                //selectOnFocus: true,
                //selectOnTab: false,
                pageSize: 50,
                //minChars: 1,
                queryMode: 'local',
                //queryParam: 'filter',
                //queryDelay: 800,
                //triggerAction: 'all',
                //lastQuery: '',
                listConfig: {
                    loadindText: 'Searching...',
                    emptyText: 'No matching items found.',
                    width: 335
                },
                plugins: [{
                    ptype: "cleartrigger"
                }],
                listeners: {
                    beforequery: {
                        fn: function(qe){
                            //delete qe.combo.lastQuery;
                        }
                    },                    
                    select: {
                        //fn: 'onStyleComboSelected',
                        //scope: this.controller
                    },
                    change: function(c, nv, ov){                        
                        //c.getStore().load();
                    },                     
                    triggerClear: function(c){
                        c.getStore().load();                                
                    }
                }                    
            },{
                xtype: "combo",
                name: 'toStyle',            
                fieldLabel: 'To Style',
                fieldCls: 'required',                
                labelWidth: 50,                               
                valueField: 'value',
                displayField: 'label',                
                store: 'memStyles',
                remoteStore: 'Styles',
                matchFieldWidth: false,
                autoLoadOnValue: true,
                
                //forceSelection: false,
                //selectOnFocus: true,
                //selectOnTab: false,
                pageSize: 50,
                //minChars: 1,
                queryMode: 'local',
                //queryParam: 'filter',
                //queryDelay: 800,
                //triggerAction: 'all',
                //lastQuery: '',
                listConfig: {
                    loadindText: 'Searching...',
                    emptyText: 'No matching items found.',
                    width: 335
                },
                plugins: [{
                    ptype: "cleartrigger"
                }],
                listeners: {
                    beforequery: {
                        fn: function(qe){
                            //delete qe.combo.lastQuery;
                        }
                    },                    
                    select: {
                        //fn: 'onStyleComboSelected',
                        //scope: this.controller
                    },
                    change: function(c, nv, ov){                        
                        //c.getStore().load();
                    },                     
                    triggerClear: function(c){
                        c.getStore().load();                                
                    }
                }
            }, 
            '-',                                
            me.actRefresh,                                                       
            '->',
            me.actExport,                
        );

        config.items = items;

        return config;
        
    }
});


