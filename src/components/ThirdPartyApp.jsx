import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

function ThirdPartyApp() {
  const { user } = useContext(AppContext);
  const { id } = useParams();
  const getSrc = (name) => {
    switch (name) {
      case "econtract":
        return `https://econtract-dev.vnptit3.vn/sso?token=${user?.access_token}&subscription=26721`;
      // case "formsflow":
      //   return "http://localhost:3000/task";
      // case "jbpm":
      //   return "http://10.2.25.82:8080/jbpm-casemgmt";
      case "bonita":
        // hàm đăng nhập và set token, sessionid cho iframe
        async function login(url = "", data = {}) {
          const formData = new URLSearchParams();
          Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
          });

          const res = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData,
            credentials: "include", // Include credentials (cookies) in the request
          });

          const responseCookies = res.headers.get("Set-Cookie");
          console.log(responseCookies); // Access the "Set-Cookie" header value
          const iframe = document.getElementById(id);
          if (iframe && iframe.contentWindow) {
            iframe.contentWindow.document.cookie = `${responseCookies}; domain=${
              import.meta.env.VITE_BONITA_IP
            }/vacation-management; path=/`;
          }

          return res.json();
        }

        login(
          `${
            import.meta.env.VITE_BONITA_IP
          }/bonita/loginservice?redirect=false&redirectUrl=`,
          {
            username: "tech_user",
            password: "secret",
          }
        );
        return `${import.meta.env.VITE_BONITA_IP}/vacation-management`;
      // case "onedx":
      //   return "https://staging.onesme.vn/admin-portal/login";
      default:
        return "";
    }
  };

  const src = getSrc(id);

  return (
    <iframe
      id={id}
      title={id}
      src={src}
      className="w-full h-full border-none"
    />
  );
}

export default ThirdPartyApp;
