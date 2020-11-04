<template>
  <CRow class="mx-1">
    <CCol col="7">
      <CForm class="size-sm">
        <CInput
          size="sm"
          label="Mã đối tượng"
          :value="obj.id"
          @update:value="updateId"
        />
        <CInput size="sm" label="Tên khách hàng" :value.sync="obj.ten" />
        <CInput size="sm" label="Địa chỉ" :value.sync="obj.diachi" />
        <CInput size="sm" label="Số điện thoại" :value.sync="obj.dienthoai" />
        <CInput size="sm" label="Mã số thuế" :value.sync="obj.masothue" />
      </CForm>
    </CCol>
    <CCol col="5" class="line-left">
      <CForm class="size-sm">
        <CSelect
          size="sm"
          label="Đơn vị"
          :options="listPhongBan"
          :value.sync="obj.donvi.id"
        />
        <CSelect
          size="sm"
          label="Loại đối tượng"
          :options="listLoaiDoiTuong"
          :value.sync="obj.loai.id"
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
      obj: "doituong.selected",
      listPhongBan: 'phongban.cselect',
      listLoaiDoiTuong: 'loaidoituong.cselect',
    }),
  },
  methods: {
    updateId(id) {
      this.id = id;
    },
    create() {
      this.$store.dispatch("doituong.create", { ...this.obj, id: this.id });
    },
    save() {
      this.$store.dispatch("doituong.update", this.obj);
    },
    destroy() {
      this.$store.dispatch("doituong.delete");
    },
  },
};
</script>
