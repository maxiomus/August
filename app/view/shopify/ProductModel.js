Ext.define('August.view.shopify.ProductModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.shopify-product',

    data: {
        shopifyLink: null
    },

    stores: {
        shopifyproducts: {
            model: 'shopify.Product',

            storeId: 'shopifyproducts',
            autoLoad: false,

            //session: true,
            //remoteFilter: true,
            //remoteSort: true,            

            leadingBufferZone: 300,
            pageSize: 50,

            proxy: {
                type: 'rest',
                url: '/WebApp/api/ShopifyProducts/',                
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
