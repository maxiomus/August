/**
 * Created by tech on 1/18/2022.
 */
 Ext.define('August.view.production.windows.style.Template', {
    extend: 'Ext.window.Window',

    requires: [
        'August.view.production.windows.style.TemplateController',
        'August.view.production.windows.style.TemplateModel',
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
    
    listeners: {
        actsaveas: 'onActSaveAsClick'
    },

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
        var me = this,
            vm = me.getViewModel();

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
                text: 'Import',
                action: 'import',
                iconCls: 'x-fa fa-file-import',
                handler: 'onImportClick'
            },
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
                },{
                    text: 'FG EXCEL',
                    handler: function(c) {
                        me.fireEvent('actsaveas', c, 'xlsx');
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
                            type: 'list',
                            idField: 'value',
                            labelField: 'label',
                            store: vm.getStore('productCategories')
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

                    header: {
                        //title: 'Detail',
                        iconCls: 'x-fa fa-list',  
                        titlePosition: 2,
                        titleAlign: 'left',
                        itemPosition: 0,
                        items: [{
                            xtype: "combo",               
                            name: 'bkcategory', 
                            //fieldLabel: 'Shopify',
                            //labelWidth: 50,
                            hideLabel: true,
                            valueField: "value",
                            displayField: "label",
                            hidden: true,
                            value: "BKT",
                            editable: false,
                            //reference: "filterSelection",
                            bind: {
                                store: "{bkCategories}"
                            },
                            queryMode: 'local',
                            listeners: {                    
                                select: {
                                    fn: "onBelkCateogrySelect",
                                    scope: 'controller'
                                }                    
                            }
                        },{
                            xtype: "combo",               
                            name: 'fgsheet', 
                            //fieldLabel: 'Shopify',
                            //labelWidth: 50,
                            hideLabel: true,
                            valueField: "value",
                            displayField: "label",
                            hidden: true,
                            value: "FGP",
                            editable: false,
                            //reference: "filterSelection",
                            bind: {
                                store: "{fgSheets}"
                            },
                            queryMode: 'local',
                            listeners: {                    
                                select: {
                                    fn: "onFGSheetSelect",
                                    scope: 'controller'
                                }                    
                            }
                        },{
                            xtype: 'tbspacer',
                            width: 10
                        }]
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

        BK: {
            store: 'buildBKStore',
            columns: [{
                text: 'Class Name', dataIndex: 'class', menuDisabled: true, width: 120
            },
            {
                text: 'Offer Type', dataIndex: 'offer_type', menuDisabled: true, width: 120
            },
            {                
                text: 'Product Avail. Date', dataIndex: 'avail_date', menuDisabled: true, width: 120
            },
            {
                text: 'Brand Name', dataIndex: 'brand_name', menuDisabled: true, width: 120
            },
            {
                text: 'Vendor Style number', dataIndex: 'style_number', menuDisabled: true, width: 120
            },
            {
                text: 'UPC', dataIndex: 'upc', menuDisabled: true, width: 120
            },
            {
                text: 'Item Description', dataIndex: 'item_description', menuDisabled: true, width: 120
            },
            {
                text: 'Size Code', dataIndex: 'size_code', menuDisabled: true, width: 120
            },
            {
                text: 'Size Description', dataIndex: 'size_description', menuDisabled: true, width: 180
            },
            {
                text: 'Color Code', dataIndex: 'color_code', menuDisabled: true, width: 120
            },
            {
                text: 'Color Name', dataIndex: 'color_name', menuDisabled: true, width: 120
            },            
            {
                text: 'Cost', dataIndex: 'cost', menuDisabled: true, width: 120
            },
            {
                text: 'MSRP', dataIndex: 'msrp', menuDisabled: true, width: 120
            },
            {   
                text: 'Retail', dataIndex: 'retail', menuDisabled: true, width: 120
            },
            {   
                text: 'Packages Ship From', dataIndex: 'ship_from', menuDisabled: true, width: 120
            },
            {   
                text: 'Weight', dataIndex: 'weight', menuDisabled: true, width: 120
            },            
            {
                text: 'Length', dataIndex: 'length', menuDisabled: true, width: 120
            },
            {
                text: 'Width', dataIndex: 'width', menuDisabled: true, width: 120
            },     
            {
                text: 'Height', dataIndex: 'height', menuDisabled: true, width: 120
            }] 
        },

        BKT: {
            store: 'buildBKTopStore',
            columns: [{
                text: 'sku', dataIndex: 'sku', menuDisabled: true, width: 120
            },
            {
                text: 'product_status', dataIndex: 'product_status', menuDisabled: true, width: 120
            },
            {                
                text: 'style_number', dataIndex: 'style_number', menuDisabled: true, width: 120
            },
            {
                text: 'Style_Description', dataIndex: 'Style_Description', menuDisabled: true, width: 120
            },
            {
                text: 'GTIN', dataIndex: 'GTIN', menuDisabled: true, width: 120
            },
            {
                text: 'Product_Name', dataIndex: 'Product_Name', menuDisabled: true, width: 120
            },
            {
                text: 'nrfColorCode', dataIndex: 'nrfColorCode', menuDisabled: true, width: 120
            },
            {
                text: 'vendorColorDescription', dataIndex: 'vendorColorDescription', menuDisabled: true, width: 120
            },
            {
                text: 'nrfSizeCode', dataIndex: 'nrfSizeCode', menuDisabled: true, width: 180
            },
            {
                text: 'vendorSizeDescription', dataIndex: 'vendorSizeDescription', menuDisabled: true, width: 120
            },
            {
                text: 'OmniChannel_Brand', dataIndex: 'OmniChannel_Brand', menuDisabled: true, width: 120
            },            
            {
                text: 'Preferred_Copy_Name', dataIndex: 'Preferred_Copy_Name', menuDisabled: true, width: 120
            },
            {
                text: 'Product_Description', dataIndex: 'Product_Description', menuDisabled: true, width: 120
            },
            {   
                text: 'isGroup', dataIndex: 'isGroup', menuDisabled: true, width: 120
            },
            {   
                text: 'groupingID', dataIndex: 'groupingID', menuDisabled: true, width: 120
            },
            {   
                text: 'groupingType', dataIndex: 'groupingType', menuDisabled: true, width: 120
            },
            {   
                text: 'images.image_reference_1', dataIndex: 'image_reference_1', menuDisabled: true, width: 120
            },
            {   
                text: 'images.image_reference_2', dataIndex: 'image_reference_2', menuDisabled: true, width: 120
            },
            {
                text: 'images.image_reference_2', dataIndex: 'image_reference_3', menuDisabled: true, width: 120
            },
            {                
                text: 'images.image_reference_4', dataIndex: 'image_reference_4', menuDisabled: true, width: 120
            },
            {
                text: 'images.image_reference_5', dataIndex: 'image_reference_5', menuDisabled: true, width: 120
            },
            {
                text: 'Choking_Hazard', dataIndex: 'Choking_Hazard', menuDisabled: true, width: 120
            },
            {
                text: 'Prop_65', dataIndex: 'Prop_65', menuDisabled: true, width: 120
            },     
            {
                text: 'Holiday', dataIndex: 'Holiday', menuDisabled: true, width: 120
            },      
            {
                text: 'Country_of_Origin', dataIndex: 'Country_of_Origin', menuDisabled: true, width: 120
            },
            {
                text: 'Material', dataIndex: 'Material', menuDisabled: true, width: 180
            },
            {
                text: 'Activewear', dataIndex: 'Activewear', menuDisabled: true, width: 120
            },
            {
                text: 'Gender', dataIndex: 'Gender', menuDisabled: true, width: 120
            },            
            {
                text: 'Special_Sizes', dataIndex: 'Special_Sizes', menuDisabled: true, width: 120
            },
            {
                text: 'Care', dataIndex: 'Care', menuDisabled: true, width: 120
            },            
            {   
                text: 'Lining_Type', dataIndex: 'Lining_Type', menuDisabled: true, width: 120
            },
            {   
                text: 'Top_Type', dataIndex: 'Top_Type', menuDisabled: true, width: 120
            },
            {   
                text: 'Neckline', dataIndex: 'Neckline', menuDisabled: true, width: 120
            },
            {   
                text: 'Closure_Type', dataIndex: 'Closure_Type', menuDisabled: true, width: 120
            },
            {   
                text: 'iphCategory', dataIndex: 'iphCategory', menuDisabled: true, width: 120
            },
            {   
                text: 'Sleeve_Style', dataIndex: 'Sleeve_Style', menuDisabled: true, width: 120
            },
            {   
                text: 'Sleeve_Length', dataIndex: 'Sleeve_Length', menuDisabled: true, width: 120
            },
            {   
                text: 'Garment_Length', dataIndex: 'Garment_Length', menuDisabled: true, width: 120
            },
            {   
                text: 'title', dataIndex: 'title', menuDisabled: true, width: 120
            }] 
        },

        BKD: {
            store: 'buildBKDressStore',
            columns: [{
                text: 'sku', dataIndex: 'sku', menuDisabled: true, width: 120
            },
            {
                text: 'product_status', dataIndex: 'product_status', menuDisabled: true, width: 120
            },
            {                
                text: 'style_number', dataIndex: 'style_number', menuDisabled: true, width: 120
            },
            {
                text: 'Style_Description', dataIndex: 'Style_Description', menuDisabled: true, width: 120
            },
            {
                text: 'GTIN', dataIndex: 'GTIN', menuDisabled: true, width: 120
            },
            {
                text: 'Product_Name', dataIndex: 'Product_Name', menuDisabled: true, width: 120
            },
            {
                text: 'nrfColorCode', dataIndex: 'nrfColorCode', menuDisabled: true, width: 120
            },
            {
                text: 'vendorColorDescription', dataIndex: 'vendorColorDescription', menuDisabled: true, width: 120
            },
            {
                text: 'nrfSizeCode', dataIndex: 'nrfSizeCode', menuDisabled: true, width: 180
            },
            {
                text: 'vendorSizeDescription', dataIndex: 'vendorSizeDescription', menuDisabled: true, width: 120
            },
            {
                text: 'OmniChannel_Brand', dataIndex: 'OmniChannel_Brand', menuDisabled: true, width: 120
            },            
            {
                text: 'Preferred_Copy_Name', dataIndex: 'Preferred_Copy_Name', menuDisabled: true, width: 120
            },
            {
                text: 'Product_Description', dataIndex: 'Product_Description', menuDisabled: true, width: 120
            },
            {   
                text: 'isGroup', dataIndex: 'isGroup', menuDisabled: true, width: 120
            },
            {   
                text: 'groupingID', dataIndex: 'groupingID', menuDisabled: true, width: 120
            },
            {   
                text: 'groupingType', dataIndex: 'groupingType', menuDisabled: true, width: 120
            },
            {   
                text: 'images.image_reference_1', dataIndex: 'image_reference_1', menuDisabled: true, width: 120
            },
            {   
                text: 'images.image_reference_2', dataIndex: 'image_reference_2', menuDisabled: true, width: 120
            },
            {
                text: 'images.image_reference_3', dataIndex: 'image_reference_3', menuDisabled: true, width: 120
            },
            {                
                text: 'images.image_reference_4', dataIndex: 'image_reference_4', menuDisabled: true, width: 120
            },
            {
                text: 'images.image_reference_5', dataIndex: 'image_reference_5', menuDisabled: true, width: 120
            },
            {
                text: 'Choking_Hazard', dataIndex: 'Choking_Hazard', menuDisabled: true, width: 120
            },
            {
                text: 'Prop_65', dataIndex: 'Prop_65', menuDisabled: true, width: 120
            },            
            {
                text: 'Holiday', dataIndex: 'Holiday', menuDisabled: true, width: 120
            },
            {
                text: 'Country_of_Origin', dataIndex: 'Country_of_Origin', menuDisabled: true, width: 120
            },
            {
                text: 'Material', dataIndex: 'Material', menuDisabled: true, width: 180
            },
            {
                text: 'Activewear', dataIndex: 'Activewear', menuDisabled: true, width: 120
            },
            {
                text: 'Gender', dataIndex: 'Gender', menuDisabled: true, width: 120
            },            
            {
                text: 'Special_Sizes', dataIndex: 'Special_Sizes', menuDisabled: true, width: 120
            },
            {
                text: 'Care', dataIndex: 'Care', menuDisabled: true, width: 120
            },            
            {   
                text: 'Lined', dataIndex: 'Lined', menuDisabled: true, width: 120
            },            
            {   
                text: 'Neckline', dataIndex: 'Neckline', menuDisabled: true, width: 120
            },
            {   
                text: 'Closure_Type', dataIndex: 'Closure_Type', menuDisabled: true, width: 120
            },
            {   
                text: 'iphCategory', dataIndex: 'iphCategory', menuDisabled: true, width: 120
            },
            {   
                text: 'Sleeve_Style', dataIndex: 'Sleeve_Style', menuDisabled: true, width: 120
            },
            {   
                text: 'Sleeve_Length', dataIndex: 'Sleeve_Length', menuDisabled: true, width: 120
            },
            {   
                text: 'Dress_Type', dataIndex: 'Dress_Type', menuDisabled: true, width: 120
            },
            {   
                text: 'Garment_Length', dataIndex: 'Garment_Length', menuDisabled: true, width: 120
            },
            {   
                text: 'Dress_Length', dataIndex: 'Dress_Length', menuDisabled: true, width: 120
            },
            {   
                text: 'title', dataIndex: 'title', menuDisabled: true, width: 120
            }] 
        },
					
        BKC: {
            store: 'buildBKCoatStore',
            columns: [{
                text: 'sku', dataIndex: 'sku', menuDisabled: true, width: 120
            },
            {
                text: 'product_status', dataIndex: 'product_status', menuDisabled: true, width: 120
            },
            {                
                text: 'style_number', dataIndex: 'style_number', menuDisabled: true, width: 120
            },
            {
                text: 'Style_Description', dataIndex: 'Style_Description', menuDisabled: true, width: 120
            },
            {
                text: 'GTIN', dataIndex: 'GTIN', menuDisabled: true, width: 120
            },
            {
                text: 'Product_Name', dataIndex: 'Product_Name', menuDisabled: true, width: 120
            },
            {
                text: 'nrfColorCode', dataIndex: 'nrfColorCode', menuDisabled: true, width: 120
            },
            {
                text: 'vendorColorDescription', dataIndex: 'vendorColorDescription', menuDisabled: true, width: 120
            },
            {
                text: 'nrfSizeCode', dataIndex: 'nrfSizeCode', menuDisabled: true, width: 180
            },
            {
                text: 'vendorSizeDescription', dataIndex: 'vendorSizeDescription', menuDisabled: true, width: 120
            },
            {
                text: 'OmniChannel_Brand', dataIndex: 'OmniChannel_Brand', menuDisabled: true, width: 120
            },            
            {
                text: 'Preferred_Copy_Name', dataIndex: 'Preferred_Copy_Name', menuDisabled: true, width: 120
            },
            {
                text: 'Product_Description', dataIndex: 'Product_Description', menuDisabled: true, width: 120
            },
            {   
                text: 'isGroup', dataIndex: 'isGroup', menuDisabled: true, width: 120
            },
            {   
                text: 'groupingID', dataIndex: 'groupingID', menuDisabled: true, width: 120
            },
            {   
                text: 'groupingType', dataIndex: 'groupingType', menuDisabled: true, width: 120
            },
            {   
                text: 'images.image_reference_1', dataIndex: 'image_reference_1', menuDisabled: true, width: 120
            },
            {   
                text: 'images.image_reference_2', dataIndex: 'image_reference_2', menuDisabled: true, width: 120
            },
            {
                text: 'images.image_reference_3', dataIndex: 'image_reference_3', menuDisabled: true, width: 120
            },
            {                
                text: 'images.image_reference_4', dataIndex: 'image_reference_4', menuDisabled: true, width: 120
            },
            {
                text: 'images.image_reference_5', dataIndex: 'image_reference_5', menuDisabled: true, width: 120
            },
            {
                text: 'Choking_Hazard', dataIndex: 'Choking_Hazard', menuDisabled: true, width: 120
            },
            {
                text: 'Prop_65', dataIndex: 'Prop_65', menuDisabled: true, width: 120
            },            
            {
                text: 'Holiday', dataIndex: 'Holiday', menuDisabled: true, width: 120
            },
            {
                text: 'Country_of_Origin', dataIndex: 'Country_of_Origin', menuDisabled: true, width: 120
            },
            {
                text: 'Material', dataIndex: 'Material', menuDisabled: true, width: 180
            },
            {
                text: 'Activewear', dataIndex: 'Activewear', menuDisabled: true, width: 120
            },
            {
                text: 'Gender', dataIndex: 'Gender', menuDisabled: true, width: 120
            },            
            {
                text: 'Special_Sizes', dataIndex: 'Special_Sizes', menuDisabled: true, width: 120
            },
            {
                text: 'Care', dataIndex: 'Care', menuDisabled: true, width: 120
            },            
            {   
                text: 'Lined', dataIndex: 'Lined', menuDisabled: true, width: 120
            },
            {   
                text: 'Lining_Type', dataIndex: 'Lining_Type', menuDisabled: true, width: 120
            },            
            {   
                text: 'Closure_Type', dataIndex: 'Closure_Type', menuDisabled: true, width: 120
            },
            {   
                text: 'Jacket_Type', dataIndex: 'Jacket_Type', menuDisabled: true, width: 120
            },
            {   
                text: 'iphCategory', dataIndex: 'iphCategory', menuDisabled: true, width: 120
            },
            {   
                text: 'Coat_Type', dataIndex: 'Coat_Type', menuDisabled: true, width: 120
            },
            {   
                text: 'Sleeve_Length', dataIndex: 'Sleeve_Length', menuDisabled: true, width: 120
            },            
            {   
                text: 'Vest_Type', dataIndex: 'Vest_Type', menuDisabled: true, width: 120
            },
            {   
                text: 'Garment_Length', dataIndex: 'Garment_Length', menuDisabled: true, width: 120
            },
            {   
                text: 'title', dataIndex: 'title', menuDisabled: true, width: 120
            }] 
        },

        BKB: {
            store: 'buildBKBottomStore',
            columns: [{
                text: 'sku', dataIndex: 'sku', menuDisabled: true, width: 120
            },
            {
                text: 'product_status', dataIndex: 'product_status', menuDisabled: true, width: 120
            },
            {                
                text: 'style_number', dataIndex: 'style_number', menuDisabled: true, width: 120
            },
            {
                text: 'Style_Description', dataIndex: 'Style_Description', menuDisabled: true, width: 120
            },
            {
                text: 'GTIN', dataIndex: 'GTIN', menuDisabled: true, width: 120
            },
            {
                text: 'Product_Name', dataIndex: 'Product_Name', menuDisabled: true, width: 120
            },
            {
                text: 'nrfColorCode', dataIndex: 'nrfColorCode', menuDisabled: true, width: 120
            },
            {
                text: 'vendorColorDescription', dataIndex: 'vendorColorDescription', menuDisabled: true, width: 120
            },
            {
                text: 'nrfSizeCode', dataIndex: 'nrfSizeCode', menuDisabled: true, width: 180
            },
            {
                text: 'vendorSizeDescription', dataIndex: 'vendorSizeDescription', menuDisabled: true, width: 120
            },
            {
                text: 'OmniChannel_Brand', dataIndex: 'OmniChannel_Brand', menuDisabled: true, width: 120
            },            
            {
                text: 'Preferred_Copy_Name', dataIndex: 'Preferred_Copy_Name', menuDisabled: true, width: 120
            },
            {
                text: 'Product_Description', dataIndex: 'Product_Description', menuDisabled: true, width: 120
            },
            {   
                text: 'isGroup', dataIndex: 'isGroup', menuDisabled: true, width: 120
            },
            {   
                text: 'groupingID', dataIndex: 'groupingID', menuDisabled: true, width: 120
            },
            {   
                text: 'groupingType', dataIndex: 'groupingType', menuDisabled: true, width: 120
            },
            {   
                text: 'images.image_reference_1', dataIndex: 'image_reference_1', menuDisabled: true, width: 120
            },
            {   
                text: 'images.image_reference_2', dataIndex: 'image_reference_2', menuDisabled: true, width: 120
            },
            {
                text: 'images.image_reference_3', dataIndex: 'image_reference_3', menuDisabled: true, width: 120
            },
            {                
                text: 'images.image_reference_4', dataIndex: 'image_reference_4', menuDisabled: true, width: 120
            },
            {
                text: 'images.image_reference_5', dataIndex: 'image_reference_5', menuDisabled: true, width: 120
            },
            {
                text: 'Choking_Hazard', dataIndex: 'Choking_Hazard', menuDisabled: true, width: 120
            },
            {
                text: 'Prop_65', dataIndex: 'Prop_65', menuDisabled: true, width: 120
            },            
            {
                text: 'Holiday', dataIndex: 'Holiday', menuDisabled: true, width: 120
            },
            {
                text: 'Country_of_Origin', dataIndex: 'Country_of_Origin', menuDisabled: true, width: 120
            },
            {
                text: 'Material', dataIndex: 'Material', menuDisabled: true, width: 180
            },
            {
                text: 'Activewear', dataIndex: 'Activewear', menuDisabled: true, width: 120
            },
            {
                text: 'Gender', dataIndex: 'Gender', menuDisabled: true, width: 120
            },            
            {
                text: 'Special_Sizes', dataIndex: 'Special_Sizes', menuDisabled: true, width: 120
            },
            {
                text: 'Care', dataIndex: 'Care', menuDisabled: true, width: 120
            },           
            {   
                text: 'Lined', dataIndex: 'Lined', menuDisabled: true, width: 120
            },            
            {   
                text: 'Closure_Type', dataIndex: 'Closure_Type', menuDisabled: true, width: 120
            },           
            {   
                text: 'Length', dataIndex: 'Length', menuDisabled: true, width: 120
            },
            {   
                text: 'Inseam', dataIndex: 'Inseam', menuDisabled: true, width: 120
            },
            {   
                text: 'iphCategory', dataIndex: 'iphCategory', menuDisabled: true, width: 120
            },
            {   
                text: 'Waist_Rise', dataIndex: 'Waist_Rise', menuDisabled: true, width: 120
            },
            {   
                text: 'Pants_Type', dataIndex: 'Pants_Type', menuDisabled: true, width: 120
            },
            {   
                text: 'Size_Length', dataIndex: 'Size_Length', menuDisabled: true, width: 120
            },
            {   
                text: 'Pants_Fit', dataIndex: 'Pants_Fit', menuDisabled: true, width: 120
            },
            {   
                text: 'Pockets', dataIndex: 'Pockets', menuDisabled: true, width: 120
            },
            {   
                text: 'Pocket_Type', dataIndex: 'Pocket_Type', menuDisabled: true, width: 120
            },            
            {   
                text: 'title', dataIndex: 'title', menuDisabled: true, width: 120
            }] 
        },

        FGP: {
            store: 'buildFGProductStore',
            columns: [
                { text: 'Style Number', dataIndex: 'StyleNumber', menuDisabled: true, width: 120 },
                { text: 'Item Name', dataIndex: 'ItemName', menuDisabled: true, width: 120 },
                { text: 'My Category', dataIndex: 'MyCategory', menuDisabled: true, width: 120 },
                { text: 'FG Main Category', dataIndex: 'FGMainCategory', menuDisabled: true, width: 120 },
                { text: 'FG Sub Category', dataIndex: 'FGSubCategory1', menuDisabled: true, width: 120 },
                { text: 'FG Sub Category', dataIndex: 'FGSubCategory2', menuDisabled: true, width: 120 },
                { text: 'Description', dataIndex: 'Description', menuDisabled: true, width: 120 },
                { text: 'Price', dataIndex: 'Price', menuDisabled: true, width: 120 },
                { text: 'Original Price', dataIndex: 'OriginalPrice', menuDisabled: true, width: 120 },
                { text: 'Size', dataIndex: 'Size', menuDisabled: true, width: 120 },
                { text: 'Pack', dataIndex: 'Pack', menuDisabled: true, width: 120 },
                { text: 'Pack nin qty', dataIndex: 'PackMinQty', menuDisabled: true, width: 120 },
                { text: 'Pack even color', dataIndex: 'PackEvenColor', menuDisabled: true, width: 120 },
                { text: 'Fabric contents/Material composition/Ingredient', dataIndex: 'FabricContent', menuDisabled: true, width: 120 },
                { text: 'How to use', dataIndex: 'HowToUse', menuDisabled: true, width: 120 },
                { text: 'Dimension', dataIndex: 'Dimension', menuDisabled: true, width: 120 },
                { text: 'Weight', dataIndex: 'Weight', menuDisabled: true, width: 120 },
                { text: 'Weight(Unit)', dataIndex: 'WeightUnit', menuDisabled: true, width: 120 },
                { text: 'Labeled', dataIndex: 'Labeled', menuDisabled: true, width: 120 },
                { text: 'Body Size', dataIndex: 'BodySize', menuDisabled: true, width: 120 },
                { text: 'Pattern', dataIndex: 'Pattern', menuDisabled: true, width: 120 },
                { text: 'Length', dataIndex: 'Length', menuDisabled: true, width: 120 },
                { text: 'Style', dataIndex: 'Style', menuDisabled: true, width: 120 },
                { text: 'Fabric', dataIndex: 'Fabric', menuDisabled: true, width: 120 },
                { text: 'Only at FashionGo', dataIndex: 'OnlyAtFG', menuDisabled: true, width: 120 },
                { text: 'Eco-Friendly', dataIndex: 'EcoFriendly', menuDisabled: true, width: 120 },
                { text: 'Handmade', dataIndex: 'Handmade', menuDisabled: true, width: 120 },
                { text: 'Organic', dataIndex: 'Organic', menuDisabled: true, width: 120 },
                { text: 'Small Batch', dataIndex: 'SmallBatch', menuDisabled: true, width: 120 },
                { text: 'Supplier Name', dataIndex: 'SupplierName', menuDisabled: true, width: 120 },
                { text: 'Vendor Style Number', dataIndex: 'StyleNumber', menuDisabled: true, width: 120 },
                { text: 'Made In Country', dataIndex: 'MadeInCountry', menuDisabled: true, width: 120 }                
            ]
        },

        FGC: {
            store: 'buildFGColorStore',
            columns: [
                { text: 'Style Number', dataIndex: 'style', menuDisabled: true, width: 120 },
                { text: 'Color/Scent', dataIndex: 'color', menuDisabled: true, width: 120 },
                { text: 'Size', dataIndex: 'Size', menuDisabled: true, width: 120 },
                { text: 'Inventory', dataIndex: 'ata1', menuDisabled: true, width: 120 }
            ]
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
                { text: 'ShortSizeDescEnglish', dataIndex: 'ShortSizeDescEnglish', menuDisabled: true, width: 160 },
                { text: 'Category', dataIndex: 'Category', menuDisabled: true, width: 120 },
                { text: 'MSRP', dataIndex: 'MSRP', menuDisabled: true, width: 80 }
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
                            store: '{bkClosureTypes}'                    
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
                            store: '{bkCoatTypes}'                    
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
                        //matchFieldWidth: true,
                        //msgTarget: 'side',
                        minChars: 1,
                        queryMode: 'local',
                        //queryParam: 'filter',
                        //triggerAction: 'all',
                        //store: ['00', 'OS', 'SA'],
                        bind: {
                            store: '{bkJacketTypes}'                    
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
                            store: '{bkMaterials}'                    
                        },
                        listConfig: {
                            loadindText: 'Searching...',
                            emptyText: 'No matching items found.',
                            width: 260
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
                        //matchFieldWidth: true,
                        //msgTarget: 'side',
                        minChars: 1,
                        queryMode: 'local',
                        //queryParam: 'filter',
                        //triggerAction: 'all',
                        //store: ['00', 'OS', 'SA'],
                        bind: {
                            store: '{bkSleeveTypes}'                    
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
                            store: '{bkSpecialTypes}'                    
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
                            store: '{bkDressTypes}'                    
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
                        //matchFieldWidth: false,
                        //msgTarget: 'side',
                        minChars: 1,
                        queryMode: 'local',
                        //queryParam: 'filter',
                        //triggerAction: 'all',
                        //store: ['00', 'OS', 'SA'],
                        bind: {
                            store: '{bkLegStyles}'                    
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
                        //matchFieldWidth: false,
                        //msgTarget: 'side',
                        minChars: 1,
                        queryMode: 'local',
                        //queryParam: 'filter',
                        //triggerAction: 'all',
                        //store: ['00', 'OS', 'SA'],
                        bind: {
                            store: '{bkPantsFits}'                    
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
                        //matchFieldWidth: false,
                        //msgTarget: 'side',
                        minChars: 1,
                        queryMode: 'local',
                        //queryParam: 'filter',
                        //triggerAction: 'all',
                        //store: ['00', 'OS', 'SA'],
                        bind: {
                            store: '{bkPantsTypes}'                    
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
                        //matchFieldWidth: false,
                        //msgTarget: 'side',
                        minChars: 1,
                        queryMode: 'local',
                        //queryParam: 'filter',
                        //triggerAction: 'all',
                        //store: ['00', 'OS', 'SA'],
                        bind: {
                            store: '{bkWaists}'                    
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
                            store: '{bkTopTypes}'                    
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
                { text: 'Product Type', dataIndex: 'feed_product_type', menuDisabled: true, width: 120 },
                { text: 'Seller SKU', dataIndex: 'item_sku', menuDisabled: true, width: 120 },
                { text: 'Brand Name', dataIndex: 'brand_name', menuDisabled: true, width: 120 },
                { text: 'Product Name', dataIndex: 'item_name', menuDisabled: true, width: 120 },
                { text: 'Manufacturer', dataIndex: 'manufacturer', menuDisabled: true, width: 120 },
                { text: 'Product ID', dataIndex: 'external_product_id', menuDisabled: true, width: 120 },
                { text: 'Product ID Type', dataIndex: 'external_product_id_type', menuDisabled: true, width: 120 },
                { text: 'Item Type Keyword', dataIndex: 'item_type', menuDisabled: true, width: 120 },
                { text: 'Standard Price', dataIndex: 'standard_price', menuDisabled: true, width: 120 },
                { text: 'Quantity', dataIndex: 'quantity', menuDisabled: true, width: 120 },
                { text: 'Main Image URL', dataIndex: 'main_image_url', menuDisabled: true, width: 120 },                
                { text: 'Outer Material Type', dataIndex: 'outer_material_type1', menuDisabled: true, width: 120 },
                { text: 'Outer Material Type', dataIndex: 'outer_material_type2', menuDisabled: true, width: 120 },
                { text: 'Outer Material Type', dataIndex: 'outer_material_type3', menuDisabled: true, width: 120 },
                { text: 'Outer Material Type', dataIndex: 'outer_material_type4', menuDisabled: true, width: 120 },
                { text: 'Outer Material Type', dataIndex: 'outer_material_type5', menuDisabled: true, width: 120 },
                { text: 'Department', dataIndex: 'department', menuDisabled: true, width: 120 },
                { text: 'Fabric Type', dataIndex: 'fabric_type1', menuDisabled: true, width: 120 },
                { text: 'Fabric Type', dataIndex: 'fabric_type2', menuDisabled: true, width: 120 },
                { text: 'Fabric Type', dataIndex: 'fabric_type3', menuDisabled: true, width: 120 },
                { text: 'Fabric Type', dataIndex: 'fabric_type4', menuDisabled: true, width: 120 },
                { text: 'Fabric Type', dataIndex: 'fabric_type5', menuDisabled: true, width: 120 },
                { text: 'Target Gender', dataIndex: 'target_gender', menuDisabled: true, width: 120 },
                { text: 'Age Range Description', dataIndex: 'age_range_description', menuDisabled: true, width: 120 },
                { text: 'Shirt Size System', dataIndex: 'shirt_size_system', menuDisabled: true, width: 120 },
                { text: 'Shirt Size Class', dataIndex: 'shirt_size_class', menuDisabled: true, width: 120 },
                { text: 'Shirt Size', dataIndex: 'shirt_size', menuDisabled: true, width: 120 },
                { text: 'Shirt Size To Range', dataIndex: 'shirt_size_to', menuDisabled: true, width: 120 },                
                { text: 'Neck Size Value', dataIndex: 'shirt_neck_size', menuDisabled: true, width: 120 },
                { text: 'Neck Size To Value', dataIndex: 'shirt_neck_size_to', menuDisabled: true, width: 120 },
                { text: 'Sleeve Length Value', dataIndex: 'shirt_sleeve_length', menuDisabled: true, width: 120 },
                { text: 'Sleeve Length To Value', dataIndex: 'shirt_sleeve_length_to', menuDisabled: true, width: 120 },
                { text: 'Shirt Body Type', dataIndex: 'shirt_body_type', menuDisabled: true, width: 120 },
                { text: 'Shirt Height Type', dataIndex: 'shirt_height_type', menuDisabled: true, width: 120 },
                { text: 'Manufacturer Part Number', dataIndex: 'part_number', menuDisabled: true, width: 120 },                                
                { text: 'Color', dataIndex: 'color_name', menuDisabled: true, width: 120 },
                { text: 'Color Map', dataIndex: 'color_map', menuDisabled: true, width: 120 },
                { text: 'Other Image URL', dataIndex: 'other_image_url', menuDisabled: true, width: 120 },
                { text: 'Other Image URL1', dataIndex: 'other_image_url1', menuDisabled: true, width: 120 },
                { text: 'Other Image URL2', dataIndex: 'other_image_url2', menuDisabled: true, width: 120 },
                { text: 'Other Image URL3', dataIndex: 'other_image_url3', menuDisabled: true, width: 120 },
                { text: 'Other Image URL4', dataIndex: 'other_image_url4', menuDisabled: true, width: 120 },
                { text: 'Other Image URL5', dataIndex: 'other_image_url5', menuDisabled: true, width: 120 },
                { text: 'Other Image URL6', dataIndex: 'other_image_url6', menuDisabled: true, width: 120 },
                { text: 'Other Image URL7', dataIndex: 'other_image_url7', menuDisabled: true, width: 120 },
                { text: 'Other Image URL8', dataIndex: 'other_image_url8', menuDisabled: true, width: 120 },
                { text: 'Swatch Image URL', dataIndex: 'swatch_image_url', menuDisabled: true, width: 120 },
                { text: 'Parentage', dataIndex: 'parent_child', menuDisabled: true, width: 120 },
                { text: 'Parent SKU', dataIndex: 'parent_sku', menuDisabled: true, width: 120 },
                { text: 'Relationship Type', dataIndex: 'relationship_type', menuDisabled: true, width: 120 },
                { text: 'Variation Theme', dataIndex: 'variation_theme', menuDisabled: true, width: 120 },
                { text: 'Package Level', dataIndex: 'package_level', menuDisabled: true, width: 120 },
                { text: 'package_contains_quantity', dataIndex: 'package_contains_quantity', menuDisabled: true, width: 120 },
                { text: 'package_contains_identifier', dataIndex: 'package_contains_identifier', menuDisabled: true, width: 120 },
                { text: 'Update Delete', dataIndex: 'update_delete', menuDisabled: true, width: 120 },
                { text: 'Closure Type', dataIndex: 'closure_type', menuDisabled: true, width: 120 },
                { text: 'Product Exemption Reason', dataIndex: 'gtin_exemption_reason', menuDisabled: true, width: 120 },
                { text: 'Product Description', dataIndex: 'product_description', menuDisabled: true, width: 120 },
                { text: 'Model', dataIndex: 'model', menuDisabled: true, width: 120 },
                { text: 'Model Name', dataIndex: 'model_name', menuDisabled: true, width: 120 },
                { text: 'Care Instructions', dataIndex: 'care_instructions1', menuDisabled: true, width: 120 },
                { text: 'Care Instructions', dataIndex: 'care_instructions2', menuDisabled: true, width: 120 },
                { text: 'Care Instructions', dataIndex: 'care_instructions3', menuDisabled: true, width: 120 },
                { text: 'Care Instructions', dataIndex: 'care_instructions4', menuDisabled: true, width: 120 },
                { text: 'Key Product Features', dataIndex: 'bullet_point1', menuDisabled: true, width: 120 },
                { text: 'Key Product Features', dataIndex: 'bullet_point2', menuDisabled: true, width: 120 },
                { text: 'Key Product Features', dataIndex: 'bullet_point3', menuDisabled: true, width: 120 },
                { text: 'Key Product Features', dataIndex: 'bullet_point4', menuDisabled: true, width: 120 },
                { text: 'Key Product Features', dataIndex: 'bullet_point5', menuDisabled: true, width: 120 },                
                { text: 'Category Number', dataIndex: 'category_number', menuDisabled: true, width: 120 },
                { text: 'Search Terms', dataIndex: 'search_terms', menuDisabled: true, width: 120 },
                { text: 'Country/Region as Labeled', dataIndex: 'country_as_labeled', menuDisabled: true, width: 120 },
                { text: 'Fur Description', dataIndex: 'fur_description', menuDisabled: true, width: 120 },

                /*
                { text: 'Number of Sets', dataIndex: 'number_of_sets', menuDisabled: true, width: 120 },
                { text: 'Occasion', dataIndex: 'occasion', menuDisabled: true, width: 120 },
                { text: 'Number of Pieces', dataIndex: 'number_of_pieces', menuDisabled: true, width: 120 },
                */

                { text: 'Size', dataIndex: 'size_name', menuDisabled: true, width: 120 },
                { text: 'Material Type', dataIndex: 'material_type', menuDisabled: true, width: 120 },
                { text: 'Style Name', dataIndex: 'style_name', menuDisabled: true, width: 120 },
                { text: 'Additional Features', dataIndex: 'special_features1', menuDisabled: true, width: 120 },
                { text: 'Additional Features', dataIndex: 'special_features2', menuDisabled: true, width: 120 },
                { text: 'Additional Features', dataIndex: 'special_features3', menuDisabled: true, width: 120 },
                { text: 'Additional Features', dataIndex: 'special_features4', menuDisabled: true, width: 120 },
                { text: 'Additional Features', dataIndex: 'special_features5', menuDisabled: true, width: 120 },
                { text: 'Pattern', dataIndex: 'pattern_name', menuDisabled: true, width: 120 },
                { text: 'Item Type Name', dataIndex: 'item_type_name', menuDisabled: true, width: 120 },
                { text: 'Team Name', dataIndex: 'team_name', menuDisabled: true, width: 120 },
                { text: 'Belt Style', dataIndex: 'belt_style', menuDisabled: true, width: 120 },
                { text: 'Collar Type', dataIndex: 'collar_type', menuDisabled: true, width: 120 },
                { text: 'Control Type', dataIndex: 'control_type', menuDisabled: true, width: 120 },
                { text: 'Fit Type', dataIndex: 'fit_type', menuDisabled: true, width: 120 },                
                { text: 'NeckStyle', dataIndex: 'neckstyle', menuDisabled: true, width: 120 },                                
                { text: 'Pattern style', dataIndex: 'pattern_style', menuDisabled: true, width: 120 },
                { text: 'Pocket Description', dataIndex: 'pocket_description', menuDisabled: true, width: 120 },
                { text: 'Special Size Type', dataIndex: 'special_size_type', menuDisabled: true, width: 120 },
                { text: 'Theme', dataIndex: 'theme', menuDisabled: true, width: 120 },
                { text: 'Top Sstyle', dataIndex: 'top_style', menuDisabled: true, width: 120 },
                { text: 'Water Resistance Level', dataIndex: 'water_resistance_level', menuDisabled: true, width: 120 },
                { text: 'Is Autographed', dataIndex: 'is_autographed', menuDisabled: true, width: 120 },
                { text: 'Occasion Type', dataIndex: 'occasion_type1', menuDisabled: true, width: 120 },
                { text: 'Occasion Type', dataIndex: 'occasion_type2', menuDisabled: true, width: 120 },
                { text: 'Occasion Type', dataIndex: 'occasion_type3', menuDisabled: true, width: 120 },
                { text: 'Occasion Type', dataIndex: 'occasion_type4', menuDisabled: true, width: 120 },
                { text: 'Occasion Type', dataIndex: 'occasion_type5', menuDisabled: true, width: 120 },
                { text: 'Sport Type', dataIndex: 'sport_type1', menuDisabled: true, width: 120 },
                { text: 'Sport Type', dataIndex: 'sport_type2', menuDisabled: true, width: 120 },                
                { text: 'Athlete', dataIndex: 'athlete', menuDisabled: true, width: 120 },
                { text: 'Season and collection year', dataIndex: 'collection_name', menuDisabled: true, width: 120 },
                { text: 'Occasion Lifestyle', dataIndex: 'lifestyle', menuDisabled: true, width: 120 },
                { text: 'Weave Type', dataIndex: 'weave_type', menuDisabled: true, width: 120 },
                { text: 'League Name', dataIndex: 'league_name', menuDisabled: true, width: 120 },
                { text: 'Shaft Style Type', dataIndex: 'shaft_style_type', menuDisabled: true, width: 120 },
                { text: 'Product Lifecycle Supply Type', dataIndex: 'lifecycle_supply_type1', menuDisabled: true, width: 120 },
                { text: 'Product Lifecycle Supply Type', dataIndex: 'lifecycle_supply_type2', menuDisabled: true, width: 120 },
                { text: 'Product Lifecycle Supply Type', dataIndex: 'lifecycle_supply_type3', menuDisabled: true, width: 120 },
                { text: 'Product Lifecycle Supply Type', dataIndex: 'lifecycle_supply_type4', menuDisabled: true, width: 120 },
                { text: 'Product Lifecycle Supply Type', dataIndex: 'lifecycle_supply_type5', menuDisabled: true, width: 120 },
                { text: 'Item Booking Date', dataIndex: 'item_booking_date', menuDisabled: true, width: 120 },
                { text: 'legal_compliance_certification_certifying_authority_name', dataIndex: 'legal_compliance_certification_certifying_authority_name', menuDisabled: true, width: 120 },
                { text: 'legal_compliance_certification_geographic_jurisdiction', dataIndex: 'legal_compliance_certification_geographic_jurisdiction', menuDisabled: true, width: 120 },
                { text: 'Character', dataIndex: 'subject_character', menuDisabled: true, width: 120 },
                { text: 'Fabric Wash', dataIndex: 'fabric_wash', menuDisabled: true, width: 120 },
                { text: 'Sleeve Type', dataIndex: 'sleeve_type', menuDisabled: true, width: 120 },
                { text: 'Strap Type', dataIndex: 'strap_type', menuDisabled: true, width: 120 },
                { text: 'Underwire Type', dataIndex: 'underwire_type', menuDisabled: true, width: 120 },
                { text: 'Duration Unit', dataIndex: 'duration_unit', menuDisabled: true, width: 120 },                
                { text: 'Duration', dataIndex: 'duration', menuDisabled: true, width: 120 },
                { text: 'Shipping Weight', dataIndex: 'shipping_weight', menuDisabled: true, width: 120 },
                { text: 'Website Shipping Weight Unit Of Measure', dataIndex: 'website_shipping_weight_unit_of_measure', menuDisabled: true, width: 120 },                
                { text: 'Size Map', dataIndex: 'size_map', menuDisabled: true, width: 120 },
                { text: 'Chest Size', dataIndex: 'chest_size', menuDisabled: true, width: 120 },
                { text: 'Chest Size Unit Of Measure', dataIndex: 'chest_size_unit_of_measure', menuDisabled: true, width: 120 },
                { text: 'Cup Size', dataIndex: 'cup_size', menuDisabled: true, width: 120 },
                { text: 'Neck Size', dataIndex: 'neck_size', menuDisabled: true, width: 120 },
                { text: 'Neck Size Unit Of Measure', dataIndex: 'neck_size_unit_of_measure', menuDisabled: true, width: 120 },
                { text: 'SleeveLength', dataIndex: 'sleevelength', menuDisabled: true, width: 120 },
                { text: 'Sleeve Length Unit Of Measure', dataIndex: 'sleeve_length_unit_of_measure', menuDisabled: true, width: 120 },
                { text: 'Item Length Unit Of Measure', dataIndex: 'item_length_unit_of_measure', menuDisabled: true, width: 120 },
                { text: 'Item Length', dataIndex: 'item_length1', menuDisabled: true, width: 120 },
                { text: 'Item Width', dataIndex: 'item_width', menuDisabled: true, width: 120 },
                { text: 'Item Height', dataIndex: 'item_height', menuDisabled: true, width: 120 },
                { text: 'Item Width Unit Of Measure', dataIndex: 'item_width_unit_of_measure', menuDisabled: true, width: 120 },
                { text: 'Item Height Unit Of Measure', dataIndex: 'item_height_unit_of_measure', menuDisabled: true, width: 120 },
                { text: 'Fulfillment Center ID', dataIndex: 'fulfillment_center_id', menuDisabled: true, width: 120 },
                { text: 'Package Height', dataIndex: 'package_height', menuDisabled: true, width: 120 },
                { text: 'Package Width', dataIndex: 'package_width', menuDisabled: true, width: 120 },
                { text: 'Package Length', dataIndex: 'package_length', menuDisabled: true, width: 120 },
                { text: 'Package Length Unit Of Measure', dataIndex: 'package_length_unit_of_measure', menuDisabled: true, width: 120 },
                { text: 'Package Weight', dataIndex: 'package_weight', menuDisabled: true, width: 120 },
                { text: 'Package Weight Unit Of Measure', dataIndex: 'package_weight_unit_of_measure', menuDisabled: true, width: 120 },
                { text: 'Package Height Unit Of Measure', dataIndex: 'package_height_unit_of_measure', menuDisabled: true, width: 120 },
                { text: 'Package Width Unit Of Measure', dataIndex: 'package_width_unit_of_measure', menuDisabled: true, width: 120 },
                { text: 'Cpsia Warning', dataIndex: 'cpsia_cautionary_statement1', menuDisabled: true, width: 120 },
                { text: 'Cpsia Warning', dataIndex: 'cpsia_cautionary_statement2', menuDisabled: true, width: 120 },
                { text: 'Cpsia Warning', dataIndex: 'cpsia_cautionary_statement3', menuDisabled: true, width: 120 },
                { text: 'Cpsia Warning', dataIndex: 'cpsia_cautionary_statement4', menuDisabled: true, width: 120 },
                { text: 'CPSIA Warning Description', dataIndex: 'cpsia_warning_description', menuDisabled: true, width: 120 },
                { text: 'Import Designation', dataIndex: 'import_designation', menuDisabled: true, width: 120 },
                { text: 'Please Provide the Executive Number (EO) required for sale into California', dataIndex: 'legal_compliance_certification_metadata', menuDisabled: true, width: 120 },
                { text: 'Please provide the expiration date of the EO Number.', dataIndex: 'legal_compliance_certification_expiration_date', menuDisabled: true, width: 120 },
                { text: 'Country/Region of Origin', dataIndex: 'country_of_origin', menuDisabled: true, width: 120 },                
                { text: 'Regulatory Organization Name', dataIndex: 'legal_compliance_certification_requlatory_organization_name', menuDisabled: true, width: 120 },
                { text: 'Compliance Certification Status', dataIndex: 'legal_compliance_certification_status', menuDisabled: true, width: 120 },
                { text: 'Flash point (°C)?', dataIndex: 'flash_point', menuDisabled: true, width: 120 },
                { text: 'legal_compliance_certification_date_of_issue', dataIndex: 'legal_compliance_certification_date_of_issue', menuDisabled: true, width: 120 },
                { text: 'Legal Compliance Certification', dataIndex: 'legal_compliance_certification_value', menuDisabled: true, width: 120 },
                { text: 'California Proposition 65 Warning Type', dataIndex: 'california_proposition_65_warning_type', menuDisabled: true, width: 120 },
                { text: 'California Proposition 65 Chemical Names', dataIndex: 'california_proposition_65_chemical_names1', menuDisabled: true, width: 120 },
                { text: 'Additional Chemical Name1', dataIndex: 'california_proposition_65_chemical_names2', menuDisabled: true, width: 120 },
                { text: 'Additional Chemical Name2', dataIndex: 'california_proposition_65_chemical_names3', menuDisabled: true, width: 120 },
                { text: 'Additional Chemical Name3', dataIndex: 'california_proposition_65_chemical_names4', menuDisabled: true, width: 120 },
                { text: 'Additional Chemical Name4', dataIndex: 'california_proposition_65_chemical_names5', menuDisabled: true, width: 120 },
                { text: 'Pesticide Marking', dataIndex: 'pesticide_marking_type1', menuDisabled: true, width: 120 },
                { text: 'Pesticide Marking', dataIndex: 'pesticide_marking_type2', menuDisabled: true, width: 120 },
                { text: 'Pesticide Marking', dataIndex: 'pesticide_marking_type3', menuDisabled: true, width: 120 },
                { text: 'Pesticide Registration Status', dataIndex: 'pesticide_marking_registration_status1', menuDisabled: true, width: 120 },
                { text: 'Pesticide Registration Status', dataIndex: 'pesticide_marking_registration_status2', menuDisabled: true, width: 120 },
                { text: 'Pesticide Registration Status', dataIndex: 'pesticide_marking_registration_status3', menuDisabled: true, width: 120 },
                { text: 'Pesticide Certification Number', dataIndex: 'pesticide_marking_certification_number1', menuDisabled: true, width: 120 },
                { text: 'Pesticide Certification Number', dataIndex: 'pesticide_marking_certification_number2', menuDisabled: true, width: 120 },
                { text: 'Pesticide Certification Number', dataIndex: 'pesticide_marking_certification_number3', menuDisabled: true, width: 120 },
                { text: 'Radio Frequency Emission & Authorization Status', dataIndex: 'fcc_radio_frequency_emission_compliance_registration_status', menuDisabled: true, width: 120 },
                { text: 'SDoC Contact Email Address', dataIndex: 'fcc_radio_frequency_emission_compliance_point_of_contact_email', menuDisabled: true, width: 120 },
                { text: 'SDOC Contact US Phone Number', dataIndex: 'fcc_radio_frequency_emission_compliance_point_of_contact_phone_number', menuDisabled: true, width: 120 },
                { text: 'SDoC Contact Name', dataIndex: 'fcc_radio_frequency_emission_compliance_point_of_contact_name', menuDisabled: true, width: 120 },
                { text: 'FCC ID', dataIndex: 'fcc_radio_frequency_emission_compliance_identification_number', menuDisabled: true, width: 120 },
                { text: 'SDoC Contact US Mailing Address', dataIndex: 'fcc_radio_frequency_emission_compliance_point_of_contact_address', menuDisabled: true, width: 120 },                
                { text: 'Material/Fabric Regulations', dataIndex: 'supplier_declared_material_regulations1', menuDisabled: true, width: 120 },
                { text: 'Material/Fabric Regulations', dataIndex: 'supplier_declared_material_regulations2', menuDisabled: true, width: 120 },
                { text: 'Material/Fabric Regulations', dataIndex: 'supplier_declared_material_regulations3', menuDisabled: true, width: 120 },                                
                { text: 'Offer End Date', dataIndex: 'offer_end_date', menuDisabled: true, width: 120 },                                                                                
                { text: 'Shipping-Template', dataIndex: 'merchant_shipping_group_name', menuDisabled: true, width: 120 },
                { text: 'Currency', dataIndex: 'currency', menuDisabled: true, width: 120 },
                { text: 'List Price', dataIndex: 'list_price', menuDisabled: true, width: 120 },
                { text: 'Minimum Advertised Price', dataIndex: 'map_price', menuDisabled: true, width: 120 },
                { text: 'Launch Date', dataIndex: 'product_site_launch_date', menuDisabled: true, width: 120 },
                { text: 'Release Date', dataIndex: 'merchant_release_date', menuDisabled: true, width: 120 },
                { text: 'Item Condition', dataIndex: 'condition_type', menuDisabled: true, width: 120 },
                { text: 'Restock Date', dataIndex: 'restock_date', menuDisabled: true, width: 120 },
                { text: 'Handling Time', dataIndex: 'fulfillment_latency', menuDisabled: true, width: 120 },
                { text: 'Offer Condition Note', dataIndex: 'condition_note', menuDisabled: true, width: 120 },
                { text: 'Product Tax Code', dataIndex: 'product_tax_code', menuDisabled: true, width: 120 },                                                                
                { text: 'Sale Price', dataIndex: 'sale_price', menuDisabled: true, width: 120 },
                { text: 'Sale Start Date', dataIndex: 'sale_from_date', menuDisabled: true, width: 120 },
                { text: 'Sale End Date', dataIndex: 'sale_end_date', menuDisabled: true, width: 120 },
                { text: 'Package Quantity', dataIndex: 'itme_package_quantity', menuDisabled: true, width: 120 },
                { text: 'Max Aggregate Ship Quantity', dataIndex: 'max_aggregate_ship_quantity', menuDisabled: true, width: 120 },
                { text: 'Offering Can Be Gift Messaged', dataIndex: 'offering_can_be_gift_messaged', menuDisabled: true, width: 120 },
                { text: 'Is Gift Wrap Available', dataIndex: 'offering_can_be_giftwrapped', menuDisabled: true, width: 120 },
                { text: 'Is Discontinued by Manufacturer', dataIndex: 'is_discontinued_by_manufacturer', menuDisabled: true, width: 120 },
                { text: 'Max Order Quantity', dataIndex: 'max_order_quantity', menuDisabled: true, width: 120 },
                { text: 'Number of Items', dataIndex: 'number_of_items', menuDisabled: true, width: 120 },
                { text: 'Offer Start Date', dataIndex: 'offer_start_date', menuDisabled: true, width: 120 }                                                                                                
            ]
        },

        MCM: {
            store: 'buildMacyMpStore',
            columns: [
                { text: 'categoryCode', dataIndex: 'categoryCode', menuDisabled: true, width: 120 },
                { text: 'shopSku', dataIndex: 'shopSku', menuDisabled: true, width: 120 },
                { text: 'productName', dataIndex: 'productName', menuDisabled: true, width: 120 },
                { text: 'pid', dataIndex: 'pid', menuDisabled: true, width: 120 },
                { text: 'UPC', dataIndex: 'UPC', menuDisabled: true, width: 120 },
                { text: 'brand', dataIndex: 'brand', menuDisabled: true, width: 120 },
                { text: 'productLongDescription', dataIndex: 'productLongDescription', menuDisabled: true, width: 120 },
                { text: 'fnb1', dataIndex: 'fnb1', menuDisabled: true, width: 120 },
                { text: 'fnb2', dataIndex: 'fnb2', menuDisabled: true, width: 120 },
                { text: 'fnb3', dataIndex: 'fnb3', menuDisabled: true, width: 120 },
                { text: 'fnb4', dataIndex: 'fnb4', menuDisabled: true, width: 120 },
                { text: 'fnb5', dataIndex: 'fnb5', menuDisabled: true, width: 120 },
                { text: 'warranty', dataIndex: 'warranty', menuDisabled: true, width: 120 },
                { text: 'legalWarnings', dataIndex: 'legalWarnings', menuDisabled: true, width: 120 },
                { text: 'prop65Warning', dataIndex: 'prop65Warning', menuDisabled: true, width: 120 },
                { text: 'origin', dataIndex: 'origin', menuDisabled: true, width: 120 },
                { text: 'fabricCare', dataIndex: 'fabricCare', menuDisabled: true, width: 120 },
                { text: 'fabricContent', dataIndex: 'fabricContent', menuDisabled: true, width: 120 },
                { text: 'nrfSizeCode', dataIndex: 'nrfSizeCode', menuDisabled: true, width: 120 },
                { text: 'nrfColorCode', dataIndex: 'nrfColorCode', menuDisabled: true, width: 120 },
                { text: 'siteColorDesc', dataIndex: 'siteColorDesc', menuDisabled: true, width: 120 },
                { text: 'productDimensions1', dataIndex: 'productDimensions1', menuDisabled: true, width: 120 },
                { text: 'productDimensions2', dataIndex: 'productDimensions2', menuDisabled: true, width: 120 },
                { text: 'productWeight', dataIndex: 'productWeight', menuDisabled: true, width: 120 },                
                { text: 'Shipping_Dimensions_Length', dataIndex: 'Shipping_Dimensions_Length', menuDisabled: true, width: 200,
                    editor: {
                        xtype: 'textfield',
                        fieldCls: 'required', 
                        hideTrigger: true
                    }
                },
                { text: 'Shipping_Dimensions_Width', dataIndex: 'Shipping_Dimensions_Width', menuDisabled: true, width: 200,
                    editor: {
                        xtype: 'textfield',
                        fieldCls: 'required', 
                        hideTrigger: true
                    }
                },
                { text: 'Shipping_Dimensions_Height', dataIndex: 'Shipping_Dimensions_Height', menuDisabled: true, width: 200,
                    editor: {
                        xtype: 'textfield',
                        fieldCls: 'required', 
                        hideTrigger: true
                    }
                },
                { text: 'Shipping_Dimensions_Units', dataIndex: 'Shipping_Dimensions_Units', menuDisabled: true, width: 120 },
                { text: 'Shipping_Weight', dataIndex: 'Shipping_Weight', menuDisabled: true, width: 100,
                    editor: {
                        xtype: 'textfield',
                        fieldCls: 'required', 
                        hideTrigger: true
                    }
                },
                { text: 'Shipping_Weight_Units', dataIndex: 'Shipping_Weight_Units', menuDisabled: true, width: 100 },
                { text: 'msrp', dataIndex: 'msrp', menuDisabled: true, width: 80 },
                { text: 'mainImage', dataIndex: 'mainImage', menuDisabled: true, width: 200 },
                { text: 'secondImage', dataIndex: 'secondImage', menuDisabled: true, width: 200 },
                { text: 'thirdImage', dataIndex: 'thirdImage', menuDisabled: true, width: 200 },
                { text: 'swatchImage', dataIndex: 'swatchImage', menuDisabled: true, width: 200 },
                { text: 'harmonizeTitle', dataIndex: 'harmonizeTitle', menuDisabled: true, width: 100 },
                { text: 'SpecialHandling_ShippingDimensions', dataIndex: 'SpecialHandling_ShippingDimensions', menuDisabled: true, width: 100 },
                { text: 'taxCode_women', dataIndex: 'taxCode_women', menuDisabled: true, width: 120 },
                { text: "fnb20_276", dataIndex: 'fnb20_276', menuDisabled: true, width: 80 },
                { text: 'Special_Size_Womens_Clothing', dataIndex: 'Special_Size_Womens_Clothing', menuDisabled: true, width: 100 },
                { text: 'Fabric_Womens_Clothing', dataIndex: 'Fabric_Womens_Clothing', menuDisabled: true, width: 120 },
                { text: 'Fabric_Pattern_Womens_Clothing', dataIndex: 'Fabric_Pattern_Womens_Clothing', menuDisabled: true, width: 120 },                
                { text: 'sizeChartImage', dataIndex: 'sizeChartImage', menuDisabled: true, width: 100 },
                { text: 'Age_Group_Womens', dataIndex: 'Age_Group_Womens', menuDisabled: true, width: 100 },                                                                          
                { text: 'Dress_Style_RTW', dataIndex: 'Dress_Style_RTW', menuDisabled: true, width: 120,
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
                { text: 'Neckline_All_Women_Dresses', dataIndex: 'Neckline_All_Women_Dresses', menuDisabled: true, width: 140,
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
                            store: '{necklines}'                    
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
                /*      
                { text: 'Dress_Length', dataIndex: 'Dress_Length', menuDisabled: true, width: 120,
                    editor: {
                        xtype: 'textfield',
                        fieldCls: 'required', 
                        hideTrigger: true
                    }
                },
                */
                { text: 'Sweater_Style_All_Women_Dresses', dataIndex: 'Sweater_Style_All_Women_Dresses', menuDisabled: true, width: 120 },                
                { text: 'fnb20_Sleeve_Length_All_Women_Dresses_Tops', dataIndex: 'fnb20_Sleeve_Length_All_Women_Dresses_Tops', menuDisabled: true, width: 120,
                    editor: {
                        xtype: 'combo',                                
                        displayField: 'label',
                        valueField: 'value',  
                        fieldCls: 'required',                   
                        //selectOnFocus: true,                
                        forceSelection: false,
                        //matchFieldWidth: true,
                        //msgTarget: 'side',
                        minChars: 1,
                        queryMode: 'local',
                        //queryParam: 'filter',
                        //triggerAction: 'all',
                        //store: ['00', 'OS', 'SA'],
                        bind: {
                            store: '{sleeveLengths}'                    
                        },                          
                        plugins: [{
                            ptype: "cleartrigger"
                        }]
                    } 
                },                                
                { text: 'fnb20_Suit_Style_All_Women_Pants_Skirts_Dresses_Blazers_Tops', dataIndex: 'fnb20_Suit_Style_All_Women_Pants_Skirts_Dresses_Blazers_Tops', menuDisabled: true, width: 120 },

                { text: 'Blazer_Style_All_Women_Blazers', dataIndex: 'Blazer_Style_All_Women_Blazers', menuDisabled: true, width: 140,                
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
                            store: '{blazerTypes}'                    
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
                { text: 'Jacket_Closure_All_Women_Blazers_Suits', dataIndex: 'Jacket_Closure_All_Women_Blazers_Suits', menuDisabled: true, width: 140,                
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
                { text: 'Coat_Style_RTW_Coats_Jackets_Blazers', dataIndex: 'Coat_Style_RTW_Coats_Jackets_Blazers', menuDisabled: true, width: 140,                
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
                { text: 'fnb20_Coat_Length_All_Women_Coats_Jackets_Blazers', dataIndex: 'fnb20_Coat_Length_All_Women_Coats_Jackets_Blazers', menuDisabled: true, width: 120,                
                    editor: {
                        xtype: 'textfield',
                        fieldCls: 'required', 
                        hideTrigger: true
                    }
                },                
                { text: 'Neckline_All_Women_Jumpsuits_Rompers', dataIndex: 'Neckline_All_Women_Jumpsuits_Rompers', menuDisabled: true, width: 140,
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
                            store: '{necklines}'                    
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
                { text: 'Occasion_Women_Dresses', dataIndex: 'Occasion_Women_Dresses', menuDisabled: true, width: 120 },
                { text: 'Denim_Waist_Fit', dataIndex: 'Denim_Waist_Fit', menuDisabled: true, width: 120,
                    editor: {
                        xtype: 'combo',                                
                        displayField: 'label',
                        valueField: 'value',  
                        fieldCls: 'required',                   
                        //selectOnFocus: true,                
                        forceSelection: false,
                        //matchFieldWidth: false,
                        //msgTarget: 'side',
                        minChars: 1,
                        queryMode: 'local',
                        //queryParam: 'filter',
                        //triggerAction: 'all',
                        //store: ['00', 'OS', 'SA'],
                        bind: {
                            store: '{waistFits}'                    
                        },                          
                        plugins: [{
                            ptype: "cleartrigger"
                        }]
                    }  
                },
                { text: 'Denim_Wash', dataIndex: 'Denim_Wash', menuDisabled: true, width: 120,                
                    editor: {
                        xtype: 'combo',                                
                        displayField: 'label',
                        valueField: 'value',  
                        fieldCls: 'required',                   
                        //selectOnFocus: true,                
                        forceSelection: false,
                        //matchFieldWidth: false,
                        //msgTarget: 'side',
                        minChars: 1,
                        queryMode: 'local',
                        //queryParam: 'filter',
                        //triggerAction: 'all',
                        //store: ['00', 'OS', 'SA'],
                        bind: {
                            store: '{washTypes}'                    
                        },                          
                        plugins: [{
                            ptype: "cleartrigger"
                        }]
                    } 
                },
                { text: 'Bottom_Feature_All_Women_Jeans', dataIndex: 'Bottom_Feature_All_Women_Jeans', menuDisabled: true, width: 120 },
                { text: 'fnb20_Denim_Fit_RTW_Jeans', dataIndex: 'fnb20_Denim_Fit_RTW_Jeans', menuDisabled: true, width: 140,                
                    editor: {
                        xtype: 'combo',                                
                        displayField: 'label',
                        valueField: 'value',  
                        fieldCls: 'required',                   
                        //selectOnFocus: true,                
                        forceSelection: false,
                        //matchFieldWidth: false,
                        //msgTarget: 'side',
                        minChars: 1,
                        queryMode: 'local',
                        //queryParam: 'filter',
                        //triggerAction: 'all',
                        //store: ['00', 'OS', 'SA'],
                        bind: {
                            store: '{fitTypes}'                    
                        },                          
                        plugins: [{
                            ptype: "cleartrigger"
                        }]
                    } 
                },
                { text: 'Pant_Style_RTW_Pants_Jumpsuits_Outfits', dataIndex: 'Pant_Style_RTW_Pants_Jumpsuits_Outfits', menuDisabled: true, width: 120,                
                    editor: {
                        xtype: 'combo',                                
                        displayField: 'label',
                        valueField: 'value',  
                        fieldCls: 'required',                   
                        //selectOnFocus: true,                
                        forceSelection: false,
                        //matchFieldWidth: false,
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
                /*
                { text: 'Bottom_Feature_All_Women_Pants_Jumpsuits', dataIndex: 'Bottom_Feature_All_Women_Pants_Jumpsuits', menuDisabled: true, width: 120 },                
                { text: 'Leg_Style', dataIndex: 'Leg_Style', menuDisabled: true, width: 120,                
                    editor: {
                        xtype: 'combo',                                
                        displayField: 'label',
                        valueField: 'value',  
                        fieldCls: 'required',                   
                        //selectOnFocus: true,                
                        forceSelection: false,
                        //matchFieldWidth: false,
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
                */
                { text: 'Short_Style_RTW_Shorts_Outfits', dataIndex: 'Short_Style_RTW_Shorts_Outfits', menuDisabled: true, width: 140,                
                    editor: {
                        xtype: 'combo',                                
                        displayField: 'label',
                        valueField: 'value',  
                        fieldCls: 'required',                   
                        //selectOnFocus: true,                
                        forceSelection: false,
                        //matchFieldWidth: false,
                        //msgTarget: 'side',
                        minChars: 1,
                        queryMode: 'local',
                        //queryParam: 'filter',
                        //triggerAction: 'all',
                        //store: ['00', 'OS', 'SA'],
                        bind: {
                            store: '{shortsTypes}'                    
                        },                          
                        plugins: [{
                            ptype: "cleartrigger"
                        }]
                    }
                },
                { text: 'Skirt_Style_RTW_Skirts_Outfits', dataIndex: 'Skirt_Style_RTW_Skirts_Outfits', menuDisabled: true, width: 140,                
                    editor: {
                        xtype: 'combo',                                
                        displayField: 'label',
                        valueField: 'value',  
                        fieldCls: 'required',                   
                        //selectOnFocus: true,                
                        forceSelection: false,
                        //matchFieldWidth: false,
                        //msgTarget: 'side',
                        minChars: 1,
                        queryMode: 'local',
                        //queryParam: 'filter',
                        //triggerAction: 'all',
                        //store: ['00', 'OS', 'SA'],
                        bind: {
                            store: '{skirtsTypes}'                    
                        },                          
                        plugins: [{
                            ptype: "cleartrigger"
                        }]
                    }
                },
                { text: 'Top_Style_RTW_Tops_Tees_Outfits', dataIndex: 'Top_Style_RTW_Tops_Tees_Outfits', menuDisabled: true, width: 140,                
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
                            store: '{topsTypes}'                    
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
                { text: 'Neckline_All_Women_Tops_Outfits', dataIndex: 'Neckline_All_Women_Tops_Outfits', menuDisabled: true, width: 140,                
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
                            store: '{necklines}'                    
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
                { text: 'Short_Style_All_Women_Rompers', dataIndex: 'Short_Style_All_Women_Rompers', menuDisabled: true, width: 120 },
                { text: 'fnb20_Suit_Style_All_Women_Suits', dataIndex: 'fnb20_Suit_Style_All_Women_Suits', menuDisabled: true, width: 120,                
                    editor: {
                        xtype: "combo",                        
                        fieldCls: 'required',                
                        //labelWidth: 50,
                        //width: 470,      
                        store: ['Dress Suit', 'Pant Suit', 'Skirt Suit'],                       
                        valueField: 'value',
                        displayField: 'label',                                                                                                                                                           
                        queryMode: 'local'
                    }
                },
                { text: 'Sweater_Style_All_Women_Sweaters_Sweatshirts', dataIndex: 'Sweater_Style_All_Women_Sweaters_Sweatshirts', menuDisabled: true, width: 140,                
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
                            store: '{sweatersTypes}'                    
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
                { text: 'Neckline_All_Women_Sweaters-Sweatshirts', dataIndex: 'Neckline_All_Women_Sweaters-Sweatshirts', menuDisabled: true, width: 140,                
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
                            store: '{necklines}'                    
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

        SM: {
            store: 'buildSaksStore',
            columns: [
                { text: 'Category', dataIndex: 'category', menuDisabled: true, width: 360 },
                { text: 'Seller SKU', dataIndex: 'shopSKU', menuDisabled: true, width: 120 },
                { text: 'Product Short Description', dataIndex: 'Product_Short_Description', menuDisabled: true, width: 180 },
                { text: 'Brand Name', dataIndex: 'eCom_Brand_Name', menuDisabled: true, width: 120 },
                { text: 'REPUSH - Exclude Special Characters', dataIndex: 'repush_text', menuDisabled: true, width: 100 },
                { text: 'Short Description', dataIndex: 'Short_Description', menuDisabled: true, width: 120 },                
                { text: 'Variant Group Code', dataIndex: 'variantGroupCode', menuDisabled: true, width: 120 },
                { text: 'UPC', dataIndex: 'upc', menuDisabled: true, width: 120 },
                { text: 'SKN', dataIndex: 'SKN', menuDisabled: true, width: 80 },
                { text: 'Vendor Style', dataIndex: 'vendor_style', menuDisabled: true, width: 120 },
                { text: 'Product Copy', dataIndex: 'productcopy', menuDisabled: true, width: 360 },
                { text: 'Featured Image', dataIndex: 'main_image', menuDisabled: true, width: 120 },
                { text: 'Color', dataIndex: 'Color', menuDisabled: true, width: 120 },
                { text: 'Color Code', dataIndex: 'color_code', menuDisabled: true, width: 120 },
                { text: 'Hex Value', dataIndex: 'skuHexValue', menuDisabled: true, width: 120 },                
                { text: 'Fur Natural or Dyed', dataIndex: 'Fur_Natural_or_Dyed', menuDisabled: true, width: 120 },
                { text: 'Fur Origin', dataIndex: 'Fur_Origin', menuDisabled: true, width: 120 },
                { text: 'Fur/Hair Type', dataIndex: 'Fur_Hair_Type', menuDisabled: true, width: 120 },
                { text: 'Purchase limit', dataIndex: 'purchaselimit', menuDisabled: true, width: 160 },
                { text: 'Size', dataIndex: 'Size', menuDisabled: true, width: 120 },
                { text: 'Size Desc', dataIndex: 'size_desc', menuDisabled: true, width: 120 },
                { text: 'Size Code', dataIndex: 'size_code', menuDisabled: true, width: 120 },
                { text: 'Backorderable', dataIndex: 'Backorderable', menuDisabled: true, width: 120 },
                { text: 'Primary_Parent_Color', dataIndex: 'Primary_Parent_Color', menuDisabled: true, width: 160 },
                { text: 'refCategory1', dataIndex: 'refCategory1', menuDisabled: true, width: 160 },
                { text: 'refCategory2', dataIndex: 'refCategory2', menuDisabled: true, width: 160 },
                { text: 'refCategory3', dataIndex: 'refCategory3', menuDisabled: true, width: 160 },
                { text: 'refinementProductType1', dataIndex: 'refinementProductType1', menuDisabled: true, width: 160 },
                { text: 'refinementProductType2', dataIndex: 'refinementProductType2', menuDisabled: true, width: 160 },
                { text: 'refinementProductType3', dataIndex: 'refinementProductType3', menuDisabled: true, width: 160 },
                { text: 'refLifestyle1', dataIndex: 'refLifestyle1', menuDisabled: true, width: 100 },
                { text: 'refLifestyle2', dataIndex: 'refLifestyle2', menuDisabled: true, width: 100 },
                { text: 'refLifestyle3', dataIndex: 'refLifestyle3', menuDisabled: true, width: 100 },
                { text: 'Secondary_Parent_Color', dataIndex: 'Secondary_Parent_Color', menuDisabled: true, width: 80 },
                { text: 'Shoprunner Eligible', dataIndex: 'Shoprunner_Eligible', menuDisabled: true, width: 160 },
                { text: 'Signature Required', dataIndex: 'SignatureRequired_Type', menuDisabled: true, width: 80 },
                { text: 'US_STDSize', dataIndex: 'US_STDSize', menuDisabled: true, width: 160 },
                { text: 'US_STDSize2', dataIndex: 'US_STDSize2', menuDisabled: true, width: 160 },
                { text: 'US_STDSize3', dataIndex: 'US_STDSize3', menuDisabled: true, width: 160 },
                { text: 'Waitlistable', dataIndex: 'waitlist', menuDisabled: true, width: 160 },
                { text: 'Main color Image', dataIndex: 'main_color_image', menuDisabled: true, width: 160 },
                { text: 'Additional Image 1', dataIndex: 'additional_image_1', menuDisabled: true, width: 160 },
                { text: 'Additional Image 2', dataIndex: 'additional_image_2', menuDisabled: true, width: 160 },
                { text: 'Additional Image 3', dataIndex: 'additional_image_3', menuDisabled: true, width: 160 },
                { text: 'Additional Image 4', dataIndex: 'additional_image_4', menuDisabled: true, width: 160 },
                { text: 'Additional Image 5', dataIndex: 'additional_image_5', menuDisabled: true, width: 160 },
                { text: 'Additional Image 6', dataIndex: 'additional_image_6', menuDisabled: true, width: 160 },
                { text: 'Additional Image 7', dataIndex: 'additional_image_7', menuDisabled: true, width: 160 },
                { text: 'Additional Image 8', dataIndex: 'additional_image_8', menuDisabled: true, width: 160 },
                { text: 'Care', dataIndex: 'care', menuDisabled: true, width: 160 },                
                { text: 'refLensType', dataIndex: 'refLensType', menuDisabled: true, width: 160 },
                { text: 'Shipping Restrictions (Countries)', dataIndex: 'PD_RestrictedCountry_Text', menuDisabled: true, width: 160 },
                { text: 'Shipping Restrictions (States)', dataIndex: 'PD_RestrictedState_Text', menuDisabled: true, width: 160 },
                { text: 'Country of Origin', dataIndex: 'country_of_origin', menuDisabled: true, width: 160 },
                { text: 'Model Image (Full Length)', dataIndex: 'on_model_image', menuDisabled: true, width: 160 },
                { text: 'Country of Fulfillment', dataIndex: 'country_of_fulfillment', menuDisabled: true, width: 160 },
                { text: 'Video', dataIndex: 'video', menuDisabled: true, width: 160 },
                { text: 'Migrated Product', dataIndex: 'migrated_product', menuDisabled: true, width: 160 },
                { text: 'STL Product 1', dataIndex: 'stl_product_1', menuDisabled: true, width: 160 },
                { text: 'STL Product 2', dataIndex: 'stl_product_2', menuDisabled: true, width: 160 },
                { text: 'STL Product 3', dataIndex: 'stl_product_3', menuDisabled: true, width: 160 },
                { text: 'STL Product 4', dataIndex: 'stl_product_4', menuDisabled: true, width: 160 },
                { text: 'STL Product 5', dataIndex: 'stl_product_5', menuDisabled: true, width: 160 },
                { text: 'refinementStyle1', dataIndex: 'refinementStyle1', menuDisabled: true, width: 160 },
                { text: 'refinementStyle2', dataIndex: 'refinementStyle2', menuDisabled: true, width: 160 },
                { text: 'refinementStyle3', dataIndex: 'refinementStyle3', menuDisabled: true, width: 160 },
                { text: 'refLength', dataIndex: 'refLength', menuDisabled: true, width: 160 },
                { text: 'refMaterial1', dataIndex: 'refMaterial1', menuDisabled: true, width: 160 },
                { text: 'refMaterial2', dataIndex: 'refMaterial2', menuDisabled: true, width: 160 },
                { text: 'refMaterial3', dataIndex: 'refMaterial3', menuDisabled: true, width: 160 },
                { text: 'refNeckline', dataIndex: 'refNeckline', menuDisabled: true, width: 160 },
                { text: 'refPatternPrint', dataIndex: 'refPatternPrint', menuDisabled: true, width: 160 },
                { text: 'refRise', dataIndex: 'refRise', menuDisabled: true, width: 160 },
                { text: 'refSleeveLength', dataIndex: 'refSleeveLength', menuDisabled: true, width: 160 },
                { text: 'refWash', dataIndex: 'refWash', menuDisabled: true, width: 160 },
                { text: 'refGender', dataIndex: 'refGender', menuDisabled: true, width: 160 }                
            ]
        },

        RM: {
            store: 'buildReitmansStore',
            columns: [
                { text: 'category', dataIndex: 'category', menuDisabled: true, width: 360 },
                { text: 'shopSKU', dataIndex: 'shopSKU', menuDisabled: true, width: 120 },
                { text: 'name_default', dataIndex: 'name_default', menuDisabled: true, width: 200 },
                { text: 'variantGroupCode', dataIndex: 'variantGroupCode', menuDisabled: true, width: 120 },
                { text: 'imageURL', dataIndex: 'imageURL', menuDisabled: true, width: 160 },
                { text: 'additionalImage1', dataIndex: 'additionalImage1', menuDisabled: true, width: 160 },
                { text: 'additionalImage2', dataIndex: 'additionalImage2', menuDisabled: true, width: 160 },
                { text: 'additionalImage3', dataIndex: 'additionalImage3', menuDisabled: true, width: 160 },
                { text: 'additionalImage4', dataIndex: 'additionalImage4', menuDisabled: true, width: 160 },
                { text: 'sizeChart', dataIndex: 'sizeChart', menuDisabled: true, width: 160 },
                { text: 'swatchImage', dataIndex: 'swatchImage', menuDisabled: true, width: 160 },                
                { text: 'brand', dataIndex: 'brand', menuDisabled: true, width: 120 },                                
                { text: 'manufacturerId', dataIndex: 'manufacturerId', menuDisabled: true, width: 120 },
                { text: 'UPC', dataIndex: 'UPC', menuDisabled: true, width: 120 },                
                { text: 'countryOfOrigin', dataIndex: 'countryOfOrigin', menuDisabled: true, width: 160 },
                { text: 'color', dataIndex: 'color', menuDisabled: true, width: 120 },
                { text: 'longDescription_default', dataIndex: 'longDescription_default', menuDisabled: true, width: 120 },                
                { text: 'long Description_fr', dataIndex: 'longDescription_fr', menuDisabled: true, width: 120 },                                
                { text: 'name_fr', dataIndex: 'name_fr', menuDisabled: true, width: 200 },                                
                { text: 'washCare_default', dataIndex: 'washCare_default', menuDisabled: true, width: 120 },
                { text: 'washCare_fr', dataIndex: 'washCare_fr', menuDisabled: true, width: 120 },                                
                { text: 'material', dataIndex: 'material', menuDisabled: true, width: 120 },
                { text: 'size', dataIndex: 'size', menuDisabled: true, width: 120 },                                
                { text: 'pantskirtLength', dataIndex: 'pantskirtLength', menuDisabled: true, width: 120 },
                { text: 'sleeveType', dataIndex: 'sleeveType', menuDisabled: true, width: 120 },
                { text: 'neck', dataIndex: 'neck', menuDisabled: true, width: 120 },
                { text: 'pantskirtLength_default', dataIndex: 'pantskirtLength_default', menuDisabled: true, width: 120 },
                { text: 'pantskirtLength_fr', dataIndex: 'pantskirtLength_fr', menuDisabled: true, width: 120 },
                { text: 'sleeveType_default', dataIndex: 'sleeveType_default', menuDisabled: true, width: 120 },                
                { text: 'sleeveType_fr', dataIndex: 'sleeveType_fr', menuDisabled: true, width: 120 },                                
                { text: 'neck_default', dataIndex: 'neck_default', menuDisabled: true, width: 120 },
                { text: 'neck_fr', dataIndex: 'neck_fr', menuDisabled: true, width: 120 },
                { text: 'shapeLegAndBody', dataIndex: 'shapeLegAndBody', menuDisabled: true, width: 120 },
                { text: 'rise', dataIndex: 'size', menuDisabled: true, width: 120 },
                { text: 'rise_default', dataIndex: 'rise_default', menuDisabled: true, width: 120 },
                { text: 'rise_fr', dataIndex: 'rise_fr', menuDisabled: true, width: 120 },
                { text: 'sleeveLength', dataIndex: 'sleeveLength', menuDisabled: true, width: 120 },
                { text: 'sleeveLength_default', dataIndex: 'sleeveLength_default', menuDisabled: true, width: 120 },
                { text: 'sleeveLength_fr', dataIndex: 'sleeveLength_fr', menuDisabled: true, width: 120 },
                { text: 'closure', dataIndex: 'closure', menuDisabled: true, width: 120 },
                { text: 'fitType', dataIndex: 'fitType', menuDisabled: true, width: 120 },
                { text: 'pocketType', dataIndex: 'pocketType', menuDisabled: true, width: 120 }

            ]
        },

        HM: {
            store: 'buildHudsonsStore',
            columns: [
                { text: 'category', dataIndex: 'category', menuDisabled: true, width: 360 },
                { text: 'shopSKU', dataIndex: 'shopSKU', menuDisabled: true, width: 120 },
                { text: 'UPC', dataIndex: 'UPC', menuDisabled: true, width: 120 },                
                { text: 'variantGroupCode', dataIndex: 'variantGroupCode', menuDisabled: true, width: 120 },
                { text: 'brand', dataIndex: 'brand', menuDisabled: true, width: 120 },                                
                { text: 'name_en', dataIndex: 'name_en', menuDisabled: true, width: 200 },
                { text: 'name_fr', dataIndex: 'name_fr', menuDisabled: true, width: 200 },                
                { text: 'longDescription_en', dataIndex: 'longDescription_en', menuDisabled: true, width: 120 },                
                { text: 'longDescription_fr', dataIndex: 'longDescription_fr', menuDisabled: true, width: 120 },                
                { text: 'countryOfOrigin', dataIndex: 'countryOfOrigin', menuDisabled: true, width: 160 },
                { text: 'hbcProductType', dataIndex: 'hbcProductType', menuDisabled: true, width: 160 },
                { text: 'reviewable', dataIndex: 'reviewable', menuDisabled: true, width: 160 },
                { text: 'wishlist', dataIndex: 'wishlist', menuDisabled: true, width: 160 },
                { text: 'giftWrapEligible', dataIndex: 'giftWrapEligible', menuDisabled: true, width: 160 },
                { text: 'rewardEligible', dataIndex: 'rewardEligible', menuDisabled: true, width: 160 },
                { text: 'displayQuickLook', dataIndex: 'displayQuickLook', menuDisabled: true, width: 160 },
                { text: 'sizeChartSubType', dataIndex: 'sizeChartSubType', menuDisabled: true, width: 160 },                                
                { text: 'image_1', dataIndex: 'image_1', menuDisabled: true, width: 160 },
                { text: 'image_2', dataIndex: 'image_2', menuDisabled: true, width: 160 },
                { text: 'image_3', dataIndex: 'image_3', menuDisabled: true, width: 160 },
                { text: 'image_4', dataIndex: 'image_4', menuDisabled: true, width: 160 },
                { text: 'image_5', dataIndex: 'image_5', menuDisabled: true, width: 160 },
                { text: 'image_6', dataIndex: 'image_6', menuDisabled: true, width: 160 },
                { text: 'image_7', dataIndex: 'image_7', menuDisabled: true, width: 160 },
                { text: 'color', dataIndex: 'color', menuDisabled: true, width: 120 },
                { text: 'colorRefinement_en', dataIndex: 'colorRefinement_en', menuDisabled: true, width: 120 },
                { text: 'hexValueForSwatch', dataIndex: 'hexValueForSwatch', menuDisabled: true, width: 120 },
                { text: 'size_en', dataIndex: 'size_en', menuDisabled: true, width: 120 },                          
                { text: 'sizeRefinement_en', dataIndex: 'sizeRefinement_en', menuDisabled: true, width: 120 },
                { text: 'miraklWomensClothingType', dataIndex: 'miraklWomensClothingType', menuDisabled: true, width: 160 },
                //{ text: 'miraklWomensIntimatesPjsType', dataIndex: 'miraklWomensIntimatesPjsType', menuDisabled: true, width: 160 },
                //{ text: 'miraklWomensIntimatesPjsSwimType', dataIndex: 'miraklWomensIntimatesPjsSwimType', menuDisabled: true, width: 160 },
                { text: 'miraklDressesStyle1', dataIndex: 'miraklDressesStyle1', menuDisabled: true, width: 160 },
                { text: 'miraklTopsSweatersStyle1', dataIndex: 'miraklTopsSweatersStyle1', menuDisabled: true, width: 160 },
                { text: 'miraklWomensBottomsStyle1', dataIndex: 'miraklWomensBottomsStyle1', menuDisabled: true, width: 160 },
                //{ text: 'miraklWomensIntimatesPjsSwimStyle1', dataIndex: 'miraklWomensIntimatesPjsSwimStyle1', menuDisabled: true, width: 160 },
                { text: 'miraklWomensJacketsStyle1', dataIndex: 'miraklWomensJacketsStyle1', menuDisabled: true, width: 160 },
                { text: 'refNeckline', dataIndex: 'refNeckline', menuDisabled: true, width: 160 },                
                { text: 'refSleeveLength', dataIndex: 'refSleeveLength', menuDisabled: true, width: 160 },        
                { text: 'refLength', dataIndex: 'refLength', menuDisabled: true, width: 160 },                
                { text: 'refRise', dataIndex: 'refRise', menuDisabled: true, width: 160 },                
                { text: 'refWash', dataIndex: 'refWash', menuDisabled: true, width: 160 },                
                { text: 'refPatternPrint', dataIndex: 'refPatternPrint', menuDisabled: true, width: 160 },                
                //{ text: 'miraklWomensConcern', dataIndex: 'miraklWomensConcern', menuDisabled: true, width: 160 },                
                { text: 'miraklWomensMaterial', dataIndex: 'miraklWomensMaterial', menuDisabled: true, width: 160 },                
                { text: 'refinementProductType', dataIndex: 'refinementProductType', menuDisabled: true, width: 160 },                
                { text: 'refinementStyle', dataIndex: 'refinementStyle', menuDisabled: true, width: 160 },                
                { text: 'refMaterial', dataIndex: 'refMaterial', menuDisabled: true, width: 160 },                                                
                { text: 'refConcern', dataIndex: 'refConcern', menuDisabled: true, width: 120 },                                
                { text: 'miraklProductStatus', dataIndex: 'miraklProductStatus', menuDisabled: true, width: 120 },
                { text: 'refResponsible', dataIndex: 'refResponsible', menuDisabled: true, width: 120 },                                
                { text: 'dangerousGoods', dataIndex: 'dangerousGoods', menuDisabled: true, width: 120 },
                { text: 'refCategory', dataIndex: 'refCategory', menuDisabled: true, width: 120 },                
                { text: 'refSizeRange', dataIndex: 'refSizeRange', menuDisabled: true, width: 120 }                            
                
            ]
        }
    }    
})
