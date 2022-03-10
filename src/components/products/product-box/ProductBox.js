import './ProductBox.css';
import { centsToDollars, customDate } from './../../../globals/Globals';

function ProductBox({ face, size, price, date }) {
  return (
    <div className="card mt-3 mb-3 text-center rounded">
      <div className='card-image-container shadow-sm'>
        <div className="card-img-top mt-3 text-primary fw-bold" style={{ fontSize: `${size}px` }}>{ face }</div>
      </div>
      <div className='mt-2'><b>Size</b> <span className='badge bg-info'>{ size }</span></div>
  <div className="card-body">
    <div className="card-text">
          <span><h5><span className="badge bg-secondary">${ centsToDollars(price) }</span></h5></span>    
        </div>
        <div><small>{ customDate(date) }</small></div>
  </div>
</div>
  );
}

export default ProductBox;
