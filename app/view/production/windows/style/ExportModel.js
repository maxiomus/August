Ext.define('August.view.production.windows.style.ExportModel', {
    extend: 'Ext.app.ViewModel',
    
    alias: 'viewmodel.windows-style-webexport',
    
    stores: {
        publishes: {            
            model: "style.Publish",
            storeId: "publishes",
            //type: 'buffered',

            autoLoad: true,

            session: true,
            remoteFilter: true,
            remoteSort: true,            

            /*
            proxy: {
                type: 'rest',
                url: '/WebApp/api/SitePublishes/',    
                
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
    },

});
