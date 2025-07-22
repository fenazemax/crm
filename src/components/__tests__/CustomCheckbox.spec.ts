import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CustomCheckbox from '@/components/CustomElements/CustomCheckbox.vue'

describe('CustomCheckbox.vue', () => {
  it('renders checkbox as checked when modelValue is true', () => {
    const wrapper = mount(CustomCheckbox, {
      props: {
        modelValue: true,
      },
    })

    const input = wrapper.find('input[type="checkbox"]')
    expect((input.element as HTMLInputElement).checked).toBe(true)
  })

  it('renders checkbox as unchecked when modelValue is false', () => {
    const wrapper = mount(CustomCheckbox, {
      props: {
        modelValue: false,
      },
    })

    const input = wrapper.find('input[type="checkbox"]')
    expect((input.element as HTMLInputElement).checked).toBe(false)
  })

  it('emits update:modelValue with toggled value when clicked', async () => {
    const wrapper = mount(CustomCheckbox, {
      props: {
        modelValue: false,
      },
    })

    const input = wrapper.find('input[type="checkbox"]')
    await input.setValue(true)

    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue']![0]).toEqual([true])
  })
})
