Ext.define('August.view.pim.ProductDetailController', {
    extend: 'Ext.app.ViewController',    

    mixins: [
        'Ext.app.route.Base'
    ],

    alias: 'controller.pim-productdetail',

    requires: [
        'August.model.Photo'
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
        var me = this,
            store = me.getViewModel().getStore('productdetails'),
            multiview = me.getView().lookupReference('multiview'),
            topbar = multiview.lookupReference("topbar");                 

        store.on('datachanged', function(s) {
            
            //console.log(s.getNewRecords(), s.getRemovedRecords(), s.getModifiedRecords());
            topbar.actSave.setDisabled(Ext.isEmpty(s.getNewRecords()) && Ext.isEmpty(s.getRemovedRecords()) && Ext.isEmpty(s.getModifiedRecords()));
            //vm.set('modified', true);

        });                    

        me.mv = August.app.getMainView();

        Ext.Ajax.request({
            url: 'resources/data/pim/stores.json',
            scope: me,
            success: function(response){
                var o = {};

                try {
                    o = Ext.decode(response.responseText);
                }
                catch(e){
                    alert(e.message);
                    return;
                }

                if(!o.success){
                    // @todo error handling
                    alert("Unknow error occurs!");
                    return;
                }

                Ext.Object.each(o.stores, function(key, value, itself){
                    var store = me.getViewModel().getStore(key);
                    //console.log(store, key, value)
                    if(store && value){
                        store.loadData(value);
                    }
                });
            },
            failure: function(response){

            }
        });
    },    

    initViewModel: function(vm){
        vm.bind('{selectedProduct}', 'onSelect', this);
            
        console.log('IV', vm);
    },

    onActNewClick: function(b){
        //this.redirectTo("pim/new");
        this.redirectTo("productdetail/new");
    },

    onActNewListClick: function(b) {
        var me = this,
            multiview = me.getView().lookupReference('multiview'),
            grid = multiview.lookupReference('grid'),
            topbar = multiview.lookupReference("topbar"),
            searchlist = topbar.down('searchtextlist');

            //console.log(rec);
        me.showWindow(null, 'pim-windows-list', function(type){

            var win = me.win,
                wvm = win.getViewModel(),
                //btnSave = win.getDockedItems('toolbar[dock="bottom"] > button[action="save"]')[0];                
                field = win.down('searchtextlist'),                
                overwrite = win.down('checkbox[name=overwrite]'),
                styleGrid = win.lookupReference('pim-style-grid'),                  
                btnGenerate = win.down('button[action="generate"]');
            
            if (!Ext.isEmpty(searchlist.getValue())) {
                field.setValue(searchlist.getValue());
                field.activeFilter = searchlist.activeFilter;      
                field.getTrigger('clear').setHidden(false);  
            }
                                    
            /*            
            wvm.getStore('shopifytemplates').on('datachanged', function(store){
                btnTemplate.setDisabled(store.getCount() == 0);
                
                console.log('templates - store datachanged', store.first());
            });
            */
            //win.on('templateclick', me.onSaveWebPublish, me);            

            win.on('generateclick', function(b,c) {
                var store = grid.getStore(),
                    recs = styleGrid.getSelectionModel().getSelection();
                
                Ext.each(recs, function(rec, idx){
                    console.log('pim list', rec);
                    var pdRec = Ext.create('August.model.pim.ProductDetail', {
                        styleId: rec.get('styleId'),                        
                        createUser: August.loggedInUser.userId,
                        photosInProductDetails: []
                    });

                    var npd = store.insert(0, [pdRec]);
                    
                    npd[0].set('style', rec.get('style')),
                    npd[0].set('color', rec.get('color')),                    
                    npd[0].set('description', rec.get('descript')),
                    npd[0].set('categoryCode', rec.get('category').toLowerCase()),
                    npd[0].set('materialCode', rec.get('cimemo')),
                    npd[0].set('dimensions', rec.get('user6')),
                    npd[0].set('ageGroup', 'Adult'),
                    npd[0].set('msrp', rec.get('sgtRetailPrice')),
                    npd[0].set('taxCode', 'General Clothing'),
                    npd[0].set('warranty', 'N'),
                    npd[0].set('origin', 'Imported')
                    
                    store.each(function(mdRec, idx) {
                        if(mdRec.isPhantom()) {
                            
                        }                        
                    });
                });

                console.log('generateclick', store.getData());                                            

                //me.getViewModel().set('selectedStyle', rec);                

                win.close();                

            }, me);            

            win.on('resetclick', function(b,c) {
                var store = styleGrid.getStore();  

                //var selected = template.getSelectionModel().selected;
                field.fireEvent('triggerclear', field);
                store.removeAll();

            }, me);            
        });
    },

    onActEditClick: function(b, c){
        //console.log(b, c);

        var layout = this.lookupReference('multiview'),
            grid = layout.lookupReference('grid'),
            rec = grid.getSelection()[0];

        //this.showWindow(grid.getSelection()[0]);
        this.redirectTo("productdetail/edit/" + rec.data.id);
    },

    onActRefreshClick: function(b, c){
        this.getStore("productdetails").reload();
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

                    rec.drop();
                    //me.saveStore(grid, me.getView());
                    console.log(rec);
                }
            }
        });
    },    

    onActSaveClick: function(b, c) {
       
        var me = this,
            store = me.getStore("productdetails");

        var processMask = Ext.create('Ext.LoadMask', {
            msg: 'Saving... Please wait',
            target: me.getView()
        });

        processMask.show();        
        
        store.sync({
            success: function(batch, op){
                Ext.Msg.alert('Status', 'Changes saved successfully.', function(a){                    
                    processMask.hide('', function() {
    
                    });                    
                });

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

        /*
        var records = store.getRange(),
            changed = false;

        for (var i = 0; i < records.length; i++) {            

            if (records[i].dirty == true) {
                changed = true;
                break;
            }
        }

        if(changed){
            
        }
        else {
            Ext.Msg.alert('Status', 'There are no changes.', function(a){
                console.log('Alert callback', a);
                processMask.hide('', function() {
    
                });
            });
        }   
        */     
        
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
            topbar = refs.topbar;
            //display = refs.pim-display;

        //display.setActive(rec);

        console.log('onSelect', this.getViewModel());
        var k = [],
            q = topbar.lookupReference("viewselection");

        k[0] = "productdetail";
        k[1] = q.value == 0 ? "default" : q.value == 1 ? "medium" : "icons";
        k[2] = rec.get("id");
        

        this.redirectTo(k.join("/"));
        
    },

    onSelectionChange: function(sm, selected, eOpts){
        //onSelectionChange: function(sm, selected, eOpts) {
        
        var vm = this.getViewModel(),
            layout = this.getView().lookupReference('multiview'),
            refs = layout.getReferences(),
            //topbar = refs.topbar,
            grid = refs.grid,            
            rec = grid.getSelectionModel().selected.items[0],
            display = refs.display,
            check = display.down('checkbox[name=overwrite]'),
            tag = display.down('tagfield[name=bkeywords]'),
            button = display.down('button[name=generate]');
                
        var default_keywords = vm.get('default_keywords'),
            division = rec.get('division');
        
        console.log('onSC', check.checked, default_keywords[division]);
        tag.setValue(default_keywords[division]);
        button.setDisabled(!Ext.isEmpty(selected[0].get('longDescription')) && !check.checked);
        
    },

    onCheckChange: function(cb, nv, ov, eOpts) {
        var layout = this.getView().lookupReference('multiview'),
            refs = layout.getReferences(),
            grid = refs.grid,            
            display = refs.display,
            selected = grid.getSelection(),
            button = display.down('button[name=generate]');

        button.setDisabled(!Ext.isEmpty(selected[0].get('longDescription')) && !cb.checked);
    },

    onBeforeDblClick: function(grid, record, item, index, event) {
        var combo = Ext.getCmp('cbProdStyle'),
            cbStore = combo.getStore(),
            cellValue = record.get('categoryCode');
            
        console.log('cell', record, item);
        cbStore.clearFilter();
        cbStore.filter('type', cellValue);        

    },

    onFilterItemChange: function(combo, h, g, l){

        /*
        var toolbar = combo.up("toolbar"),
            m = toolbar.down("searchtextlist"),
            n = toolbar.down('searchgrid'),
            j = combo.getValue(),
            st = '';
        */
        var toolbar = combo.up("toolbar"),
            m = toolbar.down("searchtextlist"),
            //n = toolbar.lookupReference('searchcombo'),
            j = combo.getValue(),
            st = '';

        m.paramName = j;
        m.show();
        //n.hide();        

        //console.log(st);
        var view = this.getView(),
            k = view.getViewModel().getStore(st);

        if(k != null){
            k.load();
            n.bindStore(k);
        }
        /*
        switch(j){
            case "grp":
                if (st === '') {
                    st = 'groups';
                }
            case "subcategory":
                if (st === '') {
                    st = 'subcategories';
                }            
            default:
                m.paramName = j;
                m.show();
                n.hide();
        }

        //console.log(st);
        var view = this.getView(),
            k = view.getViewModel().getStore(st);

        if(k != null){
            k.load();
            n.bindStore(k);
        }
        */
    },

    onGenerateClick: function(btn, e) {
        var layout = this.getView().lookupReference('multiview'),
            refs = layout.getReferences(),
            grid = refs.grid, 
            rec = grid.getSelectionModel().selected.items[0],           
            display = refs.display,            
            cbName = display.down('textfield[name=description]'),
            cbCharacters = display.down('textareafield[name=characteristics]'),
            txtKeywords = display.down('textareafield[name=addkeywords]'),
            numWords = display.down('numberfield[name=words]'),   
            cbDefaults = display.down('checkbox[name=useDefaultKeys]'),            
            tagKeywords = display.down('tagfield[name=bkeywords]'),
            //cbVoice = display.down('combobox[name=tone-voice]'),
            //cbEngine = display.down('combobox[name=engine]'),            
            cbUpdates = display.down('checkbox[name=updateVariants]'),
            cbOverwrite = display.down('checkbox[name=overwrite]');
        
        var payload = {
                product_name: cbName.getValue(),
                product_characteristics: cbCharacters.getValue()
            },
            division = rec.get('division'),
            defaults = {},
            styleIds = [];

        
        payload.check_defaults = cbDefaults.checked;

        if(!Ext.isEmpty(numWords.getValue())) {
            payload.words = numWords.getValue();
        }

        if (cbDefaults.checked) {                    
    
            if(!Ext.isEmpty(tagKeywords.getValue())) {
                defaults[division] = tagKeywords.getValue();
            }          

            payload.default_keywords = defaults;
        }
                
        if(!Ext.isEmpty(txtKeywords.getValue())) {
            payload.keywords = txtKeywords.getValue();
        }

        if(!Ext.isEmpty(cbOverwrite.getValue())) {
            payload.overwrite = cbOverwrite.getValue();
        }

        if(!Ext.isEmpty(cbUpdates.getValue())) {
            payload.update_variants = cbUpdates.getValue();
        }                

        Ext.each(grid.getSelection(), function(rec, idx, self){                                        

            styleIds.push(rec.get('id'));
        }); 

        payload.styleIds = styleIds;

        var processMask = new Ext.LoadMask({
            msg: 'Generating... Please wait',
            target: this.getView()
        });

        processMask.show();

        Ext.Ajax.request({
            url: '/shopify-php/api/gpt_product_desc.php', 
            method: 'POST',        
            //useDefaultXhrHeader: false,
            //cors: true,
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
                //'X-API-KEY' : '527bac36-77eb-4016-b10a-31d3a817c75d',
                //'accept' : 'application/json',
                //'Content-Type' : 'application/json'
            },

            params: {
                //store: comboSelected.get('name')
                //engine: cbEngine.getValue(),                        
                //language: 'en',
                //num_copies: 1
            },

            //'{"tone_of_voice":"excited","product_name":"Mini Dress","product_characteristics":"- self - beautiful - modern"}'
            jsonData: Ext.JSON.encode(payload)
                                    
        }).then(function(response){
            var result = Ext.decode(response.responseText, false);
            console.log('callback', response);

            if(result =! false) {                

                processMask.hide('', function() {
                    Ext.Msg.alert('Status', 'Changes saved successfully.', function(){
                        grid.getStore().reload();
                        console.log(result);
                    });
                });  
            }
                                
        }).otherwise(function(reason){
            var reason = Ext.decode(response, false);
            processMask.hide('', function() {
                console.log(reason);
                Ext.Msg.alert(reason.status, reason.statusText);
            });                        
                    
        });    
    },

    /*
    onTgrClearClick: function(c){
        var value = c.getValue(),
            store = this.getViewModel().getStore('lines'),
            filters = store.getFilters();

        var filter = new Ext.util.Filter({
            property: c.paramName,
            operator: 'st',
            value: value,
            type: 'string'
        });

        filters.remove(filter);
    },

    onTgrSearchClick: function(c){
        var value = c.getValue(),
            store = this.getViewModel().getStore('lines'),
            filters = store.getFilters();

        if (value.length > 0) {
            // Param name is ignored here since we use custom encoding in the proxy.
            // id is used by the Store to replace any previous filter
            var filter = new Ext.util.Filter({
                property: c.paramName,
                operator: 'st',
                value: value,
                type: 'string'
            });

            //console.log(filter)

            filters.add(filter);
        }
    },
    */
    onItemContextMenu:function(h, j, k, g, l){        

        var mv = this.lookupReference('multiview'),
            grid = mv.lookupReference('grid'),
            sm = h.getSelectionModel();

        l.stopEvent();
        if(!sm.isSelected(g)){
            sm.select(g);
        }

        this.view.contextmenu.items.items[2].setDisabled(grid.getSelection().length == 0);

        this.view.contextmenu.showAt(l.getXY());
    },

    showWindow: function(rec, xtype, callback){
        var me = this,
            view = me.getView();        

        me.isEdit = !!rec;

        me.win = view.add({
            xtype: xtype,

            viewModel: {
                data: {
                    
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
    },
    
    onOpenMappingClick: function(b, e){
        var me = this,
            multiview = me.getView().lookupReference('multiview'),
            topbar = multiview.lookupReference("topbar"),
            searchlist = topbar.down('searchtextlist'),
            grid = multiview.lookupReference('grid'),
            rec = grid.getSelectionModel().selected.items[0];        

            //console.log(rec);
        me.showWindow(rec, 'windows-style-colormapping', function(type){

            var win = me.win,
                wvm = win.getViewModel(),
                //btnSave = win.getDockedItems('toolbar[dock="bottom"] > button[action="save"]')[0];
                //combo = win.down('combo[name="site"]'),
                //field = win.down('searchtextlist'),
                grid = win.lookupReference('colorGrid'),                          
                btnSaveAs = win.down('button[action="saveas"]');
            
            /*
            if (!Ext.isEmpty(searchlist.getValue())) {
                field.setValue(searchlist.getValue());
                field.activeFilter = searchlist.activeFilter;      
                field.getTrigger('clear').setHidden(false);  
            }                                                                     

            win.on('resetclick', function(b,c) {
                var store = grid.getStore();  

                //var selected = template.getSelectionModel().selected;
                field.fireEvent('triggerclear', field);
                store.removeAll();

            }, me);

            win.on('saveasclick', function(btn, type){
                var grid = win.lookupReference('grid');
                                
                grid.saveDocumentAs({
                    type: type,
                    title: 'Color Mapping ',
                    fileName: 'Color mapping ' + Ext.Date.format(new Date(), 'Y-m-d')
                });
                
            }, me);
            */
        });
    },    

    onOpenTemplateClick: function(b, e){
        var me = this,
            multiview = me.getView().lookupReference('multiview'),
            topbar = multiview.lookupReference("topbar"),
            searchlist = topbar.down('searchtextlist'),
            grid = multiview.lookupReference('grid'),
            rec = grid.getSelectionModel().selected.items[0];        

            //console.log(rec);
        me.showWindow(rec, 'windows-style-webtemplate', function(type){

            var win = me.win,
                wvm = win.getViewModel(),
                //btnSave = win.getDockedItems('toolbar[dock="bottom"] > button[action="save"]')[0];
                combo = win.down('combo[name="site"]'),
                field = win.down('searchtextlist'),
                grid = win.lookupReference('styleGrid'),        
                template = win.lookupReference('templateGrid'),   
                btnSaveAs = win.down('button[action="saveas"]');
            
            if (!Ext.isEmpty(searchlist.getValue())) {
                field.setValue(searchlist.getValue());
                field.activeFilter = searchlist.activeFilter;      
                field.getTrigger('clear').setHidden(false);  
            }
                                    
            /*            
            wvm.getStore('shopifytemplates').on('datachanged', function(store){
                btnTemplate.setDisabled(store.getCount() == 0);
                
                console.log('templates - store datachanged', store.first());
            });
            */
            //win.on('templateclick', me.onSaveWebPublish, me);            

            win.on('generateclick', function(b,c) {
                var store = template.getStore(),
                    styles = [];

                //console.log(grid.getSelectionModel().getSelection(), grid.getSelectionModel().selected);
                
                Ext.each(grid.getSelectionModel().getSelection(), function(rec, idx, self){
                    styles.push(rec.data.style.trim()+rec.data.color.trim());
                });            

                wvm.set('styles', styles);               

                store.load();

            }, me);

            win.on('resetclick', function(b,c) {
                var store = template.getStore();  

                //var selected = template.getSelectionModel().selected;
                field.fireEvent('triggerclear', field);
                store.removeAll();

            }, me);

            win.on('saveasclick', function(btn, type){
                var grid = win.lookupReference('templateGrid');
                                
                grid.saveDocumentAs({
                    type: type,
                    title: 'Shopify Product Template',
                    fileName: 'Product template ' + Ext.Date.format(new Date(), 'Y-m-d')
                });
                
            }, me);
        });
    },

    onOpenCopywriteClick: function(b, e){
        var me = this,
            multiview = me.getView().lookupReference('multiview'),
            topbar = multiview.lookupReference("topbar"),
            searchlist = topbar.down('searchtextlist'),
            grid = multiview.lookupReference('grid'),            
            rec = grid.getSelectionModel().selected.items[0];        
        
        me.showWindow(rec, 'pim-windows-productdescript', function(type){

            var win = me.win,
                wvm = win.getViewModel(),
                //btnSave = win.getDockedItems('toolbar[dock="bottom"] > button[action="save"]')[0];                
                field = win.down('searchtextlist'),
                grid = win.lookupReference('styleGrid'),                   
                cbName = win.down('combobox[name=prod-name]'),
                cbCharacters = win.down('combobox[name=prod-char]'),
                cbFeature1 = win.down('combobox[name=feature1]'),
                cbFeature2 = win.down('combobox[name=feature2]'),
                cbFeature3 = win.down('combobox[name=feature3]'),
                cbFeature4 = win.down('combobox[name=feature4]'),
                cbFeature5 = win.down('combobox[name=feature5]'),
                cbKeywords = win.down('combobox[name=keywords]'),
                sdTemperature = win.down('slider[name=temperature]'),
                cbDefaults = win.down('checkbox[name=useDefaults]'),
                tagERKeys = win.down('tagfield[name=erKeywords]'),
                tagEFKeys = win.down('tagfield[name=efKeywords]'),
                tagGLKeys = win.down('tagfield[name=glKeywords]'),
                tagFRKeys = win.down('tagfield[name=frKeywords]'),
                
                //cbVoice = win.down('combobox[name=tone-voice]'),
                //cbEngine = win.down('combobox[name=engine]'),
                numWords = win.down('numberfield[name=words]'),
                cbUpdates = win.down('checkbox[name=applyVariants]'),
                cbOverwrite = win.down('checkbox[name=overwrite]');
            
            //console.log('Open', cbName, tagERKeys, cbOverwrite);

            if (!Ext.isEmpty(searchlist.getValue())) {
                field.setValue(searchlist.getValue());
                field.activeFilter = searchlist.activeFilter;      
                field.getTrigger('clear').setHidden(false);  
            }                                                      

            win.on('generateclick', function(b,c) {
                var recs = grid.getSelectionModel().getSelection(),
                    payload = {
                        product_name: cbName.getValue(),
                        product_characteristics: cbCharacters.getValue()
                    },
                    ids = [],
                    defaults = {},
                    styles = [];
                
                if(!Ext.isEmpty(cbFeature1.getValue())) {
                    payload.feature1 = cbFeature1.getValue();
                }

                if(!Ext.isEmpty(cbFeature2.getValue())) {
                    payload.feature2 = cbFeature2.getValue();
                }

                if(!Ext.isEmpty(cbFeature3.getValue())) {
                    payload.feature3 = cbFeature3.getValue();
                }

                if(!Ext.isEmpty(cbFeature4.getValue())) {
                    payload.feature4 = cbFeature4.getValue();
                }

                if(!Ext.isEmpty(cbFeature5.getValue())) {
                    payload.feature5 = cbFeature5.getValue();
                }

                if(!Ext.isEmpty(cbKeywords.getValue())) {
                    payload.keywords = cbKeywords.getValue();
                }

                payload.check_defaults = cbDefaults.checked;

                if (cbDefaults.checked) {                    
    
                    if(!Ext.isEmpty(tagERKeys.getValue())) {
                        defaults.ER = tagERKeys.getValue();
                    }
    
                    if(!Ext.isEmpty(tagEFKeys.getValue())) {
                        defaults.EF = tagEFKeys.getValue();
                    }
    
                    if(!Ext.isEmpty(tagGLKeys.getValue())) {
                        defaults.GL = tagGLKeys.getValue();
                    }
    
                    if(!Ext.isEmpty(tagFRKeys.getValue())) {
                        defaults.FR = tagFRKeys.getValue();
                    }

                    payload.default_keywords = defaults;
                }                                

                if(!Ext.isEmpty(numWords.getValue())) {
                    payload.words = numWords.getValue();
                }

                /*
                if(!Ext.isEmpty(cbVoice.getValue())) {
                    $payload.tone_of_voice = cbVoice.getValue();
                }
                */

                if(!Ext.isEmpty(cbUpdates.getValue())) {
                    payload.update_variants = cbUpdates.getValue();
                } 

                if(!Ext.isEmpty(cbOverwrite.getValue())) {
                    payload.overwrite = cbOverwrite.getValue();
                }

                Ext.each(recs, function(rec, idx, self){                                        
                    ids.push(rec.get('id'));
                }); 
                
                payload.styleIds = ids;

                var processMask = new Ext.LoadMask({
                    msg: 'Generating... Please wait',
                    target: win
                });
        
                processMask.show();

                Ext.Ajax.request({
                    url: '/shopify-php/api/gpt_product_desc.php', 
                    method: 'POST',        
                    //useDefaultXhrHeader: false,
                    //cors: true,
                    timeout: 1200000,

                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
                        //'X-API-KEY' : '527bac36-77eb-4016-b10a-31d3a817c75d',
                        //'accept' : 'application/json',
                        //'Content-Type' : 'application/json'
                    },
        
                    params: {
                        //store: comboSelected.get('name')
                        bulk: true,
                        temp: sdTemperature.getValue() * 0.01
                        //engine: cbEngine.getValue(),                        
                        //language: 'en',
                        //num_copies: 1
                    },

                    //'{"tone_of_voice":"excited","product_name":"Mini Dress","product_characteristics":"- self - beautiful - modern"}'
                    jsonData: Ext.JSON.encode(payload)
                                          
                }).then(function(response){
                    var result = Ext.decode(response.responseText, false);
                    console.log('callback', response);
        
                    if(result =! false) {                
        
                        processMask.hide('', function() {
                            Ext.Msg.alert('Status', 'Changes saved successfully.', function(){
                                grid.getStore().reload();
                                console.log(result);
                            });
                        });  
                    }
                                        
                }).otherwise(function(reason){
                    var reason = Ext.decode(response, false);
                    processMask.hide('', function() {
                        console.log(reason);
                        Ext.Msg.alert(reason.status, reason.statusText);
                    });                        
                            
                });                

                console.log('generateclick');                                            

                //me.getViewModel().set('selectedStyle', rec);                

                //win.close();   
            }, me);

            win.on('translateclick', function(b,c) {
                var win = me.win,
                    wvm = win.getViewModel(),                      
                    //btnSave = win.getDockedItems('toolbar[dock="bottom"] > button[action="save"]')[0];                
                    grid = win.lookupReference('styleGrid'),
                    cbLanguage = win.down('combobox[name="language"]'),                
                    recs = grid.getSelectionModel().getSelection(),
                    payload = {},
                    ids = [];                                

                Ext.each(recs, function(rec, idx, self){                                        
                    ids.push(rec.get('id'));
                }); 
                
                payload.styleIds = ids;

                var processMask = new Ext.LoadMask({
                    msg: 'Generating... Please wait',
                    target: win
                });
        
                processMask.show();

                Ext.Ajax.request({
                    url: '/shopify-php/api/gpt_desc_translate.php', 
                    method: 'POST',        
                    //useDefaultXhrHeader: false,
                    //cors: true,
                    timeout: 2400000,

                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
                        //'X-API-KEY' : '527bac36-77eb-4016-b10a-31d3a817c75d',
                        //'accept' : 'application/json',
                        //'Content-Type' : 'application/json'
                    },
        
                    params: {
                        //store: comboSelected.get('name')                        
                        //engine: cbEngine.getValue(),                        
                        language: cbLanguage.getValue(),
                        //num_copies: 1
                    },

                    //'{"tone_of_voice":"excited","product_name":"Mini Dress","product_characteristics":"- self - beautiful - modern"}'
                    jsonData: Ext.JSON.encode(payload)
                                          
                }).then(function(response){
                    //var result = Ext.decode(response.responseText, false);
                    var result = true;
                    console.log('callback', response);
        
                    if(result =! false) {                
        
                        processMask.hide('', function() {
                            Ext.Msg.alert('Status', 'Changes saved successfully.', function(){
                                grid.getStore().reload();
                                console.log(result);
                            });
                        });  
                    }
                                        
                }).otherwise(function(reason){
                    var reason = Ext.decode(response, false);
                    processMask.hide('', function() {
                        console.log(reason);
                        Ext.Msg.alert(reason.status, reason.statusText);
                    });                        
                            
                });                

                console.log('translateclick');       

            }, me);

            win.on('resetclick', function(b,c) {
                var store = template.getStore();  

                //var selected = template.getSelectionModel().selected;
                field.fireEvent('triggerclear', field);
                store.removeAll();

            }, me);
            
        });
    }
});
