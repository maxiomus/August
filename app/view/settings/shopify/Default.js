
Ext.define('August.view.settings.shopify.Default',{
    extend: 'Ext.container.Container',

    requires: [
        'August.view.settings.shopify.DefaultController',
        'August.view.settings.shopify.DefaultModel',
        //'August.view.settings.Grid',
        //'August.view.settings.TopBar'
    ],

    alias: 'widget.shopify-default',

    controller: 'shopify-default',
    viewModel: {
        type: 'shopify-default'
    }
});
