/**
 * @class production.LineSheet
 * @extend Ext.panel.Panel
 *
 * Show the detail of a production Linesheet
 *
 * @constructor
 * Create a new post
 * @param {Object} config The config object
 */
 Ext.define("August.view.production.LineSheet",{
    extend: "Ext.panel.Panel",

    requires: [
        "August.view.production.LineSheetController",
        "August.view.production.LineSheetModel",
        'Ext.ux.toggleslide.ToggleSlide',
        'Ext.ux.form.field.ToggleSlide',
        'Ext.ux.BoxReorderer',       
        'Ext.ux.form.MultiSelect', 
        'August.plugin.grid.Exporter'
    ],

    alias: 'widget.production-linesheet',

    controller: "production-linesheet",
    viewModel: {
        type: "production-linesheet"
    },

    cls: 'linesheet-preview',

    scrollable: true,
    //border: true,

    style: {
        borderTop: '1px solid #cfcfcf'
    },

    config: {
        inTab: false,
        active: null
    },

    layout: 'fit',

    listeners: {
        render: {
            fn: 'onLineSheetRender',
            scope: this.controller
        },
        itemclickremove: 'onItemClickRemove',
        itemclickrefresh: 'onItemClickRefresh',
        itemclickprint: 'onItemClickPrint'
    },

    initComponent: function(){
        var me = this;

        me.actClose = Ext.create('Ext.Action', {
            text: "Close",
            tooltip: "Close the line sheet",
            ui: "default",
            //reference: 'delete',
            iconCls: "x-fa fa-times-circle",
            hidden: false,
            handler: function(item, e){
                var viewer = me.ownerCt;

                viewer.remove(me);
            },
            scope: me
        }),

        me.actRemove = Ext.create('Ext.Action', {
            text: "Remove",
            tooltip: "Remove style from line sheet",
            ui: "default",
            //reference: 'delete',
            iconCls: "x-fa fa-minus-circle",
            hidden: false,
            disabled: true,
            handler: function(item, e){
                me.fireEvent("itemclickremove", me, item);
            },
            scope: me
        }),

        me.actRefresh = Ext.create('Ext.Action', {
            text: "Refresh",
            tooltip: "Refresh line sheet",
            ui: "default",
            //reference: 'refresh',
            iconCls: "x-fa fa-sync-alt",
            hidden: false,
            handler: function(item, e){
                me.fireEvent("itemclickrefresh", me, item);
            },
            scope: me
        }),

        me.actPrint = Ext.create('Ext.Action', {
            text: "Show PDF",
            tooltip: "Show PDF line sheet to print",
            ui: "default",
            //reference: 'refresh',
            iconCls: "x-fa fa-print",
            //width: 80,
            hidden: false,
            handler: function(item, e){
                me.fireEvent("itemclickprint", me, item);
            },
            scope: me
        }),        

        Ext.applyIf(me, {
            items: [{
                xtype: 'container',
                layout: 'border',
                items: [{
                    xtype: 'container',
                    region: 'center',
                    flex: 3,
                    collapsible: false,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [{
                        plain: true,
                        header: false,                        
                        height: 48,                        
                        style: {
                            //paddingTop: '20px',
                            borderTop: '1px solid #cfcfcf'
                        },

                        bind: {
                            html: '<div style="font-size: 2.0em; font-weight:400; padding: 20px 0 30px 0; text-align: center;">{title}</div>'
                        }
                    },{
                        xtype: "style-view",
                        //reference: "tiles",
                        //cls: '',
                        //region: 'center',
                        //collapsible: false,
                        style: {
                            borderBottom: '1px solid #cfcfcf'
                        },
                        loadingHeight: 100,
                        flex: 1,
                        selectionModel: {
                            mode: 'MULTI'
                        },
                        
                        bind: {
                            store: '{theLineSheet.stylesInLines}'
                        },
                        
                        //store: 'memStylesInLines',
                        listeners: {
                            beforerender: function(v){
                                
                            },
                            itemcontextmenu: 'onItemContextMenu',
                            select: 'onItemSelect'
                        }
                    }]
                },{
                    xtype: 'panel',
                    title: 'Detail',
                    iconCls: 'x-fa fa-th',
                    plain: true,
                    region: 'east',
                    collapsible: true,
                    collapsed: true,
                    hidden: true,
                    //collapseFirst: true,
                    //collapseMode: 'mini',
                    split: {
                        size: 5
                    },
                    layout: {
                        type: 'vbox',
                        align: 'start'
                    },
                    width: 300,
                    flex: 2,
                    bodyPadding: 10,
                    style: {
                        borderTop: '1px solid #cfcfcf',
                        borderBottom: '1px solid #cfcfcf'
                    }
                }]
            }]
        });

        me.dockedItems = [me.buildToolbar(), me.buildTopBar()];
        me.contextmenu = me.buildContextMenu();

        me.bbar = me.buildBottomBar();

        me.callParent(arguments);
    },

    /**
     * Create the top toolbar
     * @private
     * @returns {Ext.toolbar.Toolbar}
     **/
    buildToolbar: function(){
        var me = this,
            config = {},
            items = [];

        config.xtype = 'toolbar';
        config.dock = 'top';
        overflowHandler = 'menu';

        items.push(
            me.actClose,
            me.actRefresh,
            me.actRemove, 
            me.actPrint,
            //'-',
            '->',
            {
                xtype: "combo",
                name: 'templates',
                reference: 'cboTemplate',
                //width: 100,
                valueField: 'value',
                displayField: 'label',
                fieldLabel: 'Templates',
                labelWidth: 65,
                value: "L8-4-2",
                emptyText: 'Select...',
                forceSelection: true,
                //matchFieldWidth: false,
                editable: false,
                enableKeyEvents: true,
                minChar: 1,
                queryMode: 'local',
                bind: {
                    store: '{templates}'
                },                
                listeners: {
                    select: {
                        fn: 'onTemplateSelect',
                        scope: this.controller
                        /*
                        function(c, rec){
                            //c.fireEvent('triggersearch', c, c.getSelection());
                        },
                        */
                    },                    
                    render: function(c){
                        c.on('specialkey', function(f, e){
                            if (e.getKey() == e.ENTER) {
                                //c.fireEvent('triggersearch', c, c.getSelection());
                            }
                        }, c, {
                            buffer: 10
                        });
                    }
                    //triggersearch: 'onTriggerSearchClicked',
                    //triggerclear: 'onTriggerClearClicked'
                }
            },                                                
            {
                xtype: 'toggleslidefield',
                fieldLabel: 'Cost',
                labelAlign: 'right',
                labelPad: 10,
                labelWidth: 40,
                width: 110
            },
            //'-',            
            {
                xtype: 'combobox',
                fieldLabel: 'Styles',
                labelAlign: 'right',
                labelPad: 10,
                labelWidth: 45,
                width: 120,
                hidden: true,
                store: new Ext.data.ArrayStore({
                    fields: ["id"],
                    data: [[4], [8]]
                }),
                queryMode: "local",
                value: "8",
                matchFieldWidth: true,
                displayField: "id",
                valueField: "id",
                editable: false,
                forceSelection: true
            }
        );

        config.items = items;
        return config;
    },    

    buildTopBar: function() {
        return {                                         
            xtype: 'toolbar',
            dock: 'top',
            border: '1px solid #cfcfcf',
            
            items: [{
                xtype: "tbtext",
                name: 'count',
                border: false,
                //hidden: false,
                bind: {
                    text: 'Total Styles: {count:number("0,000")}',
                },                
                reorderable: false
            },            
            {
                xtype: "tbtext",
                name: 'onhand',
                border: false,
                //hidden: false,
                bind: {
                    text: 'Total On Hand: {onhand:number("0,000")}',
                },
                reorderable: false
            },
            '->',                                  
            {                                                                
                xtype: "tagfield",
                reference: 'tagCategory',
                width: '50%',
                maxWidth: 600,
                valueField: 'value',
                displayField: 'label',
                fieldLabel: 'Filter By',
                emptyText: 'Categories',
                //forceSelection: true,
                //matchFieldWidth: false,
                labelWidth: 63,
                labelPad: 1,
                filterPickList: true,
                //autoLoadOnValue: true,
                enableKeyEvents: true,
                minChar: 1,
                queryMode: 'local',
                grow: false,
                bind: {
                    store: '{stylecategories}'
                },
                plugins: [{
                    ptype: "cleartrigger"
                }],
                listeners: {
                    change: function(c, rec){
                        c.fireEvent('triggersearch', c, c.getValue());
                    },
                    render: function(c){
                        c.on('specialkey', function(f, e){
                            if (e.getKey() == e.ENTER) {
                                c.fireEvent('triggersearch', c, c.getValue());
                            }
                        }, c, {
                            buffer: 10
                        });
                    },
                    triggersearch: 'onTriggerSearchClicked',
                    triggerclear: 'onTriggerClearClicked'
                }
            },
            {
                xtype: "tbtext",
                border: false,
                //hidden: false,
                text: "Sort by:  ",
                reorderable: false
            },  
            {
                xtype: "toolbar",
                border: false,
                //hidden: false,
                padding: 0,
                margin: 0,                
                plugins: {
                    boxreorderer: {
                        listeners: {
                            drop: this.updateStoreSorters,
                            scope: this
                        }
                    }
                },        

                defaults: {
                    listeners: {
                        changeDirection: this.updateStoreSorters,
                        scope: this
                    }
                },

                items: [{
                    xtype: "multisortbutton",
                    text: "Seq",                    
                    dataIndex: "seq",                    
                    //ui: 'bootstrap-btn-default',
                    cls: "simple-btn"
                    //iconCls: 'x-fas fa-arrow-up'
                    //direction: 'ASC'                    
                },{
                    xtype: "multisortbutton",
                    text: "Style",                    
                    dataIndex: "style",                    
                    //ui: 'bootstrap-btn-default',
                    cls: "simple-btn"
                    //iconCls: 'x-fas fa-arrow-up'
                    //direction: 'ASC'                    
                },
                {
                    xtype: "multisortbutton",
                    //name: "category",
                    text: "Category",                    
                    dataIndex: "category",
                    //ui: 'bootstrap-btn-default',
                    cls: "simple-btn"                                  
                },
                {
                    xtype: "multisortbutton",
                    //name: "division",
                    text: "Brand",                    
                    dataIndex: "division",
                    //ui: 'bootstrap-btn-default',
                    cls: "simple-btn"                                   
                },
                {
                    xtype: "multisortbutton",
                    //name: "season",
                    text: "Season",                    
                    dataIndex: "season",
                    //ui: 'bootstrap-btn-default',
                    cls: "simple-btn"                    
                }]
            }]
        };        
    },

    buildBottomBar: function(){
        var b = Ext.widget("combo", {
            name: "perpage",
            //reference: 'pageSizer',
            width: 76,
            store: new Ext.data.ArrayStore({
                fields: ["id"],
                data: [["8"], ["48"], ["96"], ["240"]]
            }),
            value: "8",
            displayField: "id",
            valueField: "id",
            editable: false,
            disabled: false,
            forceSelection: true,
            matchFieldWidth: true,
            queryMode: "local"
            //triggerAction: "all",
        });

        b.on('afterrender', function(c, e){
            var vm = this.getViewModel();            
            var store = vm.getData().theLineSheet.stylesInLines();
            
            //var store = me.memStylesInLines;
            //console.log('afterrender', c.getValue())
            //c.setValue(store.getPageSize());
        }, this);

        b.on("select", function(e, a){
            var store = this.getViewModel().getData().theLineSheet.stylesInLines();
            //var store = me.memStylesInLines;
            store.setPageSize(e.getValue());
            store.load();
            //console.log("combo select", f)
        }, this);

        return {
            xtype: "pagingtoolbar",                                    
            bind: {
                store: "{theLineSheet.stylesInLines}"
            },
            //store: me.memStylesInLines,
            //dock: 'bottom',
            displayInfo: true,
            items: ["-", b, "Per Page"]
        };
    },

    
    
    buildContextMenu: function(){
        return Ext.create('Ext.menu.Menu', {
            items: [this.actRefresh, this.actRemove]
        });
    },

    onDestroy: function(){
        this.contextmenu.destroy();
        this.callParent(arguments);
    },

    /**
     * Set the active post*
     * @param {Ext.data.Model} rec The record
     */
    setActive: function(rec) {
        var me = this;

        me.active = rec;
        //me.update(rec.data);
        //var innerPnl = me.getComponent('innerPnl');
        //innerPnl.update(rec.data);
    },

    /*
    buildItems: function(){
        var innerPnl = Ext.create('Ext.panel.Panel', {
            itemId: 'innerPnl'
        });
        innerPnl.tpl = this.createTpl();

        return [innerPnl];
    },

    printTab: function() {

        var innerPnl = this.getComponent('innerPnl');

        this.print();
        //console.log(widget);
    },
    */

    getSorters: function(){

        var sorters = [],
            topbar = this.getDockedItems('toolbar[dock="top"]')[1];

        if(topbar && topbar.items.length > 0) {
            var buttons = topbar.query("multisortbutton");

            Ext.Array.each(buttons, function(button){
                sorters.push({
                    property: button.getDataIndex(),
                    direction: button.getDirection()
                });
            });
        }
        
        return sorters;
    },

    updateStoreSorters: function(){
        var sorters, view;

        if(true){
            sorters = this.getSorters();
            view = this.down('style-view');

            console.log('sorters', sorters);
            view.store.sort(sorters);
        }        
    }
});
