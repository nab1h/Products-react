import "./App.css";
import ProductCard from "./components/ProductCard";
import { colors ,productList, formInputList } from "./data";
import type { IFormInput, IProduct } from "./interfaces";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import {v4 as uuid } from 'uuid';
import {useState} from "react";
import type {FormEvent,ChangeEvent} from 'react';
import Modal from "./components/ui/Modal";
import CircleColor from "./components/ui/CircleColor";
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
  const [Products , setProducts] = useState<IProduct[]>(productList);
  const [Product , setProduct] = useState<IProduct>(defaultProductObj);
  const [tempColor , setTempColor] = useState<string[]>([]);


  // *------------HANDLER-----------------------
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
  const {value , name} = event.target;
  setProduct({
    ... Product,
    [name]: value
  });}
  // ----------
  // -----------
  const submitHandler =(event: FormEvent<HTMLFormElement>):void=>{
    event.preventDefault();
    setProducts(prev=>[...prev,{...Product,id: uuid()}])
    setProduct(defaultProductObj);
  }
  // *------------RENDER-----------------------
 
  const renderProductList = Products.map((product) => (
    <ProductCard
      key={product.id}
      title={product.title}
      imgUrl={product.imageURL}
      descreiption={product.description}
      price={product.price}
      colors={product.colors}
    />
  ));

  const input: IFormInput[] = formInputList;
  const renderFormInput = input.map((input) => (
    <div className="flex flex-col space-x-3 mb-5" key={input.id}>
      <label htmlFor={input.name}>{input.label}</label>
      <Input name={input.name} value={Product[input.name]} onChange={onChangeHandler} />
    </div>
  ));

  const renderColors= colors.map(color=>(
        <CircleColor key={color} color={color} onClick={()=>{
          if(tempColor.includes(color)){
            setTempColor(tempColor.filter(temp=> temp !== color));
            return;
          }
          setTempColor(prev=>[...prev,color])}} />
  ))
  // ----------
  const renderChoseColor= tempColor.map(color=>(
    <span className=" p-1 mr-1 mb-1 text-xs rounded-md" style={{backgroundColor: color}}>{color}</span>
  ))
  // =============================================================================================
  return (
    <>
      <div className="container mx-auto my-16 p-4">
        <Modal isOpen={isOpen} closeModal={close} title="Add Product">
          <form onSubmit={submitHandler}>
            {renderFormInput}
            <div className="flex space-x-3">
            {renderColors}
            </div>
            <div className="flex flex-wrap space-x-3 my-3">
            {renderChoseColor}
            </div>
            <div className="flex space-x-3 my-3">
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
