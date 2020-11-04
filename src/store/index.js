import lodash from 'lodash';
import { firestoreAction } from 'vuexfire'
import { PUSH_ERROR } from "@/core/services/store/errors.module"
import { SUCCESS, WARNING, PUSH_TOAST } from '@/core/services/store/toasts.module'

const modulesCache = {}
const modules = {}

    ; (function () {
        // https://webpack.js.org/guides/dependency-management/#require-context
        const requireModule = require.context(
            // Search for files in the current directory.
            '.',
            // Search for files in subdirectories.
            true,
            // Include any .js files that are not this file or a unit test.
            /^((?!index|\.unit\.).)*\.js$/
        )

        // For every module...
        requireModule.keys().forEach((fileName) => {
            const moduleDefinition = requireModule(fileName)

            // Skip the module during hot reload if it refers to the
            // same module definition as the one we have cached.
            if (modulesCache[fileName] === moduleDefinition) return

            // Update the module cache, for efficient hot reloading.
            modulesCache[fileName] = moduleDefinition

            // Get the module path as an array.
            const modulePath = fileName
                // Remove the "./" from the beginning.
                .replace(/^\.\//, '')
                // Remove the file extension from the end.
                .replace(/\.\w+$/, '')
                // Split nested modules into an array path.
                .replace(/\//, '.')

            // Get the modules object for the current path.
            const module = getNamespace(modules, [modulePath])

            const MODULE = {
                DOCUMENT: moduleDefinition.DOCUMENT,
                STATE_SELECTED: modulePath.replace(/\./, '') + 'chitiet',
                STATE_LIST: modulePath.replace(/\./, '') + 'list',
                GETTER_LIST: modulePath + '.list',
                GETTER_LIST_CSELECT: modulePath + '.cselect',
                GETTER_PANE_SIZE: modulePath + '.panesize',
                GETTER_DATA_EXPORT: modulePath + '.dataexport',
                GETTER_SELECTED: modulePath + '.selected',
                GETTER_ACTIVE_TAB: modulePath + '.tab',
                GETTER_WAS_SELECTED: modulePath + '.wasselected',
                ACTION_IMPORT_DATA: modulePath + '.import',
                ACTION_BIND_LIST: modulePath + '.bind',
                ACTION_CREATE: modulePath + '.create',
                ACTION_SELECT: modulePath + '.select',
                ACTION_UPDATE: modulePath + '.update',
                ACTION_DELETE: modulePath + '.delete',
                MUTATION_SELECT: modulePath + '.select',
                MUTATION_PURGE_SELECT: modulePath + '.purgeselect',
                MUTATION_UPDATE: modulePath + '.update',
                MUTATION_ACTIVE_TAB: modulePath + '.tab',
                MUTATION_PANE_SIZE: modulePath + '.panesize',
            }

            const defaultAttribute = {
                ...lodash.mapValues(MODULE.DOCUMENT.attributes, attribute => attribute.default ?? null)
            }

            const defaultState = {
                [MODULE.STATE_LIST]: [],
                detailPanSize: 0,
                [MODULE.STATE_SELECTED]: defaultAttribute,
                activeTab: 0,
            }

            const defaultGetters = {
                [MODULE.GETTER_LIST](state) {
                    return lodash.cast(state[MODULE.STATE_LIST], MODULE.DOCUMENT)
                },
                [MODULE.GETTER_LIST_CSELECT](state) {
                    return lodash.toCSelect(state[MODULE.STATE_LIST])
                },
                [MODULE.GETTER_PANE_SIZE](state) {
                    return state.detailPanSize
                },
                [MODULE.GETTER_DATA_EXPORT](state) {
                    return lodash.toExport(state[MODULE.STATE_LIST], MODULE.DOCUMENT)
                },
                [MODULE.GETTER_SELECTED](state) {
                    return lodash.clone(lodash.cast([state[MODULE.STATE_SELECTED] ?? defaultAttribute], MODULE.DOCUMENT)[0])
                },
                [MODULE.GETTER_ACTIVE_TAB](state) {
                    return state.activeTab
                },
                [MODULE.GETTER_WAS_SELECTED](state) {
                    return state[MODULE.STATE_SELECTED] ? state[MODULE.STATE_SELECTED].id !== defaultAttribute.id : false
                }
            }

            const defaultActions = {
                [MODULE.ACTION_BIND_LIST]: firestoreAction((context) => {
                    try {
                        return context.bindFirestoreRef(MODULE.STATE_LIST, MODULE.DOCUMENT.collection)
                    } catch (error) {
                        context.dispatch(PUSH_ERROR, { error });
                    }
                }),
                [MODULE.ACTION_IMPORT_DATA](context, data) {
                    try {
                        MODULE.DOCUMENT.import(lodash.toImport(data, MODULE.DOCUMENT))
                        context.dispatch(PUSH_TOAST, {
                            message: 'Đã nhập',
                            type: SUCCESS
                        })
                    } catch (error) {
                        context.dispatch(PUSH_ERROR, { error });
                    }
                },
                [MODULE.ACTION_CREATE]: firestoreAction((context, data) => {
                    try {
                        return MODULE.DOCUMENT.create(data).then(() => {
                            context.dispatch(MODULE.ACTION_SELECT, data.id)
                            context.dispatch(PUSH_TOAST, {
                                message: 'Đã tạo',
                                type: SUCCESS
                            })
                        }).catch((error) => {
                            context.dispatch(PUSH_ERROR, { error })
                        })
                    } catch (error) {
                        context.dispatch(PUSH_ERROR, { error });
                    }
                }),
                [MODULE.ACTION_SELECT]: firestoreAction((context, id) => {
                    try {
                        context.unbindFirestoreRef(MODULE.STATE_SELECTED)
                        const doituong = context.getters[MODULE.GETTER_LIST].find(e => e.id == id);
                        if (doituong) {
                            context.commit(MODULE.MUTATION_SELECT, doituong)
                        }
                        return context.bindFirestoreRef(MODULE.STATE_SELECTED, MODULE.DOCUMENT.collection.doc(id))
                    } catch (error) {
                        context.dispatch(PUSH_ERROR, { error });
                    }
                }),
                [MODULE.ACTION_UPDATE]: firestoreAction((context, data) => {
                    try {
                        MODULE.DOCUMENT.update(context.getters[MODULE.GETTER_SELECTED].id, data).then(() => {
                            context.dispatch(PUSH_TOAST, {
                                message: 'Đã lưu',
                                type: SUCCESS
                            })
                        }).catch((error) => {
                            context.dispatch(PUSH_ERROR, { error })
                        })
                    } catch (error) {
                        context.dispatch(PUSH_ERROR, { error });
                    }
                }),
                [MODULE.ACTION_DELETE]: firestoreAction((context) => {
                    try {
                        return MODULE.DOCUMENT.destroy(context.getters[MODULE.GETTER_SELECTED].id).then(function () {
                            context.dispatch(PUSH_TOAST, {
                                message: 'Đã xóa',
                                type: WARNING
                            })
                        }).catch((error) => {
                            context.dispatch(PUSH_ERROR, { error })
                        })
                    } catch (error) {
                        context.dispatch(PUSH_ERROR, { error });
                    } finally {
                        context.commit(MODULE.MUTATION_PURGE_SELECT);
                    }
                }),
            };

            const defaultMutations = {
                [MODULE.MUTATION_PANE_SIZE](state, size) {
                    state.detailPanSize = size
                },
                [MODULE.MUTATION_SELECT](state, data) {
                    state[MODULE.STATE_SELECTED] = data
                },
                [MODULE.MUTATION_UPDATE](state, data) {
                    state[MODULE.STATE_SELECTED] = { ...state[MODULE.STATE_SELECTED], data }
                },
                [MODULE.MUTATION_ACTIVE_TAB](state, index) {
                    state.activeTab = index
                },
                [MODULE.MUTATION_PURGE_SELECT](state) {
                    state[MODULE.STATE_SELECTED] = defaultAttribute
                },
            };

            // Add the module to our modules object.
            module[modulePath] = {
                state: {
                    ...defaultState,
                    ...moduleDefinition.default.state,
                },
                actions: {
                    ...defaultActions,
                    ...moduleDefinition.default.actions,

                },
                mutations: {
                    ...defaultMutations,
                    ...moduleDefinition.default.mutations,

                },
                getters: {
                    ...defaultGetters,
                    ...moduleDefinition.default.getters,
                },
            }
        })
    })()

// Recursively get the namespace of an module, even if nested.
function getNamespace(subtree, path) {
    if (path.length === 1) return subtree

    const namespace = path.shift()
    subtree[namespace] = {
        ...subtree[namespace],
    }
    return getNamespace(subtree[namespace], path)
}

export default modules
