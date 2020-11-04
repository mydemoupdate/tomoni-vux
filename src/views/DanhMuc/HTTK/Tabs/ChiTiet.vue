<template>
  <CRow class="mx-1">
    <CCol col="7">
      <CForm class="size-sm">
        <CInput
          size="sm"
          label="Số tài khoản"
          :value="obj.id"
          @update:value="updateId"
        />
        <CInput size="sm" label="Tên tài khoản" :value.sync="obj.ten" />
        <CSelect
          size="sm"
          label="Tính chất"
          :options="listTinhChat"
          :value.sync="obj.tinhchat.id"
        />
        <CSelect
          size="sm"
          label="Tài khoản tổng hợp"
          :options="listHTTK"
          :value.sync="obj.taikhoantonghop"
        />
      </CForm>
    </CCol>
  </CRow>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TabChiTiet",
  data() {
    return {
      id: null,
    };
  },
  computed: {
    ...mapGetters({
      obj: "httk.selected",
      listTinhChat: 'tinhchat.cselect',
      listHTTK: 'httk.cselect',
    }),
  },
  methods: {
    updateId(id) {
      this.id = id;
    },
    create() {
      this.$store.dispatch("httk.create", { ...this.obj, id: this.id });
    },
    save() {
      this.$store.dispatch("httk.update", this.obj);
    },
    destroy() {
      this.$store.dispatch("httk.delete");
    },
  },
};
</script>
