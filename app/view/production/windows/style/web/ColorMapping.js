/**
 * Created by tech on 8/30/2022.
 */
 Ext.define('August.view.production.windows.style.web.ColorMapping',{
    extend: 'Ext.window.Window',

    requires: [
        'August.view.production.windows.style.web.ColorMappingController',
        'August.view.production.windows.style.web.ColorMappingModel',        
        'August.plugin.grid.Exporter'
    ],

    alias: 'widget.windows-style-colormapping',

    controller: "windows-style-colormapping",
    viewModel: {
        type: "windows-style-colormapping"        
    },

    layout: {
        type: 'fit'
    },

    header: {
        title: 'Style Color Mapping',
        iconCls: 'x-fa fa-code',
        titlePosition: 0,
        titleAlign: 'left'
    },

    padding: '10 0 10 0',

    session: true,
    //minWidth: 720,
    minHeight: 480,
    maximized: false,

    //modal: true,
    monitorResize: true,
    maximizable: true,
    //constrain: true,
    closable: true,    

    tools: [{
        type: 'pin'
    }],            

    // Actions are interpreted as Buttons by this view.
    // Other descendants such as Menus and Toolbars have
    // their own defaults.
    defaultActionType: 'button',

    // Define the shared Action.  Each Component created from these will
    // have the same display text, icon and tooltip, and will invoke the
    // same controller method on click.    

    listeners: {        
        actadd: 'onAddClick',
        actedit: 'onEditClick',
        actremove: 'onRemoveClick',
        actcopy: 'onCopyClick',
        actrefresh: 'onRefreshClick',
        actsave: 'onSaveClick'
    },

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

        me.actions = {
            add: {
                text: "Add",
                tooltip: "Add a New Item",
                //ui: "default",
                //reference: 'new',
                iconCls: "x-fa fa-plus",
                //glyph: 'xf044@FontAwesome',
                /**
                 *
                 * @param btn Button
                 * @param e Event
                 */
                handler: function(btn, e){
                    me.fireEvent('actadd', btn, me);
                },
                scope: me
            },
    
            edit: {
                text: 'Edit',
                tooltip: 'Edit Selected Item',
                //ui: 'default',
                iconCls: 'x-fa fa-edit',
                bind: {
                    disabled: '{!grid.selection}'
                },
                handler: function(btn, e){
                    me.fireEvent('actedit', btn, me);
                },
                scope: me
            },
    
            remove: {
                text: "Remove",
                tooltip: "Remove Selected Item",
                //ui: "default",
                iconCls: "x-fa fa-minus",
                //glyph: 'xf12d@FontAwesome',
                bind: {
                    disabled: '{!grid.selection}'
                },
                handler: function(btn, e){
                    me.fireEvent('actremove', btn, me);
                },
                scope: me
            },
    
            save: {
                text: "Save",
                tooltip: "Save",
                //ui: "default",
                iconCls: "x-fa fa-save",
                //glyph: 'xf12d@FontAwesome',
                handler: function(btn, e){
                    me.fireEvent('actsave', btn, me);
                },
                scope: me
            },
    
            copy: {
                text: "Copy",
                tooltip: "Copy selected Item",
                //ui: "default",
                iconCls: "x-fa fa-copy",
                //glyph: 'xf01e@FontAwesome',
                bind: {
                    disabled: '{!grid.selection}'
                },
                handler: function(btn, e){
                    me.fireEvent('actcopy', btn, me);
                },
                scope: me
            },
    
            refresh: {
                text: "Refresh",
                tooltip: "Refresh",
                //ui: "default",
                iconCls: "x-fa fa-sync",
                //glyph: 'xf01e@FontAwesome',
                handler: function(btn, e){
                    me.fireEvent('actrefresh', btn, me);
                },
                scope: me
            }
        },

        me.dockedItems = [{
            xtype: 'toolbar',
            reference: 'topbar',
            dock: 'top',
            items: [
            /*
            {
                xtype: "combo",               
                name: 'category', 
                fieldLabel: 'Search By',
                //labelWidth: 50,
                width: 100,
                hideLabel: true,
                valueField: "value",
                displayField: "label",
                value: "color",
                editable: false,
                //reference: "filterSelection",
                bind: {
                    store: "{mappingColumns}"
                },
                queryMode: 'local',
                listeners: {                    
                    select: {
                        fn: "onCategorySelect",
                        scope: 'controller'
                    }                    
                }
            },
            */
            {
                xtype: "searchgrid",
                reference: 'searchgrid',
                width: 300,
                grid: 'colorGrid',
                paramName: 'color'          
            },  
            {
                xtype: 'button',
                text: 'Reset',
                action: 'reset',
                iconCls: 'x-fa fa-redo',
                handler: 'onResetClick'
            },
            '@add',
            '@edit',
            '@remove',
            '@copy',
            '@refresh',   
            '@save',                     
            '->',
            {
                xtype: 'button',
                text: "Upload",
                tooltip: "Upload",
                //ui: "default",
                iconCls: "x-fa fa-file-upload",
                //glyph: 'xf01e@FontAwesome',
                handler: 'onUploadClick'
            },
            {
                xtype: 'button',
                text: 'Export',
                action: 'export',
                iconCls: 'x-fas fa-file-export',
                menu:[{
                    text: 'CSV',
                    handler: 'onExportClick'
                },{
                    text: 'EXCEL',
                    handler: 'onExportClick'
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
                xtype: "grid",
                reference: "colorGrid",
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
                    store: '{colormappings}'
                },

                columns: me.buildColumns(),  
            
                cls: "color-mapping-grid",

                stateful: true,

                stateId: "color-mapping-grid",
                //stateEvents: ["columnmove","columnresize","columnshow","columnhide"],                
                // We do not need automatic height synching.                

                selModel: {
                    selType: 'rowmodel',
                    pruneRemoved: false
                },
    
                viewConfig: {
                    stripeRows: true,
                    trackOver: true,                    

                    plugins: {
                        ddGroup: 'category-group',
                        ptype: 'gridviewdragdrop',
                        enableDrop: true,
                        dragText: 'Drag and drop to reorganize'
                    }
                },                

                plugins: [{
                    ptype: 'rowediting',
                    clicksToMoveEditor: 1
                },{
                    ptype: "grid-exporter"
                },{
                    ptype: "gridfilters"
                }],

                bbar: me.buildBottomBar(),

                listeners: {                    
                    render: {
                        //fn: 'onGridRender',
                        //scope: this.controller
                    },
                    itemcontextmenu: {
                        fn: 'onItemContextMenu',
                        scope: this.controller
                    },
                    select: {
                        fn: 'onRowSelect',
                        scope: this.controller
                    },                    
                    cellclick: {
                        fn: 'onGridCellClick',
                        scope: this.controller
                    }
                }
            }]            
        });

        me.callParent(arguments);       

        var grid = me.lookupReference('colorGrid'),
            topbar = me.lookupReference('topbar');

        grid.contextmenu = Ext.create('Ext.menu.Menu', {            
            items: [
                me.actions.edit,
                me.actions.copy,
                me.actions.refresh,
                me.actions.remove                           
            ]
        });

        //me.relayEvents(topbar, ['actadd', 'actedit', 'actremove', 'actcopy', 'actrefresh', 'actsave', 'actexport']);

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
            var store = this.getViewModel().getStore("colormappings");
            c.setValue(store.getPageSize());
        }, this);

        b.on("select", function(e, a){
            var store = this.getViewModel().getStore("colormappings");
            store.setPageSize(e.getValue());
            store.load();
            //console.log("combo select", f)
        }, this);

        return {
            xtype: "pagingtoolbar",
            //itemId: "pagingtb",
            bind: {
                store: '{colormappings}'
            },
            //dock: "bottom",
            //displayInfo: true,
            items: ["-", b, "Per Page"]
        };
    },    

    buildColumns: function(){
        return [{
            text: "N41 Color",
            dataIndex: "color",
            width: 160,
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: "combo",
                name: 'color',
                reference: 'color',
                //fieldLabel: 'Color',
                //fieldStyle: 'text-transform:uppercase',
                fieldCls: 'required',                                
                //hideTrigger: false,
                //publishes: 'value',
                valueField: 'value',
                displayField: 'label',                
                store: 'memColors',
                remoteStore: 'Colors',
                matchFieldWidth: false,
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
            }
        },
        {
            text: "Market Place",
            dataIndex: "customer",
            width: 160,            
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'combo',                                
                displayField: 'label',
                valueField: 'value',  
                fieldCls: 'required', 
                reference: 'customer',
                publishes: 'value',                  
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
                    store: '{colorCustomers}'                    
                },                        
                plugins: [{
                    ptype: "cleartrigger"
                }]
            }
        },
        {
            text: "Market Color",
            dataIndex: "customerColor",
            width: 160,
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'combo',                                
                displayField: 'color',
                valueField: 'color',  
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
                    store: '{customercolors}',
                    filters: {
                        property: 'customer',
                        value: '{customer.value}'
                    }
                },                        
                plugins: [{
                    ptype: "cleartrigger"
                }]
            }
        }];
    }
});

