<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Card from './Card.vue'

const cards = Array.from(Array(100), (_, x) => `Card ${x + 1}`)
const cardRefs = ref<HTMLElement[]>([])
const focusedCardIndex = ref<number | null>(null)
const lastScrollY = ref(0)

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
}

const observer = new IntersectionObserver((entries) => {
  const currentScrollY = window.scrollY
  const scrollingDown = currentScrollY > lastScrollY.value
  lastScrollY.value = currentScrollY

  const visibleCards = entries
    .filter((entry) => entry.isIntersecting)
    .map((entry) => cardRefs.value.findIndex((ref) => ref === entry.target))

  if (visibleCards.length > 0) {
    if (scrollingDown || focusedCardIndex.value === null) {
      focusedCardIndex.value = Math.min(...visibleCards)
    } else {
      focusedCardIndex.value = Math.max(...visibleCards)
    }
  }
}, observerOptions)

onMounted(() => {
  cardRefs.value.forEach((card) => observer.observe(card))
})

onUnmounted(() => {
  observer.disconnect()
})
</script>

<template>
  <div>
    <div v-for="(card, index) in cards" :key="index" ref="cardRefs">
      <Card :cardText="card" :isInFocus="index === focusedCardIndex">
        <p>{{ card }}</p>
      </Card>
    </div>
  </div>
</template>

<style scoped></style>
