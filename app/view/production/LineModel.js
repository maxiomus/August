Ext.define('August.view.production.LineModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.line',

    requires: [
        'August.model.style.LineSheet',
        'Ext.data.BufferedStore'
    ],

    data: {
        cDate: new Date()
    },

    formulas: {
        selectedValue: {
            get: function(get) {
                /*
                var year = value[1],
                    month = value[0]+ 1,
                    month = (month < 10 ? '0' : '')+month;
                */
                var d = get('cDate'),
                    m = d.toLocaleString("en-us",{ month: "short" });
                return m+', '+ d.getFullYear();

            }
        }
    },

    stores: {
        years: {
            fields: ['year'],
            sorters: [{
                property: 'year',
                direction: 'DESC'
            }],

            data: (function(){
                var data = [],
                    date = new Date(),
                    thisYear = date.getFullYear();

                for(var i = 2000; i <= thisYear+1; i++){
                    data.push({
                        year: i
                    });
                }
                return data;
            })()
        },
        /*
        months: {
            type: 'tree',

            root: {
                expanded: true,
                children: (function(){
                    var month = ["January","February","March","April","May","June","July","August","September","October","November","December"],
                    children = [];

                    for(var i = 0; i < 12; i++){
                        children.push({
                            text: month[i], leaf: true
                        })
                    }

                    return children;

                })()
            },
            listeners: {

            }
        },
        */
        markets: {
            fields: ['id', 'month', 'year'],

            data: (function(){
                var data = [],
                    names = ["January","February","March","April","May","June","July","August","September","October","November","December"];

                for (var i = 0; i < 12; i++){
                    data.push({
                        id: (i < 9 ? '0' : '') + (i + 1),
                        month: names[i]
                    });
                }
                return data;
            })(),
            listeners: {

            }
        },

        lines: {
            model: 'style.Product',
            //storeId: 'samples',
            autoLoad: false,

            session: true,
            remoteFilter: true,
            remoteSort: true,

            pageSize: 50,

            proxy: {
                type: 'rest',
                url: '/WebApp/api/Products/',           
                   
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

        linesheets: {
            model: 'style.LineSheet',
            //type: 'buffered',
            //storeId: 'reviews',
            session: true,
            
            autoLoad: true,
            autoSync: true,

            remoteFilter: true,
            remoteSort: true,

            //leadingBufferZone: 100,
            pageSize: 100,

            proxy: {
                type: 'rest',
                url: '/WebApp/api/Linesheets/',           
                   
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                    //totalProperty: 'total',
                    //successProperty: 'success'
                },
                writer: {
                    type: 'json',
                    //clientIdProperty: 'clientId',
                    //writeAllFields: true,
                    allowSingle: false // set false to send a single record in array
                }
            },

            listeners: {
                beforeload: function(s){                    
                    s.getProxy().setHeaders({
                        'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                    })
                }
            }
            /*
            groupField: 'season',
            sorters: [{
                property: 'lineseq',
                direction: 'DESC'
            },{
                property: 'createTime',
                direction: 'DESC'
            }]
            */
            
            /*
             filters: [{
             property: 'progress',
             value: 'review',
             type: 'string'
             }]
             */
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

        vendors: {
            fields: ["label", "value"],
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/WebApp/api/List/vendors",

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
        },

        subcategories: {
            fields: ["label", "value"],
            //storeId: 'customer',
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/WebApp/api/List/subcategories",
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        templates: {
            fields: ['label', 'field'],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: 'resources/data/production/templates.json',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },
    }

});
