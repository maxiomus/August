
Ext.define('August.view.reports.invoice.SellThrough',{
    extend: 'Ext.panel.Panel',

    requires: [
        'August.view.reports.invoice.SellThroughController',
        'August.view.reports.invoice.SellThroughModel'
    ],

    controller: 'reports-invoice-sellthrough',
    viewModel: {
        type: 'reports-invoice-sellthrough'
    },

    html: 'Hello, World!!'
});
