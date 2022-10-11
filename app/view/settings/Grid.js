
Ext.define('August.view.settings.Grid',{
    extend: 'Ext.grid.Panel',

    requires: [
        'August.view.settings.GridController',
        'August.view.settings.GridModel',
        'August.plugin.grid.Exporter'
    ],

    alias: 'widget.settings-grid',

    controller: 'settings-grid',
    /*
    viewModel: {
        type: 'settings-grid'
    },
    */
    iconCls: 'x-fa fa-folder-open-o',
    style: {
        borderTop: '1px solid #cfcfcf'
        //borderBottom: '1px solid #cfcfcf'
    },

    tbar: {
        xtype: "settings-topbar",
        reference: "topbar"
    },

    listeners: {
        //render: 'onRender',
        select: {
            fn: 'onRowSelect'
        },
        itemcontextmenu: "onItemContextMenu",
        cellclick: 'onGridCellClick',
        actadd: 'onToolbarAddClick',
        actedit: 'onToolbarEditClick',
        actremove: 'onToolbarRemoveClick',
        actcopy: 'onToolbarCopyClick',
        actrefresh: 'onToolbarRefreshClick',
        actsave: 'onToolbarSaveClick',
        actexport: 'onToolbarExportClick'
    },

    initComponent: function(c){
        var me = this;

        //me.columns = me.buildColumns();

        Ext.applyIf(me, {

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

            plugins:[{
                ptype: 'rowediting',
                clicksToMoveEditor: 1
            },{
                ptype:"gridfilters"
            },{
                ptype: 'grid-exporter'
            }]
        });

        me.callParent(arguments);        

        var topbar = me.lookupReference('topbar');
        
        me.contextmenu = Ext.create("Ext.menu.Menu", {
            items: [
                topbar.actions.edit,
                topbar.actions.copy,
                topbar.actions.remove,
                topbar.actions.refresh
            ]
        });

        me.relayEvents(topbar, ['actadd', 'actedit', 'actremove', 'actcopy', 'actrefresh', 'actsave', 'actexport']);
    },

    buildColumns: function(){
        return [];
    }
});
