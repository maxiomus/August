
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
    scrollable: true,
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

    listeners: {

    },

    initComponent: function() {
        var me = this;

        var tpl = new Ext.ux.CTemplate(
            '<tpl for=".">',
            '<div class="item">{button}</div>',
            '</tpl>'
        );        

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
                        width: 220,
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
                            value: '{thePO.warehouse}'
                        }
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
                            value: '{thePO.paymentcode}'
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
                            value: '{thePO.cancelreason}'
                        }
                    },  
                    {
                        xtype: 'combo',
                        name: 'memocode',
                        fieldLabel: 'Memo Code',
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
                            store: '{memocodes}',
                            value: '{thePO.memocode}'
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
                            value: '{thePO.term}'
                        }
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
                            readOnly: true,
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
                            readOnly: true,
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
                            readOnly: true,
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
                            readOnly: true,
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
                            readOnly: true,
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
                            readOnly: true,
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
                            readOnly: true,
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
                            readOnly: true,
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
                            readOnly: true,
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
                            readOnly: true,
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
                            readOnly: true,
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
                            readOnly: true,
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
                            store: '{vendors}',
                            value: '{thePO.vendor}'
                        },
                        listeners: {
                            change: {
                                fn: 'onVendorChanged',
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
                        name: 'trimmemo',
                        emptyText: 'Memo 2:',
                        colspan: 2,
                        width: 480,
                        height: 120,
                        bind: {
                            value: '{thePO.trimmemo}'
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
        });

        me.callParent(arguments);

        me.contextmenu = Ext.create('Ext.menu.Menu', {
            items: [
                btnEdit, btnCopy, btnDelete
            ]
        });
    }
});
