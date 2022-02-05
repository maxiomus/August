/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('August.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',    

    initViewModel: function(b) {

    },

    onLogout: function(e,g,f){
        var me = this;
        
        localStorage.clear();

        August.app.destroy();
        window.location.reload(true);
        /*
        Ext.Ajax.request({
            //url: "/security/logout.ashx",
            url: '/api/Sessions/logout',
            method: "GET",
            scope: me,
            success: me.onLogoutSuccess,
            failure: me.onLogoutFailure
        });
        */
    },

    onLogoutSuccess: function(h,f,j){
        var me = this,
            result = Ext.decode(h.responseText);

        console.log("onLogoutSuccess", me, h, f);

        if(result.success){
            me.getView().destroy();
            window.location.reload(true);
        }
        else{
            August.util.Utilities.showErrorMsg(result.msg);
        }
    },

    onLogoutFailure: function(g,e,h){
        var result = Ext.decode(g.responseText);

        August.util.Utilities.showErrorMsg(result.msg);
    },

    onNavigationTreeSelectionChange: function(o,z){
        if(z && z.get("view")){
            var me = this,
                refs = me.getReferences(),
                mainCard = refs.mainCardPanel,
                view = mainCard.child("component[routeId="+z.get("routeId")+"]"),
                route = [];
            route[0] = z.get("routeId");

            if(view && view.lookupReference("multiview")){
                //console.log(view, view.getActiveTab(), view.lookupReference("multiview"))
                var tab = view.getActiveTab() || view.lookupReference("multiview"),
                    grid = tab.lookupReference("grid");
                    //store = view.getViewModel().getStore(view.routeId+"s"),
                    //field = store.first().getIdProperty();

                if(grid){
                    var mode,
                        
                        ctn = tab.lookupReference("center")
                        active = ctn.getLayout().getActiveItem();
                        index = ctn.items.indexOf(active);
                        
                        //v = tab.lookupReference("center").getLayout().getActiveIndex();

                    switch(index){
                        case 0:
                            mode = "default";
                            break;
                        case 1:
                            mode = "medium";
                            break;
                        case 2:
                            mode = "tiles";
                            break;
                    }

                    route[1] = mode;

                    if(grid.getSelectionModel().getSelection().length > 0){
                        var x = grid.getSelectionModel().getSelection();
                        route[2] = x[0].id;
                        //route[2] = x[0].get(field);
                    }
                }

                if(tab.isEdit){
                    route[1] = tab.opMode;

                    var vm = tab.getViewModel();
                    if(tab.isXType("style-edit-form")){
                        if(vm.get('theProduct').id > 0) {
                            route[2] = vm.get('theProduct').id;
                        }
                    }

                    if(tab.isXType("purchase-orderForm")){
                        if(vm.get('thePO') != null){
                            route[2] = vm.get('thePO').id;
                        }
                    }

                    if(tab.isXType("sales-orderForm")){
                        if(vm.get('theOrder') != null){
                            route[2] = vm.get('theOrder').id;
                        }
                    }
                    /*
                    if(tab.isXType("sales-edit-form")){
                        if(vm.get('srcPowhId') != null){
                            route[2] = vm.get('srcPowhId');
                        }
                    }
                    */

                    if(tab.isXType("pi-form")){
                        if(vm.get('thePhysical').id > 0) {
                            route[2] = vm.get('thePhysical').id;
                        }
                    }
                }
                else if(tab.inTab){
                    route[1] = "tab";
                    if(tab.active){
                        route[2] = tab.active.id;
                        //route[2] = tab.active.get(field);
                    }
                    else {
                        route[2] = tab.reference;
                    }
                }
            }
            //console.log('MainController', route.join('/'))
            this.redirectTo(route.join("/"));
        }
    },

    onToggleNavigationSize:function(b){
        var me = this,
            refs = me.getReferences(),
            nav = refs.navigationTreeList,
            wrap = refs.mainContainerWrap,
            collapsing = !nav.getMicro(),
            newWidth = collapsing ? 64 : 280;

        if(Ext.isIE9m||!Ext.os.is.Desktop){
            Ext.suspendLayouts();
            refs.augustLogo.setWidth(newWidth);
            nav.setWidth(newWidth);
            nav.setMicro(collapsing);
            Ext.resumeLayouts();
            main.layout.animatePolicy = main.layout.animate = null;
            main.updateLayout();
        }
        else{
            if(!collapsing){
                nav.setMicro(false);
            }

            // Start this layout first since it does not require a layout
            refs.augustLogo.animate({
                dynamic: true,
                to: {
                    width: newWidth
                }
            });

            // Directly adjust the width config and then run the main wrap container layout
            // as the root layout (it and its chidren). This will cause the adjusted size to
            // be flushed to the element and animate to that new size.
            nav.width = newWidth;
            wrap.updateLayout({isRoot:true});
            nav.el.addCls('nav-tree-animating');

            if(collapsing){
                nav.on({
                    afterlayoutanimation:function(){
                        nav.setMicro(true);
                        nav.el.removeCls('nav-tree-animating');
                    },
                    single:true
                });
            }
        }
    },

    onMainViewRender:function(){
        if(!window.location.hash){
            this.redirectTo("dashboard");
        }
    }
});
