/**
 * Created by tech on 1/18/2022.
 */
 Ext.define('August.view.pim.windows.ProductDescript', {
    extend: 'Ext.window.Window',

    requires: [
        'August.view.pim.windows.ProductDescriptController',
        'August.view.pim.windows.ProductDescriptModel'
    ],

    alias: 'widget.pim-windows-productdescript',

    controller: "pim-windows-productdescript",
    viewModel: {
        type: "pim-windows-productdescript"        
    },

    layout: {
        type: 'border'
    },

    header: {
        title: 'Product Description Generate',
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
                    store: '{styles}'
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
            /*                               
            {
                xtype: 'checkbox',
                name: 'preorder',
                value: false,
                boxLabel: 'Pre Order'
            },
            */     
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
                text: 'Translate',
                action: 'translate',
                iconCls: 'x-far fa-file-alt',                
                handler: function(btn) {
                    me.fireEvent('translateclick', btn, me);
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
        },

        Ext.applyIf(me, {            
            items: [{
                xtype: "form",
                title: 'Description Generate Settings',
                reference: "descript-options",
                //scrollable: true,
                cls: "product-desc-options",
                iconCls: 'x-fa fa-th',
                plain: true,
                collapsed: true,
                collapsible: true,
                //collapseMode: 'mini',
                region: 'east',
                split: {
                    size: 3
                },
                
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },

                width: 460,
                bodyPadding: 10,
                
                style: {
                    borderTop: '1px solid #cfcfcf',
                    //borderBottom: '1px solid #cfcfcf'
                },  

                defaults: {
                    //flex: 1
                    labelWidth: 150
                },

                items: [{
                    xtype: 'combo',
                    name: 'prod-name',
                    fieldLabel: 'Product Name',
                    fieldCls: 'required',
                    msgTarget: 'qtip',
                    allowBlank: false,
                    bind: {
                        store: '{sourceFields}'
                    },
                    queryMode: "local",
                    value: "description",
                    matchFieldWidth: true,
                    displayField: "label",
                    valueField: "value",
                    editable: false,
                    forceSelection: true
                },{
                    xtype: 'combo',
                    name: 'prod-char',
                    fieldLabel: 'Product Characteristics',
                    fieldCls: 'required',
                    msgTarget: 'qtip',
                    allowBlank: false,
                    bind: {
                        store: '{sourceFields}'
                    },
                    queryMode: "local",
                    value: "characteristics",
                    matchFieldWidth: true,
                    displayField: "label",
                    valueField: "value",
                    editable: false,
                    forceSelection: true
                },{
                    xtype: 'combo',
                    name: 'feature1',
                    fieldLabel: 'Add. Feature 1',                        
                    bind: {
                        store: '{sourceFields}'
                    },
                    queryMode: "local",
                    value: "feature1",
                    matchFieldWidth: true,
                    displayField: "label",
                    valueField: "value",
                    editable: false,
                    forceSelection: true
                },{
                    xtype: 'combo',
                    name: 'feature2',
                    fieldLabel: 'Add. Feature 2',   
                    bind: {
                        store: '{sourceFields}'
                    },
                    queryMode: "local",
                    value: "feature2",
                    matchFieldWidth: true,
                    displayField: "label",
                    valueField: "value",
                    editable: false,
                    forceSelection: true
                },{
                    xtype: 'combo',
                    name: 'feature3',
                    fieldLabel: 'Add. Feature 3',  
                    bind: {
                        store: '{sourceFields}'
                    },
                    queryMode: "local",
                    value: "feature3",
                    matchFieldWidth: true,
                    displayField: "label",
                    valueField: "value",
                    editable: false,
                    forceSelection: true
                },{
                    xtype: 'combo',
                    name: 'feature4',
                    fieldLabel: 'Add. Feature 4',                        
                    bind: {
                        store: '{sourceFields}'
                    },
                    queryMode: "local",
                    value: "feature4",
                    matchFieldWidth: true,
                    displayField: "label",
                    valueField: "value",
                    editable: false,
                    forceSelection: true
                },{
                    xtype: 'combo',
                    name: 'feature5',
                    fieldLabel: 'Add. Feature 5',                        
                    bind: {
                        store: '{sourceFields}'
                    },
                    queryMode: "local",
                    value: "feature5",
                    matchFieldWidth: true,
                    displayField: "label",
                    valueField: "value",
                    editable: false,
                    forceSelection: true
                },{
                    xtype: 'fieldset',
                    title: 'Keywords',
                    checkboxToggle: true,
                    checkbox: {
                        disabled: true
                    },
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%',
                        hideEmptyLabel: false
                    },
                    items: [
                        {
                            xtype: 'combo',
                            name: 'keywords',
                            fieldLabel: 'Keywords',                        
                            bind: {
                                store: '{sourceFields}'
                            },
                            queryMode: "local",
                            value: "keywords",
                            matchFieldWidth: true,
                            displayField: "label",
                            valueField: "value",
                            editable: false,
                            forceSelection: true
                        },
                        {
                            xtype: 'checkbox',                    
                            name: 'useDefaults',
                            fieldLabel: 'Use Defaults',
                            reference: 'useDefaults',
                            //boxLabel: 'Use Default Keywords',
                            hideEmptyLabel: false                    
                        },{
                            xtype: 'combo',
                            name: 'brand',
                            fieldLabel: 'Brand for keywords',
                            reference: 'brand',
                            hidden: true,
                            displayField: 'label',
                            valueField: 'value',
                            publishes: 'value',
                            bind: {
                                disabled: '{!useDefaults.checked}',
                                store: '{brands}'
                            }
                        },{
                            xtype: 'tagfield',
                            name: 'erKeywords',
                            reference: 'erKeywords',
                            fieldLabel: 'ER Kewords',                    
                            valueField: 'value',
                            displayField: 'label',
                            value: ['luxury', 'chic', 'elegant', 'romantic', 'novelty'],
                            emptyText: 'Keywords',
                            //width: '50%',
                            //maxWidth: 600,
                            forceSelection: false,
                            autocomplete: 'off',
                            createNewOnEnter: true,
                            //matchFieldWidth: false,
                            //labelWidth: 63,
                            //labelPad: 1,
                            //grow: false,
                            filterPickList: true,
                            //autoLoadOnValue: true,
                            enableKeyEvents: true,
                            //minChar: 1,
                            queryMode: 'local',
                            
                            bind: {                   
                                disabled: '{!useDefaults.checked}',
                                //visible: '{brand.value}',                        
                                store: '{erkeys}'
                            },       
        
                            plugins: [{
                                ptype: "cleartrigger"
                            }],
                            listeners: {
                                change: function(c, rec){
                                    //c.fireEvent('triggersearch', c, c.getValue());
                                },
                                render: function(c){
                                    c.on('specialkey', function(f, e){
                                        if (e.getKey() == e.ENTER) {
                                            //c.fireEvent('triggersearch', c, c.getValue());
                                        }
                                    }, c, {
                                        buffer: 10
                                    });
                                }
                                //triggersearch: 'onTriggerSearchClicked',
                                //triggerclear: 'onTriggerClearClicked'
                            }
                        },{
                            xtype: 'tagfield',
                            name: 'efKeywords',
                            reference: 'efKeywords',
                            fieldLabel: 'EF Kewords',                    
                            valueField: 'value',
                            displayField: 'label',
                            value: ['preppy', 'comport', 'cute', 'cottage core'],
                            emptyText: 'Keywords',
                            //width: '50%',
                            //maxWidth: 600,
                            forceSelection: false,
                            autocomplete: 'off',
                            createNewOnEnter: true,
                            //matchFieldWidth: false,
                            //labelWidth: 63,
                            //labelPad: 1,
                            //grow: false,
                            filterPickList: true,
                            //autoLoadOnValue: true,
                            enableKeyEvents: true,
                            //minChar: 1,
                            queryMode: 'local',
                            
                            bind: {                   
                                disabled: '{!useDefaults.checked}',
                                //visible: '{brand.value}',                     
                                store: '{efkeys}'
                            },       
        
                            plugins: [{
                                ptype: "cleartrigger"
                            }],
                            listeners: {
                                change: function(c, rec){
                                    //c.fireEvent('triggersearch', c, c.getValue());
                                },
                                render: function(c){
                                    c.on('specialkey', function(f, e){
                                        if (e.getKey() == e.ENTER) {
                                            //c.fireEvent('triggersearch', c, c.getValue());
                                        }
                                    }, c, {
                                        buffer: 10
                                    });
                                }
                                //triggersearch: 'onTriggerSearchClicked',
                                //triggerclear: 'onTriggerClearClicked'
                            }
                        },{
                            xtype: 'tagfield',
                            name: 'glKeywords',
                            reference: 'glKeywords',
                            fieldLabel: 'GL Kewords',                    
                            valueField: 'value',
                            displayField: 'label',
                            value: ['trendy', 'chic', 'boise', 'structured'],
                            emptyText: 'Keywords',
                            //width: '50%',
                            //maxWidth: 600,
                            forceSelection: false,
                            autocomplete: 'off',
                            createNewOnEnter: true,
                            //matchFieldWidth: false,
                            //labelWidth: 63,
                            //labelPad: 1,
                            //grow: false,
                            filterPickList: true,
                            //autoLoadOnValue: true,
                            enableKeyEvents: true,
                            //minChar: 1,
                            queryMode: 'local',
                            
                            bind: {                   
                                disabled: '{!useDefaults.checked}',
                                //visible: '{brand.value}',                               
                                store: '{glkeys}'
                            },       
        
                            plugins: [{
                                ptype: "cleartrigger"
                            }],
                            listeners: {
                                change: function(c, rec){
                                    //c.fireEvent('triggersearch', c, c.getValue());
                                },
                                render: function(c){
                                    c.on('specialkey', function(f, e){
                                        if (e.getKey() == e.ENTER) {
                                            //c.fireEvent('triggersearch', c, c.getValue());
                                        }
                                    }, c, {
                                        buffer: 10
                                    });
                                }
                                //triggersearch: 'onTriggerSearchClicked',
                                //triggerclear: 'onTriggerClearClicked'
                            }
                        },{
                            xtype: 'tagfield',
                            name: 'frKeywords',
                            reference: 'frKeywords',
                            fieldLabel: 'FR Kewords',                    
                            valueField: 'value',
                            displayField: 'label',
                            value: ['boho', 'freedom', 'naked', 'earthy', 'comfort'],
                            emptyText: 'Keywords',
                            //width: '50%',
                            //maxWidth: 600,
                            forceSelection: false,
                            autocomplete: 'off',
                            createNewOnEnter: true,
                            //matchFieldWidth: false,
                            //labelWidth: 63,
                            //labelPad: 1,
                            //grow: false,
                            filterPickList: true,
                            //autoLoadOnValue: true,
                            enableKeyEvents: true,
                            //minChar: 1,
                            queryMode: 'local',
                            
                            bind: {                   
                                disabled: '{!useDefaults.checked}',
                                //visible: '{brand.value}',                             
                                store: '{frkeys}'
                            },       
        
                            plugins: [{
                                ptype: "cleartrigger"
                            }],
                            listeners: {
                                change: function(c, rec){
                                    //c.fireEvent('triggersearch', c, c.getValue());
                                },
                                render: function(c){
                                    c.on('specialkey', function(f, e){
                                        if (e.getKey() == e.ENTER) {
                                            //c.fireEvent('triggersearch', c, c.getValue());
                                        }
                                    }, c, {
                                        buffer: 10
                                    });
                                }
                                //triggersearch: 'onTriggerSearchClicked',
                                //triggerclear: 'onTriggerClearClicked'
                            }
                        }
                    ]
                },
                /*
                {
                    xtype: 'combo',
                    name: 'tone-voice',
                    fieldLabel: 'Tone of Voice',                                            
                    //labelAlign: 'right',
                    //labelSeparator: '',
                    //labelPad: 10,
                    //labelWidth: 45,
                    //hideLabel: true,
                    width: 50,      
                                                                   
                    bind: {
                        store: '{voices}'                            
                    },
                    hidden: true,
                    queryMode: "local",
                    value: "creative",
                    matchFieldWidth: true,
                    displayField: "label",
                    valueField: "value",
                    editable: false,
                    forceSelection: true
                },
                {
                    xtype: 'combo',
                    name: 'engine',
                    fieldLabel: 'Quality type',                        
                    store: ['economy', 'average', 'good', 'premium'],
                    queryMode: "local",
                    value: "good",
                    hidden: true,
                    matchFieldWidth: true,
                    //displayField: "label",
                    valueField: "value",
                    editable: false,
                    forceSelection: true
                },
                */
                {
                    xtype: 'numberfield',
                    name: 'words',
                    fieldLabel: '# of Words',
                    value: 90,
                    maxValue: 250,
                    minValue: 10
                },
                {
                    xtype: 'slider',
                    name: 'temperature',
                    fieldLabel: 'Creativity',
                    value: 100,
                    increment: 10,
                    minValue: 0,
                    maxValue: 200   
                },{
                    xtype: 'combo',
                    name: 'language',
                    fieldLabel: 'Translate Languate',
                    //fieldCls: 'required',
                    msgTarget: 'qtip',
                    allowBlank: false,
                    bind: {
                        store: '{languages}'
                    },
                    queryMode: "local",
                    value: "French",
                    matchFieldWidth: true,
                    displayField: "label",
                    valueField: "value",
                    editable: false,
                    forceSelection: true
                }],                                                                     

                listeners: {
                    render: {
                        //fn: 'onGridRender',
                        //scope: this.controller
                    }
                }
            },{
                xtype: "grid",

                reference: "styleGrid",
                scrollable: true,
                region: 'center',
                flex: 1,                    

                style: {
                    borderTop: '1px solid #cfcfcf',
                    //borderBottom: '1px solid #cfcfcf'
                },

                bind: {
                    store: "{styles}"
                },                  

                //columns: me.etc['SH'].columns,
                            
                columns: [{
                    header: "ID",
                    dataIndex: "id",
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
                    header: "Product Description",
                    dataIndex: "description",
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
                    header: "Product Category",
                    dataIndex: "categoryCode",
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
                    header: "Product Style",
                    dataIndex: "productStyle",
                    width: 140,
                    hidden: true,
                    filter: {
                        operator: 'st',
                        type: "string"
                    },
                    renderer: function(f, e, a){
                        return f;
                    }
                },
                {
                    header: "N41 Memo",
                    dataIndex: "characteristics",
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
                    header: "Long Description",
                    dataIndex: "longDescription",       
                    width: 480,         
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
                    header: "Long Description - French",
                    dataIndex: "longDescription1",       
                    width: 480,         
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
                    header: "Feature & Bullet 1",
                    dataIndex: "feature1",
                    hidden: false,
                    width: 120,
                    filter: {
                        operator: 'in',
                        type: "list"
                    },
                    renderer: function(f, e, a){
                        return f;
                    }
                },
                {
                    header: "Feature & Bullet 2",
                    dataIndex: "feature2",
                    hidden: false,
                    width: 120,
                    filter: {
                        operator: 'in',
                        type: "list"
                    },
                    renderer: function(f, e, a){
                        return f;
                    }
                },
                {
                    header: "Feature & Bullet 3",
                    dataIndex: "feature3",
                    hidden: false,
                    width: 120,
                    filter: {
                        operator: 'in',
                        type: "list"
                    },
                    renderer: function(f, e, a){
                        return f;
                    }
                },
                {
                    header: "Feature & Bullet 4",
                    dataIndex: "feature4",
                    hidden: false,
                    width: 120,
                    filter: {
                        operator: 'in',
                        type: "list"
                    },
                    renderer: function(f, e, a){
                        return f;
                    }
                },
                {
                    header: "Feature & Bullet 5",
                    dataIndex: "feature5",
                    hidden: false,
                    width: 120,
                    filter: {
                        operator: 'in',
                        type: "list"
                    },
                    renderer: function(f, e, a){
                        return f;
                    }
                }],
            
                cls: "style-grid",
                stateful: true,
                stateId: "style-grid",
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
                        return Ext.isEmpty(rec.get('characteristics')) ? "grid-row-color" : "";
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
            var store = this.getViewModel().getStore("styles");
            c.setValue(store.getPageSize());
        }, this);

        b.on("select", function(e, a){
            var store = this.getViewModel().getStore("styles");
            store.setPageSize(e.getValue());
            store.load();
            //console.log("combo select", f)
        }, this);

        return {
            xtype: "pagingtoolbar",
            //itemId: "pagingtb",
            bind: {
                store: "{styles}"
            },
            //dock: "bottom",
            //displayInfo: true,
            items: ["-", b, "Per Page"]
        };
    }   
})
