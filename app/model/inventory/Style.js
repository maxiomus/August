Ext.define('August.model.inventory.Style', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [        
        { name: 'id', type: 'int' },
        { name: 'style', type: 'string' },
        { name: 'color', type: 'string' },        
        { name: 'descript', type: 'string' },
        { name: 'division', type: 'string' },
        { name: 'season', type: 'string' },
        { name: 'category', type: 'string' },
        { name: 'sizeCat', type: 'string' },
        { name: 'status', type: 'string' },
        { name: 'availabledate', type: 'date', dateFormat: 'c' },                   
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
        { name: 'totalUnit', type: 'number' },        
        //{ name: 'lotno', type: 'string' },
        //{ name: 'memo', type: 'string' },
        { name: 'cost', type: 'number' },
        { name: 'price1', type: 'number' },
        { name: 'bundle', type: 'string' },
        { name: 'numOfBundle', type: 'int' },                
        { name: 'binlocation', type: 'string' },           
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
        { name: 'fwh_oh1', type: 'number', persist: false },
        { name: 'fwh_oh2', type: 'number', persist: false },
        { name: 'fwh_oh3', type: 'number', persist: false },
        { name: 'fwh_oh4', type: 'number', persist: false },
        { name: 'fwh_oh5', type: 'number', persist: false },
        { name: 'fwh_oh6', type: 'number', persist: false },
        { name: 'fwh_oh7', type: 'number', persist: false },
        { name: 'fwh_oh8', type: 'number', persist: false },
        { name: 'fwh_oh9', type: 'number', persist: false },
        { name: 'fwh_oh10', type: 'number', persist: false },
        { name: 'fwh_oh11', type: 'number', persist: false },
        { name: 'fwh_oh12', type: 'number', persist: false },
        { name: 'fwh_oh13', type: 'number', persist: false },
        { name: 'fwh_oh14', type: 'number', persist: false },
        { name: 'fwh_oh15', type: 'number', persist: false },
        { name: 'fwh_ohs', type: 'number', persist: false },
        { name: 'twh_oh1', type: 'number', persist: false },
        { name: 'twh_oh2', type: 'number', persist: false },
        { name: 'twh_oh3', type: 'number', persist: false },
        { name: 'twh_oh4', type: 'number', persist: false },
        { name: 'twh_oh5', type: 'number', persist: false },
        { name: 'twh_oh6', type: 'number', persist: false },
        { name: 'twh_oh7', type: 'number', persist: false },
        { name: 'twh_oh8', type: 'number', persist: false },
        { name: 'twh_oh9', type: 'number', persist: false },
        { name: 'twh_oh10', type: 'number', persist: false },
        { name: 'twh_oh11', type: 'number', persist: false },
        { name: 'twh_oh12', type: 'number', persist: false },
        { name: 'twh_oh13', type: 'number', persist: false },
        { name: 'twh_oh14', type: 'number', persist: false },
        { name: 'twh_oh15', type: 'number', persist: false },
        { name: 'twh_ohs', type: 'number', persist: false },  
        { name: 'extPrice', type: 'number', 
            mapping: function(data){
                return data.price * data.totalUnit;
            }    
        }
        
    ],

    idProperty: 'id',
    identifier: 'negative',
    
    proxy: {
        type: 'rest',
        url: '/WebApp/api/Products/Transfer',

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
            //clientIdProperty: 'clientId',
            //writeAllFields: true,
            allowSingle: false // set false to send a single record in array
        },        

        listeners: {
            exception: function (proxy, response, operation) {
                console.log('TransferD - Model', response, operation);
            }
        }
    }
    
});

function tr(value, record){
    return Ext.String.trim(value);
}
