
Ext.define('August.view.sales.windows.PrintSO',{    
    extend: 'Ext.window.Window',

    requires: [
        'August.view.sales.windows.PrintSOController',
        'August.view.sales.windows.PrintSOModel'
    ],

    alias: 'widget.sales-windows-printso',

    controller: 'sales-windows-printso',
    viewModel: {
        type: 'sales-windows-printso'
    },        

    cls: 'print-so-preview',    

    header: {
        title: 'Print Sales Order',
        iconCls: 'x-fa fa-code',
        titlePosition: 0,
        titleAlign: 'left'
    },

    //session: true,
    minWidth: 720,
    minHeight: 480,
    maximized: true,

    //modal: true,
    monitorResize: true,
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
        itemclickrefresh: 'onItemClickRefresh'
        //itemclickprint: 'onItemClickPrint'
    },

    initComponent: function(){
        var me = this;                        

        var headerTpl = new Ext.XTemplate(
            //'<div class="sheet" style="width:11in;margin-top:0in;margin-left:0.2in;padding-right:0.2in;">',
            //'<div class="print-pt-view">',
            '<div class="item-boxer">',

                '<div class="box-row">',   
                    '<div class="box nb"><img src="http://209.37.126.195:8088/ProductImages/august_logo.jpg" width="187" height="108"></img></div>',                                    
                    
                    '<div class="item-boxer">',
                        '<div class="box-row">',
                            '<div class="box" style="width:380px;height:40px;text-align:center; font-size:40px; font-weight:bold;">Sales Order</div>', 
                            '<div class="box nb" style="width:165px;font-size:24px;font-weight:bold;">{status}</div>',  
                            '<div class="box nb">',                                                                       
                                //'<svg class="barcode" jsbarcode-format="code128" jsbarcode-value="{pono}" jsbarcode-height="32" jsbarcode-margin="0" jsbarcode-textmargin="0" jsbarcode-fontsize="11"></svg>',                                    
                                //'<svg class="barcode" jsbarcode-value="{pickno}" jsbarcode-displayValue="false" jsbarcode-height="56" jsbarcode-margin="0" jsbarcode-textmargin="0"></svg>',                                    
                                
                            '</div>',                      
                        '</div>',                                        
                    '</div>',     

                    '<div class="item-boxer" style="margin-left:70px;font-size:16px;font-weight:bold;text-align:center;">', 
                        '<div class="box-row">',                                   
                            '<div class="box ab">',                                                                    
                                '<div class="box rb" style="width:120px;">Order #</div>',                                        
                                '<div class="box nb" style="width:165px;">{orderno}</div>',                                                                        
                            '</div>',          
                        '</div>',                      
                        '<div class="box-row">',                                                                                         
                            '<div class="box ab">',                                                                                    
                                '<div class="box rb" style="width:120px;">Order Date</div>',  
                                '<div class="box nb" style="width:165px;">{orderDate:date("Y-m-d")}</div>',                                                                        
                            '</div>',                            
                        '</div>',    
                        '<div class="box-row">',                                   
                            '<div class="box ab">',                                                                    
                                '<div class="box rb" style="width:120px;">Ship Date</div>',                                        
                                '<div class="box nb" style="width:165px;">{startDate:date("Y-m-d")}</div>',                                                                        
                            '</div>',          
                        '</div>',                      
                        '<div class="box-row">',                                                                                         
                            '<div class="box ab">',                                                                                    
                                '<div class="box rb" style="width:120px;">Cancel Date</div>',                                        
                                '<div class="box nb" style="width:165px;">{cancelDate:date("Y-m-d")}</div>',                                                                        
                            '</div>',                            
                        '</div>',
                    '</div>',  
                        
                '</div>',                     
            '</div>',   
            
            '<div class="item-boxer">',

                '<div class="box-row">',

                    '<div class="box nb" style="text-align:center;padding: 0 5px 10px 0;">',
                        '<div class="box-row">',
                            '<div class="box nb" style="height:44px;">',
                                
                            '</div>',
                        '</div>',                                        

                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                '<div class="box rb" style="width:80px;">Customer</div>',
                                '<div class="box rb" style="width:205px;">{customer}</div>',
                                '<div class="box rb" style="width:80px;">Ship To</div>',
                                '<div class="box nb" style="width:205px;">{shipTo}</div>',                                                        
                            '</div>',
                        '</div>',                

                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                //'<div class="box rb" style="width:80px;">Name</div>',
                                '<div class="box rb" style="width:285px;">{customerAddress.name}</div>',
                                //'<div class="box rb" style="width:80px;">Name</div>',
                                '<div class="box nb" style="width:285px;">{shipToAddress.name}</div>',                                                        
                            '</div>',
                        '</div>',

                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                //'<div class="box rb" style="width:80px;">Addr1</div>',
                                '<div class="box rb" style="width:285px;">{customerAddress.addr1:ellipsis(38)}</div>',
                                //'<div class="box rb" style="width:80px;">Addr1</div>',
                                '<div class="box nb" style="width:285px;">{shipToAddress.addr1:ellipsis(38)}</div>',
                                                    
                            '</div>',
                        '</div>',

                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                //'<div class="box rb" style="width:80px;">Addr2</div>',
                                '<div class="box rb" style="width:285px;">{customerAddress.addr2:ellipsis(38)}</div>',
                                //'<div class="box rb" style="width:80px;">Addr2</div>',
                                '<div class="box nb" style="width:285px;">{shipToAddress.addr2:ellipsis(38)}</div>',                                                
                            '</div>',
                        '</div>',

                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                //'<div class="box rb" style="width:35px">City</div>',
                                '<div class="box rb" style="width:195px;">{customerAddress.city}</div>',
                                //'<div class="box rb" style="width:40px;">State</div>',
                                '<div class="box rb" style="width:40px;">{customerAddress.state}</div>',
                                //'<div class="box rb" style="width:35px;">Zip</div>',
                                '<div class="box rb" style="width:50px;">{customerAddress.zip}</div>',
                                //'<div class="box rb" style="width:35px">City</div>',
                                '<div class="box rb" style="width:195px">{shipToAddress.city}</div>',
                                //'<div class="box rb" style="width:40px">State</div>',
                                '<div class="box rb" style="width:40px">{shipToAddress.state}</div>',
                                //'<div class="box rb" style="width:35px">Zip</div>',
                                '<div class="box nb" style="width:50px">{shipToAddress.zip}</div>', 
                            '</div>',
                        '</div>',

                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                //'<div class="box rb" style="width:80px;">Country</div>',
                                '<div class="box rb" style="width:285px;">{customerAddress.country}</div>',
                                //'<div class="box rb" style="width:80px;">Country</div>',
                                '<div class="box nb" style="width:285px;">{shipToAddress.country}</div>',                                                            
                            '</div>',
                        '</div>', 
                        
                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                '<div class="box rb" style="width:80px;">Phone</div>',
                                '<div class="box rb" style="width:205px;">{customerAddress.phone1}</div>',
                                '<div class="box rb" style="width:80px;">Phone</div>',
                                '<div class="box nb" style="width:205px;">{shipToAddress.phone1}</div>',                                                
                            '</div>',
                        '</div>',

                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                '<div class="box rb" style="width:80px;">Fax</div>',
                                '<div class="box rb" style="width:205px;">{customerAddress.fax1}</div>',
                                '<div class="box rb" style="width:80px;">Fax</div>',
                                '<div class="box nb" style="width:205px;">{shipToAddress.fax1}</div>',                                                
                            '</div>',
                        '</div>',
                        
                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                '<div class="box rb" style="width:80px;">Store</div>',
                                '<div class="box rb" style="width:205px;">{store}</div>',
                                '<div class="box rb" style="width:80px;">DC</div>',
                                '<div class="box nb" style="width:205px;">{dc}</div>',                                                
                            '</div>',
                        '</div>',

                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                '<div class="box rb" style="width:80px;">Factor</div>',
                                '<div class="box rb" style="width:205px;">{factor}</div>',
                                '<div class="box rb" style="width:80px;">Factor Ref#</div>',
                                '<div class="box nb" style="width:205px;">{cit_ref_no}</div>',                                                
                            '</div>',
                        '</div>',

                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                '<div class="box rb" style="width:80px;">Term</div>',
                                '<div class="box rb" style="width:205px;">{term}</div>',
                                '<div class="box rb" style="width:80px;">PMT Method</div>',
                                '<div class="box nb" style="width:205px;">{paymentcode}</div>',                                                
                            '</div>',
                        '</div>',

                    '</div>',

                    '<div class="box nb" style="text-align:center;">',
                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                '<div class="box rb" style="width:90px;">Division</div>',
                                '<div class="box rb" style="width:72px;">{division:trim}</div>',     
                                '<div class="box rb" style="width:80px;">Cust. P.O</div>',
                                '<div class="box nb" style="width:82px;">{customerpo:trim}</div>',  
                            '</div>',
                        '</div>',
                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                '<div class="box rb" style="width:90px;">Bulk Order</div>',
                                '<div class="box rb" style="width:72px;">{bulkOrder:trim}</div>',  
                                '<div class="box rb" style="width:80px;">Ship Via</div>',
                                '<div class="box nb" style="width:82px;">{shipVia}</div>',  
                            '</div>',
                        '</div>',
                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                '<div class="box rb" style="width:90px;">Disc Rate</div>',
                                '<div class="box rb" style="width:72px;">{discountRate}</div>',  
                                '<div class="box rb" style="width:80px;">Dept</div>',
                                '<div class="box nb" style="width:82px;">{dept}</div>',  
                            '</div>',
                        '</div>',
                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                '<div class="box rb" style="width:162px;">Memo</div>',
                                '<div class="box rb" style="width:80px;">Type</div>',  
                                '<div class="box nb" style="width:82px;">{type:trim}</div>',  
                            '</div>',
                        '</div>',
                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',                                
                                '<div class="box nb" style="width:324px;height:170px">{memo}</div>',  
                            '</div>',
                        '</div>',
                        
                    '</div>',

                '</div>',
            '</div>'
                                    
            //'</div>',                                                                                                                    
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

        me.actPrint = Ext.create('Ext.Action', {
            text: "Print",
            tooltip: "Sales Order to print",
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
                    name: 'printSoHeader',                        
                    margin: '0 0 0 13px',
                    width: 920,
                    //height: 93,
                    padding: '0 13px 0 0',
                    style: {
                        //border: '1px solid #cfcfcf'
                    },

                    tpl: headerTpl,
                    
                    bind: {
                        //data: '{theOrder}'
                    },

                    listeners: {
                        boxready: function(c){
                            //console.log('boxready', document.getElementsByClassName('barcode'), document.getElementById('po-barcode'));
                        },
                        afterrender: function(c) {
                            
                        }
                    }
                },{
                    xtype: "dataview",
                    
                    reference: "print-so-view",
                    cls: "print-so-view",                                        
                    margin: '15px 0 0 15px',

                    width: 920,
                    //flex: 1,
                    bodyPadding: 0,
                    //scrollable: "y",
                    //loadMask: false,
                    overItemCls: "x-item-over",
                    itemSelector: "div.item-selector",
                    enableTextSelection: false,                                                
                    preserveScrollOnRefresh: true,
                    //deferInitialRefresh: true,    

                    //padding: '-7px 0 0 0',                                                                                

                    bind: {
                        store: '{theOrder.salesorderitems}'
                    },                    

                    listeners: {                                           
                        beforecontainerclick: function(dv){
                            return false;
                        }
                    },

                    tpl: me.buildTemplate()
                },                
                {
                    xtype: 'component',
                    name: 'printSoFooter',                        
                    margin: '13px 0 0 13px',
                    width: 920,
                    //height: 93,
                    padding: '0 13px 0 0',
                    style: {
                        //border: '1px solid #cfcfcf'
                    },                    

                    tpl: new Ext.XTemplate(
                        '<div class="page-break" style="font-size: 0.87em;">',
                            '<div class="box nb" style="margin-bottom: 60px;">{memo}</div>',
                            '<div class="box nb" style="margin-bottom: 20px;">{trimmemo}</div>',
                        '</div>'
                    )
                }
                
                ]
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
            me.actPrint                            
        );

        config.items = items;

        return [
            config  
        ];
    },        
    
    buildContextMenu: function(){
        return Ext.create('Ext.menu.Menu', {
            items: [this.actPrint]
        });
    },
    
    onDestroy: function(){
        this.contextmenu.destroy();
        this.callParent(arguments);
    },

    buildTemplate: function(){
        var me = this;           

        return new Ext.XTemplate(                                                            
            '<tpl for=".">',                        
            //'<div class="item-selector x-unselectable">',    
                '<div class="page-break">',
                    '<div class="item-boxer" style="font-size:0.87em;width:920px;">',
                        '<div class="box" style="padding: 0 7px 7px 0;"><img src="{[this.getSrcPath(values, xcount)]}" width="92"></img></div>',
                        '<div class="item-boxer style="">',         

                            '<div class="box-row">',
                                '<div class="box" style="height:30px;font-size:1.2em;font-weight:bold;">',                            
                                    '<div class="box center" style="width:80px;">Style</div>',
                                    '<div class="box center" style="width:120px;text-align:left;">{style}</div>',                                
                                    //'<div class="box center" style=""></div>',
                                    '<div class="box center">{descript}</div>',    
                                '</div>',                            
                            '</div>',

                            '<div class="box-row">',
                                '<div class="box center" style="height:25px;border-bottom:1px solid #000;font-size:1.2em;font-weight:bold;">',                                
                                    '<div class="box" style="width:170px;">Color</div>',
                                    '<div class="box" style="width:46px;">{Size1}</div>',
                                    '<div class="box" style="width:46px;">{Size2}</div>',
                                    '<div class="box" style="width:46px;">{Size3}</div>',
                                    '<div class="box" style="width:46px;">{Size4}</div>',
                                    '<div class="box" style="width:46px;">{Size5}</div>',
                                    '<div class="box" style="width:46px;">{Size6}</div>',
                                    '<div class="box" style="width:46px;">{Size7}</div>',
                                    '<div class="box" style="width:46px;">{Size8}</div>',
                                    '<div class="box" style="width:46px;">{Size9}</div>',
                                    '<div class="box" style="width:46px;">{Size10}</div>',
                                    //'<div class="box" style="width:46px;">{Size11}</div>',
                                    //'<div class="box" style="width:46px;">{Size12}</div>',
                                    '<div class="box" style="width:54px;">Total</div>',
                                    '<div class="box" style="width:54px;">Price</div>',
                                    '<div class="box" style="width:74px;">Ext Price</div>',
                                    //'<div class="box" style="width:60px;">Status</div>',
                                    //'<div class="box" style="width:60px;">WH</div>',                                
                                '</div>',                                                
                            '</div>',

                            '<div class="box-row">',                                                                                  
                                '<div class="box center">',                                
                                    '<div class="box" style="width:170px;height:25px;">{color}</div>',
                                    '<div class="box" style="width:46px;">{unit1}</div>',
                                    '<div class="box" style="width:46px;">{unit2}</div>',
                                    '<div class="box" style="width:46px;">{unit3}</div>',
                                    '<div class="box" style="width:46px;">{unit4}</div>',
                                    '<div class="box" style="width:46px;">{unit5}</div>',
                                    '<div class="box" style="width:46px;">{unit6}</div>',
                                    '<div class="box" style="width:46px;">{unit7}</div>',
                                    '<div class="box" style="width:46px;">{unit8}</div>',
                                    '<div class="box" style="width:46px;">{unit9}</div>',
                                    '<div class="box" style="width:50px;">{unit10}</div>',
                                    //'<div class="box" style="width:50px;">{unit11}</div>',
                                    //'<div class="box" style="width:50px;">{unit12}</div>',
                                    '<div class="box" style="width:54px;">{totalUnit}</div>',
                                    '<div class="box" style="width:54px;">{price:usMoney}</div>',
                                    '<div class="box" style="width:74px;">{extPrice:usMoney}</div>',
                                    //'<div class="box" style="width:60px;">{status}</div>',
                                    //'<div class="box" style="width:60px;">{warehouse:this.format(5)}</div>',
                                '</div>',                                            
                            '</div>', 

                            '<div class="box-row">',
                                '<div class="box" style="height:20px;font-weight:bold;">',                                
                                    '<div class="box" style="width:70px;text-align: center;">Memo:</div>',
                                    '<div class="box" style="width:240px;">{memo}</div>',
                                    '<div class="box" style="width:100px;">Bin Location:</div>',
                                    '<div class="box" style="width:120px;">{binlocation}</div>',
                                    '<div class="box" style="width:110px;">Bin Location 2:</div>',
                                    '<div class="box" style="width:120px;">{binlocation2}</div>',
                                    
                                '</div>',                        
                                //'<div class="box nb" style="font-weight:bold;">{descript}</div>',                        
                            '</div>', 

                        '</div>',
                                                                        
                    '</div>',  
                    
                '</div>',
            
            '</tpl>',              
            //'<div class="box nb" style=""></div>',
            
            '<div class="item-boxer" style="margin-left:98px;border-top:3px solid black;">',
                '<div class="box-row">',                                                                                  
                    '<div class="box center" style="height:25px;font-size:1.0em;">',                                
                        '<div class="box" style="width:170px;">Total</div>',
                        '<div class="box" style="width:46px;">{[this.getSummary("unit1")]}</div>',
                        '<div class="box" style="width:46px;">{[this.getSummary("unit2")]}</div>',
                        '<div class="box" style="width:46px;">{[this.getSummary("unit3")]}</div>',
                        '<div class="box" style="width:46px;">{[this.getSummary("unit4")]}</div>',
                        '<div class="box" style="width:46px;">{[this.getSummary("unit5")]}</div>',
                        '<div class="box" style="width:46px;">{[this.getSummary("unit6")]}</div>',
                        '<div class="box" style="width:46px;">{[this.getSummary("unit7")]}</div>',
                        '<div class="box" style="width:46px;">{[this.getSummary("unit8")]}</div>',
                        '<div class="box" style="width:46px;">{[this.getSummary("unit9")]}</div>',
                        '<div class="box" style="width:50px;">{[this.getSummary("unit10")]}</div>',
                        //'<div class="box" style="width:50px;">{unit11}</div>',
                        //'<div class="box" style="width:50px;">{unit12}</div>',
                        '<div class="box" style="width:54px;">{[this.getSummary("totalunit")]}</div>',
                        '<div class="box" style="width:54px;"></div>',
                        '<div class="box" style="width:74px;">{[this.getSummary("extPrice")]}</div>',
                        //'<div class="box" style="width:60px;">{status}</div>',
                        //'<div class="box" style="width:60px;">{warehouse:this.format(5)}</div>',
                    '</div>',                                            
                '</div>',  
            '</div>',                                                      
            {
                getSrcPath: function(v,n){                                                                                           

                    return url = 'https://endlessrose.net:9443/StyleImages/200xImages/' + v.style.trim() + '_' + v.color.trim().replace('/', '-') + '_front.jpg';                                                      ;
                    //return a.replace(/(\.[^.]+)$/, "_medium$1");
                },
                getExtPrice: function(v,n) {                    
                    return v.price * v.totalUnit;
                },
                format: function(v, n){                                
                    var xf = Ext.util.Format;
                    if(!Ext.isEmpty(v)){                                    
                        return xf.trim(v).substring(0, n).toUpperCase();                                    
                    }
                },
                getSummary: function(field){
                    var xf = Ext.util.Format,
                        store = me.down('dataview').getStore();
                        
                    //store.group('style');
                    var total = store.sum(field);

                    return field != 'extPrice' ? total : xf.usMoney(total);
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
            '@page { size: 8.5in 11in; margin-top: 20px; }',
                'html, body { width: 8.5in; height: 11in; margin:0; font-family: Arial, sans-serif, Helvetica, Helvetica Neue; }',
                
                //'.print-pt-view .item-selector {',    
                '.sheet { page-break-inside: avoid; page-break-before: always; }',
                '.page-break { page-break-inside: avoid; page-break-before: auto; }',            
            //'@media print { width: 8.5in; height: 11in; margin: 0; } ',

            '@media print { ',
                '@page { size: 8.5in 11in; margin-top: 20px; }',                

                'html, body { width: 8.5in; height: 11in; margin:0; font-family: Arial, sans-serif, Helvetica, Helvetica Neue; }',                
                '.sheet { page-break-inside: avoid; page-break-before: always; }',
                '.page-break { page-break-inside: avoid; page-break-before: auto; }',         

                '.print-pt-view .item-selector {',
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
                '.item-boxer {',
                    'display: table;',
                    'border-collapse: collapse;',
                '} ',
                '.item-boxer .box-row {',
                    'display: table-row;',
                    'border-collapse: collapse;',
                '} ',
                '.item-boxer .center {',
                    'text-align: center;',
                '} ',    
                '.item-boxer .right {',
                    'text-align: right;',
                '} ',     
                '.item-boxer .box {',
                    'display: table-cell;',
                    //'padding: 0px 2px 0px 2px;',
                    'vertical-align: middle;',
                '} ',                           
                '.item-boxer .ab {',
                    'border: 1px solid black;',
                '} ',                  
                '.item-boxer .rb {',
                    'border-right: 1px solid black;',
                '} ',
                '.item-boxer .lb {',
                    'border-left: 1px solid black;',
                '} ',                
                '.item-boxer .nb {',
                    'border: none;',
                '}',
            '}'                                                            
        );
    }
});

