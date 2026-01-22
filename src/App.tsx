import "./App.css";
import ProductCard from "./components/ProductCard";
import { categories, colors, productList, formInputList } from "./data";
import type { IFormInput, IProduct } from "./interfaces";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import SelecteMenu from "./components/ui/SelecteMenu";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import Modal from "./components/ui/Modal";
import CircleColor from "./components/ui/CircleColor";
import type { ProductType } from "./types/index";
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
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [Products, setProducts] = useState<IProduct[]>(productList);
  const [Product, setProduct] = useState<IProduct>(defaultProductObj);
  const [productDelete, setProductDelete] = useState<IProduct>(defaultProductObj);
  const [editProduct, setEditProduct] = useState<IProduct>(defaultProductObj);
  const [editProductIdx, setEditProductIdx] = useState<number>(0);
  const [tempColor, setTempColor] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  // *------------HANDLER-----------------------
  // -----------add product
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  // -----------edit product
  const openEdit = () => setIsOpenEdit(true);
  const closeEdit = () => setIsOpenEdit(false);
  // -----------delete product
  const openDelete = () => setIsOpenDelete(true);
  const closeDelete = () => setIsOpenDelete(false);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProduct({
      ...Product,
      [name]: value,
    });
  };

  const onChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setEditProduct({
      ...editProduct,
      [name]: value,
    });
  };
  // ----------
  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setProducts((prev) => [
      ...prev,
      { ...Product, id: uuid(), colors: tempColor, category: selectedCategory },
    ]);
    setProduct(defaultProductObj);
  };

  const submitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const updateProduct = [...Products];
    updateProduct[editProductIdx] = {...editProduct,colors: tempColor.concat(editProduct.colors)};
    setProducts(updateProduct);
    closeEdit();
  };
  const deleteProductHandler=()=>{
    const deletePro= Products.filter(pro=>(pro !== productDelete));
    setProducts(deletePro);
    closeDelete();
  }
  // *------------RENDER-----------------------
  const renderProductList = Products.map((product, idx) => (
    <ProductCard
      key={product.id}
      title={product.title}
      imgUrl={product.imageURL}
      descreiption={product.description}
      price={product.price}
      colors={product.colors}
      category={product.category}
      product={product}
      setEditProduct={setEditProduct}
      openEdit={openEdit}
      idx={idx}
      setEditProductIdx={setEditProductIdx}
      openDelete={openDelete}
      setProductDelete={setProductDelete}
    />
  ));

  const input: IFormInput[] = formInputList;
  const renderFormInput = input.map((input) => (
    <div className="flex flex-col space-x-3 mb-5" key={input.id}>
      <label htmlFor={input.name}>{input.label}</label>
      <Input
        name={input.name}
        value={Product[input.name]}
        onChange={onChangeHandler}
      />
    </div>
  ));

  const renderColors = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColor.includes(color)) {
          setTempColor(tempColor.filter((temp) => temp !== color));
          return;
        }
        setTempColor((prev) => [...prev, color]);
        // if (editProduct.colors.includes(color)) {
        //   setTempColor(tempColor.filter((temp) => temp !== color));
        //   return;
        // }
        // setTempColor((prev) => [...prev, color]);
      }
      }
    />
  ));
  // ----------
  const renderChoseColor = tempColor.map((color) => (
    <span
      className=" p-1 mr-1 mb-1 text-xs rounded-md"
      style={{ backgroundColor: color }}
    >
      {color}
    </span>
  ));

  const renderProductEdit = (id: string, label: string, name: ProductType) => {
    return (
      <div className="flex flex-col space-x-3 mb-5">
        <label htmlFor={id}>{label}</label>
        <Input
          id={id}
          name={name}
          value={editProduct[name]}
          onChange={onChangeEditHandler}
        />
      </div>
    );
  };
  // =============================================================================================
  return (
    <>
      <div className="container mx-auto my-16 p-4">
        <Modal isOpen={isOpen} closeModal={close} title="Add Product">
          <form onSubmit={submitHandler}>
            {renderFormInput}
            <div className="flex space-x-3">{renderColors}</div>
            <div className="flex flex-wrap space-x-3 my-3">
              {renderChoseColor}
            </div>
            <SelecteMenu
              selected={selectedCategory}
              setSelected={setSelectedCategory}
            />
            <div className="flex space-x-3 my-3">
              <Button name="submit" colorBtn="green" />
              <Button
                name="colse"
                type="button"
                colorBtn="red"
                onClick={close}
              />
            </div>
          </form>
        </Modal>

        <Modal isOpen={isOpenDelete} closeModal={closeDelete} title="Delete Product">
          <div className="p-3">
            <p>Are You Sure Delete This Product?</p>
          </div>
          <div className="flex gap-4">
            <Button name="confierm" colorBtn="red" onClick={deleteProductHandler}/>
              <Button
                name="colse"
                type="button"
                colorBtn="green"
                onClick={closeDelete}
              />
          </div>
        </Modal>


<Modal isOpen={isOpenEdit} closeModal={closeEdit} title="Edit Product">
          <form onSubmit={submitEditHandler}>
            {renderProductEdit("title", "product title", "title")}
            {renderProductEdit(
              "description",
              "product description",
              "description",
            )}
            {renderProductEdit("imageURL", "product imageURL", "imageURL")}
            {renderProductEdit("price", "product price", "price")}
            <div className="flex flex-wrap gap-3">{renderColors}</div>
            <div className="flex flex-wrap gap-3 py-2">
            {tempColor.concat(editProduct.colors).map((color) => (
              <span
                className=" p-1 mr-1 mb-1 text-xs rounded-md"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>

            ))}
            </div>

            <div className="flex space-x-3 my-3">
              <Button name="submit" colorBtn="green" />
              <Button
                name="colse"
                type="button"
                colorBtn="red"
                onClick={closeEdit}
              />
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
