Ext.define('August.view.shopify.OrderModel', {
    extend: 'Ext.app.ViewModel',
    
    alias: 'viewmodel.shopify-order',
    
    data: {
        shopifyLink: null
    },

    stores: {
        shopifyorders: {
            model: 'shopify.Order',

            storeId: 'shopifyorders',
            autoLoad: false,

            session: true,
            //remoteFilter: true,
            //remoteSort: true,            

            //leadingBufferZone: 300,
            pageSize: 100,

            proxy: {
                type: 'rest',
                url: '/WebApp/api/ShopifyOrders/',                
                noCache: false,

                pageParam: '',
                startParam: '',
                //limitParam: '',

                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                
                reader: {
                    type: 'json',
                    rootProperty: 'Items'
                    //messageProperty: 'LinkHeader'
                    //totalProperty: 'total',
                    //successProperty: 'success'
                }
            },

            listeners: {
                beforeload: {
                    fn: 'onBeforeStoreLoad',
                    scope: this.controller
                }
            }
        },
        
        shopifyStores: {
            fields: ['label', 'value', 'name'],
            autoLoad: true,
            
            proxy: {
                type: 'ajax',
                url: 'resources/data/shopify/shopifyStores.json', 

                pageParam: '',
                startParam: '',
                limitParam: '',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }   
        }
    }

});
