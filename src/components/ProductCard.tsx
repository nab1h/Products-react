import { textSlicer } from "../utils/functions";
import Button from "./ui/Button";
interface Iprops {
    title: string,
    imgUrl: string,
    descreiption: string,
    price: string
}
const ProductCard = ({title,imgUrl,descreiption,price}: Iprops) => {
  return (
    <div className="border-2 border-gray-300 rounded-3xl">
      <img
        className="rounded-t-3xl"
        src={imgUrl}
        alt="img"
      />
      <div className="p-3">
        <h3 className="text-2xl font-medium">{title}</h3>
        <p className="text-gray-500">
          {textSlicer(descreiption,50)}
        </p>
        <div className="flex items-center justify-between my-2">
          <h4 className="font-medium">price: {price}$</h4>
        </div>
        <div className="flex space-x-1 my-2">
            <Button name="Edit" colorBtn="green"/>
            <Button name="Delete" colorBtn="red"/>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
