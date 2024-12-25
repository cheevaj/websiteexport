export const state = () => ({
  tokenShow: null,
  en: true,
  dateTime:[],
})

export const mutations = {
  setToken(state, value) {
    state.tokenShow = value
  },
  setLanguage(state, value) {
    state.en = value;
  },
  SET_DATE(state, value){
    state.dateTime = value;
  }
}
export const actions = {}
export const getters = {}
