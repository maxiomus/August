
Ext.define('August.view.customer.Main',{
    extend: 'Ext.panel.Panel',

    requires: [
        'August.view.customer.MainController',
        'August.view.customer.MainModel'
    ],

    controller: 'customer-main',
    viewModel: {
        type: 'customer-main'
    }
});
