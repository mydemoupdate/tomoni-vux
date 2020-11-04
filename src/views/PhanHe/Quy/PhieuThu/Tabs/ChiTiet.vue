<template>
  <CRow class="mx-1">
    <CCol col="8">
      <CForm class="size-sm">
        <CSelect
          size="sm"
          label="Loại chứng từ"
          :options="listLoaiCT"
          :value.sync="obj.loai.id"
        />
        <CInput size="sm" label="Lý do" :value.sync="obj.lydo" />
        <CSelect
          size="sm"
          label="Đối tượng"
          :options="listDoiTuong"
          :value.sync="obj.doituong.id"
        />
      </CForm>
    </CCol>
    <CCol col="4" class="line-left">
      <CForm class="size-sm">
        <CInput
          size="sm"
          type="date"
          label="Ngày hạch toán"
          :value.sync="obj.ngayhachtoan"
        />
        <CInput
          size="sm"
          type="date"
          label="Ngày chứng từ"
          :value.sync="obj.ngaychungtu"
        />
        <CInput size="sm" label="Số chứng từ" :value.sync="obj.id" />
      </CForm>
    </CCol>
  </CRow>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TabChiTietPhieuThu",
  computed: {
    ...mapGetters({
      obj: "chungtu.phieuthu.selected",
      listLoaiCT: "loaichungtu.cselect",
      listDoiTuong: "doituong.cselect",
    }),
  },
  methods: {
    create() {
      this.$store.dispatch("chungtu.phieuthu.create", {
        ...this.obj,
        hachtoan: [],
      });
    },
    save() {
      this.$store.dispatch("chungtu.phieuthu.update", this.obj);
    },
    destroy() {
      this.$store.dispatch("chungtu.phieuthu.delete");
    },
  },
};
</script>
