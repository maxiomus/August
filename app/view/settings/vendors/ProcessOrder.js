
Ext.define('August.view.settings.vendors.ProcessOrder',{
    extend: 'Ext.panel.Panel',

    requires: [
        'August.view.settings.vendors.ProcessOrderController',
        'August.view.settings.vendors.ProcessOrderModel'
    ],

    alias: 'widget.vendors-processorder',

    controller: 'vendors-processorder',
    viewModel: {
        type: 'vendors-processorder'
    }
});
