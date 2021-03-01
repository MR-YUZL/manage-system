import Vue from 'vue'
import Vuex from 'vuex'

const path = require('path')
const modules = {}
const modulesFiles = require.context('./modules', false, /\.js$/)

modulesFiles.keys().forEach(fileName => {
  let name = path.basename(fileName, '.js')
  modules[name] = modulesFiles(fileName).default
});

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  state: {

  },
  mutations: {

  },
  actions: {

  },
})