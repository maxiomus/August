Ext.define('August.view.production.LineSheetModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.production-linesheet',

    requires: [
        'August.model.style.LineSheet'        
    ],

    data: {
        count: 0,
        onhand: 0
    },
    
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