
Ext.define('August.view.production.TopBar',{
    extend: 'August.view.TopBar',

    alias: 'widget.production-topbar',

    requires: [
        'August.view.production.TopBarController',
        'August.view.production.TopBarModel'
    ],

    controller: 'production-topbar',
    viewModel: {
        //type: 'production-topbar'
    },

    listeners: {
        //clearall: 'onClearFilters'
    },

    initComponent: function(c){
        var me = this;

        me.items = this.buildItems();

        me.callParent(arguments);

        me.actClear.setHidden(false);
        me.actNew.setHidden(false);

        me.actEdit.setHidden(false);
        me.actEdit.setDisabled(true);

        me.insert(0,
            [{
                xtype: "combo",
                width: 112,                
                hideLabel: true,
                valueField: "field",
                displayField: "label",
                value: "style",
                editable: false,
                reference: "filterSelection",
                bind: {
                    store: "{categories}"
                },
                queryMode: 'local',
                listeners: {
                    change: {
                        fn: "onFilterItemChange",
                        scope: 'controller'
                    }
                }
            },
            {
                xtype: "searchcombo",
                reference: 'searchcombo',
                width: 300,
                hidden: true,
                searchAt: 'grid'
            },
            {
                xtype: "searchgrid",
                reference: 'searchgrid',
                width: 300,
                hidden: true,     
                grid: "grid",
                paramName: "style"
            },            
            {
                xtype: "searchtextlist",
                reference: 'searchtextlist',
                width: 300,              
                bind: {
                    store: '{products}'
                },  
                
                paramName: "style"
            }
            /*
            {
                xtype: 'textfield',
                name: 'searchtextlist',
                reference: 'searchtextlist',
                width: 300,
                hidden: false,
                enableKeyEvents: true,
                triggers: {
                    clear: {
                        weight: 0,
                        cls: Ext.baseCSSPrefix + 'form-clear-trigger',
                        tooltip: 'Clear',
                        hidden: true,
                        handler: function(c, a){                     
                            // c - searchtextlist
                            // a - trigger           
                            c.fireEvent('triggerclear', this);
                        }
                    },
                    search: {
                        weight: 1,
                        cls: Ext.baseCSSPrefix + 'form-search-trigger',
                        tooltip: 'Search',
                        handler: function(c){
                            c.fireEvent('triggersearch', this);
                        }
                    }
                },
                listeners: {
                    triggerclear: {
                        fn: 'onClearClick',
                        scope: this.controller
                    },
                    triggersearch: {
                        fn: 'onSearchClick',
                        scope: this.controller
                    },
                    specialkey: {
                        fn: 'onSpecialKey',
                        scope: this.controller
                    }                    
                }
            }
            */
        ]
        );
    }
});
