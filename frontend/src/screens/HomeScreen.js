import React, { useState, useEffect } from 'react';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';


function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
      //
    };
  }, [dispatch,category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder))
  }
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder))
  }

  return <>
    <div>
    {category &&
      <h2>{category}</h2>}

    <ul className="filter">
      <li>
        <form onSubmit={submitHandler}>
          <input name="searchKeyword" onChange={(e) => setSearchKeyword(e.target.value)} />
          <button type="submit">Pesquisar</button>
        </form>
      </li>
      <li>
        <select name="sortOrder" onChange={sortHandler}>
          <option value="">Recente</option>
          <option value="lowest">Valor mais baixo</option>
          <option value="highest">Valor mais alto</option>
        </select>
      </li>
    </ul>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
      )}
    </div>
  </>

  }
export default HomeScreen;