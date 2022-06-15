Ext.define('August.view.production.TopBarModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.production-topbar',

    stores: {
        categories: {
            fields: ["label", "field"],
            autoLoad: true,
            pageSize: 0
        },

        dept: {
            fields: ["id", "text"],
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/WebApp/api/List/departments",

                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        customer: {
            fields: ["id", "text"],
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/WebApp/api/List/customers",

                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        status: {
            fields: ["id", "text"],
            //storeId: 'powStatus',
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: 'resources/data/powStatus.json'
            }
        },

        type: {
            fields: ["id", "text"],
            //storeId: 'type',
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/WebApp/api/List/ordertypes",

                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        division: {
            fields: ["id", "text"],
            //storeId: 'division',
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/WebApp/api/List/divisions",

                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        }
    }

});
