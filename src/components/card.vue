<template>
    <div class="card pa-4">
        <slot />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class Card extends Vue {
        
    }
</script>

<style lang="scss" scoped>
.card {
    background: #fff;
    @include vendor-prefix(box-shadow, 9px 7px 24px 0px rgba(244,232,232,0.75));
    border-radius: 7px;
}
</style>