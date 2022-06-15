Ext.define('August.model.style.Inventories', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        {
            name: 'ID',
            type: 'string',            
            calculate: function(data){
                return data.style.trim() + data.color.trim();
            }            
        },
        {
            name: 'type',
            type: 'string'
            /*
            calculate: function(data){
                return data.style.trim() + '-' + data.color.trim() + '-' + data.bomno + '-' + data.line + '-' + data.orderNo;
            }
            */
        },        
        { name: 'style', type: 'string', allowNull: false },
        { name: 'color', type: 'string', allowNull: false },
        { name: 'warehouse', type: 'string', allowNull: false },
        { name: 'season', type: 'string' },
        { name: 'grp', type: 'string'},
        { name: 'descript', type: 'string'},
        { name: 'price', type: 'float'},
        { name: 'dt', type: 'date'},
        { name: 'division', type: 'string'},
        { name: 'oh1', type: 'float'},
        { name: 'oh2', type: 'float'},
        { name: 'oh3', type: 'float'},
        { name: 'oh4', type: 'float'},
        { name: 'oh5', type: 'float'},
        { name: 'oh6', type: 'float'},
        { name: 'oh7', type: 'float'},
        { name: 'oh8', type: 'float'},
        { name: 'oh9', type: 'float'},
        { name: 'oh10', type: 'float'},
        { name: 'ohs', type: 'float', 
        calculate: function(d){
                return d.oh1 + d.oh2 + d.oh3 + d.oh4 + d.oh5 + d.oh6 + d.oh7 + d.oh8 + d.oh9 + d.oh10; 
            }
        },
        { name: 'wip1', type: 'float'},
        { name: 'wip2', type: 'float'},
        { name: 'wip3', type: 'float'},
        { name: 'wip4', type: 'float'},
        { name: 'wip5', type: 'float'},
        { name: 'wip6', type: 'float'},
        { name: 'wip7', type: 'float'},
        { name: 'wip8', type: 'float'},
        { name: 'wip9', type: 'float'},
        { name: 'wip10', type: 'float'},
        { name: 'wips', type: 'float',
            calculate: function(d){
                return d.wip1 + d.wip2 + d.wip3 + d.wip4 + d.wip5 + d.wip6 + d.wip7 + d.wip8 + d.wip9 + d.wip10; 
            }
        },
        { name: 'order1', type: 'float'},
        { name: 'order2', type: 'float'},
        { name: 'order3', type: 'float'},
        { name: 'order4', type: 'float'},
        { name: 'order5', type: 'float'},
        { name: 'order6', type: 'float'},
        { name: 'order7', type: 'float'},
        { name: 'order8', type: 'float'},
        { name: 'order9', type: 'float'},
        { name: 'order10', type: 'float'},
        { name: 'orders', type: 'float', 
            calculate: function(d){
                return d.order1 + d.order2 + d.order3 + d.order4 + d.order5 + d.order6 + d.order7 + d.order8 + d.order9 + d.order10; 
            }
        },
        { name: 'ats1', type: 'float'},
        { name: 'ats2', type: 'float'},
        { name: 'ats3', type: 'float'},
        { name: 'ats4', type: 'float'},
        { name: 'ats5', type: 'float'},
        { name: 'ats6', type: 'float'},
        { name: 'ats7', type: 'float'},
        { name: 'ats8', type: 'float'},
        { name: 'ats9', type: 'float'},
        { name: 'ats10', type: 'float'},
        { name: 'ats', type: 'float', 
            calculate: function(d){
                return d.ats1 + d.ats2 + d.ats3 + d.ats4 + d.ats5 + d.ats6 + d.ats7 + d.ats8 + d.ats9 + d.ats10; 
            }
        },
        { name: 'ots1', type: 'float'},
        { name: 'ots2', type: 'float'},
        { name: 'ots3', type: 'float'},
        { name: 'ots4', type: 'float'},
        { name: 'ots5', type: 'float'},
        { name: 'ots6', type: 'float'},
        { name: 'ots7', type: 'float'},
        { name: 'ots8', type: 'float'},
        { name: 'ots9', type: 'float'},
        { name: 'ots10', type: 'float'},
        { name: 'ots', type: 'float', 
            calculate: function(d){
                return d.ots1 + d.ots2 + d.ots3 + d.ots4 + d.ots5 + d.ots6 + d.ots7 + d.ots8 + d.ots9 + d.ots10; 
            }
        },
        { name: 'size1', type: 'string'},             
        { name: 'size2', type: 'string'},             
        { name: 'size3', type: 'string'},             
        { name: 'size4', type: 'string'},             
        { name: 'size5', type: 'string'},             
        { name: 'size6', type: 'string'},             
        { name: 'size7', type: 'string'},             
        { name: 'size8', type: 'string'},             
        { name: 'size9', type: 'string'},             
        { name: 'size10', type: 'string'}             
    ],

    //idProperty: '',
    identifier: 'negative',

    validators: {
        style: 'presence',
        color: 'presence',
        warehouse: 'presence'
    },

    proxy: {
        type: 'rest',        
        url: '/WebApp/api/Inventories',

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

        listeners: {           
            exception: function (proxy, response, operation) {
                console.log(response, operation);
            }
        }
    }
});