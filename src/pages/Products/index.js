import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { AiFillCloseCircle } from 'react-icons/ai';
import SearchField from 'react-search-field';

import api from '../../services/api';
import Footer from '../Footer';
import './styles.css';

export default function Products(){
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState([]);

  const useremail = localStorage.getItem('useremail');

  const history = useHistory();

  useEffect(() => {
    api.get('products', {
        headers: { Authorization: useremail, }
    }).then(response => {
        setProducts(response.data);
    })
  }, [useremail]);

  async function handleDeleteProduct(uuid){
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

  function onChange(e){
    try {
      api.get(`products/${e}`,{
        headers: { Authorization: 'admin' },
      }).then(response => {
        console.log(`response: ${response.data}`);
        setSearch(response.data);
      }, ['admin']); 
    }catch(err){
      if(!search){
        alert('nenhum produto nessa categoria!');
      }

      alert(`erro: ${err}`);
    }
    
  }

  function handleClick(key){
    const list = document.getElementsByClassName('search-list');
    const item = document.getElementById(`${key}`);

    list[0].removeChild(item);
  }

  function handleLogout(){
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="products-container">
      
      <header>
        <div className="header-content">
          <span>Bem vindx!</span>

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
        <div className="search-box">
          <SearchField
            placeholder="Search by category..."
            onSearchClick={onChange}
            classNames="search-input"
          />

          <ul className="search-list">
            {search.map(item => (
              <li className="search-item" id={item.uuid} key={item.uuid}>
                <button onClick={() => handleClick(item.uuid)}>
                  <AiFillCloseCircle size={18} color="#e02041" />
                </button>
                <div className="description-group">
                  <strong>UUID:</strong>
                  <span>{item.uuid}</span>
                </div>

                <div className="description-group">
                  <strong>Produto:</strong>
                  <strong>{item.name}</strong>
                </div>
                
                <div className="description-group">
                  <strong>Descrição:</strong>
                  <span>{item.description}</span>
                </div>

                <div className="description-group">
                  <strong>Categoria:</strong>
                  <span>{item.category}</span>
                </div>

                <div className="description-group">
                  <strong>Preço:</strong>
                  <span>R${item.price}</span>
                </div>

                <div className="description-group">
                  <strong>Stock:</strong>
                  <span>{item.stock}</span>
                </div>
              </li>        
            ))}
          </ul>
        </div>

        

        <ul className="product-list">
          {products.map(product => (
            <li className="product-item" key={product.uuid}>
              <div className="description-group">
                <strong>Produto:</strong>
                <strong>{product.name}</strong>
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
                <span>R${product.price}</span>
              </div>

              <div className="description-group">
                <strong>Stock:</strong>
                <span>{product.stock}</span>
              </div>

              <div className="description-group">
                <strong>UUID:</strong>
                <span>{product.uuid}</span>
              </div>

              <div className="button-group">
                <button onClick={() => handleDeleteProduct(product.uuid)} type="button">
                  <FiTrash2 size={20} color="#a8a8b3" />
                </button>
              </div>
            </li>        
          ))}
        </ul>
      </div>

      <Footer />

    </div>
    
  )
}