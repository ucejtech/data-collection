import Vue from 'vue';
import Vuex from 'vuex';
import { IClaim  } from '../interfaces/index';
import { Claims } from './../api/models';
import { notify } from '../utils/notify';
import Auth from './modules/auth';

export interface RootState {
  claims: IClaim[];
}

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  state: {
    claims: []
  },
  getters: {
    getClaims(state: RootState) {
      return state.claims
    }
  },
  actions: {
    getClaims({ commit }): void {
        Claims.all()
        .then((result) => {
          commit('SET_CLAIMS', result.data)
        })
        .catch((e) => {
          notify.error(e.toJSON().message, 'Error', 'topRight')
        });
    }
  },
  mutations: {
    SET_CLAIMS(state, claims) {
      state.claims = claims
    }
  },
  modules: {
    auth: Auth
  }
});
