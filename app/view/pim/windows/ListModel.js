Ext.define('August.view.pim.windows.ListModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.pim-windows-list',

    stores: {

        /*
        templatestyles: {
            source: '{products}'
        },        
        */
       
        liststyles: {
            model: 'style.Product',

            storeId: 'liststyles',
            autoLoad: false,

            session: true,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 100,

            proxy: {
                type: 'rest',
                url: '/WebApp/api/Products/List',           
                timeout: 120000,
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
        },           

        categories: {
            fields: ['label', 'field'],
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: 'resources/data/production/style/categories.json',
                reader: {
                    type: 'json'
                }
            }                            
        }        
    }

});
