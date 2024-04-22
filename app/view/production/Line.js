
Ext.define('August.view.production.Line',{
    extend: 'August.view.Viewer',

    requires: [
        'August.view.production.LineController',
        'August.view.production.LineModel',
        'Ext.ux.form.field.SearchTextList',
        'August.plugin.grid.Exporter',        
        'Ext.grid.filters.Filters',
        'Ext.toolbar.Paging',
        'Ext.ux.SlidingPager'
    ],

    alias: "widget.line",

    controller: 'line',
    viewModel: {
        type: 'line'
    },

    cls: "sample-line shadow-panel",

    header: false,
    margin: '0 0 0 4',

    //session: true,

    listeners: {
        actedit: 'onActEditClick',
        actrefresh: 'onActRefreshClick',
        clearall: 'onClearFilters',
        griditemcontextmenu: 'onItemContextMenu'
    },

    initComponent: function(){
        var me = this,
            vm = me.getViewModel();

        //console.log('Line', vm);
        //me.dockedItems = me.buildDockedItems();

        Ext.applyIf(me, {
            items: [{
                xtype: "multiview",
                reference: "multiview",
                title: " Line Styles",
                iconCls: "x-fa fa-tshirt",
                tbar: {
                    xtype: "topbar",
                    reference: "topbar"
                },

                mainItems: [{

                },{
                    xtype: 'container',
                    layout: 'border',
                    items: [{
                        xtype: "grid",
                        reference: "tiles",
                        //cls: '',
                        region: 'center',
                        collapsible: false,
                        flex: 1,

                        style: {
                            borderTop: '1px solid #cfcfcf',
                            borderBottom: '1px solid #cfcfcf'
                        },

                        viewConfig: {                            
                            stripeRows: true,
                            trackOver: true,                            
                    
                            preserveScrollOnRefresh: true,
                            //preserveScrollOnReload: true,
                            //deferInitialRefresh: true,
                            deferEmptyText: true,
                        },

                        selModel: {
                            type: 'checkboxmodel',    
                            //checkOnly: true,                                                                  
                            pruneRemoved: false
                        },
                        
                        //publishes: ["selectedSamples"],
                        bind: {
                            store: "{lines}"
                        },

                        columns: [{
                            header: "ID",
                            dataIndex: "id",
                            width: 140,
                            //locked: false,
                            hidden: true,
                            filter: {                    
                                type: "number"
                            },
                            renderer: function(f, e, a){
                                return f;
                            }
                        },
                        /*
                        {
                            xtype: 'widgetcolumn',
                            text: 'Style',
                            //dataIndex: "style",
                            width: 140,
                            //locked: false,
                            filter: {
                                operator: 'st',
                                type: "string"
                            },
                            widget: {
                                xtype: 'image',
                                width: '48',
                                height: '68',
                                bind: 'http://209.37.126.195:9090/StyleImages/200xImages/{record.style}_{record.color}_front.jpg'
                            }
                        },
                        */
                        {                            
                            text: "Style",
                            dataIndex: "style",
                            width: 180,
                            //locked: false,
                            groupable: false,
                            filter: {
                                operator: 'st',
                                type: "string"
                            },
                            renderer: function(value, meta, rec){                                                                                                        

                                var tpl = 
                                        //'<div class="material-body-class" style="float: left;">' +
                                        '<div class="material-body-class">' +
                                        '<div>{0}</div>' +                                                                                                                                 
                                            '<div class="thumb-wrap">' + 
                                                '<div class="thumb">' + 
                                                    '<img style="vertical-align:top;width:48px;height:68px;" src="https://endlessrose.net:9443/StyleImages/200xImages/{0}_{1}_{2}.jpg" ' +
                                                        'onerror="this.onerror=null;this.src=\'https://endlessrose.net:9443/StyleImages/{0}_{2}.jpg\';" ' + 
                                                        //'onload=\"console.log(this);\" ' +
                                                    '/>' + 
                                                '</div>' +                            
                                            '</div>' +
                                        '</div>';

                                return Ext.String.format(tpl, rec.data.style, encodeURIComponent(rec.data.color.replace('/', '-')), "front");
                            },
                            summaryType: 'count',
                            summaryRenderer: function(v, data, index){      
                                    
                                //return Ext.String.format("<font style='foint-weight:bold;color:blue;'>Total # of Style: </font>");                                
                            }
                        },                        
                        {
                            header: "Color",
                            dataIndex: "color",
                            width: 140,
                            filter: {
                                operator: 'st',
                                type: "string"
                            },
                            renderer: function(f, e, a){
                                return f;
                            },
                            summaryType: 'count',
                            summaryRenderer: function(v, data, index){                
                                //return Ext.String.format("<font style='foint-weight:bold;color:blue;'>Total # of Style: </font>");
                                return Ext.String.format('Total: {0}', Ext.util.Format.number(v, '0,000'));
                            }
                        },
                        {
                            header: "Description",
                            dataIndex: "descript",
                            width: 260,
                            hidden: true,
                            filter: {
                                operator: 'st',
                                type: "string"
                            },
                            renderer: function(f, e, a){
                                return f;
                            }
                        },            
                        {
                            header: "Status",
                            dataIndex: "status",
                            width: 100,            
                            filter: {                                
                                type: 'list',
                                idField: 'value',
                                labelField: 'label',
                                store: vm.getStore('status')
                            },
                            renderer: function(f, e, a){
                                return f;
                            }
                        },                        
                        {
                            header: "Category",
                            dataIndex: "category",
                            width: 140,
                            hidden: false,
                            filter: {
                                type: 'list',
                                idField: 'value',
                                labelField: 'label',
                                store: vm.getStore('stylecategories')
                            },
                            renderer: function(f, e, a){
                                return f;
                            }
                        },
                        {
                            header: "Sub. Category",
                            dataIndex: "subcategory",
                            width: 120,
                            hidden: false,
                            filter: {
                                type: 'list',
                                idField: 'value',
                                labelField: 'label',
                                store: vm.getStore('subcategories')
                            },
                            renderer: function(f, e, a){
                                return f;
                            }
                        },   
                        {
                            header: "Season",
                            dataIndex: "season",                
                            hidden: false,
                            filter: {
                                type: 'list',
                                idField: 'value',
                                labelField: 'label',
                                store: vm.getStore('seasons')
                            },
                            renderer: function(f, e, a){
                                return f;
                            }
                        },
                        {
                            header: "Brand",
                            dataIndex: "division",
                            hidden: false,
                            filter: {
                                type: 'list',
                                idField: 'value',
                                labelField: 'label',
                                store: vm.getStore('divisions')
                            },
                            renderer: function(f, e, a){
                                return f;
                            }
                        },
                        {
                            header: "Sub. Division",
                            dataIndex: "subdivision",
                            width: 120,
                            hidden: false,
                            filter: {
                                type: 'list',
                                idField: 'value',
                                labelField: 'label',
                                store: vm.getStore('subdivisions')
                            },
                            renderer: function(f, e, a){
                                return f;
                            }
                        },  
                        {
                            header: "Size Cat.",
                            dataIndex: "sizeCat",
                            hidden: false,
                            filter: {
                                operator: 'st',
                                type: "string"
                            },
                            renderer: function(f, e, a){
                                return f;
                            }
                        },
                        {
                            header: "Bundle",
                            dataIndex: "bundle",
                            width: 100,
                            hidden: true,
                            filter: {
                                operator: 'st',
                                type: "string"
                            },
                            renderer: function(f, e, a){
                                return f;
                            }
                        },
                        {
                            header: "Designer",
                            dataIndex: "designer",
                            width: 100,            
                            filter: {
                                type: 'list',
                                idField: 'value',
                                labelField: 'label',
                                store: vm.getStore('designers')
                            },
                            renderer: function(f, e, a){
                                return f;
                            }
                        },                           
                        {
                            header: "ATS",
                            dataIndex: "ats",
                            locked: false,
                            hidden: false,
                            formatter: "number('0,000')",
                            filter: {
                                type: "number"
                            },
                            renderer: function(f, e, a){
                                return f;
                            },
                            summaryType: 'sum',
                            summaryRenderer: function(value, data, index){
                                return Ext.util.Format.number(value, '0,000');
                            }
                        },
                        {
                            header: "OTS",
                            dataIndex: "ots",
                            locked: false,
                            hidden: true,
                            formatter: "number('0,000')",
                            filter: {
                                type: "number"
                            },
                            renderer: function(f, e, a){
                                return f;
                            },
                            summaryType: 'sum',
                            summaryRenderer: function(value, data, index){
                                return Ext.util.Format.number(value, '0,000');
                            }
                        },
                        {
                            header: "On Hand",
                            dataIndex: "ohs",                
                            hidden: false,
                            formatter: "number('0,000')",
                            filter: {
                                type: 'number'
                            },
                            renderer: function(f, e, a){
                                return f;
                            },
                            summaryType: 'sum',
                            summaryRenderer: function(value, data, index){
                                return Ext.util.Format.number(value, '0,000');
                            }
                        },
                        {
                            header: "On Order",
                            dataIndex: "orders",
                            locked: false,
                            formatter: "number('0,000')",
                            filter: {
                                type: "number"
                            },
                            renderer: function(f, e, a){
                                return f;
                            },
                            summaryType: 'sum',
                            summaryRenderer: function(value, data, index){
                                return Ext.util.Format.number(value, '0,000');
                            }
                        },
                        {
                            header: "WIP",
                            dataIndex: "pos",
                            locked: false,
                            formatter: "number('0,000')",
                            filter: {
                                type: "number"
                            },
                            renderer: function(f, e, a){
                                return f;
                            },
                            summaryType: 'sum',
                            summaryRenderer: function(value, data, index){
                                return Ext.util.Format.number(value, '0,000');
                            }
                        },
                        {
                            xtype: 'datecolumn',
                            text: "Avail. Date",
                            dataIndex: "availableDate",
                            format: 'Y-m-d',
                            filter: {
                                type: "date",
                                dateFormat: 'C'
                            }
                            /*                         
                            renderer: function(k, i, a){                                
                                if(k!=undefined){
                                    var d=new Date(k),
                                    j = function(c){
                                        return c<10 ? "0"+c : c;
                                    };
                                    var l = j(d.getUTCMonth()+1)+"-"+j(d.getUTCDate())+"-"+d.getUTCFullYear();
                                    i.tdAttr='data-qtip="'+l+'"';
                                    return l;
                                }                                
                               return k;
                            }
                            */                           
                        },       
                        {
                            header: "Group",
                            dataIndex: "grp",
                            width: 120,
                            hidden: false,
                            filter: {
                                operator: 'st',
                                type: "string"
                            },
                            renderer: function(f, e, a){
                                return f;
                            }
                        },                         
                        {
                            header: "MSRP",
                            dataIndex: "sgtRetailPrice",
                            width: 80,
                            hidden: false,
                            renderer: function(v, meta, rec){
                                var xf = Ext.util.Format;
            
                                return v ? xf.usMoney(v) : '';
                            }
                        },                    
                        {
                            header: "Price 1",
                            dataIndex: "price1",
                            width: 80,
                            hidden: false,
                            renderer: function(v, meta, rec){
                                var xf = Ext.util.Format;
            
                                return v ? xf.usMoney(v) : '';
                            }
                        },
                        {
                            header: "Price 5",
                            dataIndex: "price5",
                            width: 80,
                            hidden: false,
                            renderer: function(v, meta, rec){
                                var xf = Ext.util.Format;
            
                                return v ? xf.usMoney(v) : '';
                            }
                        },            
                        {
                            header: "Cost",
                            dataIndex: "cost",
                            width: 80,
                            align: 'center',
                            hidden: false,
                            renderer: function(v, meta, rec){
                                var xf = Ext.util.Format;
            
                                return v ? xf.usMoney(v) : '';
                            }
                        },
                        /*
                        {
                            header: '<i style="text-align: center;" class="x-fa fa-paperclip fa-lg"></i>',
                            dataIndex: 'photos',
                            width: 50,
                            align: 'center',
                            renderer: function(value, metaData, rec, rowIndex, colIndex, store, view){
                                var strValue = value != 0 ? value : '',
                                    icon = '<i class="x-fa fa-check-circle-o fa-lg fa-fw green-txt"></i>';
                                //metaData.tdStyle = 'font-weight:bold;color:' + (rec.data.mp ? 'green' : 'transparent');
            
                                if(rec.data.name){
                                    strValue = '<span>'+(value != 0 ? value : '')+'</span>'+icon;
                                }
            
                                return strValue;
                            }
                        },
                        */            
                        {
                            header: "Created On",
                            dataIndex: "userTime",
                            filter: {type: "date"},
                            renderer: function(k, i, a){
                                if(k!=undefined){
                                    var d=new Date(k),
                                    j = function(c){
                                        return c<10 ? "0"+c : c;
                                    };
                                    var l = j(d.getUTCMonth()+1)+"-"+j(d.getUTCDate())+"-"+d.getUTCFullYear();
                                    i.tdAttr='data-qtip="'+l+'"';
                                    return l;
                                }
                            }
                        }],                        
                        /*
                        {
                            ftype: 'rowbody',
                            getAdditionalData: function (data, idx, record, orig) {
                                // Usually you would style the my-body-class in a CSS file                                
                
                                var xf = Ext.util.Format;
                                //var tpl = '<span class="file"><img style="vertical-align: middle;width:120px;height:180px;margin:0 2px 0 0;" src="http://209.37.126.195:9090/StyleImages/200xImages/{0}_{1}_{2}.jpg" alt="{0}_{1}" /></span>';
                                var tpl = '<div class="thumb-wrap">' + 
                                            '<div class="thumb">' + 
                                                '<img style="vertical-align:top;width:48px;height:64px;" src="http://209.37.126.195:9090/StyleImages/200xImages/{0}_{1}_{2}.jpg" ' +
                                                    'onerror=\"this.onerror=null;this.src=\'http://209.37.126.195:9090/StyleImages/default-broken.png\';" ' +
                                                '/>' + 
                                            '</div>' +                            
                                          '</div>';
                          
                                return {
                                    // When Mat Type column visible width: 144px
                                    
                                    rowBody: 
                                        '<div style="float: left;">' +                                            
                                            Ext.String.format(tpl, record.data.style, record.data.color.replace('/', '-'), "front") +
                                        '</div>',
                                        
                                        //'<div style="float: left; margin: 10px 6px 10px 0px;">' +
                                        //    Ext.String.format(tpl, encodeURIComponent(record.data.style), encodeURIComponent(record.data.color.replace('/', '-')), "back") +
                                        //'</div>' +                                                                                
                                        '<div style="float: left; margin: 10px;">' +
                                        //'<div style="clear: both;">' +
                                            '<table>' +
                                                '<tr>' +
                                                    '<td style="width: 100px;">Category</td>' +
                                                    '<td style="width: 100px;">' + 
                                                        (xf.ellipsis(record.get("category"),13) || '') + 
                                                    '</td>' + 
                                                '</tr>' +
                                                '<tr>' +
                                                    '<td style="width: 100px;">Brand</td>' +
                                                    '<td style="width: 100px;">' + 
                                                        (xf.ellipsis(record.get("division"),13) || '') + 
                                                    '</td>' + 
                                                '</tr>' +
                                                '<tr>' +
                                                    '<td style="width: 100px;">Code</td>' +
                                                    '<td style="width: 100px;">' + 
                                                        (xf.ellipsis(record.get("code"),13) || '') + 
                                                    '</td>' + 
                                                '</tr>' +
                                                '<tr>' +
                                                    '<td style="width: 100px;">Size</td>' +
                                                    '<td style="width: 100px;">' + 
                                                        (xf.ellipsis(record.get("sizeCat"),13) || '') + 
                                                    '</td>' + 
                                                '</tr>' +
                                                '<tr>' +
                                                    '<td style="width: 100px;">Prepack</td>' +
                                                    '<td style="width: 100px;">' + 
                                                        (xf.ellipsis(record.get("bundle"),13) || '') + 
                                                    '</td>' + 
                                                '</tr>' +
                                                '<tr>' +
                                                    '<td style="width: 100px;">Season</td>' +
                                                    '<td style="width: 100px;">' + 
                                                        (xf.ellipsis(record.get("season"),13) || '') + 
                                                    '</td>' + 
                                                '</tr>' +
                                                '<tr>' +
                                                    '<td style="width: 100px;">Fabric Type</td>' +
                                                    '<td style="width: 100px;">' + 
                                                        (xf.ellipsis(record.get("fabricType"),13) || '') + 
                                                    '</td>' + 
                                                '</tr>' +
                                                '<tr>' +
                                                    '<td style="width: 100px;">COO</td>' +
                                                    '<td style="width: 100px;">' + 
                                                        (xf.ellipsis(record.get("coo"),13) || '') + 
                                                    '</td>' + 
                                                '</tr>' +
                                            '</table>' +
                                        '</div>',
                                    
                                    rowBodyCls: "material-body-class"
                                };
                            }                            
                        },
                        */
                        features: [{
                            ftype: 'grouping',
                            groupHeaderTpl: '{columnName}: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
                            //enableGroupingMenu: true,
                            hideGroupedHeader: true,
                            showSummaryRow: false
                        },{
                            ftype: 'summary',
                            dock: 'bottom'
                        }],

                        plugins: [{
                            ptype: "gridfilters"
                        },{
                            ptype: 'grid-exporter'
                        }],

                        listeners: {
                            select: {
                                fn: 'onSelect',
                                scope: this.controller
                            }
                        }
                    },{
                        xtype: 'panel',
                        title: 'Line Sheets',
                        iconCls: 'x-fa fa-th',
                        plain: true,
                        region: 'west',
                        collapsible: true,
                        //collapseMode: 'mini',
                        split: {
                            size: 3
                        },
                        layout: 'fit',
                        width: 326,
                        style: {
                            //borderTop: '1px solid #cfcfcf',
                            //borderBottom: '1px solid #cfcfcf'
                        },
                        header: {
                            //overflowHandler: 'menu',
                            items: [{
                                xtype: 'button',
                                text: 'Markets',
                                ui: 'bootstrap-btn-default',
                                tooltip: 'Market Selection',
                                iconCls: 'x-fa fa-calendar-check-o',
                                menu: {
                                    xtype: 'menu',
                                    plain: true,
                                    items: {
                                        xtype: 'monthpicker',
                                        value: new Date(),
                                        okText: 'Select',
                                        cancelText: 'Clear',
                                        listeners: {
                                            okClick: 'onMonthPickOkClick',
                                            cancelClick: 'onMonthPickCancelClick',
                                            scope: this.controller
                                        }
                                    }
                                }
                            }]
                        },

                        items: [{
                            xtype: 'grid',
                            //title: 'Line Sheets',
                            //iconCls: 'x-fa fa-folder',
                            reference: 'list',
                            cls: 'line-grid',
                            //flex: 1,
                            //width: 300,
                            style: {
                                'borderTop': '1px solid #cfcfcf'
                            },

                            session: true,
                            rowLines: false,
                            //bufferedRenderer: true,
                            //leadingBufferZone: 28,
                            //trailingBufferZone: 28,
                            
                            dockedItems: [{
                                //weight: 101,
                                xtype: 'toolbar',
                                dock: 'top',
                                style: {
                                    'background-color': '#E4E5E7'
                                },
                                items: [{
                                    xtype: 'button',
                                    //ui: 'bootstrap-btn-default',
                                    tooltip: 'Market Selection',
                                    //iconCls: 'x-fa fa-calendar-check-o',
                                    bind: {
                                        text: '{selectedValue}'
                                    },
                                    menu: {
                                        xtype: 'menu',
                                        plain: true,
                                        items: {
                                            xtype: 'monthpicker',
                                            //reference: 'mnpkr',
                                            publishes: 'value',
                                            value: new Date(),
                                            showButtons: false,
                                            //okText: 'Select',
                                            //cancelText: 'Clear',
                                            listeners: {
                                                monthclick: function(p,v){

                                                    p.up('button').setText(Ext.Date.getShortMonthName(v[0])+', '+v[1]);
                                                    p.up('menu').hide();
                                                },
                                                yearclick: function(p,v){
                                                    p.up('button').setText(Ext.Date.getShortMonthName(v[0])+', '+v[1]);
                                                    p.up('menu').hide();
                                                }
                                                //okClick: 'onMonthPickOkClick',
                                                //cancelClick: 'onMonthPickCancelClick',
                                                //scope: this.controller
                                            }
                                        }
                                    }
                                },{
                                    xtype: 'textfield',
                                    name: 'title',
                                    width: 180,
                                    emptyText: 'Add a new line sheet',
                                    listeners: {
                                        specialkey: 'handleSpecialKey',
                                        scope: this.controller
                                    }
                                },{
                                    iconCls: 'x-fa fa-plus',
                                    handler: 'onAddLineSheetClick',
                                    scope: this.controller
                                },{
                                    iconCls: 'x-fa fa-refresh',
                                    handler: 'onRefreshLineSheet',
                                    hidden: true,
                                    scope: this.controller
                                }]
                            }/*,{
                                xtype: 'pagingtoolbar',
                                displayInfo: false,
                                plugins: {
                                    'ux-slidingpager': true
                                }
                            }*/],

                            bind: {
                                store: '{linesheets}'
                            },
                            /*
                            plugins: [{
                                ptype: 'bufferedrenderer'
                            }],
                                                        
                            features: [{
                                ftype: 'grouping',
                                startCollapsed: true,
                                groupHeaderTpl: [
                                    //'{columnName}: ',
                                    '{name:this.formatName} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
                                    {
                                        formatName: function(name){
                                            if(Ext.isEmpty(name)){
                                                return;
                                            }
                                            //return Ext.Date.getShortMonthName(parseInt(name.substring(4,6),10)-1) + ', ' + name.substring(0,4)
                                            return Ext.Date.format(new Date(name.slice(0,4) + '-' + name.slice(4,6) + '-1'), 'F, Y');
                                        }
                                    }
                                ]
                            }],
                            */
                            viewConfig: {
                                stripeRows: true,
                                trackOver: true,                            
                        
                                preserveScrollOnRefresh: true,
                                //preserveScrollOnReload: true,
                                //deferInitialRefresh: true,
                                deferEmptyText: true,
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

                            listeners: {
                                render: {
                                    fn: function(g){

                                        g.contextmenu = Ext.create("Ext.menu.Menu", {
                                            items: [{
                                                text: 'Open',
                                                iconCls: 'x-fa fa-plus-square blue-txt',
                                                tooltip: 'Open selected...',
                                                handler: 'onListOpenSheet',
                                                scope: this
                                            },{
                                                text: 'Refresh',
                                                iconCls: 'x-fa fa-refresh',
                                                handler: 'onListRefresh',
                                                scope: this
                                            },{
                                                text: 'Change',
                                                iconCls: 'x-fa fa-calendar',
                                                tooltip: 'Change to...',
                                                menu: {
                                                    xtype: 'menu',
                                                    plain: true,
                                                    items: {
                                                        xtype: 'monthpicker',
                                                        publishes: 'value',
                                                        value: new Date(),
                                                        showButtons: false,
                                                        listeners: {
                                                            monthclick: function(p,v){
                                                                //p.up('button').setText(Ext.Date.getShortMonthName(v[0])+', '+v[1]);
                                                                var rec = g.getSelection()[0];
                                                                rec.set('season', Ext.Date.format(new Date((v[0] + 1) + '/1/' + v[1]), 'Ym'));

                                                                g.getView().refresh();
                                                                g.contextmenu.hide();
                                                            },
                                                            yearclick: function(p,v){
                                                                //p.up('button').setText(Ext.Date.getShortMonthName(v[0])+', '+v[1]);
                                                                g.contextmenu.hide();
                                                            }
                                                        }
                                                    }
                                                }
                                            }]
                                        });
                                    },
                                    scope: this.controller
                                },
                                itemcontextmenu: 'onListItemContextMenu',
                                itemmouseenter: 'showActions',
                                itemmouseleave: 'hideActions',
                                scope: this.controller
                            },

                            columns: [{
                                text: 'ID',
                                name: 'lineseq',
                                dataIndex: 'lineseq',
                                width: 50,
                                //align: 'center',
                                menuDisabled: true,
                                sortable: false
                            },{
                                text: 'Title',
                                name: 'linetitle',
                                dataIndex: 'linetitle',
                                //width: 160,
                                flex: 1,
                                editor: {
                                    field: {
                                        xtype: 'textfield',
                                        allowBlank: false
                                    }
                                },
                                filter: {
                                    operator: 'st',
                                    type: "string"
                                },
                                renderer: function(value, metaData, rec, rowIndex, colIndex, store, view){
                                    //metaData.tdStyle = 'font-weight:bold;color:' + (value > 0 ? 'green' : 'transparent');
                                    var xf = Ext.util.Format;
                                    if(Ext.isEmpty(value)){
                                        return;
                                    }

                                    metaData.tdCls = 'line-icon';
                                    return value;
                                    //return '<i style="margin-right: 8px;" class="x-fa fa-file-o"></i>'+value;
                                }
                            },{
                                xtype: 'actioncolumn',
                                width: 50,
                                align: 'right',
                                items: [{
                                    iconCls: 'x-hidden x-fa fa-plus-square fa-fw blue-txt',
                                    tooltip: 'Open selected...',
                                    handler: function(grid, rowIdx, colIdx, item, e, rec){
                                        //var rec = grid.getStore().getAt(rowIdx);
                                        //var aIndex = grid.getStore().indexOf(rec);
                                        //console.log(rec);
                                        this.redirectTo('line/tab/' + rec.data.lineseq);

                                    },
                                    scope: this.controller
                                },{
                                    iconCls: 'x-hidden x-fa fa-minus-square fa-fw red-txt',
                                    tooltip: 'Delete the line sheet',
                                    handler: function (grid, rowIndex, colIndex, item, e, rec) {
                                        //var rec = grid.getStore().getAt(rowIndex);

                                        Ext.Msg.show({
                                            title:'Delete!',
                                            message: 'Are you sure you want to delete this?',
                                            buttons: Ext.Msg.OKCANCEL,
                                            icon: Ext.Msg.QUESTION,
                                            fn: function(btn) {
                                                if (btn === 'ok') {
                                                    //grid.getStore().remove(rec);
                                                    rec.drop();
                                                }
                                            }
                                        });
                                    }
                                }]
                            }],

                            plugins: [{
                                ptype: "gridfilters"
                            },{
                                ptype: 'cellediting',
                                id: 'ls-cell-edit',
                                clicksToEdit: 2
                            }]                            
                        }]
                    }]
                }],

                displayItems: [{
                    xtype: "display",
                    reference: "display"
                }],

                bbar: me.buildBottomBar()
            }]
        });

        me.callParent(arguments);

        var g=this.lookupReference("multiview"),
            //j=g.lookupReference("grid"),
            k=g.lookupReference('tiles'),
        //m=g.lookupReference('list'),
            h=g.lookupReference("display"),
            f=g.lookupReference("topbar");

        var segmented = f.lookupReference('viewselection');
        //segmented.items.items[2].setHidden(true);
        segmented.setValue(1);
        segmented.setHidden(true);

        f.actEdit.setHidden(false);
        f.actEdit.setDisabled(true);

        var mnuItems = [f.actEdit, f.actRefresh,
            {
                text: 'Add to line...',
                iconCls: 'x-fa fa-plus',
                action: 'addto',
                disabled: true,
                handler: 'onAddToLineSheet',
                scope: this.controller
            }];

        me.contextmenu = Ext.create("Ext.menu.Menu", {
            items: mnuItems
        });

        f.items.items[0].setHidden(false);

        f.insert(0,
            [{
                xtype: "combo",
                width: 112,
                hideLabel: true,
                valueField: "field",
                displayField: "label",
                value: "Style #",
                editable: false,
                reference: "filterSelection",
                bind: {
                    store: "{categories}"
                },
                listeners: {
                    change: {
                        fn: "onFilterItemChange",
                        scope: this.controller
                    }
                }
            },
            {
                xtype: "combo",
                reference: 'searchcombo',
                width: 300,
                hidden: true,
                hideLabel: true,
                // Use non-breaking space so that labelWidth of null shrinkwraps the unbroken string width
                valueField: 'id',
                displayField: 'id',
                // Over Extjs 5.* configs
                enableKeyEvents: true,
                queryMode: 'local',
                paramName: 'style',
                triggers: {
                    search: {
                        weight: 1,
                        cls: Ext.baseCSSPrefix + 'form-search-trigger',
                        tooltip: 'Search',
                        handler: function(combo){
                            combo.fireEvent('triggersearch', this);
                        }
                    }
                },
                plugins: [{
                    ptype: "cleartrigger"
                }],
                listeners: {
                    render: function(c){
                        c.on('focus', function () {
                            c.expand();
                        });

                        var picker = c.getTrigger('picker');
                        picker.hide();
                    },
                    select: function(c,rec){
                        c.fireEvent('triggersearch', c, c.getValue());
                    },
                    triggersearch: {
                        fn: 'onTgrSearchClick',
                        scope: this.controller
                    },
                    triggerclear: {
                        fn: 'onTgrClearClick',
                        scope: this.controller
                    }
                }
            },
            {
                xtype: "searchtextlist",
                reference: 'searchfield',
                width: 300,
                bind: {
                    store: '{lines}'
                },
                paramName: 'style'
            }]
        );

        f.insert(15,
            [{
                xtype: 'button',
                iconCls: 'x-fa fa-external-link-alt',
                text: 'Export',
                handler: function(b){
                    k.saveDocumentAs({
                        type: 'xlsx',
                        title: 'Product Style List',
                        fileName: 'Style Product' + Ext.Date.format(new Date(), 'Y-m-d')
                    });
                }
            }]
        );

        this.relayEvents(f, ["actrefresh", "actedit", "clearall"]);
        this.relayEvents(k, ["itemcontextmenu", "itemdblclick"], 'grid');
    },

    buildBottomBar: function(){
        var b = Ext.widget("combo", {
            name: "perpage",
            //reference: 'pageSizer',
            width: 76,
            store: new Ext.data.ArrayStore({
                fields: ["id"],
                data: [["15"], ["25"], ["50"], ["100"], ["300"], ["500"]]
            }),
            //value: "50",
            displayField: "id",
            valueField: "id",
            editable: false,
            forceSelection: true,
            matchFieldWidth: true,
            queryMode: "local"
            //triggerAction: "all",
        });

        b.on('afterrender', function(c, e){
            var store = this.getViewModel().getStore("lines");
            c.setValue(store.getPageSize());
        }, this);

        b.on("select", function(e, a){
            var store = this.getViewModel().getStore("lines");
            store.setPageSize(e.getValue());
            store.load();
            //console.log("combo select", f)
        }, this);

        return {
            xtype: "pagingtoolbar",
            //itemId: "pagingtb",
            bind: {
                store: "{lines}"
            },
            //dock: 'bottom',
            displayInfo: true,
            items: ["-", b, "Per Page"]
        };
    }
});
