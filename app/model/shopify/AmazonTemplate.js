Ext.define('August.model.shopify.AmazonTemplate', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],    

    fields: [       
        { name: 'feed_product_type', type: 'string' },
        { name: 'item_sku', type: 'string' },
        { name: 'brand_name', type: 'string' },
        { name: 'item_name', type: 'string' },
        { name: 'manufacturer', type: 'string' },
        { name: 'external_product_id', type: 'string' },
        { name: 'external_product_id_type', type: 'string' },
        { name: 'item_type', type: 'string' },
        { name: 'standard_price', type: 'string' },
        { name: 'quantity', type: 'string' },
        { name: 'main_image_url', type: 'string' },                
        { name: 'outer_material_type1', type: 'string' },
        { name: 'outer_material_type2', type: 'string' },
        { name: 'outer_material_type3', type: 'string' },
        { name: 'outer_material_type4', type: 'string' },
        { name: 'outer_material_type5', type: 'string' },
        { name: 'department', type: 'string' },
        { name: 'fabric_type1', type: 'string' },
        { name: 'fabric_type2', type: 'string' },
        { name: 'fabric_type3', type: 'string' },
        { name: 'fabric_type4', type: 'string' },
        { name: 'fabric_type5', type: 'string' },
        { name: 'target_gender', type: 'string' },
        { name: 'age_range_description', type: 'string' },
        { name: 'shirt_size_system', type: 'string' },
        { name: 'shirt_size_class', type: 'string' },
        { name: 'shirt_size', type: 'string' },
        { name: 'shirt_size_to', type: 'string' },                
        { name: 'shirt_neck_size', type: 'string' },
        { name: 'shirt_neck_size_to', type: 'string' },
        { name: 'shirt_sleeve_length', type: 'string' },
        { name: 'shirt_sleeve_length_to', type: 'string' },
        { name: 'shirt_body_type', type: 'string' },
        { name: 'shirt_height_type', type: 'string' },
        { name: 'part_number', type: 'string' },                                
        { name: 'color_name', type: 'string' },
        { name: 'color_map', type: 'string' },
        { name: 'other_image_url', type: 'string' },
        { name: 'other_image_url1', type: 'string' },
        { name: 'other_image_url2', type: 'string' },
        { name: 'other_image_url3', type: 'string' },
        { name: 'other_image_url4', type: 'string' },
        { name: 'other_image_url5', type: 'string' },
        { name: 'other_image_url6', type: 'string' },
        { name: 'other_image_url7', type: 'string' },
        { name: 'other_image_url8', type: 'string' },
        { name: 'swatch_image_url', type: 'string' },
        { name: 'parent_child', type: 'string' },
        { name: 'parent_sku', type: 'string' },
        { name: 'relationship_type', type: 'string' },
        { name: 'variation_theme', type: 'string' },
        { name: 'package_level', type: 'string' },
        { name: 'package_contains_quantity', type: 'string' },
        { name: 'package_contains_identifier', type: 'string' },
        { name: 'update_delete', type: 'string' },
        { name: 'closure_type', type: 'string' },
        { name: 'gtin_exemption_reason', type: 'string' },
        { name: 'product_description', type: 'string' },
        { name: 'model', type: 'string' },
        { name: 'model_name', type: 'string' },
        { name: 'care_instructions1', type: 'string' },
        { name: 'care_instructions2', type: 'string' },
        { name: 'care_instructions3', type: 'string' },
        { name: 'care_instructions4', type: 'string' },
        { name: 'bullet_point1', type: 'string' },
        { name: 'bullet_point2', type: 'string' },
        { name: 'bullet_point3', type: 'string' },
        { name: 'bullet_point4', type: 'string' },
        { name: 'bullet_point5', type: 'string' },                
        { name: 'category_number', type: 'string' },
        { name: 'search_terms', type: 'string' },
        { name: 'country_as_labeled', type: 'string' },
        { name: 'fur_description', type: 'string' },

        /*
        { name: 'number_of_sets', type: 'string' },
        { name: 'occasion', type: 'string' },
        { name: 'number_of_pieces', type: 'string' },
        */

        { name: 'size_name', type: 'string' },
        { name: 'material_type', type: 'string' },
        { name: 'style_name', type: 'string' },
        { name: 'special_features1', type: 'string' },
        { name: 'special_features2', type: 'string' },
        { name: 'special_features3', type: 'string' },
        { name: 'special_features4', type: 'string' },
        { name: 'special_features5', type: 'string' },
        { name: 'pattern_name', type: 'string' },
        { name: 'item_type_name', type: 'string' },
        { name: 'team_name', type: 'string' },
        { name: 'belt_style', type: 'string' },
        { name: 'collar_type', type: 'string' },
        { name: 'control_type', type: 'string' },
        { name: 'fit_type', type: 'string' },                
        { name: 'neckstyle', type: 'string' },                                
        { name: 'pattern_style', type: 'string' },
        { name: 'pocket_description', type: 'string' },
        { name: 'special_size_type', type: 'string' },
        { name: 'theme', type: 'string' },
        { name: 'top_style', type: 'string' },
        { name: 'water_resistance_level', type: 'string' },
        { name: 'is_autographed', type: 'string' },
        { name: 'occasion_type1', type: 'string' },
        { name: 'occasion_type2', type: 'string' },
        { name: 'occasion_type3', type: 'string' },
        { name: 'occasion_type4', type: 'string' },
        { name: 'occasion_type5', type: 'string' },
        { name: 'sport_type1', type: 'string' },
        { name: 'sport_type2', type: 'string' },                
        { name: 'athlete', type: 'string' },
        { name: 'collection_name', type: 'string' },
        { name: 'lifestyle', type: 'string' },
        { name: 'weave_type', type: 'string' },
        { name: 'league_name', type: 'string' },
        { name: 'shaft_style_type', type: 'string' },
        { name: 'lifecycle_supply_type1', type: 'string' },
        { name: 'lifecycle_supply_type2', type: 'string' },
        { name: 'lifecycle_supply_type3', type: 'string' },
        { name: 'lifecycle_supply_type4', type: 'string' },
        { name: 'lifecycle_supply_type5', type: 'string' },
        { name: 'item_booking_date', type: 'string' },
        { name: 'legal_compliance_certification_certifying_authority_name', type: 'string' },
        { name: 'legal_compliance_certification_geographic_jurisdiction', type: 'string' },
        { name: 'subject_character', type: 'string' },
        { name: 'fabric_wash', type: 'string' },
        { name: 'sleeve_type', type: 'string' },
        { name: 'strap_type', type: 'string' },
        { name: 'underwire_type', type: 'string' },
        { name: 'duration_unit', type: 'string' },                
        { name: 'duration', type: 'string' },
        { name: 'shipping_weight', type: 'string' },
        { name: 'website_shipping_weight_unit_of_measure', type: 'string' },                
        { name: 'size_map', type: 'string' },
        { name: 'chest_size', type: 'string' },
        { name: 'chest_size_unit_of_measure', type: 'string' },
        { name: 'cup_size', type: 'string' },
        { name: 'neck_size', type: 'string' },
        { name: 'cneck_size_unit_of_measure', type: 'string' },
        { name: 'sleevelength', type: 'string' },
        { name: 'sleeve_length_unit_of_measure', type: 'string' },
        { name: 'item_length_unit_of_measure', type: 'string' },
        { name: 'item_length1', type: 'string' },
        { name: 'item_width', type: 'string' },
        { name: 'item_height', type: 'string' },
        { name: 'item_width_unit_of_measure', type: 'string' },
        { name: 'item_height_unit_of_measure', type: 'string' },
        { name: 'fulfillment_center_id', type: 'string' },
        { name: 'package_height', type: 'string' },
        { name: 'package_width', type: 'string' },
        { name: 'package_length', type: 'string' },
        { name: 'package_length_unit_of_measure', type: 'string' },
        { name: 'package_weight', type: 'string' },
        { name: 'package_weight_unit_of_measure', type: 'string' },
        { name: 'package_height_unit_of_measure', type: 'string' },
        { name: 'package_width_unit_of_measure', type: 'string' },
        { name: 'cpsia_cautionary_statement1', type: 'string' },
        { name: 'cpsia_cautionary_statement2', type: 'string' },
        { name: 'cpsia_cautionary_statement3', type: 'string' },
        { name: 'cpsia_cautionary_statement4', type: 'string' },
        { name: 'cpsia_warning_description', type: 'string' },
        { name: 'import_designation', type: 'string' },
        { name: 'legal_compliance_certification_metadata', type: 'string' },
        { name: 'legal_compliance_certification_expiration_date', type: 'string' },
        { name: 'country_of_origin', type: 'string' },                
        { name: 'legal_compliance_certification_requlatory_organization_name', type: 'string' },
        { name: 'legal_compliance_certification_status', type: 'string' },
        { name: 'flash_point', type: 'string' },
        { name: 'legal_compliance_certification_date_of_issue', type: 'string' },
        { name: 'legal_compliance_certification_value', type: 'string' },
        { name: 'california_proposition_65_warning_type', type: 'string' },
        { name: 'california_proposition_65_chemical_names1', type: 'string' },
        { name: 'california_proposition_65_chemical_names2', type: 'string' },
        { name: 'california_proposition_65_chemical_names3', type: 'string' },
        { name: 'california_proposition_65_chemical_names4', type: 'string' },
        { name: 'california_proposition_65_chemical_names5', type: 'string' },
        { name: 'pesticide_marking_type1', type: 'string' },
        { name: 'pesticide_marking_type2', type: 'string' },
        { name: 'pesticide_marking_type3', type: 'string' },
        { name: 'pesticide_marking_registration_status1', type: 'string' },
        { name: 'pesticide_marking_registration_status2', type: 'string' },
        { name: 'pesticide_marking_registration_status3', type: 'string' },
        { name: 'pesticide_marking_certification_number1', type: 'string' },
        { name: 'pesticide_marking_certification_number2', type: 'string' },
        { name: 'pesticide_marking_certification_number3', type: 'string' },
        { name: 'fcc_radio_frequency_emission_compliance_registration_status', type: 'string' },
        { name: 'fcc_radio_frequency_emission_compliance_point_of_contact_email', type: 'string' },
        { name: 'fcc_radio_frequency_emission_compliance_point_of_contact_phone_number', type: 'string' },
        { name: 'fcc_radio_frequency_emission_compliance_point_of_contact_name', type: 'string' },
        { name: 'fcc_radio_frequency_emission_compliance_identification_number', type: 'string' },
        { name: 'fcc_radio_frequency_emission_compliance_point_of_contact_address', type: 'string' },                
        { name: 'supplier_declared_material_regulations1', type: 'string' },
        { name: 'supplier_declared_material_regulations2', type: 'string' },
        { name: 'supplier_declared_material_regulations3', type: 'string' },                                
        { name: 'offer_end_date', type: 'string' },                                                                                
        { name: 'merchant_shipping_group_name', type: 'string' },
        { name: 'currency', type: 'string' },
        { name: 'list_price', type: 'string' },
        { name: 'map_price', type: 'string' },
        { name: 'product_site_launch_date', type: 'string' },
        { name: 'merchant_release_date', type: 'string' },
        { name: 'condition_type', type: 'string' },
        { name: 'restock_date', type: 'string' },
        { name: 'fulfillment_latency', type: 'string' },
        { name: 'condition_note', type: 'string' },
        { name: 'product_tax_code', type: 'string' },                                                                
        { name: 'sale_price', type: 'string' },
        { name: 'sale_from_date', type: 'string' },
        { name: 'sale_end_date', type: 'string' },
        { name: 'itme_package_quantity', type: 'string' },
        { name: 'max_aggregate_ship_quantity', type: 'string' },
        { name: 'offering_can_be_gift_messaged', type: 'string' },
        { name: 'offering_can_be_giftwrapped', type: 'string' },
        { name: 'is_discontinued_by_manufacturer', type: 'string' },
        { name: 'max_order_quantity', type: 'string' },
        { name: 'number_of_items', type: 'string' },
        { name: 'offer_start_date', type: 'string' }  
    ],

    //identifier: 'negative',

    validators: {
        //style: 'presence',
        //color: 'presence'        
    },

    proxy: {
        type: 'rest',
        
        url: '/WebApp/api/ProductTemplates',        
        
        actionMethods: {
            read: 'POST'
        },

        pageParam: '',
        startParam: '',
        limitParam: '',

        headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        },

        reader: {
            type: 'json',
            rootProperty: 'data'
        },

        writer: {
            type: 'json',
            //clientIdProperty: 'clientId',
            //writeAllFields: true,
            allowSingle: false // set false to send a single record in array
        },

        //extraParams: {},

        listeners: {
            exception: function (proxy, response, operation) {
                console.log(response, operation);
            }
        }
    }
});