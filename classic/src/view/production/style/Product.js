/**
 * Created by tech on 3/9/2016.
 */
Ext.define("August.view.production.style.Product", {
    extend: 'August.view.Viewer',

    requires: [
        'August.view.production.style.ProductController',
        'August.view.production.style.ProductModel',
        'August.view.production.style.Grid',
        'August.view.production.style.View',
        'August.view.production.TopBar',
        'August.view.production.style.edit.Form',
        'August.view.production.windows.style.Upload',
        'August.view.production.windows.style.Labeltag',
        'August.view.production.windows.style.StyleCopy',
        'August.view.production.windows.style.web.Template',
        'August.view.production.windows.style.web.Export',
        'August.view.production.windows.style.web.ColorMapping'
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
                    xtype: "style-grid",
                    reference: "grid",
                    //scrollable: 'y',
                    stateful:true,
                    stateId: "product-grid",
                    //stateEvents: ["columnmove", "columnresize", "groupchange", "bodyresize"],
                    style: {
                        borderTop: '1px solid #cfcfcf',
                        borderBottom: '1px solid #cfcfcf'
                    },
                    //publishes: ["selectedSamples"],

                    bind: {
                        store: "{products}",
                        selection: "{selectedProduct}"
                    },

                    listeners: {
                        select: {
                            fn: 'onSelect',
                            scope: this.controller
                        }
                    }
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
                        store: "{products}",
                        selection: "{selectedProduct}"
                    },
                    
                    listeners: {
                        select: {
                            fn: 'onSelect',
                            scope: this.controller
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
    }
});
