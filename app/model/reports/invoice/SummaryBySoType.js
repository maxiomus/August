Ext.define('August.model.reports.invoice.SummaryBySoType', {
    extend: 'August.model.Base',

    fields: [            
        { name: 'division', type: 'string' },
        { name: 'sotype', type: 'string' },        
        { name: 'C1', type: 'float' },
        { name: 'C2', type: 'float' },
        { name: 'C3', type: 'float' },
        { name: 'C4', type: 'float' },
        { name: 'C5', type: 'float' },
        { name: 'C6', type: 'float' },
        { name: 'C7', type: 'float' },
        { name: 'C8', type: 'float' },
        { name: 'C9', type: 'float' },
        { name: 'C10', type: 'float' },
        { name: 'C11', type: 'float' },
        { name: 'C12', type: 'float' },
        { name: 'total', type: 'float' },
        { name: 'subtotal', type: 'float' },        
        { name: 'number_invoice', type: 'float' },
        { name: 'soqty', type: 'float' },
        { name: 'soamt', type: 'float' },
        { name: 'invqty', type: 'float' },
        { name: 'invamt', type: 'float' },
        { name: 'invfreight', type: 'float' },
        { name: 'cancelqty', type: 'float' },
        { name: 'cancelamt', type: 'float' },        
        { 
            name: 'percentage', type: 'float', persist: false
        },
        { 
            name: 'P1', type: 'float', persist: false,
            calculate: function(d){
                var b;
                if(d.subtotal != null & d.number_invoice != null){
                    b = d.subtotal / d.number_invoice;
                }

                return b;
            } 
        },
        { 
            name: 'P2', type: 'float', persist: false
        },
        { 
            name: 'P3', type: 'float', persist: false
        
        },
        { 
            name: 'P4', type: 'float', persist: false
    
        },
        { 
            name: 'P5', type: 'float', persist: false
    
        },
        { 
            name: 'P6', type: 'float', persist: false
    
        },
        { 
            name: 'P7', type: 'float', persist: false
         
        },
        { 
            name: 'P8', type: 'float', persist: false
    
        },
        { 
            name: 'P9', type: 'float', persist: false
    
        },
        { 
            name: 'P10', type: 'float', persist: false
    
        },
        { 
            name: 'P11', type: 'float', persist: false
    
        },
        { 
            name: 'P12', type: 'float', persist: false
    
        },
        { 
            name: 'avgInvAmt', type: 'float', persist: false,
            calculate: function(d){
                var b;
                if(d.subtotal != null & d.number_invoice != null){
                    b = d.number_invoice != 0 ? d.subtotal / d.number_invoice : 0;
                }

                return b;
            }
        },
        { 
            name: 'invPercent', type: 'float', persist: false,
            calculate: function(d){
                var b;
                if(d.invamt != null & d.soamt != null){
                    b = d.soamt != 0 ? (d.invamt / d.soamt) * 100 : 0;
                }

                return b;
            }
        },
        { 
            name: 'invTotal', type: 'float', persist: false,
            calculate: function(d){
                var b;
                if(d.invamt != null & d.invfreight != null){
                    b = d.invamt + d.invfreight;
                }

                return b;
            }
        }
    ],

    idProperty: 'invoiceno',
    identifier: 'negative',

    proxy: {
        type: 'rest',
        url: '/WebApp/api/Invoices',

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
                changes: true,
                critical: true,
                associated: true
            },
            //clientIdProperty: 'clientId',
            writeAllFields: false,
            
            allowSingle: false // set false to send a single record in array
        },

        //extraParams: {},

        listeners: {
            exception: function (proxy, response, operation) {
                console.log('invoicesH - Model', response, operation);
            }
        }
    }
});

function tr(value, record){
    return Ext.String.trim(value);
};