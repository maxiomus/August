Ext.define('August.view.pim.Form',{
    extend: 'Ext.form.Panel',

    requires: [
        'August.view.pim.FormController',
        'August.view.pim.FormModel',        
        'August.view.pim.Topbar',
        //'August.view.pim.Toolbar',
        'Ext.data.proxy.Memory',
        'Ext.ux.form.field.Month',
        'Ext.ux.form.MultiUpload',
        'Ext.Responsive'
        //'Ext.ux.toggleslide.ToggleSlide',
        //'Ext.ux.view.Upload'
    ],

    alias: 'widget.pim-form',

    controller: 'pim-form',
    viewModel: {
        type: 'pim-form'
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
        xtype: 'pim-topbar',
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
                reference: 'pimFormTab',

                style: {
                    borderTop: '1px solid #cfcfcf'
                },

                tabPosition: 'left',
                //tabRotation: 2,
                //tabBarHeaderPosition: 0,
                //minTabWidth: 120,

                items: [{
                    tabConfig: {
                        title: 'Product Details'
                    },
                    //itemId: 'information',
                    reference: 'productInfo',
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
                        columnWidth: 0.2,
                        layout: {
                            type: 'table',
                            columns: 1,
                            tableAttrs: {
                                style: {
    
                                }
                            }
                        },                        
                        defaults: {
                            constrain: true,                                                        
                            width: 470,                            
                            //padding: '10 10 0 10'
                        },
                        items: [{
                            xtype: 'label',
                            html: '<b>PRODUCT PHOTO</b>',
                            margin: '0 0 0 0'
                        },
                        {
                            xtype: 'component',
                            name: 'productPhoto',                        
                            //width: 260,                        
                            width: 188,
                            height: 282,
                            style: {
                                //border: '1px solid #cfcfcf'
                            },
                            tpl: new Ext.XTemplate(
                                    '<img style="vertical-align:middle;width:188px;height:282px;" src="https://endlessrose.net:9443/StyleImages/200xImages/{style}_{color}_front.jpg" ',
                                    'onerror="this.onerror=null;this.src=\'https://endlessrose.net:9443/StyleImages/{style}_front.jpg\';" ',                                    
                                    '/>'
                                ),
                            bind: {
                                data: '{theProductDetail}'
                            },
                            listeners: {
                                render: function(c) {
                                    
                                }
                            }
                        }]
                    },{
                        responsiveCls: 'small-100',
                        //width: '30%',
                        columnWidth: 0.3,
                        layout: {
                            type: 'table',
                            columns: 1,
                            tableAttrs: {
                                
                            }
                        },
                        defaultType: 'combobox',
                        defaults: {
                            constrain: true,
                            margin: '0 8px 2px 0',
                            width: 470,
                            //labelAlign: 'top',
                            labelWidth: 125
                            //padding: '0 0 3px 0'
                        },
                        items: [{
                            xtype: 'label',                            
                            html: '<b>PRODUCT STYLE</b>',                                                        
                            //flex: 1,                            
                        },{
                            xtype: 'combo',
                            name: 'categoryCode',                            
                            fieldLabel: 'Product Category',
                            fieldCls: 'required',                            
                            displayField: 'label',
                            valueField: 'value',
                            margin: '10px 0 10px 0',
                            editable: false,
                            allowBlank: false,
                            forceSelection: true,
                            //publishes: 'value',
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            plugins: [{
                                ptype: "cleartrigger"
                            }],
                            bind: {
                                store: '{productCategories}',
                                selection: '{selectedType}',
                                value: '{theProductDetail.categoryCode}'
                            },
                            listeners: {
                                triggerClear: {
                                    fn: 'onTriggerClear',
                                    scope: this.controller
                                }    
                            }
                        },{
                            xtype: 'label',                            
                            html: '<b>PRODUCT INFO</b>',                                                        
                            //flex: 1,                            
                        },{
                            xtype: "combo",
                            name: 'style',
                            reference: 'style',                            
                            fieldLabel: 'N41 Style #',                            
                            fieldCls: 'required',                            
                            margin: '10px 8px 2px 0',                                                        
                            //autoSelect: false,
                            //hideTrigger: true,
                            //publishes: 'value',
                            displayField: 'label',
                            valueField: 'value',                            
                            bind: {
                                readOnly: '{isEdit}',
                                value: '{theProductDetail.style}'
                            },
                            store: 'memStyles',
                            remoteStore: 'Styles',
                            //matchFieldWidth: false,
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
                                width: 470
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
                            fieldLabel: 'N41 Color',
                            //fieldStyle: 'text-transform:uppercase',
                            fieldCls: 'required',                            
                            width: 470,
                            //hideTrigger: false,
                            //publishes: 'value',
                            valueField: 'value',
                            displayField: 'label',
                            bind: {
                                readOnly: '{isEdit}',
                                value: '{theProductDetail.color}'
                            },
                            store: 'memColors',
                            remoteStore: 'Colors',
                            //matchFieldWidth: false,
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
                            xtype: "combo",
                            name: 'colorCode',
                            reference: 'colorCode',
                            fieldLabel: 'NRF Color Code',
                            //fieldStyle: 'text-transform:uppercase',
                            fieldCls: 'required',
                            hidden: true,                            
                            //hideTrigger: false,
                            //publishes: 'value',
                            valueField: 'value',
                            displayField: 'label',
                            bind: {
                                readOnly: '{isEdit}',
                                value: '{theProductDetail.colorCode}'
                            },
                            store: 'memColors',
                            remoteStore: 'Colors',
                            matchFieldWidth: false,
                            autoLoadOnValue: true,
                            allowBlank: true,
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
                            xtype: 'textarea',
                            name: 'longDescription',
                            reference: 'longDescription',
                            fieldLabel: 'Long Description',             
                            fieldCls: 'required',                                           
                            allowBlank: true,
                            //flex: 1,
                            bind: {
                                value: '{theProductDetail.longDescription}'
                            }
                        },{
                            xtype: 'textarea',
                            name: 'longDescription1',
                            reference: 'longDescription1',
                            fieldLabel: 'Long Description - French',             
                            fieldCls: 'required',                                           
                            allowBlank: true,
                            //flex: 1,
                            bind: {
                                value: '{theProductDetail.longDescription1}'
                            }
                        },{
                            xtype: 'textarea',
                            name: 'feature1',
                            fieldLabel: 'Features Bullet 1',               
                            fieldCls: 'required',            
                            allowBlank: true,                             
                            //flex: 1,
                            bind: {
                                value: '{theProductDetail.feature1}'
                            }
                        },{
                            xtype: 'textarea',
                            name: 'feature2',
                            fieldLabel: 'Features Bullet 2',                            
                            fieldCls: 'required',
                            allowBlank: true,
                            //flex: 1,
                            bind: {
                                value: '{theProductDetail.feature2}'
                            }
                        },{
                            xtype: 'textarea',
                            name: 'feature3',
                            fieldLabel: 'Features Bullet 3',         
                            fieldCls: 'required',    
                            allowBlank: true,
                            //flex: 1,
                            bind: {
                                value: '{theProductDetail.feature3}'
                            }
                        },{
                            xtype: 'textarea',
                            name: 'feature4',
                            fieldLabel: 'Features Bullet 4',                            
                            fieldCls: 'emphasized',    
                            allowBlank: true,                        
                            //flex: 1,
                            bind: {
                                value: '{theProductDetail.feature4}'
                            }
                        },{
                            xtype: 'textarea',
                            name: 'feature5',
                            fieldLabel: 'Features Bullet 5', 
                            fieldCls: 'emphasized',
                            allowBlank: true,
                            //flex: 1,
                            bind: {
                                value: '{theProductDetail.feature5}'
                            }
                        }]
                    },
                    {
                        responsiveCls: 'small-100',
                        //width: '40%',
                        columnWidth: 0.3,
                        layout: {
                            type: 'table',
                            columns: 1,
                            tableAttrs: {
                                style: {

                                }
                            }
                        },
                        defaultType: 'combobox',
                        defaults: {                            
                            width: 470,
                            labelWidth: 125,                                                        
                            // Remove spinner buttons, and arrow key and mouse wheel listeners                            
                            //minHeight: 720,
                            margin: '0 8px 2px 0'
                            //padding: '0 0 3px 0'
                        },
                        items: [{
                            xtype: 'label'                                                                 
                            //flex: 1,                            
                        },
                        {
                            xtype: 'combo',
                            name: 'productStyle',
                            fieldLabel: "Product's Style",
                            fieldCls: 'required',
                            displayField: 'label',
                            valueField: 'value',
                            margin: '10px 0 10px 0',
                            editable: true,
                            allowBlank: true,
                            disabled: true,
                            //forceSelection: true,                            
                            minChars: 1,                            
                            //queryParam: 'filter',
                            //triggerAction: 'all',                            
                            queryMode: 'local',                                                        
                            //cls: 'combo-chaining-state',
                            plugins: [{
                                ptype: "cleartrigger"
                            }],
                            bind: {                                
                                store: '{productStyles}',
                                value: '{theProductDetail.productStyle}',
                                disabled: '{!selectedType.value}',
                                filters: {
                                    property: 'type',
                                    value: '{selectedType.value}'
                                }                                
                            }
                        },{
                            xtype: 'label',                            
                            html: ''                                                                      
                            //flex: 1,                            
                        },{
                            xtype: 'combo',
                            name: 'ageGroup',
                            fieldLabel: 'Age Group',
                            fieldCls: 'required',
                            displayField: 'label',
                            valueField: 'value',                            
                            margin: '10px 8px 2px 0',
                            editable: false,
                            //selectOnFocus: true,
                            forceSelection: true,
                            //msgTarget: 'side',
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{ageGroups}',
                                value: '{theProductDetail.ageGroup}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'numberfield',
                            name: 'msrp',
                            fieldLabel: 'M.S.R.P',
                            fieldCls: 'required',                            
                            allowBlank: true,
                            minValue: 0,
                            //selectOnFocus: true,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            //flex: 1,
                            bind: {
                                value: '{theProductDetail.msrp}'
                            }
                        },{
                            xtype: 'textarea',
                            name: 'materialCode',
                            reference: 'materialCode',
                            fieldLabel: 'Product Material',             
                            fieldCls: 'required',
                            allowBlank: true,
                            //flex: 1,
                            bind: {
                                value: '{theProductDetail.materialCode}'
                            }
                        },{
                            xtype: 'combo',
                            name: 'sizeCode',
                            fieldLabel: 'Size Code',
                            fieldCls: 'required',
                            displayField: 'label',
                            valueField: 'value',
                            editable: false,
                            hidden: true,
                            //selectOnTab: true,
                            //allowBlank: true,
                            //forceSelection: true,
                            //msgTarget: 'side',
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            //store: ['ACTIVE', 'INACTIVE', 'REQUEST'],                            
                            bind: {
                                store: '{sizes}',
                                value: '{theProductDetail.sizeCode}'
                            }
                        },{
                            xtype: 'textarea',
                            name: 'dimensions',
                            fieldLabel: 'Product Dimensions',
                            fieldCls: 'required',                            
                            //flex: 1,
                            bind: {
                                value: '{theProductDetail.dimensions}'
                            }
                        },{
                            xtype: 'combo',
                            name: 'taxCode',
                            fieldLabel: 'Tax Code',
                            //fieldCls: 'required',
                            displayField: 'label',
                            valueField: 'value',
                            
                            //selectOnFocus: true,
                            editable: false,
                            //allowBlank: false,
                            forceSelection: true,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            plugins: [{
                                ptype: "cleartrigger"
                            }],
                            bind: {
                                store: '{taxCodes}',
                                value: '{theProductDetail.taxCode}'
                            },
                            listeners: {
                                
                            }
                        },{
                            xtype: 'combo',
                            name: 'warranty',
                            fieldLabel: 'Warranty',
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
                                store: '{warrantys}',
                                value: '{theProductDetail.warranty}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'combo',
                            name: 'origin',
                            fieldLabel: 'Origin',
                            fieldCls: 'required',
                            displayField: 'label',
                            valueField: 'value',
                            value: 'Imported',
                            //selectOnFocus: true,
                            editable: false,
                            autoLoadOnValue: true,
                            forceSelection: false,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{coos}',
                                value: '{theProductDetail.origin}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'textarea',
                            name: 'keywords',
                            fieldLabel: 'Generic Keywords',                            
                            fieldCls: 'emphasized',                                     
                            //flex: 1,
                            bind: {
                                value: '{theProductDetail.keywords}'
                            }
                        },
                        /*
                        {
                            xtype: 'tagfield',
                            name: 'keywords',
                            reference: 'keywords',
                            fieldLabel: 'Generic Keywords',    
                            fieldCls: 'emphasized',                 
                            valueField: 'value',
                            displayField: 'label',                            
                            emptyText: 'Keywords',
                            //width: '50%',
                            //maxWidth: 600,
                            forceSelection: false,
                            autocomplete: 'off',
                            createNewOnEnter: true,
                            //matchFieldWidth: false,
                            //labelWidth: 63,
                            //labelPad: 1,
                            //grow: false,
                            filterPickList: true,
                            //autoLoadOnValue: true,
                            enableKeyEvents: true,
                            //minChar: 1,
                            queryMode: 'local',
                            
                            bind: {                                                   
                                //visible: '{brand.value}',                        
                                value: '{theProductDetail.keywords}'
                            },       
        
                            plugins: [{
                                ptype: "cleartrigger"
                            }],

                            listeners: {
                                change: function(c, rec){
                                    //c.fireEvent('triggersearch', c, c.getValue());
                                },
                                render: function(c){
                                    c.on('specialkey', function(f, e){
                                        if (e.getKey() == e.ENTER) {
                                            //c.fireEvent('triggersearch', c, c.getValue());
                                        }
                                    }, c, {
                                        buffer: 10
                                    });
                                }                                
                            }
                        },
                        */
                        {
                            xtype: "combo",
                            name: 'theme',
                            //itemId: "Prints",
                            fieldLabel: 'Theme',
                            fieldCls: 'emphasized',
                            //publishes: 'value',
                            displayField: 'label',
                            valueField: 'value',                            
                            bind: {
                                store: '{themes}',
                                value: '{theProductDetail.theme}'
                            },                            
                            //matchFieldWidth: false,
                            //autoLoadOnValue: true,
                            //allowBlank: true,
                            forceSelection: false,
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
                            xtype: 'combo',
                            name: 'pattern',                            
                            fieldLabel: 'Pattern',
                            fieldCls: 'emphasized',
                            displayField: 'label',
                            valueField: 'value',
                            //selectOnFocus: true,
                            editable: false,
                            //autoLoadOnValue: true,
                            forceSelection: false,
                            //minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{patterns}',
                                value: '{theProductDetail.pattern}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'combo',
                            name: 'occasion',                            
                            fieldLabel: 'Occasion',
                            fieldCls: 'emphasized',
                            displayField: 'label',
                            valueField: 'value',
                            //selectOnFocus: true,
                            editable: false,
                            forceSelection: false,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{occasions}',
                                value: '{theProductDetail.occasion}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'combo',
                            name: 'legal',
                            fieldLabel: 'Legal Warning',                            
                            displayField: 'label',
                            valueField: 'value',
                            //selectOnFocus: true,
                            editable: true,
                            forceSelection: false,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{legals}',
                                value: '{theProductDetail.legal}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'textfield',
                            name: 'prop65',
                            reference: 'prop65',
                            fieldLabel: 'Prop 65 Warning',             
                            //fieldCls: 'required',
                            //flex: 1,
                            bind: {
                                value: '{theProductDetail.prop65}'
                            }
                        }]
                    },
                    {
                        responsiveCls: 'small-100',
                        //width: '40%',
                        columnWidth: 0.3,
                        layout: {
                            type: 'table',
                            columns: 1,
                            tableAttrs: {
                                style: {

                                }
                            }
                        },
                        defaultType: 'combobox',
                        defaults: {                            
                            width: 470,
                            labelWidth: 125,                                                        
                            // Remove spinner buttons, and arrow key and mouse wheel listeners                            
                            //minHeight: 720,
                            margin: '0 8px 2px 0'
                            //padding: '0 0 3px 0'
                        },
                        items: [{
                            xtype: 'label',                            
                            html: ''                                                                      
                            //flex: 1,                            
                        },
                        /*
                        {
                            xtype: 'combo',
                            name: 'dressStyle',
                            fieldLabel: 'Dress Style',
                            displayField: 'label',
                            valueField: 'value',
                            //selectOnFocus: true,
                            margin: '10px 8px 2px 0',
                            editable: false,
                            forceSelection: true,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{dressStyles}',
                                value: '{theProductDetail.dressStyle}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'combo',
                            name: 'blazerStyle',
                            fieldLabel: 'Blazer Style',
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
                                store: '{blazerStyles}',
                                value: '{theProductDetail.blazerStyle}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'combo',
                            name: 'coatStyle',
                            fieldLabel: 'Coat Style',
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
                                store: '{coatStyles}',
                                value: '{theProductDetail.coatStyle}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'combo',
                            name: 'pantStyle',
                            fieldLabel: 'Pant Style',
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
                                store: '{pantStyles}',
                                value: '{theProductDetail.pantStyle}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'combo',
                            name: 'shortStyle',
                            fieldLabel: 'Short Style',
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
                                store: '{shortStyles}',
                                value: '{theProductDetail.shortStyle}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'combo',
                            name: 'skirtStyle',
                            fieldLabel: 'Skirt Style',
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
                                store: '{skirtStyles}',
                                value: '{theProductDetail.skirtStyle}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'combo',
                            name: 'topStyle',
                            fieldLabel: 'Top Style',
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
                                store: '{topStyles}',
                                value: '{theProductDetail.topStyle}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'combo',
                            name: 'suitStyle',
                            fieldLabel: 'Suit Style',
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
                                store: '{suitStyles}',
                                value: '{theProductDetail.suitStyle}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'combo',
                            name: 'sweaterStyle',
                            fieldLabel: 'Sweater Style',
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
                                store: '{sweaterStyles}',
                                value: '{theProductDetail.sweaterStyle}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },
                        */
                        {
                            xtype: 'combo',
                            name: 'care',
                            fieldLabel: 'Care Instructions',
                            fieldCls: 'required',
                            displayField: 'label',
                            valueField: 'value',
                            margin: '66px 8px 2px 0',
                            //selectOnFocus: true,
                            allowBlank: true,
                            editable: true,
                            forceSelection: false,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{cares}',
                                value: '{theProductDetail.care}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'combo',
                            name: 'specialSize',
                            fieldLabel: 'Special Size',
                            fieldCls: 'required',
                            displayField: 'label',
                            valueField: 'value',
                            value: 'Regular',
                            allowBlank: true,
                            //selectOnFocus: true,
                            editable: false,
                            forceSelection: false,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{specialSizes}',
                                value: '{theProductDetail.specialSize}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                            //store: 'type'
                        },
                        {
                            xtype: 'combo',
                            name: 'sleeveLength',
                            fieldLabel: 'Sleeve Length',
                            //fieldCls: 'required',
                            displayField: 'label',
                            valueField: 'value',
                            //selectOnFocus: true,                            
                            editable: false,
                            forceSelection: false,
                            minChars: 1,
                            //matchFieldWidth: false,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{sleeveLengths}',
                                value: '{theProductDetail.sleeveLength}'
                            },
                            listConfig: {
                                loadindText: 'Searching...',
                                emptyText: 'No matching items found.',
                                width: 340
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },
                        {
                            xtype: 'textfield',
                            name: 'chestSize',
                            fieldLabel: 'Chest Size',                            
                            width: 470,
                            //flex: 1,
                            bind: {
                                value: '{theProductDetail.chestSize}'
                            }
                        },{
                            xtype: 'textfield',
                            name: 'waistSize',
                            fieldLabel: 'Waist Size',
                            width: 470,
                            //flex: 1,
                            bind: {
                                value: '{theProductDetail.waistSize}'
                            }
                        },                                                
                        {
                            xtype: 'combo',
                            name: 'neckline',
                            fieldLabel: 'Neckline',
                            displayField: 'label',
                            valueField: 'value',
                            //selectOnFocus: true,
                            editable: true,
                            forceSelection: false,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{necklines}',
                                value: '{theProductDetail.neckline}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'combo',
                            name: 'length',
                            fieldLabel: 'Length Type',
                            displayField: 'label',
                            valueField: 'value',
                            //selectOnFocus: true,
                            editable: false,
                            forceSelection: false,
                            //minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{lengths}',
                                value: '{theProductDetail.length}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'combo',
                            name: 'fitType',
                            fieldLabel: 'Fit Type',
                            displayField: 'label',
                            valueField: 'value',
                            //selectOnFocus: true,
                            editable: true,
                            forceSelection: false,
                            //minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{fitTypes}',
                                value: '{theProductDetail.fitType}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'combo',
                            name: 'waistFit',
                            fieldLabel: 'Waist Fit',
                            displayField: 'label',
                            valueField: 'value',
                            //selectOnFocus: true,
                            editable: false,
                            forceSelection: false,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{waistFits}',
                                value: '{theProductDetail.waistFit}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'combo',
                            name: 'washType',
                            fieldLabel: 'Wash Type',
                            displayField: 'label',
                            valueField: 'value',
                            //selectOnFocus: true,
                            editable: false,
                            forceSelection: false,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',                            
                            bind: {
                                store: '{washTypes}',
                                value: '{theProductDetail.washType}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'combo',
                            name: 'legStyle',                            
                            fieldLabel: 'Leg Style',
                            displayField: 'label',
                            valueField: 'value',
                            editable: false,                            
                            //selectOnTab: true,
                            forceSelection: false,
                            //msgTarget: 'side',
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',                                                    
                            bind: {                
                                store: '{legStyles}',          
                                value: '{theProductDetail.legStyle}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'combo',
                            name: 'closureType',
                            fieldLabel: 'Closure Type',
                            //fieldCls: 'required',
                            displayField: 'label',
                            valueField: 'value',
                            //selectOnFocus: true,
                            editable: false,
                            forceSelection: false,
                            //minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{closureTypes}',
                                value: '{theProductDetail.closureType}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'combo',
                            name: 'pocket',
                            fieldLabel: 'Pocket Type',
                            displayField: 'label',
                            valueField: 'value',
                            selectOnFocus: true,
                            editable: true,
                            //allowBlank: true,
                            forceSelection: false,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{pockets}',
                                value: '{theProductDetail.pocket}'
                            }
                        },{
                            xtype: 'combo',
                            name: 'bodyType',                            
                            fieldLabel: 'Body Type',
                            displayField: 'label',
                            valueField: 'value',                                                        
                            //selectOnFocus: true,
                            editable: true,
                            forceSelection: false,                            
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{bodyTypes}',
                                value: '{theProductDetail.bodyType}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }],
                            listeners: {
                                
                            }
                        },{
                            xtype: 'combo',
                            name: 'beltType',                            
                            fieldLabel: 'Belt Type',
                            displayField: 'label',
                            valueField: 'value',                                                        
                            //selectOnFocus: true,
                            editable: true,
                            forceSelection: false,                            
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{beltTypes}',
                                value: '{theProductDetail.beltType}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }],
                            listeners: {
                                
                            }
                        },{
                            xtype: 'combo',
                            name: 'collarType',                            
                            fieldLabel: 'Collar Type',
                            displayField: 'label',
                            valueField: 'value',                                                        
                            //selectOnFocus: true,
                            editable: true,
                            forceSelection: false,                            
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{collarTypes}',
                                value: '{theProductDetail.collarType}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }],
                            listeners: {
                                
                            }
                        }]
                    }]
                },{
                    xtype: "grid",
                    reference: "photo-grid",
                    //scrollable: true,
                    session: true,
                    title: 'Product Photos',

                    flex: 1,
                    //height: 360,                    
                    style: {
                        //borderTop: '1px solid #cfcfcf',
                        //borderBottom: '1px solid #cfcfcf'
                    },                      
                    
                    bind: {
                        selection: '{selection}',
                        store: '{theProductDetail.photosInProductDetails}'
                    },

                    columns: me.buildColumns(),  
                
                    cls: "pim-photo-grid",

                    stateful: true,
                    
                    stateId: "productdetail-photo-grid",
                    //stateEvents: ["columnmove","columnresize","columnshow","columnhide"],                
                    // We do not need automatic height synching.                

                    selModel: {
                        //selType: 'checkboxmodel',
                        pruneRemoved: false
                    },
        
                    viewConfig: {
                        stripeRows: true,
                        trackOver: true,                    

                        plugins: {
                            //ddGroup: 'photo-group',
                            ptype: 'gridviewdragdrop',
                            //enableDrop: true,
                            dragText: 'Drag and drop to reorganize'
                        },

                        listeners: {
                            drop: function(node, data, dropRec, dropPosition){
                                var store = data.view.grid.store;
                
                                store.each(function(rec){
                                    rec.set('position', (store.indexOf(rec) + 1));
                                });                                
                                
                                store.sync({
                                    success: function(batch, op){
                                        //Ext.Msg.alert('Status', 'Changes saved successfully.');
                                    },
                                    failure: function(batch, op){
                                        //console.log(op);                                        
                                    },
                                    callback: function(batch, op){
                                        
                                    }
                                });
                                
                            }
                        }
                    },                

                    plugins: [{
                        ptype: 'rowediting',
                        pluginId: 'photoGridRowEdit',
                        clicksToMoveEditor: 1,                    
                        //errorSummary: false,
                        autoCancel: false,
                    }],

                    //bbar: me.buildBottomBar(),

                    listeners: {                    
                        render: {
                            fn: 'onPhotoGridRender',
                            scope: this.controller
                        },
                        itemcontextmenu: {
                            //fn: 'onItemContextMenu',
                            //scope: this.controller
                        },
                        select: {
                            //fn: 'onRowSelect',
                            //scope: this.controller
                        },                    
                        cellclick: {
                            //fn: 'onGridCellClick',
                            //scope: this.controller
                        }
                    }
                                         
                }],

                listeners: {
                    tabchange: 'onTabChange'
                }
            }]
        });

        me.callParent(arguments);
    },

    buildColumns: function(){

        return [{
            text: 'Photo ID',
            dataIndex: 'id',
            menuDisabled: true,
            fixed: true,
            width: 30,
            sortable: false,
            hidden: true
        },{
            text: 'Style # / Color',            
            dataIndex: 'style',            
            width: 300,
            sortable: false,
            hidden: false,
            renderer: function (value, p, rec) {
                var tpl = '<div class="thumb-wrap">' + 
                            '<div class="thumb">' + 
                                '<img style="vertical-align:bottom;margin-left:4px;width:78px;" src="https://jirho.com:9443/Images/{0}" />' + 
                            '</div>' +                            
                          '</div>' + 
                          '<div style="padding: 10px 0 2px 0;">{1}</div>' + 
                          '<div>{2}</div>';

                //var xf = Ext.util.Format;                                

                if (!Ext.isEmpty(rec)) {                    
                    //metadata.tdAttr = 'data-qtip="' + Ext.String.format(tpl, value, "?w=264&h=288", record.data.BODYIMG) + '"';
                    //var tmp = '<img src="../DLIB/BLU-ILLUSTRATIONS/{0}.jpg?w=264&h=288" />';
                    //metadata.tdAttr = 'data-qtip="' + Ext.String.format(tmp, value) + '"';
                    //return Ext.String.format(tpl, encodeURIComponent(images.first().data.src));

                    return Ext.String.format(tpl, rec.get('name'), value, rec.get('color'));
                }

                return value;
            }
        },{
            text: 'Color',            
            dataIndex: 'color',            
            width: 100,
            hidden: true,
            sortable: false
        },{
            text: 'File Name',
            dataIndex: 'name',            
            width: 380,
            sortable: false,            
            hidden: false
        },{
            text: 'Position',
            dataIndex: 'position',
            menuDisabled: true,
            width: 80,
            sortable: false,            
            hidden: false
        },{
            text: 'Type',
            dataIndex: 'type',
            sortable: false,            
            hidden: true
        },{
            text: 'Size',
            dataIndex: 'size',
            menuDisabled: true,
            sortable: false,
            hidden: true,
            formatter: 'fileSize'
        },{
            text: 'Tag',
            dataIndex: 'tag',
            menuDisabled: true,
            flex: 1,
            sortable: false,            
            hidden: false,
            editor: {
                xtype: 'textfield'
            },
        },{
            text: 'User ID',
            dataIndex: 'userId',
            menuDisabled: true,            
            sortable: false,            
            hidden: false
        },{
            xtype: 'datecolumn',
            text: 'Updated',
            dataIndex: 'updateTime',
            menuDisabled: true,
            sortable: false,            
            hidden: true,
            format: 'MM-dd-yyyy'
        },{
            xtype: 'datecolumn',
            text: 'Last Modified',
            dataIndex: 'lastmod',
            menuDisabled: true,
            sortable: false,            
            hidden: true,
            format: 'MM-dd-yyyy'
        },{
            xtype: 'actioncolumn',
            text: '<i class="x-fa fa-times-circle fa-lg red-txt"></i>',
            //iconCls: 'x-fa fa-close red-txt',
            width: 50,
            align: 'center',
            menuDisabled: true,
            sortable: false,
            items: [{
                //icon: 'resources/images/shared/icon-error.png',
                //glyph: 45,
                //ui: 'default',
                iconCls: 'x-fa fa-minus-circle red-txt',
                tooltip: 'Remove',
                handler: function(view, rowIndex, colIndex) {
                    //var store = grid.getStore();
                    //store.removeAt(rowIndex);
                    var field = view.grid.up('multiupload').fileUpload,
                        rec = view.getStore().getAt(rowIndex);
                    rec.drop();
                    //view.grid.getSelectionModel().deselectAll();
                    //console.log(rec.id * -1 - 1)
                    if(rec.phantom){
                        field.removeFileFromQueue(rec.id * -1 - 1)
                    }
                }
            }]
        }];
    }

    /*
    photoUploadTemplate: function() {
        return new Ext.XTemplate(
            '<tpl for=".">',
            '<div class="thumb-wrap x-unselectable">',
            //'<a class="link" href="{linkUrl}">',
            '<span class="tag"></span>',
            '<div class="thumb">',
                '<img src="{[this.getSrcPath(values, xcount)]}" width="180" height="270" title="name" alt="name" ',
                    'onerror="{[this.onError(values, xcount)]}" ',
                '/>',
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
                onError: function(a,b) {                                        
                    return "this.onerror=null;this.src='https://209.37.126.195" + a.path + a.name + "?w=162&h=243&" + Math.random() + "'; "
                },
                getSrcPath: function(a,b){
                    console.log("photo template", a);                    
                    var str = 'https://209.37.126.195';
                    if(!Ext.isEmpty(a.name)) {                                            
                        str = str + a.path + '200xImages/' + a.name + '?w=180&h=270&' + Math.random();                        
                        //str = str + a.path + '200xImages/' + a.name + '?w=180&h=270'; 
                    }                    
                    if(a.pid <= 0 && a.path.includes("blob:")){
                        str = a.path;
                    }                    

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
                    '<img class="stylePhotos" src="{[this.getSrcPath(values, xcount)]}" width="224px" title="{name}" alt="{name}" ',
                        'onerror="{[this.onError(values, xcount)]}" ',
                    '/>' ,
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
                checkImg: function(a,b){
                    return "";
                },
                isNotEmpty: function(s){
                    return !Ext.isEmpty(s);
                },
                onError: function(a,b) {                                        
                    return "this.onerror=null;this.src='http://209.37.126.195" + a.path + a.name + "?w=162&h=243&" + Math.random() + "'; "
                },
                getSrcPath: function(a,b){
                    //var str = 'http://64.136.152.54';                    
                    var str = 'http://209.37.126.195';
                    
                    if(!Ext.isEmpty(a.name)) {                                            
                        str = str + a.path + '200xImages/' + a.name + '?w=162&h=243&' + Math.random();                        
                        //str = str + a.path + '200xImages/' + a.name + '?w=162&h=243';

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
    */
});
