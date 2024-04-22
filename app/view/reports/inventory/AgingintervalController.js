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
    },

    onActionExport: function(btn, owner){                
        var me = this,
            grid = me.lookupReference('inventoryAgingGrid');

        grid.saveDocumentAs({
            type: 'xlsx',
            title: 'Inventory Aging Summary',
            fileName: 'Inventory Aging Summary' + Ext.Date.format(new Date(), 'Y-m-d')
        });        
    }

});
