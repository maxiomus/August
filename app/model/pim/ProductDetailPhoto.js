/**
 * Created by tech on 9/23/2015.
 */

Ext.define('August.model.pim.ProductDetailPhoto', {
    extend: 'August.model.Base',

    fields: [           
        { 
            name: 'id', type: 'int'
        },
        { name: 'name', type: 'string' },
        { name: 'type', type: 'string', allowNull: true },
        { name: 'size', type: 'string', allowNull: true },        
        { name: 'position', type: 'int', allowNull: true },        
        { name: 'tag', type: 'string', allowNull: true }, 
        {
            name: 'productId',
            reference: {
                parent: 'pim.ProductDetail',
                //type: 'Product',
                //association: 'bomsByProduct',
                //role: 'product',
                field: 'id',
                inverse: 'photosInProductDetails'
            }
        }
    ],

    idProperty: 'id',
    identifier: 'negative',

    proxy: {
        type: "rest",
        
        url: "/WebApp/api/ProductDetailPhotos",

        batchActions: true, // default false when rest proxy.
        //true to have any request parameters sent as jsonData where they can be parsed from the raw request
        //paramsAsJson: true,
        //disableCaching: false,
        //noCache: false,

        headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        },

        reader: {
            type: "json",
            rootProperty: "data"
        },
    
        writer: {
            type: 'json',            
            //clientIdProperty: 'clientId',
            writeAllFields: true,

            allowSingle: false // set false to send a single record in array
        },

        listeners: {
            exception: function (proxy, response, operation) {
                console.log(response, operation);
            }
        }
    }
});
