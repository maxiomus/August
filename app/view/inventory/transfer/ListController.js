Ext.define('August.view.inventory.transfer.ListController', {
    extend: 'Ext.app.ViewController',

    mixins: [
        'Ext.app.route.Base'
    ],

    alias: 'controller.transferList',

    listen: {
        component: {
            'window': {
                close: function(w){
                    this.mv.unmask();
                }
            }
        }
    },

    init: function(){
        var me = this;

        me.mv = August.app.getMainView();
        
    },

    onActionNew: function(b){
        this.redirectTo("transfer/new");
    },

    onActionEdit: function(b, c){
        //console.log(b, c);

        var layout = this.lookupReference('multiview'),
            grid = layout.lookupReference('transfer-grid'),
            rec = grid.getSelection()[0];

        //this.showWindow(grid.getSelection()[0]);
        this.redirectTo("transfer/edit/" + rec.data.transferno);
    },

    onActionRefresh: function(b, c){
        this.getStore("transfers").reload();
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
                        grid = layout.lookupReference('transfer-grid'),
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
            searchfield = topbar.down('searchgrid'),
            grid = layout.lookupReference("transfer-grid");

        searchfield.setValue('');
        searchfield.getTrigger('clear').hide();
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
        this.redirectTo('transfer/default/' + rec.get('transferno'));
    },

    onFilterItemChange: function(combo, j, g, l){
         var topbar = combo.up("topbar"),
         k = topbar.down("searchgrid");
         k.paramName = combo.getValue();

         k.setValue('');
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