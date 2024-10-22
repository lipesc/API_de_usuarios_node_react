import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UsuarioForm from './components/UsuarioForm';

function App() {
    return (
        <Router>
            <div>
                <h1>Gerenciamento de Usuários</h1>
                <Routes>
                    <Route path="/" element={<UsuarioForm/>} />
                </Routes>
            </div>
            
        </Router>
        
    );
}

export default App;