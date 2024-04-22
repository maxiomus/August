Ext.define('August.view.settings.shopify.ProductImageModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.shopify-productimage',
    
    stores: {
        shopifyproductimages: {
            model: 'shopify.ProductImage',

            storeId: 'shopifyproductimages',            
            autoLoad: false,

            session: true,
            //remoteFilter: true,
            //remoteSort: true,            

            //type: 'buffered',
            //leadingBufferZone: 300,
            //pageSize: 100,

            proxy: {
                type: 'rest',
                url: '/WebApp/api/ShopifyProductImages',                
                noCache: false,

                timeout: 900000,
                
                pageParam: '',
                startParam: '',
                limitParam: '',
                
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                
                reader: {
                    type: 'json',
                    //rootProperty: 'Items'
                    rootProperty: 'data',
                    //messageProperty: 'LinkHeader'
                    totalProperty: 'total',
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
        }
    }

});
