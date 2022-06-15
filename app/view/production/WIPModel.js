Ext.define('August.view.production.WIPModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'August.model.production.WIP',
        //'Ext.data.BufferedStore',
        'Ext.data.proxy.Rest',
        'Ext.data.proxy.LocalStorage'
    ],

    alias: 'viewmodel.prod-wip',

    data: {
        cbCache: null
    },

    stores: {
        wips: {
            model: "production.WIP",
            storeId: "wips",
            //type: 'buffered',

            autoLoad: false,

            session: true,
            remoteFilter: true,
            remoteSort: true,

            pageSize: 50,

            proxy: {
                type: 'rest',
                url: '/WebApp/api/Wips/',      
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
                beforeload: {
                    fn: 'onBeforeStoreLoad'
                    //single: true,
                }
            }
        },
/*
        tasks: {
            model: 'production.Task',
            autoLoad: false,

            remoteFilter: true
            //remoteSort: true,
        },

        cpos: {
            model: 'production.ChildPO',
            autoLoad: false,

            remoteFilter: true,
            //remoteSort: true,

            listeners: {
                beforeload: 'onChildStoreBeforeLoad'
            }
        },

        activities: {
            fields: ['id', 'text'],
            //pageSize: 50,
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: '/WebApp/api/List/activities',

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
        divisions: {
            fields: ["id", "text"],
            //storeId: 'customer',
            autoLoad: false,
            proxy: {
                type: "ajax",
                url: "WebApp/api/List/divisions",

                pageParam: '',
                startParam: '',
                limitParam: '',

                reader: {
                    type: "json",
                    rootProperty: "data",
                    totalProperty: "total",
                    successProperty: "success"
                }
            }
        },

        vendors: {
            fields: ["id", "text"],
            //storeId: 'customer',
            autoLoad: false,
            proxy: {
                type: "ajax",
                url: "WebApp/api/List/vendors",

                pageParam: '',
                startParam: '',
                limitParam: '',

                reader: {
                    type: "json",
                    rootProperty: "data",
                    totalProperty: "total",
                    successProperty: "success"
                }
            }
        },

        processtype: {
            fields: ["id", "text"],
            //storeId: 'customer',
            autoLoad: false,
            proxy: {
                type: "ajax",
                url: "WebApp/api/List/processtypes",

                pageParam: '',
                startParam: '',
                limitParam: '',

                reader: {
                    type: "json",
                    rootProperty: "data",
                    totalProperty: "total",
                    successProperty: "success"
                }
            }
        },        

        poh_status: {
            fields: ["id", "text"],
            data: [
                {"id":"Open", "text":"Open"},
                {"id":"Closed", "text": "Closed"}
            ]
        },

        categories: {
            fields: ["label", "field"],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: 'resources/data/production/categories.json'
            }
        }
    }

});
