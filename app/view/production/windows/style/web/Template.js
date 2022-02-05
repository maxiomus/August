/**
 * Created by tech on 1/18/2022.
 */
 Ext.define('August.view.production.windows.style.web.Template', {
    extend: 'Ext.window.Window',

    requires: [
        'August.view.production.windows.style.web.TemplateController',
        'August.view.production.windows.style.web.TemplateModel',
        'August.model.shopify.Template',
        'August.plugin.grid.Exporter'
    ],

    alias: 'widget.windows-style-webtemplate',

    controller: "windows-style-webtemplate",
    viewModel: {
        type: "windows-style-webtemplate"        
    },

    layout: {
        type: 'fit'
    },

    header: {
        title: 'Shopify Template',
        iconCls: 'x-fa fa-code',
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
            items: [{
                xtype: "combo",               
                name: 'site', 
                fieldLabel: 'Shopify',
                //labelWidth: 50,
                hideLabel: true,
                valueField: "value",
                displayField: "label",
                value: "3",
                editable: false,
                //reference: "filterSelection",
                bind: {
                    store: "{shopifyStores}"
                },
                queryMode: 'local',
                listeners: {                    
                    change: {
                        fn: "onSiteChange",
                        scope: 'controller'
                    }                    
                }
            },{
                xtype: 'textfield',
                name: 'style',
                width: 600,
                fieldLabel: 'Style',
                labelWidth: 40,                
                bind: {
                    value: '{selected.style}'
                },
                readOnly: false,
                selectOnFocus: false
            },
            {
                xtype: 'button',
                //text: 'Search',
                iconCls: 'x-fa fa-search',
                handler: function(btn) {
    
                }
            },
            '-',
            { xtype: 'tbspacer', width: 10 },             
            '->',            
            {
                xtype: 'button',
                text: 'Save As',
                action: 'saveas',
                iconCls: 'x-far fa-file-download',
                handler: function(btn) {
                    me.fireEvent('saveasclick', btn, me);
                }
            },
            {
                xtype: 'button',
                text: 'Close',
                action: 'close',
                iconCls: 'x-fa fa-times-circle',
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
                    reference: "templateGrid",
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
                        //store: "{shopifytemplates}"
                    },

                    columns: [{
                        xtype: 'checkcolumn',
                        header: "Line",
                        dataIndex: "",
                        headerCheckbox: false,                        
                        stopSelection: false, width: 80,                        
                        listeners: {
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
                                   
                               }

                            }
                        }                  
                    },,{
                        text: 'Handle', dataIndex: 'handle', menuDisabled: true, width: 120
                    },{
                        text: 'Title', dataIndex: 'title', menuDisabled: true, width: 120
                    },{
                        text: 'Body', dataIndex: 'body', menuDisabled: true, width: 240
                    },{
                        text: 'Vendor', dataIndex: 'vendor', menuDisabled: true, width: 240
                    },{
                        text: 'Standard Product Type', dataIndex: 'product_type', menuDisabled: true, width: 240
                    },{
                        text: 'Custom Product Type', dataIndex: 'custom_type', menuDisabled: true, width: 240
                    },
                    {
                        text: 'tags', dataIndex: 'tags', menuDisabled: true, width: 120
                    },
                    {
                        text: 'Published', dataIndex: 'published', menuDisabled: true, width: 120
                    },
                    {
                        text: 'Option1 Name', dataIndex: 'option1_name', menuDisabled: true, width: 120
                    },
                    {
                        text: 'Option1 Value', dataIndex: 'option1_value', menuDisabled: true, width: 120
                    },
                    {
                        text: 'Option2 Name', dataIndex: 'option2_name', menuDisabled: true, width: 120
                    },
                    {
                        text: 'Option2 Value', dataIndex: 'option2_value', menuDisabled: true, width: 120
                    },
                    {
                        text: 'Option3 Name', dataIndex: 'option3_name', menuDisabled: true, width: 120
                    },
                    {
                        text: 'Option4 Value', dataIndex: 'option3_value', menuDisabled: true, width: 120
                    },
                    {   
                        text: 'Variant SKU', dataIndex: 'variant_sku', menuDisabled: true, width: 120
                    },
                    {   
                        text: 'Variant Grams', dataIndex: 'variant_grams', menuDisabled: true, width: 120
                    },
                    {   
                        text: 'Variant Inventory Tracker', dataIndex: 'variant_inventory_tracker', menuDisabled: true, width: 120
                    },
                    {   
                        text: 'Variant Inventory Qty', dataIndex: 'variant_inventory_qty', menuDisabled: true, width: 120
                    },
                    {   
                        text: 'Variant Inventory Policy', dataIndex: 'variant_inventory_policy', menuDisabled: true, width: 120
                    },
                    {   
                        text: 'Variant Fullfillment Service', dataIndex: 'variant_fullfillment_service', menuDisabled: true, width: 120
                    },
                    {   
                        text: 'Variant Price', dataIndex: 'variant_price', menuDisabled: true, width: 120
                    },
                    {   
                        text: 'Variant Compare At Price', dataIndex: 'variant_compare_at_price', menuDisabled: true, width: 120
                    },
                    {   
                        text: 'Variant Requires Shipping', dataIndex: 'variant_requires_shipping', menuDisabled: true, width: 120
                    },
                    {   
                        text: 'Variant Taxable', dataIndex: 'variant_taxable', menuDisabled: true, width: 120
                    },
                    {   
                        text: 'Variant Barcode', dataIndex: 'variant_barcode', menuDisabled: true, width: 120
                    },
                    {
                        text: 'Image Src', dataIndex: 'image_src', menuDisabled: true
                    },
                    {
                        text: 'Image Position', dataIndex: 'image_position', menuDisabled: true
                    },
                    {
                        text: 'Image Alt Text', dataIndex: 'image_alt_text', menuDisabled: true
                    },
                    {
                        text: 'Gift Card', dataIndex: 'gift_card', menuDisabled: true
                    },
                    {
                        text: 'SEO Title', dataIndex: 'seo_title', menuDisabled: true
                    },
                    {
                        text: 'SEO Description', dataIndex: 'seo_description', menuDisabled: true
                    },
                    {
                        text: 'Google Shopping / Google Product Category', dataIndex: 'Google_Shopping_Google_Product_Category', menuDisabled: true
                    },
                    {
                        text: 'Google Shopping / Gender', dataIndex: 'Google_Shopping_Gender', menuDisabled: true
                    },
                    {
                        text: 'Google Shopping / Age Group', dataIndex: 'Google_Shopping_Age_Group', menuDisabled: true
                    },
                    {
                        text: 'Google Shopping / MPN', dataIndex: 'Google_Shopping_MPN', menuDisabled: true
                    },
                    {
                        text: 'Google Shopping / AdWords Grouping', dataIndex: 'Google_Shopping_Adwords_Grouping', menuDisabled: true
                    },
                    {
                        text: 'Google Shopping / Condition', dataIndex: 'Google_Shopping_Condition', menuDisabled: true
                    },
                    {
                        text: 'Google Shopping / Custom Product', dataIndex: 'Google_Shopping_Custom_Product', menuDisabled: true
                    },
                    {
                        text: 'Google Shopping / Custom Label 0', dataIndex: 'Google_Shopping_Custom_Label_0', menuDisabled: true
                    },
                    {
                        text: 'Google Shopping / Custom Label 1', dataIndex: 'Google_Shopping_Custom_Label_1', menuDisabled: true
                    },
                    {
                        text: 'Google Shopping / Custom Label 2', dataIndex: 'Google_Shopping_Custom_Label_2', menuDisabled: true
                    },
                    {
                        text: 'Google Shopping / Custom Label 3', dataIndex: 'Google_Shopping_Custom_Label_3', menuDisabled: true
                    },
                    {
                        text: 'Google Shopping / Custom Label 4', dataIndex: 'Google_Shopping_Custom_Label_4', menuDisabled: true
                    },
                    {
                        text: 'Variant Image', dataIndex: 'variant_image', menuDisabled: true
                    },
                    {
                        text: 'Variant Weight Unit', dataIndex: 'variant_weight_unit', menuDisabled: true
                    },
                    {
                        text: 'Variant Tax Code', dataIndex: 'variant_tax_code', menuDisabled: true
                    },
                    {
                        text: 'Cost Per Item', dataIndex: 'cost_per_item', menuDisabled: true
                    },
                    {
                        text: 'Status', dataIndex: 'status', menuDisabled: true, width: 300
                    }],  
                
                    cls: "template-grid",
                    stateful: true,
                    stateId: "template-grid",
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
                    },{
                        ptype: "grid-exporter"
                    }],

                    listeners: {
                        render: {
                            //fn: 'onGridRender',
                            //scope: this.controller
                        },
                        /*
                        selectionChange: {
                            fn: 'onTemplateSelect',
                            scope: this.controller
                        }
                        */
                    }
                }]             
            }]            
        });

        me.callParent(arguments);

    }
})
