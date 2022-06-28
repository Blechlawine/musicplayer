<template>
    <div class="cardList grid gap-2 p-2">
        <slot name="items">
            
        </slot>
    </div>
</template>

<style lang="sass">
.cardList
    grid-template-columns: repeat(auto-fit, minmax(160px, 200px))
    grid-auto-flow: row
</style>