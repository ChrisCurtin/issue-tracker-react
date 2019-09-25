import React, { Component } from 'react';
import './App.css';
import {
   Route,
   withRouter,
   Switch} from 'react-router-dom';

import Loading from './Loading/Loading';
import Login from './Login/Login';

import NotFound from './ui/NotFound';
import AppHeader from './ui/AppHeader';

import { getCurrentUser } from './API/API';
import { ACCESS_TOKEN } from './constants/constants';

import { Layout, notification } from 'antd';
const { Content } = Layout;

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         currentUser: null,
         isAuthenticated: false,
         isLoading: false
      }
      this.handleLogin.bind(this);

      notification.config({
            placement: 'topRight',
            top: 70,
            duration: 3,
          });
   }

   loadCurrentUser() {
       this.setState({
         isLoading: true
       });
       getCurrentUser()
       .then(response => {
         this.setState({
           currentUser: response,
           isAuthenticated: true,
           isLoading: false
         });
       }).catch(error => {
         this.setState({
           isLoading: false
         });
       });
     }

     componentDidMount() {
         this.loadCurrentUser();
       }

   handleLogin() {
       notification.success({
         message: 'Polling App',
         description: "You're successfully logged in.",
       });
       this.loadCurrentUser();
       this.props.history.push("/");
     }

 render() {
    if(this.state.isLoading) {
      return <Loading />
    }
    return (
        <Layout className="app-container">
          <AppHeader isAuthenticated={this.state.isAuthenticated}
            currentUser={this.state.currentUser}
            onLogout={this.handleLogout} />

          <Content className="app-content">
            <div className="container">
              <Switch>
                <Route path="/login" render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
                <Route component={NotFound}></Route>
              </Switch>
            </div>
          </Content>
        </Layout>
    );
  }
}

export default withRouter(App);
