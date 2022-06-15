Ext.define('August.view.production.style.edit.Form',{
    extend: 'Ext.form.Panel',

    requires: [
        'August.view.production.style.edit.FormController',
        'August.view.production.style.edit.FormModel',
        'August.view.production.style.edit.Cost',
        'August.view.production.style.edit.Detail',
        'August.view.production.style.edit.Request',
        'August.view.production.style.edit.RequestForm',
        'August.view.production.style.edit.TopBar',
        'August.view.production.style.edit.Toolbar',
        'Ext.data.proxy.Memory',
        'Ext.ux.form.field.Month',
        'Ext.Responsive'
        //'Ext.ux.toggleslide.ToggleSlide',
        //'Ext.ux.view.Upload'
    ],

    alias: 'widget.style-edit-form',

    controller: 'style-edit-form',
    viewModel: {
        type: 'style-edit-form'
    },

    bind: {
        title: '{title}'
    },

    modelValidation: true,
    scrollable: false,
    session: true,

    style: {
        borderTop: '1px solid #cfcfcf'
    },

    layout: {
        type: 'border'
    },

    dockedItems: [{
        xtype: 'style-edit-topbar',
        dock: 'top',
        reference: 'topbar'
    }],

    initComponent: function(){
        var me = this,
            padding = 0,
            fieldHeight = 17,
            remainingHeight = padding + fieldHeight * 3;

        Ext.applyIf(me, {
            items:[{
                //xtype: 'horizontalaccordion',
                xtype: 'tabpanel',
                //anchor: '100% 100%',
                //padding: '0 0 0 0',
                //previousTab: null,
                region: 'center',
                reference: 'editproducttabs',

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
                    //itemId: 'information',
                    reference: 'styleInfo',
                    scrollable: 'y',
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
                    defaultType: 'container',
                    items: [{
                        responsiveCls: 'small-100',
                        //width: '30%',
                        columnWidth: 0.4,
                        layout: {
                            type: 'table',
                            columns: 2,
                            tableAttrs: {
                                style: {

                                }
                            }
                        },
                        defaultType: 'textfield',
                        defaults: {
                            constrain: true,
                            margin: '0 10 1 0',
                            width: 230,
                            labelWidth: 75
                            //selectOnTab: false
                            //minHeight: 720,
                            //padding: '10 10 0 10'
                        },
                        items: [{
                            xtype: 'label',                            
                            html: '<b>STYLE INFO</b>',                            
                            colspan: 2
                            //flex: 1,                            
                        },{
                            xtype: "combo",
                            name: 'style',
                            reference: 'style',
                            //itemId: "cboStyle",
                            fieldLabel: 'Style',
                            //fieldStyle: 'text-transform:uppercase',
                            fieldCls: 'required',
                            colspan: 2,
                            //labelWidth: 50,
                            width: 470,
                            margin: '10 10 1 0',
                            //autoSelect: false,
                            //hideTrigger: true,
                            //publishes: 'value',
                            valueField: 'value',
                            displayField: 'label',
                            bind: {
                                readOnly: '{isEdit}',
                                value: '{theProduct.style}'
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
                                change: function(c){
                                    c.getStore().load();
                                },                     
                                triggerClear: function(c){
                                    c.getStore().load();                                
                                }
                            }
                        },{
                            xtype: "combo",
                            name: 'color',
                            reference: 'color',
                            fieldLabel: 'Color',
                            //fieldStyle: 'text-transform:uppercase',
                            fieldCls: 'required',
                            colspan: 2,
                            width: 470,
                            //hideTrigger: false,
                            //publishes: 'value',
                            valueField: 'value',
                            displayField: 'label',
                            bind: {
                                readOnly: '{isEdit}',
                                value: '{theProduct.color}'
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
                                change: function(c){
                                    c.getStore().load();
                                },                     
                                triggerClear: function(c){
                                    c.getStore().load();                                
                                }
                            }
                        },{
                            xtype: 'textfield',
                            name: 'descript',
                            fieldLabel: 'Description',
                            colspan: 2,
                            width: 470,
                            //flex: 1,
                            bind: {
                                value: '{theProduct.descript}'
                            }
                        },{
                            xtype: 'combo',
                            name: 'division',
                            fieldLabel: 'Division',
                            fieldCls: 'required',
                            displayField: 'label',
                            valueField: 'value',
                            //selectOnFocus: false,
                            editable: false,
                            allowBlank: false,
                            forceSelection: true,
                            minChars: 1,
                            queryMode: 'local',
                            //triggerAction: 'all',
                            plugins: [{
                                ptype: "cleartrigger"
                            }],
                            bind: {
                                store: '{divisions}',
                                value: '{theProduct.division}'
                            },
                            
                            //store: 'division'
                        },{
                            xtype: 'combo',
                            name: 'status',
                            fieldLabel: 'Status',
                            displayField: 'label',
                            valueField: 'value',
                            editable: false,
                            //selectOnTab: true,
                            allowBlank: false,
                            forceSelection: true,
                            //msgTarget: 'side',
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            //store: ['ACTIVE', 'INACTIVE', 'REQUEST'],                            
                            bind: {
                                store: '{status}',
                                value: '{theProduct.status}'
                            }
                        },{
                            xtype: 'combo',
                            name: 'subdivision',
                            fieldLabel: 'Sub. Div.',
                            displayField: 'label',
                            valueField: 'value',
                            //selectOnFocus: true,
                            editable: false,
                            forceSelection: true,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',

                            bind: {
                                store: '{subdivisions}',
                                value: '{theProduct.subdivision}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'combo',
                            name: 'season',
                            fieldLabel: 'Season',
                            fieldCls: 'required',
                            displayField: 'label',
                            valueField: 'value',
                            //selectOnFocus: true,
                            editable: false,
                            allowBlank: false,
                            forceSelection: true,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            plugins: [{
                                ptype: "cleartrigger"
                            }],
                            bind: {
                                store: '{seasons}',
                                value: '{theProduct.season}'
                            }
                        },{
                            xtype: 'combo',
                            name: 'fabricType',
                            fieldLabel: 'Fab. Type',
                            fieldCls: 'required',
                            displayField: 'label',
                            valueField: 'value',
                            //selectOnFocus: true,
                            editable: false,
                            forceSelection: true,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{fabrictypes}',
                                value: '{theProduct.fabricType}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                            //store: 'type'
                        },{
                            xtype: 'combo',
                            name: 'Category',
                            fieldLabel: 'Category',
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
                            bind: {
                                store: '{categories}',
                                value: '{theProduct.category}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'combo',
                            name: 'processtype',
                            fieldLabel: 'Proc. Type',
                            displayField: 'label',
                            valueField: 'value',
                            //selectOnFocus: true,
                            editable: false,
                            forceSelection: true,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{processtypes}',
                                value: '{theProduct.processtype}'
                            }
                        },{
                            xtype: 'combo',
                            name: 'subcategory',
                            fieldLabel: 'Sub. Cat',
                            displayField: 'label',
                            valueField: 'value',
                            //selectOnFocus: true,
                            editable: false,
                            forceSelection: true,
                            //minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{subcategories}',
                                value: '{theProduct.subcategory}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'combo',
                            name: 'impCat',
                            fieldLabel: 'Product Cat',
                            displayField: 'label',
                            valueField: 'value',
                            //selectOnFocus: true,
                            editable: false,
                            forceSelection: true,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            store: ['Domestic', 'Import'],
                            bind: {
                                value: '{theProduct.impCat}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'combo',
                            name: 'grp',
                            fieldLabel: 'Group',
                            displayField: 'label',
                            valueField: 'value',
                            //selectOnFocus: true,
                            editable: false,
                            forceSelection: true,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{groups}',
                                value: '{theProduct.grp}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'combo',
                            name: 'fabcontent',
                            fieldLabel: 'Fab. Cont',
                            fieldCls: 'required',
                            displayField: 'label',
                            valueField: 'value',
                            //selectOnFocus: true,
                            editable: false,
                            forceSelection: true,
                            minChars: 1,
                            matchFieldWidth: false,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{fabriccontents}',
                                value: '{theProduct.fabcontent}'
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
                            xtype: 'combo',
                            name: 'designer',
                            fieldLabel: 'Designer',
                            displayField: 'label',
                            valueField: 'value',
                            selectOnFocus: true,
                            editable: true,
                            forceSelection: true,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{designers}',
                                value: '{theProduct.designer}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'datefield',
                            name: 'availableDate',
                            format: 'Y-m-d',
                            fieldLabel: 'Avail. Date',
                            //editable: false,
                            bind: {
                                value: '{theProduct.availableDate}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                            //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                        },{
                            xtype: 'combo',
                            name: 'hs_tariffno',
                            fieldLabel: 'HS TARIFF',
                            //fieldCls: 'required',
                            displayField: 'label',
                            valueField: 'value',
                            //selectOnFocus: true,
                            editable: false,
                            forceSelection: true,
                            //minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{tariffnos}',
                                value: '{theProduct.hs_tariffno}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'textfield',
                            name: 'binlocation',
                            fieldLabel: 'Bin Loc.',
                            //flex: 1,
                            bind: {
                                value: '{theProduct.binlocation}'
                            }
                        },{
                            xtype: 'datefield',
                            name: 'startselldate',
                            format: 'Y-m-d',
                            fieldLabel: 'Start S.Date',
                            //editable: false,
                            bind: {
                                value: '{theProduct.startselldate}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                            //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                        },{
                            xtype: 'textfield',
                            name: 'binlocation2',
                            fieldLabel: 'Bin Loc. 2',
                            //flex: 1,
                            bind: {
                                value: '{theProduct.binlocation2}'
                            }
                        },{
                            xtype: 'combo',
                            name: 'coo',
                            fieldLabel: 'COO',
                            //fieldCls: 'required',
                            displayField: 'label',
                            valueField: 'value',
                            selectOnFocus: true,
                            editable: true,
                            forceSelection: true,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{countries}',
                                value: '{theProduct.coo}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'combo',
                            name: 'ptype',
                            margin: '0 0 18 0',                            
                            fieldLabel: 'Type',
                            displayField: 'label',
                            valueField: 'value',
                            editable: false,
                            colspan: 2,
                            //selectOnTab: true,
                            forceSelection: true,
                            //msgTarget: 'side',
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            store: ['Sample', 'Production', 'Drop'],                            
                            bind: {                                
                                value: '{theProduct.ptype}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'label',
                            html: '<b>SIZE INFO</b>',
                            margin: '0 0 0 0',
                            colspan: 2
                        },{
                            xtype: 'combo',
                            name: 'sizeCat',
                            margin: '9 0 0 0',
                            fieldLabel: 'Size Cat.',
                            //fieldCls: 'required',
                            displayField: 'label',
                            valueField: 'value',
                            //selectOnFocus: true,
                            editable: false,
                            forceSelection: true,
                            //minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{sizeCats}',
                                value: '{theProduct.sizeCat}'
                            }
                        },{
                            xtype: 'combo',
                            name: 'bundle',
                            margin: '9 0 0 0',
                            fieldLabel: 'PrePack',
                            displayField: 'label',
                            valueField: 'value',
                            //selectOnFocus: true,
                            editable: false,
                            forceSelection: true,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{bundles}',
                                value: '{theProduct.bundle}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },/*{
                            xtype: 'combo',
                            name: 'user1',
                            fieldLabel: 'Customer',
                            displayField: 'label',
                            valueField: 'value',
                            selectOnFocus: true,
                            editable: true,
                            allowBlank: true,
                            forceSelection: true,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{customers}',
                                value: '{theProduct.user1}'
                            }
                        },{
                            xtype: "combo",
                            name: 'user2',
                            //itemId: "Prints",
                            fieldLabel: 'Body Ref#',
                            fieldCls: 'required',
                            //publishes: 'value',
                            displayField: 'label',
                            valueField: 'value',                            
                            bind: {
                                value: '{theProduct.user2}'
                            },
                            store: 'memBodies',
                            matchFieldWidth: false,
                            autoLoadOnValue: true,
                            allowBlank: true,
                            //forceSelection: false,
                            //selectOnFocus: true,
                            pageSize: 50,
                            //minChars: 0,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //queryDelay: 800,
                            //triggerAction: 'all',
                            listConfig: {
                                loadindText: 'Searching...',
                                emptyText: 'No matching items found.',
                                width: 340
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'numberfield',
                            name: 'leadTime',
                            fieldLabel: 'Lead Time',
                            allowBlank: true,
                            minValue: 0,
                            selectOnFocus: true,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            //flex: 1,
                            bind: {
                                value: '{theProduct.leadTime}'
                            }
                        }*/]
                    },
                    {
                        responsiveCls: 'small-100',
                        //width: '40%',
                        columnWidth: 0.3,
                        layout: {
                            type: 'table',
                            columns: 2,
                            tableAttrs: {
                                style: {

                                }
                            }
                        },
                        defaultType: 'numberfield',
                        defaults: {
                            margin: '0 10 1 0',
                            width: 200,
                            labelWidth: 80,
                            minValue: 0,
                            //selectOnFocus: true,
                            // Remove spinner buttons, and arrow key and mouse wheel listeners
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false
                            //minHeight: 720,
                            //padding: '10 10 0 10'
                        },
                        items: [{
                            xtype: 'label',                            
                            html: '<b>PRICE INFO</b>',                            
                            colspan: 2
                            //flex: 1,                            
                        },{
                            xtype: 'fieldcontainer',
                            //combineErrors: true,
                            //msgTarget: 'side',
                            fieldLabel: 'Price 1',
                            //labelWidth: 70,                            
                            width: 420,
                            margin: '10 10 1 0',
                            colspan: 2,
                            layout: 'hbox',
                            defaults: {
                                hideLabel: true,
                                //width: 140,
                                //labelWidth: 60,
                                flex: 1,
                                margin: '0 0 0 0'
                            },
                            items: [{
                                // the width of this field in the HBox layout is set directly
                                // the other 2 items are given flex: 1, so will share the rest of the space                                
                                xtype: 'textfield',                                
                                name: 'price1',
                                fieldLabel: 'Price 1',                                
                                labelAlign: 'top',
                                
                                bind: {
                                    value: '{theProduct.price1}'
                                }
                            },{
                                xtype: 'textfield',                                
                                name: 'margin1',
                                fieldLabel: 'Profit',
                                labelAlign: 'top'                                
                            },{
                                xtype: 'textfield',                                
                                name: 'c_margin_rate1',
                                fieldLabel: 'Margin',
                                labelAlign: 'top'                                
                            },{
                                xtype: 'textfield',                                
                                name: 'm_margin_rate1',
                                fieldLabel: 'M margin',
                                labelAlign: 'top'
                            }]
                        },{
                            xtype: 'fieldcontainer',
                            //combineErrors: true,
                            //msgTarget: 'side',
                            fieldLabel: 'Price 2',
                            //labelWidth: 70,
                            width: 420,
                            colspan: 2,
                            layout: 'hbox',
                            defaults: {
                                hideLabel: true,
                                //width: 140,
                                //labelWidth: 60,
                                flex: 1,
                                margin: '0 0 0 0'
                            },
                            items: [{
                                // the width of this field in the HBox layout is set directly
                                // the other 2 items are given flex: 1, so will share the rest of the space                                
                                xtype: 'textfield',                                
                                name: 'price2',
                                fieldLabel: 'Price 2',
                                labelAlign: 'top',
                                bind: {
                                    value: '{theProduct.price2}'
                                }
                            },{
                                xtype: 'textfield',                                
                                name: 'margin2',
                                fieldLabel: 'Profit',
                                labelAlign: 'top'
                            },{
                                xtype: 'textfield',                                
                                name: 'c_margin_rate2',
                                fieldLabel: 'Margin',
                                labelAlign: 'top'
                            },{
                                xtype: 'textfield',                                
                                name: 'm_margin_rate2',
                                fieldLabel: 'M margin',
                                labelAlign: 'top'
                            }]
                        },{
                            xtype: 'fieldcontainer',
                            //combineErrors: true,
                            //msgTarget: 'side',
                            fieldLabel: 'Price 3',
                            //labelWidth: 70,
                            width: 420,
                            colspan: 2,
                            layout: 'hbox',
                            defaults: {
                                hideLabel: true,
                                //width: 140,
                                //labelWidth: 60,
                                flex: 1,
                                margin: '0 0 0 0'
                            },
                            items: [{
                                // the width of this field in the HBox layout is set directly
                                // the other 2 items are given flex: 1, so will share the rest of the space                                
                                xtype: 'textfield',                                
                                name: 'price1',
                                fieldLabel: 'Price 3',
                                labelAlign: 'top',
                                
                                bind: {
                                    value: '{theProduct.price3}'
                                }
                            },{
                                xtype: 'textfield',                                
                                name: 'margin3',
                                fieldLabel: 'Profit',
                                labelAlign: 'top'
                            },{
                                xtype: 'textfield',                                
                                name: 'c_margin_rate3',
                                fieldLabel: 'Margin',
                                labelAlign: 'top'
                            },{
                                xtype: 'textfield',                                
                                name: 'm_margin_rate3',
                                fieldLabel: 'M margin',
                                labelAlign: 'top'
                            }]
                        },{
                            xtype: 'fieldcontainer',
                            //combineErrors: true,
                            //msgTarget: 'side',
                            fieldLabel: 'Price 4',
                            //labelWidth: 70,
                            width: 420,
                            colspan: 2,
                            layout: 'hbox',
                            defaults: {
                                hideLabel: true,
                                //width: 140,
                                //labelWidth: 60,
                                flex: 1,
                                margin: '0 0 0 0'
                            },
                            items: [{
                                // the width of this field in the HBox layout is set directly
                                // the other 2 items are given flex: 1, so will share the rest of the space                                
                                xtype: 'textfield',                                
                                name: 'price4',
                                fieldLabel: 'Price 4',
                                labelAlign: 'top',
                                
                                bind: {
                                    value: '{theProduct.price4}'
                                }
                            },{
                                xtype: 'textfield',                                
                                name: 'margin4',
                                fieldLabel: 'Profit',
                                labelAlign: 'top'
                            },{
                                xtype: 'textfield',                                
                                name: 'c_margin_rate4',
                                fieldLabel: 'Margin',
                                labelAlign: 'top'
                            },{
                                xtype: 'textfield',                                
                                name: 'm_margin_rate4',
                                fieldLabel: 'M margin',
                                labelAlign: 'top'
                            }]
                        },{
                            xtype: 'fieldcontainer',
                            //combineErrors: true,
                            //msgTarget: 'side',
                            fieldLabel: 'Price 5',
                            //labelWidth: 70,
                            width: 420,
                            colspan: 2,
                            layout: 'hbox',
                            defaults: {
                                hideLabel: true,
                                //width: 140,
                                //labelWidth: 60,
                                flex: 1,
                                margin: '0 0 0 0'
                            },
                            items: [{
                                // the width of this field in the HBox layout is set directly
                                // the other 2 items are given flex: 1, so will share the rest of the space                                
                                xtype: 'textfield',                                
                                name: 'price5',
                                fieldLabel: 'Price 5',
                                labelAlign: 'top',
                                
                                bind: {
                                    value: '{theProduct.price5}'
                                }
                            },{
                                xtype: 'textfield',                                
                                name: 'margin5',
                                fieldLabel: 'Profit',
                                labelAlign: 'top'
                            },{
                                xtype: 'textfield',                                
                                name: 'c_margin_rate5',
                                fieldLabel: 'Margin',
                                labelAlign: 'top'
                            },{
                                xtype: 'textfield',                                
                                name: 'm_margin_rate5',
                                fieldLabel: 'M margin',
                                labelAlign: 'top'
                            }]
                        },
                        {
                            xtype: 'fieldcontainer',
                            //combineErrors: true,
                            //msgTarget: 'side',
                            fieldLabel: '',
                            //labelWidth: 70,
                            width: 420,
                            colspan: 2,
                            layout: 'hbox',
                            defaults: {
                                hideLabel: true,
                                //width: 140,
                                //labelWidth: 60,
                                flex: 1,
                                margin: '0 0 0 0'
                            },
                            items: []
                        },  
                        {
                            name: 'sgtRetailPrice',
                            fieldLabel: 'MSRP',
                            margin: '0 0 9 0',
                            bind: {
                                value: '{theProduct.sgtRetailPrice}'
                            }
                        },{
                            name: 'ticket_msrp',
                            fieldLabel: 'Ticket MSRP',
                            margin: '0 0 9 0',
                            width: 210,
                            labelWidth: 100,
                            bind: {
                                value: '{theProduct.ticket_msrp}'
                            }
                        },                                              
                        {
                            xtype: 'label',
                            html: '<b>COST INFO</b>',
                            margin: '0 0 0 0',
                            colspan: 2
                        },
                        {
                            name: 'cost',
                            fieldLabel: 'Cost',
                            margin: '9 0 1 0',
                            bind: {
                                value: '{theProduct.cost}'
                            }
                        },{
                            name: 'avgCost',
                            fieldLabel: 'Month Avg Cost',
                            margin: '9 0 1 0',
                            width: 210,
                            labelWidth: 100,
                            bind: {
                                value: '{theProduct.avgCost}'
                            }
                        },{
                            name: 'bomcost1',
                            fieldLabel: 'Cost S. #1',
                            fieldCls: 'emphasized',
                            readOnly: true,
                            selectOnFocus: false,
                            bind: {
                                value: '{theProduct.Bomcost1}'
                            }
                        },{
                            name: 'avgcost_instant',
                            fieldLabel: 'Daily Avg Cost',
                            width: 210,
                            labelWidth: 100,
                            bind: {
                                value: '{theProduct.avgcost_instant}'
                            }
                        },{
                            name: 'bomcost2',
                            fieldLabel: 'Cost S. #2',
                            fieldCls: 'emphasized',
                            readOnly: true,
                            selectOnFocus: false,
                            bind: {
                                value: '{theProduct.bomcost2}'
                            }
                        },{
                            name: 'cost_cur_cs',
                            fieldLabel: 'Current Cost',
                            width: 210,
                            labelWidth: 100,
                            bind: {
                                value: '{theProduct.cost_cur_cs}'
                            }
                        },{
                            name: 'bomcost3',
                            fieldLabel: 'Cost S. #3',
                            fieldCls: 'emphasized',
                            readOnly: true,
                            selectOnFocus: false,
                            bind: {
                                value: '{theProduct.bomcost3}'
                            }
                        },{
                            name: 'defaultbomcost',
                            fieldLabel: 'Default Cost',
                            width: 210,
                            labelWidth: 100,
                            bind: {
                                value: '{theProduct.defaultbomcost}'
                            }
                        },{
                            name: 'bomcost4',
                            fieldLabel: 'Cost S. #4',
                            fieldCls: 'emphasized',
                            readOnly: true,
                            selectOnFocus: false,
                            bind: {
                                value: '{theProduct.bomcost4}'
                            }
                        },{
                            name: 'price_ddp',
                            fieldLabel: 'DDP',
                            width: 210,
                            labelWidth: 100,
                            bind: {
                                value: '{theProduct.price_ddp}'
                            }
                        },{
                            name: 'bomcost5',
                            fieldLabel: 'Cost S. #5',
                            fieldCls: 'emphasized',
                            readOnly: true,
                            selectOnFocus: false,
                            bind: {
                                value: '{theProduct.bomcost5}'
                            }
                        },{
                            name: 'ldp',
                            fieldLabel: 'LDP',
                            width: 210,
                            labelWidth: 100,
                            bind: {
                                value: '{theProduct.ldp}'
                            }
                        },{
                            name: 'comtotalqty',
                            fieldLabel: 'Total Qty',
                            fieldCls: 'emphasized',
                            readOnly: true,
                            selectOnFocus: false,
                            bind: {
                                value: '{theProduct.comtotalqty}'
                            }
                        },{
                            name: 'price_fob',
                            fieldLabel: 'FOB',
                            width: 210,
                            labelWidth: 100,
                            bind: {
                                value: '{theProduct.price_fob}'
                            }
                        },
                        {
                            xtype: 'combo',
                            name: 'warehouse',
                            margin: '7 0 0 0',
                            fieldLabel: 'Warehouse',
                            displayField: 'label',
                            valueField: 'value',                            
                            value: 'All',
                            //selectOnFocus: true,
                            //editable: true,
                            forceSelection: true,
                            hideTrigger: false,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{warehouses}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }],
                            listeners: {
                                select: {
                                    fn: 'onWarehouseSelect',
                                    scope: this.controller
                                }
                            }
                        }                                                                      
                        /*
                        {
                            xtype: 'textfield',
                            name: 'userName',
                            fieldLabel: 'Created By',
                            readOnly: true,
                            selectOnFocus: false,
                            bind: {
                                value: '{theProduct.userName}'
                            }
                        },{
                            xtype: 'datefield',
                            name: 'userTime',
                            fieldLabel: 'Created On',
                            readOnly: true,
                            selectOnFocus: false,
                            bind: {
                                value: '{theProduct.userTime}'
                            }
                            //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                        },{
                            xtype: 'textfield',
                            name: 'UpdateUser',
                            fieldLabel: 'Updated By',
                            readOnly: true,
                            selectOnFocus: false,
                            bind: {
                                value: '{theProduct.UpdateUser}'
                            }
                        },{
                            xtype: 'datefield',
                            name: 'UpdateTime',
                            fieldLabel: 'Updated On',
                            readOnly: true,
                            selectOnFocus: false,
                            bind: {
                                value: '{theProduct.UpdateTime}'
                            }
                            //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                        }*/]
                    },                    
                    {
                        responsiveCls: 'small-100',
                        //width: '30%',                        
                        columnWidth: 0.3,
                        layout: {
                            type: 'table',
                            columns: 2,
                            tableAttrs: {
                                style: {

                                }
                            }
                        },
                        defaultType: 'textarea',
                        defaults: {
                            constrain: true,                            
                            labelAlign: 'top',
                            colspan: 2,
                            width: 470,                            
                            //padding: '10 10 0 10'
                        },
                        items: [{
                            xtype: 'label',
                            html: '<b>MEMO INFO</b>',
                            margin: '0 0 0 0'
                        },{                            
                            name: 'memo',
                            fieldLabel: 'Memo',
                            hideLabel: true,
                            margin: '9 0 9 0',
                            height: 180,
                            bind: {
                                value: '{theProduct.memo}'
                            }
                        },{                                                        
                            name: 'po_memo',
                            fieldLabel: 'PO Memo',
                            margin: '0 0 9 0',
                            height: 100,
                            bind: {
                                value: '{theProduct.po_memo}'
                            }
                            //fieldLabel: 'Memo'
                        },{                                                        
                            name: 'ci_memo',
                            fieldLabel: 'C.I Memo',
                            margin: '0 0 9 0',
                            height: 100,
                            bind: {
                                value: '{theProduct.ci_memo}'
                            }
                            //fieldLabel: 'Memo'
                        }]
                    },
                    /**
                    {
                        responsiveCls: 'small-100',
                        //width: '40%',
                        hidden: true,
                        columnWidth: 0.7,
                        layout: {
                            type: 'table',
                            columns: 2,
                            tableAttrs: {
                                style: {

                                }
                            }
                        },
                        defaultType: 'fieldcontainer',
                        defaults: {                            
                            width: 920,
                            labelWidth: 130,
                            colspan: 4,
                            layout: 'hbox',
                            margin: '0 10 1 0'
                        },
                        items: [{
                            xtype: 'fieldcontainer',
                            //combineErrors: true,
                            //msgTarget: 'side',
                            fieldLabel: 'Size',
                            //hideLabel: true,
                            hideEmptyLabel: true,
                            //labelWidth: 70,
                            width: 920,                            
                            
                            defaultType: 'textfield', 
                            defaults: {
                                editable: false,
                                hideLabel: true,
                                flex: 1,                                
                                //minValue: 0,                                
                                //minHeight: 720,
                                //padding: '10 10 0 10'
                            },  
                            items: [{
                                // the width of this field in the HBox layout is set directly
                                // the other 2 items are given flex: 1, so will share the rest of the space                                                                                               
                                name: 'size1',
                                fieldLabel: 'Size 1',                                                                
                                bind: {
                                    value: '{theProduct.Size.size1}'
                                }
                            },{                                                             
                                name: 'size2',
                                fieldLabel: 'Size 2',
                                bind: {
                                    value: '{theProduct.Size.size2}'
                                }                                                           
                            },{                                                     
                                name: 'size3',
                                fieldLabel: 'Size 3',                                
                                bind: {
                                    value: '{theProduct.Size.size3}'
                                }
                            },{                                                            
                                name: 'size4',
                                fieldLabel: 'Size 4',                                 
                                bind: {
                                    value: '{theProduct.Size.size4}'
                                }
                            },{                                                           
                                name: 'size5',
                                fieldLabel: 'Size 5',                                 
                                bind: {
                                    value: '{theProduct.Size.size5}'
                                }
                            },{                                                             
                                name: 'size6',
                                fieldLabel: 'Size 6',                                 
                                bind: {
                                    value: '{theProduct.Size.size6}'
                                }
                            },{                                                            
                                name: 'size7',
                                fieldLabel: 'Size 7',  
                                bind: {
                                    value: '{theProduct.Size.size7}'
                                }
                            },{                                                      
                                name: 'size8',
                                fieldLabel: 'Size 8',
                                bind: {
                                    value: '{theProduct.Size.size8}'
                                }
                            },{                                                           
                                name: 'size9',
                                fieldLabel: 'Size 9',
                                bind: {
                                    value: '{theProduct.Size.size9}'
                                }
                            },{                                                            
                                name: 'size10',
                                fieldLabel: 'Size 10',                                 
                                bind: {
                                    value: '{theProduct.Size.size10}'
                                }
                            },{                                                                                            
                                //name: 'total',
                                fieldLabel: 'Total',
                                value: 'Total'
                            }]
                        },{
                            xtype: 'fieldcontainer',
                            //combineErrors: true,
                            //msgTarget: 'side',
                            fieldLabel: 'On Hand',
                            //labelWidth: 70,
                            width: 920,                            
                            
                            defaultType: 'numberfield',                            
                            defaults: {
                                editable: false,
                                hideLabel: true,
                                flex: 1,                                
                                //minValue: 0,
                                selectOnFocus: true,
                                // Remove spinner buttons, and arrow key and mouse wheel listeners
                                hideTrigger: true,
                                keyNavEnabled: false,
                                mouseWheelEnabled: false
                                //minHeight: 720,
                                //padding: '10 10 0 10'
                            },  
                            items: [{
                                // the width of this field in the HBox layout is set directly
                                // the other 2 items are given flex: 1, so will share the rest of the space                                                                                               
                                name: 'oh1',
                                fieldLabel: 'On Hand 1',                                                                
                                bind: {
                                    value: '{theProduct.oh1}'
                                }
                            },{                                                             
                                name: 'oh2',
                                fieldLabel: 'On Hand 2',
                                bind: {
                                    value: '{theProduct.oh2}'
                                }                                                           
                            },{                                                     
                                name: 'oh3',
                                fieldLabel: 'On Hand 3',                                
                                bind: {
                                    value: '{theProduct.oh3}'
                                }
                            },{                                                            
                                name: 'oh4',
                                fieldLabel: 'On Hand 4',                                 
                                bind: {
                                    value: '{theProduct.oh4}'
                                }
                            },{                                                           
                                name: 'oh5',
                                fieldLabel: 'On Hand 5',                                 
                                bind: {
                                    value: '{theProduct.oh5}'
                                }
                            },{                                                             
                                name: 'oh6',
                                fieldLabel: 'On Hand 6',                                 
                                bind: {
                                    value: '{theProduct.oh6}'
                                }
                            },{                                                            
                                name: 'oh7',
                                fieldLabel: 'On Hand 7',  
                                bind: {
                                    value: '{theProduct.oh7}'
                                }
                            },{                                                      
                                name: 'oh8',
                                fieldLabel: 'On Hand 8',
                                bind: {
                                    value: '{theProduct.oh8}'
                                }
                            },{                                                           
                                name: 'oh9',
                                fieldLabel: 'On Hand 9',
                                bind: {
                                    value: '{theProduct.oh9}'
                                }
                            },{                                                            
                                name: 'oh10',
                                fieldLabel: 'On Hand 10',                                 
                                bind: {
                                    value: '{theProduct.oh10}'
                                }
                            },{                                                            
                                name: 'ohs',
                                fieldLabel: 'On Hand Total', 
                                bind: {
                                    value: '{theProduct.ohs}'
                                }
                            }]
                        },{
                            xtype: 'fieldcontainer',
                            //combineErrors: true,
                            //msgTarget: 'side',
                            fieldLabel: 'On Order',
                            //labelWidth: 70,
                            width: 920,                            

                            defaultType: 'numberfield',                            
                            defaults: {
                                editable: false,
                                hideLabel: true,
                                flex: 1,                                                         
                                //minValue: 0,
                                selectOnFocus: true,
                                // Remove spinner buttons, and arrow key and mouse wheel listeners
                                hideTrigger: true,
                                keyNavEnabled: false,
                                mouseWheelEnabled: false
                                //minHeight: 720,
                                //padding: '10 10 0 10'
                            },  
                            items: [{                                                           
                                name: 'order1',
                                fieldLabel: 'On Order 1',
                                bind: {
                                    value: '{theProduct.order1}'
                                }
                            },{                                                           
                                name: 'order2',
                                fieldLabel: 'On Order 2',
                                bind: {
                                    value: '{theProduct.order2}'
                                }
                            },{                                                           
                                name: 'order3',
                                fieldLabel: 'On Order 3',
                                bind: {
                                    value: '{theProduct.order3}'
                                }
                            },{                                                           
                                name: 'order4',
                                fieldLabel: 'On Order 4',
                                bind: {
                                    value: '{theProduct.order4}'
                                }
                            },{                                                           
                                name: 'order5',
                                fieldLabel: 'On Order 5',
                                bind: {
                                    value: '{theProduct.order5}'
                                }
                            },{                                                           
                                name: 'order6',
                                fieldLabel: 'On Order 6',
                                bind: {
                                    value: '{theProduct.order6}'
                                }
                            },{                                                           
                                name: 'order7',
                                fieldLabel: 'On Order 7',
                                bind: {
                                    value: '{theProduct.order7}'
                                }
                            },{                                                           
                                name: 'order8',
                                fieldLabel: 'On Order 8',
                                bind: {
                                    value: '{theProduct.order8}'
                                }
                            },{                                                           
                                name: 'order9',
                                fieldLabel: 'On Order 9',
                                bind: {
                                    value: '{theProduct.order9}'
                                }
                            },{                                                           
                                name: 'order10',
                                fieldLabel: 'On Order 10',
                                bind: {
                                    value: '{theProduct.order10}'
                                }
                            },{                                                           
                                name: 'orders',
                                fieldLabel: 'On Order Total',
                                bind: {
                                    value: '{theProduct.orders}'
                                }
                            }]
                        },{
                            xtype: 'fieldcontainer',
                            //combineErrors: true,
                            //msgTarget: 'side',
                            fieldLabel: 'WIP (Open PO)',
                            //labelWidth: 70,
                            width: 920,                            

                            defaultType: 'numberfield',                            
                            defaults: {
                                editable: false,
                                hideLabel: true,
                                flex: 1,                                                             
                                //minValue: 0,
                                selectOnFocus: true,
                                // Remove spinner buttons, and arrow key and mouse wheel listeners
                                hideTrigger: true,
                                keyNavEnabled: false,
                                mouseWheelEnabled: false
                                //minHeight: 720,
                                //padding: '10 10 0 10'
                            },  
                            items: [{                                                           
                                name: 'po1',
                                fieldLabel: 'Open Order 1',
                                bind: {
                                    value: '{theProduct.po1}'
                                }
                            },{                                                           
                                name: 'po2',
                                fieldLabel: 'Open Order 2',
                                bind: {
                                    value: '{theProduct.po2}'
                                }
                            },{                                                           
                                name: 'po3',
                                fieldLabel: 'Open Order 3',
                                bind: {
                                    value: '{theProduct.po3}'
                                }
                            },{                                                           
                                name: 'po4',
                                fieldLabel: 'Open Order 4',
                                bind: {
                                    value: '{theProduct.po4}'
                                }
                            },{                                                           
                                name: 'po5',
                                fieldLabel: 'Open Order 5',
                                bind: {
                                    value: '{theProduct.po5}'
                                }
                            },{                                                           
                                name: 'po6',
                                fieldLabel: 'Open Order 6',
                                bind: {
                                    value: '{theProduct.po6}'
                                }
                            },{                                                           
                                name: 'po7',
                                fieldLabel: 'Open Order 7',
                                bind: {
                                    value: '{theProduct.po7}'
                                }
                            },{                                                           
                                name: 'po8',
                                fieldLabel: 'Open Order 8',
                                bind: {
                                    value: '{theProduct.po8}'
                                }
                            },{                                                           
                                name: 'po9',
                                fieldLabel: 'Open Order 9',
                                bind: {
                                    value: '{theProduct.po9}'
                                }
                            },{                                                           
                                name: 'po10',
                                fieldLabel: 'Open Order 10',
                                bind: {
                                    value: '{theProduct.po10}'
                                }
                            },{                                                           
                                name: 'pos',
                                fieldLabel: 'Total Open Order',
                                bind: {
                                    value: '{theProduct.pos}'
                                }
                            }]
                        },{
                            xtype: 'fieldcontainer',
                            //combineErrors: true,
                            //msgTarget: 'side',
                            fieldLabel: 'ATS (OH + WIP - SO)',
                            //labelWidth: 70,
                            width: 920,
                            
                            defaultType: 'numberfield',                            
                            defaults: {
                                editable: false,
                                hideLabel: true,
                                flex: 1,                                                             
                                //minValue: 0,
                                selectOnFocus: true,
                                // Remove spinner buttons, and arrow key and mouse wheel listeners
                                hideTrigger: true,
                                keyNavEnabled: false,
                                mouseWheelEnabled: false
                                //minHeight: 720,
                                //padding: '10 10 0 10'
                            },  
                            items: [{                                                           
                                name: 'ats1',
                                fieldLabel: 'ATS 1',
                                bind: {
                                    value: '{theProduct.ats1}'
                                }
                            },{                                                           
                                name: 'ats2',
                                fieldLabel: 'ATS 2',
                                bind: {
                                    value: '{theProduct.ats2}'
                                }
                            },{                                                           
                                name: 'ats3',
                                fieldLabel: 'ATS 3',
                                bind: {
                                    value: '{theProduct.ats3}'
                                }
                            },{                                                           
                                name: 'ats4',
                                fieldLabel: 'ATS 4',
                                bind: {
                                    value: '{theProduct.ats4}'
                                }
                            },{                                                           
                                name: 'ats5',
                                fieldLabel: 'ATS 5',
                                bind: {
                                    value: '{theProduct.ats5}'
                                }
                            },{                                                           
                                name: 'ats6',
                                fieldLabel: 'ATS 6',
                                bind: {
                                    value: '{theProduct.ats6}'
                                }
                            },{                                                           
                                name: 'ats7',
                                fieldLabel: 'ATS 7',
                                bind: {
                                    value: '{theProduct.ats7}'
                                }
                            },{                                                           
                                name: 'ats8',
                                fieldLabel: 'ATS 8',
                                bind: {
                                    value: '{theProduct.ats8}'
                                }
                            },{                                                           
                                name: 'ats9',
                                fieldLabel: 'ATS 9',
                                bind: {
                                    value: '{theProduct.ats9}'
                                }
                            },{                                                           
                                name: 'ats10',
                                fieldLabel: 'ATS 10',
                                bind: {
                                    value: '{theProduct.ats10}'
                                }
                            },{                                                           
                                name: 'atss',
                                fieldLabel: 'Total ATS',
                                bind: {
                                    value: '{theProduct.atss}'
                                }
                            }]
                        },{
                            xtype: 'fieldcontainer',
                            //combineErrors: true,
                            //msgTarget: 'side',
                            fieldLabel: 'OTS (OH - SO)',
                            //labelWidth: 70,
                            margin: '0 10 9 0',
                            width: 920,
                            
                            defaultType: 'numberfield',                            
                            defaults: {
                                hideLabel: true,
                                flex: 1,                                                             
                                //minValue: 0,
                                selectOnFocus: true,
                                // Remove spinner buttons, and arrow key and mouse wheel listeners
                                hideTrigger: true,
                                keyNavEnabled: false,
                                mouseWheelEnabled: false
                                //minHeight: 720,
                                //padding: '10 10 0 10'
                            },
                            items: [{                                                           
                                name: 'ots1',
                                fieldLabel: 'OTS 1',
                                bind: {
                                    value: '{theProduct.ots1}'
                                }
                            },{                                                           
                                name: 'ots2',
                                fieldLabel: 'OTS 2',
                                bind: {
                                    value: '{theProduct.ots2}'
                                }
                            },{                                                           
                                name: 'ots3',
                                fieldLabel: 'OTS 3',
                                bind: {
                                    value: '{theProduct.ots3}'
                                }
                            },{                                                           
                                name: 'ots4',
                                fieldLabel: 'OTS 4',
                                bind: {
                                    value: '{theProduct.ots4}'
                                }
                            },{                                                           
                                name: 'ots5',
                                fieldLabel: 'OTS 5',
                                bind: {
                                    value: '{theProduct.ots5}'
                                }
                            },{                                                           
                                name: 'ots6',
                                fieldLabel: 'OTS 6',
                                bind: {
                                    value: '{theProduct.ots6}'
                                }
                            },{                                                           
                                name: 'ots7',
                                fieldLabel: 'OTS 7',
                                bind: {
                                    value: '{theProduct.ots7}'
                                }
                            },{                                                           
                                name: 'ots8',
                                fieldLabel: 'OTS 8',
                                bind: {
                                    value: '{theProduct.ots8}'
                                }
                            },{                                                           
                                name: 'ots9',
                                fieldLabel: 'OTS 9',
                                bind: {
                                    value: '{theProduct.ots9}'
                                }
                            },{                                                           
                                name: 'ots10',
                                fieldLabel: 'OTS 10',
                                bind: {
                                    value: '{theProduct.ots10}'
                                }
                            },{                                                           
                                name: 'otss',
                                fieldLabel: 'Total OTS',
                                bind: {
                                    value: '{theProduct.otss}'
                                }
                            }]
                        }]    
                    }
                    **/
                    ,{
                        responsiveCls: 'small-100',
                        //width: '40%',
                        width: 930,
                        margin: '0 18 0 0',
                        hidden: false,
                        
                        columnWidth: 0.7,                                                               

                        items: [{
                            xtype: 'dataview',
                            reference: "inv-view",
                            //width: 918,
                            //scrollable: true,                            
                            cls: 'inv-view',
                            overItemCls: "x-item-over",
                            itemSelector: "div.item-selector",
                            //preserveScrollOnRefresh: true,
                            //deferInitialRefresh: true,    

                            prepareData: function(f, d, e){
                                Ext.apply(f, {
                                    
                                });

                                return f;
                            },

                            bind: {                                
                                store: "{inventories}"
                            },

                            listeners: {
                                refresh: 'onViewRefresh',                                

                                beforeitemclick: {
                                    fn: 'onBeforeViewItemClick',
                                    scope: this.controller
                                }
                            },

                            tpl: new Ext.XTemplate(                                
                                '<tpl for=".">',
                                    '<div class="item-selector">',
                                        '<div class="item-boxer">',
                                            '<div class="box-row">',   
                                                '<div class="box nb" style="width:20px;"></div>',                                         
                                                '<div class="box ab" style="width:150px;"></div>',
                                                '<div class="box ab">',
                                                    '<div class="item-boxer" style="height:22px">',
                                                        '<div class="box rb center" style="width:50px;">{size1}</div>',
                                                        '<div class="box rb center" style="width:50px;">{size2}</div>',
                                                        '<div class="box rb center" style="width:50px;">{size3}</div>',
                                                        '<div class="box rb center" style="width:50px;">{size4}</div>',
                                                        '<div class="box rb center" style="width:50px;">{size5}</div>',
                                                        '<div class="box rb center" style="width:50px;">{size6}</div>',
                                                        '<div class="box rb center" style="width:50px;">{size7}</div>',
                                                        '<div class="box rb center" style="width:50px;">{size8}</div>',
                                                        '<div class="box rb center" style="width:50px;">{size9}</div>',
                                                        '<div class="box rb center" style="width:50px;">{size10}</div>',
                                                        '<div class="box rb center" style="width:50px;">{size11}</div>',
                                                        '<div class="box rb center" style="width:50px;">{size12}</div>',
                                                        '<div class="box rb center" style="width:50px;">{size13}</div>',
                                                        '<div class="box rb center" style="width:50px;">{size14}</div>',
                                                        //'<div class="box rb center" style="width:50px;">{size15}</div>',
                                                        '<div class="box nb center" style="width:50px;">Total</div>',
                                                    '</div>',
                                                '</div>',                                           
                                            '</div>',
                                            '<div class="box-row">',                                            
                                                '<div class="box nb" style="width:20px;"><i class="dataview-icon-onhand x-fa fa-search" style="cursor:pointer"></i></div>',
                                                '<div class="box ab" style="width:150px;">On Hand:</div>',
                                                '<div class="box ab">',
                                                    '<div class="item-boxer" style="height:22px">',
                                                        '<div class="box rb center" style="width:50px;">{oh1}</div>',
                                                        '<div class="box rb center" style="width:50px;">{oh2}</div>',
                                                        '<div class="box rb center" style="width:50px;">{oh3}</div>',
                                                        '<div class="box rb center" style="width:50px;">{oh4}</div>',
                                                        '<div class="box rb center" style="width:50px;">{oh5}</div>',
                                                        '<div class="box rb center" style="width:50px;">{oh6}</div>',
                                                        '<div class="box rb center" style="width:50px;">{oh7}</div>',
                                                        '<div class="box rb center" style="width:50px;">{oh8}</div>',
                                                        '<div class="box rb center" style="width:50px;">{oh9}</div>',
                                                        '<div class="box rb center" style="width:50px;">{oh10}</div>',
                                                        '<div class="box rb center" style="width:50px;">{oh11}</div>',
                                                        '<div class="box rb center" style="width:50px;">{oh12}</div>',
                                                        '<div class="box rb center" style="width:50px;">{oh13}</div>',
                                                        '<div class="box rb center" style="width:50px;">{oh14}</div>',
                                                        //'<div class="box rb center" style="width:50px;">{oh15}</div>',
                                                        '<div class="box nb center" style="width:50px;">{ohs}</div>',
                                                    '</div>',
                                                '</div>',                                            
                                            '</div>',
                                            '<div class="box-row">',        
                                                '<div class="box nb" style="width:20px;"><i class="dataview-icon-onorder x-fa fa-search" style="cursor:pointer"></i></div>',                                    
                                                '<div class="box ab" style="width:150px;">On Order</div>',
                                                '<div class="box ab">',
                                                    '<div class="item-boxer" style="height:22px">',
                                                        '<div class="box rb center" style="width:50px;">{order1}</div>',
                                                        '<div class="box rb center" style="width:50px;">{order2}</div>',
                                                        '<div class="box rb center" style="width:50px;">{order3}</div>',
                                                        '<div class="box rb center" style="width:50px;">{order4}</div>',
                                                        '<div class="box rb center" style="width:50px;">{order5}</div>',
                                                        '<div class="box rb center" style="width:50px;">{order6}</div>',
                                                        '<div class="box rb center" style="width:50px;">{order7}</div>',
                                                        '<div class="box rb center" style="width:50px;">{order8}</div>',
                                                        '<div class="box rb center" style="width:50px;">{order9}</div>',
                                                        '<div class="box rb center" style="width:50px;">{order10}</div>',
                                                        '<div class="box rb center" style="width:50px;">{order11}</div>',
                                                        '<div class="box rb center" style="width:50px;">{order12}</div>',
                                                        '<div class="box rb center" style="width:50px;">{order13}</div>',
                                                        '<div class="box rb center" style="width:50px;">{order14}</div>',
                                                        //'<div class="box rb center" style="width:50px;">{order15}</div>',
                                                        '<div class="box nb center" style="width:50px;">{orders}</div>',
                                                    '</div>',
                                                '</div>',                                            
                                            '</div>',
                                            '<div class="box-row">',   
                                                '<div class="box nb" style="width:20px;"><i class="dataview-icon-wip x-fa fa-search" style="cursor:pointer"></i></div>',                                        
                                                '<div class="box ab" style="width:150px;">WIP(Open PO):</div>',
                                                '<div class="box ab">',
                                                    '<div class="item-boxer" style="height:22px">',
                                                        '<div class="box rb center" style="width:50px;">{wip1}</div>',
                                                        '<div class="box rb center" style="width:50px;">{wip2}</div>',
                                                        '<div class="box rb center" style="width:50px;">{wip3}</div>',
                                                        '<div class="box rb center" style="width:50px;">{wip4}</div>',
                                                        '<div class="box rb center" style="width:50px;">{wip5}</div>',
                                                        '<div class="box rb center" style="width:50px;">{wip6}</div>',
                                                        '<div class="box rb center" style="width:50px;">{wip7}</div>',
                                                        '<div class="box rb center" style="width:50px;">{wip8}</div>',
                                                        '<div class="box rb center" style="width:50px;">{wip9}</div>',
                                                        '<div class="box rb center" style="width:50px;">{wip10}</div>',
                                                        '<div class="box rb center" style="width:50px;">{wip11}</div>',
                                                        '<div class="box rb center" style="width:50px;">{wip12}</div>',
                                                        '<div class="box rb center" style="width:50px;">{wip13}</div>',
                                                        '<div class="box rb center" style="width:50px;">{wip14}</div>',
                                                        //'<div class="box rb center" style="width:50px;">{wip15}</div>',
                                                        '<div class="box nb center" style="width:50px;">{wips}</div>',
                                                    '</div>',
                                                '</div>',                                            
                                            '</div>',
                                            '<div class="box-row">',          
                                                '<div class="box nb" style="width:20px;"></div>',                                  
                                                '<div class="box ab" style="width:150px;">ATS (OH + WIP - SO):</div>',
                                                '<div class="box ab">',
                                                    '<div class="item-boxer" style="height:22px">',
                                                        '<div class="box rb center" style="width:50px;">{ats1}</div>',
                                                        '<div class="box rb center" style="width:50px;">{ats2}</div>',
                                                        '<div class="box rb center" style="width:50px;">{ats3}</div>',
                                                        '<div class="box rb center" style="width:50px;">{ats4}</div>',
                                                        '<div class="box rb center" style="width:50px;">{ats5}</div>',
                                                        '<div class="box rb center" style="width:50px;">{ats6}</div>',
                                                        '<div class="box rb center" style="width:50px;">{ats7}</div>',
                                                        '<div class="box rb center" style="width:50px;">{ats8}</div>',
                                                        '<div class="box rb center" style="width:50px;">{ats9}</div>',
                                                        '<div class="box rb center" style="width:50px;">{ats10}</div>',
                                                        '<div class="box rb center" style="width:50px;">{ats11}</div>',
                                                        '<div class="box rb center" style="width:50px;">{ats12}</div>',
                                                        '<div class="box rb center" style="width:50px;">{ats13}</div>',
                                                        '<div class="box rb center" style="width:50px;">{ats14}</div>',
                                                        //'<div class="box rb center" style="width:50px;">{ats15}</div>',
                                                        '<div class="box nb center" style="width:50px;">{ats}</div>',
                                                    '</div>',
                                                '</div>',                                            
                                            '</div>',
                                            '<div class="box-row">',   
                                                '<div class="box nb" style="width:20px;"></div>',                                         
                                                '<div class="box ab" style="width:150px;">OTS (OH - SO):</div>',
                                                '<div class="box ab">',
                                                    '<div class="item-boxer" style="height:22px">',
                                                        '<div class="box rb center" style="width:50px;">{ots1}</div>',
                                                        '<div class="box rb center" style="width:50px;">{ots2}</div>',
                                                        '<div class="box rb center" style="width:50px;">{ots3}</div>',
                                                        '<div class="box rb center" style="width:50px;">{ots4}</div>',
                                                        '<div class="box rb center" style="width:50px;">{ots5}</div>',
                                                        '<div class="box rb center" style="width:50px;">{ots6}</div>',
                                                        '<div class="box rb center" style="width:50px;">{ots7}</div>',
                                                        '<div class="box rb center" style="width:50px;">{ots8}</div>',
                                                        '<div class="box rb center" style="width:50px;">{ots9}</div>',
                                                        '<div class="box rb center" style="width:50px;">{ots10}</div>',
                                                        '<div class="box rb center" style="width:50px;">{ots11}</div>',
                                                        '<div class="box rb center" style="width:50px;">{ots12}</div>',
                                                        '<div class="box rb center" style="width:50px;">{ots13}</div>',
                                                        '<div class="box rb center" style="width:50px;">{ots14}</div>',
                                                        //'<div class="box rb center" style="width:50px;">{ots15}</div>',
                                                        '<div class="box nb center" style="width:50px;">{ots}</div>',
                                                    '</div>',
                                                '</div>',                                            
                                            '</div>',
                                        '</div>',
                                    '</div>',
                                '</tpl>'
                            )                            
                        }]
                    },{
                        responsiveCls: 'small-100',
                        //width: '30%',                        
                        columnWidth: 0.3,
                        layout: {
                            type: 'table',
                            columns: 2,
                            tableAttrs: {
                                style: {

                                }
                            }
                        },
                        defaultType: 'textfield',
                        defaults: {
                            constrain: true,                            
                            //labelAlign: 'left',
                            margin: '0 10 1 0',
                            labelWidth: 160,
                            hideEmptyLabel: false,
                            colspan: 2,
                            width: 470
                            //padding: '10 10 0 10'
                        },
                        items: [{
                            xtype: 'label',
                            html: '<b>USER FIELDS</>',
                            margin: '0 0 0 0'                              
                        },{                            
                            name: 'user1',
                            margin: '9 10 1 0', 
                            fieldLabel: 'Design Dept',                                                        
                            bind: {
                                value: '{theProduct.user1}'
                            }
                        },{                                                        
                            name: 'user2',
                            fieldLabel: 'Sales Dept',                                               
                            bind: {
                                value: '{theProduct.user2}'
                            }
                            //fieldLabel: 'Memo'
                        },{                                                        
                            name: 'user3',
                            fieldLabel: 'Production Dept',                                                      
                            bind: {
                                value: '{theProduct.user3}'
                            }
                            //fieldLabel: 'Memo'
                        },{                                                        
                            name: 'user4',
                            fieldLabel: 'Fit Dept',                                                     
                            bind: {
                                value: '{theProduct.user4}'
                            }
                            //fieldLabel: 'Memo'
                        },{                                                        
                            name: 'user5',
                            fieldLabel: 'Receiving/Q.C Dept',                                                      
                            bind: {
                                value: '{theProduct.user5}'
                            }
                            //fieldLabel: 'Memo'
                        },{                                                        
                            name: 'user6',
                            fieldLabel: 'Retail Size',                                                       
                            bind: {
                                value: '{theProduct.user6}'
                            }
                            //fieldLabel: 'Memo'
                        },{                                                        
                            name: 'user7',
                            fieldLabel: '',                                                                               
                            bind: {
                                value: '{theProduct.user7}'
                            }
                            //fieldLabel: 'Memo'
                        },{                                                        
                            name: 'user8',
                            fieldLabel: 'MKPL DISCOUNT ',                                                      
                            bind: {
                                value: '{theProduct.user8}'
                            }
                            //fieldLabel: 'Memo'
                        },{                                                        
                            name: 'user9',
                            fieldLabel: 'MKPL COLOR',                                                     
                            bind: {
                                value: '{theProduct.user9}'
                            }
                            //fieldLabel: 'Memo'
                        },{ 
                            xtype: 'datefield',                                                       
                            name: 'userdate',
                            fieldLabel: '',                                                                                                                     
                            bind: {
                                value: '{theProduct.userdate}'
                            }
                            //fieldLabel: 'Memo'
                        },{ 
                            xtype: 'datefield',                                                       
                            name: 'userdate1',
                            fieldLabel: 'MKPL DISCOUNT START',                                                  
                            bind: {
                                value: '{theProduct.userdate1}'
                            }
                            //fieldLabel: 'Memo'
                        },{ 
                            xtype: 'datefield',                                                       
                            name: 'userdate2',
                            fieldLabel: 'MKPL DISCOUNT END',                                                    
                            bind: {
                                value: '{theProduct.userdate2}'
                            }
                            //fieldLabel: 'Memo'
                        },{ 
                            xtype: 'datefield',                                                       
                            name: 'userdate3',
                            fieldLabel: '',                                                     
                            bind: {
                                value: '{theProduct.userdate3}'
                            }
                            //fieldLabel: 'Memo'
                        }]
                    },{
                        responsiveCls: 'small-100',
                        //width: '40%',                        
                        columnWidth: 0.7,
                        layout: {
                            type: 'table',
                            columns: 2,
                            tableAttrs: {
                                style: {

                                }
                            }
                        },
                        defaultType: 'fieldcontainer',
                        defaults: {                            
                            width: 920,
                            labelWidth: 130,
                            colspan: 4,
                            layout: 'hbox',
                            margin: '0 10 1 0'
                        },
                        items: [{
                            xtype: 'label',
                            html: '<b>VENDOR INFO',
                            margin: '0 0 0 0',
                            colspan: 4
                        },{
                            xtype: 'fieldcontainer',
                            //combineErrors: true,
                            //msgTarget: 'side',
                            fieldLabel: 'Vendor',
                            hideLabel: true,
                            //labelWidth: 70,
                            width: 920,                            
                            margin: '9 10 1 0',
                            defaultType: 'textfield',                            
                            defaults: {       
                                labelAlign: 'top',                         
                                flex: 1,                                
                                //minValue: 0,                                
                                // Remove spinner buttons, and arrow key and mouse wheel listeners                                                                
                                //padding: '10 10 0 10'
                            },  
                            items: [{
                                // the width of this field in the HBox layout is set directly
                                // the other 2 items are given flex: 1, so will share the rest of the space                                                                                               
                                name: 'vendor1',
                                fieldLabel: 'Vendor',                                                                
                                bind: {
                                    value: '{theProduct.vendor1}'
                                }
                            },{                                                             
                                name: 'vendorpart1',
                                fieldLabel: 'Vendor Style',
                                bind: {
                                    value: '{theProduct.vendorpart1}'
                                }                                                           
                            },{                                                     
                                name: 'vendocolor1',
                                fieldLabel: 'Vendor Color',                                
                                bind: {
                                    value: '{theProduct.vendocolor1}'
                                }
                            },{                                                            
                                name: 'venddesign1',
                                fieldLabel: 'Vendor Design',                                 
                                bind: {
                                    value: '{theProduct.venddesign1}'
                                }
                            },{                                                           
                                name: 'uom1',
                                fieldLabel: 'U.O.M',                                 
                                bind: {
                                    value: '{theProduct.uom1}'
                                }
                            },{                                                             
                                name: 'cost1',
                                fieldLabel: 'Cost',                                 
                                bind: {
                                    value: '{theProduct.cost1}'
                                }
                            },{
                                xtype: 'combo',
                                name: 'currency1',
                                fieldLabel: 'Currency',
                                //fieldCls: 'required',
                                displayField: 'label',
                                valueField: 'value',
                                //selectOnFocus: true,
                                editable: false,
                                forceSelection: true,
                                //minChars: 1,
                                queryMode: 'local',
                                //queryParam: 'filter',
                                //triggerAction: 'all',
                                bind: {
                                    store: '{currencies}',
                                    value: '{theProduct.currency1}'
                                }
                            }]
                        },{
                            xtype: 'fieldcontainer',
                            //combineErrors: true,
                            //msgTarget: 'side',
                            fieldLabel: 'Vendor 2',
                            hideLabel: true,
                            //labelWidth: 70,
                            width: 920,                            

                            defaultType: 'textfield',                            
                            defaults: {
                                hideLabel: true,
                                hideEmptyLabel: true,
                                flex: 1,                                                                                         
                                //padding: '10 10 0 10'
                            },  
                            items: [{
                                // the width of this field in the HBox layout is set directly
                                // the other 2 items are given flex: 1, so will share the rest of the space                                                                                               
                                name: 'vendor2',
                                fieldLabel: 'Vendor',                                                                
                                bind: {
                                    value: '{theProduct.vendor2}'
                                }
                            },{                                                             
                                name: 'vendorpart2',
                                fieldLabel: 'Vendor Style',
                                bind: {
                                    value: '{theProduct.vendorpart2}'
                                }                                                           
                            },{                                                     
                                name: 'vendocolor2',
                                fieldLabel: 'Vendor Color',                                
                                bind: {
                                    value: '{theProduct.vendocolor2}'
                                }
                            },{                                                            
                                name: 'venddesign2',
                                fieldLabel: 'Vendor Design',                                 
                                bind: {
                                    value: '{theProduct.venddesign2}'
                                }
                            },{                                                           
                                name: 'uom2',
                                fieldLabel: 'U.O.M',                                 
                                bind: {
                                    value: '{theProduct.uom2}'
                                }
                            },{                                                             
                                name: 'cost2',
                                fieldLabel: 'Cost',                                 
                                bind: {
                                    value: '{theProduct.cost2}'
                                }
                            },{
                                xtype: 'combo',
                                name: 'currency2',
                                fieldLabel: 'Currency 2',
                                //fieldCls: 'required',
                                displayField: 'label',
                                valueField: 'value',
                                //selectOnFocus: true,
                                editable: false,
                                forceSelection: true,
                                //minChars: 1,
                                queryMode: 'local',
                                //queryParam: 'filter',
                                //triggerAction: 'all',
                                bind: {
                                    store: '{currencies}',
                                    value: '{theProduct.currency2}'
                                }
                            }]
                        },{
                            xtype: 'fieldcontainer',
                            //combineErrors: true,
                            //msgTarget: 'side',
                            fieldLabel: 'Vendor 3',
                            hideLabel: true,                            
                            //labelWidth: 70,
                            width: 920,                            

                            defaultType: 'textfield',                            
                            defaults: {
                                hideLabel: true,
                                hideEmptyLabel: true,
                                flex: 1,                                                             
                                //minValue: 0,                                
                                //padding: '10 10 0 10'
                            },  
                            items: [{
                                // the width of this field in the HBox layout is set directly
                                // the other 2 items are given flex: 1, so will share the rest of the space                                                                                               
                                name: 'vendor3',
                                fieldLabel: 'Vendor',                                                                
                                bind: {
                                    value: '{theProduct.vendor3}'
                                }
                            },{                                                             
                                xtype: 'box'                                                         
                            },{                                                     
                                name: 'vendocolor3',
                                fieldLabel: 'Vendor Color',                                
                                bind: {
                                    value: '{theProduct.vendocolor3}'
                                }
                            },{                                                            
                                name: 'venddesign3',
                                fieldLabel: 'Vendor Design',                                 
                                bind: {
                                    value: '{theProduct.venddesign3}'
                                }
                            },{                                                           
                                name: 'uom3',
                                fieldLabel: 'U.O.M',                                 
                                bind: {
                                    value: '{theProduct.uom3}'
                                }
                            },{                                                             
                                name: 'cost3',
                                fieldLabel: 'Cost',                                 
                                bind: {
                                    value: '{theProduct.cost3}'
                                }
                            },{
                                xtype: 'combo',
                                name: 'currency3',
                                fieldLabel: 'Currency 3',
                                //fieldCls: 'required',
                                displayField: 'label',
                                valueField: 'value',
                                //selectOnFocus: true,
                                editable: false,
                                forceSelection: true,
                                //minChars: 1,
                                queryMode: 'local',
                                //queryParam: 'filter',
                                //triggerAction: 'all',
                                bind: {
                                    store: '{currencies}',
                                    value: '{theProduct.currency3}'
                                }
                            }]
                        }]                        
                    },{
                        responsiveCls: 'small-100',
                        //width: '30%',
                        columnWidth: 0.3,
                        layout: {
                            type: 'table',
                            columns: 2,
                            tableAttrs: {
                                style: {

                                }
                            }
                        },
                        defaultType: 'textfield',
                        defaults: {
                            constrain: true,                            
                            //labelAlign: 'left',
                            margin: '9 10 1 0',
                            labelWidth: 160,
                            hideEmptyLabel: false,
                            colspan: 2,
                            width: 470,
                            //padding: '10 10 0 10'
                        },
                        items: [{
                            xtype: 'label',
                            html: '<b>OTHER INFO',
                            margin: '0 0 0 0'
                        },{                                                        
                            name: 'reference1',
                            fieldLabel: 'Reference 1',        
                            //margin: '9 0 3 0',
                            labelWidth: 80,
                            width: 230,
                            colspan: 1,
                            bind: {
                                value: '{theProduct.reference1}'
                            }
                            //fieldLabel: 'Memo'
                        },{                                                        
                            name: 'reference2',
                            fieldLabel: 'Reference 2',                                                     
                            //margin: '9 0 3 0',
                            labelWidth: 80,
                            width: 230,
                            colspan: 1,
                            bind: {
                                value: '{theProduct.reference2}'
                            }
                            //fieldLabel: 'Memo'
                        }]
                    }]
                },{
                    xtype: 'style-edit-cost',
                    title: 'Cost Sheets',
                    reference: 'costslist',
                    bind: {
                        selection: '{current.costSheet}',
                        store: '{theProduct.bomhs}'
                    },

                    listeners: {
                        //afterrender: 'onAfterRender',
                        rowdblclick: 'onGridRowDblclick',
                        select: 'onGridRowSelect'
                    }
                },{
                    title: 'Style Photos',
                    reference: 'photos',
                    layout: 'border',

                    items: [{
                        xtype: 'style-edit-upload-toolbar',
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
                        //plugins: "responsive",
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
                    },/*{
                        xtype: 'sample-edit-photos',
                        region: 'center',
                        scrollable: "y",
                        enableTextSelection: false,
                        bind: {
                            store: '{theProduct.smphs}'
                        },
                        listeners: {
                            render: function(c){
                                var toolbar = c.previousSibling('toolbar');

                                toolbar.add(c.fileUpload);
                            },
                            itemdblclick: {
                                fn: 'onPhotoItemDblClick',
                                scope: this.controller
                            }
                        }
                    },*/{
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
                        
                        session: true,
                        
                        bind: {
                            store: '{theProduct.photosInProducts}'
                        },

                        tpl: this.photoUploadTemplate(),

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
                            
                            menuefreshclick: {
                                fn: 'onMenuRefreshClick',
                                scope: this.controller
                            },

                            menuremoveclick: {
                                fn: 'onMenuRemoveClick',
                                scope: this.controller
                            },

                            dropped: {
                                fn: 'onFileDropped',
                                scope: this.controller
                            },

                            itemdblclick: {
                                fn: 'onPhotoItemDblClick',
                                scope: this.controller
                            },

                            select: {
                                fn: 'onPhotoSelect',
                                scope: this.controller
                            },
                            
                            selectionchange: {
                                fn: 'onPhotoSelectionChange',
                                scope: this.controller
                            }
                        }
                    }]

                    /*
                    items: [{
                        xtype: 'dataview',

                        scrollable: "y",
                        loadMask: true,
                        loadingHeight: 300,
                        //trackOver: false,
                        enableTextSelection: false,
                        cls: "sample-photo-view",
                        overItemCls: "x-item-over",
                        itemSelector: "div.thumb-wrap",

                        padding: '7 0 0 7',

                        style: {
                            //borderTop: '1px solid #cfcfcf',
                            borderBottom: '1px solid #cfcfcf'
                        },

                        bind: {
                            store: '{theProduct.smphs}'
                        },

                        tpl: new Ext.XTemplate(
                            '<tpl for=".">',
                            '<div class="thumb-wrap" id="{ID}">',
                            //'<a class="link" href="{linkUrl}">',
                            '<div class="thumb">',
                            '<img class="{F_BFLAG}" src="{[this.getSrcPath(values, xcount)]}?w=174" title="{F_DESC1}" />',
                            //'<div class="{F_BFLAG}">Rejected</div>',
                            '</div>',
                            //'<span>{Title:ellipsis(11)}</span>',
                            //'</a>',
                            '</div>',
                            '</tpl>',
                            '<div class="x-clear"></div>',
                            {
                                getSrcPath: function(a,b){
                                    var str;

                                    if(!Ext.isEmpty(a.F_NAME) && !Ext.isEmpty(a.F_TYPE)) {
                                        //str = '../' + a.F_LINK + a.F_PATH + '/' + a.ID + '/' + a.F_NAME.replace(/(\.[^.]+)$/, "_medium$1");
                                        str = '../' + a.F_LINK + a.F_PATH + '/' + a.ID + '/' + a.F_NAME;
                                    }
                                    else {
                                        str = '../' + a.F_LINK + a.F_PATH + '/' + a.F_LOCATION + a.F_EXT;
                                    }

                                    return str;
                                    //return a.replace(/(\.[^.]+)$/, "_medium$1");
                                }
                            }
                        )
                    }]
                    */
                },{
                    title: 'Attachments',
                    reference: 'attachment',
                    layout: 'border',

                    items: [{
                        xtype: 'style-edit-upload-toolbar',
                        region: 'north',
                        border: '0 0 1 0',
                        listeners: {
                            actremoveall: function(tb, btn){
                                var detail = tb.nextSibling('container#attach-detail'),
                                    view = detail.nextSibling('viewupload');

                                view.fileUpload.filesQueue.length = 0;
                                view.getStore().removeAll();
                            },
                            acttoggle: function(tb, btn, pressed){
                                var detail = tb.nextSibling('container#attach-detail');

                                detail.setHidden(!pressed);
                            }
                        }
                    },{
                        xtype: 'container',
                        itemId: 'attach-detail',
                        //plain: true,
                        //region: 'east',
                        //plugins: "responsive",
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

                        scrollable: true,
                        hidden: true,
                        padding: 14,
                        split: {
                            size: 1
                        },

                        viewModel: {
                            data: {
                                theFile: null
                            }
                        }
                    },{
                        xtype: 'viewupload',

                        selectionModel: {
                            mode: 'multi'
                        },

                        cls: 'sample-attach-view',
                        overItemCls: "x-item-over",
                        itemSelector: "div.thumb-wrap",

                        preserveScrollOnRefresh: true,
                        deferInitialRefresh: true,
                        enableTextSelection: false,

                        scrollable: true,
                        region: 'center',
                        padding: 10,
                        flex: 1,

                        bind: {
                            store: '{theProduct.filesInProducts}'
                        },

                        tpl: new Ext.XTemplate(
                            '<tpl for=".">',
                                '<div class="thumb-wrap x-unselectable">',
                                //'<a class="link" href="{linkUrl}">',
                                    '<div class="thumb rfq-select-{active}">',
                                        //'<img class="{F_BFLAG}" src="resources/images/default.png?w=50" title="{name}" />',
                                        '<i class="far fa-file{type:this.getFileType} fa-5x" style="padding-top:20px;"></i>',
                                        //'<div class="{F_BFLAG}">Rejected</div>',
                                        '<div class="title">{name:this.getFileName}</div>',
                                    '</div>',
                                //'</a>',
                                '</div>',
                            '</tpl>',
                            '<div class="x-clear"></div>',
                            {
                                getFileName: function(v){
                                    var a = v.split('_'),
                                        name = a[0] + ' ' +a[1] + ' ' + a[2];                                    

                                    return Ext.String.ellipsis(name, 30);
                                }
                            },
                            {
                                getFileType: function(v){
                                    var a = ['txt', 'pdf', 'excel', 'word', 'csv'];

                                    for(var i = 0; i < a.length; i++){
                                        if(v.indexOf(a[i]) != -1) {
                                            return '-' + a[i];
                                        }
                                    }

                                    return '';
                                }
                            }
                        ),
                        listeners: {
                            render: function(c){
                                var toolbar = c.previousSibling('toolbar');

                                toolbar.add(c.fileUpload);

                                c.contextmenu.add([{
                                    text: 'Toogle for RFQ',
                                    iconCls: 'x-far fa-check-square',
                                    handler: function(item, e){
                                        Ext.each(c.getSelection(), function(rec, idx, self){
                                            rec.set('active', !rec.data.active);
                                        });

                                    }
                                }]);
                            },
                            menuefreshclick: {
                                fn: 'onMenuRefreshClick',
                                scope: this.controller
                            },

                            menuremoveclick: {
                                fn: 'onMenuRemoveClick',
                                scope: this.controller
                            },
                            itemdblclick: {
                                fn: 'onAttachItemDblClick',
                                scope: this.controller
                            },
                            selectionchange: {
                                fn: 'onItemSelectionChange',
                                scope: this.controller
                            },
                            dropped: {
                                fn: 'onFileDropped',
                                scope: this.controller
                            }
                        }
                    }]
                },{
                    xtype: 'panel',
                    reference: "reqs",
                    title: 'Request For Quote',
                    cls: 'sample-request-view',

                    // Create a session for this view
                    session: true,
                    items: [{
                        xtype: 'style-edit-request',

                        bind: {
                            store: '{theProduct.reqhs}',
                            selection: '{current.quote}'
                        },

                        listeners: {
                            itemdblclick: 'onItemDblClick'
                        }
                    }]

                }],

                listeners: {
                    tabchange: 'onTabChange'
                }
            },{
                xtype: 'dataview',
                title: 'Photos',
                region: 'east',
                //plain: true,
                collapsible: true,
                //scrollable: true,                                

                cls: 'sample-photo-view',
                //overItemCls: "x-item-over",
                itemSelector: "div.thumb-wrap",

                preserveScrollOnRefresh: true,
                deferInitialRefresh: true,
                enableTextSelection: false,

                scrollable: true,
                width: 200,                

                split: {
                    size: 5
                },
                
                style: {
                    border: '1px solid #cfcfcf'
                },

                padding: '7 0 7 7',                

                bind: {
                    store: '{theProduct.photosInProducts}'
                },

                tpl: this.photoTemplate()                
            }]
        });

        me.callParent(arguments);
    },

    photoUploadTemplate: function() {
        return new Ext.XTemplate(
            '<tpl for=".">',
            '<div class="thumb-wrap x-unselectable">',
            //'<a class="link" href="{linkUrl}">',
            '<span class="tag"></span>',
            '<div class="thumb">',
                '<img src="{[this.getSrcPath(values, xcount)]}" width="180" height="270" title="name" alt="name" />',
                '<tpl if="this.isNotEmpty(name)">',
                    '<div class="side"></div>',
                '</tpl>',
            '</div>',
            //'<span>{Title:ellipsis(11)}</span>',
            //'</a>',
            '</div>',
            '</tpl>',
            '<div class="x-clear"></div>',
            {
                isNotEmpty: function(name){
                    return !Ext.isEmpty(name);
                },
                getSrcPath: function(a,b){
                    //var str = 'http://64.136.152.54';
                    var str = 'http://209.37.126.195';
                    if(!Ext.isEmpty(a.name)) {                                            
                        str = str + a.path + '200xImages/' + a.name + '?w=180&h=270&' + Math.random();                        

                    }                    
                    if(a.pid <= 0 && a.path.includes("blob:")){
                        str = a.path;
                    }

                    /*
                    if(a.path){
                        str = a.path;
                    }
                    else {
                        
                    }
                    */

                    return str;
                    //return a.replace(/(\.[^.]+)$/, "_medium$1");
                }
            }
        )
    },

    photoTemplate: function() {
        return new Ext.XTemplate(
            '<tpl for=".">',
            //'<div class="thumb-wrap x-unselectable">',
            //'<a class="link" href="{linkUrl}">',
            //'<span class="tag"></span>',
            //'<div class="thumb">',
                '<tpl if="this.isNotEmpty(path)">',
                    '<img src="{[this.getSrcPath(values, xcount)]}" width="162" title="{name}" alt="{name}" />',
                '</tpl>',
                '<tpl if="this.isNotEmpty(tag)">',
                    '<div class="tag"></div>',
                '</tpl>',
            //'</div>',
            //'<span>{Title:ellipsis(11)}</span>',
            //'</a>',
            '</div>',
            '</tpl>',
            '<div class="x-clear"></div>',
            {
                isNotEmpty: function(s){
                    return !Ext.isEmpty(s);
                },
                getSrcPath: function(a,b){
                    //var str = 'http://64.136.152.54';
                    var str = 'http://209.37.126.195';
                    
                    if(!Ext.isEmpty(a.name)) {                                            
                        str = str + a.path + '200xImages/' + a.name + '?w=162&h=243&' + Math.random();                        

                    }                                        

                    if(a.pid <= 0 && a.path.includes("blob:")){
                        str = a.path;
                    }

                    return str;
                    //return a.replace(/(\.[^.]+)$/, "_medium$1");
                }
            }
        )
    }
});
