Ext.define('August.model.reports.invoice.StylesBySoType', {
    extend: 'August.model.Base',

    fields: [            
        { name: 'style', type: 'string' },
        { name: 'color', type: 'string' },        
        { name: 'descript', type: 'string' }, 
        { name: 'trans_type', type: 'string' },
        { name: 'category', type: 'string' },         
        { name: 'type1', type: 'string' },                        
        { name: 'cnt1', type: 'float' },
        { name: 'qty1', type: 'float' },
        { name: 'amt1', type: 'float' },
        { name: 'type2', type: 'string' },                        
        { name: 'cnt2', type: 'float' },
        { name: 'qty2', type: 'float' },
        { name: 'amt2', type: 'float' },
        { name: 'type3', type: 'string' },                        
        { name: 'cnt3', type: 'float' },
        { name: 'qty3', type: 'float' },
        { name: 'amt3', type: 'float' },
        { name: 'type4', type: 'string' },                        
        { name: 'cnt4', type: 'float' },
        { name: 'qty4', type: 'float' },
        { name: 'amt4', type: 'float' },
        { name: 'type5', type: 'string' },                        
        { name: 'cnt5', type: 'float' },
        { name: 'qty5', type: 'float' },
        { name: 'amt5', type: 'float' },
        { name: 'type6', type: 'string' },                        
        { name: 'cnt6', type: 'float' },
        { name: 'qty6', type: 'float' },
        { name: 'amt6', type: 'float' },
        { name: 'type7', type: 'string' },                        
        { name: 'cnt7', type: 'float' },
        { name: 'qty7', type: 'float' },
        { name: 'amt7', type: 'float' },
        { name: 'type8', type: 'string' },  
        { 
            name: 'cnt8', type: 'float', persist: false,
            calculate: function(data){
                var total = data.cnt1 + data.cnt2 + data.cnt3 + data.cnt4 + data.cnt5 + data.cnt6 + data.cnt7; 
                return total;
            }
        },
        { 
            name: 'qty8', type: 'float', persist: false,
            calculate: function(data){
                var total = data.qty1 + data.qty2 + data.qty3 + data.qty4 + data.qty5 + data.qty6 + data.qty7; 
                return total;
            }
        },        
        { name: 'ohs', type: 'float' },
        { name: 'pos', type: 'float' },
        { name: 'orders', type: 'float' },
        { 
            name: 'amt8', type: 'float', persist: false,            
            calculate: function(data){
                var total = data.amt1 + data.amt2 + data.amt3 + data.amt4 + data.amt5 + data.amt6 + data.amt7; 
                return total;
            }
        },
        { 
            name: 'ats', type: 'float', persist: false,
            calculate: function(data) {
                return data.ohs + data.pos - data.orders;
            }
        },
        { 
            name: 'wip', type: 'float', mapping: 'pos'
        },
        { name: 'availableDate', type: 'date' }
    ]
    
});
