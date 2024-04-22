
Ext.define('August.view.sales.Ship',{
    extend: 'Ext.panel.Panel',

    requires: [
        'August.view.sales.ShipController',
        'August.view.sales.ShipModel'
    ],

    alias: "widget.sales-ship",

    controller: 'sales-ship',
    viewModel: {
        type: 'sales-ship'
    },

    bind: {
        title: '{title}'
    },

    session: true,
    trackResetOnLoad: true,
    //scrollable: 'y',
    style: {
        borderTop: '1px solid #cfcfcf'
    },

    waitMsgTarget: true,
    /*
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    */
    layout: {
        type: 'fit'
    },

    listeners: {

    },

    initComponent: function() {
        var me = this;        

        var addressTpl = new Ext.XTemplate(
            '<div class="item-boxer">',
                '<div class="box-row">',                                    
                    '<div class="box ab">{[values.addr1.length != 0 ? values.addr1 : "<br />"]}</div>',                                    
                '</div>',
                '<div class="box-row">',                                    
                    '<div class="box ab">',
                        '{[values.addr2.length != 0 ? values.addr2 : "<br />"]}',
                    '</div>',                                    
                '</div>',
                '<div class="box-row">',
                    '<div class="box ab">',
                        '<div class="item-boxer">',
                            '<div class="box rb" style="width:140px;">{[values.city.length != 0 ? values.city : "<br />"]}</div>',
                            '<div class="box rb" style="width:50px;">{state}</div>',
                            '<div class="box nb" style="width:80px;">{zip}</div>',                                    
                        '</div>',
                    '</div>', 
                '</div>',                               
                '<div class="box-row">',                                    
                    '<div class="box ab">',
                        '{[values.country.length != 0 ? values.country : "<br />"]}',
                    '</div>',                                    
                '</div>',
                '<div class="box-row">',
                    '<div class="box ab">',
                        '<div class="item-boxer">',
                            '<div class="box rb" style="width:50%;">Tel: {[values.phone1.length != 0 ? values.phone1 : "<br />"]}</div>',
                            '<div class="box nb" style="width:50%;">Fax: {fax1}</div>',                                                                
                        '</div>',
                    '</div>',
                '</div>', 
            '</div>',
            {
                // XTemplate configuration:
                //disableFormats: true,
                // member functions:
                isValueEmpty: function(value){
                   return value.length == 0;
                }
            }                                                                               
        );        
         
        var memShipvias = Ext.create('Ext.data.Store', {
            storeId: 'memShipvias',
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
        
        var shipvias = Ext.create('Ext.data.Store', {
            
            fields: ['label', 'value'],
            storeId: 'shipvias',
            pageSize: 0,
            
            autoLoad: true,
            remoteFilter: true,

            proxy: {
                type: 'ajax',
                url: '/WebApp/api/List/shipvias',

                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                
                reader: {
                    type: 'json',
                    rootProperty: 'data'                    
                    //totalProperty: 'total'
                    //successProperty: 'success'
                    
                }
            },

            listeners: {
                load: function(s) {                    
                    memShipvias.getProxy().setData(s.getRange());
                    //console.log('shipvia - load', s.getRange());
                    memShipvias.load();
                }
            }
        });                  
        
        var btnNew = {
            text: 'New',
            iconCls: 'x-fa fa-plus-circle',
            //glyph:'xf0c7@FontAwesome',
            tooltip: 'Add Item',
            //reference: 'add',
            //ui: 'default',
            handler: 'onAddItemClick',
            scope: this.controller
        },
        btnCopy = {
            text: 'Copy',
            iconCls: 'x-fa fa-copy',
            tooltip: 'Copy Item',
            //reference: 'copy',
            bind: {
                disabled: '{!selection}'
            },
            handler: 'onCopyItemClick',
            scope: this.controller
        },
        btnEdit = {
            text: 'Edit',
            iconCls: 'x-fa fa-edit',
            tooltip: 'Edit Item',
            //reference: 'edit',
            bind: {
                disabled: '{!selection}'
            },
            handler: 'onEditItemClick',
            scope: this.controller
        },
        btnDelete = {
            text: 'Delete',
            iconCls: 'x-fa fa-minus-circle',
            tooltip: 'Delete Item',
            //reference: 'remove',
            bind: {
                disabled: '{!selection}'
            },
            handler: 'onDeleteItemClick',
            scope: this.controller
        };
        var btnsConfig = [btnNew, btnCopy, btnEdit, btnDelete];

        me.dockedItems = {
            xtype: 'toolbar',
            dock: 'top',
            //reference: 'topbar',
            defaults: {
                //ui: 'default'
            },
            items: [{
                iconCls: 'x-fa fa-sync-alt',
                text: 'Refresh',
                ui: 'default',
                //glyph:'xf0c7@FontAwesome',
                tooltip: 'Refresh View',
                handler: 'onRefresh'
            },{
                iconCls: 'x-fa fa-save',
                //reference: 'save',                
                text: 'Save',
                //nextStep: 'save',
                ui: 'default',
                tooltip: 'Save the Data',                
                handler: 'onSave'
            },{
                iconCls: 'x-fa fa-times-circle',
                text: 'Close',
                ui: 'default',
                //glyph:'xf0c7@FontAwesome',
                tooltip: 'Close View',
                handler: 'onClose'
            },'-', {
                xtype: 'buttongroup',
                reference: 'groupCrud',
                margin: -5,
                style: {
                    border: '0px'                    
                },
                hidden: false,
                items: btnsConfig
            },'->',{
                iconCls: 'x-fa fa-tags',
                text: 'Price Tag',
                ui: 'default',
                tooltip: 'Price Tag by S.O',
                handler: 'onPriceTagClick'
            },{
                iconCls: 'x-fa fa-print',
                text: 'Print Preview',
                ui: 'default',
                tooltip: 'S.O Print Preview',
                handler: 'onPrintClick'
            }]
        },

        Ext.applyIf(me, {
            items: [{
                xtype: 'tabpanel',
               
                reference: 'editshiptab',

                style: {
                    borderTop: '1px solid #cfcfcf'
                },

                tabPosition: 'left',
                //tabRotation: 2,
                //tabBarHeaderPosition: 0,
                //minTabWidth: 120,

                items: [{
                    tabConfig: {
                        title: 'Sales Order Shipment'
                    },

                    layout: {
                        type: 'vbox',
                        pack: 'start',
                        align: 'stretch'
                    },

                    items: [{
                        xtype: 'container',                                                                        
                        reference: "shipheader",                        
                        //iconCls: "x-fa fa-calculator",
                        layout: {
                            type: 'responsivecolumn',
                            states: {
                                /*
                                 small: 800,
                                 medium: 1200,
                                 large: 0
                                 */
                            }
                        },
                        //margin: "0 0 5 0",
                        //bodyPadding: 8,
                        scrollable: 'y',
                        defaultType: 'container',
                        defaults: {
                            //margin: "5 0 0 0"
                        },
            
                        fieldDefaults: {
                            labelAlign: "left",
                            margin: 0
                        },
            
                        items: [{
                            responsiveCls: 'small-100',
                            //width: '30%',
                            layout: {
                                type: 'table',
                                columns: 3,
                                tableAttrs: {
                                    style: {}
                                }
                            },
            
                            defaultType: 'textfield',
                            defaults: {
                                width: 210,
                                constrain: true,
                                margin: '0 10 3 0',
                                labelWidth: 80
                                //minHeight: 720,
                                //padding: '10 10 0 10'
                            },
            
                            items: [{
                                xtype: 'textfield',
                                name: 'sosno',
                                fieldLabel: 'Ship #',
                                fieldCls: 'emphasized',    
                                //width: 210,
                                labelWidth: 70,
                                readOnly: true,
                                allowBlank: false,
                                selectOnFocus: false,
                                //flex: 1,
                                bind: {
                                    value: '{theShip.sosno}'
                                },
                                allowBlank: true
                            },{
                                xtype: 'textfield',
                                name: 'sono',
                                fieldLabel: 'S.O #',
                                fieldCls: 'emphasized',    
                                //width: 210,
                                labelWidth: 70,
                                readOnly: true,
                                allowBlank: false,
                                selectOnFocus: false,
                                //flex: 1,
                                bind: {
                                    value: '{theShip.sono}'
                                },
                                allowBlank: true
                            },{
                                xtype: 'datefield',
                                name: 'orderDate',                        
                                format: 'Y-m-d',
                                fieldLabel: 'Order Date',
                                //width: 210,
                                labelWidth: 70,                            
                                //editable: false,
                                bind: {
                                    value: '{theShip.orderDate}'
                                }
                                //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                            },{
                                xtype: 'numberfield',
                                name: 'subtotal',
                                fieldLabel: 'Sub Total',
                                hideTrigger: true,
                                keyNavEnabled: false,
                                mouseWheelEnabled: false,
                                readOnly: false,
                                //selectOnFocus: false,
                                //flex: 1,
                                bind: {
                                    value: '{theShip.subtotal}'
                                }
                            },{
                                xtype: 'textfield',
                                name: 'boxCount',
                                fieldLabel: '# of Cartons',
                                fieldCls: 'emphasized',    
                                //width: 210,
                                labelWidth: 70,
                                readOnly: true,
                                allowBlank: false,
                                selectOnFocus: false,
                                //flex: 1,
                                bind: {
                                    value: '{theShip.boxCount}'
                                },
                                allowBlank: true
                            }]
                        },{
                            responsiveCls: 'small-100',
                            //width: '30%',
                            layout: {
                                type: 'table',
                                columns: 4,
                                tableAttrs: {
                                    style: {}
                                }
                            },
            
                            defaultType: 'textfield',
                            defaults: {
                                width: 220,
                                constrain: true,
                                margin: '0 10 3 0',
                                labelWidth: 80
                                //minHeight: 720,
                                //padding: '10 10 0 10'
                            },
            
                            items: [
                                {
                                    xtype: 'datefield',
                                    name: 'ShipmentDate',                        
                                    format: 'Y-m-d',
                                    fieldLabel: 'Ship Date',
                                    //width: 210,
                                    labelWidth: 70,                            
                                    //editable: false,
                                    bind: {
                                        value: '{theShip.ShipmentDate}'
                                    }
                                    //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'customerPo',
                                    fieldLabel: 'Cust P.O #',
                                    readOnly: false,
                                    //selectOnFocus: false,
                                    //flex: 1,
                                    bind: {
                                        value: '{theShip.customerPo}'
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'ActShipmentDate',                        
                                    format: 'Y-m-d',
                                    fieldLabel: 'Act Ship Date',
                                    //width: 210,
                                    labelWidth: 70, 
                                    //editable: false,
                                    bind: {
                                        value: '{theShip.ActShipmentDate}'
                                    }
                                    //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                                },  
                                {
                                    xtype: 'numberfield',
                                    name: 'discount',
                                    fieldLabel: 'Discount',
                                    hideTrigger: true,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
                                    readOnly: false,
                                    //selectOnFocus: false,
                                    //flex: 1,
                                    bind: {
                                        value: '{theShip.discount}'
                                    }
                                },                                                    
                                {
                                    xtype: 'textfield',
                                    name: 'weight',
                                    fieldLabel: 'Weight',
                                    fieldCls: 'emphasized',    
                                    //width: 210,
                                    labelWidth: 70,
                                    readOnly: true,
                                    allowBlank: false,
                                    selectOnFocus: false,
                                    //flex: 1,
                                    bind: {
                                        value: '{theShip.weight}'
                                    },
                                    allowBlank: true
                                }
                            ]
                        },{
                            responsiveCls: 'small-100',
                            //width: '30%',
                            layout: {
                                type: 'table',
                                columns: 2,
                                tableAttrs: {
                                    style: {
                                        //border: '1px solid black'
                                    }
                                }
                            },
                            defaultType: 'combobox',
                            defaults: {
                                //width: 220,
                                //constrain: true,
                                margin: '0 10 3 0',
                                labelWidth: 80
                                //minHeight: 720,
                                //padding: '10 10 0 10'
                            },
            
                            items: [{
                                xtype: 'combo',
                                name: 'status',
                                fieldLabel: 'Status',
                                //width: 210,
                                labelWidth: 70,
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
                                    value: '{theShip.status}'
                                }
                            },
                            {
                                xtype: 'combo',
                                name: 'term',
                                fieldLabel: 'Term',
                                displayField: 'label',
                                valueField: 'value',
                                //editable: false,
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
                                    store: '{terms}',
                                    value: '{theShip.term}'
                                }
                            },
                            {
                                xtype: 'datefield',
                                name: 'cancelDate',
                                fieldLabel: 'Cancel Date',
                                fieldCls: 'emphasized',
                                width: 230,
                                readOnly: true,
                                //selectOnFocus: false,
                                //editable: false,
                                format: 'Y-m-d h:i a',
                                bind: {
                                    value: '{theShip.cancelDate}'
                                }                               
                            },
                            {
                                xtype: 'numberfield',
                                name: 'misc',
                                fieldLabel: 'MISC',
                                hideTrigger: true,
                                keyNavEnabled: false,
                                mouseWheelEnabled: false,
                                readOnly: false,
                                //selectOnFocus: false,
                                //flex: 1,
                                bind: {
                                    value: '{theShip.misc}'
                                }
                            },
                            {
                                xtype: 'container',
                                height: 24
                            }]
                        },{
                            responsiveCls: 'small-100',
                            //width: '30%',
                            layout: {
                                type: 'table',
                                columns: 2,
                                tableAttrs: {
                                    style: {}
                                }
                            },
            
                            defaultType: 'textfield',
                            defaults: {
                                constrain: true,
                                margin: '0 10 3 0',
                                labelWidth: 80
                                //minHeight: 720,
                                //padding: '10 10 0 10'
                            },
            
                            items: [
                            {
                                xtype: 'combo',
                                name: 'division',
                                fieldLabel: 'Division',
                                displayField: 'label',
                                valueField: 'value',
                                editable: false,
                                //selectOnFocus: true,
                                allowBlank: false,
                                forceSelection: true,
                                //msgTarget: 'side',
                                minChars: 1,
                                queryMode: 'local',
                                //queryParam: 'filter',
                                //triggerAction: 'all',
                                //store: ['00', 'OS', 'SA'],
                                bind: {
                                    store: '{divisions}',
                                    value: '{theShip.division}'
                                }
                            },
                            {
                                xtype: 'numberfield',
                                name: 'discountRate',
                                fieldLabel: 'Disc Rate',
                                hideTrigger: true,
                                keyNavEnabled: false,
                                mouseWheelEnabled: false,
                                readOnly: false,
                                //selectOnFocus: false,
                                //flex: 1,
                                bind: {
                                    value: '{theShip.discountRate}'
                                }
                            },    
                            {
                                xtype: 'datefield',
                                name: 'startDate',
                                format: 'Y-m-d',
                                fieldLabel: 'S.O Ship Date',
                                //editable: false,
                                bind: {
                                    value: '{theShip.startDate}'
                                }
                                //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                            }, 
                            {
                                xtype: 'numberfield',
                                name: 'freight',
                                fieldLabel: 'Freight',
                                hideTrigger: true,
                                keyNavEnabled: false,
                                mouseWheelEnabled: false,
                                readOnly: false,
                                //selectOnFocus: false,
                                //flex: 1,
                                bind: {
                                    value: '{theShip.freight}'
                                }
                            },
                            {
                                xtype: 'container',
                                height: 24
                            }]
                        },
                        {
                            responsiveCls: 'small-100',
                            //width: '30%',
                            layout: {
                                type: 'table',
                                columns: 2,
                                tableAttrs: {
                                    style: {}
                                }
                            },
            
                            defaultType: 'textfield',
                            defaults: {
                                constrain: true,
                                margin: '0 10 3 0',
                                labelWidth: 80
                                //minHeight: 720,
                                //padding: '10 10 0 10'
                            },
            
                            items: [{
                                xtype: 'combo',
                                name: 'shipVia',
                                fieldLabel: 'Shipvia',
                                displayField: 'label',
                                valueField: 'value',
                                //editable: true,
                                //selectOnFocus: false,
                                //allowBlank: true,
                                //forceSelection: true,
                                pageSize: 50,
                                matchFieldWidth: false,
                                //msgTarget: 'side',                        
                                minChars: 1,                        
                                queryMode: 'local',                        
                                //queryParam: 'filter',
                                //lastQuery: '',
                                autoLoadOnValue: true,
                                //triggerAction: 'all',
                                //store: ['00', 'OS', 'SA'],
                                store: 'memShipvias',
                                remoteStore: 'shipvias',
                                listConfig: {
                                    loadindText: 'Searching...',
                                    emptyText: 'No matching items found.',
                                    width: 340
                                },
                                bind: {                            
                                    value: '{theShip.shipVia}'
                                },
                                plugins: [{
                                    ptype: "cleartrigger"
                                }],
                                listeners: {
                                    change: function(c){
                                        c.getStore().load();
                                    },          
                                    beforequery: function(q){
                                        //delete q.combo.lastQuery;
                                    },               
                                    triggerClear: function(c){
                                        c.getStore().load();                                
                                    }
                                }
                            }, 
                            {
                                xtype: 'textfield',
                                name: 'spno',
                                fieldLabel: 'S&P #',
                                fieldCls: 'emphasized',    
                                //width: 210,
                                labelWidth: 70,
                                readOnly: true,
                                allowBlank: false,
                                selectOnFocus: false,
                                //flex: 1,
                                bind: {
                                    value: '{theShip.spno}'
                                },
                                allowBlank: true
                            },
                            {
                                xtype: 'combo',
                                name: 'memoCode',
                                fieldLabel: 'Memo Code',
                                displayField: 'label',
                                valueField: 'text',
                                editable: false,
                                //selectOnFocus: true,
                                //allowBlank: false,
                                forceSelection: true,
                                //msgTarget: 'side',
                                minChars: 1,
                                queryMode: 'local',
                                //queryParam: 'filter',
                                //triggerAction: 'all',
                                bind: {
                                    store: '{memocodes}',
                                    value: '{theShip.memoCode}'
                                }
                            },                            
                            {
                                xtype: 'container',
                                colspan: 2,
                                height: 24
                            }]
                        },
                        {
                            responsiveCls: 'small-100',
                            //width: '30%',
                            layout: {
                                type: 'table',
                                columns: 2,
                                tableAttrs: {
                                    style: {}
                                }
                            },
            
                            defaultType: 'textfield',
                            defaults: {
                                constrain: true,
                                margin: '0 10 3 0',
                                labelWidth: 80
                                //minHeight: 720,
                                //padding: '10 10 0 10'
                            },
            
                            items: [{
                                xtype: 'combo',
                                name: 'paymentCode',
                                fieldLabel: 'Pmt Method',
                                displayField: 'label',
                                valueField: 'value',
                                //editable: true,
                                //selectOnFocus: false,
                                //allowBlank: true,
                                //forceSelection: true,
                                pageSize: 50,
                                matchFieldWidth: false,
                                //msgTarget: 'side',                        
                                minChars: 1,                        
                                queryMode: 'local',                        
                                //queryParam: 'filter',
                                //lastQuery: '',
                                autoLoadOnValue: true,
                                //triggerAction: 'all',
                                //store: ['00', 'OS', 'SA'],                                
                                store: 'paymentcodes',
                                listConfig: {
                                    loadindText: 'Searching...',
                                    emptyText: 'No matching items found.',
                                    width: 340
                                },
                                bind: {                            
                                    value: '{theShip.paymentCode}'
                                },
                                plugins: [{
                                    ptype: "cleartrigger"
                                }],
                                listeners: {                                     
                                    beforequery: function(q){
                                        //delete q.combo.lastQuery;
                                    }
                                }
                            }, 
                            {
                                xtype: 'textfield',
                                name: 'BOLNo',
                                fieldLabel: 'BOL #',
                                fieldCls: 'emphasized',    
                                //width: 210,
                                labelWidth: 70,
                                readOnly: true,
                                allowBlank: false,
                                selectOnFocus: false,
                                //flex: 1,
                                bind: {
                                    value: '{theShip.BOLNo}'
                                },
                                allowBlank: true
                            },                         
                            {
                                xtype: 'textfield',
                                name: 'spno',
                                fieldLabel: 'R. S&P #',
                                fieldCls: 'emphasized',    
                                //width: 210,
                                labelWidth: 70,
                                readOnly: true,
                                allowBlank: false,
                                selectOnFocus: false,
                                //flex: 1,
                                bind: {
                                    value: '{theShip.spno}'
                                },
                                allowBlank: true
                            },  
                            {
                                xtype: 'container',
                                colspan: 2,
                                height: 24
                            }]
                        },
                        {
                            responsiveCls: 'small-100',
                            //width: '30%',
                            layout: {
                                type: 'table',
                                columns: 2,
                                tableAttrs: {
                                    style: {}
                                }
                            },
            
                            defaultType: 'textfield',
                            defaults: {
                                constrain: true,
                                margin: '0 10 3 0',
                                labelWidth: 80
                                //minHeight: 720,
                                //padding: '10 10 0 10'
                            },
            
                            items: [{
                                xtype: 'combo',
                                name: 'warehouse',
                                fieldLabel: 'Warehouse',
                                displayField: 'label',
                                valueField: 'value',
                                //editable: true,
                                //selectOnFocus: false,
                                //allowBlank: true,
                                //forceSelection: true,
                                pageSize: 50,
                                matchFieldWidth: false,
                                //msgTarget: 'side',                        
                                minChars: 1,                        
                                queryMode: 'local',                        
                                //queryParam: 'filter',
                                //lastQuery: '',
                                autoLoadOnValue: true,
                                //triggerAction: 'all',
                                //store: ['00', 'OS', 'SA'],                                
                                store: 'warehouses',
                                listConfig: {
                                    loadindText: 'Searching...',
                                    emptyText: 'No matching items found.',
                                    width: 340
                                },
                                bind: {                            
                                    value: '{theShip.warehouse}'
                                },
                                plugins: [{
                                    ptype: "cleartrigger"
                                }],
                                listeners: {                                     
                                    beforequery: function(q){
                                        //delete q.combo.lastQuery;
                                    }
                                }
                            } ,{
                                xtype: 'combo',
                                name: 'salesRep2',
                                fieldLabel: 'Sales Rep2',
                                displayField: 'label',
                                valueField: 'value',
                                //editable: true,
                                //selectOnFocus: false,
                                //allowBlank: true,
                                //forceSelection: true,
                                pageSize: 50,
                                matchFieldWidth: false,
                                //msgTarget: 'side',                        
                                minChars: 1,                        
                                queryMode: 'local',                        
                                //queryParam: 'filter',
                                //lastQuery: '',
                                autoLoadOnValue: true,
                                //triggerAction: 'all',
                                //store: ['00', 'OS', 'SA'],                                
                                store: 'salesReps',
                                listConfig: {
                                    loadindText: 'Searching...',
                                    emptyText: 'No matching items found.',
                                    width: 340
                                },
                                bind: {                            
                                    value: '{theShip.salesRep2}'
                                },
                                plugins: [{
                                    ptype: "cleartrigger"
                                }],
                                listeners: {                                     
                                    beforequery: function(q){
                                        //delete q.combo.lastQuery;
                                    }
                                }
                            }, 
                            {
                                xtype: 'numberfield',
                                name: 'comRate2',
                                fieldLabel: 'Comm. Rate2',
                                hideTrigger: true,
                                keyNavEnabled: false,
                                mouseWheelEnabled: false,
                                readOnly: false,
                                //selectOnFocus: false,
                                //flex: 1,
                                bind: {
                                    value: '{theShip.comRate2}'
                                }
                            },
                            {
                                xtype: 'textfield',
                                name: 'mast_cartonno',
                                fieldLabel: 'Mater Carton #',
                                fieldCls: 'emphasized',    
                                //width: 210,
                                labelWidth: 70,
                                readOnly: true,
                                allowBlank: false,
                                selectOnFocus: false,
                                //flex: 1,
                                bind: {
                                    value: '{theShip.mast_cartonno}'
                                },
                                allowBlank: true
                            }, 
                            {
                                xtype: 'container',
                                height: 24
                            }]
                        },
                        {
                            responsiveCls: 'small-100',
                            //width: '30%',
                            layout: {
                                type: 'table',
                                columns: 2,
                                tableAttrs: {
                                    style: {}
                                }
                            },
            
                            defaultType: 'textfield',
                            defaults: {
                                constrain: true,
                                margin: '0 10 3 0',
                                labelWidth: 80
                                //minHeight: 720,
                                //padding: '10 10 0 10'
                            },
            
                            items: [{
                                xtype: 'textfield',
                                name: 'dept',
                                fieldLabel: 'Dept. #',
                                fieldCls: 'emphasized',    
                                //width: 210,
                                labelWidth: 70,
                                readOnly: true,
                                allowBlank: false,
                                selectOnFocus: false,
                                //flex: 1,
                                bind: {
                                    value: '{theShip.dept}'
                                },
                                allowBlank: true
                            },{
                                xtype: 'combo',
                                name: 'salesRep1',
                                fieldLabel: 'Sales Rep1',
                                displayField: 'label',
                                valueField: 'value',
                                //editable: true,
                                //selectOnFocus: false,
                                //allowBlank: true,
                                //forceSelection: true,
                                pageSize: 50,
                                matchFieldWidth: false,
                                //msgTarget: 'side',                        
                                minChars: 1,                        
                                queryMode: 'local',                        
                                //queryParam: 'filter',
                                //lastQuery: '',
                                autoLoadOnValue: true,
                                //triggerAction: 'all',
                                //store: ['00', 'OS', 'SA'],                                
                                store: 'salesReps',
                                listConfig: {
                                    loadindText: 'Searching...',
                                    emptyText: 'No matching items found.',
                                    width: 340
                                },
                                bind: {                            
                                    value: '{theShip.salesRep1}'
                                },
                                plugins: [{
                                    ptype: "cleartrigger"
                                }],
                                listeners: {                                     
                                    beforequery: function(q){
                                        //delete q.combo.lastQuery;
                                    }
                                }
                            }, 
                            {
                                xtype: 'numberfield',
                                name: 'comRate1',
                                fieldLabel: 'Comm. Rate1',
                                hideTrigger: true,
                                keyNavEnabled: false,
                                mouseWheelEnabled: false,
                                readOnly: false,
                                //selectOnFocus: false,
                                //flex: 1,
                                bind: {
                                    value: '{theShip.comRate1}'
                                }
                            },
                            {
                                xtype: 'numberfield',
                                name: 'Total',
                                fieldLabel: 'total',
                                hideTrigger: true,
                                keyNavEnabled: false,
                                mouseWheelEnabled: false,
                                readOnly: false,
                                //selectOnFocus: false,
                                //flex: 1,
                                bind: {
                                    value: '{theShip.total}'
                                }
                            },
                            {
                                xtype: 'container',
                                height: 24
                            }]
                        }]
                    },     
                    {
                        xtype: 'grid',
                        reference: 'ship-grid',
                        tools: [
                            { 
                                type: 'refresh',
                                tooltip: 'Refresh data'
                            }
                        ],
        
                        header: {
                            title: 'Detail',
                            iconCls: 'x-fa fa-list',  
                            titlePosition: 2,
                            titleAlign: 'left',
                            items: [{
                                xtype: 'button',
                                //text: 'Expand all',                                
                                iconCls: 'x-fa fa-expand',                                
                                enableToggle: true,
                                listeners: {
                                    toggle: {                                        
                                        fn: function(button, pressed){
                                            var grid = button.up('grid'),
                                                override = grid.getPlugin('shipRowExpander');                                                                                                    
                                        }
                                    }
                                }
                                /*
                                pressed: true,
                                enableToggle: true,
                                toggleHandler: function(button, pressed) {
                                    var grid = button.up('grid');
                                    var override = grid.getPlugin('soRowExpander');
                            
                                    //console.log('toggle', this, override);
                                    if (!pressed) {
                                            //button.setText('Collapse all');                             
                                        override.expandAll();                            
                                    } else {
                                        //button.setText('Expand all');     
                                        override.collapseAll();
                                    }
                                }
                                */
                            },{
                                xtype: 'tbspacer',
                                width: 10
                            }]
                        },

                        flex: 1,
                        columnLines: true,                        
                        deferRowRender: true,

                        bind: {
                            selection: '{selection}',
                            store: '{theShip.shipmentitems}'
                        },
        
                        listeners: {                                
                            beforeload: function(store, op){                                
                                //store.setRemoteFilter(false);
                            },                                         
                            itemcontextmenu: 'onItemContextMenu',
                            selectionchange: {
                                fn: 'onSelectionChanged',
                                scope: this.controller
                            },
                            edit: {
                                fn: 'onRowEditing',
                                scope: this.controller
                            }
                        },
        
                        columns: me.buildGridColumns(),
        
                        selModel: {
                            //type: 'checkboxmodel',                    
                            //mode: 'MULTI',
                            //pruneRemoved: false
                        },
        
                        viewConfig: {
                            //loadMask: true,                            
                            //trackOver: true,
                            //preserveScrollOnRefresh: true,
                            //preserveScrollOnReload: true,                                                  
                            deferInitialRefresh: true,
                            emptyText: '<h1 style="margin: 20px">No matching results</h1>',
                            getRowClass: function(a, g, f, h){
                                //return "custom-row-style";
                            },
                            listeners: {
                                
                            }
                        },
        
                        features: [{
                            ftype: 'summary'
                        }],
        
                        plugins: [{
                            ptype: 'rowexpander',
                            //bodyBefore: true,
                            expandOnDblClick: false,                            
                            selectRowOnExpand: false,

                            id: 'shipRowExpander',
                            rowBodyTpl: new Ext.XTemplate(
                                '<div class="item-boxer" >',
                                    '<div class="box-row" style="height:20px">',
                                        //'<div class="box nb center" style="width:40px;"></div>',
                                        '<div class="box ab center" style="width:97px;">Desc.</div>',
                                        '<div class="box ab center" style="width:318px;">{descript}</div>',
                                        '<div class="box ab">',
                                            '<div class="item-boxer" style="height:20px">',
                                            '<div class="box rb" style="width:50px;padding-left:10px;">{Size1}</div>',
                                            '<div class="box rb" style="width:50px;padding-left:10px;">{Size2}</div>',
                                            '<div class="box rb" style="width:50px;padding-left:10px;">{Size3}</div>',
                                            '<div class="box rb" style="width:50px;padding-left:10px;">{Size4}</div>',
                                            '<div class="box rb" style="width:50px;padding-left:10px;">{Size5}</div>',
                                            '<div class="box rb" style="width:50px;padding-left:10px;">{Size6}</div>',
                                            '<div class="box rb" style="width:50px;padding-left:10px;">{Size7}</div>',
                                            '<div class="box rb" style="width:50px;padding-left:10px;">{Size8}</div>',
                                            '<div class="box rb" style="width:50px;padding-left:10px;">{Size9}</div>',
                                            '<div class="box rb" style="width:50px;padding-left:10px;">{Size10}</div>',
                                            '<div class="box rb" style="width:50px;padding-left:10px;">{Size11}</div>',
                                            '<div class="box nb" style="width:48px;padding-left:10px;">{Size12}</div>',
                                            //'<div class="box nb center" style="width:82px;"></div>',
                                            '</div>',
                                        '</div>',
                                        '<div class="box ab center" style="width:82px;"></div>',
                                        '<div class="box ab" style="width:80px;padding-left:10px;">{style_price:usMoney}</div>',                                
                                        '<div class="box ab">',
                                            '<div class="item-boxer" style="height:20px">',
                                                '<div class="box rb center" style="width:91px;"></div>',
                                                '<div class="box rb center" style="width:80px;">{orderNo}</div>',                                                
                                                '<div class="box rb center" style="width:100px;">{pickno}</div>', 
                                                '<div class="box rb center" style="width:100px;">{pono}</div>',
                                                '<div class="box rb center" style="width:120px;">{po_receive_no}</div>', 
                                                '<div class="box rb center" style="width:100px;">{invoiceNO}</div>',
                                                '<div class="box nb center" style="width:100px;">{spno}</div>', 
                                                '<div class="box nb center" style="width:120px;">{ID}</div>', 
                                            '</div>',
                                        '</div>',                                
                                    '</div>',                                                             
                                '</div>',                        
                                {
                                    formatChange: function(v) {
                                        var color = v >= 0 ? 'green' : 'red';
                
                                        return '<span style="color: ' + color + ';">' +
                                            Ext.util.Format.usMoney(v) + '</span>';
                                    }
                                })
                        },{
                            ptype: 'rowediting',
                            pluginId: 'shipGridRowEdit',
                            clicksToMoveEditor: 1,                    
                            //errorSummary: false,
                            autoCancel: false,
                            listeners: {
                                /*
                                edit: {
                                    fn: 'onRowEdit',
                                    scope: this.controller
                                }
                                */
                            }
                        },{
                            ptype: "gridfilters"
                        },{
                            ptype: 'grid-exporter'
                        }]
                    }
                    /*
                    {
                        xtype: 'panel',       
                        title: 'Items',
                        iconCls: 'x-fa fa-list',
                        html:[
                            '<div class="item-boxer" style="width:1800px;margin: 5px;">',
                                '<div class="box-row">',
                                    '<div class="box ab center" style="width:30px;">Line</div>',
                                    '<div class="box ab">',
                                        '<div class="item-boxer">',
                                            '<div class="box rb center" style="width:160px;">Style</div>',
                                            '<div class="box nb center" style="width:160px;">Color</div>',
                                        '</div>',
                                    '</div>',
                                    '<div class="box">',
                                        '<div class="item-boxer">',
                                            '<div class="box nb" style="width:50px;"></div>',
                                            '<div class="box nb" style="width:50px;"></div>',
                                            '<div class="box nb" style="width:50px;"></div>',
                                            '<div class="box nb" style="width:50px;"></div>',
                                            '<div class="box nb" style="width:50px;"></div>',
                                            '<div class="box nb" style="width:50px;"></div>',
                                            '<div class="box nb" style="width:50px;"></div>',
                                            '<div class="box nb" style="width:50px;"></div>',
                                            '<div class="box nb" style="width:82px;"></div>',
                                        '</div>',
                                    '</div>',
                                    '<div class="box ab center" style="width:70px;">Total Qty</div>',
                                    '<div class="box ab center" style="width:70px;">Price</div>',                                
                                    '<div class="box ab">',
                                        '<div class="item-boxer">',
                                            '<div class="box rb center" style="width:70px;">Ext. Price</div>',
                                            '<div class="box rb center" style="width:70px;">Status</div>',
                                            '<div class="box nb center" style="width:70px;">Warehouse</div>',                                                                        
                                        '</div>',
                                    '</div>',
                                    '<div class="box ab center" style="width:80px;">CXL Date</div>',
                                    '<div class="box ab center" style="width:140px;">CXL Reason</div>',
                                    '<div class="box ab center" style="width:80px;">CXL R. Date</div>',                                
                                    '<div class="box ab center" style="width:100px;">Pick #</div>',
                                    '<div class="box ab center" style="width:70px;">Pick Qty</div>',    
                                    '<div class="box nb center" style="width:0px;"></div>',                            
                                '</div>',
                                '<div class="box-row">',
                                    '<div class="box nb" style="width:30px;"></div>',
                                    '<div class="box ab center" style="width:320px;">Description</div>',                                
                                    '<div class="box">',
                                        '<div class="item-boxer">',
                                            '<div class="box nb" style="width:50px;"></div>',
                                            '<div class="box nb" style="width:50px;"></div>',
                                            '<div class="box nb" style="width:50px;"></div>',
                                            '<div class="box nb" style="width:50px;"></div>',
                                            '<div class="box nb" style="width:50px;"></div>',
                                            '<div class="box nb" style="width:50px;"></div>',
                                            '<div class="box nb" style="width:50px;"></div>',
                                            '<div class="box nb" style="width:50px;"></div>',
                                            '<div class="box nb" style="width:82px;"></div>',
                                        '</div>',
                                    '</div>',
                                    '<div class="box ab center" style="width:70px;"></div>',                                
                                    '<div class="box ab center" style="width:70px;">Org Price</div>',
                                    '<div class="box ab">',
                                        '<div class="item-boxer">',
                                            '<div class="box nb center" style="width:210px;">Memo</div>',                                        
                                        '</div>',
                                    '</div>',
                                    '<div class="box ab center" style="width:80px;">P.O #</div>',
                                    '<div class="box ab center" style="width:140px;">User</div>',
                                    '<div class="box ab center" style="width:80px;">Created</div>',                                
                                    '<div class="box ab center" style="width:100px;">Ship #</div>',
                                    '<div class="box ab center" style="width:70px;">Ship Qty</div>',   
                                    '<div class="box nb center" style="width:0px;"></div>', 
                                '</div>',
                                '<div class="box-row">',
                                    '<div class="box ab center" style="width:30px;"></div>',
                                    '<div class="box ab">',
                                        '<div class="item-boxer">',
                                            '<div class="box rb center" style="width:160px;"></div>',
                                            '<div class="box nb center" style="width:160px;"></div>',
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
                                            '<div class="box rb" style="width:82px;"></div>',
                                        '</div>',
                                    '</div>',
                                    '<div class="box ab center" style="width:70px;"></div>',
                                    '<div class="box ab center" style="width:70px;"></div>',
                                    '<div class="box ab">',
                                        '<div class="item-boxer">',                                    
                                            '<div class="box rb center" style="width:70px;"></div>',                                    
                                            '<div class="box nb center" style="width:140px;"></div>',  
                                        '</div>',
                                    '</div>',
                                    '<div class="box ab center" style="width:80px;">Season</div>',                             
                                    '<div class="box ab center" style="width:140px;"></div>',
                                    '<div class="box ab center" style="width:80px;"></div>',                                                                   
                                    '<div class="box ab center" style="width:100px;">Inv #</div>',
                                    '<div class="box ab center" style="width:70px;">Inv. Qty</div>',                                
                                    '<div class="box nb center" style="width:0px;"></div>',
                                '</div>',
                            '</div>'
                        ]
                    },
                    */
                    /*                                
                    {
                        xtype: 'panel',
                        
                        flex: 1,     
                        layout: 'fit',
                        items: [                    
                        {
                            xtype: 'sales-view',
                            reference: "so-view",
                            
                            scrollable: true,
                            margin: 5,
                            cls: 'pi-view',
                            bind: {
                                selection: '{selection}',
                                store: "{theShip.salesorderitems}"
                            },
                            listeners: {
                                select: 'onItemSelect',
                                itemcontextmenu: 'onItemContextMenu',
                                itemdblclick: {
                                    fn: 'onItemDblClick'
                                }
                            },
                            tpl: new Ext.XTemplate(                        
                                '<tpl for=".">',
                                    '<div class="item-selector">',
                                        '<div class="item-boxer" style="width:1800px;">',
                                            '<div class="box-row">',
                                                '<div class="box ab center" style="width:30px;">{line}</div>',
                                                '<div class="box ab">',
                                                    '<div class="item-boxer">',
                                                        '<div class="box rb" style="width:160px;">{style:trim}</div>',
                                                        '<div class="box nb" style="width:160px;">{color:trim}</div>',
                                                    '</div>',
                                                '</div>',
                                                '<div class="box ab">',
                                                    '<div class="item-boxer">',
                                                        '<div class="box rb center" style="width:50px;">{Size1}</div>',
                                                        '<div class="box rb center" style="width:50px;">{Size2}</div>',
                                                        '<div class="box rb center" style="width:50px;">{Size3}</div>',
                                                        '<div class="box rb center" style="width:50px;">{Size4}</div>',
                                                        '<div class="box rb center" style="width:50px;">{Size5}</div>',
                                                        '<div class="box rb center" style="width:50px;">{Size6}</div>',
                                                        '<div class="box rb center" style="width:50px;">{Size7}</div>',
                                                        '<div class="box rb center" style="width:50px;">{Size8}</div>',
                                                        '<div class="box nb center" style="width:82px;"></div>',
                                                    '</div>',
                                                '</div>',                                    
                                                '<div class="box ab center" style="width:70px;"></div>',
                                                '<div class="box ab center" style="width:70px;">{price:usMoney}</div>',
                                                '<div class="box ab">',
                                                    '<div class="item-boxer">',
                                                        '<div class="box rb center" style="width:70px;">{extPrice:usMoney}</div>',
                                                        '<div class="box rb center" style="width:70px;">{status}</div>',
                                                        '<div class="box nb center" style="width:70px;">{wh}</div>',                                                                        
                                                    '</div>',
                                                '</div>',
                                                '<div class="box ab" style="width:80px;">{canceldate:date("Y-m-d")}</div>',
                                                '<div class="box ab" style="width:140px;">{cancelReason}</div>',
                                                '<div class="box ab center" style="width:80px;">{cancelReasondate:date("Y-m-d")}</div>',                                
                                                '<div class="box ab center" style="width:100px;">{pickno}</div>',
                                                '<div class="box ab center" style="width:70px;">{pick_qty}</div>',
                                                '<div class="box nb center" style="width:0px;"></div>',
                                            '</div>',
                                            '<div class="box-row">',
                                                '<div class="box ab" style="width:30px;"></div>',
                                                '<div class="box ab" style="width:320px;">{descript:trim}</div>',
                                                '<div class="box ab">',
                                                    '<div class="item-boxer">',
                                                        '<div class="box rb right" style="width:50px;">{unit1}</div>',
                                                        '<div class="box rb right" style="width:50px;">{unit2}</div>',
                                                        '<div class="box rb right" style="width:50px;">{unit3}</div>',
                                                        '<div class="box rb right" style="width:50px;">{unit4}</div>',
                                                        '<div class="box rb right" style="width:50px;">{unit5}</div>',
                                                        '<div class="box rb right" style="width:50px;">{unit6}</div>',
                                                        '<div class="box rb right" style="width:50px;">{unit7}</div>',
                                                        '<div class="box rb right" style="width:50px;">{unit8}</div>',
                                                        '<div class="box nb right" style="width:82px;"></div>',
                                                    '</div>',
                                                '</div>',
                                                '<div class="box ab right" style="width:70px;">{totalUnit}</div>',
                                                '<div class="box ab center" style="width:70px;">{style_price:usMoney}</div>',
                                                '<div class="box ab">',
                                                    '<div class="item-boxer">',
                                                        '<div class="box nb" style="width:210px;">{memo:trim}</div>',
                                                    '</div>',
                                                '</div>',
                                                '<div class="box ab" style="width:80px;">{pono}</div>',
                                                '<div class="box ab" style="width:140px;">{create_user}</div>',
                                                '<div class="box ab" style="width:80px;">{create_date:date("Y-m-d")}</div>',
                                                '<div class="box ab center" style="width:100px;">{sosno}</div>',
                                                '<div class="box ab center" style="width:70px;">{ship_qty}</div>',
                                                '<div class="box nb center" style="width:0px;"></div>',
                                            '</div>',
                                            '<div class="box-row">',
                                                '<div class="box ab" style="width:30px;"></div>',                                        
                                                '<div class="box ab " style="width:160px;">Invoice</div>',
                                                '<div class="box ab">',
                                                    '<div class="item-boxer">',
                                                        '<div class="box rb right" style="width:50px;">{invUnit1}</div>',
                                                        '<div class="box rb right" style="width:50px;">{invUnit2}</div>',
                                                        '<div class="box rb right" style="width:50px;">{invUnit3}</div>',
                                                        '<div class="box rb right" style="width:50px;">{invUnit4}</div>',
                                                        '<div class="box rb right" style="width:50px;">{invUnit5}</div>',
                                                        '<div class="box rb right" style="width:50px;">{invUnit6}</div>',
                                                        '<div class="box rb right" style="width:50px;">{invUnit7}</div>',
                                                        '<div class="box rb right" style="width:50px;">{invUnit8}</div>',
                                                        '<div class="box nb right" style="width:82px;"></div>',
                                                    '</div>',
                                                '</div>',
                                                '<div class="box ab right" style="width:70px;">{invTotal}</div>',
                                                '<div class="box ab" style="width:70px;">{invprice:usMoney}</div>',
                                                '<div class="box ab">',
                                                    '<div class="item-boxer">',
                                                        '<div class="box rb center" style="width:70px;">{invExtprice:usMoney}</div>',
                                                        '<div class="box rb center" style="width:70px;"></div>',
                                                        '<div class="box nb center" style="width:70px;"></div>',
                                                    '</div>',
                                                '</div>',
                                                '<div class="box ab" style="width:80px;">{season}</div>',
                                                '<div class="box ab" style="width:140px;"></div>',
                                                '<div class="box ab" style="width:80px;"></div>',
                                                '<div class="box ab center" style="width:100px;">{invoiceno}</div>',
                                                '<div class="box ab center" style="width:70px;">{inv_qty}</div>',
                                                '<div class="box nb center" style="width:0px;"></div>',
                                            '</div>',
                                        '</div>',
                                    '</div>',
                                '</tpl>'
                            )
                            //
                            itemSelector: 'item',
                            prepareData: function(data){
                                //this.callParent(arguments);
                                data.button = new Ext.button.Button({text: data.text});
            
                                return data;
                            },
                            store: {
                                autoLoad: true,
                                data: [{text: 'Red'}, {text: 'Green'}, {text: 'Blue'}],
                                fields: ['text']
                            }
                            // 
                        }]
                    }
                    */
                    ]
                }],

                listeners: {
                    tabchange: 'onTabChange'
                }
            }]
        });        

        me.callParent(arguments);

        me.contextmenu = Ext.create('Ext.menu.Menu', {
            items: [
                btnEdit, btnCopy, btnDelete
            ]
        });
    },

    buildGridColumns: function(){
        return [{
            xtype: 'rownumberer',
            text: 'Line',
            //dataIndex: 'line',
            width: 55,                        
            menuDisabled: false,
            sortable: true
        },                           
        {
            text: " ",
            menuDisabled: true,
            sortable: false,
            columns: [{
                text: "Style",
                width: 160, 
                dataIndex: "style",        
                menuDisabled: false,
                sortable: true,    
                filter: {
                    type: 'string'
                },
                editor: {
                    xtype: "combo",
                    name: 'style',                
                    fieldCls: 'required',                
                    //labelWidth: 50,
                    width: 470,                             
                    valueField: 'value',
                    displayField: 'label',
                    bind: {
                        readOnly: '{isEdit}',
                        //value: '{theTransfer.style}'
                    },
                    store: 'memStyles',
                    remoteStore: 'Styles',
                    matchFieldWidth: false,
                    autoLoadOnValue: true,
                    allowBlank: false,                
                    //forceSelection: false,
                    //selectOnFocus: true,
                    //selectOnTab: false,
                    pageSize: 50,
                    //minChars: 1,
                    queryMode: 'local',
                    //queryParam: 'filter',
                    //queryDelay: 800,
                    //triggerAction: 'all',
                    //lastQuery: '',
                    listConfig: {
                        loadindText: 'Searching...',
                        emptyText: 'No matching items found.',
                        width: 340
                    },
                    plugins: [{
                        ptype: "cleartrigger"
                    }],
                    listeners: {
                        beforequery: {
                            fn: function(qe){
                                //delete qe.combo.lastQuery;
                            }
                        },                    
                        select: {
                            fn: 'onStyleComboSelected',
                            scope: this.controller
                        },
                        change: function(c, nv, ov){                        
                            //c.getStore().load();
                        },                     
                        triggerClear: function(c){
                            var cboColor = c.next('combo[name="color"]');
    
                            cboColor.setValue('');
                            cboColor.getStore().clearFilter();
                             
                            //c.getStore().load();                                
                        }
                    }
                }
            },
            {
                text: "Color",
                width: 160, 
                dataIndex: "color",       
                menuDisabled: false,
                sortable: true,     
                filter: {
                    type: 'string'
                },
                editor: {
                    xtype: "combo",
                    name: 'color',                                
                    fieldCls: 'required',                
                    width: 470,                
                    valueField: 'value',
                    displayField: 'label',
                    bind: {
                        readOnly: '{isEdit}',
                        //value: '{theTransfer.color}'
                    },
                    store: 'memStyleColors',
                    remoteStore: 'StyleColors',
                    matchFieldWidth: false,
                    autoLoadOnValue: true,
                    allowBlank: false,
                    //forceSelection: true,
                    selectOnFocus: true,
                    pageSize: 50,
                    minChars: 1,
                    queryMode: 'local',
                    //queryParam: 'filter',
                    //queryDelay: 800,
                    //triggerAction: 'all',
                    lastQuery: '',
                    listConfig: {
                        loadindText: 'Searching...',
                        emptyText: 'No matching items found.',
                        width: 340
                    },
                    plugins: [{
                        ptype: "cleartrigger"
                    }],
                    listeners: {
                        beforequery: {
                            fn: function(qe){
                                delete qe.combo.lastQuery;
                            }
                        },                    
                        select: {
                            fn: 'onColorComboSelected',
                            scope: this.controller
                        },
                        change: function(c){                        
                            //c.getStore().load();
                        },                     
                        triggerClear: function(c){
                            var cboStyle = c.previousSibling('combo[name="style"]');
                            if(Ext.isEmpty(cboStyle.getValue())){
                                c.getStore().clearFilter();
                            }                        
                            //c.getStore().load();                                
                        }
                    }
                }
            }]
        },   
        {
            xtype: 'numbercolumn',
            //header: "unit1",
            dataIndex: "unit1",
            width: 50,                     
            menuDisabled: true,
            sortable: false,  
            format: '0,000',    
            editor: {
                xtype: 'numberfield',
                hideTrigger: true
            },                     
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            xtype: 'numbercolumn',
            header: "",
            dataIndex: "unit2",
            width: 50,       
            menuDisabled: true,
            sortable: false,    
            format: '0,000',
            editor: {
                xtype: 'numberfield',
                hideTrigger: true,
            },                           
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            xtype: 'numbercolumn',
            header: "",
            dataIndex: "unit3",
            width: 50,   
            hideTrigger: true,
            menuDisabled: true,
            sortable: false,        
            format: '0,000',   
            editor: {
                xtype: 'numberfield',
                hideTrigger: true,
            },                       
            renderer: function(f, e, a){
                return f;
            }
        }, 
        {
            xtype: 'numbercolumn',
            header: "",
            dataIndex: "unit4",
            width: 50,     
            menuDisabled: true,
            sortable: false,      
            format: '0,000',  
            editor: {
                xtype: 'numberfield',
                hideTrigger: true
            },                        
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            xtype: 'numbercolumn',
            header: "",
            dataIndex: "unit5",
            width: 50,       
            menuDisabled: true,
            sortable: false,    
            format: '0,000',
            editor: {
                xtype: 'numberfield',
                hideTrigger: true
            },                         
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            xtype: 'numbercolumn',
            header: "",
            dataIndex: "unit6",
            width: 50,    
            menuDisabled: true,
            sortable: false,       
            format: '0,000',
            editor: {
                xtype: 'numberfield',
                hideTrigger: true
            },                          
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            xtype: 'numbercolumn',
            header: "",
            dataIndex: "unit7",
            width: 50,  
            menuDisabled: true,
            sortable: false,         
            format: '0,000',
            editor: {
                xtype: 'numberfield',
                hideTrigger: true
            },                          
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            xtype: 'numbercolumn',
            header: "",
            dataIndex: "unit8",
            menuDisabled: true,
            sortable: false,
            width: 50,           
            format: '0,000', 
            editor: {
                xtype: 'numberfield',
                hideTrigger: true
            },                         
            renderer: function(f, e, a){
                return f;
            }
        }, 
        {
            xtype: 'numbercolumn',
            header: "",
            dataIndex: "unit9",
            menuDisabled: true,
            sortable: false,
            width: 50,           
            format: '0,000',
            editor: {
                xtype: 'numberfield',
                hideTrigger: true
            },                          
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            xtype: 'numbercolumn',
            header: "",
            dataIndex: "unit10",
            menuDisabled: true,
            sortable: false,
            width: 50,           
            format: '0,000', 
            editor: {
                xtype: 'numberfield',
                hideTrigger: true
            },                         
            renderer: function(f, e, a){
                return f;
            }
        },        
        {
            xtype: 'numbercolumn',
            header: "",
            dataIndex: "unit11",
            menuDisabled: true,
            sortable: false,
            width: 50,       
            format: '0,000',     
            editor: {
                xtype: 'numberfield',
                hideTrigger: true
            },                    
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            xtype: 'numbercolumn',
            header: "",
            dataIndex: "unit12",
            menuDisabled: true,
            sortable: false,
            width: 50,           
            format: '0,000',   
            editor: {
                xtype: 'numberfield',
                hideTrigger: true
            },                      
            renderer: function(f, e, a){
                return f;
            }
        },
        /*
        {
            xtype: 'numbercolumn',
            header: "",
            dataIndex: "unit13",
            menuDisabled: true,
            sortable: false,
            width: 50,           
            hidden: true,    
            format: '0,000',                         
            renderer: function(f, e, a){
                return f;
            }
        }, 
        {
            xtype: 'numbercolumn',
            header: "",
            dataIndex: "unit14",
            menuDisabled: true,
            sortable: false,
            width: 50,           
            hidden: true,    
            format: '0,000',                         
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            xtype: 'numbercolumn',
            header: "",
            dataIndex: "unit5",
            menuDisabled: true,
            sortable: false,
            width: 50,           
            hidden: true,    
            format: '0,000',                         
            renderer: function(f, e, a){
                return f;
            }
        },
        */
        {
            text: "Total Qty",
            menuDisabled: true,
            sortable: false,
            columns:[{
                xtype: 'numbercolumn',
                text: "S.O #",
                dataIndex: "totalUnit",
                width: 82,           
                format: '0,000',                         
                renderer: function(f, e, a){
                    return f;
                }
            }]
        },       
        {
            text: "Price",
            menuDisabled: true,
            sortable: false,
            columns:[{
                xtype: 'numbercolumn',
                text: "Pick #",
                dataIndex: "price",
                width: 80,
                menuDisabled: true,
                sortable: false,
                format: '$0,000.00',
                editor: {
                    xtype: 'numberfield',
                    name: 'price'
                }
            }]
        },          
        {
            text: "Ext.Price",
            menuDisabled: true,
            sortable: false,
            columns:[{
                xtype: 'numbercolumn',
                text: "P.O #",
                dataIndex: "extPrice",     
                width: 95,  
                menuDisabled: true,
                sortable: false,
                format: '$0,000.00'
            }]
        },
        {
            text: "WH",
            menuDisabled: true,
            sortable: false,
            columns:[{
                text: "P.O Rcv #",
                dataIndex: "warehouse",  
                width: 100,          
                menuDisabled: true,
                sortable: false,
                editor: {
                    xtype: 'combo',                                
                    displayField: 'label',
                    valueField: 'value',
                    editable: false,
                    //selectOnFocus: true,                
                    forceSelection: true,
                    //msgTarget: 'side',
                    minChars: 1,
                    queryMode: 'local',
                    //queryParam: 'filter',
                    //triggerAction: 'all',
                    //store: ['00', 'OS', 'SA'],
                    bind: {
                        store: '{warehouses}'                    
                    }
                }
            }]
        },
        
        {            
            text: "Status",
            dataIndex: "status",
            width: 80, 
            menuDisabled: true,
            sortable: false,     
            editor: {
                xtype: 'combo',                                
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
                store: ['Open', 'Hold', 'Closed']
            },                             
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "Promotion",
            dataIndex: "promotion",
            width: 320,
            //flex: 1,
            menuDisabled: true,
            sortable: false,  
            editor: {
                xtype: 'textfield'
            }
        },   
        {
            xtype: 'datecolumn',
            text: "Cancel Date",
            width: 100,
            dataIndex: "cancelDate",
            format: 'Y-m-d',
            editor: {
                xtype: 'datefield',
                name: 'cancelDate',                
                format: 'Y-m-d'                
            }
        },  
        {
            text: "ID",
            dataIndex: "ID",            
            locked: false,
            hidden: true,
            menuDisabled: true,
            sortable: false,
            filter: {
                type: "number"
            }
        }          
        /*
        {
            text: "To Warehouse",
            dataIndex: "to_warehouse",            
            filter: {
                type: 'string'
            },
            renderer: function(value, meta, rec){                
                return value;
            }
        },                    
        {
            xtype: 'datecolumn',
            text: "Transfer Date",
            dataIndex: "transferdate",            
            hidden: true,
            format: 'Y-m-d',
            filter: {
                type: "date"
            }
        },
        {
            text: "Update User",
            dataIndex: "updateUser",            
            filter: {
                type: 'string'
            },
            renderer: function(value, meta, rec){                
                return value;
            }
        },  
        {
            xtype: 'datecolumn',
            text: "Update Time",
            dataIndex: "updateTime",
            format: 'Y-m-d h:i a',
            filter: {
                type: "date"
            }
        }        
    */];
    }
});
