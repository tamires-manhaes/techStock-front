import React , { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function Register(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const history = useHistory();

  async function handleRegister(e){
    e.preventDefault();

    const data = {
        name,
        email,
    };

    try {
        const response = await api.post('register', data);
        alert(`Seu email de acesso: ${response.data.email} \n Sua senha de acesso: ${response.data.password}`);
        history.push('/');
    } catch(err){
        alert('Erro ao cadastrar, tente novamente');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input 
              type="text" 
              placeholder="Nome" 
              value={name}
              onChange={e => setName(e.target.value)}
              required
          />

          <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
