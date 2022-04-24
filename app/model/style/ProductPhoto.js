/**
 * Created by tech on 9/23/2015.
 */

Ext.define('August.model.style.ProductPhoto', {
    extend: 'August.model.Base',

    fields: [           
        { 
            name: 'pid'
        },
        { name: 'name', type: 'string' },
        { name: 'type', type: 'string', allowNull: true },
        { name: 'size', type: 'string', allowNull: true },
        { name: 'path', type: 'string', allowNull: true },
        { name: 'order', type: 'int', allowNull: true },        
        { name: 'tag', type: 'string', allowNull: true }, 
        {
            name: 'id',
            reference: {
                parent: 'style.Product',
                //type: 'Product',
                //association: 'bomsByProduct',
                //role: 'product',
                field: 'id',
                inverse: 'photosInProducts'
            }
        }
    ],

    idProperty: 'pid',
    identifier: 'negative',

    proxy: {
        type: "rest",
        batchActions: true, // default false when rest proxy.
        url: "/WebApp/api/ProductPhotos",
        //true to have any request parameters sent as jsonData where they can be parsed from the raw request
        //paramsAsJson: true,
        //disableCaching: false,
        //noCache: false,
        reader: {
            type: "json",
            rootProperty: "data"
        },
    
        writer: {
            type: 'json',

            transform: function(data, request){
                if(request.getAction() == 'destroy'){
                    var newData = [];
                    Ext.each(request.getRecords(), function(rec, idx){
                        newData.push(rec.data);
                    });
                    data = newData;
                }

                //console.log(data, request)
                return data;
            },

            //clientIdProperty: 'clientId',
            //writeAllFields: true,

            allowSingle: false // set false to send a single record in array
        },

        listeners: {
            exception: function (proxy, response, operation) {
                console.log(response, operation);
            }
        }
    }
});
