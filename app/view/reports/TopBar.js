
Ext.define('August.view.reports.TopBar',{
    extend: 'Ext.toolbar.Toolbar',

    requires: [
        'August.view.reports.TopBarController',
        'August.view.reports.TopBarModel'
    ],

    alias: 'widget.reports-topbar',

    controller: 'reports-topbar',
    viewModel: {
        type: 'reports-topbar'
    },

    //border: 1,

    initComponent: function(c){
        var me = this;

        me.actions = {                        
            refresh: Ext.create('Ext.Action', {
                text: "Refresh",
                tooltip: "Refresh",
                //ui: "default",
                iconCls: "x-fa fa-refresh",
                //glyph: 'xf01e@FontAwesome',
                handler: function(btn, e){
                    me.fireEvent('actrefresh', btn, me);
                },
                scope: me
            }),

            export: Ext.create('Ext.Action', {
                text: "Export",
                tooltip: "Export to...",
                //ui: "default",
                iconCls: "x-fa fa-export",
                //glyph: 'xf01e@FontAwesome',                
                handler: function(btn, e){
                    me.fireEvent('actexport', btn, me);
                },
                scope: me
            })
        },

        me.items = me.buildItems();

        me.callParent(arguments);
    },

    buildItems: function(){
        var me = this;

        return [
            me.actions.refresh, '->', me.actions.export
        ];
    }
});
