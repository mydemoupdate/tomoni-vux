<template>
  <CTabs
    addNavWrapperClasses="menu"
    @update:activeTab="setActiveTab"
    :activeTab="activeTab"
  >
    <CTab title="Chi tiết" active>
      <DetailTab ref="detailTab" />
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
    </template>
  </CTabs>
</template>

<script>
import DetailTab from "./Tabs/ChiTiet";
import { mapGetters } from "vuex";

export default {
  name: "Detail",
  components: {
    DetailTab,
  },
  computed: {
    ...mapGetters({
      activeTab: "httk.tab",
    }),
  },
  methods: {
    setActiveTab(index) {
      this.$store.commit("httk.tab", index);
    },
  },
};
</script>
