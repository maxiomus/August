Ext.define('August.view.customer.payment.windows.InvoicesController', {
    extend: 'Ext.app.ViewController',    
    
    alias: 'controller.windows-payment-invoices',

    init: function() {

    },

    onDeselect: function(combo, rec, e){
        console.log(combo, rec);
    },

    onBeforeLoadPaymentDetails: function(store){        

        store.getProxy().setHeaders({
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        });

    },

    onStoreDataChanged: function(store){
        var me = this,
            view = me.getView(),
            btnSave = view.down('button[action="save"]');    

        btnSave.setDisabled(store.getCount() == 0);
    },

    onFilterItemChange: function(combo, j, g, l){
        var topbar = combo.up("toolbar"),
        k = topbar.down("searchtextlist");
        k.paramName = combo.getValue();
        
        //k.setValue('');

        k.fireEvent('triggerclear', k);        
    },

    /**     
     * @param combo
     * @param rec     
     * @param eOpts
     */
     onCustomerChanged: function(combo, nv, ov, eOpts){
        
         var me = this,
             vm = me.getViewModel(),
             toolbar = me.getView().down('toolbar[name="filter"]'),
             division = toolbar.down('combo[name="division"]'),
             //toDate = toolbar.down('datefield[name="to_date"]'),            
             invoiceGrid = me.getView().lookupReference('invoicesGrid'),
             store = invoiceGrid.getStore();                           

         console.log(nv, ov, combo.getSelection());
         division.setDisabled(combo.getSelection() === null);
         
    },

    /**     
     * @param sm
     * @param rec
     * @param index
     * @param eOpts
     */
    onDivisionChanged: function(combo, nv, ov, eOpts){

        
        var me = this,
            vm = me.getViewModel(),
            toolbar = me.getView().down('toolbar[name="filter"]'),
            customer = toolbar.down('combo[name="customer"]'),
            //toDate = toolbar.down('datefield[name="to_date"]'),            
            invoiceGrid = me.getView().lookupReference('invoicesGrid'),
            store = invoiceGrid.getStore();               

        Ext.apply(store.getProxy().extraParams, {
            customer: customer.getValue().trim(),
            division: combo.getValue().trim()
        });

        filters = store.getFilters(),
        filter1 = new Ext.util.Filter({
            //operator: 'st',
            property: 'customer',
            value: customer.getValue()
        });
        filter2 = new Ext.util.Filter({
            //operator: 'st',
            property: 'division',
            value: combo.getValue()
        });    
        
        filters.add([filter1, filter2]);
        
        store.load();
        
    },

    onTriggerClear: function(combo){
        //console.log(combo.getSelection());
        var me = this,
            vm = me.getViewModel(),
            toolbar = me.getView().down('toolbar[name="filter"]'),
            division = toolbar.down('combo[name="division"]'),
            //toDate = toolbar.down('datefield[name="to_date"]'),            
            invoiceGrid = me.getView().lookupReference('invoicesGrid'),
            store = invoiceGrid.getStore();                           
         
         division.setDisabled(combo.getSelection() === null);
    }

});
