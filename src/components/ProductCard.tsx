import type { IProduct } from "../interfaces";
import { addCommaAfterThree, textSlicer } from "../utils/functions";
import Button from "./ui/Button";
import CircleColor from "./ui/CircleColor";

interface Iprops {
  title: string;
  imgUrl: string;
  descreiption: string;
  price: string;
  colors: string[];
  category: { name: string; imageURL: string };
  setEditProduct: (product: IProduct) => void;
  openDelete: () => void;
  product: IProduct;
  setProductDelete: (product: IProduct) => void;
  openEdit: () => void;
  idx: number;
  setEditProductIdx: (value: number) => void;
}
const ProductCard = ({
  title,
  imgUrl,
  descreiption,
  price,
  colors,
  category,
  setEditProduct,
  product,
  openEdit,
  idx,
  setEditProductIdx,
  openDelete,
  setProductDelete,
}: Iprops) => {
  const renderColor = colors.map((color) => <CircleColor color={color} />);
  const toEdit = () => {
    setEditProduct(product);
    openEdit();
    setEditProductIdx(idx);
  };
  const toDelete = () => {
    openDelete();
    setProductDelete(product);
  };
  return (
    <div className="border-2 border-gray-300 rounded-3xl flex flex-col">
      <div className="h-[200px]">
        <img
          className="rounded-t-3xl w-full h-full object-cover"
          src={imgUrl}
          alt="img"
        />
      </div>

      <div className="flex-1 p-3 justify-between">
        <h3 className="text-2xl font-medium h-[64px]">
          {textSlicer(title, 21)}
        </h3>
        <p className="text-gray-500 h-[54px]">{textSlicer(descreiption, 50)}</p>
        <div className="flex items-center justify-between my-2 h-[44px]">
          <span className="font-medium">
            price: {addCommaAfterThree(price)}$
          </span>
          <img
            className="w-10 h-10 rounded-full"
            src={category.imageURL}
            alt={category.name}
          />
        </div>
        <div className="flex flex-wrap gap-3 my-3 h-[64px]">{renderColor}</div>
      </div>
      <div className="flex space-x-1 my-2 p-3">
        <Button name="Edit" colorBtn="green" onClick={toEdit} />
        <Button name="Delete" colorBtn="red" onClick={toDelete} />
      </div>
    </div>
  );
};
export default ProductCard;
