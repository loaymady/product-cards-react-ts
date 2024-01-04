import { v4 as uuid } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import ProductCard from "./components/ProductCard";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import Modal from "./components/ui/Modal";
import { categories, colors, formInputsList, productList } from "./data";
import { FormEvent, useState } from "react";
import { IProduct } from "./interfaces";
import { validation } from "./validation/validation";
import ErrorMsg from "./components/ui/ErrorMsg";
import CircleColor from "./components/CircleColor";
import Select from "./components/ui/Select";

const App = () => {
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
  //   State  //
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [tempColors, setTempColor] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0);
  const [productToEdit, setProductToEdit] =
    useState<IProduct>(defaultProductObj);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });

  //\\   State  \\//

  //   Handler  //
  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  }
  function onChangeEditHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  }

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const openEditModal = () => setIsOpenEditModal(true);
  const closeEditModal = () => setIsOpenEditModal(false);

  const openConfirmModal = () => setIsOpenConfirmModal(true);
  const closeConfirmModal = () => setIsOpenConfirmModal(false);

  function submitHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const { title, description, imageURL, price } = product;
    const errors = validation({
      title,
      description,
      imageURL,
      price,
    });
    const hasErrorMsg = Object.values(errors).every(
      (value) => value.length === 0
    );
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    setProducts((prev) => [
      {
        ...product,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);
    setProduct(defaultProductObj);
    setTempColor([]);
    closeModal();
    toast("Product has been Added", {
      duration: 2000,
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  }

  function submitEditHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const { title, description, imageURL, price } = productToEdit;
    const errors = validation({
      title,
      description,
      imageURL,
      price,
    });
    const hasErrorMsg = Object.values(errors).every(
      (value) => value.length === 0
    );
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    const updatedProducts = [...products];
    updatedProducts[productToEditIdx] = {
      ...productToEdit,
      colors: tempColors.concat(productToEdit.colors),
    };
    setProducts(updatedProducts);

    setProductToEdit(defaultProductObj);
    setTempColor([]);
    closeEditModal();
    toast("Product has been updated successfully!", {
      duration: 2000,
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  }

  function onCancel(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setProduct(defaultProductObj);
    setTempColor([]);
    closeModal();
  }
  function onCancelEditModal(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setProductToEdit(defaultProductObj);
    setTempColor([]);
    closeEditModal();
  }

  function removeProductHandler() {
    const filtered = products.filter(
      (product) => product.id !== productToEdit.id
    );
    setProducts(filtered);
    setProductToEdit(defaultProductObj);
    setTempColor([]);
    closeConfirmModal();
    toast("Product has been removed", {
      duration: 2000,
      icon: "👏",
      style: {
        backgroundColor: "#c2344d",
        color: "white",
      },
    });
  }

  // \\  Handler  \\//

  //   Renders  //

  const renderProductList = products.map((product, idx) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openEditModal={openEditModal}
      idx={idx}
      setProductToEditIdx={setProductToEditIdx}
      openConfirmModal={openConfirmModal}
    />
  ));

  const renderFormInputs = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label
        htmlFor={input.id}
        className="mb-[2px] text-sm font-medium text-gray-700"
      >
        {input.label}
      </label>
      <Input
        type={input.type}
        id={input.id}
        name={input.name}
        value={product[input.name]}
        onChange={onChangeHandler}
      />
      <ErrorMsg msg={errors[input.name]} />
    </div>
  ));

  const renderFormEditInputs = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label
        htmlFor={input.id}
        className="mb-[2px] text-sm font-medium text-gray-700"
      >
        {input.label}
      </label>
      <Input
        type={input.type}
        id={input.id}
        name={input.name}
        value={productToEdit[input.name]}
        onChange={onChangeEditHandler}
      />
      <ErrorMsg msg={errors[input.name]} />
    </div>
  ));

  const renderColorsInputs = colors.map((color) => (
    <CircleColor
      color={color}
      key={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColor((prev) => prev.filter((item) => item !== color));
          return;
        }
        if (productToEdit.colors.includes(color)) {
          setTempColor((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempColor((prev) => [...prev, color]);
      }}
    />
  ));

  // \\  Renders  \\//

  return (
    <main className=" container">
      <Button
        className="block bg-indigo-700 hover:bg-indigo-800 mx-auto my-10 px-6 font-medium"
        onClick={openModal}
        width="w-fit"
      >
        Build a Product
      </Button>

      <Modal isOpen={isOpen} title="ADD A NEW PRODUCT" closeModal={closeModal}>
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputs}
          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <div className="flex items-center flex-wrap space-x-1">
            {renderColorsInputs}
          </div>
          <div className="flex items-center flex-wrap ">
            {tempColors.map((color) => (
              <span
                key={color}
                className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <Button className="bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>
            <Button
              className="bg-gray-400 hover:bg-gray-600"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isOpenEditModal}
        title="Edit THIS PRODUCT"
        closeModal={closeEditModal}
      >
        <form className="space-y-3" onSubmit={submitEditHandler}>
          {renderFormEditInputs}
          <Select
            selected={productToEdit.category}
            setSelected={(value) =>
              setProductToEdit({ ...productToEdit, category: value })
            }
          />
          <div className="flex items-center flex-wrap space-x-1 ">
            {renderColorsInputs}
          </div>
          <div className="flex items-center flex-wrap ">
            {tempColors.concat(productToEdit.colors).map((color) => (
              <span
                key={color}
                className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <Button className="bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>
            <Button
              className="bg-gray-400 hover:bg-gray-600"
              onClick={onCancelEditModal}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isOpenConfirmModal}
        closeModal={closeConfirmModal}
        title="Are you sure you want to remove this Product from your Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <Button
            className="bg-[#c2344d] hover:bg-red-800"
            onClick={removeProductHandler}
          >
            Yes, remove
          </Button>

          <Button
            className="bg-gray-400 hover:bg-gray-600 w-full rounded-lg text-white px-3 py-3 duration-200 font-medium"
            onClick={closeConfirmModal}
          >
            Cancel
          </Button>
        </div>
      </Modal>

      <div className="m-5 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md ">
        {renderProductList}
      </div>
      <Toaster />
    </main>
  );
};

export default App;
