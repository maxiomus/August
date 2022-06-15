/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('August.view.main.Main', {
    extend: 'Ext.container.Container',

    xtype: 'app-main',

    requires: [
        'Ext.container.Viewport',
        //'Ext.window.MessageBox',
        'August.view.main.MainController',
        'August.view.main.MainModel'
    ],

    controller: 'main',
    viewModel: 'main',
    
    cls: 'august-viewport',
    
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        render: 'onMainViewRender'
    },

    items: [
        {
            xtype: "toolbar",
            //region: "north",
            cls: "august-headerbar toolbar-btn-shadow",
            height: 64,
            itemId: "headerBar",

            items:[{
                xtype: "component",
                reference: "augustLogo",
                cls: "august-logo",
                //html: '<div class="main-logo"><img src="resources/images/August-logo.png" height="26px">August</div>',
                html: '<div class="main-logo"><i class="fab fa-buysellads"></i>ugust 2.7</div>',                
                width: 64
            },{
                margin: "0 0 0 8",
                cls: "delete-focus-bg",
                iconCls: "x-fa fa-bars",
                id: "main-navigation-btn",
                handler: "onToggleNavigationSize"
            },{
                xtype: "tbspacer",
                flex: 1
            },
            /*            
            {
                xtype: "image",
                cls: "header-right-profile-image",
                height: 35,
                width: 35,
                alt: "current user image",
                src: "resources/images/icon_user.png"
            },
            */
            {
                xtype: "tbtext",
                bind: '{currentUser.name}',
                cls: "top-user-name"
            },{
                xtype: "button",
                id: "logout",
                text: "Logout",
                //ui: 'bootstrap-default-btn',
                reference: "logout",
                cls: "delete-focus-bg",
                iconCls: "x-fas fa-sign-out-alt",
                listeners:{
                    click: "onLogout"
                }
            }]
        },
        {
            xtype: "maincontainerwrap",
            reference: "mainContainerWrap",            
            flex:1,
            items:[{
                xtype: "treelist",
                region: 'west',
                reference: "navigationTreeList",
                itemId: "navigationTreeList",
                ui: "navigation",
                store: "NavigationTree",
                width: 64,
                expandedWidth: 280, // When Micro mode first, set width
                micro: true,
                highlightPath: true,
                expanderFirst: false,
                expanderOnly: false,
                singleExpand: true,
                listeners:{
                    selectionchange: "onNavigationTreeSelectionChange"
                }
            },{
                xtype: "container",
                region: "center",
                flex:1,
                reference: "mainCardPanel",
                itemId: "contentPanel",
                //deferredRender: true,
                layout:{
                    type: "card",
                    anchor: "100%"
                }
            }]
        }
    ],

    initComponent: function() {
        var me = this;

        me.callParent(arguments);
    }
});
