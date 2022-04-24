/**
 * Created by tech on 1/18/2022.
 */
 Ext.define('August.view.production.windows.style.web.Template', {
    extend: 'Ext.window.Window',

    requires: [
        'August.view.production.windows.style.web.TemplateController',
        'August.view.production.windows.style.web.TemplateModel',
        'August.model.shopify.shopifyTemplate',
        'August.model.shopify.lordTaylorTemplate',
        'August.model.shopify.HBCTemplate',
        'August.model.shopify.BelkTemplate',
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

        BK: {
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
        }
    }    
})
