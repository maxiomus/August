Ext.define('August.view.production.windows.style.web.ColorMappingModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.windows-style-colormapping',
    
    stores: {
        colormappings: {
            model: 'ColorMapping',

            autoLoad: true,
            session: true,
            //autoSync: false,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 50,

            proxy: {
                type: 'rest',
                url: '/WebApp/api/ColorMappings/',           
                   
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

        mappingColumns: {
            fields: ['label', 'value'],
            autoLoad: true   
        },

        customercolors: {
            fields: ['id', 'color', 'customer'],            
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: '/WebApp/api/List/customercolors', 

                pageParam: '',
                startParam: '',
                limitParam: '',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }      
        },

        colorCustomers: {
            fields: ['label', 'value'],
            autoLoad: true   
        }
    }

});
