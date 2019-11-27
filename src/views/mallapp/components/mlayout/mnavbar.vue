<template>
  <div class="navbar-container">
    <div class="logo">
      <img src="@/common/images/admin-logo.png" alt="">
    </div>
  </div>
</template>

<script>

export default {
  name: 'Navbar',
  data () {
    return {
      display: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/scss/variable.scss';
  .navbar-container {
    position: relative;
    color:#fff;
    .logo{
      width: 180px;
      height: 60px;
      padding: 5px 10px;
      font-size: 0;
      overflow: hidden;
      text-align: center;
      vertical-align: middle;
      img {
        max-width: 160px;
        max-height: 50px;
        line-height: 50px;

      }
    }
    .user {
      position: absolute;
      right: 10px;
      top: 0;
      font-size: 0;
      cursor: pointer;
      .avatar {
        display: inline-block;
        width: 36px;
        height: 36px;
        margin: 12px 10px;
        font-size: 10px;
        background: #ccc;
        border-radius: 50%;
        img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
        }
      }
      .info {
        vertical-align: top;
        display: inline-block;
        height: 60px;
      }
      .name {
        max-width: 185px;
        display: table;
        height: 60px;
        font-size: 12px;
        span {
        max-width: 148px;
        vertical-align: middle;
          display: table-cell;
          line-height: 16px;
        }
        i {
          display: inline-block;
          font-size: 12px;
          color: #fff;
          margin-left: 25px;
          line-height: 60px;
        }
      }
      .exit {
        box-shadow: 0 0 5px 0 rgba(0,0,0,0.3);
        position: absolute;
        top: 60px;
        right: -8px;
        width: 260px;
        background: #fff;
        padding-left: 0;
        z-index: 9999;
        li {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          padding: 6px 0px;
          color: #333;
          font-size: 14px;
          line-height: 28px;
          cursor: pointer;
          span {
            margin-left: 10px;
          }
        }
      }
    }
  }
</style>
