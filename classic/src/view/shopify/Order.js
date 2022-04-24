Ext.define('August.view.shopify.Order', {
    extend: 'August.view.Viewer',

    requires: [
        'August.view.shopify.OrderController',
        'August.view.shopify.OrderModel',
        'Ext.ux.CTemplate'
    ],

    alias: "widget.shopify-order",

    controller: 'shopify-order',
    viewModel: {
        type: 'shopify-order'
    },

    cls: "physical shadow-panel",

    header: false,
    margin: '0 0 0 4',

    listeners: {
        //actnew: 'onActNewClick',
        actedit: 'onActEditClick',
        actcopy: 'onActCopyClick',
        actdelete: 'onActDeleteClick',
        actrefresh: 'onActRefreshClick',
        clearall: 'onClearFilters',
        gridrowdblclick: 'onActEditClick',
        itemdblclick: "onActEditClick",
        griditemcontextmenu: "onItemContextMenu"
    },

    initComponent: function(){
        var me = this;

        //me.dockedItems = me.buildDockedItems();

        Ext.applyIf(me, {
            items: [{
                xtype: "multiview",
                reference: "multiview",
                title: "Shopify Orders",
                iconCls: "x-fa fa-tag",

                tbar: {
                    xtype: "topbar",
                    reference: "topbar"
                },

                mainItems: [{
                    xtype: "grid",
                    reference: "shopify-order-grid",
                    scrollable: true,
                    flex: 2,
                    style: {
                        borderTop: '1px solid #cfcfcf',
                        borderBottom: '1px solid #cfcfcf'
                    },

                    bind: {                        
                        store: '{shopifyorders}'
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

                    plugins: [{
                        ptype: "gridfilters"
                    },{
                        ptype: 'gridexporter'
                    }
                    /*
                    {
                        ptype: 'bufferedrenderer'
                    }
                    */
                    ],
                    
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
                    }
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
            j=g.lookupReference("shopify-order-grid"),
            h=g.lookupReference("display"),
            f=g.lookupReference("topbar");

        f.actEdit.setHidden(false);
        //f.actEdit.setDisabled(true);               
        
        f.insert(0,
            [{
                xtype: "combo",               
                name: 'stores', 
                fieldLabel: 'Shopify Orders',
                labelWidth: 50,
                hideLabel: true,
                valueField: "name",
                displayField: "label",
                value: "shopify",
                editable: false,
                //reference: "filterSelection",
                bind: {
                    store: "{shopifyStores}"
                },
                queryMode: 'local',
                listeners: {                    
                    change: {
                        fn: "onStoreChange",
                        scope: this.controller
                    }                    
                }
            },{
                xtype: "searchgrid",
                width: 300,
                grid: "shopify-order-grid",
                paramName: "sono"
            }]
        );

        var mnuItems = [f.actEdit, f.actDelete, f.actRefresh,
            {
                text: 'Create S.O',
                iconCls: 'x-fa fa-plus-circle',
                handler: 'onCreateSoClick',
                scope: this.controller
            },
            {
                text: "Print",
                iconCls: "x-fa fa-print",
                action: "print",
                //handler: 'onOpenLabeltagClick',
                scope: this.controller
            }];

        me.contextmenu = Ext.create("Ext.menu.Menu", {
            items: mnuItems
        });

        f.items.items[1].setHidden(false);
        f.items.items[2].setHidden(false);
        f.items.last().setHidden(true);        

        this.relayEvents(j, ["itemcontextmenu", "afterrender", "rowdblclick"], 'grid');
        this.relayEvents(f, ["actnew", 'actedit', "actrefresh", 'actdelete', "actcomplete", "actactive", "clearall"]);
    },

    buildGridColumns: function(){
        return [{
            text: "ID",
            dataIndex: "id",            
            locked: false,
            hidden: true,
            filter: {
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
            }
        },{
            text: "Order",
            dataIndex: "name",
            width: 140,
            locked: false,
            filter: {
                type: "string"
            }           
        },
        {
            text: "",
            dataIndex: "note",
            width: 40,
            filter: {
                type: 'string'
            },
            renderer: function(value, meta, rec){
                var result = "";
                if(value != null || value != ""){
                    result = Ext.String.format('<i class="far fa-comment-alt" alt="{0}"></i>', value);
                }

                return Ext.String.format('{0}', result);
            }
        },        
        {
            xtype: 'datecolumn',
            text: "Date",
            dataIndex: "created_at",
            format: 'Y-m-d',
            filter: {
                type: "date"
            }
        },
        {
            text: "Customer",
            dataIndex: "customer",
            width: 180,
            hidden: false,
            filter: {type: "string"},
            renderer: function(value, h, a){                
                return value.first_name + " " + value.last_name;
            }
        }, 
        {
            text: "Total",
            dataIndex: "total_price",
            //width: 140,
            hidden: false,
            formatter: 'usMoney',
            filter: {
                type: "number"
            }            
        },
        {
            text: "Payment Status",
            dataIndex: "financial_status",
            width: 120,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },                                  
        {
            text: "Fulfillments Status",
            dataIndex: "fulfillment_status",
            width: 140,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Items",
            dataIndex: "line_items",
            //width: 140,
            hidden: false,
            filter: {type: "number"},
            renderer: function(value, h, a){
                var postfix = value.length > 1 ? "s" : ""; 
                return Ext.String.format("{0} item{1}", value.length, postfix);
            }
        },
        {
            text: "Delivery Method",
            dataIndex: "shipping_lines",
            width: 300,
            hidden: false,
            filter: {type: "string"},
            renderer: function(value, h, a){                
                return value[0].title;
            }            
        },
        {
            xtype: 'datecolumn',
            text: "Updated",
            dataIndex: "updated_at",
            format: 'Y-m-d',
            filter: {
                type: "date"
            }
        },        
        {
            text: "Tags",
            dataIndex: "tags",
            flex: 1,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        }];
    },

    buildBottomBar: function(){
        var me = this,
            vm = me.getViewModel(),
            //linkInfo = vm.get('shopifyLink'),
            store = vm.getStore("shopifyorders"),
            combo = Ext.create("widget.combo", {
                name: "perpage",
                //reference: 'pageSizer',
                width: 76,
                store: new Ext.data.ArrayStore({
                    fields: ["id"],
                    data: [["15"], ["25"], ["50"], ["100"], ["250"], ["500"]]
                }),
                //value: "50",
                displayField: "id",
                valueField: "id",
                editable: false,
                forceSelection: true,
                matchFieldWidth: true,
                queryMode: "local"
                //triggerAction: "all",
            }),

            nextBtn = Ext.create("widget.button", {
                name: 'next',
                iconCls: 'x-fa fa-angle-right',
                disabled: true,
                handler: function(btn){
                    //console.log('nextBtn', vm.get('shopifyLink'));
                    var linkInfo = vm.get('shopifyLink'),
                        prevBtn = btn.previousSibling();

                    if(linkInfo != null && linkInfo.NextLink != null){
                        Ext.apply(store.getProxy().extraParams, {
                            page_info: linkInfo.NextLink.PageInfo,
                            limit: combo.getValue()
                        });
                    }   

                    store.load({                        
                        callback: function(recs, op, success){                            
                            vm.set('shopifyLink', op.getResponse().responseJson.LinkHeader);    
                            linkInfo = vm.get('shopifyLink');                        
                            if(linkInfo != null ){
                                btn.setDisabled(linkInfo.NextLink == null);
                                prevBtn.setDisabled(linkInfo.PreviousLink == null);
                            }
                        }
                    });
                }
            }),

            prevBtn = Ext.create("widget.button", {
                name: 'prev',
                iconCls: 'x-fa fa-angle-left',
                disabled: true,
                handler: function(btn){
                    var linkInfo = vm.get('shopifyLink'),
                        nextBtn = btn.nextSibling();

                    if(linkInfo != null && linkInfo.PreviousLink != null){
                        Ext.apply(store.getProxy().extraParams, {
                            page_info: linkInfo.PreviousLink.PageInfo,
                            limit: combo.getValue()
                        });
                    } 
                    store.load({                                            
                        callback: function(recs, op, success){                                                                                  
                            vm.set('shopifyLink', op.getResponse().responseJson.LinkHeader);
                            linkInfo = vm.get('shopifyLink');
                            if(linkInfo != null ){
                                btn.setDisabled(linkInfo.PreviousLink == null);                          
                                nextBtn.setDisabled(linkInfo.NextLink == null); 
                            }                                
                        }
                    });    
                }
            });

        combo.on('afterrender', function(c, e){            
            c.setValue(store.getPageSize());
        }, this);

        combo.on("select", function(e, a){            

            store.setPageSize(e.getValue());
            store.load({
                callback: function(recs, op, success){
                    //console.log(recs, op);
                    vm.set('shopifyLink', op.getResponse().responseJson.LinkHeader);
                }
            });
            //console.log("combo select", f)
        }, this);

        return {
            xtype: "toolbar",            
            //itemId: "pagingtb",            
            //dock: "bottom",

            items: ["-", prevBtn, nextBtn, combo, "Per Page"]
        };
    }
});


