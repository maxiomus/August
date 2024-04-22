Ext.define('August.view.shopify.Product', {
    extend: 'August.view.Viewer',

    requires: [
        'August.view.shopify.ProductController',
        'August.view.shopify.ProductModel',
        'August.plugin.grid.Exporter'
        //'Ext.ux.CTemplate'
    ],

    alias: "widget.shopify-product",

    controller: 'shopify-product',
    viewModel: {
        type: 'shopify-product'
    },

    cls: "shopify shadow-panel",

    header: false,
    margin: '2 0 0 4',

    listeners: {
        //actnew: 'onActNewClick',
        //actedit: 'onActEditClick',
        //actcopy: 'onActCopyClick',
        //actdelete: 'onActDeleteClick',
        actrefresh: 'onActRefreshClick',
        actaddphoto: 'onActAddPhotoClick',
        actaddvariants: 'onAddVariantsClick',
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
                title: "Shopify Products",
                iconCls: "x-fa fa-store",

                tbar: {
                    xtype: "topbar",
                    reference: "topbar"
                },

                mainItems: [{
                    xtype: "grid",
                    reference: "shopifyProductGrid",
                    
                    cls: 'shopify-product-grid',

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
                        },
                        selectionchange: {
                            fn: 'onSelectionChange',
                            scope: this.controller
                        }
                    },

                    columns: me.buildGridColumns(),

                    selModel: {
                        type: 'checkboxmodel',
                        mode: 'MULTI',
                        
                        enableKeyNav: true,
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
                        //loadMask: true,
                        //stripeRows: true,
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
                                            /*
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
                                            */
                                        }
                                    }
                                });
                            }
                        }
                    }
                }],

                displayItems: [{
                    xtype: "shopify-productdetail",
                    reference: "shopify-product-detail",                    
                    margin: '2 0 0 0',
                    flex: 1,
                    items: [{
                        xtype: "grid",
                        
                        reference: 'shopifyVariantGrid',
                        title: "Product Variants",
                        iconCls: "x-fa fa-line-columns",                                

                        scrollable: true,
                        
                        style: {
                            //borderTop: '1px solid #cfcfcf',
                            //borderBottom: '1px solid #cfcfcf'
                        },
        
                        bind: {
                            store: '{shopifyProductGrid.selection.variants}'
                            //store: '{shopifyproductvariants}'
                        },
        
                        listeners: {                                                                          
                            select: {
                                fn: 'onSelect'
                                //scope: this.controller
                            }
                        },
        
                        columns: me.buildVariantGridColumns(),
        
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
                        }],
                        
                        viewConfig: {
                            //loadMask: true,
                            //stripeRows: true,
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
                                    
                                }
                            }
                        }
                    },{
                        xtype: "grid",
                        
                        reference: 'shopifyImageGrid',
                        title: "Product Images",
                        iconCls: "x-fa fa-line-columns",                                

                        scrollable: true,
                        
                        style: {
                            //borderTop: '1px solid #cfcfcf',
                            //borderBottom: '1px solid #cfcfcf'
                        },
        
                        bind: {
                            store: '{shopifyProductGrid.selection.images}'
                        },                                
        
                        columns: me.buildImageGridColumns(),
        
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
                        }],
                        
                        viewConfig: {
                            //loadMask: true,
                            //stripeRows: true,
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
                                    /*
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
                    }]
                }],

                bbar: me.buildBottomBar()
            }]
        });

        me.callParent(arguments);

        var g = me.lookupReference("multiview"),
            j = g.lookupReference("shopifyProductGrid"),            
            h = g.lookupReference("display"),
            f = g.lookupReference("topbar");                    
        
        var segmented = f.lookupReference('viewselection');        
        //segmented.items.items[1].setHidden(true);
        //segmented.setValue(0);
                            
                
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
            },{
                xtype: "searchtext",
                reference: 'searchtext',
                width: 480,              
                bind: {                    
                    store: '{shopifyproducts}'
                },                  
            }]
        );

        f.insert(12,
            [{
                xtype: 'button',
                iconCls: 'x-fa fa-sync',
                text: 'Sync',
                tooltip: 'Sync with N41 Inventories',
                action: 'sync',
                handler: 'onSyncClick',
                scope: me.controller
            },{
                xtype: 'button',
                iconCls: 'x-fa fa-sync',
                text: 'Add Variants',
                tooltip: 'Add Variants with N41 Styles',
                action: 'addVariant',        
                bind: {
                    disabled: '{!shopifyProductGrid.selection}'
                },
                handler: 'onAddVariantsClick',
                scope: me.controller
            },{
                xtype: 'button',
                iconCls: 'x-fa fa-camera',
                text: 'Add Photos',
                tooltip: ' Upload Photos',
                action: 'addPhoto',
                bind: {
                    disabled: '{!shopifyProductGrid.selection}'
                },
                //handler: 'onUploadPhotoClick',
                handler: 'onActAddPhotoClick',
                scope: me.controller
            },{
                xtype: 'button',
                iconCls: 'x-fa fa-external-link-alt',
                tooltip: 'Export Shopify Style List',
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
                text: "Add Photos",
                iconCls: "x-fa fa-camera",
                action: "actaddphoto",
                handler: function(item, e){                                      
                    me.fireEvent('actaddphoto', item, me);
                }
            },
            {
                text: "Add Variants",
                iconCls: "x-fa fa-camera",
                action: "actaddvariants",
                handler: function(item, e){                                      
                    me.fireEvent('actaddvariants', item, me);
                }
            },
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
        //f.items.items[2].setHidden(false);
        //f.items.last().setHidden(true);        
        
        me.relayEvents(f, ["actnew", 'actedit', "actrefresh", 'actdelete', 'actaddphoto', 'actaddvariants', "clearall"]);
        me.relayEvents(j, ["itemcontextmenu", "afterrender", "rowdblclick"]);        
    },

    buildGridColumns: function(){
        return [{
            text: "ID",
            dataIndex: "id",
            locked: false,
            hidden: true,
            filter: {
                type: "string"
            },
            renderer: function(f, e, a){
                return f;
            }
        },{
            text: "Product Title",
            dataIndex: "title",
            width: 300,            
            filter: {
                type: "string"
            },
            renderer: function (value, p, rec) {
                
                var noImg = '<svg viewBox="0 0 25 25" focusable="false" aria-hidden="true" style="margin: 10px 0 0 7px;filter: invert(42%) sepia(93%) saturate(1352%) hue-rotate(204deg) brightness(119%) contrast(119%)"><path d="M2.5 1a1.5 1.5 0 0 0-1.5 1.5v15a1.5 1.5 0 0 0 1.5 1.5h15a1.5 1.5 0 0 0 1.5-1.5v-15a1.5 1.5 0 0 0-1.5-1.5h-15zm5 3.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm8.999 12.5h-13.002c-.41 0-.64-.46-.4-.79l3.553-4.051c.19-.21.52-.21.72-.01l1.63 1.851 3.06-4.781a.5.5 0 0 1 .84.02l4.039 7.011c.18.34-.06.75-.44.75z"></path></svg>',
                    tpl = '<div class="thumb-wrap">' + 
                            '<div class="thumb">' + 
                                '{0}' +
                            '</div>' +                            
                          '</div>' + 
                          '<div>{1}</div>' + 
                          '<div>{2} Photo(s)</div>';                                                                            

                var image = rec.get('image');
                //var images = rec.images();                                                
                //console.log(images, images.count(), Ext.isEmpty(images));                

                if (!Ext.isEmpty(rec) && !Ext.isEmpty(image)) {                    
                    var xf = Ext.util.Format,                        
                        imgSrc = image.url,
                        imgName = imgSrc.substring(0, imgSrc.lastIndexOf('.')),
                        imgExt = imgSrc.substring(imgSrc.lastIndexOf('.'));

                    //metadata.tdAttr = 'data-qtip="' + Ext.String.format(tpl, value, "?w=264&h=288", record.data.BODYIMG) + '"';
                    //var tmp = '<img src="../DLIB/BLU-ILLUSTRATIONS/{0}.jpg?w=264&h=288" />';
                    //metadata.tdAttr = 'data-qtip="' + Ext.String.format(tmp, value) + '"';
                    //return Ext.String.format(tpl, encodeURIComponent(images.first().data.src));
                    
                    return Ext.String.format(tpl, xf.format('<img style="vertical-align:bottom;margin-left:4px;width:36px;" src={0} />', imgName+"_40x40@3x"+imgExt), value, rec.get('mediaCount'));
                }                

                return Ext.String.format(tpl, noImg, value, rec.get('mediaCount'));
                               
            }
        },
        {
            text: "Handle",
            dataIndex: "handle",
            width: 200,
            hidden: true,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },     
        {
            text: "Style #",
            dataIndex: "handle",
            width: 120,            
            filter: {type: "string"},
            renderer: function(v, p, rec){
                
                var variant = rec.get('variant');

                if(!Ext.isEmpty(rec) && !Ext.isEmpty(variant)){
                    var sku = variant.sku.split('-');

                    //return v.split("-").pop().toUpperCase();
                    return sku[0].toUpperCase();

                }
                
                return v;
            }
        },             
        {
            text: "Variant Colors",
            dataIndex: "options",
            width: 300,            
            filter: {type: "string"},
            renderer: function(value, p, rec){

                var colors = value[0].values;

                if(!Ext.isEmpty(rec) && !Ext.isEmpty(colors)){
                    
                    return colors.join();
                }

                return;
            }
        },                
        {
            text: "Status",
            dataIndex: "status",
            //width: 100,            
            filter: {type: "string"},
            renderer: function(i, h, a){
                return Ext.String.capitalize(i);
            }
        },
        {
            text: "Vendor",
            dataIndex: "vendor",
            width: 160,            
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },    
        {
            text: "Type",
            dataIndex: "productType",
            width: 140,            
            filter: {type: "string"},
            renderer: function(i, h, a){
                return i;
            }
        },   
        {
            xtype: 'datecolumn',
            text: "Created",
            dataIndex: "createdAt",
            hidden: true,
            format: 'Y-m-d',            
            filter: {
                type: "date"
            }
        },
        {
            xtype: 'datecolumn',
            text: "Updated",
            dataIndex: "updatedAt",
            hidden: true,
            format: 'Y-m-d',
            filter: {
                type: "date"
            }
        },
        {
            xtype: 'datecolumn',
            text: "Published",
            dataIndex: "publishedAt",
            format: 'Y-m-d',
            filter: {
                type: "date"
            }
        },
        {
            text: "Tags",
            dataIndex: "tags",
            width: 300,
            flex: 1,            
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
            dataIndex: "descriptionHtml",
            flex: 1,            
            hidden: true,
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
        /*
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
        */
        {
            text: "Inventory",
            dataIndex: "totalInventory",
            width: 140,
            hidden: false,
            filter: {type: "number"}
        }];
    },

    buildBottomBar: function(){
        var me = this,
            vm = me.getViewModel(),
            //linkInfo = vm.get('shopifyLink'),
            store = vm.getStore("shopifyproducts");
        
            combo = Ext.create("widget.combo", {
                name: "perpage",
                //reference: 'pageSizer',
                width: 76,
                store: new Ext.data.ArrayStore({
                    fields: ["id"],
                    data: [["15"], ["25"], ["50"], ["100"], ["200"]]
                }),
                //value: "250",
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

                if(linkInfo != null && linkInfo.hasNextPage != null){
                    store.getProxy().extraParams = {
                        //page_info: linkInfo.NextLink.PageInfo,
                        page_info: linkInfo.endCursor,
                        limit: combo.getValue()
                    };
                }   

                store.load({                        
                    callback: function(recs, op, success){                            
                        //vm.set('shopifyLink', op.getResponse().responseJson.LinkHeader);    
                        console.log(op.getResponse().responseJson);
                        vm.set('shopifyLink', op.getResponse().responseJson.pageInfo);   
                        linkInfo = vm.get('shopifyLink');                        
                        if(linkInfo != null ){
                            //btn.setDisabled(linkInfo.NextLink == null);
                            //prevBtn.setDisabled(linkInfo.PreviousLink == null);
                            btn.setDisabled(linkInfo == null || !linkInfo.hasNextPage);
                            prevBtn.setDisabled(linkInfo == null || !linkInfo.hasPreviousPage);
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

                if(linkInfo != null && linkInfo.hasPreviousPage != null){
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
                        console.log(op.getResponse().responseJson);
                        vm.set('shopifyLink', op.getResponse().responseJson.pageInfo);
                        
                        linkInfo = vm.get('shopifyLink');
                        if(linkInfo != null ){
                            //btn.setDisabled(linkInfo.PreviousLink == null);                          
                            //nextBtn.setDisabled(linkInfo.NextLink == null); 
                            btn.setDisabled(linkInfo == null || !linkInfo.hasPreviousPage);                          
                            nextBtn.setDisabled(linkInfo == null || !linkInfo.hasNextPage); 
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
                    //vm.set('shopifyLink', op.getResponse().responseJson.LinkHeader);
                    vm.set('shopifyLink', op.getResponse().responseJson.pageInfo);
                }
            });
            //console.log("combo select", f)
        }, this);
        
        /*
        return {
            xtype: "toolbar",
            dock: 'bottom',

            items: ['Total:', ' ', { xtype: 'tbtext' }, '->']
            
        };
        */

        return {
            xtype: "toolbar",            
            //itemId: "pagingtb",            
            //dock: "bottom",

            items: ["-", prevBtn, nextBtn, combo, "Per Page"]
        };        
    },

    buildImageGridColumns: function() {
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
            width: 320,            
            filter: {
                type: "string"
            },
            renderer: function (value, p, rec) {                      
                var html = "<a href='{0}' target='_blank'>{1}</a>";
                //value.split('/').pop()

                return Ext.String.format(html, value, value);
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
    
    buildVariantGridColumns: function() {
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
            text: "Title",
            dataIndex: "title",
            width: 180,  
            hidden: true,          
            filter: {
                type: "string"
            },
            renderer: function (value, p, rec) {                
                return value;
            }
        },{
            text: "Color",
            dataIndex: "option1",
            width: 140,            
            filter: {
                type: "string"
            },
            renderer: function (value, p, rec) {                
                return value;
            }
        },{
            text: "Size",
            dataIndex: "option2",
            width: 80,            
            filter: {
                type: "string"
            },
            renderer: function (value, p, rec) {                
                return value;
            }
        },
        {
            text: "Position",
            dataIndex: "position",
            width: 60,
            //filter: {type: "number"},
            renderer: function(value, p, rec){
                return value;
            }
        }, 
        {
            text: "Price",
            dataIndex: "price",
            width: 100,
            //filter: {type: "number"},
            renderer: Ext.util.Format.usMoney
        },   
        {
            text: "Compare at price",
            dataIndex: "compareAtPrice",
            width: 100,
            //filter: {type: "number"},
            renderer: Ext.util.Format.usMoney
        },  
        /*
        {
            text: "Cost per items",
            dataIndex: "cost",
            width: 100,
            hidden: true,
            //filter: {type: "number"},
            renderer: Ext.util.Format.usMoney
        },
        */  
        {
            xtype: 'checkcolumn',
            text: "Charges taxes",
            dataIndex: "taxable",
            width: 60,
            //filter: {type: "number"}            
        },
        {
            text: "SKU",
            dataIndex: "sku",
            width: 220,
            filter: {type: "string"},
            renderer: function(v, p, rec){                                

                return v;
            }
        }, 
        {
            text: "Barcode",
            dataIndex: "barcode",
            width: 200,
            hidden: false,
            filter: {type: "string"},
            renderer: function(value, p, rec){                

                return value;
            }
        },     
        {
            xtype: 'numbercolumn',
            text: "Inventory Quantity",
            dataIndex: "inventoryQuantity",
            //width: 100,
            hidden: false,
            filter: {type: "number"},
            renderer: function(i, h, a){
                return i;
            }
        },  
        {
            xtype: 'numbercolumn',
            text: "Weight",
            dataIndex: "weight",
            //width: 100,
            format: '0.00',
            filter: {type: "number"},
            renderer: function(i, h, a){
                return i;
            }
        },
        /*
        {
            xtype: 'checkcolumn',
            text: "Requires shipping",
            dataIndex: "requires_shipping",
            width: 60
            //filter: {type: "string"},            
        },
        */              
        {
            xtype: 'datecolumn',
            text: "Created",
            dataIndex: "createdAt",            
            format: 'Y-m-d',            
            filter: {
                type: "date"
            }
        },
        {
            xtype: 'datecolumn',
            text: "Updated",
            dataIndex: "updatedAt",            
            format: 'Y-m-d',
            filter: {
                type: "date"
            }
        }]
    }
});

