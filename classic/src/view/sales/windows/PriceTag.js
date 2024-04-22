  /**
 * @class sales.windows.PriceTag
 * @extend Ext.panel.Panel
 *
 * Show window for Print Price Tag
 *
 * @constructor
 * 
 * @param {Object} config The config object
 */
Ext.define('August.view.sales.windows.PriceTag',{ 
    extend: "Ext.window.Window",

    requires: [
        "August.view.sales.windows.PriceTagController",
        "August.view.sales.windows.PriceTagModel",
        'Ext.ux.toggleslide.ToggleSlide',
        'Ext.ux.form.field.ToggleSlide'
        //'Ext.ux.BoxReorderer'
    ],

    alias: 'widget.windows-pricetag',

    controller: "windows-pricetag",
    viewModel: {
        type: "windows-pricetag"
    },

    cls: 'pricetag-preview',    

    header: {
        title: 'Price Tag by S.O',
        iconCls: 'x-fa fa-code',
        titlePosition: 0,
        titleAlign: 'left'
    },

    session: true,
    minWidth: 720,
    minHeight: 480,
    maximized: true,

    //modal: true,
    //monitorResize: true,
    maximizable: true,
    constrain: true,
    closable: true,        

    layout: {
        type: 'fit'
        //align: 'stretchmax'
    },

    tools: [{
        type: 'pin'
    }],   

    listeners: {
        render: {
            //fn: 'onRender'
        },
        //itemclickremove: 'onItemClickRemove',
        itemclickrefresh: 'onItemClickRefresh',
        itemclickprint: 'onItemClickPrint'
    },

    initComponent: function(){
        var me = this;                

        var field = new Ext.form.field.Text({
                renderTo: document.body
            }), 
            fieldHeight = field.getHeight(),
            //padding = 5,
            remainingHeight;

        field.destroy();
        //remainingHeight = padding + fieldHeight * 3;

        //me.width = document.body.clientWidth - 660;
        //me.height = document.body.clientHeight - 320;                    

        me.actClose = Ext.create('Ext.Action', {
            text: "Close",
            tooltip: "Close the window",
            ui: "default",
            //reference: 'delete',
            iconCls: "x-fa fa-times-circle",
            hidden: false,
            handler: function(item, e){
                var viewer = me.ownerCt;

                viewer.remove(me);
                August.app.getMainView().unmask();
            },
            scope: me
        }),        

        me.actRefresh = Ext.create('Ext.Action', {
            text: "Refresh",
            tooltip: "Refresh price tags",
            ui: "default",
            //reference: 'refresh',
            iconCls: "x-fa fa-sync-alt",
            hidden: false,
            handler: function(item, e){
                me.fireEvent("itemclickrefresh", me, item);
            },
            scope: me
        }),

        me.actPrint = Ext.create('Ext.Action', {
            text: "Print",
            tooltip: "Price tags to print",
            ui: "default",
            //reference: 'refresh',
            iconCls: "x-fa fa-print",
            //width: 80,
            hidden: false,
            handler: function(item, e){
                //me.fireEvent("itemclickprint", me, item);                

                var innerView = me.getComponent('innerView');
                console.log('innerView', innerView);
                innerView.print(undefined, this.cssTemplate());
            },
            scope: me
        }),    

        Ext.applyIf(me, {
            items: [{
                xtype: 'container',  
                itemId: 'innerView',   
                //anchor: '100% 100%',                    
                bodyPadding: 0,
                scrollable: "y",
                
                layout: {
                    type: 'fit'                
                },                                                 

                items: [{
                    xtype: "dataview",
                    
                    reference: "tag-view",
                    cls: "price-tag-view",                                        
                    margin: '0px 0 0 13px',
                    //flex: 1,
                    bodyPadding: 0,
                    //scrollable: "y",
                    //loadMask: true,
                    overItemCls: "x-item-over",
                    itemSelector: "div.item-selector",
                    enableTextSelection: false,                                                
                    preserveScrollOnRefresh: true,
                    deferInitialRefresh: true,    

                    //padding: '-7px 0 0 0',                                                                                

                    bind: {
                        store: '{sodetails}'
                    },                    

                    listeners: {                        
                        beforecontainerclick: function(){
                            return false;
                        }
                    },

                    tpl: me.buildTemplate()
                }]
            }]
        });

        me.dockedItems = me.createToolbar();
        me.contextmenu = me.buildContextMenu();        

        me.callParent(arguments);
    },

    /**
     * Create the top toolbar
     * @private
     * @returns {Ext.toolbar.Toolbar}
     */
    createToolbar: function(){
        var me = this,
            config = {},
            items = [];

        config.xtype = 'toolbar';
        config.dock = 'top';        

        items.push(                     
            me.actClose,
            me.actRefresh,
            me.actPrint,                                            
            '-',                                                         
            {
                xtype: 'toggleslidefield',
                name: 'showPrice',
                reference: 'showPrice',
                fieldLabel: 'MSRP',
                labelAlign: 'right',
                labelPad: 5,
                labelWidth: 80,
                value: 'true',                
                publishes: ['value'],
                width: 145,
                listeners: {
                    change: {
                        fn: 'onShowPriceChanged',
                        scope: this.controller
                    }
                }
            },
            {
                xtype: 'combo',
                name: 'figure',
                reference: 'figure',
                fieldLabel: 'using',
                displayField: 'label',
                valueField: 'value',
                labelWidth: 35,
                labelPad: 5,
                labelAlign: 'right',
                width: 150,                
                value: 'msrp',
                //publishes: 'value',
                //matchFieldWidth: false,
                editable: false,
                //selectOnFocus: true,                        
                forceSelection: true,
                //msgTarget: 'side',                
                pageSize: 0,
                lastQuery: '',
                minChars: 1,
                queryMode: 'local',
                //queryParam: 'filter',
                //triggerAction: 'all',                
                bind: {
                    store: '{figures}'
                },                
                listeners: {                            
                    change: {
                        fn: 'onFigureChanged',
                        scope: this.controller
                    },
                    beforequery: function(q){
                        delete q.combo.lastQuery;
                    }
                }                                                                        
            },                 
        );

        config.items = items;

        return [
            config,
            {
                xtype: 'toolbar',                
                name: 'filters',         
                margin: '0 0 7px 0',       
                items: [{
                    xtype: 'combo',
                    name: 'customerFilter',                    
                    fieldLabel: 'Customer',                              
                    displayField: 'label',
                    valueField: 'value',                                
                    labelWidth: 60,
                    //selectOnFocus: false,
                    //allowBlank: true,
                    //forceSelection: true,                    
                    pageSize: 50,
                    matchFieldWidth: false,
                    //msgTarget: 'side',                        
                    minChars: 1,                        
                    queryMode: 'local',                        
                    //queryParam: 'filter',
                    lastQuery: '',
                    autoLoadOnValue: true,
                    //triggerAction: 'all',
                    //store: ['00', 'OS', 'SA'],
                    store: 'memCustomers',
                    remoteStore: 'Customers',                    
                    listConfig: {
                        loadindText: 'Searching...',
                        emptyText: 'No matching items found.',
                        width: 340
                    },
                    plugins: [{
                        ptype: "cleartrigger"
                    }],
                    bind: {                        
                        //value: '{selected.customer}'
                    },                                                
                    listeners: {
                        change: function(c, nv, ov) {
                            
                        },
                        select: {
                            fn: 'onCustomerFilterSelected',
                            scope: this.controller
                        },
                        beforequery: function(q){
                            delete q.combo.lastQuery;
                        }, 
                        triggerClear: {
                            fn: 'onComboTriggerClear',
                            scope: this.controller
                        }
                    }
                },{
                    xtype: 'textfield',
                    name: 'sonoFilter',
                    fieldLabel: 'S.O #',
                    labelAlign: 'right',
                    labelWidth: 40,
                    //xtype: 'searchtextlist',
                    width: 300,
                    bind: {
                        //value: '{selected.orderno}'
                    },
                    /*
                    bind: {
                        value: '{theOrder.orderno}',
                        store: '{sodetails}'
                    },
                    paramName: 'orderNo'
                    */
                    plugins: [{
                        ptype: "cleartrigger"
                    }],
                    listeners: {
                        triggerClear: {
                            fn: 'onFieldTriggerClear',
                            scope: this.controller
                        }
                    }
                },
                {
                    xtype: "combo",
                    reference: 'cboForms',
                    width: 300,
                    valueField: 'value',
                    displayField: 'label',
                    fieldLabel: 'Forms',
                    labelWidth: 40,
                    labelAlign: 'right',
                    value: '5160-1',
                    emptyText: 'Select...',
                    //forceSelection: true,
                    disabled:  true,
                    pageSize: 50,
                    matchFieldWidth: false,                    
                    enableKeyEvents: true,
                    minChar: 1,
                    queryMode: 'local',  
                                                            
                    listConfig: {
                        loadindText: 'Searching...',
                        emptyText: 'No matching items found.',
                        width: 340
                    },
                    plugins: [{
                        ptype: "cleartrigger"
                    }],      
                    bind: {
                        store: '{forms}'
                    },        
                    listeners: {
                        select: function(c, rec){
                            //c.fireEvent('triggersearch', c, c.getSelection());
                        },
                        render: function(c){
                            /*
                            c.on('specialkey', function(f, e){
                                if (e.getKey() == e.ENTER) {
                                    c.fireEvent('triggersearch', c, c.getSelection());
                                }
                            }, c, {
                                buffer: 10
                            });
                            */
                        },
                        triggersearch: 'onTriggerSearchClicked',
                        triggerclear: 'onTriggerClearClicked'
                    }
                }]
            }   
        ];
    },    

    /*
    buildBottomBar: function(){
        var b = Ext.widget("combo", {
            name: "perpage",
            //reference: 'pageSizer',
            width: 76,
            store: new Ext.data.ArrayStore({
                fields: ["id"],
                data: [["2"], ["3"], ["4"], ["8"]]
            }),
            value: "8",
            displayField: "id",
            valueField: "id",
            editable: false,
            disabled: true,
            forceSelection: true,
            matchFieldWidth: true,
            queryMode: "local"
            //triggerAction: "all",
        });

        b.on('afterrender', function(c, e){
            var vm = this.getViewModel();            
            var store = vm.getData().theLineSheet.stylesInLines();
            
            //var store = me.memStylesInLines;
            //console.log('afterrender', c.getValue())
            c.setValue(store.getPageSize());
        }, this);

        b.on("select", function(e, a){
            var store = this.getViewModel().getStore('pricetags');
            //var store = me.memStylesInLines;
            store.setPageSize(e.getValue());
            store.load();
            //console.log("combo select", f)
        }, this);

        return {
            xtype: "pagingtoolbar",                                    
            bind: {
                store: "{pricetags}"
            },
            //store: me.memStylesInLines,
            //dock: 'bottom',
            displayInfo: true,
            items: ["-", b, "Per Page"]
        };
    },
    */
   
    buildContextMenu: function(){
        return Ext.create('Ext.menu.Menu', {
            items: [this.actRefresh, this.actPrint]
        });
    },
    
    onDestroy: function(){
        this.contextmenu.destroy();
        this.callParent(arguments);
    },

    buildTemplate: function(){
        var me = this;        

        return new Ext.XTemplate(                                                
            '<div class="sheet" style="margin-top: 0.51in;margin-left: 0.2in;">',
            '<tpl for=".">',                        
            '<div class="item-selector x-unselectable">',                               
                '<div class="item-boxer">',                            
                    '<div class="box-row">',
                        '<div class="box">',
                            '<div class="item-boxer" style="font-size:13px;">',
                                '<div class="box nb" style="width:70px;">{style:this.format(8)}</div>',
                                '<div class="box nb" style="width:140px;">{style_descipt:this.format(16)}</div>',
                                '<div class="box nb" style="width:30px;">{upc_size}</div>',                                    
                            '</div>',
                        '</div>',
                    '</div>',
                                                        
                    '<div class="box-row">',   
                        '<div class="box">',
                            '<div class="item-boxer" style="font-size:11px;margin-bottom:4px;">',                                 
                                '<div class="box nb" style="width:75px;">{color:this.format(9)}</div>',
                                '<div class="box nb" style="width:75px;">{color:this.format(9)}</div>',
                                '<div class="box nb" style="width:86px;">MSRP {[this.getMSRP(values)]}</div>',       
                            '</div>',
                        '</div>',                              
                    '</div>',
                    '<div class="box-row">',
                        '<div class="box nb">',                                    
                            '<svg class="barcode" jsbarcode-format="upc" jsbarcode-font="OCRB" jsbarcode-value="{upcno}" jsbarcode-height="32" jsbarcode-margin="0" jsbarcode-textmargin="0" jsbarcode-fontsize="11"></svg>',                                    
                        '</div>',
                    '</div>', 
                '</div>',
                /*
                '<div>',
                    '<span style="float: left;width:33%">{style:this.format}</span><span style="width:33%;">{style_descript:this.format}</span><span style="width:33%;">{upc_size}</span>',
                    '<span style="clear: both;width:33%;text-align: center;">{color:this.format}</span><span style="width:33%;text-align: center;">{color:this.format}</span><span style="width:33%;text-align: center;">{msrp:usMoney}</span>',
                    '{% if (values.upcno == "") continue; %}',
                    '<svg class="barcode" jsbarcode-format="UPC" jsbarcode-value="{upcno}" jsbarcode-textmargin="0" jsbarcode-fontoptions="bold"></svg>',
                    //'<span style="float: left;width:50%;">Category: {category}</span><span style="width:50%;">Sub Category: {subcategory}</span>',
                    //'<span style="float: left;width:50%;">Division: {division}</span><span style="width:50%;"> Season: {season}</span>',                                     
                    //'<div style="clear: both;height:4px;"></div>',                    
                    //'<div style="font-size:11px;padding:4px;">Size: {memo:this.formatMemo}</div>',
                '</div>',
                */                  
            '</div>',
            '{% if (xindex % 3 !== 0) continue; %}',
                '<div style="clear:both;"></div>',
            '{% if (xindex % 30 !== 0) continue; %}',
                '<div class="pagebreak"></div></div><div class="sheet" style="margin-top: 0.51in;margin-left: 0.2in;">', //'<div class="pagebreak"></div>',
            '{% if (xcount-xindex == 0) %}',
                '</div>',
            '</tpl>',                         
            {
                format: function(v, n){                                
                    var xf = Ext.util.Format;
                    if(!Ext.isEmpty(v)){                                    
                        return xf.trim(v).substring(0, n).toUpperCase();                                    
                    }
                },
                getMSRP: function(rec){
                    var xf = Ext.util.Format,
                        field = me.down('toggleslidefield[name="showPrice"]'),
                        combo = me.down('combo[name="figure"]');

                    //console.log('buildTemplate', field.getValue());

                    if (field.getValue() == 'false'){
                        return '';
                    }

                    return rec[combo.getValue()] ? xf.usMoney(rec[combo.getValue()]) : '';
                },
                formatMemo: function(v){
                    var k=Ext.util.Format,
                        j;
                    if(!Ext.isEmpty(v)){
                        j = k.stripTags(v);
                    }

                    return k.ellipsis(j, 30);
                },
                notNull: function(v){

                    return !Ext.isEmpty(v);
                }
            }                        
        )
    },

    cssTemplate: function() {
        return ''.concat(                                      
            '@page { width: 8.5in; height: 11in; margin: 0; } ',            
            //'@media screen { width: 8.5in; height: 11in; margin: 0; } ',

            '@media print {',                                
                
                'html, body { width: 8.7in; height: 11in; margin:0; font-family: "Helvetica Neue", Arial, Helvetica, sans-serif; } ',
                '.sheet { page-break-inside: avoid; page-break-before: always; } ',
                '.pagebreak { page-break-inside: avoid; page-break-after: always; } ',          

                '.price-tag-view .item-selector {',
                    //'-moz-border-radius:.7em;',
                    //'-webkit-border-radius:.7em;',
                    //'border-radius:.7em;',
                    'background: #ffffff;',
                    //'border: 1px solid #1c1c1c;',
                    'float: left;',
                    'margin: 0 0.12in 0 0;',
                    'width: 2.63in;',
                    'height: 0.95in;',
                    'padding: 7px 0 0 7px;', 
                    'border-collapse: collapse;',
                    'cursor: pointer;',
                '} ',      
                '.price-tag-view .item-boxer {',
                    'display: table;',
                    'border-collapse: collapse;',
                '} ',
                '.price-tag-view .item-boxer .box-row {',
                    'display: table-row;',
                    'border-collapse: collapse;',
                '} ',
                    '.price-tag-view .item-boxer .center {',
                    'text-align: center;',
                '} ',    
                    '.price-tag-view .item-boxer .right {',
                    'text-align: right;',
                '} ',     
                '.price-tag-view .item-boxer .box {',
                    'display: table-cell;',
                    //'padding: 0px 2px 0px 2px;',
                    'vertical-align: middle;',
                '} ',                                                    
                '.price-tag-view .item-boxer .nb {',
                    'border: none;',
                '} }'                                                            
        );
    }
});
