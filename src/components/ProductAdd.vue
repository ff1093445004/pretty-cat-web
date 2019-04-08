<template>
  <div class="productAdd">
    <h2>{{ msg }}</h2>名称:
    <input type="text" value="name" v-model="product.name">
    <br>描述:
    <input type="text" value="desc" v-model="product.desc">
    <br>价格:
    <input type="text" value="price" v-model="product.price">
    <br>生产:
    <input type="text" value="producer" v-model="product.producer">
    <br>标签:
    <input type="text" value="tagstr" v-model="product.tagstr">
    <br>
    <button @click="saveData()">保存</button>
  </div>
</template>

<script>
export default {
  name: "ProductAdd",
  data() {
    return {
      msg: "商品添加",
      product: {
        name: "",
        desc: "",
        price: 0,
        tagstr: "",
        tags: []
      }
    };
  },
  methods: {
    saveData() {
      var url = "/product/save";
      this.product.tags = this.product.tagstr.split(",");
      this.$http
        .post(url, this.product)
        .then(res => {
          this.product = {
            name: "",
            desc: "",
            price: 0,
            tagstr: "",
            tags: []
          };
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
</style>
