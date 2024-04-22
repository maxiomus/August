Ext.define('August.view.sales.windows.PrintPTController', {
    extend: 'Ext.app.ViewController',    

    mixins: [
        'Ext.app.route.Base'
    ],

    alias: 'controller.sales-windows-printpt',    

    requires: [
        //'August.model.Media'
    ],    

    init: function () {    
        var me = this;     
        
        //console.log(me.getView().down('dataview'), me.lookupReference('print-po-view'));
    },

    initViewModel: function(vm) {                   

        var me = this,
            view = me.getView(),
            header = view.down('component[name="printPickHeader"]'),
            footer = view.down('component[name="printPickFooter"]');
            
            binding = vm.bind({
                bindTo: '{thePickTicket}',
                deep: true,
                single: true
            }, function(rec) {                
                // Send viewModel's data to callback function.
                var store = rec.PickDs(),
                    proxy = store.getProxy();
                
                //store.setPageSize(8);                            
                //view.setLoading(true);                                                                                            

                //var b = document.getElementById('po-barcode');
                //var c = document.getElementsByClassName('barcode');

                var data = rec.getData();
                
                data.customerAddress = vm.get('theCustomer').getData();
                data.shipToAddress = vm.get('theStore').getData();

                // populate component's template data
                header.update(data);
                console.log('initViewModel - Binding', data); 
                //footer.update({memo: Ext.util.Format.nl2br(data.memo), trimmemo: Ext.util.Format.nl2br(data.trimMemo)});

                JsBarcode(".barcode").init();
                //JsBarcode('#po-barcode', "123456789");

                //view.setLoading(false);                
                
                binding.destroy();

            }, this);            
    },    

    onItemContextMenu:function(v, rec, item, idx, e){
        e.stopEvent();

        var view = this.getView(),
            sm = v.getSelectionModel();

        if(!sm.isSelected(rec)){
            sm.select(rec);
        }

        //view.contextmenu.items.items[1].setDisabled(v.getSelection().length == 0);
        view.contextmenu.showAt(e.getXY());
    },    

    onItemClickRefresh: function(panel, widget){
        //console.log('onItemClickRefresh', panel.lookupReference('tag-view'));
        var me = this,
            win = me.getView(),            
            store = win.lookupReference('tag-view').getStore();               

        store.reload();
    }    
});
        
    
