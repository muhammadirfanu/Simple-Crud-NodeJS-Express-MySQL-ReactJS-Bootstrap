import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';    


import App from './App';
import Tabela from './Componentes/Tabela';
import Formulario from './Componentes/Formulario';

ReactDOM.render(
    
    <Router>
        <div>
            <App/>
            <Route exact path="/" component={Tabela} />
            <Route path="/add" component={Formulario} />
        </div>
    </Router>,
    document.getElementById('root')
);

serviceWorker.unregister();
