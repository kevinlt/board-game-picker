<template>
    <div>
        <slot></slot>
        <span>{{ game.name }}</span>
        <span class="time">{{ game.playingTime }}</span>
        <span class="rating">{{ game.averageRating }}</span>
    </div>
</template>

<script>
export default {
  name: 'Game',
  props: ['game']
}
</script>
