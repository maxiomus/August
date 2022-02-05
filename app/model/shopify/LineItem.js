Ext.define('August.model.shopify.LineItem', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        { name: "fulfillable_quantity", type: 'int' },
        { name: "fulfillment_service", type: 'string' },
        { name: "fulfillment_status", type: 'string' },
        { name: "grams", type: 'number' },
        { name: "price", type: 'number' },
        { name: "product_id", type: 'number' },
        { name: "quantity", type: 'int' },
        { name: "requires_shipping", type: 'bool' },
        { name: "sku", type: 'string' },
        { name: "title", type: 'string' },
        { name: "variant_id", type: 'number' },
        { name: "variant_title", type: 'string' },
        { name: "name", type: 'string' },
        { name: "vendor", type: 'string' },
        { name: "gift_card", type: 'bool' },
        { name: "taxable", type: 'bool' },
        { name: "tax_lines", type: 'auto' },
        { name: "tip_payment_gateway", type: 'string' },
        { name: "tip_payment_method", type: 'string' },
        { name: "total_discount", type: 'number' },
        { name: "total_discount_set", type: 'auto' },
        { name: "discount_allocations", type: 'auto' },
        { name: "properties", type: 'auto' },
        { name: "variant_inventory_management", type: 'string' },
        { name: "product_exists", type: 'bool' },
        { name: "price_set", type: 'auto' },
        { name: "duties", type: 'auto' },
        { name: "origin_location", type: 'auto' },
        { name: "fulfillment_line_item_id", type: 'number' }
    ],

    identifier: 'negative',

    validators: {
        //style: 'presence',
        //color: 'presence'        
    }
});