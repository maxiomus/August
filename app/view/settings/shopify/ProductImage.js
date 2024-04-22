Ext.define('August.view.settings.shopify.ProductImage', {
    extend: 'August.view.Viewer',

    requires: [
        'August.view.settings.shopify.ProductImageController',
        'August.view.settings.shopify.ProductImageModel',
        'August.plugin.grid.Exporter'
    ],

    alias: "widget.shopify-productimage",

    controller: 'shopify-productimage',
    viewModel: {
        type: 'shopify-productimage'
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
        actexport: 'onActExportClick',
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
                title: "Shopify Product Images",
                iconCls: "x-fa fa-tag",

                tbar: {
                    xtype: "settings-topbar",
                    reference: "topbar"
                },

                mainItems: [{
                    xtype: "grid",
                    reference: "shopify-image-grid",
                    scrollable: true,
                    flex: 2,
                    style: {
                        borderTop: '1px solid #cfcfcf',
                        borderBottom: '1px solid #cfcfcf'
                    },

                    bind: {                        
                        store: '{shopifyproductimages}'
                    },

                    listeners: {
                        
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
                            //return idx < 0 ? 'error-row-color' : 'valid-row-color';
                            return "";
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

                //bbar: me.buildBottomBar()
            }]
        });

        me.callParent(arguments);

        var g=this.lookupReference("multiview"),
            j=g.lookupReference("shopify-image-grid"),
            h=g.lookupReference("display"),
            f=g.lookupReference("topbar");

        //f.actEdit.setHidden(false);
        //f.actEdit.setDisabled(true);      
        f.actions.add.setHidden(true);
        f.actions.edit.setHidden(true);
        f.actions.copy.setHidden(true);
        f.actions.remove.setHidden(true); 
        f.actions.save.setHidden(true); 

        console.log(f);

        f.insert(0,
            [{
                xtype: "combo",               
                name: 'stores', 
                fieldLabel: 'Shopify Stores',
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
                paramName: "src"
            }]
        );        

        var mnuItems = [f.actEdit, f.actDelete, f.actRefresh,            
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

        this.relayEvents(j, ["itemcontextmenu", "afterrender", "rowdblclick"], 'grid');
        this.relayEvents(f, ["actadd", 'actedit', "actrefresh", 'actdelete', 'actexport','clearall']);
    },

    buildGridColumns: function() {
        return [{
            text: "Product ID",
            dataIndex: "product_id",
            locked: false,
            hidden: true,
            filter: {
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
            }
        },{
            text: "Src",
            dataIndex: "src",
            flex: 1,
            filter: {
                type: "string"
            },
            renderer: function (value, p, rec) {          
                //var idx = value.indexOf('_00')+3;
                //return value.substring(0, idx) + rec.get('position') + value.substring(idx + 1);
                return value;
            }
        },{
            text: "Position",
            dataIndex: "position",
            width: 60,            
            filter: {
                type: "string"
            },
            renderer: function (value, p, rec) {                
                return value;
            }
        },{
            text: "Width",
            dataIndex: "width",
            width: 100,            
            filter: {
                type: "string"
            },
            renderer: function (value, p, rec) {                
                return value;
            }
        },{
            text: "Height",
            dataIndex: "height",
            width: 100,            
            filter: {
                type: "string"
            },
            renderer: function (value, p, rec) {                
                return value;
            }
        },{
            text: "Varint IDs",
            dataIndex: "variant_ids",
            width: 180,            
            filter: {
                type: "string"
            },
            renderer: function (value, p, rec) {                
                return value;
            }
        },{
            xtype: 'datecolumn',
            text: "Created",
            dataIndex: "created_at",
            hidden: false,
            format: 'Y-m-d',            
            filter: {
                type: "date"
            }
        },
        {
            xtype: 'datecolumn',
            text: "Updated",
            dataIndex: "updated_at",
            hidden: false,
            format: 'Y-m-d',
            filter: {
                type: "date"
            }
        }]
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
                    data: [["15"], ["25"], ["50"], ["100"], ["250"]]
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
    
    
    