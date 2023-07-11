import "./App.css";
import { Button, Layout, Menu, Popover } from "antd";
import Logo from "./assets/Logo.jsx";
import { Route, Switch, useHistory } from "react-router-dom";
import WorkplaceIcon from "./assets/WorkplaceIcon.jsx";
import ContractIcon from "./assets/ContractIcon.jsx";
import ThirdPartyApp from "./components/ThirdPartyApp.jsx";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext.jsx";
import Cookie from "js-cookie";
import LoginPage from "./page/LoginPage.jsx";
import AppIcon from "./assets/AppIcon.jsx";
import UserIcon from "./assets/UserIcon.jsx";

const { Sider, Content } = Layout;

function App() {
  const { setUser, user } = useContext(AppContext);

  const history = useHistory();
  const menuItem = [
    {
      key: "/workplace",
      label: "Workplace",
      icon: <WorkplaceIcon />,
      children: [
        {
          key: "/workplace/econtract",
          label: "Econtract",
          icon: <ContractIcon />,
        },
        // {
        //   key: "/workplace/jbpm",
        //   label: "JBPM",
        //   icon: <ContractIcon />,
        // },
        {
          key: "/workplace/bonita",
          label: "Bonita",
          icon: <AppIcon />,
        },
        // {
        //   key: "/workplace/onedx",
        //   label: "onedx",
        //   icon: <ContractIcon />,
        // },
      ],
    },
  ];

  const headerStyle = {
    backgroundColor: "#2c3d94",
    height: "104px",
    padding: "28px 32px",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    width: "100vw",
  };

  const bodyStyle = {
    paddingTop: "104px",
    display: "flex",
  };

  const siderStyle = {
    position: "fixed",
    top: 0,
    width: "240px",
    paddingTop: "104px",
  };

  const contentStyle = {
    height: "100vh",
    marginLeft: "240px",
  };

  useEffect(() => {
    const token = Cookie.get("access_token");
    const loggedInUser = localStorage.getItem("user");
    if (token && loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    } else {
      Cookie.remove("access_token");
      localStorage.removeItem("user");
    }
  }, []);

  if (!user?.access_token) return <LoginPage />;

  return (
    <Layout>
      <header style={headerStyle} className="flex items-center justify-between">
        <a className="" href="/">
          <Logo />
        </a>
        <Popover
          placement="bottomRight"
          content={
            <Button
              type="ghost"
              className="flex items-center justify-center"
              onClick={() => {
                Cookie.remove("access_token");
                localStorage.removeItem("user");
                setUser({});
              }}
            >
              Đăng xuất
            </Button>
          }
        >
          <div className="rounded-full bg-white h-12 w-12 flex items-center justify-center cursor-pointer">
            <UserIcon />
          </div>
        </Popover>
      </header>
      <Layout style={bodyStyle}>
        <Sider style={siderStyle} width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[]}
            defaultOpenKeys={["/workplace"]}
            style={{ height: "100vh", width: "240px" }}
            items={menuItem}
            onSelect={(e) => {
              history.push(e.key);
            }}
          />
        </Sider>
        <Content style={contentStyle}>
          <Switch>
            <Route path={`/workplace/:id`} exact>
              <ThirdPartyApp />
            </Route>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
