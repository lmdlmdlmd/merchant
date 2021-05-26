<template>
	<view class="modal" :class="{'modal-mask': mask}" :style="{visibility: visible ? 'visible': 'hidden', opacity: visible ? 1: 0}"
	 @click="cancel(false)">
		<view class="modal-container" @click.stop>
            <image v-if="closeimg" src="/static/imgs/share/close.png" class="modal-picker--close" @click.stop="close()"></image>
			<view :class="bodystyle?'modal-bodys':'modal-body'">
				<view v-if="title || title=='slot'" class="modal-title">
					<text v-if="title != 'slot'">{{title}}</text>
					<slot name="title" />
				</view>
				<view v-if="content" class="modal-content">{{content}}</view>
				<slot name="content" />
			</view>
			<view class="modal-btns">
				<view v-if="cancelShow" class="modal-btn" @click.stop="cancel(true)">
					<text class="btn-cancel" :style="[cancelStyle,{color: cancelColor}]">{{cancelText || '取消'}}</text>
				</view>
				<view v-if="cancelShow && confirmShow" class="modal-btn-divide"></view>
				<view v-if="confirmShow" class="modal-btn" @click.stop="confirm">
					<text class="btn-confirm" :style="[confirmStyle,{color: confirmColor}]">{{confirmText || '确定'}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			visible: {
				type: Boolean,
				default: false
            },
            closeimg:{
                type: Boolean,
				default: false
            },
			title: {
				type: String,
				default: ''
			},
			mask: {
				type: Boolean,
				default: true
			},
			maskClose: {
				type: Boolean,
				default: false
			},
			content: {
				type: String,
				default: ''
			},
			cancelShow: {
				type: Boolean,
				default: true
			},
			cancelText: {
				type: String,
				default: '取消'
			},
			cancelColor: {
				type: String,
				default: '#999999'
			},
			cancelStyle: {
				type: Object,
				default () {
					return {}
				}
			},
			confirmShow: {
				type: Boolean,
				default: true
			},
			confirmText: {
				type: String,
				default: '确定'
			},
			confirmColor: {
				type: String,
				default: '#5074C3'
			},
			confirmStyle: {
				type: Object,
				default () {
					return {
						fontWeight: 700
					}
				}
            },
            bodystyle:{
                type:Boolean,
                default:false
            }
		},
		data() {
			return {}
		},
		methods: {
			cancel(e) {
				if (this.maskClose || e) {
					this.$emit('update:visible', false);
					this.$emit('cancel');
				}
			},
			confirm() {
				this.$emit('update:visible', false);
				this.$emit('confirm');
            },
            close(){
                this.$emit('close');
            },
			show() {
				this.$emit('update:visible', true);
			},
			hide() {
				this.cancel(true);
			}
		}
	}
</script>

<style scoped>
	.modal {
		width: 100vw;
		height: 100vh;
		position: fixed;
		left: 0;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: visibility 0.4s, opacity 0.4s;
		z-index: 999;
	}

	.modal-mask {
		background-color: rgba(0, 0, 0, 0.6);
	}

	.modal-container {
		width: 540upx;
		border-radius: 10upx;
		background-color: #FFFFFF;
        position: relative;
	}
    .modal-picker--close{
        position: absolute;
        top:-64upx;
        right: 0;
        width: 44upx;height: 44upx;
    }

	.modal-body {
		padding: 48upx 32upx 0upx;
	}
    .modal-bodys{
        padding: 48upx 32upx 40upx;
    }

	.modal-title {
		font-size: #333333;
		font-weight: 700;
		font-size: 36upx;
		line-height: 38upx;
		margin-bottom: 30upx;
		text-align: center;
	}

	.modal-content {
		margin-bottom: 36upx;
		font-size: 32upx;
		line-height: 1.5em;
		color: #555555;
		text-align: center;
	}

	.modal-btns {
		display: flex;
		border-top: 2upx solid #EEEEEE;
	}

	.modal-btn {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 34upx;
		line-height: 48upx;
		padding: 26upx 0;
	}

	.modal-btn-divide {
		flex: 0 0 2upx;
		background-color: #EEEEEE;
	}
</style>
