<template>
  <nav class="px-10">
    <a href="/">
      <img alt="Vue logo" src="../assets/logo.png" width="40px" />
    </a>
    <ul class="my-0">
      <router-link
        v-for="(route, index) in routes"
        :key="index"
        :to="route.link"
        class="mx-3"
        >{{ route.title }}</router-link
      >
    </ul>
    <ul>
      {{
        currentUser.debtor.firstName
      }}
      <img
        class="avatar"
        alt="avatar"
        src="https://picsum.photos/200/200?random=1"
        width="30px"
      />
      <button @click="signOut">
        <i class="mdi mdi-logout"></i>
      </button>
    </ul>
  </nav>
</template>

<script lang="ts">
import { namespace } from 'vuex-class';
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

const auth = namespace('auth')

@Component({
  computed: {
    ...mapGetters({
      currentUser: "auth/getUser",
    }),
  },
})
export default class NavigationBar extends Vue {
  routes = [
    {
      title: "Dashboard",
      link: "/dashboard",
    },
    {
      title: "Accounts",
      link: "/dashboard/accounts",
    },
  ];

  signOut() {
    this.logout()
    window.location.reload()
  }

  @auth.Action
  private logout!: () => void;
}
</script>

<style lang="scss" scoped>
nav {
  @include flex(space-between, row);
  background: #fff;

  ul {
    @include flex(space-evenly, row);
    gap: 15px;

    .avatar {
      border-radius: 50%;
    }

    button {
      border: none;
      background: transparent;
      cursor: pointer;
    }

    a {
      text-decoration: none;
      padding: 15px 0px;
      border-bottom: 5px solid transparent;
      font-weight: 600;
      font-size: 13px;

      &.router-link-exact-active,
      &:hover {
        border-bottom: 5px solid picker(primary, dark-blue);
      }
    }
  }
}
</style>
