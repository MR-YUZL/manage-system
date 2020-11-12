import {
    expect
} from 'chai'
import Vue from 'vue'
import {
    shallowMount,
    mount,
    createLocalVue
} from '@vue/test-utils'
import Antd from "ant-design-vue";
import Modal from '@/components/Modal.vue'

const localVue = createLocalVue()
localVue.use(Antd)

describe('Modal.vue', () => {

    it('编辑状态下，表单是否有值', async () => {
        const wrapper = mount(Modal, {
            localVue,
            // propsData: {   //一进来就有
            //     cloneForm: {
            //         name: '用户',
            //         post: '设计岗',
            //         level: '低级',
            //         recruit: '开发部',
            //         education: '本科',
            //         num: 50
            //     },
            //     title: '编辑'
            // }
        })

        await wrapper.setProps({  //重新赋值
            cloneForm: {
                name: '用户',
                post: '设计岗',
                level: '低级',
                recruit: '开发部',
                education: '本科',
                num: 50
            },
            title: '编辑'
        })
        console.log('wrapper.vm', wrapper.vm.$data.form)
        expect(wrapper.vm.form.name).to.equal('用户')
    })
})