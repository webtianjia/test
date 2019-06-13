<template>
    <div class="container">

        <van-search placeholder="搜索订单号" @search="searchOrder" @change="changeSearchInput" :value="searchInput"
                    @cancel="cancelSearchOrder"/>
    </div>
</template>
<config>
    {
    "navigationBarTitleText": "订单管理",
    }
</config>
<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator'



    @Component

    export default class OrderList extends Vue {

    }
</script>
<style>


</style>

