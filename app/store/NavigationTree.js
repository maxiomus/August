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
                    text: 'Main',
                    view: 'customer.Main',
                    leaf: true,
                    read: true,
                    iconCls: 'x-far fa-address-book',
                    routeId: 'customer-main'
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
                }
                /*
                {
                    text: 'P.O.W',
                    view: 'sales.Pow',
                    leaf: true,
                    read: true,
                    iconCls: 'x-fa fa-file-text-o',
                    routeId: 'pow'
                },{
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
            /*          
            {
                text: 'Development',
                expanded: false,
                selectable: false,
                iconCls: 'x-fa fa-cogs',
                routeId:'development',
                id: 'development',
                children: [
                {
                    text: 'Style',
                    view: 'development.style.Style',
                    leaf: true,
                    read: true,
                    iconCls: 'x-fa fa-tag',
                    routeId: 'style'
                },
                {
                    text: 'Line Sheet',
                    view: 'development.Line',
                    leaf: true,
                    read: true,
                    iconCls: 'x-fa fa-tags',
                    routeId: 'line'
                },                
                {
                    text: 'P.L.M',
                    view: 'development.plm.Plm',
                    selectable: false,
                    leaf: true,
                    read: true,
                    iconCls: 'x-fa fa-tasks',
                    routeId: 'development.plm'
                },                            
                {
                    text: 'Fabric Request',
                    view: 'development.request.Fabric',
                    leaf: true,
                    read: true,
                    iconCls: 'x-fa fa-database',
                    routeId: 'request-fabric'
                },
                {
                    text: 'Work Request',
                    view: 'development.request.Work',
                    leaf: true,
                    read: true,
                    iconCls: 'x-fa fa-scissors',
                    routeId: 'request-work'
                },
                {
                    text: 'Graphic Request',
                    view: 'development.request.Graphic',
                    leaf: true,
                    read: true,
                    iconCls: 'x-fa fa-file-picture-o',
                    routeId: 'request-graphic'
                }]
            },
            */
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
                /*
                    {
                    text: 'P.I',
                    view: 'inventory.pi.Physical',
                    leaf: true,
                    read: true,
                    iconCls: 'x-fa fa-calculator',
                    routeId: 'physical'
                },{
                    text: 'Receiving',
                    view: 'inventory.fabric.Receiving',
                    leaf: true,
                    read: true,
                    iconCls: 'x-fa fa-edit',
                    routeId: 'receiving'
                },
                {
                    text: 'Fabric Allocate',
                    view: 'inventory.fabric.Allocation',
                    leaf: true,
                    read: true,
                    iconCls: 'x-fa fa-exchange',
                    routeId: 'allocation'
                },
                {
                    text: 'Fabric Rolls',
                    view: 'inventory.fabric.Rolls',
                    leaf: true,
                    read: true,
                    iconCls: 'x-fa fa-dot-circle-o',
                    routeId: 'rolls'
                }
                */
            ]
            },
            {
                text: 'Reports',
                expanded: false,
                selectable: false,
                iconCls: 'x-fab fa-leanpub',
                routeId : 'reports',
                id:       'reports',
                children: [{
                    text: 'Lot Activities',
                    view: 'reports.inventory.LotActivity',
                    iconCls: 'x-fa fa-edit',
                    leaf: true,
                    read: true,
                    routeId: 'lotactivity'
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
                    text: 'Transactions',
                    view: 'reports.transaction.Layout',
                    iconCls: 'x-fa fa-edit',
                    leaf: true,
                    read: true,
                    routeId: 'layout'
                }]
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
