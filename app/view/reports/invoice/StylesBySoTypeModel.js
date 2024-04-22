Ext.define('August.view.reports.invoice.StylesBySoTypeModel', {
    extend: 'Ext.app.ViewModel',
    
    alias: 'viewmodel.invoice-stylesbysotype',

    stores: {
        stylesbysotypes: {
            
            model: 'reports.invoice.StylesBySoType',            
            // allow the grid to interact with the paging scroller by buffering
            //buffered: true,            
            pageSize: 0,            
            autoLoad: false,
            //remoteFilter: true,

            proxy: {
                type: 'rest',
                url: '/WebApp/api/Reports/invoice/bystyles/sotype',
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
            },
            listeners: {                                
                beforeload: {
                    fn: 'onStoreBeforeLoad',
                    scope: this.controller
                },
                load: {
                    fn: 'onStoreLoad',
                    scope: this.controller
                }                 
            }
        },

        sotypes: {
            fields: ["label", "value"],
            //storeId: 'division',
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/WebApp/api/List/ordertypes",
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },

                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },
    }

});
