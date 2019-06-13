<template>
    <div class="container">
            <van-search placeholder="搜索店内商品" @search="searchSku" @change="changeSearchInput" :value="searchInput"
                        @cancel="cancelSearch"/>
        <button @click="goTo">logon</button>
    </div>
</template>
<config>
    {
    "navigationBarTitleText": "选品中心",
    }
</config>
<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator'
    @Component
    export default class SelectedProducts extends Vue {
        goTo(){
            this.$router.push({
                path: 'common/login',
            });
        }
    }
</script>

