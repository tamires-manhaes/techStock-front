import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function NewProduct(){
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setstock] = useState('');

  const history = useHistory();

  async function handleNewProduct(e){
    e.preventDefault();

    const data = {
        name,
        description,
        category,
        price,
        stock
    };

    try {
      await api.post('products/new', data, {
          headers: {
            Authorization: 'admin',
          }
      })

      history.push('/products');

    }catch (err){
      alert('Erro ao cadastrar caso, tente novamente')
    }
  }

  return (
    <div className="new-product-container">
      <div className="content">
        <section>
          <h1>Cadastrar novo produto</h1>

          <Link className="back-link" to="/products">
            <FiArrowLeft size={16} color="#E02041" />
            voltar para produtos
          </Link>
        </section>

        <form onSubmit={handleNewProduct}>
          <input 
            placeholder="Nome"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <textarea 
            placeholder="Descrição" 
            maxLength="300"
            required
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input 
            placeholder="Categoria" 
            required
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
          <input 
            placeholder="Preço" 
            required
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
          <input 
            placeholder="Estoque" 
            required
            value={stock}
            onChange={e => setstock(e.target.value)}
          />
      
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}