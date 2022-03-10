import axios from 'axios';
import { useEffect, useState } from 'react';
import './HomeProducts.css';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';
import Loader from '../../loader/Loader';
import ProductBox from '../../products/product-box/ProductBox';
let activeSort = 'id';
function HomeProducts() {

  // states
  const [products, setproducts] = useState([]);
  const [totalCount, settotalCount] = useState(0);
  const [showLoader, setshowLoader] = useState(true);
  const [currentPage, setcurrentPage] = useState(0);
  const [watch, setwatch] = useState(0);
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  // const [activeSort, setactiveSort] = useState('id');

  // Logics

  function fetchMoreListItems() {
      setwatch(watch + 1);
    setTimeout(() => {
      getProductsInit();
      setIsFetching(false);
    }, 2000);
  }

  // get products function
  const getProductsInit = () => {
    setshowLoader(true);
    axios.get(`products?_page=${currentPage}&_limit=24&_sort=${activeSort}`).then(res => {
      setshowLoader(false);
      settotalCount(Number(res.headers['x-total-count']));
      setproducts(products => [...products, ...res.data]);
    }).catch(err => console.log(err));
  }

  // Fetch products once on page init
  useEffect(() => {
    getProductsInit(); 
  }, [])

  // watch currentPage
  useEffect(() => {
    setcurrentPage(previousCount => previousCount += 1);
  }, [watch])
  

  // const onClickTestAddToArray = () => {
  //   if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
  //       setwatch(watch + 1);
  //       getProductsInit();
  //   } 
  // }

  // useEffect(() => {
  //    window.addEventListener('scroll', onClickTestAddToArray);
  // }, [])
  
  
  // Filter Buttons Handling to remove active class first
  const removeFilterButtonsActiveClasses = () => {
    let filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
    filterButtons.forEach(filterBtn => {
      filterBtn.classList.remove('text-primary');
    });
  }

  // initials
  const inits = () => {
    setcurrentPage(0);
    setproducts([]);
  }

  // Filter Products
  const productsFilter = (filter, event) => {
    inits();
    console.log('filterrrr', filter);
    activeSort = filter;
    console.log('activeSort', activeSort);
    getProductsInit(); 
    removeFilterButtonsActiveClasses();
    event.target.classList.add('text-primary');
  }
  
  

  return (
    <div className="container mt-2">
      <div className='row'>
        <div className='col-md-12 text-center d-flex justify-content-between'>
          <span><h3>Products</h3></span>
          <span>
            Sort By 
             <small role="button" className='border rounded p-1 filter-btn text-primary' onClick={(event) => productsFilter('id', event)}>Id</small>
            <small role="button" className='border rounded p-1 filter-btn' onClick={(event) => productsFilter('size', event)}>Size</small>
            <small role="button" className='border rounded p-1 filter-btn' onClick={(event) => productsFilter('price', event)}>Price</small>
            {/* <button className='btn btn-primary my-btn' onClick={() => onClickTestAddToArray()} disabled={showLoader}>test</button> */}
          </span>
        </div>
      </div>
      <div className='row'>
         {products && products.map((product, index) => {
          return (
         <div className='col-md-3' key={index}>
              <ProductBox face={ product.face } size={ product.size } price={ product.price } date={ product.date } />
        </div>
          )
         })}
        {isFetching && products.length <= totalCount && <Loader />}
        { products.length > totalCount && <div className='col-md-12 text-center mb-5 mb-5'>~ end of catalogue ~</div> }
      </div>
    </div>
  );
}

export default HomeProducts;
