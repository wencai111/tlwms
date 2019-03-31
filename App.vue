<script>
    export default {
        onLaunch: function() {
            console.log('App Launch');
        },
        onShow: function() {
            console.log('App Show');
        },
        onHide: function() {
            console.log('App Hide');
        }
    }
</script>

<style>
	@import './uni.css';
    /*每个页面公共css */
    /* uni-app默认全局使用flex布局。因为flex布局有利于跨更多平台，尤其是采用原生渲染的平台。如不了解flex布局，请参考http://www.w3.org/TR/css3-flexbox/。如不使用flex布局，请删除或注释掉本行。*/
    body,
    page {
		background-color: #F4F5F6;
		font-size: 28upx;
        min-height: 100%;
        display: flex;
    }
  
    .content {
        display: flex;
        flex: 1;
        flex-direction: column;
        background-color: #efeff4;
        padding: 20upx;
    }

    .btn-row {
        margin-top: 50upx;
        padding: 20upx;
    }

   
</style>
