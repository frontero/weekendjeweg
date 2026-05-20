<script setup lang="ts">
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { nl } from 'date-fns/locale/nl'
import { CalendarDays } from 'lucide-vue-next'
import { computed } from 'vue'
import type {
  AriaLabelsConfig,
  FloatingConfig,
  FormatsConfig,
  InputAttributesConfig,
  TimeConfig,
  UIConfig,
} from '@vuepic/vue-datepicker'
import type { Locale } from 'date-fns'

// Definitions
const props = withDefaults(defineProps<{
  modelValue: string
  label: string
  minDate?: string
}>(), {
  minDate: '',
})
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
const displayDateFormatter = new Intl.DateTimeFormat('nl-NL', {
  day: 'numeric',
  month: 'short',
  weekday: 'short',
})
const datePickerLocale: Locale = nl
const datePickerFormats: Partial<FormatsConfig> = {
  input: formatInputDate,
}
const datePickerFloating: Partial<FloatingConfig> = {
  offset: 8,
  placement: 'bottom-start',
  strategy: 'fixed',
}
const datePickerTimeConfig: Partial<TimeConfig> = {
  enableTimePicker: false,
}
const datePickerUi: Partial<UIConfig> = {
  calendar: 'rounded-lg border-0 bg-white text-[#1b2f2c]',
  calendarCell: 'rounded-md font-black text-[#1b2f2c] hover:bg-[#edf7f4]',
  input: 'min-h-14 rounded-lg border border-[#a9beb7] bg-[#fffdf7] pl-12 pr-3 text-base font-black text-[#1b2f2c] shadow-[0_10px_24px_rgba(21,63,58,0.08)]',
  menu: '!z-[90] rounded-lg border border-[#d8e4df] bg-white shadow-[0_20px_48px_rgba(21,63,58,0.22)]',
  navBtnNext: 'rounded-md text-[#153f3a] hover:bg-[#edf7f4]',
  navBtnPrev: 'rounded-md text-[#153f3a] hover:bg-[#edf7f4]',
}

// Computed
const inputId = computed<string>(() => {
  return `travel-date-${props.label.toLowerCase()}`
})

const selectedDateValue = computed<string | null>({
  get: (): string | null => {
    if (props.modelValue.length === 0) {
      return null
    }

    return props.modelValue
  },
  set: (value: string | null): void => {
    emit('update:modelValue', value ?? '')
  },
})

const datePickerInputAttributes = computed<Partial<InputAttributesConfig>>(() => {
  return {
    autocomplete: 'off',
    clearable: false,
    id: inputId.value,
    inputmode: 'none',
    required: false,
  }
})

const datePickerAriaLabels = computed<Partial<AriaLabelsConfig>>(() => {
  return {
    calendarIcon: 'Open kalender',
    clearInput: 'Wis datum',
    input: props.label,
    menu: 'Kalender',
    nextMonth: 'Volgende maand',
    openMonthsOverlay: 'Kies maand',
    openYearsOverlay: 'Kies jaar',
    prevMonth: 'Vorige maand',
  }
})

// Functions
function formatInputDate(date: Date): string {
  return displayDateFormatter.format(date)
}
</script>

<template>
  <div>
    <div class="grid gap-2">
      <label
        :for="inputId"
        class="text-sm font-black uppercase text-[#28665e]"
      >
        {{ label }}
      </label>
      <VueDatePicker
        v-model="selectedDateValue"
        :aria-labels="datePickerAriaLabels"
        :auto-apply="true"
        :clearable="false"
        :floating="datePickerFloating"
        :formats="datePickerFormats"
        :input-attrs="datePickerInputAttributes"
        :locale="datePickerLocale"
        :min-date="minDate"
        :prevent-min-max-navigation="true"
        :teleport="true"
        :time-config="datePickerTimeConfig"
        :transitions="true"
        :ui="datePickerUi"
        model-type="yyyy-MM-dd"
        placeholder="Kies datum"
        week-start="1"
      >
        <template #input-icon>
          <span class="pointer-events-none absolute left-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-md bg-[#153f3a] text-white">
            <CalendarDays
              :size="17"
              aria-hidden="true"
            />
          </span>
        </template>
      </VueDatePicker>
    </div>
  </div>
</template>
