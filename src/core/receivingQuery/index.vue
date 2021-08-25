<template>
  <view class="receivingQueryBox">
    <zz-nav-bar
      title="收款查询"
      leftIcon="back"
      @click-right="rightClick"
    ></zz-nav-bar>

    <view class="content">
      <van-tabs v-model="active" color="#0091FF">
        <van-tab title="汇总表">
          <view class="selling_period">
            <p class="se_title">选择查询日期</p>
            <van-row class="data_select">
              <van-col span="11" class="timebox">
                <input
                  class="timeInput"
                  @click="hanleUpdateDate"
                  :value="dateStart"
                />
                <van-icon name="notes-o" class="input_icon" />
              </van-col>
            </van-row>
            <!-- <van-row class="data_select">
              <van-col>
                <van-field
                  readonly
                  clickable
                  name="datetimePicker"
                  :value="dateStart"
                  label=""
                  placeholder="开始时间"
                  @click="show = true"
                  :label-width="0"
                  right-icon="notes-o"
                  class="startData"
                />
              </van-col>
            </van-row> -->
          </view>
          <view class="data_select_box">
            <view class="se_number">
              <span class="mark"></span>
              <text class="mark_title">收款单笔数</text>
              <p class="number ma_bo15">20</p>
            </view>
          </view>
          <view class="data_select_box">
            <view class="se_number">
              <span class="mark bg_org"></span>
              <text class="mark_title">收款金额</text>
              <p class="number">¥500，000.00</p>
            </view>
          </view>
          <view class="con_box">
            <view class="con_body">
              <view
                class="con_div"
                v-for="(item, index) of cloums"
                :key="index"
              >
                <view>
                  <p class="title">{{ item.title }}</p>
                  <p class="val">¥{{ item.money }}</p>
                </view>
              </view>
            </view>
          </view>
        </van-tab>
        <van-tab title="明细表">
          <view class="selling_period">
            <p class="se_title">选择查询日期</p>
            <van-row class="data_select">
              <van-col span="11" class="timebox">
                <input
                  class="timeInput"
                  @click="hanleUpdateDate"
                  :value="dateStart"
                />
                <van-icon name="notes-o" class="input_icon" />
              </van-col>
            </van-row>
            <!-- <van-row class="data_select">
              <van-col>
                <van-field
                  readonly
                  clickable
                  name="datetimePicker"
                  :value="dateStart"
                  label=""
                  placeholder="开始时间"
                  @click="show = true"
                  :label-width="0"
                  right-icon="notes-o"
                  class="startData"
                />
              </van-col>
            </van-row> -->
          </view>
          <view class="data_select_box">
            <view class="se_number">
              <view class="data_select">
                <van-row>
                  <van-col span="12">
                    <span class="mark bg_org"></span>
                    <text class="mark_title">收款金额</text>
                  </van-col>
                  <van-col span="12">
                    <p class="number text_right">¥500，000.00</p>
                  </van-col></van-row
                >
              </view>
            </view>
          </view>
          <view class="con_box">
            <view>
              <view
                class="da_con_div"
                v-for="(item, index) of data"
                :key="index"
              >
                <view class="da_con_body">
                  <p class="da_title">{{ item.date }}</p>
                  <view class="da_sn mato_20">
                    <van-row>
                      <van-col span="20">单 号：{{ item.sn }}</van-col>
                      <van-col span="4">
                        <view
                          class="more_img_box"
                          @click="handleDetail(item.id)"
                        >
                          <img
                            class="more_img"
                            src="@/static/img/icon/icon_call.png"
                            alt="navigation"
                          />
                        </view>
                      </van-col>
                    </van-row>
                  </view>
                  <p class="da_sn">销售金额：{{ item.salesAmount }}</p>
                  <p class="da_sn">交款金额：{{ item.returnsAmount }}</p>
                </view>
              </view>
            </view>
          </view>
        </van-tab>
      </van-tabs>
    </view>
    <van-popup
      v-bind:show="show"
      position="bottom"
      custom-style="width:100%;height:40%;"
    >
      <view>
        <van-datetime-picker
          :value="currentDate"
          type="date"
          title="请选择日期"
          :min-date="minDate"
          :max-date="maxDate"
          visible-item-count="6"
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
import zzNavBar from "@/components/zz-nav-bar";
import Footer from "@/components/footer-nav";
import zzEmpty from "@/components/zz-empty";
export default {
  components: {
    zzNavBar,
    Footer,
    zzEmpty,
  },
  data() {
    return {
      active: 0,
      show: false,
      dateStart: "",
      minDate: new Date(1900, 0, 1).getTime(),
      maxDate: new Date(2999, 10, 1).getTime(),
      currentDate: new Date().getTime(),
      cloums: [
        { title: "现金金额", money: "100.00" },
        { title: "微信支付", money: "100.00" },
        { title: "支付宝", money: "100.00" },
        { title: "信用卡", money: "100.00" },
        { title: "借记卡", money: "100.00" },
      ],
      data: [
        {
          id: 1,
          date: "2021-04-21  15:32",
          sn: "XSDH-202103010002",
          salesAmount: "500，000.00",
          returnsAmount: "500，000.00",
        },
        {
          id: 2,
          date: "2021-04-21  15:32",
          sn: "XSDH-202103010002",
          salesAmount: "500，000.00",
          returnsAmount: "500，000.00",
        },
      ],
    };
  },
  onLoad() {},
  created() {
    const dateSource = new Date();
    let year = dateSource.getFullYear() + "年";
    let month = dateSource.getMonth() + 1 + "月";
    let date = dateSource.getDate() + "日";
    this.dateStart = [year, month, date].join("-");
  },
  methods: {
    handleDetail(id) {
      uni.navigateTo({
        url: `/pages/navigation/receivingQuery/detail?id=${id}`,
      });
    },
    hanleUpdateDate() {
      this.show = true;
    },
    onConfirm(value, index) {
      // const da = value;
      const { detail: da } = value || {};
      const data = new Date(da);
      var year = data.getFullYear() + "年";
      var month = data.getMonth() + 1 + "月";
      var date = data.getDate() + "日";
      this.dateStart = [year, month, date].join("-");
      //查询数据...
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
.receivingQueryBox {
  background: #f5f5f5;
  min-height: 100vh;
}
.content {
  margin: 0 auto 68upx;
  .selling_period {
    background: #fff;
    padding: 12px 20px;
    // border-bottom: 1px solid #dddddd;
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
  .data_select_box {
    background: #fff;
  }
  .se_number {
    background: #fff;
    // padding-left: 10px;
    padding-top: 5px;
    margin: 0 auto;
    width: calc(100% - 20px);
  }
  .mark {
    width: 8px;
    height: 8px;
    background: #0091ff;
    display: inline-block;
    border-radius: 20px;
    margin-right: 12px;
  }
  .bg_org {
    background: #ff4c0f;
  }
  .mark_title {
    color: #333333;
    font-size: 13px;
    margin-top: 3px;
  }
  .number {
    color: #333333;
    font-weight: 600;
    font-size: 14px;
    margin-top: 5px;
    margin-left: 20px;
  }
  .ma_bo15 {
    padding-bottom: 15px;
  }
  .con_box {
    background: #fff;
    padding-top: 5px;
    padding-bottom: 10px;
  }
  .con_body {
    background: #fffaee;
    margin: 10px auto;
    width: calc(100% - 20px);
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding-bottom: 10px;
    border-top: 1px dashed #eeeeee;
  }
  .con_div {
    width: 33%;
    text-align: center;
    padding: 10px 0;
    .title {
      font-size: 13px;
      color: #999999;
      margin-bottom: 5px;
    }
    .val {
      color: #333333;
      font-size: 15px;
      padding-bottom: 10px;
    }
  }
  .timeInput {
    overflow: revert;
    padding: 3px;
    border-radius: 3px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 12px;
    text-indent: 3px;
    border: 1px solid rgba(0, 0, 0, 0.25);
  }
  .input_icon {
    position: relative;
    top: -26px;
    right: -116px;
    color: rgba(0, 0, 0, 0.5);
  }
  .text_right {
    text-align: right;
  }
  .da_con_div {
    margin-top: 20px;
  }
  .da_con_body {
    background: #fffaee;
    margin: 0 auto;
    width: calc(100% - 60px);
    padding: 10px 20px 20px;
    .da_title {
      color: rgba(0, 0, 0, 0.45);
      font-size: 12px;
      margin-top: 6px;
    }
    .mato_20 {
      margin-top: 12px;
    }
    .da_sn {
      color: #000000;
      font-size: 14px;
    }
    .more_img_box {
      text-align: right;
    }
    .more_img {
      width: 14px;
      height: 14px;
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
/deep/.van-tab {
  color: #333333;
  font-size: 28upx;
}
/deep/ .van-tab--active {
  color: #0091ff;
}
/deep/.van-step--vertical:not(:last-child)::after {
  border-bottom: none;
}
/deep/.van-tabs__line {
  bottom: 20px;
  width: 40px;
  height: 2px;
}
/deep/.van-tabs--line .van-tabs__wrap {
  height: 40px;
  border-bottom: 1px solid #eeeeee;
}
/deep/.data_select .van-field__control {
  font-size: 12px;
  text-indent: 3px;
}
</style>