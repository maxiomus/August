Ext.define('August.view.production.windows.style.TemplateModel', {
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

            //storeId: 'products',
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
        
        productCategories: {
            fields: ['label', 'field'],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: '/WebApp/api/List/categories',
                
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }                           
        },

        fgSheets: {
            fields: ['label', 'value'],
            autoLoad: true                                     
        },

        bkCategories: {
            fields: ['label', 'value'],
            autoLoad: true                                     
        },

        bkClosureTypes: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        bkCoatTypes: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        bkJacketTypes: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        bkMaterials: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        bkSleeveTypes: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        bkSpecialTypes: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        bkSressTypes: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        bkLegStyles: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        bkPantsFits: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        bkPantsTypes: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        bkWaists: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        bkTopTypes: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        dressTypes: {
            fields: ['label', 'value'],
            autoLoad: true
        },

        blazerTypes: {
            fields: ['label', 'value'],
            autoLoad: true
        },

        coatTypes: {
            fields: ['label', 'value'],
            autoLoad: true
        },

        pantsTypes: {
            fields: ['label', 'value'],
            autoLoad: true
        },

        shortsTypes: {
            fields: ['label', 'value'],
            autoLoad: true
        },

        skirtsTypes: {
            fields: ['label', 'value'],
            autoLoad: true
        },

        topsTypes: {
            fields: ['label', 'value'],
            autoLoad: true
        },

        sweatersTypes: {
            fields: ['label', 'value'],
            autoLoad: true
        },

        cares: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        legals: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        coos: {
            fields: ['label', 'value'],
            autoLoad: true   
        },        

        warrantys: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        closureTypes: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        materials: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        lengths: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        sleeveLengths: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        specialSizes: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        legStyles: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        fitTypes: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        waistFits: {
            fields: ['label', 'value'],
            autoLoad: true   
        },        

        lengths: {
            fields: ['label', 'value'],
            autoLoad: true   
        },
        
        necklines: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        washTypes: {
            fields: ['label', 'value'],
            autoLoad: true   
        },
        
        ageGroups: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        taxCodes: {
            fields: ['label', 'value'],
            autoLoad: true
        },

        patterns: {
            fields: ['label', 'value'],
            autoLoad: true
        },

        occasions: {
            fields: ['label', 'value'],
            autoLoad: true
        },

        fabrics: {
            fields: ['label', 'value'],
            autoLoad: true
        }
    }

});
