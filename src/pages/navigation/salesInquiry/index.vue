<template>
  <view class="salesInquiryBox">
    <zz-nav-bar
      title="销售查询"
      leftIcon="back"
      @click-right="rightClick"
    ></zz-nav-bar>

    <view class="content">
      <view class="selling_period">
        <p class="se_title">销售期间</p>
        <van-row class="data_select">
          <van-col span="11">
            <van-field
              readonly
              clickable
              name="datetimePicker"
              :value="dateStart"
              label=""
              placeholder="开始时间"
              @click="hanleUpdateDate('start')"
              :label-width="0"
              right-icon="notes-o"
              class="startData"
            />
          </van-col>
          <van-col span="2" class="interval">至</van-col>
          <van-col span="11">
            <van-field
              readonly
              clickable
              name="datetimePicker"
              :value="dateEnd"
              label=""
              placeholder="结束时间"
              @click="hanleUpdateDate('end')"
              :label-width="0"
              right-icon="notes-o"
              class="startData"
            />
          </van-col>
        </van-row>
      </view>
      <view class="orderBox">
        <zz-empty
          v-if="!dataSource.length"
          title="该期间还没有订单哦～"
        ></zz-empty>
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
                  background: item.type == '定金单' ? '#ff4c0f' : '#52C41A',
                }"
              ></span>
              <text class="order_type">{{ item.type }}</text>
            </van-col>
          </van-row>
          <van-row class="dataCon">
            <van-col span="8" class="lavelBox"
              ><p class="lavel">销售日期</p>
              <p class="val">{{ item.date }}</p></van-col
            >
            <van-col span="8" class="lavelBox"
              ><p class="lavel">销售凭证号</p>
              <p class="val">{{ item.card }}</p></van-col
            >
            <van-col span="8" class="lavelBox"
              ><p class="lavel">收款金额</p>
              <p class="val">{{ item.price }}</p></van-col
            >
          </van-row>
        </view>
      </view>
      <view class="footer"> <Footer active="navigation"></Footer></view>
    </view>
    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
      <view>
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title=""
          :min-date="minDate"
          :max-date="maxDate"
          visible-item-count="3"
          confirm-button-text="确定"
          cancel-button-text="取消"
          :formatter="formatter"
          @confirm="onConfirm"
          @cancel="show = false"
        />
      </view>
    </van-popup>
  </view>
</template>

<script>
import zzNavBar from "../../components/zz-nav-bar";
import Footer from "../../components/footer-nav";
import zzEmpty from "../../components/zz-empty";
export default {
  components: {
    zzNavBar,
    Footer,
    zzEmpty,
  },
  data() {
    return {
      show: false,
      type: "",
      dateStart: "",
      dateEnd: "",
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2999, 10, 1),
      currentDate: new Date(),
      dataSource: [
        {
          id: 1,
          sn: "XSDH-202103010002",
          type: "定金单",
          date: "2021/04/21",
          card: "9080797",
          price: "20099.00",
        },
        {
          id: 2,
          sn: "XSDH-202103010002",
          type: "销售单",
          date: "2021/04/21",
          card: "9080797",
          price: "20099.00",
        },
        {
          id: 3,
          sn: "XSDH-202103010002",
          type: "定金单",
          date: "2021/04/21",
          card: "9080797",
          price: "20099.00",
        },
      ],
    };
  },
  onLoad() {},
  methods: {
    handleDetail(id) {
      uni.navigateTo({
        url: `/pages/navigation/standard/standardOrderDetail?id=${id}`,
      });
    },
    hanleUpdateDate(type) {
      this.type = type;
      this.show = true;
    },

    onConfirm(value, index) {
      const da = value;
      var year = da.getFullYear() + "年";
      var month = da.getMonth() + 1 + "月";
      var date = da.getDate() + "日";
      if (this.type == "start") {
        this.dateStart = [year, month, date].join("-");
      } else {
        this.dateEnd = [year, month, date].join("-");
      }
      if (this.dateStart && this.dateEnd) {
        this.dataSource = [];
      }
      this.show = false;
    },
    formatter(type, val) {
      if (type === "year") {
        return val + "年";
      }
      if (type === "month") {
        return val + "月";
      }
      if (type === "day") {
        return val + "日";
      }
      return val;
    },
  },
};
</script>

<style lang="less" scoped>
.salesInquiryBox {
  background: #f5f5f5;
  min-height: 100vh;
}
.content {
  margin: 10px auto 68upx;
  .selling_period {
    background: #fff;
    padding: 10px 20px;
  }
  .se_title {
    font-size: 12px;
    color: #999999;
    margin-bottom: 10px;
  }
  .startData {
    border: 1px solid rgba(0, 0, 0, 0.25);
    padding: 3px;
    border-radius: 3px;
    color: rgba(0, 0, 0, 0.85);
  }
  .interval {
    text-align: center;
    color: rgba(0, 0, 0, 0.85);
    font-size: 12px;
    margin-top: 8px;
  }
  .selling_period {
    border-bottom: 1px solid #dddddd;
  }
  .orderBox {
    margin-top: 10px;
  }
  .orderDiv {
    border-top: 1px solid #dddddd;
    background: #fff;
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
      text-align: right;
      padding-right: 10px;
    }
  }
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
</style>
<style lang="less">
/deep/.data_select .van-field__control {
  font-size: 12px;
  text-indent: 3px;
}
</style>