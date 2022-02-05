Ext.define('August.view.production.TaskModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.prod-task',

    data: {

    },

    stores: {
        plans: {
            fields: ['label', 'text'],
            //pageSize: 50,
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: '/WebApp/api/List/plans',
                pageParam: '',
                startParam: '',
                limitParam: '',
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            listeners: {
                refresh: "onPlansRefresh"
            }
        },

        activities: {
            fields: ['label', 'text'],
            storeId: 'activities',
            //pageSize: 50,
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: '/WebApp/api/List/activities',

                pageParam: '',
                startParam: '',
                limitParam: '',

                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        users: {
            fields: ["label", "text"],
            //storeId: 'customer',
            autoLoad: true,
            proxy: {
                type: "ajax",
                url: "/WebApp/api/List/users",                
                pageParam: '',
                startParam: '',
                limitParam: '',
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                reader: {
                    type: "json",
                    rootProperty: "data",
                    totalProperty: "total"
                }
            }
        },

        tnaOrders: {
            model: 'TnaOrder',
            autoLoad: false,
            remoteFilter: true
        }
    }

});
