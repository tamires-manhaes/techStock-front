import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import Footer from '../Footer';
import api from '../../services/api';
import './styles.css';

export default function Logon(){
  const [email , setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  async function handleLogin(e){
    e.preventDefault();

    try{
      const response = await api.post('sessions', { email, password });
      
      localStorage.setItem('useremail', response.data.email);
      localStorage.setItem('username', response.data.name);

      history.push('/products');
        
    }catch (err){
      alert('falha no login, tente novamente');
    }
  }

  return(
    <div className="logon-container">
      <section className="form">
          <form onSubmit={handleLogin}>
            <h1>TechStock</h1>
            <h2>Login</h2>
            <input 
              placeholder="Seu Email"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input 
              placeholder="Password"
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button className="button" type="submit">Entrar</button>
            <Link className="back-link" to="/register">
              <FiLogIn size={16} color="#E02041" />
              Não tenho cadastro
            </Link>
          </form>
      </section>
      <Footer />
    </div>

  )
}