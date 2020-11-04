<template>
  <CTabs
    addNavWrapperClasses="menu"
    @update:activeTab="setActiveTab"
    :activeTab="activeTab"
  >
    <CTab title="Chi tiết" active>
      <DetailTab ref="detailTab" />
    </CTab>
    <CTab title="Hạch toán" :disabled="!selected">
      <HachToanTab ref="hachToanTab" />
    </CTab>
    <template>
      <CNav v-if="activeTab === 0" class="line-left hidden-in-tab-content">
        <CButton @click="$refs.detailTab.create()">
          <CIcon name="cil-plus" v-c-tooltip="'Create'" />
        </CButton>
        <CButton @click="$refs.detailTab.save()">
          <CIcon name="cil-save" v-c-tooltip="'Save'" />
        </CButton>
        <CButton @click="$refs.detailTab.destroy()">
          <CIcon name="cil-trash" v-c-tooltip="'Delete'" />
        </CButton>
      </CNav>
      <CNav v-if="activeTab === 1" class="line-left hidden-in-tab-content">
        <CButton @click="$refs.hachToanTab.create()">
          <CIcon name="cil-plus" v-c-tooltip="'Create'" />
        </CButton>
        <CButton @click="$refs.hachToanTab.save()">
          <CIcon name="cil-save" v-c-tooltip="'Save'" />
        </CButton>
        <CButton @click="$refs.hachToanTab.destroy()">
          <CIcon name="cil-trash" v-c-tooltip="'Delete'" />
        </CButton>
      </CNav>
    </template>
  </CTabs>
</template>

<script>
import DetailTab from "./Tabs/ChiTiet";
import HachToanTab from "./Tabs/HachToan";
import { mapGetters } from "vuex";

export default {
  name: "ChiTietPhieuThu",
  components: {
    DetailTab,
    HachToanTab,
  },
  computed: {
    ...mapGetters({
      activeTab: "chungtu.phieuthu.tab",
      selected: "chungtu.phieuthu.wasselected",
    }),
  },
  methods: {
    setActiveTab(index) {
      this.$store.commit("chungtu.phieuthu.tab", index);
    },
  },
};
</script>
