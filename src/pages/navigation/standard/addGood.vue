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
              <van-col span="12" class="info_right">{{
                detail.shopid_s
              }}</van-col>
            </van-row>
            <van-row class="info">
              <van-col span="12">主营品牌</van-col>
              <van-col span="12" class="info_right">{{
                detail.brandid
              }}</van-col>
            </van-row>
            <van-row class="info">
              <van-col span="12">商户</van-col>
              <van-col span="12" class="info_right">{{
                detail.merchid_s
              }}</van-col>
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
              v-model="detail.name"
              label="品名"
              required
            />
            <van-field
              class="bg"
              placeholder="请选择品牌名称"
              v-model="detail.brandid_s"
              label="品牌名称"
              right-icon="arrow"
              required
              @click-right-icon="isShow = false"
            />
            <van-field
              v-model="detail.categoryid_s"
              placeholder="请选择商品分类"
              label="商品分类"
              right-icon="arrow"
              @click-right-icon="isClassify = true"
            />
            <van-field
              class="bg"
              v-model="detail.specification"
              placeholder="请输入规格"
              label="规格"
            />
            <van-field
              v-model="detail.model"
              placeholder="请输入型号"
              label="型号"
            />

            <van-field
              class="bg"
              v-model="detail.origin"
              placeholder="请输入产地"
              label="产地"
            />
            <van-field
              v-model="detail.mainmaterial"
              placeholder="请输入材质"
              label="材质"
            />
            <van-field
              v-model="detail.unit"
              placeholder="请输入计价单位"
              label="计价单位"
              class="bg"
            />
            <van-field
              v-model="detail.level"
              placeholder="请输入等级"
              label="等级"
            />
            <van-field
              class="bg"
              v-model="detail.price"
              placeholder="请输入价格"
              label="价格"
              required
            />
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
    <van-popup
      v-model="isClassify"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-tree-select
        height="55vw"
        :items="items"
        :active-id="activeId"
        :main-active-index.sync="activeIndex"
        @click-nav="onNavClick"
        @click-item="onItemClick"
      >
        <template #content>
          <van-tree-select
            height="55vw"
            :items="items"
            :active-id="activeId"
            :main-active-index.sync="activeIndex"
            @click-nav="onNavClick"
            @click-item="onItemClick"
          >
            <template #content>
              <van-tree-select
                height="55vw"
                :items="items"
                :active-id="activeId"
                :main-active-index.sync="activeIndex"
                @click-nav="onNavClick"
                @click-item="onItemClick"
              />
            </template>
          </van-tree-select>
        </template>
      </van-tree-select>
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
      detail: {
        id: "",
        shopid: "5", //bug要换成商铺名称
        brandid: "芝华仕", //bug要换成品牌名称
        merchid: "HT2232323323", //bug要换成商户名称
        name: "",
        code: "", //bug要换成品牌名称
        categoryid: "",
        specification: "",
        model: "",
        origin: "",
        mainmaterial: "",
        unit: "",
        level: "",
        price: "",
      },
      id: "",
      isShow: false,
      columns: ["TATA", "科勒", "世友", "书香"],
      loading: false,
      anchor: ["基本信息", "商品信息"],
      // classify: "实木家具",
      isClassify: false,
      activeIndex: 0,
      activeId: "002",
      address: "",
      items: [
        {
          text: "家具",
          id: 1,
          children: [
            { id: "01", text: "进口实木家具", children: [
                { id: "0003", text: "现代实木" },
                { id: "0005", text: "古典实木" },
              ]},
            { id: "001", text: "儿童家具" },
            {
              id: "002",
              text: "实木家具",
              children: [
                { id: "0003", text: "现代实木" },
                { id: "0005", text: "古典实木" },
              ],
            },
          ],
        },
        {
          text: "建材",
          id: "2",
          children: [{ id: "02", text: "陶瓷" }],
        },
        {
          text: "灯饰",
          id: "3",
          children: [{ id: "03", text: "吊灯" }],
        },
      ],
    };
  },
  onLoad(query) {
    this.id = query.id;
    this.address = query.list;
  },
  onShow() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      let data = {
        id: "1",
        shopid_s: "5", //bug要换成商铺名称
        brandid_s: "5", //bug要换成品牌名称
        merchid_s: "11", //bug要换成商户名称
        name: "2",
        brandid_s: "3", //bug要换成品牌名称
        categoryid_s: "7",
        specification: "1",
        model: "6",
        origin: "7",
        mainmaterial: "8",
        unit: "9",
        level: "0",
        price: "10",
      };
      this.id &&
        this.$api
          .post("mall/commodity/view", {
            id: this.id,
          })
          .then((res) => {
            this.detail = Object.assign(res);
          });
    },
    //选择分类
    onNavClick(index) {
      console.log(index);
      this.activeIndex = index;
      // let substationCode = this.items[index].id; //这是我们通过index获取到当前点击的值
      // console.log(substationCode);
      // this.requestPoliceList(substationCode) //这是请求右侧列表的请求通过activeId去请求。
    },
    onItemClick(data) {
      console.log(data);
      this.activeId = data.id;
    },
    //选择品牌
    onConfirm(value) {
      this.brandName = value; //bug选择之后是传id 还要根据后端返回查处对应的品牌列表
      this.isShow = false;
    },
    //提交
    handleSubmit() {
      if (!(this.detail.name && this.detail.code && this.detail.price)) {
        return uni.showToast({
          icon: "none",
          position: "bottom",
          title: "请输入必填项",
        });
      }
      // delete
      let url = "";
      let params = {};
      if (this.id == "-1") {
        console.log(this.detail);
        delete this.detail.id;
        url = "all/commodity/add";
        params = {
          ...this.detail,
        };
      } else {
        console.log(this.detail);
        url = "mmall/commodity/edit";
        params = {
          ...this.detail,
        };
      }
      this.loading = true;
      this.$api.post(url, params).then((res) => {
        this.$toast.toast({
          icon: "success",
          title: this.id == "-1" ? "新增成功！" : "修改成功！",
          success: () => {
            //根据跳进来地址判断是商品列表还是其他 如果是其他直接back
            if (this.address) {
              uni.navigateTo({
                url: `/pages/navigation/commodityManagement/list`,
              });
            } else {
              uni.navigateBack({
                delta: 1,
              });
            }
          },
        });
      });
      setTimeout(() => {
        this.loading = false;
        // uni.navigateBack({
        //   delta: 1,
        // });
      }, 500);
    },
    //重置
    handleReset() {
      Object.keys(this.detail).forEach((key) => {
        this.detail[key] = "";
      });
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
    padding: 0 0 10px;
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