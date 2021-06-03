<template>
  <view class="addGoodBox">
    <zz-nav-bar
      title="新增商品"
      leftIcon="back"
      @click-right="rightClick"
    ></zz-nav-bar>

    <view class="content">
      <Anchor :anchor="anchor" />
      <view id="screens1">
        <view class="deposit_info">
          <p class="ci_title">基本信息</p>
          <view class="ci_con">
            <van-row class="info">
              <van-col span="12">商铺</van-col>
              <van-col span="12" class="info_right">{{ shops }}</van-col>
            </van-row>
            <van-row class="info">
              <van-col span="12">主营品牌</van-col>
              <van-col span="12" class="info_right">{{ brand }}</van-col>
            </van-row>
            <van-row class="info">
              <van-col span="12">商户</van-col>
              <van-col span="12" class="info_right">{{ merchants }}</van-col>
            </van-row>
          </view>
        </view>
      </view>
      <view id="screens2">
        <view class="deposit_info">
          <p class="ci_title">商品信息</p>
          <view class="ci_con">
            <van-field
              class="br"
              placeholder="请输入品名"
              v-model="goodsName"
              label="品名"
            />
            <van-field
              class="bg"
              placeholder="请选择品牌名称"
              v-model="brandName"
              label="品牌名称"
              right-icon="arrow"
              @click-right-icon="handleRightSearch"
            />
            <van-field v-model="spec" placeholder="请输入规格" label="规格" />
            <van-field v-model="model" placeholder="请输入型号" label="型号" />

            <van-field v-model="origin" placeholder="请输入产地" label="产地" />
            <van-field
              v-model="material"
              placeholder="请输入材质"
              label="材质"
            />
            <van-field
              v-model="denominated"
              placeholder="请输入计价单位"
              label="计价单位"
            />
            <van-field v-model="level" placeholder="请输入等级" label="等级" />
            <van-field v-model="money" placeholder="请输入价格" label="价格" />
            <view class="sub_box">
              <van-button type="primary" class="reset" @click="handleReset"
                >重置</van-button
              >
              <van-button
                type="primary"
                class="determine"
                :loading="loading"
                loading-type="spinner"
                @click="handleSubmit"
                >确定</van-button
              >
            </view>
          </view>
        </view>
      </view>
    </view>
    <van-popup v-model="isShow" position="bottom" :style="{ height: '30%' }">
      <view>
        <van-picker
          title=""
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="isShow = false"
        />
      </view>
    </van-popup>
  </view>
</template>

<script>
import zzNavBar from "../../components/zz-nav-bar";
import Anchor from "../components/anchor";
export default {
  components: {
    zzNavBar,
    Anchor,
  },
  data() {
    return {
      shops: "SI-001-002",
      brand: "芝华仕",
      merchants: "HT2232323323",
      goodsName: "",
      spec: "",
      model: "",
      origin: "",
      brandName: "",
      material: "",
      denominated: "",
      level: "",
      money: "",
      isShow: false,
      columns: ["TATA", "科勒", "世友", "书香"],
      loading: false,
      anchor: ["基本信息", "商品信息"],
    };
  },
  onLoad(query) {
    if (query.id && query.id !== "-1") {
      this.goodsName = "不二家";
      this.spec = "DS1-001-002";
      this.model = "DS1-001-002";
      this.origin = "DS1-001-002";
      this.brandName = "书香";
      this.material = "23";
      this.denominated = "元";
      this.level = "1";
      this.money = "¥999";
    }
  },
  methods: {
    //选择品牌
    onConfirm(value) {
      this.brandName = value;
      this.isShow = false;
    },

    //筛选品牌
    handleRightSearch() {
      this.isShow = true;
    },
    //提交
    handleSubmit() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        uni.navigateBack({
          delta: 1,
        });
      }, 500);
    },
    //重置
    handleReset() {
      this.goodsName = "";
      this.spec = "";
      this.model = "";
      this.origin = "";
      this.brandName = "";
      this.material = "";
      this.denominated = "";
      this.level = "";
      this.money = "";
    },
  },
};
</script>

<style lang="less" scoped>
.addGoodBox {
  background: #f5f5f5;
  min-height: 100vh;
}
.content {
  padding-bottom: 68px;
  margin: 0 auto 68upx;
  #screens1 {
    padding-top: 55px;
  }
  .customer_info,
  .deposit_info {
    background: #fafafa;
    border-top: 1px solid #ddd;
    margin-top: 10px;
    padding-bottom: 12px;
  }
  .ci_title {
    color: #333;
    font-size: 14px;
    font-weight: 600;
    padding: 5px 0;
    margin-left: 10px;
  }
  .ci_con {
    width: calc(100% - 20px);
    padding: 10px 0;
    background: #ffffff;
    margin: 0 auto;
    border-radius: 10px;
  }
  .info {
    color: #1e1e1e;
    font-size: 12px;
    margin-top: 6px;
    padding: 0 10px;
    .info_right {
      text-align: right;
    }
  }
  .br {
    border-radius: 6px;
  }
  .bg {
    background-color: #f4f5f5;
  }
  .sub_box {
    text-align: right;
    margin: 12px auto 0;
    width: calc(100% - 20px);
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
      margin-right: 0;
      color: #fff;
    }
  }
}
</style>
<style lang="less">
/deep/ .van-field__control {
  font-size: 12px;
  color: #1e1e1e;
  text-align: right;
}
</style>