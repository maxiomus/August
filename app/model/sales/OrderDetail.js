Ext.define('August.model.sales.OrderDetail', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.identifier.Negative'
    ],

    fields: [
        { name: 'ID', type: 'int' },        
        { name: 'line', type: 'int' },
        { name: 'style', type: 'string' },
        { name: 'color', type: 'string' },        
        { name: 'warehouse', type: 'string' },
        { name: 'cancelDate', type: 'date', dateFormat: 'C' },
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
        { name: 'price', type: 'int' },
        { name: 'extPrice', type: 'float' },               
        { name: 'memo', type: 'string' },                       
        { name: 'userName', type: 'string', 
            mapping: 'create_user'
        },                       
        { name: 'userTime', type: 'date', dateFormat: 'C',
            mapping: 'create_time'
        },
        { name: 'cancelReason', type: 'string' },   
        { name: 'season', type: 'string' },   
        { name: 'promotion', type: 'string' },
        { name: 'invoiceNo', type: 'int', persist: false,
            mapping: 'invoiceno'
        },
        { name: 'bun1', type: 'number' },
        { name: 'bun2', type: 'number' },
        { name: 'bun3', type: 'number' },
        { name: 'bun4', type: 'number' },
        { name: 'bun5', type: 'number' },
        { name: 'bun6', type: 'number' },
        { name: 'bun7', type: 'number' },
        { name: 'bun8', type: 'number' },
        { name: 'bun9', type: 'number' },
        { name: 'bun10', type: 'number' },
        { name: 'bun11', type: 'number' },
        { name: 'bun12', type: 'number' },
        { name: 'bun13', type: 'number' },
        { name: 'bun14', type: 'number' },
        { name: 'bun15', type: 'number' },         
        { name: 'cancelReasonDate', type: 'date', dateFormat: 'C'  },
        { name: 'subDivision', type: 'string' },
        { name: 'systemUpdated', type: 'string' },        
        { name: 'salesrep1', type: 'string' },
        { name: 'salesrep2', type: 'string' },
        { name: 'comrate1', type: 'float' },
        { name: 'comrate2', type: 'float' },
        { name: 'poNo', type: 'int' },
        { name: 'allocQty', type: 'float', persist: false,
            mapping: 'alloc_qty'
        },
        { name: 'pickQty', type: 'float', persist: false,
            mapping: 'pick_qty'
        },
        { name: 'sosQty', type: 'float', persist: false,
            mapping: 'sos_qty'
        },
        { name: 'invQty', type: 'float', persist: false,
            mapping: 'inv_qty'
        },
        { name: 'totalBun', type: 'int' },
        { name: 'numOfBundle', type: 'int' },
        { name: 'bulk_sodid', type: 'int' },
        { name: 'soft_wip_alloc', type: 'string' },
        { name: 'refernce1', type: 'int' },
        { name: 'reference2', type: 'string' },
        { name: 'inv_unit1', type: 'int',
            mapping: 'invUnit1'
        },
        { name: 'inv_unit2', type: 'int',
            mapping: 'invUnit2'
        },
        { name: 'inv_unit3', type: 'int',
            mapping: 'invUnit3'
        },
        { name: 'inv_unit4', type: 'int',
            mapping: 'invUnit4'
        },
        { name: 'inv_unit5', type: 'int',
            mapping: 'invUnit5'
        },
        { name: 'inv_unit6', type: 'int',
            mapping: 'invUnit6'
        },
        { name: 'inv_unit7', type: 'int',
            mapping: 'invUnit7'
        },
        { name: 'inv_unit8', type: 'int',
            mapping: 'invUnit8'
        },
        { name: 'inv_unit9', type: 'int',
            mapping: 'invUnit9'
        },
        { name: 'inv_unit10', type: 'int',
            mapping: 'invUnit10'
        },
        { name: 'inv_unit11', type: 'int',
            mapping: 'invUnit11'
        },
        { name: 'inv_unit12', type: 'int',
            mapping: 'invUnit12'
        },
        { name: 'inv_unit13', type: 'int',
            mapping: 'invUnit13'
        },
        { name: 'inv_unit14', type: 'int',
            mapping: 'invUnit14'
        },
        { name: 'inv_unit15', type: 'int',
            mapping: 'invUnit15'
        }, 
        { name: 'newsono', type: 'int' }, 
        { name: 'customer_s', type: 'string' },  
        { name: 'customer_c', type: 'string' },  
        { name: 'location', type: 'string' },  
        { name: 'closed_date', type: 'date', dateFormat: 'C' },
        { name: 'closed_user', type: 'string' },
        { name: 'pp_approval', type: 'string' },
        { name: 'top_approval', type: 'string' },  
        { name: 'descript', type: 'string', persist: false },
        { name: 'invTotal', type: 'float', persist: false },  
        { name: 'invExtprice', type: 'float', persist: false },
        { name: 'allocno', type: 'int', persist: false },
        { name: 'pickno', type: 'int', persist: false },
        { name: 'sosno', type: 'int', persist: false },        
        { name: 'style_id', type: 'int', persist: false },           
        { name: 'style_price', type: 'float', persist: false },           
        { name: 'Bal_unit1', type: 'int', persist: false },
        { name: 'Bal_unit2', type: 'int', persist: false },
        { name: 'Bal_unit3', type: 'int', persist: false },
        { name: 'Bal_unit4', type: 'int', persist: false },
        { name: 'Bal_unit5', type: 'int', persist: false },
        { name: 'Bal_unit6', type: 'int', persist: false },
        { name: 'Bal_unit7', type: 'int', persist: false },
        { name: 'Bal_unit8', type: 'int', persist: false },
        { name: 'Bal_unit9', type: 'int', persist: false },
        { name: 'Bal_unit10', type: 'int', persist: false },
        { name: 'Bal_unit11', type: 'int', persist: false },
        { name: 'Bal_unit12', type: 'int', persist: false },
        { name: 'Bal_unit13', type: 'int', persist: false },
        { name: 'Bal_unit14', type: 'int', persist: false },
        { name: 'Bal_unit15', type: 'int', persist: false },
        { name: 'Size1', type: 'string', persist: false },
        { name: 'Size2', type: 'string', persist: false },
        { name: 'Size3', type: 'string', persist: false },
        { name: 'Size4', type: 'string', persist: false },
        { name: 'Size5', type: 'string', persist: false },
        { name: 'Size6', type: 'string', persist: false },
        { name: 'Size7', type: 'string', persist: false },
        { name: 'Size8', type: 'string', persist: false },
        { name: 'Size9', type: 'string', persist: false },
        { name: 'Size10', type: 'string', persist: false },
        { name: 'Size11', type: 'string', persist: false },
        { name: 'Size12', type: 'string', persist: false },
        { name: 'Size13', type: 'string', persist: false },
        { name: 'Size14', type: 'string', persist: false },
        { name: 'Size15', type: 'string', persist: false },
        { name: 'price1', type: 'number', persist: false },        
        { name: 'price2', type: 'number', persist: false },
        { name: 'price3', type: 'number', persist: false },
        { name: 'price4', type: 'number', persist: false },
        { name: 'price5', type: 'number', persist: false },
        {       
            name: 'orderNO',       
            type: 'int',            
            reference: {
                parent: 'sales.Order',

                field: 'orderno',
                inverse: 'salesorderitems'
            }
        }       
    ],

    idProperty: 'ID',
    identifier: 'negative',

    proxy: {
        type: 'rest',
        url: '/WebApp/api/SalesOrderItems',

        headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        },
        
        pageParam: '',
        startParam: '',
        limitParam: '',        

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

        //extraParams: {},

        listeners: {            
            exception: function (proxy, response, operation) {
                console.log('OrderDetail - Model', response, operation);
            }
        }
    }
});