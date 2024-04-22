Ext.define('August.view.sales.pick.Form',{

    extend: 'Ext.form.Panel',

    requires: [
        'August.view.sales.pick.FormController',
        'August.view.sales.pick.FormModel'
    ],

    alias: 'widget.pick-ticketForm',

    controller: 'pick-ticketForm',
    viewModel: {
        type: 'pick-ticketForm'
    },

    layout: {
        type: 'border'
    },

    bind: {
        title: '{title}'
    },

    session: true,
    trackResetOnLoad: true,
    scrollable: true,

    bodyPadding: 0,

    style: {
        borderTop: '1px solid #cfcfcf'
    },

    listeners: {

    },

    initComponent: function() {
        var me = this;        

        var addressTpl = new Ext.XTemplate(
            '<div class="item-boxer" style="width:335px;">',
                '<div class="box-row" style="height: 22px;">',                                    
                    '<div class="box ab">{[values.addr1.length != 0 ? values.addr1 : "<br />"]}</div>',                                    
                '</div>',
                '<div class="box-row" style="height: 22px;">',                                    
                    '<div class="box ab">',
                        '{[values.addr2.length != 0 ? values.addr2 : "<br />"]}',
                    '</div>',                                    
                '</div>',
                '<div class="box-row" style="height: 22px;">',
                    '<div class="box ab">',
                        '<div class="item-boxer">',
                            '<div class="box rb" style="width:140px;">{[values.city.length != 0 ? values.city : "<br />"]}</div>',
                            '<div class="box rb" style="width:50px;">{state}</div>',
                            '<div class="box nb" style="width:80px;">{zip}</div>',                                    
                        '</div>',
                    '</div>', 
                '</div>',                               
                '<div class="box-row" style="height: 22px;">',                                    
                    '<div class="box ab">',
                        '{[values.country.length != 0 ? values.country : "<br />"]}',
                    '</div>',                                    
                '</div>',
                '<div class="box-row" style="height: 22px;">',
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
                tooltip: 'Close',
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
                iconCls: 'x-fa fa-print',
                text: 'Print Preview',
                ui: 'default',
                tooltip: 'Print Pick Ticket',
                handler: 'onOpenPrintViewClick'
            }]
        },        

        Ext.applyIf(me, {
            items: [{
                xtype: "panel",
                
                reference: "pickheader",
                //iconCls: "x-fa fa-calculator",
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },

                //margin: "0 0 0 0",
                bodyPadding: 8,                                
                region: 'north',                              
                //collapseFirst: true,
                //collapseMode: 'mini',
                //plain: true,

                split: {
                    size: 5
                }, 

                flex: 7,
                collapsible: false,  
                scrollable: true,
                defaultType: 'container',
                defaults: {
                    //margin: "5 0 0 0"
                },
                fieldDefaults: {
                    labelAlign: "left",
                    margin: 0
                },
                items:[{
                    //columnWidth: 0.30,
                    layout: 'vbox',
                    defaultType: 'container',
                    defaults: {

                    },
                    items: [{                    
                        //width: '30%',
                        layout: {
                            type: 'table',
                            columns: 3,
                            tableAttrs: {
                                style: {
                                    margin: '0 0 0 0',
                                    padding: 0
                                }
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
                            name: 'pickno',
                            fieldCls: 'required',
                            fieldLabel: 'Pick #',
                            readOnly: true,
                            selectOnFocus: false,
                            //flex: 1,
                            bind: {
                                value: '{thePickTicket.pickno}'
                            },
                            allowBlank: false
                        },{
                            xtype: 'datefield',
                            name: 'pickDate',                        
                            format: 'Y-m-d',
                            fieldLabel: 'Pick Date',
                            //editable: false,                            
                            bind: {
                                value: '{thePickTicket.pickDate}'
                            }
                            //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                        },{
                            xtype: 'textfield',
                            name: 'orderdecision',
                            fieldLabel: 'EDI Order',                        
                            selectOnFocus: false,
                            //flex: 1,
                            bind: {
                                value: '{thePickTicket.orderdecision}'
                            }
                        },{
                            xtype: 'combo',
                            name: 'Status',                        
                            fieldLabel: 'status',
                            displayField: 'label',
                            valueField: 'value',
                            //matchFieldWidth: false,
                            //editable: false,
                            selectOnFocus: true,                        
                            forceSelection: false,
                            //msgTarget: 'side',
                            pageSize: 0,
                            lastQuery: '',
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            store: ['Open', 'Closed', 'Hold'],                                                
                            bind: {                                                                                
                                value: '{thePickTicket.status}'
                            },                        
                            plugins: [{
                                ptype: "cleartrigger"
                            }],
                            listeners: {                            
                                select: {
                                    //fn: 'onCustomerSelected',
                                    //scope: this.controller
                                },
                                beforequery: function(q){
                                    delete q.combo.lastQuery;
                                }
                            }                                                                        
                        },{
                            xtype: 'datefield',
                            name: 'canceldate',                        
                            format: 'Y-m-d',
                            fieldLabel: 'Cancel Date',
                            //editable: false,
                            bind: {
                                value: '{thePickTicket.canceldate}'
                            }
                            //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                        },{
                            xtype: 'textfield',
                            name: 'sotype',                        
                            fieldLabel: 'Order Type',                                                   
                            selectOnFocus: false,                            
                            bind: {
                                value: '{thePickTicket.sotype}'
                            }
                        },{
                            xtype: 'textfield',
                            name: 'sono',                        
                            fieldLabel: 'S.O #',                        
                            selectOnFocus: false,                            
                            bind: {
                                value: '{thePickTicket.sono}'
                            }
                        },{
                            xtype: 'datefield',
                            name: 'socxldate',                        
                            format: 'Y-m-d',
                            fieldLabel: 'SO. Cxl Date',
                            //editable: false,
                            bind: {
                                value: '{thePickTicket.socxldate}'
                            }
                            //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                        },{
                            xtype: 'textfield',
                            name: 'customerpono',
                            fieldLabel: 'Cust. P.O #',                        
                            selectOnFocus: false,
                            //flex: 1,
                            bind: {
                                value: '{thePickTicket.customerpono}'
                            }
                        }]
                    },{                    
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
                        flex: 1,
                        defaultType: 'combobox',
                        defaults: {             
                            //width: 220,           
                            constrain: true,
                            margin: '0 10 3 0',                        
                            labelWidth: 80
                            //minHeight: 720,
                            //padding: '10 10 0 10'
                        },
                        items: [{
                            xtype: 'combo',
                            name: 'customer',
                            width: 335,
                            fieldLabel: 'Customer',
                            fieldCls: 'required',                
                            displayField: 'label',
                            valueField: 'value',
                            readOnly: true,      
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
                                width: 320
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }],
                            bind: {
                                //store: '{customers}',
                                value: '{thePickTicket.customer}'
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
                            width: 335,
                            fieldLabel: 'Store',
                            displayField: 'label',
                            valueField: 'value',
                            editable: false,
                            //selectOnFocus: true,
                            readOnly: true,                       
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
                                width: 320
                            },
                            bind: {
                                store: '{customerStores}',
                                value: '{thePickTicket.shipTo}'
                            },
                            listeners: {
                                change: {
                                    fn: 'onShipToChanged',
                                    scope: this.controller
                                }
                            }
                        },                                                                              
                        {
                            xtype: 'component',
                            name: 'customerAddress',                        
                            width: 335, 
                            //height: 93,
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
                            width: 335,
                            //height: 93,
                            style: {
                                //border: '1px solid #cfcfcf'
                            },
                            tpl: addressTpl,
                            bind: {
                                data: '{theStore}'
                            }
                        }]
                    }]
                },{
                    // Second column
                    //columnWidth: 0.22,
                    layout: 'vbox',
                    defaultType: 'container',
                    defaults: {

                    },
                    items: [{                    
                        //width: '30%',
                        layout: {
                            type: 'table',
                            columns: 2,
                            tableAttrs: {
                                style: {
                                    margin: '0 0 0 0',
                                    padding: 0
                                }
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
                            name: 'division',
                            fieldLabel: 'Division',
                            selectOnFocus: false,
                            //flex: 1,
                            bind: {
                                value: '{thePickTicket.division}'
                            }
                        },{
                            xtype: 'textfield',
                            name: 'shipvia',
                            fieldLabel: 'Ship Via',
                            selectOnFocus: false,
                            //flex: 1,
                            bind: {
                                value: '{thePickTicket.shipvia}'
                            }
                        },{
                            xtype: 'textfield',
                            name: 'dept',
                            fieldLabel: 'Dept #',                        
                            selectOnFocus: false,
                            //flex: 1,
                            bind: {
                                value: '{thePickTicket.dept}'
                            }
                        },{     
                            xtype: 'numberfield',                                                      
                            name: 'freight',
                            fieldLabel: 'Freight',                                                   
                            //minValue: 0,
                            selectOnFocus: true,
                            forceSelection: false,
                            // Remove spinner buttons, and arrow key and mouse wheel listeners
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            bind: {
                                value: '{thePickTicket.freight}'
                            }
                        },{
                            xtype: 'textfield',
                            name: 'terms',
                            fieldLabel: 'Term',
                            selectOnFocus: false,
                            //flex: 1,
                            bind: {
                                value: '{thePickTicket.terms}'
                            }
                        },{
                            xtype: 'combo',
                            name: 'warehouse',                        
                            fieldLabel: 'Pick WH',
                            displayField: 'label',
                            valueField: 'value',
                            matchFieldWidth: false,
                            //editable: false,
                            selectOnFocus: true,
                            forceSelection: false,
                            //msgTarget: 'side',
                            pageSize: 0,
                            lastQuery: '',
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            //store: ['00', 'OS', 'SA'],                                                
                            bind: {                     
                                store: '{warehouses}',                                  
                                value: '{thePickTicket.warehouse}'
                            },                                                 
                            plugins: [{
                                ptype: "cleartrigger"
                            }],
                            listeners: {                            
                                select: {
                                    //fn: 'onCustomerSelected',
                                    //scope: this.controller
                                },
                                beforequery: function(q){
                                    delete q.combo.lastQuery;
                                }
                            }                                                                        
                        },{
                            xtype: 'textfield',
                            name: 'paymentcode',
                            fieldLabel: 'Pmt Method',
                            selectOnFocus: false,
                            //flex: 1,
                            bind: {
                                value: '{thePickTicket.paymentcode}'
                            }
                        },{
                            xtype: 'textfield',
                            name: 'factor',
                            fieldLabel: 'Factor',
                            selectOnFocus: false,
                            //flex: 1,
                            bind: {
                                value: '{thePickTicket.factor}'
                            }
                        },{
                            xtype: 'textfield',
                            name: 'bulkorder',
                            fieldLabel: 'Bulk Order',                        
                            selectOnFocus: false,
                            //flex: 1,
                            bind: {
                                value: '{thePickTicket.bulkorder}'
                            }
                        },{
                            xtype: 'textfield',
                            name: 'so_credit_appr',
                            fieldLabel: 'Factor App',
                            selectOnFocus: false,
                            //flex: 1,
                            bind: {
                                value: '{thePickTicket.so_credit_appr}'
                            }
                        },{
                            xtype: 'textfield',
                            name: 'pricelevel',
                            fieldLabel: 'Price Level',
                            selectOnFocus: false,
                            //flex: 1,
                            bind: {
                                value: '{thePickTicket.pricelevel}'
                            }
                        },{
                            xtype: 'textfield',
                            name: 'cit_app_code',
                            fieldLabel: 'F. App. CD',                        
                            selectOnFocus: false,
                            //flex: 1,
                            bind: {
                                value: '{thePickTicket.cit_app_code}'
                            }
                        },{
                            xtype: 'textfield',
                            name: 'dcrate',
                            fieldLabel: 'DC Rate',
                            selectOnFocus: false,
                            //flex: 1,
                            bind: {
                                value: '{thePickTicket.dcrate}'
                            }
                        },{
                            xtype: 'textfield',
                            name: 'cit_ref_no',
                            fieldLabel: 'F. Ref #',
                            selectOnFocus: false,
                            //flex: 1,
                            bind: {
                                value: '{thePickTicket.cit_ref_no}'
                            }
                        },{
                            xtype: 'box',
                            width: 200
                        },{
                            xtype: 'datefield',
                            name: 'soshipdate',                        
                            format: 'Y-m-d',
                            fieldLabel: 'S.O Ship',
                            //editable: false,
                            bind: {
                                value: '{thePickTicket.soshipdate}'
                            }
                            //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                        },{
                            xtype: 'textfield',
                            name: 'salesrep1',                        
                            fieldLabel: 'Sales Rep 1',                            
                            selectOnFocus: false,                                                              
                            bind: {                                                                                   
                                value: '{thePickTicket.salesrep1}'
                            }                                                                     
                        },{     
                            xtype: 'textfield',                                                      
                            name: 'comrate1',
                            fieldLabel: 'Com. Rate 1',                                                               
                            //minValue: 0,
                            selectOnFocus: false,                            
                            bind: {
                                value: '{thePickTicket.comrate1}'
                            }
                        },{
                            xtype: 'textfield',
                            name: 'salesrep2',                        
                            fieldLabel: 'Sales Rep 2',      
                            selectOnFocus: false,                                                                        
                            bind: {                     
                                value: '{thePickTicket.salesrep2}'
                            }                                                                       
                        },
                        {     
                            xtype: 'textfield',                                                      
                            name: 'comrate2',
                            fieldLabel: 'Com. Rate 2',                                                               
                            //minValue: 0,
                            selectOnFocus: false,                            
                            // Remove spinner buttons, and arrow key and mouse wheel listeners                            
                            bind: {
                                value: '{thePickTicket.comrate2}'
                            }
                        },{
                            xtype: 'box',
                            width: 200
                        },{
                            xtype: 'textfield',
                            name: 'sosno',                        
                            fieldLabel: 'Ship #',      
                            selectOnFocus: false,                                                                        
                            bind: {                     
                                value: '{thePickTicket.sosno}'
                            }                                                                       
                        }]
                    }]
                },{
                    // Third column
                    //columnWidth: 0.23,
                    layout: 'vbox',
                    defaultType: 'container',
                    defaults: {

                    },
                    items: [{                    
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
                            width: 220,
                            constrain: true,
                            margin: '0 10 3 0',                        
                            labelWidth: 90,
                            selectOnFocus: true,
                            forceSelection: false,
                            // Remove spinner buttons, and arrow key and mouse wheel listeners
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false
                            //minHeight: 720,
                            //padding: '10 10 0 10'
                        },
                        items: [{
                            xtype: 'textarea',
                            name: 'memo',
                            fieldLabel: 'Memo',                        
                            selectOnFocus: false,                        
                            colspan: 2,
                            width: 450,                        
                            bind: {
                                value: '{thePickTicket.memo}'
                            }
                        },
                        {
                            xtype: 'textarea',
                            name: 'houseMemo',
                            fieldLabel: 'H.Memo',                        
                            selectOnFocus: false,   
                            colspan: 2,                     
                            width: 450,                        
                            bind: {
                                value: '{thePickTicket.houseMemo}'
                            }
                        },
                        {
                            xtype: 'textarea',
                            name: 'routingguide',
                            fieldLabel: 'Routing Guide',                        
                            selectOnFocus: false,   
                            colspan: 2,                     
                            width: 450,                        
                            bind: {
                                value: '{thePickTicket.routingguide}'
                            }
                        }]
                    }]
                },{
                    // Fourth column
                    //columnWidth: 0.25,
                    layout: 'vbox',
                    defaultType: 'container',
                    defaults: {

                    },
                    items: [{                    
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
                        defaultType: 'textfield',
                        defaults: {             
                            width: 240,           
                            constrain: true,
                            margin: '0 10 3 0',                        
                            labelWidth: 80,  
                            //padding: '10 10 0 10'
                        },
                        items: [{
                            xtype: 'textfield',
                            name: 'createUser',
                            fieldLabel: 'Create User',                        
                            selectOnFocus: false,
                            readOnly: true,
                            //flex: 1,
                            bind: {
                                value: '{thePickTicket.createuser}'
                            }
                        },{
                            xtype: 'datefield',
                            name: 'createTime',
                            fieldLabel: 'Create Time',                        
                            selectOnFocus: false,
                            //flex: 1,
                            //width: 240,
                            readOnly: true,
                            format: 'Y-m-d h:i a',
                            bind: {
                                value: '{thePickTicket.createdate}'
                            }
                        },{
                            xtype: 'textfield',
                            name: 'updateUser',
                            fieldLabel: 'Update User',                        
                            selectOnFocus: false,
                            readOnly: true,
                            //flex: 1,
                            bind: {
                                value: '{thePickTicket.updateuser}'
                            }
                        },{
                            xtype: 'datefield',
                            name: 'updateDate',
                            fieldLabel: 'Update Time',                        
                            selectOnFocus: false,
                            //width: 240,
                            //flex: 1,
                            readOnly: true,
                            format: 'Y-m-d h:i a',
                            bind: {
                                value: '{thePickTicket.updatedate}'
                            }
                        }]
                    }]
                }]
            },            
            {
                xtype: "grid",                
                reference: "pick-grid",
                //title: 'Detail',
                iconCls: 'x-fa fa-th',                
                region: 'center',                             
                //collapseFirst: true,
                //collapseMode: 'mini',                              
                scrollable: true,                         
                flex: 10,
                style: {
                    borderTop: '1px solid #cfcfcf',
                    borderBottom: '1px solid #cfcfcf'
                },

                header: {
                    title: 'Detail',
                    iconCls: 'x-fa fa-th',  
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
                            var override = grid.getPlugin('pickRowExpander');
                    
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

                bind: {
                    selection: '{selection}',
                    store: '{thePickTicket.PickDs}'
                },

                listeners: {
                    /*
                    select: {
                        fn: 'onSelect',
                        scope: this.controller
                    },
                    */
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
                    mode: 'MULTI',
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
                    /*
                    getRowClass: function(a, g, f, h){
                        return "custom-row-style";
                    },
                    */
                    listeners: {
                        refresh: function(view, e){
                            var expander = view.ownerCt.getPlugin('pickRowExpander');
                            expander.expandAll();
                        }
                        /*  
                        render: function(view){
                            //var view = grid.getView();
                            view.tip = Ext.create('Ext.tip.ToolTip', {
                                // The overall target element.
                                target: view.el,
                                // Each grid row causes its own separate show and hide.
                                //delegate: view.itemSelector,
                                delegate: view.cellSelector,
                                // Moving within the row should not hide the tip.
                                trackMouse: true,
                                // Render immediately so that tip.body can be referenced prior to the first show.
                                renderTo: Ext.getBody(),
                                listeners: {
                                    // Change content dynamically depending on which element triggered the show.
                                    beforeshow: function updateTipBody(tip) {
                                        var trigger = tip.triggerElement,
                                            parent = tip.triggerElement.parentElement,
                                            columnTitle = view.getHeaderByCell(trigger).text,
                                            columnDataIndex = view.getHeaderByCell(trigger).dataIndex,
                                            columnText = view.getRecord(parent).get(columnDataIndex);

                                        if(!Ext.isEmpty(columnText)){
                                            var xf = Ext.util.Format;

                                            tip.update(columnText);
                                        }
                                        else {
                                            return false;
                                        }

                                    }
                                }
                            });
                        } 
                        */                       
                    }                    
                },
                
                features: [{
                    ftype: 'summary'
                }],                
               
                plugins: [{
                    ptype: 'rowediting',
                    pluginId: 'pickGridRowEdit',     
                    clicksToMoveEditor: 1,                                           
                    autoCancel: false
                },{
                    ptype: 'rowexpander',
                    //bodyBefore: true,
                    expandOnDblClick: false,
                    id: 'pickRowExpander',
                    rowBodyTpl: new Ext.XTemplate(
                        '<div class="item-boxer" >',
                            '<div class="box-row" style="height:20px">',
                                //'<div class="box nb center" style="width:40px;"></div>',
                                '<div class="box ab center" style="width:48px;">Desc.</div>',
                                '<div class="box ab center" style="width:319px;">{descript}</div>',
                                '<div class="box ab">',
                                    '<div class="item-boxer" style="height:20px">',
                                    '<div class="box rb" style="width:50px;padding-left:10px;">{size1}</div>',
                                    '<div class="box rb" style="width:50px;padding-left:10px;">{size2}</div>',
                                    '<div class="box rb" style="width:50px;padding-left:10px;">{size3}</div>',
                                    '<div class="box rb" style="width:50px;padding-left:10px;">{size4}</div>',
                                    '<div class="box rb" style="width:50px;padding-left:10px;">{size5}</div>',
                                    '<div class="box rb" style="width:50px;padding-left:10px;">{size6}</div>',
                                    '<div class="box rb" style="width:50px;padding-left:10px;">{size7}</div>',
                                    '<div class="box rb" style="width:50px;padding-left:10px;">{size8}</div>',
                                    '<div class="box rb" style="width:50px;padding-left:10px;">{size9}</div>',
                                    '<div class="box rb" style="width:50px;padding-left:10px;">{size10}</div>',
                                    '<div class="box rb" style="width:50px;padding-left:10px;">{size11}</div>',
                                    '<div class="box nb" style="width:48px;padding-left:10px;">{size12}</div>',
                                    //'<div class="box nb center" style="width:82px;"></div>',
                                    '</div>',
                                '</div>',
                                '<div class="box ab center" style="width:82px;"></div>',
                                '<div class="box ab center" style="width:99px;">{[Ext.util.Format.usMoney(values.price * values.totalUnit)]}</div>',                                     
                                '<div class="box ab">',
                                    '<div class="item-boxer"style="height:20px">',
                                        '<div class="box rb center" style="width:78px;">{status}</div>',
                                        '<div class="box rb center" style="width:80px;">{sodStatus}</div>',
                                        '<div class="box rb center" style="width:80px;"></div>',
                                        '<div class="box rb center" style="width:80px;">{pickno}</div>', 
                                        '<div class="box rb center" style="width:80px;">{sosno}</div>',
                                        '<div class="box rb center" style="width:80px;"></div>', 
                                        '<div class="box nb center" style="width:86px;padding-left:10px;">{[Ext.util.Format.usMoney(values.price * values.totalUnit)]}</div>',                                        
                                        /*
                                        '<div class="box nb center" style="width:80px;"></div>', 
                                        */                                                                                
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
            }]                    
        });

        me.callParent(arguments);        
    },          
        
    buildGridColumns: function(){
        var me = this;
        return [{
            xtype: 'rownumberer',
            text: 'Line',
            width: 60,                        
            menuDisabled: true
        },        
        {
            text: "ID",
            dataIndex: "id",            
            locked: false,
            hidden: true,
            filter: {
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "",
            menuDisabled: true,
            sortable: false,
            columns: [
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
                            width: 330
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
                            width: 330
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }],
                        listeners: {
                            beforequery: {
                                fn: function(qe){
                                    var cboStyle = this.prev('combo[name="style"]'),
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
                }
            ]
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
            text: "Total Qty",
            dataIndex: "totalUnit",
            width: 82,  
            menuDisabled: true,
            sortable: false,                     
            format: '0,000'
        },
        {
            text: "Price",               
            menuDisabled: true,
            sortable: false,
            columns:[
                {
                    xtype: 'numbercolumn',
                    text: "Ext.Price",
                    dataIndex: "price", 
                    align: 'center',           
                    menuDisabled: true,
                    sortable: false,
                    format: '$0,000.00',
                    editor: {
                        xtype: 'numberfield',
                        name: 'price'
                    }
                }
            ]
        },     
        {
            text: "WH",               
            menuDisabled: true,
            sortable: false,
            columns:[{
                text: "Status",
                dataIndex: "warehouse",  
                width: 80,        
                align: 'center',  
                menuDisabled: true,
                sortable: false,
                editor: {
                    xtype: 'combo',                                
                    displayField: 'label',
                    valueField: 'value',                    
                    //selectOnFocus: true,                
                    forceSelection: false,
                    matchFieldWidth: false,
                    //msgTarget: 'side',
                    minChars: 1,
                    queryMode: 'local',
                    //queryParam: 'filter',
                    //triggerAction: 'all',
                    //store: ['00', 'OS', 'SA'],
                    bind: {
                        store: '{warehouses}'                    
                    },
                    listConfig: {
                        loadindText: 'Searching...',
                        emptyText: 'No matching items found.',
                        width: 200
                    },   
                    plugins: [{
                        ptype: "cleartrigger"
                    }]
                }
            }]
        },
        {
            text: "SOD ID",               
            menuDisabled: true,
            sortable: false,
            columns:[{
                text: "Status",
                dataIndex: "sodid",  
                align: 'center',   
                width: 80, 
                menuDisabled: true,
                sortable: false,
            }]
        },          
        {
            text: "SO #",
            menuDisabled: true,
            sortable: false,             
            columns: [{
                text: "",
                dataIndex: "sono",
                align: 'center',
                width: 80,
                //flex: 1,
                menuDisabled: true,
                sortable: false
            }]
        },             
        {
            text: 'Alloc #',                    
            menuDisabled: true,
            sortable: false,    
            columns:[{
                text: "Pick #",
                dataIndex: "allocno",  
                align: 'center',   
                width: 80, 
                menuDisabled: true,
                sortable: false,
            }]       
        },                                         
        {
            text: "Ship #",            
            menuDisabled: true,
            sortable: false,            
            columns:[{
                text: "Inv #",
                dataIndex: "invoiceno",  
                align: 'center',   
                width: 80, 
                menuDisabled: true,
                sortable: false,
            }] 
        },
        {
            text: "Line",
            dataIndex: "line",
            align: 'center',
            width: 80,
            menuDisabled: true,
            sortable: false
        },   
        {
            text: "Orig. Price",            
            menuDisabled: true,
            sortable: false,           
            columns:[{
                xtype: 'numbercolumn',
                text: "Orig. Ext",
                dataIndex: "style_price", 
                align: 'center',           
                //width: 100,
                menuDisabled: true,
                sortable: false,
                format: '$0,000.00',
                editor: {
                    xtype: 'numberfield',
                    name: 'stylePrice'
                }
            }]            
        }];
    }
    
});
