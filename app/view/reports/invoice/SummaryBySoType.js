
Ext.define('August.view.reports.invoice.SummaryBySoType',{
    extend: 'Ext.panel.Panel',

    requires: [
        'August.view.reports.invoice.SummaryBySoTypeController',
        'August.view.reports.invoice.SummaryBySoTypeModel',
        'August.plugin.grid.Exporter'
    ],

    alias: "widget.invoice-summarybysotype",

    controller: 'invoice-summarybysotype',
    viewModel: {
        type: 'invoice-summarybysotype'
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
                
                reference: "invoiceSummaryGrid",
                scrollable: true,                

                style: {
                    borderTop: '1px solid #cfcfcf',
                    borderBottom: '1px solid #cfcfcf'
                },

                tbar: [{
                    iconCls: 'x-fa fa-minus',                        
                    tooltip: 'Expand all groups',
                    bind: {
                        hidden: '{!groupBy}'
                    },
                    listeners: {
                        click: 'onExpandAll',
                        scope: this.controller
                    }                        
                },{
                    iconCls: 'x-fa fa-plus',                        
                    tooltip: 'Collapse all groups',
                    bind: {
                        hidden: '{!groupBy}'
                    },
                    listeners: {
                        click: 'onCollapseAll',
                        scope: this.controller
                    }
                },'->', {
                    text: 'Toggle groups...',
                    reference: 'groupsBtn',
            
                    bind: {
                        disabled: '{!groupBy}'
                    },
                    destroyMenu: true,
                    menu: {
                        hideOnScroll: false,
                        items: []
                    }
                }],                

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
                        groupcollapse: {
                            fn: 'onGroupCollapse',
                            scope: this.controller
                        },
                        groupexpand: {
                            fn: 'onGroupExpand',
                            scope: this.controller
                        }
                    }
                },

                features: [{
                    ftype: 'groupingsummary',
                    startCollapsed: true,
                    hideGroupedHeader: true,
                    enableGroupingMenu: false,
                    showSummaryRow: true
                },{
                    ftype: 'summary'
                }],

                plugins: [{
                    ptype: "gridfilters"
                },{
                    ptype: 'grid-exporter'
                }],

                bind: {
                    store: '{invoicesummaries}'
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
        
        var grid = me.lookupReference("invoiceSummaryGrid"),            
            top = me.lookupReference("topbar");                
                
        console.log(grid, top);
        
        me.relayEvents(grid, ["itemcontextmenu", "afterrender"], 'grid');
        me.relayEvents(top, ["actrefresh", "actexport"]);
        
    },

    buildGridColumns: function(){
        return [{
            text: "Division",
            dataIndex: "division",         
            width: 150,   
            hidden: false,
            locked: false,      
            filter: { type: 'string' },      
            summaryType: 'count',            
            summaryRenderer: function(v, data, index){                
                return Ext.String.format("<font style='foint-weight:bold;color:blue;'>Summary: {0} division{1}", v, v !== 1 ? 's' : '');
            }
        },        
        {
            text: "S.O Type",
            dataIndex: "sotype",
            width: 100,
            hidden: true,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Month",
            menuDisabled: true,
            sortable: false,
            columns: [
                {
                    xtype: 'numbercolumn',
                    header: "Jan",
                    dataIndex: "C1",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.numberRenderer('0,000')
                },
                /*
                {
                    xtype: 'numbercolumn',
                    header: "%",
                    dataIndex: "P1",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.numberRenderer('0,000')
                },
                */
                {
                    xtype: 'numbercolumn',
                    header: "Feb",
                    dataIndex: "C2",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.numberRenderer('0,000')   
                },
                /*
                {
                    xtype: 'numbercolumn',
                    header: "%",
                    dataIndex: "P2",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.numberRenderer('0,000')   
                },
                */
                {
                    xtype: 'numbercolumn',
                    header: "Mar",
                    dataIndex: "C3",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.numberRenderer('0,000')       
                },
                /*
                {
                    xtype: 'numbercolumn',
                    header: "%",
                    dataIndex: "P3",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.numberRenderer('0,000')       
                },
                */
                {
                    xtype: 'numbercolumn',
                    header: "Apr",
                    dataIndex: "C4",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.numberRenderer('0,000')        
                },
                /*
                {
                    xtype: 'numbercolumn',
                    header: "%",
                    dataIndex: "P4",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.numberRenderer('0,000')        
                },
                */
                {
                    xtype: 'numbercolumn',
                    header: "May",
                    dataIndex: "C5",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.numberRenderer('0,000')           
                },
                /*
                {
                    xtype: 'numbercolumn',
                    header: "%",
                    dataIndex: "P5",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.numberRenderer('0,000')           
                },
                */
                {
                    xtype: 'numbercolumn',
                    header: "Jun",
                    dataIndex: "C6",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.numberRenderer('0,000')        
                },
                /*
                {
                    xtype: 'numbercolumn',
                    header: "%",
                    dataIndex: "P6",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.numberRenderer('0,000')        
                },
                */
                {
                    xtype: 'numbercolumn',
                    header: "Jul",
                    dataIndex: "C7",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.numberRenderer('0,000')      
                },
                /*
                {
                    xtype: 'numbercolumn',
                    header: "%",
                    dataIndex: "P7",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.numberRenderer('0,000')      
                },
                */
                {
                    xtype: 'numbercolumn',
                    header: "Aug",
                    dataIndex: "C8",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.numberRenderer('0,000')        
                },
                /*
                {
                    xtype: 'numbercolumn',
                    header: "%",
                    dataIndex: "P8",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.numberRenderer('0,000')        
                },
                */
                {
                    xtype: 'numbercolumn',
                    header: "Sep",
                    dataIndex: "C9",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.numberRenderer('0,000')      
                },
                /*
                {
                    xtype: 'numbercolumn',
                    header: "%",
                    dataIndex: "P9",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.numberRenderer('0,000')      
                },
                */
                {
                    xtype: 'numbercolumn',
                    header: "Oct",
                    dataIndex: "C10",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.numberRenderer('0,000')         
                },
                /*
                {
                    xtype: 'numbercolumn',
                    header: "%",
                    dataIndex: "P10",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.numberRenderer('0,000')         
                },
                */
                {
                    xtype: 'numbercolumn',
                    header: "Nov",
                    dataIndex: "C11",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.numberRenderer('0,000')         
                },
                /*
                {
                    xtype: 'numbercolumn',
                    header: "%",
                    dataIndex: "P11",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.numberRenderer('0,000')         
                },
                */
                {
                    xtype: 'numbercolumn',
                    header: "Dec",
                    dataIndex: "C12",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.numberRenderer('0,000')     
                }
                /*
                {
                    xtype: 'numbercolumn',
                    header: "%",
                    dataIndex: "P12",
                    width: 60,                     
                    menuDisabled: true,
                    sortable: false,  
                    format: '0,000',
                    summaryType: 'sum',
                    summaryRenderer: Ext.util.Format.numberRenderer('0,000')     
                }
                */              
            ]
        },       
        {
            xtype: 'numbercolumn',
            header: 'Total Qty',
            dataIndex: "totalQty",
            width: 80,
            menuDisabled: true,
            sortable: false,  
            format: '0,000',
            summaryType: 'sum',
            renderer: function (v, meta, rec, rowIdx, colIdx, store, view) {
                var total = rec.get('C1') + rec.get('C2') + rec.get('C3') + rec.get('C4')+ rec.get('C5') + rec.get('C6')+ rec.get('C7') + rec.get('C8')+ rec.get('C9') + rec.get('C10') + rec.get('C11') + rec.get('C12');
                return Ext.util.Format.number(v, '0,000');
            },
            summaryType: function (records, values) {
                var i = 0,
                    length = records.length,
                    total = 0,
                    rec;

                for (; i < length; ++i) {
                    rec = records[i];
                    total += rec.get('C1') + rec.get('C2') + rec.get('C3') + rec.get('C4')+ rec.get('C5') + rec.get('C6')+ rec.get('C7') + rec.get('C8')+ rec.get('C9') + rec.get('C10') + rec.get('C11') + rec.get('C12');;
                }

                return total;
            },
            summaryRenderer: Ext.util.Format.numberRenderer('0,000')   
        },    
        {
            xtype: 'numbercolumn',
            header: "Total Amount",
            dataIndex: "total",
            width: 110,                     
            menuDisabled: true,
            sortable: false,  
            //format: '0,000.00',
            formatter: 'usMoney',
            summaryType: 'sum',
            summaryRenderer: Ext.util.Format.usMoney
        },
        {
            xtype: 'numbercolumn',
            header: "Sub Total",
            dataIndex: "subtotal",
            width: 100,                     
            menuDisabled: true,
            sortable: false,  
            //format: '0,000.00'
            formatter: 'usMoney',
            summaryType: 'sum',
            summaryRenderer: Ext.util.Format.usMoney                 
        },
        {
            xtype: 'numbercolumn',
            header: "Percentage",
            dataIndex: "percentage",
            width: 100,                     
            menuDisabled: true,
            sortable: false,  
            format: '0,000.00%',            
            summaryType: 'sum',
            renderer: function (v, meta, rec, rowIdx, colIdx, store, view) {
                return Ext.String.format('{0}%', Ext.Number.roundToPrecision(v, 2));
            },
            summaryRenderer: function(v, data, idx){
                return Ext.String.format('{0}%', parseFloat(v).toFixed(2));
            }
            /*
            summaryType: function (records, values) {
                var i = 0,
                    length = records.length,
                    total = 0,
                    rec;

                for (; i < length; ++i) {
                    rec = records[i];
                    total += 
                }

                return total;
            }
            */

        },
        {
            xtype: 'numbercolumn',
            header: "# of Invoice",
            dataIndex: "number_invoice",
            width: 100,                     
            menuDisabled: true,
            sortable: false,  
            format: '0,000'  ,
            summaryType: 'sum'          
        },
        {
            xtype: 'numbercolumn',
            header: "Average Inv Amt",
            dataIndex: "avgInvAmt",
            width: 140,                     
            menuDisabled: true,
            sortable: false,  
            //format: '0,000.00'            
            formatter: 'usMoney' ,
            summaryType: function(records, values){
                var i = 0,
                    length = records.length,
                    totalnum = 0,
                    totalamt = 0,
                    rec;

                for (; i < length; ++i) {
                    rec = records[i];
                    totalnum += rec.get('number_invoice');
                    totalamt += rec.get('subtotal');
                }

                return totalnum != 0 ? totalamt / totalnum : 0;
            },
            summaryRenderer: Ext.util.Format.usMoney
        },
        {
            xtype: 'numbercolumn',
            header: "Original SO Qty",
            dataIndex: "soqty",
            width: 120,                     
            menuDisabled: true,
            sortable: false,  
            format: '0,000',
            summaryType: 'sum',
            summaryRenderer: Ext.util.Format.numberRenderer('0,000')            
        },
        {
            xtype: 'numbercolumn',
            header: "Original SO Amt",
            dataIndex: "soamt",
            width: 125,                     
            menuDisabled: true,
            sortable: false,  
            formatter: 'usMoney',
            //format: '0,000.00',  
            summaryType: 'sum',
            summaryRenderer: Ext.util.Format.usMoney
        },
        {
            xtype: 'numbercolumn',
            header: "Invoice Qty",
            dataIndex: "invqty",
            width: 100,                     
            menuDisabled: true,
            sortable: false,  
            format: '0,000',
            summaryType: 'sum',
            summaryRenderer: Ext.util.Format.numberRenderer('0,000')          
        },
        {
            xtype: 'numbercolumn',
            header: "Invoice Amt",
            dataIndex: "invamt",
            width: 100,                     
            menuDisabled: true,
            sortable: false,  
            //format: '0,000.00'            
            formatter: 'usMoney',
            summaryType: 'sum',
            summaryRenderer: Ext.util.Format.usMoney
        },
        {
            xtype: 'numbercolumn',
            header: "Inv %",
            dataIndex: "invPercent",
            width: 100,                     
            menuDisabled: true,
            sortable: false,  
            format: '0,000.00%',
            summaryType: function(records, values){
                var i = 0,
                    length = records.length,
                    totalso = 0,
                    totalinv = 0,
                    avg = 0,
                    rec;

                for (; i < length; ++i) {
                    rec = records[i];
                    totalso += rec.get('soamt');
                    totalinv += rec.get('invamt');
                }

                avg = totalso != 0 ? (totalinv / totalso) * 100 : 0;
                return Ext.String.format('{0}%', Ext.Number.roundToPrecision(avg, 2));;
            }         
        },
        {
            xtype: 'numbercolumn',
            header: "Freight Amt",
            dataIndex: "invfreight",
            width: 100,                     
            menuDisabled: true,
            sortable: false,  
            //format: '0,000.00'            
            formatter: 'usMoney',
            summaryType: 'sum',
            summaryRenderer: Ext.util.Format.usMoney   
        },
        {
            xtype: 'numbercolumn',
            header: "Total",
            dataIndex: "invTotal",
            width: 120,                     
            menuDisabled: true,
            sortable: false,  
            //format: '0,000.00'            
            formatter: 'usMoney',
            summaryType: 'sum',
            summaryRenderer: Ext.util.Format.usMoney
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

