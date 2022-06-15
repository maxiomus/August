
Ext.define("August.view.production.style.View", {
    extend: 'Ext.view.View',

    requires: [
        'August.view.production.style.ViewController',
        'August.view.production.style.ViewModel'
    ],

    alias: "widget.style-view",

    scrollable: "y",
    //loadMask: true,
    //loadingHeight: 300,
    //trackOver: false,
    enableTextSelection: false,

    cls: "sample-image-view",

    loadMask: true,
    overItemCls: "x-item-over",
    itemSelector: "div.thumb-wrap",

    preserveScrollOnRefresh: true,
    //deferInitialRefresh: true,

    padding: '7 0 0 7',

    style: {
        //borderTop: '1px solid #cfcfcf',
        //borderBottom: '1px solid #cfcfcf'
    },

    prepareData: function(f, d, e){
        Ext.apply(f, {
            //viewStatus: localStorage.getItem("pow-seen-" + f.powhId) == "true" ? "visited" : ""
        });
        return f;
    },

    listeners: {
        beforecontainerclick: function(){
            return false;
        }
    },

    initComponent:function(){
        var me = this;
        me.tpl = me.buildTemplate();

        me.callParent(arguments);
    },

    buildTemplate: function(){
        var b = new Ext.XTemplate('<tpl for=".">',
            '<div class="thumb-wrap x-unselectable">',
                '<div class="thumb">',
                    //'<tpl if="this.notNull(mp)">',
                    '<tpl if="this.notNull(style)">',
                        '<img class="x-unselectable" src="http://209.37.126.195:9090/StyleImages/200xImages/{style}_{color}_front.jpg" />',
                    '</tpl>',
                '</div>',
                /*
                '<div class="post-data x-unselectable">',
                    '<div class="post-title">POW # {powno} <i class="x-fa fa-check-square-o fa-lg viewIcon {viewStatus}"></i></div>',
                    '<div class="post-date">{createdon:date("M j,Y,g:i a")}</div>',
                    '<div class="post-author">Registered by {userId:capitalize}</div>',
                '</div>',
                */
                '<div>',
                    '<span style="float: left;">Style #: {style:ellipsis(10)}</span><span> Color: {color:ellipsis(10)}</span>',
                    '<span style="clear: both;">Category: {category:ellipsis(35)}</span>',
                    '<span style="clear: both;">Division: {division}</span>',
                    '<span style="clear: both;">Season: {season}</span>',
                    //'<span style="float: left;width:50%;">Category: {category}</span><span style="width:50%;">Sub Category: {subcategory}</span>',
                    //'<span style="float: left;width:50%;">Division: {division}</span><span style="width:50%;"> Season: {season}</span>',
                    '<span style="float: left;width:50%;">Size: {sizeCat}</span><span style="width:50%;"> COO: {coo}</span>',
                    '<span style="float: left;width:50%;">Price: {price1:this.formatCost}</span><span style="width:50%;"> Cost: {cost:this.formatCost}</span>',
                    '<div style="clear: both;height:4px;"> </div>',                    
                    //'<div style="font-size:11px;padding:4px;">Size: {memo:this.formatMemo}</div>',
                '</div>',
            '</div>',
            '{% if (xindex % 4 !== 0) continue; %}',
            '<div class="x-clear"></div>',
            '</tpl>',
            //'<div class="x-clear"></div>',
            {
                format: function(v){
                    var k=Ext.util.Format;
                    if(!Ext.isEmpty(v)){
                        var l=v.split("(#)"),
                            j=k.capitalize(l[2]+" ("+l[1]+")");
                        //h.tdAttr='data-qtip="'+j+'"';
                        return j;
                    }
                }
            },
            {
                formatCost: function(v){
                    var xf = Ext.util.Format;

                    return v ? xf.usMoney(v) : '';
                }
            },
            {
                formatMemo: function(v){
                    var k=Ext.util.Format,
                        j;
                    if(!Ext.isEmpty(v)){
                        j = k.stripTags(v);
                    }

                    return k.ellipsis(j, 30);
                }
            },
            {
                notNull: function(v){

                    return !Ext.isEmpty(v);
                }
            }
        );

        return b;
    }
});
