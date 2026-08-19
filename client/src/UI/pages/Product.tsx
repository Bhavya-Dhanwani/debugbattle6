import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { updateProduct, deleteProduct } from '../../api/product.api';
import { ShoppingBag, ArrowLeft, Check, AlertTriangle, Edit, Trash2, X } from 'lucide-react';

export const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedProduct, loading, error, fetchProductById } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'SNEAKERS',
    stock: '',
    imageUrl: '',
  });
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Initialize edit form when selectedProduct loads
  useEffect(() => {
    if (selectedProduct) {
      setEditForm({
        name: selectedProduct.name,
        description: selectedProduct.description || '',
        price: String(selectedProduct.price),
        category: selectedProduct.category,
        stock: String(selectedProduct.stock),
        imageUrl: selectedProduct.imageUrl || '',
      });
    }
  }, [selectedProduct]);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !editForm.name || !editForm.price || !editForm.category) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmittingEdit(true);
    try {
      const response = await updateProduct(selectedProduct._id, {
        name: editForm.name,
        description: editForm.description,
        price: Number(editForm.price),
        category: editForm.category,
        stock: Number(editForm.stock || 0),
        imageUrl: editForm.imageUrl,
      });

      if (response.success) {
        alert('Product updated successfully!');
        setIsEditModalOpen(false);
        fetchProductById(selectedProduct._id);
      } else {
        alert(response.message || 'Failed to update product.');
      }
    } catch (err: any) {
      alert(err.response?.data?.message || err.message || 'Failed to update product.');
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedProduct.name}?`)) return;

    setIsDeleting(true);
    try {
      const response = await deleteProduct(selectedProduct._id);
      if (response.success) {
        alert('Product deleted successfully!');
        navigate('/shop');
      } else {
        alert(response.message || 'Failed to delete product.');
      }
    } catch (err: any) {
      alert(err.response?.data?.message || err.message || 'Failed to delete product.');
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleAddToCart = async () => {
    if (!selectedProduct) return;
    setIsAdding(true);
    const res = await addToCart(selectedProduct._id, quantity);
    setIsAdding(false);

    if (res.success) {
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 3000);
    } else {
      alert(res.error || 'Failed to add item to cart');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !selectedProduct) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle size={32} />
          </div>
          <h2 className="text-xl font-bold uppercase tracking-wider text-neutral-800">Product Not Found</h2>
          <p className="text-sm text-neutral-500 max-w-md mx-auto">
            {error || "The product you're looking for doesn't exist or is currently unavailable."}
          </p>
          <Link to="/shop" className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-1 hover:opacity-75">
            <ArrowLeft size={14} />
            <span>Back to Shop</span>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(selectedProduct.price);

  const outOfStock = selectedProduct.stock === 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-neutral-50/50 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/shop"
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-black transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Shop</span>
          </Link>
        </div>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 bg-white border border-neutral-100 p-4 sm:p-8 rounded-2xl">
          {/* Left Column: Product Image */}
          <div className="aspect-square bg-neutral-50 rounded-xl overflow-hidden">
            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Right Column: Content */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category */}
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
                {selectedProduct.category}
              </span>

              {/* Product Title */}
              <h1 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 leading-tight">
                {selectedProduct.name}
              </h1>

              {/* Price */}
              <div className="text-xl sm:text-2xl font-black text-black">
                {formattedPrice}
              </div>

              {/* Stock Status Badge */}
              <div>
                {outOfStock ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-red-50 text-red-600 uppercase tracking-wider">
                    Out Of Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-green-50 text-green-600 uppercase tracking-wider">
                    In Stock ({selectedProduct.stock} available)
                  </span>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-neutral-100 pt-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-800 mb-2">Description</h3>
                <p className="text-xs sm:text-sm text-neutral-500 font-medium leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>
            </div>

            {/* Actions Block */}
            <div className="space-y-4 border-t border-neutral-100 pt-6">
              {!outOfStock && (
                <div className="flex items-center space-x-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">Qty:</span>
                  <div className="flex items-center border border-neutral-200 rounded-full bg-neutral-50">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center text-neutral-600 hover:text-black font-bold text-lg"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs sm:text-sm font-bold text-neutral-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(selectedProduct.stock, q + 1))}
                      className="w-10 h-10 flex items-center justify-center text-neutral-600 hover:text-black font-bold text-lg"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding || outOfStock}
                  className={`h-12 sm:h-14 px-8 rounded-full flex items-center justify-center space-x-3 font-semibold uppercase tracking-wider text-xs sm:text-sm transition-all flex-1 ${
                    outOfStock
                      ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200'
                      : 'bg-black text-white hover:bg-neutral-900 active:scale-98 shadow-md'
                  }`}
                  aria-label="Add to cart"
                >
                  <ShoppingBag size={16} />
                  <span>{isAdding ? 'Adding...' : 'Add to Cart'}</span>
                </button>

                {isAuthenticated && user?.role === 'admin' && (
                  <>
                    <button
                      onClick={() => setIsEditModalOpen(true)}
                      className="h-12 sm:h-14 px-6 border border-neutral-300 text-neutral-800 rounded-full flex items-center justify-center space-x-2 font-semibold uppercase tracking-wider text-xs sm:text-sm hover:bg-neutral-50 active:scale-98 shadow-sm cursor-pointer"
                    >
                      <Edit size={16} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={handleDeleteProduct}
                      disabled={isDeleting}
                      className="h-12 sm:h-14 px-6 border border-red-200 text-red-600 rounded-full flex items-center justify-center space-x-2 font-semibold uppercase tracking-wider text-xs sm:text-sm hover:bg-red-50 active:scale-98 shadow-sm cursor-pointer"
                    >
                      <Trash2 size={16} />
                      <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
                    </button>
                  </>
                )}
              </div>

              {/* Quick success toast placeholder inside card */}
              {successMsg && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center space-x-2 text-xs sm:text-sm font-medium animate-scale-in">
                  <Check size={16} />
                  <span>Item added to cart! <Link to="/cart" className="underline font-bold hover:text-green-900">View Cart</Link></span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Edit Product Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-black cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            
            <div className="space-y-4 text-left">
              <h2 className="text-xl font-black uppercase tracking-wider text-black">Edit Product</h2>
              <form onSubmit={handleEditSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-xl bg-neutral-50 focus:outline-none focus:border-black text-xs font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Description</label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-xl bg-neutral-50 focus:outline-none focus:border-black text-xs font-medium min-h-[60px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Price (INR) *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={editForm.price}
                      onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-xl bg-neutral-50 focus:outline-none focus:border-black text-xs font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Stock Qty</label>
                    <input
                      type="number"
                      min="0"
                      value={editForm.stock}
                      onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-xl bg-neutral-50 focus:outline-none focus:border-black text-xs font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Category *</label>
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-xl bg-neutral-50 focus:outline-none focus:border-black text-xs font-medium"
                  >
                    <option value="SNEAKERS">SNEAKERS</option>
                    <option value="CLOTHING">CLOTHING</option>
                    <option value="ACCESSORIES">ACCESSORIES</option>
                    <option value="WATCHES">WATCHES</option>
                    <option value="BAGS">BAGS</option>
                    <option value="SALE">SALE</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Image URL</label>
                  <input
                    type="url"
                    value={editForm.imageUrl}
                    onChange={(e) => setEditForm({ ...editForm, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-xl bg-neutral-50 focus:outline-none focus:border-black text-xs font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingEdit}
                  className="w-full h-11 bg-black text-white rounded-full flex items-center justify-center font-semibold uppercase tracking-wider text-xs hover:bg-neutral-900 transition-all cursor-pointer mt-4"
                >
                  {isSubmittingEdit ? 'Updating...' : 'Update Product'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
