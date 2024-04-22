Ext.define("August.view.production.style.Product", {
    extend: 'August.view.Viewer',

    requires: [
        'August.view.production.style.ProductController',
        'August.view.production.style.ProductModel',
        //'August.view.production.style.Grid',
        'August.view.production.style.View',
        'August.view.production.TopBar',
        'August.view.production.style.edit.Form',
        'August.view.production.windows.style.Upload',
        'August.view.production.windows.style.Labeltag',
        'August.view.production.windows.style.StyleCopy',
        'August.view.production.windows.style.Template',
        'August.view.production.windows.style.Export',
        'August.view.production.windows.style.ColorMapping',
        'August.plugin.grid.Exporter',
        //'Ext.grid.plugin.Exporter',
        'Ext.grid.filters.Filters'
        //'August.view.production.sample.LineSheet',
        //'August.store.StyleColors'
    ],

    alias: "widget.product",

    controller: "product",
    viewModel: {
        type: "product"
    },

    cls: "sample shadow-panel",

    header: false,
    margin: '0 0 0 4',

    //session: true,

    listeners: {
        actnew: 'onActNewClick',
        actedit: 'onActEditClick',
        actcopy: 'onActCopyClick',
        actdelete: 'onActDeleteClick',
        actrefresh: 'onActRefreshClick',
        clearall: 'onClearFilters',
        rowdblclick: 'onActEditClick',
        itemdblclick: "onActEditClick",
        itemcontextmenu: "onItemContextMenu"
    },

    initComponent: function(){
        var me = this;

        //me.dockedItems = me.buildDockedItems();

        Ext.applyIf(me, {
            items: [{
                xtype: "multiview",
                reference: "multiview",
                title: "Style Product",
                iconCls: "x-fab fa-product-hunt",

                closable: false,

                tbar: {
                    xtype: "production-topbar",
                    reference: "topbar"
                },

                mainItems: [{
                    xtype: "grid",
                    reference: "grid",
                    //scrollable: 'y',
                    stateful:true,
                    stateId: "product-grid",
                    //stateEvents: ["columnmove", "columnresize", "groupchange", "bodyresize"],
                    style: {
                        borderTop: '1px solid #cfcfcf',
                        borderBottom: '1px solid #cfcfcf'
                    },
                    //publishes: ["selectedProduct"],                                                                                        
                    bind: {
                        store: "{products}"
                        //selection: "{selectedProduct}"
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

                    columns: me.buildColumns(),

                    selModel: {
                        //type: 'checkboxmodel',              
                        pruneRemoved: false
                    },
                
                    viewConfig: {
                        //loadingHeight: 100,
                        //stripeRows: true,
                        trackOver: true,
                        //enableTextSelection: false,
                
                        preserveScrollOnRefresh: true,
                        preserveScrollOnReload: true,
                        deferInitialRefresh: true,
                        deferEmptyText: true,
                        emptyText: '<h1 style="margin: 20px">No matching results</h1>',
                        getRowClass: function(a, g, f, h){
                            //return "custom-row-style";
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
                
                                                
                                                //tip.update(view.getRecord(tip.triggerElement).get('BODYIMG'));
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
                },{

                },{
                    xtype: 'style-view',
                    reference: "tiles",

                    region: 'center',
                    flex: 1,
                    /*
                    selectionModel: {
                        mode: 'MULTI'
                    },
                    */
                    bind: {
                        store: "{products}"
                        //selection: "{selectedProduct}"
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
                    }
                }],

                displayItems: [{
                    xtype: "productdetail",
                    reference: "product-detail",                    
                    margin: '2 0 0 0',
                    flex: 1,
                    items: [{
                        xtype: 'dataview',
                        title: 'Product Images',                        
                        //plain: true,                        
                        scrollable: true,                                
        
                        cls: 'sample-photo-view',
                        //overItemCls: "x-item-over",
                        itemSelector: "div.thumb-wrap",
        
                        preserveScrollOnRefresh: true,
                        deferInitialRefresh: true,
                        enableTextSelection: false,
        
                        scrollable: true,
                        //width: 260,                                                
                        
                        style: {
                            border: '1px solid #cfcfcf'
                        },
        
                        padding: '7 0 7 7',                
        
                        bind: {
                            store: '{photos}'
                        },
        
                        tpl: this.photoTemplate(),
                        
                        listeners: {
                            refresh: {
                                //fn: 'onPhotoRefresh',
                                //controller: this.controller
                            }
                        }
                    }]
                }],

                bbar: me.buildBottomBar()
            }]
        });

        me.callParent(arguments);

        var g=this.lookupReference("multiview"),
            j=g.lookupReference("grid"),
            k=g.lookupReference('tiles'),
            //m=g.lookupReference('list'),
            h=g.lookupReference("display"),
            f=g.lookupReference("topbar");

        var segmented = f.lookupReference('viewselection');
        segmented.items.items[1].setHidden(true);
        segmented.setValue(0);

        f.insert(6, [
            f.actCopy
        ]);

        f.actCopy.setHidden(false);
        f.actCopy.setDisabled(true);

        f.insert(15,
            [{
                xtype: 'button',
                iconCls: 'x-fa fa-file',
                text: 'Upload',
                bind: {
                    disabled: '{!grid.selection}'
                },
                action: 'upload',
                handler: 'onOpenUploadClick',
                scope: me.controller
            },{
                xtype: 'button',
                iconCls: 'x-fa fa-map-signs',
                text: 'Color Map',
                action: 'mapping',
                handler: 'onOpenMappingClick',
                scope: me.controller
            },{
                xtype: 'button',
                iconCls: 'x-fa fa-file-export',
                text: 'Template',
                action: 'template',
                handler: 'onOpenTemplateClick',
                scope: me.controller
            },{
                xtype: 'button',
                iconCls: 'x-fa fa-tag',
                text: 'Publish',
                bind: {
                    disabled: '{!grid.selection}'
                },
                action: 'webexport',
                handler: 'onOpenPublishClick',
                scope: me.controller
            },{
                xtype: 'button',
                iconCls: 'x-fa fa-external-link-alt',
                text: 'Export',
                handler: function(b){
                    j.saveDocumentAs({
                        type: 'xlsx',
                        title: 'Product Style List',
                        fileName: 'Style Product' + Ext.Date.format(new Date(), 'Y-m-d')
                    });
                }
            }]
        );

        var mnuItems = [f.actEdit, f.actCopy, f.actDelete, f.actRefresh,            
            {
                text: "Product Publish",
                iconCls: "x-fa fa-tag",
                action: "webexport",
                handler: 'onOpenPublishClick',
                scope: this.controller
            },            
            {
                text: "File Upload",
                iconCls: "x-fa fa-upload",
                action: "upload",
                handler: 'onOpenUploadClick',
                scope: this.controller
            }];

        me.contextmenu = Ext.create("Ext.menu.Menu", {
            items: mnuItems
        });

        this.relayEvents(f, ["actnew", 'actedit', "actcopy", "actrefresh", 'actdelete', "actcomplete", "actactive", "clearall"]);
        this.relayEvents(j, ["itemcontextmenu", "rowdblclick"]);
        this.relayEvents(k, ["itemcontextmenu", "itemdblclick"]);
    },

    buildColumns: function() {
        return [{
            header: "ID",
            dataIndex: "id",
            width: 140,
            //locked: false,
            hidden: true,
            filter: {                    
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
            }
        },{
            header: "Style",
            dataIndex: "style",
            width: 140,
            //locked: false,
            filter: {
                operator: 'st',
                type: "string"
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            header: "Color",
            dataIndex: "color",
            width: 140,
            filter: {
                operator: 'st',
                type: "string"
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            header: "Description",
            dataIndex: "descript",
            width: 260,
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
            width: 140,            
            filter: {
                operator: 'st',
                type: "string"
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        /*
        {
            header: "Category",
            dataIndex: "category",
            width: 200,
            filter: {
                operator: 'st',
                type: "string"
            },
            renderer: function(i, h, a){
                var k=Ext.util.Format;
                if(!Ext.isEmpty(i)){
                    var l=i.split("(#)"),
                    j=k.capitalize(l[0]+" / "+l[1]);
                    //h.tdAttr='data-qtip="'+j+'"';
                    return j;
                }
            }
        },
        */
        {
            xtype: 'datecolumn',
            text: "Start S. Date",
            dataIndex: "startSellDate",
            format: 'Y-m-d',
            filter: {
                type: "date",
                dateFormat: 'C'
            }
            /*
            renderer: function(k, i, a){
                if(k!=undefined){
                    var d=new Date(k),
                    j = function(c){
                        return c<10 ? "0"+c : c;
                    };
                    var l = j(d.getUTCMonth()+1)+"-"+j(d.getUTCDate())+"-"+d.getUTCFullYear();
                    i.tdAttr='data-qtip="'+l+'"';
                    return l;
                }
            }
            */
        },
        {
            xtype: 'datecolumn',
            text: "Avail. Date",
            dataIndex: "availableDate",
            format: 'Y-m-d',
            filter: {
                type: "date",
                dateFormat: 'C'
            }
            /*
            renderer: function(k, i, a){
                if(k!=undefined){
                    var d=new Date(k),
                    j = function(c){
                        return c<10 ? "0"+c : c;
                    };
                    var l = j(d.getUTCMonth()+1)+"-"+j(d.getUTCDate())+"-"+d.getUTCFullYear();
                    i.tdAttr='data-qtip="'+l+'"';
                    return l;
                }
            }
            */
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
            header: "Division",
            dataIndex: "division",
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
            header: "Designer",
            dataIndex: "designer",
            width: 140,            
            filter: {
                operator: 'st',
                type: "string"
            },
            renderer: function(f, e, a){
                return f;
            }
        },  
        {
            header: "O.H Qty",
            dataIndex: "ohs",                
            hidden: false,
            filter: {
                type: 'number'
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            header: "ATS",
            dataIndex: "ats",
            locked: false,
            hidden: true,
            filter: {
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            header: "OTS",
            dataIndex: "ots",
            locked: false,
            hidden: true,
            filter: {
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
            }
        },            
        {
            header: "P.O Qty",
            dataIndex: "pos",
            locked: false,
            filter: {
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            header: "S.O Qty",
            dataIndex: "orders",
            locked: false,
            filter: {
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            header: "Pick Qty",
            dataIndex: "picks",
            locked: false,
            filter: {
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            header: "Ship Qty",
            dataIndex: "ships",
            locked: false,
            filter: {
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            header: "Received Qty",
            dataIndex: "receivedQty",
            locked: false,
            hidden: false,
            filter: {
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            header: "Total Inv. Qty",
            dataIndex: "total_inv_qty",
            locked: false,
            hidden: false,
            filter: {
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            header: "Prod. Cat",
            dataIndex: "impCat",
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
            header: "Bin Location",
            dataIndex: "binlocation",
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
            xtype: 'checkcolumn',
            header: "Web Y/N",
            dataIndex: "web_yn",
            headerCheckbox: false,
            locked: false,
            hidden: false,
            stopSelection: false
        },        
        {
            header: "Group",
            dataIndex: "grp",
            width: 120,
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
            header: "Sub. Category",
            dataIndex: "subcategory",
            width: 120,
            hidden: true,
            filter: {
                operator: 'st',
                type: "string"
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        /*
        {
            header: "",
            dataIndex: "",
            hidden: true,
            filter: {
                operator: 'st',
                type: "string"
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        */
        {
            header: "Reference 1",
            dataIndex: "reference1",
            width: 120,
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
            header: "Fab Content",
            dataIndex: "fabcontent",
            width: 120,
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
            header: "MSRP",
            dataIndex: "sgtRetailPrice",
            width: 80,
            align: 'center',
            hidden: false,
            renderer: function(v, meta, rec){
                var xf = Ext.util.Format;

                return v ? xf.usMoney(v) : '';
            }
        },
        {
            header: "Price 1",
            dataIndex: "price1",
            width: 80,
            hidden: false,
            renderer: function(v, meta, rec){
                var xf = Ext.util.Format;

                return v ? xf.usMoney(v) : '';
            }
        },
        {
            header: "Price 5",
            dataIndex: "price5",
            width: 80,
            hidden: false,
            renderer: function(v, meta, rec){
                var xf = Ext.util.Format;

                return v ? xf.usMoney(v) : '';
            }
        },            
        {
            header: "Cost",
            dataIndex: "cost",
            width: 80,
            align: 'center',
            hidden: false,
            renderer: function(v, meta, rec){
                var xf = Ext.util.Format;

                return v ? xf.usMoney(v) : '';
            }
        },
        /*
        {
            header: '<i style="text-align: center;" class="x-fa fa-paperclip fa-lg"></i>',
            dataIndex: 'photos',
            width: 50,
            align: 'center',
            renderer: function(value, metaData, rec, rowIndex, colIndex, store, view){
                var strValue = value != 0 ? value : '',
                    icon = '<i class="x-fa fa-check-circle-o fa-lg fa-fw green-txt"></i>';
                //metaData.tdStyle = 'font-weight:bold;color:' + (rec.data.mp ? 'green' : 'transparent');

                if(rec.data.name){
                    strValue = '<span>'+(value != 0 ? value : '')+'</span>'+icon;
                }

                return strValue;
            }
        },
        */            
        {
            header: "Created On",
            dataIndex: "userTime",
            filter: {type: "date"},
            renderer: function(k, i, a){
                if(k!=undefined){
                    var d=new Date(k),
                    j = function(c){
                        return c<10 ? "0"+c : c;
                    };
                    var l = j(d.getUTCMonth()+1)+"-"+j(d.getUTCDate())+"-"+d.getUTCFullYear();
                    i.tdAttr='data-qtip="'+l+'"';
                    return l;
                }
            }
        }];
    },
    
    buildBottomBar: function(){
        var b = Ext.widget("combo", {
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
            var store = this.getViewModel().getStore("products");
            c.setValue(store.getPageSize());
        }, this);

        b.on("select", function(e, a){
            var store = this.getViewModel().getStore("products");
            store.setPageSize(e.getValue());
            store.load();
            //console.log("combo select", f)
        }, this);

        return {
            xtype: "pagingtoolbar",
            //itemId: "pagingtb",
            bind: {
                store: "{products}"
            },
            //dock: 'bottom',
            displayInfo: true,
            items: ["-", b, "Per Page"]
        };
    },

    photoTemplate: function() {
        return new Ext.XTemplate(
            '<tpl for=".">',
            //'<div class="thumb-wrap x-unselectable">',
            //'<a class="link" href="{linkUrl}">',
            //'<span class="tag"></span>',
            '<div class="thumb">',
                '<tpl if="this.isNotEmpty(path)">',
                    '<img class="stylePhotos" src="{[this.getSrcPath(values, xcount)]}" width="224px" title="{name}" alt="{name}" ',
                        'onerror="{[this.onError(values, xcount)]}" ',
                    '/>' ,
                '</tpl>',
                '<tpl if="this.isNotEmpty(tag)">',
                    '<div class="tag"></div>',
                '</tpl>',
            '</div>',
            //'<span>{Title:ellipsis(11)}</span>',
            //'</a>',
            '</div>',
            '</tpl>',
            '<div class="x-clear"></div>',
            {
                checkImg: function(a,b){
                    return "";
                },
                isNotEmpty: function(s){
                    return !Ext.isEmpty(s);
                },
                onError: function(a,b) {                                        
                    return "this.onerror=null;this.src='https://endlessrose.net" + a.path + a.name + "?w=162&h=243&" + Math.random() + "'; "
                },
                getSrcPath: function(a,b){
                    //var str = 'http://64.136.152.54';                    
                    var str = 'https://endlessrose.net';
                    
                    if(!Ext.isEmpty(a.name)) {                                            
                        str = str + a.path + '200xImages/' + a.name + '?w=162&h=243&' + Math.random();                        
                        //str = str + a.path + '200xImages/' + a.name + '?w=162&h=243';

                    }                                        

                    if(a.pid <= 0 && a.path.includes("blob:")){
                        str = a.path;
                    }

                    return str;
                    //return a.replace(/(\.[^.]+)$/, "_medium$1");
                }
            }
        )
    }
});
