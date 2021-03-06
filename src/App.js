import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import Footer from "./components/Footer/Footer";
import FeedPage from "./components/FeedPage/FeedPage";
import PostPage from "./components/PostPage/PostPage";
import Notifications from "./components/Notifications/Notifications";
import Loggin from "./components/Loggin/Loggin"; 
import Signup from "./components/signUp/signUp";

function App() {
  const [userId, setUserId] = useState("");
  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    setUserId(window.localStorage.getItem("my_id") || userId); 
    console.log("localstorage",window.localStorage.getItem("my_id"))
    console.log("userId",userId)
  }, [userId, refresh]);

  // UPON FIRING OUR APP, WE SET USER ID TO LOCAL STORAGE.
  // WE ALSO PASS SETUSERID AS A PROP TO LOGGIN  
  // AND SETUSERID AS A CALLBACK TO GETPROFILESLOGGIN AT LOGGIN
  // NEXT WE PAST USERID TO OTHER COMPONENTS, USING CONSOLE.LOG TO CHECK USERID IS STILL CORRECT

  return (
    <div className="App">
      {/* <BrowserRouter basename="/"> */}
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={(routerProps) => <Loggin {...routerProps} userId={userId} setUserId={setUserId} setRefresh={setRefresh} />} 
            // THIS IS WORKING ON REFRESH NOW, SO WE NEED TO PASS SAME PROPS TO FEEDPAGE ETC!
          />
          <Route
            exact
            path="/signup"
            render={(routerProps) => <Signup {...routerProps} />} 
          />
          <div>
            <Container
              fluid
              className="pt-5 main"
              style={{ minHeight: "100vh" }}
            >
              <Navbar />
              <Route
                exact
                path="/home"
                render={(routerProps) => <FeedPage id={userId} />}
              />
              <Route
                eaxct
                path="/post/:postId"
                render={(routerProps) => (
                  <>
                    <PostPage {...routerProps} id={userId} />
                    <Footer />
                  </>
                )}
              ></Route>
              <Route
                exct
                path="/profile/:userId"
                render={(routerProps) => (
                  <>
                    <ProfilePage {...routerProps} id={userId} />
                    <Footer />
                  </>
                )}
              ></Route>
              <Route
                exact
                path="/notifications"
                render={(routerProps) => (
                  <>
                    <Notifications {...routerProps} />
                  </>
                )}
              ></Route>
            </Container>
          </div>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
