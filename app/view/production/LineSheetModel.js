Ext.define('August.view.production.LineSheetModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.linesheet',

    requires: [
        'August.model.style.LineSheet'        
    ],

    stores: {
        memStylesInLines: {
            storeId: 'memStylesInLines',
            pageSize: 8,
            remoteFilter: true,
            proxy: {
                 type: 'memory',
                 enablePaging: true,
                 reader: {
                     type: 'json',
                     rootProperty: 'data'
                 }
            }
        }
    }
});