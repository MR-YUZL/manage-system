// import Vue from 'vue'

// function changeStr(str) {
//     return str.charAt(0).toUpperCase() + str.slice(1)
// }

// const requireComponent = require.context('.', false, /\.vue$/)

// requireComponent.keys().forEach((fileName) => {
//     const config = requireComponent(fileName).default
//     const componentName = changeStr(
//         fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')   
//     )
//     Vue.component(componentName, config)
// })
import BarCharts from './BarCharts.vue'
import ChinaMap from './ChinaMap.vue'
import LineCharts from './LineCharts.vue'
import PieCharts from './PieCharts.vue'
import ProCharts from './ProCharts.vue'
import WaveCharts from './WaveCharts.vue'

export {
    BarCharts,
    ChinaMap,
    LineCharts,
    PieCharts,
    ProCharts,
    WaveCharts
}