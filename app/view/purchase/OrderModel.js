Ext.define('August.view.purchase.OrderModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'August.model.purchase.Order'
    ],

    alias: 'viewmodel.purchase-order',

    stores: {
        purchaseorders: {
            model: 'purchase.Order',

            storeId: 'purchaseorders',
            autoLoad: false,

            session: true,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 50,

            proxy: {
                type: 'rest',
                url: '/WebApp/api/PurchaseOrders/',      
                          
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
        },
    }
});
