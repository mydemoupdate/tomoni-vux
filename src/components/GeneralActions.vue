<template>
  <CNav>
    <CButton @click="showCreate">
      <CIcon name="cil-plus" v-c-tooltip="'Create'" />
    </CButton>
    <CButton @click="callImport">
      <CIcon name="cil-arrow-thick-to-bottom" v-c-tooltip="'Import'" />
    </CButton>
    <CButton @click="callExport">
      <CIcon name="cil-arrow-thick-to-top" v-c-tooltip="'Export'" />
    </CButton>
    <CButton @click="fresh">
      <CIcon
        name="cil-recycle"
        class="text-danger"
        v-c-tooltip="'Reset data'"
      />
    </CButton>
    <slot></slot>
    <ExportXlsx
      v-show="false"
      ref="export"
      :sheets="sheets"
      :filename="fileExportName"
    />
    <ImportXlsx v-show="false" ref="import" @import="onImport" />
  </CNav>
</template>

<script>
export default {
  name: "GeneralActions",
  props: {
    fileExportName: {
      type: String,
      required: false,
      default: "Data",
    },
    sheetName: {
      type: String,
      required: false,
      default: "Sheet",
    },
    collection: {
      type: Object,
      required: false,
    },
    storeName: {
      type: String,
      required: true,
    },
  },
  computed: {
    dataExport() {
      return this.$store.getters[this.storeName + ".dataexport"];
    },
    sheets() {
      return [
        {
          name: this.sheetName,
          data: this.dataExport,
        },
      ];
    },
  },
  methods: {
    fresh() {
      this.collection.init();
    },
    showCreate() {
      this.$store.commit(this.storeName + ".panesize", 70);
      this.$store.commit(this.storeName + ".purgeselect");
    },
    callExport() {
      this.$refs.export.download();
    },
    callImport() {
      this.$refs.import.show();
    },
    onImport(data) {
      this.$store.dispatch(this.storeName + ".import", data);
    },
  },
};
</script>
