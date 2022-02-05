
Ext.define('August.view.production.Log',{
    extend: 'Ext.grid.Panel',

    requires: [
        'August.view.production.LogController',
        'August.view.production.LogModel'
    ],

    alias: 'widget.prod-log',

    controller: 'prod-log',
    viewModel: {
        type: 'prod-log'
    }
});
