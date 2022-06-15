Ext.define('August.view.production.style.edit.FormModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.style-edit-form',

    data: {
        current: {
            costSheet: null,
            quote: null
        }
    },

    formulas: {
        isEdit: function(get){
            return get('title').indexOf('Edit') != -1;
        },

        confirmValue: {
            bind: '{theCosting.confirm_yn}',
            get: function(value) {
                return value;
            },
            set: function(value){
                this.set('theCosting.confirm_yn', value ? 'Y' : null);
            }
        },

        marketValue: {
            bind: '{theProduct.user3}',
            get: function(value) {
                return value;
            },
            set: function(value){
                this.set('theProduct.user3', Ext.Date.format(value, 'Ym'));
            }
        }
    },

    stores: {
        /*
        boms: {
            model: 'Bom',
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 0,

            session: true,

            proxy: {
                type: "rest",
                url: "/WebApp/api/Boms/",
                reader: {
                    type: "json",
                    rootProperty: "data"
                },
                extraParams: {
                    style: '{theProduct.style}',
                    color: '{theProduct.color}'
                },
                listeners: {

                }},

            sorters:[{
                property: 'rawMaType',
                direction: 'ASC'
            }],

            listeners: {
                //beforeload: "onBeforeLoad",
                //load: "onLoad"
            }
        },
        */

        inventories: {
            model: 'style.Inventories',
            storeId: 'styleInventories',
            //autoLoad: true,

            //session: true,
            //remoteFilter: true,
            //remoteSort: true,
            pageSize: 0,            

            proxy: {
                type: 'rest',
                url: '/WebApp/api/Inventories',
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
                    fn: 'onBeforeInventoriesStoreLoad',
                    scope: this.controller
                }                
            }
        },

        onhands: {
            fields: [
                { name: 'type', type: 'string' },
                { name: 'style', type: 'string' },
                { name: 'color', type: 'string' },
                { name: 'warehouse', type: 'string' },
                { name: 'oh1', type: 'float' },
                { name: 'oh2', type: 'float' },
                { name: 'oh3', type: 'float' },
                { name: 'oh4', type: 'float' },
                { name: 'oh5', type: 'float' },
                { name: 'oh6', type: 'float' },
                { name: 'oh7', type: 'float' },
                { name: 'oh8', type: 'float' },
                { name: 'oh9', type: 'float' },
                { name: 'oh10', type: 'float' },
                { name: 'oh11', type: 'float' },
                { name: 'oh12', type: 'float' },
                { name: 'oh13', type: 'float' },
                { name: 'oh14', type: 'float' },
                { name: 'oh15', type: 'float' },
                { name: 'ohs', type: 'float' },
                { name: 'size1', type: 'string' },
                { name: 'size2', type: 'string' },
                { name: 'size3', type: 'string' },
                { name: 'size4', type: 'string' },
                { name: 'size5', type: 'string' },
                { name: 'size6', type: 'string' },
                { name: 'size7', type: 'string' },
                { name: 'size8', type: 'string' },
                { name: 'size9', type: 'string' },
                { name: 'size10', type: 'string' },
                { name: 'size11', type: 'string' },
                { name: 'size12', type: 'string' },
                { name: 'size13', type: 'string' },
                { name: 'size14', type: 'string' },
                { name: 'size15', type: 'string' }
            ],

            storeId: 'styleOnhand',
            //autoLoad: true,

            //session: true,
            //remoteFilter: true,
            //remoteSort: true,
            pageSize: 0,            

            proxy: {
                type: 'rest',
                url: '/WebApp/api/Inventories/OnHand',
                
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
                              
            }
        },

        onorders: {
            fields: [
                { name: 'id', type: 'int' },
                { name: 'orderno', type: 'number' },
                { name: 'style', type: 'string' },
                { name: 'color', type: 'string' },
                { name: 'status', type: 'string' },
                { name: 'warehouse', type: 'string' },                                
                { name: 'customer', type: 'string' },
                { name: 'orderType', type: 'string' },
                { name: 'orderdate', type: 'date' },
                { name: 'shipdate', type: 'date' },
                { name: 'canceldate', type: 'date' },
                { name: 'customerPo', type: 'string' },
                { name: 'bulkorder', type: 'auto' },
                { name: 'price', type: 'float' },
                { name: 'extPrice', type: 'float' },
                { name: 'totalUnit', type: 'float' },
                { name: 'unit1', type: 'float' },
                { name: 'unit2', type: 'float' },
                { name: 'unit3', type: 'float' },
                { name: 'unit4', type: 'float' },
                { name: 'unit5', type: 'float' },
                { name: 'unit6', type: 'float' },
                { name: 'unit7', type: 'float' },
                { name: 'unit8', type: 'float' },
                { name: 'unit9', type: 'float' },
                { name: 'unit10', type: 'float' },
                { name: 'unit11', type: 'float' },
                { name: 'unit12', type: 'float' },
                { name: 'unit13', type: 'float' },
                { name: 'unit14', type: 'float' },
                { name: 'unit15', type: 'float' },
                { name: 'size1', type: 'string' },
                { name: 'size2', type: 'string' },
                { name: 'size3', type: 'string' },
                { name: 'size4', type: 'string' },
                { name: 'size5', type: 'string' },
                { name: 'size6', type: 'string' },
                { name: 'size7', type: 'string' },
                { name: 'size8', type: 'string' },
                { name: 'size9', type: 'string' },
                { name: 'size10', type: 'string' },
                { name: 'size11', type: 'string' },
                { name: 'size12', type: 'string' },
                { name: 'size13', type: 'string' },
                { name: 'size14', type: 'string' },
                { name: 'size15', type: 'string' }
            ],

            storeId: 'styleOnorder',
            //autoLoad: true,

            //session: true,
            //remoteFilter: true,
            //remoteSort: true,
            pageSize: 0,            

            proxy: {
                type: 'rest',
                url: '/WebApp/api/SalesOrders/OnOrder',
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
                              
            }
        },

        wips: {
            fields: [                
                { name: 'pono', type: 'int' },
                { name: 'cut_po', type: 'string' },
                { name: 'style', type: 'string' },
                { name: 'color', type: 'string' },
                { name: 'status', type: 'string' },
                { name: 'sono', type: 'int' },
                { name: 'warehouse', type: 'string' },                                
                { name: 'customer', type: 'string' },
                { name: 'vendor', type: 'string' },
                { name: 'shipvia', type: 'string' },
                { name: 'orderdate', type: 'date' },
                { name: 'etadate', type: 'date' },
                { name: 'shipdate', type: 'date' },
                { name: 'canceldate', type: 'date' },
                { name: 'memo', type: 'string' },
                { name: 'bulkorder', type: 'auto' },
                { name: 'price', type: 'float' },
                { name: 'extPrice', type: 'float' },
                { name: 'receiveQty', type: 'float' },
                { name: 'totalUnit', type: 'float' },
                { name: 'unit1', type: 'float' },
                { name: 'unit2', type: 'float' },
                { name: 'unit3', type: 'float' },
                { name: 'unit4', type: 'float' },
                { name: 'unit5', type: 'float' },
                { name: 'unit6', type: 'float' },
                { name: 'unit7', type: 'float' },
                { name: 'unit8', type: 'float' },
                { name: 'unit9', type: 'float' },
                { name: 'unit10', type: 'float' },
                { name: 'unit11', type: 'float' },
                { name: 'unit12', type: 'float' },
                { name: 'unit13', type: 'float' },
                { name: 'unit14', type: 'float' },
                { name: 'unit15', type: 'float' }
            ],

            storeId: 'styleWips',
            //autoLoad: true,

            //session: true,
            //remoteFilter: true,
            //remoteSort: true,
            pageSize: 0,            

            proxy: {
                type: 'rest',
                url: '/WebApp/api/PurchaseOrders/WIP',
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
                              
            }
        },

        costsheets: {
            fields: ['label'],
            autoLoad: false
            /*
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: 'resources/data/production/style/costsheets.json',

                reader: {
                    type: 'array'
                }
            }
            */
        },

        bundles: {
            fields: ['label', 'value', 'descript'],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: '/WebApp/api/List/bundles',
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        currencies: {
            fields: ['label', 'value', 'descript'],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: '/WebApp/api/List/currencies',
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        countries: {
            fields: ['label', 'value', 'descript'],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: '/WebApp/api/List/countries',
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        labeltypes: {
            fields: ['id', 'text', 'type'],
            autoLoad: false
        },

        tags: {
            fields: ['label', 'field'],
            autoLoad: false
            /*
             pageSize: 0,
             proxy: {
             type: 'ajax',
             url: 'resources/data/production/style/categories.json',
             reader: {
             type: 'json',
             rootProperty: 'data'
             }
             }
             */
        },

        status: {
            fields: ['label', 'value', 'descript'],
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
            fields: ["label", "value"],
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

        tariffnos: {
            fields: ["label", "value"],
            //storeId: 'customer',
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/WebApp/api/List/tariffs",
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        categories: {
            fields: ["label", "value", "descript"],
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

        customers: {
            fields: ["label", "value"],
            //storeId: 'customer',
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/WebApp/api/List/customers",
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        /*
        bodies: {
            fields: ['id', 'text'],
            autoLoad: true,

            proxy: {
                type: 'ajax',
                url: '/WebApp/api/List/bodies',
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

        sizeCats: {
            fields: ["label", "value"],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: '/WebApp/api/List/sizes',
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data'
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
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            listeners: {
                load: {
                    fn: 'onWarehouseStoreLoad',
                    scope: this.controller
                }
            }
        },

        designers: {
            fields: ["label", "value"],
            //storeId: 'customer',
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/WebApp/api/List/designers",
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        rawmattypes: {
            fields: ["label", 'value'],
            //autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/WebApp/api/List/rawmats",
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        fabrictypes: {
            fields: ["label", "value"],
            //storeId: 'type',
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/WebApp/api/List/fabrictypes",
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        fabriccontents: {
            fields: ["label", "value"],
            //storeId: 'type',
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/WebApp/api/List/fabriccontents",
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
            fields: ["label", "value"],
            //storeId: 'division',
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

        processtypes: {
            fields: ['label', 'value'],
            // allow the grid to interact with the paging scroller by buffering
            //buffered: true,
            pageSize: 0,
            //numFromEdge: 5,
            //trailingBufferZone: 100,
            //leadingBufferZone: 100,
            autoLoad: true,
            remoteFilter: true,

            proxy: {
                type: 'ajax',
                url: '/WebApp/api/List/processtypes',
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                    /*
                    totalProperty: 'total',
                    successProperty: 'success'
                    */
                }
            }
        },
        
        subdivisions: {
            fields: ["label", "value"],
            //storeId: 'division',
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/WebApp/api/List/subdivisions",
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
            fields: ["label", "value"],
            //storeId: 'division',
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

        groups: {
            fields: ["label", "value"],
            //storeId: 'division',
            autoLoad: true,
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

        vendors: {
            fields: ["label", "value"],
            //storeId: 'customer',
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/WebApp/api/List/vendors",
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        bomnos: {
            fields: ["label", 'value'],
            //autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/WebApp/api/List/bomnos",
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        }
    }

});
