Ext.define('August.data.writer.Json', {
    extend: 'Ext.data.writer.Json',
    //alias: 'writer.json',

    getRecordData: function(record, operation) {
        if (record.writeStructuredData) {
            return record.getWriteData();
        } else {
            return this.callParent(arguments);
        }
    }
});