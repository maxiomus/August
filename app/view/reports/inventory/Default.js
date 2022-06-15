
Ext.define('August.view.reports.inventory.Default',{
    extend: 'Ext.container.Container',

    requires: [
        'August.view.reports.inventory.DefaultController',
        'August.view.reports.inventory.DefaultModel',
        //'August.view.reports.Grid',
        //'August.view.reports.TopBar',
        'August.view.reports.inventory.AgingInterval'
    ],

    alias: 'widget.inventory-default',

    controller: 'inventory-default',
    viewModel: {
        type: 'inventory-default'
    }
});
