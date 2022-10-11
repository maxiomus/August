
Ext.define('August.view.purchase.windows.PrintSO',{    
    extend: 'Ext.window.Window',

    requires: [
        'August.view.purchase.windows.PrintSOController',
        'August.view.purchase.windows.PrintSOModel'
    ],

    alias: 'widget.purchase-windows-printso',

    controller: 'purchase-windows-printso',
    viewModel: {
        type: 'purchase-windows-printso'
    },        

    cls: 'print-po-preview',    

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
            '<table class="print-so-view">',
                '<tr>',
                    '<td>',                        
                        '<div class="item-boxer">',
                            
                            '<div class="box nb"><img src="http://209.37.126.195:8088/ProductImages/august_logo.jpg" width="187" height="108"></img></div>',                                    
                                
                            '<div class="item-boxer">',

                                '<div class="box-row">',
                                    '<div class="box" style="width:380px; height:60px;text-align:center; font-size:40px; font-weight:bold;">Purchase Order</div>', 
                                    '<div class="box"><b style="font-size: 20px;">{type}</b> <br />Updated On {updateDate:date("Y-m-d")}</div>',
                                '</div>',        

                                '<div class="box-row">',                                    
                                    '<div class="item-boxer ab" style="margin-left:70px;height:30px;">',
                                        '<div class="box rb" style="font-size:20px;font-weight:bold;width:120px;text-align:center;">Cut No.:</div>',                                        
                                        '<div class="box nb" style="font-size:20px;font-weight:bold;width:120px;text-align:center;">{pono}</div>',                                    
                                    '</div>',                                       
                                    '<div class="box nb">',                                                                       
                                        //'<svg class="barcode" jsbarcode-format="code128" jsbarcode-value="{pono}" jsbarcode-height="32" jsbarcode-margin="0" jsbarcode-textmargin="0" jsbarcode-fontsize="11"></svg>',                                    
                                        '<svg class="barcode" jsbarcode-value="{pono}" jsbarcode-displayValue="false" jsbarcode-height="56" jsbarcode-margin="0" jsbarcode-textmargin="0"></svg>',                                    
                                    '</div>',                      
                                '</div>',
                            '</div>',                                                                 
                                                                                      
                        '</div>',
                    '</td>',                    
                    '<td rowspan="3">',                        
                        '<img src="http://209.37.126.195:9090/StyleImages/200xImages/{imageName}" width="209" height="316"></img>',
                    '</td>',
                '</tr>',        
                '<tr>',
                    '<td>',
                        '<table>',
                            '<tr>',
                                '<td>',
                                    '<div class="box ab" style="width:320px;font-size:0.87em;">',                                    
                                        '<div><b>Vendor:</b></div>',
                                        '<div>{vendorAddress.name}<div/>',
                                        '<div>{vendorAddress.addr1:ellipsis(38)}<div/>',
                                        '<div>{vendorAddress.addr2:ellipsis(38)}<div/>',   
                                        '<div class="item-boxer">',
                                            '<div class="box" style="width:130px;">{vendorAddress.city}</div>',                                        
                                            '<div class="box" style="width:30px;">{vendorAddress.state}</div>',                                    
                                            '<div class="box" style="">{vendorAddress.zip}</div>',                                    
                                        '</div>',                                                                 
                                        '<div>{vendorAddress.country}<div/>',
                                        '<div>Phone: {vendorAddress.phone1}<div/>',
                                        '<div>Fax: {vendorAddress.fax1}<div/>',  
                                    '</div>',
                                '</td>',
                                '<td>',                                    
                                    '<div class="box ab" style="width:300px;font-size:0.87em;">',                                    
                                        '<div class="box"><b>Ship To:</b></div>',
                                        '<div class="box">{shipToAddress.name}<div/>',
                                        '<div class="box">{shipToAddress.addr1:ellipsis(38)}<div/>',
                                        '<div class="box">{shipToAddress.addr2:ellipsis(38)}<div/>',   
                                        '<div class="item-boxer">',
                                            '<div class="box" style="width:130px;">{shipToAddress.city}</div>',                                        
                                            '<div class="box" style="width:30px;">{shipToAddress.state}</div>',                                    
                                            '<div class="box" style="">{shipToAddress.zip}</div>',                                    
                                        '</div>',                                                                 
                                        '<div class="box">{shipToAddress.country}<div/>',
                                        '<div class="box">Phone: {shipToAddress.phone1}<div/>',
                                        '<div class="box">Fax: {shipToAddress.fax1}<div/>',
                                    '</div>',
                                '</td>',
                                '<td>',
                                    '<div class="box ab" style="width:250px;font-size:0.87em;text-align:center;">',                                    
                                        '<div class="item-boxer">',
                                            '<div class="box-row">',                                    
                                                '<div class="box ab">',
                                                    '<div class="item-boxer">',
                                                        '<div class="box rb" style="width:130px;">PO Date:</div>',                                        
                                                        '<div class="box nb" style="width:120px;">{orderDate:date("Y-m-d")}</div>',                                    
                                                    '</div>',
                                                '</div>',                                    
                                            '</div>',
                                            '<div class="box-row">',                                    
                                                '<div class="box ab">',
                                                    '<div class="item-boxer">',
                                                        '<div class="box rb" style="width:130px;">Ex-Factory Date</div>',                                        
                                                        '<div class="box nb" style="width:120px;">{cancelDate:date("Y-m-d")}</div>',                                    
                                                    '</div>',
                                                '</div>',                                    
                                            '</div>',
                                        '</div>',
                                    '</div>',    
                                '</td>',
                            '</tr>',
                        '</table>',                                                                                                                                                                                             
                    '</td>',                    
                '</tr>',        
                '<tr>',
                    '<td>',
                        '<div class="item-boxer" style="font-size:0.87em;">',
                            '<div class="box-row">',                                    
                                '<div class="box ab">',
                                    '<div class="item-boxer">',
                                        '<div class="box rb" style="width:90px;">Main Label</div>',                                        
                                        '<div class="box rb" style="width:160px;">{user1}</div>',                                        
                                        '<div class="box rb" style="width:110px;">TECH TEAM</div>',                                        
                                        '<div class="box nb" style="width:160px;">{user5}</div>',                                    
                                    '</div>',
                                '</div>',                                    
                            '</div>',
                            '<div class="box-row">',                                    
                                '<div class="box ab">',
                                    '<div class="item-boxer">',
                                        '<div class="box rb" style="width:90px;">PO Type</div>',                                        
                                        '<div class="box rb" style="width:160px;">{user2}</div>',                                        
                                        '<div class="box rb" style="width:110px;">Sugg. Retail</div>',                                        
                                        '<div class="box nb" style="width:160px;">{user6}</div>',                                    
                                    '</div>',
                                '</div>',                                    
                            '</div>',
                            '<div class="box-row">',                                    
                                '<div class="box ab">',
                                    '<div class="item-boxer">',
                                        '<div class="box rb" style="width:90px;">Coordinator</div>',                                        
                                        '<div class="box rb" style="width:160px;">{user3}</div>',                                        
                                        '<div class="box rb" style="width:110px;">Size Label</div>',                                        
                                        '<div class="box nb" style="width:160px;">{user7}</div>',                                    
                                    '</div>',
                                '</div>',                                    
                            '</div>',
                            '<div class="box-row">',                                    
                                '<div class="box ab">',
                                    '<div class="item-boxer">',
                                        '<div class="box rb" style="width:90px;">Pack</div>',                                        
                                        '<div class="box rb" style="width:160px;">{user4}</div>',                                        
                                        '<div class="box rb" style="width:110px;">Care Label</div>',                                        
                                        '<div class="box nb" style="width:160px;">{user8}</div>',                                    
                                    '</div>',
                                '</div>',                                    
                            '</div>',
                            '<div class="box-row">',                                    
                                '<div class="box ab">',
                                    '<div class="item-boxer">',
                                        '<div class="box rb" style="width:90px;">Hang Tag</div>',                                        
                                        '<div class="box rb" style="width:160px;">{user9}</div>',                                        
                                        '<div class="box rb" style="width:110px;">Hanger</div>',                                        
                                        '<div class="box nb" style="width:160px;">{user11}</div>',                                    
                                    '</div>',
                                '</div>',                                    
                            '</div>',
                            '<div class="box-row">',                                    
                                '<div class="box ab">',
                                    '<div class="item-boxer">',
                                        '<div class="box rb" style="width:90px;">COO Label</div>',                                        
                                        '<div class="box rb" style="width:160px;">{user10}</div>',                                        
                                        '<div class="box rb" style="width:110px;">Polybagg</div>',                                        
                                        '<div class="box nb" style="width:160px;">{user12}</div>',                                    
                                    '</div>',
                                '</div>',                                    
                            '</div>',
                            '<div class="box-row">',                                    
                                '<div class="box ab">',
                                    '<div class="item-boxer">',
                                        '<div class="box rb" style="width:90px;">SO #</div>',                                        
                                        '<div class="box rb" style="width:160px;">{soNo}</div>',                                        
                                        '<div class="box rb" style="width:110px;">Sizer</div>',                                        
                                        '<div class="box nb" style="width:160px;">{user13}</div>',                                    
                                    '</div>',
                                '</div>',                                    
                            '</div>',
                            '<div class="box-row">',                                    
                                '<div class="box ab">',
                                    '<div class="item-boxer">',
                                        '<div class="box rb" style="width:90px;">Cust. PO #</div>',                                        
                                        '<div class="box rb" style="width:160px;">{cust_po}</div>',                                        
                                        '<div class="box rb" style="width:110px;">Barcode STKR</div>',                                        
                                        '<div class="box nb" style="width:160px;">{user14}</div>',                                    
                                    '</div>',
                                '</div>',                                    
                            '</div>',
                        '</div>',                         
                    '</td>',                    
                '</tr>',                        
            '</table>',             
            {   
                getSrcPath: function(a,b){                                                                       
                    var item = a.purchaseorderitems[0];                                                            

                    return url = 'http://209.37.126.195:9090/StyleImages/200xImages/' + item.style + '_' + item.color.replace('/', '-') + '_front.jpg';                                                      ;
                    //return a.replace(/(\.[^.]+)$/, "_medium$1");
                }
            },        
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

        me.actPrint = Ext.create('Ext.Action', {
            text: "Print",
            tooltip: "Purchase Order to print",
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
                    name: 'printPoHeader',                        
                    margin: '0 0 0 13px',
                    //width: 1056,
                    //height: 93,
                    padding: '0 13px 0 0',
                    style: {
                        //border: '1px solid #cfcfcf'
                    },

                    tpl: headerTpl,
                    
                    bind: {
                        //data: '{thePO}'
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
                    
                    reference: "print-po-view",
                    cls: "print-po-view",                                        
                    margin: '15px 0 0 15px',

                    //width: 1056,
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
                        store: '{thePO.purchaseorderitems}'
                    },                    

                    listeners: {                                           
                        beforecontainerclick: function(dv){
                            return false;
                        }
                    },

                    tpl: me.buildTemplate()
                },{
                    xtype: 'component',
                    name: 'printPoFooter',                        
                    margin: '13px 0 0 13px',
                    //width: 1056,
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
                '<div class="item-boxer" style="font-size:0.87em;">',
                    '<div class="box-row">',
                        //'<div class="box nb" style=""></div>',
                        '<div class="box ab">',
                            '<div class="item-boxer" style="width:240px; font-weight: bold;">',
                                '<div class="box rb center" style="width:120px;">Style</div>',
                                '<div class="box nb center" style="width:120px;">Color</div>',
                            '</div>',
                        '</div>',
                        '<div class="box ab center" style="font-weight:bold;">',
                            '<div class="item-boxer">',
                                '<div class="box rb" style="width:50px;">{size1}</div>',
                                '<div class="box rb" style="width:50px;">{size2}</div>',
                                '<div class="box rb" style="width:50px;">{size3}</div>',
                                '<div class="box rb" style="width:50px;">{size4}</div>',
                                '<div class="box rb" style="width:50px;">{size5}</div>',
                                '<div class="box rb" style="width:50px;">{size6}</div>',
                                '<div class="box rb" style="width:50px;">{size7}</div>',
                                '<div class="box rb" style="width:50px;">{size8}</div>',
                                '<div class="box rb" style="width:50px;">{size9}</div>',
                                '<div class="box rb" style="width:50px;">{size10}</div>',
                                '<div class="box rb" style="width:50px;">{size11}</div>',
                                '<div class="box rb" style="width:50px;">{size12}</div>',
                                '<div class="box nb" style="width:82px;">Total</div>',
                            '</div>',
                        '</div>',                                                
                    '</div>',
                    '<div class="box-row">',
                        //'<div class="box nb" style=""></div>',
                        '<div class="box ab">',
                            '<div class="item-boxer" style="width:240px;font-weight:bold;">',
                                '<div class="box rb center" style="width:120px;">{style}</div>',
                                '<div class="box nb center" style="width:120px;">{color}</div>',
                            '</div>',
                        '</div>',                                
                        '<div class="box ab center">',
                            '<div class="item-boxer">',
                                '<div class="box rb" style="width:50px;">{unit1}</div>',
                                '<div class="box rb" style="width:50px;">{unit2}</div>',
                                '<div class="box rb" style="width:50px;">{unit3}</div>',
                                '<div class="box rb" style="width:50px;">{unit4}</div>',
                                '<div class="box rb" style="width:50px;">{unit5}</div>',
                                '<div class="box rb" style="width:50px;">{unit6}</div>',
                                '<div class="box rb" style="width:50px;">{unit7}</div>',
                                '<div class="box rb" style="width:50px;">{unit8}</div>',
                                '<div class="box rb" style="width:50px;">{unit9}</div>',
                                '<div class="box rb" style="width:50px;">{unit10}</div>',
                                '<div class="box rb" style="width:50px;">{unit11}</div>',
                                '<div class="box rb" style="width:50px;">{unit12}</div>',
                                '<div class="box nb" style="width:82px;">{unitSum}</div>',
                            '</div>',
                        '</div>',                        
                    '</div>',                                                          
                '</div>',  
                '<div class="item-boxer" style="margin: 3px;">',
                    '<div class="box-row">',
                        '<div class="box">',
                            '<div class="item-boxer">',
                                '<div class="box" style="width:70px;text-align: center;">Memo:</div>',
                                '<div class="box" style="width:320px;">{memo}</div>',
                            '</div>',
                        '</div>',                        
                        '<div class="box nb" style="font-weight:bold;">{descript}</div>',                        
                    '</div>',  
                '</div>',
            '</div>',
            //'</div>',
            /*
            '{% if (xindex % 3 !== 0) continue; %}',
                '<div style="clear:both;"></div>',
            '{% if (xindex % 30 !== 0) continue; %}',
                '<div class="pagebreak"></div></div><div class="sheet" style="margin-top: 0.51in;margin-left: 0.2in;">', //'<div class="pagebreak"></div>',
            '{% if (xcount-xindex == 0) %}',
                '</div>',
            */
            '</tpl>',              
            //'<div class="box nb" style=""></div>',
            '<div class="item-boxer" style="margin-bottom: 7px;">',
                '<div class="box-row">',
                    '<div class="box ab center">',
                        '<div class="item-boxer">',
                            '<div class="box rb" style="width:120px;"></div>',
                            '<div class="box nb" style="width:120px;font-weight:bold;">Style Total</div>',
                        '</div>',
                    '</div>',
                    '<div class="box ab center">',
                        '<div class="item-boxer"">',
                            '<div class="box rb" style="width:50px;">{[this.getSummary("unit1")]}</div>',
                            '<div class="box rb" style="width:50px;">{[this.getSummary("unit2")]}</div>',
                            '<div class="box rb" style="width:50px;">{[this.getSummary("unit3")]}</div>',
                            '<div class="box rb" style="width:50px;">{[this.getSummary("unit4")]}</div>',
                            '<div class="box rb" style="width:50px;">{[this.getSummary("unit5")]}</div>',
                            '<div class="box rb" style="width:50px;">{[this.getSummary("unit6")]}</div>',
                            '<div class="box rb" style="width:50px;">{[this.getSummary("unit7")]}</div>',
                            '<div class="box rb" style="width:50px;">{[this.getSummary("unit8")]}</div>',
                            '<div class="box rb" style="width:50px;">{[this.getSummary("unit9")]}</div>',
                            '<div class="box rb" style="width:50px;">{[this.getSummary("unit10")]}</div>',
                            '<div class="box rb" style="width:50px;">{[this.getSummary("unit11")]}</div>',                                                                
                            '<div class="box rb" style="width:50px;">{[this.getSummary("unit12")]}</div>',    
                            '<div class="box nb" style="width:82px;">{[this.getSummary("unitSum")]}</div>',
                        '</div>',
                    '</div>',        
                '</div>',
            '</div>',
            '<div class="item-boxer" style="width: 920px;height:36px; font-size: 20px; font-weight: bold;">',
                '<div class="box nb right">',
                    'Total Quantity: {[this.getSummary("unitSum")]}' ,
                '</div>',
            '</div>',            
            {
                format: function(v, n){                                
                    var xf = Ext.util.Format;
                    if(!Ext.isEmpty(v)){                                    
                        return xf.trim(v).substring(0, n).toUpperCase();                                    
                    }
                },
                getSummary: function(field){
                    var xf = Ext.util.Format;

                    var store = me.down('dataview').getStore();

                    //store.group('style');                    

                    //console.log('buildTemplate');  

                    return store.sum(field);
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
            '@page { width: 11in; height: 8.5in; margin-top: 20px; ',
                'html, body { width: 11in; height: 8.5in; margin:0; font-family: Arial, sans-serif, Helvetica, Helvetica Neue; } ',
                '.sheet { page-break-inside: avoid; page-break-before: always; } ',
                '.page-break { page-break-inside: avoid; page-break-before: auto; } ',                          
            ' }',
            //'@media print { width: 8.5in; height: 11in; margin: 0; } ',

            '@media print { ',
                '@page { size: landscape; margin-top: 20px; }',                

                'html, body { width: 11in; height: 8.5in; margin:0; font-family: Arial, sans-serif, Helvetica, Helvetica Neue; } ',
                '.sheet { page-break-inside: avoid; page-break-before: always; } ',
                '.page-break { page-break-inside: avoid; page-break-before: auto; } ',                          
                
                '.print-po-view .item-selector {',
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
                '.print-po-view .item-boxer {',
                    'display: table;',
                    'border-collapse: collapse;',
                '} ',
                '.print-po-view .item-boxer .box-row {',
                    'display: table-row;',
                    'border-collapse: collapse;',
                '} ',
                    '.print-po-view .item-boxer .center {',
                    'text-align: center;',
                '} ',    
                    '.print-po-view .item-boxer .right {',
                    'text-align: right;',
                '} ',     
                '.print-po-view .item-boxer .box {',
                    'display: table-cell;',
                    //'padding: 0px 2px 0px 2px;',
                    'vertical-align: middle;',
                '} ',                           
                '.print-po-view .item-boxer .ab {',
                    'border: 1px solid black;',
                '} ',                  
                  '.print-po-view .item-boxer .rb {',
                    'border-right: 1px solid black;',
                '} ',
                  '.print-po-view .item-boxer .lb {',
                    'border-left: 1px solid black;',
                '} ',                
                '.print-po-view .item-boxer .nb {',
                    'border: none;',
                '}',
            '}'                                                            
        );
    }
});

