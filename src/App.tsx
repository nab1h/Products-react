import "./App.css";
import ProductCard from "./components/ProductCard";
import { productList, formInputList } from "./data";
import type { IFormInput, IProduct } from "./interfaces";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import {useState} from "react";
import type {FormEvent,ChangeEvent} from 'react';
import Modal from "./components/ui/Modal";
function App() {
const defaultProductObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
};


  // *------------STATE-----------------------
  const [isOpen, setIsOpen] = useState(false);
  const [Product , setProduct] = useState<IProduct>(defaultProductObj);


  // *------------HANDLER-----------------------
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
  const {value , name} = event.target;
  setProduct({
    ... Product,
    [name]: value
  });

  }
  const submitHandler =(event: FormEvent<HTMLFormElement>):void=>{
    event.preventDefault();
    setProduct(defaultProductObj);
    console.log(Product);
  }
  // *------------RENDER-----------------------
 
  const renderProductList = productList.map((product) => (
    <ProductCard
      key={product.id}
      title={product.title}
      imgUrl={product.imageURL}
      descreiption={product.description}
      price={product.price}
    />
  ));

  const input: IFormInput[] = formInputList;
  const renderFormInput = input.map((input) => (
    <div className="flex flex-col space-x-3 mb-5" key={input.id}>
      <label htmlFor={input.name}>{input.label}</label>
      <Input name={input.name} value={Product[input.name]} onChange={onChangeHandler} />
    </div>
  ));

  // =============================================================================================
  return (
    <>
      <div className="container mx-auto my-16 p-4">
        <Modal isOpen={isOpen} closeModal={close} title="Add Product">
          <form onSubmit={submitHandler}>
            {renderFormInput}
            <div className="flex space-x-3">
              <Button name="submit" colorBtn="green" />
              <Button name="colse" type="button" colorBtn="red" onClick={close} />
            </div>
          </form>
        </Modal>
        <Button
          colorBtn="blue"
          name="Add Product"
          className="mb-5"
          onClick={open}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {renderProductList}
        </div>
      </div>
    </>
  );
}
export default App;
