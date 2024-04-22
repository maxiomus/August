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

    //cls: 'print-pt-preview',    

    header: {
        title: 'Print Pick Ticket',
        iconCls: 'x-fa fa-code',
        titlePosition: 0,
        titleAlign: 'left'
    },

    //session: true,
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
            //'<div class="sheet" style="width:11in;margin-top:0in;margin-left:0.2in;padding-right:0.2in;">',
            //'<div class="print-pt-view">',
            '<div class="item-boxer">',

                '<div class="box-row">',   
                    '<div class="box nb"><img src="http://209.37.126.195:8088/ProductImages/august_logo.jpg" width="187" height="108"></img></div>',                                    
                    
                    '<div class="item-boxer">',
                        '<div class="box-row">',
                            '<div class="box" style="width:380px;height:40px;text-align:center; font-size:40px; font-weight:bold;">Pick Ticket</div>', 
                            '<div class="box nb">',                                                                       
                                //'<svg class="barcode" jsbarcode-format="code128" jsbarcode-value="{pono}" jsbarcode-height="32" jsbarcode-margin="0" jsbarcode-textmargin="0" jsbarcode-fontsize="11"></svg>',                                    
                                '<svg class="barcode" jsbarcode-value="{pickno}" jsbarcode-displayValue="false" jsbarcode-height="56" jsbarcode-margin="0" jsbarcode-textmargin="0"></svg>',                                    
                            '</div>',                      
                        '</div>',                                        
                    '</div>',     

                    '<div class="item-boxer" style="margin-left:70px;font-size:18px;font-weight:bold;text-align:center;">', 
                        '<div class="box-row">',                                   
                            '<div class="box ab">',                                                                    
                                '<div class="box rb" style="width:124px;height:30px;">Pick #</div>',                                        
                                '<div class="box nb" style="width:165px;">{pickno}</div>',                                                                        
                            '</div>',          
                        '</div>',                      
                        '<div class="box-row">',                                                                                         
                            '<div class="box ab">',                                                                                    
                                '<div class="box rb" style="width:120px;height:30px;">Pick Date</div>',                                        
                                '<div class="box nb" style="width:165px;">{pickDate:date("Y-m-d")}</div>',                                                                        
                            '</div>',                            
                        '</div>',    
                        '<div class="box" style="font-size:16px;width:240px;height:30px;">**{paymentcode}**</div>',                            
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
                                '<div class="box rb" style="width:80px;">Name</div>',
                                '<div class="box rb" style="width:205px;">{customerAddress.name}</div>',
                                '<div class="box rb" style="width:80px;">Name</div>',
                                '<div class="box nb" style="width:205px;">{shipToAddress.name}</div>',                                                        
                            '</div>',
                        '</div>',

                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                '<div class="box rb" style="width:80px;">Addr1</div>',
                                '<div class="box rb" style="width:205px;">{customerAddress.addr1:ellipsis(38)}</div>',
                                '<div class="box rb" style="width:80px;">Addr1</div>',
                                '<div class="box nb" style="width:205px;">{shipToAddress.addr1:ellipsis(38)}</div>',
                                                    
                            '</div>',
                        '</div>',

                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                '<div class="box rb" style="width:80px;">Addr2</div>',
                                '<div class="box rb" style="width:205px;">{customerAddress.addr2:ellipsis(38)}</div>',
                                '<div class="box rb" style="width:80px;">Addr2</div>',
                                '<div class="box nb" style="width:205px;">{shipToAddress.addr2:ellipsis(38)}</div>',                                                
                            '</div>',
                        '</div>',

                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                '<div class="box rb" style="width:35px">City</div>',
                                '<div class="box rb" style="width:90px;">{customerAddress.city}</div>',
                                '<div class="box rb" style="width:40px;">State</div>',
                                '<div class="box rb" style="width:40px;">{customerAddress.state}</div>',
                                '<div class="box rb" style="width:35px;">Zip</div>',
                                '<div class="box rb" style="width:45px;">{customerAddress.zip}</div>',
                                '<div class="box rb" style="width:35px">City</div>',
                                '<div class="box rb" style="width:90px">{shipToAddress.city}</div>',
                                '<div class="box rb" style="width:40px">State</div>',
                                '<div class="box rb" style="width:40px">{shipToAddress.state}</div>',
                                '<div class="box rb" style="width:35px">Zip</div>',
                                '<div class="box nb" style="width:45px">{shipToAddress.zip}</div>', 
                            '</div>',
                        '</div>',

                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                '<div class="box rb" style="width:80px;">Country</div>',
                                '<div class="box rb" style="width:205px;">{customerAddress.country}</div>',
                                '<div class="box rb" style="width:80px;">Country</div>',
                                '<div class="box nb" style="width:205px;">{shipToAddress.country}</div>',                                                            
                            '</div>',
                        '</div>', 
                        
                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                '<div class="box rb" style="width:80px;">Phone</div>',
                                '<div class="box rb" style="width:205px;">{customerAddress.phone1}</div>',
                                '<div class="box rb" style="width:80px;">Fax</div>',
                                '<div class="box nb" style="width:205px;">{shipToAddress.fax1}</div>',                                                
                            '</div>',
                        '</div>',
                        
                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                '<div class="box rb" style="width:80px;height:100px;">Memo</div>',
                                '<div class="box rb" style="width:205px;">{memo}</div>',
                                '<div class="box rb" style="width:80px;">House Memo</div>',
                                '<div class="box nb" style="width:205px;">{houseMemo}</div>',                                                
                            '</div>',
                        '</div>',   

                    '</div>',

                    '<div class="box nb" style="text-align:center;">',
                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                '<div class="box rb" style="width:120px;">S.O #</div>',
                                '<div class="box nb" style="width:205px;">{sono}</div>',     
                            '</div>',
                        '</div>',
                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                '<div class="box rb" style="width:120px;">Customer P.O #</div>',
                                '<div class="box nb" style="width:205px;">{customerpo}</div>',  
                            '</div>',
                        '</div>',
                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                '<div class="box rb" style="width:120px;">S.O Cancel Date</div>',
                                '<div class="box nb" style="width:205px;">{socxldate:date("Y-m-d")}</div>',  
                            '</div>',
                        '</div>',
                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                '<div class="box rb" style="width:120px;">S.O Ship Date</div>',
                                '<div class="box nb" style="width:205px;">{soshipdate:date("Y-m-d")}</div>',  
                            '</div>',
                        '</div>',
                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                '<div class="box rb" style="width:120px;">Status</div>',
                                '<div class="box nb" style="width:205px;">{status}</div>',  
                            '</div>',
                        '</div>',
                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                '<div class="box rb" style="width:120px;">S.O Type / Dept #</div>',
                                '<div class="box rb" style="width:105px;">{sotype}</div>',  
                                '<div class="box nb" style="width:100px;">{dept}</div>',  
                            '</div>',
                        '</div>',
                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                '<div class="box rb" style="width:120px;">Term</div>',
                                '<div class="box nb" style="width:205px;">{terms}</div>',  
                            '</div>',
                        '</div>',
                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                '<div class="box rb" style="width:120px;">Ship Via</div>',
                                '<div class="box nb" style="width:205px;">{shipvia}</div>',  
                            '</div>',
                        '</div>',
                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                '<div class="box rb" style="width:120px;">Payment Code</div>',
                                '<div class="box nb" style="width:205px;">{paymentcode}</div>',  
                            '</div>',
                        '</div>',
                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                '<div class="box rb" style="width:120px;">UPS ACCT #</div>',
                                '<div class="box nb" style="width:205px;">{acctno}</div>',  
                            '</div>',
                        '</div>',
                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                '<div class="box rb" style="width:120px;">Sales Rep 1</div>',
                                '<div class="box nb" style="width:205px;">{salesrep1}</div>',  
                            '</div>',
                        '</div>',
                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                '<div class="box rb" style="width:120px;">Sales Rep 2</div>',
                                '<div class="box nb" style="width:205px;">{salesrep2}</div>',  
                            '</div>',
                        '</div>',
                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                '<div class="box rb" style="width:120px;">Store / DC</div>',
                                '<div class="box rb" style="width:105px;">{store}</div>',  
                                '<div class="box nb" style="width:100px;">{dc}</div>',  
                            '</div>',
                        '</div>',
                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                '<div class="box rb" style="width:120px;">Create User</div>',
                                '<div class="box nb" style="width:205px;">{createuser}</div>',  
                            '</div>',
                        '</div>',
                        '<div class="box-row">',
                            '<div class="box ab" style="font-size:0.87em;">',
                                '<div class="box rb" style="width:120px;">Create TIme</div>',
                                '<div class="box nb" style="width:205px;">{createdate:date("Y-m-d h:i:s")}</div>',  
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

        /*
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
        */

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
                    name: 'printPickHeader',    
                    margin: '0 0 0 13px',
                    width: 920,
                    //height: 93,
                    padding: '0 0 0 0',                                        
                    style: {
                        //border: '1px solid #cfcfcf'
                    },

                    tpl: headerTpl,

                    bind: {
                        //data: '{thePickTicket}'
                    }
                },{
                    xtype: "dataview",
                    
                    reference: "print-pt-view",
                    cls: "print-pt-view",                                        
                    margin: '0 0 0 13px',
                    width: 920,
                    //flex: 1,
                    //bodyPadding: 0,
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
            //me.actRefresh,
            me.actPrint                 
        );

        config.items = items;

        return [
            config 
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
            '<tpl for=".">',                        
            //'<div class="item-selector x-unselectable">',    
            '<div class="page-break">',
                '<div class="item-boxer" style="font-size:0.87em;">',
                    '<div class="box" style="padding: 0 7px 7px 0;"><img src="{[this.getSrcPath(values, xcount)]}" width="92"></img></div>',
                    '<div class="item-boxer style="width:828px;">',         

                        '<div class="box-row">',
                            '<div class="box" style="height:30px;font-size:1.4em;font-weight:bold;">',                            
                                '<div class="box center" style="width:120px;">Style</div>',
                                '<div class="box center" style="width:120px;">{style}</div>',                                
                            '</div>',                            
                        '</div>',

                        '<div class="box-row">',
                            '<div class="box center" style="border-bottom: 1px solid #000;">',                                
                                '<div class="box" style="width:170px;height:25px;">Color</div>',
                                '<div class="box" style="width:46px;">{size1}</div>',
                                '<div class="box" style="width:46px;">{size2}</div>',
                                '<div class="box" style="width:46px;">{size3}</div>',
                                '<div class="box" style="width:46px;">{size4}</div>',
                                '<div class="box" style="width:46px;">{size5}</div>',
                                '<div class="box" style="width:46px;">{size6}</div>',
                                '<div class="box" style="width:46px;">{size7}</div>',
                                '<div class="box" style="width:46px;">{size8}</div>',
                                '<div class="box" style="width:46px;">{size9}</div>',
                                //'<div class="box" style="width:46px;">{size10}</div>',
                                //'<div class="box" style="width:46px;">{size11}</div>',
                                //'<div class="box" style="width:46px;">{size12}</div>',
                                '<div class="box" style="width:54px;">Total</div>',
                                '<div class="box" style="width:54px;">Price</div>',
                                '<div class="box" style="width:74px;">Ext Price</div>',
                                '<div class="box" style="width:60px;">Status</div>',
                                '<div class="box" style="width:60px;">WH</div>',                                
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
                                //'<div class="box" style="width:50px;">{unit10}</div>',
                                //'<div class="box" style="width:50px;">{unit11}</div>',
                                //'<div class="box" style="width:50px;">{unit12}</div>',
                                '<div class="box" style="width:54px;">{totalUnit}</div>',
                                '<div class="box" style="width:54px;">{price}</div>',
                                '<div class="box" style="width:74px;">{[this.getExtPrice(values, xcount)]}</div>',
                                '<div class="box" style="width:60px;">{status}</div>',
                                '<div class="box" style="width:60px;">{warehouse:this.format(5)}</div>',
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
            
            '<div class="item-boxer" style="width:920px;margin-bottom: 7px;">',
                '<div class="box-row">',
                    '<div class="item-boxer">',
                        '<div class="box" style="height:85px;vertical-align: bottom;">',
                            '<div class="box ab" style="width:85px;height:74px;text-align:center;">Routing Guide</div>',
                            '<div class="box ab" style="width:590px;font-weight:bold;">{routingGuide}</div>',                        
                        '</div>',
                    '</div>',
                    '<div class="box" style="width:240px;vertical-align:bottom;">',
                        '<fieldset style="font-size:1.0em;font-weight:bold;height:83px;padding: 0 10px;">',
                            '<legend style="font-size:1.2em;">Grand Total</legend>',
                            '<div class="item-boxer" style="margin-top: 10px;">',
                                '<div class="box">',
                                    '<div class="box" style="width:100px;">Amount:</div>',
                                    '<div class="box">{[this.getSummary("extPrice")]}</div>',
                                '</div>',
                            '</div>',
                            '<div class="item-boxer">',
                                '<div class="box">',
                                    '<div class="box" style="width:100px;">Qty:</div>',
                                    '<div class="box">{[this.getSummary("totalUnit")]}</div>',
                                '</div>',
                            '</div>',
                        '</fieldset>',
                    '</div>',        
                '</div>',
            '</div>',
            
            '<table  style="height:140px;font-size:1.0em;text-align:center;text-decoration:underline;padding:10px;">',
                '<tr>',
                    '<td>',                                
                        '<div class="box" style="width:90px;height:90px;border:3px solid black;margin:5px;">Box Size</div>',
                    '</td>',
                    '<td>',
                        '<div class="box ab" style="width:90px;height:90px;border:3px solid black;margin:5px;">Carton No</div>',
                    '</td>',
                    '<td>',
                        '<div class="box ab" style="width:90px;height:90px;border:3px solid black;margin:5px;">Ctns</div>',
                    '</td>',
                    '<td>',
                        '<div class="box ab" style="width:90px;height:90px;border:3px solid black;margin:5px;">Pieces</div>',
                    '</td>',
                    '<td>',
                        '<div class="box ab" style="width:90px;height:90px;border:3px solid black;margin:5px;">Freight</div>',
                    '</td>',
                    '<td>',
                        '<div class="box ab" style="width:90px;height:90px;border:3px solid black;margin:5px;">Weight</div>',
                    '</td>',
                    '<td>',
                        '<div class="item-boxer" style="width:205px;text-align:center;margin-left:20px;">',
                            '<div class="box-row">',
                                '<div class="box ab">Sales Order Discount Rate</div>',
                            '</div>',
                            '<div class="box-row">',
                                '<div class="box ab"">0%</div>',
                            '</div>',
                            '<div class="box-row">',
                                '<div class="box ab"">Customer Contact1</div>',
                            '</div>',
                            '<div class="box-row">',
                                '<div class="box ab"">Admin</div>',
                            '</div>',
                        '</div>',
                    '</td>',
                    '</tr>',
            '</table>',                                  

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
