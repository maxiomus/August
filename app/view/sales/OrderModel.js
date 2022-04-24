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

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                    //totalProperty: 'total',
                    //successProperty: 'success'
                }
            },

            listeners: {
                beforeload: function(s){                    
                    s.getProxy().setHeaders({
                        'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                    })
                }
            }
        },

        categories: {
            fields: ['label', 'field'],
            autoLoad: true   
        }
    }
});
