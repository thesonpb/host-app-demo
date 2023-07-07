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
      case "jbpm":
        return "http://10.2.25.82:8080/jbpm-casemgmt";
      case "bonita":
        return "https://onedx-report.vnpt-technology.vn:44328";
      case "onedx":
        return "https://staging.onesme.vn/admin-portal/login";
      default:
        return "";
    }
  };
  const src = getSrc(id);
  return <iframe title={id} src={src} className="w-full h-full border-none" />;
}

export default ThirdPartyApp;
