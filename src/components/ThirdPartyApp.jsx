import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import PageNotFound from "./PageNotFound";

function ThirdPartyApp({ cookies, isAdmin }) {
  const { user } = useContext(AppContext);
  const { id } = useParams();
  const getSrc = (name) => {
    switch (name) {
      case "econtract":
        return `https://econtract-dev.vnptit3.vn/sso?token=${user?.access_token}&subscription=27869`;
      case "ekyc":
        return `https://ekyc.icenter.ai/admin-dashboard/login-onesme?token=${user?.access_token}&subscription=27870`;
      case "page-builder":
        return `https://onedx-report.vnpt-technology.vn:44328/admin-portal/display/list?access_token=${user?.access_token}&refresh_token=${user?.refresh_token}`;
      // case "salesman":
      //   return `http://10.15.17.73:8000/saleman/?tokenonesme=${user?.access_token}&subscription=27868`;
      // case "formsflow":
      //   return "http://localhost:3000/task";
      // case "jbpm":
      //   return "http://10.2.25.82:8080/jbpm-casemgmt";
      case "bonita":
        const iframe = document.getElementById(id);
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.document.cookie = `${cookies}; domain=${
            import.meta.env.VITE_BONITA_IP
          }/vacation-management; path=/`;
        }

        return `${import.meta.env.VITE_BONITA_IP}/bonita/apps/tahiti/index/`;
      // case "onedx":
      //   return "https://staging.onesme.vn/admin-portal/login";
      default:
        return "";
    }
  };

  const src = getSrc(id);

  const accessDeny =
    (isAdmin && ["ekyc", "econtract"]?.includes(id)) ||
    (!isAdmin && id === "page-builder");
  if (accessDeny) return <PageNotFound />;

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
