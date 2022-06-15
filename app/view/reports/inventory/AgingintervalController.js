Ext.define('August.view.reports.inventory.AgingIntervalController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.inventory-aginginterval',

    init: function(){
        var me = this;

        me.mv = August.app.getMainView();        
    },   

    onAfterGridRender: function(p){

    },

    onActionRefresh: function(b, c){
        this.getStore("inventoryagings").reload();
    }

});
