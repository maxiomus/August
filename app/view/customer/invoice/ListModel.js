Ext.define('August.view.customer.invoice.ListModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.customer-invoice',

    stores: {
        customerinvoices: {
            model: 'invoice.Header',

            storeId: 'customerinvoices',

            autoLoad: false,

            session: true,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 50,

            proxy: {
                type: 'rest',
                url: '/WebApp/api/Invoices',                

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
        },

        categories: {
            fields: ['label', 'field'],
            autoLoad: true   
        }
        
        
    }    

});
