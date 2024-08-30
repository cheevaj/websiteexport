export const state = () => ({
  tokenShow: null,
  en: true,
})

export const mutations = {
  setToken(state, value) {
    state.tokenShow = value
  },
  setLanguage(state, value) {
    state.en = value;
  },
}
export const actions = {}
export const getters = {}
