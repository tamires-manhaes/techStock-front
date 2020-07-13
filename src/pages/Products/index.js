import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

export default function Products(){
  const [products, setProducts] = useState([]);

  const useremail = localStorage.getItem('useremail');
  const username = localStorage.getItem('username');

  const history = useHistory();

  useEffect(() => {
    api.get('products', {
        headers: { Authorization: useremail, }
    }).then(response => {
        setProducts(response.data);
    })
  }, [useremail]);

  async function handleDeleteIncident(uuid){
    try{
      await api.delete(`product/${uuid}`, {
          headers: {
              Authorization: 'admin',
          }
      });

      setProducts(products.filter(product => product.uuid !== uuid))
    } catch (erro){
        alert('erro ao deletar o caso, tente novamente.')
    }
  }

  function handleLogout(){
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="products-container">
      <header>
        <div className="header-content">
          <span>Bem vinda, {username}</span>

          <div className="header-group">
            <Link className="button" to="/products/new">Cadastrar novo produto</Link>
            <button onClick={handleLogout} type="button">
                <FiPower size={18} color="#e02041"/>
            </button>
          </div>
        </div>
      </header>
      
      <div className="content">
        <h1>Produtos</h1>
        <ul className="product-list">
          {products.map(product => (
            <li className="product-item" key={product.uuid}>
              <div className="description-group">
                <strong>UUID:</strong>
                <span>{product.uuid}</span>
              </div>

              <div className="description-group">
                <strong>Produto:</strong>
                <span>{product.name}</span>
              </div>
              
              <div className="description-group">
                <strong>Descrição:</strong>
                <span>{product.description}</span>
              </div>

              <div className="description-group">
                <strong>Categoria:</strong>
                <span>{product.category}</span>
              </div>

              <div className="description-group">
                <strong>Preço:</strong>
                <span>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(product.price)}</span>
              </div>

              <div className="description-group">
                <strong>Estoque:</strong>
                <span>{product.stock}</span>
              </div>

              <button onClick={() => handleDeleteIncident(product.uuid)} type="button">
                  <FiTrash2 size={20} color="#a8a8b3" />
              </button>
            </li>        
          ))}
        </ul>
      </div>

    </div>
    
  )
}