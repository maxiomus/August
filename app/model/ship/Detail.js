Ext.define('August.model.ship.Detail', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [        
        { name: 'orderNO', type: 'int' },
        { name: 'line', type: 'int' },
        { name: 'style', type: 'string' },
        { name: 'color', type: 'string' },
        { name: 'warehouse', type: 'string' },
        { name: 'cancelDate', type: 'date', dateFormat: 'c' },
        { name: 'status', type: 'string' },
        { name: 'bundle', type: 'string' },
        { name: 'pcsPerBundle', type: 'int' },
        { name: 'bundlePerBox', type: 'int' },
        { name: 'pcsPerBox', type: 'int' },
        { name: 'numBox', type: 'int' },
        { name: 'unit1', type: 'number' },
        { name: 'unit2', type: 'number' },
        { name: 'unit3', type: 'number' },
        { name: 'unit4', type: 'number' },
        { name: 'unit5', type: 'number' },
        { name: 'unit6', type: 'number' },
        { name: 'unit7', type: 'number' },
        { name: 'unit8', type: 'number' },
        { name: 'unit9', type: 'number' },
        { name: 'unit10', type: 'number' },
        { name: 'unit11', type: 'number' },
        { name: 'unit12', type: 'number' },
        { name: 'unit13', type: 'number' },
        { name: 'unit14', type: 'number' },
        { name: 'unit15', type: 'number' },
        { name: 'unit16', type: 'number' },
        { name: 'unit17', type: 'number' },
        { name: 'unit18', type: 'number' },
        { name: 'unit19', type: 'number' },
        { name: 'unit20', type: 'number' },
        { name: 'unit21', type: 'number' },
        { name: 'unit22', type: 'number' },
        { name: 'unit23', type: 'number' },
        { name: 'unit24', type: 'number' },
        { name: 'unit25', type: 'number' },
        { name: 'unit26', type: 'number' },
        { name: 'unit27', type: 'number' },
        { name: 'unit28', type: 'number' },
        { name: 'unit29', type: 'number' },
        { name: 'unit30', type: 'number' },
        { name: 'totalUnit', type: 'number' },
        { name: 'price', type: 'number' },
        { name: 'extPrice', type: 'number' },
        { name: 'memo', type: 'string' },
        { name: 'userName', type: 'string' },
        { name: 'userTime', type: 'date', dateFormat: 'c' },
        { name: 'cancelReason', type: 'string' },
        { name: 'season', type: 'string' },
        { name: 'promotion', type: 'string' },
        { name: 'invoiceNO', type: 'int' },
        { name: 'ID', type: 'int' },        
        { name: 'bun1', type: 'int' },
        { name: 'bun2', type: 'int' },
        { name: 'bun3', type: 'int' },
        { name: 'bun4', type: 'int' },
        { name: 'bun5', type: 'int' },
        { name: 'bun6', type: 'int' },
        { name: 'bun7', type: 'int' },
        { name: 'bun8', type: 'int' },
        { name: 'bun9', type: 'int' },
        { name: 'bun10', type: 'int' },
        { name: 'bun11', type: 'int' },
        { name: 'bun12', type: 'int' },
        { name: 'bun13', type: 'int' },
        { name: 'bun14', type: 'int' },
        { name: 'bun15', type: 'int' },
        { name: 'po_receive_no', type: 'int' },
        { name: 'pono', type: 'int' },
        { name: 'sodid', type: 'int' },
        { name: 'inventoryid', type: 'int' },
        { name: 'pickno', type: 'int' },
        { name: 'spno', type: 'int' },
        {       
            name: 'sosno',       
            type: 'int',            
            reference: {
                parent: 'ship.Header',

                field: 'sosno',
                inverse: 'ShipDs'
            }
        }                           
    ],

    idProperty:  'id',
    identifier: 'negative',
    
    validators: {
        pickno: 'presence',
        style: 'presence',
        color: 'presence'
    },    
    
    proxy: {
        type: 'rest',
        url: '/WebApp/api/ShipDs',

        pageParam: '',
        startParam: '',
        limitParam: '',

        headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        },
        
        reader: {
            type: 'json',
            rootProperty: 'data'
        },

        writer: {
            type: 'json',
            // save nested (associated) data...            
            //clientIdProperty: 'clientId',
            writeAllFields: false,
            allowSingle: false // set false to send a single record in array
        },

        listeners: {
            exception: function (proxy, response, operation) {
                console.log(response, operation);
            }
        }
    }
});