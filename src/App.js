import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";


import { connect } from "react-redux";
import { getRwd, setRwdMode } from "./store/rwdRedux";

//SErvices
import {get24hChange} from './services/binance';

//Components
import ListUsdtCoins from "./components/entities/listUsdtCoins";
import USDT from "./components/entities/USDT/usdt";
class App extends Component {
  state = {
  };

  handleRwd = e => {
    const {setRwd} = this.props;
    const height = e.target.window.innerHeight;
    const width = e.target.window.innerWidth;
    setRwd({height, width});
  }

  componentDidMount(){
    const {setRwd} = this.props;
    //RWD
    const height = window.innerHeight;
    const width = window.innerWidth;
    setRwd({height, width});
    window.addEventListener('resize', this.handleRwd);
  }

  render() {
    const {rwd} = this.props;
    return (
      <div style={{width: '100%', height: '100%'}}>
        <USDT rwd={rwd}/>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setRwd : mode => dispatch(setRwdMode(mode)),
});

const mapStateToProps = state => ({
  rwd : getRwd(state),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(App);

export {Container as  App};
