Ext.define('August.view.sales.pick.TicketModel', {
    extend: 'Ext.app.ViewModel',
    
    alias: 'viewmodel.pick-ticket',

    requires: [
        
    ],

    stores: {

        picktickets: {
            model: 'pick.Header',

            storeId: 'picktickets',
            autoLoad: false,

            session: true,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 50,

            proxy: {
                type: 'rest',
                url: '/WebApp/api/PickHs',           
                   
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
