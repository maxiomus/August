Ext.define('August.view.shopify.ProductModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.shopify-product',

    requires: [
        //'August.data.proxy.SimpleRest'
        //'Ext.data.BufferedStore'
    ],

    data: {
        shopifyLink: null,
        selection: null
    },

    stores: {
        shopifyproducts: {
            //model: 'shopify.Product',
            model: 'shopify.ProductGQ',
            
            storeId: 'shopifyproducts',            
            autoLoad: false,

            session: true,
            remoteFilter: true,
            remoteSort: true,            

            //type: 'buffered',
            //leadingBufferZone: 100,
            pageSize: 50,

            proxy: {
                type: 'rest',
                //url: '/WebApp/api/ShopifyProducts',                
                url: '/shopify-php/api/shopify_products.php',
                noCache: false,

                //timeout: 900000,                
                pageParam: '',
                startParam: '',
                //limitParam: '',
                
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                
                reader: {
                    type: 'json',
                    //rootProperty: 'Items'
                    rootProperty: 'edges',
                    //messageProperty: 'LinkHeader'
                    //totalProperty: 'total',
                    //successProperty: 'success'
                }                    
            },
            
            listeners: {
                beforeload: {
                    fn: 'onBeforeStoreLoad',
                    scope: this.controller
                },
                load: {
                    fn: 'onStoreLoad',
                    scope: this.controller
                }
            }
        },
        /*
        shopifyproducts: {
            //model: 'shopify.Product',
            model: 'shopify.ProductVariantGQ',
            
            storeId: 'shopifyproductvariants',            
            autoLoad: false,

            session: true,
            remoteFilter: true,
            remoteSort: true,            

            //type: 'buffered',
            //leadingBufferZone: 100,
            pageSize: 50,

            proxy: {
                type: 'rest',
                //url: '/WebApp/api/ShopifyProducts',                
                url: '/shopify-php/api/shopify_product_variants.php',
                noCache: false,

                //timeout: 900000,                
                pageParam: '',
                startParam: '',
                //limitParam: '',
                
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                
                reader: {
                    type: 'json',
                    //rootProperty: 'Items'
                    rootProperty: 'edges',
                    //messageProperty: 'LinkHeader'
                    //totalProperty: 'total',
                    //successProperty: 'success'
                }                    
            },
            
            listeners: {
                beforeload: {
                    fn: 'onBeforeVariantStoreLoad',
                    scope: this.controller
                }
            }
        },
        */
        shopifyProductsPaging: {
            model: 'shopify.Product',
            proxy: {
                type: 'memory',
                enablePaging: true,
                reader: {
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            pageSize: 500
        },

        shopifyStores: {
            fields: ['label', 'value', 'name', 'imageSrc'],
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
            },
            
            listeners: {
                load: function(store){
                    store.each(function(rec, idx){
                        if(rec.get('value') > 99){
                            rec.drop();
                        }
                    });
                }
            }
        },

        imageStore: {
            model: 'August.model.shopify.ProductImage'
        },

        storeImageSources: {
            fields: ['name', 'value'],
            autoLoad: true,
            
            proxy: {
                type: 'ajax',
                url: 'resources/data/shopify/storeImageSources.json', 

                pageParam: '',
                startParam: '',
                limitParam: '',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            
            listeners: {
                load: function(store){
                    store.each(function(rec, idx){
                        if(rec.get('value') > 99){
                            rec.drop();
                        }
                    });
                }
            }
        }
    }
});
