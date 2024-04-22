
Ext.define('August.view.purchase.Order',{
    extend: 'August.view.Viewer',

    requires: [
        'August.view.purchase.OrderController',
        'August.view.purchase.OrderModel',
        'August.view.purchase.OrderForm',
        'Ext.grid.plugin.Exporter',
        'August.plugin.grid.Exporter',
        'Ext.ux.CTemplate'
    ],

    alias: "widget.purchase-order",

    controller: 'purchase-order',
    viewModel: {
        type: 'purchase-order'
    },

    cls: "physical shadow-panel",

    header: false,
    margin: '0 0 0 4',

    listeners: {
        actnew: 'onActionNew',
        actedit: 'onActionEdit',
        actdelete: 'onActionDelete',
        actrefresh: 'onActionRefresh',
        actprint: 'onActionPrint',
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
                title: "Purchase Orders",
                iconCls: "x-fa fa-money-check-alt",

                tbar: {
                    xtype: "topbar",
                    reference: "topbar"
                },

                mainItems: [{
                    xtype: "grid",
                    reference: "purchase-order-grid",
                    scrollable: true,
                    flex: 2,
                    style: {
                        borderTop: '1px solid #cfcfcf',
                        borderBottom: '1px solid #cfcfcf'
                    },

                    bind: {
                        store: '{purchaseorders}'
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
            j=g.lookupReference("purchase-order-grid"),
            h=g.lookupReference("display"),
            f=g.lookupReference("topbar");

        f.actEdit.setHidden(false);
        //f.actEdit.setDisabled(true);

        var mnuItems = [f.actEdit, f.actDelete, f.actRefresh, f.actPrint];

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
                value: "P.O #",
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
                //reference: 'searchlist',
                width: 300,              
                bind: {                    
                    store: '{purchaseorders}'
                },  
                
                paramName: "pono"            
            },                      
            {
                xtype: "searchgrid",
                width: 300,
                grid: "purchase-order-grid",
                hidden: true
            },
            {
                xtype: "searchcombo",
                reference: 'searchcombo',
                width: 300,
                hidden: true,
                searchAt: 'grid'
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
                        title: 'Purchase List',
                        fileName: 'PO' + Ext.Date.format(new Date(), 'Y-m-d')
                    });
                }
            }]
        );

        this.relayEvents(j, ["itemcontextmenu", "afterrender", "rowdblclick"], 'grid');
        this.relayEvents(f, ["actnew", 'actedit', "actrefresh", 'actdelete', "actprint", "actactive", "clearall"]);
    },

    buildGridColumns: function(){
        return [{
            text: "P.O / CUT #",
            dataIndex: "pono",
            locked: false,
            filter: {
                type: "number"
            },
            /*
            filter: {
                operator: 'in',
                type: "list"
            },
            */
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "Division",
            dataIndex: "division",
            width: 140,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Cut or PO",
            dataIndex: "cut_po",
            width: 140,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Vendor",
            dataIndex: "vendor",
            width: 140,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            xtype: 'datecolumn',
            text: "Order Date",
            dataIndex: "orderDate",
            format: 'Y-m-d',
            filter: {
                type: "date",
                format: 'Y-m-d',
                dateFormat: 'C'
            }
        },
        {
            xtype: 'datecolumn',
            text: "ETA Date",
            dataIndex: "etatDate",
            format: 'Y-m-d',
            filter: {
                type: "date",
                format: 'Y-m-d',
                dateFormat: 'C'
            }
        },
        {
            xtype: 'datecolumn',
            text: "CXL Date",
            dataIndex: "cancelDate",
            format: 'Y-m-d',
            filter: {
                type: "date",
                format: 'Y-m-d',
                dateFormat: 'C'
            }
        },
        {
            xtype: 'datecolumn',
            text: "Start Date",
            dataIndex: "startDate",
            format: 'Y-m-d',
            filter: {
                type: "date",
                format: 'Y-m-d',
                dateFormat: 'C'
            }
        },
        {
            text: "Process Type",
            dataIndex: "processType",
            width: 140,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Total Qty",
            dataIndex: "TotalQty",
            width: 140,
            hidden: false,
            filter: {type: "number"}
        },
        {
            text: "Ext. Price",
            dataIndex: "extPrice",
            width: 140,
            hidden: false,
            filter: {type: "number"}
        },
        {
            text: "Rec. Qty",
            dataIndex: "ReceiveQty",
            width: 140,
            hidden: false,
            filter: {type: "number"}
        },
        {
            text: "Rcv. Ext Price",
            dataIndex: "rcvextPrice",
            width: 140,
            hidden: false,
            filter: {type: "number"}
        },
        {
            text: "Status",
            dataIndex: "status",
            width: 140,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Customer",
            dataIndex: "customer",
            width: 140,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Customer PO #",
            dataIndex: "cust_po",
            width: 140,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Memo Code",
            dataIndex: "memoCode",
            width: 140,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Type",
            dataIndex: "type",
            width: 140,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Ship To",
            dataIndex: "shipto",
            width: 140,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Warehouse",
            dataIndex: "warehouse",
            width: 140,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Ship Via",
            dataIndex: "shipvia",
            width: 140,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },                
        {
            text: "Customer Dept",
            dataIndex: "dept",
            width: 140,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "S.O #",
            dataIndex: "SoNo",
            width: 140,
            hidden: false,
            filter: {type: "number"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "S.O Customer",
            dataIndex: "so_customer",
            width: 140,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Create User",
            dataIndex: "createUser",
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
            text: "Create Date",
            width: 150,
            dataIndex: "createDate",
            format: 'Y-m-d H:i a',
            filter: {
                type: "date",
                format: 'Y-m-d',
                dateFormat: 'C'
            }            
        },
        {
            text: "Update User",
            dataIndex: "updateUser",
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
            text: "Update Time",
            width: 150,
            dataIndex: "updateDate",
            format: 'Y-m-d H:i a',
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
            var store = this.getViewModel().getStore("purchaseorders");
            c.setValue(store.getPageSize());
        }, this);

        b.on("select", function(e, a){
            var store = this.getViewModel().getStore("purchaseorders");
            store.setPageSize(e.getValue());
            store.load();
            //console.log("combo select", f)
        }, this);

        return {
            xtype: "pagingtoolbar",
            //itemId: "pagingtb",
            bind: {
                store: "{purchaseorders}"
            },
            //dock: "bottom",
            //displayInfo: true,
            items: ["-", b, "Per Page"]
        };
    }
});
