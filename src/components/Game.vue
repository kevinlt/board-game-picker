<template>
    <div>
        <slot></slot>
        <a :href="'/#/game?id='+game.gameId">{{ game.name }}</a>
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
