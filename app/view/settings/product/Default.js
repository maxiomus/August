
Ext.define('August.view.settings.product.Default',{
    extend: 'Ext.container.Container',

    requires: [
        'August.view.settings.product.DefaultController',
        'August.view.settings.product.DefaultModel',
        //'August.view.settings.Grid',
        //'August.view.settings.TopBar',
        'August.view.settings.product.Category',
        'August.view.settings.product.Color',
        'August.view.settings.product.ColorMapping',
        'August.view.settings.product.RawMatType',
        'August.view.settings.product.FabricContent',
        'August.view.settings.product.FabricType',
        'August.view.settings.product.Group',
        'August.view.settings.product.Size',
        'August.view.settings.product.UOM',
        'August.view.settings.product.SubCategory'
    ],

    alias: 'widget.product-default',

    controller: 'product-default',
    viewModel: {
        type: 'product-default'
    }
});
