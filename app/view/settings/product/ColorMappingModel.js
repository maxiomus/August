Ext.define('August.view.settings.product.ColorMappingModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.product-colormapping',
    
    stores: {
        colormappings: {
            model: 'ColorMapping',
            autoLoad: true,
            session: true,
            //autoSync: false,
            remoteFilter: true,
            remoteSort: true
            //pageSize: 0
        },

        colorCustomers: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        belkColors: {
            fields: ['label', 'value'],
            autoLoad: true   
        }
    }

});
