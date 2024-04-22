Ext.define('August.model.shopify.ProductGQ', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        { name: 'cursor', type: 'string' },
        /*
        { 
            name: 'node', type: 'auto'
        },
        */        
        {   name: 'id', mapping: 'node.id' },
        {   name: 'handle', mapping: 'node.handle' },
        {   name: 'title', mapping: 'node.title' },
        {   name: 'status', mapping: 'node.status' },
        //{   name: 'descriptionHtml', mapping: 'node.descriptionHtml' },
        {   name: 'vendor', mapping: 'node.vendor' },
        {   name: 'mediaCount', mapping: 'node.mediaCount' },
        {   name: 'productCategory', mapping: 'node.productCategory' },
        {   name: 'productType', mapping: 'node.productType' },       
        {   name: 'totalInventory', mapping: 'node.totalInventory' },
        {   name: 'totalVariants', mapping: 'node.totalVariants' },
        {   name: 'createdAt', mapping: 'node.createdAt' },
        {   name: 'publishedAt', mapping: 'node.publishedAt' },    
        {   name: 'options', mapping: 'node.options' },
        {   name: 'variant', persist: false,
            mapping: function(data){
                //return data.node.customAttributes[0].key;
                var variants = data.node.variants.edges;
                if(variants.length > 0){
                    return variants[0].node;
                }
                //console.log(images);                
                return;
            }    
        },             
        {   name: 'image', persist: false,
            mapping: function(data){
                //return data.node.customAttributes[0].key;
                var images = data.node.images.edges;
                if(images.length > 0){
                    return images[0].node;
                }
                //console.log(images);                
                return;
            }    
        },
        {   name: 'mediaCount', mapping: 'node.mediaCount' },
        {   name: 'tags', mapping: 'node.tags' }
    ]
});