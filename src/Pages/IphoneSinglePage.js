import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SingleAppleProduct(props) {
  const [products, setProducts] = useState([]);
  console.log(useParams);
  const { productID } = useParams();
  // console.log(productID);
  useEffect(() => {
    fetch("/iphones.json") 
    //"/iphones.json"
    //"http://localhost:2023/iphones"

      .then((res) => res.json())
      .then((data) => {
        const productList = data.products;
        const singleProduct = productList.filter(
          (product) => product.product_url === productID
        );
        setProducts(singleProduct);
      });
  }, [productID]);
  console.log(products);

  return (
    <div>
      <section className="internal-page-wrapper top-100">
        <div className="container">
          {products.map((product) => {
            return (
                
              <div key={product.product_id} className="bottom-100">
                <div className="row justify-content-center text-center bottom-50">
                  <div className="col-12">
                    <div className="title-wraper bold">
                    <br/><br/> {product.product_name}
                    </div>
                    <div className="brief-description">
                      {product.product_brief_description}
                    </div>
                  </div>
                </div>

                <div className="row justify-content-center text-center product-holder h-100">
                  <div className={`col-sm-12 col-md-6 my-auto`}>
                    <div className="starting-price">
                      {`Starting at ${product.starting_price}`}
                    </div>
                    <div className="monthly-price">{product.Price_range}</div>
                    <div className="product-details">
                      {product.product_description}
                    </div>
                  </div>

                  <div className={`col-sm-12 col-md-6`}>
                    <div className="prodict-image">
                      <img src={product.product_img} alt="product" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default SingleAppleProduct;