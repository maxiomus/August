Ext.define('August.view.reports.invoice.StylesBySoTypeController', {
    extend: 'Ext.app.ViewController',
    
    alias: 'controller.invoice-stylesbysotype',

    init: function(view){
        var me = this,                      
            grid = me.lookupReference('invoiceStylesGrid');

        me.mv = August.app.getMainView();                        
    },   

    onAfterGridRender: function(p){

    },

    onActionRefresh: function(b, c){
        this.getStore("stylesbysotypes").reload();
    },

    onActionExport: function(btn, owner){                
        var me = this,
            grid = me.lookupReference('invoiceStylesGrid');

        grid.saveDocumentAs({
            type: 'xlsx',
            title: 'Invoice By Styles & S.O Type',
            fileName: 'Invoice By Styles & Sales Order Type' + Ext.Date.format(new Date(), 'Y-m-d')
        });        
    },

    onStoreBeforeLoad: function(store) {
        var me = this,
            vm = me.getViewModel(),
            fromDate = me.getView().down('datefield[name="fromDate"]'),
            toDate = me.getView().down('datefield[name="toDate"]'),
            types = me.getView().down('tagfield[name="sotypes"]');
                
        Ext.apply(store.getProxy().extraParams, {                        
            fromDate: new Date(fromDate.getValue()),
            toDate: new Date(toDate.getValue()),
            orderTypes: types.getValue().toString()
        });
    },

    onStoreLoad: function(store) {
        var me = this,
            vm = me.getViewModel(),
            grid = me.lookupReference('invoiceStylesGrid'),
            columns = grid.getColumns(),
            sumOfSubTotal = 0;            
        
        //console.log('report - sum of subtotal', sumOfSubTotal);
        
        store.each(function(rec, idx){            
            //rec.set('percentage', (rec.get('subtotal') / sumOfSubTotal)* 100);
            //rec.set('P1', (rec.get('C1') / rec.get('subtotal'))* 100);
            //sumOfSubTotal += rec.get('subtotal');            
            if(rec != null){
                var index = 0;                

                Ext.each(columns, function(col, idx){                        
                                        
                    switch(idx){
                        case 5:                         
                            //col.setText(rec.get('type1'));
                            if (!Ext.isEmpty(rec.get('type1'))) {
                                col.ownerCt.setText(rec.get('type1'));
                            }                            
                            break;
                        case 8:                        
                            if (!Ext.isEmpty(rec.get('type2'))) {
                                col.ownerCt.setText(rec.get('type2')); 
                            }
                            break;
                        case 11:                         
                            if (!Ext.isEmpty(rec.get('type3'))) {
                                col.ownerCt.setText(rec.get('type3')); 
                            }
                            break;
                        case 14:                         
                            if (!Ext.isEmpty(rec.get('type4'))) {
                                col.ownerCt.setText(rec.get('type4')); 
                            }
                            break;
                        case 17:                         
                            if (!Ext.isEmpty(rec.get('type5'))) {
                                col.ownerCt.setText(rec.get('type5')); 
                            }
                            break;  
                        case 20:                         
                            if (!Ext.isEmpty(rec.get('type6'))) {
                                col.ownerCt.setText(rec.get('type6')); 
                            }
                            break;   
                        case 23: 
                            if (!Ext.isEmpty(rec.get('type7'))) {
                                col.ownerCt.setText(rec.get('type7')); 
                            }
                            break;

                    }                                           
                });
            }
        });
        
        //vm.set('SumSubTotal', sumOfSubTotal);        
    }    

});
