Ext.define('August.view.reports.inventory.AgingIntervalModel', {
    extend: 'Ext.app.ViewModel',
    
    alias: 'viewmodel.inventory-aginginterval',
    
    stores: {
        inventoryagings: {
            fields: [
                'division',
                'warehouse',
                'style',
                'color',
                'descript',
                'status',
                'season',
                'grp',
                'price',
                'cost',
                'ots',
                '1','2','3','4','5','6','7'
            ],
            // allow the grid to interact with the paging scroller by buffering
            //buffered: true,
            pageSize: 0,
            //numFromEdge: 5,
            //trailingBufferZone: 100,
            //leadingBufferZone: 100,
            autoLoad: false,
            //remoteFilter: true,
    
            proxy: {
                type: 'ajax',
                url: '/WebApp/api/Reports/inventory/Aging/inteval',
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
                /*
                beforeload: {
                    fn: '',
                    scope: this.controller
                }
                */
            }
        }        
    }

});
