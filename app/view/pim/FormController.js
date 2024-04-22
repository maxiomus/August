Ext.define('August.view.pim.FormController', {
    extend: 'Ext.app.ViewController',
    
    alias: 'controller.pim-form',

    requires: [        
        'August.model.pim.ProductDetail'
    ],

    init: function(){
        var me = this;

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

    initViewModel: function(vm) {     
        /* 
        var me = this,
            view = me.getView(),
            photo = view.down('component[name="productPhoto"]');
            
            binding = vm.bind({
                bindTo: '{theProductDetail}',
                deep: true,
                single: true
            }, function(rec) {                
                // Send viewModel's data to callback function.                
                
                //view.setLoading(true);                                                                                            

                //var b = document.getElementById('po-barcode');
                //var c = document.getElementsByClassName('barcode');

                var data = rec.getData();
                console.log('initView', data);
                //data.style = vm.get('theVendor').getData();
                //data.color = vm.get('theShipTo').getData();

                // populate component's template data
                photo.update(data);
                //view.setLoading(false);                
                
                binding.destroy();

            }, this);    
        */
    },
    
    onTriggerClear: function(combo) {
        var me = this,
            form = me.getView(),
            productStyle = form.down('combo[name="productStyle"]');
            
        productStyle.setValue('');
    },
    
    onPhotoGridRender: function(grid){
        var me = this,
            vm = me.getViewModel(),
            session = vm.getSession();

        store = grid.getStore();
        console.log(session);        
    },

    onAddItemClick: function(){
        var me = this,            
            vm = me.getViewModel(),
            rec = vm.get('theProductDetail'),
            grid = me.getView().lookupReference('photo-grid');

        console.log('onAddItem', me.getViewModel());

        this.showWindow(rec, 'windows-style-photoupload', function(type){

            var win = me.win,
                wvm = win.getViewModel(),
                //btnSave = win.getDockedItems('toolbar[dock="bottom"] > button[action="save"]')[0];
                btnSave = win.down('button[action="save"]');            
            
            wvm.setStores({
                fileStore: {
                    model: 'Photo',
                    autoLoad: true,
                    listeners: {
                        beforesync: function(options, e){
                            
                        }
                    }
                }
            });
            
            wvm.getStore('fileStore').on('add', function(store, records, index){

                records.forEach(function(prec) {   
                    prec.set('position', index+1);
                    //mediaRec.set('F_NAME', rec.data.style.trim() + (!Ext.isEmpty(rec.data.user2) ? '_' + rec.data.user2.trim() : '') + (!Ext.isEmpty(rec.data.prints) ? '_' +  rec.data.prints.split('(#)')[0] : '') + '_' + mediaRec.data.RORDER + '.' + mediaRec.data.name.split('.').pop());                    
                    prec.set('style', rec.get('style').trim());
                    prec.set('color', rec.get('color').trim());                                                                                
                    //console.log(mediaRec);
                });
            });
            
            wvm.getStore('fileStore').on('datachanged', function(store){
                btnSave.setDisabled(store.getCount() == 0);
            });

            win.on('saveclick', me.onSaveUpload, me);
        });
    },     

    onEditItemClick: function(btn){
        var me = this,
            form = me.getView(),
            grid = form.lookupReference('photo-grid'),
            selected = grid.getSelection()[0];
            rowEdit = grid.getPlugin("photoGridRowEdit");

        //console.log('onEdit', selection)
        //this.showWindow(btn, selection);            

        rowEdit.cancelEdit();
        rowEdit.startEdit(selected, 0);  
    },

    onDeleteItemClick: function(btn){
        var me = this,
            //refs = me.getReferences(),
            view = me.lookupReference('photo-grid'),
            //store = grid.getStore(),
            selection = view.getSelectionModel().getSelection()[0];

        //store.remove(grid.getSelection()[0]);
        selection.drop();
        view.getSelectionModel().deselectAll();

    },

    /**
     * 
     * @param {*} t tabPanel 
     * @param {*} n newCard 
     * @param {*} o oldCard 
     * @param {*} e 
     */
    onTabChange: function(t, n, o, e){
        
        var refs = this.getView().getReferences();        
        
        refs.photoCrud.setHidden(n.reference != 'photo-grid');        
    },

    onSaveUpload: function(b, c){

        var me = this,
            wvm = c.getViewModel(),
            session = wvm.getSession(),
            changes = session.getChanges(),
            data = [],
            //grid = me.getView().refs.multiview.refs.grid,
            //form = c.down('form').getForm(),
            //sampleRec = grid.getSelection()[0],
            fileStore = wvm.getStore('fileStore'),
            field = c.down('multiupload').getDockedItems('toolbar[dock="top"] > uploadfiles')[0];        

        var processMask = new Ext.LoadMask({
            msg: 'Saving... Please wait',
            target: me.getView()
        });

        fileStore.each(function(rec, idx){
            var postfix = (idx + 1).toString().padStart(3, '0');

            rec.set('order', idx + 1);
            rec.set('tag', rec.get('style') + '_' + rec.get('color').replace('/', '-') + "_" + postfix);            
            data.push(rec.data);
        });        

        if(field && field.getFilesQueue().length > 0){
            field.send({
                url: '/WebApp/api/Files/Photos/upload',
                //params: '',
                waitMsg: 'Saving photos...',
                success: function(resp){
                    console.log(resp);
                    
                    processMask.hide('', function() {
                        Ext.Msg.alert('Status', 'Changes saved successfully.');
                        Ext.Msg.maskClickAction = 'hide';
                    });
                                                            
                    //Ext.Msg.alert('Status', JSON.stringify(resp.data, null, 4));   
                },
                failure: function(resp) {
                    processMask.hide('', function() {
                        Ext.Msg.alert('Failure', resp);
                    });
                }
            }, {
                Photos: JSON.stringify(data)
            });
        }                

        me.win.close();
        processMask.show();
    },

    onRefresh: function(btn, e){
        
        var me = this,
            form = me.getView(),
            grid = form.lookupReference('photo-grid'),            
            vm = me.getViewModel(),
            session = vm.getSession();                 
        
        var processMask = new Ext.LoadMask({
            msg: 'Loading... Please wait',
            target: form
        });        
        
        session.data['pim.ProductDetailPhoto'] = null;
        
        processMask.show();                     

        August.model.pim.ProductDetail.load(vm.get('theProductDetail').id, {
            scope: this,
            success: function(rec, op){                
                //form.reset();                                        

                console.log('after refresh', session, session.getChanges());
                                
                processMask.hide('', function() {
                    
                });
            }
        }, session);                
        
    },

    onSave: function(action){
        var me = this,
            view = me.getView(),
            viewer = view.up('viewer'),
            vm = me.getViewModel(),
            session = vm.getSession(),
            changes = session.getChanges(),
            id;

        if(view.isValid()){

            var batch = session.getSaveBatch();
            console.log(session, changes);

            if(changes != null && changes["pim.ProductDetailPhoto"] != undefined){
                delete changes["pim.ProductDetailPhoto"];
            }

            if(batch !== undefined){
                var processMask = new Ext.LoadMask({
                    msg: 'Saving... Please wait',
                    target: viewer
                });

                batch.on({
                    operationcomplete: function(batch, op){

                        var objResp = op.getResponse();

                        if(!Ext.isEmpty(objResp)){
                            //var response = JSON.parse(objResp);                            
                            console.log('PIM - Batch Operation Complete', objResp);                           
                        }
                    },
                    complete: function(batch, op){

                        //var response = JSON.parse(op.getResponse());                        
                        var response = op.getResponse();
                        console.log('PIM - Batch Complete', response)

                        processMask.hide('', function() {
                            Ext.Msg.alert('Status', 'Changes saved successfully.');
                        });
                    },
                    exception: function(batch, op){
                        processMask.hide('', function(){
                            //Ext.Msg.alert('Error', 'Error occurred');
                            var objResp = op.error.response;
                            console.log(objResp)
                            if(!Ext.isEmpty(objResp)){
                                //var response = JSON.parse(objResp);
                                Ext.Msg.alert(objResp.statusText + ' - '+objResp.status, objResp.responseJson.Message);
                            }

                        });
                    }
                });

                processMask.show();
                batch.start();
            }
            else {
                Ext.Msg.alert('No Changes', 'There are no changes to the session.');
            }
            /*
            if (changes !== null) {
                new Ext.window.Window({
                    autoShow: true,
                    title: 'Session Changes',
                    modal: true,
                    width: 600,
                    height: 400,
                    layout: 'fit',
                    items: {
                        xtype: 'textarea',
                        value: JSON.stringify(changes, null, 4)
                    }
                });
            }
            else {
                Ext.Msg.alert('No Changes', 'There are no changes to the session.');
            }
            */
        }
    },

    onClose: function(btn, e){
        var me = this,
            viewer = me.getView().up('viewer');

        viewer.remove(me.getView());
        //viewer.setActiveTab(0);
    },

    showWindow: function(rec, xtype, callback){
        var me = this,
            view = me.getView();

        me.isEdit = !!rec;

        me.win = view.add({
            xtype: xtype,

            viewModel: {
                data: {
                    //selected: rec
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
