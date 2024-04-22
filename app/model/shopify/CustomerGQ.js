Ext.define('August.model.shopify.CustomerGQ', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        { name: 'id', type: 'number' },                        
        { name: "addresses", type: 'auto' },
        { name: "amountSpent", type: 'auto' },
        { name: "averageOrderAmountV2", type: 'auto' },
        { name: "canDelete", type: 'bool' },
        { name: "createdAt", type: 'date' },          
        { name: "defaultAddress", type: 'auto' },
        { name: "displayName", type: 'string' },                      
        { name: "email", type: 'string' },        
        { name: "emailMarketingConsent", type: 'auto' },
        { name: "firstName", type: 'string' },          
        { name: "hasTimelineComment", type: 'bool' },
        { name: "image", type: 'auto' },  
        { name: "lastName", type: 'string' },
        { name: "lastOrder", type: 'number' },        
        { name: "legacyResourceId", type: 'string' },
        { name: "lifetimeDuration", type: 'string' },
        { name: "locale", type: 'string' },
        { name: "market", type: 'auto' },
        { name: "metafield", type: 'auto' },
        { name: "multipassIdentifier", type: 'string' },
        { name: "note", type: 'string' },
        { name: "numberOforders", type: 'int' },
        { name: "phone", type: 'string' },
        { name: "productSubscriberStatus", type: 'string' },
        { name: "smsMarketingConsent", type: 'string' },
        { name: "state", type: 'string' },
        { name: "statistics", type: 'string' },
        { name: "tags", type: 'string' },
        { name: "taxExempt", type: 'bool' },
        { name: "taxExemptions", type: 'auto' },
        { name: "unsubscriibedUrl", type: 'string' },
        { name: "updatedAt", type: 'date' },
        { name: "validEmailAddress", type: 'bool' },
        { name: "verifiedEmail", type: 'bool' }           
    ],

    identifier: 'negative',

    validators: {
        //style: 'presence',
        //color: 'presence'        
    }
});