/**
 * Created by tech on 3/9/2016.
 */
Ext.define("August.view.production.style.Grid", {
    extend: 'Ext.grid.Panel',

    requires: [
        'August.view.production.style.GridController',
        'August.view.production.style.GridModel',
        'August.plugin.grid.Exporter',
        //'Ext.grid.plugin.Exporter',
        'Ext.grid.filters.Filters'
    ],

    alias: "widget.style-grid",

    controller: "style-grid",
    viewModel: {
        type: "style-grid"
    },

    style: {
        //borderTop: '1px solid #cfcfcf',
        //borderBottom: '1px solid #cfcfcf'
    },

    selModel: {
        //type: 'checkboxmodel',              
        pruneRemoved: false
    },

    viewConfig: {
        //loadingHeight: 100,
        //stripeRows: true,
        trackOver: true,
        //enableTextSelection: false,

        preserveScrollOnRefresh: true,
        preserveScrollOnReload: true,
        deferInitialRefresh: true,
        deferEmptyText: true,
        emptyText: '<h1 style="margin: 20px">No matching results</h1>',
        getRowClass: function(a, g, f, h){
            //return "custom-row-style";
        },

        listeners: {
            render: function(view){
                //var view = grid.getView();
                view.tip = Ext.create('Ext.tip.ToolTip', {
                    // The overall target element.
                    target: view.el,
                    // Each grid row causes its own separate show and hide.
                    //delegate: view.itemSelector,
                    delegate: view.cellSelector,
                    // Moving within the row should not hide the tip.
                    trackMouse: true,
                    // Render immediately so that tip.body can be referenced prior to the first show.
                    renderTo: Ext.getBody(),
                    listeners: {
                        // Change content dynamically depending on which element triggered the show.
                        beforeshow: function updateTipBody(tip) {
                            var trigger = tip.triggerElement,
                                parent = tip.triggerElement.parentElement,
                                columnTitle = view.getHeaderByCell(trigger).text,
                                columnDataIndex = view.getHeaderByCell(trigger).dataIndex,
                                columnText = view.getRecord(parent).get(columnDataIndex);

                            if(!Ext.isEmpty(columnText)){
                                var xf = Ext.util.Format;

                                
                                //tip.update(view.getRecord(tip.triggerElement).get('BODYIMG'));
                                tip.update(columnText);
                            }
                            else {
                                return false;
                            }

                        }
                    }
                });
            }
        }
    },

    plugins: [{
        ptype: "gridfilters"
    },{
        ptype: 'grid-exporter'
    }],

    listeners: {
        //select: "onSelect"
    },

    initComponent: function(){
        var me = this;

        Ext.applyIf(me, {
            columns: []
        });

        this.callParent(arguments);
    }
});
