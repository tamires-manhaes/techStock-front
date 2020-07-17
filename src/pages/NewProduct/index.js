import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import Footer from '../Footer';
import './styles.css';

export default function NewProduct(){
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setstock] = useState('');

  const [categories, setCategories] =useState([]);

  const history = useHistory();

  useEffect(() => {
    api.get('category', {
        headers: { Authorization: name, }
    }).then(response => {
      setCategories(response.data);
    })
  }, [name]);

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
    <main>
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
              className="form-field"
              placeholder="Nome"
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <textarea 
              className="form-field"
              placeholder="Descrição" 
              maxLength="300"
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            {/*}
            <input 
              placeholder="Categoria" 
              required
              value={category}
              onChange={e => setCategory(e.target.value)}
            />
          {*/}

            <select onChange={e => setCategory(e.target.value)} className="form-field">
              <option value="default">Selecione</option>
              {categories.map(category => (
                <option 
                  key={category.key}
                  value={category.name}
                  required
                >
                  {category.name}
                </option>
              ))}
            </select>
            <input 
              className="form-field"
              placeholder="Preço" 
              required
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
            <input 
              className="form-field"
              placeholder="Estoque" 
              required
              value={stock}
              onChange={e => setstock(e.target.value)}
            />
        
            <button className="button" type="submit">Cadastrar</button>
          </form>
        </div>
        
        <Footer />
      </div>
    </main>
  )
}