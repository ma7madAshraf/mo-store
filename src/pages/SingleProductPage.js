import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/cart_context";

const SingleProductPage = () => {
  const {
    product_loading: loading,
    product_error: error,
    theProduct,
    fetchSingleProduct,
  } = useProductsContext();
  const { wishlist } = useCartContext();
  const [wished, setWished] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
    // eslint-disable-next-line
  }, [id]);
  useEffect(() => {
    const isWished = wishlist.find((e) => {
      return e.id === theProduct.id;
    });
    if (isWished) {
      setWished(true);
    }
    // eslint-disable-next-line
  }, [theProduct]);
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        return navigate("/");
      }, 3000);
    }
    // eslint-disable-next-line
  }, [error]);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  const {
    name,
    price,
    description: desc,
    stock,
    stars,
    reviews,
    id: productID,
    company,
    images,
  } = theProduct;

  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className="section section-center page">
        <Link to="/products" className="btn">
          back to products
        </Link>
        <div className="product-center">
          <ProductImages images={images} />
          <section className="content">
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews} />
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{desc}</p>
            <p className="info">
              <span>Available : </span>
              {stock > 0 ? "in Stock" : "out of stock"}
            </p>
            <p className="info">
              <span>id : </span>
              {productID}
            </p>
            <p className="info">
              <span>Brand : </span>
              {company}
            </p>
            <hr />
            {stock > 0 && (
              <AddToCart
                theProduct={theProduct}
                wished={wished}
                setWished={setWished}
              />
            )}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
