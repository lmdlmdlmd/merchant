<template>
  <view class="checkQueryListBox">
    <view class="content">
      <view class="orderBox">
        <zz-empty v-if="!dataSource.length" title="还没有账单哦～"></zz-empty>
        <view
          v-for="(item, index) of dataSource"
          :key="index"
          class="orderDiv"
          @click="handleDetail(item.id)"
        >
          <van-row class="dataHeader">
            <van-col span="18" class="order_title"
              >对账单号：<text class="sn">{{ item.sn }}</text></van-col
            >
            <van-col span="6" class="tel_right">
              <span
                class="mark"
                :style="{
                  background: item.status == 1 ? '#ff4c0f' : '#52C41A',
                }"
              ></span>
              <text class="order_type">{{ handleStatus(item.status) }}</text>
            </van-col>
          </van-row>
          <!-- :class="isShow ? 'shadow' : ''" -->
          <van-row class="dataCon">
            <van-col span="6" class="lavelBox"
              ><p class="lavel">对账日期</p>
              <p class="val">{{ item.checkDate }}</p></van-col
            >
            <van-col span="6" class="lavelBox"
              ><p class="lavel">货款截止日期</p>
              <p class="val">{{ item.expirationDate }}</p></van-col
            >
            <van-col span="6" class="lavelBox"
              ><p class="lavel">实返金额</p>
              <p class="val">{{ item.money }}</p></van-col
            >
            <van-col span="6" class="lavelBox moreBox">
              <van-dropdown-menu>
                <van-dropdown-item title="筛选" ref="item">
                  <view class="moreBody">
                    <van-row class="moreDiv">
                      <van-col span="8">
                        <p class="lavel">货款金额</p>
                        <p class="val">¥{{ item.loanAmount }}</p>
                      </van-col>
                      <van-col span="8">
                        <p class="lavel">扣费金额</p>
                        <p class="val">¥{{ item.deductionAmount }}</p>
                      </van-col>
                      <van-col span="8">
                        <p class="lavel">货款金额</p>
                        <p class="val">¥{{ item.refundAmount }}</p>
                      </van-col>
                    </van-row>
                    <van-row class="moreDiv">
                      <van-col span="8">
                        <p class="lavel">退货金额</p>
                        <p class="val">¥{{ item.returnsAmount }}</p>
                      </van-col>
                      <van-col span="8">
                        <p class="lavel">费用金额</p>
                        <p class="val">¥{{ item.costAmount }}</p>
                      </van-col>
                      <van-col span="8">
                        <p class="lavel">垫付金额</p>
                        <p class="val">¥{{ item.paymentAmount }}</p>
                      </van-col>
                    </van-row>
                  </view>
                </van-dropdown-item>
              </van-dropdown-menu>
              <!-- <text class="more">明细</text>
              <van-icon class="arrow-down" name="arrow-down" /> -->
            </van-col>
          </van-row>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "List",
  props: {
    active: {
      type: Number,
    },
  },
  components: {},
  data() {
    return {
      dataSource: [],
    };
  },
  mounted() {
    //根据active查询类型
    // console.log("active", this.active);
    switch (this.active) {
      case 0: {
        this.dataSource = [
          {
            id: 1,
            status: "1",
            sn: "XSDH-202103010002",
            checkDate: "2021/03/21",
            expirationDate: "2021/04/21",
            money: "200.00",
            loanAmount: "100.00",
            deductionAmount: "100.00",
            refundAmount: "100.00",
            returnsAmount: "100.00",
            costAmount: "100.00",
            paymentAmount: "100.00",
          },
          {
            id: 2,
            status: "2",
            sn: "XSDH-202103010002",
            checkDate: "2021/03/21",
            expirationDate: "2021/04/21",
            money: "200.00",
            loanAmount: "100.00",
            deductionAmount: "100.00",
            refundAmount: "100.00",
            returnsAmount: "100.00",
            costAmount: "100.00",
            paymentAmount: "100.00",
          },
          {
            id: 3,
            status: "1",
            sn: "XSDH-202103010002",
            checkDate: "2021/03/21",
            expirationDate: "2021/04/21",
            money: "200.00",
            loanAmount: "100.00",
            deductionAmount: "100.00",
            refundAmount: "100.00",
            returnsAmount: "100.00",
            costAmount: "100.00",
            paymentAmount: "100.00",
          },
        ];
        break;
      }
      case 1: {
        this.dataSource = [
          {
            id: 2,
            status: "2",
            sn: "XSDH-202103010002",
            checkDate: "2021/03/21",
            expirationDate: "2021/04/21",
            money: "200.00",
            loanAmount: "100.00",
            deductionAmount: "100.00",
            refundAmount: "100.00",
            returnsAmount: "100.00",
            costAmount: "100.00",
            paymentAmount: "100.00",
          },
        ];
        break;
      }
      case 2: {
        this.dataSource = [
          { id: 2, status: "2", sn: "JQDY-202103020002", number: "1" },
        ];
        break;
      }
    }
  },
  methods: {
    handleStatus(status) {
      let type = "";
      switch (status) {
        case "1": {
          type = "待确认";
          break;
        }
        case "2": {
          type = "已确认";
          break;
        }
      }
      return type;
    },
  },
};
</script>

<style lang="less" scoped>
.checkQueryListBox {
  background: #f5f5f5;
  min-height: 100vh;
}
.content {
  margin: 10px auto 68upx;
  .orderBox {
    margin-top: 10px;
  }
}
.orderDiv {
  border-top: 1px solid #dddddd;
  background: #fafafa;
  padding-bottom: 10px;
  margin-top: 10px;
}
.dataHeader {
  margin: 10px auto 6px;
  width: calc(100% - 40px);
  font-size: 14px;
  color: #000;
}
.tel_right {
  text-align: right;
}
.mark {
  width: 8px;
  height: 8px;
  background: #ff4c0f;
  display: inline-block;
  border-radius: 20px;
  margin-right: 8px;
}
.dataCon {
  font-size: 12px;
  color: #1e1e1e;
  text-align: center;
  border: 1px solid #eeeeee;
  margin: 10px auto 6px;
  width: calc(100% - 20px);
  padding: 10px 0;
  border-radius: 6px;
  .val {
    margin-top: 7px;
    color: #9a9a9a;
  }
  .lavelBox {
    // text-align: center;
    // padding-right: 10px;
  }
}
.order_type {
  color: #a7a7a7;
  font-size: 12px;
}
.moreBox {
  margin-top: 7px;
  color: #fa6400;
  font-size: 12px;
  .more {
    margin-right: 10px;
  }
}
.moreBody {
  width: calc(100% - 40px);
  margin: 0 auto;
  border-radius: 6px;
  padding-bottom: 12px;
  border-top: 1px dashed #e0c587;
  background: -webkit-linear-gradient(left, #b98300 0%, #ffffff 100%);
  background: linear-gradient(to bottom, #ffeab6 0%, #fffaee 100%);
}
.moreDiv {
  text-align: center;
  margin-top: 15px;
  padding-bottom: 10px;
  .lavel {
    color: #999999;
    font-size: 12px;
  }
  .val {
    color: #333333;
    font-size: 14px;
    margin-top: 10px;
  }
}
// .shadow {
//   box-shadow: 0px 3px 2px rgb(0 0 0 / 33%);
// }
</style>
<style lang="less">
/deep/.van-dropdown-menu__bar {
  height: auto;
  background: rgba(0, 0, 0, 0);
  box-shadow: 0px 0px 0px rgb(0 0 0 / 33%);
}
/deep/.van-dropdown-menu__title {
  color: #fa6400;
  font-size: 12px;
}
/deep/.van-dropdown-item--down {
  margin-top: 20px;
}
/deep/.van-dropdown-item__content {
  padding-bottom: 20px;
}
</style>