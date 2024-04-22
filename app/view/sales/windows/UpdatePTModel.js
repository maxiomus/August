Ext.define('August.view.sales.windows.UpdatePTModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.sales-windows-updatept',

    stores: {
        
        orders: {
            model: 'pick.SalesPick',

            //storeId: 'products',
            autoLoad: false,

            session: true,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 100,

            proxy: {
                type: 'rest',
                url: '/shopify-php/api/getOpenPickd_BySize',         
                
                api: {
                    create: undefined,
                    read: '/shopify-php/api/getOpenPickd_BySize',
                    update: '/shopify-php/api/updateOpenPickd_BySize',
                    destroy: undefined
                },
                
                batchActions: true,      

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
        }
                
    }

});
