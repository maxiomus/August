Ext.define('August.view.production.style.edit.DetailModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.style-edit-detail',

    stores: {
        processtypes: {
            fields: ["id", "label"],
            //storeId: 'division',
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/WebApp/api/List/processtypes",
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },

                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        processlocs: {
            fields: ["label", "text"],
            //storeId: 'division',
            autoLoad: true,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/WebApp/api/List/processlocs",
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        processorders: {
            model: 'ProcessOrder',
            autoLoad: true,
            pageSize: 0,
            sorters: [{
                property: 'orderNo',
                direction: 'ASC'
            }]
        }
    }

});
