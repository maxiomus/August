Ext.define('August.view.inventory.transfer.FormModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.transfer-form',

    data: {
        selection: null
    },

    formulas: {
        setWHs: function(get) {
            return !Ext.isEmpty(get('theTransfer.fr_warehouse')) && !Ext.isEmpty(get('theTransfer.to_warehouse'));
        }
    },

    stores: {
        fromWHs: {
            fields: ['label', 'value'],
            // allow the grid to interact with the paging scroller by buffering
            //buffered: true,
            pageSize: 0,
            //numFromEdge: 5,
            //trailingBufferZone: 100,
            //leadingBufferZone: 100,
            autoLoad: true,
            //remoteFilter: true,

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

        toWHs: {
            source: '{fromWHs}'
        },

        pireasons: {
            fields: ['label', 'value'],
            // allow the grid to interact with the paging scroller by buffering
            //buffered: true,
            pageSize: 0,
            //numFromEdge: 5,
            //trailingBufferZone: 100,
            //leadingBufferZone: 100,
            autoLoad: true,
            //remoteFilter: true,

            proxy: {
                type: 'ajax',
                url: '/WebApp/api/List/pireasons',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    }

});
