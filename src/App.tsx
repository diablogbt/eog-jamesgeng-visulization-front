import React from 'react';
import createStore from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import NowWhat from './components/NowWhat';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

// const App = () => (
//   <MuiThemeProvider theme={theme}>
//     <CssBaseline />
//     <Provider store={store}>
//       <Wrapper>
//         <Header />
//         <NowWhat />
//         <ToastContainer />
//       </Wrapper>
//     </Provider>
//   </MuiThemeProvider>
// );
const store = createStore();

const App = () => (
  
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/welcome">
            <Wrapper>
              <Header />
              <NowWhat />
              <ToastContainer />
            </Wrapper>
          </Route>
          {/* <Route path="/nowwhat">
          </Route> */}
        </Switch>

      <Wrapper>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/welcome">header</Link>
              </li>
            </ul>
          </nav>
        </div>
      </Wrapper>
      </BrowserRouter>
    </Provider>
    
);


export default App;
