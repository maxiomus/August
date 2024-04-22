Ext.define('August.model.pim.PDBodyParams', {    
    extend: 'August.model.Base',

    fields: [
        { name: 'product_name', type: 'string' },
        { name: 'product_characteristics', type: 'string' },
        { name: 'primary_keyword', type: 'string' },
        { name: 'secondary_keyword', type: 'string' },
        { name: 'keywords', type: 'string' },
        { name: 'tone_of_voice', type: 'string' }
    ]
});