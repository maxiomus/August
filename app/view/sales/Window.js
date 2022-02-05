Ext.define('August.view.sales.OrderWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.data.proxy.Memory'
    ],

    alias: 'widget.so-window',

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

        /*
        var memStyles = Ext.create('Ext.data.Store', {
            pageSize: 50,
            remoteFilter: true,
            proxy: {
                type: 'memory',
                enablePaging: true,
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        });

        var remoteStyles = Ext.create('August.store.Styles', {
            autoLoad: true,

            listeners: {
                load: function(s){
                    memStyles.getProxy().setData(s.getRange());
                    memStyles.load();
                }
            }
        });

        var memStColors = Ext.create('Ext.data.Store', {
            pageSize: 50,
            remoteFilter: true,
            proxy: {
                type: 'memory',
                enablePaging: true,
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        });

        var remoteStColors = Ext.create('August.store.StyleColors', {
            autoLoad: true,
            remoteFilter: true,
            listeners: {
                load: function(s){
                    memStColors.getProxy().setData(s.getRange());
                    memStColors.load();
                }
            }
        });
        */

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
                            '<div class="box nb" style="width:80px;"></div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="box ab center" style="width:70px;">Total Qty</div>'+
                    '<div class="box ab center" style="width:70px;">Price</div>'+                                
                    '<div class="box ab">'+
                        '<div class="item-boxer">'+
                            '<div class="box rb center" style="width:70px;">Ext. Price</div>'+
                            '<div class="box rb center" style="width:70px;">Status</div>'+
                            '<div class="box nb center" style="width:95px;">Warehouse</div>'+                                                                        
                        '</div>'+
                    '</div>'+
                    '<div class="box ab center" style="width:120px;">CXL Date</div>'+
                    '<div class="box ab center" style="width:140px;">CXL Reason</div>'+
                    '<div class="box ab center" style="width:120px;">CXL R. Date</div>'+                                
                    //'<div class="box ab center" style="width:100px;">Pick #</div>'+
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
                            '<div class="box nb" style="width:80px;"></div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="box ab center" style="width:70px;"></div>'+                                
                    '<div class="box ab center" style="width:70px;">Org Price</div>'+
                    '<div class="box ab">'+
                        '<div class="item-boxer">'+
                            '<div class="box nb center" style="width:235px;">Memo</div>'+                                        
                        '</div>'+
                    '</div>'+
                    '<div class="box ab center" style="width:100px;">Season</div>'+
                    '<div class="box ab center" style="width:140px;">User</div>'+
                    '<div class="box ab center" style="width:100px;">Created</div>'+                                
                    //'<div class="box ab center" style="width:100px;">Ship #</div>'+
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
                            '<div class="box rb" style="width:60px;"></div>'+
                            '<div class="box rb" style="width:60px;"></div>'+
                            '<div class="box rb" style="width:60px;"></div>'+
                            '<div class="box rb" style="width:60px;"></div>'+
                            '<div class="box rb" style="width:60px;"></div>'+
                            '<div class="box rb" style="width:60px;"></div>'+
                            '<div class="box rb" style="width:60px;"></div>'+
                            '<div class="box rb" style="width:60px;"></div>'+
                            '<div class="box rb" style="width:80px;"></div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="box ab center" style="width:70px;"></div>'+
                    '<div class="box ab center" style="width:70px;"></div>'+
                    '<div class="box ab">'+
                        '<div class="item-boxer">'+
                            '<div class="box rb center" style="width:70px;">.</div>'+                                                               
                            '<div class="box nb center" style="width:165px;"></div>'+                                                               
                        '</div>'+
                    '</div>'+
                    '<div class="box ab center" style="width:100px;"></div>'+                             
                    '<div class="box ab center" style="width:140px;"></div>'+
                    '<div class="box ab center" style="width:100px;"></div>'+                                                                   
                    //'<div class="box ab center" style="width:100px;">Inv #</div>'+
                    //'<div class="box ab center" style="width:70px;">Inv. Qty</div>'+                                
                    '<div class="box nb center" style="width:0px;"></div>'+
                '</div>'+
            '</div>'+
            '</div>';

        Ext.applyIf(me, {
            items: [{
                xtype: 'form',
                reference: 'so-edit-form',
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
                            hideTrigger: true,
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
                            //selectOnFocus: true,
                            matchFieldWidth: false,
                            autoLoadOnValue: true,
                            //minChars: 0,
                            pageSize: 50,
                            queryMode: "local",
                            triggerAction: 'query',
                            //queryParam: "filter",
                            //queryDelay: 800,
                            //lastQuery: '',
                            listConfig: {
                                loadindText: 'Searching...',
                                emptyText: 'No matching items found.',
                                width: 340
                            },
                            tpl: '<tpl for=".">' +
                            '<tpl if="[xindex] == 1">' +
                                '<table class="cbo-list">' +
                                    '<tr>' +
                                        '<th width="35%">Type</th>' +
                                        '<th width="65%">Style #</th>' +
                                    '</tr>' +
                            '</tpl>' +
                                    '<tr class="x-boundlist-item">' +
                                        '<td>{value}</td>' +
                                        '<td>{label}</td>' +
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
                                        //delete qe.combo.lastQuery;
                                    }
                                },
                                select: function(combo, record, e){
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
                            hideTrigger: true,
                            bind: {
                                value: '{theItem.color}'
                            },
                            store: 'memStyleColors',
                            remoteStore: 'StyleColors',                            
                            displayField: "label",
                            valueField: "value",
                            //forceSelection: false,
                            //selectOnFocus: true,
                            pageSize: 50,
                            autoLoadOnValue: true,
                            matchFieldWidth: false,
                            //minChars: 0,
                            queryMode: "local",
                            triggerAction: 'query',
                            //queryParam: "filter",
                            //lastQuery: '',
                            listConfig: {
                                loadindText: 'Searching...',
                                emptyText: 'No matching items found.',
                                width: 340
                            },
                            tpl: '<tpl for=".">' +
                            '<tpl if="[xindex] == 1">' +
                                '<table class="cbo-list">' +
                                    '<tr>' +
                                        '<th width="65%">Color</th>' +
                                        '<th width="35%">Code #</th>' +
                                    '</tr>' +
                            '</tpl>' +
                            '<tr class="x-boundlist-item">' +
                            '<td>{label}</td>' +
                            '<td>{value}</td>' +
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
                                        var cboStyle = this.ownerCt.ownerCt.query('combo[name="style"]')[0],
                                            store = this.getStore();

                                        //console.log(cboStyle, cboStyle.getValue())

                                        if(!Ext.isEmpty(cboStyle.getValue())){
                                            store.clearFilter();

                                            store.filter([{
                                                property: 'text',
                                                value: cboStyle.getValue().toUpperCase(),
                                                operator: '='
                                            }]);
                                        }
                                        //delete qe.combo.lastQuery;
                                    }
                                }
                            }
                        },{
                            name: 'Size1',                            
                            readOnly: true,
                            bind: '{theItem.Size1}'
                        },{
                            name: 'Size2',
                            readOnly: true,
                            bind: '{theItem.Size2}'
                        },{
                            name: 'Size3',
                            readOnly: true,
                            bind: '{theItem.Size3}'
                        },{
                            name: 'Size4',
                            readOnly: true,
                            bind: '{theItem.Size4}'
                        },{
                            name: 'Size5',
                            readOnly: true,
                            bind: '{theItem.Size5}'
                        },{
                            name: 'Size6',
                            readOnly: true,
                            bind: '{theItem.Size6}'
                        },{
                            name: 'Size7',
                            readOnly: true,
                            bind: '{theItem.Size7}'
                        },{
                            name: 'Size8',
                            readOnly: true,
                            bind: '{theItem.Size8}'
                        },{       
                            width: 86,
                            readOnly: true
                        },{       
                            width: 70,
                            readOnly: true
                        },
                        {
                            name: 'price',
                            width: 70,
                            readOnly: true,
                            bind: '{theItem.price:usMoney}'
                        },
                        {
                            name: 'extPrice',
                            width: 72,
                            readOnly: true,
                            bind: '{theItem.extPrice:usMoney}'
                        },
                        {  
                            name: 'status',
                            width: 70,
                            readOnly: true,
                            bind: '{theItem.status}'
                        },                        
                        {
                            xtype: 'combo',
                            name: 'warehouse',
                            width: 98,
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
                        },
                        {
                            xtype: 'datefield',
                            name: 'canceldate',
                            format: 'Y-m-d',
                            width: 120,
                            //editable: false,
                            bind: {
                                value: '{theItem.canceldate}'
                            }
                            //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                        },
                        {
                            xtype: 'combo',
                            name: 'cancelReason',
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
                                store: '{cancelreasons}',
                                value: '{theItem.cancelReason}'
                            }
                        },{
                            xtype: 'datefield',
                            name: 'cancelReasondate',
                            format: 'Y-m-d',
                            width: 120,
                            //editable: false,
                            bind: {
                                value: '{theItem.cancelReasondate}'
                            }
                            //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
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
                            width: 86,
                            readOnly: true
                        },{
                            name: 'totalUnit',
                            width: 70,
                            bind: '{theItem.totalUnit}'
                        },
                        {
                            name: 'style_price',    
                            width: 70,                        
                            readOnly: true,
                            bind: '{theItem.style_price}'
                        },
                        {
                            name: 'memo',
                            width: 240,
                            emptyText: 'Memo:',
                            bind: '{theItem.memo}'
                        },{
                            xtype: 'combo',
                            name: 'season',
                            width: 120,
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
                                store: '{seasons}',
                                value: '{theItem.season}'
                            }
                        },{
                            name: 'create_user',
                            width: 140,
                            readOnly: true,
                            bind: '{theItem.create_user}'
                        },{
                            name: 'create_date',
                            width: 120,
                            readOnly: true,
                            bind: '{theItem.create_date:date("Y-m-d")}'
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
                            name: 'invUnit1',
                            bind: '{theItem.invUnit1}'
                        },{
                            name: 'invUnit2',
                            bind: '{theItem.invUnit2}'
                        },{
                            name: 'invUnit3',
                            bind: '{theItem.invUnit3}'
                        },{
                            name: 'invUnit4',
                            bind: '{theItem.invUnit4}'
                        },{
                            name: 'invUnit5',
                            bind: '{theItem.invUnit5}'
                        },{
                            name: 'invUnit6',
                            bind: '{theItem.invUnit6}'
                        },{
                            name: 'invUnit7',
                            bind: '{theItem.invUnit7}'
                        },{
                            name: 'invUnit8',
                            bind: '{theItem.invUnit8}'
                        },{
                            width: 86,
                            readOnly: true
                        },{
                            name: 'invTotal',
                            width: 70,
                            bind: '{theItem.invTotal}'
                        },{
                            width: 70,
                            readOnly: true
                        },{
                            width: 72,
                            readOnly: true,
                            bind: '{theItem.invExtprice:usMoney}'
                        },{                            
                            width: 168,
                            readOnly: true,
                            bind: '{theItem.fabContent}'
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
