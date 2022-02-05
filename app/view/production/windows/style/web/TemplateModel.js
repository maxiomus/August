Ext.define('August.view.production.windows.style.web.TemplateModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.windows-style-webtemplate',
    
    stores: {

        shopifytemplates: {            
            model: "shopify.Template",

            storeId: "shopifytemplates",
            //type: 'buffered',

            autoLoad: true,
            
            proxy: {
                type: 'rest',
                url: '/WebApp/api/ShopifyTemplate/',    
                
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
            
            listeners: {
                beforeload: {
                    //fn: 'onBeforeStoreLoad'
                    //single: true,
                }
            }
        },

        shopifyStores: {
            fields: ['label', 'value', 'name'],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: 'resources/data/production/style/shopifyStores.json',
                reader: {
                    type: 'json'
                }
            }                            
        }
    }

});
