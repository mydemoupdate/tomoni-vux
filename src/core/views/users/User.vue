<template>
  <CRow>
    <CCol col="12" lg="6">
      <CCard>
        <CCardHeader>User id: {{ $route.params.id }}</CCardHeader>
        <CCardBody>
          <CDataTable striped small fixed :items="visibleData" :fields="fields" />
          <Treeselect :options="options" :multiple="true" />
        </CCardBody>
        <CCardFooter>
          <CButton color="primary" @click="goBack">Back</CButton>
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import usersData from "./UsersData";
export default {
  name: "User",
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.usersOpened = from.fullPath.includes("users");
    });
  },
  data() {
    return {
      usersOpened: null,
      options: [
        {
          id: "fruits",
          label: "Fruits",
          children: [
            {
              id: "apple",
              label: "Apple 🍎",
              isNew: true,
            },
            {
              id: "grapes",
              label: "Grapes 🍇",
            },
            {
              id: "pear",
              label: "Pear 🍐",
            },
            {
              id: "strawberry",
              label: "Strawberry 🍓",
            },
            {
              id: "watermelon",
              label: "Watermelon 🍉",
            },
          ],
        },
        {
          id: "vegetables",
          label: "Vegetables",
          children: [
            {
              id: "corn",
              label: "Corn 🌽",
            },
            {
              id: "carrot",
              label: "Carrot 🥕",
            },
            {
              id: "eggplant",
              label: "Eggplant 🍆",
            },
            {
              id: "tomato",
              label: "Tomato 🍅",
            },
          ],
        },
      ],
    };
  },
  computed: {
    fields() {
      return [
        { key: "key", label: this.username, _style: "width:150px" },
        { key: "value", label: "", _style: "width:150px;" },
      ];
    },
    userData() {
      const id = this.$route.params.id;
      const user = usersData.find((user, index) => index + 1 == id);
      const userDetails = user ? Object.entries(user) : [["id", "Not found"]];
      return userDetails.map(([key, value]) => {
        return { key, value };
      });
    },
    visibleData() {
      return this.userData.filter((param) => param.key !== "username");
    },
    username() {
      return this.userData.filter((param) => param.key === "username")[0].value;
    },
  },
  methods: {
    goBack() {
      this.usersOpened
        ? this.$router.go(-1)
        : this.$router.push({ path: "/users" });
    },
  },
};
</script>
