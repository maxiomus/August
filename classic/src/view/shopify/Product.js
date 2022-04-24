Ext.define('August.view.shopify.Product', {
    extend: 'August.view.Viewer',

    requires: [
        'August.view.shopify.ProductController',
        'August.view.shopify.ProductModel',
        'August.plugin.grid.Exporter',
        'Ext.ux.CTemplate'
    ],

    alias: "widget.shopify-product",

    controller: 'shopify-product',
    viewModel: {
        type: 'shopify-product'
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
        //rowdblclick: 'onActEditClick',
        //itemdblclick: "onActEditClick",
        itemcontextmenu: "onItemContextMenu"
    },

    initComponent: function(){
        var me = this;

        //me.dockedItems = me.buildDockedItems();

        Ext.applyIf(me, {
            items: [{
                xtype: "multiview",
                reference: "multiview",
                title: "Shopify Stores",
                iconCls: "x-fa fa-store",

                tbar: {
                    xtype: "topbar",
                    reference: "topbar"
                },

                mainItems: [{
                    xtype: "grid",
                    reference: "shopify-product-grid",
                    scrollable: true,
                    flex: 2,
                    style: {
                        borderTop: '1px solid #cfcfcf',
                        borderBottom: '1px solid #cfcfcf'
                    },

                    bind: {
                        store: '{shopifyproducts}'
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
                        ptype: 'rowediting',
                        clicksToEdit: 2,
                        clicksToMoveEditor: 1,
                        autoCancel: false
                    },{
                        ptype: "gridfilters"
                    },{
                        ptype: 'grid-exporter'
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
            j=g.lookupReference("shopify-product-grid"),
            h=g.lookupReference("display"),
            f=g.lookupReference("topbar");                    
        
        var segmented = f.lookupReference('viewselection');
        segmented.items.items[1].setHidden(true);
        segmented.setValue(0);

        f.actEdit.setHidden(false);
        f.actEdit.setDisabled(true);               
                
        f.insert(0,
            [{
                xtype: "combo",               
                name: 'sites', 
                fieldLabel: 'Shopify Stores',
                //labelWidth: 30,
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
            }]
        );

        f.insert(12,
            [{
                xtype: 'button',
                iconCls: 'x-fa fa-tag',
                text: 'Update Photos',
                action: 'updatephotos',
                handler: 'onUpdatePhotoClick',
                scope: me.controller
            },{
                xtype: 'button',
                iconCls: 'x-fa fa-external-link-alt',
                text: 'Export',
                handler: function(b){
                    j.saveDocumentAs({
                        type: 'xlsx',
                        title: 'Shopify Style List',
                        fileName: 'Shopify Product' + Ext.Date.format(new Date(), 'Y-m-d')
                    });
                }
            }]
        );

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

        f.items.items[1].setHidden(false);
        f.items.items[2].setHidden(false);
        f.items.last().setHidden(true);        

        
        this.relayEvents(f, ["actnew", 'actedit', "actrefresh", 'actdelete', "actcomplete", "actactive", "clearall"]);
        this.relayEvents(j, ["itemcontextmenu", "afterrender", "rowdblclick"]);        
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
            text: "Product Title",
            dataIndex: "title",
            width: 180,
            locked: false,
            filter: {
                type: "string"
            },
            renderer: function (value, p, rec) {
                var tpl = '<div style="">{0}</div><span class="file"><img style="vertical-align: middle;width:64px;margin:4px 0 4px 0;" src={1} /></span><div>{2} Photo(s)</div>';

                //var xf = Ext.util.Format;                
                var images = rec.images();
                //console.log(images, images.count(), Ext.isEmpty(images));
                if (!Ext.isEmpty(rec) && images.getCount() != 0) {                    
                    //metadata.tdAttr = 'data-qtip="' + Ext.String.format(tpl, value, "?w=264&h=288", record.data.BODYIMG) + '"';
                    //var tmp = '<img src="../DLIB/BLU-ILLUSTRATIONS/{0}.jpg?w=264&h=288" />';
                    //metadata.tdAttr = 'data-qtip="' + Ext.String.format(tmp, value) + '"';
                    //return Ext.String.format(tpl, encodeURIComponent(images.first().data.src));
                    return Ext.String.format(tpl, value, images.first().data.src, images.getCount());
                }

                return value;
            }
        },     
        {
            text: "Handle",
            dataIndex: "handle",
            //width: 100,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },        
        {
            text: "Status",
            dataIndex: "status",
            //width: 100,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Vendor",
            dataIndex: "vendor",
            width: 160,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },    
        {
            text: "Type",
            dataIndex: "product_type",
            width: 140,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },   
        {
            xtype: 'datecolumn',
            text: "Created",
            dataIndex: "created_at",
            hidden: true,
            format: 'Y-m-d',            
            filter: {
                type: "date"
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
            xtype: 'datecolumn',
            text: "Published",
            dataIndex: "published_at",
            format: 'Y-m-d',
            filter: {
                type: "date"
            }
        },
        {
            text: "Tags",
            dataIndex: "tags",
            width: 200,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            },
            editor: {
                // defaults to textfield if no xtype is supplied
                xtype: 'textfield'                
            }
        },
        {
            text: "Description",
            dataIndex: "body_html",
            flex: 1,            
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            },
            editor: {            
                xtype: 'htmleditor',
                enableColors: false,
                enableAlignments: false                
            }
        },
        {
            text: "Template Suffix",
            dataIndex: "template_suffix",
            width: 140,
            hidden: true,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            text: "Published Scope",
            dataIndex: "published_scope",
            width: 80,
            hidden: true,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },        
        {
            text: "Inventory",
            dataIndex: "",
            width: 140,
            hidden: false,
            filter: {type: "number"}
        }];
    },

    buildBottomBar: function(){
        var me = this,
            vm = me.getViewModel(),
            //linkInfo = vm.get('shopifyLink'),
            store = vm.getStore("shopifyproducts"),
            combo = Ext.create("widget.combo", {
                name: "perpage",
                //reference: 'pageSizer',
                width: 76,
                store: new Ext.data.ArrayStore({
                    fields: ["id"],
                    data: [["15"], ["25"], ["50"], ["100"], ["250"], ["500"]]
                }),
                value: "250",
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

