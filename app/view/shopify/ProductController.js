Ext.define('August.view.shopify.ProductController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.shopify-product',

    requires: [        
        //'August.model.Color'
    ],

    listen: {
        component: {
            'window': {
                close: function(w){
                    this.mv.unmask();
                }
            }
        }
    },

    init: function(){
        //console.log(this.lookupReference('multiview').refs);
        var me = this;

        me.mv = August.app.getMainView();        
    },

    onBeforeStoreLoad: function(store){
        var me = this,            

            topbar = me.getView().down("toolbar"),
            combo = topbar.down("combo[name=sites]");

        Ext.apply(store.getProxy().extraParams, {            
            store: combo.getValue()
        });
    },

    onStoreChange: function(combo, nValue, oValue){
        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('shopifyproducts'),
            bbar = me.getView().down("toolbar[dock=bottom]"),
            nextBtn = bbar.down("button[name=next]"),
            prevBtn = bbar.down("button[name=prev]"); 

        vm.set('shopifyLink', null);
        store.getProxy().setExtraParams({}); 

        store.load({
            callback: function(recs, op, success){
                var linkInfo = op.getResponse().responseJson.LinkHeader;
                
                nextBtn.setDisabled(linkInfo == null || linkInfo.NextLink == null);   
                prevBtn.setDisabled(linkInfo == null || linkInfo.PreviousLink == null);  

                vm.set('shopifyLink', linkInfo);
            }
        });
    },    

    onActEditClick: function(b, c){
        //console.log(b, c);

        var layout = this.lookupReference('multiview'),
            grid = layout.lookupReference('shopify-product-grid') || layout.lookupReference('tiles'),
            rec = grid.getSelection()[0];

        //console.log(rec.data.id);
        //this.showWindow(grid.getSelection()[0]);
        this.redirectTo("shopify-product/edit/" + rec.data.id);
    },

    /**
     *
     * @param b
     * @param c
     */
    onActCopyClick: function(b, c){
        var me = this,
            multiview = me.getView().lookupReference('multiview'),
            grid = multiview.lookupReference('grid'),
            rec = grid.getSelectionModel().selected.items[0];

        me.showWindow(rec, 'windows-style-stylecopy', function(type){
            var win = me.win,
                //colorStore = win.down('multiselector').getStore(),
                colors = win.lookupReference('colors'),
                divisionSize = win.lookupReference('divisionSize'),
                btnSave = win.down('button[action="save"]');

            divisionSize.setHidden(true);

            win.lookupReference('chkNewColor').on('change', function(c, n, o){
                if(!n){
                    colors.setValue('');
                }
                btnSave.setDisabled(n === true && colors.getValue().length === 0);
            });

            colors.on('change', function(c, n, o){
                btnSave.setDisabled(c.getValue().length === 0);
            });

            /*
            colorStore.on('datachanged', function(store){
                btnSave.setDisabled(store.getCount() == 0);
            });
            */

            win.on('saveclick', me.onSaveCopy, me);
        });

        //var wvm = me.win.getViewModel();
        /*
        wvm.setStores({
            colors: {
                //storeId: 'memMyColors',
                pageSize: 50,
                remoteFilter: true,
                proxy: {
                    type: 'memory',
                    enablePaging: true,
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                }
            }
        });

        var remoteColors = Ext.create('Ext.data.Store', {
            model: 'Color',

            pageSize: 0,
            autoLoad: true,

            remoteFilter: true,

            proxy: {
                type: 'ajax',
                url: '/api/Options/colors',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                    //totalProperty: 'total',
                    //successProperty: 'success'
                }
            },

            listeners: {
                load: function(s){

                    wvm.getStore('colors').getProxy().setData(s.getRange());
                    wvm.getStore('colors').load();

                }
            }
        });
        */
    },

    onActRefreshClick: function(b, c){
        var me = this,
            vm = me.getViewModel(),
            linkInfo = vm.get('shopifyLink'),
            store = vm.getStore('shopifyproducts'),
            bbar = me.getView().down("toolbar[dock=bottom]"),
            nextBtn = bbar.down("button[name=next]"),
            prevBtn = bbar.down("button[name=prev]");

            if(linkInfo == null){
                store.getProxy().setExtraParams({});
            }   

        store.load({
            callback: function(recs, op, success){
                var linkInfo = op.getResponse().responseJson.LinkHeader;
                console.log(bbar, nextBtn, linkInfo);
                
                nextBtn.setDisabled(linkInfo == null || linkInfo.NextLink == null);   
                prevBtn.setDisabled(linkInfo == null || linkInfo.PreviousLink == null);  
                vm.set('shopifyLink', linkInfo);
            }
        });
    },

    onActDeleteClick: function(b, c){
        var me = this;
        Ext.Msg.show({
            title:'Warning!',
            message: 'Are you sure you want to delete this?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'ok') {
                    //grid.getStore().remove(rec);
                    var layout = me.lookupReference('multiview'),
                        grid = layout.lookupReference('grid'),
                        rec = grid.getSelection()[0];

                    //rec.drop();
                    //me.saveStore(grid, me.getView());
                }
            }
        });
    },

    onUpdatePhotoClick: function(b, e){
        var me = this,
            multiview = me.getView().lookupReference('multiview'),
            grid = multiview.lookupReference('shopify-product-grid'),
            rec = grid.getSelectionModel().selected.items[0];        

        me.showWindow(rec, 'shopify-windows-photoupdate', function(type){

            var win = me.win,
                wvm = win.getViewModel(),
                store = wvm.getStore('options'),
                //btnSave = win.getDockedItems('toolbar[dock="bottom"] > button[action="save"]')[0];
                btnUpdate = win.down('button[action="update"]');            
            
            var colors = rec.options().first().get('values'),
                images = rec.images(),
                src = images.first().get('src'),                
                idx = src.indexOf('/products/'),
                locationSrc = src.substring(0, idx);
            
                console.log(images);
            wvm.setData({ source: locationSrc + '/files/'});                        

            colors.forEach(color => {
                var ctr = 0;
                images.each(function(image) {
                    if(image.get('src').includes(color)){
                        ctr = ctr + 1;
                    }
                });

                store.add({ color: color, qty: ctr, total: 7 })
            });            
            /*
            wvm.getStore('photos').on('datachanged', function(store){
                btnUpdate.setDisabled(store.getCount() == 0);
                
                //console.log('publishes - store datachanged', store.first());
            });
            */            
            
            win.on('updateclick', me.onUpdateProductImage, me);
        });
    },

    onUpdateProductImage: function(){
        var me = this,
            wvm = me.win.getViewModel(),
            store = wvm.getStore('options'),
            multiview = me.getView().lookupReference('multiview'),            
            topbar = multiview.lookupReference("topbar"),
            combo = topbar.down("combo[name=sites]"),
            comboSelected = combo.getSelection(),
            
            grid = multiview.lookupReference('shopify-product-grid'),
            rec = grid.getSelectionModel().selected.items[0];

        var processMask = new Ext.LoadMask({
            msg: 'Saving... Please wait',
            target: me.getView()
        });        
        
        var p = rec.getData(true),
            colorQty = {};
        
        store.each(function(rec){
            colorQty[rec.data.color] = rec.data.total;    
        });

        console.log(wvm.get('source'), wvm.get('total'));

        Ext.Ajax.request({
            url: '/WebApp/api/ShopifyProducts/' + rec.get('id') + "/ImageUpdate",            
            method: 'PUT',        
            //useDefaultXhrHeader: false,
            //cors: true,
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
            },

            jsonData: p,

            params: {
                store: comboSelected.get('name'),
                source: wvm.get('source'),
                colorsQty: JSON.stringify(colorQty)
            }
            
        }).then(function(response){
            var result = Ext.decode(response.responseText, false);
            console.log('callback from shopify', response);
            if(result =! null) {

            }
            else {

            }   
            
            processMask.hide('', function() {
                Ext.Msg.alert('Status', 'Changes saved successfully.', function(){
                    me.getViewModel().getStore('shopifyproducts').reload();
                });
            });

        }).otherwise(function(reason){
            processMask.hide('', function() {
                console.log(reason);
                Ext.Msg.alert(reason.statusText + ' - ' + reason.status, reason.responseText, function(){
                    me.getViewModel().getStore('shopifyproducts').reload();
                });
            });                        
                     
        });
        
        me.win.close();
        processMask.show();
    },

    onContextMenuEditClick: function(d, c){

    },

    onContextMenuBookmarkClick: function(d, c){
        this.addBookmark(d, this.getView());
    },

    onClearFilters: function(b){
        var me = this,
            layout = me.view.lookupReference("multiview"),
            topbar = layout.lookupReference("topbar"),
            searchcombo = topbar.lookupReference('searchcombo'),
            searchgrid = topbar.down('searchgrid'),
            grid = layout.lookupReference("shopify-product-grid");

        searchcombo.setValue('');
        searchcombo.getTrigger('clear').hide();
        searchgrid.setValue('');
        searchgrid.getTrigger('clear').hide();

        // Clear Sort...
        grid.getStore().sorters.clear();
        // Clear Grid filters...
        grid.filters.clearFilters();
    },

    /**
     *
     * @param sm
     * @param rec
     * @param index
     * @param eOpts
     */
    onSelect: function(sm, rec, index, eOpts){
        //onSelectionChange: function(sm, selected, eOpts) {

        var layout = this.getView().lookupReference('multiview'),
            refs = layout.getReferences(),
            topbar = refs.topbar,
            display = refs.display;

        //display.setActive(rec);

        //console.log(rec);
        var k = [],
            q = topbar.lookupReference("viewselection");

        k[0] = "shopify-product";
        //k[1] = q.value == 0 ? "default" : q.value == 1 ? "medium" : "tiles";
        k[1] = "default";
        k[2] = rec.get("id");

        console.log('grid - onSelect', rec);
        this.redirectTo(k.join("/"));
    },

    onItemContextMenu:function(h, j, k, g, l){
        l.stopEvent();

        var sm = h.getSelectionModel();

        if(!sm.isSelected(g)){
            sm.select(g);
        }

        this.view.contextmenu.showAt(l.getXY());
    },

    showWindow: function(rec, xtype, callback){
        var me = this,
            view = me.getView(),
            multiview = view.lookupReference('multiview');

        me.isEdit = !!rec;

        me.win = view.add({
            xtype: xtype,

            viewModel: {
                data: {
                    selected: rec
                }
            },
            // Create a child session that will spawn from the current session of this view
            session: true,

            renderTo: Ext.getBody()
        });

        me.win.show('', function(){
            me.mv.mask();
        });

        if(typeof callback === "function"){
            callback(xtype);
        }
    }

});
