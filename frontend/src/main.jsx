import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';       
import Profile from './pages/Profile.jsx';  
import Game from './pages/Game.jsx';      
import Rules from './pages/Rules.jsx';      
import Assistance from './pages/Assistance.jsx';      
import Objective from './pages/Objective.jsx';      
import Community from './pages/Community.jsx';      
import Matches from './pages/Matches.jsx';      
import './styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';


const router = createBrowserRouter([
  {
    path: "/",  
    element: <App />,
  },
  {
    path: "/profile",  
    element: <Profile />,
  },
  {
    path: "/objective",  
    element: <Objective />,
  },
  {
    path: "/community",  
    element: <Community />,
  },
  {
    path: "/game",  
    element: <Game />,
  },
  {
    path: "/matches",  
    element: <Matches />,
  },
  {
    path: "/rules",  
    element: <Rules />,
  },
  {
    path: "/assistance",  
    element: <Assistance />,
  },
], {
  basename: "/5-card-game",  
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
