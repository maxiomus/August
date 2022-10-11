Ext.define('August.view.customer.invoice.Form',{

    extend: 'Ext.form.Panel',

    requires: [
        'August.view.customer.invoice.FormController',
        'August.view.customer.invoice.FormModel'
    ],

    alias: 'widget.invoice-form',

    controller: 'invoice-form',
    viewModel: {
        type: 'invoice-form'
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
            }]
        },        

        Ext.applyIf(me, {
            items: [{
                xtype: "panel",
                
                reference: "invheader",
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

                //margin: "0 0 0 0",
                //bodyPadding: 0,                                
                region: 'north',                              
                //collapseFirst: true,
                //collapseMode: 'mini',
                //plain: true,

                split: {
                    size: 5
                }, 

                flex: 1,
                collapsible: true,  
                scrollable: true,
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
                        labelWidth: 90
                        //minHeight: 720,
                        //padding: '10 10 0 10'
                    },
                    items: [{
                        xtype: 'textfield',
                        name: 'invoiceno',
                        fieldCls: 'required',
                        fieldLabel: 'Invoice #',
                        readOnly: true,
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{theInvoice.invoiceno}'
                        },
                        allowBlank: false
                    },{
                        xtype: 'textfield',
                        name: 'orderNO',                        
                        fieldLabel: 'S.O #',                        
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{theInvoice.orderNO}'
                        }
                    },{
                        xtype: 'textfield',
                        name: 'sosno',                        
                        fieldLabel: 'S.O Ship #',
                        width: 240,                        
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{theInvoice.sosno}'
                        }
                    },{
                        xtype: 'datefield',
                        name: 'invoiceDate',                        
                        format: 'Y-m-d',
                        fieldLabel: 'Invoice Date',
                        //editable: false,
                        bind: {
                            value: '{theInvoice.invoiceDate}'
                        }
                        //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                    },{
                        xtype: 'textfield',
                        name: 'customerpono',
                        fieldLabel: 'Cust. P.O #',                        
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{theInvoice.customerpono}'
                        }
                    },{
                        xtype: 'textfield',
                        name: 'bol',
                        fieldLabel: 'B.O.L #',
                        width: 240,                        
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{theInvoice.bol}'
                        }
                    },{
                        xtype: 'datefield',
                        name: 'cancelDate',                        
                        format: 'Y-m-d',
                        fieldLabel: 'Due Date',
                        //editable: false,
                        bind: {
                            value: '{theInvoice.cancelDate}'
                        }
                        //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                    },{
                        xtype: 'textfield',
                        name: 'dept',
                        fieldLabel: 'Dept #',                        
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{theInvoice.dept}'
                        }
                    },{
                        xtype: 'combo',
                        name: 'division',                        
                        fieldLabel: 'Division',
                        fieldCls: 'required',
                        width: 240,
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
                        //store: ['00', 'OS', 'SA'],                                                                     
                        bind: {                     
                            store: '{divisions}',                                  
                            value: '{theInvoice.division}'
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
                            value: '{theInvoice.status}'
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
                        xtype: 'combo',
                        name: 'salesrep1',                        
                        fieldLabel: 'Sales Rep 1',
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
                            store: '{salesreps}',                                  
                            value: '{theInvoice.salesrep1}'
                        },         
                        listConfig: {
                            loadindText: 'Searching...',
                            emptyText: 'No matching items found.',
                            width: 200
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
                        xtype: 'combo',
                        name: 'paymentcode',                        
                        fieldLabel: 'PMT Method',
                        fieldCls: 'required',
                        width: 240,
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
                            store: '{paymentcodes}',                                  
                            value: '{theInvoice.paymentcode}'
                        },     
                        listConfig: {
                            loadindText: 'Searching...',
                            emptyText: 'No matching items found.',
                            width: 200
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
                        name: 'voidDate',                        
                        format: 'Y-m-d',
                        fieldLabel: 'Void Date',
                        //editable: false,
                        bind: {
                            value: '{theInvoice.voidDate}'
                        }
                        //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                    },{     
                        xtype: 'numberfield',                                                      
                        name: 'comrate1',
                        fieldLabel: 'Com. Rate 1',                                                               
                        //minValue: 0,
                        selectOnFocus: true,
                        forceSelection: false,
                        // Remove spinner buttons, and arrow key and mouse wheel listeners
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        bind: {
                            value: '{theInvoice.comrate1}'
                        }
                    },{
                        xtype: 'combo',
                        name: 'term',                        
                        fieldLabel: 'Term',
                        fieldCls: 'required',
                        width: 240,
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
                        //store: ['00', 'OS', 'SA'],                           
                        bind: {                     
                            store: '{terms}',                                  
                            value: '{theInvoice.term}'
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
                        name: 'voidReason',
                        fieldLabel: 'Void Reason',                        
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{theInvoice.voidReason}'
                        }
                    },{
                        xtype: 'combo',
                        name: 'salesrep2',                        
                        fieldLabel: 'Sales Rep 2',
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
                            store: '{salesreps}',                                  
                            value: '{theInvoice.salesrep2}'
                        },    
                        listConfig: {
                            loadindText: 'Searching...',
                            emptyText: 'No matching items found.',
                            width: 330
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
                        xtype: 'combo',
                        name: 'shipvia',                        
                        fieldLabel: 'Ship Via',
                        fieldCls: 'required',
                        width: 240,
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
                            store: '{shipvias}',                                  
                            value: '{theInvoice.shipvia}'
                        },           
                        listConfig: {
                            loadindText: 'Searching...',
                            emptyText: 'No matching items found.',
                            width: 200
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
                        xtype: 'combo',
                        name: 'memocode',                        
                        fieldLabel: 'Memo Code',
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
                            store: '{memocodes}',                                  
                            value: '{theInvoice.memocode}'
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
                    },
                    {     
                        xtype: 'numberfield',                                                      
                        name: 'comrate2',
                        fieldLabel: 'Com. Rate 2',                                                               
                        //minValue: 0,
                        selectOnFocus: true,
                        forceSelection: false,
                        // Remove spinner buttons, and arrow key and mouse wheel listeners
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        colspan: 3,
                        bind: {
                            value: '{theInvoice.comrate2}'
                        }
                    }]
                },{
                    responsiveCls: 'small-100',
                    //width: '30%',
                    layout: {
                        type: 'table',
                        columns: 3,
                        tableAttrs: {
                            style: {}
                        }
                    },
                    defaultType: 'numberfield',
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
                        xtype: 'numberfield',                                                      
                        name: 'subtotal',
                        fieldLabel: 'Sub Total',      
                        fieldCls: 'emphasized',
                        labelWidth: 70,                        
                        width: 200,
                        //minValue: 0,
                        selectOnFocus: true,
                        forceSelection: false,
                        // Remove spinner buttons, and arrow key and mouse wheel listeners
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        bind: {
                            value: '{theInvoice.subtotal}'
                        },
                        listeners: {
                            
                        }
                    },{     
                        xtype: 'numberfield',                                                      
                        name: 'total',
                        fieldLabel: 'Total',      
                        fieldCls: 'emphasized',
                        //minValue: 0,                        
                        colspan: 2,
                        bind: {
                            value: '{theInvoice.total}'
                        }
                    },{     
                        xtype: 'numberfield',                                                      
                        name: 'discount',
                        fieldLabel: 'Discount',     
                        labelWidth: 70,       
                        width: 200,                                                   
                        //minValue: 0,
                        selectOnFocus: true,
                        forceSelection: false,
                        // Remove spinner buttons, and arrow key and mouse wheel listeners
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        bind: {
                            value: '{theInvoice.discount}'
                        }
                    },{     
                        xtype: 'numberfield',                                                      
                        name: 'pay_discount',
                        fieldLabel: 'Pay. Discount', 
                        fieldCls: 'emphasized',
                        readOnly: true,
                        //minValue: 0,                        
                        bind: {
                            value: '{theInvoice.pay_discount}'
                        }
                    },{
                        xtype: 'combo',
                        name: 'account',                        
                        fieldLabel: 'Account',                        
                        displayField: 'label',
                        valueField: 'value',
                        //matchFieldWidth: false,
                        //editable: false,
                        width: 240,
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
                            store: '{account}',                                  
                            value: '{theInvoice.account}'
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
                        xtype: 'numberfield',                                                      
                        name: 'misc',
                        fieldLabel: 'Misc',      
                        labelWidth: 70,      
                        width: 200,                                                   
                        //minValue: 0,
                        selectOnFocus: true,
                        forceSelection: false,
                        // Remove spinner buttons, and arrow key and mouse wheel listeners
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        bind: {
                            value: '{theInvoice.misc}'
                        }
                    },{     
                        xtype: 'numberfield',                                                      
                        name: 'paidamt',                        
                        fieldLabel: 'Paid Amt',
                        fieldCls: 'emphasized',
                        readOnly: true,
                        //minValue: 0,                        
                        bind: {
                            value: '{theInvoice.paidamt}'
                        }
                    },{
                        xtype: 'combo',
                        name: 'factor',                        
                        fieldLabel: 'Factor',                        
                        displayField: 'label',
                        valueField: 'value',
                        width: 240,
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
                        //store: ['00', 'OS', 'SA'],                                                
                        bind: {                     
                            store: '{factors}',                                  
                            value: '{theInvoice.factor}'
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
                        xtype: 'numberfield',                                                      
                        name: 'freight',
                        fieldLabel: 'Freight',                       
                        labelWidth: 70, 
                        width: 200,                                       
                        //minValue: 0,
                        selectOnFocus: true,
                        forceSelection: false,
                        // Remove spinner buttons, and arrow key and mouse wheel listeners
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        bind: {
                            value: '{theInvoice.freight}'
                        }
                    },{     
                        xtype: 'numberfield',                                                      
                        name: 'pay_writeoff',                        
                        fieldLabel: 'Pay. Write Off',
                        fieldCls: 'emphasized',
                        readOnly: true,
                        //minValue: 0,                        
                        bind: {
                            value: '{theInvoice.paidamt}'
                        }
                    },{
                        xtype: 'textfield',
                        name: 'boxCount',                        
                        fieldLabel: 'Carton Count',
                        width: 240,
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{theInvoice.boxCount}'
                        }
                    },{
                        xtype: 'box',
                        width: 200
                    },{     
                        xtype: 'numberfield',                                                      
                        name: 'bal',
                        fieldLabel: 'Balance',      
                        fieldCls: 'emphasized',
                        //minValue: 0,
                        readOnly: true,                        
                        bind: {
                            value: '{theInvoice.bal}'
                        }
                    },{
                        xtype: 'textfield',
                        name: 'weight',                        
                        fieldLabel: 'Weight',                        
                        width: 240,
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{theInvoice.weight}'
                        }
                    },{
                        xtype: 'box',
                        width: 200
                    },{
                        xtype: 'textfield',
                        name: 'CreateUser',
                        fieldLabel: 'Create User',                        
                        selectOnFocus: false,
                        readOnly: true,
                        //flex: 1,
                        bind: {
                            value: '{theInvoice.CreateUser}'
                        }
                    },{
                        xtype: 'datefield',
                        name: 'CreateTime',
                        fieldLabel: 'Create Time',                        
                        selectOnFocus: false,
                        //flex: 1,
                        width: 240,
                        readOnly: true,
                        format: 'Y-m-d h:i a',
                        bind: {
                            value: '{theInvoice.CreateTime}'
                        }
                    },{
                        xtype: 'box',
                        width: 200
                    },{
                        xtype: 'textfield',
                        name: 'userName',
                        fieldLabel: 'Update User',                        
                        selectOnFocus: false,
                        readOnly: true,
                        //flex: 1,
                        bind: {
                            value: '{theInvoice.userName}'
                        }
                    },{
                        xtype: 'datefield',
                        name: 'userTime',
                        fieldLabel: 'Update Time',                        
                        selectOnFocus: false,
                        width: 240,
                        //flex: 1,
                        readOnly: true,
                        format: 'Y-m-d h:i a',
                        bind: {
                            value: '{theInvoice.userTime}'
                        }
                    }]
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
                        constrain: true,
                        margin: '0 10 3 0',                        
                        labelWidth: 70
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
                            width: 330
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }],
                        bind: {
                            //store: '{customers}',
                            value: '{theInvoice.customer}'
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
                            value: '{theInvoice.shipTo}'
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
                        columns: 1,
                        tableAttrs: {
                            style: {
                                //border: '1px solid black'
                            }
                        }
                    },
                    defaultType: 'textarea',
                    defaults: {             
                        //width: 220,           
                        constrain: true,
                        margin: '0 10 3 0',                        
                        labelWidth: 70                        
                        //minHeight: 720,
                        //padding: '10 10 0 10'
                    },
                    items: [{
                        xtype: 'textarea',
                        name: 'memo',
                        fieldLabel: 'Memo',                        
                        selectOnFocus: false,                        
                        width: 450,                        
                        bind: {
                            value: '{theInvoice.memo}'
                        }
                    },
                    {
                        xtype: 'textarea',
                        name: 'housememo',
                        fieldLabel: 'H.Memo',                        
                        selectOnFocus: false,                        
                        width: 450,                        
                        bind: {
                            value: '{theInvoice.housememo}'
                        }
                    }]
                }]
            },
            {
                xtype: "grid",                
                reference: "inv-grid",
                //title: 'Detail',
                iconCls: 'x-fa fa-th',                
                region: 'center',                             
                //collapseFirst: true,
                //collapseMode: 'mini',                              
                scrollable: true,                         
                flex: 1,
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
                            var override = grid.getPlugin('invRowExpander');
                    
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
                    store: '{theInvoice.INVDs}'
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
                            var expander = view.ownerCt.getPlugin('invRowExpander');
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
                    pluginId: 'invGridRowEdit',     
                    clicksToMoveEditor: 1,                                           
                    autoCancel: false
                },{
                    ptype: 'allrowexpander',
                    //bodyBefore: true,
                    expandOnDblClick: false,
                    pluginId: 'invRowExpander',
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
                                '<div class="box ab" style="width:99px;padding-left:10px;">{extPrice:usMoney}</div>',                                
                                '<div class="box ab">',
                                    '<div class="item-boxer" style="height:20px">',
                                        '<div class="box rb " style="width:78px;padding-left:10px;">{sod_totalUnit}</div>',
                                        '<div class="box rb center" style="width:100px;">{sod_cancelDate}</div>',
                                        '<div class="box rb center" style="width:100px;">{sono}</div>',
                                        '<div class="box rb center" style="width:100px;">{sosno}</div>', 
                                        '<div class="box rb center" style="width:100px;">{id}</div>',
                                        '<div class="box rb center" style="width:100px;">{sodid}</div>',
                                        '<div class="box rb " style="width:80px;padding-left:10px;">{[Ext.util.Format.usMoney(values.price5 * values.totalUnit)]}</div>', 
                                        '<div class="box rb " style="width:80px;padding-left:10px;">{[Ext.util.Format.usMoney(values.style_price * values.totalUnit)]}</div>',
                                        /*
                                        '<div class="box nb center" style="width:100px;"></div>', 
                                        */
                                        '<div class="box rb center" style="width:100px;"></div>', 
                                        '<div class="box rb center" style="width:100px;"></div>', 
                                        '<div class="box rb center" style="width:100px;"></div>',                                         
                                        '<div class="box rb center" style="width:100px;"></div>', 
                                        '<div class="box nb center" style="width:100px;">{line}</div>', 
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
                                fn: 'onColorComboSelected',
                                scope: this.controller
                            },
                            change: function(c){                        
                                c.getStore().load();
                            },                     
                            triggerClear: function(c){
                                c.getStore().load();                                
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
            text: "OH",               
            menuDisabled: true,
            sortable: false,
            columns:[{
                text: "SO Qty",
                dataIndex: "ohs",  
                align: 'center',   
                width: 80, 
                menuDisabled: true,
                sortable: false,   
                format: '0,000'
            }]
        },  
        {
            text: "WH",               
            menuDisabled: true,
            sortable: false,
            columns:[{
                text: "Cancel",
                dataIndex: "warehouse",  
                width: 100,        
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
            text: "Memo",
            menuDisabled: true,
            sortable: false,             
            columns: [{
                text: "SO # | Ship # | ID | SOD #",
                dataIndex: "memo",
                align: 'center',
                width: 400,
                //flex: 1,
                menuDisabled: true,
                sortable: false,  
                editor: {
                    xtype: 'textfield'
                },
                renderer: function(value, h, a){                
                    return value;
                }
            }]
        },             
                                                
        {
            text: "Price 5",
            dataIndex: "price5",
            width: 80,  
            menuDisabled: true,
            sortable: false,
            formatter: 'usMoney',
            renderer: function(value, h, a){                
                return value;
            }
        },
        {
            text: "Orig. Price",
            dataIndex: "style_price",
            width: 80, 
            menuDisabled: true,
            sortable: false,           
            formatter: 'usMoney',                        
            renderer: function(value, h, a){                
                return value;
            }
        },    
        {
            text: 'Sales Rep 1',
            dataIndex: 'salesrep1',
            width: 100,
            menuDisabled: true,
            sortable: false,
            editor: {
                xtype: 'combo',                                                                
                displayField: 'label',
                valueField: 'value',
                //selectOnFocus: true,                
                forceSelection: false,
                matchFieldWidth: false,
                minChars: 1,
                queryMode: 'local',
                bind: {
                    store: '{salesreps}'
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
        }, 
        {
            xtype: 'numbercolumn',
            text: "Com. Rate 1",            
            dataIndex: "comrate1",            
            width: 100,
            menuDisabled: true,
            sortable: false,
            format: '$0,000.00',
            editor: {
                xtype: 'numberfield'
            }
        }, 
        {
            text: 'Sales Rep 2',
            dataIndex: 'salesrep2',
            width: 100,
            menuDisabled: true,
            sortable: false,
            editor: {
                xtype: 'combo',                                                            
                displayField: 'label',
                valueField: 'value',
                //selectOnFocus: true,                
                forceSelection: false,
                matchFieldWidth: false,
                minChars: 1,
                queryMode: 'local',
                bind: {
                    store: '{salesreps}'
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
        }, 
        {
            xtype: 'numbercolumn',
            text: "Com. Rate 2",
            dataIndex: "comrate2",            
            menuDisabled: true,
            sortable: false,
            format: '$0,000.00',
            editor: {
                xtype: 'numberfield'
            }
        }, 
        {
            text: "Inv #/Line",
            dataIndex: "invoiceNO",
            menuDisabled: true,
            sortable: false,
            //width: 120,
            renderer: function(value, h, a){                
                return value;
            }
        },
        {
            text: "SO Type/Line",
            dataIndex: "so_type",
            menuDisabled: true,
            sortable: false,
            //width: 120,
            renderer: function(value, h, a){                
                return value;
            }
        }];
    }
    
});
