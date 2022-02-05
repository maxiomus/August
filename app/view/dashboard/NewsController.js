Ext.define('August.view.dashboard.NewsController', {

    extend: 'Ext.app.ViewController',

    alias: 'controller.dashboard-news',

    init: function(){

    },

    onItemClick: function(view, record, item, index, e){

        this.redirectTo('pow/tab/' + record.get('orderId'));
    },

    /**
     *  Open the context menu
     * @param view
     * @param rec
     * @param item
     * @param index
     * @param event
     */
    onItemContextMenu: function(view, rec, item, index, event){
        event.stopEvent();

        var sm = view.getSelectionModel();
        if(!sm.isSelected(index)){
            sm.select(index);
        }

        this.view.contextmenu.showAt(event.getXY());
    },

    onContextMenuRefreshClick: function(record, item){
        record.store.load();
    }

});
