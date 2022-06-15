Ext.define('August.view.inventory.pi.PhysicalModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.physical',

    requires: [
        'August.model.inventory.Physical'
    ],    

    stores: {

        physicals: {
            model: 'inventory.Physical',

            storeId: 'physicals',
            autoLoad: false,

            session: true,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 50,

            proxy: {
                type: 'rest',
                url: '/WebApp/api/PIs/',                
                
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
