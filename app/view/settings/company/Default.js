
Ext.define('August.view.settings.company.Default',{
    extend: 'Ext.container.Container',

    requires: [
        'August.view.settings.company.DefaultController',
        'August.view.settings.company.DefaultModel',
        'August.view.settings.company.users.List'
    ],

    alias: 'widget.company-default',

    controller: 'company-default',
    viewModel: {
        type: 'company-default'
    }
});
