<template>
  <div class="challenge">
    <img id="company-logo" alt="Vue logo" src="../../assets/logo.png" />
      <h1>Debt Collection</h1>
    <div class="auth d-flex align-center justify-center">
      <form class="auth__form mt-4" @submit.prevent="signIn">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email ex: 123@gmail.com"
            class="form__input px-3 py-2"
            autocomplete="false"
            v-model="email"
            required
          />
        <div class="auth__btnSection">
          <button class="auth__cta" type="submit">Let me In</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { AxiosResponse } from 'node_modules/axios';
import { Component, Vue, Prop } from "vue-property-decorator";
import { namespace } from 'vuex-class'

const auth = namespace('auth')

@Component
export default class Login extends Vue {
  @Prop()
  msg!: string;

  email = ''

  async signIn() {
    if (this.email) {
      const loginReq = await this.login(this.email)
      if (loginReq) this.$router.push('/dashboard')
    }
  }

  @auth.Action
  // eslint-disable-next-line no-unused-vars
  private login!: (email: string) => Promise<AxiosResponse>;
}
</script>

<style lang="scss" scoped>
.challenge {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  #company-logo {
    width: 120px;
  }
}

.auth__form {
  @include flex(center, column);
  div {
    @include flex(center, column);
  }

  .auth__cta {
    color: white;
    text-decoration: none;
    padding: 0.5em 1em;
    height: 35px;
    display: inline-block;
    margin-top: 0.5em;
    cursor: pointer;
    border: none;
    background: picker(primary, dark-blue);
    width: 300px;
  }
  .form__input {
    height: 35px;
    box-sizing: border-box;
    width: 300px;
    outline: none;
    border: 1px solid picker(primary, dark-blue);
    font-size: 1em;
  }
}
</style>
