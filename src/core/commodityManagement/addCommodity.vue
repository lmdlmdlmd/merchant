<template>
  <view class="addGoodBox">
    <zz-nav-bar
      title="新增商品"
      leftIcon="back"
      @click-left="leftClick"
    ></zz-nav-bar>

    <view class="content">
      <Anchor :anchor="anchor" />
      <view id="screens1">
        <view class="deposit_info">
          <p class="ci_title">基本信息</p>
          <view class="ci_con">
            <view class="info">
              <van-row>
                <van-col span="12">商铺</van-col>
                <van-col span="12"
                  ><view class="info_right">{{ info.name }}</view></van-col
                >
              </van-row>
            </view>
            <view class="info">
              <van-row>
                <van-col span="12">主营品牌</van-col>
                <van-col span="12"
                  ><view class="info_right">{{ info.brandid_s }}</view></van-col
                >
              </van-row>
            </view>
            <view class="info">
              <van-row>
                <van-col span="12">商户</van-col>
                <van-col span="12"
                  ><view class="info_right">{{ info.merchid_s }}</view></van-col
                >
              </van-row>
            </view>
          </view>
        </view>
      </view>
      <view id="screens2">
        <view class="deposit_info">
          <p class="ci_title">商品信息</p>
          <view class="ci_con">
            <!-- <view class="bg_fff">
              <van-row class="ci_content">
                <van-col span="6"><text class="file_text">品名</text></van-col>
                <van-col span="18"
                  ><view class="file_val">
                    <input
                      type="text"
                      class="input_text"
                      :value="detail.name"
                      placeholder="请输入品名"
                    /> </view
                ></van-col>
              </van-row>
            </view> -->
            <van-field
              class="br"
              placeholder="请输入品名"
              :value="detail.name"
              label="品名"
              input-align="right"
              required
              @input="detail.name = $event.mp.detail"
            />
            <van-field
              class="bg"
              placeholder="请选择品牌名称"
              :value="detail.brandid_s"
              label="品牌名称"
              right-icon="arrow"
              required
              input-align="right"
              @clickIcon="isShow = true"
              @input="detail.brandid_s = $event.mp.detail"
            />
            <van-field
              :value="detail.categoryid_s"
              placeholder="请选择商品分类"
              label="商品分类"
              input-align="right"
              right-icon="arrow"
              @input="detail.categoryid_s = $event.mp.detail"
              @clickIcon="isClassify = true"
            />
            <!-- <view class="bg_fff">
              <van-row class="ci_content">
                <van-col span="6"
                  ><text class="file_text">请输入规格</text></van-col
                >
                <van-col span="18"
                  ><view class="file_val">
                    <input
                      type="text"
                      class="input_text"
                      :value="detail.specification"
                      placeholder="规格"
                    /> </view
                ></van-col>
              </van-row>
            </view> -->
            <van-field
              class="bg"
              :value="detail.specification"
              placeholder="请输入规格"
              label="规格"
              input-align="right"
              @input="detail.specification = $event.mp.detail"
            />
            <!-- <view class="bg_fff">
              <van-row class="ci_content">
                <van-col span="6"><text class="file_text">型号</text></van-col>
                <van-col span="18"
                  ><view class="file_val">
                    <input
                      type="text"
                      class="input_text"
                      :value="detail.model"
                      placeholder="请输入型号"
                    /> </view
                ></van-col>
              </van-row>
            </view> -->
            <van-field
              :value="detail.model"
              placeholder="请输入型号"
              label="型号"
              input-align="right"
              @input="detail.model = $event.mp.detail"
            />
            <!-- <view class="bg_fa">
              <van-row class="ci_content">
                <van-col span="6"><text class="file_text">产地</text></van-col>
                <van-col span="18"
                  ><view class="file_val">
                    <input
                      type="text"
                      class="input_text"
                      :value="detail.origin"
                      placeholder="请输入产地"
                    /> </view
                ></van-col>
              </van-row>
            </view> -->
            <van-field
              class="bg"
              :value="detail.origin"
              placeholder="请输入产地"
              label="产地"
              input-align="right"
              @input="detail.origin = $event.mp.detail"
            />
            <!-- <view class="bg_fff">
              <van-row class="ci_content">
                <van-col span="6"><text class="file_text">材质</text></van-col>
                <van-col span="18"
                  ><view class="file_val">
                    <input
                      type="text"
                      class="input_text"
                      :value="detail.mainmaterial"
                      placeholder="请输入材质"
                    /> </view
                ></van-col>
              </van-row>
            </view> -->
            <van-field
              :value="detail.mainmaterial"
              placeholder="请输入材质"
              label="材质"
              input-align="right"
              @input="detail.mainmaterial = $event.mp.detail"
            />
            <!-- <view class="bg_fa">
              <van-row class="ci_content">
                <van-col span="6"
                  ><text class="file_text">计价单位</text></van-col
                >
                <van-col span="18"
                  ><view class="file_val">
                    <input
                      type="text"
                      class="input_text"
                      :value="detail.unit"
                      placeholder="请输入计价单位"
                    /> </view
                ></van-col>
              </van-row>
            </view> -->
            <van-field
              :value="detail.unit"
              placeholder="请输入计价单位"
              label="计价单位"
              class="bg"
              input-align="right"
              @input="detail.unit = $event.mp.detail"
            />
            <!-- <view class="bg_fff">
              <van-row class="ci_content">
                <van-col span="6"><text class="file_text">等级</text></van-col>
                <van-col span="18"
                  ><view class="file_val">
                    <input
                      type="text"
                      class="input_text"
                      :value="detail.level"
                      placeholder="请输入等级"
                    /> </view
                ></van-col>
              </van-row>
            </view> -->
            <van-field
              :value="detail.level"
              placeholder="请输入等级"
              label="等级"
              input-align="right"
              @input="detail.level = $event.mp.detail"
            />
            <!-- <view class="bg_fa">
              <van-row class="ci_content">
                <van-col span="6"><text class="file_text">价格</text></van-col>
                <van-col span="18"
                  ><view class="file_val">
                    <input
                      type="text"
                      class="input_text"
                      :value="detail.price"
                      placeholder="请输入价格"
                    /> </view
                ></van-col>
              </van-row>
            </view> -->
            <van-field
              class="bg"
              :value="detail.price"
              placeholder="请输入价格"
              label="价格"
              required
              input-align="right"
              @input="detail.price = $event.mp.detail"
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
    <van-popup
      v-bind:show="isShow"
      :close-on-click-overlay="true"
      :close-on-popstate="true"
      position="bottom"
      :style="{ height: '60%' }"
    >
      <view>
        <van-picker
          title="请选择品牌"
          :default-index="brandidIndex"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="isShow = false"
        />
      </view>
    </van-popup>
    <van-popup
      v-bind:show="isClassify"
      position="bottom"
      :style="{ height: '60%' }"
    >
      <van-cascader
        :value="detail.categoryid"
        title="请选择商品"
        :options="options"
        :field-names="fieldNames"
        @close="isClassify = false"
        @finish="onFinish"
      />
    </van-popup>
  </view>
</template>

<script>
import zzNavBar from "@/components/zz-nav-bar";
import Anchor from "../../components/anchor";
export default {
  components: {
    zzNavBar,
    Anchor,
  },
  data() {
    return {
      detail: {
        id: "",
        name: "",
        brandid_s: "",
        brandid: "11", //bug
        categoryid_s: "",
        categoryid: "22", //分类id bug
        specification: "",
        model: "",
        origin: "",
        mainmaterial: "",
        unit: "",
        level: "",
        price: "",
      },
      info: {}, //基本信息
      //商品分类
      fieldNames: {
        //组件option重命名
        text: "label",
        value: "key",
        children: "children",
      },
      isClassify: false, //是否显示商品分类
      options: [], //分类数据
      // fieldValue: "",//分类组建显示的值
      // cascaderValue: "",//分类组件默认选中值
      //默认选中下标
      brandidIndex: null,
      id: "", //详情id
      address: "", //地址返回
      isShow: false, //是否显示品牌
      columns: [], //品牌数据
      loading: false, //提交缓冲
      anchor: ["基本信息", "商品信息"],
      // activeIndex: 0,
      // activeId: "002",
    };
  },
  onLoad(query) {
    console.log(query.id);
    this.id = query.id; //详情id
    this.address = query.list; //操作完成后返回页面区分
  },

  created() {
    setTimeout(() => {
      const { shop = {} } = this.$auth;
      console.log(shop);
      //基本信息
      this.info = {
        name: shop && shop.name,
        brandid_s: shop.brandid_s,
        merchid_s: shop.merchid_s,
      };
    }, 500);

    this.bicategory(); //商品数据源
    this.handleBrand(); //品牌数据源
  },
  mounted() {
    console.log(this.id);
    if (this.id != "-1") this.getDetail();
  },
  methods: {
    bicategory() {
      this.$api
        .post("base/bicategory/search", {
          format: "tree",
        })
        .then((res) => {
          this.options = res;
        });
    },
    handleBrand() {
      this.$api
        .post("base/brand/search", {
          rows: 100,
        })
        .then((res) => {
          const { data } = res;
          data.map((item) =>
            this.columns.push({ text: item.name, id: item.id })
          );
        });
    },
    getDetail() {
      this.$api
        .post("mall/commodity/view", {
          id: this.id,
        })
        .then((res) => {
          Object.keys(this.detail).forEach((key) => {
            this.detail[key] = res[key];
          });
          // this.detail = Object.assign(res);
          console.log(this.detail);
          this.brandidIndex = this.columns.findIndex(
            (item) => item.id == res.brandid
          );
        });
    },
    //选择品牌
    onConfirm(call) {
      const { detail } = call;
      const { value } = detail;
      this.detail.brandid_s = value.text;
      this.detail.brandid = value.id;
      this.isShow = false;
    },
    //选择分类
    onFinish({ selectedOptions }) {
      this.isClassify = false;
      selectedOptions.map((option) => {
        this.detail.categoryid_s = option.label;
        this.detail.categoryid = option.key;
      });
    },

    //提交
    handleSubmit() {
      console.log(this.detail);
      if (!(this.detail.name && this.detail.brandid && this.detail.price)) {
        return uni.showToast({
          icon: "none",
          position: "bottom",
          title: "请输入必填项",
        });
      }
      let url = "";
      let params = {};
      if (this.id == "-1") {
        delete this.detail.id;
        url = "mall/commodity/add";
        params = {
          ...this.detail,
        };
      } else {
        url = "mall/commodity/edit";
        params = {
          ...this.detail,
        };
      }
      this.loading = true;
      this.$api.post(url, params).then((res) => {
        console.log(res);
        this.$toast.toast({
          icon: "success",
          title: this.id == "-1" ? "新增成功！" : "修改成功！",
          success: () => {
            //根据跳进来地址判断是商品列表还是其他 如果是其他直接back
            this.leftClick();
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
    leftClick() {
      console.log(this.address, this.address == "good");
      if (this.address == "good") {
        uni.navigateTo({
          url: `/pages/navigation/commodityManagement/list`,
        });
      } else if (this.address == "standard") {
        // uni.navigateTo({
        //   url: `/pages/navigation/standard/standardOrder`,
        // });
        //防止页面刷新
        // uni.navigateBack({
        //   delta: 1,
        // });
        console.log(111);
        uni.navigateTo("OBJECT");
        // uni.switchTab('OBJECT')​​
      } else {
        uni.navigateBack({
          delta: 1,
        });
      }
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
  }
  .bg_fa {
    background-color: #f4f5f5;
    height: 40px;
    margin: 0 auto;
    width: 99%;
    border-bottom: 1px solid #fafafa;
  }
  .bg_fff {
    background-color: #fff;
    height: 40px;
    margin: 0 auto;
    width: 99%;
    border-bottom: 1px solid #fafafa;
  }
  .file_text,
  .file_val {
    font-size: 13px;
    color: #1e1e1e;
  }
  .file_val {
    text-align: right;
  }
  .input_text {
    // border-bottom: 1px solid #f0f0f0;
    width: 100%;
    padding: 10px;
    font-size: 14px;
    color: #1e1e18;
  }
}
</style>
<style lang="less">
/deep/ .van-field__label {
  color: #1e1e1e;
}
/deep/ .bg .van-cell {
  background-color: #f4f5f5;
}
/deep/ .van-field__control {
  font-size: 12px;
  color: #1e1e1e;
  text-align: right;
}
/deep/ .ci_content .van-row {
  width: calc(100% - 20px);
  margin: 0 auto;
  padding: 5px;
}
/deep/ .reset .van-button {
  color: #000;
  background: #dddddd;
  border: none;
  outline: none;
  padding: 3px 23px;
  border-radius: 4px;
  margin-right: 22px;
  height: 32px;
}
/deep/ .determine .van-button {
  border: none;
  outline: none;
  padding: 3px 23px;
  border-radius: 4px;
  height: 32px;
  background: #1890ff;
  margin-right: 0;
  color: #fff;
}
</style>