Ext.define('August.data.proxy.SimpleRest', {
    extend: 'Ext.data.proxy.Rest',
    
    alias: 'proxy.simplerest',

    encodeFilters: function(filters) {
        return filters[0].getValue();
    }
});