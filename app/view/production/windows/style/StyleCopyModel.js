Ext.define('August.view.production.windows.style.StyleCopyModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.windows-style-stylecopy',

    stores: {
        divisions: {
            fields: ["id", "text"],
            //storeId: 'division',
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: "ajax",
                url: "/WebApp/api/List/divisions",

                reader: {
                    type: "json",
                    rootProperty: "data"
                }
            }
        },

        sizeCats: {
            fields: ["id", "text"],
            //storeId: 'sizeCat',
            autoLoad: false,
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: '/WebApp/api/List/sizes',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    },

    formulas: {
        onDivision: {
            bind: {
                bindTo: '{selected}',
                deep: true
            },
            get: function(p){
                return p.data.division;
            }
        }
    }
});
