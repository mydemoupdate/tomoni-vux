<template>
  <div></div>
</template>

<script>
export default {
  name: "GlobalManagement",
  created() {
    this.$store.dispatch("tinhchat.bind");
    this.$store.dispatch("httk.bind");
    this.$store.dispatch("phongban.bind");
    this.$store.dispatch("loaiccdc.bind");
    this.$store.dispatch("loaitscd.bind");
    this.$store.dispatch("vthh.bind");
    this.$store.dispatch("kho.bind");
    this.$store.dispatch("donvi.bind");
    this.$store.dispatch("kmcp.bind");
    this.$store.dispatch("nganhang.bind");
    this.$store.dispatch("taikhoannganhang.bind");
    this.$store.dispatch("loaichungtu.bind");
    this.$store.dispatch("loaitien.bind");
    this.$store.dispatch("mucthuchi.bind");
    this.$store.dispatch("loaidoituong.bind");
    this.$store.dispatch("doituong.bind");
    this.$store.dispatch("chungtu.phieuthu.bind");
  },
};
</script>