Ext.define('August.view.pim.ProductDetail',{
    extend: 'August.view.Viewer',
    
    requires: [
        'August.view.pim.ProductDetailController',
        'August.view.pim.ProductDetailModel',
        'August.view.pim.Form',
        'August.view.pim.Display',
        'August.plugin.grid.Exporter'
    ],

    alias: 'widget.pim-productdetail',

    controller: 'pim-productdetail',
    viewModel: {
        type: 'pim-productdetail'
    },

    cls: "pim shadow-panel",

    header: false,
    margin: '2 0 0 4',

    listeners: {
        actnew: 'onActNewClick',
        actedit: 'onActEditClick',
        actcopy: 'onActCopyClick',
        actsave: 'onActSaveClick',
        actdelete: 'onActDeleteClick',
        actrefresh: 'onActRefreshClick',        
        actnewlist: 'onActNewListClick',
        clearall: 'onClearFilters',
        //rowdblclick: 'onActEditClick',
        //itemdblclick: "onActEditClick",
        itemcontextmenu: "onItemContextMenu"
    },

    initComponent: function(){
        var me = this,
            vm = me.getViewModel();

        //me.dockedItems = me.buildDockedItems();

        Ext.applyIf(me, {
            items: [{
                xtype: "multiview",
                reference: "multiview",
                title: "Product Information Management",
                iconCls: "x-fa fa-cube",

                tbar: {
                    xtype: "topbar",
                    reference: "topbar"
                },

                mainItems: [{
                    xtype: "grid",

                    reference: "grid",                    
                    cls: 'pim-product-grid',

                    session: true,
                    scrollable: true,                
                    flex: 1,
                    
                    style: {
                        borderTop: '1px solid #cfcfcf',
                        borderBottom: '1px solid #cfcfcf'
                    },

                    bind: {                        
                        store: '{productdetails}',
                        selection: '{selectedProduct}'
                    },

                    listeners: {
                        select: {
                            fn: 'onSelect',
                            scope: this.controller
                        },
                        selectionchange: {
                            fn: 'onSelectionChange',
                            scope: this.controller
                        },
                        beforeitemdblclick: {
                            fn: 'onBeforeDblClick',
                            scope: this.controller
                        }
                    },

                    columns: me.buildGridColumns(vm),

                    selModel: {
                        pruneRemoved: false
                    },

                    plugins: [{
                        ptype: 'rowediting',
                        clicksToEdit: 2
                    },{
                        ptype: "gridfilters"
                    },{
                        ptype: 'grid-exporter'
                    }],
                    
                    viewConfig: {
                        //loadMask: true,
                        //stripeRows: true,
                        trackOver: true,
                        preserveScrollOnRefresh: true,
                        preserveScrollOnReload: true,
                        deferInitialRefresh: true,
                        emptyText: '<h1 style="margin: 20px">No matching results</h1>',
                        getRowClass: function(a, g, f, h){
                            return "custom-row-style";
                        },
                        listeners: {
                            render: function(view){
                                //var view = grid.getView();
                                view.tip = Ext.create('Ext.tip.ToolTip', {
                                    // The overall target element.
                                    target: view.el,
                                    // Each grid row causes its own separate show and hide.
                                    //delegate: view.itemSelector,
                                    delegate: view.cellSelector,
                                    // Moving within the row should not hide the tip.
                                    trackMouse: true,
                                    // Render immediately so that tip.body can be referenced prior to the first show.
                                    renderTo: Ext.getBody(),
                                    listeners: {
                                        // Change content dynamically depending on which element triggered the show.
                                        beforeshow: function updateTipBody(tip) {
                                            var trigger = tip.triggerElement,
                                                parent = tip.triggerElement.parentElement,
                                                columnTitle = view.getHeaderByCell(trigger).text,
                                                columnDataIndex = view.getHeaderByCell(trigger).dataIndex,
                                                columnText = view.getRecord(parent).get(columnDataIndex);

                                            if(!Ext.isEmpty(columnText)){
                                                var xf = Ext.util.Format;

                                                tip.update(columnText);
                                            }
                                            else {
                                                return false;
                                            }

                                        }
                                    }
                                });
                            }
                        }
                    }
                }],

                displayItems: [{
                    xtype: "pim-display",
                    reference: "display",                    
                    margin: '2 0 0 0',
                    //flex: 1,
                    
                    items: [{
                        xtype: "form",
                        title: 'Description Generate Options',
                        reference: "descript-options",
                        //scrollable: true,
                        cls: "product-desc-options",
                        
                        layout: {
                            type: 'vbox'
                            //align: 'stretch'
                        },
    
                        //width: 480,
                        bodyPadding: 10,
                        //region: 'east',    
                        style: {
                            borderTop: '1px solid #cfcfcf',
                            //borderBottom: '1px solid #cfcfcf'
                        },  
    
                        split: {
                            size: 1
                        },                                        
                    
                        defaults: {
                            width: '100%',
                            labelWidth: 140
                        },
    
                        items: [{
                            xtype: 'textfield',
                            name: 'description',
                            fieldLabel: 'Product Name',
                            fieldCls: 'required',
                            msgTarget: 'qtip',
                            allowBlank: false,
                            bind: '{selectedProduct.description}'
                        },
                        {
                            xtype: 'textareafield',
                            name: 'characteristics',
                            fieldLabel: 'Characteristics',
                            fieldCls: 'required',
                            msgTarget: 'qtip',
                            grow: true,
                            height: 100,
                            allowBlank: false,
                            bind: '{selectedProduct.characteristics}'
                        },                                                                    
                        {
                            xtype: 'checkbox',
                            name: 'useDefaultKeys',
                            reference: 'useDefaultKeys',
                            fieldLabel: 'Use Default Keywords',
                            value: 0
                            //boxLabel: 'Overwrites'
                        },  
                        {
                            xtype: 'tagfield',
                            name: 'bkeywords',
                            reference: 'bkeywords',
                            fieldLabel: 'Brand Keywords',                    
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
                                disabled: '{!useDefaultKeys.checked}',
                                //visible: '{brand.value}',                        
                                filters: {
                                    property: 'brand',
                                    value: '{selectedProduct.division}'
                                },
                                store: '{keywords}'    
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
                        {
                            xtype: 'textareafield',
                            name: 'addkeywords',
                            fieldLabel: 'Addl. Keywords',                                                                                    
                            height: 100,
                            allowBlank: true,
                            bind: '{selectedProduct.keywords}'
                        },                    
                        /*
                        {
                            xtype: 'combo',
                            name: 'tone-voice',
                            fieldLabel: 'Tone of Voice',         
                            fieldCls: 'required',               
                            hidden: true,                            
                            //labelAlign: 'right',
                            //labelSeparator: '',
                            //labelPad: 10,
                            //labelWidth: 45,
                            hideLabel: true,
                            width: 50,                                  
                            bind: {
                                store: '{voices}'                            
                            },
                            queryMode: "local",
                            value: "creative",
                            matchFieldWidth: true,
                            displayField: "label",
                            valueField: "value",
                            editable: false,
                            allowBlank: false,
                            forceSelection: true
                        },
                        {
                            xtype: 'combo',
                            name: 'engine',
                            fieldLabel: 'Quality type',     
                            fieldCls: 'required',                     
                            hidden: true,
                            store: ['economy', 'average', 'good', 'premium'],
                            queryMode: "local",
                            value: "good",
                            matchFieldWidth: true,
                            //displayField: "label",
                            valueField: "value",
                            editable: false,
                            forceSelection: true
                        },
                        */
                        {
                            xtype: 'numberfield',
                            name: 'words',
                            fieldLabel: '# of Words',
                            width: 420,
                            value: 90,
                            maxValue: 250,
                            minValue: 10
                        },   
                        {
                            xtype: 'slider',
                            name: 'temperature',
                            fieldLabel: 'Creativity',
                            width: 420,
                            value: 100,
                            increment: 10,
                            minValue: 0,
                            maxValue: 200   
                        },
                        {
                            xtype: 'checkbox',
                            name: 'overwrite',
                            reference: 'isOverwrite',
                            fieldLabel: 'Overwrites',
                            value: 0,
                            //boxLabel: 'Overwrites',                            
                            listeners: {
                                change: {
                                    fn: 'onCheckChange',
                                    scope: this.controller
                                }
                            }
                        },
                        {
                            xtype: 'checkbox',
                            name: 'updateVariants',
                            reference: 'updateVariants',
                            fieldLabel: 'Apply to other colors',
                            value: 1
                            //boxLabel: 'Overwrites',                                                        
                        }],                                                                     
    
                        buttons: [{
                            text: 'Genereate',
                            name: 'generate',
                            disabled: true,
                            bind: {
                                //disabled: '{!isOverwrite.checked}'
                            },
                            listeners: {
                                click: {
                                    fn: 'onGenerateClick',
                                    scope: this.controller
                                }
                            }
                        }],

                        listeners: {
                            render: {
                                //fn: 'onGridRender',
                                //scope: this.controller
                            }
                        }
                    }]
                }],

                bbar: me.buildBottomBar()
            }]
        });

        me.callParent(arguments);

        var g=this.lookupReference("multiview"),
            j=g.lookupReference("grid"),
            h=g.lookupReference("display"),
            f=g.lookupReference("topbar");                    
        
        var segmented = f.lookupReference('viewselection');        
        //segmented.items.items[1].setHidden(true);
        //segmented.setValue(0);
           
        f.actClear.setHidden(false);
        f.actNew.setHidden(false);
        f.actDelete.setHidden(false);
        f.actDelete.setDisabled(true);
        f.actEdit.setHidden(false);
        f.actEdit.setDisabled(true);
        f.actSave.setHidden(false);
        f.actSave.setDisabled(true);

        var mnuItems = [f.actEdit, f.actDelete, f.actRefresh, f.actSave];

        me.contextmenu = Ext.create("Ext.menu.Menu", {
            items: mnuItems
        });        

        f.insert(0,
            [{
                xtype: 'combo',               
                name: 'categories', 
                fieldLabel: '',
                width: 112,
                //labelWidth: 30,
                hideLabel: true,
                valueField: 'field',
                displayField: 'label',
                value: 'Style #',
                editable: false,
                reference: "filterSelection",
                bind: {
                    store: '{categories}'
                },
                queryMode: 'local',
                listeners: {                    
                    change: {
                        fn: "onFilterItemChange",
                        scope: this.controller
                    }                    
                }
            },
            /*
            {
                xtype: "combo",
                reference: 'searchcombo',
                width: 300,
                hidden: true,
                hideLabel: true,
                // Use non-breaking space so that labelWidth of null shrinkwraps the unbroken string width
                valueField: 'id',
                displayField: 'id',
                // Over Extjs 5.* configs
                enableKeyEvents: true,
                queryMode: 'local',
                paramName: 'style',
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
                plugins: [{
                    ptype: "cleartrigger"
                }],
                listeners: {
                    render: function(c){
                        c.on('focus', function () {
                            c.expand();
                        });

                        var picker = c.getTrigger('picker');
                        picker.hide();
                    },
                    select: function(c,rec){
                        c.fireEvent('triggersearch', c, c.getValue());
                    },
                    triggersearch: {
                        fn: 'onTgrSearchClick',
                        scope: this.controller
                    },
                    triggerclear: {
                        fn: 'onTgrClearClick',
                        scope: this.controller
                    }
                }
            },
            */
            {
                xtype: 'searchtextlist',
                //reference: 'searchnumber',
                width: 300,
                bind: {
                    store: '{productdetails}'
                },
                paramName: 'style'
            }]
        );

        f.insert(5, 
            [{
                xtype: 'button',
                iconCls: "x-fa fa-plus-circle",
                text: "List",
                tooltip: "Open list for styles",
                action: 'list',
                ui: "default",
                //reference: 'new',                
                hidden: false,
                handler: function(item, e){
                    this.fireEvent("actnewlist", this, item);
                },
                scope: this
            }]    
        );

        f.insert(14,
            ['->',
            {
                xtype: 'button',
                iconCls: 'x-fa fa-file-export',
                text: 'Template',
                action: 'template',
                handler: 'onOpenTemplateClick',
                scope: me.controller
            },
            {
                xtype: 'button',
                iconCls: 'x-fa fa-file-export',
                text: 'A.I.G Desc',
                action: 'copywrite',
                handler: 'onOpenCopywriteClick',
                scope: me.controller
            },
            {
                xtype: 'button',
                iconCls: 'x-fa fa-map-signs',
                text: 'Color Map',
                action: 'mapping',
                handler: 'onOpenMappingClick',
                scope: me.controller
            },
            {
                xtype: 'button',
                text: 'Export',
                iconCls: 'x-fa fa-external-link-alt',
                tooltip: 'Export Product List',
                action: 'export',                
                handler: function(b){
                    j.saveDocumentAs({
                        type: 'xlsx',
                        title: 'Product List',
                        fileName: 'Product' + Ext.Date.format(new Date(), 'Y-m-d')
                    });
                }
            }]
        );

        var mnuItems = [f.actEdit, f.actDelete, f.actRefresh];

        me.contextmenu = Ext.create("Ext.menu.Menu", {
            items: mnuItems
        });

        f.items.items[1].setHidden(false);
        //f.items.items[2].setHidden(false);
        //f.items.last().setHidden(true);        

        
        this.relayEvents(f, ['actnew', 'actcopy', 'actedit', 'actdelete', 'actrefresh', 'actsave', 'actnewlist', 'clearall']);
        this.relayEvents(j, ["itemcontextmenu", "afterrender", "rowdblclick", "itemdblclick"]);  
        
    },

    buildGridColumns: function(vm){
        return [{
            text: "ID",
            dataIndex: "id",
            locked: false,
            hidden: true,
            filter: {
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "Product Description",
            dataIndex: "description",
            width: 320,            
            filter: {
                type: "string"
            },
            renderer: function (value, p, rec) {
                var tpl = '<div class="thumb-wrap">' + 
                            '<div class="thumb">' +                                 
                                '<img style="vertical-align:bottom;margin-left:4px;width:36px;" src="https://endlessrose.net:9443/StyleImages/200xImages/{0}_{1}_{2}.jpg" ' +
                                    'onerror="this.onerror=null;this.src=\'https://endlessrose.net:9443/StyleImages/{0}_{2}.jpg\';" ' + 
                                    //'onload=\"console.log(this);\" ' +
                                '/>' + 
                            '</div>' +                            
                          '</div>' + 
                          '<div>{3}</div>';                                 
                          
                return Ext.String.format(tpl, rec.data.style, encodeURIComponent(rec.data.color.replace('/', '-')), "front", value, 1);
            }
        },          
        {
            text: "Style #",
            dataIndex: "style",
            width: 120,            
            filter: {type: "string"},
            renderer: function(v, p, rec){                                
                return v;
            }
        }, 
        {
            text: "Color",
            dataIndex: "color",
            width: 160,            
            filter: {type: "string"},
            renderer: function(value, p, rec){                
                return value;
            }
        },         
        { text: 'Brand', dataIndex: 'division', menuDisabled: true, width: 120, hidden: false,
            filter: {
                type: 'string'
            },
            renderer: function(f, e, a){
                return f;
            }
        },                          
        { text: 'NRF Color Code', dataIndex: 'colorCode', menuDisabled: true, width: 120, hidden: true,
            filter: {
                type: 'string'
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        { text: 'Size Code', dataIndex: 'sizeCode', menuDisabled: true, width: 120, hidden: true,
            filter: {                                
                type: 'list',
                idField: 'value',
                labelField: 'label',
                store: vm.getStore('sizeCodes')
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        { text: 'SKU', dataIndex: 'sku', menuDisabled: true, width: 120, hidden: true,
            filter: {
                type: 'string'
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        { text: 'UPC', dataIndex: 'upc', menuDisabled: true, width: 120, hidden: true,
            filter: {
                type: 'string'
            },
            renderer: function(f, e, a){
                return f;
            }
        },        
        {
            text: "Product Category",
            dataIndex: "categoryCode",
            width: 160,            
            filter: {
                type: 'list',
                idField: 'value',
                labelField: 'label',
                store: vm.getStore('productCategories')
            },
            renderer: function(f, e, a){
                return Ext.String.capitalize(f);
            }
        }, 
        { text: 'Product Style', dataIndex: 'productStyle',  width: 120,        
            editor: {
                xtype: 'combo',                                
                id: 'cbProdStyle',
                displayField: 'label',
                valueField: 'value',                    
                //selectOnFocus: true,                
                forceSelection: false,
                matchFieldWidth: true,
                //msgTarget: 'side',
                minChars: 1,
                queryMode: 'local',
                //queryParam: 'filter',
                //triggerAction: 'all',
                //store: ['00', 'OS', 'SA'],
                bind: {
                    store: '{productStyles}'                   
                },                 
                plugins: [{
                    ptype: "cleartrigger"
                }]
            },
            filter: {                                
                type: 'list',
                idField: 'value',
                labelField: 'label',
                store: vm.getStore('productStyles')
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        { text: 'Long Description', dataIndex: 'longDescription', width: 240,
            editor: {
                field: {
                    xtype: 'textarea',
                    allowBlank: true
                }
            },
            filter: {
                type: 'string'
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        { text: 'Long Description - French', dataIndex: 'longDescription1', width: 240,
            editor: {
                field: {
                    xtype: 'textarea',
                    allowBlank: true
                }
            },
            filter: {
                type: 'string'
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        { text: 'Feature & Bullet 1', dataIndex: 'feature1', width: 180,
            editor: {
                field: {
                    xtype: 'textarea',
                    allowBlank: true
                }
            },
            filter: {
                type: 'string'
            },
            renderer: function(f, e, a){
                return f;
            }   
        },
        { text: 'Feature & Bullet 2', dataIndex: 'feature2', width: 180,
            editor: {
                field: {
                    xtype: 'textarea',
                    allowBlank: true
                }
            },
            filter: {
                type: 'string'
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        { text: 'Feature & Bullet 3', dataIndex: 'feature3', width: 180,
            editor: {
                field: {
                    xtype: 'textarea',
                    allowBlank: true
                }
            },
            filter: {
                type: 'string'
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        { text: 'Feature & Bullet 4', dataIndex: 'feature4', width: 180,
            editor: {
                field: {
                    xtype: 'textarea',
                    allowBlank: true
                }
            },
            filter: {
                type: 'string'
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        { text: 'Feature & Bullet 5', dataIndex: 'feature5', width: 180,
            editor: {
                field: {
                    xtype: 'textarea',
                    allowBlank: true
                }
            },
            filter: {
                type: 'string'
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        { text: 'Product Material', dataIndex: 'materialCode', width: 180,
            filter: {
                type: 'string'
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        { text: 'Product Dimensions', dataIndex: 'dimensions', width: 180,
            filter: {
                type: 'string'
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        { text: 'Care Instruction', dataIndex: 'care', width: 120,
            filter: {                                
                type: 'list',
                idField: 'value',
                labelField: 'label',
                store: vm.getStore('cares')
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        { text: 'Legal Warning', dataIndex: 'legal', width: 120,
            filter: {                                
                type: 'list',
                idField: 'value',
                labelField: 'label',
                store: vm.getStore('legals')
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        { text: 'Prop 65 Warning', dataIndex: 'prop65', width: 120 },
        { text: 'Warranty', dataIndex: 'warranty', width: 120 },
        { text: 'M.S.R.P', dataIndex: 'msrp', width: 120 },
        { text: 'General Keywords', dataIndex: 'keywords', width: 240,
            filter: {
                type: 'string'
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        { text: 'Tax Code', dataIndex: 'taxCode', width: 120,
            filter: {                                
                type: 'list',
                idField: 'value',
                labelField: 'label',
                store: vm.getStore('taxCodes')
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        { text: 'Special Size', dataIndex: 'specialSize', width: 120,
            filter: {                                
                type: 'list',
                idField: 'value',
                labelField: 'label',
                store: vm.getStore('specialSizes')
            },
            renderer: function(f, e, a){
                return f;
            }   
        },
        { text: 'Age Group', dataIndex: 'ageGroup', width: 120,
            filter: {                                
                type: 'list',
                idField: 'value',
                labelField: 'label',
                store: vm.getStore('ageGroups')
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        { text: 'Waist Fit', dataIndex: 'waistFit', width: 120,
            filter: {                                
                type: 'list',
                idField: 'value',
                labelField: 'label',
                store: vm.getStore('waistFits')
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        { text: 'Fit', dataIndex: 'fitType', width: 120,
            filter: {                                
                type: 'list',
                idField: 'value',
                labelField: 'label',
                store: vm.getStore('fitTypes')
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        { text: 'Wash', dataIndex: 'washType', width: 120,
            filter: {                                
                type: 'list',
                idField: 'value',
                labelField: 'label',
                store: vm.getStore('washTypes')
            },
            renderer: function(f, e, a){
                return f;
            }
        },        
        { text: 'Length', dataIndex: 'length',  width: 120,
            filter: {                                
                type: 'list',
                idField: 'value',
                labelField: 'label',
                store: vm.getStore('lengths')
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        { text: 'Sleeve Length', dataIndex: 'sleeveLength', width: 120,
            filter: {                                
                type: 'list',
                idField: 'value',
                labelField: 'label',
                store: vm.getStore('sleeveLengths')
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        { text: 'Neckline', dataIndex: 'neckline', width: 120,
            filter: {                                
                type: 'list',
                idField: 'value',
                labelField: 'label',
                store: vm.getStore('necklines')
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        { text: 'Waist Size', dataIndex: 'waistSize', width: 120 },
        { text: 'Chest Size', dataIndex: 'chestSize', width: 120 },
        { text: 'Closure Type', dataIndex: 'closureType', width: 120,
            filter: {                                
                type: 'list',
                idField: 'value',
                labelField: 'label',
                store: vm.getStore('closureTypes')
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        { text: 'Leg Style', dataIndex: 'legStyle', width: 120,
            filter: {                                
                type: 'list',
                idField: 'value',
                labelField: 'label',
                store: vm.getStore('legStyles')
            },
            renderer: function(f, e, a){
                return f;
            }
        },
        { text: 'Pattern', dataIndex: 'pattern', menuDisabled: true, width: 120 },
        { text: 'Occasion', dataIndex: 'occasion', menuDisabled: true, width: 120 },
        { text: 'Body Type', dataIndex: 'bodyType', menuDisabled: true, width: 120 },
        { text: 'Belt Type', dataIndex: 'beltType', menuDisabled: true, width: 120 },
        { text: 'Collar Type', dataIndex: 'collarType', menuDisabled: true, width: 120 },
        { text: 'Pocket', dataIndex: 'pocket', menuDisabled: true, width: 120 },
        { text: 'Theme', dataIndex: 'theme', menuDisabled: true, width: 120 },
        { text: 'Create User', dataIndex: 'createUser', menuDisabled: true, width: 120 },
        { text: 'Create Date', dataIndex: 'createTime', menuDisabled: true, width: 120 },
        { text: 'Update User', dataIndex: 'updateUser', menuDisabled: true, width: 120 },
        { text: 'Update Date', dataIndex: 'updateTime', menuDisabled: true, width: 120 }                                                
        ];
    },

    buildBottomBar: function(){
        var combo = Ext.create("widget.combo", {
                name: "perpage",
                //reference: 'pageSizer',
                width: 76,
                store: new Ext.data.ArrayStore({
                    fields: ["id"],
                    data: [["15"], ["25"], ["50"], ["100"], ["250"]]
                }),
                //value: "250",
                displayField: "id",
                valueField: "id",
                editable: false,
                forceSelection: true,
                matchFieldWidth: true,
                queryMode: "local"
                //triggerAction: "all",
            });

        combo.on('afterrender', function(c, e){
            var store = this.getViewModel().getStore("productdetails");
            c.setValue(store.getPageSize());
        }, this);

        combo.on("select", function(e, a){
            var store = this.getViewModel().getStore("productdetails");
            store.setPageSize(e.getValue());
            store.load();
            //console.log("combo select", f)
        }, this);

        return {
            xtype: "pagingtoolbar",
            //itemId: "pagingtb",
            bind: {
                store: "{productdetails}"
            },
            //dock: 'bottom',
            displayInfo: true,
            items: ["-", combo, "Per Page"]
        };
    }

    /*
    buildImageGridColumns: function() {
        return [{
            text: "Product ID",
            dataIndex: "product_id",
            locked: false,
            hidden: true,
            filter: {
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
            }
        },{
            text: "Src",
            dataIndex: "src",
            width: 320,            
            filter: {
                type: "string"
            },
            renderer: function (value, p, rec) {                
                return value;
            }
        },{
            text: "Position",
            dataIndex: "position",
            width: 60,            
            filter: {
                type: "string"
            },
            renderer: function (value, p, rec) {                
                return value;
            }
        },{
            text: "Width",
            dataIndex: "width",
            width: 100,            
            filter: {
                type: "string"
            },
            renderer: function (value, p, rec) {                
                return value;
            }
        },{
            text: "Height",
            dataIndex: "height",
            width: 100,            
            filter: {
                type: "string"
            },
            renderer: function (value, p, rec) {                
                return value;
            }
        },{
            text: "Varint IDs",
            dataIndex: "variant_ids",
            width: 180,            
            filter: {
                type: "string"
            },
            renderer: function (value, p, rec) {                
                return value;
            }
        },{
            xtype: 'datecolumn',
            text: "Created",
            dataIndex: "created_at",
            hidden: false,
            format: 'Y-m-d',            
            filter: {
                type: "date"
            }
        },
        {
            xtype: 'datecolumn',
            text: "Updated",
            dataIndex: "updated_at",
            hidden: false,
            format: 'Y-m-d',
            filter: {
                type: "date"
            }
        }]
    },
    
    buildVariantGridColumns: function() {
        return [{
            text: "Product ID",
            dataIndex: "product_id",
            locked: false,
            hidden: true,
            filter: {
                type: "number"
            },
            renderer: function(f, e, a){
                return f;
            }
        },{
            text: "Title",
            dataIndex: "title",
            width: 180,  
            hidden: true,          
            filter: {
                type: "string"
            },
            renderer: function (value, p, rec) {                
                return value;
            }
        },{
            text: "Color",
            dataIndex: "option1",
            width: 140,            
            filter: {
                type: "string"
            },
            renderer: function (value, p, rec) {                
                return value;
            }
        },{
            text: "Size",
            dataIndex: "option2",
            width: 80,            
            filter: {
                type: "string"
            },
            renderer: function (value, p, rec) {                
                return value;
            }
        },
        {
            text: "Position",
            dataIndex: "position",
            width: 60,
            //filter: {type: "number"},
            renderer: function(value, p, rec){
                return value;
            }
        }, 
        {
            text: "Price",
            dataIndex: "price",
            width: 100,
            //filter: {type: "number"},
            renderer: Ext.util.Format.usMoney
        },   
        {
            text: "Compare at price",
            dataIndex: "compare_at_price",
            width: 100,
            //filter: {type: "number"},
            renderer: Ext.util.Format.usMoney
        },  
        {
            text: "Cost per items",
            dataIndex: "cost",
            width: 100,
            hidden: true,
            //filter: {type: "number"},
            renderer: Ext.util.Format.usMoney
        },  
        {
            xtype: 'checkcolumn',
            text: "Charges taxes",
            dataIndex: "taxable",
            width: 60,
            //filter: {type: "number"}            
        },
        {
            text: "SKU",
            dataIndex: "sku",
            width: 220,
            filter: {type: "string"},
            renderer: function(v, p, rec){                                

                return v;
            }
        }, 
        {
            text: "Barcode",
            dataIndex: "barcode",
            width: 200,
            hidden: false,
            filter: {type: "string"},
            renderer: function(value, p, rec){                

                return value;
            }
        },     
        {
            xtype: 'numbercolumn',
            text: "Inventory Quantity",
            dataIndex: "inventory_quantity",
            //width: 100,
            hidden: false,
            filter: {type: "number"},
            renderer: function(i, h, a){
                return i;
            }
        },  
        {
            xtype: 'numbercolumn',
            text: "Weight",
            dataIndex: "weight",
            //width: 100,
            format: '0.00',
            filter: {type: "number"},
            renderer: function(i, h, a){
                return i;
            }
        },
        {
            xtype: 'checkcolumn',
            text: "Requires shipping",
            dataIndex: "requires_shipping",
            width: 60
            //filter: {type: "string"},            
        },              
        {
            xtype: 'datecolumn',
            text: "Created",
            dataIndex: "created_at",            
            format: 'Y-m-d',            
            filter: {
                type: "date"
            }
        },
        {
            xtype: 'datecolumn',
            text: "Updated",
            dataIndex: "updated_at",            
            format: 'Y-m-d',
            filter: {
                type: "date"
            }
        }]
    }
    */    
});
