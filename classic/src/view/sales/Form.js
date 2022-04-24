
Ext.define('August.view.sales.OrderForm',{
    extend: 'Ext.form.Panel',

    requires: [
        'August.view.sales.OrderFormController',
        'August.view.sales.OrderFormModel',
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

        /*
         var actNew = Ext.create('Ext.Action', {
         text: "New",
         tooltip: "Add New Item",
         //reference: 'new',
         iconCls: "x-fa fa-plus-circle",
         handler: function(item, e){
         this.fireEvent("actnew", this, item);
         },
         scope: this
         }),
         actEdit = Ext.create('Ext.Action', {
         text: 'Edit',
         tooltip: 'Edit Selected Item',
         //reference: 'edit',
         iconCls: 'x-fa fa-edit',
         handler: function(item, e){
         this.fireEvent("actedit", this, item);
         },
         scope: this
         }),
         actDelete = Ext.create('Ext.Action', {
         text: "Delete",
         tooltip: "Delete Selected Item",
         //reference: 'delete',
         iconCls: "x-fa fa-minus-circle",
         //disabled: true,
         handler: function(item, e){
         this.fireEvent("actdelete", this, item);
         },
         scope: this
         }),
         actCopy = Ext.create('Ext.Action', {
         text: 'Copy',
         tooltip: 'Copy Selected Item',
         //reference: 'edit',
         iconCls: 'x-fa fa-copy',
         handler: function(item, e){
         this.fireEvent("actcopy", this, item);
         },
         scope: this
         });
         */
         
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
            //remoteFilter: true,

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

        me.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            //reference: 'topbar',
            defaults: {
                ui: 'default'
            },
            items: [{
                iconCls: 'x-fa fa-save',
                //reference: 'save',
                text: 'Save',
                nextStep: 'save',
                tooltip: 'Save the Data',
                bind: {

                },
                handler: 'onSave'
            },{
                iconCls: 'x-far fa-times-circle',
                text: 'Close',
                //glyph:'xf0c7@FontAwesome',
                tooltip: 'Close View',
                handler: 'onClose'
            },'-', {
                xtype: 'buttongroup',
                reference: 'groupCrud',
                margin: -8,
                hidden: false,
                items: btnsConfig
            }]
        }],

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
                                width: 210,
                                labelWidth: 70,
                                readOnly: true,
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
                                readOnly: true,
                                selectOnFocus: false,
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
                                        store: '{warehouses}',
                                        value: '{theOrder.warehouse}'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    name: 'term',
                                    fieldLabel: 'Term',
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
                                        store: '{cxlreasons}',
                                        value: '{theOrder.cancelreason}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'userName',
                                    fieldLabel: 'Create User',
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
                                    width: 230,
                                    readOnly: true,
                                    selectOnFocus: false,
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
                                    readOnly: true,
                                    selectOnFocus: false,
                                    //flex: 1,
                                    bind: {
                                        value: '{theOrder.type}'
                                    }
                                },   
                                {
                                    xtype: 'combo',
                                    name: 'shipvia',
                                    fieldLabel: 'Shipvia',
                                    displayField: 'label',
                                    valueField: 'value',
                                    //editable: true,
                                    selectOnFocus: false,
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
                                    store: 'memShipvias',
                                    remoteStore: 'shipvias',
                                    listConfig: {
                                        loadindText: 'Searching...',
                                        emptyText: 'No matching items found.',
                                        width: 340
                                    },
                                    bind: {                            
                                        value: '{theOrder.shipvia}'
                                    },
                                    plugins: [{
                                        ptype: "cleartrigger"
                                    }],
                                    listeners: {
                                        change: function(c){
                                            c.getStore().load();
                                        },          
                                        beforequery: function(q){
                                            delete q.combo.lastQuery;
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
                                    allowBlank: false,
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
                                    allowBlank: false,
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
                                width: 220,
                                constrain: true,
                                margin: '0 10 3 0',
                                labelWidth: 80
                                //minHeight: 720,
                                //padding: '10 10 0 10'
                            },
            
                            items: [{
                                xtype: 'combo',
                                name: 'customer',
                                fieldLabel: 'Customer',
                                displayField: 'label',
                                valueField: 'value',
            
                                selectOnFocus: false,
                                //allowBlank: true,
                                //forceSelection: true,
                                pageSize: 50,
                                matchFieldWidth: false,
                                //msgTarget: 'side',                        
                                minChars: 2,                        
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
                                    select: {
                                        fn: 'onCustomerSelected',
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
                                forceSelection: true,
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
                                    store: '{stores}',
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
                                    value: '{theOrder.houseMedo}'
                                }
                                //fieldLabel: 'Memo'
                            }]
                        }]
                    },            
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
                            /*
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
                             */
                        }]
                    }]
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
    }
});
