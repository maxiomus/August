/**
 * Created by tech on 10/9/2014.
 */
 Ext.define('August.view.shopify.windows.VariantUpdate', {
    extend: 'Ext.window.Window',

    requires: [
        'August.view.shopify.windows.VariantUpdateController',
        'August.view.shopify.windows.VariantUpdateModel'
    ],

    alias: 'widget.shopify-windows-variantupdate',

    controller: "shopify-windows-variantupdate",
    viewModel: {
        type: "shopify-windows-variantupdate"
    },

    layout: {
        type: 'fit'
    },

    header: {
        title: 'Shopify Variants Update',
        iconCls: 'x-fa fa-upload',
        titlePosition: 0,
        titleAlign: 'left'
    },

    padding: '0 10 10 10',

    bind: {
        title: '{title}'
    },

    //minWidth: 720,
    minHeight: 480,
    maximized: true,

    //modal: true,
    monitorResize: true,
    maximizable: true,
    //constrain: true,
    closable: true,    

    tools: [{
        type: 'pin'
    }],
    
    /*
    buttons: [{
        action: 'save',
        text: 'Save',
        formBind: true,
        //glyph: 86,
        iconCls: 'x-far fa-save',
        handler: function(btn){
            //btn.up('window').fireEvent('saveclick', btn, me);
        }
    },{
        action: 'close',
        text: 'Close',
        //glyph: 88,
        iconCls: 'x-far fa-times-circle',
        handler: function(btn){
            btn.up('window').close();
        }
    }],
    */
   
    initComponent: function() {
        var me = this;

        // Calculating the textfield height...
        var field = new Ext.form.field.Text({
                renderTo: document.body
            }), fieldHeight = field.getHeight(),
            padding = 5,
            remainingHeight;

        field.destroy();
        remainingHeight = padding + fieldHeight * 3;

        me.width = document.body.clientWidth - 660;
        me.height = document.body.clientHeight - 320;

        /*
        Ext.define('File', {
            extend: 'Ext.data.Model',
            fields: [ 'id', 'name', 'size', 'lastmod' ],
            idProperty: 'id'
        });

        var fileStore = Ext.create('Ext.data.Store', {
            model: 'File'
        });                
        */        

        me.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            defaults: {
                ui:  'default'
            },
            items: [            
            {
                xtype: 'textfield',
                fieldLabel: 'Style',
                labelWidth: 40,
                width: 300,
                name: 'style',
                bind: {
                    value: '{selected.style:uppercase}'
                },
                readOnly: true,
                selectOnFocus: false
            },     
            /*       
            {
                xtype: 'button',
                //text: 'Search',
                iconCls: 'x-fa fa-search',
                handler: function(btn) {
    
                }
            },            
            { xtype: 'tbspacer', width: 10 }, 
            */
            '-',
            {
                xtype: "combo",               
                name: 'site', 
                fieldLabel: 'Shopify',
                labelWidth: 50,
                //hideLabel: true,
                valueField: 'value',
                displayField: 'label',                
                editable: false,
                readOnly: true,
                //reference: "filterSelection",
                bind: {
                    store: '{shopifyStores}',
                    value: '{selected.siteid}'
                },
                queryMode: 'local',
                listeners: {                    
                    change: {
                        //fn: "onSiteChange",
                        //scope: 'controller'
                    }                    
                }
            },
            {
                xtype: 'checkbox',
                name: 'withImages',
                reference: 'withImages',
                value: 0,
                boxLabel: 'With'
            },
            {
                xtype: 'combobox',
                inputId: 'numOfImages',
                fieldLabel: 'Images',
                //labelAlign: 'right',
                labelSeparator: '',
                labelPad: 10,
                labelWidth: 45,
                hideLabel: true,
                width: 50,                               
                store: new Ext.data.ArrayStore({
                    fields: ["id"],
                    data: [[1],[2],[3],[4],[5],[6],[7],[8],[9],[10]]
                }),
                bind: {
                    disabled: '{!withImages.checked}'
                },
                queryMode: "local",
                value: "5",
                matchFieldWidth: true,
                displayField: "id",
                valueField: "id",
                editable: false,
                forceSelection: true
            },
            {
                xtype: 'label',
                forId: 'numOfImages',
                text: 'Images'
            },
            //{ xtype: 'tbspacer', width: 10 },   
            '->',
            {
                xtype: 'button',
                text: 'Publish',
                action: 'publish',
                iconCls: 'x-fa fa-upload',
                handler: function(btn) {
                    me.fireEvent('publishclick', btn, me);
                }
            },
            /*
            {
                xtype: 'button',
                text: 'Save Attribute',
                action: 'saveAttribute',
                iconCls: 'x-far fa-save',
                handler: function(btn) {
                    me.fireEvent('saveattributeclick', btn, me);
                }
            },
            */
            {
                xtype: 'button',
                text: 'Close',
                action: 'close',
                iconCls: 'x-far fa-times-circle',
                handler: function(btn) {
                    me.close();
                }
            }]
        }],

        Ext.applyIf(me, {            
            items: [{
                xtype: 'container',

                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                //border: false,
                //bodyPadding: 5,
                bodyStyle: {
                    //background: '#f4f4f4'
                },                

                items: [{
                    xtype: "grid",
                    reference: "publishGrid",
                    scrollable: true,

                    flex: 1,

                    style: {
                        //borderTop: '1px solid #cfcfcf',
                        //borderBottom: '1px solid #cfcfcf'
                    },
                    /*
                    split: {
                        size: 5
                    },
                    layout: {
                        type: 'border'
                    },
                    lockedGridConfig: {
                        header: false,
                        collapsible: true,
                        //width: 325,
                        //minWidth: 290,
                        forceFit: true
                    },
                    */
                    bind: {
                        store: "{publishes}"
                    },

                    columns: [{
                        xtype: 'rownumberer', text: 'Line', menuDisabled: true, width: 50, align: 'center', fixed: true, sortable: false
                    },
                    /*
                    {
                        text: 'Line', dataIndex: 'line', width: 50, align: 'center', sortable: false, fixed: true, 
                        renderer: function(value, metaData, record, rowIndex, colIndex, store){
                            return value;
                        }
                    },
                    */
                    {
                        text: 'style', dataIndex: 'style', menuDisabled: true, width: 120
                    },{
                        text: 'color', dataIndex: 'color', menuDisabled: true, width: 120
                    },{
                        text: 'Description', dataIndex: 'descript', menuDisabled: true, width: 240
                    },{
                        xtype: 'checkcolumn',
                        header: "Publish",
                        dataIndex: "toPublish",
                        headerCheckbox: false,                        
                        stopSelection: false, width: 80,                        
                        listeners: {
                            beforecheckchange: function(c, rowIdx, checked, rec){
                                
                                if (rec.get('published') == true){
                                    return false;    
                                }
                                
                            },
                            checkchange: function(c, row, checked, rec){
                                console.log(c, checked, rec, c.nextSibling());
                                /*
                                var header = c.up();
                                header.items.each(function(col){
                                    if(checked && col.xtype === 'checkcolumn' && col !== c){
                                        rec.set(col.dataIndex, false);                                     
                                    }
                                })
                                */
                               if(!checked){
                                    //rec.set('active', false);
                                    //rec.set('published', false);
                               }

                            }
                        }                  
                    },{
                        xtype: 'checkcolumn',
                        header: "Active",
                        name: 'active',
                        dataIndex: "active",                        
                        headerCheckbox: false,                                             
                        stopSelection: false, width: 80,
                        disabled: false,
                        listeners: {                            
                            afterrender: function(c, row, checked, rec){
                                console.log(c, checked, rec);                                
                            },
                            beforecheckchange: function(c, rowIdx, checked, rec){
                                
                                if (rec.get('toPublish') != true){
                                    return false;    
                                }
                                
                            }
                        }
                    },{
                        xtype: 'checkcolumn',
                        header: "Published",
                        name: 'published',
                        dataIndex: "published",                        
                        headerCheckbox: false,                                              
                        stopSelection: false, width: 80,
                        disabled: false,
                        listeners: {                            
                            afterrender: function(c, row, checked, rec){
                                console.log(c, checked, rec);
                            },
                            beforecheckchange: function(c, rowIdx, checked, rec){
                                if (rec.get('toPublish') != true){
                                    return false;    
                                }
                            }
                        }
                    },{
                        text: 'Available Date', dataIndex: 'availableDate', menuDisabled: true, xtype: 'datecolumn', format: 'MM-dd-yyyy'
                    },
                    {
                        text: 'Status', dataIndex: 'status', menuDisabled: true, width: 120
                    },{
                        xtype: 'numbercolumn',
                        text: "Cost",
                        dataIndex: "cost",
                        //width: 90,
                        menuDisabled: true,
                        sortable: false,
                        format: '$0,000.00'
                    },{
                        xtype: 'numbercolumn',
                        text: "Price1",
                        dataIndex: "price1",
                        //width: 90,
                        menuDisabled: true,
                        sortable: false,
                        format: '$0,000.00'
                    },
                    {
                        xtype: 'numbercolumn',
                        text: "Retail Price",
                        dataIndex: "sgtRetailPrice",
                        //width: 90,
                        menuDisabled: true,
                        sortable: false,
                        format: '$0,000.00'
                    },
                    {   
                        xtype: 'numbercolumn', text: 'On-Hand', dataIndex: 'ohs', locked: false, format: '0,000', width: 80
                    },
                    {   
                        xtype: 'numbercolumn', text: 'On-Order', dataIndex: 'orders', locked: false, format: '0,000', width: 80
                    },
                    {   
                        xtype: 'numbercolumn', text: 'WIP', dataIndex: 'pos', locked: false, format: '0,000', width: 80
                    },
                    {
                        text: 'Season', dataIndex: 'season', menuDisabled: true
                    },
                    {
                        text: 'Division', dataIndex: 'division', menuDisabled: true
                    },
                    {
                        text: 'Group', dataIndex: 'grp', menuDisabled: true
                    },
                    {
                        text: 'Category', dataIndex: 'category', menuDisabled: true
                    },
                    {
                        text: 'Size Cat.', dataIndex: 'sizeCat', menuDisabled: true
                    },
                    {
                        text: 'Memo', dataIndex: 'memo', menuDisabled: true, width: 300
                    }],  
                
                    cls: "publish-grid",
                    stateful: true,
                    stateId: "publish-grid",
                    //stateEvents: ["columnmove","columnresize","columnshow","columnhide"],
                    //loadMask: true,
                    //columnLines: true,
                    multiColumnSort: true,
                    // We do not need automatic height synching.
                    syncRowHeight: false,

                    selModel: {
                        pruneRemoved: false
                    },
                    
                    viewConfig: {
                        //loadingHeight: 400,
                        stripeRows: true,
                        trackOver: true,
                        preserveScrollOnRefresh:true,
                        //deferInitialRefresh:true,
                        //trailingBufferZone: 20,
                        //leadingBufferZone: 40,

                        emptyText: '<h1 style="margin:20px">No matching results</h1>'
                        
                    },
                    plugins: [{
                        ptype: "gridfilters"
                    }],

                    listeners: {
                        render: {
                            //fn: 'onGridRender',
                            //scope: this.controller
                        },
                        selectionChange: {
                            fn: 'onPublishSelect',
                            scope: this.controller
                        }
                    }
                }]             
            }]            
        });

        me.callParent(arguments);

    }
});