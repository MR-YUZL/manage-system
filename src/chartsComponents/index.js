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
import FunnelCharts from './FunnelCharts.vue'
import InstrumentCharts from './InstrumentCharts.vue'
import LineCharts2 from './LineCharts2.vue'
import PieCharts2 from './PieCharts2.vue'
import BarCharts2 from './BarCharts2.vue'
import ChinaMap2 from './ChinaMap2.vue'

export {
    BarCharts,
    ChinaMap,
    LineCharts,
    PieCharts,
    ProCharts,
    WaveCharts,
    FunnelCharts,
    InstrumentCharts,
    LineCharts2,
    PieCharts2,
    BarCharts2,
    ChinaMap2
}