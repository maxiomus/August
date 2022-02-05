Ext.define('August.view.purchase.OrderWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.data.proxy.Memory'
    ],

    alias: 'widget.po-window',

    bind: {
        title: '{title}'
    },

    layout: 'fit',

    monitorResize: true,
    maximizable: true,
    constrain: true,
    maximized: true,
    //scrollable: true,
    closable: true,
    padding: 4,

    initComponent: function(w){
        var me = this;        

        Ext.getStore('memStyles').clearFilter();

        var html =
            '<div class="box ab">'+
            '<div class="item-boxer" style="margin: 5px;">'+
                '<div class="box-row" style="height: 24px;">'+
                    '<div class="box ab center" style="width:30px;">Line</div>'+
                    '<div class="box ab">'+
                        '<div class="item-boxer">'+
                            '<div class="box rb center" style="width:160px;">Style</div>'+
                            '<div class="box nb center" style="width:160px;">Color</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="box">'+
                        '<div class="item-boxer">'+
                            '<div class="box nb" style="width:60px;"></div>'+
                            '<div class="box nb" style="width:60px;"></div>'+
                            '<div class="box nb" style="width:60px;"></div>'+
                            '<div class="box nb" style="width:60px;"></div>'+
                            '<div class="box nb" style="width:60px;"></div>'+
                            '<div class="box nb" style="width:60px;"></div>'+
                            '<div class="box nb" style="width:60px;"></div>'+
                            '<div class="box nb" style="width:60px;"></div>'+
                            '<div class="box nb" style="width:100px;"></div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="box ab center" style="width:70px;"></div>'+
                    '<div class="box ab center" style="width:100px;"></div>'+
                    /*                                
                    '<div class="box ab">'+
                        '<div class="item-boxer">'+
                            '<div class="box rb center" style="width:70px;"></div>'+
                            '<div class="box rb center" style="width:70px;"></div>'+
                            '<div class="box nb center" style="width:95px;"></div>'+                                                                        
                        '</div>'+
                    '</div>'+
                    */
                    '<div class="box ab center" style="width:120px;"></div>'+
                    '<div class="box ab center" style="width:140px;"></div>'+
                    '<div class="box ab center" style="width:160px;"></div>'+                                
                    '<div class="box ab center" style="width:120px;"></div>'+
                    //'<div class="box ab center" style="width:70px;">Pick Qty</div>'+    
                    '<div class="box nb center" style="width:0px;"></div>'+                            
                '</div>'+
                '<div class="box-row">'+
                    '<div class="box nb" style="width:30px;"></div>'+
                    '<div class="box ab center" style="width:320px;">Description</div>'+                                
                    '<div class="box">'+
                        '<div class="item-boxer">'+
                            '<div class="box nb" style="width:60px;"></div>'+
                            '<div class="box nb" style="width:60px;"></div>'+
                            '<div class="box nb" style="width:60px;"></div>'+
                            '<div class="box nb" style="width:60px;"></div>'+
                            '<div class="box nb" style="width:60px;"></div>'+
                            '<div class="box nb" style="width:60px;"></div>'+
                            '<div class="box nb" style="width:60px;"></div>'+
                            '<div class="box nb" style="width:60px;"></div>'+
                            '<div class="box nb" style="width:100px;"></div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="box ab center" style="width:70px;">Total Qty</div>'+                                
                    '<div class="box ab center" style="width:100px;">Price</div>'+
                    /*
                    '<div class="box ab">'+
                        '<div class="item-boxer">'+
                            '<div class="box nb center" style="width:235px;"></div>'+                                        
                        '</div>'+
                    '</div>'+
                    */
                    '<div class="box ab center" style="width:100px;">UOM</div>'+
                    '<div class="box ab center" style="width:140px;">Warehouse</div>'+
                    '<div class="box ab center" style="width:160px;">CXL Reason</div>'+                                
                    '<div class="box ab center" style="width:120px;">POD ID</div>'+
                    //'<div class="box ab center" style="width:70px;">Ship Qty</div>'+   
                    '<div class="box nb center" style="width:0px;"></div>'+ 
                '</div>'+
                '<div class="box-row">'+
                    '<div class="box ab center" style="width:30px;"></div>'+
                    '<div class="box ab">'+
                        '<div class="item-boxer">'+
                            '<div class="box rb center" style="width:160px;"></div>'+
                            '<div class="box nb center" style="width:160px;"></div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="box ab">'+
                        '<div class="item-boxer">'+
                            '<div class="box nb" style="width:60px;"></div>'+
                            '<div class="box nb" style="width:60px;"></div>'+
                            '<div class="box nb" style="width:60px;"></div>'+
                            '<div class="box nb" style="width:60px;"></div>'+
                            '<div class="box nb" style="width:60px;"></div>'+
                            '<div class="box nb" style="width:60px;"></div>'+
                            '<div class="box nb" style="width:60px;"></div>'+
                            '<div class="box rb" style="width:60px;"></div>'+
                            '<div class="box nb center" style="width:100px;">Status</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="box ab center" style="width:70px;">Received</div>'+
                    '<div class="box ab center" style="width:100px;">Ext. Price</div>'+
                    /*
                    '<div class="box ab">'+
                        '<div class="item-boxer">'+
                            '<div class="box rb center" style="width:70px;">.</div>'+                                                               
                            '<div class="box nb center" style="width:165px;"></div>'+                                                               
                        '</div>'+
                    '</div>'+
                    */
                    '<div class="box ab center" style="width:100px;">On Hand</div>'+                             
                    '<div class="box ab center" style="width:140px;">SO #</div>'+
                    '<div class="box ab center" style="width:160px;">CXL R. Date</div>'+                                                                   
                    '<div class="box ab center" style="width:120px;">SOD ID</div>'+
                    //'<div class="box ab center" style="width:70px;">Inv. Qty</div>'+                                
                    '<div class="box nb center" style="width:0px;"></div>'+
                '</div>'+
            '</div>'+
            '</div>';

        Ext.applyIf(me, {
            items: [{
                xtype: 'form',
                reference: 'po-edit-form',
                modelValidation: true,
                border: false,
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                    pack: 'start'
                },

                items: [{
                    xtype: 'container',
                    defaultType: 'fieldcontainer',
                    scrollable: true,
                    margin: '0 0 4 0',
                    defaults: {
                        margin: '0 0 1 35'
                    },
                    items:[{
                        xtype: 'component',
                        margin: '0 0 0 0',
                        html: html
                    },{
                        layout: 'hbox',
                        //combineErrors: true,
                        defaultType: 'textfield',
                        defaults: {
                            width: 60,
                            hideLabel: true,
                            border: false,
                            style: {
                                borderStyle: 'none'
                            }
                        },
                        items: [{
                            xtype: "combo",
                            name: 'style',
                            reference: 'style',
                            //itemId: "cboPrint",
                            fieldLabel: "Style",
                            //labelWidth: 50,
                            width: 160,
                            //hideTrigger: false,
                            //emptyText: 'Style',
                            //publishes: 'value',
                            bind: {
                                value: '{theItem.style}'
                            },
                            store: 'memStyles',
                            remoteStore: 'Styles',
                            displayField: 'label',
                            valueField: 'value',                            
                            //forceSelection: false,
                            selectOnFocus: false,
                            matchFieldWidth: false,
                            autoLoadOnValue: true,
                            minChars: 1,
                            pageSize: 50,
                            queryMode: "local",
                            //triggerAction: 'all',
                            //queryParam: "filter",
                            //queryDelay: 800,
                            lastQuery: '',
                            listConfig: {
                                loadindText: 'Searching...',
                                emptyText: 'No matching items found.',
                                width: 480
                            },
                            tpl: '<tpl for=".">' +
                            '<tpl if="[xindex] == 1">' +
                                '<table class="cbo-list">' +
                                    '<tr>' +
                                        '<th width="35%">Style #</th>' +
                                        '<th width="65%">Descript</th>' +
                                    '</tr>' +
                            '</tpl>' +
                                    '<tr class="x-boundlist-item">' +
                                        '<td>{value}</td>' +
                                        '<td>{descript}</td>' +
                                    '</tr>' +
                            '<tpl if="[xcount-xindex]==0">' +
                                '</table>' +
                            '</tpl>' +
                            '</tpl>',
                            plugins: [{
                                ptype: "cleartrigger"
                            }],
                            listeners: {
                                beforequery: {
                                    fn: function(qe){
                                        delete qe.combo.lastQuery;
                                    }
                                },
                                change: function(c){
                                    c.getStore().load();
                                },                     
                                triggerClear: function(c){
                                    c.getStore().load();                                

                                    var color = this.ownerCt.ownerCt.query('combo[name="stylecolor"]')[0],
                                        descript = this.ownerCt.ownerCt.query('textfield[name="descript"]')[0];
                                    
                                    color.setValue('');
                                    descript.setValue('');                                    
                                },
                                select: function(combo, record, e){
                                    /*
                                    var colorCombo = this.ownerCt.ownerCt.query('combo[name="stylecolor"]')[0],
                                        colorStore = colorCombo.getStore();

                                    Ext.apply(colorStore.getProxy().extraParams, {
                                        style: combo.getValue().trim()
                                    });

                                    colorStore.reload({
                                        callback: function(){
                                            colorCombo.select(colorStore.first());
                                            //colorCombo.fireEvent('select', combo, [store.first()]);
                                        }
                                    });
                                    */                                    
                                }
                            }
                        },{
                            xtype: "combo",
                            name: 'stylecolor',
                            reference: 'stylecolor',
                            //itemId: "cboPrint",
                            fieldLabel: "Color",
                            //emptyText: 'Color',
                            //labelWidth: 50,
                            width: 160,
                            //hideTrigger: false,
                            bind: {
                                value: '{theItem.color}'
                            },
                            store: 'memStyleColors',
                            remoteStore: 'StyleColors',                            
                            displayField: "label",
                            valueField: "value",
                            editable: false,
                            //forceSelection: false,
                            //selectOnFocus: true,
                            pageSize: 50,
                            autoLoadOnValue: true,
                            matchFieldWidth: false,
                            minChars: 1,
                            queryMode: "local",
                            //triggerAction: 'all',
                            //queryParam: "filter",
                            lastQuery: '',
                            listConfig: {
                                loadindText: 'Searching...',
                                emptyText: 'No matching items found.',
                                width: 520
                            },
                            tpl: '<tpl for=".">' +
                            '<tpl if="[xindex] == 1">' +
                                '<table class="cbo-list">' +
                                    '<tr>' +
                                        '<th width="20%">Color</th>' +
                                        '<th width="50%">Descript</th>' +
                                        '<th width="30%">Style</th>' +
                                    '</tr>' +
                            '</tpl>' +
                            '<tr class="x-boundlist-item">' +
                            '<td>{value}</td>' +
                            '<td>{descript}</td>' +
                            '<td>{style}</td>' +
                            '</tr>' +
                            '<tpl if="[xcount-xindex]==0">' +
                            '</table>' +
                            '</tpl>' +
                            '</tpl>',
                            plugins: [{
                                ptype: "cleartrigger"
                            }],
                            listeners: {
                                select: function(combo, record, e){
                                    var descript = this.ownerCt.ownerCt.query('textfield[name="descript"]')[0];
                                                                        
                                    descript.setValue(record.data.descript); 
                                },
                                beforequery: {
                                    fn: function(qe){
                                        
                                        var cboStyle = this.ownerCt.ownerCt.query('combo[name="style"]')[0],
                                            store = this.getStore();

                                        //console.log(cboStyle, cboStyle.getValue())

                                        if(!Ext.isEmpty(cboStyle.getValue())){
                                            store.clearFilter();

                                            store.filter([{
                                                property: 'style',
                                                value: cboStyle.getValue().toUpperCase(),
                                                operator: '='
                                            }]);
                                        }
                                        
                                        delete qe.combo.lastQuery;
                                    }
                                },
                                change: function(c){
                                    c.getStore().load();
                                },                     
                                triggerClear: function(c){
                                    c.getStore().load();                                
                                }
                            }
                        },{
                            name: 'size1',                            
                            readOnly: true,
                            bind: '{theItem.size1}'
                        },{
                            name: 'size2',
                            readOnly: true,
                            bind: '{theItem.size2}'
                        },{
                            name: 'size3',
                            readOnly: true,
                            bind: '{theItem.size3}'
                        },{
                            name: 'size4',
                            readOnly: true,
                            bind: '{theItem.size4}'
                        },{
                            name: 'size5',
                            readOnly: true,
                            bind: '{theItem.size5}'
                        },{
                            name: 'size6',
                            readOnly: true,
                            bind: '{theItem.size6}'
                        },{
                            name: 'size7',
                            readOnly: true,
                            bind: '{theItem.size7}'
                        },{
                            name: 'size8',
                            readOnly: true,
                            bind: '{theItem.size8}'
                        },{       
                            width: 105,
                            readOnly: true
                        },{       
                            width: 70,
                            readOnly: true
                        },
                        {                            
                            width: 100,
                            readOnly: true
                        },
                        {                            
                            width: 120,
                            readOnly: true                        
                        },                                                
                        {                            
                            width: 140,
                            readOnly: true
                        },
                        {                            
                            width: 160,
                            readOnly: true
                        },{                            
                            width: 120,
                            readOnly: true
                        }]
                    },{
                        layout: 'hbox',
                        //combineErrors: true,
                        defaultType: 'textfield',
                        defaults: {
                            width: 60,
                            hideLabel: true
                        },
                        items: [{
                            name: 'descript',
                            width: 320,
                            readOnly: true,
                            bind: '{theItem.descript}'
                        },{
                            name: 'unit1',
                            bind: '{theItem.unit1}'
                        },{
                            name: 'unit2',
                            bind: '{theItem.unit2}'
                        },{
                            name: 'unit3',
                            bind: '{theItem.unit3}'
                        },{
                            name: 'unit4',
                            bind: '{theItem.unit4}'
                        },{
                            name: 'unit5',
                            bind: '{theItem.unit5}'
                        },{
                            name: 'unit6',
                            bind: '{theItem.unit6}'
                        },{
                            name: 'unit7',
                            bind: '{theItem.unit7}'
                        },{
                            name: 'unit8',
                            bind: '{theItem.unit8}'
                        },{
                            width: 105,
                            readOnly: true
                        },{
                            name: 'totalUnit',
                            width: 70,
                            bind: '{theItem.totalUnit}'
                        },
                        {
                            name: 'price',
                            width: 100,
                            readOnly: true,
                            bind: '{theItem.price:usMoney}'
                        },
                        {
                            name: 'uom',
                            width: 120,                            
                            bind: '{theItem.uom}'
                        },
                        {
                            xtype: 'combo',
                            name: 'warehouse',
                            width: 140,
                            displayField: 'label',
                            valueField: 'value',
                            editable: false,
                            //selectOnFocus: true,
                            //allowBlank: false,
                            forceSelection: true,
                            //msgTarget: 'side',
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            //store: ['00', 'OS', 'SA'],
                            bind: {
                                store: '{warehouses}',
                                value: '{theItem.warehouse}'
                            }
                        },{
                            name: 'cancelReason',
                            width: 160,
                            readOnly: true,
                            bind: '{theItem.cancelReason}'
                        },{
                            name: 'podid',
                            width: 120,
                            readOnly: true,
                            bind: '{theItem.podid}'
                        }]
                    },{
                        layout: 'hbox',
                        //combineErrors: true,
                        defaultType: 'textfield',
                        defaults: {
                            width: 60,
                            hideLabel: true
                        },
                        items: [{
                            width: 320,
                            readOnly: true
                        },{            
                            name: 'memo',                
                            width: 480,
                            emptyText: 'Memo:',
                            bind: '{theItem.memo}'
                        },{
                            xtype: 'combo',
                            name: 'status',
                            width: 105,
                            fieldLabel: 'Status',
                            //displayField: 'label',
                            //valueField: 'value',
                            editable: false,
                            //selectOnFocus: true,
                            allowBlank: false,
                            forceSelection: true,
                            //msgTarget: 'side',
                            //minChars: 1,
                            //queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            store: ['Open', 'Hold', 'Closed'],
                            bind: {                            
                                value: '{thePO.status}'
                            }
                        },{                            
                            width: 70,
                            readOnly: true,
                            bind: '{theItem.closed_qty}'                            
                        },{
                            width: 100,
                            readOnly: true,
                            bind: '{theItem.extPrice:usMoney}'
                        },{
                            name: 'ohs',
                            width: 120,
                            readOnly: true,
                            bind: '{theItem.ohs}'
                        },{            
                            name: 'SONo',                
                            width: 140,                            
                            readOnly: true,
                            bind: '{theItem.SONo}'
                        },{
                            xtype: 'datefield',
                            name: 'cancelReasonDate',     
                            width: 160,                   
                            format: 'Y-m-d',                            
                            //editable: false,
                            bind: {
                                value: '{theItem.cancelReasonDate}'
                            }
                            //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                        },{
                            name: 'sodid',
                            width: 120,
                            readOnly: true,
                            bind: '{theItem.sodid}'
                        }]
                    }]
                },  
                /*              
                {
                    xtype: 'grid',
                    title: 'Rolls',
                    reference: 'pirolls',
                    scrollable: true,
                    flex: 1,
                    bind: {
                        store: '{theItem.pirolls}'
                    },
                    selModel: {
                        //mode: "MULTI",
                        //type: 'cellmodel',
                        pruneRemoved: false
                    },
                    viewConfig: {
                        loadMask: true,
                        stripeRows: true,
                        trackOver: true,
                        preserveScrollOnRefresh: true,
                        deferInitialRefresh: true,
                        emptyText: '<h1 style="margin: 20px">No matching results</h1>'
                    },
                    plugins: [{
                        ptype: 'cellediting',
                        clicksToEdit: 1
                    }],
                    dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'top',
                        items: [{
                            xtype: 'button',
                            iconCls: 'x-fa fa-plus-circle',
                            text: 'Add'
                        },{
                            xtype: 'button',
                            text: 'Remove',
                            iconCls: 'x-fa fa-minus-circle'
                        },{
                            xtype: 'button',
                            text: 'Remove All',
                            iconCls: 'x-fa fa-remove'
                        },{
                            xtype: 'button',
                            iconCls: 'x-fa fa-list',
                            text: 'Add Multiple'
                        },{
                            xtype: 'textfield',
                            width: 50,
                            fieldLabel: 'lines',
                            hideLabel: true
                        },{
                            xtype: 'checkbox',
                            name: 'chkCopy',
                            value: true,
                            boxLabel: 'Copy data to new lines'
                        },{
                            xtype: 'checkbox',
                            name: 'chkLot',
                            hidden: true,
                            boxLabel: '<i class="x-fa fa-arrow-up"></i> Lot # by 1'
                        },{
                            xtype: 'checkbox',
                            name: 'chkRoll',
                            hidden: true,
                            boxLabel: '<i class="x-fa fa-arrow-up"></i> Roll # by 1'
                        }]
                    }],
                    columns: [{
                        text: 'ID',
                        dataIndex: 'id',
                        hidden: true,
                        width: 50
                    }, {
                        text: 'Roll #',
                        dataIndex: 'rollno',
                        editor:{
                            xtype: 'textfield'
                        }
                    }, {
                        text: 'ATC (Available to Cut)',
                        dataIndex: 'atc',
                        width: 160
                    }, {
                        text: 'P.I Qty',
                        dataIndex: 'unit1',
                        editor:{
                            xtype: 'textfield'
                        }
                    },{
                        text: 'Memo',
                        dateIndex: 'memo',
                        flex: 1,
                        editor:{
                            xtype: 'textfield'
                        }
                    },{
                        xtype: 'actioncolumn',
                        text: '<i class="x-fa fa-close fa-lg red-txt"></i>',
                        //iconCls: 'x-fa fa-close red-txt',
                        width: 50,
                        align: 'center',
                        menuDisabled: true,
                        sortable: false,
                        items: [{
                            //icon: 'resources/images/shared/icon-error.png',
                            //glyph: 45,
                            //ui: 'default',
                            iconCls: 'x-fa fa-remove red-txt',
                            tooltip: 'Remove',
                            handler: function(view, rowIndex, colIndex) {
                                var rec = view.getStore().getAt(rowIndex);
                                rec.drop();
                            }
                        }]
                    }]
                }
                */
                ]
            }]
        });

        me.callParent(arguments);
    }
});
