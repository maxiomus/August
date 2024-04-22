Ext.define('August.view.shopify.windows.VariantUpdateModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.shopify-windows-variantupdate',

    data: {
        selected: null
    },

    stores: {
        publishes: {            
            model: "style.Publish",
            storeId: "publishes",            

            autoLoad: true,

            session: true,
            remoteFilter: true,
            remoteSort: true,            

            /*
            proxy: {
                type: 'rest',
                url: '/WebApp/api/Publishes/',    
                
                pageParam: '',
                startParam: '',
                limitParam: '',            

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                    //totalProperty: 'total',
                    //successProperty: 'success'
                }
            },
            */
            listeners: {
                beforeload: {
                    fn: 'onBeforeStoreLoad'
                    //single: true,
                }
            }
        },        
        
        /*
        styleAttributes: {
            model: 'style.Attribute',
            storeId: 'styleattributes',

            session: true,
            remoteFilter: true,
            remoteSort: true,

            listeners: {
                beforeload: {
                    fn: 'onBeforeAttributeStoreLoad'
                    //single: true,
                }
            }
        },        

        attributes: {            
            fields: ['siteid', 'Attribute'],            
            autoLoad: false,
                                
            proxy: {
                type: 'ajax',
                url: 'resources/data/production/style/siteAttributes.json', 

                pageParam: '',
                startParam: '',
                limitParam: '',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }            
        },
        */

        shopifyStores: {
            fields: ['label', 'value', 'name'],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: 'resources/data/shopify/shopifyStores.json',
                reader: {
                    type: 'json'
                }
            }                            
        }    
    }

});
