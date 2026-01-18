import "./App.css";
import ProductCard from "./components/ProductCard";
import { productList } from "./data";
import type { IProduct } from "./interfaces";
import Button from "./components/ui/Button";
import { useState } from 'react'
import Modal from "./components/ui/Modal";
function App() {
  // *------------STATE-----------------------
    const [isOpen, setIsOpen] = useState(true)
  // *------------HANDLER-----------------------
    const open=()=> setIsOpen(true);
    const close=()=> setIsOpen(false);
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
        
        <Modal isOpen={isOpen} closeModal={close}>
          <div className="flex space-x-3.5">
            <Button name="submit" colorBtn="green" />
            <Button name="colse" colorBtn="red" onClick={close}/>
          </div>
        </Modal>
        <Button colorBtn="blue" name="Add Product" className="mb-5" onClick={open}/>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {renderProductList}
        </div>
      </div>
    </>
  );
}

export default App;
