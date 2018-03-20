import React, { Component } from "react";
import ReactDom, { render } from "react-dom";
import { Provider } from "react-redux";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";
import "./less/reset.less";
import "./less/index.less";
import ReduxHeader from "./components/Header/Header.js";
import ReduxNavBar from "./components/NavBar/NavBar.js";
import ReduxNearShop from "./components/NearShop/NearShop.js";
import ReduxInputBox from "./components/InputBox/InputBox.js";
import { store } from "./redux/store.js";

const InputBoxRouter = withRouter(props => <ReduxInputBox {...props}/>);
const ReduxNearShopRouter = withRouter(props => <ReduxNearShop {...props}/>);

class Home extends Component {
  constructor(props) {
    super(props);
    this.toSeach = this.toSeach.bind(this);
  }
  toSeach() {
    this.props.history.push("/search");
  }

  render() {
    return (
      <div>
        <ReduxHeader />
        <div onClick={this.toSeach}>
          <ReduxInputBox />
        </div>
        <ReduxNavBar />
        <ReduxNearShopRouter />
      </div>
    );
  }
}


class Search extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="search-wrapper">
        <ReduxHeader />
        <InputBoxRouter/>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: 0
    };
  }

  changeSupplierType(changeId) {
    this.setState({ currentId: changeId });
  }
  render() {
    return (
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/search" component={Search} />
            <Route path="/404" component={() => <div>notFound</div>} />
            <Redirect to="/404" />
          </Switch>
        </div>
      </Router>
    );
  }
}

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept(() => {
    ReactDom.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById("root")
    );
  });
}
