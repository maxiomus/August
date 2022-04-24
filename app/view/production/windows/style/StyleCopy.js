/**
 * Created by tech on 10/9/2014.
 */
Ext.define('August.view.production.windows.style.StyleCopy', {
    extend: 'Ext.window.Window',

    requires: [
        'August.view.production.windows.style.StyleCopyController',
        'August.view.production.windows.style.StyleCopyModel',
        'Ext.view.MultiSelector',
        'Ext.ux.form.ItemSelector'
    ],

    alias: 'widget.windows-style-stylecopy',

    controller: "windows-style-stylecopy",
    viewModel: {
        type: "windows-style-stylecopy"
    },

    layout: {
        type: 'fit'
    },

    header: {
        title: 'Add New Colors to Style',
        iconCls: 'x-fa fa-copy',
        titlePosition: 0,
        titleAlign: 'left'
    },

    padding: 10,

    bind: {
        title: '{title}'
    },

    width: 720,
    height: 480,
    minWidth: 720,
    minHeight: 480,

    //modal: true,
    monitorResize: true,
    maximizable: true,
    constrain: true,
    closable: true,

    tools: [{
        type: 'pin'
    }],

    initComponent: function() {
        var me = this;

        // Calculating the textfield height...
        var field = new Ext.form.field.Text({
                renderTo: document.body
            }), fieldHeight = field.getHeight(),
            padding = 5,
            remainingHeight;

        field.destroy();
        remainingHeight = padding + fieldHeight * 5;

        /*
        var colors = Ext.create('Ext.data.Store', {
            //storeId: 'memMyColors',
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

        var remoteColors = Ext.create('Ext.data.Store', {
            model: 'Color',

            pageSize: 0,
            autoLoad: true,

            remoteFilter: true,

            proxy: {
                type: 'ajax',
                url: '/api/Options/colors',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                    //totalProperty: 'total',
                    //successProperty: 'success'
                }
            },

            listeners: {
                load: function(s){

                    colors.getProxy().setData(s.getRange());
                    colors.load();

                }
            }
        });
        */

        Ext.applyIf(me, {

            items: [{
                xtype: 'form',
                layout: {
                    type: 'anchor'
                },
                defaults: {
                    margin: '0 0 10 0'
                },
                items: [{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',          
                    defaults: {
                        labelWidth: 50,
                    },       
                    fieldDefaults: {
                        margin: '0 15 0 0'
                    },
                    items:[{
                        xtype: 'textfield',
                        name: 'style',
                        fieldLabel: 'Style #',
                        readOnly: true,
                        tabIndex: 0,
                        bind: {
                            value: '{selected.style}'
                        }
                    },{
                        xtype: 'textfield',
                        name: 'color',
                        fieldLabel: 'Color',    
                        readOnly: true,
                        tabIndex: 1,                    
                        bind: {
                            value: '{selected.color}'
                        }
                    },
                    /*
                    {
                        xtype: 'combo',
                        name: 'color',
                        fieldLabel: 'Color',                        
                        hideTrigger: true,
                        allowBlank: true,
                        readOnly: true,
                        tabIndex: 1,
                        bind: {                            
                            value: '{selected.color}'
                        },
                        store: 'memColors',
                        remoteStore: 'Colors',
                        queryMode: 'local',
                        valueField: 'value',
                        displayField: 'label',
                        editable: false,
                        selectOnFocus: false,
                        selectOnTab: false,
                        //typeAhead: true,
                        //forceSelection: true,
                        //minChars: 1,
                        matchFieldWidth: true,
                        pageSize: 50,
                        listConfig: {
                            width: 340,
                            loadingText: 'Searching....',
                            emptyText: '<p style="padding-left: 5px;">No match found.</p>'

                            // Custom rendering template for each item
                        }
                    },
                    */
                    {
                        xtype: 'combo',
                        name: 'bomno',
                        
                        fieldLabel: 'C.S #',
                        labelWidth: 40,
                        width: 100,
                        margin: '0 0 0 5',
                        tabIndex: 2,
                        store: 'Bomnos',
                        bind: {
                            value: '{selected.bomno}',
                            disabled: '{!chkCopyCS.checked}'
                        },
                        displayField: 'label',
                        valueField: 'value',                        
                        editable: false,
                        forceSelection: true,
                        //minChars: 1,
                        matchFieldWidth: true,
                        queryMode: 'local',
                        //pageSize: 15,
                        //queryDelay: 500,
                        allowBlank: false,
                        listeners: {
                            beforequery: {
                                fn: function(qe){
                                    //console.log(qe.combo, qe.combo.ownerCt, qe.combo.ownerCt.previousSibling('fieldcontainer'))

                                    //delete qe.combo.lastQuery;
                                }
                            }
                        }
                    }]
                },{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',                    
                    defaultType: 'checkbox',
                    fieldDefaults: {
                        margin: '0 15 0 0',
                    },
                    defaults: {
                        width: 100,
                    },
                    items: [{                        
                        name: 'copyCS',
                        fieldLabel: '',
                        //labelWidth: 60,
                        width: 80,
                        inputValue: true,
                        disabled: true,
                        boxLabel: 'Copy C.S',
                        reference: 'chkCopyCS',
                        tabIndex: 3,
                        listeners: {
                            change: function(c, n, o){

                                var previous = c.ownerCt.previousSibling('fieldcontainer'),
                                    cboStyle = previous.down('combo[name="style"]'),
                                    cboColor = previous.down('combo[name="color"]'),
                                    cboBomno = c.ownerCt.down('combo[name="bomno"]'),
                                    store = cboBomno.getStore();


                                Ext.apply(store.getProxy().extraParams, {
                                    style: cboStyle.getValue().trim(),
                                    color: cboColor.getValue().trim()
                                });

                                store.load({
                                    callback: function(){
                                        //qe.combo.select(store.first());
                                        //colorCombo.fireEvent('select', combo, [store.first()]);
                                    }
                                });
                            }
                        }
                    },                    
                    {
                        xtype: 'combo',
                        name: 'bomno',
                        reference: 'numCS',
                        fieldLabel: 'C.S #',
                        labelWidth: 40,
                        width: 100,                        
                        tabIndex: 4,
                        store: [1,2,3,4,5,6,7,8,9,10],
                        bind: {
                            disabled: '{!chkCopyCS.checked}'
                        },
                        displayField: 'label',
                        valueField: 'value',

                        editable: false,
                        forceSelection: true,
                        //minChars: 1,
                        matchFieldWidth: true,
                        queryMode: 'local',
                        //pageSize: 15,
                        //queryDelay: 500,
                        allowBlank: false,
                        listeners: {
                            beforequery: {
                                fn: function(qe){
                                    //console.log(qe.combo, qe.combo.ownerCt, qe.combo.ownerCt.previousSibling('fieldcontainer'))

                                    //delete qe.combo.lastQuery;
                                }
                            }
                        }
                    },                    
                    {                        
                        name: 'copyImages',
                        fieldLabel: '',
                        //labelWidth: 60,                        
                        margin: '0 15 0 5',
                        inputValue: true,
                        hidden: false,
                        tabIndex: 5,
                        boxLabel: 'Copy Images',
                        reference: 'chkCopyImages'
                    },
                    {                        
                        name: 'copyPrices',
                        fieldLabel: '',
                        //labelWidth: 60,                        
                        inputValue: true,
                        hidden: false,
                        tabIndex: 6,
                        boxLabel: 'Copy Prices',
                        reference: 'chkCopyPrices'
                    },
                    {                    
                        name: 'copyCosts',
                        fieldLabel: '',
                        //labelWidth: 60,                        
                        inputValue: true,
                        hidden: false,
                        tabIndex: 7,
                        boxLabel: 'Copy Costs',
                        reference: 'chkCopyCosts'
                    }]
                },
                {
                    xtype: 'checkbox',
                    name: 'chkNewStyle',
                    fieldLabel: '',
                    //labelWidth: 85,
                    tabIndex: 8,
                    inputValue: true,
                    boxLabel: 'New Style #:',
                    reference: 'chkNewStyle'
                },
                {
                    xtype: 'combo',
                    name: 'newStyle',
                    fieldLabel: '',                        
                    //hideTrigger: true,
                    //labelAlign: 'top',
                    allowBlank: false,
                    //readOnly: true,
                    width: 585,
                    tabIndex: 9,
                    bind: {
                        disabled: '{!chkNewStyle.checked}'
                    },
                    store: 'memStyles',
                    remoteStore: 'Styles',
                    valueField: 'value',
                    displayField: 'label',                    
                    selectOnFocus: false,
                    selectOnTab: false,
                    //typeAhead: true,
                    //forceSelection: true,
                    //minChars: 1,
                    matchFieldWidth: true,
                    queryMode: 'local',
                    //queryParam: "filter",
                    pageSize: 50,
                    listConfig: {
                        width: 320,
                        loadingText: 'Searching....',
                        emptyText: '<p style="padding-left: 5px;">No match found.</p>'

                        // Custom rendering template for each item
                    },
                    plugins: [{
                        ptype: "cleartrigger"
                    }]
                },                
                {
                    xtype: "tagfield",
                    name: 'colors',
                    fieldLabel: "New Colors",
                    reference: 'colors',
                    //hideLabel: true,
                    labelAlign: 'top',
                    tabIndex: 10,
                    hideTrigger: false,
                    width: 585,                    
                    store: 'memColors',
                    remoteStore: 'Colors',
                    valueField: "value",
                    displayField: "label",
                    forceSelection: false,
                    selectOnFocus: true,
                    autoLoadOnValue: true,
                    //multiSelect: true,                    
                    //encodeSubmitValue: false,
                    queryMode: 'local',
                    //queryParam: "filter",
                    //triggerAction: 'all',
                    //lastQuery: '',
                    //filterPickList: true,
                    pageSize: 50, // only works with queryMode = 'remote'
                    //minChars: 1,
                    matchFieldWidth: false,
                    listConfig: {
                        loadindText: 'Searching...',
                        emptyText: 'No matching items found.',
                        width: 340
                    },
                    plugins: [{
                        ptype: "cleartrigger"
                    }]
                },
                /*
                {
                    xtype: 'combo',
                    name: 'division',
                    fieldLabel: 'Division',
                    labelWidth: 55,
                    margin: '0 15 0 0',
                    displayField: 'text',
                    valueField: 'text',
                    //selectOnFocus: false,
                    tabIndex: 5,
                    editable: false,
                    allowBlank: false,
                    queryMode: 'local',
                    autoLoadOnValue: true,
                    //triggerAction: 'all',
                    bind: {
                        store: '{divisions}',
                        value: '{selected.division}'
                    },
                    plugins: [{
                        ptype: "cleartrigger"
                    }]
                },
                {
                    xtype: 'combo',
                    name: 'sizeCat',
                    fieldLabel: 'Sizes',
                    labelWidth: 40,
                    displayField: 'text',
                    valueField: 'text',
                    editable: false,
                    allowBlank: false,
                    tabIndex: 6,
                    //selectOnFocus: true,
                    //forceSelection: true,
                    autoLoadOnValue: true,
                    //minChars: 1,
                    queryMode: 'local',
                    //triggerAction: 'all',
                    bind: {
                        store: '{sizeCats}',
                        value: '{selected.sizeCat}'
                    },
                    plugins: [{
                        ptype: "cleartrigger"
                    }]
                },
                */
                /*
                {
                xtype: 'multiselector',
                title: 'Select Colors',
                reference: 'color-grid',
                //flex: 1,
                anchor: '56% 62%',
                //frame: true,
                border: true,
                bind: {
                disabled: '{!chkNewColor.checked}'
                },
                //margin: '0 0 10 0',
                //hideHeaders: true,
                //columnLines: true,
                tools: [{
                type: 'reset',
                tooltip: 'Reset',
                scope: this,
                callback: function(c, tool, e){
                //c.getStore().loadData(this.initData);

                if (c.searchPopup) {
                //c.searchPopup.deselectRecords(store.getRange());
                c.searchPopup.refs.searchGrid.getSelectionModel().deselectAll();
                }
                }
                }],

                fieldName: 'code',

                viewConfig: {
                deferEmptyText: false,
                emptyText: 'No colors selected'
                },

                search: {
                field: 'code',
                width: 290,
                height: 240,
                store: colors,
                bbar: {
                xtype: "pagingtoolbar",
                //itemId: "pagingtb",
                store: colors,
                style: {
                borderTop: '1px solid #cfcfcf'
                //borderBottom: '1px solid #cfcfcf',
                //'background-color': '#E4E5E7'
                }
                //dock: 'bottom'
                }
                },

                listeners: {
                disable: function(c){
                if (c.searchPopup) {
                //c.searchPopup.deselectRecords(store.getRange());
                c.searchPopup.refs.searchGrid.getSelectionModel().deselectAll();
                }
                }
                }
                }*/                    
                ],

                buttons: [{
                    action: 'save',
                    text: 'Save',
                    formBind: true,
                    //glyph: 86,
                    iconCls: 'x-fa fa-save',
                    handler: function(btn){
                        me.fireEvent('saveclick', btn, me);
                    }
                },{
                    action: 'close',
                    text: 'Close',
                    //glyph: 88,
                    iconCls: 'x-far fa-times-circle',
                    handler: function(btn){
                        me.close();
                    }
                }]

            }]
            /*
            items: [{
                xtype: 'grid',
                //title: 'Line Sheets',
                //iconCls: 'x-fa fa-folder',
                reference: 'color-grid',
                anchor: '60% 100%',
                //session: true,

                tools: [{
                    type: 'plus',
                    callback: 'onAddLineSheet',
                    scope: this.controller
                },{
                    type: 'refresh',
                    callback: 'onRefreshLineSheet',
                    scope: this.controller
                }],

                style: {
                    //borderTop: '1px solid #cfcfcf'
                    //borderBottom: '1px solid #cfcfcf'
                },
                tbar: {
                    //weight: 101,
                    style: {
                        //'background-color': '#E4E5E7'
                    },
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Search',
                        name: 'search',
                        width: 300,
                        labelWidth: 50,
                        emptyText: 'Color to add',
                        plugins: [{
                            ptype: "cleartrigger"
                        }],

                        triggers: {
                            search: {
                                weight: 1,
                                cls: Ext.baseCSSPrefix + 'form-search-trigger',
                                tooltip: 'Search',
                                handler: function(combo){
                                    combo.fireEvent('triggersearch', this);
                                }
                            }
                        },
                        listeners: {
                            specialkey: 'handleSpecialKey',
                            triggersearch: 'onTriggerSearchClick',
                            triggerclear: 'onTriggerClearClick',
                            scope: this.controller
                        }
                    }]
                },

                bbar: {
                    xtype: "pagingtoolbar",
                    //itemId: "pagingtb",
                    bind: {
                        store: "{colors}"
                    },
                    //dock: 'bottom',
                    displayInfo: true
                },

                viewConfig: {

                },

                bind: {
                    store: '{colors}'
                },

                selModel: {
                    type: 'checkboxmodel',
                    checkOnly: true,
                    injectCheckbox: 0
                },

                columns: [{
                    width: '50',
                    align: 'center',
                    menuDisabled: true,
                    hidden: true,
                    sortable: false
                },{
                    text: 'Color',
                    dataIndex: 'code',
                    flex: 1
                },{
                    text: 'Description',
                    dataIndex: 'descript',
                    flex: 4
                },{
                    text: 'EDI Description',
                    dataIndex: 'edi_descript',
                    flex: 4
                }]
            }]
            */
        });

        me.callParent(arguments);

    }
})


