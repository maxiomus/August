
Ext.define('August.view.pim.windows.List', {
    extend: 'Ext.window.Window',

    requires: [
        'August.view.pim.windows.ListController',
        'August.view.pim.windows.ListModel',        
        //'August.model.shopify.lordTaylorTemplate',
        //'August.model.shopify.HBCTemplate',
        //'August.model.shopify.BelkTemplate',
        //'August.model.shopify.BelkMp',
        'August.plugin.grid.Exporter'
    ],

    alias: 'widget.pim-windows-list',

    controller: "pim-windows-list",
    viewModel: {
        type: "pim-windows-list"        
    },

    layout: {
        type: 'fit'
    },

    header: {
        title: 'Styles List',
        iconCls: 'x-fa fa-code',
        titlePosition: 0,
        titleAlign: 'left'
    },

    padding: '10 0 10 0',

    bind: {
        //title: '{title}'
    },

    //minWidth: 720,
    minHeight: 480,
    maximized: true,

    //modal: true,
    monitorResize: true,
    maximizable: true,
    //constrain: true,
    closable: true,    

    tools: [{
        type: 'pin'
    }],       
   
    initComponent: function() {
        var me = this;

        //me.columns = me.buildColumns();
        // Calculating the textfield height...
        var field = new Ext.form.field.Text({
                renderTo: document.body
            }), fieldHeight = field.getHeight(),
            padding = 5,
            remainingHeight;

        field.destroy();
        remainingHeight = padding + fieldHeight * 3;

        me.width = document.body.clientWidth - 660;
        me.height = document.body.clientHeight - 320;

        /*
        Ext.define('File', {
            extend: 'Ext.data.Model',
            fields: [ 'id', 'name', 'size', 'lastmod' ],
            idProperty: 'id'
        });

        var fileStore = Ext.create('Ext.data.Store', {
            model: 'File'
        });                
        */        

        me.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                xtype: "combo",               
                name: 'category', 
                fieldLabel: 'Search By',
                //labelWidth: 50,
                width: 100,
                hideLabel: true,
                valueField: "field",
                displayField: "label",
                value: "style",
                editable: false,
                //reference: "filterSelection",
                bind: {
                    store: "{categories}"
                },
                queryMode: 'local',
                listeners: {                    
                    select: {
                        fn: "onCategorySelect",
                        scope: 'controller'
                    }                    
                }
            },
            {
                xtype: "searchtextlist",
                reference: 'searchlist',
                width: 480,              
                bind: {                    
                    store: '{liststyles}'
                },                  
                paramName: "style"            
            },  
            {
                xtype: 'button',
                text: 'Reset',
                action: 'reset',
                iconCls: 'x-fa fa-redo',
                handler: function(btn) {
                    me.fireEvent('resetclick', btn, me);
                }
            },                                                                   
            '->',           
            {
                xtype: 'button',
                text: 'Generate',
                action: 'generate',
                iconCls: 'x-far fa-file-alt',
                handler: function(btn) {
                    me.fireEvent('generateclick', btn, me);
                }
            },            
            {
                xtype: 'button',
                text: 'Close',
                action: 'close',
                iconCls: 'x-far fa-times-circle',
                handler: function(btn) {
                    me.close();
                }
            }]
        }],

        Ext.applyIf(me, {            
            items: [{
                xtype: "grid",
                reference: "pim-style-grid",
                scrollable: true,

                flex: 1,
                //height: 360,
                
                style: {
                    borderTop: '1px solid #cfcfcf',
                    //borderBottom: '1px solid #cfcfcf'
                },  

                split: {
                    size: 1
                },

                bind: {
                    store: "{liststyles}"
                },

                columns: [{
                    header: "Style",
                    dataIndex: "style",
                    width: 140,
                    /*
                    locked: false,
                    filter: {
                        operator: 'st',
                        type: "string"
                    },
                    */
                    renderer: function(f, e, a){
                        return f;
                    }
                },
                {
                    header: "Color",
                    dataIndex: "color",
                    width: 140,
                    filter: {                            
                        type: 'list'
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
                        operator: 'in',
                        type: "list"
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
                    header: "O.H Qty",
                    dataIndex: "ohs",                
                    hidden: false,
                    filter: {
                        type: 'number'
                    },
                    renderer: function(f, e, a){
                        return f;
                    }
                }],  
            
                cls: "pim-style-grid",

                stateful: true,

                stateId: "pim-style-grid",
                //stateEvents: ["columnmove","columnresize","columnshow","columnhide"],
                //loadMask: true,
                //columnLines: true,
                multiColumnSort: true,
                // We do not need automatic height synching.
                syncRowHeight: false,

                selModel: {
                    type: 'checkboxmodel',
                    mode: 'MULTI',
                    
                    enableKeyNav: true,
                    pruneRemoved: false
                },
                
                viewConfig: {
                    //loadingHeight: 400,
                    stripeRows: true,
                    trackOver: true,
                    preserveScrollOnRefresh:true,
                    //deferInitialRefresh:true,
                    //trailingBufferZone: 20,
                    //leadingBufferZone: 40,

                    emptyText: '<h1 style="margin:20px">No matching results</h1>'
                    
                },
                plugins: [{
                    ptype: "gridfilters"
                }],

                bbar: me.buildBottomBar(),

                listeners: {
                    render: {
                        //fn: 'onGridRender',
                        //scope: this.controller
                    },
                    selectionChange: {
                        //fn: 'onPublishSelect',
                        scope: this.controller
                    }
                }
            }]         
        });

        me.callParent(arguments);

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
            var store = this.getViewModel().getStore("liststyles");
            c.setValue(store.getPageSize());
        }, this);

        b.on("select", function(e, a){
            var store = this.getViewModel().getStore("liststyles");
            store.setPageSize(e.getValue());
            store.load();
            //console.log("combo select", f)
        }, this);

        return {
            xtype: "pagingtoolbar",
            //itemId: "pagingtb",
            bind: {
                store: "{liststyles}"
            },
            //dock: "bottom",
            displayInfo: true,
            items: ["-", b, "Per Page"]
        };
    }  
})

