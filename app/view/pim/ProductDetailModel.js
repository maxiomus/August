Ext.define('August.view.pim.ProductDetailModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.pim-productdetail',

    requires: [
        'August.model.pim.ProductDetail',
        'August.model.pim.ProductDetailPhoto'
    ],

    data: {
        modified: false,
        default_keywords: {
            'ER' : ['Luxury', 'Chic', 'Elegant', 'Romantic', 'Novelty'],
            'EF' : ['Preppy', 'Comport', 'Cute', 'Cottage core'],
            'GL' : ['Trendy', 'Chic', 'Boise', 'Sporty', 'Structured'],
            'FR' : ['Boho', 'Freedom', 'Naked', 'Earthy', 'Comfort']
        }
    },

    formulas: {
        
    },

    stores: {        

        productdetails: {
            model: 'pim.ProductDetail',
            storeId: 'productdetails',
            autoLoad: false,
            //autoSync: true,
            session: true,
            
            remoteFilter: true,
            remoteSort: true,            

            pageSize: 100,                                   

            listeners: {                
                beforeload: function(s){                    
                    s.getProxy().setHeaders({
                        'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                    })
                }
            }
        },                       
        
        stylecategories: {
            fields: ['guid', 'lable', 'value'],
            //storeId: 'type',
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/WebApp/api/List/categories",
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },    

        voices: {
            fields: ['label', 'value'],
            data: [
                { "label": "excited", "value": "excited" },
                { "label": "professional", "value": "professional" },
                { "label": "funny", "value": "funny" },
                { "label": "encouraging", "value": "encouraging" },
                { "label": "dramatic", "value": "dramatic" },
                { "label": "witty", "value": "witty" },
                { "label": "sarcastic", "value": "sarcastic" },
                { "label": "engaging", "value": "engaging" },
                { "label": "creative", "value": "creative" }
              ]
        },

        engines: {
            fields: ['label', 'value'],
            data: [
                { "label": "excited", "value": "excited" },
                { "label": "professional", "value": "professional" },
                { "label": "funny", "value": "funny" },
                { "label": "encouraging", "value": "encouraging" },
                { "label": "dramatic", "value": "dramatic" },
                { "label": "witty", "value": "witty" },
                { "label": "sarcastic", "value": "sarcastic" },
                { "label": "engaging", "value": "engaging" },
                { "label": "creative", "value": "creative" }
              ]
        },

        keywords: {
            fields: ['label', 'value', 'brand'],
            autoLoad: true,
            data: [
                { "label": "Luxury", "value": "luxury", "brand": "ER" },
                { "label": "Chic", "value": "chic", "brand": "ER" },
                { "label": "Elegant", "value": "elegant", "brand": "ER" },
                { "label": "Romantic", "value": "romantic", "brand": "ER" },
                { "label": "Novelty", "value": "novelty", "brand": "ER" },
                { "label": "Preppy", "value": "preppy", "brand": "EF" },
                { "label": "Comport", "value": "comport", "brand": "EF" },
                { "label": "Cute", "value": "cute", "brand": "EF" },
                { "label": "Cottage core", "value": "cottage core", "brand": "EF" },
                { "label": "Trendy", "value": "trendy", "brand": "GL" },
                { "label": "Chic", "value": "chic", "brand": "GL" },
                { "label": "Boise", "value": "boise", "brand": "GL" },
                { "label": "Sporty", "value": "sporty", "brand": "GL" },
                { "label": "Structured", "value": "structured", "brand": "GL" },
                { "label": "Boho", "value": "boho", "brand": "FR" },
                { "label": "Freedom", "value": "freedom", "brand": "FR" },
                { "label": "Naked", "value": "naked", "brand": "FR" },
                { "label": "Earthy", "value": "earthy", "brand": "FR" },
                { "label": "Comfort", "value": "comfort", "brand": "FR" }
              ]
        },

        categories: {
            fields: ['label', 'field'],
            autoLoad: true            
        }, 
        
        productCategories: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        productStyles: {
            fields: ['label', 'value', 'type'],
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
        /*
        subcategories: {
            fields: ['guid', 'lable', 'value'],
            //storeId: 'customer',
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/WebApp/api/List/subcategories",
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        status: {
            fields: ['guid', 'lable', 'value'],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: '/WebApp/api/List/status',
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        seasons: {
            fields: ['guid', 'lable', 'value'],
            //storeId: 'customer',
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/WebApp/api/List/seasons",
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },               

        divisions: {
            fields: ['guid', 'lable', 'value'],
            //storeId: 'customer',
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/WebApp/api/List/divisions",
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        sizeCats: {
            fields: ['guid', 'lable', 'value'],
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/WebApp/api/List/designers",
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                reader: {
                    type: "json",
                    rootProperty: 'data'
                }
            }
        },

        groups: {
            fields: ["label", "value"],
            //storeId: 'customer',
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/WebApp/api/List/groups",

                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        }
        */
    }

});
