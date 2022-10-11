/**
 * Created by tech on 1/18/2022.
 */
 Ext.define('August.view.inventory.transfer.windows.StyleList', {
    extend: 'Ext.window.Window',

    requires: [
        'August.view.inventory.transfer.windows.StyleListController',
        'August.view.inventory.transfer.windows.StyleListModel',        
        'August.plugin.grid.Exporter'
    ],

    alias: 'widget.transfer-windows-stylelist',

    controller: "transfer-windows-stylelist",
    viewModel: {
        type: "transfer-windows-stylelist"        
    },

    layout: {
        type: 'fit'
    },

    header: {
        title: 'Style List',
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
    
    /*
    buttons: [{
        action: 'save',
        text: 'Save',
        formBind: true,
        //glyph: 86,
        iconCls: 'x-far fa-save',
        handler: function(btn){
            //btn.up('window').fireEvent('saveclick', btn, me);
        }
    },{
        action: 'close',
        text: 'Close',
        //glyph: 88,
        iconCls: 'x-far fa-times-circle',
        handler: function(btn){
            btn.up('window').close();
        }
    }],
    */
   
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
            items: [{
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
                    store: '{templatestyles}'
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
            { xtype: 'tbspacer', width: 10 },             
            '->',            
            {
                xtype: 'button',
                text: 'Add',
                action: 'add',
                iconCls: 'x-far fa-file-alt',
                handler: function(btn) {
                    me.fireEvent('addclick', btn, me);
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
                reference: "styleListGrid",
                scrollable: true,

                flex: 1,
                //height: 360,
                region: 'north',
                style: {
                    borderTop: '1px solid #cfcfcf',
                    //borderBottom: '1px solid #cfcfcf'
                },  

                split: {
                    size: 1
                },

                bind: {
                    store: "{templatestyles}"
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
                    xtype: 'datecolumn',
                    text: "Avail. Date",
                    dataIndex: "availabledate",            
                    format: 'Y-m-d',
                    filter: {
                        type: "date"
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
                    xtype: 'numbercolumn',
                    text: "Cost",
                    dataIndex: "cost",
                    width: 70,
                    menuDisabled: true,
                    sortable: false,
                    format: '$0,000.00'
                }, 
                {
                    xtype: 'numbercolumn',
                    text: "Price",
                    dataIndex: "price",
                    width: 70,
                    menuDisabled: true,
                    sortable: false,
                    format: '$0,000.00'
                }, 
                {
                    header: "O.H Qty",
                    dataIndex: "ohs",                
                    hidden: true,
                    filter: {
                        type: 'number'
                    },
                    renderer: function(f, e, a){
                        return f;
                    }
                }],  
            
                cls: "template-style-grid",

                stateful: true,

                stateId: "template-style-grid",
                //stateEvents: ["columnmove","columnresize","columnshow","columnhide"],
                //loadMask: true,
                //columnLines: true,
                multiColumnSort: true,
                // We do not need automatic height synching.
                syncRowHeight: false,

                selModel: {
                    type: 'checkboxmodel',
                    mode: 'MULTI',
                    checkOnly: true,
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
            var store = this.getViewModel().getStore("templatestyles");
            c.setValue(store.getPageSize());
        }, this);

        b.on("select", function(e, a){
            var store = this.getViewModel().getStore("templatestyles");
            store.setPageSize(e.getValue());
            store.load();
            //console.log("combo select", f)
        }, this);

        return {
            xtype: "pagingtoolbar",
            //itemId: "pagingtb",
            bind: {
                store: "{templatestyles}"
            },
            //dock: "bottom",
            //displayInfo: true,
            items: ["-", b, "Per Page"]
        };
    }   
})
