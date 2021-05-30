<template>
  <view class="priceTagListBox">
    <view class="content">
      <view
        class="deposit_info"
        v-for="(item, index) of dataSource"
        :key="index"
      >
        <view class="ci_con">
          <view class="ci_con_box">
            <van-row class="info">
              <van-col span="12">审批状态</van-col>
              <van-col span="12" class="info_right">
                {{ handleStatus(item.status) }}</van-col
              >
            </van-row>
            <van-row class="info">
              <van-col span="12">价签打印单号</van-col>
              <van-col span="12" class="info_right">{{ item.sn }}</van-col>
            </van-row>
            <van-row class="info">
              <van-col span="12">商品数量</van-col>
              <van-col span="12" class="info_right">{{ item.number }}</van-col>
            </van-row>
          </view>
        </view>
        <view class="good_opr">
          <van-button
            type="primary"
            class="reset_goods"
            @click="handleEdiTag(item.id)"
            >修改申请</van-button
          >
          <van-button
            type="primary"
            class="determine_goods"
            @click.stop="handleDelete(item.id)"
            >删除申请</van-button
          >
        </view>
      </view>
    </view>
    <van-dialog v-model="show" :showConfirmButton="false">
      <view class="dialog_box">
        <image
          class="warning"
          src="../../../static/img/icon/warning.png"
        ></image>
        <text class="dele_title">确定删除此申请吗？</text>
        <view class="dialog_btn">
          <button class="btn_cancel" @click="show = false">取消</button>
          <button class="btn_confim" @click="handleConfim">确定</button></view
        >
      </view>
    </van-dialog>
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
      show: false,
      delId: "",
    };
  },
  mounted() {
    //根据active查询类型
    // console.log("active", this.active);
    switch (this.active) {
      case 0: {
        this.dataSource = [
          { id: 1, status: "1", sn: "JQDY-202103020001", number: "2" },
          { id: 2, status: "2", sn: "JQDY-202103020002", number: "1" },
          { id: 3, status: "3", sn: "JQDY-202103020003", number: "1" },
        ];
        break;
      }
      case 1: {
        this.dataSource = [
          { id: 1, status: "1", sn: "JQDY-202103020001", number: "2" },
        ];
        break;
      }
      case 2: {
        this.dataSource = [
          { id: 2, status: "2", sn: "JQDY-202103020002", number: "1" },
        ];
        break;
      }
      case 3: {
        this.dataSource = [
          { id: 3, status: "3", sn: "JQDY-202103020003", number: "1" },
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
          type = "申请中";
          break;
        }
        case "2": {
          type = "已通过";
          break;
        }
        case "3": {
          type = "草稿与驳回";
          break;
        }
      }
      return type;
    },
    //删除申请
    handleDelete(id) {
      this.show = true;
      this.delId = id;
    },
    handleConfim() {
      //调用接口delId
      this.show = false;
    },
    handleEdiTag(id) {
      uni.navigateTo({
        url: `/pages/navigation/priceTag/edit?id=${id}`,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.priceTagListBox {
}
.content {
  margin: 0 auto 68upx;
  .deposit_info {
    padding: 10px 0;
    background: #fafafa;
    border-top: 1px solid #dddddd;
    margin-top: 10px;
  }
  .ci_con {
    margin: 0 auto;
    width: calc(100% - 20px);
  }
  .ci_con_box {
    border-radius: 10px;
    background: #fff;
    padding: 10px;
  }
  .info {
    color: #1e1e1e;
    font-size: 12px;
    margin-top: 6px;
    .info_right {
      text-align: right;
    }
  }
  .good_opr {
    margin-top: 12px;
    text-align: right;
    .reset_goods,
    .determine_goods {
      background: rgba(24, 144, 255, 0.1);
      border: 1px solid #1890ff;
      color: #1890ff;
      font-size: 14px;
      padding: 6px 16px;
      border-radius: 20px;
      margin-right: 22px;
      height: 32px;
    }
    .determine_goods {
      background: #1890ff;
      color: #fff;
      border: none;
      margin-right: 0px;
    }
  }
  .good_opr {
    margin: 12px auto 0;
    width: calc(100% - 20px);
    .reset_goods,
    .determine_goods {
      background: #fff;
    }
    .determine_goods {
      background: #e02020;
    }
  }
}
.dialog_box {
  padding: 28upx 0 25upx;
  text-align: center;

  .warning {
    width: 32upx;
    height: 32upx;
    vertical-align: middle;
  }
  .dele_title {
    color: #000;
    font-size: 28upx;
    margin-left: 20upx;
  }
  .dialog_btn {
    padding: 40upx 0;
    width: 248upx;
    margin: 0 auto 30upx;
  }
  .btn_cancel,
  .btn_confim {
    width: 114upx;
    line-height: 48upx;
    color: #000;
    font-size: 28upx;
    background: #fff;
    float: left;
  }
  .btn_confim {
    background: #1890ff;
    margin-left: 20upx;
    color: #fff;
  }
}
</style>
<style lang="less">
/deep/.van-dialog {
  width: 260px;
}
</style>