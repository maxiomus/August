
Ext.define('August.view.reports.invoice.StylesBySoType',{
    extend: 'Ext.panel.Panel',

    requires: [
        'August.view.reports.invoice.StylesBySoTypeController',
        'August.view.reports.invoice.StylesBySoTypeModel',
        'August.plugin.grid.Exporter'
    ],

    alias: 'widget.invoice-stylesbysotype',

    controller: 'invoice-stylesbysotype',
    viewModel: {
        type: 'invoice-stylesbysotype'
    },

    title: 'Invoice Summary by S.O Type',

    margin: '0 0 0 4',
    
    layout: 'fit',

    listeners: {        
        actrefresh: 'onActionRefresh',
        actexport: 'onActionExport',
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
            title: 'Invoice Monthly Summary',
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

        me.dockedItems = this.buildToolbar(),
        
        Ext.applyIf(me, {            
            items: [{
                xtype: "grid",
                
                reference: "invoiceStylesGrid",
                scrollable: true,                

                tbar: [{
                    xtype: 'tagfield',
                    fieldLabel: 'Order Types',
                    name: 'sotypes',
                    //store: 'memBodies',
                    //remoteStore: 'Bodies',                
                    bind: {                    
                        store: '{sotypes}'
                    },                
                    maxWidth: 960,
                    hideTrigger: true,
                    filterPickList: true,                     
                    valueField: 'value',
                    displayField: 'label',
                    //forceSelection: false,
                    //selectOnFocus: true,
                    //pageSize: 50,
                    queryMode: 'local',
                    autoLoadOnValue: true,
                    matchFieldWidth: false,                
                    plugins: [{
                        ptype: "cleartrigger"
                    }]
                }],

                style: {
                    borderTop: '1px solid #cfcfcf',
                    borderBottom: '1px solid #cfcfcf'
                },                           

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
                
                features: [{
                    ftype: 'summary',
                    showSummaryRow: true
                }
                /*
                ,{
                    ftype: 'groupingsummary',
                    startCollapsed: true,
                    hideGroupedHeader: true,
                    enableGroupingMenu: false,
                    showSummaryRow: true
                }
                */
                ],                

                plugins: [{
                    ptype: "gridfilters"
                },{
                    ptype: 'grid-exporter'
                }],

                bind: {
                    store: '{stylesbysotypes}'
                },                

                columns: me.buildGridColumns()
            }]
        });

        me.callParent(arguments);

        var mnuItems = [
            me.actRefresh,
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
        
        var grid = me.lookupReference("invoiceStylesGrid"),            
            top = me.lookupReference("topbar");                
                
        console.log(grid, top);
        
        me.relayEvents(grid, ["itemcontextmenu", "afterrender"], 'grid');
        me.relayEvents(top, ["actrefresh", "actexport"]);
        
    },

    buildGridColumns: function(){
        return [{
            text: "Style",
            dataIndex: "style",         
            width: 120,               
            filter: { type: 'string' }
            //summaryType: 'count', 
            /*
            summaryRenderer: function(v, data, index){                
                return v;//Ext.String.format("<font style='foint-weight:bold;color:blue;'>Summary: {0} division{1}", v, v !== 1 ? 's' : '');
            }
            */
        },        
        {
            text: "Color",
            dataIndex: "color",
            width: 120,            
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Trans Type",
            dataIndex: "trans_type",
            width: 80,            
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Category",
            dataIndex: "category",
            width: 100,            
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Description",
            dataIndex: "descript",
            width: 240,            
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            },            
            summaryRenderer: function(v, data, index){                
                return Ext.String.format("<font style='foint-weight:bold;color:blue;'>Grand Total: </font>");
            }
        },                      
        {
            text: "&nbsp;",
            menuDisabled: true,
            sortable: false,
            columns: [
                {
                    xtype: 'numbercolumn',
                    header: "# of Invoices",
                    dataIndex: "cnt1",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000'
                    //summaryType: 'sum'
                    //summaryRenderer: Ext.util.Format.numberRenderer('0,000')
                },                
                {
                    xtype: 'numbercolumn',
                    header: "Qty",
                    dataIndex: "qty1",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.numberRenderer('0,000')   
                },                
                {
                    xtype: 'numbercolumn',
                    header: "Amount",
                    dataIndex: "amt1",
                    width: 80,                     
                    menuDisabled: true,
                    sortable: false,  
                    formatter: 'usMoney',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.usMoney 
                }                            
            ]
        },  
        {
            text: "&nbsp;",
            menuDisabled: true,
            sortable: false,
            columns: [
                {
                    xtype: 'numbercolumn',
                    header: "# of Invoices",
                    dataIndex: "cnt2",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000'
                    //summaryType: 'sum'
                    //summaryRenderer: Ext.util.Format.numberRenderer('0,000')
                },                
                {
                    xtype: 'numbercolumn',
                    header: "Qty",
                    dataIndex: "qty2",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000'
                    //summaryType: 'sum'
                    //summaryRenderer: Ext.util.Format.numberRenderer('0,000')   
                },                
                {
                    xtype: 'numbercolumn',
                    header: "Amount",
                    dataIndex: "amt2",
                    width: 80,                     
                    menuDisabled: true,
                    sortable: false,  
                    formatter: 'usMoney',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.usMoney 
                }                            
            ]
        },
        {
            text: "&nbsp;",
            menuDisabled: true,
            sortable: false,
            columns: [
                {
                    xtype: 'numbercolumn',
                    header: "# of Invoices",
                    dataIndex: "cnt3",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000'
                    //summaryType: 'sum'
                    //summaryRenderer: Ext.util.Format.numberRenderer('0,000')
                },                
                {
                    xtype: 'numbercolumn',
                    header: "Qty",
                    dataIndex: "qty3",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000'
                    //summaryType: 'sum'
                    //summaryRenderer: Ext.util.Format.numberRenderer('0,000')   
                },                
                {
                    xtype: 'numbercolumn',
                    header: "Amount",
                    dataIndex: "amt3",
                    width: 80,                     
                    menuDisabled: true,
                    sortable: false,  
                    formatter: 'usMoney',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.usMoney      
                }                            
            ]
        },
        {
            text: "&nbsp;",
            menuDisabled: true,
            sortable: false,
            columns: [
                {
                    xtype: 'numbercolumn',
                    header: "# of Invoices",
                    dataIndex: "cnt4",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000'
                    //summaryType: 'sum'
                    //summaryRenderer: Ext.util.Format.numberRenderer('0,000')
                },                
                {
                    xtype: 'numbercolumn',
                    header: "Qty",
                    dataIndex: "qty4",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000'
                    //summaryType: 'sum'
                    //summaryRenderer: Ext.util.Format.numberRenderer('0,000')   
                },                
                {
                    xtype: 'numbercolumn',
                    header: "Amount",
                    dataIndex: "amt4",
                    width: 80,                     
                    menuDisabled: true,
                    sortable: false,  
                    formatter: 'usMoney',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.usMoney       
                }                            
            ]
        },
        {
            text: "&nbsp;",
            menuDisabled: true,
            sortable: false,
            columns: [
                {
                    xtype: 'numbercolumn',
                    header: "# of Invoices",
                    dataIndex: "cnt5",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000'
                    //summaryType: 'sum'
                    //summaryRenderer: Ext.util.Format.numberRenderer('0,000')
                },                
                {
                    xtype: 'numbercolumn',
                    header: "Qty",
                    dataIndex: "qty5",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000'
                    //summaryType: 'sum'
                    //summaryRenderer: Ext.util.Format.numberRenderer('0,000')   
                },                
                {
                    xtype: 'numbercolumn',
                    header: "Amount",
                    dataIndex: "amt5",
                    width: 80,                     
                    menuDisabled: true,
                    sortable: false,  
                    formatter: 'usMoney',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.usMoney       
                }                            
            ]
        },
        {
            text: "&nbsp;",
            menuDisabled: true,
            sortable: false,
            columns: [
                {
                    xtype: 'numbercolumn',
                    header: "# of Invoices",
                    dataIndex: "cnt6",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000'
                    //summaryType: 'sum'
                    //summaryRenderer: Ext.util.Format.numberRenderer('0,000')
                },                
                {
                    xtype: 'numbercolumn',
                    header: "Qty",
                    dataIndex: "qty6",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000'
                    //summaryType: 'sum'
                    //summaryRenderer: Ext.util.Format.numberRenderer('0,000')   
                },                
                {
                    xtype: 'numbercolumn',
                    header: "Amount",
                    dataIndex: "amt6",
                    width: 80,                     
                    menuDisabled: true,
                    sortable: false,  
                    formatter: 'usMoney',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.usMoney        
                }                            
            ]
        },
        {
            text: "&nbsp;",
            menuDisabled: true,
            sortable: false,
            columns: [
                {
                    xtype: 'numbercolumn',
                    header: "# of Invoices",
                    dataIndex: "cnt7",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000'
                    //summaryType: 'sum'
                    //summaryRenderer: Ext.util.Format.numberRenderer('0,000')
                },                
                {
                    xtype: 'numbercolumn',
                    header: "Qty",
                    dataIndex: "qty7",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000'
                    //summaryType: 'sum'
                    //summaryRenderer: Ext.util.Format.numberRenderer('0,000')   
                },                
                {
                    xtype: 'numbercolumn',
                    header: "Amount",
                    dataIndex: "amt7",
                    width: 80,                     
                    menuDisabled: true,
                    sortable: false,  
                    formatter: 'usMoney',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.usMoney      
                }                            
            ]
        },
        {
            text: "Total",
            menuDisabled: true,
            sortable: false,
            columns: [
                {
                    xtype: 'numbercolumn',
                    header: "# of Invoices",
                    dataIndex: "cnt8",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000',
                    summaryType: 'sum'
                    //summaryRenderer: Ext.util.Format.numberRenderer('0,000')
                },                
                {
                    xtype: 'numbercolumn',
                    header: "Qty",
                    dataIndex: "qty8",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.numberRenderer('0,000')   
                },                
                {
                    xtype: 'numbercolumn',
                    header: "Amount",
                    dataIndex: "amt8",
                    width: 80,                     
                    menuDisabled: true,
                    sortable: false,  
                    formatter: 'usMoney',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.usMoney       
                }                            
            ]
        },    
        {
            text: "Division",
            dataIndex: "division",         
            width: 80,   
            hidden: false,
            locked: false,      
            filter: { type: 'string' },      
            summaryType: 'count',
        },   
        {
            xtype: 'numbercolumn',
            header: 'ATS',
            dataIndex: "ats",
            width: 80,
            menuDisabled: true,
            sortable: false,  
            format: '0,000',
            summaryType: 'sum'      
            //summaryRenderer: Ext.util.Format.numberRenderer('0,000')   
        },    
        {
            xtype: 'numbercolumn',
            header: "WIP",
            dataIndex: "wip",
            width: 80,                     
            menuDisabled: true,
            sortable: false,  
            format: '0,000',            
            summaryType: 'sum'
            //summaryRenderer: Ext.util.Format.usMoney
        },        
        {
            xtype: 'datecolumn',
            header: "Available Date",
            dataIndex: "availableDate",
            width: 120,                     
            menuDisabled: true,
            sortable: false,  
            format: 'Y-m-d'                        
        }];
    },

    /**
     * Create the top toolbar
     * @private
     * @returns {Ext.toolbar.Toolbar}
     */
    buildToolbar: function(){
        var me = this,
            config = {},
            items = [];

        config.xtype = 'toolbar';
        config.dock = 'top';
        config.reference = 'topbar';        

        items.push(
            {
                xtype: 'datefield',
                name: 'fromDate',                        
                width: 180,
                labelWidth: 65,
                format: 'Y-m-d',                
                fieldLabel: 'From Date',
                value: Ext.Date.getFirstDateOfMonth(new Date())
            },{
                xtype: 'datefield',
                name: 'toDate',    
                width: 170,    
                labelWidth: 55,                
                format: 'Y-m-d',
                fieldLabel: 'To Date',
                value: Ext.Date.getLastDateOfMonth(new Date())
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
