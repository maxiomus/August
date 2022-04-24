Ext.define('August.view.customer.payment.windows.InvoicesModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.windows-payment-invoices',
    

    stores: {
        
        invoices: {
            model: 'customer.payment.Detail',
            storeId: 'invoices',

            autoLoad: false,

            session: true,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 100,

            proxy: {
                type: 'rest',
                url: '/WebApp/api/Invoices/Payments',                

                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                    //totalProperty: 'total',
                    //successProperty: 'success'
                },

                writer: {
                    type: 'json',
                    
                    //clientIdProperty: 'clientId',
                    //writeAllFields: true,
                    allowSingle: false // set false to send a single record in array
                }
            },            

            listeners: {
                beforeload: {
                    fn: 'onBeforeLoadPaymentDetails',
                    scope: this.controller
                },
                datachange: {
                    fn: 'onStoreDataChanged',
                    scope: this.controller
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
        }
    }
});
