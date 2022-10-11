
Ext.define('August.view.customer.payment.receiveForm',{

    extend: 'Ext.form.Panel',

    requires: [
        'August.view.customer.payment.receiveFormController',
        'August.view.customer.payment.receiveFormModel',
        'August.plugin.grid.Exporter'
    ],

    alias: 'widget.payment-receiveForm',

    controller: 'payment-receiveForm',
    viewModel: {
        type: 'payment-receiveForm'
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
    style: {
        borderTop: '1px solid #cfcfcf'
    },

    listeners: {

    },

    initComponent: function() {
        var me = this;        

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
                handler: 'onSave',
                scope: this.controller                
            },{
                iconCls: 'x-far fa-times-circle',
                text: 'Close',
                //glyph:'xf0c7@FontAwesome',
                tooltip: 'Close View',
                handler: 'onClose'
            }]
        }],

        Ext.applyIf(me, {
            items: [{
                xtype: "panel",
                
                reference: "pmheader",
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
                region: 'north',                              
                //collapseFirst: true,
                //collapseMode: 'mini',
                plain: true,

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
                            style: {}
                        }
                    },
                    defaultType: 'textfield',
                    defaults: {
                        width: 240,
                        constrain: true,
                        margin: '0 10 3 0',
                        labelWidth: 100
                        //minHeight: 720,
                        //padding: '10 10 0 10'
                    },
                    items: [{
                        xtype: 'textfield',
                        name: 'paymentNo',
                        fieldCls: 'required',
                        fieldLabel: 'Payment #',
                        readOnly: true,
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{thePayment.paymentNo}'
                        },
                        allowBlank: false
                    },{
                        xtype: 'numberfield',
                        name: 'amt',  
                        fieldCls: 'required',                      
                        fieldLabel: 'Received Amt',                                                                        
                        editable: true,                        
                        //minValue: 0,
                        selectOnFocus: true,
                        // Remove spinner buttons, and arrow key and mouse wheel listeners
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        bind: {
                            value: '{thePayment.amt}'
                        },
                        listeners: {
                            focusleave: function(c, e){                                
                                var panel = me.lookupReference('pmheader'),
                                    balance = panel.down('numberfield[name=bal]');
                                //balance = Ext.ComponentQuery('combo[name="bal"]')[0];                                
                                balance.setValue(c.getValue());
                            }
                        }
                        /*
                        validator: function(val) {
                            if (val > 0) {
                                return true;
                            }
                            else {
                                return "Value cannot be 0.";
                            }
                        }
                        */
                        //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                    },{
                        xtype: 'textfield',
                        name: 'transtype',
                        fieldLabel: 'Transaction',
                        readOnly: true,
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{thePayment.transtype}'
                        },
                        allowBlank: false
                    },{
                        xtype: 'datefield',
                        name: 'paymentDate',                        
                        format: 'Y-m-d',
                        fieldLabel: 'Payment Date',
                        //editable: false,
                        bind: {
                            value: '{thePayment.paymentDate}'
                        }
                        //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                    },{     
                        xtype: 'numberfield',                                                      
                        name: 'totalPaid',
                        fieldLabel: 'Pmt. Applied',
                        editable: false,
                        readOnly: true,                        
                        //minValue: 0,
                        selectOnFocus: true,
                        // Remove spinner buttons, and arrow key and mouse wheel listeners
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        bind: {
                            value: '{thePayment.totalPaid}'
                        },
                        listeners: {
                            change: function(c, nv, ov){
                                var panel = me.lookupReference('pmheader'),
                                    amt = panel.down('numberfield[name=amt]'),
                                    balance = panel.down('numberfield[name=bal]');
                                //balance = Ext.ComponentQuery('combo[name="bal"]')[0];                                
                                balance.setValue(amt.getValue() - c.getValue());
                            }
                        }
                    },{
                        xtype: 'textfield',
                        name: 'qb_pmt_batch_no',
                        fieldLabel: 'Acct Batch #',
                        readOnly: true,
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{thePayment.qb_pmt_batch_no}'
                        },
                        allowBlank: true
                    },{
                        xtype: 'combo',
                        name: 'customer',
                        fieldCls: 'required',
                        fieldLabel: 'Customer',
                        displayField: 'label',
                        valueField: 'value',
                        matchFieldWidth: false,
                        //editable: false,
                        selectOnFocus: true,
                        allowBlank: false,
                        //forceSelection: true,
                        //msgTarget: 'side',
                        pageSize: 50,
                        lastQuery: '',
                        minChars: 1,
                        queryMode: 'local',
                        //queryParam: 'filter',
                        //triggerAction: 'all',
                        //store: ['00', 'OS', 'SA'],
                        store: 'memCustomers',
                        remoteStore: 'Customers',
                        bind: {                           
                            disabled: '{setAmt}', 
                            value: '{thePayment.customer}'
                        },
                        listConfig: {
                            loadindText: 'Searching...',
                            emptyText: 'No matching items found.',
                            width: 340
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }],
                        listeners: {
                            change: {
                                fn: 'onCustomerChanged',
                                scope: this.controller
                            },
                            select: {
                                //fn: 'onCustomerSelected',
                                //scope: this.controller
                            },
                            beforequery: function(q){
                                delete q.combo.lastQuery;
                            }, 
                            triggerClear: {
                                fn: 'onTriggerClear',
                                scope: this.controller
                            }
                        }                                                                        
                    },{     
                        xtype: 'numberfield',                                                      
                        name: 'bal',
                        fieldLabel: 'Balance',
                        editable: false,
                        readOnly: true,                        
                        //minValue: 0,
                        selectOnFocus: true,
                        // Remove spinner buttons, and arrow key and mouse wheel listeners
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        bind: {
                            value: '{thePayment.bal}'
                        }
                    },{
                        xtype: 'datefield',
                        name: 'qb_pmt_batch_date',                        
                        format: 'Y-m-d',
                        fieldLabel: 'Acct Batch Date',
                        //editable: false,
                        bind: {
                            value: '{thePayment.qb_pmt_batch_date}'
                        }
                        //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                    },{
                        xtype: 'textfield',
                        name: 'customer_name',
                        fieldLabel: 'Cust. Name',
                        readOnly: true,
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{theCustomer.name}'
                        },
                        allowBlank: true
                    },{     
                        xtype: 'numberfield',                                                      
                        name: 'available_credit',
                        fieldLabel: 'Avail. Credit',
                        editable: false,
                        readOnly: true,                        
                        //minValue: 0,
                        selectOnFocus: true,
                        // Remove spinner buttons, and arrow key and mouse wheel listeners
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        bind: {
                            value: '{thePayment.available_credit}'
                        }
                    },{     
                        xtype: 'numberfield',                                                      
                        name: 'total_discount',
                        fieldLabel: 'Disc. Applied',
                        editable: false,
                        readOnly: true,                        
                        //minValue: 0,
                        selectOnFocus: true,
                        // Remove spinner buttons, and arrow key and mouse wheel listeners
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        bind: {
                            value: '{thePayment.total_discount}'
                        }
                    },{
                        xtype: 'combo',
                        name: 'division',
                        fieldLabel: 'Division',
                        fieldCls: 'required',
                        displayField: 'label',
                        valueField: 'value',
                        disabled: true,
                        editable: false,
                        //selectOnFocus: true,
                        allowBlank: false,
                        forceSelection: true,
                        //readOnly: true,
                        //msgTarget: 'side',
                        minChars: 1,
                        queryMode: 'local',
                        //queryParam: 'filter',
                        //triggerAction: 'all',                        
                        bind: {                                            
                            store: '{divisions}',            
                            value: '{thePayment.division}'
                        },
                        listeners: {
                            change: {
                                fn: 'onDivisionChanged',
                                scope: this.controller
                            }
                        }
                        /*
                        plugins: [{
                            ptype: "cleartrigger"
                        }]
                        */
                    },{     
                        xtype: 'numberfield',                                                      
                        name: 'total_credit',
                        fieldLabel: 'Credit Applied',
                        editable: false,
                        readOnly: true,                        
                        //minValue: 0,
                        selectOnFocus: true,
                        // Remove spinner buttons, and arrow key and mouse wheel listeners
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        bind: {
                            value: '{thePayment.total_credit}'
                        }
                    },{     
                        xtype: 'numberfield',                                                      
                        name: 'total_writeoff',
                        fieldLabel: 'Write-off Applied',
                        editable: false,
                        readOnly: true,                        
                        //minValue: 0,
                        selectOnFocus: true,
                        // Remove spinner buttons, and arrow key and mouse wheel listeners
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        bind: {
                            value: '{thePayment.total_writeoff}'
                        }
                    },{
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
                            value: '{thePayment.paymentCode}'
                        }
                    },{
                        xtype: 'textfield',
                        name: 'batchno',
                        fieldLabel: 'Batch No.',                        
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{thePayment.batchno}'
                        },
                        allowBlank: true
                    },{
                        xtype: 'textfield',
                        name: 'userName',
                        fieldLabel: 'User Name',                                                
                        //flex: 1,
                        readOnly: true,
                        bind: {
                            value: '{thePayment.userName}'
                        },
                        allowBlank: true
                    },{
                        xtype: 'combo',
                        name: 'account',
                        fieldLabel: 'Account',
                        displayField: 'label',
                        valueField: 'value',
                        editable: false,
                        //selectOnFocus: true,
                        //allowBlank: false,
                        //forceSelection: true,
                        //msgTarget: 'side',
                        minChars: 1,
                        queryMode: 'local',
                        //queryParam: 'filter',
                        //triggerAction: 'all',
                        //store: ['Open', 'Hold', 'Closed'],
                        bind: {                            
                            value: '{thePayment.account}'
                        }
                    },{
                        xtype: 'textfield',
                        name: 'reference',
                        fieldLabel: 'Reference',                        
                        selectOnFocus: false,
                        allowBlank: true,
                        //flex: 1,
                        bind: {
                            value: '{thePayment.reference}'
                        }                        
                    },{
                        xtype: 'datefield',
                        name: 'userTime',
                        fieldLabel: 'User Time',                        
                        selectOnFocus: false,
                        //flex: 1,
                        readOnly: true,
                        format: 'Y-m-d h:i a',
                        bind: {
                            value: '{thePayment.userTime}'
                        },
                        allowBlank: true
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
                    defaultType: 'textfield',
                    defaults: {
                        width: 240,
                        constrain: true,
                        margin: '0 10 3 0',                        
                        labelWidth: 100
                        //minHeight: 720,
                        //padding: '10 10 0 10'
                    },
                    items: []
                },{
                    responsiveCls: 'small-100',
                    //width: '30%',
                    layout: {
                        type: 'table',
                        columns: 3,
                        tableAttrs: {
                            style: {
                                //border: '1px solid black'
                            }
                        }
                    },
                    defaultType: 'combobox',
                    defaults: {
                        width: 240,
                        constrain: true,
                        margin: '0 10 3 0',                        
                        labelWidth: 100
                        //minHeight: 720,
                        //padding: '10 10 0 10'
                    },
                    items: [{
                        xtype: 'textfield',
                        name: 'memo',
                        fieldLabel: 'Memo',                        
                        selectOnFocus: false,
                        //flex: 1,
                        width: 490,
                        colspan: 2,
                        bind: {
                            value: '{thePayment.memo}'
                        },
                        allowBlank: true
                    },{
                        xtype: 'textfield',
                        name: 'createuser',
                        fieldLabel: 'Create Name',                        
                        selectOnFocus: false,
                        readOnly: true,
                        //flex: 1,
                        bind: {
                            value: '{thePayment.createuser}'
                        },
                        allowBlank: true
                    },{
                        xtype: 'textfield',
                        name: 'custmoer_memo',
                        fieldLabel: 'Cust. Memo',                        
                        selectOnFocus: false,
                        //flex: 1,
                        width: 490,
                        colspan: 2,
                        bind: {
                            value: '{theCustomer.memo}'
                        },
                        allowBlank: true
                    },{
                        xtype: 'datefield',
                        name: 'createusertime',
                        fieldLabel: 'Create Time',                        
                        selectOnFocus: false,
                        //flex: 1,
                        readOnly: true,
                        format: 'Y-m-d h:i a',
                        bind: {
                            value: '{thePayment.createusertime}'
                        },
                        allowBlank: false
                    },{
                        xtype: 'textfield',
                        name: 'customer_phone',
                        fieldLabel: 'Cust. Phone',                        
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{theCustomer.phone1}'
                        },
                        allowBlank: true
                    },{
                        xtype: 'textfield',
                        name: 'customer_fax',
                        fieldLabel: 'Cust. Fax',                        
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{theCustomer.fax1}'
                        },
                        allowBlank: true
                    },{
                        xtype: 'textfield',
                        name: 'customerDiscountRate',
                        fieldLabel: 'D/C %',                        
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{thePayment.customerDiscountRate}'
                        },
                        allowBlank: true
                    }]
                }]
            },
            {
                xtype: "grid",                
                reference: "payment-detail-grid",
                //title: 'Detail',
                iconCls: 'x-fa fa-th',                
                region: 'center',                             
                //collapseFirst: true,
                //collapseMode: 'mini',                              
                scrollable: true,                         
                flex: 2,
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
                        text: 'Uncheck',
                        iconCls: 'x-fa fa-times-circle', 
                        bind: {
                            disabled: '{!selection}'
                        },
                        handler: 'onUncheckClick',
                        scope: this.controller
                    },{
                        xtype: 'tbspacer',
                        width: 10
                    },{
                        xtype: 'button',
                        iconCls: 'x-fa fa-external-link-alt',
                        text: 'Export',
                        handler: function(b){                            
                            me.fireEvent('export', b, me);    
                        }
                    }]
                },

                bind: {
                    selection: '{selection}',
                    store: '{Paymentdetails}'
                },

                listeners: {
                    select: {
                        fn: 'onSelect',
                        scope: this.controller
                    },
                    /*
                    selectionchange: {
                        fn: 'onSelectionChanged',
                        scope: this.controller
                    },
                    */
                    edit: {
                        fn: 'onRowEditing',
                        scope: this.controller
                    },
                    export: {
                        fn: 'onExportClick',
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
                    emptyText: '<h1 style="margin: 20px">No matching results</h1>'
                    /*
                    getRowClass: function(a, g, f, h){
                        return "custom-row-style";
                    },
                    listeners: {
                        
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
                    }
                    */
                },

                /*
                features: [{
                    ftype: 'summary'
                }],
                */
               
                plugins: [{
                    ptype: 'rowediting',
                    clicksToMoveEditor: 1,
                    autoCancel: false
                },{
                    ptype: "gridfilters"
                },{
                    ptype: 'grid-exporter'
                }]
            }]                    
        });

        me.callParent(arguments);        


        var detailGrid = me.lookupReference('payment-detail-grid');
        
        detailGrid.relayEvents(me, ['export']);
    },          
        
    buildGridColumns: function(){
        var me = this;
        return [{
            xtype: 'rownumberer',
            text: 'Line',
            width: 60,                        
            menuDisabled: true
        },{
            xtype: 'checkcolumn',
            text: '',
            dataIndex: 'checked',
            width: 55,
            headerCheckbox: true,
            menuDisabled: true,
            listeners: {    
                beforecheckchange: function(c, rdx, checked, rec){
                    var panel = me.lookupReference('pmheader'),
                        balance = panel.down('numberfield[name=bal]');
                        
                    if(checked){
                        return balance.getValue() != 0;                    
                    }
                    
                    
                },         
                checkchange: {
                    fn: 'onCheckChanged',
                    scope: this.controller
                }
            }            
        },
        /*
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
        */
        {
            xtype: 'datecolumn',
            text: "Date",
            dataIndex: "trans_date",            
            format: 'Y-m-d',
            filter: {
                type: "date"
            }
        },{
            xtype: 'datecolumn',
            text: "Due Date",
            dataIndex: "dueDate",
            format: 'Y-m-d',
            filter: {
                type: "date"
            }
        },
        {
            text: "Terms",
            dataIndex: "terms",            
            filter: {
                type: 'string'
            },
            renderer: function(value, meta, rec){                
                return value;
            }
        },                
        {
            text: "Payment Method",
            dataIndex: "paymentCode",
            //width: 120,
            hidden: false,
            filter: {type: "string"},
            renderer: function(value, h, a){                
                return value;
            }
        }, 
        {
            text: "Division",
            dataIndex: "division",
            //width: 120,
            hidden: false,
            filter: {type: "string"},
            renderer: function(value, h, a){                
                return value;
            }
        },
        {
            text: "Transaction Type",
            dataIndex: "charge_type",
            //width: 120,
            hidden: false,
            filter: {type: "string"},
            renderer: function(value, h, a){                         
                return !Ext.isEmpty(value) ?  value : a.get('trans_type');
            }
        },
        {
            text: "Key #",
            dataIndex: "key_no",
            //width: 120,
            hidden: false,
            filter: {type: "string"},
            renderer: function(value, h, a){                
                return value;
            }
        },
        {
            text: "Customer PO #",
            dataIndex: "customerpono",
            width: 120,
            hidden: false,
            filter: {type: "string"},
            renderer: function(value, h, a){                
                return value;
            },
            summaryRenderer: function(value, data, idx) {
                return 'Total: '
            }
        },{
            text: "Original Amt",
            dataIndex: "originalAmt",
            //width: 140,
            hidden: false,
            formatter: 'usMoney',            
            filter: {
                type: "number"
            }
            //summaryType: 'sum',
            //summaryRenderer: Ext.util.Format.usMoney            
        },
        {
            text: "Due Amount",
            dataIndex: "dueAmt",
            //width: 140,
            hidden: false,
            formatter: 'usMoney',            
            filter: {
                type: "number"
            }
            //summaryType: 'sum',
            //summaryRenderer: Ext.util.Format.usMoney            
        },
        {
            text: "Payment",
            dataIndex: "paidAmount",
            //width: 140,
            hidden: false,
            formatter: 'usMoney',
            editor: {
                xtype: 'textfield'
            },
            filter: {
                type: "number"
            }
            //summaryType: 'sum',
            //summaryRenderer: Ext.util.Format.usMoney           
        },        
        {
            text: "Apply Credit",
            dataIndex: "chk_credit",
            //width: 120,
            hidden: false,
            filter: {type: "string"},
            renderer: function(value, h, a){                
                return 'CREDIT';
            }
        },
        {
            text: "Credit",
            dataIndex: "pay_credit",
            //width: 140,
            hidden: false,
            formatter: 'usMoney',
            filter: {
                type: "number"
            }
            //summaryType: 'sum',
            //summaryRenderer: Ext.util.Format.usMoney            
        },        
        {
            text: "Discount",
            dataIndex: "pay_discount",
            //width: 140,
            hidden: false,
            formatter: 'usMoney',
            editor: {
                xtype: 'textfield'
            },
            filter: {
                type: "number"
            }
            //summaryType: 'sum',
            //summaryRenderer: Ext.util.Format.usMoney            
        },
        {
            text: "Write-off",
            dataIndex: "pay_writeoff",
            //width: 140,
            hidden: false,
            formatter: 'usMoney',
            editor: {
                xtype: 'textfield'
            },
            filter: {
                type: "number"
            }
            //summaryType: 'sum',
            //summaryRenderer: Ext.util.Format.usMoney            
        },
        {
            text: "Total Pay",
            dataIndex: "totalPay",
            //width: 140,
            hidden: false,
            formatter: 'usMoney',
            filter: {
                type: "number"
            },
            //summaryType: 'sum',
            //summaryRenderer: Ext.util.Format.usMoney,
            renderer: function(value, h, rec) {                
                return value;
            }
        },
        {
            text: "Balance",
            dataIndex: "balance",
            //width: 140,
            hidden: false,
            formatter: 'usMoney',
            filter: {
                type: "number"
            },
            //summaryType: 'sum',
            //summaryRenderer: Ext.util.Format.usMoney,
            renderer: function(value, h, rec) {
                return rec.get('dueAmt') - rec.get('paidAmount') + rec.get('pay_credit') + rec.get('pay_discount') + rec.get('pay_writeoff');                
            }        
        },
        {
            text: "D/C",
            dataIndex: "chk_discount",
            width: 80,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return 'D/C';
            }
        },                                  
        {
            text: "W/O",
            dataIndex: "chk_writeoff",
            width: 80,
            hidden: false,
            filter: {type: "string"},
            renderer: function(i, h, a){
                return 'W/O';
            }
        }];
    }
    
});
