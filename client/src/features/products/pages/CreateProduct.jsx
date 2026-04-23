import React, { useState, useEffect } from "react";
import { useProduct } from "../hooks/useProduct.js";
import { useNavigate } from "react-router-dom";
import { FiUploadCloud, FiX, FiArrowLeft, FiSun, FiMoon, FiPackage, FiTag, FiAlignLeft, } from "react-icons/fi";
import DarkModeAndLightMode from "../../authentication/components/DarkModeAndLightMode.jsx";


/* ─── field label component ─── */
const Label = ({ icon: Icon, children, extra }) => (
    <div className="flex items-center justify-between mb-1.5">
        <label className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            {Icon && <Icon size={13} />}
            {children}
        </label>
        {extra && (
            <span className="text-xs text-zinc-400 dark:text-zinc-500">{extra}</span>
        )}
    </div>
);

/* ─── card component ─── */
const Card = ({ title, children, className = "" }) => (
    <div
        className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden ${className}`}
    >
        {title && (
            <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
                <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                    {title}
                </h2>
            </div>
        )}
        <div className="p-6">{children}</div>
    </div>
);

/* ─── input base classes ─── */
const inputCls =
    "w-full px-3.5 py-2.5 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 dark:focus:border-violet-400 transition-all duration-200";

/* ════════════════════════════════════════════════════════════ */
const CreateProduct = () => {
    const { handleCreateProduct } = useProduct();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [dragOver, setDragOver] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priceAmount: "",
        priceCurrency: "INR",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const addFiles = (files) => {
        const arr = Array.from(files);
        if (images.length + arr.length > 7) {
            setError("Maximum 7 images allowed.");
            return;
        }
        setError("");
        setImages((prev) => [...prev, ...arr]);
        setPreviewUrls((prev) => [
            ...prev,
            ...arr.map((f) => URL.createObjectURL(f)),
        ]);
    };

    const handleImageChange = (e) => addFiles(e.target.files);

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        addFiles(e.dataTransfer.files);
    };

    const removeImage = (i) => {
        URL.revokeObjectURL(previewUrls[i]);
        setImages((p) => p.filter((_, idx) => idx !== i));
        setPreviewUrls((p) => p.filter((_, idx) => idx !== i));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (images.length === 0) {
            setError("At least one product image is required.");
            return;
        }
        setIsLoading(true);
        setError("");
        const fd = new FormData();
        fd.append("title", formData.title);
        fd.append("description", formData.description);
        fd.append("priceAmount", formData.priceAmount);
        fd.append("priceCurrency", formData.priceCurrency);
        images.forEach((img) => fd.append("images", img));
        const res = await handleCreateProduct(fd);
        setIsLoading(false);
        if (res?.success === false)
            setError(res.message || "Failed to create product.");
        else if (res) navigate(-1);
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300 font-sans">
            {/* ── TOP NAVBAR ── */}
            <header className="sticky top-0 z-30 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 h-15 flex items-center justify-between gap-4 py-3">
                    {/* left */}
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-150"
                            aria-label="Go back"
                        >
                            <FiArrowLeft size={16} />
                        </button>
                        <div className="h-5 w-px bg-zinc-200 dark:bg-zinc-700" />
                        <div className="flex items-center gap-2">
                            <FiPackage size={16} className="text-violet-500" />
                            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                New Product
                            </span>
                            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
                                DRAFT
                            </span>
                        </div>
                    </div>

                    {/* right */}
                    <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="hidden sm:block px-4 py-1.5 rounded-xl text-sm font-medium border border-zinc-200 dark:border-zinc-700 bg-transparent text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200"
                    >
                        Discard
                    </button>

                    <button
                        type="submit"
                        form="create-product-form"
                        disabled={isLoading}
                        className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 border border-violet-700 dark:border-violet-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-violet-500/20 transition-all duration-200"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />{" "}
                                Publishing…
                            </>
                        ) : (
                            "Publish Product"
                        )}
                    </button>
                    <button className="text-2xl"><DarkModeAndLightMode/></button>
                </div>
        </div>
      </header >

    {/* ── PAGE BODY ── */ }
    < main className = "max-w-7xl mx-auto px-4 sm:px-8 py-8 md:py-12" >
        {/* Error banner */ }
{
    error && (
        <div className="mb-6 flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400 w-full">
            <FiX size={16} className="mt-0.5 flex-shrink-0" />
            <span>{error}</span>
        </div>
    )
}

<form
    id="create-product-form"
    onSubmit={handleSubmit}
    className="flex flex-col lg:flex-row gap-8 items-start w-full"
>
    {/* ── LEFT COLUMN (60%) ── */}
    <div className="flex-1 min-w-0 flex flex-col gap-8 w-full">
        <Card title="Product Details">
            <div className="space-y-6">
                {/* Title */}
                <div>
                    <Label icon={FiTag}>Product Title</Label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className={inputCls}
                        placeholder="e.g. Premium Slim-Fit T-Shirt"
                    />
                </div>

                {/* Description */}
                <div>
                    <Label icon={FiAlignLeft}>Description</Label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={6}
                        className={`${inputCls} resize-none`}
                        placeholder="Write a clear, detailed description of your product…"
                    />
                </div>

                {/* Price row */}
                <div>
                    <Label>Pricing</Label>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="number"
                            name="priceAmount"
                            value={formData.priceAmount}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                            className={`${inputCls} flex-1`}
                            placeholder="0.00"
                        />
                        <select
                            name="priceCurrency"
                            value={formData.priceCurrency}
                            onChange={handleChange}
                            className={`${inputCls} sm:w-40 appearance-none`}
                        >
                            <option value="INR">INR ₹</option>
                            <option value="USD">USD $</option>
                            <option value="EUR">EUR €</option>
                        </select>
                    </div>
                </div>
            </div>
        </Card>
    </div>

    {/* ── RIGHT COLUMN (40%) ── */}
    <div className="w-full lg:w-[380px] xl:w-[420px] flex-shrink-0 flex flex-col gap-8">
        {/* Media Card */}
        <Card title="Media">
            <div className="space-y-5">
                <Label extra={`${images.length} / 7`}>Product Images</Label>

                {/* Drop zone */}
                <label
                    htmlFor="file-upload"
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    className={`flex flex-col items-center justify-center gap-3 w-full py-10 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200
                                        ${dragOver
                            ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                            : "border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 hover:border-violet-400 dark:hover:border-violet-500 hover:bg-violet-50/50 dark:hover:bg-violet-900/10"
                        }`}
                >
                    <div
                        className={`p-3 rounded-xl transition-colors duration-200 ${dragOver ? "bg-violet-100 dark:bg-violet-800/40" : "bg-zinc-100 dark:bg-zinc-800"}`}
                    >
                        <FiUploadCloud
                            size={24}
                            className={
                                dragOver
                                    ? "text-violet-500"
                                    : "text-zinc-400 dark:text-zinc-500"
                            }
                        />
                    </div>
                    <div className="text-center px-4">
                        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            <span className="text-violet-600 dark:text-violet-400">
                                Click to upload
                            </span>{" "}
                            or drag & drop
                        </p>
                        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                            PNG, JPG, JPEG · Max 7 images · 5 MB each
                        </p>
                    </div>
                    <input
                        id="file-upload"
                        type="file"
                        className="sr-only"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={images.length >= 7}
                    />
                </label>

                {/* Previews */}
                {previewUrls.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-3 mt-4">
                        {previewUrls.map((url, i) => (
                            <div
                                key={i}
                                className="relative group aspect-square rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800"
                            >
                                <img
                                    src={url}
                                    alt={`Product image ${i + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(i)}
                                    className="absolute top-1.5 right-1.5 flex items-center justify-center w-6 h-6 rounded-full bg-zinc-900/70 dark:bg-black/70 text-white opacity-0 group-hover:opacity-100 hover:bg-red-500 transition-all duration-150"
                                    aria-label="Remove image"
                                >
                                    <FiX size={12} />
                                </button>
                                {i === 0 && (
                                    <span className="absolute bottom-1.5 left-1.5 text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded bg-zinc-900/70 text-zinc-100">
                                        COVER
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Card>

        {/* Summary Card */}
        <Card title="Summary">
            <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-zinc-500 dark:text-zinc-400">
                        Status
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-medium text-amber-600 dark:text-amber-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        Draft
                    </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-zinc-500 dark:text-zinc-400">
                        Images
                    </span>
                    <span className="font-medium text-zinc-800 dark:text-zinc-200">
                        {images.length} of 7
                    </span>
                </div>
                <div className="flex items-center justify-between py-2">
                    <span className="text-zinc-500 dark:text-zinc-400">
                        Price
                    </span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {formData.priceAmount ? (
                            `${formData.priceCurrency} ${Number(formData.priceAmount).toLocaleString()}`
                        ) : (
                            <span className="text-zinc-400 dark:text-zinc-500 font-normal">
                                Not set
                            </span>
                        )}
                    </span>
                </div>
            </div>
        </Card>

        {/* Mobile-only action buttons */}
        <div className="flex flex-col gap-3 sm:hidden mt-2">
            <button
                type="submit"
                form="create-product-form"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm md:shadow-violet-500/20 transition-all duration-200"
            >
                {isLoading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />{" "}
                        Publishing…
                    </>
                ) : (
                    "Publish Product"
                )}
            </button>
            <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full flex items-center justify-center px-6 py-3.5 rounded-xl text-base font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200"
            >
                Discard
            </button>
        </div>
    </div>
</form>
      </main >
    </div >
  );
};

export default CreateProduct;
