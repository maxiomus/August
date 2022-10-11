Ext.define('August.model.pick.Detail', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [        
        { name: 'id', type: 'int' },
        { name: 'style', type: 'string' },
        { name: 'color', type: 'string' },        
        { name: 'bundle', type: 'string' },
        { name: 'pcsPerBundle', type: 'int' },
        { name: 'bundlePerBox', type: 'int' },
        { name: 'pcsPerBox', type: 'int' },
        { name: 'numBox', type: 'int' },
        { name: 'memo', type: 'string' },
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
        { name: 'totalUnit', type: 'int' },
        { name: 'price', type: 'number' },
        { name: 'status', type: 'string' },
        { name: 'sono', type: 'int' },        
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
        { name: 'sodid', type: 'int' },
        { name: 'allocno', type: 'int' },
        { name: 'line', type: 'int' },
        { name: 'warehouse', type: 'string' },
        { name: 'systemupdate', type: 'int' },
        { name: 'descript', type: 'string', persist: false },
        { name: 'size1', type: 'string', persist: false },
        { name: 'size2', type: 'string', persist: false },
        { name: 'size3', type: 'string', persist: false },
        { name: 'size4', type: 'string', persist: false },
        { name: 'size5', type: 'string', persist: false },
        { name: 'size6', type: 'string', persist: false },
        { name: 'size7', type: 'string', persist: false },
        { name: 'size8', type: 'string', persist: false },
        { name: 'size9', type: 'string', persist: false },
        { name: 'size10', type: 'string', persist: false },
        { name: 'size11', type: 'string', persist: false },
        { name: 'size12', type: 'string', persist: false },
        { name: 'size13', type: 'string', persist: false },
        { name: 'size14', type: 'string', persist: false },
        { name: 'size15', type: 'string', persist: false },
        {       
            name: 'pickno',       
            type: 'int',            
            reference: {
                parent: 'pick.Header',

                field: 'pickno',
                inverse: 'PickDs'
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
        url: '/WebApp/api/PickDs',

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
            allDataOptions: {
                persist: false,
                associated: true
            },
            partialDataOptions: {
                changes: false,
                critical: true,
                associated: true
            },
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