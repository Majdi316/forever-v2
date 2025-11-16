//TODO Libraries
//TODO Components
import SearchBar from "../components/SearchBar";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Main from "./main/Main";

//TODO Main Function
const Layout = ({ children }) => {
  //TODO Variables
  const drawerWidth = "0px";
  //TODO Return

  return (
    <>
      <Header drawerWidth={drawerWidth} />
      <SearchBar />
      <Main drawerWidth={drawerWidth}>{children}</Main>
      <Footer drawerWidth={drawerWidth} />
    </>
  );
};

export default Layout;
