
Ext.define('August.view.sales.pick.Ticket',{    
    extend: 'August.view.Viewer',

    requires: [
        'August.view.sales.pick.TicketController',
        'August.view.sales.pick.TicketModel',
        //'August.view.sales.pick.TicketForm',
        'August.plugin.grid.Exporter'        
    ],

    alias: "widget.pick-ticket",

    controller: 'pick-ticket',
    viewModel: {
        type: 'pick-ticket'
    },

    cls: "physical shadow-panel",

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
                title: "Pick Tickets",
                iconCls: "x-fa fa-calculator",

                tbar: {
                    xtype: "topbar",
                    reference: "topbar"
                },

                mainItems: [{
                    xtype: "grid",
                    reference: "pickGrid",
                    scrollable: true,
                    flex: 2,
                    style: {
                        borderTop: '1px solid #cfcfcf',
                        borderBottom: '1px solid #cfcfcf'
                    },

                    bind: {
                        store: '{picktickets}'
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
            j=g.lookupReference("pickGrid"),
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
            },{
                text: 'Invoice',
                iconCls: 'x-fa fa-dollar-sign',
                action: 'createinvoice',
                handler: 'onCreateInvoiceClick',
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
                xtype: "searchgrid",
                width: 300,                
                grid: "pickGrid"
                //paramName: "orderno"
            }]
        );

        f.insert(14,
            [{
                xtype: 'button',
                iconCls: 'x-fa fa-file-export',
                text: 'Update',
                action: 'update',
                handler: 'onOpenUpdateClick',
                scope: me.controller
            },{
                xtype: 'button',
                iconCls: 'x-fa fa-external-link-alt',
                text: 'Export',
                handler: function(b){
                    j.saveDocumentAs({
                        type: 'xlsx',
                        title: 'Pick Ticket List',
                        fileName: 'PT ' + Ext.Date.format(new Date(), 'Y-m-d')
                    });
                }
            }]
        );

        this.relayEvents(j, ["itemcontextmenu", "afterrender", "rowdblclick"], 'grid');
        this.relayEvents(f, ["actnew", 'actedit', "actrefresh", 'actdelete', "actactive", "clearall"]);
    },

    buildGridColumns: function(){
        return [{
            text: "Division",
            dataIndex: "division",
            width: 100,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },{
            text: "Pick #",
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
            xtype: 'datecolumn',
            text: "Pick Date",
            dataIndex: "pickdate",
            format: 'Y-m-d',
            filter: {
                type: "date",
                format: 'Y-m-d',
                dateFormat: 'C'
            }
        },
        {
            text: "Status",
            dataIndex: "status",
            width: 100,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "S.O #",
            dataIndex: "sono",
            locked: false,
            filter: {
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
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
            text: "SO Type",
            dataIndex: "sotype",
            width: 140,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },        
        {
            text: "1st Style",
            dataIndex: "style",
            width: 140,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "STS",
            dataIndex: "shiptostore",
            width: 60,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Store",
            dataIndex: "store",
            width: 140,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "DC",
            dataIndex: "dc",
            width: 60,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Customer PO #",
            dataIndex: "customerpo",
            width: 140,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Pick Qty",
            dataIndex: "pickQty",
            width: 80,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Pick Amt",
            dataIndex: "pickamt",
            width: 80,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Invoice Amt",
            dataIndex: "invamt",
            width: 80,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Bal Amt",
            dataIndex: "balamt",
            width: 80,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "SO Ship #",
            dataIndex: "sosno",
            width: 100,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            xtype: 'datecolumn',
            text: "SO Ship Date",
            width: 120,
            dataIndex: "soshipdate",
            filter: {type: "date"},
            format: 'Y-m-d'
        },
        {
            xtype: 'datecolumn',
            text: "SO Cxl Date",
            width: 120,
            dataIndex: "socxldate",
            filter: {type: "date"},
            format: 'Y-m-d'
        },        
        {
            text: "Terms",
            dataIndex: "terms",
            width: 100,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Warehouse",
            dataIndex: "warehouse",
            width: 120,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Pay. Method",
            dataIndex: "paymentcode",
            width: 100,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "BOL #",
            dataIndex: "bolno",
            width: 100,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            xtype: 'datecolumn',
            text: "Print Date",
            width: 120,
            dataIndex: "printdate",
            filter: {type: "date"},
            format: 'Y-m-d'
        },
        {
            text: "Create User",
            dataIndex: "createuser",
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
            width: 140,
            dataIndex: "createdate",
            filter: {type: "date"},
            format: 'Y-m-d H:i'
        },
        {
            text: "Update User",
            dataIndex: "updateuser",
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
            text: "Update Date",
            width: 140,
            dataIndex: "updatedate",
            filter: {type: "date"},
            format: 'Y-m-d H:i'
        },
        {
            text: "Category",
            dataIndex: "category",
            width: 140,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },        
        {
            text: "# of Style",
            dataIndex: "numOfStyle",
            width: 60,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Customer Name",
            dataIndex: "customername",
            width: 140,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "CC Status",
            dataIndex: "cc_status",
            width: 100,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "UPS ACCOUNT #",
            dataIndex: "cc_status",
            width: 100,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "FEDEX ACCOUNT #",
            dataIndex: "cc_status",
            width: 100,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Invoice #",
            dataIndex: "invoiceno",
            width: 100,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },        
        {
            xtype: 'datecolumn',
            text: "Invoice Date",
            width: 120,
            dataIndex: "invoicedate",
            filter: {type: "date"},
            format: 'Y-m-d'
        },
        {
            text: "Memo",
            dataIndex: "memo",
            width: 280,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "House Memo",
            dataIndex: "houseMemo",
            width: 280,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        ];
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
            var store = this.getViewModel().getStore("picktickets");
            c.setValue(store.getPageSize());
        }, this);

        b.on("select", function(e, a){
            var store = this.getViewModel().getStore("picktickets");
            store.setPageSize(e.getValue());
            store.load();
            //console.log("combo select", f)
        }, this);

        return {
            xtype: "pagingtoolbar",
            //itemId: "pagingtb",
            bind: {
                store: "{picktickets}"
            },
            //dock: "bottom",
            //displayInfo: true,
            items: ["-", b, "Per Page"]
        };
    }
});

