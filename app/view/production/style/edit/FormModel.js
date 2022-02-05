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
