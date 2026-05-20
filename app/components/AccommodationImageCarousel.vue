<script setup lang="ts">
import { ChevronLeft, ChevronRight, ImageIcon } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'
import type { AccommodationImageSlide } from '~~/shared/types/accommodation'

// Definitions
const props = defineProps<{
  slides: AccommodationImageSlide[]
  fallbackAltText: string
}>()

const activeSlideIndex = ref<number>(0)

// Computed
const hasSlides = computed<boolean>(() => props.slides.length > 0)
const hasMultipleSlides = computed<boolean>(() => props.slides.length > 1)
const lastSlideIndex = computed<number>(() => props.slides.length - 1)

const activeSlide = computed<AccommodationImageSlide | null>(() => {
  if (hasSlides.value === false) {
    return null
  }

  const slide: AccommodationImageSlide | undefined = props.slides[activeSlideIndex.value]

  if (slide === undefined) {
    return props.slides[0] ?? null
  }

  return slide
})

const activeSlideAltText = computed<string>(() => {
  if (activeSlide.value === null) {
    return props.fallbackAltText
  }

  return activeSlide.value.altText
})

const activeSlideUrl = computed<string>(() => {
  if (activeSlide.value === null) {
    return ''
  }

  return activeSlide.value.url
})

const slideCountLabel = computed<string>(() => {
  if (hasSlides.value === false) {
    return '0 / 0'
  }

  return `${activeSlideIndex.value + 1} / ${props.slides.length}`
})

// Functions
const createButtonLabel = (action: string): string => {
  return `${action} foto van ${props.fallbackAltText}`
}

const getSlideIndicatorClass = (slideIndex: number): string => {
  if (slideIndex === activeSlideIndex.value) {
    return 'w-7 bg-white'
  }

  return 'w-2.5 bg-white/60 hover:bg-white'
}

const getSlideButtonLabel = (slideIndex: number): string => {
  return `Toon foto ${slideIndex + 1} van ${props.fallbackAltText}`
}

const setActiveSlide = (slideIndex: number): void => {
  if (slideIndex < 0) {
    return
  }

  if (slideIndex > lastSlideIndex.value) {
    return
  }

  activeSlideIndex.value = slideIndex
}

const showPreviousSlide = (): void => {
  if (hasMultipleSlides.value === false) {
    return
  }

  if (activeSlideIndex.value === 0) {
    activeSlideIndex.value = lastSlideIndex.value
    return
  }

  activeSlideIndex.value -= 1
}

const showNextSlide = (): void => {
  if (hasMultipleSlides.value === false) {
    return
  }

  if (activeSlideIndex.value === lastSlideIndex.value) {
    activeSlideIndex.value = 0
    return
  }

  activeSlideIndex.value += 1
}

watch(
  () => props.slides.length,
  (slideCount: number): void => {
    if (slideCount === 0) {
      activeSlideIndex.value = 0
      return
    }

    if (activeSlideIndex.value <= slideCount - 1) {
      return
    }

    activeSlideIndex.value = 0
  },
)
</script>

<template>
  <div>
    <div
      class="relative h-full min-h-56 overflow-hidden bg-[#e7efe8] md:min-h-full"
      aria-label="Fotocarousel accommodatie"
      role="group"
    >
      <img
        v-if="hasSlides === true"
        :alt="activeSlideAltText"
        :src="activeSlideUrl"
        class="h-full min-h-56 w-full object-cover md:min-h-full"
        loading="lazy"
      />
      <div
        v-if="hasSlides === false"
        class="grid h-full min-h-56 place-items-center bg-[#e7efe8] text-[#28665e] md:min-h-full"
      >
        <ImageIcon
          :size="36"
          aria-hidden="true"
        />
        <span class="sr-only">Geen afbeelding beschikbaar</span>
      </div>
      <div
        v-if="hasMultipleSlides === true"
        class="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between px-3"
      >
        <button
          :aria-label="createButtonLabel('Vorige')"
          class="grid h-10 w-10 place-items-center rounded-full bg-white/95 text-[#153f3a] shadow-[0_8px_20px_rgba(21,63,58,0.22)] hover:bg-[#f5c84c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-white"
          type="button"
          @click="showPreviousSlide"
        >
          <ChevronLeft
            :size="22"
            aria-hidden="true"
          />
        </button>
        <button
          :aria-label="createButtonLabel('Volgende')"
          class="grid h-10 w-10 place-items-center rounded-full bg-white/95 text-[#153f3a] shadow-[0_8px_20px_rgba(21,63,58,0.22)] hover:bg-[#f5c84c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-white"
          type="button"
          @click="showNextSlide"
        >
          <ChevronRight
            :size="22"
            aria-hidden="true"
          />
        </button>
      </div>
      <div
        v-if="hasMultipleSlides === true"
        class="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3"
      >
        <div class="flex items-center gap-1.5">
          <button
            v-for="(slide, slideIndex) in slides"
            :key="slide.url"
            :aria-label="getSlideButtonLabel(slideIndex)"
            :class="getSlideIndicatorClass(slideIndex)"
            class="h-2.5 rounded-full shadow-[0_4px_10px_rgba(21,63,58,0.24)] transition-all focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-white"
            type="button"
            @click="setActiveSlide(slideIndex)"
          >
            <span class="sr-only">{{ slide.altText }}</span>
          </button>
        </div>
        <span class="rounded-full bg-[#153f3a]/90 px-2.5 py-1 text-xs font-black text-white">
          {{ slideCountLabel }}
        </span>
      </div>
    </div>
  </div>
</template>
