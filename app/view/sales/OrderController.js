Ext.define('August.view.sales.OrderController', {
    extend: 'Ext.app.ViewController',

    mixins: [
        'Ext.app.route.Base'
    ],

    alias: 'controller.sales-order',

    init: function(){
        var me = this;

        Ext.Ajax.request({
            url: 'resources/data/sales/stores.json',
            scope: me,
            success: function(response){
                var o = {};

                try {
                    o = Ext.decode(response.responseText);
                }
                catch(e){
                    alert(e.message);
                    return;
                }

                if(!o.success){
                    // @todo error handling
                    alert("Unknow error occurs!");
                    return;
                }

                Ext.Object.each(o.stores, function(key, value, itself){
                    var store = me.getViewModel().getStore(key);
                    //console.log(store, key, value)
                    if(store && value){
                        store.loadData(value);
                    }
                });
            },
            failure: function(response){

            }
        });
    },

    onAfterGridRender: function(p){

    },

    onActionNew: function(b){
        this.redirectTo("sales-order/new");
    },

    onActionEdit: function(b, c){
        //console.log(b, c);

        var layout = this.lookupReference('multiview'),
            grid = layout.lookupReference('sales-order-grid'),
            rec = grid.getSelection()[0];

        //this.showWindow(grid.getSelection()[0]);
        this.redirectTo("sales-order/edit/" + rec.data.orderno);
    },

    onActionRefresh: function(b, c){
        this.getStore("salesorders").reload();
    },

    onActionDelete: function(b, c){
        var me = this;
        Ext.Msg.show({
            title:'Warning!',
            message: 'Are you sure you want to delete this?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'ok') {
                    //grid.getStore().remove(rec);
                    var layout = me.lookupReference('multiview'),
                        grid = layout.lookupReference('sales-order-grid'),
                        rec = grid.getSelection()[0];

                    //rec.drop();
                    //me.saveStore(grid, me.getView());
                }
            }
        });
    },

    onContextMenuEditClick: function(d, c){

    },

    onContextMenuBookmarkClick: function(d, c){
        this.addBookmark(d, this.getView());
    },

    onClearFilters: function(b){
        var me = this,
            layout = me.view.lookupReference("multiview"),
            topbar = layout.lookupReference("topbar"),
            searchgrid = topbar.down('searchgrid'),
            grid = layout.lookupReference("sales-order-grid");

        searchgrid.setValue('');
        searchgrid.getTrigger('clear').hide();
        grid.filters.clearFilters();
    },


    /**
     *
     * @param sm
     * @param rec
     * @param index
     * @param eOpts
     */
    onSelect: function(sm, rec, index, eOpts){
        //onSelectionChange: function(sm, selected, eOpts) {

        var layout = this.getView().lookupReference('multiview'),
            refs = layout.getReferences(),
            topbar = refs.topbar,
            display = refs.display;

        display.setActive(rec);

        //console.log(rec);
        this.redirectTo('sales-order/default/' + rec.get('orderno'));
    },

    onFilterItemChange: function(combo, j, g, l){
         var topbar = combo.up("topbar"),
         k = topbar.down("searchgrid");
         k.paramName = combo.getValue();

         k.setValue('');
    },

    onFilterItemChange: function(combo, j, g, l){
        var topbar = combo.up("topbar"),
           m = topbar.down("searchgrid"),
           n = topbar.down("searchnumber"),            
           j = combo.getValue();

        switch(j){
            /*
           case "grp":
               if (st === '') {
                   st = 'groups';
               }
           case "subcategory":
               if (st === '') {
                   st = 'subcategories';
               }
           */           
           case "orderno":
               n.paramName = j;
               n.show();               
               m.setValue('');
               m.hide();
               break;
           default:
               m.paramName = j;
               m.show();               
               n.setValue('');
               n.hide();
       }         
   },

    onItemContextMenu:function(h, j, k, g, l){
        l.stopEvent();

        var i = h.getSelectionModel();
        if(!i.isSelected(g)){
            i.select(g);
        }
        this.view.contextmenu.showAt(l.getXY());
    }

});
