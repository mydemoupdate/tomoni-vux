<template>
  <div>
    <section>
      <xlsx-workbook>
        <xlsx-sheet
          :collection="sheet.data"
          v-for="sheet in sheets"
          :key="sheet.name"
          :sheet-name="sheet.name"
        />
        <xlsx-download
          ref="xlsxDownload"
          :filename="filename + '.xlsx'"
        ></xlsx-download>
      </xlsx-workbook>
    </section>
  </div>
</template>

<script>
import { XlsxWorkbook, XlsxSheet, XlsxDownload } from "vue-xlsx";

export default {
  name: "ExportXlsx",
  components: {
    XlsxWorkbook,
    XlsxSheet,
    XlsxDownload,
  },
  props: {
    sheets: {
      type: Array,
      required: true,
    },
    filename: {
      type: String,
      required: false,
      default: "Export",
    },
  },
  methods: {
    download() {
      this.$refs.xlsxDownload.download();
    },
  },
};
</script>