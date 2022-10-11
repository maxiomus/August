
Ext.define('August.view.sales.windows.PrintPT',{
    extend: 'Ext.window.Window',

    requires: [
        'August.view.sales.windows.PrintPTController',
        'August.view.sales.windows.PrintPTModel'
    ],

    alias: 'widget.sales-windows-printpt',

    controller: 'sales-windows-printpt',
    viewModel: {
        type: 'sales-windows-printpt'
    },        

    cls: 'print-pt-preview',    

    header: {
        title: 'Print Pick Ticket',
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

        var headerTpl = new Ext.XTemplate(
            '<table>',
                '<tr>',
                    '<td>',
                        '<img width="162" height="60" src="{imageSrc}"></img>',
                        '<div class="item-boxer">',
                            '<div class="box-row">',                                    
                                '<div class="box ab">Purchase Order</div>',                                    
                                '<div class="box ab">', 
                                    'Estimate',                                   
                                '</div>',                                    
                            '</div>',
                            '<div class="box-row">',                                    
                                '<div class="box ab">',
                                    '<div class="item-boxer">',
                                        '<div class="box rb" style="">Cut No.:</div>',                                        
                                        '<div class="box nb" style="">{pono}</div>',                                    
                                    '</div>',
                                '</div>',              
                                '<div class="box ab">',
                                    'Barcode',
                                '</div>',                      
                            '</div>',
                        '</div>',
                    '</td>',                    
                    '<td rowspan="3">',                        
                        '<img width="209" height="316" src="{}"></img>',
                    '</td>',
                '</tr>',        
                '<tr>',
                    '<td>',
                        '<fieldset>',
                            '<legend>Vendor:</legend>',
                            '<div>{name}<div/>',
                            '<div>{addr1}<div/>',
                            '<div>{addr2}<div/>',                            
                            '<div>{city}{state}{zip}<div/>',
                            '<div>{country}<div/>',
                            '<div>Phone: {phone1}<div/>',
                            '<div>Fax: {fax}<div/>',                                         
                        '</fieldset>',
                        '<fieldset>',
                            '<legend>Ship To:</legend>',
                            '<div>{name}<div/>',
                            '<div>{addr1}<div/>',
                            '<div>{addr2}<div/>',                            
                            '<div>{city}{state}{zip}<div/>',
                            '<div>{country}<div/>',
                            '<div>Phone: {phone1}<div/>',
                            '<div>Fax: {fax}<div/>',
                        '</fieldset>',
                        '<div class="item-boxer">',
                            '<div class="box-row">',                                    
                                '<div class="box ab">',
                                    '<div class="item-boxer">',
                                        '<div class="box rb" style="">PO Date:</div>',                                        
                                        '<div class="box nb" style="">{orderDate}</div>',                                    
                                    '</div>',
                                '</div>',                                    
                            '</div>',
                            '<div class="box-row">',                                    
                                '<div class="box ab">',
                                    '<div class="item-boxer">',
                                        '<div class="box rb" style="">Ex-Factory Date</div>',                                        
                                        '<div class="box nb" style="">{endDate}</div>',                                    
                                    '</div>',
                                '</div>',                                    
                            '</div>',
                        '</div>',
                    '</td>',                    
                '</tr>',        
                '<tr>',
                    '<td>',
                        '<div class="item-boxer">',
                            '<div class="box-row">',                                    
                                '<div class="box ab">',
                                    '<div class="item-boxer">',
                                        '<div class="box rb" style="">Main Label</div>',                                        
                                        '<div class="box rb" style=""></div>',                                        
                                        '<div class="box rb" style="">TECH TEAM</div>',                                        
                                        '<div class="box nb" style=""></div>',                                    
                                    '</div>',
                                '</div>',                                    
                            '</div>',
                            '<div class="box-row">',                                    
                                '<div class="box ab">',
                                    '<div class="item-boxer">',
                                        '<div class="box rb" style="">PO Type</div>',                                        
                                        '<div class="box rb" style=""></div>',                                        
                                        '<div class="box rb" style="">Sugg. Retail</div>',                                        
                                        '<div class="box nb" style=""></div>',                                    
                                    '</div>',
                                '</div>',                                    
                            '</div>',
                            '<div class="box-row">',                                    
                                '<div class="box ab">',
                                    '<div class="item-boxer">',
                                        '<div class="box rb" style="">Coordinator</div>',                                        
                                        '<div class="box rb" style=""></div>',                                        
                                        '<div class="box rb" style="">Size Label</div>',                                        
                                        '<div class="box nb" style=""></div>',                                    
                                    '</div>',
                                '</div>',                                    
                            '</div>',
                            '<div class="box-row">',                                    
                                '<div class="box ab">',
                                    '<div class="item-boxer">',
                                        '<div class="box rb" style="">Pack</div>',                                        
                                        '<div class="box rb" style=""></div>',                                        
                                        '<div class="box rb" style="">Care Label</div>',                                        
                                        '<div class="box nb" style=""></div>',                                    
                                    '</div>',
                                '</div>',                                    
                            '</div>',
                            '<div class="box-row">',                                    
                                '<div class="box ab">',
                                    '<div class="item-boxer">',
                                        '<div class="box rb" style="">Hang Tag</div>',                                        
                                        '<div class="box rb" style=""></div>',                                        
                                        '<div class="box rb" style="">Hanger</div>',                                        
                                        '<div class="box nb" style=""></div>',                                    
                                    '</div>',
                                '</div>',                                    
                            '</div>',
                            '<div class="box-row">',                                    
                                '<div class="box ab">',
                                    '<div class="item-boxer">',
                                        '<div class="box rb" style="">COO Label</div>',                                        
                                        '<div class="box rb" style=""></div>',                                        
                                        '<div class="box rb" style="">Polybagg</div>',                                        
                                        '<div class="box nb" style=""></div>',                                    
                                    '</div>',
                                '</div>',                                    
                            '</div>',
                            '<div class="box-row">',                                    
                                '<div class="box ab">',
                                    '<div class="item-boxer">',
                                        '<div class="box rb" style="">SO #</div>',                                        
                                        '<div class="box rb" style=""></div>',                                        
                                        '<div class="box rb" style="">Sizer</div>',                                        
                                        '<div class="box nb" style=""></div>',                                    
                                    '</div>',
                                '</div>',                                    
                            '</div>',
                            '<div class="box-row">',                                    
                                '<div class="box ab">',
                                    '<div class="item-boxer">',
                                        '<div class="box rb" style="">Cust. PO #</div>',                                        
                                        '<div class="box rb" style=""></div>',                                        
                                        '<div class="box rb" style="">Barcode STKR</div>',                                        
                                        '<div class="box nb" style=""></div>',                                    
                                    '</div>',
                                '</div>',                                    
                            '</div>',
                        '</div>',                         
                    '</td>',                    
                '</tr>',                        
            '</table>',            
            {
                // XTemplate configuration:
                //disableFormats: true,
                // member functions:
                isValueEmpty: function(value){
                   return value.length == 0;
                }
            }                                                                               
        ); 

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
            tooltip: "Refresh print pick ticket",
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
            tooltip: "Pick ticket to print",
            ui: "default",
            //reference: 'refresh',
            iconCls: "x-fa fa-print",
            //width: 80,
            hidden: false,
            handler: function(item, e){
                //me.fireEvent("itemclickprint", me, item);                

                var innerView = me.getComponent('innerView');
                //console.log('innerView', innerView);
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

                items: [{
                    xtype: 'component',
                    name: 'pickHeader',                        
                    //width: 260,                        
                    height: 93,
                    style: {
                        //border: '1px solid #cfcfcf'
                    },
                    tpl: headerTpl,
                    bind: {
                        data: '{thePickTicket}'
                    }
                },{
                    xtype: "dataview",
                    
                    reference: "print-pt-view",
                    cls: "pick-ticket-view",                                        
                    margin: '0px 0 0 13px',
                    //flex: 1,
                    bodyPadding: 0,
                    //scrollable: "y",
                    loadMask: true,
                    overItemCls: "x-item-over",
                    itemSelector: "div.item-selector",
                    enableTextSelection: false,                                                
                    preserveScrollOnRefresh: true,
                    deferInitialRefresh: true,    

                    //padding: '-7px 0 0 0',                                                                                

                    bind: {
                        store: '{thePickTicket.PickDs}'
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

                '<div class="item-boxer" style="width:1800px;margin: 5px;">',
                    '<div class="box-row">',
                        '<div class="box nb" style=""></div>',
                        '<div class="box ab">',
                            '<div class="item-boxer">',
                                '<div class="box rb center" style="width:160px;">Style</div>',
                                '<div class="box nb center" style="width:160px;">Color</div>',
                            '</div>',
                        '</div>',
                        '<div class="box">',
                            '<div class="item-boxer">',
                                '<div class="box nb" style="width:50px;">{size1}</div>',
                                '<div class="box nb" style="width:50px;">{size2}</div>',
                                '<div class="box nb" style="width:50px;">{size3}</div>',
                                '<div class="box nb" style="width:50px;">{size4}</div>',
                                '<div class="box nb" style="width:50px;">{size5}</div>',
                                '<div class="box nb" style="width:50px;">{size6}</div>',
                                '<div class="box nb" style="width:50px;">{size7}</div>',
                                '<div class="box nb" style="width:50px;">{size8}</div>',
                                '<div class="box nb" style="width:50px;">{size9}</div>',
                                '<div class="box nb" style="width:50px;">{size10}</div>',
                                '<div class="box nb" style="width:50px;">{size11}</div>',
                                '<div class="box nb" style="width:50px;">{size12}</div>',
                                '<div class="box nb" style="width:82px;">Total</div>',
                            '</div>',
                        '</div>',                                                
                    '</div>',
                    '<div class="box-row">',
                        '<div class="box nb" style=""></div>',
                        '<div class="box ab" style="">',
                            '<div class="item-boxer">',
                                '<div class="box rb center" style="width:160px;">{style}</div>',
                                '<div class="box nb center" style="width:160px;">{color}</div>',
                            '</div>',
                        '</div>',                                
                        '<div class="box">',
                            '<div class="item-boxer">',
                                '<div class="box nb" style="width:50px;">{unit1}</div>',
                                '<div class="box nb" style="width:50px;">{unit2}</div>',
                                '<div class="box nb" style="width:50px;">{unit3}</div>',
                                '<div class="box nb" style="width:50px;">{unit4}</div>',
                                '<div class="box nb" style="width:50px;">{unit5}</div>',
                                '<div class="box nb" style="width:50px;">{unit6}</div>',
                                '<div class="box nb" style="width:50px;">{unit7}</div>',
                                '<div class="box nb" style="width:50px;">{unit8}</div>',
                                '<div class="box nb" style="width:50px;">{unit9}</div>',
                                '<div class="box nb" style="width:50px;">{unit10}</div>',
                                '<div class="box nb" style="width:50px;">{unit11}</div>',
                                '<div class="box nb" style="width:50px;">{unit12}</div>',
                                '<div class="box nb" style="width:82px;">{totalUnit:usMoney}</div>',
                            '</div>',
                        '</div>',                        
                    '</div>',
                    '<div class="box-row">',
                        '<div class="box ab center" style="width:30px;">Memo</div>',
                        '<div class="box ab" style="width:320px;">{division}</div>',
                        '<div class="box ab" style="width:320px;">{descript}</div>',                        
                    '</div>',
                    '<div class="box-row">',
                        '<div class="box nb" style=""></div>',
                        '<div class="box ab">',
                            '<div class="item-boxer">',
                                '<div class="box rb center" style="width:160px;"></div>',
                                '<div class="box nb center" style="width:160px;">Style Total</div>',
                            '</div>',
                        '</div>',
                        '<div class="box ab">',
                            '<div class="item-boxer">',
                                '<div class="box rb" style="width:50px;"></div>',
                                '<div class="box rb" style="width:50px;"></div>',
                                '<div class="box rb" style="width:50px;"></div>',
                                '<div class="box rb" style="width:50px;"></div>',
                                '<div class="box rb" style="width:50px;"></div>',
                                '<div class="box rb" style="width:50px;"></div>',
                                '<div class="box rb" style="width:50px;"></div>',
                                '<div class="box rb" style="width:50px;"></div>',
                                '<div class="box rb" style="width:50px;"></div>',
                                '<div class="box rb" style="width:50px;"></div>',
                                '<div class="box rb" style="width:50px;"></div>',                                                                
                                '<div class="box rb" style="width:82px;"></div>',
                            '</div>',
                        '</div>',                        
                    '</div>',
                '</div>',  

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
