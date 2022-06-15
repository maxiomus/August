
Ext.define('August.view.settings.view.production.Default',{
    extend: 'Ext.container.Container',

    requires: [
        'August.view.settings.view.production.DefaultController',
        'August.view.settings.view.production.DefaultModel'
    ],

    alias: 'widget.view-production-default',

    controller: 'view-production-default',
    viewModel: {
        type: 'view-production-default'
    }
});
