Ext.define('August.model.shopify.Customer', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        { name: 'id', type: 'number' },        
        { name: "accepts_marketing", type: 'bool' },
        //{ name: "accepts_marketing_updated_at", type: 'date' },
        //{ name: "marketing_opt_in_level", type: 'string' },
        { name: "addresses", type: 'auto' },
        { name: "created_at", type: 'date' },
        //{ name: "product_id", type: 'number' },
        { name: "currency", type: 'string' },
        { name: "default_address", type: 'auto' },
        { name: "email", type: 'string' },
        { name: "first_name", type: 'string' },        
        { name: "last_name", type: 'string' },
        { name: "last_order_id", type: 'number' },
        { name: "last_order_name", type: 'string' },
        { name: "metafields", type: 'auto' },
        { name: "multipass_identifier", type: 'string' },
        { name: "note", type: 'string' },
        { name: "orders_count", type: 'int' },
        { name: "phone", type: 'string' },
        { name: "state", type: 'string' },
        { name: "tags", type: 'string' },
        { name: "tax_exempt", type: 'bool' },
        { name: "tax_exemptions", type: 'auto' },
        { name: "total_spent", type: 'number' },
        { name: "updated_at", type: 'date' },
        { name: "verified_email", type: 'bool' },
        //{ name: "sms_marketing_consent", type: 'auto' }        
    ],

    identifier: 'negative',

    validators: {
        //style: 'presence',
        //color: 'presence'        
    }
});