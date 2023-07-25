import React, { useContext } from "react";
import VNPT from "../assets/VNPT.jsx";
import { Button, Form, Input } from "antd";
import superagent from "superagent";
import { AppContext } from "../context/AppContext.jsx";
import Cookie from "js-cookie";
import axios from "axios";

function LoginPage() {
  const { setUser } = useContext(AppContext);
  const [form] = Form.useForm();
  const getTokenStaging = async (value) => {
    const responseBody = (res) => (res.body ? res.body : res.text);
    return await superagent
      .post(`https://staging.onesme.vn/auth-server/oauth/token`, {
        username: `${value.username} KHDN`,
        password: value.password,
        grant_type: "password",
        scope: "0",
      })
      .type("form")
      .auth("vnpt_clientid", "secret")
      .then(responseBody);
  };

  const getUserProfile = async (token) => {
    return await axios
      .create({
        baseURL: "https://staging.onesme.vn",
        headers: token
          ? {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          : {
              "Content-type": "application/json",
            },
      })
      .get("https://staging.onesme.vn/auth-server/api/users/profile")
      .then((res) => res.data);
  };

  const onFinish = async (value) => {
    const access = await getTokenStaging(value);
    const userProfile = await getUserProfile(access.access_token);
    setUser({ ...access, ...userProfile });
    localStorage.setItem("user_profile", JSON.stringify(userProfile));
    localStorage.setItem("user", JSON.stringify(access));
    Cookie.set("access_token", access.access_token, {
      expires: 1 / 24,
      sameSite: "Lax",
    });
  };

  return (
    <div className="w-96 pt-16 mx-auto">
      <div className="text-center text-primary">
        <div className="flex items-center justify-center">
          <VNPT />
        </div>
        <div className="text-3xl font-extrabold mt-4 mb-20">
          OneSME Working place
        </div>
      </div>
      <div className="text-lg font-semibold mb-4 text-primary">Đăng nhập</div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="username">
          <Input size="large" placeholder="Email" />
        </Form.Item>
        <Form.Item name="password">
          <Input.Password size="large" placeholder="Mật khẩu" />
        </Form.Item>
        <Button
          htmlType="submit"
          size="large"
          type="primary"
          className="w-full"
        >
          Đăng nhập
        </Button>
      </Form>
    </div>
  );
}

export default LoginPage;
