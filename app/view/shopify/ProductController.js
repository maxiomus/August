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

    onBeforeStoreLoad: function(store, opt, e){
        var me = this,            

            topbar = me.getView().down("toolbar"),
            combo = topbar.down("combo[name=sites]");
        
        //console.log('Shopify Product beforeload', opt, e);

        store.getProxy().setHeaders({
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        });

        Ext.apply(store.getProxy().extraParams, {            
            store: combo.getValue().toUpperCase()
        });
               
    },            

    onStoreLoad: function(store, recs, success, opt){
        var me = this,
            vm = me.getViewModel(),
            //store = vm.getStore('shopifyproducts'),
            bbar = me.getView().down("toolbar[dock=bottom]"),
            nextBtn = bbar.down("button[name=next]"),
            prevBtn = bbar.down("button[name=prev]"); 
            
        var linkInfo = opt.getResponse().responseJson.pageInfo;
        
        //vm.set('shopifyLink', null);
        vm.set('shopifyLink', linkInfo);
        //store.getProxy().setExtraParams({}); 

        //console.log('Shopify Product load', success, opt.getResponse());

        nextBtn.setDisabled(linkInfo == null || linkInfo.hasNextPage == false);   
        prevBtn.setDisabled(linkInfo == null || linkInfo.hasPreviousPage == false);          
        
    },

    onStoreChange: function(combo, nValue, oValue){
        var me = this,
            vm = me.getViewModel(),
            multiview = me.getView().lookupReference('multiview'),
            grid = multiview.lookupReference('shopifyProductGrid'),
            store = vm.getStore('shopifyproducts'),
            bbar = me.getView().down("toolbar[dock=bottom]"),
            nextBtn = bbar.down("button[name=next]"),
            prevBtn = bbar.down("button[name=prev]"); 

        vm.set('shopifyLink', null);
        store.getProxy().setExtraParams({}); 

        grid.getSelectionModel().deselectAll();

        store.load({
            callback: function(recs, op, success){
                //var linkInfo = op.getResponse().responseJson.LinkHeader;
                //console.log(op.getResponse().responseJson);
                var linkInfo = op.getResponse().responseJson.pageInfo;
                
                nextBtn.setDisabled(linkInfo == null || linkInfo.hasNextPage == false);   
                prevBtn.setDisabled(linkInfo == null || linkInfo.hasPreviousPage == false);  
                //nextBtn.setDisabled(linkInfo == null || linkInfo.NextLink == null);   
                //prevBtn.setDisabled(linkInfo == null || linkInfo.PreviousLink == null);  

                vm.set('shopifyLink', linkInfo);
                
            }
        });
    },    

    onActEditClick: function(b, c){
        //console.log(b, c);

        var layout = this.lookupReference('multiview'),
            grid = layout.lookupReference('shopifyProductGrid') || layout.lookupReference('tiles'),
            rec = grid.getSelection()[0];

        //console.log(rec.data.id);
        //this.showWindow(grid.getSelection()[0]);
        this.redirectTo("shopify-product/edit/" + rec.data.id);
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

    onActRefreshClick: function(b, c){
        var me = this,
            vm = me.getViewModel(),
            linkInfo = vm.get('shopifyLink'),
            store = vm.getStore('shopifyproducts'),
            bbar = me.getView().down("toolbar[dock=bottom]");
            //nextBtn = bbar.down("button[name=next]"),
            //prevBtn = bbar.down("button[name=prev]");

            if(linkInfo == null){
                store.getProxy().setExtraParams({});
            }   

        //console.log('refresh', store);

        store.load({
            callback: function(recs, op, success){
                //var linkInfo = op.getResponse().responseJson.LinkHeader;
                console.log(op.getResponse().responseJson);
                var linkInfo = op.getResponse().responseJson.pageInfo;
                //console.log(bbar, nextBtn, linkInfo);
                
                //nextBtn.setDisabled(linkInfo == null || linkInfo.NextLink == null);   
                //prevBtn.setDisabled(linkInfo == null || linkInfo.PreviousLink == null);  
                nextBtn.setDisabled(linkInfo == null || linkInfo.hasNextPage == false);   
                prevBtn.setDisabled(linkInfo == null || linkInfo.hasPreviousPage == false);  
                vm.set('shopifyLink', linkInfo);
            }
        });
    },

    onAddVariantsClick: function(b, e){
        var me = this,
            multiview = me.getView().lookupReference('multiview'),
            grid = multiview.lookupReference('shopifyProductGrid'),
            topbar = multiview.lookupReference("topbar"),
            combo = topbar.down('combo[name=sites]'),
            rec = grid.getSelectionModel().selected.items[0];
            
        //console.log('onAdd', combo.getSelection().get('value'));
        console.log('onAddVariant', rec.variants());
        var variant = rec.get('variant'),
            sku = variant.sku.split('-');
                            
        var param = {
            //style: rec.get('handle').split('-').pop(),
            style: sku[0],
            siteid: combo.getSelection().get('value'),
            store: combo.getValue(),
            product_id: rec.get('id')
        }
                
        me.showWindow(param, 'shopify-windows-variantupdate', b, function(type){

            var win = me.win,
                wvm = win.getViewModel(),
                //btnSave = win.getDockedItems('toolbar[dock="bottom"] > button[action="save"]')[0];
                btnPublish = win.down('button[action="publish"]');            
                                    
            wvm.getStore('publishes').on('datachanged', function(store){
                btnPublish.setDisabled(store.getCount() == 0);
                
                //console.log('publishes - store datachanged', store.first());
            });
            
            win.on('publishclick', me.onPublishVariants, me);
        });
    },    

    onPublishVariants: function(b, c) {        

        var me = this,
            saveColors = [],
            wvm = me.win.getViewModel(),
            param = wvm.get('selected'),
            topbar = me.win.down("toolbar"),
            withImages = topbar.down('checkbox[name=withImages]'),
            numOfImages = topbar.down('combobox[inputId=numOfImages]'),
            //styleGrid = me.getView().lookupReference('style-grid'),
            //styleRec = styleGrid.getSelectionModel().selected.items[0],
            //topbar = c.down("toolbar"),
            //combo = topbar.down("combo[name=site]"),
            //comboSelected = combo.getSelection(),
            publishGrid = c.lookupReference('publishGrid'),
            //attributeGrid = c.lookupReference('attributeGrid'),                                    
            store = publishGrid.getStore();        

        var publishData = [];

        store.each(function(rec, idx){
            if(rec.get('toPublish') == true && rec.get('published') == false){
                //store.remove(rec);                   
                publishData.push(rec.getData(true));
                saveColors.push(rec.get('color'));
            }
            else{
                //saveColors.push(rec.get('color'));
            }
            
        });
        
        var processMask = new Ext.LoadMask({
            msg: 'Saving... Please wait',
            target: me.win
        });                        
        
        //console.log(store.getRange(), store.getData(true), store.first().getData(true));
        var postfix = '';
        if(withImages.getValue()){
            postfix = '&imgCnt=' + numOfImages.getValue();
        }
        

        console.log('sessinon', store.getSession().getChanges());
        Ext.Ajax.request({
            url: '/WebApp/api/ShopifyVariants/' + param.store + '/Product/' + param.product_id.replace('gid://shopify/Product/', '') + '?img=' + withImages.getValue() + postfix,
            method: 'POST',        
            //useDefaultXhrHeader: false,
            //cors: true,
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
            },
            jsonData: publishData,
            /*
            params: {
                store: param.store
            }
            */                            
        }).then(function(response){
            var result = Ext.decode(response.responseText, false);
            console.log('callback from shopify', response.responseJson);
            if(result =! null) {
                store.each(function(rec, idx){
                    if(rec.get('toPublish') == true || rec.get('published' != true)){
                        rec.set('published', true);                        
                        rec.set('toPublish', false);                        
                    }
                });

                console.log('st', store.getSession().data);
                store.sync({
                    success: function(batch, opts) {
                        //me.win.close();
                        store.load();
                        processMask.hide('', function() {
                            Ext.Msg.alert('Status', 'Changes saved successfully.', function(){
                                console.log(result);
                            });
                        });                
                    },
                    failure: function(batch, opts) {
                        console.log(opts);
                        //var resp = opts.getResponse();                
                        processMask.hide('', function() {
                            Ext.Msg.alert(resp.statusText + ' - ' + resp.status, resp.responseJson.Message);
                        });
                    },
                    callback: function (batch, opts) {
                        //console.log(opts);
                    }    
                });
            }
                 
        }).otherwise(function(reason){
            console.log(reason);
            processMask.hide('', function() {
                
                Ext.Msg.alert('Status ' + reason.status, reason.responseText.replace(/\\/g, ""));
            });                        
                     
        });
        
        //me.win.close();
        processMask.show();
    },  

    onActAddPhotoClick: function(b, e) {
        var me = this,
            multiview = me.getView().lookupReference('multiview'),
            grid = multiview.lookupReference('shopifyProductGrid'),
            topbar = multiview.lookupReference("topbar"),
            combo = topbar.down('combo[name=sites]'),
            rec = grid.getSelectionModel().selected.items[0];        
        
        me.showWindow(rec, 'shopify-windows-photoupdate', b, function(type){

            var win = me.win,
                wvm = win.getViewModel(),
                store = wvm.getStore('options'),
                //btnSave = win.getDockedItems('toolbar[dock="bottom"] > button[action="save"]')[0];
                //tabs = me.lookupReference('tabs4colors'),
                selectedStore = combo.getSelection(),
                btnUpload = win.down('button[action="upload"]');            
                        
            var options = rec.get('options'),
                colors = options[0].values,
                images = rec.images(),
                variants = rec.variants(),
                
                //src = images.first().get('src'),                
                //idx = src.indexOf('/products/'),
                //locationSrc = src.substring(0, idx);
                locationSrc = "https://jirho.com/web-images/" + selectedStore.get('imageSrc') + "/"                        
                
            wvm.setData({ title: rec.get('title') });
            wvm.setData({ store: selectedStore.get('name') });
            wvm.setData({ source: selectedStore.get('imageSrc') });                        

            console.log('photo update', variants);

            colors.forEach(color => {
                var ctr = 0,
                    sub = [];

                images.each(function(image) {                                        
                    var idx = 0,
                        imgName = image.get('src');

                    if(imgName.toLowerCase().includes(color.replace(/\/+/g,'').replace(/\s+/g,'').toLowerCase())){
                        ctr = ctr + 1;
                        idx = imgName.lastIndexOf(".jpg");
                        
                        var off = 3,
                            prefix = imgName.substring(idx - off, idx);

                        if(isNaN(prefix)){
                            off = 37;
                        }
                        
                        sub.push(imgName.substring(idx - off, idx));
                    }                                                             
                   
                });                

                store.add({ color: color, uploaded: sub.join(','), addition: "" });
                
            });            
            /*
            wvm.getStore('photos').on('datachanged', function(store){
                btnUpdate.setDisabled(store.getCount() == 0);
                
                //console.log('publishes - store datachanged', store.first());
            });
            */            
            
            win.on('uploadclick', me.onUploadProductImage, me);
        });    
    },

    onTagSelected: function(tag, rec) {
        var vm = this.getViewModel();

        vm.set('selectedStores', tag.getValue().join());
        console.log('tag', tag.getValue(), vm.get('selectedStores'));
    },
    
    /**
     *
     * @param b
     * @param c
     */
    onSyncClick: function(b, c){
        var me = this,
            multiview = me.getView().lookupReference('multiview');

        me.showWindow(null, 'shopify-windows-inventorysync', b, function(type){
            var win = me.win,
                //colorStore = win.down('multiselector').getStore(),                
                tag = win.down('tagfield[name="targetStores"]');                        
            
            win.on('syncclick', me.onSync, me);
        });
        
    },  

    onSync: function(b, e){

        var me = this,
            vm = me.getViewModel(),
            selected = vm.get('selectedStores');
            //topbar = me.getView().down("toolbar"),
            //combo = topbar.down("combo[name=sites]"),
            //selected = combo.getSelection();                

        var processMask = new Ext.LoadMask({
            msg: 'Syncing... Please wait',
            target: me.getView()
        });        
                    
        Ext.Ajax.setTimeout(600000);
        Ext.Ajax.request({
            url: '/WebApp/api/ShopifyInvs/Set/' + selected,          
            method: 'GET',        
            //useDefaultXhrHeader: false,
            cors: true,
            disableCaching: false,                        

            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
            },
            
            params: {
                
            }
                                
        }).then(function(response){
            var result = response.responseText;
            console.log(response, result);                        

            if(result =! null) {
                processMask.hide('', function() {
                    Ext.MessageBox.show({                        
                        title: 'Status: Sync Complete',
                        iconCls: 'x-fa fa-info-circle', 
                        //'Inventory Updated Successfully!',     
                        msg: response.responseText, 
                        width: 420,
                        height: 280,        
                        animateTarget: me.getView(),
                        buttons: Ext.MessageBox.OK
                    });
                });                
            }
            else {

            }                      
        }).otherwise(function(reason){
            processMask.hide('', function() {
                console.log(reason);
                //Ext.Msg.alert(reason.statusText + ' - ' + reason.status, reason.responseJson.Message);
            });
            
            if(batch.hasException) {
                for (var i = 0; i < batch.exceptions.length; i++) {
                    switch (batch.exceptions[i].action) {
                        case "destroy" :
                            msg = msg + batch.exceptions[i].records.length + " Delete, ";
                            break;
                        case "update" :
                            msg = msg + batch.exceptions[i].records.length + " Update, ";
                            break;
                        case "create" :
                            msg = msg + batch.exceptions[i].records.length + " Create, ";
                            break;
                    }
                }

                Ext.Msg.alert("Status", msg + " operation failed!");
            }
            else
            {
                Ext.Msg.alert('Status', 'Changes failed.');
            }
                     
        });
                
        me.win.close();
        processMask.show();
    },

    onUploadPhotoClick: function(b, e){
        var me = this,
            multiview = me.getView().lookupReference('multiview'),
            grid = multiview.lookupReference('shopifyProductGrid'),
            topbar = multiview.lookupReference("topbar"),
            combo = topbar.down('combo[name=sites]'),
            rec = grid.getSelectionModel().selected.items[0];        
        
        me.showWindow(rec, 'shopify-windows-photoupdate', b, function(type){

            var win = me.win,
                wvm = win.getViewModel(),
                store = wvm.getStore('options'),
                //btnSave = win.getDockedItems('toolbar[dock="bottom"] > button[action="save"]')[0];
                selectedStore = combo.getSelection(),
                btnUpdate = win.down('button[action="update"]');            
            
            var options = rec.get('options'),
                colors = options[0].values,
                images = rec.images(),
                //src = images.first().get('src'),                
                //idx = src.indexOf('/products/'),
                //locationSrc = src.substring(0, idx);
                locationSrc = "https://jirho.com/web-images/" + selectedStore.get('imageSrc') + "/"
            
                        
            wvm.setData({ title: rec.get('title') });
            wvm.setData({ store: selectedStore.get('name') });
            wvm.setData({ source: locationSrc });                        

            colors.forEach(color => {
                var ctr = 0;
                images.each(function(image) {                                        
                    if(image.get('src').toLowerCase().includes(color.replace(/\/+/g,'').replace(/\s+/g,'').toLowerCase())){
                        ctr = ctr + 1;
                    }
                });

                store.add({ color: color, qty: ctr, total: 5 })
            });            
            /*
            wvm.getStore('photos').on('datachanged', function(store){
                btnUpdate.setDisabled(store.getCount() == 0);
                
                //console.log('publishes - store datachanged', store.first());
            });
            */            
            
            win.on('uploadclick', me.onUploadProductImage, me);
        });
    },

    onUploadProductImage: function(){
        var me = this,
            wvm = me.win.getViewModel(),
            store = wvm.getStore('options'),
            multiview = me.getView().lookupReference('multiview'),            
            topbar = multiview.lookupReference("topbar"),
            combo = topbar.down("combo[name=sites]"),
            comboSelected = combo.getSelection(),
            
            grid = multiview.lookupReference('shopifyProductGrid'),
            rec = grid.getSelectionModel().selected.items[0];

        var processMask = new Ext.LoadMask({
            msg: 'Saving... Please wait',
            target: me.getView()
        });        
        
        var p = rec.getData(true),
            colorQty = {};
        
        store.each(function(rec){
            colorQty[rec.data.color] = !Ext.isEmpty(rec.get('addition')) ? rec.get('addition').join(',') : "";    
        });

        //console.log(wvm.get('source'), wvm.get('total'));

        Ext.Ajax.request({
            url: '/WebApp/api/ShopifyProducts/' + rec.get('id') + "/ImageUpdate",            
            method: 'PUT',        
            timeout: 900000,
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
            //searchcombo = topbar.lookupReference('searchcombo'),
            //searchtext = topbar.down('searchtextlist'),
            grid = layout.lookupReference("shopifyProductGrid");

        //searchcombo.setValue('');
        //searchcombo.getTrigger('clear').hide();
        //searchtext.setValue('');
        //searchtext.getTrigger('clear').hide();

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
        
        var me = this,
            //vm = me.getViewModel(),
            layout = me.getView().lookupReference('multiview'),            
            refs = layout.getReferences(),
            //grid = refs.shopifyProductGrid,
            topbar = refs.topbar;
                            
            //display = refs.display,
            //option1 = rec.options().first(),
            //colors = "";        

        var k = [],
            q = topbar.lookupReference("viewselection");

        k[0] = "shopify-product";
        //k[1] = q.value == 0 ? "default" : q.value == 1 ? "medium" : "tiles";
        k[1] = "default";

        var id = rec.get("id");
        k[2] = id.replace('gid://shopify/Product/', '');
        
        me.redirectTo(k.join("/"));                   
    },

    onSelectionChange: function(sm, selected){
        var me = this, 
            mv = me.getView().lookupReference('multiview'),            
            topbar = mv.lookupReference('topbar'),
            combo = topbar.down("combo[name=sites]"),
            v_proxy = August.model.shopify.ProductVariantGQ.getProxy(),
            i_proxy = August.model.shopify.ProductImage.getProxy();

        console.log('onRender', topbar, combo);
        v_proxy.setHeaders({
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        });

        Ext.apply(v_proxy.extraParams, {            
            store: combo.getValue()
        });

        i_proxy.setHeaders({
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        });

        Ext.apply(i_proxy.extraParams, {            
            store: combo.getValue()
        });
    },

    onItemContextMenu:function(h, j, k, g, l){
        l.stopEvent();

        var sm = h.getSelectionModel();

        if(!sm.isSelected(g)){
            sm.select(g);
        }

        this.view.contextmenu.showAt(l.getXY());
    },

    showWindow: function(rec, xtype, btn, callback){
        var me = this,
            view = me.getView(),
            multiview = view.lookupReference('multiview');        

        me.win = view.add({
            xtype: xtype,

            viewModel: {
                data: {
                    selected: rec
                },

                formulas: {
                    uppercase: function(get) {
                        return get('selected');
                    }
                }
            },
            // Create a child session that will spawn from the current session of this view
            session: true,

            animateTarget: btn,
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
