Ext.define('August.view.settings.vendors.ProcessTypeController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.vendors-processtype',

    requires: [
        'August.model.ProcessType',
        'August.model.ProcessOrder'
    ],

    init: function(grid){
        var me = this,
            vm = me.getViewModel();
        
    },

    onTypeRowSelect: function(m, rec, idx){

    }
    
});
