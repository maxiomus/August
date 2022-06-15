Ext.define('August.view.sales.windows.PriceTagModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.windows-pricetag',

    requires: [
        //'August.model.style.LineSheet'        
    ],

    data: {
        priceSelected: false
    },

    stores: {
        pricetags: {
            storeId: 'pricetags',
            pageSize: 8,
            remoteFilter: true,
            proxy: {
                 type: 'memory',
                 enablePaging: true,
                 reader: {
                     type: 'json',
                     rootProperty: 'data'
                 }
            }
        },

        sodetails: {
            model: 'sales.UPC',
            storeId: 'sodetails',
            //autoLoad: true,

            //session: true,
            remoteFilter: true,
            //remoteSort: true,

            pageSize: 0,

            proxy: {
                type: 'rest',
                url: '/WebApp/api/SalesOrderItems/UPC',                

                pageParam: '',
                startParam: '',
                limitParam: '',

                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                    //totalProperty: 'total',
                    //successProperty: 'success'
                }
            },            

            listeners: {
                beforeload: function(s){
                    //JsBarcode(".barcode").init();

                    s.getProxy().setHeaders({
                        'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                    });
                },
                load: {
                    fn: 'onUpcLoad',
                    scope: this.controller
                }
            }
        }
    }
});