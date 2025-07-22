import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CustomSortDeal from '@/components/CustomElements/CustomSortDeal.vue'

const mockOptions = [
  { label: 'Price', value: 'price' },
  { label: 'Area', value: 'area' },
  { label: 'Date', value: 'date' },
]

describe('CustomSortDeal.vue', () => {
  it('renders correctly with given props', () => {
    const wrapper = mount(CustomSortDeal, {
      props: {
        modelValue: 'price',
        options: mockOptions,
      },
    })
    expect(wrapper.text()).toContain('Sort by: Price')
  })

  it('opens dropdown on button click', async () => {
    const wrapper = mount(CustomSortDeal, {
      props: {
        modelValue: 'price',
        options: mockOptions,
      },
    })
    expect(wrapper.find('ul').isVisible()).toBe(false)
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('ul').isVisible()).toBe(true)
  })

  it('emits update:modelValue on item click and closes dropdown', async () => {
    const wrapper = mount(CustomSortDeal, {
      props: {
        modelValue: 'price',
        options: mockOptions,
      },
    })
    await wrapper.find('button').trigger('click')
    const areaItem = wrapper.findAll('li').find((li) => li.text() === 'Area')!
    await areaItem.trigger('click')
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['area'])
    expect(wrapper.find('ul').isVisible()).toBe(false)
  })
})
