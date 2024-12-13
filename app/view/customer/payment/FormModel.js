Ext.define('August.view.customer.payment.receiveFormModel', {
    extend: 'Ext.app.ViewModel',
    
    alias: 'viewmodel.payment-receiveForm',

    data: {
        selection: null
    },

    formulas: {
        setAmt: function(get) {
            return get('thePayment.amt') === 0.0;
        },
        
        setCustomer: function(get) {
            return Ext.isEmpty(get('thePayment.customer'));
        }
    },

    stores: {   
        
        Paymentdetails: {
            model: 'payment.PaymentD',
            storeId: 'Paymentdetails',
            autoLoad: false,

            //session: true,
            //remoteFilter: true,
            //remoteSort: true,
            pageSize: 0,

            proxy: {
                type: 'rest',
                url: '/WebApp/api/PaymentDs',                

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
             
        credits: {
            model: 'payment.Credit',
            storeId: 'credits',

            autoLoad: false,

            pageSize: 0,

            proxy: {
                type: 'rest',
                url: '/WebApp/api/Invoices/Credits',                

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

        divisions: {
            fields: ['label', 'value'],
            // allow the grid to interact with the paging scroller by buffering
            //buffered: true,
            pageSize: 0,
            //numFromEdge: 5,
            //trailingBufferZone: 100,
            //leadingBufferZone: 100,
            autoLoad: true,
            remoteFilter: true,
    
            proxy: {
                type: 'ajax',
                url: '/WebApp/api/List/divisions',
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                    /*
                    totalProperty: 'total',
                    successProperty: 'success'
                    */
                }
            }
        },             

        paymentcodes: {
            fields: ['label', 'value'],
            // allow the grid to interact with the paging scroller by buffering
            //buffered: true,
            pageSize: 0,
            //numFromEdge: 5,
            //trailingBufferZone: 100,
            //leadingBufferZone: 100,
            autoLoad: true,
            remoteFilter: true,

            proxy: {
                type: 'ajax',
                url: '/WebApp/api/List/paymentcodes',
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                    /*
                    totalProperty: 'total',
                    successProperty: 'success'
                    */
                }
            }
        }
    }
});
