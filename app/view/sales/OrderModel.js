Ext.define('August.view.sales.OrderModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'August.model.sales.Order'
    ],

    alias: 'viewmodel.sales-order',

    stores: {
        salesorders: {
            model: 'sales.Order',

            storeId: 'salesorders',
            autoLoad: false,

            session: true,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 50,

            proxy: {
                type: 'rest',
                url: '/WebApp/api/SalesOrders/',                

                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                    //totalProperty: 'total',
                    //successProperty: 'success'
                }
            }
        },

        categories: {
            fields: ['label', 'field'],
            autoLoad: true   
        }
    }
});
