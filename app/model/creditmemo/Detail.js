Ext.define('August.model.creditmemo.Detail', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [        
        { name: 'invoiceNO', type: 'int' },
        //{ name: 'cmno', type: 'int' },
        { name: 'line', type: 'int' },
        { name: 'style', type: 'string' },
        { name: 'color', type: 'string' },
        { name: 'id', type: 'int' },
        { name: 'warehouse', type: 'string' },
        { name: 'unit1', type: 'float' },
        { name: 'unit2', type: 'float' },
        { name: 'unit3', type: 'float' },
        { name: 'unit4', type: 'float' },
        { name: 'unit5', type: 'float' },
        { name: 'unit6', type: 'float' },
        { name: 'unit7', type: 'float' },
        { name: 'unit8', type: 'float' },
        { name: 'unit9', type: 'float' },
        { name: 'unit10', type: 'float' },
        { name: 'unit11', type: 'float' },
        { name: 'unit12', type: 'float' },
        { name: 'unit13', type: 'float' },
        { name: 'unit14', type: 'float' },
        { name: 'unit15', type: 'float' },
        { name: 'unit16', type: 'float' },
        { name: 'unit17', type: 'float' },
        { name: 'unit18', type: 'float' },
        { name: 'unit19', type: 'float' },
        { name: 'unit20', type: 'float' },
        { name: 'unit21', type: 'float' },
        { name: 'unit22', type: 'float' },
        { name: 'unit23', type: 'float' },
        { name: 'unit24', type: 'float' },
        { name: 'unit25', type: 'float' },
        { name: 'unit26', type: 'float' },
        { name: 'unit27', type: 'float' },
        { name: 'unit28', type: 'float' },
        { name: 'unit29', type: 'float' },
        { name: 'unit30', type: 'float' },
        { name: 'price', type: 'float' },
        { name: 'totalUnit', type: 'float' },
        { name: 'extPrice', type: 'float' },
        { name: 'taxable', type: 'string' },
        { name: 'taxRate', type: 'float' },
        { name: 'sono', type: 'int' },
        { name: 'sosno', type: 'int' },
        { name: 'memo', type: 'string' },
        { name: 'pcsPerBundle', type: 'int' },
        { name: 'bundlePerBox', type: 'int' },
        { name: 'pcsPerBox', type: 'int' },
        { name: 'numbox', type: 'int' },
        { name: 'userName', type: 'string' },
        { name: 'userTime', type: 'date', dateFormat: 'c' },
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
        { name: 'rano', type: 'int' },
        { name: 'radid', type: 'int' },
        { name: 'salesrep1', type: 'string' },
        { name: 'salesrep2', type: 'string' },
        { name: 'comrate1', type: 'float' },
        { name: 'comrate2', type: 'float' },
        { name: 'originalUnit1', type: 'float' },
        { name: 'originalUnit2', type: 'float' },
        { name: 'originalUnit3', type: 'float' },
        { name: 'originalUnit4', type: 'float' },
        { name: 'originalUnit5', type: 'float' },
        { name: 'originalUnit6', type: 'float' },
        { name: 'originalUnit7', type: 'float' },
        { name: 'originalUnit8', type: 'float' },
        { name: 'originalUnit9', type: 'float' },
        { name: 'originalUnit10', type: 'float' },
        { name: 'originalUnit11', type: 'float' },
        { name: 'originalUnit12', type: 'float' },
        { name: 'originalUnit13', type: 'float' },
        { name: 'originalUnit14', type: 'float' },
        { name: 'originalUnit15', type: 'float' },
        { name: 'originalTotalUnit', type: 'float' },
        { name: 'deletedInvoiceNo', type: 'int' },
        { name: 'damagereason', type: 'string' },
        { name: 'bundle', type: 'string' },
        { name: 'totalbun', type: 'int' },
        { name: 'sold_invoiceno', type: 'int' },
        { name: 'Intlcurrency', type: 'string' },
        { name: 'Intlprice', type: 'float' },
        { name: 'Intlextprice', type: 'float' },
        { name: 'cmreason', type: 'string' },
        { name: 'avgcost', type: 'float' },
        { name: 'numOfBundle', type: 'int' },
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
        { name: 'ohs', type: 'float', persist: false },
        { name: 'price5', type: 'float', persist: false },
        { name: 'style_price', type: 'float', persist: false },
        { name: 'sod_totalUnit', type: 'float', persist: false },
        { name: 'sod_cancelDate', type: 'date', persist: false },
        { name: 'sod_type', type: 'string', persist: false },        
        {            
            //When associate models,
            //model name with Id prefixed.
            //ex. pihId
            //or using field...
             
            name: 'cmno',
            reference: {
                parent: 'creditmemo.Header',    
                            
                field: 'CMNO',
                inverse: 'INVDs'
            }
        }
        
    ],

    idProperty: 'id',
    identifier: 'negative',
    
    proxy: {
        type: 'rest',
        url: '/WebApp/api/InvoiceItems',

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
            writeAllFields: false,
            allowSingle: false // set false to send a single record in array
        },        

        listeners: {
            exception: function (proxy, response, operation) {
                console.log('invoiceD - Model', response, operation);
            }
        }
    }
    
});

function tr(value, record){
    return Ext.String.trim(value);
}
