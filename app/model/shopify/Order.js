Ext.define('August.model.shopify.Order', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        { name: "id", type: 'int' },
        { name: "app_id", type: 'int' },
        { name: "billing_address", type: 'auto' },
        { name: "browser_ip", type: 'string' },
        { name: "buyer_accepts_marketing", type: 'bool', allowNull: true },
        { name: "cancel_reason", type: 'string' },
        { name: "cancelled_at", type: 'date' },
        { name: "cart_token", type: 'string' },
        { name: "checkout_id", type: 'int' },
        { name: "checkout_token", type: 'string' },
        { name: "client_details", type: 'auto' },
        { name: "closed_at", type: 'date' },
        { name: "confirmed", type: 'bool', allowNull: true },
        { name: "contact_email", type: 'string' },
        { name: "created_at", type: 'date' },
        { name: "currency", type: 'string' },
        { name: "customer", type: 'auto' },
        { name: "customer_locale", type: 'string' },
        { name: "device_id", type: 'number' },
        { name: "discount_codes", type: 'auto' },
        { name: "discount_applications", type: 'auto' },
        { name: "email", type: "string" },
        { name: "financial_status", type: "string" },
        { name: "fulfillment_status", type: "string" },
        { name: "phone", type: "string" },
        { name: "tags", type: "string" },
        { name: "landing_site", type: "string" },
        { name: "line_items", type: "auto" },        
        { name: "location_id", type: "string" },
        { name: "name", type: "string" },
        { name: "note", type: "string" },
        { name: "note_attributes", type: "auto" },
        { name: "number", type: "int" },
        { name: "order_number", type: 'int' },
        { name: "order_status_url", type: 'string' },
        { name: "payment_gateway_names", type: 'auto' },                      
        { name: "processed_at", type: "string" },
        { name: "processing_method", type: "string" },        
        { name: "referring_site", type: "string" },
        { name: "refunds", type: "auto" },
        { name: "shipping_address", type: "auto" },
        { name: "shipping_lines", type: "auto" },        
        { name: "source_name", type: "string" },        
        { name: "subtotal_price", type: "number" },        
        { name: "tax_lines", type: "auto" },
        { name: "taxes_included", type: 'bool' },
        { name: "test", type: 'bool' },
        { name: "token", type: "string" },
        { name: "total_discounts", type: "number" },        
        { name: "total_line_items_price", type: "number" },
        { name: "total_tip_received", type: "number" },
        { name: "total_price", type: "number" },            
        { name: "total_tax", type: "number" },              
        { name: "total_weight", type: 'number' },
        { name: "updated_at", type: "date" },
        { name: "user_id", type: 'number' },
        { name: "transactions", type: "auto" },
        { name: "metafields", type: "auto" },
        { name: "current_total_duties_set", type: "auto" },
        { name: "original_total_duties_set", type: "auto" },
        { name: "total_line_items_price_set", type: "auto" },
        { name: "total_discounts_set", type: "auto" },
        { name: "total_shipping_price_set", type: "auto" },
        { name: "subtotal_price_set", type: "auto" },
        { name: "total_price_set", type: "auto" },
        { name: "total_outstanding", type: "string" },
        { name: "total_tax_set", type: "auto" },
        { name: "estimated_taxes", type: "bool" },
        { name: "current_subtotal_price", type: "number" },
        { name: "current_subtotal_price_set", type: "auto" },
        { name: "current_total_discounts", type: "number" },
        { name: "current_total_discounts_set", type: "auto" },
        { name: "current_total_price", type: "number" },
        { name: "current_total_price_set", type: "auto" },
        { name: "current_total_tax", type: "number" },
        { name: "current_total_tax_set", type: "auto" },
        { name: "payment_terms", type: "auto" },
        { name: 'note_modified', type: 'string', persist: false,
            mapping: function(data){
                return (data.note != null ? data.note : "") + (data.note_attributes.length > 0 ? data.note_attributes[0].name + ":" + data.note_attributes[0].value : "");
            }    
        },
        { name: 'customerName', type: 'string', persist: false,
            mapping: function(data){
                return data.customer != null ? data.customer.first_name + " " + data.customer.last_name : "";
            }    
        },
        { name: 'itemsCount', type: 'int', persist: false,
            mapping: function(data){
                return data.line_items.length;
            }    
        },
        { name: 'deliveryMethod', type: 'string', persist: false,
            mapping: function(data){
                return data.shipping_lines.length > 0 ? data.shipping_lines[0].title : "";
            }    
        }

    ],

    identifier: 'negative',

    validators: {
        //style: 'presence',
        //color: 'presence'        
    }
});