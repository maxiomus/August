Ext.define('August.view.sales.windows.PriceTagController', {    
    extend: 'Ext.app.ViewController',

    mixins: [
        'Ext.app.route.Base'
    ],

    alias: 'controller.windows-pricetag',

    requires: [
        //'August.model.Media'
    ],    

    init: function () {
        //console.log(this.lookupReference('multiview').refs);
        var me = this;     
    },

    initViewModel: function(vm) {                   

        var me = this,
            view = me.getView(),
            //memStore = view.memStylesInLines,
            binding = vm.bind({
            bindTo: '{thePriceTag}',
            deep: true,
            single: true
        }, function(rec){
            //console.log('root binding - callback', rec);

            var store = rec.stylesInLines(),
                proxy = store.getProxy();

            //store.setPageSize(8);            

            view.setLoading(true);            

            store.on('load', function(s){

                //memStore.getProxy().setData(s.getRange());                
                //memStore.load();

                view.setLoading(false);
            },{
                single: true
            });

            //rec.samplesInLines().load()
            binding.destroy();

        }, this);
    },

    onItemSelect: function(v){

        this.getView().actRemove.setDisabled(v.getSelection().length == 0);
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
            field = win.down('textfield[name="sonoFilter"]')
            combo = win.down('combo[name="customerFilter"]'),
            store = win.lookupReference('tag-view').getStore(),
            sonos = field.getValue(),
            customer = combo.getValue();

        // remove all filters...
        store.clearFilter(true);        

        if(!Ext.isEmpty(sonos)){
            sonos = sonos.split(',').map(function(item){
                if(!isNaN(item)){
                    return parseInt(item, 10);
                }
    
                return Ext.String.trim(item);
            });

            store.getFilters().add(new Ext.util.Filter({
                id: 'sonoFid',
                operator: 'in',
                property: 'orderno',
                type: 'list',
                value: sonos
            }));
        }
        
        if(!Ext.isEmpty(customer)){
            store.getFilters().add(new Ext.util.Filter({
                id: 'customerFid',
                property: 'customer',
                value: customer
            }))
        }

        store.reload();
    },

    onItemClickPrint: function(panel, widget){
        var me = this,
            store = me.getViewModel().getStore('pricetags'),
            showCost = me.getView().down('toggleslidefield').getValue(),
            mv = August.app.getMainView(),
            xf = Ext.util.Format;

        //console.log(me.getView().down('toggleslidefield').getValue());
        var data = {};
        store.getFilters().each(function(filter){
            if(filter.getProperty() != 'sono'){
                data[filter.getProperty()] = filter.getValue();
            }
        });
        //console.log(data)
        var url = xf.format('/WebApp/services/PriceTagPrint.ashx?sono={0}', 0);
        //var url = xf.format('../services/LineSheetPrint.ashx?lineseq={0}', line.data.lineseq);
        //var url = '../services/LineSheetPrint.ashx?';

        if(Object.keys(data).length > 0){
            url = Ext.String.urlAppend(url, Ext.Object.toQueryString(data));
        }

        if(showMSRP){
            url = Ext.String.urlAppend(url, xf.format('cost={0}', showMSRP));
        }

        var pw = panel.add({
            xtype: 'window',

            title: 'Print Tag by S.O',
            iconCls: "x-fa fa-th",

            layout: {
                type: 'fit'
            },

            renderTo: Ext.getBody(),

            //maximized: true,
            maximizable: true,
            //alignTarget: '',
            width: panel.getWidth() * 0.98,
            //maxWidth: 1366,
            height: panel.getHeight() * 0.98,

            items: [{
                xtype: 'component',
                itemId: 'contentIframe',
                autoEl: {
                    tag: 'iframe',
                    style: 'height: 100%; width: 100%; border: none',
                    src: url
                }
            }],

            buttons: [{
                text: 'Print',
                handler: function(btn){
                    var iframe = pw.getComponent('contentIframe');

                    if(iframe){
                        var cw = iframe.getEl().dom.contentWindow;
                        //console.log(iframe, cw.document);
                        cw.print();
                    }
                }
            }, {
                text: 'Cancel',
                handler: function(btn){
                    pw.close();
                },
                scope: this
            }]
        });

        pw.on('close', function(p){
            mv.unmask();
        });

        pw.show('', function(){
            mv.mask();
        });
    },

    onShowPriceChanged: function(field, nv, ov){
        var me = this,
            combo = field.next('combo[name="figure"]');
            
        //console.log(field.getValue(), typeof field.getValue());
        combo.setDisabled(field.getValue() != 'true');
    },

    onFigureChanged: function(combo, nv, ov){
        var me = this,
            dv = me.getView().lookupReference('tag-view'),
            field = combo.prev('toggleslidefield[name="showPrice"]');
            
        //console.log('onFigureChanged', me.getView());
        //JsBarcode('.barcode').init();
        //dv.refresh();
        //console.log(field.getValue(), typeof field.getValue());
        //field.setFieldLabel(combo.getSelection().get('label'));
    },

    /**
     *
     * @param {Ext.form.field.ComboBox} c
     * @param {String} v ComboBox Value
     */
    onTriggerSearchClicked: function(c,v){
        /*
        var rec = this.getViewModel().get('theLineSheet'),
            store = rec.stylesInLines(),
            filters = store.getFilters();

        store.setRemoteFilter(false);

        var filterSub = new Ext.util.Filter({
            property: 'subcategory',
            value: c.getValue()
        });

        filters.add(filterSub);
        */       

        var me = this,            
            toolbar = me.getView().getDockedItems()[1],
            paging = toolbar.down('combo[name="perpage"]'),
            store = me.getViewModel().getData().theLineSheet.stylesInLines();
                    
        paging.setValue(c.getSelection().data.value);
        
        store.setPageSize(paging.getValue());
        store.load();
    },

    onTriggerClearClicked: function(c,trigger){
        /*
        var rec = this.getViewModel().get('theLineSheet'),
            store = rec.stylesInLines(),
            filters = store.getFilters();

        var filterSub = new Ext.util.Filter({
            property: 'subcategory',
            value: c.getValue()
        });

        filters.remove(filterSub);
        */
        var toolbar = this.getView().getDockedItems()[1],
            paging = toolbar.down('combo[name="perpage"]');
                    
        paging.setValue(null);
        
    },    

    onComboTriggerClear: function(combo,trigger) {
        var store = this.getViewModel().getStore('sodetails'),        
            filter = store.getFilters().get('customerFid');

        if(filter){
            store.getFilters().remove(filter);
        }
        
    },

    onFieldTriggerClear: function(field,trigger) {
        var store = this.getViewModel().getStore('sodetails'),
            filter = store.getFilters().get('sonoFid');
        
        if(filter){
            store.getFilters().remove(filter);
        }
        
        //console.log('onFieldTriggerClear');
    },

    onCustomerFilterSelected: function(combo, rec, e) {
        /*
        var store = this.getViewModel().getStore('sodetails'),
            customer = store.getFilters().get('customerFid');        

        if(customer != null) {
            store.getFilters().remove(customer);
        }   
             
        customer = new Ext.util.Filter({
            id: 'customerFid',
            property: 'customer',
            value: combo.getValue()
        }); 

        store.getFilters().add(customer);
        */
    },

    onUpcLoad: function(store){
        var me = this,
            data = [];                
        
        store.each(function(rec, index){
            for(var i = 1; i <= rec.get('total'); i++){
                var nd = rec.copy(null)

                data.push(nd);
            }
        });        
        
        store.loadData(data);

        JsBarcode(".barcode").init();
        //me.lookupReference('tag-view').bindStore(store);        
        
    }
});
    