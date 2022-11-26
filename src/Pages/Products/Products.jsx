import { useQuery } from "@tanstack/react-query";
import React from "react";
import Product from "./Product/Product";

const Products = () => {
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8000/products`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accesToken")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });
  console.log(products);

  return (
    <section className="p-6">
      <div className="productTitle">
        <h1 className="text-blue-500 font-bold text-2xl">Products</h1>
      </div>
      <div className="productContainer grid lg:grid-cols-3 ">
        {products.map((product) =>{
            return (
               <Product key={product._id} product={product}></Product>
            );
        })}
      </div>
    </section>
  );
};

export default Products;
