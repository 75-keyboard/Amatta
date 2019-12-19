<template>
  <v-container class="pa-2" fluid>
    <v-row>
      <v-col>
        <img src="../logo.svg" class="logo" />
        <v-card-text>
          <v-tabs fixed-tabs background-color="white" color="orange" class="fo">
            <v-tab @click="tab = 1">ログイン</v-tab>
            <v-tab @click="tab = 2">新規登録</v-tab>

            <v-tab-item>
              <v-form @submit.prevent="login">
                <v-text-field
                  label="メールアドレス"
                  v-model="loginForm.email"
                  prepend-icon="mdi-account-circle"
                  color="orange"
                />
                <v-text-field
                  :type="showPassword ? 'text' : 'password'"
                  label="パスワード"
                  v-model="loginForm.password"
                  prepend-icon="mdi-lock"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  color="orange"
                />
              </v-form>
            </v-tab-item>
            <v-tab-item>
              <v-form @submit.prevent="login">
                <v-text-field
                  id="form1"
                  label="メールアドレス"
                  v-model="registerForm.email"
                  prepend-icon="mdi-account-circle"
                  color="orange"
                />
                <v-text-field
                  label="ニックネーム"
                  v-model="registerForm.name"
                  prepend-icon="mdi-book"
                  color="orange"
                />
                <v-text-field
                  :type="showPassword ? 'text' : 'password'"
                  label="パスワード"
                  v-model="registerForm.password"
                  prepend-icon="mdi-lock"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  color="orange"
                />
                <v-text-field
                  :type="showPassword ? 'text' : 'password'"
                  label="パスワード(確認)"
                  v-model="registerForm.password_confirmation"
                  prepend-icon="mdi-lock"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  color="orange"
                />
              </v-form>
            </v-tab-item>
          </v-tabs>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="login" v-show="tab === 1">ログイン</v-btn>
          <v-btn @click="register" v-show="tab === 2">新規登録</v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      tab: 1,
      loginForm: {
        email: "",
        password: ""
      },
      registerForm: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      },
      showPassword: false
    };
  },
  methods: {
    async login() {
      // authストアのloginアクションを呼び出す
      await this.$store.dispatch("auth/login", this.loginForm);
    },
    async register() {
      // authストアのresigterアクションを呼び出す
      await this.$store.dispatch("auth/register", this.registerForm);
    }
  }
};
</script>
<style scoped>
.fo {
  width: 100%;
}
.logo {
  margin: 10px 110px 0px 110px;
}
</style>
