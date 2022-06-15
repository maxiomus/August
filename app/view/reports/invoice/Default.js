
Ext.define('August.view.reports.invoice.Default',{
    extend: 'Ext.container.Container',

    requires: [
        'August.view.reports.invoice.DefaultController',
        'August.view.reports.invoice.DefaultModel',
        //'August.view.reports.Grid',
        //'August.view.reports.TopBar',
        'August.view.reports.invoice.SummaryBySoType'
    ],

    alias: 'widget.invoice-default',

    controller: 'invoice-default',
    viewModel: {
        type: 'invoice-default'
    }
});
