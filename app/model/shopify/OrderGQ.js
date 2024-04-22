Ext.define('August.model.shopify.OrderGQ', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        { name: 'cursor', type: 'string' },
        { 
            name: 'node', type: 'auto'
        },        
        {   name: 'id', mapping: 'node.id' },
        {   name: 'name', mapping: 'node.name' },
        {   name: 'displayFinancialStatus', mapping: 'node.displayFinancialStatus' },
        {   name: 'displayFulfillmentStatus', mapping: 'node.displayFulfillmentStatus' },
        {   name: 'currentSubtotalLineItemsQuantity', mapping: 'node.currentSubtotalLineItemsQuantity' },
        {   name: 'createdAt', mapping: 'node.createdAt' },
        {   name: 'note', mapping: 'node.note' },
        {   name: 'customAttributes', mapping: 'node.customAttributes' },      
        {   name: 'customAttributes', persist: false,
            mapping: function(data){
                //return data.node.customAttributes[0].key;
                var order = data.node;
                var noteString = "";
                if(order.customAttributes.length > 0){
                    order.customAttributes.forEach(function(item){
                        noteString += item.key + ":" + item.value + "\r\n";
                    });                    
                }

                return noteString;
            }    
        },  
        {   name: 'fulfillments', persist: false,
            mapping: function(data){
                //return data.node.customAttributes[0].key;
                var order = data.node,
                    trackingInfo = "";
                
                if(order.fulfillments.length > 0){
                    order.fulfillments.forEach(function(item){
                        item.trackingInfo.forEach(function(info){
                            trackingInfo += info.company + " # " + info.number + "\r\n";
                        });
                    });                    
                }

                return trackingInfo;
            }    
        },  
        {   name: 'tags', mapping: 'node.tags' },
        {   name: 'customer', mapping: 'node.customer' },
        {   name: 'returnStatus', mapping: 'node.returnStatus' },
        {   name: 'shippingLine', mapping: 'node.shippingLine.title' },
        {   name: 'totalPriceSet', mapping: 'node.totalPriceSet' } 
    ]
});