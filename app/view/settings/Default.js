
Ext.define("August.view.settings.Default",{
    extend: "Ext.panel.Panel",

    requires: [
        "August.view.settings.DefaultController",
        "August.view.settings.DefaultModel",
        //'August.view.settings.notification.Default',
        'August.view.settings.company.Default',
        //'August.view.settings.view.Default',
        'August.view.settings.product.Default',
        //'August.view.settings.task.Default',
        'August.view.settings.vendors.Default'
    ],

    alias: 'widget.settings-default',

    config: {
        activeState: null,
        defaultActiveState: "default"
    },

    controller: "settings-default",
    viewModel: {
        type: "settings-default"
    },

    cls: "shadow-panel",
    header: false,
    margin: '0 0 0 4',

    //bodyPadding: 10,

    layout: {
        type: 'border'
    },

    initComponent: function(){
        var me = this;

        /*
        me.tbar = [{
            xtype: 'breadcrumb',
            reference: 'navigateMenu',
            overflowHandler: 'scroller',
            bind: {
                store: '{areas}'
            },
            showIcons: true,
            showMenuIcons: true,
            listeners: {
                change: 'onBreadCrumbChange'
            }
        }],
        */

        Ext.applyIf(me, {

            items: [{
                region: 'west',
                title: 'Navigate',
                width: 220,
                split: true,
                collapsible: true,   // make collapsible
                floatable: false,
                reference: 'navigateTree',
                xtype: 'treepanel',
                bind: {
                    store: '{areas}',
                    selection: '{navigateMenu.selection}'
                }
            },
            {
                region: 'center',
                layout: 'card',
                reference: 'centerBase',
                tbar: [{
                    xtype: 'breadcrumb',
                    reference: 'navigateMenu',
                    showIcons: true,
                    //showMenuIcons: true,
                    bind: {
                        store: '{areas}',
                        selection: '{navigateTree.selection}'
                    },
                    //buttonUI: "default-toolbar", //BUG # EXTJS-15615 - WORKAROUND @ https://www.sencha.com/forum/showthread.php?294072
                    listeners: {
                        change: 'onBreadCrumbChange'
                    }
                }],

                items: [{
                    xtype: 'container',
                    reference: 'settings-base'
                }]
            }]
        });

        me.callParent(arguments);
    }
});
