import "./App.css";
import ProductCard from "./components/ProductCard";
import { productList } from "./data";
import type { IProduct } from "./interfaces";
import Button from "./components/ui/Button";
function App() {
  // *------------STATE-----------------------
  // *------------HANDLER-----------------------
  // *------------RENDER-----------------------
  const product: IProduct[] = productList;
  const renderProductList = product.map((product) => (
    <ProductCard
      key={product.id}
      title={product.title}
      imgUrl={product.imageURL}
      descreiption={product.description}
      price={product.price}
    />
  ));

  // =============================================================================================
  return (
    <>
      <div className="container mx-auto my-16 p-4">
        <Button colorBtn="blue" name="Add Product" className="mb-5"/>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {renderProductList}
        </div>
      </div>
    </>
  );
}

export default App;
