import "./App.css";
import Footer from "./components/landingPage/Footer";
import Header from "./components/landingPage/Header";
import Router from "./Route";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Router />
      <Footer />
    </>
  );

  // {
  //   this.props.user.auth ? (
  //     <Redirect from="*" to="/" />
  //   ) : (
  //     <Redirect from="*" to="/signin" />
  //   );
  // }
}
export default App;
