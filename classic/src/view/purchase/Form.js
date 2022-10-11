Ext.define('August.view.purchase.OrderForm',{
    extend: 'Ext.form.Panel',

    requires: [
        'August.view.purchase.OrderFormController',
        'August.view.purchase.OrderFormModel'
    ],

    alias: 'widget.purchase-orderForm',

    controller: 'purchase-orderForm',
    viewModel: {
        type: 'purchase-orderForm'
    },

    bind: {
        title: '{title}'
    },

    session: true,
    trackResetOnLoad: true,
    //scrollable: true,
    style: {
        borderTop: '1px solid #cfcfcf'
    },
    
    waitMsgTarget: true,

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
                nextStep: 'save',
                tooltip: 'Save the Data',                
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
            },'->',{
                iconCls: 'x-fa fa-print',
                text: 'Print',
                ui: 'default',
                tooltip: 'Print P.O',
                handler: 'onPrintClick'
            }]
        }],

        Ext.applyIf(me, {
            items: [{
                xtype: 'tabpanel',
               
                reference: 'editpotab',

                style: {
                    borderTop: '1px solid #cfcfcf'
                },

                tabPosition: 'left',
                //tabRotation: 2,
                //tabBarHeaderPosition: 0,
                //minTabWidth: 120,

                items: [{
                    tabConfig: {
                        title: 'PO Info'
                    },

                    layout: {
                        type: 'vbox',
                        pack: 'start',
                        align: 'stretch'
                    },

                    items: [{
                        xtype: "container",                    
                        reference: "poheader",
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
                                xtype: 'combo',
                                name: 'cut_po',
                                fieldLabel: 'Selection',
                                fieldCls: 'required',
                                displayField: 'label',
                                valueField: 'value',
                                editable: false,
                                //selectOnFocus: true,
                                allowBlank: false,
                                forceSelection: true,
                                readOnly: true,
                                //msgTarget: 'side',
                                minChars: 1,
                                queryMode: 'local',
                                //queryParam: 'filter',
                                //triggerAction: 'all',
                                store: ['PO', 'CUT'],
                                bind: {                            
                                    value: '{thePO.cut_po}'
                                }
                            },{
                                xtype: 'datefield',
                                name: 'startDate',                        
                                format: 'Y-m-d',
                                fieldLabel: 'Start Date',
                                //editable: false,
                                bind: {
                                    value: '{thePO.startDate}'
                                }
                                //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                            },{
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
                                    value: '{thePO.division}'
                                }
                            },{
                                xtype: 'textfield',
                                name: 'pono',
                                fieldLabel: 'P.O #',
                                readOnly: true,
                                selectOnFocus: false,
                                //flex: 1,
                                bind: {
                                    value: '{thePO.pono}'
                                },
                                allowBlank: true
                            },{
                                xtype: 'datefield',
                                name: 'cancelDate',
                                format: 'Y-m-d',
                                fieldLabel: 'Cancel Date',
                                //editable: false,
                                bind: {
                                    value: '{thePO.cancelDate}'
                                }
                                //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                            },{
                                xtype: 'combo',
                                name: 'warehouse',
                                fieldLabel: 'Warehouse',
                                displayField: 'label',
                                valueField: 'value',                        
                                //selectOnFocus: true,                        
                                forceSelection: false,
                                //msgTarget: 'side',
                                minChars: 1,
                                queryMode: 'local',
                                //queryParam: 'filter',
                                //triggerAction: 'all',
                                //store: ['00', 'OS', 'SA'],
                                bind: {
                                    store: '{warehouses}',
                                    value: '{thePO.warehouse}'
                                },
                                listConfig: {
                                    loadindText: 'Searching...',
                                    emptyText: 'No matching items found.',
                                    width: 340
                                },                        
                                plugins: [{
                                    ptype: "cleartrigger"
                                }]
                            },{
                                xtype: 'datefield',
                                name: 'orderDate',
                                format: 'Y-m-d',
                                fieldLabel: 'Order Date',
                                //editable: false,
                                bind: {
                                    value: '{thePO.orderDate}'
                                }
                                //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                            },{
                                xtype: 'datefield',
                                name: 'etaDate',
                                format: 'Y-m-d',
                                fieldLabel: 'ETA Date',
                                //editable: false,
                                bind: {
                                    value: '{thePO.etaDate}'
                                }
                                //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                            },{
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
                                    value: '{thePO.shipvia}'
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
                            },{
                                xtype: 'combo',
                                name: 'status',
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
                                xtype: 'datefield',
                                name: 'shipdate',                        
                                format: 'Y-m-d',
                                fieldLabel: 'Ship Date',
                                //editable: false,
                                bind: {
                                    value: '{thePO.shipdate}'
                                }
                                //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                            },
                            {
                                xtype: 'combo',
                                name: 'type',
                                fieldLabel: 'Type',
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
                                store: ['Estimate', 'Confirmed'],
                                bind: {                            
                                    value: '{thePO.type}'
                                }
                            },
                            {
                                xtype: 'combo',
                                name: 'processType',
                                fieldLabel: 'Proc. Type',
                                fieldCls: 'required',
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
                                    store: '{processtypes}',
                                    value: '{thePO.processType}'
                                }
                            },   
                            {
                                xtype: 'combo',
                                name: 'paymentcode',
                                fieldLabel: 'PMT Method',
                                displayField: 'label',
                                valueField: 'value',                        
                                //selectOnFocus: true,                        
                                forceSelection: false,
                                //msgTarget: 'side',
                                minChars: 1,
                                queryMode: 'local',
                                //queryParam: 'filter',
                                //triggerAction: 'all',
                                //store: ['00', 'OS', 'SA'],
                                bind: {
                                    store: '{paymentcodes}',
                                    value: '{thePO.paymentcode}'
                                },
                                plugins: [{
                                    ptype: "cleartrigger"
                                }]
                            },
                            {
                                xtype: 'combo',
                                name: 'cancelreason',
                                fieldLabel: 'CXL Reason',
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
                                    store: '{cxlreasons}',
                                    value: '{thePO.cancelreason}'
                                },
                                listConfig: {
                                    loadindText: 'Searching...',
                                    emptyText: 'No matching items found.',
                                    width: 280
                                },
                                plugins: [{
                                    ptype: "cleartrigger"
                                }]
                            },  
                            {
                                xtype: 'combo',
                                name: 'memocode',
                                fieldLabel: 'Memo Code',
                                displayField: 'label',
                                valueField: 'value',                        
                                //selectOnFocus: true,                        
                                forceSelection: true,
                                //msgTarget: 'side',
                                minChars: 1,
                                queryMode: 'local',
                                //queryParam: 'filter',
                                //triggerAction: 'all',
                                //store: ['00', 'OS', 'SA'],
                                bind: {
                                    store: '{memocodes}',
                                    value: '{thePO.memocode}'
                                },
                                plugins: [{
                                    ptype: "cleartrigger"
                                }]
                            },                     
                            {
                                xtype: 'combo',
                                name: 'terms',
                                fieldLabel: 'Term',
                                displayField: 'label',
                                valueField: 'value',                        
                                //selectOnFocus: true,                        
                                forceSelection: true,
                                //msgTarget: 'side',
                                minChars: 1,
                                queryMode: 'local',
                                //queryParam: 'filter',
                                //triggerAction: 'all',
                                //store: ['00', 'OS', 'SA'],
                                bind: {
                                    store: '{terms}',
                                    value: '{thePO.terms}'
                                },
                                plugins: [{
                                    ptype: "cleartrigger"
                                }]
                            },
                            {
                                xtype: 'datefield',
                                name: 'cancelReasonDate',                        
                                format: 'Y-m-d',
                                fieldLabel: 'CXL R. Date',
                                //editable: false,
                                bind: {
                                    value: '{thePO.cancelReasonDate}'
                                }
                                //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                            }]
                        },{
                            responsiveCls: 'small-100',
                            //width: '30%',
                            layout: {
                                type: 'table',
                                columns: 5,
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
                                    name: 'SONo',
                                    fieldLabel: 'S.O #',
                                    fieldCls: 'emphasized',
                                    readOnly: true,
                                    selectOnFocus: false,
                                    //flex: 1,
                                    bind: {
                                        value: '{thePO.SoNo}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'user1',
                                    width: 250,
                                    fieldLabel: 'Main Label',                            
                                    selectOnFocus: false,
                                    //editable: false,
                                    bind: {
                                        value: '{thePO.user1}'
                                    }
                                    //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                                },{
                                    xtype: 'textfield',
                                    name: 'user6',
                                    width: 160,
                                    fieldLabel: 'Price Ticket',                            
                                    selectOnFocus: false,
                                    //editable: false,
                                    bind: {
                                        value: '{thePO.user6}'
                                    }
                                    //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'user11',
                                    width: 140,
                                    labelWidth: 60,
                                    fieldLabel: 'Hanger',                            
                                    selectOnFocus: false,
                                    //editable: false,
                                    bind: {
                                        value: '{thePO.user11}'
                                    }
                                    //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'createUser',
                                    width: 230,
                                    fieldLabel: 'Created by',
                                    fieldCls: 'emphasized',
                                    readOnly: true,
                                    selectOnFocus: false,
                                    //editable: false,
                                    bind: {
                                        value: '{thePO.createUser}'
                                    }
                                    //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'so_customer',
                                    fieldLabel: 'Customer',
                                    fieldCls: 'emphasized',
                                    readOnly: true,
                                    selectOnFocus: false,
                                    //editable: false,
                                    bind: {
                                        value: '{thePO.so_customer}'
                                    }
                                    //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                                },
                                {
                                    xtype: 'radiogroup',
                                    //name: 'user2',
                                    width: 270,
                                    fieldLabel: 'Po Type',                            
                                    selectOnFocus: false,
                                    //editable: false,
                                    simpleValue: true,
                                    items: [{
                                        boxLabel: 'NEW PO', name: 'user2', inputValue: 'NEW PO'
                                    },{
                                        boxLabel: 'RE ORDER', name: 'user2', inputValue: 'RE ORDER'
                                    }],
                                    bind: '{thePO.user2}'
                                    //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'user7',
                                    width: 160,
                                    fieldLabel: 'Size Label',                            
                                    selectOnFocus: false,
                                    //editable: false,
                                    bind: {
                                        value: '{thePO.user7}'
                                    }
                                    //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'user12',
                                    width: 140,
                                    labelWidth: 60,
                                    fieldLabel: 'Polybag',                            
                                    selectOnFocus: false,
                                    //editable: false,
                                    bind: {
                                        value: '{thePO.user12}'
                                    }
                                    //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'createDate',
                                    width: 230,
                                    fieldLabel: 'Created on',     
                                    fieldCls: 'emphasized',                       
                                    readOnly: true,
                                    selectOnFocus: false,
                                    //editable: false,
                                    format: 'Y-m-d h:i a',
                                    bind: {
                                        value: '{thePO.createDate}'
                                    }
                                    //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'so_store',
                                    fieldLabel: 'Store',
                                    fieldCls: 'emphasized',
                                    readOnly: true,
                                    selectOnFocus: false,
                                    //editable: false,
                                    bind: {
                                        value: '{thePO.so_store}'
                                    }
                                    //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                                },
                                {
                                    xtype: 'combo',
                                    name: 'user3',
                                    width: 250,
                                    fieldLabel: 'Coordinator',
                                    displayField: 'label',
                                    valueField: 'value',
                                    editable: false,
                                    //selectOnFocus: true,
                                    allowBlank: true,
                                    forceSelection: true,
                                    //msgTarget: 'side',
                                    minChars: 1,
                                    queryMode: 'local',
                                    //queryParam: 'filter',
                                    //triggerAction: 'all',
                                    store: ['Irene', 'Jennne', 'Kyna'],
                                    bind: {
                                        //store: '{coordinators}',
                                        value: '{thePO.user3}'
                                    },
                                    plugins: [{
                                        ptype: "cleartrigger"
                                    }]
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'user8',
                                    width: 160,
                                    fieldLabel: 'Care Label',                            
                                    selectOnFocus: false,
                                    //editable: false,
                                    bind: {
                                        value: '{thePO.user8}'
                                    }
                                    //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'user13',
                                    width: 140,
                                    labelWidth: 60,
                                    fieldLabel: 'Sizer',                            
                                    selectOnFocus: false,
                                    //editable: false,
                                    bind: {
                                        value: '{thePO.user13}'
                                    }
                                    //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'updateUser',
                                    width: 230,
                                    fieldLabel: 'Updated by',
                                    fieldCls: 'emphasized',
                                    readOnly: true,
                                    selectOnFocus: false,
                                    //editable: false,
                                    bind: {
                                        value: '{thePO.updateUser}'
                                    }
                                    //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'so_po',
                                    fieldLabel: 'Cust P.O #',
                                    fieldCls: 'emphasized',
                                    readOnly: true,
                                    selectOnFocus: false,
                                    //editable: false,
                                    bind: {
                                        value: '{thePO.so_po}'
                                    }
                                    //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'user4',
                                    width: 250,
                                    fieldLabel: 'Pack',                            
                                    selectOnFocus: false,
                                    //editable: false,
                                    bind: {
                                        value: '{thePO.user4}'
                                    }
                                    //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'user9',
                                    width: 160,
                                    fieldLabel: 'Hang Tag',                            
                                    selectOnFocus: false,
                                    //editable: false,
                                    bind: {
                                        value: '{thePO.user9}'
                                    }
                                    //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'user14',
                                    width: 140,
                                    labelWidth: 60,
                                    fieldLabel: 'Barcode',                            
                                    selectOnFocus: false,
                                    //editable: false,
                                    bind: {
                                        value: '{thePO.user14}'
                                    }
                                    //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                                },   
                                {
                                    xtype: 'datefield',
                                    name: 'updateDate',
                                    width: 230,
                                    fieldLabel: 'Updated on',
                                    fieldCls: 'emphasized',
                                    //labelWidth: 85,
                                    readOnly: true,
                                    selectOnFocus: false,
                                    //editable: false,
                                    format: 'Y-m-d h:i a',
                                    bind: {
                                        value: '{thePO.updateDate}'
                                    }
                                    //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                                },                                                                                                                        
                                {
                                    xtype: 'textfield',
                                    name: 'parent_pono',
                                    fieldLabel: 'Parent P.O #',
                                    fieldCls: 'emphasized',
                                    readOnly: true,
                                    selectOnFocus: false,
                                    //editable: false,
                                    bind: {
                                        value: '{thePO.parent_pono}'
                                    }
                                    //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'user5',
                                    width: 250,
                                    fieldLabel: 'TECH TEAM',                            
                                    selectOnFocus: false,
                                    //editable: false,
                                    bind: {
                                        value: '{thePO.user5}'
                                    }
                                    //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'user10',
                                    colspan: 3,
                                    width: 160,
                                    fieldLabel: 'COO Label',                            
                                    selectOnFocus: false,
                                    //editable: false,
                                    bind: {
                                        value: '{thePO.user10}'
                                    }
                                    //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                                },                                                                                                  
                                {
                                    xtype: 'container',   
                                    colspan: 5,                                                     
                                    style: {
                                        //border: '1px solid black'
                                    },
                                    height: 24
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
                                constrain: true,
                                margin: '0 10 3 0',
                                labelWidth: 80
                                //minHeight: 720,
                                //padding: '10 10 0 10'
                            },
                            items: [{
                                xtype: 'combo',
                                name: 'vendor',
                                fieldLabel: 'Vendor',
                                displayField: 'label',
                                valueField: 'value',                        
                                //selectOnFocus: true,                        
                                forceSelection: false,
                                //msgTarget: 'side',
                                minChars: 1,
                                queryMode: 'local',
                                //queryParam: 'filter',
                                //triggerAction: 'all',
                                //store: ['00', 'OS', 'SA'],
                                bind: {
                                    store: '{vendors}',
                                    value: '{thePO.vendor}'
                                },                        
                                plugins: [{
                                    ptype: "cleartrigger"
                                }],
                                listeners: {
                                    change: {
                                        fn: 'onVendorChanged',
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
                                name: 'shipto',
                                fieldLabel: 'Ship To',
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
                                    store: '{shiptos}',
                                    value: '{thePO.shipto}'
                                },
                                listeners: {
                                    change: {
                                        fn: 'onShipToChanged',
                                        scope: this.controller
                                    }
                                }
                            },{
                                xtype: 'component',
                                name: 'vendorAddress',                        
                                //width: 260,                        
                                height: 93,
                                style: {
                                    //border: '1px solid #cfcfcf'
                                },
                                tpl: addressTpl,
                                bind: {
                                    data: '{theVendor}'
                                }
                            },{
                                xtype: 'component',
                                name: 'shipToAddress',
                                //width: 240,
                                height: 93,
                                style: {
                                    //border: '1px solid #cfcfcf'
                                },
                                tpl: addressTpl,
                                bind: {
                                    data: '{theShipTo}'
                                }
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
                                constrain: true,
                                margin: '0 10 3 0',
                                labelWidth: 80
                                //minHeight: 720,
                                //padding: '10 10 0 10'
                            },
                            items: [{
                                xtype: 'textarea',
                                name: 'memo',
                                emptyText: 'Memo 1:',
                                colspan: 2,
                                width: 480,
                                height: 120,
                                bind: {
                                    value: '{thePO.memo}'
                                }
                                //fieldLabel: 'Memo'
                            },
                            {
                                xtype: 'textarea',
                                name: 'trimMemo',
                                emptyText: 'Memo 2:',
                                colspan: 2,
                                width: 480,
                                height: 120,
                                bind: {
                                    value: '{thePO.trimMemo}'
                                }
                                //fieldLabel: 'Memo'
                            }]
                        }]
                    },  
                    {
                        xtype: 'grid',
                        reference: 'po-grid',
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
                                    var override = grid.getPlugin('poRowExpander');
                            
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
                            store: '{thePO.purchaseorderitems}'
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
                                    var expander = view.ownerCt.getPlugin('poRowExpander');
                                    expander.expandAll();
                                }
                            }
                        },
        
                        features: [{
                            ftype: 'summary'
                        }],
        
                        plugins: [{
                            ptype: 'rowediting',
                            pluginId: 'poGridRowEdit',
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
                            pluginId: 'poRowExpander',                            
                            
                            rowBodyTpl: new Ext.XTemplate(
                                '<div class="item-boxer">',
                                    '<div class="box-row" style="height:20px">',
                                        //'<div class="box nb center" style="width:40px;"></div>',
                                        '<div class="box ab" style="width:68px;padding-right:10px;">Desc.</div>',
                                        '<div class="box ab" style="width:320px;">{descript}</div>',
                                        '<div class="box ab">',
                                            '<div class="item-boxer" style="height:20px">',
                                            '<div class="box rb" style="width:47px;padding-left:10px;">{size1}</div>',
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
                                            '<div class="box nb" style="width:49px;padding-left:10px;">{size12}</div>',
                                            //'<div class="box nb center" style="width:82px;"></div>',
                                            '</div>',
                                        '</div>',
                                        '<div class="box ab" style="width:80px;">{closed_qty}</div>',
                                        '<div class="box ab" style="width:100px;padding-left:10px;">{extPrice:usMoney}</div>',                                
                                        '<div class="box ab">',
                                            '<div class="item-boxer" style="height:20px">',
                                                '<div class="box rb" style="width:97px;"></div>',
                                                '<div class="box rb" style="width:100px;padding-left:10px;"><b>POD ID</b></div>',
                                                '<div class="box rb" style="width:120px;padding-left:10px;">{id}</div>',
                                                '<div class="box rb" style="width:120px;padding-left:10px;"><b>STO SOD ID</b></div>', 
                                                '<div class="box rb" style="width:120px;padding-left:10px;">{sto_invdid}</div>',
                                                '<div class="box rb" style="width:120px;padding-left:10px;"><b>Line</b></div>', 
                                                '<div class="box rb" style="width:100px;padding-left:10px;">{line}</div>',
                                                '<div class="box nb" style="width:120px;"></div>', 
                                            '</div>',
                                        '</div>',                                
                                    '</div>',
                                    '<div class="box-row" style="height:20px">',
                                        //'<div class="box nb" style="width:40px;"></div>',
                                        '<div class="box ab" style="width:68px;padding-right:10px;">PrePack</div>',
                                        '<div class="box ab">',
                                            '<div class="item-boxer" style="height:20px">',
                                                '<div class="box rb" style="width:110px;">{bundle}</div>',
                                                '<div class="box rb" style="width:100px;padding-left:10px;"><b>Total Qty</b></div>',
                                                '<div class="box nb" style="width:110px;">{numbFfBundle}</div>',
                                            '</div>',
                                        '</div>',                                                                
                                        '<div class="box ab">',
                                            '<div class="item-boxer" style="height:20px">',
                                                '<div class="box rb" style="width:47px;"></div>',
                                                '<div id="rex-textfield-memo" class="box rb" style="width:450px;padding-left:10px;"></div>',                                        
                                                '<div class="box rb" style="width:50px;padding-left:10px;"></div>',
                                                '<div id="rex-combobox-status" class="box nb" style="width:49px;padding-left:10px;"></div>',
                                                //'<div class="box nb" style="width:82px;"></div>',
                                            '</div>',
                                        '</div>',
                                        '<div class="box ab" style="width:80px;padding-left:10px;"></div>',                                
                                        '<div class="box ab" style="width:100px;"></div>',
                                        '<div class="box ab">',
                                            '<div class="item-boxer" style="height:20px">',
                                                '<div class="box rb " style="width:97px;"></div>',
                                                '<div class="box rb " style="width:100px;padding-left:10px;"><b>SO #</b></div>',
                                                '<div class="box rb " style="width:120px;padding-left:10px;">{SONo}</div>',
                                                '<div class="box rb " style="width:120px;padding-left:10px;"><b>STO INVD D</b></div>',                                        
                                                '<div class="box rb " style="width:120px;padding-left:10px;">{sto_sodid}</div>',                                        
                                                '<div class="box rb " style="width:120px;padding-left:10px;"><b>Season</b></div>',                                        
                                                '<div class="box rb " style="width:100px;padding-left:10px;">{season}</div>',                                        
                                                '<div class="box nb " style="width:120px;"></div>',                                        
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
                },{
                    title: 'BOM'
                },{
                    title: 'Receiving'
                }],
                
                listeners: {
                    //tabchange: 'onTabChange'
                }
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
                            '<div class="box ab center" style="width:90px;"></div>',
                            '<div class="box ab center" style="width:90px;"></div>',                                                            
                            '<div class="box ab center" style="width:90px;"></div>',
                            '<div class="box ab center" style="width:120px;"></div>',                                
                            '<div class="box ab center" style="width:140px;"></div>',                            
                            '<div class="box ab center" style="width:90px;"></div>',                                                            
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
                            '<div class="box ab center" style="width:90px;">Total Qty</div>',                                
                            '<div class="box ab center" style="width:90px;">Price</div>',
                            '<div class="box ab center" style="width:90px;">UOM</div>',                            
                            '<div class="box ab center" style="width:120px;">Warehouse</div>',
                            '<div class="box ab center" style="width:140px;">Cancel Reason</div>',
                            '<div class="box ab center" style="width:90px;">POD ID</div>',                                
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
                            '<div class="box ab center" style="width:90px;">Received</div>',
                            '<div class="box ab center" style="width:90px;">Ext. Price</div>',                            
                            '<div class="box ab center" style="width:90px;">On Hand</div>',                             
                            '<div class="box ab center" style="width:120px;">SO #</div>',
                            '<div class="box ab center" style="width:140px;">Cancel Reason Date</div>',                                                                   
                            '<div class="box ab center" style="width:90px;">SOD ID</div>',                            
                            '<div class="box nb center" style="width:0px;"></div>',
                        '</div>',
                    '</div>'
                ]
            },            
            {
                xtype: 'purchase-view',
                reference: "po-view",
                layout: 'fit',
                flex: 1,
                scrollable: true,
                margin: 5,
                cls: 'pi-view',
                bind: {
                    selection: '{selection}',
                    store: "{thePO.purchaseorderitems}"
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
                                            '<div class="box rb center" style="width:50px;">{size1}</div>',
                                            '<div class="box rb center" style="width:50px;">{size2}</div>',
                                            '<div class="box rb center" style="width:50px;">{size3}</div>',
                                            '<div class="box rb center" style="width:50px;">{size4}</div>',
                                            '<div class="box rb center" style="width:50px;">{size5}</div>',
                                            '<div class="box rb center" style="width:50px;">{size6}</div>',
                                            '<div class="box rb center" style="width:50px;">{size7}</div>',
                                            '<div class="box rb center" style="width:50px;">{size8}</div>',
                                            '<div class="box nb center" style="width:82px;"></div>',
                                        '</div>',
                                    '</div>',                                    
                                    '<div class="box ab center" style="width:90px;"></div>',
                                    '<div class="box ab center" style="width:90px;"></div>',
                                    '<div class="box ab center" style="width:90px;"></div>',
                                    '<div class="box ab" style="width:120px;">{canceldate:date("Y-m-d")}</div>',
                                    '<div class="box ab" style="width:140px;">{cancelReason}</div>',
                                    '<div class="box ab center" style="width:90px;"></div>',                                                                        
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
                                    '<div class="box ab right" style="width:90px;">{unitSum}</div>',
                                    '<div class="box ab center" style="width:90px;">{price:usMoney}</div>',                                        
                                    '<div class="box ab" style="width:90px;">{uom}</div>',
                                    '<div class="box ab center" style="width:120px;">{warehouse}</div>',
                                    '<div class="box ab" style="width:140px;">{cancelReason}</div>',
                                    '<div class="box ab center" style="width:90px;">{id}</div>',                                        
                                    '<div class="box nb center" style="width:0px;"></div>',
                                '</div>',
                                '<div class="box-row">',
                                    '<div class="box ab" style="width:30px;"></div>',                                        
                                    '<div class="box ab " style="width:160px;"></div>',
                                    '<div class="box ab">',
                                        '<div class="item-boxer">',
                                            '<div class="box rb right" style="width:50px;"></div>',
                                            '<div class="box rb right" style="width:50px;"></div>',
                                            '<div class="box rb right" style="width:50px;"></div>',
                                            '<div class="box rb right" style="width:50px;"></div>',
                                            '<div class="box rb right" style="width:50px;"></div>',
                                            '<div class="box rb right" style="width:50px;"></div>',
                                            '<div class="box rb right" style="width:50px;"></div>',
                                            '<div class="box rb right" style="width:50px;"></div>',
                                            '<div class="box nb right" style="width:82px;"></div>',
                                        '</div>',
                                    '</div>',
                                    '<div class="box ab right" style="width:90px;">{totalUnit}</div>',
                                    '<div class="box ab center" style="width:90px;">{extPrice:usMoney}</div>',                                        
                                    '<div class="box ab" style="width:90px;">{onhand}</div>',
                                    '<div class="box ab" style="width:120px;">{SoNo}</div>',
                                    '<div class="box ab" style="width:140px;">{cancelReasondate:date("Y-m-d")}</div>',
                                    '<div class="box ab center" style="width:90px;">{sodid}</div>',                                        
                                    '<div class="box nb center" style="width:0px;"></div>',
                                '</div>',
                            '</div>',
                        '</div>',
                    '</tpl>'
                )
                
            }
            */
            ]
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
            menuDisabled: false,
            sortable: true
        },               
        {
            text: "id",
            dataIndex: "id",            
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
            width: 24,
            menuDisabled: true,
            resizable: false,
            sortable: false
        },       
        {
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
                //publishes: 'value',                               
                displayField: 'label',
                valueField: 'value',    
                remoteStore: 'Styles',
                store: 'memStyles',
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

                        /*
                        var color = this.ownerCt.ownerCt.query('combo[name="stylecolor"]')[0],
                            descript = this.ownerCt.ownerCt.query('textfield[name="descript"]')[0];
                        
                        color.setValue('');
                        descript.setValue('');                                    
                        */
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
                name: 'stylecolor',                                                          
                fieldCls: 'required',   
                displayField: "label",
                valueField: "value",
                
                store: 'memStyleColors',
                remoteStore: 'StyleColors',                                                            
                //forceSelection: false,
                //selectOnFocus: true,
                pageSize: 50,
                selectOnFocus: false,
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
                    select: {
                        fn: 'onStyleComboSelected',
                        scope: this.controller        
                    
                    },
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
                    change: function(c){
                        c.getStore().load();
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
            dataIndex: "unitSum",
            width: 80,           
            format: '0,000',                         
            renderer: function(f, e, a){
                return f;
            }
        },              
        {
            xtype: 'numbercolumn',
            text: "Price/E. Price",
            dataIndex: "price",
            width: 100,
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
            hidden: true, 
            width: 95,  
            menuDisabled: true,
            sortable: false,
            format: '$0,000.00'
        }, 
        {            
            text: "Status",
            dataIndex: "status",
            width: 100, 
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
            text: "WH",
            dataIndex: "warehouse",  
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
        },
        {
            xtype: 'datecolumn',
            text: "ETA Date",
            width: 120,
            dataIndex: "etadate",
            format: 'Y-m-d',
            editor: {
                xtype: 'datefield',
                name: 'etadate',                
                format: 'Y-m-d'                
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
                //selectOnFocus: true,     
                matchFieldWidth: false,           
                forceSelection: false,
                //msgTarget: 'side',
                minChars: 1,
                queryMode: 'local',
                bind: {
                    store: '{cxlreasons}',                    
                },
                listConfig: {
                    loadindText: 'Searching...',
                    emptyText: 'No matching items found.',
                    width: 220
                },
                plugins: [{
                    ptype: "cleartrigger"
                }]
            }
        },
        {
            xtype: 'datecolumn',
            text: "Cancel R.Date",
            width: 120,
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
            width: 480,
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
