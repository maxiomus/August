Ext.define('August.view.production.TopBarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.production-topbar',

    init: function(){

    },

    onFilterItemChange: function(combo, h, g, l){

        var toolbar = combo.up("toolbar"),
            m = toolbar.down("searchgrid"),
            n = toolbar.down("searchcombo"),
            o = toolbar.down("searchtextlist"),
            j = combo.getValue(),
            st = '';
        
        switch(j){            
            case "grp":
                if (st === '') {
                    st = 'groups';
                }                
            case "subcategory":
                if (st === '') {
                    st = 'subcategories';
                }                
            case "division":
                if(st === ''){
                    st = 'division';
                }                
            case "style":
                n.paramName = j;
                o.show();
                m.hide();
                n.hide();
                break;
            default:
                m.paramName = j;
                m.show();
                n.hide();
                o.hide();
        }        

        var view = this.getView(),
            k = view.getViewModel().getStore(st);

        if(k != null){
            k.load();
            n.bindStore(k);
        }
    },

    onClearFilters: function(b){
        var me = this,
            searchcombo = me.lookupReference('searchcombo'),
            searchtext = me.lookupReference('searchtextlist');

        searchcombo.setValue('');
        searchcombo.getTrigger('clear').hide();
        searchtext.setValue('');
        searchtext.getTrigger('clear').hide();
        searchtext.grid.filters.clearFilters();
    }

});
