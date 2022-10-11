Ext.define('August.view.production.windows.style.web.TemplateModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.windows-style-webtemplate',
    
    data: {
        title: 'Shopify'
    },

    stores: {

        /*
        templatestyles: {
            source: '{products}'
        },        
        */
        templatestyles: {
            model: 'style.Product',

            storeId: 'products',
            autoLoad: false,

            session: true,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 100,

            proxy: {
                type: 'rest',
                url: '/WebApp/api/Products/',           
                timeout: 120000,
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
        },   

        shopifytemplates: {
            model: "shopify.shopifyTemplate",
            storeId: "shopifytemplates",
            //type: 'buffered',

            //autoLoad: true,
                        
            //session: true,
            remoteFilter: true,
            remoteSort: true,      

            listeners: {
                beforeload: {
                    fn: 'onBeforeStoreLoad'
                    //scope: this
                    //single: true,
                }
            }
        },

        warehouses: {
            fields: ['label', 'value'],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: '/WebApp/api/List/warehouses',
                
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
        },

        categories: {
            fields: ['label', 'field'],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: 'resources/data/production/style/categories.json',
                reader: {
                    type: 'json'
                }
            }                            
        },

        closureTypes: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        coatTypes: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        jacketTypes: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        materials: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        sleeveTypes: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        specialTypes: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        dressTypes: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        legStyles: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        pantsFits: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        pantsTypes: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        waists: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        topTypes: {
            fields: ['label', 'value'],
            autoLoad: true   
        }
    }

});
