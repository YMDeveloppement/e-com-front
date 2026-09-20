import { createRoot } from 'react-dom/client'
import './index.css'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { store } from '@/plugins/store/index.js'
import { Provider } from 'react-redux';
import { BrowserRouter  } from 'react-router-dom';

// Import the Provider
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        {/* <BrowserRouter  basename="/web"> */}
        <BrowserRouter >
            <App />
        </BrowserRouter>
    </Provider>
)
