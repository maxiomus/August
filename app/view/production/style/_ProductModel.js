Ext.define('August.view.production.style._ProductModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel._product',

    stores: {

        products: {
            model: 'style.Product',

            storeId: 'products',
            autoLoad: false,

            //session: true,
            //remoteFilter: true,
            remoteSort: true,
            pageSize: 50,

            proxy: {
                type: 'rest',
                url: '/api/Products/',
                //url: '../Services/Samples.ashx',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                    //totalProperty: 'total',
                    //successProperty: 'success'
                }
            },
            listeners: {
                beforeload: {
                    fn: 'onBeforeStoreLoad'
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
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        processtypes: {
            fields: ["id", "text"],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/List/processtypes",

                reader: {
                    type: "json",
                    rootProperty: 'data'
                }
            },

            listeners: {
                refresh: "onTypesRefresh"
            }
        },

        vendors: {
            fields: ["id", "text"],
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/List/vendors",

                reader: {
                    type: "json",
                    rootProperty: 'data'
                }
            }
        },

        groups: {
            fields: ["id", "text"],
            //storeId: 'customer',
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/List/groups",

                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        subcategories: {
            fields: ["id", "text"],
            //storeId: 'customer',
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/api/List/subcategories",

                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        }
    }

});
