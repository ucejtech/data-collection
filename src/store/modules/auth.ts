import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators';
import { AccountsApi } from '../../api/Accounts';
import { IAccount } from '../../interfaces/index';
import { notify } from '@/utils/notify';

export interface AuthState {
  user: IAccount | null;
}

@Module({ namespaced: true })
class Auth extends VuexModule {
  get isAuthenticated(): boolean {
    return this.user ? true : false;
  }

  get getUser(): IAccount | null {
    return this.user
  }

  user: IAccount | null = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') || '')
    : null;

  @Action({ rawError: true })
  login(email: string): Promise<boolean> {
    return AccountsApi.findEmail(email)
      .then((result) => {
        const [account] = result.data;
        if (account) {
          this.context.commit('SET_USER', account);
          localStorage.setItem('user', JSON.stringify(account));
          return true;
        }

        notify.error('Email does not exist', 'Error', 'topCenter');
        return false;
      })
      .catch((e) => {
        notify.error(e.toJSON().message, 'Error', 'topCenter');
        return false;
      });
  }

  @Action({ rawError: true })
  logout(): boolean {
    localStorage.clear();
    this.user = null;
    return true;
  }

  @Mutation
  SET_USER(user: IAccount): void {
    this.user = user;
  }
}

export default Auth;
