<template>
    <div class="my-store">

            <van-nav-bar title-class="van-nav-bar-title" custom-class="van-nav-bar " title="我的店"
                         :left-arrow="false"></van-nav-bar>
    </div>
</template>
<config>
    {
    "navigationStyle":"custom",
    "navigationBarTextStyle": "white",
    "disableScroll": true
    }
</config>
<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator'

    @Component
    export default class MyStore extends Vue {

    }
</script>

<style lang="less" scoped>

</style>
