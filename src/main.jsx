import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';       
import Profile from './pages/Profile.jsx';  
import Game from './pages/Game.jsx';      
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
    path: "/game",  
    element: <Game />,
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
