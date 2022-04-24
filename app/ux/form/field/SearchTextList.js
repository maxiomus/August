/**
 * Created by tech on 8/18/2015.
 */
 Ext.define('Ext.ux.form.field.SearchTextList', {
    extend: 'Ext.form.field.Text',

    mixins: [
        'Ext.util.StoreHolder'
    ],

    alias: 'widget.searchtextlist',

    triggers: {
        clear: {
            weight: 0,
            cls: Ext.baseCSSPrefix + 'form-clear-trigger',
            tooltip: 'Clear',
            hidden: true,
            handler: function(c, a){                     
                // c - searchtextlist
                // a - trigger           
                c.fireEvent('triggerclear', this);
            }
        },
        search: {
            weight: 1,
            cls: Ext.baseCSSPrefix + 'form-search-trigger',
            tooltip: 'Search',
            handler: function(c){
                c.fireEvent('triggersearch', this);
            }
        }
    },

    // Over Extjs 5.* configs    
    enableKeyEvents: true,
    //hideTrigger: true,

    config: {
        hasSearch: false,
        paramName: 'query'
    },

    initComponent: function () {
        var me = this,
            store = me.store,
            proxy;
                
        me.callParent(arguments);

        me.on('specialkey', function(f, e){
            if (e.getKey() == e.ENTER) {
                me.onSearchClick();
            }
        });

        me.bindStore(store || 'empty-ext-store', true);
        /*
        if(!store || !store.isStore){
            store = me.store = Ext.data.StoreManager.lookup(store);
        }     
        */

        // We are going to use filtering.
        //store.setRemoteFilter(true);

        // Set up the proxy to encode the filter in the simplest way as a name/value pair
        /*
        proxy = me.store.getProxy();
        proxy.setFilterParam(me.paramName);
 
        proxy.encodeFilters = function(filters) {
            return filters[0].getValue();
        };
        */        
    },

    listeners: {
        triggerclear: {
            fn: 'onClearClick',
            scope: 'this'
        },
        triggersearch: {
            fn: 'onSearchClick',
            scope: 'this'
        }
    },
    
    /**
     * Adding
     */
    onBindStore: function(s) {
        if (s && this.rendered) {
            var me = this,
            store = me.store;
            //proxy = store.getProxy();

            // We're going to use filtering
            //store.SetRemoteFilter(true);
            store.remoteFilter = true;

            // Set up the proxy to encode the filter in the simplest way as a name / value pair
            /*
            proxy = me.store.getProxy();

            proxy.setFilterParam(me.paramName);

            proxy.encodeFilters = function(filters)  {
                return filters[0].getValue();
            }
            */
        }
    },

    onClearClick: function () {

        var me = this,
            activeFilter = me.activeFilter;
 
        if (activeFilter) {
            me.setValue('');
            me.store.getFilters().remove(activeFilter);
            me.activeFilter = null;
            me.getTrigger('clear').hide();
            me.updateLayout();         
        }                          
    },

    onSearchClick: function () {
        
        var me = this,
            value = me.getValue().split(',').map(function(item){
                if(!isNaN(item)){
                    return parseInt(item, 10);
                }

                return Ext.String.trim(item);
            });
 
        if (value.length > 0) {
            // Param name is ignored here since we use custom encoding in the proxy.
            // id is used by the Store to replace any previous filter
            me.activeFilter = new Ext.util.Filter({
                operator: 'in',
                property: me.paramName,
                type: 'list',
                value: value
            });

            me.store.getFilters().add(me.activeFilter);
            me.getTrigger('clear').show();
            me.updateLayout();

            //console.log(me.store, value, me.activeFilter);
        }
    }
});