
Ext.define('August.view.customer.creditmemo.List', {    
    extend: 'August.view.Viewer',

    requires: [
        'August.view.customer.creditmemo.ListController',
        'August.view.customer.creditmemo.ListModel',        
        //'August.view.customer.creditmemo.Form',
        'August.plugin.grid.Exporter'        
    ],

    alias: "widget.customer-creditmemo",

    controller: 'customer-creditmemo',
    viewModel: {
        type: 'customer-creditmemo'
    },

    cls: "creditmemo shadow-panel",

    header: false,
    margin: '0 0 0 4',

    listeners: {
        
        actnew: 'onActionNew',
        actedit: 'onActionEdit',
        actdelete: 'onActionDelete',
        actrefresh: 'onActionRefresh',
        clearall: 'onClearFilters',
        gridafterrender: 'onAfterGridRender',
        gridrowdblclick: 'onActionEdit',
        griditemcontextmenu: "onItemContextMenu"
        
    },

    initComponent: function(){
        var me = this;

        //me.dockedItems = me.buildDockedItems();

        Ext.applyIf(me, {
            items: [{
                xtype: "multiview",
                reference: "multiview",
                title: "Credit Memo List",
                iconCls: "x-fa fa-calculator",

                tbar: {
                    xtype: "topbar",
                    reference: "topbar"
                },

                mainItems: [{
                    xtype: "grid",
                    reference: "cmGrid",
                    scrollable: true,
                    flex: 2,
                    style: {
                        borderTop: '1px solid #cfcfcf',
                        borderBottom: '1px solid #cfcfcf'
                    },

                    bind: {
                        store: '{customercms}'
                    },

                    listeners: {                        
                        select: {
                            fn: 'onSelect',
                            scope: this.controller
                        }                        
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
                            render: function(view){
                                //var view = grid.getView();
                                view.tip = Ext.create('Ext.tip.ToolTip', {
                                    // The overall target element.
                                    target: view.el,
                                    // Each grid row causes its own separate show and hide.
                                    //delegate: view.itemSelector,
                                    delegate: view.cellSelector,
                                    // Moving within the row should not hide the tip.
                                    trackMouse: true,
                                    // Render immediately so that tip.body can be referenced prior to the first show.
                                    renderTo: Ext.getBody(),
                                    listeners: {
                                        // Change content dynamically depending on which element triggered the show.
                                        beforeshow: function updateTipBody(tip) {
                                            var trigger = tip.triggerElement,
                                                parent = tip.triggerElement.parentElement,
                                                columnTitle = view.getHeaderByCell(trigger).text,
                                                columnDataIndex = view.getHeaderByCell(trigger).dataIndex,
                                                columnText = view.getRecord(parent).get(columnDataIndex);

                                            if(!Ext.isEmpty(columnText)){
                                                var xf = Ext.util.Format;

                                                tip.update(columnText);
                                            }
                                            else {
                                                return false;
                                            }

                                        }
                                    }
                                });
                            }
                        }
                    },

                    plugins: [{
                        ptype: "gridfilters"
                    },{
                        ptype: 'grid-exporter'
                    }]
                }],

                displayItems: [{
                    xtype: "display",
                    reference: "display"
                }],

                bbar: me.buildBottomBar()
            }]
        });

        me.callParent(arguments);

        var g=this.lookupReference("multiview"),
            j=g.lookupReference("cmGrid"),
            h=g.lookupReference("display"),
            f=g.lookupReference("topbar");

        f.actEdit.setHidden(false);
        //f.actEdit.setDisabled(true);

        var mnuItems = [f.actEdit, f.actDelete, f.actRefresh,
            {
                text: "Print",
                iconCls: "x-fa fa-print",
                action: "printlabel",
                //handler: 'onOpenLabeltagClick',
                scope: this.controller
            }];

        me.contextmenu = Ext.create("Ext.menu.Menu", {
            items: mnuItems
        });

        f.items.items[0].setHidden(false);
        f.items.items[1].setHidden(false);
        f.items.last().setHidden(true);

        f.insert(0,
            [{
                xtype: "combo",
                width: 112,
                hideLabel: true,
                valueField: "field",
                displayField: "label",
                value: "CM #",
                editable: false,
                reference: "filterSelection",
                bind: {
                    store: "{categories}"
                },
                queryMode: 'local',
                listeners: {
                    change: {
                        //fn: "onFilterItemChange",
                        //scope: this.controller
                    }
                }
            },
            {
                xtype: 'searchnumber',
                //reference: 'searchnumber',
                width: 300,
                grid: "cmGrid",
                paramName: 'CMNO'
            },  
            {
                xtype: "searchgrid",
                width: 300,
                hidden: true,
                grid: "cmGrid"
                //paramName: "orderno"
            }]
        );

        f.insert(14,
            [{
                xtype: 'button',
                iconCls: 'x-fa fa-external-link-alt',
                text: 'Export',
                handler: function(b){
                    j.saveDocumentAs({
                        type: 'xlsx',
                        title: 'Credit Memo List',
                        fileName: 'Credit Memo ' + Ext.Date.format(new Date(), 'Y-m-d')
                    });
                }
            }]
        );

        this.relayEvents(j, ["itemcontextmenu", "afterrender", "rowdblclick"], 'grid');
        this.relayEvents(f, ["actnew", 'actedit', "actrefresh", 'actdelete', "clearall"]);
    },

    buildGridColumns: function(){
        return [{
            text: "Division",
            dataIndex: "division",            
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },{
            text: "C.M #",
            dataIndex: "CMNO",
            locked: false,
            filter: {
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            xtype: 'datecolumn',
            text: "C.M Date",
            dataIndex: "invoiceDate",
            format: 'Y-m-d',
            filter: {
                type: "date",
                format: 'Y-m-d',
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
                format: 'Y-m-d',
                dateFormat: 'C'
            }
        }, 
        {
            text: "Customer",
            dataIndex: "customer",
            width: 180,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },        
        {
            text: "Total",
            dataIndex: "total",
            locked: false,
            formatter: 'usMoney',
            filter: {
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "Paid Amt",
            dataIndex: "paidamt",
            locked: false,
            formatter: 'usMoney',
            filter: {
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
            }
        },  
        {
            text: "Balance",
            dataIndex: "bal",
            locked: false,
            formatter: 'usMoney',
            filter: {
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "Sub Total",
            dataIndex: "subtotal",
            locked: false,
            formatter: 'usMoney',
            filter: {
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
            }
        },        
        {
            text: "Misc",
            dataIndex: "misc",
            locked: false,
            formatter: 'usMoney',
            filter: {
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
            }
        },  
        {
            text: "Freight",
            dataIndex: "freight",
            locked: false,
            formatter: 'usMoney',
            filter: {
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
            }
        },          
        {
            text: "Discount",
            dataIndex: "discount",
            locked: false,
            formatter: 'usMoney',
            filter: {
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
            }
        },  
        {
            text: "Tax 1",
            dataIndex: "tax1",
            locked: false,
            formatter: 'number("0,000.00")',
            filter: {
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
            }
        },  
        {
            text: "Tax 2",
            dataIndex: "tax2",
            locked: false,
            formatter: 'number("0,000.00")',
            filter: {
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
            }
        },  
        {
            text: "S.O #",
            dataIndex: "orderNO",
            locked: false,
            filter: {
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
            }
        }, 
        {
            text: "Term",
            dataIndex: "term",            
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Store",
            dataIndex: "shipTo",
            width: 180,            
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Billto",
            dataIndex: "billTo",
            width: 180,            
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Ship Via",
            dataIndex: "shipvia",
            locked: false,
            filter: {
                type: "string"
            },
            renderer: function(f, e, a){
                return f;
            }
        },        
        {
            text: "Factor",
            dataIndex: "factor",
            locked: false,
            filter: {
                type: "string"
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "SO Type",
            dataIndex: "orderType",
            locked: false,
            filter: {
                type: "string"
            },
            renderer: function(f, e, a){
                return f;
            }
        },  
        {
            text: "Cust. PO #",
            dataIndex: "customerpono",
            width: 200,
            locked: false,
            filter: {
                type: "string"
            },
            renderer: function(f, e, a){
                return f;
            }
        },  
        {
            text: "BOL #",
            dataIndex: "bol",
            locked: false,
            width: 140,
            filter: {
                type: "string"
            },
            renderer: function(f, e, a){
                return f;
            }
        }, 
        /*
        {
            text: "Sales R1",
            dataIndex: "salesrep1",
            locked: false,
            filter: {
                type: "string"
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "Com. R1",
            dataIndex: "comrate1",
            width: 80,
            locked: false,
            formatter: 'number("0,000.00")',
            filter: {
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
            }
        },  
        
        {
            text: "1st Pick #",
            dataIndex: "pickno",
            locked: false,
            filter: {
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
            }
        },  
        {
            text: "STS",
            dataIndex: "sts",
            locked: false,
            filter: {
                type: "string"
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "DC",
            dataIndex: "dc",
            locked: false,
            filter: {
                type: "string"
            },
            renderer: function(f, e, a){
                return f;
            }
        },                        
        {
            text: "Pay Discount",
            dataIndex: "pay_discount",
            locked: false,
            formatter: 'usMoney',
            filter: {
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
            }
        },  
        {
            text: "Pay Writeoff",
            dataIndex: "pay_writeoff",
            locked: false,
            formatter: 'usMoney',
            filter: {
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
            }
        },  
        
        {
            text: "Fact. Batch #",
            dataIndex: "factor_batchno",
            locked: false,
            filter: {
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
            }
        },  
        */
        {
            text: "Payment Method",
            dataIndex: "paymentcode",
            width: 140,
            locked: false,
            filter: {
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
            }
        },  
        {
            text: "Memo",
            dataIndex: "memo",
            width: 240,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Create User",
            dataIndex: "CreateUser",
            width: 140,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            xtype: 'datecolumn',
            text: "Create Time",
            dataIndex: "CreateTime",
            format: 'Y-m-d',
            filter: {
                type: "date",
                format: 'Y-m-d',
                dateFormat: 'C'
            }
        }];
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
            var store = this.getViewModel().getStore("customercms");
            c.setValue(store.getPageSize());
        }, this);

        b.on("select", function(e, a){
            var store = this.getViewModel().getStore("customercms");
            store.setPageSize(e.getValue());
            store.load();            
        }, this);

        return {
            xtype: "pagingtoolbar",
            //itemId: "pagingtb",
            bind: {
                store: "{customercms}"
            },
            //dock: "bottom",
            //displayInfo: true,
            items: ["-", b, "Per Page"]
        };
    }
});
    
