
Ext.define("August.view.reports.Default",{
    extend: "Ext.panel.Panel",

    requires: [
        "August.view.reports.DefaultController",
        "August.view.reports.DefaultModel",
        'August.view.reports.inventory.Default',
        'August.view.reports.invoice.Default'
        //'August.view.reports.vendors.Default'
    ],

    alias: 'widget.reports-default',

    config: {
        activeState: null,
        defaultActiveState: "default"
    },

    controller: "reports-default",
    viewModel: {
        type: "reports-default"
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
                    reference: 'reports-base'
                }]
            }]
        });

        me.callParent(arguments);
    }
});
