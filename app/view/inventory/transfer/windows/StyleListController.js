Ext.define('August.view.inventory.transfer.windows.StyleListController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.transfer-windows-stylelist',    

    onCategorySelect: function(combo, rec){
        var me = this,
            vm = me.getViewModel(),  
            topbar = combo.up('toolbar'),
            field = topbar.down('searchtextlist');            
        
        field.paramName = combo.getValue();
        
        /*
        vm.set({
            title: rec.data.label
        });
        */
    }
});
