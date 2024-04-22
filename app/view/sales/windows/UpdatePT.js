/**
 * Created by tech on 1/18/2022.
 */
 Ext.define('August.view.sales.windows.UpdatePT', {
    extend: 'Ext.window.Window',

    requires: [
        'August.view.sales.windows.UpdatePTController',
        'August.view.sales.windows.UpdatePTModel'
    ],

    alias: 'widget.sales-windows-updatept',

    controller: "sales-windows-updatept",
    viewModel: {
        type: "sales-windows-updatept"        
    },

    layout: {
        type: 'border'
    },

    header: {
        title: 'Update Pick Ticket',
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

        me.dockedItems = {
            xtype: 'toolbar',
            dock: 'top',
            items: [            
                {
                    xtype: "searchgrid",
                    reference: 'searchgrid',
                    fieldLabel: 'Customer',
                    width: 300,
                    grid: 'orderGrid',
                    paramName: 'customer'          
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
                /*                               
                {
                    xtype: 'checkbox',
                    name: 'preorder',
                    value: false,
                    boxLabel: 'Pre Order'
                },                 
                {
                    xtype: 'checkbox',
                    name: 'overwrite',
                    value: 0,
                    boxLabel: 'Overwrites'
                },      
                {
                    xtype: 'checkbox',
                    name: 'applyVariants',
                    reference: 'applyVariants',
                    //fieldLabel: 'Apply to other colors',
                    value: 0,
                    boxLabel: 'Apply to other colors',                                                        
                },      
                */      
                '->',       
                {
                    xtype: 'button',
                    text: 'Confirm',
                    action: 'confirm',
                    iconCls: 'x-far fa-file-alt',
                    handler: function(btn) {
                        me.fireEvent('confirmclick', btn, me);
                    }
                },     
                {
                    xtype: 'button',
                    text: 'Update',
                    action: 'update',
                    iconCls: 'x-far fa-file-alt',
                    handler: function(btn) {
                        me.fireEvent('updateclick', btn, me);
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
                }
            ]
        },

        Ext.applyIf(me, {            
            items: [{
                xtype: "grid",

                reference: "orderGrid",
                scrollable: true,
                region: 'center',
                flex: 1,                    

                style: {
                    borderTop: '1px solid #cfcfcf',
                    //borderBottom: '1px solid #cfcfcf'
                },

                bind: {
                    store: "{orders}"
                },                  

                //columns: me.etc['SH'].columns,
                            
                columns: [{
                    header: "ID",
                    dataIndex: "pickdid",
                    hidden: true,
                    width: 80,
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
                    header: "Customer",
                    dataIndex: "customer",
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
                    header: "Pick #",
                    dataIndex: "pickno",
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
                    header: "Order #",
                    dataIndex: "orderno",
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
                    xtype: 'datecolumn',
                    text: "Order Date",
                    dataIndex: "orderdate",
                    format: 'Y-m-d',
                    filter: {
                        type: "date",
                        format: 'Y-m-d',
                        dateFormat: 'C'
                    }
                },        
                {
                    xtype: 'datecolumn',
                    text: "Ship Date",
                    dataIndex: "shipdate",
                    format: 'Y-m-d',
                    filter: {
                        type: "date",
                        format: 'Y-m-d',
                        dateFormat: 'C'
                    }
                }, 
                {
                    xtype: 'datecolumn',
                    text: "Cancel Date",
                    dataIndex: "canceldate",
                    format: 'Y-m-d',
                    filter: {
                        type: "date",
                        format: 'Y-m-d',
                        dateFormat: 'C'
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
                    header: "Division",
                    dataIndex: "division",
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
                    header: "WH",
                    dataIndex: "warehouse",
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
                    header: "Size",
                    dataIndex: "size",
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
                    header: "Description",
                    dataIndex: "descript",
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
                    text: "SO Qty",
                    dataIndex: "so_unit",
                    locked: false,
                    filter: {
                        type: "number"
                    },                                       
                    renderer: function(f, e, a){
                        return f;
                    }
                },         
                {
                    text: "Pick Qty",
                    dataIndex: "pk_unit",
                    locked: false,
                    filter: {
                        type: "number"
                    },
                    editor: {
                        field: {
                            xtype: 'numberfield',
                            allowBlank: false
                        }
                    }, 
                    renderer: function(f, e, a){
                        return f;
                    }
                },  
                {
                    text: "Pick Status",
                    dataIndex: "pickd_status",
                    locked: false,
                    filter: {
                        operator: 'st',
                        type: "string"
                    },
                    editor: {
                        xtype: "combo",
                        name: 'pickStatus',                
                        //fieldCls: 'required',                
                        //labelWidth: 50,
                        //width: 470,      
                        store: ['Hold', 'Open', 'Pack', 'Cancel', 'Closed'],                       
                        valueField: 'value',
                        displayField: 'label',                                                                                                                                                           
                        queryMode: 'local'
                    },
                    renderer: function(f, e, a){
                        return f;
                    }
                },       
                {
                    text: "On Hand",
                    dataIndex: "oh",
                    locked: false,
                    filter: {
                        type: "number"
                    },
                    renderer: function(f, e, a){
                        return f;
                    }
                },     
                {
                    text: "ATS",
                    dataIndex: "ats",
                    locked: false,
                    filter: {
                        type: "number"
                    },
                    renderer: function(f, e, a){
                        return f;
                    }
                },       
                {
                    text: "Price",
                    dataIndex: "price",
                    locked: false,
                    formatter: 'usMoney',
                    filter: {
                        type: "number"
                    },
                    renderer: function(f, e, a){
                        return f;
                    }
                },    
                {
                    header: "Customer PO #",
                    dataIndex: "customerpono",
                    width: 320,            
                    filter: {
                        operator: 'st',
                        type: "string"
                    },
                    renderer: function(f, e, a){
                        return f;
                    }
                },         
                {
                    text: "Ship Via",
                    dataIndex: "shipvia",
                    locked: false,
                    filter: {
                        type: "string"
                    },
                    renderer: function(f, e, a){
                        return f;
                    }
                },
                {
                    text: "Ship To",
                    dataIndex: "shiptoname",
                    locked: false,
                    filter: {
                        type: "string"
                    },
                    renderer: function(f, e, a){
                        return f;
                    }
                },
                {
                    text: "City",
                    dataIndex: "shiptocity",
                    locked: false,
                    filter: {
                        type: "string"
                    },
                    renderer: function(f, e, a){
                        return f;
                    }
                },
                {
                    text: "State",
                    dataIndex: "shiptostate",
                    locked: false,
                    filter: {
                        type: "string"
                    },
                    renderer: function(f, e, a){
                        return f;
                    }
                }],
            
                cls: "so-grid",
                stateful: true,
                stateId: "so-grid",
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

                    emptyText: '<h1 style="margin:20px">No matching results</h1>',
                    deferEmptyText: false,
                    getRowClass: function(rec, idx, params) {
                        //return Ext.isEmpty(rec.get('characteristics')) ? "grid-row-color" : "";
                    }
                },

                plugins: [{
                    ptype: 'rowediting',
                    clicksToEdit: 2,
                    clicksToMoveEditor: 1,
                    autoCancel: false
                },{
                    ptype: "gridfilters"
                }],

                bbar: me.buildBottomBar(),
                
                listeners: {
                    
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
            var store = this.getViewModel().getStore("orders");
            c.setValue(store.getPageSize());
        }, this);

        b.on("select", function(e, a){
            var store = this.getViewModel().getStore("orders");
            store.setPageSize(e.getValue());
            store.load();
            //console.log("combo select", f)
        }, this);

        return {
            xtype: "pagingtoolbar",
            //itemId: "pagingtb",
            bind: {
                store: "{orders}"
            },
            //dock: "bottom",
            //displayInfo: true,
            items: ["-", b, "Per Page"]
        };
    }   
})
