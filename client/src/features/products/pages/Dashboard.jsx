import React, { useEffect, useState } from "react";
import { useProduct } from "../hooks/useProduct.js";
import { useSelector } from "react-redux";
import { 
    FiPlus, FiEdit2, FiTrash2, FiSearch, FiBox, 
    FiDollarSign, FiTrendingUp, FiMenu, FiX, FiHome, 
    FiShoppingBag, FiUsers, FiSettings, FiLogOut
} from "react-icons/fi";
import DarkModeAndLightMode from "../../authentication/components/DarkModeAndLightMode.jsx";

const Dashboard = () => {
    const { handleGetAllProducts } = useProduct();
    const sellerProducts = useSelector(state => state.product.sellerProducts);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    console.log(sellerProducts)
    useEffect(() => {
        handleGetAllProducts();
    }, []);

    // Fallback data if sellerProducts is empty
    const mockData = [
        {
          "price": { "amount": 10000, "currency": "INR" },
          "_id": "69e7a8f081bdd5a924ed011f",
          "title": "title_1",
          "description": "description_1",
          "seller": "69e5e18dba40ffdf46290496",
          "image": [
            { "url": "https://ik.imagekit.io/qnt7clkc1/SNITCH/Screenshot_2025-12-14_230048_XJVPTVzRgN.png", "_id": "69e7a8f081bdd5a924ed0120" },
            { "url": "https://ik.imagekit.io/qnt7clkc1/SNITCH/Screenshot_2025-12-14_230234_-bqDmemS97.png", "_id": "69e7a8f081bdd5a924ed0121" }
          ],
          "createdAt": "2026-04-21T16:42:24.528Z",
          "updatedAt": "2026-04-21T16:42:24.528Z",
          "__v": 0
        },
        {
          "price": { "amount": 1000, "currency": "INR" },
          "_id": "69e87e606ee077cabcd77d7b",
          "title": "indian garage",
          "description": "this is the shirt of indian garage ",
          "seller": "69e5e18dba40ffdf46290496",
          "image": [
            { "url": "https://ik.imagekit.io/qnt7clkc1/SNITCH/Screenshot_2025-12-14_230048_Pbe9eA_Q_.png", "_id": "69e87e606ee077cabcd77d7c" },
            { "url": "https://ik.imagekit.io/qnt7clkc1/SNITCH/Screenshot_2025-12-14_230234_Ql6R50gas.png", "_id": "69e87e606ee077cabcd77d7d" },
            { "url": "https://ik.imagekit.io/qnt7clkc1/SNITCH/Screenshot_2025-12-14_230505_RrZecez9J.png", "_id": "69e87e606ee077cabcd77d7e" }
          ],
          "createdAt": "2026-04-22T07:53:04.806Z",
          "updatedAt": "2026-04-22T07:53:04.806Z",
          "__v": 0
        }
    ];

    const products = sellerProducts?.length > 0 ? sellerProducts : mockData;

    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalProducts = products.length;
    const totalValue = products.reduce((acc, curr) => acc + (curr.price?.amount || 0), 0);

    const navItems = [
        { icon: <FiHome />, label: "Overview", active: false },
        { icon: <FiShoppingBag />, label: "Products", active: true },
        { icon: <FiUsers />, label: "Customers", active: false },
        { icon: <FiSettings />, label: "Settings", active: false },
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-200">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-sm transition-opacity" 
                    onClick={() => setIsSidebarOpen(false)} 
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-[#111111] border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Logo Area */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800">
                    <span className="text-xl font-black tracking-widest uppercase dark:text-white">SNITCH</span>
                    <button className="lg:hidden p-2 -mr-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg dark:text-gray-400 transition-colors" onClick={() => setIsSidebarOpen(false)}>
                        <FiX className="h-5 w-5" />
                    </button>
                </div>
                
                {/* Nav Links */}
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {navItems.map(item => (
                        <a key={item.label} href="#" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${item.active ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/50'}`}>
                            <span className="text-lg">{item.icon}</span>
                            <span className="font-medium text-sm">{item.label}</span>
                        </a>
                    ))}
                </nav>

                {/* User / Logout */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                    <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 dark:text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400 rounded-lg transition-colors">
                        <FiLogOut className="text-lg" />
                        <span className="font-medium text-sm">Logout</span>
                    </a>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Top Header */}
                <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#111111] border-b border-gray-200 dark:border-gray-800 z-10 transition-colors">
                    <div className="flex items-center gap-4">
                        <button className="lg:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg dark:text-gray-400 transition-colors" onClick={() => setIsSidebarOpen(true)}>
                            <FiMenu className="h-5 w-5" />
                        </button>
                        {/* Search Bar in Header */}
                        <div className="hidden md:flex relative w-64 lg:w-96 group">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Search products..." 
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-[#1a1a1a] border-transparent focus:bg-white dark:focus:bg-[#111] border dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-600 transition-all text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6">
                        <DarkModeAndLightMode />
                        <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden border border-gray-300 dark:border-gray-700 cursor-pointer hover:ring-2 ring-gray-200 dark:ring-gray-700 transition-all">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="h-full w-full object-cover" />
                        </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="max-w-6xl mx-auto space-y-8">
                        {/* Dashboard Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Products</h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your clothing catalog.</p>
                            </div>
                            <button className="inline-flex items-center justify-center rounded-lg bg-black dark:bg-white px-5 py-2.5 text-sm font-medium text-white dark:text-black transition-all hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-[#0a0a0a] active:scale-95 shadow-sm">
                                <FiPlus className="mr-2 h-4 w-4" />
                                Add New Product
                            </button>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            <MetricCard 
                                title="Total Products" 
                                value={totalProducts} 
                                icon={<FiBox className="h-5 w-5 text-blue-600 dark:text-blue-400" />} 
                                trend="+12% this month"
                            />
                            <MetricCard 
                                title="Catalog Value" 
                                value={`₹${(totalValue).toLocaleString()}`} 
                                icon={<FiDollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />} 
                                trend="+8% this month"
                            />
                            <MetricCard 
                                title="Active Listings" 
                                value={totalProducts} 
                                icon={<FiTrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />} 
                                trend="100% active rate"
                            />
                        </div>

                        {/* Content Area */}
                        <div className="bg-white dark:bg-[#111111] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden transition-colors">
                            {/* Mobile Search */}
                            <div className="p-4 border-b border-gray-200 dark:border-gray-800 md:hidden bg-gray-50/50 dark:bg-[#151515]">
                                <div className="relative w-full">
                                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
                                    <input 
                                        type="text" 
                                        placeholder="Search products..." 
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all text-gray-900 dark:text-gray-100"
                                    />
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50/80 dark:bg-[#161616] text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider border-b border-gray-200 dark:border-gray-800">
                                        <tr>
                                            <th className="px-6 py-4 font-medium">Product</th>
                                            <th className="px-6 py-4 font-medium whitespace-nowrap">Price</th>
                                            <th className="px-6 py-4 font-medium hidden md:table-cell">Status</th>
                                            <th className="px-6 py-4 font-medium hidden lg:table-cell whitespace-nowrap">Added On</th>
                                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                        {filteredProducts.length > 0 ? (
                                            filteredProducts.map((product) => (
                                                <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-[#151515] transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="h-14 w-14 flex-shrink-0 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden relative group-hover:shadow-sm transition-all">
                                                                {product.image && product.image[0] ? (
                                                                    <img 
                                                                        src={product.image[0].url} 
                                                                        alt={product.title} 
                                                                        className="h-full w-full object-cover object-center"
                                                                    />
                                                                ) : (
                                                                    <div className="flex items-center justify-center h-full w-full text-gray-400 dark:text-gray-500">
                                                                        <FiBox className="h-5 w-5" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="flex flex-col max-w-[180px] sm:max-w-[250px] lg:max-w-[300px]">
                                                                <span className="font-semibold text-gray-900 dark:text-gray-100 truncate text-sm capitalize">{product.title}</span>
                                                                <span className="text-gray-500 dark:text-gray-400 truncate text-xs mt-0.5">{product.description}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="font-medium text-gray-900 dark:text-gray-100">
                                                            ₹{product.price?.amount?.toLocaleString() || 0}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 hidden md:table-cell">
                                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 mr-1.5"></span>
                                                            Active
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400 hidden lg:table-cell whitespace-nowrap text-xs">
                                                        {new Date(product.createdAt).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex justify-end gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors focus:opacity-100" title="Edit">
                                                                <FiEdit2 className="h-4 w-4" />
                                                            </button>
                                                            <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors focus:opacity-100" title="Delete">
                                                                <FiTrash2 className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                        <div className="flex justify-end gap-2 group-hover:hidden lg:hidden">
                                                            <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                                                                <FiEdit2 className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-16 text-center text-gray-500 dark:text-gray-400">
                                                    <div className="flex flex-col items-center justify-center">
                                                        <div className="h-12 w-12 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-3 border border-gray-100 dark:border-gray-700">
                                                            <FiBox className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                                                        </div>
                                                        <p className="text-base font-medium text-gray-900 dark:text-gray-200">No products found</p>
                                                        <p className="text-sm mt-1 max-w-sm">Try adjusting your search or add a new product to get started.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const MetricCard = ({ title, value, icon, trend }) => (
    <div className="bg-white dark:bg-[#111111] p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 flex items-center gap-4 hover:shadow-md dark:hover:shadow-black/50 transition-all group">
        <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 flex-shrink-0 group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 tracking-wide">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{value}</p>
            {trend && (
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium flex items-center gap-1">
                    {trend}
                </p>
            )}
        </div>
    </div>
);

export default Dashboard;
