
Ext.define('August.view.settings.vendors.Default',{
    extend: 'Ext.container.Container',

    requires: [
        'August.view.settings.vendors.DefaultController',
        'August.view.settings.vendors.DefaultModel',
        'August.view.settings.vendors.ProcessLoc',
        'August.view.settings.vendors.ProcessOrder',
        'August.view.settings.vendors.ProcessType',
        'August.view.settings.vendors.VendorType'
    ],

    alias: 'widget.vendors-default',

    controller: 'vendors-default',
    viewModel: {
        type: 'vendors-default'
    }
});
