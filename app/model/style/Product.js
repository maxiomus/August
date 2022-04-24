Ext.define('August.model.style.Product', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [        
        { name: 'style', type: 'string' },
        { name: 'color', type: 'string' },
        { name: 'status', type: 'string' },
        { name: 'location', type: 'string' },
        { name: 'cost', type: 'number' },
        { name: 'availableDate', type: 'date', dateFormat: 'C', dateWriteFormat: 'Y-m-d' },
        { name: 'price1', type: 'number' },
        { name: 'price2', type: 'number' },
        { name: 'price3', type: 'number' },
        { name: 'price4', type: 'number' },
        { name: 'price5', type: 'number' },
        { name: 'userName', type: 'string' },
        { name: 'userTime', type: 'date', dateFormat: 'C' },
        { name: 'season', type: 'string' },
        { name: 'oh1', type: 'number' },
        { name: 'oh2', type: 'number' },
        { name: 'oh3', type: 'number' },
        { name: 'oh4', type: 'number' },
        { name: 'oh5', type: 'number' },
        { name: 'oh6', type: 'number' },
        { name: 'oh7', type: 'number' },
        { name: 'oh8', type: 'number' },
        { name: 'oh9', type: 'number' },
        { name: 'oh10', type: 'number' },
        { name: 'oh11', type: 'number' },
        { name: 'oh12', type: 'number' },
        { name: 'oh13', type: 'number' },
        { name: 'oh14', type: 'number' },
        { name: 'oh15', type: 'number' },
        { name: 'ohs', type: 'number' },
        { name: 'order1', type: 'number' },
        { name: 'order2', type: 'number' },
        { name: 'order3', type: 'number' },
        { name: 'order4', type: 'number' },
        { name: 'order5', type: 'number' },
        { name: 'order6', type: 'number' },
        { name: 'order7', type: 'number' },
        { name: 'order8', type: 'number' },
        { name: 'order9', type: 'number' },
        { name: 'order10', type: 'number' },
        { name: 'order11', type: 'number' },
        { name: 'order12', type: 'number' },
        { name: 'order13', type: 'number' },
        { name: 'order14', type: 'number' },
        { name: 'order15', type: 'number' },
        { name: 'orders', type: 'number' },
        { name: 'it1', type: 'number' },
        { name: 'it2', type: 'number' },
        { name: 'it3', type: 'number' },
        { name: 'it4', type: 'number' },
        { name: 'it5', type: 'number' },
        { name: 'it6', type: 'number' },
        { name: 'it7', type: 'number' },
        { name: 'it8', type: 'number' },
        { name: 'it9', type: 'number' },
        { name: 'it10', type: 'number' },
        { name: 'it11', type: 'number' },
        { name: 'it12', type: 'number' },
        { name: 'it13', type: 'number' },
        { name: 'it14', type: 'number' },
        { name: 'it15', type: 'number' },
        { name: 'its', type: 'number' },
        { name: 'po1', type: 'number' },
        { name: 'po2', type: 'number' },
        { name: 'po3', type: 'number' },
        { name: 'po4', type: 'number' },
        { name: 'po5', type: 'number' },
        { name: 'po6', type: 'number' },
        { name: 'po7', type: 'number' },
        { name: 'po8', type: 'number' },
        { name: 'po9', type: 'number' },
        { name: 'po10', type: 'number' },
        { name: 'po11', type: 'number' },
        { name: 'po12', type: 'number' },
        { name: 'po13', type: 'number' },
        { name: 'po14', type: 'number' },
        { name: 'po15', type: 'number' },
        { name: 'pos', type: 'number' },        
        { name: 'ats1', type: 'number', persist: false,
            calculate: function(data){
                return data.oh1 + data.po1 - data.order1;
            }
        },
        { name: 'ats2', type: 'number', persist: false,
            calculate: function(data){
                return data.oh2 + data.po2 - data.order2;
            } 
        },
        { name: 'ats3', type: 'number', persist: false,
            calculate: function(data){
                return data.oh3 + data.po3 - data.order3;
            } 
        },
        { name: 'ats4', type: 'number', persist: false,
            calculate: function(data){
                return data.oh4 + data.po4 - data.order4;
            } 
        },
        { name: 'ats5', type: 'number', persist: false,
            calculate: function(data){
                return data.oh5 + data.po5 - data.order5;
            } 
        },
        { name: 'ats6', type: 'number', persist: false,
            calculate: function(data){
                return data.oh6 + data.po6 - data.order6;
            } 
        },
        { name: 'ats7', type: 'number', persist: false,
            calculate: function(data){
                return data.oh7 + data.po7 - data.order7;
            } 
        },
        { name: 'ats8', type: 'number', persist: false,
            calculate: function(data){
                return data.oh8 + data.po8 - data.order8;
            } 
        },
        { name: 'ats9', type: 'number', persist: false,
            calculate: function(data){
                return data.oh9 + data.po9 - data.order9;
            } 
        },
        { name: 'ats10', type: 'number', persist: false,
            calculate: function(data){
                return data.oh10 + data.po10 - data.order10;
            } 
        },
        { name: 'ats11', type: 'number', persist: false,
            calculate: function(data){
                return data.oh11 + data.po11 - data.order11;
            } 
        },
        { name: 'ats12', type: 'number', persist: false,
            calculate: function(data){
                return data.oh12 + data.po12 - data.order12;
            } 
        },
        { name: 'ats13', type: 'number', persist: false,
            calculate: function(data){
                return data.oh13 + data.po13 - data.order13;
            } 
        },
        { name: 'ats14', type: 'number', persist: false,
            calculate: function(data){
                return data.oh14 + data.po14 - data.order14;
            } 
        },
        { name: 'ats15', type: 'number', persist: false,
            calculate: function(data){
                return data.oh15 + data.po15 - data.order15;
            } 
        },
        { name: 'ats', type: 'number', persist: false,
            calculate: function(data){
                return data.ohs + data.pos - data.orders;
            } 
        },
        { name: 'ots1', type: 'number', persist: false,
            calculate: function(data){
                return data.oh1 - data.order1;
            }
        },
        { name: 'ots2', type: 'number', persist: false,
            calculate: function(data){
                return data.oh2 - data.order2;
            } 
        },
        { name: 'ots3', type: 'number', persist: false,
            calculate: function(data){
                return data.oh3 - data.order3;
            } 
        },
        { name: 'ots4', type: 'number', persist: false,
            calculate: function(data){
                return data.oh4 - data.order4;
            } 
        },
        { name: 'ots5', type: 'number', persist: false,
            calculate: function(data){
                return data.oh5 - data.order5;
            } 
        },
        { name: 'ots6', type: 'number', persist: false,
            calculate: function(data){
                return data.oh6 - data.order6;
            } 
        },
        { name: 'ots7', type: 'number', persist: false,
            calculate: function(data){
                return data.oh7 - data.order7;
            } 
        },
        { name: 'ots8', type: 'number', persist: false,
            calculate: function(data){
                return data.oh8 - data.order8;
            } 
        },
        { name: 'ots9', type: 'number', persist: false,
            calculate: function(data){
                return data.oh9 - data.order9;
            } 
        },
        { name: 'ots10', type: 'number', persist: false,
            calculate: function(data){
                return data.oh10 - data.order10;
            } 
        },
        { name: 'ots11', type: 'number', persist: false,
            calculate: function(data){
                return data.oh11 - data.order11;
            } 
        },
        { name: 'ots12', type: 'number', persist: false,
            calculate: function(data){
                return data.oh12 - data.order12;
            } 
        },
        { name: 'ots13', type: 'number', persist: false,
            calculate: function(data){
                return data.oh13 - data.order13;
            } 
        },
        { name: 'ots14', type: 'number', persist: false,
            calculate: function(data){
                return data.oh14 - data.order14;
            } 
        },
        { name: 'ots15', type: 'number', persist: false,
            calculate: function(data){
                return data.oh15 - data.order15;
            } 
        },
        { name: 'ots', type: 'number', persist: false,
            calculate: function(data){
                return data.ohs - data.orders;
            } 
        },
        { name: 'division', type: 'string' },
        { name: 'grp', type: 'string' },
        { name: 'lot', type: 'string' },
        { name: 'leadTime', type: 'int' },
        { name: 'vendorPartNo', type: 'string' },
        { name: 'shrinkWidth', type: 'number' },
        { name: 'shrinkHeight', type: 'number' },
        { name: 'width', type: 'number' },
        { name: 'cost1', type: 'number' },
        { name: 'cost2', type: 'number' },
        { name: 'avgCost', type: 'number' },
        { name: 'stdCost', type: 'number' },
        { name: 'vendorColor1', type: 'string' },
        { name: 'vendorColor2', type: 'string' },
        { name: 'vendorColor3', type: 'string' },
        { name: 'actualWidth', type: 'number' },
        { name: 'active', type: 'string' },
        { name: 'fabcontent', type: 'string' },
        { name: 'vendDesign1', type: 'string' },
        { name: 'vendDesign2', type: 'string' },
        { name: 'vendDesign3', type: 'string' },
        { name: 'required', type: 'number' },
        { name: 'uom1', type: 'string' },
        { name: 'subdivision', type: 'string' },
        { name: 'type', type: 'string' },
        { name: 'sizeCat', type: 'string' },
        { 
            name: 'Size', persist: false,
            reference: {
                type: 'style.SizeCategory',
                unique: true
            }
        }, 
        { name: 'descript', type: 'string' },
        { name: 'category', type: 'string' },
        { name: 'vendor1', type: 'string' },
        { name: 'vendorPart1', type: 'string' },
        { name: 'vendor2', type: 'string' },
        { name: 'vendorPart2', type: 'string' },
        { name: 'vendor3', type: 'string' },
        { name: 'vendorPart3', type: 'string' },
        { name: 'uom2', type: 'string' },
        { name: 'uom3', type: 'string' },
        { name: 'UpdateUser', type: 'string' },
        { name: 'UpdateTime', type: 'date', dateFormat: 'C' },
        { name: 'impCat', type: 'string' },
        { name: 'memo', type: 'string' },
        { name: 'ldp', type: 'number' },
        { name: 'customer', type: 'string' },
        { name: 'fabricType', type: 'string' },
        { name: 'reserve', type: 'number' },
        { name: 'reOrderLevel', type: 'number' },
        { name: 'lstCost', type: 'number' },
        { name: 'currency1', type: 'string' },
        { name: 'currency2', type: 'string' },
        { name: 'currency3', type: 'string' },
        { name: 'rawMatType', type: 'string' },
        { name: 'asRaw', type: 'string' },
        { name: 'id', type: 'int' },
        { name: 'defaultBomCost', type: 'number' },
        { name: 'noneInventory', type: 'string' },
        { name: 'weight', type: 'number' },
        { name: 'sgtRetailPrice', type: 'number' },
        { name: 'originalProjection', type: 'int' },
        { name: 'cost3', type: 'number' },
        { name: 'uom', type: 'string' },
        { name: 'lowestno', type: 'int' },
        { name: 'bomcost2', type: 'number' },
        { name: 'bomcost3', type: 'number' },
        { name: 'bomcost4', type: 'number' },
        { name: 'bomcost5', type: 'number' },
        { name: 'alloc1', type: 'number' },
        { name: 'alloc2', type: 'number' },
        { name: 'alloc3', type: 'number' },
        { name: 'alloc4', type: 'number' },
        { name: 'alloc5', type: 'number' },
        { name: 'alloc6', type: 'number' },
        { name: 'alloc7', type: 'number' },
        { name: 'alloc8', type: 'number' },
        { name: 'alloc9', type: 'number' },
        { name: 'alloc10', type: 'number' },
        { name: 'alloc11', type: 'number' },
        { name: 'alloc12', type: 'number' },
        { name: 'alloc13', type: 'number' },
        { name: 'alloc14', type: 'number' },
        { name: 'alloc15', type: 'number' },
        { name: 'allocs', type: 'number' },
        { name: 'pick1', type: 'number' },
        { name: 'pick2', type: 'number' },
        { name: 'pick3', type: 'number' },
        { name: 'pick4', type: 'number' },
        { name: 'pick5', type: 'number' },
        { name: 'pick6', type: 'number' },
        { name: 'pick7', type: 'number' },
        { name: 'pick8', type: 'number' },
        { name: 'pick9', type: 'number' },
        { name: 'pick10', type: 'number' },
        { name: 'pick11', type: 'number' },
        { name: 'pick12', type: 'number' },
        { name: 'pick13', type: 'number' },
        { name: 'pick14', type: 'number' },
        { name: 'pick15', type: 'number' },
        { name: 'picks', type: 'number' },
        { name: 'ship1', type: 'number' },
        { name: 'ship2', type: 'number' },
        { name: 'ship3', type: 'number' },
        { name: 'ship4', type: 'number' },
        { name: 'ship5', type: 'number' },
        { name: 'ship6', type: 'number' },
        { name: 'ship7', type: 'number' },
        { name: 'ship8', type: 'number' },
        { name: 'ship9', type: 'number' },
        { name: 'ship10', type: 'number' },
        { name: 'ship11', type: 'number' },
        { name: 'ship12', type: 'number' },
        { name: 'ship13', type: 'number' },
        { name: 'ship14', type: 'number' },
        { name: 'ship15', type: 'number' },
        { name: 'ships', type: 'number' },
        { name: 'user1', type: 'string' },
        { name: 'user2', type: 'string' },
        { name: 'user3', type: 'string' },
        { name: 'user4', type: 'string' },
        { name: 'user5', type: 'string' },
        { name: 'user6', type: 'string' },
        { name: 'user7', type: 'string' },
        { name: 'user8', type: 'string' },
        { name: 'user9', type: 'string' },
        { name: 'user10', type: 'string' },
        { name: 'body', type: 'string' },
        { name: 'bundle', type: 'string' },
        { name: 'pack_chk', type: 'string' },
        { name: 'sub_style', type: 'string' },
        { name: 'pack_sizecat', type: 'string' },
        { name: 'sub_color', type: 'string' },
        { name: 'BomCost1', type: 'number' },
        { name: 'processtype', type: 'string' },
        { name: 'webUpload', type: 'int' },
        { name: 'qb_tranfer', type: 'string' },
        { name: 'designer', type: 'string' },
        { name: 'Def_BoxType', type: 'string' },
        { name: 'Def_QtyPerBox', type: 'number' },
        { name: 'QtyPerBag', type: 'number' },
        { name: 'Inv_QtyPerBox', type: 'number' },
        { name: 'po_memo', type: 'string' },
        { name: 'Small_BoxType', type: 'string' },
        { name: 'Small_QtyPerBox', type: 'number' },
        { name: 'hs_tariffno', type: 'string' },
        { name: 'min_order_qty', type: 'number' },
        { name: 'userdate', type: 'date', dateFormat: 'C', dateWriteFormat: 'Y-m-d' },
        { name: 'binlocation', type: 'string' },
        { name: 'receivedQty', type: 'number' },
        { name: 'allowancerate', type: 'number' },
        { name: 'coo', type: 'string' },
        { name: 'cimemo', type: 'string' },
        { name: 'account', type: 'string' },
        { name: 'warehouse', type: 'string' },
        { name: 'web_pic', type: 'string' },
        { name: 'subcategory', type: 'string' },
        { name: 'reference1', type: 'string' },
        { name: 'reference2', type: 'string' },
        { name: 'total_inv_qty', type: 'number' },
        { name: 'web_yn', type: 'bool' },
        { name: 'active_yn', type: 'bool' },
        { name: 'ignore_price_rule', type: 'string' },
        { name: 'do_not_allocate', type: 'string' },
        { name: 'do_not_pick', type: 'string' },
        { name: 'do_not_scanpack', type: 'string' },
        { name: 'do_not_invoice', type: 'string' },
        { name: 'cost_cur_cs', type: 'number' },
        { name: 'price_ddp', type: 'number' },
        { name: 'nafta', type: 'string' },
        { name: 'send_846_file', type: 'string' },
        { name: 'price_fob', type: 'number' },
        { name: 'startSellDate', type: 'date', dateFormat: 'C' },
        { name: 'userId', type: 'string', mapping: 'userName', persist: false}
        /*
        { name: 'productId',
            mapping: 'id',
            persist: false
        } 
        */   
    ],

    //idProperty: 'productId',
    identifier: 'negative',

    validators: {
        style: 'presence',
        color: 'presence',
        //rawMatType: 'presence',
        season: 'presence',
        division: 'presence'
        //fabcontent: 'presence',
        //fabricType: 'presence'
        /*
         ordertype: { type: 'length', min: 2 },
         gender: { type: 'inclusion', list: ['Male', 'Female'] },
         username: [
         { type: 'exclusion', list: ['Admin', 'Operator'] },
         { type: 'format', matcher: /([a-z]+)[0-9]{2,3}/i }
         ]
         */
    },

    proxy: {
        type: 'rest',
        url: '/WebApp/api/Products/',

        pageParam: '',
        startParam: '',
        limitParam: '',

        headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        },
        
        reader: {
            type: 'json',
            rootProperty: 'data'
        },

        writer: {
            type: 'json',
            //clientIdProperty: 'clientId',
            //writeAllFields: true,
            allowSingle: false // set false to send a single record in array
        },

        listeners: {
            exception: function (proxy, response, operation) {
                console.log(response, operation);
            }
        }
    }

});