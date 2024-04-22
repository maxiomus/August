Ext.define('August.view.shopify.Order', {
    extend: 'August.view.Viewer',

    requires: [
        'August.view.shopify.OrderController',
        'August.view.shopify.OrderModel',
        'August.plugin.grid.Exporter',
        'Ext.ux.form.field.SearchText'
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
                        ptype: 'grid-exporter'
                    }],
                    
                    viewConfig: {
                        loadMask: true,
                        //stripeRows: false,
                        trackOver: true,
                        preserveScrollOnRefresh: true,
                        preserveScrollOnReload: true,
                        deferInitialRefresh: true,
                        emptyText: '<h1 style="margin: 20px">No matching results</h1>',
                        getRowClass: function(rec, index, param, store){
                            //var note = rec.get('note');
                            //var idx = note.indexOf("N41 SO#");
                
                            //return idx < 0 ? 'error-row-color' : 'valid-row-color';
                            return "";
                        },
                        listeners: {
                            render: function(view){
                                /*
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
                                */
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

        //f.actEdit.setHidden(false);
        //f.actEdit.setDisabled(true);       
        var shopifyStores = Ext.getStore('shopifyStores');        
        
        f.insert(0,
            [{
                xtype: "combo",               
                name: 'stores', 
                fieldLabel: 'Shopify Orders',
                labelWidth: 50,
                hideLabel: true,
                valueField: "name",
                displayField: "label",
                value: "SHOPIFY",
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
                xtype: "searchtext",
                reference: 'searchtext',
                width: 480,              
                bind: {                    
                    store: '{shopifyorders}'
                },                  
            }]
        );

        f.insert(12,
            [{
                xtype: 'button',
                iconCls: 'x-fa fa-external-link-alt',
                text: 'Export',
                handler: function(b){
                    j.saveDocumentAs({
                        type: 'xlsx',
                        title: 'Shopify Order List',
                        fileName: 'SO ' + Ext.Date.format(new Date(), 'Y-m-d')
                    });
                }                
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
            text: "Order #",
            dataIndex: "name",
            width: 100,
            locked: false,
            filter: {
                type: "string"
            },
            renderer: function(v, meta, rec){             
                /*   
                var url = rec.get('order_status_url');
                var ps = rec.get('order_status_url').indexOf('.com/');
                
                var html = "<a href='{2}.com/admin/orders/{0}' target='_blank'>{1}</a>";
                return Ext.String.format(html, rec.get('id'), v, url.substring(0, ps));
                */
               return v.replace('#','');
            } 
        },
        {
            text: "N41 SO #",
            dataIndex: "note",
            width: 120,
            locked: false,
            filter: {
                type: "string"
            },
            renderer: function(v, meta, rec) {
                if(v != null) {
                    var idx = v.indexOf("N41 SO#");
                    if(idx >= 0){
                        var ws = v.indexOf("\n",idx+8);
                        var html = "<span class='green-dot'></span>&nbsp;&nbsp;<a href='#sales-order/edit/{0}'>{0}</a>";
                        meta.tdCls = '';
                        return Ext.String.format(html, v.substring(idx+7, idx+14).trim());
                    }
                }

                meta.tdCls = 'red-text';
                return "<span class='x-fas fa-exclamation-circle'></span>";
            }
        },                   
        {
            xtype: 'datecolumn',
            text: "Date",
            //dataIndex: "created_at",
            dataIndex: "createdAt",
            format: 'Y-m-d',
            filter: {
                type: "date"
            }
        },
        /*
        {
            text: "Customer",
            dataIndex: "customer",
            width: 180,
            hidden: true,
            filter: {type: "string"},
            renderer: function(value, h, a){                
                return value.first_name + " " + value.last_name;
            }
        },
        */ 
        {
            text: "Customer",
            //dataIndex: "customerName",
            dataIndex: "customer",
            width: 140,
            hidden: false,
            filter: {type: "string"},
            renderer: function(value, h, a){                                
                if(value != null) {
                    return value.displayName;
                }
                
                return '';
            }
        }, 
        {
            text: "Total",
            //dataIndex: "total_price",
            dataIndex: "totalPriceSet",
            //width: 140,
            hidden: false,
            //formatter: 'usMoney',
            filter: {
                type: "number"
            },
            renderer: function(value, h, a){                
                var xf = Ext.util.Format;
                if (value == null){
                    return '';
                }
                return xf.usMoney(value.shopMoney.amount);
            }
        },
        {
            text: "Return status",
            dataIndex: "returnStatus",
            width: 160,
            filter: {                
                type: "list",
                options: ["INSPECTION_COMPLETE",
                "IN_PROGRESS",
                "NO_RETURN",
                "RETURNED",
                "RETURN_FAILED",
                "RETURN_REQUESTED"]
            }
        },
        {
            text: "Payment Status",
            //dataIndex: "financial_status",
            dataIndex: "displayFinancialStatus",
            width: 120,
            hidden: false,
            filter: {
                type: "list",
                options: ["AUTHORIZED",
                    "EXPIRED",
                    "PAID",
                    "PARTIALLY_PAID",
                    "PARTIALLY_REFUNDED",
                    "PENDING",
                    "REFUNDED",
                    "VOIDED"]                
            },
            renderer: function(i, h, a){
                return i;
            }
        },                                  
        {
            text: "Fulfillments Status",
            //dataIndex: "fulfillment_status",
            dataIndex: "displayFulfillmentStatus",
            width: 120,
            hidden: false,
            filter: {
                type: "list",
                options: ["FULFILLED",
                    "IN_PROGRESS",
                    "ON_HOLD",
                    "OPEN",
                    "PARTIALLY_FULFILLED",
                    "PENDING_FULFILLMENT",
                    "RESTOCKED",
                    "SCHEDULED",
                    "UNFULFILLED"]
                
            },
            renderer: function(v, meta, rec) {                
                if(!Ext.isEmpty(v) && v == 'FULFILLED'){
                    meta.tdCls = '';
                    return "<span class='green-dot'></span>&nbsp;&nbsp;" + v.charAt(0) + v.slice(1).toLowerCase();
                }

                meta.tdCls = 'red-text';
                return "<span class='x-fas fa-exclamation-circle'></span>&nbsp;&nbsp;" + v.charAt(0) + v.slice(1).toLowerCase();
            }
        },
        /*
        {
            text: "Items",
            dataIndex: "line_items",
            //width: 140,
            hidden: true,
            filter: {type: "number"},
            renderer: function(value, h, a){
                var postfix = value.length > 1 ? "s" : ""; 
                return Ext.String.format("{0} item{1}", value.length, postfix);
            }
        },
        */
        {
            text: "Items",
            //dataIndex: "itemsCount",
            dataIndex: "currentSubtotalLineItemsQuantity",
            //width: 140,
            hidden: false,
            filter: {type: "number"},
            renderer: function(value, h, a){
                var postfix = value > 1 ? "s" : ""; 
                return Ext.String.format("{0} item{1}", value, postfix);
            }
        },        
        {
            text: "Delivery Status",
            dataIndex: "fulfillments",            
            width: 180,            
            filter: {type: "string"},
            renderer: function(value, h, a){                
                return value;
            }            
        },        
        {
            text: "Delivery Method",
            //dataIndex: "deliveryMethod",            
            dataIndex: "shippingLine",
            width: 140,            
            filter: {type: "string"},
            renderer: function(value, h, a){         
                if(value == null) {
                    return '';
                }
                return value;
            }            
        },
        {
            xtype: 'datecolumn',
            text: "Updated",
            dataIndex: "updated_at",
            hidden: true,
            format: 'Y-m-d',
            filter: {
                type: "date"
            }
        },        
        {
            text: "Tags",
            dataIndex: "tags",
            width: 300,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },{
            text: "Note Attributes",
            //dataIndex: "note_modified",
            dataIndex: "customAttributes",
            flex: 1,
            filter: {
                type: 'string'
            },
            renderer: function(value, meta, rec){
                /*
                var result = "";
                if(value != null || value != ""){
                    result = Ext.String.format('<i class="far fa-comment-alt" alt="{0}"></i>', value);
                }

                return Ext.String.format('{0}', result);
                */
               return value;
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
                    data: [["15"], ["25"], ["50"], ["100"], ["200"]]
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

                    if(linkInfo != null && linkInfo.hasNextPage == true){
                        store.getProxy().extraParams = {
                            //page_info: linkInfo.NextLink.PageInfo
                            page_info: linkInfo.endCursor,
                            limit: combo.getValue()
                        };
                    }   

                    store.load({                        
                        callback: function(recs, op, success){                            
                            //vm.set('shopifyLink', op.getResponse().responseJson.LinkHeader);    
                            vm.set('shopifyLink', op.getResponse().responseJson.pageInfo);    
                            linkInfo = vm.get('shopifyLink');                        
                            if(linkInfo != null ){
                                //btn.setDisabled(linkInfo.NextLink == null);
                                //prevBtn.setDisabled(linkInfo.PreviousLink == null);
                                btn.setDisabled(!linkInfo.hasNextPage);
                                prevBtn.setDisabled(!linkInfo.hasPreviousPage);
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

                    if(linkInfo != null && linkInfo.hasPreviousPage == true){
                        store.getProxy().extraParams = {
                            //page_info: linkInfo.PreviousLink.PageInfo,
                            page_info: linkInfo.startCursor,
                            ordinal: 'last',
                            limit: combo.getValue()
                        };
                    } 
                    store.load({                                            
                        callback: function(recs, op, success){                                                                                  
                            //vm.set('shopifyLink', op.getResponse().responseJson.LinkHeader);
                            vm.set('shopifyLink', op.getResponse().responseJson.pageInfo);
                            linkInfo = vm.get('shopifyLink');
                            if(linkInfo != null ){
                                //btn.setDisabled(linkInfo.PreviousLink == null);                          
                                //nextBtn.setDisabled(linkInfo.NextLink == null); 
                                btn.setDisabled(!linkInfo.hasPreviousPage);                          
                                nextBtn.setDisabled(!linkInfo.hasNextPage); 
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
                    console.log('seelct', op.getResponse());
                    //vm.set('shopifyLink', op.getResponse().responseJson.LinkHeader);
                    vm.set('shopifyLink', op.getResponse().responseJson.pageInfo);
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


