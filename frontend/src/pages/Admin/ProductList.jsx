import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories, isLoading } = useFetchCategoriesQuery();
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (categories && categories.length > 0) {
      setCategory(categories[0]._id);
    }
  }, [categories]);

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res?.image);
      console.log(res?.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 flex-1 p-4  rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Create Product</h2>

          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {image ? image.name : "Upload Image"}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-white"}
              />
            </label>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="p-4 mb-3 w-full border rounded-lg bg-gray-800 text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  className="p-4 mb-3 w-full border rounded-lg bg-gray-800 text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  className="p-4 mb-3 w-full border rounded-lg bg-gray-800 text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  className="p-4 mb-3 w-full border rounded-lg bg-gray-800 text-white"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block">
                Description
              </label>
              <textarea
                className="p-2 mb-3 bg-gray-800 border rounded-lg w-full text-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1">
                <label htmlFor="stock">Count In Stock</label>
                <input
                  type="number"
                  className="p-4 mb-3 w-full border rounded-lg bg-gray-800 text-white"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div className="flex-1">
                <label htmlFor="category">Category</label>
                <select
                  className="p-4 mb-3 w-full border rounded-lg bg-gray-800 text-white"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="py-3 px-6 rounded-lg text-lg font-bold bg-amber-600 text-white"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
