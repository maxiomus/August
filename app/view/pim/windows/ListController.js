Ext.define('August.view.pim.windows.ListController', {
    extend: 'Ext.app.ViewController',
    
    alias: 'controller.pim-windows-list',


    init: function(){

    },

    initViewModel: function(vm){
        
            
    },

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
