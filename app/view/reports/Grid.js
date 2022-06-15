
Ext.define('August.view.reports.Grid',{
    extend: 'Ext.grid.Panel',

    requires: [
        'August.view.reports.GridController',
        'August.view.reports.GridModel'
    ],

    alias: 'widget.reports-grid',

    controller: 'reports-grid',
    /*
    viewModel: {
        type: 'reports-grid'
    },
    */
    iconCls: 'x-fa fa-folder-open-o',
    style: {
        borderTop: '1px solid #cfcfcf'
        //borderBottom: '1px solid #cfcfcf'
    },

    tbar: {
        xtype: "reports-topbar",
        reference: "topbar"
    },

    listeners: {
        //render: 'onRender',
        select: {
            fn: 'onRowSelect'
        },
        itemcontextmenu: "onItemContextMenu",        
        actrefresh: 'onToolbarRefreshClick',
        actsave: 'onToolbarExportClick'
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
                ptype:"gridfilters"
            }]
        });

        me.callParent(arguments);

        var topbar = me.lookupReference('topbar');

        topbar.insert(0, {
            xtype: "searchgrid",
            reference: 'searchgrid',
            width: 300,
            grid: me,
            paramName: "code"
        });

        me.contextmenu = Ext.create("Ext.menu.Menu", {
            items: [                
                topbar.actions.refresh,
                topbar.actions.export
            ]
        });

        me.relayEvents(topbar, ['actrefresh', 'actexport']);
    },

    buildColumns: function(){
        return [];
    }
});
