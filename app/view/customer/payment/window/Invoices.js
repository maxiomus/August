/**
 * Created by tech on 2/10/2022.
 */
Ext.define('August.view.customer.payment.windows.Invoices',{
    extend: 'Ext.window.Window',

    requires: [
        'August.view.customer.payment.windows.InvoicesController',
        'August.view.customer.payment.windows.InvoicesModel',
        //'August.model.shopify.shopifyTemplate',
        //'August.model.shopify.lordTaylorTemplate',
        'August.plugin.grid.Exporter'
    ],

    alias: 'widget.windows-payment-invoices',

    controller: 'windows-payment-invoices',
    viewModel: {
        type: 'windows-payment-invoices'
    },

    layout: {
        type: 'fit'
    },

    header: {
        title: 'Receive Payments',
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
            name: 'filter',            
            items: [{
                xtype: 'combo',
                name: 'customer',
                labelWidth: 60,
                fieldLabel: 'Customer',
                displayField: 'label',
                valueField: 'value',

                selectOnFocus: false,
                //allowBlank: true,
                //forceSelection: true,
                pageSize: 50,
                matchFieldWidth: false,
                //msgTarget: 'side',                        
                minChars: 2,                        
                queryMode: 'local',                        
                //queryParam: 'filter',
                lastQuery: '',
                //autoLoadOnValue: true,
                //triggerAction: 'all',
                //store: ['00', 'OS', 'SA'],
                store: 'memCustomers',
                remoteStore: 'customers',
                
                listConfig: {
                    loadindText: 'Searching...',
                    emptyText: 'No matching items found.',
                    width: 340
                },

                plugins: [{
                    ptype: "cleartrigger"
                }],

                bind: {
                    //store: '{customers}',
                    value: '{customer}'
                },

                listeners: {
                    selected: {
                        //fn: 'onCustomerChanged',
                        //scope: this.controller
                    },
                    change: {
                        fn: 'onCustomerChanged',
                        scope: this.controller
                    },
                    beforequery: function(q){
                        delete q.combo.lastQuery;
                    }, 
                    triggerClear: {
                        fn: 'onTriggerClear',
                        scope: this.controller
                    }
                }
            },
            {
                xtype: 'combo',
                name: 'division',
                width: 180,
                labelWidth: 60,
                fieldLabel: 'Division',
                displayField: 'label',
                valueField: 'value',
                editable: false,

                selectOnFocus: false,
                //allowBlank: false,
                //forceSelection: true,
                //msgTarget: 'side',
                disabled: true,
                minChars: 1,
                queryMode: 'local',
                //queryParam: 'filter',
                //triggerAction: 'all',
                //store: ['00', 'OS', 'SA'],
                style: {
                    margin: '0 0 0 20px'
                },
                
                bind: {
                    store: '{divisions}',
                    value: '{division}'
                },

                plugins: [{
                    ptype: "cleartrigger"
                }],

                listeners: {
                    change: {
                        fn: 'onDivisionChanged',
                        scope: this.controller
                    }
                }
            },                         
            '-',
            /*{ xtype: 'tbspacer', width: 0 },*/
            {
                xtype: 'button',
                text: 'Search',
                action: 'search',
                iconCls: 'x-fa fa-search',
                handler: function(btn) {
                    me.fireEvent('searchclick', btn, me);
                }
            },
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
                    reference: "invoicesGrid",
                    
                    scrollable: true,

                    flex: 3,

                    style: {
                        borderTop: '1px solid #cfcfcf',
                        //borderBottom: '1px solid #cfcfcf'
                    },  

                    //title: 'SO List',                    

                    bind: {                        
                        store: "{invoices}"
                    },

                    columns: this.buildColumns(),  
                
                    cls: "invoices-grid",

                    stateful: true,

                    stateId: "invoices-grid",
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
                        /*
                        render: {
                            //fn: 'onGridRender',
                            //scope: this.controller
                        },
                        select: {
                            //fn: 'onSelect',
                            //scope: this.controller
                        },
                        
                        deselect: {
                            fn: 'onDeselect',
                            scope: this.controller
                        }
                        */
                    },

                    bbar: me.buildBottomBar()
                }]             
            }]            
        });

        me.callParent(arguments);

    },

    buildColumns: function() {
        return [{
                xtype: 'rownumberer',
                text: 'Line',
                width: 60,
                fixed: true,
                hidden: true,
                sortable: false
            },{
                xtype: 'datecolumn',
                text: "Date",
                dataIndex: "trans_date",            
                format: 'Y-m-d',
                filter: {
                    type: "date"
                }
            },{
                xtype: 'datecolumn',
                text: "Due Date",
                dataIndex: "dueDate",
                format: 'Y-m-d',
                filter: {
                    type: "date"
                }
            },
            {
                text: "Terms",
                dataIndex: "terms",            
                filter: {
                    type: 'string'
                },
                renderer: function(value, meta, rec){                
                    return value;
                }
            },                
            {
                text: "Payment Method",
                dataIndex: "paymentCode",
                //width: 120,
                hidden: false,
                filter: {type: "string"},
                renderer: function(value, h, a){                
                    return value;
                }
            }, 
            {
                text: "Division",
                dataIndex: "division",
                //width: 120,
                hidden: false,
                filter: {type: "string"},
                renderer: function(value, h, a){                
                    return value;
                }
            },
            {
                text: "Transaction Type",
                dataIndex: "charge_type",
                //width: 120,
                hidden: false,
                filter: {type: "string"},
                renderer: function(value, h, a){                
                    return value;
                }
            },
            {
                text: "Key #",
                dataIndex: "key_no",
                //width: 120,
                hidden: false,
                filter: {type: "string"},
                renderer: function(value, h, a){                
                    return value;
                }
            },
            {
                text: "Customer PO #",
                dataIndex: "customerpono",
                width: 120,
                hidden: false,
                filter: {type: "string"},
                renderer: function(value, h, a){                
                    return value;
                }
            },{
                text: "Original Amt",
                dataIndex: "originalAmt",
                //width: 140,
                hidden: false,
                formatter: 'usMoney',
                filter: {
                    type: "number"
                }            
            },
            {
                text: "Due Amount",
                dataIndex: "dueAmt",
                //width: 140,
                hidden: false,
                formatter: 'usMoney',
                filter: {
                    type: "number"
                }            
            },
            {
                text: "Payment",
                dataIndex: "paidAmount",
                //width: 140,
                hidden: false,
                formatter: 'usMoney',
                filter: {
                    type: "number"
                }            
            },        
            {
                text: "Apply Credit",
                dataIndex: "chk_credit",
                //width: 120,
                hidden: false,
                filter: {type: "string"},
                renderer: function(value, h, a){                
                    return value;
                }
            },
            {
                text: "Credit",
                dataIndex: "pay_credit",
                //width: 140,
                hidden: false,
                formatter: 'usMoney',
                filter: {
                    type: "number"
                }            
            },        
            {
                text: "Discount",
                dataIndex: "pay_discount",
                //width: 140,
                hidden: false,
                formatter: 'usMoney',
                filter: {
                    type: "number"
                }            
            },
            {
                text: "Write-off",
                dataIndex: "pay_writeoff",
                //width: 140,
                hidden: false,
                formatter: 'usMoney',
                filter: {
                    type: "number"
                }            
            },
            {
                text: "Total Pay",
                dataIndex: "total_pay",
                //width: 140,
                hidden: false,
                formatter: 'usMoney',
                filter: {
                    type: "number"
                }            
            },
            {
                text: "Balance",
                dataIndex: "balance",
                //width: 140,
                hidden: false,
                formatter: 'usMoney',
                filter: {
                    type: "number"
                }            
            },
            {
                text: "D/C",
                dataIndex: "chk_discount",
                width: 120,
                hidden: false,
                filter: {type: "string"},
                renderer: function(i, h, a){
                    return i;
                }
            },                                  
            {
                text: "W/O",
                dataIndex: "chk_writeoff",
                width: 120,
                hidden: false,
                filter: {type: "string"},
                renderer: function(i, h, a){
                    return i;
                }
            }]            
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
            var store = this.getViewModel().getStore("invoices");
            c.setValue(store.getPageSize());
        }, this);

        b.on("select", function(e, a){
            var store = this.getViewModel().getStore("invoices");
            store.setPageSize(e.getValue());
            store.load();
            //console.log("combo select", e, a);
        }, this);

        return {
            xtype: "pagingtoolbar",
            //itemId: "pagingtb",
            bind: {
                store: "{invoices}"
            },
            //dock: "bottom",
            //displayInfo: true,
            items: ["-", b, "Per Page"]
        };
    }
})

