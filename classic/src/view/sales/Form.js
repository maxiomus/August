
Ext.define('August.view.sales.OrderForm',{
    extend: 'Ext.form.Panel',

    requires: [
        'August.view.sales.OrderFormController',
        'August.view.sales.OrderFormModel',
        'Ext.ux.grid.plugin.AllRowExpander',
        'Ext.ux.view.Upload'    
    ],

    alias: 'widget.sales-orderForm',

    controller: 'sales-orderForm',
    viewModel: {
        type: 'sales-orderForm'
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
            }]
        },

        Ext.applyIf(me, {
            items: [{
                xtype: 'tabpanel',
               
                reference: 'editsotab',

                style: {
                    borderTop: '1px solid #cfcfcf'
                },

                tabPosition: 'left',
                //tabRotation: 2,
                //tabBarHeaderPosition: 0,
                //minTabWidth: 120,

                items: [{
                    tabConfig: {
                        title: 'Style Info'
                    },

                    layout: {
                        type: 'vbox',
                        pack: 'start',
                        align: 'stretch'
                    },

                    items: [{
                        xtype: 'container',                                                                        
                        reference: "soheader",
                        scrollable: 'y',
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
                                width: 220,
                                constrain: true,
                                margin: '0 10 3 0',
                                labelWidth: 80
                                //minHeight: 720,
                                //padding: '10 10 0 10'
                            },
            
                            items: [{
                                xtype: 'textfield',
                                name: 'orderno',
                                fieldLabel: 'S.O #',
                                fieldCls: 'emphasized',    
                                width: 210,
                                labelWidth: 70,
                                readOnly: true,
                                allowBlank: false,
                                selectOnFocus: false,
                                //flex: 1,
                                bind: {
                                    value: '{theOrder.orderno}'
                                },
                                allowBlank: true
                            },{
                                xtype: 'combo',
                                name: 'status',
                                fieldLabel: 'Status',
                                width: 210,
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
                                    value: '{theOrder.status}'
                                }
                            },{
                                xtype: 'textfield',
                                name: 'PO',
                                fieldLabel: 'Cust P.O #',
                                readOnly: false,
                                //selectOnFocus: false,
                                //flex: 1,
                                bind: {
                                    value: '{theOrder.PO}'
                                }
                            },{
                                xtype: 'datefield',
                                name: 'orderDate',                        
                                format: 'Y-m-d',
                                fieldLabel: 'S.O Date',
                                width: 210,
                                labelWidth: 70,                            
                                //editable: false,
                                bind: {
                                    value: '{theOrder.orderDate}'
                                }
                                //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                            },{
                                xtype: 'datefield',
                                name: 'startDate',                        
                                format: 'Y-m-d',
                                fieldLabel: 'Ship Date',
                                width: 210,
                                labelWidth: 70, 
                                //editable: false,
                                bind: {
                                    value: '{theOrder.startDate}'
                                }
                                //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                            },    
                            {
                                xtype: 'datefield',
                                name: 'cancelDate',
                                format: 'Y-m-d',
                                fieldLabel: 'Cancel Date',
                                //editable: false,
                                bind: {
                                    value: '{theOrder.cancelDate}'
                                }
                                //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                            },                                   
                            {
                                xtype: 'container',
                                colspan: 2,
                                height: 24
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
                                    value: '{theOrder.memoCode}'
                                }
                            },
                            {
                                xtype: 'container',
                                colspan: 3,
                                height: 24
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
                                    xtype: 'combo',
                                    name: 'warehouse',
                                    fieldLabel: 'Warehouse',                            
                                    displayField: 'label',
                                    valueField: 'value',
                                    //editable: true,
                                    //selectOnFocus: true,
                                    //allowBlank: false,
                                    forceSelection: true,
                                    hideTrigger: false,
                                    //msgTarget: 'side',
                                    minChars: 1,
                                    queryMode: 'local',
                                    //queryParam: 'filter',
                                    //triggerAction: 'all',
                                    //store: ['00', 'OS', 'SA'],
                                    bind: {
                                        store: '{warehouses}',
                                        value: '{theOrder.warehouse}'
                                    },
                                    plugins: [{
                                        ptype: "cleartrigger"
                                    }]
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
                                        value: '{theOrder.term}'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    name: 'cancelreason',
                                    fieldLabel: 'CXL Reason',
                                    displayField: 'label',
                                    valueField: 'value',
                                    //editable: false,
                                    //selectOnFocus: true,                                    
                                    forceSelection: true,
                                    //msgTarget: 'side',
                                    matchFieldWidth: false,
                                    minChars: 1,
                                    queryMode: 'local',
                                    //queryParam: 'filter',
                                    //triggerAction: 'all',
                                    //store: ['00', 'OS', 'SA'],
                                    bind: {
                                        store: '{cxlreasons}',
                                        value: '{theOrder.cancelreason}'
                                    },
                                    listConfig: {
                                        loadindText: 'Searching...',
                                        emptyText: 'No matching items found.',
                                        width: 240
                                    },
                                    plugins: [{
                                        ptype: "cleartrigger"
                                    }]
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'userName',
                                    fieldLabel: 'Create User',
                                    fieldCls: 'emphasized',
                                    width: 230,
                                    readOnly: true,
                                    selectOnFocus: false,
                                    //editable: false,
                                    bind: {
                                        value: '{theOrder.userName}'
                                    }
                                    //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                                },
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
                                        value: '{theOrder.division}'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    name: 'paymentcode',
                                    fieldLabel: 'PMT Method',
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
                                        store: '{paymentcodes}',
                                        value: '{theOrder.paymentcode}'
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'cancelReasonDate',                        
                                    format: 'Y-m-d',
                                    fieldLabel: 'CXL R. Date',
                                    //editable: false,
                                    bind: {
                                        value: '{theOrder.cancelReasonDate}'
                                    }
                                    //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'userTime',
                                    fieldLabel: 'Create Time',
                                    fieldCls: 'emphasized',
                                    width: 230,
                                    readOnly: true,
                                    //selectOnFocus: false,
                                    //editable: false,
                                    format: 'Y-m-d h:i a',
                                    bind: {
                                        value: '{theOrder.userTime}'
                                    }
                                    //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'type',
                                    fieldLabel: 'Order Type',
                                    //readOnly: true,
                                    //selectOnFocus: false,
                                    //flex: 1,
                                    bind: {
                                        value: '{theOrder.type}'
                                    }
                                },   
                                {
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
                                        value: '{theOrder.shipVia}'
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
                                    xtype: 'datefield',
                                    name: 'exfactorydate',                        
                                    format: 'Y-m-d',
                                    fieldLabel: 'EX. Factory',
                                    //editable: false,
                                    bind: {
                                        value: '{theOrder.userf_date}'
                                    }
                                    //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                                },
                                ,{
                                    xtype: 'textfield',
                                    name: 'UpdateUser',
                                    fieldLabel: 'Update User',
                                    fieldCls: 'emphasized',
                                    width: 230,
                                    readOnly: true,
                                    selectOnFocus: false,
                                    //editable: false,
                                    bind: {
                                        value: '{theOrder.UpdateUser}'
                                    }
                                    //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                                },
                                {
                                    xtype: 'container',
                                    colspan: 1,
                                    height: 24
                                },                    
                                {
                                    xtype: 'combo',
                                    name: 'salesrep1',
                                    fieldLabel: 'Sales Rep 1',
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
                                        store: '{salesreps}',
                                        value: '{theOrder.salesrep1}'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    name: 'salesrep2',
                                    fieldLabel: 'Sales Rep 2',
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
                                        store: '{salesreps}',
                                        value: '{theOrder.salesrep2}'
                                    }
                                },{
                                    xtype: 'datefield',
                                    name: 'UpdateTime',
                                    fieldLabel: 'Update Time',
                                    fieldCls: 'emphasized',
                                    //labelWidth: 85,
                                    width: 230,
                                    readOnly: true,
                                    selectOnFocus: false,
                                    //editable: false,
                                    format: 'Y-m-d h:i a',
                                    bind: {
                                        value: '{theOrder.UpdateTime}'
                                    }
                                    //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
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
                                name: 'customer',
                                fieldLabel: 'Customer',
                                fieldCls: 'required',                
                                displayField: 'label',
                                valueField: 'value',            
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
                                    //store: '{customers}',
                                    value: '{theOrder.customer}'
                                },                                                
                                listeners: {
                                    change: {
                                        fn: 'onCustomerChanged',
                                        scope: this.controller
                                    },                                    
                                    beforequery: function(q){
                                        delete q.combo.lastQuery;
                                    }, 
                                    triggerClear: {
                                        fn: 'onTriggerClear',
                                        scope: this.controller
                                    }
                                }
                            },
                            {
                                xtype: 'combo',
                                name: 'shipTo',
                                fieldLabel: 'Store',
                                displayField: 'label',
                                valueField: 'value',
                                editable: false,
                                //selectOnFocus: true,
                                disabled: true,
                                allowBlank: false,
                                //forceSelection: true,
                                matchFieldWidth: false,
                                //msgTarget: 'side',
                                minChars: 1,
                                queryMode: 'local',
                                //queryParam: 'filter',
                                //triggerAction: 'all',
                                //store: ['00', 'OS', 'SA'],
                                listConfig: {
                                    loadindText: 'Searching...',
                                    emptyText: 'No matching items found.',
                                    width: 260
                                },
                                bind: {
                                    store: '{customerStores}',
                                    value: '{theOrder.shipTo}'
                                },
                                listeners: {
                                    change: {
                                        fn: 'onShipToChanged',
                                        scope: this.controller
                                    }
                                }
                            },{
                                xtype: 'component',
                                name: 'customerAddress',                        
                                //width: 260,                        
                                height: 93,
                                style: {
                                    //border: '1px solid #cfcfcf'
                                },
                                tpl: addressTpl,
                                bind: {
                                    data: '{theCustomer}'
                                }
                            },{
                                xtype: 'component',
                                name: 'storeAddress',
                                //width: 240,
                                height: 93,
                                style: {
                                    //border: '1px solid #cfcfcf'
                                },
                                tpl: addressTpl,
                                bind: {
                                    data: '{theStore}'
                                }
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
                            /*
                            {
                                xtype: 'checkbox',
                                name: 'chk_onhand_by_wh',
                                fieldLabel: 'On-Hand By WH',
                                labelWidth: 105,
                                colspan: 2
                            },
                            */{
                                xtype: 'textarea',
                                name: 'memo',
                                emptyText: 'Memo:',
                                colspan: 2,
                                width: 525,
                                bind: {
                                    value: '{theOrder.memo}'
                                }
                                //fieldLabel: 'Memo'
                            },
                            {
                                xtype: 'textarea',
                                name: 'memohouse',
                                emptyText: 'House Memo:',
                                colspan: 2,
                                width: 525,
                                bind: {
                                    value: '{theOrder.houseMemo}'
                                }
                                //fieldLabel: 'Memo'
                            }]
                        }]
                    },     
                    {
                        xtype: 'grid',
                        reference: 'so-grid',
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
                            },{
                                xtype: 'tbspacer',
                                width: 10
                            }]
                        },

                        flex: 1,
                        columnLines: true,

                        bind: {
                            selection: '{selection}',
                            store: '{theOrder.salesorderitems}'
                        },
        
                        listeners: {                                                
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
                            pruneRemoved: false
                        },
        
                        viewConfig: {
                            loadMask: true,
                            stripeRows: true,
                            trackOver: true,
                            preserveScrollOnRefresh: true,
                            preserveScrollOnReload: true,
                            deferInitialRefresh: true,
                            emptyText: '<h1 style="margin: 20px">No matching results</h1>',
                            getRowClass: function(a, g, f, h){
                                return "custom-row-style";
                            },
                            listeners: {
                                refresh: function(view, e){
                                    var expander = view.ownerCt.getPlugin('soRowExpander');
                                    expander.expandAll();
                                }
                            }
                        },
        
                        features: [{
                            ftype: 'summary'
                        }],
        
                        plugins: [{
                            ptype: 'rowediting',
                            pluginId: 'soGridRowEdit',
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
                            ptype: 'allrowexpander',
                            //bodyBefore: true,
                            expandOnDblClick: false,
                            pluginId: 'soRowExpander',
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
                                                '<div class="box rb center" style="width:80px;"><b>PO #/Sub D</b></div>',
                                                '<div class="box rb center" style="width:100px;"><b>Alloc. #/Qty</b></div>',
                                                '<div class="box rb center" style="width:100px;"><b>Pick #/Qty</b></div>', 
                                                '<div class="box rb center" style="width:100px;"><b>Ship #/Qty</b></div>',
                                                '<div class="box rb center" style="width:120px;"><b>Inv. #/Qty</b></div>', 
                                                '<div class="box rb center" style="width:100px;"><b>SOD ID</b></div>',
                                                '<div class="box nb center" style="width:120px;"><b>Created</b></div>', 
                                            '</div>',
                                        '</div>',                                
                                    '</div>',
                                    '<div class="box-row" style="height:20px">',
                                        //'<div class="box nb" style="width:40px;"></div>',
                                        '<div class="box ab center" style="width:97px;">PrePack</div>',
                                        '<div class="box ab">',
                                            '<div class="item-boxer">',
                                                '<div class="box rb" style="width:160px;">{bundle}</div>',
                                                '<div class="box nb right" style="width:158px;">Invoice</div>',
                                            '</div>',
                                        '</div>',                                                                
                                        '<div class="box ab">',
                                            '<div class="item-boxer" style="height:20px">',
                                                '<div class="box rb" style="width:50px;padding-left:10px;">{invUnit1}</div>',
                                                '<div class="box rb" style="width:50px;padding-left:10px;">{invUnit2}</div>',
                                                '<div class="box rb" style="width:50px;padding-left:10px;">{invUnit3}</div>',
                                                '<div class="box rb" style="width:50px;padding-left:10px;">{invUnit4}</div>',
                                                '<div class="box rb" style="width:50px;padding-left:10px;">{invUnit5}</div>',
                                                '<div class="box rb" style="width:50px;padding-left:10px;">{invUnit6}</div>',
                                                '<div class="box rb" style="width:50px;padding-left:10px;">{invUnit7}</div>',
                                                '<div class="box rb" style="width:50px;padding-left:10px;">{invUnit8}</div>',
                                                '<div class="box rb" style="width:50px;padding-left:10px;">{invUnit9}</div>',
                                                '<div class="box rb" style="width:50px;padding-left:10px;">{invUnit10}</div>',
                                                '<div class="box rb" style="width:50px;padding-left:10px;">{invUnit11}</div>',
                                                '<div class="box nb" style="width:48px;padding-left:10px;">{invUnit12}</div>',
                                                //'<div class="box nb" style="width:82px;"></div>',
                                            '</div>',
                                        '</div>',
                                        '<div class="box ab" style="width:82px;padding-left:10px;">{invTotal}</div>',                                
                                        '<div class="box ab center" style="width:70px;"></div>',
                                        '<div class="box ab">',
                                            '<div class="item-boxer" style="height:20px">',
                                                '<div class="box rb center" style="width:91px;">{invExtprice:usMoney}</div>',
                                                '<div class="box rb center" style="width:80px;">{poNo}</div>',
                                                '<div class="box rb center" style="width:100px;">{allocno}</div>',
                                                '<div class="box rb center" style="width:100px;">{pickno}</div>',                                        
                                                '<div class="box rb center" style="width:100px;">{sosno}</div>',                                        
                                                '<div class="box rb center" style="width:120px;">{[values.inv_qty > 0 ? values.invoiceNo : 0]}</div>',                                        
                                                '<div class="box rb center" style="width:100px;">{ID}</div>',                                        
                                                '<div class="box nb center" style="width:120px;">{create_user}</div>',                                        
                                            '</div>',
                                        '</div>',                                
                                    '</div>',  
                                    '<div class="box-row" style="height:20px">',
                                        //'<div class="box nb" style="width:40px;"></div>',
                                        '<div class="box nb center" style="width:97px;"># of P.P</div>',
                                        '<div class="box ab">',
                                            '<div class="item-boxer">',
                                                '<div class="box rb" style="width:160px;">{numOfBundle}</div>',
                                                '<div class="box nb right" style="width:158px;">Balance</div>',
                                            '</div>',
                                        '</div>',                                                                
                                        '<div class="box ab">',
                                            '<div class="item-boxer" style="height:20px">',
                                                '<div class="box rb" style="width:50px;padding-left:10px;">{Bal_unit1}</div>',
                                                '<div class="box rb" style="width:50px;padding-left:10px;">{Bal_unit2}</div>',
                                                '<div class="box rb" style="width:50px;padding-left:10px;">{Bal_unit3}</div>',
                                                '<div class="box rb" style="width:50px;padding-left:10px;">{Bal_unit4}</div>',
                                                '<div class="box rb" style="width:50px;padding-left:10px;">{Bal_unit5}</div>',
                                                '<div class="box rb" style="width:50px;padding-left:10px;">{Bal_unit6}</div>',
                                                '<div class="box rb" style="width:50px;padding-left:10px;">{Bal_unit7}</div>',
                                                '<div class="box rb" style="width:50px;padding-left:10px;">{Bal_unit8}</div>',
                                                '<div class="box rb" style="width:50px;padding-left:10px;">{Bal_unit9}</div>',
                                                '<div class="box rb" style="width:50px;padding-left:10px;">{Bal_unit10}</div>',
                                                '<div class="box rb" style="width:50px;padding-left:10px;">{Bal_unit11}</div>',
                                                '<div class="box nb" style="width:48px;padding-left:10px;">{Bal_unit12}</div>',
                                                //'<div class="box nb" style="width:82px;"></div>',
                                            '</div>',
                                        '</div>',
                                        '<div class="box ab" style="width:82px;padding-left:10px;">{inv_balance}</div>',                                
                                        '<div class="box ab center" style="width:70px;"></div>',
                                        '<div class="box ab">',
                                            '<div class="item-boxer" style="height:20px">',
                                            '<div class="box rb center" style="width:91px;">{balExtprice:usMoney}</div>',
                                            '<div class="box rb center" style="width:80px;">{subdivision}</div>',
                                            '<div class="box rb center" style="width:100px;">{alloc_qty}</div>',
                                            '<div class="box rb center" style="width:100px;">{pick_qty}</div>',                                        
                                            '<div class="box rb center" style="width:100px;">{ship_qty}</div>',   
                                            '<div class="box rb center" style="width:120px;">{inv_qty}</div>',   
                                            '<div class="box rb center" style="width:100px;">{line}</div>',   
                                            '<div class="box nb center" style="width:120px;">{create_date:date("Y-m-d h:i")}</div>',                                        
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
                                store: "{theOrder.salesorderitems}"
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
                },{
                    title: 'Product Photos',
                    reference: 'photos',
                    layout: 'border',

                    items: [{
                        xtype: 'sales-orderForm-toolbar',
                        region: 'north',
                        border: '0 0 1 0',
                        listeners: {
                            actremoveall: function(tb, btn){
                                var detail = tb.nextSibling('container#photo-detail'),
                                    view = detail.nextSibling('viewupload');

                                view.fileUpload.filesQueue.length = 0;
                                view.getStore().removeAll();
                            },
                            acttoggle: function(tb, btn, pressed){
                                var detail = tb.nextSibling('container#photo-detail');

                                detail.setHidden(!pressed);
                            }
                        }
                    },{
                        xtype: 'container',
                        itemId: 'photo-detail',
                        //region: 'east',
                        plugins: "responsive",
                        responsiveConfig: {
                            "wide || width >= 960":{
                                region: "east",
                                width: '26%'
                            },
                            "tall || width < 960":{
                                region: "south",
                                height: '40%'
                            }
                        },

                        style: {
                            backgroundColor : '#f5f5f5',
                            borderLeft: '1px solid #fff'
                        },

                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },

                        hidden: true,
                        scrollable: true,
                        padding: 14,

                        split: {
                            size: 1
                        },

                        viewModel: {
                            data: {
                                thePhoto: null
                            }
                        }
                    },{
                        xtype: 'viewupload',

                        selectionModel: {
                            mode: 'multi'
                        },

                        cls: 'sample-photo-view',
                        overItemCls: "x-item-over",
                        itemSelector: "div.thumb-wrap",

                        preserveScrollOnRefresh: true,
                        deferInitialRefresh: true,
                        enableTextSelection: false,

                        scrollable: true,
                        region: 'center',
                        padding: '7 0 0 7',
                        flex: 1,

                        bind: {
                            store: '{theProduct.photosInProducts}'
                        },

                        tpl: new Ext.XTemplate(
                            '<tpl for=".">',
                            '<div class="thumb-wrap x-unselectable">',
                            //'<a class="link" href="{linkUrl}">',
                            '<span class="{F_BFLAG}"></span>',
                            '<div class="thumb">',
                                '<img src="{[this.getSrcPath(values, xcount)]}" width="174" title="{F_NAME}" />',
                                '<tpl if="this.isNotEmpty(F_MFLAG)">',
                                    '<div class="side">{F_MFLAG}</div>',
                                '</tpl>',
                            '</div>',
                            //'<span>{Title:ellipsis(11)}</span>',
                            //'</a>',
                            '</div>',
                            '</tpl>',
                            '<div class="x-clear"></div>',
                            {
                                isNotEmpty: function(F_MFLAG){
                                    return !Ext.isEmpty(F_MFLAG);
                                },
                                getSrcPath: function(a,b){
                                    var str;
                                    if(a.path){
                                        str = a.path;
                                    }
                                    else {
                                        if(!Ext.isEmpty(a.F_NAME) && !Ext.isEmpty(a.F_TYPE)) {
                                            //str = '../' + a.F_LINK + a.F_PATH + '/' + a.ID + '/' + a.F_NAME.replace(/(\.[^.]+)$/, "_medium$1");
                                            str = '../' + a.F_LINK + a.F_PATH + '/' + a.ID + '/' + a.F_NAME + '?w=174&h=232';
                                            if(a.ID < 0){
                                                str = '../' + a.F_LINK + a.F_NAME + '?w=174&h=232';
                                            }

                                        }
                                        else {
                                            str = '../' + a.F_LINK + a.F_PATH + '/' + a.F_LOCATION + a.F_EXT + '?w=174&h=232';
                                        }
                                    }

                                    return str;
                                    //return a.replace(/(\.[^.]+)$/, "_medium$1");
                                }
                            }
                        ),
                        listeners: {
                            render: function(c){
                                var toolbar = c.previousSibling('toolbar'),
                                    view = c.up('form').ownerCt;

                                toolbar.add(c.fileUpload);
                                //console.log(c.up('form').ownerCt);
                                var txt = 'RFQ';
                                if(view.routeId != 'product'){
                                    c.contextmenu.add([{
                                        text: 'Toogle for ' + txt,
                                        iconCls: 'x-fa fa-check-square-o',
                                        handler: function(item, e){
                                            Ext.each(c.getSelection(), function(rec, idx, self){
                                                rec.set('F_BFLAG', !rec.data.F_BFLAG);
                                            });

                                        }
                                    }]);
                                }

                            },
                            dropped: {
                                //fn: 'onPhotoDropped',
                                //scope: this.controller
                            },
                            itemdblclick: {
                                //fn: 'onPhotoItemDblClick',
                                //scope: this.controller
                            },
                            selectionchange: {
                                //fn: 'onPhotoSelectionChange',
                                //scope: this.controller
                            }
                        }
                    }]                    
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
            //xtype: 'rownumberer',
            text: 'Line',
            dataIndex: 'line',
            width: 55,                        
            menuDisabled: true,
            sortable: false
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
        },
        {
            text: '',
            width: 54,
            menuDisabled: true,
            sortable: false
        },    
        {
            text: "Style",
            width: 160, 
            dataIndex: "style",        
            menuDisabled: true,
            sortable: false,    
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
                        c.getStore().load();                                
                    }
                }
            }
        },
        {
            text: "Color",
            width: 160, 
            dataIndex: "color",       
            menuDisabled: true,
            sortable: false,     
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
                store: 'memColors',
                remoteStore: 'Colors',
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
                        c.getStore().load();                                
                    }
                }
            }
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
            xtype: 'numbercolumn',
            header: "Total Qty",
            dataIndex: "totalUnit",
            width: 82,           
            format: '0,000',                         
            renderer: function(f, e, a){
                return f;
            }
        },              
        {
            xtype: 'numbercolumn',
            text: "Price/Orig",
            dataIndex: "price",
            width: 80,
            menuDisabled: true,
            sortable: false,
            format: '$0,000.00',
            editor: {
                xtype: 'numberfield',
                name: 'price'
            }
        },  
        {
            xtype: 'numbercolumn',
            text: "Ext.Price",
            dataIndex: "extPrice",     
            width: 95,  
            menuDisabled: true,
            sortable: false,
            format: '$0,000.00'
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
            text: "WH",
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
        },
        {
            text: 'season',
            dataIndex: 'season',
            width: 100,
            menuDisabled: true,
            sortable: false,
            editor: {
                xtype: 'combo',     
                name: 'season',                           
                fieldCls: 'required',
                displayField: 'label',
                valueField: 'value',
                //selectOnFocus: true,
                editable: false,                
                forceSelection: true,
                minChars: 1,
                queryMode: 'local',
                bind: {
                    store: '{seasons}'
                }
            }
        }, 
        {
            text: 'Cancel Reason',
            dataIndex: 'cancelReason',
            width: 120,
            editor: {
                xtype: 'combo',                                
                displayField: 'label',
                valueField: 'value',
                editable: false,
                //selectOnFocus: true,                
                forceSelection: true,
                //msgTarget: 'side',
                minChars: 1,
                queryMode: 'local'
            }
        },
        {
            xtype: 'datecolumn',
            text: "Cancel R.Date",
            dataIndex: "cancelReasondate",
            format: 'Y-m-d',
            editor: {
                xtype: 'datefield',                
                format: 'Y-m-d'                
            }
        },        
        {
            text: "Memo",
            dataIndex: "memo",
            width: 320,
            //flex: 1,
            menuDisabled: true,
            sortable: false,  
            editor: {
                xtype: 'textfield'
            }
        },                
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
