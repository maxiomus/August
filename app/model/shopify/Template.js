Ext.define('August.model.shopify.Template', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        { name: 'handle', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'body', type: 'string' },
        { name: 'vendor', type: 'string' },
        { name: 'standard_product_type', type: 'string' },
        { name: 'custom_product_type', type: 'string' },
        { name: 'tags', type: 'string' },
        { name: 'published', type: 'bool' },
        { name: 'option1_name', type: 'string' },
        { name: 'option1_value', type: 'string' },
        { name: 'option2_name', type: 'string' },
        { name: 'option2_value', type: 'string' },
        { name: 'option3_name', type: 'string' },
        { name: 'option3_value', type: 'string' },
        { name: 'variant_SKU', type: 'string' },
        { name: 'variant_grams', type: 'string' },
        { name: 'variant_inventory_tracker', type: 'string' },
        { name: 'variant_inventory_qty', type: 'number' },
        { name: 'variant_inventory_policy', type: 'string' },
        { name: 'variant_fulfillment_service', type: 'string' },
        { name: 'variant_price', type: 'number' },
        { name: 'variant_compare_at_price', type: 'number' },
        { name: 'variant_requires_shipping', type: 'bool' },
        { name: 'variant_taxable', type: 'bool' },
        { name: 'variant_barcode', type: 'string' },
        { name: 'image_src', type: 'number' },
        { name: 'image_position', type: 'number' },
        { name: 'image_alt_text', type: 'string' },
        { name: 'gift_card', type: 'string' },
        { name: 'seo_title', type: 'string' },
        { name: 'seo_description', type: 'string' },
        { name: 'gs_google_product_category', type: 'string' },
        { name: 'gs_gender', type: 'string' },
        { name: 'gs_age_group', type: 'string' },
        { name: 'gs_MPN', type: 'string' },
        { name: 'gs_adWords_grouping', type: 'string' },
        { name: 'gs_adWords_labels', type: 'string' },
        { name: 'gs_condition', type: 'string' },
        { name: 'gs_custom_product', type: 'string' },
        { name: 'gs_custom_label_0', type: 'string' },
        { name: 'gs_custom_label_1', type: 'string' },
        { name: 'gs_custom_label_2', type: 'string' },
        { name: 'gs_custom_label_3', type: 'string' },
        { name: 'gs_custom_label_4', type: 'string' },
        { name: 'variant_image', type: 'string' },
        { name: 'variant_weight_unit', type: 'string' },
        { name: 'variant_tax_code', type: 'string' },
        { name: 'Cost per item', type: 'string' },
        { name: 'status', type: 'string' }
    ],

    //identifier: 'negative',

    validators: {
        //style: 'presence',
        //color: 'presence'        
    },

    listeners: {
        exception: function (proxy, response, operation) {
            console.log(response, operation);
        }
    }
});