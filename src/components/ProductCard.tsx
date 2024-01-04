import { IProduct } from "../interfaces";
import Button from "./ui/Button";
import Image from "./Image";
import { numberWithCommas } from "../utils/functions";

interface IProps {
  product: IProduct;
  setProductToEdit: (value: IProduct) => void;
  openEditModal: () => void;
  idx: number;
  setProductToEditIdx: (value: number) => void;
  openConfirmModal: () => void;
}

const ProductCard = ({
  product,
  setProductToEdit,
  openEditModal,
  idx,
  setProductToEditIdx,
  openConfirmModal,
}: IProps) => {
  const { description, price, title, imageURL, category, colors } = product;

  const spans = colors.map((color) => (
    <span
      key={color}
      className="block w-5 h-5 mr-1 mb-1 rounded-full cursor-pointer"
      style={{ backgroundColor: color }}
    ></span>
  ));

  //Handler
  function onEdit() {
    setProductToEdit(product);
    openEditModal();
    setProductToEditIdx(idx);
  }
  const onRemove = () => {
    setProductToEdit(product);
    openConfirmModal();
  };

  return (
    <div className="border rounded-md p-2 flex flex-col space-y-3 ">
      <Image
        imageUrl={imageURL}
        alt={"Product Name"}
        className="rounded-md h-52 w-full object-cover"
      />
      <h3 className="text-lg font-semibold min-h-[56px]">{title}</h3>
      <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed min-h-[70px]">
        {description}
      </p>
      <div className="flex flex-wrap min-h-[48px]">
        {!colors.length ? <p>Not available colors!</p> : spans}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-lg text-indigo-600 font-semibold">
          ${numberWithCommas(price)}
        </span>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold">{category.name}</span>
          <Image
            imageUrl={category.imageURL}
            alt="Nike"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>
      <div className="flex items-center justify-between space-x-2">
        <Button
          className="bg-indigo-700 hover:bg-indigo-800 "
          width="w-full"
          onClick={onEdit}
        >
          Edit
        </Button>
        <Button className="bg-[#c2344d] hover:bg-red-800" onClick={onRemove}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
