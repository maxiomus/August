Ext.define('August.model.shopify.Product', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        { name: "id", type: 'int' },
        { name: "title", type: 'string' },
        { name: "body_html", type: 'string' },
        { name: "vendor", type: 'string' },
        { name: "product_type", type: 'string' },
        { name: "created_at", type: 'string' },
        { name: "handle", type: 'string' },        
        { name: 'type', mapping: 'file.type'},        
        { name: "updated_at", type: 'date' },
        { name: "published_at", type: 'date' },
        { name: "template_suffix", type: 'string' },
        { name: "status", type: 'string' },
        { name: "published_scope", type: 'string' },
        { name: "tags", type: 'string' }
    ],

    idProperty: 'id',
    identifier: 'negative',    

    validators: {
        //style: 'presence',
        //color: 'presence'        
    }
});