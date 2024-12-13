/**
 * Created by tech on 8/25/2015.
 */
 Ext.define('August.controller.Root', {
    extend: 'August.controller.Base',

    requires: [
        'August.util.RemoteStateProvider'
    ],

    routes: {        
        'login': {
            before: 'onBeforeLogin',
            action: 'onLogin'
        },
        ':node:viewmode:id': {
            before: 'onBeforeRoute',
            action: 'onRouteViewMode',
            conditions: {
                //':node': '([%a-zA-Z0-9\\-\\_\\s,.\+]+)',
                //':node': '(^(?!.*login).*$)',
                //':node': '(dashboard|notice|sales|dal|inventory|reports)',
                ':viewmode':'(?:(?:/){1}(default|medium|tiles))?',
                //':id':'(?:(?:/){1}([%a-zA-Z0-9\\-\\_\\s,]+))?'
                ':id':'(?:(?:/){1}([0-9]+))?'
            }
        },
        ':node/tab:id:sub': {
            before: 'onBeforeRoute',
            action: 'onRouteTab',
            conditions: {
                //':op': '(?:(?:/){1}(new|edit))?',
                ':id':'(?:(?:/){1}([0-9]+))?',
                ':sub':'(?:(?:/){1}([0-9]+))?'
            }
        },
        ':node/:op:id': {
            before: 'onBeforeRoute',
            action: 'onRouteOp',
            conditions: {
                //':node': '([%a-zA-Z0-9\\-\\_\\s,.\+]+)',
                ':op': '(new|edit|copy|import)',
                ':id':'(?:(?:/){1}([0-9]+))?'
            }
        },
        ':node/:sub': {
            before: 'onBeforeRoute',
            action: 'onRoute'
        }
        /*
        ':node:viewmode/srch/:prop/:val': {
            before: 'onBeforeRoute',
            action: 'onRouteSrch',
            conditions: {
                ':viewmode':'(?:(?:/){1}(default|medium|tiles))?'
            }
        }
        */
    },

    init: function(){
        this.listen({
            component: {
                'grid': {
                    afterrender: 'onGridAfterRender',
                    reconfigure: 'onGridReconfigure'
                },
                'dataview': {
                    afterrender: 'onViewAfterRender'
                }
            }
        });
    },

    onGridAfterRender: function(grid){
        //grid.setLoading(true);
        //console.log('Main - grid after render', grid)
    },

    onGridReconfigure: function(grid){
        //grid.setLoading(false);
    },

    onViewAfterRender: function(view){
        //view.setLoading(true);
    },

    onViewReady: function(view){
        //view.setLoading(false);
    },

    onBeforeLogin: function(){
        var me = this,
            args = Ext.Array.slice(arguments),
            node = args[0],
            action = args[args.length - 1];
        
        if(August.loggedInUser){
            action.stop();

            this.redirectTo('dashboard');
        }
        else{
            action.resume();
        }
    },

    onLogin: function(){

        var win = Ext.ComponentQuery.query('login')[0];
        if(!win){
            win = Ext.widget('login');
        }

        win.show();
    },

    secureNavigate: function (tree, rid) {
        var items = tree.itemMap;

        Ext.Object.each(items, function(key,value,myself){
            //var roles = items[i].config.node.data.granted;
            var granted = true,
                roles = value.config.node.data.granted;
            //console.log('snav', node, roles);
            if(roles != undefined){
                granted = false;
                Ext.Array.each(roles, function(role){
                    //console.log('roles', August.user.inRole(role));
                    //if(August.account.inRole(role)){
                    if(August.loggedInUser.group.toLowerCase() == role){                    
                        granted = true;
                        return false;
                    }

                });
            }

            //if(items[i].config.node.data.read == false){
            if(!granted){
                //console.log('not g', node, value)
                value.config.node.data.read = false;
                value.destroy();
            }
        });
    },

    setCurrentView: function(args, action) {

        var me = this,
            hashTag = (args[0] || '').toLowerCase(),
        //refs = me.getReferences(),
            main = August.app.getMainView().getController(),
            refs = main.getReferences(),
            mainCard = refs.mainCardPanel,
            mainLayout = mainCard.getLayout(),
            mainVM = main.getViewModel(),
            vmData = mainVM.getData(),
            treelist = refs.navigationTreeList,
            treestore = treelist.getStore(),
            node = treestore.findNode('routeId', hashTag),
            existingItem = mainCard.child('component[routeId=' + hashTag + ']');

            mainVM.set('currentUser', August.loggedInUser);
                
        // method for security...
        me.secureNavigate(treelist, hashTag);

        var view = (node && node.get('read')) ? node.get('view') : null;
        
        // Kill any previously routed window
        /*
        if (lastView && lastView.isWindow) {
            lastView.destroy();
        }
        */
        
        var lastView = mainVM.get('currentView') || mainLayout.getActiveItem(),
            newView;        
            
        if (!existingItem) {
            
            newView = Ext.create('August.view.' + (view || 'pages.Error404Window'), {
                hideMode: 'offsets',
                routeId: hashTag
            });            

            console.log('setCurrentView - new', newView);
            /*
            var newVM = newView.getViewModel();
            if(newVM){
                var storeName = hashTag.replace('-','')+'s',
                    listStore = newVM.getStore(storeName);

                //console.log('Got Store?', listStore, args[2])
                if(listStore != null){
                    var currentPage = 1,
                        //id = args[args.length - 2];
                        //strUrl = '../api/Paging/' + storeName;
                        id = 0;

                    Ext.Array.each(args, function(item){
                        if(Ext.isNumeric(item)){
                            id = item;
                        }
                    });

                    Ext.Ajax.request({
                        //url: Ext.String.urlAppend(listStore.getProxy().url + id),
                        url: '../api/Paging/' + storeName + '/' + id,
                        method: 'GET',
                        success: function(response, options) {
                            // decode response
                            var result = Ext.decode(response.responseText);
                            //console.log('checkLogin', result.data);
                            // check if success flag is true
                            if(result.success) {
                                //console.log('success', result.index, listStore.getPageSize(), result.index / listStore.getPageSize());
                                currentPage = Math.ceil(result.index / listStore.getPageSize());
                            }
                            // couldn't login...show error
                            else {
                                //console.log('login failed');
                            }
                        },
                        failure: function(response, options) {
                            Ext.Msg.alert(response.statusText, response.status + ' - ' + response.responseText );
                        },
                        callback: function(response, opotions) {

                            listStore.loadPage(currentPage);

                        }
                    });
                }                
            }    
            */        
        }    

        if (!newView || !newView.isWindow) {
            // !newView means we have an existing view, but if the newView isWindow
            // we don't add it to the card layout.
            if (existingItem) {
                // We don't have a newView, so activate the existing view.
                if (existingItem !== lastView) {                    
                    mainLayout.setActiveItem(existingItem);
                }
                newView = existingItem;
            }
            else {
                // newView is set (did not exist already), so add it and make it the activeItem.
                //console.log('Got View?', newView)
                //Ext.suspendLayouts(false);                
                mainLayout.setActiveItem(mainCard.add(newView));
                //Ext.resumeLayouts(true);
            }
        }        

        if (newView.isFocusable(true)) {
            newView.focus();
        }

        mainVM.set('currentView', newView);
        //vmData.currentView = newView;

        var cvm = vmData.currentView.getViewModel(),
            //settings = null,
            store = null;
        
        if(cvm != null) {                                             
            store = cvm.getStore(hashTag.replace('-', '')+'s');            
        }

        if(store != null && !store.isLoaded()){
            store.on('load', action.resume, action, {single:true});            
        }
        else{
            action.resume();
        }                

        treelist.suspendEvents(true);
        treelist.setSelection(node);
        treelist.resumeEvents(true);

        Ext.getBody().unmask();        
    },

    onBeforeRoute: function(){
        var me = this,
            args = Ext.Array.slice(arguments),
            action = args[args.length - 1];
                
        if(August.loggedInUser){
            //var setting = Ext.getStore('Settings');

            if(!August.app.getMainView()){
                August.app.setMainView('August.view.main.Main');
            }                
            /*
            if(!setting.isLoaded()){
                setting.on('load',
                    Ext.bind(me.onBeforeRoute, me, args),
                    me,
                    {
                        single: true
                    }
                );
            }
            else {
                
                if(Ext.isEmpty(August.sp)){
                    August.sp = Ext.create('August.util.RemoteStateProvider', {
                        accountId: August.user.data.AccountId,
                        url: '/api/State',
                        stateCallBack: function(){
                            me.setCurrentView(args, action);
                        }
                    });
                    Ext.state.Manager.setProvider(August.sp);
                }
                else {
                    me.setCurrentView(args, action);
                }                                                        
            }                
            */
            if(args[0] != 'login'){
                me.setCurrentView(args, action);
            }            
        }
        else {
            //Set previous location...
            if(Ext.util.History.getToken() !== 'login'){
                //console.log(Ext.util.History.getToken())
                August.app.setPrevNode(Ext.util.History.getToken());
            }

            action.stop();
            //console.log('Not ready', Ext.Object.toQueryString({previous: node}));
            //console.log('Not ready', node.replace(/\//g, '+'));
            me.redirectTo('login');
        }

        /*
        if(August.app.getAppReady()) {
            
        }
        else {
            // Changed on 11/24/2021 => August.app.on(
            Ext.GlobalEvents.on(
                'appready',
                Ext.bind(me.onBeforeRoute, me, args),
                me,
                {
                    single: true
                }
            );
        } 
        */       
    },

    onRouteSrch: function(node, viewmode, prop, val){
        var mainView = August.app.getMainView(),
            vm = mainView.getViewModel(),
            view = vm.get('currentView'),
            multiview = view.lookupReference('multiview');

        if(multiview != null){
            var grid = multiview.lookupReference('styleGrid'),
                topbar = multiview.lookupReference('topbar'),
                category = topbar.lookupReference('filterSelection'),
                search = topbar.lookupReference('searchtext');

            view.suspendEvents(false);
            view.setActiveTab(multiview);
            view.resumeEvents(true);

            if(viewmode) {
                var segmented = topbar.lookupReference('viewselection'),
                    ctn = multiview.lookupReference('center'),
                    value = 0;

                switch(viewmode){
                    case 'default':
                        value = 0;
                        break;
                    case 'medium':
                        value = 1;
                        break;
                    case 'tiles':
                        value = 2;
                        break;
                }

                if(segmented){
                    segmented.setValue(value);
                    //ctn.getLayout().setActiveItem(segmented.getValue());
                }
            }

            //console.log(grid.getPlugin('gridfilters'))
            //grid.getPlugin('gridfilters').clearFilters();
            category.setValue(prop);
            search.paramName = prop;
            search.setValue(val);

            //var store = view.getViewModel().getStore(node.replace('-','')+'s');
            //grid.getPlugin('gridfilters').bindStore(store);

            search.onSearchClick();

            //this.waitForBinding(grid);
        }

        console.log('onRouteSrch');
    },

    waitForBinding: function(grid){
        var me = this,
            multiview = grid.up('multiview'),
            topbar = multiview.lookupReference('topbar'),
            search = topbar.lookupReference('searchtext');

        if(grid.getStore().isEmptyStore && grid.hasView){
            //grid.on('afterrender', Ext.Function.bind(me.waitForBinding, me));
            Ext.defer(function () {
                me.waitForBinding(grid);
            }, 10);
        }
        else {
            search.onSearchClick();
        }

    },

    onRouteViewMode: function(node, viewmode, id){
        /*var me = this,
         args = Ext.Array.slice(arguments),
         node = args[0], viewmode = args[1],
         id = args[args.length - 1];

         if(args.length > 0){

         }*/
        //console.log(node, viewmode, id)
        var mainView = August.app.getMainView(),
            vm = mainView.getViewModel(),
            view = vm.get('currentView'),
            multiview = view.lookupReference('multiview'),
            store = view.getViewModel().getStore(node.replace('-','')+'s');

        //console.log('onRouteViewMode', node, viewmode, id, view, node.replace('-','')+'s');
        if(multiview != null){
            //console.log('onRoute', node, viewmode, id, August.app.getPrevNode())
            var topbar = multiview.lookupReference('topbar'),
                ctn = multiview.lookupReference('center');

            view.suspendEvents(false);
            view.setActiveTab(multiview);
            view.resumeEvents(true);

            if(viewmode) {
                var segmented = topbar.lookupReference('viewselection'),
                    value = 0;

                switch(viewmode){

                    case 'medium':
                        value = 1;
                        break;
                    case 'tiles':
                        value = 2;
                        break;
                    default:
                        value = 0;
                        break;
                }

                if(segmented){
                    segmented.setValue(value);
                    ctn.getLayout().setActiveItem(segmented.getValue());
                }

            }

            if (id) {
                var grid = ctn.getLayout().getActiveItem(),
                    fieldname = store.getAt(0).getIdProperty(),
                    record = store.findRecord(fieldname, id.toString(), 0, false, false, true);

                var setting = Ext.getStore('Settings'),
                    setRec = setting.findRecord('Property', view.getXType());

                if(record != null){
                    var xtypes = ['grid', 'gridpanel', 'dataview'];
                    //console.log(grid, grid.superclass)
                    if(xtypes.indexOf(grid.superclass.getXType()) == -1) {
                        if(xtypes.indexOf(grid.getXType()) == -1){
                            grid = grid.down();
                        }
                    }

                    var sm = grid.getSelectionModel();

                    console.log('viewmode', grid, sm);

                    Ext.defer(function () {
                        if (viewmode != 'default') {

                            sm.suspendEvents(false);
                            sm.select([record], true, true);
                            sm.resumeEvents(true);
                            //console.log('Root - view selection', sm.selected)

                            if(topbar.actCopy){
                                topbar.actCopy.setDisabled(!record);
                            }

                            if(topbar.actEdit){
                                //console.log('MOYAC', record)
                                //topbar.actEdit.setDisabled(!record);
                                topbar.actEdit.setDisabled(!record);
                            }

                            if(topbar.actDelete){
                                //topbar.actDelete.setDisabled(!record);
                                topbar.actDelete.setDisabled(!record);
                            }
                        }
                        else {
                            grid.suspendEvents(true);
                            //grid.getSelectionModel().select([record]);
                            grid.ensureVisible(store.indexOf(record), {
                                animate: true,
                                //highlight: true,
                                select: true,
                                focus: true,
                                callback: function (success, record, node) {

                                    if(topbar.actCopy){
                                        topbar.actCopy.setDisabled((record.data.Status && record.data.Status == 'Complete') || !record);
                                    }

                                    if(topbar.actEdit){
                                        topbar.actEdit.setDisabled((record.data.Status && record.data.Status == 'Complete') || !record);
                                    }

                                    if(topbar.actDelete){
                                        topbar.actDelete.setDisabled((record.data.Status && record.data.Status == 'Complete') || !record);
                                    }

                                    if(topbar.actComplete){
                                        //topbar.actComplete.setHidden((record.get('Status') == 'Complete') || !record);
                                        topbar.actComplete.setDisabled(August.loggedInUser.group != 'administrators') || (!setRec || setRec.data.Value == August.loggedInUser.userId) || August.loggedInUser.name == record.get('Coordinator') || !record;
                                        topbar.actComplete.setHidden((record.get('Status') == 'Complete') || !record);
                                    }

                                    if(topbar.actActive){
                                        topbar.actActive.setDisabled(August.loggedInUser.group != 'administrators') || (!setRec || setRec.data.Value == August.loggedInUser.userId) || August.loggedInUser.name == record.get('Coordinator') || !record;
                                        topbar.actActive.setHidden((record.get('Status') != 'Complete') || !record);
                                    }
                                    //console.log('ensureVisible callback', grid.getSelection())
                                }
                            });
                            //console.log('Root - grid selection', sm.selected)
                            grid.resumeEvents(true);
                        }
                    }, 100);
                }
            }
        }

    },

    onRouteTab: function(node, id, sub) {
        //this.selectItem(node, 'medium', id);
        /*var me = this,
         args = Ext.Array.slice(arguments),
         node = args[0],
         id = args[args.length - 1];

         if(args.length > 0){

         }*/
        
        var me = this,
        //refs = me.getReferences(),
            mainView = August.app.getMainView(),
            main = mainView.getController(),
            refs = main.getReferences(),
            mainCard = refs.mainCardPanel,
            view = mainCard.child('component[routeId=' + node + ']'),
            vm = view.getViewModel(),
            store = vm.getStore(node.replace('-','')+'s'),
            fieldname = store.first().getIdProperty(),
            rec = store.findRecord(fieldname, id.toString(), 0, false, false, true),
            item, innerTab, 
            prefix = node + '-',
            xf = Ext.util.Format;
        
        console.log('onRouteTab', store, fieldname);
        switch(node) {
            case 'dal':
                var title = rec.data.Title;
                if(Ext.isEmpty(rec.data.Title)){
                    switch (rec.data.F_CATEGORY.toLowerCase()) {
                        case 'body':
                            title = rec.data.F_DESC5;
                            break;
                        case 'photos':
                            title = (rec.data.F_OWNER != null ? rec.data.F_OWNER + ' ' : '') + rec.data.F_STYLE;
                            break;
                        default:
                            title = rec.data.F_DESC6;
                            break;
                    }
                }

                var srcPath = '';
                if(!Ext.isEmpty(rec.data.F_NAME) && !Ext.isEmpty(rec.data.F_TYPE)){
                    srcPath = '../' + rec.data.F_LINK + rec.data.F_PATH + '/' + rec.data.ID + '/' + rec.data.F_NAME;
                }
                else {
                    srcPath = '../' + rec.data.F_LINK + rec.data.F_PATH + '/' + rec.data.F_LOCATION + rec.data.F_EXT;
                }

                //prefix = 'nDisplay-';
                innerTab = {
                    inTab: true,
                    node: node,
                    xtype: 'display',
                    reference: prefix + rec.get(fieldname),
                    title: 'No. ' + title,
                    tabConfig: {
                        tooltip: title,
                        keyHandlers: {
                            Q: 'onEnterKey',
                            B: 'onPrintKeyPressed'
                        },
                        onEnterKey: function(event){
                            //Ext.Msg.alert('KeyMap', 'You pressed ENTER.');
                            event.preventDefault();
                            event.stopEvent();
                            //console.log(this.card.tab, this, this.tabBar.tabPanel)
                            //var tabpanel = this.tabBar.tabPanel;
                            var ctrl = this.card.getController();
                            if(event.ctrlKey && this.closable){
                                //tabpanel.remove(this.card);
                                ctrl.onClose();
                            }
                        },
                        onPrintKeyPressed: function(e){
                            e.preventDefault();
                            e.stopEvent();

                            //console.log('print B')
                            var ctrl = this.card.getController();
                            if(e.ctrlKey){
                                ctrl.printTab();
                            }
                        }
                    },
                    closable: true,
                    //scrollable: true,
                    layout: 'fit',
                    //active: rec,
                    style: {
                        borderTop: '1px solid #cfcfcf'
                    },
                    items: [{
                        xtype: 'container',
                        itemId: 'innerPnl',
                        scrollable: true,
                        items:[{
                            xtype: 'image',
                            src: srcPath,
                            //maxWidth: '1200px',
                            maxHeight: 1600,
                            margin: 5,
                            style: {
                                position: 'absolute',
                                cursor: 'zoom-in',
                                //maxWidth: '70%',
                                height: '98%',
                                top: 0,
                                left: 0
                            },
                            listeners: {
                                render: function(img){
                                    img.getEl().on({
                                        click: function (event, element) {

                                            var position = img.getEl().dom.style.position,
                                                cursor = img.getEl().dom.style.cursor;

                                            position = position == 'absolute' ? 'relative' : 'absolute';
                                            cursor = cursor == 'zoom-in' ? 'zoom-out' : 'zoom-in';
                                            img.setStyle({
                                                'position': position,
                                                'cursor': cursor
                                            });

                                        }
                                    });
                                }
                            }
                        }],
                        listeners: {
                            /*
                            render: function (c) {
                                //var panel = img.ownerCt.body;
                                var i = new Image();
                                i.crossOrigin = 'anonymous';

                                i.onload = function(){

                                    var canvas = document.createElement('CANVAS');
                                    var ctx = canvas.getContext('2d');

                                    canvas.height = this.naturalHeight;
                                    canvas.width = this.naturalWidth;

                                    ctx.drawImage(this, 0, 0);
                                    var dataURL = canvas.toDataURL();

                                    //img.setSrc(dataURL);
                                    console.log(dataURL)
                                    var img = c.down('image');
                                    img.setSrc(dataURL)
                                };
                                i.src = srcPath;
                                i = null;
                                //console.log(i, img.getEl().dom)
                            }
                            */
                        }
                    }/*,{
                     xtype: 'component',
                     itemId: 'contentIframe',
                     autoEl: {
                     tag: 'iframe',
                     scrolling: 'no',
                     style: 'width: 100%; height: 100%; border: none;',
                     src: 'M152646_BLUE GROTTO WHITE_front.jpg'
                     //src: xf.format('PDFHandler.ashx?index={0}&date={1}&file={2}', 2, xf.date(rec.data.CreateOn, 'm/d/Y'), rec.data.Link)
                     }
                     }*/]
                };
                break;
            case 'request':
            case 'review':
            case 'pending':
            case 'pow':
                //prefix = 'nDisplay-';
                srcPath = xf.format('../services/POWHandler.ashx?date={0}&file={1}', xf.date(rec.data.createdon, 'm/d/Y'), rec.data.link);

                if(rec.data.revision != -1){
                    srcPath = xf.format('../services/PowPreviewPrint.ashx?ID={0}', rec.data.powhId);
                }

                innerTab = {
                    inTab: true,
                    node: node,
                    xtype: 'display',
                    reference: prefix + rec.data.powhId,
                    title: 'P.O.W #' + xf.ellipsis(rec.data.powno, 18),
                    tabConfig: {
                        tooltip: rec.data.powno,
                        keyHandlers: {
                            Q: 'onEnterKey',
                            B: 'onPrintKeyPressed'
                        },
                        onEnterKey: function(event){
                            //Ext.Msg.alert('KeyMap', 'You pressed ENTER.');
                            event.preventDefault();
                            event.stopEvent();
                            //console.log(this.card.tab, this, this.tabBar.tabPanel)
                            //var tabpanel = this.tabBar.tabPanel;
                            var ctrl = this.card.getController();
                            if(event.ctrlKey && this.closable){
                                //tabpanel.remove(this.card);
                                ctrl.onClose();
                            }
                        },
                        onPrintKeyPressed: function(e){
                            e.preventDefault();
                            e.stopEvent();
                            //console.log(this.card.tab, this, this.tabBar.tabPanel)
                            //var tabpanel = this.tabBar.tabPanel;
                            var ctrl = this.card.getController();
                            if(e.ctrlKey && this.closable){
                                //tabpanel.remove(this.card);
                                ctrl.printTab();
                            }
                        }
                    },
                    iconCls: 'x-fa fa-file-text-o',
                    closable: true,
                    //active: rec,
                    //session: true,
                    style: {
                        borderTop: '1px solid #cfcfcf'
                    },
                    viewModel: {
                        data: {
                            thePow: rec
                            //progress: rec.data.progress,
                            //status: rec.data.status
                        }
                        /*
                         links: {
                         thePow: {
                         type: 'Powh',
                         id: parseInt(rec.data.powhId,10)
                         }
                         }
                         */
                    },
                    items: [{
                        xtype: 'component',
                        itemId: 'contentIframe',
                        autoEl: {
                            tag: 'iframe',
                            style: 'height: 100%; width: 100%; border: none',
                            //src: 'QuickGuideforIllustratorCS6-Basics.pdf'
                            src: srcPath
                        }
                    }]
                };
                break;
            case 'notice':
                //prefix = 'nPost-';
                /*
                 rec.filesInArticles(function(files){
                 files.each(function(file){
                 //console.log(file)
                 })
                 });
                 */
                innerTab = {
                    inTab: true,
                    node: node,
                    xtype: 'notice-post',
                    reference: prefix + rec.get(fieldname),
                    title: xf.ellipsis(rec.data.Title, 18),
                    closable: true
                };
                break;
            case 'line':
                store = vm.getStore('linesheets');
                
                //fieldname = store.first().getIdProperty();
                fieldname = 'lineseq';
                rec = store.findRecord(fieldname, id.toString(), 0, false, false, true);
                
                innerTab = {
                    xtype: 'production-linesheet',                    
                    reference: prefix + rec.get(fieldname),
                    inTab: true,
                    node: node,
                    //title: rec.data.title,
                    //iconCls: 'x-fas fa-sort-up',
                    bind: {
                        title: '{title}'
                    },
                    closable: true,
                    viewModel: {
                        type: 'production-linesheet',
                        data: {
                            theLineSheet: rec,
                            title: rec.data.linetitle //+ ' - ' + Ext.Date.format(new Date(), 'F, Y')
                        },
                        links: {
                            /*
                            theLineSheet: {
                                type: 'style.LineSheet',
                                id: rec.data.lineseq
                            }
                            */
                        }
                    }
                };
                break;
        }

        console.log('line', prefix, rec, fieldname);
        item = view.lookupReference(prefix + rec.get(fieldname));

        if (!item) {
            item = view.add(innerTab);
            item.setActive(rec);
        }

        view.suspendEvents(false);
        view.setActiveTab(item);
        //item.tab.focus(100);
        view.resumeEvents(true);
    },

    onRouteOp: function(node, op, id) {
        var me = this,
        //refs = me.getReferences(),
            mainView = August.app.getMainView(),
            main = mainView.getController(),
            refs = main.getReferences(),
            mainCard = refs.mainCardPanel,
            view = mainCard.child('component[routeId=' + node + ']');
            //viewModel = view.getViewModel(),
        //console.log('onRouteOp', node, op, id);

        var title = Ext.String.capitalize(op),
            //title = (!id ? 'New' : 'Edit'),
            alias;

        switch(node){            
            case 'purchase-order':
                title += ' Purchase Order';
                alias = 'purchase-orderForm';
                break;
            case 'sales-order':
                title += ' Sales Order';
                alias = 'sales-orderForm';
                break;
            case 'pick-ticket':
                title += ' Pick Ticket';
                alias = 'pick-ticketForm';
                break;
            case 'sample':
            case 'product':
                title += ' Style';
                alias = 'style-edit-form';
                break;
            case 'productdetail':
                title += ' Product Details';
                alias = 'pim-form';
                break;
            case 'customer-invoice':
                title += ' Invoice';
                alias = 'invoice-form';
                break;
            case 'payment-receive':
                title += ' Payment Receive';
                alias = 'payment-receiveForm';
                break;
            case 'physical':
                title += ' P.I';
                alias = 'pi-form';
                break;
            case 'transfer':
                title += ' Warehouse Transfer';
                alias = 'transfer-form';
                break;
        }

        var form = view.lookupReference(alias);

        if (!form) {
            form = view.add({
                xtype: alias,
                iconCls: 'x-fa fa-plus-circle',
                reference: alias,
                //opMode: op,
                closable: true,
                //isEdit: isEdit,                
                viewModel: {
                    type: alias,
                    data: {
                        node: node
                    }
                }
            });
        }

        form.opMode = op;
        form.isEdit = !!id;

        var fvm = form.getViewModel();
        fvm.set('title', title);

        form.on('activate', function(p) {
            if(form.isEdit){
                p.setLoading(true);
            }
        }, this, {single:true});

        //var s = fvm.getStore('powStatus');
        switch(node){
            /*
            case 'request':
                //var statusCombo = form.lookupReference('information').down('combo[name="status"]');
                //statusCombo.getStore().loadData([['DRAFT'],['PRE-ADVISE']]);
                if(s){
                    s.filterBy(function(rec){
                        if(rec.get('id') === 'DRAFT' || rec.get('id') === 'PRE-ADVISE'){
                            return true;
                        }
                    });
                }
            case 'review':
            case 'pending':
            case 'pow':
                if(node !== 'request'){

                    if(s){
                        s.filterBy(function(rec){
                            if(rec.get('id') !== 'DRAFT'){
                                return true;
                            }
                        });
                    }
                }
                this.processSales(fvm, node, op, id);
                break;
            */
            case 'purchase-order':
                this.processPurchases(fvm, node, op, id);
               break;
            case 'sales-order':
                this.processSales(fvm, node, op, id);
                break;
            case 'pick-ticket':                
                this.processPickTickets(fvm, node, op, id);
                break;
            case 'product':
                var tabs = form.lookupReference('editproducttabs'),
                    photos = form.lookupReference('photos'),
                    attach = form.lookupReference('attachment'),
                    request = form.lookupReference('reqs');

                photos.setTitle('Style Photos');

                //tabs.remove(attach);
                tabs.remove(request);            
            case 'sample':
                this.processProducts(fvm, node, op, id);
                break;     
            case 'productdetail':
                var tabs = form.lookupReference('pimFormTab'),
                    photos = form.lookupReference('product-photos');

                this.processProductDetails(fvm, node, op, id);
                break; 
            case 'customer-invoice':                
                this.processInvoices(fvm, node, op, id);
                break;
            case 'payment-receive':       
                this.processPayments(fvm, node, op, id);
                break;
            case 'physical':
                this.processPIs(fvm, node, op, id);
                break;
            case 'transfer':
                this.processTransfers(fvm, node, op, id);
                break;
            
        }
        /*
        Ext.Ajax.on('beforerequest', function (con, opt) {
            if(form){
                form.setLoading(true);
            }
        }, this);

        Ext.Ajax.on('requestcomplete', function (con, opt) {
            if(form){
                form.setLoading(false);
            }
        }, this);
        */

        view.suspendEvents(false);
        view.setActiveTab(form);
        view.resumeEvents(true);
    },

    onRoute: function(node, sub){
        var mainView = August.app.getMainView(),
            vm = mainView.getViewModel(),
            view = vm.get('currentView');
            //multiview = view.lookupReference('multiview'),
            //store = view.getViewModel().getStore(node.replace('-','')+'s');

        //console.log('onRoute', node, sub)
        switch(node){
            case 'receiving':
                this.inventoryReceiving(view, node, sub);
                break;
            case 'allocation':
                this.inventoryAllocation(view, node, sub);
                break;
            case 'reports':
                this.navigateReports(view, node, sub);
                break;
            case 'settings':
                this.navigateSettings(view, node, sub);
                break;
        }
    },

    processPurchases: function(vm, node, op, id){
        var session = vm.getSession();        

        var cRec = vm.get('thePO');
        if(!Ext.isEmpty(session.data['purchase.Order']) && !session.data['purchase.Order'].hasOwnProperty('pono')){
            //console.log(session.data)
            session.data['purchase.Order'] = null;
            session.data['purchase.OrderItem'] = null;            
        }

        var binding = null;

        August.model.purchase.Order.getProxy().setHeaders({
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        });

        if(id){            

            vm.linkTo('thePO', {
                type: 'purchase.Order',
                //reference: 'August.model.purchase.Order',
                id: parseInt(id,10)
            });                                    

            //console.log('processPurchases', vm);
            
        }
        else {
            if(vm.get('thePO') != null){
                vm.set('thePO', null);
            }

            vm.linkTo('thePO', {
                type: 'purchase.Order',
                create: {
                    startDate: new Date().toDateString(),
                    status: 'Closed',
                    //warehouse: '00',
                    userName: August.loggedInUser.userId
                }
            });
        }

        var vendors = vm.getStore('vendors');
        var shiptos = vm.getStore('shiptos');
        
        binding = vm.bind('{thePO}', function(rec){                                                
            var grid = vm.getView().lookupReference('po-grid'),
            store = rec.purchaseorderitems();
                
            //store.setRemoteFilter(false);

            vendors.load();
            shiptos.load();

            store.on({
                load: function(s){
                    
                    var override = grid.getPlugin('poRowExpander'); 
                    override.expandAll();
                    
                    grid.getScrollable().scrollTo(0, 0);
                }
            });

            vm.getView().setLoading(false);
            binding.destroy();
        });        

        if(binding){
            vm.getView().setLoading(false);
        }        
    },

    processSales: function(vm, node, op, id){
        var session = vm.getSession();                

        var cRec = vm.get('theOrder');
        
        if(!Ext.isEmpty(session.data['sales.Order']) && !session.data['sales.Order'].hasOwnProperty(id)){
            //console.log(session.data)
            session.data['sales.Order'] = null;
            session.data['sales.OrderDetail'] = null;            
        }

        var binding = null;
        
        August.model.sales.Order.getProxy().setHeaders({
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        });

        if(id){            

            vm.linkTo('theOrder', {
                type: 'sales.Order',
                //reference: 'August.model.sales.Order',
                id: parseInt(id,10)
            });                                    
        }
        else {
            if(cRec != null){
                vm.set('theOrder', null);
            }

            vm.linkTo('theOrder', {
                type: 'sales.Order',
                create: {
                    startDate: new Date().toDateString(),
                    status: 'Open',
                    //warehouse: '00',
                    userName: August.loggedInUser.userId
                }
            });
        }

        //var customers = vm.getStore('customers');
        //var stores = vm.getStore('stores');

        binding = vm.bind('{theOrder}', function(rec) {
                        
            var grid = vm.getView().lookupReference('so-grid'),
                store = rec.salesorderitems();                         
            
            // Purpose??
            //store.setRemoteFilter(false);                        

            if(grid){
                var columns = grid.getColumns();
                Ext.each(columns, function(col, idx){                        
                
                    if(idx > 5 && idx < 17) {
                        //index = idx - 5;  
                        //col.setText('');             
                    }                        
                });
            }                        

            store.on({
                load: function(s){
                    
                    var override = grid.getPlugin('soRowExpander'); 
                    override.expandAll();
                    
                    grid.getScrollable().scrollTo(0, 0);
                }
            });

            //console.log('binding - inside', grid.getView().getNodes());
            vm.getView().setLoading(false);
            binding.destroy();             
        });

        if(binding){
            vm.getView().setLoading(false);
        }                
    },

    _processSales: function(vm, node, op, id){
        var session = vm.getSession(),
            binding = null,
            record;

        if(!Ext.isEmpty(session.data.Powh) && !session.data.Powh.hasOwnProperty(id)){
            session.data.Powh = null;
            session.data.Powd = null;
            session.data.Powm = null;
            session.data.Powlog = null;
        }

        if(!id){
            /*
             var powhRec = Ext.create('August.model.Powh', {
             userId: August.user.get('Userid'),
             revision: 0,
             division: 'MISSY',
             status: 'PRE-ADVISE',
             pack: 'HANGING',
             progress: node
             });

             fvm.set('header', powhRec);
             */

            if(vm.get('srcPowhId') != null){
                vm.set('srcPowhId', null);
            }

            vm.linkTo('header', {
                type: 'Powh',
                create: {
                    userId: August.user.get('Userid'),
                    powno: 'TBD',
                    revision: 0,
                    division: 'MISSY',
                    status: node == 'request' ? 'DRAFT' : 'PRE-ADVISE',
                    pack: 'HANGING',
                    progress: node
                }
            });
        }
        else {
            /*
             isEdit =  true;
             //record.id = parseInt(id);
             //record.updatedby = August.user.get('Userid');
             //record.progress = nextProgress;
             console.log('onRouteOp', node, op, id)
             */

            if(node === 'request' && op === 'edit' && August.account.inRole('sales')){
                vm.set('srcPowhId', parseInt(id,10));

                vm.linkTo('header', {
                    type: 'Powh',
                    //reference: 'August.model.Powh',
                    id: parseInt(id,10)
                });

                binding = vm.bind('{header}', function(rec){

                    var powlogs = vm.getStore('powlogs');
                    powlogs.on('beforeload', function(s){
                        Ext.apply(powlogs.getProxy().extraParams, {
                            powhId: vm.get('srcPowhId'),
                            powno: rec.data.powno
                        });
                    }, this);

                    powlogs.load();

                    vm.getView().setLoading(false);
                    binding.destroy();
                });
            }
            else {
                //console.log('Not Request', session.peekRecord('Powh', -1), vm.get('srcPowhId'), node, op)
                if(vm.get('srcPowhId') == null || vm.get('srcPowhId') != parseInt(id,10))
                {
                    vm.set('srcPowhId', parseInt(id, 10));

                    August.model.Powh.load(parseInt(id,10), {
                        success: function (rec, ope) {
                            //var session = item.getViewModel().getSession();
                            record = rec.copy(null, session);

                            switch(op){
                                case 'edit':
                                    record.data.revision = parseInt(id,10);
                                    if(node === 'review'){
                                        record.data.status = 'REVISED';
                                    }
                                    break;
                                case 'copy':
                                    record.data.revision = 0;
                                    record.data.status = 'PRE-ADVISE';

                                    if(node === 'request'){
                                        record.data.powno = 'TBD';
                                        record.data.progress = node;
                                    }
                                    if(node === 'review'){
                                        record.data.powno = '';
                                    }
                                    break;
                            }

                            //record.data.progress = nextProcess;
                            record.data.userId = August.user.data.Userid;
                            //console.log(record.data.userId,August.user.data.Userid)
                            record.data.createdon = new Date();
                            record.data.updatedby = null;
                            record.data.updatedon = null;

                            rec.powds().each(function (d) {
                                var nd = d.copy(null, session);
                                //console.log('powd', nd)
                                nd.data.userId = record.data.userId;
                                nd.data.createdon = record.data.createdon;
                                nd.data.updatedby = null;
                                nd.data.updatedon = null;

                                var mat = record.powds().add(nd);

                                d.powms().sort('lineseq', 'ASC');
                                d.powms().each(function (m) {
                                    mat[0].powms().add(m.copy(null, session));
                                });

                                d.tnaps().each(function (p) {
                                    mat[0].tnaps().add(p.copy(null, session));
                                });

                                //console.log(nd, count);
                                /*
                                 d.filesInPowds().each(function(f){
                                 mat[0].filesInPowds().add(f.copy(null, session));
                                 })
                                 */
                            });

                            /*
                            rec.powlogs().each(function(g){
                                var ng = g.copy(null, session);

                                //record.powlogs().add(ng);
                            });
                            */

                            //console.log('New Record', fvm.get('srcPowhId'), fvm.get('header'), session.getChanges())
                            binding = vm.bind('{header}', function(r){

                                var powlogs = vm.getStore('powlogs');
                                powlogs.on('beforeload', function(s){
                                    Ext.apply(powlogs.getProxy().extraParams, {
                                        powhId: vm.get('srcPowhId'),
                                        powno: record.data.powno
                                    });
                                }, this);

                                powlogs.load();

                                vm.getView().setLoading(false);
                                binding.destroy();
                            });

                            vm.set('header', record);

                        },
                        failure: function (rec, ope) {
                            //console.log('fail', rec, ope);
                        },
                        callback: function (rec, ope, success) {

                        }
                    });

                }

                if(!binding){
                    binding = vm.bind('{header}', function(r){

                        vm.getView().setLoading(false);
                        binding.destroy();
                    });
                }
            }
        }
    },

    processProducts: function(vm, node, op, id){
        var session = vm.getSession();
            //boms = vm.getView().lookupReference('boms'),
            //store = boms.getViewModel().getStore('boms'),
            //bomStore = vm.getStore('boms'),
            //center = boms.lookupReference('center');
        
        if(!Ext.isEmpty(session.data['style.Product']) && !session.data['style.Product'].hasOwnProperty(id)){
            //console.log('before clear', session.data['style.Product'].hasOwnProperty(id), id, session.data['style.Product'].hasOwnProperty(id) != id);
            session.data['style.Product'] = null;
            session.data['style.Bomh'] = null;
            session.data['style.Bolh'] = null;
            session.data['style.Bom'] = null;
            session.data['style.Bol'] = null;
            session.data['style.File'] = null;
            session.data['style.ProductPhoto'] = null;
            //console.log('after clear', session.data, session.data["style.Product"])
        }

        console.log('processProducts', vm);            

        var binding = null;

        August.model.style.Product.getProxy().setHeaders({
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        });
        

        if(id){
            /*
            August.model.Product.load(parseInt(id,10), {
                success: function(rec, ope){

                    vm.set('theSample', rec);

                    var bomIdx = 0;
                }
            });
            */            

            if(op == 'edit'){                

                vm.linkTo('theProduct', {
                    type: 'style.Product',
                    id: parseInt(id,10)
                });
            }

            if(op == 'copy'){
                August.model.sample.Product.load(parseInt(id,10), {
                    success: function (rec, ope) {
                        var record = rec.copy(null, session);

                        record.data.style = style;
                        record.data.color = color;
                        record.data.userName = August.user.data.Userid;
                        record.data.userTime = new Date();
                        record.data.UpdateUser = null;
                        record.data.UpdateTime = null;

                        if(!copy.checked){
                            record.data.cost = 0;
                            record.data.defaultBomCost = 0;
                            record.data.avgCost = 0;
                            record.data.BomCost1 = 0;
                            record.data.bomcost2 = 0;
                            record.data.bomcost3 = 0;
                            record.data.bomcost4 = 0;
                            record.data.bomcost5 = 0;
                        }
                        else {
                            rec.bomhs(function(bomhs){
                                //console.log('Product Get', bomhs, csnum.getValue());
                                bomhs.each(function(bomh){
                                    if(bomh.data.bomno == csnum.getValue()){

                                        var nbomh = bomh.copy(null, session);
                                        nbomh.data.color = record.data.color;
                                        nbomh.data.createUser = August.user.data.Userid;
                                        nbomh.data.createTime = new Date();
                                        nbomh.data.updateUser = null;
                                        nbomh.data.updateTime = null;

                                        var abomh = record.bomhs().add(nbomh);

                                        bomh.boms(function(boms){

                                            boms.each(function(bom){
                                                var nbom = bom.copy(null, session);
                                                nbom.data.color = record.data.color;

                                                abomh[0].boms().add(nbom);
                                            });
                                            //console.log('Product Get', boms, abomh);
                                        });

                                        bomh.bolhs(function(bolhs){
                                            bolhs.each(function(bolh){
                                                var nbolh = bolh.copy(null, session);
                                                nbolh.data.color = record.data.color;
                                                nbolh.data.createUser = August.user.data.Userid;
                                                nbolh.data.createTime = new Date();
                                                nbolh.data.updateUser = null;
                                                nbolh.data.updateTime = null;

                                                var abolh = abomh.bolhs().add(nbolh);

                                                bolh.bols().each(function(bol){
                                                    var nbol = bol.copy(null, session);
                                                    nbol.data.color = record.data.color;

                                                    abolh[0].bols().add(nbol);
                                                });
                                            });
                                        });
                                    }
                                });
                            });
                        }

                        vm.set('theProduct', record);
                    },
                    failure: function (rec, ope) {
                        //console.log('fail', rec, ope);
                    },
                    callback: function (rec, ope, success) {

                    }
                });
            }

            if(op == 'import'){

                vm.set('srcId', id);

                var num = parseInt(id, 10);

                August.model.Powh.load(parseInt(num / 100), {
                    success: function (rec, ope) {

                        var powd = rec.powds().getAt(num % 100);

                        vm.linkTo('theSample', {
                            type: 'style.Product',
                            create: {
                                //style: powd.data.style,
                                //color: powd.data.color,
                                //type: 'Style',
                                rawMatType: 'Style',
                                descript: powd.data.bodyref + ' ' + powd.data.bodydesc,
                                division: rec.data.division,
                                processtype: rec.data.ordertype,
                                sizeCat: rec.data.sizes,
                                user2: powd.data.bodyref,
                                //cost: powd.data.cost,
                                price1: powd.data.price,
                                sgtRetailPrice: powd.data.msrp,
                                //default
                                fabricType: 'KNIT',
                                fabcontent: '00',
                                season: 'E',
                                status: 'ACTIVE',

                                userName: August.user.data.Userid,
                                lowestno: 1
                            }
                        });

                        var newSample = vm.get('theSample');
                        var newBomh = Ext.create('August.model.style.Bomh', {
                            style: newSample.data.style,
                            color: newSample.data.color,
                            bomno: 1,
                            //processType: newSample.data.processtype.trim(),
                            EffStartDate: '2000-01-01 00:00:00',
                            EffEndDate: '2099-12-31 12:59:59',
                            createUser: August.user.data.Userid
                        });

                        var aBomh = newSample.bomhs().add(newBomh);

                        powd.powms().each(function(powm){

                            if(!Ext.isEmpty(powm.data.mattype) && !Ext.isEmpty(powm.data.matcode) && !Ext.isEmpty(powm.data.matcolor)){
                                var newBom = Ext.create('August.model.style.Bom', {
                                    style: newBomh.data.style,
                                    color: newBomh.data.color,
                                    bomno: newBomh.data.bomno,
                                    rawMatType: powm.data.mattype,
                                    rawStyle: powm.data.matcode,
                                    rawColor: powm.data.matcolor,
                                    qty: 0,
                                    memo: powm.data.matcategory,
                                    compLevel: 'Color',
                                    po_autocreate: 'Y'
                                });

                                aBomh[0].boms().add(newBom);
                            }
                        });

                        //console.log(rec, newSample)
                    },
                    failure: function (rec, ope) {
                        //console.log('fail', rec, ope);
                    },
                    callback: function (rec, ope, success) {

                    }
                });
            }            
        }
        else {
            /*
            var product = Ext.create('August.model.Product', {
                userId: August.user.get('Userid'),
                type: 'Style',
                rawMatType: 'Style',
                processtype: 'DS SAMPLE',
                division: 'MISSY',
                status: 'ACTIVE',
                lowestno: 1
            });
            */

            vm.linkTo('theProduct', {
                type: 'style.Product',
                create: {
                    //type: 'Style',
                    rawMatType: 'Style',
                    division: 'MISSY',
                    status: 'ACTIVE',
                    //color: node == 'sample' ? '00' : '',
                    //season: node == 'sample' ? 'E' : '',
                    //processtype: node == 'sample' ? 'DS SAMPLE' : '',
                    //sizeCat: node == 'sample' ? 'ONESIZE' : '',
                    userName: August.loggedInUser.userId,
                    lowestno: 1
                }
            });
           // console.log('edit', vm.get('theProduct'), vm.linkData.theProduct)
        }

        binding = vm.bind('{theProduct}', function(rec){
            console.log('style binding', rec);
            if(id > 0){

                var invStore = vm.getStore('inventories'),
                    onhandStore = vm.getStore('onhands'),
                    onorderStore = vm.getStore('onorders'),
                    wipStore = vm.getStore('wips'),
                    form = vm.getView(),
                    tab = form.lookupReference('editproducttabs'),
                    combo = tab.down('combo[name="warehouse"]');

                Ext.apply(invStore.getProxy().extraParams, {
                    style: rec.get('style').trim(),
                    color: rec.get('color').trim()
                });                                                   

                Ext.apply(onhandStore.getProxy().extraParams, {
                    style: rec.get('style').trim(),
                    color: rec.get('color').trim()
                });

                Ext.apply(onorderStore.getProxy().extraParams, {
                    style: rec.get('style').trim(),
                    color: rec.get('color').trim()
                });

                Ext.apply(wipStore.getProxy().extraParams, {
                    style: rec.get('style').trim(),
                    color: rec.get('color').trim()
                });

                onhandStore.load({
                    callback: function(recs, op, success){                        
                        
                    }                    
                });

                onorderStore.load({
                    callback: function(recs, op, success){

                    }
                }),

                wipStore.load({
                    callback: function(recs, op, success){

                    }
                });

                invStore.load({
                    callback: function(recs, op, success){
                        var ots = Ext.create('August.model.style.Inventories', {
                            style: rec.get('style'),
                            color: rec.get('color'),
                            warehouse: 'All',
                            season: rec.get('season'),
                            grp: rec.get('grp'),
                            descript: rec.get('descript'),
                            price: rec.get('price'),
                            //dt: rec.get(''),
                            division: rec.get('division'),
                            oh1: rec.get('oh1'),
                            oh2: rec.get('oh2'),
                            oh3: rec.get('oh3'),
                            oh4: rec.get('oh4'),
                            oh5: rec.get('oh5'),
                            oh6: rec.get('oh6'),
                            oh7: rec.get('oh7'),
                            oh8: rec.get('oh8'),
                            oh9: rec.get('oh9'),
                            oh10: rec.get('oh10'),
                            wip1: rec.get('po1'),
                            wip2: rec.get('po2'),
                            wip3: rec.get('po3'),
                            wip4: rec.get('po4'),
                            wip5: rec.get('po5'),
                            wip6: rec.get('po6'),
                            wip7: rec.get('po7'),
                            wip8: rec.get('po8'),
                            wip9: rec.get('po9'),
                            wip10: rec.get('po10'),
                            order1: rec.get('order1'),
                            order2: rec.get('order2'),
                            order3: rec.get('order3'),
                            order4: rec.get('order4'),
                            order5: rec.get('order5'),
                            order6: rec.get('order6'),
                            order7: rec.get('order7'),
                            order8: rec.get('order8'),
                            order9: rec.get('order9'),
                            order10: rec.get('order10'),
                            ats1: rec.get('oh1') + rec.get('po1') - rec.get('order1'),
                            ats2: rec.get('oh2') + rec.get('po2') - rec.get('order2'),
                            ats3: rec.get('oh3') + rec.get('po3') - rec.get('order3'),
                            ats4: rec.get('oh4') + rec.get('po4') - rec.get('order4'),
                            ats5: rec.get('oh5') + rec.get('po5') - rec.get('order5'),
                            ats6: rec.get('oh6') + rec.get('po6') - rec.get('order6'),
                            ats7: rec.get('oh7') + rec.get('po7') - rec.get('order7'),
                            ats8: rec.get('oh8') + rec.get('po8') - rec.get('order8'),
                            ats9: rec.get('oh9') + rec.get('po9') - rec.get('order9'),
                            ats10: rec.get('oh10') + rec.get('po10') - rec.get('order10'), 
                            ots1: rec.get('oh1') - rec.get('order1'),
                            ots2: rec.get('oh2')- rec.get('order2'),
                            ots3: rec.get('oh3')- rec.get('order3'),
                            ots4: rec.get('oh4')- rec.get('order4'),
                            ots5: rec.get('oh5')- rec.get('order5'),
                            ots6: rec.get('oh6')- rec.get('order6'),
                            ots7: rec.get('oh7')- rec.get('order7'),
                            ots8: rec.get('oh8')- rec.get('order8'),
                            ots9: rec.get('oh9')- rec.get('order9'),
                            ots10: rec.get('oh10')- rec.get('order10'),
                            size1: rec.get('Size').size1,             
                            size2: rec.get('Size').size2,
                            size3: rec.get('Size').size3,             
                            size4: rec.get('Size').size4,             
                            size5: rec.get('Size').size5,             
                            size6: rec.get('Size').size6,             
                            size7: rec.get('Size').size7,             
                            size8: rec.get('Size').size8,             
                            size9: rec.get('Size').size9,             
                            size10: rec.get('Size').size10    
                        });

                        this.insert(0, ots);

                        this.filter('warehouse', combo.getValue());
                    }
                });
            } 

            vm.getView().setLoading(false);

            binding.destroy();
        });

        if(binding){
            vm.getView().setLoading(false);
        }
    },

    processProductDetails: function(vm, node, op, id){
        var session = vm.getSession();                    

        if(!Ext.isEmpty(session.data['pim.ProductDetail']) && !session.data['pim.ProductDetail'].hasOwnProperty(id)){
            //console.log('before clear', session.data['style.Product'].hasOwnProperty(id), id, session.data['style.Product'].hasOwnProperty(id) != id);
            session.data['pim.ProductDetail'] = null;            
            session.data['pim.ProductDetailPhoto'] = null;            
        }
        
        var binding = null;

        August.model.pim.ProductDetail.getProxy().setHeaders({
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        });
                
        if(id){                     

            if(op == 'edit') {                                                
                
                vm.linkTo('theProductDetail', {
                    type: 'pim.ProductDetail',
                    id: parseInt(id,10)
                });
                                
            }                            
        }
        else {           

            if(vm.get('theProductDetail') != null){
                vm.set('theProductDetail', null);
            }

            //var selected = vm.getParent().get('selectedStyle');            
            
            vm.linkTo('theProductDetail', {
                type: 'pim.ProductDetail',
                create: {
                    ageGroup: 'Adult',                
                    taxCode: 'General Clothing',
                    warranty: 'N',
                    origin: 'Imported',
                    createUser: August.loggedInUser.userId
                }
            });
                                
        }                          
        
        binding = vm.bind('{theProductDetail}', function(rec){            
            var form = vm.getView(),
                pvm = vm.getParent(),
                tab = form.lookupReference('pimFormTab'),
                pStore = vm.get('theProductDetail').photosInProductDetails();                            
            
            /*
            if(Ext.isEmpty(id)){                
                //combo = tab.down('combo[name="warehouse"]');                                
                rec.set('styleId', selected.get('id'));
                rec.set('style', selected.get('style'));
                rec.set('color', selected.get('color'));
                rec.set('description', selected.get('descript'));
                rec.set('categoryCode', selected.get('category').toLowerCase());
                rec.set('materialCode', selected.get('cimemo'));
                rec.set('dimensions', selected.get('user6'));
                rec.set('ageGroup', 'Adult');
                rec.set('msrp', selected.get('sgtRetailPrice'));
                rec.set('taxCode', 'General Clothing');
                rec.set('warranty', 'N');
                rec.set('origin', 'Imported');
                rec.set('createUser', August.loggedInUser.userId );
            }             
            */ 
            
            //var sorters = pStore.getSorters();
            //sorters.add('position');
            pStore.on('datachanged', function(s){
                //console.log(vm.getSession().getChanges());
                
            });

            /*
            var taxCombo = tab.down('combo[name="taxCode"]'),
                originCombo = tab.down('combo[name="origin"]'),
                warrantyCombo = tab.down('combo[name="warranty"]');            
            */
            
            vm.getStore('fileStore').on('add', function(store, records, index){

                records.forEach(function(prec) {   
                    prec.set('position', index+1);
                    prec.set('style', rec.get('style').trim());
                    prec.set('color', rec.get('color').trim());                                                                                
                });
            });
                        
            vm.getStore('fileStore').on('datachanged', function(store){
                //btnSave.setDisabled(store.getCount() == 0);
            });
            
            vm.getView().setLoading(false);
            binding.destroy();
        });
        
        if(binding){
            vm.getView().setLoading(false);
        }
        
    },

    processInvoices: function(vm, node, op, id){
        var session = vm.getSession();                

        var cRec = vm.get('theInvoice');
        if(!Ext.isEmpty(session.data['invoice.Header']) && !session.data['invoice.Header'].hasOwnProperty(id)){
            //console.log(session.data)
            session.data['invoice.Header'] = null;
            session.data['invoice.Detail'] = null;            
        }

        var binding = null;
        
        August.model.invoice.Header.getProxy().setHeaders({
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        });

        if(id){            

            vm.linkTo('theInvoice', {
                type: 'invoice.Header',
                //reference: 'August.model.sales.Order',
                id: parseInt(id,10)
            });                                    
        }
        else {
            if(vm.get('theInvoice') != null){
                vm.set('theInvoice', null);
            }

            vm.linkTo('theInvoice', {
                type: 'invoice.Header',
                create: {
                    startDate: new Date().toDateString(),
                    status: 'Open',
                    //warehouse: '00',
                    userName: August.loggedInUser.userId
                }
            });
        }

        //var customers = vm.getStore('customers');
        //var stores = vm.getStore('stores');

        binding = vm.bind('{theInvoice}', function(rec){
            
            var grid = vm.getView().lookupReference('inv-grid');
            if(grid){
                var columns = grid.getColumns();
                Ext.each(columns, function(col, idx){                        
                
                    if(idx > 4 && idx < 16) {
                        index = idx - 4;  
                        //col.setText('');             
                    }                        
                });
            }
            
            vm.getView().setLoading(false);
            binding.destroy();
        });

        if(binding){
            vm.getView().setLoading(false);
        }
    },

    processPayments: function(vm, node, op, id){
        var session = vm.getSession();        

        var cRec = vm.get('thePayment');
        if(!Ext.isEmpty(session.data['payment.Header']) && !session.data['payment.Header'].hasOwnProperty('paymentNo')){
            //console.log(session.data)
            session.data['payment.Header'] = null;
            session.data['payment.Detail'] = null;            
            //session.data['payment.PaymentD'] = null;   
        }

        var binding = null;
        
        August.model.payment.Header.getProxy().setHeaders({
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        });   

        if(id){
                                     
            vm.linkTo('thePayment', {
                type: 'payment.Header',
                //reference: 'August.model.sales.Order',
                id: parseInt(id,10)
            });          
                                                
        }
        else {
            if(vm.get('thePayment') != null){
                vm.set('thePayment', null);
            }

            vm.linkTo('thePayment', {
                type: 'payment.Header',
                create: {
                    paymentDate: new Date(),                    
                    paymentCode: 'CREDIT CARD',
                    transtype: 'Payment',
                    qb_pmt_batch_date: new Date(),
                    userName: August.loggedInUser.userId,
                    userTime: new Date(),
                    createuser: August.loggedInUser.userId,
                    createusertime: new Date()
                }
            });
        }
        
        //var customers = vm.getStore('customers');
        //var stores = vm.getStore('stores');        

        binding = vm.bind('{thePayment}', function(rec){                              
            
            if(id > 0){
                vm.getStore('Paymentdetails').setData(rec.details().getRange());                
                //console.log('binding', vm.getStore('Paymentdetails'));

                var customer = rec.get('customer'),
                    creditStore = vm.getStore('credits');

                Ext.apply(creditStore.getProxy().extraParams, {
                    customer: customer != null ? customer.trim() : ''                    
                });
                            
                creditStore.load({
                    callback: function(recs, op, success){
                        var total = 0;
                        Ext.Array.each(recs, function(r){
                            
                            total += r.get('balance');
                        });
    
                        rec.set('available_credit', -1 * total);
                    }
                });
            }            
            
            vm.getView().setLoading(false);
            binding.destroy();
        });

        if(binding){
            vm.getView().setLoading(false);
        }
    },

    processPIs: function(vm, node, op, id){
        var session = vm.getSession();
                
        var cRec = vm.get('thePhysical');
        if(!Ext.isEmpty(session.data['inventory.PIH']) && !session.data['inventory.PIH'].hasOwnProperty(id)){            
            session.data['inventory.PIH'] = null;
            session.data['inventory.PI'] = null;            
        }

        August.model.inventory.PIH.getProxy().setHeaders({
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        }); 

        var binding = null;
        if(id){            

            vm.linkTo('thePhysical', {
                type: 'inventory.PIH',
                //reference: 'August.model.Powh',
                id: parseInt(id,10)
            });
            
            //var piStore = vm.linkData.thePhysical;            
        }
        else {
            if(vm.get('thePhysical') != null){
                vm.set('thePhysical', null);
            }

            vm.linkTo('thePhysical', {
                type: 'inventory.PIH',
                create: {
                    pidate: new Date().toDateString(),
                    status: 'Closed',
                    warehouse: 'WH',
                    createUser: August.loggedInUser.userId
                }
            });
        }

        binding = vm.bind('{thePhysical}', function(rec){

            vm.getView().setLoading(false);
            binding.destroy();
        });

        if(binding){
            vm.getView().setLoading(false);
        }
    },

    processTransfers: function(vm, node, op, id){
        var view = vm.getView(),
            grid = view.lookupReference('transfer-grid'),
            session = vm.getSession();
                
        //var cRec = vm.get('theTransfer');
        if(!Ext.isEmpty(session.data['inventory.TransferH']) && !session.data['inventory.TransferH'].hasOwnProperty(id)){            
            session.data['inventory.TransferH'] = null;
            session.data['inventory.TransferD'] = null;            
        }

        August.model.inventory.TransferH.getProxy().setHeaders({
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        }); 

        var binding = null;
        if(id){
            

            vm.linkTo('theTransfer', {
                type: 'inventory.TransferH',
                //reference: 'August.model.Powh',
                id: parseInt(id,10)
            });
            
            //var piStore = vm.linkData.thePhysical;            
        }
        else {
            if(vm.get('theTransfer') != null){
                vm.set('theTransfer', null);
            }

            vm.linkTo('theTransfer', {
                type: 'inventory.TransferH',
                create: {
                    transferdate: Ext.Date.format(new Date(), 'Y-m-d'),
                    status: 'Hold',
                    //warehouse: 'WH',
                    createUser: August.loggedInUser.userId,
                    createTime: new Date(),
                    confirmdate: new Date(),
                    receivedate: new Date()
                }
            });
        }

        binding = vm.bind('{theTransfer}', function(rec){
            //console.log('binding', rec.transferdetails());                          
            //var override = grid.getPlugin('rowExpander');
            //override.expandAll(); 

            var grid = vm.getView().lookupReference('transfer-grid');
            if(grid){
                var columns = grid.getColumns();
                Ext.each(columns, function(col, idx){                        
                
                    if(idx > 5 && idx < 17) {
                        index = idx - 5;  
                        col.setText('');             
                    }                        
                });
            }

            vm.getView().setLoading(false);
            binding.destroy();
        });

        if(binding){
            vm.getView().setLoading(false);
        }
    },

    processPickTickets: function(vm, node, op, id){
        var session = vm.getSession();                

        var cRec = vm.get('thePickTicket');
        if(!Ext.isEmpty(session.data['pick.Header']) && !session.data['pick.Header'].hasOwnProperty(id)){
            //console.log(session.data)
            session.data['pick.Header'] = null;
            session.data['pick.Detail'] = null;            
        }

        var binding = null;
        
        August.model.sales.Order.getProxy().setHeaders({
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        });

        if(id){            

            vm.linkTo('thePickTicket', {
                type: 'pick.Header',
                //reference: 'August.model.sales.Order',
                id: parseInt(id,10)
            });                                    
        }
        else {
            if(vm.get('thePickTicket') != null){
                vm.set('thePickTicket', null);
            }

            vm.linkTo('thePickTicket', {
                type: 'pick.Header',
                create: {
                    startDate: new Date().toDateString(),
                    status: 'Open',
                    //warehouse: '00',
                    userName: August.loggedInUser.userId
                }
            });
        }

        //var customers = vm.getStore('customers');
        //var stores = vm.getStore('stores');

        binding = vm.bind('{thePickTicket}', function(rec){
            
            var grid = vm.getView().lookupReference('pick-grid'),
                store = rec.PickDs();

            if(grid){
                var columns = grid.getColumns();
                Ext.each(columns, function(col, idx){                        
                
                    if(idx > 4 && idx < 16) {
                        //index = idx - 4;  
                        //col.setText('');             
                    }                        
                });
            }
            
            store.on({
                load: function(s){
                    
                    var override = grid.getPlugin('pickRowExpander'); 
                    override.expandAll();
                    
                    grid.getScrollable().scrollTo(0, 0);
                }
            });

            vm.getView().setLoading(false);
            binding.destroy();
        });

        if(binding){
            vm.getView().setLoading(false);
        }
    },

    inventoryReceiving: function(view, node, id){

        var vc = view.getController(),
            form = vc.lookupReference('poheader').getForm(),
            store = vc.getViewModel().getStore('podetails'),
            grid = vc.lookupReference('orders-list'),
            selection = grid.getSelectionModel(),
            field = vc.lookupReference('search');

        if(id){
            field.setValue(id);

            var proxy = store.getProxy();
            proxy.encodeFilters = function(filters){
                return filters[0].getValue();
            };

            if (selection.selected) {
                selection.deselectAll(false);
            }

            if(store.loadCount == 0){

                August.model.Poh.load(id, {
                    callback: function(poh){
                        form.loadRecord(poh);
                        //console.log(poh);
                        //console.log('POH #' + poh.get('pono'), poh);

                        poh.podetails(function(podetails){
                            grid.bindStore(podetails);
                            /*pods.each(function(pod){
                             console.log('POD #' + pod.get('id'), pod);
                             });*/
                        });
                    }
                });
            }
        }
        else {
            field.setValue('');

            form.reset();

            if(selection.selected){
                selection.deselectAll();
            }

            grid.getStore().removeAll();
        }
    },

    inventoryAllocation: function(view, node, id){
        var vc = view.getController(),
            store = vc.getViewModel().getStore('fabricrequirements'),
            grid = vc.lookupReference('requirements'),
            selection = grid.getSelectionModel(),
            field = vc.lookupReference('search');

        if(id){
            field.setValue(id);

            var proxy = store.getProxy();
            proxy.encodeFilters = function(filters){
                return filters[0].getValue();
            };

            if (selection.selected) {
                selection.deselectAll(false);
            }

            store.filter('cutno', id);
        }
        else {
            field.setValue('');

            if(selection.selected){
                selection.deselectAll();
            }

            grid.getStore().removeAll();
        }
    },

    inventoryRolls: function(view, node, id){
        var vc = view.getController(),
            store = vc.getViewModel().getStore('rolls'),
            grid = vc.lookupReference('rolls-grid'),
            selection = grid.getSelectionModel(),
            field = vc.lookupReference('search');


    },

    navigateReports: function(view, node, sub){
        
        var vm = view.getViewModel(),
            //vc = view.getController(),
            store = vm.get('areas'),
            item = view.lookupReference(node + '-' + sub),
            center = view.lookupReference('centerBase'),
            navi = view.lookupReference('navigateMenu');

        //console.log('navigateReports', view, node, sub);

        if(navi.getStore() == null){
            navi.setStore(store);
        }

        var nd = store.findNode('routeId', sub);
        //Breadcrumb setSelection only accept Node not Record...
        navi.setSelection(nd);

        if (!item) {
            item = Ext.widget(sub, {
                reference: node+ '-' + sub
            });
        }

        center.getLayout().setActiveItem(item);
        //console.log('navigateSetting', view, node, id);
    },

    navigateSettings: function(view, node, sub){
        //console.log('navigateSettings', view, node, sub);
        var vm = view.getViewModel(),
            //vc = view.getController(),
            store = vm.get('areas'),
            item = view.lookupReference(node+'-'+sub),
            center = view.lookupReference('centerBase'),
            navi = view.lookupReference('navigateMenu');

        if(navi.getStore() == null){
            navi.setStore(store);
        }

        var nd = store.findNode('routeId', sub);
        //Breadcrumb setSelection only accept Node not Record...
        navi.setSelection(nd);

        if (!item) {
            item = Ext.widget(sub, {
                reference: node+ '-' + sub
            });
        }

        center.getLayout().setActiveItem(item);
        //console.log('navigateSetting', view, node, id);
    }
});
