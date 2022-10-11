Ext.define('August.view.reports.inventory.WarehouseasofModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.inventory-warehouseasof',
    
    stores: {
        inventories: {
            model: 'reports.inventory.WarehouseAsof',            
            // allow the grid to interact with the paging scroller by buffering
            //buffered: true,
            groupField: 'Style',
            pageSize: 0,
            //numFromEdge: 5,
            //trailingBufferZone: 100,
            //leadingBufferZone: 100,
            autoLoad: false,
            //remoteFilter: true,

            proxy: {
                type: 'ajax',
                url: '/WebApp/api/Reports/inventory/warehouse/asof',
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
            },
            listeners: {                
                beforeload: {
                    fn: 'onStoreBeforeLoad',
                    scope: this.controller
                },
                load: {
                    fn: 'onStoreLoad',
                    scope: this.controller
                }       
            }
        }
    }    

});
