<template>
  <div class="productList">
    <div class="beijingse">
      <div class="biaotiBK">
        <el-row>
          <el-col :span="5" class="logoBK">
            <span class="logoZT">{{msg}}</span>
          </el-col>
          <el-col :span="15" class="searchbarBK">
            <el-input placeholder="请输入" v-model="params" @keyup.enter.native="keySearch($event)"></el-input>
          </el-col>
          <el-col :span="4" class="searchbtnBK">
            <el-button type="success" @click="butSearch()">搜索</el-button>
          </el-col>
        </el-row>
      </div>
      <br>
      <table class="biaogeBK">
        <tr v-for="(item, key) in list">
          <td class="geziBK" v-for="(sitem, skey) in item">
            <div v-if="sitem.img">
              <a href="#">
                <img class="tupianBK" :src="sitem.img">
              </a>
              <div class="nameBK">
                <span class="nameZT" v-html="sitem.name"></span>
              </div>
              <div class="priceBK">
                <span class="priceZT">${{sitem.price}}</span>
              </div>
              <div class="producerBK">
                <span class="producerZT">{{sitem.producer}}</span>
              </div>
            </div>
          </td>
        </tr>
      </table>
      <div class="fenyetiao">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="currentSize"
          :total="currentTotal"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "ProductList",
  data() {
    return {
      msg: "聚滑算",
      params: "",
      currentPage: 1,
      currentSize: 20,
      currentTotal: 0,
      list: []
    };
  },
  methods: {
    keySearch(event) {
      if (event.keyCode == 13) {
        this.butSearch();
      }
    },
    butSearch() {
      this.list = [];
      var url =
        "/product/findByName?page=" +
        this.currentPage +
        "&size=" +
        this.currentSize +
        "&name=" +
        this.params;
      this.$http.get(url).then(
        response => {
          this.currentTotal = response.data.total;
          var result = response.data.list;
          var temp = [];
          var isend = false;
          for (var i = 0; i < this.currentSize; i++) {
            if (result[i]) {
              temp.push(result[i]);
            } else {
              temp.push([]);
              isend = true;
            }
            if ((i + 1) % 5 == 0) {
              if (isend) {
                this.list.push(temp);
                temp = [];
                break;
              }
              this.list.push(temp);
              temp = [];
            }
          }
          console.info(this.list);
          temp = [];
        },
        error => {
          console.info(error);
        }
      );
    },
    deleteProduct(key) {
      var pro = this.list[key];
      var url = "/product/delete";
      this.$http
        .post(url, pro)
        .then(response => {
          this.list.splice(key, 1);
        })
        .catch(error => {
          console.info(error);
        });
    },
    handleSizeChange(val) {
      this.currentSize = val;
      this.butSearch();
    },
    handlePageChange(val) {
      this.currentPage = val;
      this.butSearch();
    }
  },
  mounted() {
    this.butSearch();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.beijingse {
  background-color: #c0dba3;
}
.fenyetiao {
  width: 650px;
  height: 20px;
  margin: 0 auto;
  bottom: 50px;
  position: fixed;
  right: 0px;
  left: 0px;
}
.biaotiBK {
  width: 750px;
  height: 20px;
  margin: 0 auto;
  padding-top: 5px;
  padding-bottom: 5px;
}
.logoBK {
  padding-left: 15px;
  padding-top: 4px;
  width: 100px;
  height: 40px;
  background-color: green;
}
.searchbarBK {
  padding-left: 50px;
  width: 420px;
}
.searchbtnBK {
  padding-left: 5px;
}
.biaogeBK {
  width: 750px;
  margin: 0 auto;
}
.geziBK {
  border: 1px solid green;
  width: 150px;
}
.tupianBK {
  width: 150px;
  height: 150px;
}
.nameBK {
  width: 150px;
  height: 50px;
}
.priceBK {
  width: 150px;
  height: 30px;
}
.producerBK {
  width: 150px;
  height: 20px;
}
.logoZT {
  color: #ffffff;
  font-size: 23px;
}
.nameZT {
  font-size: 8px;
  color: 1px solid green;
  font-family: "Microsoft YaHei";
}
.priceZT {
  font-size: 20px;
  color: #009a61;
}
.producerZT {
  font-size: 10px;
  float: right;
  color: #009a61;
}
</style>
