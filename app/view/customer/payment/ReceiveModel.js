Ext.define('August.view.customer.payment.ReceiveModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.payment-receive',

    requires: [
        'August.model.payment.Header'        
    ],

    stores: {

        paymentreceives: {
            model: 'payment.Header',

            storeId: 'paymentreceives',
            autoLoad: false,

            session: true,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 50,

            proxy: {
                type: 'rest',
                url: '/WebApp/api/Payments',           
                   
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
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: 'resources/data/production/style/categories.json',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }        
    }
});