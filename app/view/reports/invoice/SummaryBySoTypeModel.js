Ext.define('August.view.reports.invoice.SummaryBySoTypeModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.invoice-summarybysotype',

    stores: {
        invoicesummaries: {
            model: 'reports.invoice.SummaryBySoType',            
            // allow the grid to interact with the paging scroller by buffering
            //buffered: true,
            groupField: 'sotype',
            pageSize: 0,
            //numFromEdge: 5,
            //trailingBufferZone: 100,
            //leadingBufferZone: 100,
            autoLoad: false,
            //remoteFilter: true,

            proxy: {
                type: 'ajax',
                url: '/WebApp/api/Reports/invoice/Summaries/sotype',
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
