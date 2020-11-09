import {
    expect
} from 'chai'
import {
    shallowMount
} from '@vue/test-utils'
import Test from '@/components/Test.vue'

describe('Test.vue', () => {
    //   it('increments count when button is clicked', () => {
    //     const wrapper = shallowMount(Test)
    //     wrapper.find('button').trigger('click')
    //     expect(wrapper.find('div').text()).contains('1')
    //   })

    it('should render correct contents', () => {
        const wrapper = shallowMount(Test);
        let content = wrapper.vm.$el.querySelector('h1').textContent;
        expect(content).to.equal('yuzelin');
    });
})