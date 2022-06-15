Ext.define('August.view.inventory.transfer.windows.StyleListModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.transfer-windows-stylelist',
    
    data: {
        title: 'Shopify'
    },

    stores: {

        /*
        templatestyles: {
            source: '{products}'
        },        
        */
        templatestyles: {
            model: 'inventory.Style',

            storeId: 'styles',
            autoLoad: false,

            session: true,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 100,

            proxy: {
                type: 'rest',
                url: '/WebApp/api/Products/Transfer',           
                timeout: 120000,
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                    //totalProperty: 'total',
                    //successProperty: 'success'
                }
            },

            listeners: {
                
            }
        },

        warehouses: {
            fields: ['label', 'value'],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: '/WebApp/api/List/warehouses',
                
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },        

        categories: {
            fields: ['label', 'field'],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: 'resources/data/production/style/categories.json',
                reader: {
                    type: 'json'
                }
            }                            
        }
    }

});
