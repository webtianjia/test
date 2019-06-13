<template>
    <div class="container">
        <van-search placeholder="搜索店内商品" @search="searchSku" @change="changeSearchInput" :value="searchInput"
                    @cancel="cancelSearch"/>
    </div>
</template>
<config>
    {
    "navigationBarTitleText": "我的商品",
    }
</config>
<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator'
    import {State} from 'vuex-class'


    @Component
    export default class MySku extends Vue {

    }
</script>

