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
            <template #loai="{ item }">
              <td>{{ item.loai.ten }}</td>
            </template>
            <template #doituong="{ item }">
              <td>{{ item.doituong.ten }}</td>
            </template>
            <template #loai-filter>
              <CSelect
                size="sm"
                class="mb-0"
                :options="listLoaiChungTu"
                :value.sync="filter.loai.value"
              />
            </template>
            <template #doituong-filter>
              <CInput
                size="sm"
                class="mb-0"
                :value.sync="filter.doituong.value"
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
  name: "PhieuThu",
  components: {
    Detail,
  },
  data() {
    return {
      fields: this.lodash.getTableFields(Documents.chungtu.phieuthu),
      filter: {
        loai: {
          value: null,
          keyFilter: "id",
          condition: "=",
        },
        doituong: {
          value: null,
          keyFilter: "ten",
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "chungtu.phieuthu.list",
      detailPaneSize: "chungtu.phieuthu.panesize",
      listLoaiChungTu: "loaichungtu.cselect",
    }),
    items() {
      return this.lodash.advancedFilter(this.list, this.filter);
    },
  },
  methods: {
    showDetail(obj) {
      this.$store.commit("chungtu.phieuthu.panesize", 50);
      this.$store.dispatch("chungtu.phieuthu.select", obj.id);
    },
    onPaneResized(panes) {
      this.$store.commit("chungtu.phieuthu.panesize", panes[1].size);
    },
  },
};
</script>