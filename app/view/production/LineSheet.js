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
        'Ext.ux.BoxReorderer'
    ],

    alias: 'widget.linesheet',

    controller: "linesheet",
    viewModel: {
        type: "linesheet"
    },

    cls: 'linesheet-preview',

    scrollable: true,
    //border: true,

    style: {
        //borderTop: '1px solid #cfcfcf'
    },

    config: {
        inTab: false,
        active: null
    },

    layout: 'fit',

    listeners: {
        render: {
            //fn: 'onRender'
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
                        height: 36,
                        style: {
                            borderTop: '1px solid #cfcfcf'
                        },

                        bind: {
                            html: '<div style="font-size: 1.6em; font-weight:400; padding-top: 10px; text-align: center;">{title}</div>'
                        }
                    },{
                        xtype: "style-view",
                        //reference: "tiles",
                        //cls: '',
                        //region: 'center',
                        //collapsible: false,
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

        me.dockedItems = [me.createToolbar(), me.buildBottomBar()];
        me.contextmenu = me.buildContextMenu();

        me.callParent(arguments);
    },

    /**
     * Create the top toolbar
     * @private
     * @returns {Ext.toolbar.Toolbar}
     */
    createToolbar: function(){
        var me = this,
            config = {},
            items = [];

        config.xtype = 'toolbar';
        config.dock = 'top';

        items.push(
            me.actClose,
            me.actRefresh,
            me.actRemove, '-',
            {
                xtype: "combo",
                reference: 'cboSubCat',
                //width: 100,
                valueField: 'field',
                displayField: 'label',
                fieldLabel: 'Templates',
                labelWidth: 65,
                //value: 1,
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
                    select: function(c, rec){
                        c.fireEvent('triggersearch', c, c.getSelection());
                    },
                    render: function(c){
                        c.on('specialkey', function(f, e){
                            if (e.getKey() == e.ENTER) {
                                c.fireEvent('triggersearch', c, c.getSelection());
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
                hidden: true,
                text: "Sort by:  ",
                reorderable: false
            },{
                xtype: "toolbar",
                border: false,
                hidden: true,
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
                    text: "Style",
                    //ui: "default",
                    ui: 'bootstrap-btn-default',
                    hidden: false,
                    direction: 'ASC',
                    dataIndex: "style"
                },
                {
                    xtype: "multisortbutton",
                    text: "Division",
                    //ui: "default",
                    ui: 'bootstrap-btn-default',
                    name: "division",
                    hidden: false,
                    dataIndex: "division"
                },
                {
                    xtype: "multisortbutton",
                    text: "Category",
                    //ui: "default",
                    ui: 'bootstrap-btn-default',
                    name: "category",
                    hidden: false,
                    dataIndex: "category"
                },
                {
                    xtype: "multisortbutton",
                    text: "Season",
                    //ui: "default",
                    ui: 'bootstrap-btn-default',
                    name: "season",
                    hidden: false,
                    dataIndex: "season"
                }]
            },
            '->',
            me.actPrint,
            '-',
            {
                xtype: 'toggleslidefield',
                fieldLabel: 'Cost',
                labelAlign: 'right',
                labelPad: 10,
                labelWidth: 40,
                width: 110
            },{
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

    buildBottomBar: function(){
        var b = Ext.widget("combo", {
            name: "perpage",
            //reference: 'pageSizer',
            width: 76,
            store: new Ext.data.ArrayStore({
                fields: ["id"],
                data: [["2"], ["3"], ["4"], ["8"]]
            }),
            value: "8",
            displayField: "id",
            valueField: "id",
            editable: false,
            disabled: true,
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
            c.setValue(store.getPageSize());
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

        var h=[],
            g=this.getDockedItems('toolbar[dock="top"]')[0];
        if(g && g.items.length>0){
            var e=g.query("toolbar multisortbutton[hidden=false]");
            Ext.Array.each(e, function(a){
                h.push({
                    property: a.getDataIndex(),
                    direction: a.getDirection()
                });
            });
        }
        return h;
    },

    updateStoreSorters: function(){
        var c = this.getSorters();

        if(c.length > 0){
            //console.log(c)
            this.down('style-view').getStore().sort(c);
        }
    }
});
