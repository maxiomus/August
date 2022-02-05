Ext.define('August.view.production.style.ProductModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.product',

    requires: [
        'August.model.style.Product',
        'August.model.style.Sil'
    ],

    stores: {

        products: {
            model: 'style.Product',

            storeId: 'products',
            autoLoad: false,

            session: true,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 50,

            proxy: {
                type: 'rest',
                url: '/WebApp/api/Products/',           
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },     
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

        vendors: {
            fields: ["label", "text"],
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/WebApp/api/List/vendors",
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
            fields: ["label", "text"],
            //storeId: 'customer',
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/WebApp/api/List/groups",
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        subcategories: {
            fields: ["label", "text"],
            //storeId: 'customer',
            autoLoad: false,
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

        productOptions: {
            model: 'shopify.ProductOption',
            autoLoad: true,
            
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: 'resources/data/shopify/productOptions.json',
                reader: {
                    type: 'json',
                    rootProperty: 'options'
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
        }
        
        /*
        bodies: {
            fields: ['id', 'text'],
            //pageSize: 100,
            //remoteFilter: true,
            autoLoad: true,

            proxy: {
                type: 'ajax',
                url: '/api/Combos/bodies',
                pageParam: '',
                startParam: '',
                limitParam: '',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        styles: {
            fields: ['id', 'text'],
            //pageSize: 100,
            //remoteFilter: true,
            autoLoad: false,

            proxy: {
                type: 'ajax',
                url: '/api/Combos/styles',

                pageParam: '',
                startParam: '',
                limitParam: '',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        prints: {
            fields: ['id', 'text'],

            autoLoad: true,
            //pageSize: 25,
            proxy: {
                type: 'ajax',
                url: '/api/Combos/components',

                pageParam: '',
                startParam: '',
                limitParam: '',

                extraParams: {
                    type: 'PRINTS'
                },

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },
        */
    },

    formulas: {
        currentProduct: {
            bind: {
                bindTo: '{grid.selection}',
                deep: true
            },

            get: function(p){
                return p;
            },

            set: function(p){
                if(!p.isModel){
                    p = this.get('products').getById(p);
                }
                this.set('currentProduct', p);
            }
        }
    }

});
