<template>
  <main class="container">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-tabs
        :activeKey="activeKey"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <a-tab-pane key="tab1" tab="账号密码登录">
          <a-alert
            v-if="isLoginError"
            type="error"
            showIcon
            style="margin-bottom: 24px"
            message="账户或密码错误"
          ></a-alert>
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="账户: admin"
              v-decorator="[
                'username',
                {
                  rules: [{ required: true, message: '请输入帐户名' }],
                  validateTrigger: 'change',
                },
              ]"
            >
              <a-icon
                slot="prefix"
                type="user"
                :style="{ color: 'rgba(0,0,0,.25)' }"
              />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input-password
              size="large"
              placeholder="密码: admin"
              v-decorator="[
                'password',
                {
                  rules: [{ required: true, message: '请输入密码' }],
                  validateTrigger: 'blur',
                },
              ]"
            >
              <a-icon
                slot="prefix"
                type="lock"
                :style="{ color: 'rgba(0,0,0,.25)' }"
              />
            </a-input-password>
          </a-form-item>
        </a-tab-pane>

        <a-tab-pane key="tab2" tab="手机号登录">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="手机号"
              v-decorator="[
                'mobile',
                {
                  rules: [
                    {
                      required: true,
                      pattern: /^1[34578]\d{9}$/,
                      message: '请输入正确的手机号',
                    },
                  ],
                  validateTrigger: 'change',
                },
              ]"
            >
              <a-icon
                slot="prefix"
                type="mobile"
                :style="{ color: 'rgba(0,0,0,.25)' }"
              />
            </a-input>
          </a-form-item>

          <a-row :gutter="16">
            <a-col  :span="16">
              <a-form-item>
                <a-input
                  size="large"
                  type="text"
                  placeholder="验证码"
                  v-decorator="[
                    'captcha',
                    {
                      rules: [{ required: true, message: '请输入验证码' }],
                      validateTrigger: 'blur',
                    },
                  ]"
                >
                  <a-icon
                    slot="prefix"
                    type="mail"
                    :style="{ color: 'rgba(0,0,0,.25)' }"
                  />
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-button
                class="getCaptcha"
                v-text="'获取验证码'"
              ></a-button>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>

      <a-form-item>
        <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]"
          >自动登录</a-checkbox
        >
        <router-link :to="{ name: '', params: {} }" style="float: right"
          >忘记密码</router-link
        >
      </a-form-item>

      <a-form-item style="margin-top: 24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="loginBtn"
          :disabled="loginBtn"
          >确定</a-button
        >
      </a-form-item>
    </a-form>
  </main>
</template>

<script>
import { login } from "@/api/login";
export default {
  name: "login",
  components: {},
  props: {},
  data() {
    return {
      form: this.$form.createForm(this),
      activeKey: "tab1",
      isLoginError: false,
      loginBtn: false,
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      const {
        form: { validateFields },
        activeKey,
      } = this;

      this.loginBtn = true;

      const validateFieldsKey =
        activeKey === "tab1" ? ["username", "password"] : ["mobile", "capcha"];

      validateFields(validateFieldsKey, { force: false }, (err, values) => {
        if (!err) {
          const loginParams = { ...values };

          login(loginParams)
            .then((res) => this.loginSuccess(res))
            .catch((err) => this.loginFailed(err))
            .finally(() => {
              this.loginBtn = false;
            });

        } else {
          this.loginBtn = false;
        }
      });
    },
    handleTabClick(key) {
      this.activeKey = key;
    },
    loginSuccess(res) {
      console.log("res", res);
      // this.$router.push({ path: "/homePage" });

      setTimeout(() => {
        this.$notification.success({
          message: "登录成功",
          description: `企蜂云欢迎您`,
        });
      }, 1000);

      this.isLoginError = false;
    },
    loginFailed(err) {
      console.log("err", err);
      this.isLoginError = true;
      this.$notification.error({
        message: "错误",
        description: `账户或密码错误`,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  .login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }
  .getCaptcha{
    display: block;
    width: 100%;
    height: 40px;
  }
}
</style>
