
Ext.define('August.view.dashboard.Default',{
    extend: 'Ext.container.Container',

    alias: 'widget.dashboard-default',

    requires: [
        'August.view.dashboard.DefaultController',
        'August.view.dashboard.DefaultModel'    
    ],

    controller: 'dashboard-default',
    viewModel: {
        type: 'dashboard-default'
    },

    config: {
        activeState: null,
        defaultActiveState: 'default'
    },

    cls: 'shadow-panel',

    //margin: '0 0 0 4',
    //layout: 'responsivecolumn',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        //hide: 'onHideView'
        /**    
         * @param mv - monthview
         * @param ctx - context: event
         */
        beforeeventedit: 'onBeforeEventEdit',
        eventtap: 'onEventTap',
        select: 'onSelect'
    },

    initComponent: function(){
        var me = this;      

        Ext.applyIf(me, {
            items: [{
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'middle'
                },
                //height: 120,
                cls: 'default-top',

                defaultType: 'component',
                //responsiveCls: 'big-100 small-100',
                items: [{
                    xtype: 'component',
                    cls: 'user-info',
                    flex: 1,
                    //height: 60,
                    //width: 300,
                    tpl: 'Good {greeting} <span class="blue-box">{name}</span>',
                    bind: {
                        data: {
                            greeting: '{greeting}',
                            name: '{currentUser.name}'
                        }
                    }
                },{
                    width: 150,
                    cls: 'time-info',

                    tpl: [
                        '{today:date("l, F j, Y")}',
                        '<div style="background-color: #724289; color: #ffffff;"><i class="x-fa fa-clock-o white-txt"></i> {today:date("g:i a")}</div>'
                    ],

                    bind: {
                        data: {
                            today: '{today}'
                        }
                    },
                    listeners: {
                        render: 'onClockRender'
                    }
                },{
                    //width: 150,
                    cls: 'city-climate',

                    tpl: [
                        '<div class="thumb-wrap">',
                            '<div class="location">{name}, {sys.country}</div>',
                            '<tpl for="weather">',
                                '<tpl if="xindex === 1">',
                                '<div class="thumb">',
                                    '<img src="https://openweathermap.org/img/w/{icon}.png" alt="{description}">',
                                '</div>',
                                '</tpl>',
                            '</tpl>',
                            '<h2 style="width: 90px;">{main.temp:round} &#8457</h2>',
                            '<tpl for="weather">',
                                '<tpl if="xindex === 0">',
                                    '<div class="description">{description}</div>',
                                '</tpl>',
                            '</tpl>',
                        '</div>'
                    ],
                    bind: '{cityWeather}'
                }]
            },{
                xtype: 'dashboard',

                dockedItems: [{
                    xtype: 'toolbar',

                    items: [{
                        xtype: 'button',
                        iconCls: 'x-fa fa-cog',
                        text: 'Configure',
                        menu: [{
                            iconCls: 'x-fa fa-th',
                            text: 'Reset',
                            handler: 'onResetDashboardClick'
                        },{
                            text: "Add ",
                            iconCls: 'x-fa fa-plus',
                            menu: {
                                items:[{
                                    text: 'What\'s New',
                                    iconCls: 'x-fa fa-file',
                                    listeners: {
                                        click: {
                                            fn: 'onAddPartsClick',
                                            args: ['pows']
                                        }
                                    }
                                },{
                                    text: 'Weather',
                                    iconCls: 'x-fa fa-cloud',
                                    listeners: {
                                        click: {
                                            fn: 'onAddPartsClick',
                                            args: ['weather']
                                        }
                                    }
                                }]
                            }
                        }]
                    }]
                }],

                reference: 'dashboard',
                flex: 1,
                scrollable: 'y',

                columnWidths: [ 0.50, 0.50 ],

                stateful: true,
                stateId: 'dashboard-dashboard',

                parts: { 
                    news: {
                        viewTemplate: {
                            title: "What's New",
                            layout: 'fit',
                            collapsible: false,
                            tools: [{
                                type: 'refresh',
                                callback: function(panel, tool, event){
                                    panel.down('dashboard-news').getStore().load();
                                }
                            }],
                            items: [{
                                xtype: 'dashboard-news'
                            }]
                        }
                    },                   
                    weather: {
                        viewTemplate: {
                            title: 'Weather in your cities',
                            layout: 'fit',
                            collapsible: false,
                            tools: [{
                                type: 'plus',
                                callback: function(panel, tool, event){
                                    var dashboard = panel.up('dashboard'),
                                        dataview = panel.down('dashboard-weather');
                                    dataview.fireEvent('tooladdclick', dataview, tool);
                                }
                            },{
                                type: 'refresh',
                                itemId: 'weatherToolRefresh',
                                callback: function(panel, tool, event){
                                    panel.down('dashboard-weather').getStore().load();
                                }
                            }],
                            items: [{
                                xtype: 'dashboard-weather'
                            }]
                        }
                    }
                },

                defaultContent: [{
                    type: 'news',
                    columnIndex: 0,
                    height: 364
                },{
                    type: 'weather',                    
                    columnIndex: 1,
                    height: 364
                }]      
            }]      
        });

        me.callParent(arguments);

        /*
        var refs = this.lookupReference('calendar').getReferences(),
            monthView = refs.view.activeView;
        
        this.relayEvents(monthView, ["beforeeventedit", "eventtap", "select"]);
        //console.log(monthView, monthView.getEditForm(), monthView.getView());
        */
    }
});
