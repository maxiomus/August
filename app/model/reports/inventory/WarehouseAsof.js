Ext.define('August.model.reports.inventory.WarehouseAsof', {
    extend: 'August.model.Base',

    fields: [                    
        { name: 'style', type: 'string' },        
        { name: 'color', type: 'string' },        
        { name: 'warehouse', type: 'string' },        
        { name: 'date', type: 'date' },        
        { name: 'descript', type: 'string' },        
        { name: 'grp', type: 'string' },                
        { name: 'season', type: 'string' },        
        { name: 'type', type: 'string' },        
        { name: 'status', type: 'string' },        
        { name: 'division', type: 'string' },
        { name: 'sizeCat', type: 'string' },
        { name: 'oh1', type: 'float' },
        { name: 'oh2', type: 'float' },
        { name: 'oh3', type: 'float' },
        { name: 'oh4', type: 'float' },
        { name: 'oh5', type: 'float' },
        { name: 'oh6', type: 'float' },
        { name: 'oh7', type: 'float' },
        { name: 'oh8', type: 'float' },
        { name: 'oh9', type: 'float' },
        { name: 'oh10', type: 'float' },
        { name: 'oh11', type: 'float' },
        { name: 'oh12', type: 'float' },
        { name: 'oh13', type: 'float' },
        { name: 'oh14', type: 'float' },
        { name: 'oh15', type: 'float' },
        { name: 'ohs', type: 'float' },
        { name: 'Size1', type: 'string' },
        { name: 'Size2', type: 'string' },
        { name: 'Size3', type: 'string' },
        { name: 'Size4', type: 'string' },
        { name: 'Size5', type: 'string' },
        { name: 'Size6', type: 'string' },
        { name: 'Size7', type: 'string' },
        { name: 'Size8', type: 'string' },
        { name: 'Size9', type: 'string' },
        { name: 'Size10', type: 'string' },
        { name: 'Size11', type: 'string' },
        { name: 'Size12', type: 'string' },
        { name: 'Size13', type: 'string' },
        { name: 'Size14', type: 'string' },
        { name: 'Size15', type: 'string' },                
        { name: 'cost', type: 'float' },        
        { name: 'price', type: 'float' },
        { 
            name: 'extCost', type: 'float', persist: false,
            calculate: function(d){
                var b = 0;
                if(d.ohs != null & d.cost != null){
                    b = d.ohs * d.cost;
                }

                return b;
            }
        },        
        { 
            name: 'extPrice', type: 'float', persist: false,
            calculate: function(d){
                var b = 0;
                if(d.ohs != null & d.price != null){
                    b = d.ohs * d.price;
                }

                return b;
            }
        },
        { name: 'sm_ohs', type: 'float' },
        { name: 'avgcost', type: 'float' },
        { name: 'actual_cost', type: 'float' }
    ],

    summary: {
        totalOh1: {
            field: 'oh1',
            summary: 'sum' 
        }
    }
});
