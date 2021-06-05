<template>
  <view class="sheetBox">
    <van-action-sheet v-model="show">
      <view class="content">
        <van-row class="cl_title">
          <van-col span="4" @click="handleClose">
            <image
              src="../../../static/img/icon/close.png"
              class="close_img"
            ></image>
          </van-col>
          <van-col span="16" class="title"> 选择商品 </van-col>
          <van-col span="4"></van-col>
        </van-row>
        <van-row class="all_select">
          <van-col span="6" class="select_box">
            <van-checkbox
              @change="handleAllChange"
              v-model="checked"
              class="subm_che"
              >全选</van-checkbox
            >
          </van-col>
          <van-col span="18" class="searchBox">
            <input
              class="srarch_input"
              v-model="search"
              placeholder="请输入品名或规格/型号"
            />
            <image
              src="../../../static/img/icon/search1.png"
              class="search_img"
              @click="handleSearch"
            ></image>
          </van-col>
        </van-row>
        <view class="operBox">
          <Operate
            :number="number"
            :type="type"
            @handleAdd="handleAdd"
            @handleDel="handleDel"
            @handleConfirm="handleConfirm"
          />
        </view>
        <div v-show="data.length" class="goods_body">
          <view v-for="(item, index) of data" :key="index" class="goods_div">
            <van-row class="goods_box">
              <van-col span="2">
                <van-checkbox
                  class="checkbox"
                  :id="'checkbox' + index"
                  v-model="item.checked"
                  @change="handlecheck(index)"
                ></van-checkbox>
              </van-col>
              <van-col span="22" class="good_name">
                {{ item.name }}
              </van-col>
            </van-row>
            <van-row class="goods_box">
              <van-col span="4" class="good_lable"> 价格 </van-col>
              <van-col span="20" class="good_val"> ¥{{ item.money }} </van-col>
            </van-row>
            <van-row class="goods_box">
              <van-col span="4" class="good_lable"> 规格 </van-col>
              <van-col span="20" class="good_val">
                {{ item.spec }}
              </van-col>
            </van-row>
            <van-row class="goods_box">
              <van-col span="4" class="good_lable"> 型号 </van-col>
              <van-col span="20" class="good_val">
                {{ item.model }}
              </van-col>
            </van-row>
          </view>
        </div>
        <view class="sub_box">
          <van-button
            type="primary"
            class="reset"
            @click="handleAllChange('search')"
            >重置</van-button
          >
          <van-button
            type="primary"
            class="determine"
            @click.stop="handleSubmit"
            >确定</van-button
          >
        </view>
      </view>
    </van-action-sheet>
  </view>
</template>

<script>
import Operate from "../../components/operate";
import { Toast } from "vant";
export default {
  name: "selectGoods",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Operate,
  },
  data() {
    return {
      checked: false,
      search: "",
      number: 0,
      type: "爆炸签",
      data: [
        {
          id: 1,
          name:
            "Greatpal北极光车载家用桌面空气雾化器加湿器加送USB风扇和LED灯条GP0909",
          spec: "2038450",
          money: "999.00 ",
          model: "SFIP99200U990",
          checked: false,
        },
        {
          id: 2,
          name: "实木沙发北欧组合现代简约新中式客厅家具组",
          spec: "2038450",
          money: "999.00 ",
          model: "SFIP99200U990",
          checked: false,
        },
      ],
    };
  },

  methods: {
    //获取到价签类型
    handleConfirm(type) {
      console.log(type);
      this.type = type;
    },
    handleAdd() {
      this.number++;
    },

    handleDel() {
      if (this.number == 0) {
        return;
      }
      this.number--;
    },
    //查询
    handleSearch() {
      console.log("通过" + this.search + "查询");
    },
    //关闭
    handleClose() {
      this.$emit("isShow");
    },
    //全选
    handleAllChange(val) {
      console.log(this.checked);
      this.data.map((item) => {
        item.checked = this.checked ? true : false;
      });
      if (val) {
        this.search = "";
      }
    },
    //选择数据
    handlecheck(index) {
      // this.data[index].checked = !this.data[index].checked;
      if (!this.data.some((item) => !item.checked)) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
    handleSubmit() {
      if (this.number == 0) {
        console.log(uni.showToast);
        Toast("请至少选择打印一条");
        return;
      }
      if (!this.type) {
        Toast("请选择类型");
        return;
      }
      let dataArr = [];
      this.data.map((item) => {
        if (item.checked) {
          dataArr.push(item.id);
          item.checked = false;
        }
      });
      if (dataArr.length == 0) {
        Toast("请至少选择一条数据");
        return;
      } else {
        this.$emit("goods", dataArr);
        this.handleClose();
      }
      this.checked = false;
    },
  },
};
</script>

<style lang="less" scoped>
.sheetBox {
  .content {
    .cl_title {
      width: calc(100% - 48px);
      margin: 15px auto 33px;
    }
    .close_img {
      width: 26px;
      height: 26px;
    }
    .title {
      text-align: center;
      font-size: 16px;
      color: #1e1e18;
    }
    .all_select {
      width: calc(100% - 40px);
      margin: 0 auto 15px;
      .select_box {
        margin-top: 6px;
      }
    }
    .subm_che {
      margin-left: 20px;
      color: rgba(0, 0, 0, 0.5);
      font-size: 12px;
    }
    .searchBox {
      position: relative;
    }
    .srarch_input {
      border: none;
      outline: none;
      background: #eeeeee;
      border-radius: 20px;
      line-height: 32px;
      height: 32px;
      text-indent: 19px;
      font-size: 14px;
    }
    .search_img {
      position: absolute;
      width: 13px;
      height: 13px;
      top: 9px;
      right: 22px;
    }
    .goods_body {
      width: calc(100% - 40px);
      margin: 0 auto;
    }
    .goods_div {
      border: 1px solid #d3d3d3;
      padding: 10px 20px;
      border-radius: 8px;
      margin-top: 10px;
      .goods_box {
        margin-top: 5px;
        .good_name {
          padding-left: 12px;
          color: #1e1e1e;
          font-size: 12px;
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          line-clamp: 1;
          -webkit-box-orient: vertical;
          /* width: auto; */
          height: 20px;
          word-break: break-all;
        }
        .good_lable {
          font-size: 12px;
          color: #1e1e1e;
        }
        .good_val {
          text-align: right;
          font-size: 12px;
          color: #1e1e1e;
        }
      }
    }
    .sub_box {
      margin: 43px auto 38px;
      width: calc(100% - 60px);
      text-align: right;
      .reset,
      .determine {
        color: #000;
        background: #dddddd;
        border: none;
        outline: none;
        padding: 3px 23px;
        border-radius: 4px;
        margin-right: 22px;
        height: 32px;
      }
      .determine {
        background: #1890ff;
        margin-right: 0px;
        color: #fff;
      }
    }
  }
  .operBox {
    width: calc(100% - 20px);
    margin: 22px auto 38px;
  }
}
</style>
<style lang="less">
/deep/ .searchBox .uni-input-placeholder {
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  display: none;
}

.van-checkbox__icon--checked .van-icon-success::before {
  content: "";
  display: inline-block;
  background: url("../../../static/img/icon/unselected.png");
  background-size: 100% 100%;
  width: 15px;
  height: 15px;
  background-repeat: no-repeat;
}
.van-icon-success::before {
  content: "";
  display: inline-block;
  background-image: url("../../../static/img/icon/unselected.png");
  background-size: 100% 100%;
  width: 15px;
  height: 15px;
  background-repeat: no-repeat;
}
// .van-checkbox__icon--round .van-icon {
//   border: none !important;
//   background-color: rgba(0, 0, 0, 0) !important;
// }
.van-checkbox__icon--checked .van-icon {
  border: none !important;
  background-color: rgba(0, 0, 0, 0) !important;
}
.van-checkbox__icon .van-icon {
  border: none !important;
  background-color: rgba(0, 0, 0, 0) !important;
}
// /deep/.addSheet .add_opr {
//   width: 60%;
//   margin: 0 auto;
//   font-size: 14px;
//   font-weight: 600;
//   color: #0091ff;
//   padding-bottom: 10px;
//   margin-top: 20px;
//   .con {
//     text-align: right;
//   }
// }
// /deep/.addSheet .van-picker-column__item--selected {
//   color: #0091ff;
// }
</style>