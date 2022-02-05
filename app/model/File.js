/**
 * Created by tech on 8/20/2015.
 */
Ext.define('August.model.File', {
    extend: 'August.model.Base',
    fields: ['fileId',
        //'name', 'size', 'created', 'lastmod',
        {
            name: 'file',
            type: 'auto',
            persist: false
        },
        {   name: 'name', mapping: 'file.name'},
        {   name: 'size', mapping: 'file.size'},
        {   name: 'type', mapping: 'file.type'},
        {   name: 'created', mapping: 'file.created'},
        {   name: 'lastmod', mapping: 'file.lastmod'}
    ]
});
