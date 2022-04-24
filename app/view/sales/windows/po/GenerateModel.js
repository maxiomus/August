Ext.define('August.view.sales.windows.po.GenerateModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'August.model.sales.OrderDetail'
    ],

    alias: 'viewmodel.windows-po-generate',
    
    data: {
        groupBy: 'style',
        numOfStyles: 0
    },

    stores: {
        
        orderdetails: {
            model: 'sales.OrderDetail',
            storeId: 'orderdetails',
            autoLoad: true,

            //session: true,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 100,

            proxy: {
                type: 'rest',
                url: '/WebApp/api/SalesOrderItems/POG',                

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
                    fn: 'onBeforeLoadOrderDetails',
                    scope: this.controller
                }
            }
        },

        potemplates: {
            model: "purchase.Order",
            storeId: "potemplates",
            //type: 'buffered',

            //autoLoad: true,
                        
            session: true,
            remoteFilter: true,
            remoteSort: true,      

            proxy: {
                type: 'rest',
                url: '/WebApp/api/PurchaseOrders/POG',                
                batchActions: true, // default false when rest proxy.
                
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },                
                
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    //totalProperty: 'total',
                    successProperty: 'success'
                },

                writer: {
                    type: 'json',
                    allDataOptions: {
                        persist: false,
                        associated: true
                    },
                    partialDataOptions: {
                        changes: false,
                        critical: true,
                        associated: true
                    },
                    //clientIdProperty: 'clientId',
                    //writeAllFields: true,
                    allowSingle: false // set false to send a single record in array
                }
            },

            listeners: {
                datachanged: {
                    fn: 'onPoStoreDataChanged',
                    scope: this.controller
                },
                beforeload: {
                    //fn: 'onBeforeStoreLoad'
                    //scope: this
                    //single: true,
                }
            }
        },
        
        categories: {
            fields: ["label", "value"],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: 'resources/data/sales/categories.json'
            }
        },

        processtypes: {
            fields: ["label", "value"],            
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/WebApp/api/List/processtypes",                

                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        shipvias: {
            fields: ["label", "value"],            
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/WebApp/api/List/shipvias",                

                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        companies: {
            fields: ["label", "value"],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/WebApp/api/List/companies",
                
                reader: {
                    type: "json",
                    rootProperty: 'data'
                }
            }
        },

        vendors: {
            fields: ["label", "value"],
            autoLoad: true,
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

        divisions: {
            fields: ["label", "value"],
            //storeId: 'division',
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/WebApp/api/List/divisions",

                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        warehouses: {
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

        paymentcodes: {
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
                url: '/WebApp/api/List/paymentcodes',
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        terms: {
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
                url: '/WebApp/api/List/terms',
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },

        memocodes: {
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
                url: '/WebApp/api/List/memocodes',
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }        
    }

});
