<template>
  <CRow>
    <CCol col="12" class="p-0">
      <Splitpanes
        class="default-theme"
        horizontal
        style="height: 84vh"
        @resized="onPaneResized"
      >
        <Pane :size="100 - detailPaneSize">
          <AdvancedTable
            :fields="fields"
            :items="items"
            :columnFilter="true"
            @row-clicked="showDetail"
          >
            <template #tinhchat="{ item }">
              <td>{{ item.tinhchat.ten }}</td>
            </template>
            <template #tinhchat-filter>
              <CSelect
                size="sm"
                class="mb-0"
                :options="listTinhChat"
                :value.sync="filter.tinhchat"
              />
            </template>
          </AdvancedTable>
        </Pane>
        <Pane :size="detailPaneSize">
          <Detail />
        </Pane>
      </Splitpanes>
    </CCol>
  </CRow>
</template>

<script>
import { mapGetters } from "vuex";
import Detail from "./Detail";
import Documents from "@/firestore/documents";

export default {
  name: "HTTK",
  components: {
    Detail,
  },
  data() {
    return {
      fields: this.lodash.getTableFields(Documents.httk),
      filter: {
        tinhchat: null,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "httk.list",
      listTinhChat: "tinhchat.cselect",
      detailPaneSize: "httk.panesize",
    }),
    items() {
      return this.list.filter((item) => {
        return this.filter.tinhchat
          ? item.tinhchat.id == this.filter.tinhchat
          : true;
      });
    },
  },
  methods: {
    showDetail(obj) {
      this.$store.commit("httk.panesize", 50);
      this.$store.dispatch("httk.select", obj.id);
    },
    onPaneResized(panes) {
      this.$store.commit("httk.panesize", panes[1].size);
    },
  },
};
</script>