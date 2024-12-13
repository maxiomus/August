Ext.define('August.view.reports.DefaultModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.reports-default',

    stores: {
        areas: {
            type: 'tree',

            root: {
                text: 'Reports',
                routeId: 'base',
                expanded: true,
                children: [
                    {
                        text: 'Inventories',
                        routeId: 'inventory-default',
                        expanded: true,
                        children: [
                            {
                                leaf: true,
                                text: 'Inventory Aging by WH - 30 days',
                                routeId: 'inventory-aginginterval'
                            },
                            {
                                leaf: true,
                                text: 'Inventory by Warehouse asof',
                                routeId: 'inventory-warehouseasof'
                            }
                        ]
                        
                    },
                    {
                        text: 'Invoices',
                        routeId: 'invoice-default',
                        expanded: true,
                        children: [
                            {
                                leaf: true,
                                text: 'Invoice Summary by S.O type',
                                routeId: 'invoice-summarybysotype'
                            },
                            {
                                leaf: true,
                                text: 'Invoice By Styles & S.O type',
                                routeId: 'invoice-stylesbysotype'
                            }
                        ]
                    }
                    /*
                    {
                        text: 'Product',
                        routeId: 'product-default',
                        expanded: true,
                        children: [
                            {
                                leaf: true,
                                text: 'Category',
                                routeId: 'product-category'
                            },
                            {
                                leaf: true,
                                text: 'Color',
                                routeId: 'product-color'
                            },
                            {
                                leaf: true,
                                text: 'Component Type',
                                routeId: 'product-rawmattype'
                            },
                            {
                                leaf: true,
                                text: 'Fabric Content',
                                routeId: 'product-fabriccontent'
                            },
                            {
                                leaf: true,
                                text: 'Fabric Type',
                                routeId: 'product-fabrictype'
                            },
                            {
                                leaf: true,
                                text: 'Group',
                                routeId: 'product-group'
                            },
                            {
                                leaf: true,
                                text: 'Size',
                                routeId: 'product-size'
                            },
                            {
                                leaf: true,
                                text: 'Sub Category',
                                routeId: 'product-subcategory'
                            },
                            {
                                leaf: true,
                                text: 'U.O.M',
                                routeId: 'product-uom'
                            }
                        ]
                    },                    
                    {
                        text: 'Vendors',
                        routeId: 'vendors-default',
                        expanded: true,
                        children: [
                            { leaf: true, text: 'Process Location', routeId: 'vendors-processloc' },
                            { leaf: true, text: 'Process Type', routeId: 'vendors-processtype' },
                            { leaf: true, text: 'Vendor Type', routeId: 'vendors-vendortype' }
                        ]
                    }
                    */
                ]
            }
        },

        warehouses: {
            fields: ['label', 'value'],
            // allow the grid to interact with the paging scroller by buffering
            //buffered: true,
            autoLoad: true,            
            pageSize: 0,
            //numFromEdge: 5,
            //trailingBufferZone: 100,
            //leadingBufferZone: 100,            
            //remoteFilter: false,

            proxy: {
                type: 'ajax',
                url: '/WebApp/api/List/warehouses',
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
    }
});
