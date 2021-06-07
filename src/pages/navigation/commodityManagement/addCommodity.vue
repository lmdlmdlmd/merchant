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
              @click-right-icon="isShow = true"
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
    <van-popup
      v-model="isShow"
      :close-on-click-overlay="true"
      :close-on-popstate="true"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <view>
        <van-picker
          title=""
          :default-index="brandidIndex"
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
        <!-- <template #content>
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
        </template> -->
      </van-tree-select>
    </van-popup>
  </view>
</template>

<script>
import zzNavBar from "../../../components/zz-nav-bar";
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
        shopid_s: "",
        shopid: "21",
        brandid_s: "",
        brandid: "",
        merchid_s: "",
        merchid: "1",
        name: "",
        brandid_s: "",
        categoryid_s: "",
        categoryid: "",
        specification: "",
        model: "",
        origin: "",
        mainmaterial: "",
        unit: "",
        level: "",
        price: "1",
      },
      //默认选中下标
      brandidIndex: null,
      id: "",
      isShow: false,
      columns: [],
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
            { id: "01", text: "进口实木家具" },
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
  created() {
    this.bicategory();
    this.handleBrand();
    this.getDetail();
  },
  methods: {
    dep(list, menuDate) {
      list.forEach((item) => {
        menuDate.forEach((e) => {
          item.text = e.name;
          if (item.id === e.parentid) {
            if (!item.children) item.children = [];
            item.children.push({ ...e, text: e.name });
          }
        });
        if (item.children) {
          return this.dep(item.children, menuDate);
        }
      });
      return list;
    },
    bicategory() {
      this.$api
        .post("base/bicategory/search", {
          rows: 100,
        })
        .then((res) => {
          console.log(res);
          const { data } = res;
          // const getTreeMenu = () => {
          console.log(this.dep([{ id: 1 }, { id: 5 }], data));
          // };
          // getTreeMenu();
        });
    },
    handleBrand() {
      this.$api
        .post("base/brand/search", {
          rows: 100,
        })
        .then((res) => {
          const { data } = res;
          console.log(data);
          data.map((item) =>
            this.columns.push({ text: item.name, id: item.id })
          );
        });
    },

    getDetail() {
      this.id != "-1" &&
        this.$api
          .post("mall/commodity/view", {
            id: this.id,
          })
          .then((res) => {
            this.detail = Object.assign(res);
            this.brandidIndex = this.columns.findIndex(
              (item) => item.id == res.brandid
            );
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
      this.detail.categoryid = data.id;
      this.isClassify = false;
    },
    //选择品牌
    onConfirm(value) {
      console.log(value);
      this.brandName = value; //bug选择之后是传id 还要根据后端返回查处对应的品牌列表
      this.detail.brandid_s = value.text;
      this.detail.brandid = value.id;
      this.isShow = false;
    },
    //提交
    handleSubmit() {
      if (!(this.detail.name && this.detail.brandid && this.detail.price)) {
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
        url = "mall/commodity/add";
        params = {
          ...this.detail,
        };
      } else {
        console.log(this.detail);
        url = "mall/commodity/edit";
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
    leftClick() {
      if (this.address) {
        console.log(111211);
        uni.navigateTo({
          url: `/pages/navigation/commodityManagement/list`,
        });
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