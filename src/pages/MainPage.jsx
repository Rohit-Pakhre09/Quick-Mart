import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, editProduct, deleteProduct, addProduct } from "../modules/productSlice";
import { useState, useEffect } from "react";

const MainPage = () => {
    // Redux Part
    const products = useSelector((state) => state.product.data);
    const loading = useSelector((state) => state.product.loading);
    const dispatch = useDispatch();

    // Component State's
    const [title, setTitle] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [editingProduct, setEditingProduct] = useState(null);
    const [editForm, setEditForm] = useState({ title: "", price: "", category: "", status: "", description: "" });
    const [showAddModal, setShowAddModal] = useState(false);
    const [addForm, setAddForm] = useState({ title: "", price: "", category: "Electronics", status: "available", description: "", img: "" });

    // Getting Users
    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    // Handle Edit button click
    const handleEdit = (product) => {
        setEditingProduct(product);
        setEditForm({
            title: product.title,
            price: product.price,
            category: product.category,
            status: product.status,
            description: product.description
        });
    };

    // Handle Edit form submit
    const handleEditSubmit = (e) => {
        e.preventDefault();
        const updatedProduct = {
            ...editingProduct,
            ...editForm,
            price: Number(editForm.price)
        };
        dispatch(editProduct(updatedProduct));
        setEditingProduct(null);
    };

    // Handle Delete
    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    };

    // Handle Add Product
    const handleAddProduct = (e) => {
        e.preventDefault();
        const newProduct = {
            ...addForm,
            price: Number(addForm.price),
            status: addForm.status,
        };
        dispatch(addProduct(newProduct));
        setShowAddModal(false);
        setAddForm({ title: "", price: "", category: "Electronics", status: "available", description: "", img: "" });
    };

    if (loading) {
        return (
            <section className="h-screen w-full flex flex-col items-center justify-center bg-neutral-50">
                <p className="text-lg text-gray-500 font-semibold">Loading products...</p>
            </section>
        );
    }

    return (

        // Main Section
        <section className=" h- bg-neutral-50 shadow-lg min-w-[90%] p-8 rounded-3xl">
            {/* Title */}
            <div className="flex items-center gap-3">
                <p className="font-bold text-4xl">Quick Mart</p>
                <img src="/favicon.png" alt="Cart" />
            </div>

            {/* Header Section */}
            <header className="flex flex-col md:flex-col lg:flex-row items-center justify-between">
                <section className="h-10 w-90 bg-white mt-5 mb-2 p-3 shadow rounded-md flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 cursor-pointer">
                        <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                    </svg>
                    <input type="text" className="outline-0 border-0 w-full" placeholder="Search by Title" onChange={(e) => setTitle(e.target.value)} value={title} />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 cursor-pointer" onClick={() => {
                        setTitle("")
                    }}>
                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                </section>
                <section className="flex items-center gap-3">
                    <select
                        className="h-10 border-0 bg-white px-1 rounded shadow"
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(e.target.value)}
                    >
                        <option value="all">All Categories</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Food and beverages">Food and beverages</option>
                        <option value="Household and kitchen essentials">Household and kitchen essentials</option>
                        <option value="Beauty and personal care">Beauty and personal care</option>
                    </select>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow text-sm font-semibold cursor-pointer" onClick={() => setShowAddModal(true)}>
                        Add Product
                    </button>
                </section>
            </header>

            {/* Product Rendering */}
            <div>
                <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 min-h-80 mt-10 overflow-auto h-150 pr-2 scrollbar-thin">
                    {
                        products.filter(product =>
                            product.title.toLowerCase().includes(title.toLowerCase()) &&
                            (selectedCategory === "all" || product.category === selectedCategory)
                        ).length === 0 ? (
                            <div className="col-span-full flex flex-col items-center justify-center py-20">
                                <p className="text-lg text-gray-500 font-semibold">No products found for "{title}"</p>
                            </div>
                        ) : (
                            products.filter(product =>
                                product.title.toLowerCase().includes(title.toLowerCase()) &&
                                (selectedCategory === "all" || product.category === selectedCategory)
                            ).map((product) => (
                                <div
                                    className="bg-white rounded-2xl shadow-lg flex flex-col items-center p-6 transition-transform hover:scale-102 hover:shadow-blue-300 hover:shadow cursor-pointer min-h-[400px] h-[400px] justify-between border border-gray-100"
                                    key={product.id}
                                >
                                    <div className="w-full flex justify-center items-center mb-4">
                                        <img
                                            src={product.img}
                                            alt={product.title}
                                            className="h-36 w-36 object-cover"
                                        />
                                    </div>
                                    <h2 className="font-bold text-xl text-gray-900 mb-1 text-center tracking-tight">{product.title}</h2>
                                    <p className="font-medium text-gray-7000">Price: ₹{product.price}</p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-xs font-medium text-amber-700 mb-2 px-3 py-1 rounded-full bg-amber-100 text-center mx-auto shadow-sm">{product.category}</p>
                                        <p className={`text-xs mb-2 text-center font-semibold px-3 py-1 rounded-full ${product.status === 'available' ? 'text-green-600 bg-green-200' : 'text-red-500 bg-red-200'} capitalize`}>{product.status}</p>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-4 text-center line-clamp-3 px-2 flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                                        </svg>
                                        {product.description}
                                    </p>
                                    <div className="flex gap-2 w-full justify-center mt-2">
                                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition-all duration-150 text-sm font-semibold cursor-pointer" onClick={() => handleEdit(product)}>Edit</button>
                                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition-all duration-150 text-sm font-semibold cursor-pointer" onClick={() => handleDelete(product.id)}>Delete</button>
                                    </div>
                                </div>
                            ))
                        )
                    }
                </section>
            </div>

            {/* Add Product Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <form className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md" onSubmit={handleAddProduct}>
                        <h2 className="font-bold text-xl mb-4">Add Product</h2>
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input type="text" className="w-full border rounded px-3 py-2" value={addForm.title} onChange={e => setAddForm(data => ({ ...data, title: e.target.value }))} required />
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Price</label>
                            <input type="number" className="w-full border rounded px-3 py-2" value={addForm.price} onChange={e => setAddForm(data => ({ ...data, price: e.target.value }))} required />
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Image URL</label>
                            <input type="text" className="w-full border rounded px-3 py-2" value={addForm.img} onChange={e => setAddForm(data => ({ ...data, img: e.target.value }))} required />
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <select className="w-full border rounded px-3 py-2" value={addForm.category} onChange={e => setAddForm(data => ({ ...data, category: e.target.value }))} required>
                                <option value="Electronics">Electronics</option>
                                <option value="Food and beverages">Food and beverages</option>
                                <option value="Household and kitchen essentials">Household and kitchen essentials</option>
                                <option value="Beauty and personal care">Beauty and personal care</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <select className="w-full border rounded px-3 py-2" value={addForm.status} onChange={e => setAddForm(data => ({ ...data, status: e.target.value }))} required>
                                <option value="available">Available</option>
                                <option value="unavailable">Unavailable</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea className="w-full border rounded px-3 py-2" value={addForm.description} onChange={e => setAddForm(data => ({ ...data, description: e.target.value }))} required />
                        </div>
                        <div className="flex gap-2 justify-end mt-4">
                            <button type="button" className="bg-gray-300 px-4 py-2 rounded cursor-pointer" onClick={() => setShowAddModal(false)}>Cancel</button>
                            <button type="submit" className="bg-amber-500 text-white px-4 py-2 rounded cursor-pointer">Add</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Edit Modal */}
            {editingProduct && (
                <div className="fixed inset-0 bg-black/80  flex items-center justify-center z-50">
                    <form className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md" onSubmit={handleEditSubmit}>
                        <h2 className="font-bold text-xl mb-4">Edit Product</h2>
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input type="text" className="w-full border rounded px-3 py-2" value={editForm.title} onChange={e => setEditForm(data => ({ ...data, title: e.target.value }))} required />
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Price</label>
                            <input type="number" className="w-full border rounded px-3 py-2" value={editForm.price} onChange={e => setEditForm(data => ({ ...data, price: e.target.value }))} required />
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Image URL</label>
                            <input type="text" className="w-full border rounded px-3 py-2" value={editForm.img || ""} onChange={e => setEditForm(data => ({ ...data, img: e.target.value }))} required />
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <select className="w-full border rounded px-3 py-2" value={editForm.category} onChange={e => setEditForm(data => ({ ...data, category: e.target.value }))} required>
                                <option value="Electronics">Electronics</option>
                                <option value="Food and beverages">Food and beverages</option>
                                <option value="Household and kitchen essentials">Household and kitchen essentials</option>
                                <option value="Beauty and personal care">Beauty and personal care</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <select className="w-full border rounded px-3 py-2" value={editForm.status} onChange={e => setEditForm(data => ({ ...data, status: e.target.value }))} required>
                                <option value="available">Available</option>
                                <option value="unavailable">Unavailable</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea className="w-full border rounded px-3 py-2" value={editForm.description} onChange={e => setEditForm(data => ({ ...data, description: e.target.value }))} required />
                        </div>
                        <div className="flex gap-2 justify-end mt-4">
                            <button type="button" className="bg-gray-300 px-4 py-2 rounded cursor-pointer" onClick={() => setEditingProduct(null)}>Cancel</button>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">Save</button>
                        </div>
                    </form>
                </div>
            )}
        </section>
    )
}

export default MainPage