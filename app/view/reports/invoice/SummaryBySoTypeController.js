Ext.define('August.view.reports.invoice.SummaryBySoTypeController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.invoice-summarybysotype',

    init: function(view){
        var me = this,                      
            grid = me.lookupReference('invoiceSummaryGrid');

        me.mv = August.app.getMainView();                
        me.groupingFeature = grid.view.findFeature('groupingsummary');
    },   

    onAfterGridRender: function(p){

    },

    onActionRefresh: function(b, c){
        this.getStore("invoicesummaries").reload();
    },

    onActionExport: function(btn, owner){                
        var me = this,
            grid = me.lookupReference('invoiceSummaryGrid');

        grid.saveDocumentAs({
            type: 'xlsx',
            title: 'Invoice Summary By S.O Type',
            fileName: 'Invoice Summary By Sales Order Type' + Ext.Date.format(new Date(), 'Y-m-d')
        });        
    },

    onStoreBeforeLoad: function(store) {
        var me = this,
            fromDate = me.getView().down('datefield[name="fromDate"]'),
            toDate = me.getView().down('datefield[name="toDate"]'),
            vm = me.getViewModel();
        
        Ext.apply(store.getProxy().extraParams, {                        
            fromDate: new Date(fromDate.getValue()),
            toDate: new Date(toDate.getValue()),
        });
    },

    onStoreLoad: function(store) {
        var me = this,
            vm = me.getViewModel(),
            sumOfSubTotal = 0;

        store.each(function(rec, idx){
            //bomtotal += (rec.data.cost * rec.data.qty);
            //console.log('report - subtotal', idx, rec.get('subtotal'));
            sumOfSubTotal += rec.get('subtotal');            
        });

        vm.set('SumSubTotal', sumOfSubTotal);        
        //console.log('report - sum of subtotal', sumOfSubTotal);
        
        store.each(function(rec, idx){            
            rec.set('percentage', (rec.get('subtotal') / sumOfSubTotal)* 100);
            rec.set('P1', (rec.get('C1') / rec.get('subtotal'))* 100);
            
        });        
    },

    onCollapseAll: function () {
        this.groupingFeature.collapseAll();
    },

    onExpandAll: function () {
        this.groupingFeature.expandAll();
    },

    onGroupCollapse: function (v, n, groupName) {
        //this.syncGroup(groupName, false);
    },

    onGroupExpand: function (v, n, groupName) {
        //this.syncGroup(groupName, true);
    },

    syncGroup: function (groupName, state) {
        var groupsBtn = this.lookup('groupsBtn'),
            items = groupsBtn.menu.items.items,
            i;

        for (i = items.length; i-- > 0; ) {
            if (items[i].text === groupName) {
                items[i].setChecked(state, true);
                break;
            }
        }
    }
});
