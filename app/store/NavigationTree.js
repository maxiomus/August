Ext.define('August.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',

    storeId: 'NavigationTree',
    root: {
        expanded: true,
        children: [
            {
                text: 'Dashboard',
                view: 'dashboard.Default',
                leaf: true,
                read: true,
                iconCls: 'x-fa fa-desktop',
                routeId: 'dashboard'
            },
            {
                text: 'Company',
                expanded: false,
                selectable: false,
                iconCls: 'x-far fa-building',
                routeId: 'company',
                id: 'company',
                children: [
                /*
                    {
                    text: 'Notice',
                    view: 'company.notice.Notice',
                    leaf: true,
                    read: true,
                    iconCls: 'x-fa fa-send-o',
                    routeId: 'notice'

                },
                */
                {
                    text: 'Bulletin Boards',
                    view: 'company.board.Default',
                    leaf: true,
                    read: true,
                    iconCls: 'x-fa fa-layer-group',
                    routeId: 'board'
                },{
                    text: 'Tasks',
                    view: 'company.work.Default',
                    leaf: true,
                    read: true,
                    iconCls: 'x-fa fa-tasks',
                    routeId: 'work'
                }]
            },
            {
                text: 'Customer',
                expanded: false,
                selectable: false,
                iconCls: 'x-far fa-address-card',
                routeId: 'customer',
                id: 'customer',
                children: [                
                {
                    text: 'Invoice',
                    view: 'customer.invoice.List',
                    leaf: true,
                    read: true,
                    granted: ['account', 'administrators'],
                    iconCls: 'x-far fa-address-book',
                    routeId: 'customer-invoice'
                },{
                    text: 'Payments',
                    view: 'customer.payment.Receive',
                    leaf: true,
                    read: true,
                    granted: ['account', 'administrators'],
                    iconCls: 'x-fas fa-file-invoice-dollar',
                    routeId: 'payment-receive'
                }]
            },
            {
                text: 'Sales',
                expanded: false,
                selectable: false,
                iconCls: 'x-fas fa-dollar-sign',
                routeId: 'sales',
                id: 'sales',
                children: [
                {
                    text: 'Sales Orders',
                    view: 'sales.Order',
                    leaf: true,
                    read: true,
                    iconCls: 'x-fa fa-th-large',
                    routeId: 'sales-order'
                },                
                {
                    text: 'Pick Ticket',
                    view: 'sales.pick.Ticket',
                    leaf: true,
                    read: true,
                    iconCls: 'x-fa fa-file-text-o',
                    routeId: 'pick-ticket'
                }
                /*
                {
                    text: 'REQUEST',
                    view: 'sales.Request',
                    leaf: true,
                    read: true,
                    granted: ['sales', 'cs', 'administrators'],
                    iconCls: 'x-fa fa-file-text-o',
                    routeId: 'request'
                },{
                    text: 'REVIEW',
                    view: 'sales.Review',
                    leaf: true,
                    read: true,
                    granted: ['cs', 'revise', 'administrators'],
                    iconCls: 'x-fa fa-file-text-o',
                    routeId: 'review'
                },{
                    text: 'PENDING',
                    view: 'sales.Pending',
                    leaf: true,
                    read: true,
                    granted: ['exec', 'administrators'],
                    iconCls: 'x-fa fa-file-text-o',
                    routeId: 'pending'
                }
            */
            ]}, 
            {
                text: 'Shopify',
                expanded: false,
                selectable: false,
                iconCls: 'x-fa fa-shopping-bag',
                routeId:'shopify',
                id: 'shopify',
                children: [
                {
                    text: 'Orders',
                    view: 'shopify.Order',
                    leaf: true,
                    read: true,
                    iconCls: 'x-fas fa-tags',
                    routeId: 'shopify-order'
                },
                {
                    text: 'Products',
                    view: 'shopify.Product',
                    leaf: true,
                    read: true,
                    iconCls: 'x-fas fa-tshirt',
                    routeId: 'shopify-product'
                }
                /*
                {
                    text: 'Endless Rose',
                    view: 'shopify.ER',
                    leaf: true,
                    read: true,
                    iconCls: 'x-fa fa-store',
                    routeId: 'shopify-endlessrose'
                },                
                {
                    text: 'English Factory',
                    view: 'shopify.EF',
                    selectable: false,
                    leaf: true,
                    read: true,
                    iconCls: 'x-fa fa-store',
                    routeId: 'shopify-englishfactory'
                },                
                {
                    text: 'Grey Lab',
                    view: 'shopify.GL',
                    selectable: false,
                    leaf: true,
                    read: true,
                    iconCls: 'x-fa fa-store',
                    routeId: 'shopify-greylab'
                },                
                {
                    text: 'Free The Rose',
                    view: 'shopify.ftr',
                    selectable: false,
                    leaf: true,
                    read: true,
                    iconCls: 'x-fa fa-store',
                    routeId: 'shopify.freetherose'
                }
                */       
            ]},                                             
            {
                text: 'Production',
                expanded: false,
                selectable: false,
                iconCls: 'x-fa fa-sync',
                routeId : 'production',
                id:       'production',
                children: [
                {
                    text: 'Product Style',
                    view: 'production.style.Product',
                    leaf: true,
                    read: true,
                    iconCls: 'x-fa fa-cube',
                    routeId: 'product'
                },
                {
                    text: 'Line Sheet',
                    view: 'production.Line',
                    leaf: true,
                    read: true,
                    iconCls: 'x-fa fa-tags',
                    routeId: 'line'
                },
                {
                    text: 'Purchase Orders',
                    view: 'purchase.Order',
                    leaf: true,
                    read: true,
                    iconCls: 'x-fa fa-money-check-alt',
                    routeId: 'purchase-order'
                },
                /*{
                    text: 'Schedule',
                    view: 'production.Schedule',
                    leaf: true,
                    read: true,
                    iconCls: 'x-fa fa-calendar',
                    routeId: 'schedule'
                },
                */                
                {
                    text: 'W.I.P',
                    view: 'production.WIP',
                    leaf: true,
                    read: true,
                    iconCls: 'x-fa fa-calendar',
                    routeId: 'wip'
                }            
            ]},
            {
                text: 'Inventory',
                expanded: false,
                selectable: false,
                iconCls: 'x-fa fa-cubes',
                routeId : 'inventory',
                id:       'inventory',
                children: [                
                    {
                    text: 'P.I',
                    view: 'inventory.pi.Physical',
                    leaf: true,
                    read: true,
                    iconCls: 'x-fa fa-calculator',
                    routeId: 'physical'
                },{
                    text: 'WH Transfer',
                    view: 'inventory.transfer.List',
                    leaf: true,
                    read: true,
                    iconCls: 'x-fa fa-calculator',
                    routeId: 'transfer'
                }
                /*,{
                    text: 'Receiving',
                    view: 'inventory.fabric.Receiving',
                    leaf: true,
                    read: true,
                    iconCls: 'x-fa fa-edit',
                    routeId: 'receiving'
                }*/]
            },
            /*
            {
                text: 'Reports',                
                iconCls: 'x-fab fa-leanpub',
                routeId : 'reports',
                id:       'reports',
                expanded: false,
                selectable: false,
                children: [{
                    text: 'Invoice Monthly Summaries',
                    view: 'reports.invoice.SummaryBySoType',
                    iconCls: 'x-fa fa-edit',
                    leaf: true,
                    read: true,
                    routeId: 'reports-invoice-summarybysotype'
                },
                {
                    text: 'Inventory By Lot',
                    view: 'reports.inventory.InventoryByLot',
                    iconCls: 'x-fa fa-pie-chart',
                    leaf: true,
                    read: true,
                    routeId: 'inventorybylot'
                },
                {
                    text: 'Inventory Aging by Warehouse',
                    view: 'reports.inventory.AgingInterval',
                    iconCls: 'x-fa fa-edit',
                    leaf: true,
                    read: true,
                    routeId: 'reports-inventory-aginginterval'
                }]
            },
            */
            {
                text: 'Reports',
                view: 'reports.Default',
                iconCls: 'x-fa fa-poll',
                granted: ['administrators'],
                leaf: true,
                read: true,
                routeId: 'reports'
            },
            {
                text: 'Settings',
                view: 'settings.Default',
                iconCls: 'x-fa fa-wrench',
                granted: ['administrators'],
                leaf: true,
                read: true,
                routeId: 'settings'
            }
        ]
    }
});
