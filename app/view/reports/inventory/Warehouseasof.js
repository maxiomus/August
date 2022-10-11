
Ext.define('August.view.reports.inventory.Warehouseasof',{
    extend: 'Ext.panel.Panel',

    requires: [
        'August.view.reports.inventory.WarehouseasofController',
        'August.view.reports.inventory.WarehouseasofModel'
    ],

    controller: 'inventory-warehouseasof',
    viewModel: {
        type: 'inventory-warehouseasof'
    },

    html: 'Hello, World!!'
});
