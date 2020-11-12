import {
    expect
} from 'chai'
import {
    shallowMount,
    mount,
    createLocalVue
} from '@vue/test-utils'
import Vue from 'vue'
import Antd from "ant-design-vue";
import List from '@/components/List.vue'

const localVue = createLocalVue()
localVue.use(Antd)

describe('List.vue', () => {
    it('点击列表后是否高亮', async () => {
        const wrapper = mount(List, {
            localVue,
            propsData: {
                list: [{
                    name: '用户',
                    username: 'admin'
                }]
            }
        })
        // await wrapper.setData({
        //     isClick: 'admin',
        //     isEdit: ''
        // }) //数据操作需要做异步处理   第一种做法
        wrapper.find('.list--item').trigger('click')
        await Vue.nextTick()   //第二种做法

        // await wrapper.find('.list--item').trigger('click')
        expect(wrapper.html()).contain('list--click')
    })
})