Ext.define('August.model.style.Sil', {
    extend: 'August.model.Base',

    fields: [
        { name: 'id', type: 'int' },
        //{ name: 'sample_style_v', persist: false },
        { name: 'style', type: 'string' },
        { name: 'color', type: 'string' },        
        { name: 'seq', type: 'int' },
        {
            name: 'lineseq',
            type: 'int',
            reference: {
                parent: 'style.LineSheet',

                //type: 'sales.Powd',
                //association: 'MaterialsByStyle',
                //role: 'linesheet',
                field: 'lineseq',
                inverse: 'stylesInLines'
            }
        }
    ],

    //idProperty: 'id',
    //clientIdProperty: 'sid',
    identifier: 'negative',

    proxy: {
        type: "rest",
        url: "/WebApp/api/LineStyles",
        batchActions: true, // default false when rest proxy.

        reader: {
            type: "json",
            rootProperty: "data"
        },

        writer: {
            type: 'json',
            //clientIdProperty: 'clientId',
            writeAllFields: true,
            allowSingle: false // set false to send a single record in array
        },        

        listeners: {            
            exception: function (proxy, response, operation) {
                console.log(response, operation);
            }
        }
    }
});
