import Vue from 'vue'
const path = require('path')

function changeStr(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const requireComponent = require.context('.', false, /\.vue$/)

requireComponent.keys().forEach((fileName) => {
    let name = path.basename(fileName, '.vue')
    const config = requireComponent(fileName).default || requireComponent(fileName)
    // const componentName = changeStr(
    //     fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
    // )
    Vue.component(name, config)
})