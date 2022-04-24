Ext.define('August.view.sales.windows.po.GenerateController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.windows-po-generate',

    init: function() {

    },

    onBeforeLoadOrderDetails: function(store){
        /*
        var me = this,
            view = this.getView(),
            fromDate = view.down('datefield[name="fromDate"]'),
            toDate = view.down('datefield[name="toDate"]');            
            
        var fromFilter = new Ext.util.Filter({
            operator: 'gt',
            property: 'cancelDate',
            type: 'date',
            value: fromDate.getValue()
        });

        var toFilter = new Ext.util.Filter({
            operator: 'lt',
            property: 'cancelDate',
            type: 'date',
            value: toDate.getValue()
        });

        store.getFilters().add([fromFilter, toFilter]);
        */
        /*
        Ext.apply(store.getProxy().extraParams, {
            filter: Ext.encode(
                [{ 
                    operator: 'gt',
                    property: 'cancelDate',
                    type: 'date',
                    value: fromDate.getValue()
                },{ 
                    operator: 'lt',
                    property: 'cancelDate',
                    type: 'date',
                    value: toDate.getValue()
                }])
        });
        */

        store.getProxy().setHeaders({
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        });

    },

    onPoStoreDataChanged: function(store){
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
     * @param sm
     * @param rec
     * @param index
     * @param eOpts
     */
    onSelect: function(sm, rec, index, eOpts){
        var me = this,
            vm = me.getViewModel(),
            toolbar = me.getView().down('toolbar[name="filter"]'),
            //fromDate = toolbar.down('datefield[name="from_date"]'),
            //toDate = toolbar.down('datefield[name="to_date"]'),
            groupBy = toolbar.down('radiogroup[name="rb-groupby"]'),
            mergeStyle = toolbar.down('checkbox[name="cb-merge"]'),
            mergeWH = toolbar.down('checkbox[name="cb-wh"]'),
            templateGrid = me.getView().lookupReference('poTemplateGrid'),
            store = templateGrid.getStore();        

        var groupField = 'style',
            groupValue = rec.get('style');

        switch(groupBy.getValue()){            
            case 'so':
                groupField = 'SoNo';
                groupValue = rec.get('orderNO');
                break;            
            case 'vendor':
                groupField = 'vendor';
                groupValue = rec.get('vendor1');
                break;
            default:
                break;            
        }        

        me.addPoByGroup(rec, store, groupField, groupValue, mergeStyle, mergeWH);
    },

    /**     
     * @param sm
     * @param rec
     * @param index
     * @param eOpts
     */
    onDeselect: function(sm, rec, index, eOpts){
        var me = this,
            vm = me.getViewModel(),
            toolbar = me.getView().down('toolbar[name="filter"]'),
            //fromDate = toolbar.down('datefield[name="from_date"]'),
            //toDate = toolbar.down('datefield[name="to_date"]'),
            groupBy = toolbar.down('radiogroup[name="rb-groupby"]'),
            mergeStyle = toolbar.down('checkbox[name="cb-merge"]'),
            mergeWH = toolbar.down('checkbox[name="cb-wh"]'),
            templateGrid = me.getView().lookupReference('poTemplateGrid'),
            store = templateGrid.getStore();

        var groupField = 'style',
        groupValue = rec.get('style');

        switch(groupBy.getValue()){            
            case 'so':
                groupField = 'SoNo';
                groupValue = rec.get('orderNO');
                break;            
            case 'vendor':
                groupField = 'vendor';
                groupValue = rec.get('vendor1');
                break;
            default:
                break;            
        }

        me.removePoByGroup(sm, rec, store, mergeStyle, mergeWH);
    },

    /**
     * 
     * @param {*} store 
     * @param {*} field 
     * @param {*} value 
     * @returns 
     */
     isGroupExist: function(store, field, value){
        var rdx = -1;

        switch(field){
            case 'SoNo':                                
            case 'vendor':
                rdx = store.findExact(field, value);
                break;
            default:
                store.each(function(rec, idx){
                    rdx = idx;                        
        
                    var index = rec.purchaseorderitems().findExact(field, value);
                    if(index === -1){
                        rdx = index;                
                    }
                    else {
                        return false;
                    } 
                        
                });
                break;
        }        

        //console.log('isGroupExist', field, value, rdx);
        return rdx;
    },

    removePoByGroup: function(sm, rec, store, merge, wh) {
        var me = this,     
            grid = me.getView().lookupReference('poTemplateGrid'),                               
            //theOrder = null,
            matchFound = false;
        
        if(store.getCount() !== 0){
            // find record index...

            store.each(function(record, index){

                record.purchaseorderitems().each(function(item, idx){                    
                    
                    if(merge.checked){
                        if(rec.data.style.trim() === item.data.style.trim() && rec.data.color.trim() === item.data.color.trim() && (!wh.checked || rec.data.wh === item.data.warehouse) ){
                            item.set('unit1', item.data.unit1-rec.data.unit1);
                            item.set('unit2', item.data.unit2-rec.data.unit2);
                            item.set('unit3', item.data.unit3-rec.data.unit3);
                            item.set('unit4', item.data.unit4-rec.data.unit4);
                            item.set('unit5', item.data.unit5-rec.data.unit5);
                            item.set('unit6', item.data.unit6-rec.data.unit6);
                            item.set('unit7', item.data.unit7-rec.data.unit7);
                            item.set('unit8', item.data.unit8-rec.data.unit8);
                            item.set('unit9', item.data.unit9-rec.data.unit9);
                            item.set('unit10', item.data.unit10-rec.data.unit10);
                            item.set('unit11', item.data.unit11-rec.data.unit11);
                            item.set('unit12', item.data.unit12-rec.data.unit12);
                            item.set('unit13', item.data.unit13-rec.data.unit13);
                            item.set('unit14', item.data.unit14-rec.data.unit14);
                            item.set('unit15', item.data.unit15-rec.data.unit15);        
                            item.set('unitSum', item.data.unitSum-rec.data.total);        
        
                            //matchFound = true;
                            //console.log('merge', rec, item);
                            var total = record.get('totalUnits');
                            total -= rec.data.total;
                            record.set('totalUnits', total);
                        } 

                        if(item.get('unitSum') === 0){
                            record.purchaseorderitems().remove(item);
                            item.drop();
                        }

                    }
                    else {
                        if(rec.data.style.trim() === item.data.style.trim() && rec.data.color.trim() === item.data.color.trim() && rec.data.sodId === item.data.sodid){
                            //console.log('not merge', rec, item);
                            record.purchaseorderitems().remove(item);
                            item.drop();                            
                        }
                    }                    

                });

                if(record.purchaseorderitems() == null || record.purchaseorderitems().getCount() === 0){                                        
                    //console.log('Order items all removed.', record);
                    store.remove(record);
                    record.drop();                    
                }  
                                
            });                                                                
        }
        else {
            store.each(function(rec, index){
                rec.drop();
            });
        }
                
        
        //console.log('removePoByVendor', store, merge.checked, wh.checked);
    },    

    addPoByGroup: function(rec, store, field, value, merge, wh){
        var me = this,     
            grid = me.getView().lookupReference('poTemplateGrid'),       
            recordIndex = me.isGroupExist(store, field, value),
            theOrder = null,
            matchFound = false;

        
        if(store.getCount() === 0 || recordIndex === -1){
            theOrder = Ext.create('August.model.purchase.Order', {                                                                    
                cut_po: 'PO',
                vendor: rec.data.vendor1,
                processType: 'PO',  
                status: 'Open', 
                void: 0,
                division: rec.data.division,                
                cancelDate: rec.data.userf_date, //Ext.Date.add(new Date(), Ext.Date.MONTH, 2),
                orderDate: rec.data.orderDate,
                startDate: rec.data.shipdate,
                shipdate: rec.data.shipdate,
                etaDate: rec.data.shipdate,  
                paymentcode: rec.data.paymentcode || 'WIRE', //'WIRE', 
                terms: rec.data.term || 'NET7', //'NET7', 
                shipvia: rec.data.shipVia || 'BOAT', //'BOAT', 
                warehouse: rec.data.wh,
                memocode: 'PO',  
                shipto: 'ER',
                type: 'Estimate',            
                customer: rec.data.customer,
                cust_po: rec.data.custpo,            
                SoNo: rec.data.orderNO,
                store: rec.data.store,
                house_only: 'Y',
                //user1: rec.data.user1, 
                user1: rec.data.division,                
                createUser: August.loggedInUser.userId,
                updateUser: August.loggedInUser.userId                
            });

            grid.getSelectionModel().select([theOrder], true, true);
        }
        else {
            theOrder = store.getAt(recordIndex);
        }                

        //console.log('vendor', store, merge.checked, wh.checked);

        if(merge.checked){
            theOrder.purchaseorderitems().each(function(item, idx){
                
                console.log('rec wh', rec.data.wh, item.data.warehouse, (!wh.checked || rec.data.wh === item.data.warehouse));
                if(rec.data.style.trim() === item.data.style.trim() && rec.data.color.trim() === item.data.color.trim() && (!wh.checked || rec.data.wh === item.data.warehouse) ){
                    item.set('unit1', item.data.unit1+rec.data.unit1);
                    item.set('unit2', item.data.unit2+rec.data.unit2);
                    item.set('unit3', item.data.unit3+rec.data.unit3);
                    item.set('unit4', item.data.unit4+rec.data.unit4);
                    item.set('unit5', item.data.unit5+rec.data.unit5);
                    item.set('unit6', item.data.unit6+rec.data.unit6);
                    item.set('unit7', item.data.unit7+rec.data.unit7);
                    item.set('unit8', item.data.unit8+rec.data.unit8);
                    item.set('unit9', item.data.unit9+rec.data.unit9);
                    item.set('unit10', item.data.unit10+rec.data.unit10);
                    item.set('unit11', item.data.unit11+rec.data.unit11);
                    item.set('unit12', item.data.unit12+rec.data.unit12);
                    item.set('unit13', item.data.unit13+rec.data.unit13);
                    item.set('unit14', item.data.unit14+rec.data.unit14);
                    item.set('unit15', item.data.unit15+rec.data.unit15);        
                    item.set('unitSum', item.data.unitSum+rec.data.total);        

                    matchFound = true;
                }            
            });
        }
        else {

        }
        
        if(!matchFound){            
            var newItem = Ext.create('August.model.purchase.OrderItem', {                
                style: rec.data.style,
                color: rec.data.color,
                memo: rec.data.memo,
                unit1: rec.data.unit1,
                unit2: rec.data.unit2,
                unit3: rec.data.unit3,
                unit4: rec.data.unit4,
                unit5: rec.data.unit5,
                unit6: rec.data.unit6,
                unit7: rec.data.unit7,
                unit8: rec.data.unit8,
                unit9: rec.data.unit9,
                unit10: rec.data.unit10,
                unit11: rec.data.unit11,
                unit12: rec.data.unit12,
                unit13: rec.data.unit13,
                unit14: rec.data.unit14,
                unit15: rec.data.unit15,
                unitSum: rec.data.total,
                price: rec.data.price,
                status: rec.data.status,
                SONo: rec.data.orderNO,
                sodid: rec.data.sodId,
                warehouse: rec.data.wh,
                season: rec.data.season,
                etadate: theOrder.get('etaDate')
            });                
            
            var item = theOrder.purchaseorderitems().add(newItem);
        }

        var styles = theOrder.get('styles');        
        if(styles.indexOf(rec.data.style) == -1){
            styles.push(rec.data.style);
        }        
        theOrder.set('styles', styles);

        var total = theOrder.get('totalUnits');
        total += rec.data.total;
        theOrder.set('totalUnits', total);
                
        //console.log(theOrder.get('styles'), theOrder.purchaseorderitems().getCount(), theOrder.get('totalUnits'), styles, total);

        theOrder.purchaseorderitems().each(function(rec, idx){
            rec.set('line', idx+1);
        });

        store.add(theOrder);                     
    }

});
