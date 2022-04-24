/**
 * Created by tech on 2/10/2022.
 */
 Ext.define('August.view.sales.windows.po.Generate',{
    extend: 'Ext.window.Window',

    requires: [
        'August.view.sales.windows.po.GenerateController',
        'August.view.sales.windows.po.GenerateModel',
        //'August.model.shopify.shopifyTemplate',
        //'August.model.shopify.lordTaylorTemplate',
        'August.plugin.grid.Exporter'
    ],

    alias: 'widget.windows-po-generate',

    controller: 'windows-po-generate',
    viewModel: {
        type: 'windows-po-generate'
    },

    layout: {
        type: 'fit'
    },

    header: {
        title: 'PO Generate',
        iconCls: 'x-fa fa-code',
        titlePosition: 0,
        titleAlign: 'left'
    },

    padding: '10 0 10 0',

    bind: {
        //title: '{title}'
    },

    session: true,
    //minWidth: 720,
    minHeight: 480,
    maximized: true,

    //modal: true,
    monitorResize: true,
    maximizable: true,
    //constrain: true,
    closable: true,    

    tools: [{
        type: 'pin'
    }],        
   
    initComponent: function() {
        var me = this;

        //me.columns = me.buildColumns();
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

        me.dockedItems = [{
            xtype: 'toolbar',            
            dock: 'top',
            name: 'search',            
            items: [{
                xtype: 'combo',
                name: 'category',
                width: 112,
                hideLabel: true,
                valueField: "value",
                displayField: "label",
                value: "style",
                editable: false,
                reference: "filterSelection",
                bind: {
                    store: "{categories}"
                },
                queryMode: 'local',
                listeners: {
                    change: {
                        fn: "onFilterItemChange",
                        scope: this.controller
                    }
                }
            },            
            {
                xtype: "searchtextlist",
                reference: 'searchlist',
                width: 480,              
                bind: {                    
                    store: '{orderdetails}'
                },                  
                paramName: "style",
                listeners: {
                    hide: function(c){                        
                    }
                }
            },                         
            '-',
            /*{ xtype: 'tbspacer', width: 0 },*/
            {
                xtype: 'button',
                text: 'Reset',
                action: 'reset',
                iconCls: 'x-fa fa-sync-alt',
                handler: function(btn) {
                    me.fireEvent('resetclick', btn, me);
                }
            },            
            '->',                        
            {
                xtype: 'button',
                text: 'Save',
                action: 'save',
                disabled: true,
                iconCls: 'x-fas fa-save',                            
                handler: function(btn) {
                    me.fireEvent('saveclick', btn, me);
                }
            },
            {
                xtype: 'button',
                text: 'Close',
                action: 'close',
                iconCls: 'x-far fa-times-circle',
                handler: function(btn) {
                    me.close();
                }
            }]
        },{
            xtype: 'toolbar',
            name: 'filter',
            plugins: {
                boxreorderer: true
            },
            items: [{
                xtype: 'fieldset',
                title: 'Cancel Date',                  
                layout: 'anchor',
                defaultType: 'datefield',
                defaults: {                    
                    anchor: '100%',
                    labelWidth: 40
                },            
                items: [{
                    xtype: 'datefield',                    
                    fieldLabel: 'From',                                                               
                    name: 'fromDate',
                    dateFormat: 'C',
                    maxValue: new Date(),
                    value: Ext.Date.subtract(new Date(), Ext.Date.YEAR, 1)  // limited to the current date or prior
                }, {
                    xtype: 'datefield',                    
                    fieldLabel: 'To',                                              
                    name: 'toDate',
                    dateFormat: 'C',
                    minValue: new Date(),
                    value: Ext.Date.add(new Date(), Ext.Date.YEAR, 1)  // defaults to today
                }]
            },
            {
                xtype: 'fieldset',
                layout: 'anchor',
                width: 300,
                bind: {
                    title: 'Group by {groupBy} for PO'
                },
                defaults: {                    
                    anchor: '100%'
                },
                items: [
                    {
                        xtype: 'radiogroup',
                        //fieldLabel: 'Group by {name} for PO',                        
                        name: 'rb-groupby',
                        simpleValue: true, // set simpleValue to true to enable value binding
                        cls: 'x-check-group-alt',
                        bind: '{groupBy}',                        
                        items: [
                            { boxLabel: 'Style', name: 'rb', inputValue: 'style' },                    
                            { boxLabel: 'SO', name: 'rb', inputValue: 'so' },
                            { boxLabel: 'Vendor', name: 'rb', inputValue: 'vendor', checked: true },
                            { boxLabel: 'None', name: 'rb', inputValue: 'none' }
                        ],
                        listeners: {
                            change: function(rb, nv, ov){                                
                                me.fireEvent('resetclick', rb, me);
                            }
                        }
                    },
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: '',
                        defaultType: 'checkbox',
                        layout: {
                            type: 'hbox'
                        },
                        defaults: {
                            
                        },                        
                        items: [
                            { 
                                boxLabel: 'Merge Qty by Style/Color', 
                                name: 'cb-merge', 
                                inputValue: 'merge',                                 
                                flex: 2,
                                checked: true,
                                handler: function(cb, chk){                                    
                                    var cbWH = cb.nextSibling();                                    
                                    cbWH.setDisabled(!chk);
                                    if(!chk){
                                        cbWH.setValue(false);
                                    }
                                }
                            },                                 
                            { boxLabel: 'WH', name: 'cb-wh', inputValue: 'wh', disabled: false, flex: 1 },
                        ]
                    }
                ]
                
            }]
        }],

        Ext.applyIf(me, {            
            items: [{
                xtype: 'container',

                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                //border: false,
                //bodyPadding: 5,
                bodyStyle: {
                    //background: '#f4f4f4'
                },                

                items: [{
                    xtype: "grid",
                    reference: "orderItemsGrid",
                    scrollable: true,

                    flex: 3,

                    style: {
                        borderTop: '1px solid #cfcfcf',
                        //borderBottom: '1px solid #cfcfcf'
                    },  

                    //title: 'SO List',

                    bind: {                        
                        store: "{orderdetails}"
                    },

                    columns: [{
                        header: "Style",
                        dataIndex: "style",
                        width: 140,
                        /*
                        locked: false,
                        filter: {
                            operator: 'st',
                            type: "string"
                        },
                        */
                        renderer: function(f, e, a){
                            return f;
                        }
                    },
                    {
                        header: "Color",
                        dataIndex: "color",
                        width: 140,
                        filter: {                            
                            type: 'list'
                        },
                        renderer: function(f, e, a){
                            return f;
                        }
                    },
                    {
                        header: "Description",
                        dataIndex: "descript",
                        width: 240,
                        hidden: false,
                        filter: {
                            operator: 'st',
                            type: "string"
                        },
                        renderer: function(f, e, a){
                            return f;
                        }
                    },            
                    {
                        xtype: 'numbercolumn',
                        header: "SO Qty",
                        dataIndex: "total",
                        width: 80,           
                        format: '0,000',                         
                        renderer: function(f, e, a){
                            return f;
                        }
                    },
                    {
                        xtype: 'numbercolumn',
                        header: "SO #",
                        dataIndex: "orderNO",
                        width: 80,           
                        format: '0,000',                         
                        renderer: function(f, e, a){
                            return f;
                        }
                    },                    
                    {
                        header: "Customer",
                        dataIndex: "customer",
                        width: 140,
                        hidden: false,
                        filter: {
                            operator: 'st',
                            type: "string"
                        },
                        renderer: function(f, e, a){
                            return f;
                        }
                    },
                    {
                        header: "Customer PO #",
                        dataIndex: "custpo",
                        hidden: false,
                        filter: {
                            operator: 'st',
                            type: "string"
                        },
                        renderer: function(f, e, a){
                            return f;
                        }
                    },
                    {
                        header: "Division",
                        dataIndex: "division",
                        hidden: false,
                        filter: {
                            operator: 'in',
                            type: "list"
                        },
                        renderer: function(f, e, a){
                            return f;
                        }
                    },
                    {
                        header: "Season",
                        dataIndex: "season",                
                        hidden: false,
                        filter: {
                            operator: 'st',
                            type: "string"
                        },
                        renderer: function(f, e, a){
                            return f;
                        }
                    },
                    
                    {
                        header: "Status",
                        dataIndex: "status",                
                        hidden: false,
                        filter: {
                            operator: 'st',
                            type: "string"
                        },
                        renderer: function(f, e, a){
                            return f;
                        }
                    },
                    {
                        xtype: 'datecolumn',
                        text: "Order Date",
                        dataIndex: "orderDate",
                        format: 'Y-m-d',
                        filter: {
                            type: "date",
                            dateFormat: 'C'
                        }
                    },
                    {
                        xtype: 'datecolumn',
                        text: "Cancel Date",
                        dataIndex: "cancelDate",
                        format: 'Y-m-d',
                        filter: {
                            type: "date",
                            dateFormat: 'C'
                        }
                    },
                    {
                        xtype: 'datecolumn',
                        text: "Ship Date",
                        dataIndex: "shipdate",
                        format: 'Y-m-d',
                        filter: {
                            type: "date",
                            dateFormat: 'C'
                        }
                    },
                    {
                        header: "SO Type",
                        dataIndex: "ordertype",                        
                        hidden: false,
                        filter: {
                            operator: 'st',
                            type: "string"
                        },
                        renderer: function(f, e, a){
                            return f;
                        }
                    },
                    {
                        xtype: 'numbercolumn',
                        header: "Ext. Price",
                        dataIndex: "extPrice",                        
                        hidden: false,                        
                        renderer: Ext.util.Format.usMoney
                    },
                    {
                        header: "WH",
                        dataIndex: "wh",
                        width: 80,
                        hidden: false,
                        filter: {
                            operator: 'st',
                            type: "string"
                        },
                        renderer: function(f, e, a){
                            return f;
                        }
                    },
                    {
                        header: "Category",
                        dataIndex: "category",
                        width: 140,
                        hidden: false,
                        filter: {
                            operator: 'st',
                            type: "string"
                        },
                        renderer: function(f, e, a){
                            return f;
                        }
                    },
                    {
                        header: "Size Cat.",
                        dataIndex: "sizeCat",
                        hidden: true,
                        filter: {
                            operator: 'st',
                            type: "string"
                        },
                        renderer: function(f, e, a){
                            return f;
                        }
                    },
                    {
                        xtype: 'numbercolumn',
                        header: "On Hand",
                        dataIndex: "ohs",                
                        hidden: false,
                        format: '0,000',
                        filter: {
                            type: 'number'
                        }                        
                    },
                    {
                        xtype: 'numbercolumn',
                        header: "On Order",
                        dataIndex: "orders",                
                        hidden: false,
                        format: '0,000',
                        filter: {
                            type: 'number'
                        },
                        renderer: function(f, e, a){
                            return f;
                        }
                    },{
                        header: "Cust. Name",
                        dataIndex: "customerName",
                        width: 140,
                        hidden: false,
                        filter: {
                            operator: 'st',
                            type: "string"
                        },
                        renderer: function(f, e, a){
                            return f;
                        }
                    },{
                        header: "Cust. Type",
                        dataIndex: "customerType",
                        hidden: false,
                        filter: {
                            operator: 'st',
                            type: "string"
                        },
                        renderer: function(f, e, a){
                            return f;
                        }
                    },{
                        header: "Store",
                        dataIndex: "store",
                        hidden: false,
                        filter: {
                            operator: 'st',
                            type: "string"
                        },
                        renderer: function(f, e, a){
                            return f;
                        }
                    }],  
                
                    cls: "orderitems-grid",

                    stateful: true,

                    stateId: "orderitems-grid",
                    //stateEvents: ["columnmove","columnresize","columnshow","columnhide"],
                    //loadMask: true,
                    //columnLines: true,
                    multiColumnSort: true,
                    // We do not need automatic height synching.
                    syncRowHeight: false,

                    selModel: {
                        type: 'checkboxmodel',
                        mode: 'MULTI',
                        pruneRemoved: false
                    },
                    
                    viewConfig: {
                        //loadingHeight: 400,
                        stripeRows: true,
                        trackOver: true,
                        preserveScrollOnRefresh:true,
                        //deferInitialRefresh:true,
                        //trailingBufferZone: 20,
                        //leadingBufferZone: 40,

                        emptyText: '<h1 style="margin:20px">No matching results</h1>'
                        
                    },
                    plugins: [{
                        ptype: "gridfilters"
                    }],

                    listeners: {
                        render: {
                            //fn: 'onGridRender',
                            //scope: this.controller
                        },
                        select: {
                            fn: 'onSelect',
                            scope: this.controller
                        },
                        deselect: {
                            fn: 'onDeselect',
                            scope: this.controller
                        }
                    },

                    bbar: me.buildBottomBar()
                },{
                    xtype: "grid",
                    reference: "poTemplateGrid",
                    scrollable: true,

                    flex: 2,

                    style: {
                        borderTop: '1px solid #cfcfcf',
                        //borderBottom: '1px solid #cfcfcf'
                    },
                    
                    bind: {
                        title: 'Style / Color Total Qty to Create PO - Group By {groupBy} for PO #',
                        store: "{potemplates}"
                    },                    

                    columns: me.buildColumns(),
                
                    cls: "po-template-grid",
                    stateful: true,
                    stateId: "po-template-grid",
                    //stateEvents: ["columnmove","columnresize","columnshow","columnhide"],
                    //loadMask: true,
                    //columnLines: true,
                    multiColumnSort: true,
                    // We do not need automatic height synching.
                    syncRowHeight: false,

                    selModel: {
                        type: 'checkboxmodel',
                        mode: 'MULTI',
                        pruneRemoved: false
                    },
                    
                    viewConfig: {
                        //loadingHeight: 400,
                        stripeRows: true,
                        trackOver: true,
                        preserveScrollOnRefresh:true,
                        //deferInitialRefresh:true,
                        //trailingBufferZone: 20,
                        //leadingBufferZone: 40,

                        emptyText: '<h1 style="margin:20px">No matching results</h1>',
                        deferEmptyText: false
                        
                    },
                    plugins: [{
                        ptype: 'rowediting',
                        clicksToEdit: 2,
                        clicksToMoveEditor: 1,
                        autoCancel: false
                    },{
                        ptype: "gridfilters"
                    },{
                        ptype: "grid-exporter"
                    }],

                    listeners: {
                        
                    }
                }]             
            }]            
        });

        me.callParent(arguments);

    },

    buildColumns: function() {
        return [            
            {
                text: "Styles", dataIndex: 'styles', menuDisabled: true, width: 220,
                renderer: function(value, meta, rec){                    
                    return value;
                }
            },
            {
                xtype: 'numbercolumn', text: 'Total Qty', dataIndex: 'totalUnits', menuDisabled: true, format: '0,000'
            },
            /*
            {
                text: 'SO #', dataIndex: 'SoNo', menuDisabled: true
            },
            */
            {
                text: 'Cut / PO', dataIndex: 'cut_po', menuDisabled: true,
                editor: {
                    xtype: 'combo',
                    name: 'cutpo',
                    store: new Ext.data.ArrayStore({
                        fields: ["field"],
                        data: [["PO"], ["Cut"]]
                    }),
                    displayField: "field",
                    valueField: "field",
                    editable: false,
                    forceSelection: true,
                    matchFieldWidth: true,
                    queryMode: 'local',                    
                    plugins: [{
                        ptype: "cleartrigger"
                    }]
                }
            },
            {
                text: 'Vendor', dataIndex: 'vendor', menuDisabled: true, width: 120,
                editor: {
                    xtype: 'combo',
                    name: 'vendor',
                    bind: {
                        store: '{vendors}'
                    },
                    //hideTrigger: true,
                    pageSize: 0,
                    valueField: "value",
                    displayField: "label",
                    matchFieldWidth: false,
                    //forceSelection: false,
                    //selectOnFocus: true,
                    queryMode: 'local',
                    //queryParam: "filter",
                    //triggerAction: 'all',
                    //lastQuery: '',
                    minChars: 0,
                    listConfig: {
                        loadindText: 'Searching...',
                        emptyText: 'No matching items found.',
                        width: 340
                    },
                    plugins: [{
                        ptype: "cleartrigger"
                    }]
                },
            },
            {
                text: 'Process Type', dataIndex: 'processType', menuDisabled: true,
                editor: {
                    xtype: 'combo',
                    name: 'processtype',
                    bind: {
                        store: '{processtypes}'
                    },
                    //hideTrigger: true,                    
                    valueField: "value",
                    displayField: "label",
                    editable: false,
                    allowBlank: false,
                    matchFieldWidth: false,
                    //forceSelection: false,
                    //selectOnFocus: true,
                    queryMode: 'local'                    
                },

            },
            {
                text: 'Division', dataIndex: 'division', menuDisabled: true,
                editor: {
                    xtype: 'combo',
                    name: 'division',
                    bind: {
                        store: '{divisions}'
                    },                    
                    displayField: 'label',
                    valueField: 'value',
                    //selectOnFocus: false,
                    editable: false,
                    allowBlank: false,
                    //forceSelection: true,
                    queryMode: 'local',
                    //triggerAction: 'all',                    
                }
            },
            {
                xtype: 'datecolumn', format:'Y-m-d', text: 'ETA Date', dataIndex: 'etaDate', menuDisabled: true,
                editor: {
                    xtype: 'datefield'
                }
            },
            {
                xtype: 'datecolumn', format:'Y-m-d', text: 'Cancel Date', dataIndex: 'cancelDate', menuDisabled: true,
                editor: {
                    xtype: 'datefield'
                }
            },
            {
                xtype: 'datecolumn', format:'Y-m-d', text: 'PO Date', dataIndex: 'orderDate', menuDisabled: true,
                editor: {
                    xtype: 'datefield'
                }
            },
            {
                xtype: 'datecolumn', format:'Y-m-d', text: 'Start Date', dataIndex: 'startDate', menuDisabled: true,
                editor: {
                    xtype: 'datefield'
                }
            },
            {
                xtype: 'datecolumn', format:'Y-m-d', text: 'Ship Date', dataIndex: 'shipdate', menuDisabled: true,
                editor: {
                    xtype: 'datefield'
                }
            },
            {
                text: 'Payment', dataIndex: 'paymentcode', menuDisabled: true,
                editor: {
                    xtype: 'combo',
                    name: 'payment',
                    bind: {
                        store: '{paymentcodes}'
                    },                    
                    displayField: 'label',
                    valueField: 'value',
                    //selectOnFocus: false,
                    editable: false,
                    allowBlank: true,
                    //forceSelection: true,
                    queryMode: 'local',
                    //triggerAction: 'all',  
                }
            },
            {
                text: 'Terms', dataIndex: 'terms', menuDisabled: true,
                editor: {
                    xtype: 'combo',
                    name: 'terms',
                    bind: {
                        store: '{terms}'
                    },                    
                    displayField: 'label',
                    valueField: 'value',
                    //selectOnFocus: false,
                    editable: false,
                    allowBlank: true,
                    //forceSelection: true,
                    queryMode: 'local',
                    //triggerAction: 'all',  
                }
            },
            {
                text: 'Shipvia', dataIndex: 'shipvia', menuDisabled: true,
                editor: {
                    xtype: 'combo',
                    name: 'shipvia',
                    bind: {
                        store: '{shipvias}'
                    },                    
                    displayField: 'label',
                    valueField: 'value',
                    //selectOnFocus: false,
                    editable: false,
                    allowBlank: true,
                    //forceSelection: true,
                    queryMode: 'local',
                    //triggerAction: 'all',  
                }
            },
            {
                text: 'Warehouse', dataIndex: 'warehouse', menuDisabled: true,
                editor: {
                    xtype: 'combo',
                    name: 'warehouse',
                    bind: {
                        store: '{warehouses}'
                    },                    
                    displayField: 'label',
                    valueField: 'value',
                    //selectOnFocus: false,
                    editable: false,
                    allowBlank: false,
                    //forceSelection: true,
                    queryMode: 'local',
                    //triggerAction: 'all',  
                }
            },
            {
                text: 'Memo Code', dataIndex: 'memocode', menuDisabled: true,
                editor: {
                    xtype: 'combo',
                    name: 'memocode',
                    bind: {
                        store: '{memocodes}'
                    },                    
                    displayField: 'label',
                    valueField: 'value',
                    //selectOnFocus: false,
                    editable: false,
                    allowBlank: true,
                    //forceSelection: true,
                    queryMode: 'local',
                    //triggerAction: 'all',  
                }
            },
            {
                text: 'Ship To', dataIndex: 'shipto', menuDisabled: true,
                editor: {
                    xtype: 'combo',
                    name: 'shipto',
                    bind: {
                        store: '{companies}'
                    },                    
                    displayField: 'label',
                    valueField: 'value',
                    //selectOnFocus: false,
                    editable: false,
                    allowBlank: true,
                    //forceSelection: true,
                    queryMode: 'local',
                    //triggerAction: 'all',  
                }
            },
            {
                text: 'Type', dataIndex: 'type', menuDisabled: true,
                editor: {
                    xtype: 'combo',
                    name: 'type',
                    store: new Ext.data.ArrayStore({
                        fields: ["field"],
                        data: [["Estimate"], ["Confirmed"]]
                    }),                    
                    displayField: 'field',
                    valueField: 'field',
                    //selectOnFocus: false,
                    editable: false,
                    allowBlank: false,
                    //forceSelection: true,
                    queryMode: 'local',
                    //triggerAction: 'all',  
                }
            },
            {
                text: 'Customer', dataIndex: 'customer', width: 140, menuDisabled: true
            },
            {
                text: 'Customer PO #', dataIndex: 'cust_po', width: 200, menuDisabled: true
            },
            {
                text: 'First SO #', dataIndex: 'SoNo', menuDisabled: true
            },
            {
                text: 'Store', dataIndex: 'store', width: 140, menuDisabled: true
            }
        ]      
    },

    buildBottomBar: function(){
        var b = Ext.create("widget.combo", {
            name: "perpage",
            //reference: 'pageSizer',
            width: 76,
            store: new Ext.data.ArrayStore({
                fields: ["id"],
                data: [["15"], ["25"], ["50"], ["100"], ["300"], ["500"]]
            }),
            //value: "50",
            displayField: "id",
            valueField: "id",
            editable: false,
            forceSelection: true,
            matchFieldWidth: true,
            queryMode: "local"
            //triggerAction: "all",
        });

        b.on('afterrender', function(c, e){
            var store = this.getViewModel().getStore("orderdetails");
            c.setValue(store.getPageSize());
        }, this);

        b.on("select", function(e, a){
            var store = this.getViewModel().getStore("orderdetails");
            store.setPageSize(e.getValue());
            store.load();
            //console.log("combo select", f)
        }, this);

        return {
            xtype: "pagingtoolbar",
            //itemId: "pagingtb",
            bind: {
                store: "{orderdetails}"
            },
            //dock: "bottom",
            //displayInfo: true,
            items: ["-", b, "Per Page"]
        };
    }
})
