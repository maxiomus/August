Ext.define('August.view.production.LineSheetController', {
    extend: 'Ext.app.ViewController',

    mixins: [
        'Ext.app.route.Base'
    ],

    alias: 'controller.production-linesheet',

    requires: [
        'August.model.Media'
    ],

    init: function () {
        //console.log(this.lookupReference('multiview').refs);
    },

    initViewModel: function(vm) {                   
        
        var me = this,
            view = me.getView(),
            //memStore = view.memStylesInLines,
            //toolbar = view.getDockedItems('toolbar[dock="top"]')[1],            
            binding = vm.bind('{theLineSheet}',
            //bindTo: '{theLineSheet}',
            //deep: true
            //single: true
            function(rec){            

                var store = rec.stylesInLines(),
                    proxy = store.getProxy();

                //store.setPageSize(8);            
                console.log('root binding - callback', store);

                vm.set('count', store.getCount());
                vm.set('onhand', store.sum('ohs'));

                view.setLoading(true);                            

                store.on('load', function(s){
                    //memStore.getProxy().setData(s.getRange());                
                    //memStore.load();

                    //vm.set('count', s.getCount());
                    //vm.set('onhand', s.sum('ohs'));
                });
                
                /*
                if(toolbar && toolbar.items.length > 0){
                    var s = toolbar.down("tbtext[name=count]"),
                        h = toolbar.down("tbtext[name=onhand]");
                 
                    s.setText('Total Styles: ' + store.getCount());
                    h.setText('Total On Hand: ' + store.sum('ohs'));
                }
                */

                view.setLoading(false);
                binding.destroy();


            }, this);    
            
            if(binding){
                view.setLoading(false);
            }                           
    },

    onLineSheetRender: function(c) {
                
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

    onItemClickRemove: function(panel, widget){
        //console.log(panel, widget);
        var me = this;

        Ext.Msg.show({
            title:'Warning!',
            message: 'Are you sure you want to remove this?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'ok') {
                    //grid.getStore().remove(rec);
                    var view = me.getView().down('style-view'),
                        line = me.getViewModel().get('theLineSheet'),
                        selected = view.getSelection();

                    Ext.apply(view.getStore().getProxy().extraParams, {
                        lineseq: line.data.lineseq
                    });

                    Ext.each(selected, function(rec){
                        rec.drop();
                    });

                    me.saveStore(view.getStore(), view);
                }
            }
        });
    },

    onItemClickRefresh: function(panel, widget){
        var store = panel.down('style-view').getStore();

        store.reload();
    },

    onItemClickPrint: function(panel, widget){
        var me = this,
            line = me.getViewModel().get('theLineSheet'),
            store = line.stylesInLines(),
            showCost = me.getView().down('toggleslidefield').getValue(),
            template = me.getView().down('combo[name=templates]'),
            button = me.getView().down('multisortbutton'),
            mv = August.app.getMainView(),
            xf = Ext.util.Format;
        
        var data = {};
        store.getFilters().each(function(filter){
            console.log(filter);
            if(filter.getProperty() != 'lineseq'){
                data[filter.getProperty()] = encodeURIComponent(filter.getValue());
            }
        });
        //console.log(data)
        var url = xf.format('/WebApp/services/LineSheetPrint.ashx?lineseq={0}', line.data.lineseq);
        //var url = xf.format('../services/LineSheetPrint.ashx?lineseq={0}', line.data.lineseq);
        //var url = '../services/LineSheetPrint.ashx?';

        if(Object.keys(data).length > 0){
            url = Ext.String.urlAppend(url, Ext.Object.toQueryString(data));
        }

        if(template){
            url = Ext.String.urlAppend(url, xf.format('template={0}', template.getValue()));
        }

        if(button){            
            url = Ext.String.urlAppend(url, xf.format('sort={0}', button.getDataIndex()+'-'+button.getDirection()));
        }

        if(showCost){
            url = Ext.String.urlAppend(url, xf.format('cost={0}', showCost));
        }

        var pw = panel.add({
            xtype: 'window',

            title: 'Line Sheet # ' + line.data.lineseq,
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

    /**
     * 
     * @param {Ext.form.field.ComboBox} c 
     * @param {Ext.data.Model} rec ComboBox Selection Record
     */
    onTemplateSelect: function(c, rec) {
        console.log(c, rec);
    },

    /**
     *
     * @param {Ext.form.field.ComboBox} c
     * @param {String} v ComboBox Value
     */
    onTriggerSearchClicked: function(c,v){
        
        var me = this,
            vm = me.getViewModel(),
            title = vm.get('title'),
            rec = vm.get('theLineSheet'),
            store = rec.stylesInLines(),
            filters = store.getFilters();                     

        store.setRemoteFilter(false);        
                
        var filterSub = new Ext.util.Filter({
            property: 'category',
            value: v,
            operator: 'in'
        });

        if(!Ext.isEmpty(v)) {
            vm.set('title', rec.get('linetitle') + ' - ' + v);

            filters.add(filterSub);            
            
        }
        else {
            vm.set('title', rec.get('linetitle'));
            
            filters.remove(filterSub);       
            
        }
                        
        vm.set('count', store.getCount());
        vm.set('onhand', store.sum('ohs'));
        /*
        // page size change... 
        var me = this,            
            toolbar = me.getView().getDockedItems()[1],
            paging = toolbar.down('combo[name="perpage"]'),
            store = me.getViewModel().getData().theLineSheet.stylesInLines();
                    
        paging.setValue(c.getSelection().data.value);
        
        store.setPageSize(paging.getValue());
        store.load();
        */
    },

    onTriggerClearClicked: function(c,trigger){
        
        var me = this,
            vm = me.getViewModel(),
            title = vm.get('title'),
            rec = vm.get('theLineSheet'),
            store = rec.stylesInLines(),
            filters = store.getFilters();
        
        vm.set('title', rec.get('linetitle'));

        var filterSub = new Ext.util.Filter({
            property: 'category',            
            value: c.getValue(),
            operator: 'in'
        });

        filters.remove(filterSub);

        vm.set('count', store.getCount());
        vm.set('onhand', store.sum('ohs'));
        
        /*
        var toolbar = this.getView().getDockedItems()[1],
        paging = toolbar.down('combo[name="perpage"]');

        paging.setValue(null);
        */
        
    },

    saveStore: function(store, target){
        var processMask = Ext.create('Ext.LoadMask', {
            msg: 'Saving... Please wait',
            target: target
        });
        processMask.show();

        store.sync({
            success: function(batch, op){
                Ext.Msg.alert('Status', 'Changes saved successfully.');

            },
            failure: function(batch, op){
                //console.log(op);
                processMask.hide('', function() {

                });
            },
            callback: function(batch, op){
                processMask.hide('', function() {

                });
            }
        });
    }
});
