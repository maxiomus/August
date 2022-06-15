Ext.define('August.view.inventory.transfer.ListModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.transferList',

    requires: [
        'August.model.inventory.Transfer'
    ],    

    stores: {

        transfers: {
            model: 'inventory.Transfer',

            storeId: 'transfers',
            autoLoad: false,

            session: true,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 50,

            proxy: {
                type: 'rest',
                url: '/WebApp/api/TRANSFERHs/',                
                
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                    //totalProperty: 'total',
                    //successProperty: 'success'
                }
            },

            listeners: {
                beforeload: function(s){                    
                    s.getProxy().setHeaders({
                        'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                    })
                }
            }
        }
    }
});
