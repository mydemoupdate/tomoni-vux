import Vue from 'vue'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

lodash.mixin({
    /**
     * Rename specify object keys
     * 
     * @param {Object} object 
     * @param {Object} swrap 
     */
    'renameKeys': function (object, swrap) {
        lodash.each(swrap, function (newKey, key) {
            if (newKey instanceof Function) return;
            if (newKey === key) return;
            lodash.set(object, newKey, object[key])
            lodash.unset(object, key)
        })
    },

    /**
     * One way format date
     * 
     * @param {Date} date
     * @return {String}
     */
    'formatDate': function (date) {
        return date.toISOString().split('T')[0]
    },

    /**
     * Cast values as defined
     * 
     * @param {Array} items 
     * @param {Object} doc:{attributes.cast()}
     */
    'cast': function (items, doc) {
        return items.map((item) => {
            lodash.each(doc.attributes, (attribute, key) => {
                if (item[key] == null || item[key] == undefined) {
                    item[key] = attribute.default ?? ''
                }
                if (attribute.cast) {
                    item[key] = attribute.cast(item[key], item)
                }
            })
            return item
        })
    },

    /**
     * Pick & parse data to export
     * 
     * @param {Array} items 
     * @param {Object} doc 
     * @return {Array}
     */
    'toExport': function (items, doc) {
        return items.map(function (item) {
            const result = {}
            lodash.each(doc.attributes, (describe, key) => {
                if (!describe.export || !item[key])
                    return
                if (describe.export.customize) {
                    result[describe.export.name] = describe.export.customize(item[key])
                } else {
                    result[describe.export.name] = item[key]
                }
            })
            return result
        })
    },

    /**
     * Pick & parse data to import
     * 
     * @param {Array} data 
     * @param {Object} doc 
     * @return {Array}
     */
    'toImport': function (data, doc) {
        return data.map(function (item) {
            const result = {}
            lodash.each(doc.attributes, (describe, key) => {
                if (!describe.import)
                    return
                if (describe.import.customize) {
                    result[key] = describe.import.customize(item[describe.import.name])
                } else {
                    result[key] = item[describe.import.name]
                }
            })
            return result
        })
    },

    /**
     * Convert data for CSelect
     * 
     * @param {Array} data 
     * @param {Object} doc 
     * @return {Array}
     */
    'toCSelect': function (items, targets = { value: 'id', label: 'ten' }, keys = { value: 'value', label: 'label' }) {
        const result = !items ? null : items.map(function (item) {
            return {
                [keys.value]: item[targets.value],
                [keys.label]: item[targets.label]
            }
        })
        return [{ [keys.value]: '', [keys.label]: 'Trống' }, ...result]
    },

    /**
     * Get table fields
     * 
     * @param {Object} doc 
     * @return {Array}
     */
    'getTableFields': function (doc) {
        const fields = []
        lodash.each(doc.attributes, (attribute, key) => {
            if (attribute.export) {
                fields.push({
                    key: key,
                    label: attribute.export.name,
                    ...attribute.export.options,
                })
            }
        })
        return fields
    },

    /**
     * Filter
     * 
     * @param {Object|Array} items
     * @param {Object} filter {value: "", keyFilter: "id", condition: "like|=",}
     * @return {Array}
     */
    'advancedFilter': function (list, filter) {
        return lodash.filter(list, (item) => {
            const result = lodash.uniq(
                lodash.map(filter, (field, key) => {
                    if (!field.value) {
                        return true;
                    }
                    const condition = field.condition ?? 'like'
                    field.keyFilter = field.keyFilter ?? 'id'
                    switch (condition) {
                        case '=':
                            return item[key][field.keyFilter] == field.value
                        default:
                            return lodash.includes(
                                item[key][field.keyFilter],
                                field.value
                            );
                    }

                })
            );
            return result.length === 1 && result[0] === true;
        })
    },
})

Vue.use(VueLodash, { lodash: lodash })

export default lodash