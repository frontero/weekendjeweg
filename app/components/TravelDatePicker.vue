<script setup lang="ts">
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  deVersBookableArrivalDates,
  deVersBookableDepartureDates,
} from '~~/shared/data/deVersBookableDates'
import type { CalendarDayViewModel } from '~/types/travelDatePicker'

// Definitions
const props = withDefaults(defineProps<{
  modelValue: string
  label: string
  allowedDates?: string[]
  minDate?: string
}>(), {
  minDate: '',
})
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
const route = useRoute()
const deVersAccommodationPath = '/parken/landal-de-vers/accommodaties'
const monthFormatter = new Intl.DateTimeFormat('nl-NL', { month: 'long', year: 'numeric' })
const displayDateFormatter = new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'short', weekday: 'short' })
const fullDateFormatter = new Intl.DateTimeFormat('nl-NL', {
  day: 'numeric',
  month: 'long',
  weekday: 'long',
  year: 'numeric',
})
const dayNameLabels: string[] = ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo']
const componentRoot = ref<HTMLElement | null>(null)
const isOpen = ref<boolean>(false)
const visibleMonth = ref<Date>(createInitialVisibleMonth(props.modelValue, props.minDate))

// Computed
const selectedLabel = computed<string>(() => {
  const selectedDate: Date | null = createDateFromValue(props.modelValue)

  if (selectedDate === null) {
    return 'Kies datum'
  }

  return displayDateFormatter.format(selectedDate)
})

const visibleMonthLabel = computed<string>(() => monthFormatter.format(visibleMonth.value))

const calendarId = computed<string>(() => {
  return `travel-date-calendar-${props.label.toLowerCase()}`
})

const defaultAllowedDates = computed<string[]>(() => {
  if (route.path.includes(deVersAccommodationPath) === false) {
    return []
  }

  if (props.label.toLowerCase() === 'aankomst') {
    return deVersBookableArrivalDates
  }

  if (props.label.toLowerCase() === 'vertrek') {
    return deVersBookableDepartureDates
  }

  return []
})

const allowedDateValues = computed<Set<string> | null>(() => {
  const explicitAllowedDates: string[] = props.allowedDates ?? []

  if (explicitAllowedDates.length > 0) {
    return createAllowedDateValues(explicitAllowedDates)
  }

  return createAllowedDateValues(defaultAllowedDates.value)
})

const calendarDays = computed<CalendarDayViewModel[]>(() => {
  return createCalendarDays(visibleMonth.value, props.modelValue, props.minDate, allowedDateValues.value)
})

const pickerStackClass = computed<string>(() => {
  if (isOpen.value === true) {
    return 'z-[120]'
  }

  return 'z-[30]'
})

// Functions
function createDateFromValue(value: string): Date | null {
  if (value.length === 0) {
    return null
  }

  const parts: string[] = value.split('-')

  if (parts.length !== 3) {
    return null
  }

  return createValidatedDate(parts)
}

function createValidatedDate(parts: string[]): Date | null {
  const year: number = Number(parts[0])
  const monthIndex: number = Number(parts[1]) - 1
  const dayOfMonth: number = Number(parts[2])

  if (Number.isFinite(year) === false || Number.isFinite(monthIndex) === false || Number.isFinite(dayOfMonth) === false) {
    return null
  }

  return new Date(year, monthIndex, dayOfMonth)
}

function createInitialVisibleMonth(modelValue: string, minDate: string): Date {
  const selectedDate: Date | null = createDateFromValue(modelValue)
  const minimumDate: Date | null = createDateFromValue(minDate)
  const baseDate: Date = selectedDate ?? minimumDate ?? new Date(2026, 4, 1)

  return new Date(baseDate.getFullYear(), baseDate.getMonth(), 1)
}

function formatDateValue(date: Date): string {
  const year: string = String(date.getFullYear())
  const month: string = String(date.getMonth() + 1).padStart(2, '0')
  const day: string = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function getMondayStartOffset(date: Date): number {
  const dayIndex: number = date.getDay()

  if (dayIndex === 0) {
    return 6
  }

  return dayIndex - 1
}

function createAllowedDateValues(allowedDates: string[]): Set<string> | null {
  if (allowedDates.length === 0) {
    return null
  }

  return new Set(allowedDates)
}

function createCalendarDays(
  monthDate: Date,
  selectedValue: string,
  minDate: string,
  allowedDates: Set<string> | null,
): CalendarDayViewModel[] {
  const firstOfMonth: Date = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1)
  const firstGridDate: Date = new Date(firstOfMonth)
  const minimumDate: Date | null = createDateFromValue(minDate)

  firstGridDate.setDate(firstOfMonth.getDate() - getMondayStartOffset(firstOfMonth))

  return Array.from({ length: 42 }, (_entry: unknown, index: number): CalendarDayViewModel => {
    return createCalendarDay(firstGridDate, index, monthDate, selectedValue, minimumDate, allowedDates)
  })
}

function isDateDisabled(date: Date, dateValue: string, minimumDate: Date | null, allowedDates: Set<string> | null): boolean {
  if (minimumDate !== null && date < minimumDate) {
    return true
  }

  if (allowedDates === null) {
    return false
  }

  return allowedDates.has(dateValue) === false
}

function createCalendarDay(
  firstGridDate: Date,
  index: number,
  monthDate: Date,
  selectedValue: string,
  minimumDate: Date | null,
  allowedDates: Set<string> | null,
): CalendarDayViewModel {
  const date: Date = new Date(firstGridDate)
  const todayValue: string = formatDateValue(new Date())

  date.setDate(firstGridDate.getDate() + index)

  const dateValue: string = formatDateValue(date)

  return {
    dateValue,
    dayOfMonth: date.getDate(),
    isDisabled: isDateDisabled(date, dateValue, minimumDate, allowedDates),
    isOutsideMonth: date.getMonth() !== monthDate.getMonth(),
    isSelected: dateValue === selectedValue,
    isToday: dateValue === todayValue,
  }
}

function setVisibleMonth(monthOffset: number): void {
  visibleMonth.value = new Date(visibleMonth.value.getFullYear(), visibleMonth.value.getMonth() + monthOffset, 1)
}

function togglePicker(): void {
  isOpen.value = isOpen.value === false
}

function selectDate(day: CalendarDayViewModel): void {
  if (day.isDisabled === true) {
    return
  }

  emit('update:modelValue', day.dateValue)
  isOpen.value = false
}

function getDayButtonClass(day: CalendarDayViewModel): string {
  if (day.isSelected === true) {
    return 'bg-[#c94936] text-white shadow-[0_8px_16px_rgba(201,73,54,0.26)]'
  }

  if (day.isDisabled === true) {
    return 'cursor-not-allowed text-[#b8c3bf]'
  }

  if (day.isOutsideMonth === true) {
    return 'text-[#78908a] hover:bg-[#edf7f4]'
  }

  return 'text-[#1b2f2c] hover:bg-[#edf7f4]'
}

function getDayButtonLabel(day: CalendarDayViewModel): string {
  const date: Date | null = createDateFromValue(day.dateValue)

  if (date === null) {
    return String(day.dayOfMonth)
  }

  if (day.isSelected === true) {
    return `${fullDateFormatter.format(date)}, geselecteerd`
  }

  if (day.isDisabled === true) {
    return `${fullDateFormatter.format(date)}, niet beschikbaar`
  }

  return fullDateFormatter.format(date)
}

function closeWhenClickingOutside(event: MouseEvent): void {
  const target: EventTarget | null = event.target

  if (target instanceof Node === false) {
    return
  }

  if (componentRoot.value === null || componentRoot.value.contains(target) === true) {
    return
  }

  isOpen.value = false
}

function closeWhenPressingEscape(event: KeyboardEvent): void {
  if (event.key !== 'Escape') {
    return
  }

  isOpen.value = false
}

watch(
  () => props.modelValue,
  (value: string): void => {
    const selectedDate: Date | null = createDateFromValue(value)

    if (selectedDate === null) {
      return
    }

    visibleMonth.value = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  },
)

onMounted((): void => {
  document.addEventListener('click', closeWhenClickingOutside)
  document.addEventListener('keydown', closeWhenPressingEscape)
})

onBeforeUnmount((): void => {
  document.removeEventListener('click', closeWhenClickingOutside)
  document.removeEventListener('keydown', closeWhenPressingEscape)
})
</script>

<template>
  <div>
    <div
      ref="componentRoot"
      :class="pickerStackClass"
      class="relative"
    >
      <button
        :aria-controls="calendarId"
        :aria-expanded="isOpen"
        aria-haspopup="dialog"
        class="grid min-h-16 w-full grid-cols-[2.75rem_1fr] items-center gap-3 rounded-lg border border-[#a9beb7] bg-[#fffdf7] p-2 text-left shadow-[0_10px_24px_rgba(21,63,58,0.08)] hover:outline hover:outline-[3px] hover:outline-offset-[3px] hover:outline-[#f5c84c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f5c84c]"
        type="button"
        @click="togglePicker"
      >
        <span class="grid size-11 place-items-center rounded-md bg-[#153f3a] text-white">
          <CalendarDays
            :size="20"
            aria-hidden="true"
          />
        </span>
        <span class="grid gap-0.5">
          <span class="text-xs font-black uppercase text-[#28665e]">{{ label }}</span>
          <span class="text-base font-black text-[#1b2f2c]">{{ selectedLabel }}</span>
        </span>
      </button>

      <div
        v-if="isOpen"
        :id="calendarId"
        class="absolute left-0 z-[90] mt-2 w-[min(21rem,calc(100vw-2rem))] rounded-lg border border-[#d8e4df] bg-white p-3 shadow-[0_20px_48px_rgba(21,63,58,0.22)]"
        role="dialog"
        aria-label="Kalender"
      >
        <div class="mb-3 flex items-center justify-between gap-2">
          <button
            aria-label="Vorige maand"
            class="grid size-10 place-items-center rounded-md border border-[#d8e4df] text-[#153f3a] hover:bg-[#edf7f4] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[2px] focus-visible:outline-[#f5c84c]"
            type="button"
            @click="setVisibleMonth(-1)"
          >
            <ChevronLeft
              :size="18"
              aria-hidden="true"
            />
          </button>
          <p class="text-base font-black capitalize text-[#1b2f2c]">{{ visibleMonthLabel }}</p>
          <button
            aria-label="Volgende maand"
            class="grid size-10 place-items-center rounded-md border border-[#d8e4df] text-[#153f3a] hover:bg-[#edf7f4] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[2px] focus-visible:outline-[#f5c84c]"
            type="button"
            @click="setVisibleMonth(1)"
          >
            <ChevronRight
              :size="18"
              aria-hidden="true"
            />
          </button>
        </div>
        <div class="grid grid-cols-7 gap-1 text-center text-xs font-black uppercase text-[#5b6a66]">
          <span
            v-for="dayName in dayNameLabels"
            :key="dayName"
          >
            {{ dayName }}
          </span>
        </div>
        <div class="mt-2 grid grid-cols-7 gap-1">
          <button
            v-for="day in calendarDays"
            :key="day.dateValue"
            :aria-current="day.isToday === true ? 'date' : undefined"
            :aria-label="getDayButtonLabel(day)"
            :aria-pressed="day.isSelected"
            :class="getDayButtonClass(day)"
            :disabled="day.isDisabled"
            class="min-h-10 rounded-md text-sm font-black transition focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[2px] focus-visible:outline-[#f5c84c] disabled:bg-transparent"
            type="button"
            @click="selectDate(day)"
          >
            {{ day.dayOfMonth }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
