/**
 * Created by tech on 1/18/2022.
 */
 Ext.define('August.view.production.windows.style.web.Template', {
    extend: 'Ext.window.Window',

    requires: [
        'August.view.production.windows.style.web.TemplateController',
        'August.view.production.windows.style.web.TemplateModel',
        'August.model.shopify.shopifyTemplate',
        //'August.model.shopify.lordTaylorTemplate',
        //'August.model.shopify.HBCTemplate',
        //'August.model.shopify.BelkTemplate',
        //'August.model.shopify.BelkMp',
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
        title: 'Style Export Template',
        iconCls: 'x-fa fa-code',
        titlePosition: 0,
        titleAlign: 'left'
    },

    padding: '10 0 10 0',

    bind: {
        //title: '{title}'
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

        //me.columns = me.buildColumns();
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
                value: "99",
                editable: false,
                //reference: "filterSelection",
                bind: {
                    store: "{shopifyStores}"
                },
                queryMode: 'local',
                listeners: {                    
                    select: {
                        fn: "onSiteSelect",
                        scope: 'controller'
                    }                    
                }
            },
            {
                xtype: "combo",               
                name: 'category', 
                fieldLabel: 'Search By',
                //labelWidth: 50,
                width: 100,
                hideLabel: true,
                valueField: "field",
                displayField: "label",
                value: "style",
                editable: false,
                //reference: "filterSelection",
                bind: {
                    store: "{categories}"
                },
                queryMode: 'local',
                listeners: {                    
                    select: {
                        fn: "onCategorySelect",
                        scope: 'controller'
                    }                    
                }
            },
            {
                xtype: "searchtextlist",
                reference: 'searchlist',
                width: 480,              
                bind: {                    
                    store: '{templatestyles}'
                },  
                
                paramName: "style"            
            },  
            {
                xtype: 'button',
                text: 'Reset',
                action: 'reset',
                iconCls: 'x-fa fa-redo',
                handler: function(btn) {
                    me.fireEvent('resetclick', btn, me);
                }
            },          
            '-',
            {
                xtype: 'combo',
                name: 'warehouse',
                fieldLabel: 'WH',
                width: 130,
                labelWidth: 35,
                displayField: 'label',
                valueField: 'value',
                //selectOnFocus: true,
                value: 'WH',
                editable: false,
                allowBlank: false,
                forceSelection: true,
                //minChars: 1,
                queryMode: 'local',
                //queryParam: 'filter',
                //triggerAction: 'all',
                bind: {
                    store: '{warehouses}'
                }
            },
            {
                xtype: 'checkbox',
                name: 'preorder',
                value: false,
                boxLabel: 'Pre Order'
            },
            {
                xtype: 'checkbox',
                name: 'withImages',
                value: 0,
                boxLabel: 'With Images'
            },
            { xtype: 'tbspacer', width: 10 },             
            '->',            
            {
                xtype: 'button',
                text: 'Generate',
                action: 'generate',
                iconCls: 'x-far fa-file-alt',
                handler: function(btn) {
                    me.fireEvent('generateclick', btn, me);
                }
            },
            {
                xtype: 'button',
                text: 'Save As',
                action: 'saveas',
                iconCls: 'x-fas fa-file-download',
                menu:[{
                    text: 'CSV',
                    handler: function(c) {
                        me.fireEvent('saveasclick', c, 'csv');
                    }
                },{
                    text: 'EXCEL',
                    handler: function(c) {
                        me.fireEvent('saveasclick', c, 'xlsx');
                    }
                }],
                handler: function(btn) {
                    
                }
            },
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

                /*
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                */
                layout: 'border',
                //border: false,
                //bodyPadding: 5,
                bodyStyle: {
                    //background: '#f4f4f4'
                },                

                items: [{
                    xtype: "grid",
                    reference: "styleGrid",
                    scrollable: true,

                    flex: 1,
                    //height: 360,
                    region: 'north',
                    style: {
                        borderTop: '1px solid #cfcfcf',
                        //borderBottom: '1px solid #cfcfcf'
                    },  

                    split: {
                        size: 1
                    },

                    bind: {
                        store: "{templatestyles}"
                    },

                    columns: [{
                        header: "Style",
                        dataIndex: "style",
                        width: 140,
                        /*
                        locked: false,
                        filter: {
                            operator: 'st',
                            type: "string"
                        },
                        */
                        renderer: function(f, e, a){
                            return f;
                        }
                    },
                    {
                        header: "Color",
                        dataIndex: "color",
                        width: 140,
                        filter: {                            
                            type: 'list'
                        },
                        renderer: function(f, e, a){
                            return f;
                        }
                    },
                    {
                        header: "Description",
                        dataIndex: "descript",
                        width: 260,
                        hidden: false,
                        filter: {
                            operator: 'st',
                            type: "string"
                        },
                        renderer: function(f, e, a){
                            return f;
                        }
                    },            
                    {
                        header: "Status",
                        dataIndex: "status",
                        width: 140,            
                        filter: {
                            operator: 'st',
                            type: "string"
                        },
                        renderer: function(f, e, a){
                            return f;
                        }
                    },                    
                    {
                        header: "Category",
                        dataIndex: "category",
                        width: 140,
                        hidden: false,
                        filter: {
                            operator: 'st',
                            type: "string"
                        },
                        renderer: function(f, e, a){
                            return f;
                        }
                    },
                    {
                        header: "Season",
                        dataIndex: "season",                
                        hidden: false,
                        filter: {
                            operator: 'st',
                            type: "string"
                        },
                        renderer: function(f, e, a){
                            return f;
                        }
                    },
                    {
                        header: "Division",
                        dataIndex: "division",
                        hidden: false,
                        filter: {
                            operator: 'in',
                            type: "list"
                        },
                        renderer: function(f, e, a){
                            return f;
                        }
                    },
                    {
                        header: "Size Cat.",
                        dataIndex: "sizeCat",
                        hidden: false,
                        filter: {
                            operator: 'st',
                            type: "string"
                        },
                        renderer: function(f, e, a){
                            return f;
                        }
                    },
                    {
                        header: "O.H Qty",
                        dataIndex: "ohs",                
                        hidden: false,
                        filter: {
                            type: 'number'
                        },
                        renderer: function(f, e, a){
                            return f;
                        }
                    }],  
                
                    cls: "template-style-grid",

                    stateful: true,

                    stateId: "template-style-grid",
                    //stateEvents: ["columnmove","columnresize","columnshow","columnhide"],
                    //loadMask: true,
                    //columnLines: true,
                    multiColumnSort: true,
                    // We do not need automatic height synching.
                    syncRowHeight: false,

                    selModel: {
                        type: 'checkboxmodel',
                        mode: 'MULTI',
                        checkOnly: true,
                        enableKeyNav: true,
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

                    bbar: me.buildBottomBar(),

                    listeners: {
                        render: {
                            //fn: 'onGridRender',
                            //scope: this.controller
                        },
                        selectionChange: {
                            //fn: 'onPublishSelect',
                            scope: this.controller
                        }
                    }
                },{
                    xtype: "grid",
                    reference: "templateGrid",
                    scrollable: true,
                    region: 'center',
                    flex: 1,                    

                    style: {
                        borderTop: '1px solid #cfcfcf',
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
                        title: '{title}',
                        store: "{shopifytemplates}"
                    },                    

                    //columns: me.etc['SH'].columns,
                    columns: [],
                
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

                        emptyText: '<h1 style="margin:20px">No matching results</h1>',
                        deferEmptyText: false
                        
                    },
                    plugins: [{
                        ptype: 'rowediting',
                        clicksToEdit: 2,
                        clicksToMoveEditor: 1,
                        autoCancel: false
                    },{
                        ptype: "gridfilters"
                    },{
                        ptype: "grid-exporter"
                    }],

                    listeners: {
                        
                    }
                }]
                            
            }]            
        });

        me.callParent(arguments);

    },

    buildBottomBar: function(){
        var b = Ext.create("widget.combo", {
            name: "perpage",
            //reference: 'pageSizer',
            width: 76,
            store: new Ext.data.ArrayStore({
                fields: ["id"],
                data: [["15"], ["25"], ["50"], ["100"], ["300"], ["500"]]
            }),
            //value: "50",
            displayField: "id",
            valueField: "id",
            editable: false,
            forceSelection: true,
            matchFieldWidth: true,
            queryMode: "local"
            //triggerAction: "all",
        });

        b.on('afterrender', function(c, e){
            var store = this.getViewModel().getStore("templatestyles");
            c.setValue(store.getPageSize());
        }, this);

        b.on("select", function(e, a){
            var store = this.getViewModel().getStore("templatestyles");
            store.setPageSize(e.getValue());
            store.load();
            //console.log("combo select", f)
        }, this);

        return {
            xtype: "pagingtoolbar",
            //itemId: "pagingtb",
            bind: {
                store: "{templatestyles}"
            },
            //dock: "bottom",
            //displayInfo: true,
            items: ["-", b, "Per Page"]
        };
    },

    etc: {
        SH: {
            store: 'buildShopifyStore',
            columns: [                
                {
                    text: 'Handle', dataIndex: 'handle', menuDisabled: true, width: 120
                },
                {
                    text: 'Title', dataIndex: 'title', menuDisabled: true, width: 240
                },
                {
                    text: 'Body', dataIndex: 'body', menuDisabled: true, width: 320
                },
                {
                    text: 'Vendor', dataIndex: 'vendor', menuDisabled: true, width: 120
                },
                {
                    text: 'Standard Product Type', dataIndex: 'standard_product_type', menuDisabled: true
                },
                {
                    text: 'Custom Product Type', dataIndex: 'custom_product_type', menuDisabled: true
                },
                {
                    text: 'Tags', dataIndex: 'tags', menuDisabled: true, width: 240
                },
                {
                    text: 'Published', dataIndex: 'published', menuDisabled: true
                },
                {
                    text: 'Option1 Name', dataIndex: 'option1_name', menuDisabled: true
                },
                {
                    text: 'Option1 Value', dataIndex: 'option1_value', menuDisabled: true
                },
                {
                    text: 'Option2 Name', dataIndex: 'option2_name', menuDisabled: true
                },
                {
                    text: 'Option2 Value', dataIndex: 'option2_value', menuDisabled: true
                },
                {
                    text: 'Option3 Name', dataIndex: 'option3_name', menuDisabled: true
                },
                {
                    text: 'Option3 Value', dataIndex: 'option3_value', menuDisabled: true
                },
                /*
                {
                    text: 'Option4 Name', dataIndex: 'option4_name', menuDisabled: true
                },
                {
                    text: 'Option4 Value', dataIndex: 'option4_value', menuDisabled: true
                },
                */
                {   
                    text: 'Variant SKU', dataIndex: 'variant_SKU', menuDisabled: true, width: 180
                },
                {   
                    text: 'Variant Grams', dataIndex: 'variant_grams', menuDisabled: true
                },
                {   
                    text: 'Variant Inventory Tracker', dataIndex: 'variant_inventory_tracker', menuDisabled: true
                },
                {   
                    text: 'Variant Inventory Qty', dataIndex: 'variant_inventory_qty', menuDisabled: true, width: 80
                },
                {   
                    text: 'Variant Inventory Policy', dataIndex: 'variant_inventory_policy', menuDisabled: true
                },
                {   
                    text: 'Variant Fulfillment Service', dataIndex: 'variant_fulfillment_service', menuDisabled: true
                },
                {   
                    text: 'Variant Price', dataIndex: 'variant_price', menuDisabled: true, width: 80
                },
                {   
                    text: 'Variant Compare At Price', dataIndex: 'variant_compare_at_price', menuDisabled: true, width: 80
                },
                {   
                    text: 'Variant Requires Shipping', dataIndex: 'variant_requires_shipping', menuDisabled: true, width: 80
                },
                {   
                    text: 'Variant Taxable', dataIndex: 'variant_taxable', menuDisabled: true, width: 80
                },
                {   
                    text: 'Variant Barcode', dataIndex: 'variant_barcode', menuDisabled: true, width: 80
                },
                {
                    text: 'Image Src', dataIndex: 'image_src', menuDisabled: true, width: 320
                },
                {
                    text: 'Image Position', dataIndex: 'image_position', menuDisabled: true, width: 80
                },
                {
                    text: 'Image Alt Text', dataIndex: 'image_alt_text', menuDisabled: true
                },
                {
                    text: 'Gift Card', dataIndex: 'gift_card', menuDisabled: true, width: 80
                },
                {
                    text: 'SEO Title', dataIndex: 'seo_title', menuDisabled: true, width: 80
                },
                {
                    text: 'SEO Description', dataIndex: 'seo_description', menuDisabled: true
                },
                {
                    text: 'Google Shopping / Google Product Category', dataIndex: 'gs_google_product_category', menuDisabled: true
                },
                {
                    text: 'Google Shopping / Gender', dataIndex: 'gs_gender', menuDisabled: true
                },
                {
                    text: 'Google Shopping / Age Group', dataIndex: 'gs_age_group', menuDisabled: true
                },
                {
                    text: 'Google Shopping / MPN', dataIndex: 'gs_MPN', menuDisabled: true
                },
                {
                    text: 'Google Shopping / AdWords Grouping', dataIndex: 'gs_adwords_grouping', menuDisabled: true
                },
                {
                    text: 'Google Shopping / AdWords Labels', dataIndex: 'gs_adWords_labels', menuDisabled: true
                },
                {
                    text: 'Google Shopping / Condition', dataIndex: 'gs_condition', menuDisabled: true
                },
                {
                    text: 'Google Shopping / Custom Product', dataIndex: 'gs_custom_product', menuDisabled: true
                },
                {
                    text: 'Google Shopping / Custom Label 0', dataIndex: 'gs_custom_label_0', menuDisabled: true
                },
                {
                    text: 'Google Shopping / Custom Label 1', dataIndex: 'gs_custom_label_1', menuDisabled: true
                },
                {
                    text: 'Google Shopping / Custom Label 2', dataIndex: 'gs_custom_label_2', menuDisabled: true
                },
                {
                    text: 'Google Shopping / Custom Label 3', dataIndex: 'gs_custom_label_3', menuDisabled: true
                },
                {
                    text: 'Google Shopping / Custom Label 4', dataIndex: 'gs_custom_label_4', menuDisabled: true
                },
                {
                    text: 'Variant Image', dataIndex: 'variant_image', menuDisabled: true, width: 320
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
                    text: 'Price / International', dataIndex: 'price_international', menuDisabled: true
                },
                {
                    text: 'Compare At Price / International', dataIndex: 'compare_at_price', menuDisabled: true
                },
                {
                    text: 'Status', dataIndex: 'status', menuDisabled: true
                }
                /*
                {
                    xtype: 'checkcolumn',
                    header: "Line",
                    dataIndex: "",
                    headerCheckbox: false,                        
                    stopSelection: false, width: 80,                        
                    listeners: {
                        checkchange: function(c, row, checked, rec){
                            console.log(c, checked, rec, c.nextSibling());
                            
                            var header = c.up();
                            header.items.each(function(col){
                                if(checked && col.xtype === 'checkcolumn' && col !== c){
                                    rec.set(col.dataIndex, false);                                     
                                }
                            })
                            
                            if(!checked){
                               
                            }
        
                        }
                    }                  
                },
                */
            ]
        },

        HB: {
            store: 'buildHBCStore',
            columns: [
                { text: 'STYLE #', dataIndex: 'Style_No', menuDisabled: true, width: 120 },
                { text: 'SKU PRODUCTION ID', dataIndex: 'SKU_Product_ID_SVS_No', menuDisabled: true, width: 180 },
                { text: 'Color', dataIndex: 'Color', menuDisabled: true, width: 120 },
                { text: 'UPC', dataIndex: 'UPC', menuDisabled: true, width: 120 },
                { text: 'SKN', dataIndex: 'SKN', menuDisabled: true, width: 120 },
                { text: 'Buying Office Comments', dataIndex: 'Buying_Office_Comments', menuDisabled: true, width: 180 },
                { text: 'Vendor Product/Style Name', dataIndex: 'Vendor_Product_Style_Name', menuDisabled: true, width: 180 },
                { text: 'Detailed Description', dataIndex: 'Detailed_Description', menuDisabled: true, width: 180 },
                { text: 'Mandatory Copy', dataIndex: 'Mandatory_Copy', menuDisabled: true, width: 120 },
                { text: 'Collection', dataIndex: 'Collection', menuDisabled: true, width: 120 },
                { text: 'Size Range', dataIndex: 'Size_Range', menuDisabled: true, width: 120 },
                { text: 'Product Dimensions', dataIndex: 'Product_Dimensions', menuDisabled: true, width: 180 },
                { text: 'Length from shoulder to hem', dataIndex: 'Length_Shoulder_Hem', menuDisabled: true, width: 180 },
                { text: 'Length(Inseam)', dataIndex: 'Length_Inseam', menuDisabled: true, width: 120 },
                { text: 'Length(Rise)', dataIndex: 'Length_Rise', menuDisabled: true, width: 120 },
                { text: 'Leg Opening Circumference', dataIndex: 'Leg_Opening_Circumference', menuDisabled: true, width: 180 },
                { text: 'Waist Bust Shoulders Arms Hips', dataIndex: 'Waist_Bust_Shoulders_Arms_Hips', menuDisabled: true, width: 180 },
                { text: 'Fit Type', dataIndex: 'Fit_Type', menuDisabled: true, width: 120 },
                { text: 'Model Measurements', dataIndex: 'Model_Measurements ', menuDisabled: true, width: 120 },
                { text: 'Coverage Type', dataIndex: 'Coverage_Type', menuDisabled: true, width: 120 },
                { text: 'Fiber Content', dataIndex: 'Fiber_Content', menuDisabled: true, width: 120 },                
                { text: 'Material or fabric', dataIndex: 'Material_fabric', menuDisabled: true, width: 120 },
                { text: 'Lining Content', dataIndex: 'Lining_Content', menuDisabled: true, width: 120 },
                { text: 'Trim Material', dataIndex: 'Trim_Material', menuDisabled: true, width: 120 },
                { text: 'Closure Type and Location', dataIndex: 'Closure_Type_Location', menuDisabled: true, width: 180 },
                { text: 'Fabric Origin', dataIndex: 'Fabric_Origin', menuDisabled: true, width: 120 },
                { text: 'Country of origin', dataIndex: 'Country_origin', menuDisabled: true, width: 120 },
                { text: 'Care', dataIndex: 'Care', menuDisabled: true, width: 120 },
                { text: 'Fly Type', dataIndex: 'Fly_Type', menuDisabled: true, width: 120 },
                { text: 'Pockets', dataIndex: 'Pockets', menuDisabled: true, width: 120 },
                { text: 'Collar Type', dataIndex: 'Collar_Type', menuDisabled: true, width: 120 },
                { text: 'Collar Stays', dataIndex: 'Collar_Stays', menuDisabled: true, width: 120 },
                { text: 'Leg Type', dataIndex: 'Leg_Type', menuDisabled: true, width: 120 },
                { text: 'Sleeve Type', dataIndex: 'Sleeve_Type', menuDisabled: true, width: 120 },
                { text: 'Waist Detail', dataIndex: 'Waist_Detail', menuDisabled: true, width: 120 },
                { text: 'Bra type', dataIndex: 'Bra_type', menuDisabled: true, width: 120 },
                { text: 'Bra Strap Type', dataIndex: 'Bra_Strap_Type', menuDisabled: true, width: 120 },
                { text: 'Bra Padding Type', dataIndex: 'Bra_Padding_Type', menuDisabled: true, width: 120 },
                { text: 'Bra Support Level', dataIndex: 'Bra_Support_Level', menuDisabled: true, width: 120 },
                { text: 'Shapewear Control Type', dataIndex: 'Shapewear_Control_Type', menuDisabled: true, width: 180 },
                { text: 'Gusset Material', dataIndex: 'Gusset_Material', menuDisabled: true, width: 120 },
                { text: 'Fur/Hair Type', dataIndex: 'Fur_Hair_Type', menuDisabled: true, width: 120 },
                { text: 'Fur Natural or Dyed', dataIndex: 'Fur_Natural_Dyed', menuDisabled: true, width: 120 },
                { text: 'Fur Origin', dataIndex: 'Fur_Origin', menuDisabled: true, width: 120 },
                { text: 'Exclusivity', dataIndex: 'Exclusivity', menuDisabled: true, width: 120 },
                { text: 'Puffer Fill Power', dataIndex: 'Puffer_Fill_Power', menuDisabled: true, width: 120 },
                { text: 'Romance Copy', dataIndex: 'Romance_Copy', menuDisabled: true, width: 120 }
            ]
        },

        LT: {
            store: 'buildLordTaylorStore',
            columns: [{
                text: 'Division', dataIndex: 'division', menuDisabled: true, width: 120
            },
            {
                text: 'Department', dataIndex: 'department', menuDisabled: true, width: 120
            },
            {
                text: 'Class', dataIndex: 'class', menuDisabled: true, width: 120
            },
            {
                text: 'Season', dataIndex: 'season', menuDisabled: true, width: 120
            },
            {
                text: 'Brand Name', dataIndex: 'brand_name', menuDisabled: true, width: 120
            },
            {
                text: 'VSN(Parent ID)', dataIndex: 'VSN_parent_id', menuDisabled: true, width: 120
            },
            {
                text: 'product ID/SKU', dataIndex: 'product_id_SKU', menuDisabled: true, width: 120
            },
            {
                text: 'Listing Title', dataIndex: 'listing_title', menuDisabled: true, width: 120
            },
            {
                text: 'Short Description', dataIndex: 'short_description', menuDisabled: true, width: 180
            },
            {
                text: 'NRF Color Code', dataIndex: 'NRF_color_code', menuDisabled: true, width: 120
            },
            {
                text: 'Color Description', dataIndex: 'color_description', menuDisabled: true, width: 120
            },
            {
                text: 'L&T Color Name', dataIndex: 'LNT_color_name', menuDisabled: true, width: 120
            },
            {
                text: 'Cost', dataIndex: 'cost', menuDisabled: true, width: 120
            },
            {
                text: 'Retail', dataIndex: 'retail', menuDisabled: true, width: 120
            },
            {   
                text: 'MSRP', dataIndex: 'msrp', menuDisabled: true, width: 120
            },
            {   
                text: 'Ext. Cost', dataIndex: 'ext_cost', menuDisabled: true, width: 120
            },
            {   
                text: 'Ext. Retail', dataIndex: 'ext_retail', menuDisabled: true, width: 120
            },
            {   
                text: 'IMU', dataIndex: 'IMU', menuDisabled: true, width: 120
            },
            {   
                text: 'QTY', dataIndex: 'qty', menuDisabled: true, width: 120
            },
            {   
                text: 'Size', dataIndex: 'size', menuDisabled: true, width: 120
            },
            {   
                text: 'UPC', dataIndex: 'UPC', menuDisabled: true, width: 120
            },
            {   
                text: 'Attribute 1', dataIndex: 'attribute1', menuDisabled: true, width: 120
            },
            {   
                text: 'Attribute 2', dataIndex: 'attribute2', menuDisabled: true, width: 120
            },
            {   
                text: 'Image 1', dataIndex: 'image1', menuDisabled: true, width: 120
            },
            {   
                text: 'Image 2', dataIndex: 'image2', menuDisabled: true, width: 120
            },
            {
                text: 'Image 3', dataIndex: 'image3', menuDisabled: true, width: 120
            },
            {
                text: 'Image 4', dataIndex: 'image4', menuDisabled: true, width: 120
            },
            {
                text: 'Image 5', dataIndex: 'image5', menuDisabled: true, width: 120
            },
            {
                text: 'Product Copy', dataIndex: 'product_copy', menuDisabled: true, width: 320
            },
            {
                text: 'Country of Origin', dataIndex: 'coo', menuDisabled: true
            },
            {
                text: 'Fabric/Material', dataIndex: 'fabric_material', menuDisabled: true, width: 320
            },
            {
                text: 'Care Instruction', dataIndex: 'care_Instruction', menuDisabled: true, width: 320
            }] 
        },

        BKO: {
            store: 'buildBelkStore',
            columns: [{
                text: 'Category', dataIndex: 'category', menuDisabled: true, width: 120
            },
            {
                text: 'New Style', dataIndex: 'newStyle', menuDisabled: true, width: 120
            },
            {                
                text: 'Product Avail Date', dataIndex: 'date', menuDisabled: true, width: 120
            },
            {
                text: 'Brand Name', dataIndex: 'brandName', menuDisabled: true, width: 120
            },
            {
                text: 'Vendor Style #', dataIndex: 'vendorStyleNo', menuDisabled: true, width: 120
            },
            {
                text: 'UPC', dataIndex: 'upc', menuDisabled: true, width: 120
            },
            {
                text: 'Item Description', dataIndex: 'itemDescription', menuDisabled: true, width: 120
            },
            {
                text: 'Size Code', dataIndex: 'sizeCode', menuDisabled: true, width: 120
            },
            {
                text: 'Size Description', dataIndex: 'sizeDescription', menuDisabled: true, width: 180
            },
            {
                text: 'Color Code', dataIndex: 'colorCode', menuDisabled: true, width: 120
            },
            {
                text: 'Color Name', dataIndex: 'colorName', menuDisabled: true, width: 120
            },            
            {
                text: 'Cost', dataIndex: 'cost', menuDisabled: true, width: 120
            },
            {
                text: 'MSRP', dataIndex: 'msrp', menuDisabled: true, width: 120
            },
            {   
                text: 'Sale Retail', dataIndex: 'saleRetail', menuDisabled: true, width: 120
            },
            {   
                text: 'Weight', dataIndex: 'weight', menuDisabled: true, width: 120
            },
            {   
                text: 'Height', dataIndex: 'height', menuDisabled: true, width: 120
            },
            {   
                text: 'Width', dataIndex: 'width', menuDisabled: true, width: 120
            },
            {   
                text: 'Length', dataIndex: 'length', menuDisabled: true, width: 120
            }] 
        },

        NS: {
            store: 'buildNordstromStore',
            columns: [
                { text: 'ProductID', dataIndex: 'ProductID', menuDisabled: true, width: 120 },
                { text: 'ProductIDDescEnglish', dataIndex: 'ProductIDDescEnglish', menuDisabled: true, width: 180 },
                { text: 'GTIN', dataIndex: 'GTIN', menuDisabled: true, width: 120 },
                { text: 'GTINType', dataIndex: 'GTINType', menuDisabled: true, width: 100 },
                { text: 'ChangeDate', dataIndex: 'ChangeDate', menuDisabled: true, width: 100 },
                { text: 'NRFColorCode', dataIndex: 'NRFColorCode', menuDisabled: true, width: 120 },
                { text: 'ShortColorDescEnglish', dataIndex: 'ShortColorDescEnglish', menuDisabled: true, width: 170 },
                { text: 'NRFSizeCode', dataIndex: 'NRFSizeCode', menuDisabled: true, width: 120 },
                { text: 'ShortSizeDescEnglish', dataIndex: 'ShortSizeDescEnglish', menuDisabled: true, width: 160 }
            ]
        },

        KLM: {
            store: 'buildKohlsStore',
            columns: [
                { text: 'product_category', dataIndex: 'product_category', menuDisabled: true, width: 200 },
                { text: 'upc_number', dataIndex: 'upc_number', menuDisabled: true, width: 120 },
                { text: 'title', dataIndex: 'title', menuDisabled: true, width: 180 },
                { text: 'brand', dataIndex: 'brand', menuDisabled: true, width: 100 },
                { text: 'meta_description', dataIndex: 'meta_description', menuDisabled: true, width: 240 },                
                { text: 'style_number', dataIndex: 'style_number', menuDisabled: true, width: 120 },
                { text: 'style_description', dataIndex: 'style_description', menuDisabled: true, width: 240 },
                { text: 'nrf_size', dataIndex: 'nrf_size', menuDisabled: true, width: 80 },
                { text: 'display_color', dataIndex: 'display_color', menuDisabled: true, width: 120 },
                { text: 'color_family', dataIndex: 'color_family', menuDisabled: true, width: 120 },
                { text: 'main_image', dataIndex: 'main_image', menuDisabled: true, width: 120 },
                { text: 'alt_image_1', dataIndex: 'alt_image_1', menuDisabled: true, width: 120 },
                { text: 'alt_image_2', dataIndex: 'alt_image_2', menuDisabled: true, width: 120 },
                { text: 'alt_image_3', dataIndex: 'alt_image_3', menuDisabled: true, width: 120 },
                { text: 'care', dataIndex: 'care', menuDisabled: true, width: 120 },
                { text: 'feature_1', dataIndex: 'feature_1', menuDisabled: true, width: 160 },
                { text: 'feature_2', dataIndex: 'feature_2', menuDisabled: true, width: 160 },
                { text: 'feature_3', dataIndex: 'feature_3', menuDisabled: true, width: 160 },
                { text: 'feature_4', dataIndex: 'feature_4', menuDisabled: true, width: 160 },
                { text: 'fabric_material', dataIndex: 'fabric_material', menuDisabled: true, width: 160 },
                { text: 'origin', dataIndex: 'origin', menuDisabled: true, width: 100 },
                { text: 'choking_hazard', dataIndex: 'choking_hazard', menuDisabled: true, width: 80 },
                { text: 'seller_url', dataIndex: 'seller_url', menuDisabled: true, width: 160 },
                { text: 'perishable_indicator', dataIndex: 'perishable_indicator', menuDisabled: true, width: 80 },
                { text: 'sku', dataIndex: 'sku', menuDisabled: true, width: 160 },
                { text: 'product-id', dataIndex: 'product_id', menuDisabled: true, width: 160 },
                { text: 'product-id-type', dataIndex: 'product_id_type', menuDisabled: true, width: 160 },
                { text: 'description', dataIndex: 'description', menuDisabled: true, width: 160 },
                { text: 'internal-description', dataIndex: 'internal_description', menuDisabled: true, width: 160 },
                { text: 'price', dataIndex: 'price', menuDisabled: true, width: 160 },
                { text: 'price-addtional-info', dataIndex: 'price_addtional_info', menuDisabled: true, width: 160 },
                { text: 'quantity', dataIndex: 'quantity', menuDisabled: true, width: 160 },
                { text: 'min-quantity-alert', dataIndex: 'min_quantity_alert', menuDisabled: true, width: 160 },
                { text: 'state', dataIndex: 'state', menuDisabled: true, width: 160 },
                { text: 'available-start-date', dataIndex: 'available_start_date', menuDisabled: true, width: 160 },
                { text: 'available-end-date', dataIndex: 'available_end_date', menuDisabled: true, width: 160 },
                { text: 'discount-start-date', dataIndex: 'discount_start_date', menuDisabled: true, width: 160 },
                { text: 'discount-end-date', dataIndex: 'discount_end_date', menuDisabled: true, width: 160 },
                { text: 'update-delete', dataIndex: 'update_delete', menuDisabled: true, width: 160 },
                { text: 'seller-internal-sku', dataIndex: 'seller_internal_sku', menuDisabled: true, width: 160 }                                
            ]
        },

        BKM: {
            store: 'buildBelkMpStore',
            columns: [
                { text: 'Category', dataIndex: 'category', menuDisabled: true, width: 200 },
                { text: 'Product Id', dataIndex: 'product_id', menuDisabled: true, width: 160 },
                { text: 'belk.com Product Name', dataIndex: 'product_name', menuDisabled: true, width: 200 },
                { text: 'NRF Color Code', dataIndex: 'nrf_color_code', menuDisabled: true, width: 160 },
                { text: 'Brand', dataIndex: 'brand', menuDisabled: true, width: 160 },
                { text: 'Product Description', dataIndex: 'product_description', menuDisabled: true, width: 240 },                
                { text: 'Abbreviated Product Name', dataIndex: 'abbr_product_name', menuDisabled: true, width: 200 },
                { text: 'Style Description', dataIndex: 'style_description', menuDisabled: true, width: 240 },
                { text: 'Style#', dataIndex: 'style_number', menuDisabled: true, width: 120 },                
                { text: 'UPC', dataIndex: 'upc', menuDisabled: true, width: 120 },
                { 
                    text: 'Length', dataIndex: 'length', menuDisabled: true, width: 120,
                    editor: {
                        xtype: 'textfield',
                        fieldCls: 'required'
                    }  
                },                
                { text: 'Main Image', dataIndex: 'main_image', menuDisabled: true, width: 240 },
                { text: 'Image B', dataIndex: 'image_b', menuDisabled: true, width: 240 },
                { text: 'Image C', dataIndex: 'image_c', menuDisabled: true, width: 240 },
                { text: 'Main Swatch Image', dataIndex: 'main_swatch', menuDisabled: true, width: 240 },
                { text: 'Vendor Color Description', dataIndex: 'vendor_color', menuDisabled: true, width: 160 },                
                { text: 'NRF Size Code', dataIndex: 'nrf_size', menuDisabled: true, width: 120 },                
                { 
                    text: 'Activewear', dataIndex: 'activewear', menuDisabled: true, width: 160,
                    editor: {
                        xtype: "combo",                        
                        valueField: 'value',
                        displayField: 'label',     
                        fieldCls: 'required',                                             
                        store: ['Yes', 'No'],                                                                                                                  
                        queryMode: 'local'
                    }
                },
                { 
                    text: 'Closure Type', dataIndex: 'closure_type', menuDisabled: true, width: 160,
                    editor: {
                        xtype: 'combo',                                
                        displayField: 'label',
                        valueField: 'value',     
                        fieldCls: 'required',                
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
                            store: '{closureTypes}'                    
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
                    text: 'Coat Type', dataIndex: 'coat_type', menuDisabled: true, width: 100,
                    editor: {
                        xtype: 'combo',                                
                        displayField: 'label',
                        valueField: 'value',     
                        fieldCls: 'required',                
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
                            store: '{coatTypes}'                    
                        },                         
                        plugins: [{
                            ptype: "cleartrigger"
                        }]
                    } 
                },
                { 
                    text: 'Garment Length', dataIndex: 'garment_length', menuDisabled: true, width: 160,
                    editor: {
                        xtype: 'textfield',
                        fieldCls: 'required', 
                        hideTrigger: true
                    } 
                },
                { text: 'Gender', dataIndex: 'gender', menuDisabled: true, width: 120 },
                { 
                    text: 'Jacket Type', dataIndex: 'jacket_type', menuDisabled: true, width: 160,
                    editor: {
                        xtype: 'combo',                                
                        displayField: 'label',
                        valueField: 'value',  
                        fieldCls: 'required',                   
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
                            store: '{jacketTypes}'                    
                        },                        
                        plugins: [{
                            ptype: "cleartrigger"
                        }]
                    } 
                },
                { 
                    text: 'Lined', dataIndex: 'lined', menuDisabled: true, width: 100,
                    editor: {
                        xtype: "combo",
                        name: 'lined',                
                        fieldCls: 'required',                
                        //labelWidth: 50,
                        //width: 470,      
                        store: ['Yes', 'No'],                       
                        valueField: 'value',
                        displayField: 'label',                                                                                                                                                           
                        queryMode: 'local'
                    } 
                },
                { 
                    text: 'Material', dataIndex: 'material', menuDisabled: true, width: 200,
                    editor: {
                        xtype: 'combo',                                
                        displayField: 'label',
                        valueField: 'value',  
                        fieldCls: 'required',                   
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
                            store: '{materials}'                    
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
                    text: 'Sleeve Length', dataIndex: 'sleeve_length', menuDisabled: true, width: 160,
                    editor: {
                        xtype: 'combo',                                
                        displayField: 'label',
                        valueField: 'value',  
                        fieldCls: 'required',                   
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
                            store: '{sleeveTypes}'                    
                        },                          
                        plugins: [{
                            ptype: "cleartrigger"
                        }]
                    }  
                },
                { 
                    text: 'Special Sizes', dataIndex: 'special_size', menuDisabled: true, width: 120,
                    editor: {
                        xtype: 'combo',                                
                        displayField: 'label',
                        valueField: 'value',  
                        fieldCls: 'required',                   
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
                            store: '{specialTypes}'                    
                        },                           
                        plugins: [{
                            ptype: "cleartrigger"
                        }]
                    }  
                },
                { 
                    text: 'Dress Type', dataIndex: 'dress_type', menuDisabled: true, width: 120,
                    editor: {
                        xtype: 'combo',                                
                        displayField: 'label',
                        valueField: 'value',  
                        fieldCls: 'required',                   
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
                            store: '{dressTypes}'                    
                        },                           
                        plugins: [{
                            ptype: "cleartrigger"
                        }]
                    }  
                },
                /*
                { 
                    text: 'Sleeve Style', dataIndex: 'sleeve_style', menuDisabled: true, width: 120,
                    editor: {
                        xtype: 'textfield',
                        fieldCls: 'required', 
                        hideTrigger: true
                    }  
                },
                */
                { 
                    text: 'Inseam', dataIndex: 'inseam', menuDisabled: true, width: 120,
                    editor: {
                        xtype: 'textfield',
                        fieldCls: 'required', 
                        hideTrigger: true
                    }  
                },
                { 
                    text: 'Leg Style', dataIndex: 'leg_style', menuDisabled: true, width: 160,
                    editor: {
                        xtype: 'combo',                                
                        displayField: 'label',
                        valueField: 'value',  
                        fieldCls: 'required',                   
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
                            store: '{legStyles}'                    
                        },                          
                        plugins: [{
                            ptype: "cleartrigger"
                        }]
                    }  
                },
                { 
                    text: 'Pants Fit', dataIndex: 'pants_fit', menuDisabled: true, width: 160,
                    editor: {
                        xtype: 'combo',                                
                        displayField: 'label',
                        valueField: 'value',  
                        fieldCls: 'required',                   
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
                            store: '{pantsFits}'                    
                        },                          
                        plugins: [{
                            ptype: "cleartrigger"
                        }]
                    }  
                },
                { 
                    text: 'Pants Type', dataIndex: 'pants_type', menuDisabled: true, width: 160,
                    editor: {
                        xtype: 'combo',                                
                        displayField: 'label',
                        valueField: 'value',  
                        fieldCls: 'required',                   
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
                            store: '{pantsTypes}'                    
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
                    text: 'Pockets', dataIndex: 'pockets', menuDisabled: true, width: 100,
                    editor: {
                        xtype: "combo",
                        name: 'pocket',                
                        fieldCls: 'required',                
                        //labelWidth: 50,
                        //width: 470,      
                        store: ['Yes', 'No'],                       
                        valueField: 'value',
                        displayField: 'label',                                                                                                                                                           
                        queryMode: 'local'
                    }  
                },
                { 
                    text: 'Size Length', dataIndex: 'size_length', menuDisabled: true, width: 120,
                    editor: {
                        xtype: 'textfield',
                        fieldCls: 'required'
                    }  
                },
                { 
                    text: 'Waist Rise', dataIndex: 'waist_raise', menuDisabled: true, width: 160,
                    editor: {
                        xtype: 'combo',                                
                        displayField: 'label',
                        valueField: 'value',  
                        fieldCls: 'required',                   
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
                            store: '{waists}'                    
                        },                          
                        plugins: [{
                            ptype: "cleartrigger"
                        }]
                    }  
                },
                { 
                    text: 'Top Type', dataIndex: 'top_type', menuDisabled: true, width: 160,
                    editor: {
                        xtype: 'combo',                                
                        displayField: 'label',
                        valueField: 'value',  
                        fieldCls: 'required',                   
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
                            store: '{topTypes}'                    
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
                }
            ]
        },

        SPOER: {
            store: 'buildSpoMpStore',
            columns: [
                { text: 'Category', dataIndex: 'category', menuDisabled: true, width: 200 },
                { text: 'SKU', dataIndex: 'sku', menuDisabled: true, width: 160 },
                { text: 'Title', dataIndex: 'title', menuDisabled: true, width: 200 },
                { text: 'Description', dataIndex: 'description', menuDisabled: true, width: 240 },  
                { text: 'Variant ID', dataIndex: 'variantId', menuDisabled: true, width: 120 },
                { text: 'Designer', dataIndex: 'designer', menuDisabled: true, width: 160 },
                { text: 'Image Link 1', dataIndex: 'image_link_1', menuDisabled: true, width: 240 },
                { text: 'MSRP', dataIndex: 'msrp', menuDisabled: true, width: 120 },
                { text: 'Weight', dataIndex: 'weight', menuDisabled: true, width: 100 },
                { text: 'UPC', dataIndex: 'upc', menuDisabled: true, width: 120 },
                { text: 'Handling Time', dataIndex: 'handling_time', menuDisabled: true, width: 120 },
                { text: 'Model Number', dataIndex: 'model_number', menuDisabled: true, width: 120 },
                { text: 'Designer Color', dataIndex: 'color', menuDisabled: true, width: 160 },
                { text: 'Image Link 2', dataIndex: 'image_link_2', menuDisabled: true, width: 240 },
                { text: 'Image Link 3', dataIndex: 'image_link_3', menuDisabled: true, width: 240 },
                { text: 'Image Link 4', dataIndex: 'image_link_4', menuDisabled: true, width: 240 },
                { 
                    text: 'Final Sale', dataIndex: 'final_sale', menuDisabled: true, width: 100,            
                    editor: {
                        xtype: "combo",                        
                        valueField: 'value',
                        displayField: 'label',     
                        fieldCls: 'required',                                             
                        store: ['True', 'False'],                                                                                                                  
                        queryMode: 'local'
                    }
                },                              
                { 
                    text: 'Product Condition', dataIndex: 'product_condition', menuDisabled: true, width: 100,
                    editor: {
                        xtype: "combo",                        
                        valueField: 'value',
                        displayField: 'label',     
                        fieldCls: 'required',                                             
                        store: ['New'],                                                                                                                  
                        queryMode: 'local'
                    }
                },
                { text: 'Normalized Color', dataIndex: 'normalized_color', menuDisabled: true, width: 120 },
                { text: 'Womens Clothing Tops Size', dataIndex: 'womens_clothing_tops_size', menuDisabled: true, width: 120 },                
                { text: 'Womens Clothing Bottoms Size', dataIndex: 'womens_clothing_bottoms_size', menuDisabled: true, width: 120 }                                                            
            ]
        },

        SPOEF: {
            store: 'buildSpoMpStore',
            columns: [
                { text: 'Category', dataIndex: 'category', menuDisabled: true, width: 200 },
                { text: 'SKU', dataIndex: 'sku', menuDisabled: true, width: 160 },
                { text: 'Title', dataIndex: 'title', menuDisabled: true, width: 200 },
                { text: 'Description', dataIndex: 'description', menuDisabled: true, width: 240 },  
                { text: 'Variant ID', dataIndex: 'variantId', menuDisabled: true, width: 120 },
                { text: 'Designer', dataIndex: 'designer', menuDisabled: true, width: 160 },
                { text: 'Image Link 1', dataIndex: 'image_link_1', menuDisabled: true, width: 240 },
                { text: 'MSRP', dataIndex: 'msrp', menuDisabled: true, width: 120 },
                { text: 'Weight', dataIndex: 'weight', menuDisabled: true, width: 100 },
                { text: 'UPC', dataIndex: 'upc', menuDisabled: true, width: 120 },
                { text: 'Handling Time', dataIndex: 'handling_time', menuDisabled: true, width: 120 },
                { text: 'Model Number', dataIndex: 'model_number', menuDisabled: true, width: 120 },
                { text: 'Designer Color', dataIndex: 'color', menuDisabled: true, width: 160 },
                { text: 'Image Link 2', dataIndex: 'image_link_2', menuDisabled: true, width: 240 },
                { text: 'Image Link 3', dataIndex: 'image_link_3', menuDisabled: true, width: 240 },
                { text: 'Image Link 4', dataIndex: 'image_link_4', menuDisabled: true, width: 240 },
                { 
                    text: 'Final Sale', dataIndex: 'final_sale', menuDisabled: true, width: 100,            
                    editor: {
                        xtype: "combo",                        
                        valueField: 'value',
                        displayField: 'label',     
                        fieldCls: 'required',                                             
                        store: ['true', 'false'],                                                                                                                  
                        queryMode: 'local'
                    }
                },                              
                { 
                    text: 'Product Condition', dataIndex: 'product_condition', menuDisabled: true, width: 100,
                    editor: {
                        xtype: "combo",                        
                        valueField: 'value',
                        displayField: 'label',     
                        fieldCls: 'required',                                             
                        store: ['New'],                                                                                                                  
                        queryMode: 'local'
                    }
                },
                { text: 'Normalized Color', dataIndex: 'normalized_color', menuDisabled: true, width: 120 },
                { text: 'Womens Clothing Tops Size', dataIndex: 'womens_clothing_tops_size', menuDisabled: true, width: 120 },                
                { text: 'Womens Clothing Bottoms Size', dataIndex: 'womens_clothing_bottoms_size', menuDisabled: true, width: 120 }                                                            
            ]
        },

        AMM: {
            store: 'buildAmazonMpStore',
            columns: [
                { text: 'Product Type', dataIndex: 'product_type', menuDisabled: true, width: 120 },
                { text: 'Seller SKU', dataIndex: 'seller_sku', menuDisabled: true, width: 120 },
                { text: 'Brand Name', dataIndex: 'brand_name', menuDisabled: true, width: 120 },
                { text: 'Product Name', dataIndex: 'product_name', menuDisabled: true, width: 120 },
                { text: 'Product ID', dataIndex: 'product_id', menuDisabled: true, width: 120 },
                { text: 'Product ID Type', dataIndex: 'product_id_type', menuDisabled: true, width: 120 },
                { text: 'Item Type Keyword', dataIndex: 'item_type_keyword', menuDisabled: true, width: 120 },
                { text: 'Outer Material Type', dataIndex: 'outer_material_type', menuDisabled: true, width: 120 },
                { text: 'Outer Material Type', dataIndex: 'outer_material_type1', menuDisabled: true, width: 120 },
                { text: 'Outer Material Type', dataIndex: 'outer_material_type2', menuDisabled: true, width: 120 },
                { text: 'Outer Material Type', dataIndex: 'outer_material_type3', menuDisabled: true, width: 120 },
                { text: 'Outer Material Type', dataIndex: 'outer_material_type4', menuDisabled: true, width: 120 },
                { text: 'Color', dataIndex: 'color', menuDisabled: true, width: 120 },
                { text: 'Color Map', dataIndex: 'color_map', menuDisabled: true, width: 120 },
                { text: 'Department', dataIndex: 'department', menuDisabled: true, width: 120 },
                { text: 'NeckStyle', dataIndex: 'neckstyle', menuDisabled: true, width: 120 },
                { text: 'pattern-style', dataIndex: 'pattern_style', menuDisabled: true, width: 120 },
                { text: 'Size', dataIndex: 'size', menuDisabled: true, width: 120 },
                { text: 'Style', dataIndex: 'style', menuDisabled: true, width: 120 },
                { text: 'Occasion Lifestyle', dataIndex: 'occasion_lifestyle', menuDisabled: true, width: 120 },
                { text: 'Product Lifecycle Supply Type', dataIndex: 'product_lifecycle_supply_type', menuDisabled: true, width: 120 },
                { text: 'Size Map', dataIndex: 'size_map', menuDisabled: true, width: 120 },
                { text: 'Item Length', dataIndex: 'item_length', menuDisabled: true, width: 120 },
                { text: 'Fabric Type', dataIndex: 'fabric_type', menuDisabled: true, width: 120 },
                { text: 'Material/Fabric Regulations', dataIndex: 'material_fabric_regulations', menuDisabled: true, width: 120 },
                { text: 'Material/Fabric Regulations', dataIndex: 'material_fabric_regulations1', menuDisabled: true, width: 120 },
                { text: 'Material/Fabric Regulations', dataIndex: 'material_fabric_regulations2', menuDisabled: true, width: 120 },
                { text: 'Your Price', dataIndex: 'your_price', menuDisabled: true, width: 120 },
                { text: 'Quantity', dataIndex: 'quantity', menuDisabled: true, width: 120 },
                { text: 'Main Image URL', dataIndex: 'main_image_url', menuDisabled: true, width: 120 },
                { text: 'Target Gender', dataIndex: 'target_gender', menuDisabled: true, width: 120 },
                { text: 'Age Range Description', dataIndex: 'age_range_description', menuDisabled: true, width: 120 },
                { text: 'Apparel Size System', dataIndex: 'apparel_size_system', menuDisabled: true, width: 120 },
                { text: 'Apparel Size Class', dataIndex: 'apparel_size_class', menuDisabled: true, width: 120 },
                { text: 'Apparel Size Value', dataIndex: 'apparel_size_value', menuDisabled: true, width: 120 },
                { text: 'Apparel Size To Range', dataIndex: 'apparel_size_to_range', menuDisabled: true, width: 120 },
                { text: 'Apparel Size Body Type', dataIndex: 'apparel_size_body_type', menuDisabled: true, width: 120 },
                { text: 'Apparel Size Height Type', dataIndex: 'apparel_size_height_type', menuDisabled: true, width: 120 },
                { text: 'Other Image URL1', dataIndex: 'other_image_url1', menuDisabled: true, width: 120 },
                { text: 'Other Image URL2', dataIndex: 'other_image_url2', menuDisabled: true, width: 120 },
                { text: 'Other Image URL3', dataIndex: 'other_image_url3', menuDisabled: true, width: 120 },
                { text: 'Other Image URL4', dataIndex: 'other_image_url4', menuDisabled: true, width: 120 },
                { text: 'Other Image URL5', dataIndex: 'other_image_url5', menuDisabled: true, width: 120 },
                { text: 'Other Image URL6', dataIndex: 'other_image_url6', menuDisabled: true, width: 120 },
                { text: 'Other Image URL7', dataIndex: 'other_image_url7', menuDisabled: true, width: 120 },
                { text: 'Other Image URL8', dataIndex: 'other_image_url8', menuDisabled: true, width: 120 },
                { text: 'Parentage', dataIndex: 'parentage', menuDisabled: true, width: 120 },
                { text: 'Parent SKU', dataIndex: 'parent_sku', menuDisabled: true, width: 120 },
                { text: 'Relationship Type', dataIndex: 'relationship_type', menuDisabled: true, width: 120 },
                { text: 'Variation Theme', dataIndex: 'variation_theme', menuDisabled: true, width: 120 },
                { text: 'Package Level', dataIndex: 'package_level', menuDisabled: true, width: 120 },
                { text: 'package_contains_quantity', dataIndex: 'package_contains_quantity', menuDisabled: true, width: 120 },
                { text: 'package_contains_identifier', dataIndex: 'package_contains_identifier', menuDisabled: true, width: 120 },
                { text: 'Update Delete', dataIndex: 'update_delete', menuDisabled: true, width: 120 },
                { text: 'Product Description', dataIndex: 'product_description', menuDisabled: true, width: 120 },
                { text: 'Closure Type', dataIndex: 'closure_type', menuDisabled: true, width: 120 },
                { text: 'Style Number', dataIndex: 'style_number', menuDisabled: true, width: 120 },
                { text: 'Inner Material Type', dataIndex: 'inner_material_type', menuDisabled: true, width: 120 },
                { text: 'Manufacturer Part Number', dataIndex: 'manufacturer_part_number', menuDisabled: true, width: 120 },
                { text: 'Manufacturer', dataIndex: 'manufacturer', menuDisabled: true, width: 120 },
                { text: 'Key Product Features', dataIndex: 'key_product_features', menuDisabled: true, width: 120 },
                { text: 'Key Product Features', dataIndex: 'key_product_features1', menuDisabled: true, width: 120 },
                { text: 'Key Product Features', dataIndex: 'key_product_features2', menuDisabled: true, width: 120 },
                { text: 'Key Product Features', dataIndex: 'key_product_features3', menuDisabled: true, width: 120 },
                { text: 'Key Product Features', dataIndex: 'key_product_features4', menuDisabled: true, width: 120 },
                { text: 'Search Terms', dataIndex: 'search_terms', menuDisabled: true, width: 120 },
                { text: 'belt-style', dataIndex: 'belt_style', menuDisabled: true, width: 120 },
                { text: 'Collar Type', dataIndex: 'collar_type', menuDisabled: true, width: 120 },
                { text: 'Control Type', dataIndex: 'control_type', menuDisabled: true, width: 120 },
                { text: 'Fit Type', dataIndex: 'fit_type', menuDisabled: true, width: 120 },
                { text: 'Country/Region as Labeled', dataIndex: 'country_region_as_labeled', menuDisabled: true, width: 120 },
                { text: 'Fur Description', dataIndex: 'fur_description', menuDisabled: true, width: 120 },
                { text: 'pocket-description', dataIndex: 'pocket_description', menuDisabled: true, width: 120 },
                { text: 'Special Size Type', dataIndex: 'special_size_type', menuDisabled: true, width: 120 },
                { text: 'Additional Features', dataIndex: 'additional_features', menuDisabled: true, width: 120 },
                { text: 'Additional Features', dataIndex: 'additional_features1', menuDisabled: true, width: 120 },
                { text: 'Additional Features', dataIndex: 'additional_features2', menuDisabled: true, width: 120 },
                { text: 'Additional Features', dataIndex: 'additional_features3', menuDisabled: true, width: 120 },
                { text: 'Additional Features', dataIndex: 'additional_features4', menuDisabled: true, width: 120 },
                { text: 'theme', dataIndex: 'theme', menuDisabled: true, width: 120 },
                { text: 'top-style', dataIndex: 'top_style', menuDisabled: true, width: 120 },
                { text: 'water-resistance-level', dataIndex: 'water_resistance_level', menuDisabled: true, width: 120 },
                { text: 'Is Autographed', dataIndex: 'is_autographed', menuDisabled: true, width: 120 },
                { text: 'athlete', dataIndex: 'athlete', menuDisabled: true, width: 120 },
                { text: 'team_name', dataIndex: 'team_name', menuDisabled: true, width: 120 },
                { text: 'material_type', dataIndex: 'material_type', menuDisabled: true, width: 120 },
                { text: 'Weave Type', dataIndex: 'weave_type', menuDisabled: true, width: 120 },
                { text: 'league_name', dataIndex: 'league_name', menuDisabled: true, width: 120 },
                { text: 'Shaft Style Type', dataIndex: 'shaft_style_type', menuDisabled: true, width: 120 },
                { text: 'Bottom Style', dataIndex: 'bottom_style', menuDisabled: true, width: 120 },
                { text: 'fabric-wash', dataIndex: 'fabric_wash', menuDisabled: true, width: 120 },
                { text: 'Sleeve Type', dataIndex: 'sleeve_type', menuDisabled: true, width: 120 },
                { text: 'underwire-type', dataIndex: 'underwire_type', menuDisabled: true, width: 120 },
                { text: 'Duration Unit', dataIndex: 'duration_unit', menuDisabled: true, width: 120 },
                { text: 'legal_compliance_certification_certifying_authority_name', dataIndex: 'legal_compliance_certification_certifying_authority_name', menuDisabled: true, width: 120 },
                { text: 'Duration', dataIndex: 'duration', menuDisabled: true, width: 120 },
                { text: 'legal_compliance_certification_geographic_jurisdiction', dataIndex: 'legal_compliance_certification_geographic_jurisdiction', menuDisabled: true, width: 120 },
                { text: 'Shipping Weight', dataIndex: 'shipping_weight', menuDisabled: true, width: 120 },
                { text: 'Website Shipping Weight Unit Of Measure', dataIndex: 'website_shipping_weight_unit_of_measure', menuDisabled: true, width: 120 },
                { text: 'Chest Size', dataIndex: 'chest_size', menuDisabled: true, width: 120 },
                { text: 'Chest Size Unit Of Measure', dataIndex: 'chest_size_unit_of_measure', menuDisabled: true, width: 120 },
                { text: 'Band Size Numeric', dataIndex: 'band_size_numeric', menuDisabled: true, width: 120 },
                { text: 'Band Size Num Unit Of Measure', dataIndex: 'band_size_num_unit_of_measure', menuDisabled: true, width: 120 },
                { text: 'Cup Size', dataIndex: 'cup_size', menuDisabled: true, width: 120 },
                { text: 'Neck Size', dataIndex: 'neck_size', menuDisabled: true, width: 120 },
                { text: 'Neck Size Unit Of Measure', dataIndex: 'neck_size_unit_of_measure', menuDisabled: true, width: 120 },
                { text: 'SleeveLength', dataIndex: 'sleevelength', menuDisabled: true, width: 120 },
                { text: 'Sleeve Length Unit Of Measure', dataIndex: 'sleeve_length_unit_of_measure', menuDisabled: true, width: 120 },
                { text: 'WaistSize', dataIndex: 'waistsize', menuDisabled: true, width: 120 },
                { text: 'Waist Size Unit Of Measure', dataIndex: 'waist_size_unit_of_measure', menuDisabled: true, width: 120 },
                { text: 'Item Length', dataIndex: 'item_length1', menuDisabled: true, width: 120 },
                { text: 'Item Width', dataIndex: 'item_width', menuDisabled: true, width: 120 },
                { text: 'Item Height', dataIndex: 'item_height', menuDisabled: true, width: 120 },
                { text: 'Item Dimensions Unit Of Measure', dataIndex: 'item_dimensions_unit_of_measure', menuDisabled: true, width: 120 },
                { text: 'Fulfillment Center ID', dataIndex: 'fulfillment_center_id', menuDisabled: true, width: 120 },
                { text: 'Package Height', dataIndex: 'package_height', menuDisabled: true, width: 120 },
                { text: 'Package Width', dataIndex: 'package_width', menuDisabled: true, width: 120 },
                { text: 'Package Length', dataIndex: 'package_length', menuDisabled: true, width: 120 },
                { text: 'Package Weight', dataIndex: 'package_weight', menuDisabled: true, width: 120 },
                { text: 'Package Weight Unit Of Measure', dataIndex: 'package_weight_unit_of_measure', menuDisabled: true, width: 120 },
                { text: 'Package Dimensions Unit Of Measure', dataIndex: 'package_dimensions_unit_of_measure', menuDisabled: true, width: 120 },
                { text: 'Compliance Regulation Type', dataIndex: 'compliance_regulation_type', menuDisabled: true, width: 120 },
                { text: 'Compliance Regulation Type', dataIndex: 'compliance_regulation_type1', menuDisabled: true, width: 120 },
                { text: 'Compliance Regulation Type', dataIndex: 'compliance_regulation_type2', menuDisabled: true, width: 120 },
                { text: 'Compliance Regulation Type', dataIndex: 'compliance_regulation_type3', menuDisabled: true, width: 120 },
                { text: 'Compliance Regulation Type', dataIndex: 'compliance_regulation_type4', menuDisabled: true, width: 120 },
                { text: 'Regulatory Identification', dataIndex: 'regulatory_identification', menuDisabled: true, width: 120 },
                { text: 'Regulatory Identification', dataIndex: 'regulatory_identification1', menuDisabled: true, width: 120 },
                { text: 'Regulatory Identification', dataIndex: 'regulatory_identification2', menuDisabled: true, width: 120 },
                { text: 'Regulatory Identification', dataIndex: 'regulatory_identification3', menuDisabled: true, width: 120 },
                { text: 'Regulatory Identification', dataIndex: 'regulatory_identification4', menuDisabled: true, width: 120 },
                { text: 'Cpsia Warning', dataIndex: 'cpsia_warning', menuDisabled: true, width: 120 },
                { text: 'CPSIA Warning Description', dataIndex: 'cpsia_warning_description', menuDisabled: true, width: 120 },
                { text: 'Import Designation', dataIndex: 'import_designation', menuDisabled: true, width: 120 },
                { text: 'item_weight_unit_of_measure', dataIndex: 'item_weight_unit_of_measure', menuDisabled: true, width: 120 },
                { text: 'Item Weight', dataIndex: 'item_weight', menuDisabled: true, width: 120 },
                { text: 'Country/Region of Origin', dataIndex: 'country_region_of_origin', menuDisabled: true, width: 120 },
                { text: 'Is this product a battery or does it utilize batteries?', dataIndex: 'is_this_product_a_battery_or_does_it_utilize_batteries?', menuDisabled: true, width: 120 },
                { text: 'Batteries are Included', dataIndex: 'batteries_are_included', menuDisabled: true, width: 120 },
                { text: 'Battery composition', dataIndex: 'battery_composition', menuDisabled: true, width: 120 },
                { text: 'Battery type/size', dataIndex: 'battery_type_size', menuDisabled: true, width: 120 },
                { text: 'Battery type/size', dataIndex: 'battery_type_size1', menuDisabled: true, width: 120 },
                { text: 'Battery type/size', dataIndex: 'battery_type_size2', menuDisabled: true, width: 120 },
                { text: 'Number of batteries', dataIndex: 'number_of_batteries', menuDisabled: true, width: 120 },
                { text: 'Number of batteries', dataIndex: 'number_of_batteries1', menuDisabled: true, width: 120 },
                { text: 'Number of batteries', dataIndex: 'number_of_batteries2', menuDisabled: true, width: 120 },
                { text: 'Battery weight (grams)', dataIndex: 'battery_weight_grams', menuDisabled: true, width: 120 },
                { text: 'battery_weight_unit_of_measure', dataIndex: 'battery_weight_unit_of_measure', menuDisabled: true, width: 120 },
                { text: 'Number of Lithium Metal Cells', dataIndex: 'number_of_lithium_metal_cells', menuDisabled: true, width: 120 },
                { text: 'Number of Lithium-ion Cells', dataIndex: 'number_of_lithium_ion_cells', menuDisabled: true, width: 120 },
                { text: 'Lithium Battery Packaging', dataIndex: 'lithium_battery_packaging', menuDisabled: true, width: 120 },
                { text: 'Watt hours per battery', dataIndex: 'watt_hours_per_battery', menuDisabled: true, width: 120 },
                { text: 'lithium_battery_energy_content_unit_of_measure', dataIndex: 'lithium_battery_energy_content_unit_of_measure', menuDisabled: true, width: 120 },
                { text: 'Lithium content (grams)', dataIndex: 'lithium_content_grams', menuDisabled: true, width: 120 },
                { text: 'lithium_battery_weight_unit_of_measure', dataIndex: 'lithium_battery_weight_unit_of_measure', menuDisabled: true, width: 120 },
                { text: 'Applicable Dangerous Goods Regulations', dataIndex: 'applicable_dangerous_goods_regulations', menuDisabled: true, width: 120 },
                { text: 'Applicable Dangerous Goods Regulations', dataIndex: 'applicable_dangerous_goods_regulations1', menuDisabled: true, width: 120 },
                { text: 'Applicable Dangerous Goods Regulations', dataIndex: 'applicable_dangerous_goods_regulations2', menuDisabled: true, width: 120 },
                { text: 'Applicable Dangerous Goods Regulations', dataIndex: 'applicable_dangerous_goods_regulations3', menuDisabled: true, width: 120 },
                { text: 'Applicable Dangerous Goods Regulations', dataIndex: 'applicable_dangerous_goods_regulations4', menuDisabled: true, width: 120 },
                { text: 'UN number', dataIndex: 'un_number', menuDisabled: true, width: 120 },
                { text: 'Safety Data Sheet (SDS) URL', dataIndex: 'safety_data_sheet_sds_url', menuDisabled: true, width: 120 },
                { text: 'Volume', dataIndex: 'volume', menuDisabled: true, width: 120 },
                { text: 'item_volume_unit_of_measure', dataIndex: 'item_volume_unit_of_measure', menuDisabled: true, width: 120 },
                { text: 'legal_compliance_certification_expiration_date', dataIndex: 'legal_compliance_certification_expiration_date', menuDisabled: true, width: 120 },
                { text: 'Regulatory Organization Name', dataIndex: 'regulatory_organization_name', menuDisabled: true, width: 120 },
                { text: 'Compliance Certification Status', dataIndex: 'compliance_certification_status', menuDisabled: true, width: 120 },
                { text: 'Flash point (°C)?', dataIndex: 'flash_point', menuDisabled: true, width: 120 },
                { text: 'legal_compliance_certification_date_of_issue', dataIndex: 'legal_compliance_certification_date_of_issue', menuDisabled: true, width: 120 },
                { text: 'legal_compliance_certification_metadata', dataIndex: 'legal_compliance_certification_metadata', menuDisabled: true, width: 120 },
                { text: 'Legal Compliance Certification', dataIndex: 'legal_compliance_certification', menuDisabled: true, width: 120 },
                { text: 'Categorization/GHS pictograms (select all that apply)', dataIndex: 'categorization_ghs_pictograms', menuDisabled: true, width: 120 },
                { text: 'Categorization/GHS pictograms (select all that apply)', dataIndex: 'categorization_ghs_pictograms1', menuDisabled: true, width: 120 },
                { text: 'Categorization/GHS pictograms (select all that apply)', dataIndex: 'categorization_ghs_pictograms2', menuDisabled: true, width: 120 },
                { text: 'California Proposition 65 Warning Type', dataIndex: 'california_proposition_65_warning_type', menuDisabled: true, width: 120 },
                { text: 'California Proposition 65 Chemical Names', dataIndex: 'california_proposition_65_chemical_names', menuDisabled: true, width: 120 },
                { text: 'Additional Chemical Name1', dataIndex: 'additional_chemical_name1', menuDisabled: true, width: 120 },
                { text: 'Additional Chemical Name2', dataIndex: 'additional_chemical_name2', menuDisabled: true, width: 120 },
                { text: 'Additional Chemical Name3', dataIndex: 'additional_chemical_name3', menuDisabled: true, width: 120 },
                { text: 'Additional Chemical Name4', dataIndex: 'additional_chemical_name4', menuDisabled: true, width: 120 },
                { text: 'Pesticide Marking', dataIndex: 'pesticide_marking', menuDisabled: true, width: 120 },
                { text: 'Pesticide Marking', dataIndex: 'pesticide_marking', menuDisabled: true, width: 120 },
                { text: 'Pesticide Marking', dataIndex: 'pesticide_marking', menuDisabled: true, width: 120 },
                { text: 'Pesticide Registration Status', dataIndex: 'pesticide_registration_status', menuDisabled: true, width: 120 },
                { text: 'Pesticide Registration Status', dataIndex: 'pesticide_registration_status1', menuDisabled: true, width: 120 },
                { text: 'Pesticide Registration Status', dataIndex: 'pesticide_registration_status2', menuDisabled: true, width: 120 },
                { text: 'Pesticide Certification Number', dataIndex: 'pesticide_certification_number', menuDisabled: true, width: 120 },
                { text: 'Pesticide Certification Number', dataIndex: 'pesticide_certification_number1', menuDisabled: true, width: 120 },
                { text: 'Pesticide Certification Number', dataIndex: 'pesticide_certification_number2', menuDisabled: true, width: 120 },
                { text: 'Radio Frequency Emission & Authorization Status', dataIndex: 'radio_frequency_emission_&_authorization_status', menuDisabled: true, width: 120 },
                { text: 'SDoC Contact Email Address', dataIndex: 'sdoc_contact_email_address', menuDisabled: true, width: 120 },
                { text: 'SDOC Contact US Phone Number', dataIndex: 'sdoc_contact_us_phone_number', menuDisabled: true, width: 120 },
                { text: 'SDoC Contact Name', dataIndex: 'sdoc_contact_name', menuDisabled: true, width: 120 },
                { text: 'FCC ID', dataIndex: 'fcc_id', menuDisabled: true, width: 120 },
                { text: 'SDoC Contact US Mailing Address', dataIndex: 'sdoc_contact_us_mailing_address', menuDisabled: true, width: 120 },
                { text: 'List Price', dataIndex: 'list_price', menuDisabled: true, width: 120 },
                { text: 'Product Tax Code', dataIndex: 'product_tax_code', menuDisabled: true, width: 120 },
                { text: 'Handling Time', dataIndex: 'handling_time', menuDisabled: true, width: 120 },
                { text: 'Launch Date', dataIndex: 'launch_date', menuDisabled: true, width: 120 },
                { text: 'Release Date', dataIndex: 'release_date', menuDisabled: true, width: 120 },
                { text: 'Restock Date', dataIndex: 'restock_date', menuDisabled: true, width: 120 },
                { text: 'Sale Price', dataIndex: 'sale_price', menuDisabled: true, width: 120 },
                { text: 'Sale Start Date', dataIndex: 'sale_start_date', menuDisabled: true, width: 120 },
                { text: 'Sale End Date', dataIndex: 'sale_end_date', menuDisabled: true, width: 120 },
                { text: 'Offer End Date', dataIndex: 'offer_end_date', menuDisabled: true, width: 120 },
                { text: 'Max Aggregate Ship Quantity', dataIndex: 'max_aggregate_ship_quantity', menuDisabled: true, width: 120 },
                { text: 'Package Quantity', dataIndex: 'package_quantity', menuDisabled: true, width: 120 },
                { text: 'Number of Items', dataIndex: 'number_of_items', menuDisabled: true, width: 120 },
                { text: 'Offering Can Be Gift Messaged', dataIndex: 'offering_can_be_gift_messaged', menuDisabled: true, width: 120 },
                { text: 'Is Gift Wrap Available', dataIndex: 'is_gift_wrap_available', menuDisabled: true, width: 120 },
                { text: 'Is Discontinued by Manufacturer', dataIndex: 'is_discontinued_by_manufacturer', menuDisabled: true, width: 120 },
                { text: 'Max Order Quantity', dataIndex: 'max_order_quantity', menuDisabled: true, width: 120 },
                { text: 'Shipping-Template', dataIndex: 'shipping_template', menuDisabled: true, width: 120 },
                { text: 'Offer Start Date', dataIndex: 'offer_start_date', menuDisabled: true, width: 120 },
                { text: 'Business Price', dataIndex: 'business_price', menuDisabled: true, width: 120 },
                { text: 'Quantity Price Type', dataIndex: 'quantity_price_type', menuDisabled: true, width: 120 },
                { text: 'Quantity Lower Bound 1', dataIndex: 'quantity_lower_bound_1', menuDisabled: true, width: 120 },
                { text: 'Quantity Price 1', dataIndex: 'quantity_price_1', menuDisabled: true, width: 120 },
                { text: 'Quantity Lower Bound 2', dataIndex: 'quantity_lower_bound_2', menuDisabled: true, width: 120 },
                { text: 'Quantity Price 2', dataIndex: 'quantity_price_2', menuDisabled: true, width: 120 },
                { text: 'Quantity Lower Bound 3', dataIndex: 'quantity_lower_bound_3', menuDisabled: true, width: 120 },
                { text: 'Quantity Price 3', dataIndex: 'quantity_price_3', menuDisabled: true, width: 120 },
                { text: 'Quantity Lower Bound 4', dataIndex: 'quantity_lower_bound_4', menuDisabled: true, width: 120 },
                { text: 'Quantity Price 4', dataIndex: 'quantity_price_4', menuDisabled: true, width: 120 },
                { text: 'Quantity Lower Bound 5', dataIndex: 'quantity_lower_bound_5', menuDisabled: true, width: 120 },
                { text: 'Quantity Price 5', dataIndex: 'quantity_price_5', menuDisabled: true, width: 120 },
                { text: 'Progressive Discount Type', dataIndex: 'progressive_discount_type', menuDisabled: true, width: 120 },
                { text: 'Progressive Discount Lower Bound 1', dataIndex: 'progressive_discount_lower_bound_1', menuDisabled: true, width: 120 },
                { text: 'Progressive Discount Value 1', dataIndex: 'progressive_discount_value_1', menuDisabled: true, width: 120 },
                { text: 'Progressive Discount Lower Bound 2', dataIndex: 'progressive_discount_lower_bound_2', menuDisabled: true, width: 120 },
                { text: 'Progressive Discount Value 2', dataIndex: 'progressive_discount_value_2', menuDisabled: true, width: 120 },
                { text: 'Progressive Discount Lower Bound 3', dataIndex: 'progressive_discount_lower_bound_3', menuDisabled: true, width: 120 },
                { text: 'Progressive Discount Value 3', dataIndex: 'progressive_discount_value_3', menuDisabled: true, width: 120 },
                { text: 'National Stock Number', dataIndex: 'national_stock_number', menuDisabled: true, width: 120 },
                { text: 'United Nations Standard Products and Services Code', dataIndex: 'united_nations_standard_products_and_services_code', menuDisabled: true, width: 120 },
                { text: 'Pricing Action', dataIndex: 'pricing_action', menuDisabled: true, width: 120 }                                                          
            ]
        }
    }    
})
