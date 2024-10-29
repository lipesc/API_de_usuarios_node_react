import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UsuarioForm from './components/UsuarioForm';

function App() {
    return (
        <Router>
            <div>
                <h1>Cadastro de Usuários(teste)</h1>
                <Routes>
                    <Route path="/" element={<UsuarioForm/>} />
                </Routes>
            </div>
            
        </Router>
        
    );
}

export default App;