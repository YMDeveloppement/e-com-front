import { useState, useCallback, useEffect, useRef } from "react";
import "@/assets/css/admin/productslist.scss";
import axiosAdmin from "@/plugins/axiosAdmin";
// ── Constants (outside component = no re-creation on render) ──────────────────
const COLORS = [
    { name: "Orange", hex: "#F97316" },
    { name: "Blue", hex: "#3B82F6" },
    { name: "Yellow", hex: "#EAB308" },
    { name: "Black", hex: "#111827" },
    { name: "White", hex: "#F9FAFB" },
    { name: "Red", hex: "#EF4444" },
];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const CATEGORIES = ["Women", "Men", "Kids", "Dress", "Tops", "Bottoms", "Accessories", "Shoes"];
const BRANDS = [{ id: "f3548c70-b1ab-49a0-9599-f0ab01621494", name: "Nike" }, { id: "adidas-id", name: "Adidas" }, { id: "zara-id", name: "Zara" }, { id: "h&m-id", name: "H&M" }, { id: "gucci-id", name: "Gucci" }, { id: "prada-id", name: "Prada" }, { id: "uniqlo-id", name: "Uniqlo" }, { id: "levi's-id", name: "Levi's" }];

const INITIAL_FORM = {
    name: "Title Tile product", slug: "title-tile", description: "decriedf sdfsdf sdfsdf", short_desc: "sdfsdf", image_url: "",
    base_price: "8507.25", compare_price: "507.25", cost_price: "8507.25", tax_rate: "20.00",
    weight_grams: "", is_active: true, is_featured: false, is_organic: false,
    meta_title: "TITLE META", meta_description: "TITLE META DESCRIPTION",
    category_id: ['a199ad9a-64b8-42e3-b531-0867d9a6760b'], brand_id: "f3548c70-b1ab-49a0-9599-f0ab01621494", colors: ['Orange', 'Blue'], sizes: ['M'], schedule: "",
};

const generateSlug = (name) =>
    name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

// ── Reusable sub-components ───────────────────────────────────────────────────
const FormField = ({ label, required, hint, children }) => (
    <div className="mb-3">
        <label className="form-label">
            {label} {required && <span className="req">*</span>}
        </label>
        {children}
        {hint && <div className="char-hint">{hint}</div>}
    </div>
);

const PriceInput = ({ label, badge, value, onChange, required }) => (
    <div>
        <label className="form-label">
            {label} {required && <span className="req">*</span>}
            {badge && <span className="price-badge bg-warning text-dark ms-1">{badge}</span>}
        </label>
        <div className="input-group">
            <span className="input-group-text">$</span>
            <input
                type="number" className="form-control" placeholder="0.00"
                min="0" step="0.01" value={value} onChange={onChange}
                required={required}
            />
        </div>
    </div>
);

const ToggleSwitch = ({ id, label, icon, checked, onChange }) => (
    <div className="form-check form-switch mb-0">
        <input
            className="form-check-input" type="checkbox" id={id}
            checked={checked} onChange={onChange}
            style={{ width: "2.2em", height: "1.2em" }}
        />
        <label className="form-check-label ms-1" htmlFor={id}>
            <i className={`bi ${icon} me-1`} />{label}
        </label>
    </div>
);

const ColorSwatch = ({ color, selected, onToggle }) => (
    <div
        className={`color-swatch ${selected ? "selected" : ""}`}
        style={{ background: color.hex }}
        title={color.name}
        onClick={onToggle}
    >
        {selected && <span className="check-icon">✓</span>}
    </div>
);

const SizeButton = ({ size, selected, onToggle }) => (
    <button
        type="button"
        className={`size-btn ${selected ? "selected" : ""}`}
        onClick={onToggle}
    >
        {size}
    </button>
);

// ── Main Component ────────────────────────────────────────────────────────────
export default function FormProductInfo() {
    const [form, setForm] = useState(INITIAL_FORM);
    const [images, setImages] = useState([]);          // { file, preview }
    const [catInput, setCatInput] = useState("");
    const [showCatDrop, setShowCatDrop] = useState(false);
    const objectUrlsRef = useRef([]);            // track for cleanup

    // Revoke object URLs on unmount or when images change to prevent memory leaks
    useEffect(() => {
        return () => objectUrlsRef.current.forEach(URL.revokeObjectURL);
    }, []);

    // Generic field setter
    const set = useCallback((key, val) =>
        setForm((f) => ({ ...f, [key]: val })), []);

    // Generic onChange for simple text/number/url inputs
    const handleField = useCallback((key) =>
        (e) => set(key, e.target.value), [set]);

    const handleNameChange = useCallback((e) => {
        const val = e.target.value.slice(0, 20);
        setForm((f) => ({ ...f, name: val, slug: generateSlug(val) }));
    }, []);

    const handleChangeImg = useCallback((e) => {
        console.log("Selected files:", e.target.files);
        const newPreviews = Array.from(e.target.files).map((file) => {
            const preview = URL.createObjectURL(file);
            objectUrlsRef.current.push(preview);
            return { file, preview };
        });
        console.log("Generated previews:", newPreviews);
        setImages((prev) => [...prev, ...newPreviews]);
        e.target.value = "";   // allow re-selecting the same file
    }, []);

    const removeImage = useCallback((index) => {
        setImages((prev) => {
            URL.revokeObjectURL(prev[index].preview);
            return prev.filter((_, i) => i !== index);
        });
    }, []);

    const toggleArrayItem = useCallback((key, item) =>
        setForm((f) => ({
            ...f,
            [key]: f[key].includes(item)
                ? f[key].filter((x) => x !== item)
                : [...f[key], item],
        })), []);

    const addCategory = useCallback((cat) => {
        console.log("Adding category:", cat);
        // setForm([cat]);
        setShowCatDrop(false);
        setCatInput("");
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        axiosAdmin.post("/products", { ...form, images: Object.values(images).map((img) => img.file) }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                console.log("API response:", res.data);
                setSuccessToast(true);
                setTimeout(() => setSuccessToast(false), 3000);
            })
            .catch((err) => {
                console.error("API error:", err);
            });
    }, [form, images]);

    const filteredCategories = CATEGORIES.filter(
        (c) => c.toLowerCase().includes(catInput.toLowerCase()) && !form.category_id.includes(c)
    );

    const [successToast, setSuccessToast] = useState(false);

    return (
        <>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css" rel="stylesheet" />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.3/font/bootstrap-icons.min.css" rel="stylesheet" />
            <div className="products-form">
                {
                    successToast ?     <div class="modal fade show" id="exampleModalToggle" style={{ display: 'block' }} aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content text-center p-4">
                            <div class="text-success fs-1">✔</div>
                            <h4 class="mt-3">Success!</h4>
                            <p>Operation completed successfully.</p>

                            <button class="btn btn-success" data-bs-dismiss="modal">
                                OK
                            </button>
                        </div>
                    </div>
                </div> : null
                }

                <div className="product-form-wrap">
                    <div className="container" >
                        <div className="form-card">


                            <form onSubmit={handleSubmit} className="form-body">
                                {/* ── Images ── */}
                                <p className="section-title"><i className="bi bi-images me-1" />Product Images</p>
                                <label className="upload-box">
                                    <input type="file" multiple accept="image/*" onChange={handleChangeImg} />
                                    <div className="upload-content">
                                        <span className="upload-icon">☁</span>
                                        <p>Drop images here or <span className="browse">click to browse</span></p>
                                    </div>
                                </label>
                                {images.length > 0 && (
                                    <div className="preview-grid">
                                        {images.map((img, i) => (
                                            <div key={img.preview} className="preview-card">
                                                <img src={img.preview} alt={`preview-${i}`} />
                                                <button type="button" onClick={() => removeImage(i)}>×</button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <hr className="divider" />

                                {/* ── Basic Info ── */}
                                <p className="section-title"><i className="bi bi-tag me-1" />Basic Information</p>

                                <div className="row g-3 mb-3">
                                    <div className="col-md-8">
                                        <FormField
                                            label="Product Title" required
                                            hint={<>{form.name.length}/20 characters &nbsp;·&nbsp; Slug: <code>{form.slug || "auto-generated"}</code></>}
                                        >
                                            <input type="text" className="form-control" placeholder="Enter title"
                                                value={form.name} onChange={handleNameChange} required />
                                        </FormField>
                                    </div>
                                    <div className="col-md-4">
                                        <FormField label="Brand" required>
                                            <select className="form-select" value={form.brand_id}
                                                onChange={handleField("brand_id")} required>
                                                <option value="">Choose brand</option>
                                                {BRANDS.map((b) => (
                                                    <option key={b.id} value={b.id}>
                                                        {b.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </FormField>
                                    </div>
                                </div>

                                {/* Category multi-select */}
                                <FormField label="Category" required>
                                    <div className="category-box" onClick={() => setShowCatDrop(true)}
                                        style={{ position: "relative" }}>
                                        {form.category_id.map((cat) => (
                                            <span key={cat} className="cat-tag">
                                                {cat}
                                                <button type="button"
                                                    onClick={(e) => { e.stopPropagation(); toggleArrayItem("category_id", cat); }}>×</button>
                                            </span>
                                        ))}
                                        <input className="cat-input"
                                            placeholder={form.category_id.length === 0 ? "Search categories…" : ""}
                                            value={catInput}
                                            onChange={(e) => { setCatInput(e.target.value); setShowCatDrop(true); }}
                                            onFocus={() => setShowCatDrop(true)}
                                            onBlur={() => setTimeout(() => setShowCatDrop(false), 150)}
                                        />
                                        {showCatDrop && filteredCategories.length > 0 && (
                                            <div className="cat-dropdown">
                                                {filteredCategories.map((c) => (
                                                    <div key={c} className="cat-dropdown-item" onMouseDown={() => addCategory(c)}>{c}</div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </FormField>

                                <FormField label="Short Description">
                                    <input type="text" className="form-control" placeholder="Brief one-liner…"
                                        maxLength={500} value={form.short_desc} onChange={handleField("short_desc")} />
                                </FormField>

                                <FormField label="Full Description">
                                    <textarea className="form-control" placeholder="Detailed description…"
                                        value={form.description} onChange={handleField("description")} />
                                </FormField>

                                <FormField label="Image URL">
                                    <input type="url" className="form-control" placeholder="https://…"
                                        value={form.image_url} onChange={handleField("image_url")} />
                                </FormField>

                                <hr className="divider" />

                                {/* ── Pricing ── */}
                                <p className="section-title"><i className="bi bi-currency-dollar me-1" />Pricing</p>
                                <div className="row g-3 mb-3">
                                    <div className="col-md-4">
                                        <PriceInput label="Base Price" required value={form.base_price}
                                            onChange={handleField("base_price")} />
                                    </div>
                                    <div className="col-md-4">
                                        <PriceInput label="Compare Price" badge="Sale" value={form.compare_price}
                                            onChange={handleField("compare_price")} />
                                    </div>
                                    <div className="col-md-4">
                                        <PriceInput label="Cost Price" value={form.cost_price}
                                            onChange={handleField("cost_price")} />
                                    </div>
                                </div>

                                <div className="row g-3">
                                    <div className="col-md-4">
                                        <FormField label="Tax Rate (%)">
                                            <input type="number" className="form-control" min="0" max="100" step="0.01"
                                                value={form.tax_rate} onChange={handleField("tax_rate")} />
                                        </FormField>
                                    </div>
                                    <div className="col-md-4">
                                        <FormField label="Schedule (Sale Date)">
                                            <input type="date" className="form-control"
                                                value={form.schedule} onChange={handleField("schedule")} />
                                        </FormField>
                                    </div>
                                    <div className="col-md-4">
                                        <FormField label="Weight (grams)">
                                            <input type="number" className="form-control" placeholder="e.g. 350" min="0"
                                                value={form.weight_grams} onChange={handleField("weight_grams")} />
                                        </FormField>
                                    </div>
                                </div>

                                <hr className="divider" />

                                {/* ── Variants ── */}
                                <p className="section-title"><i className="bi bi-palette me-1" />Variants</p>
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Color{form.colors.length > 0 && <span className="text-muted ms-1 fw-normal">· {form.colors.join(", ")}</span>}
                                        </label>
                                        <div className="d-flex flex-wrap gap-2">
                                            {COLORS.map((c) => (
                                                <ColorSwatch key={c.name} color={c}
                                                    selected={form.colors.includes(c.name)}
                                                    onToggle={() => toggleArrayItem("colors", c.name)} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Size{form.sizes.length > 0 && <span className="text-muted ms-1 fw-normal">· {form.sizes.join(", ")}</span>}
                                        </label>
                                        <div className="d-flex flex-wrap gap-2">
                                            {SIZES.map((s) => (
                                                <SizeButton key={s} size={s}
                                                    selected={form.sizes.includes(s)}
                                                    onToggle={() => toggleArrayItem("sizes", s)} />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <hr className="divider" />

                                {/* ── SEO ── */}
                                <p className="section-title"><i className="bi bi-search me-1" />SEO</p>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <FormField label="Meta Title">
                                            <input type="text" className="form-control" placeholder="SEO title"
                                                maxLength={255} value={form.meta_title} onChange={handleField("meta_title")} />
                                        </FormField>
                                    </div>
                                    <div className="col-md-6">
                                        <FormField label="Meta Description">
                                            <input type="text" className="form-control" placeholder="SEO description"
                                                maxLength={500} value={form.meta_description} onChange={handleField("meta_description")} />
                                        </FormField>
                                    </div>
                                </div>

                                <hr className="divider" />

                                {/* ── Flags ── */}
                                <p className="section-title"><i className="bi bi-toggles me-1" />Flags</p>
                                <div className="toggle-group mb-0">
                                    {[
                                        { key: "is_active", label: "Active", icon: "bi-check-circle" },
                                        { key: "is_featured", label: "Featured", icon: "bi-star" },
                                        { key: "is_organic", label: "Organic", icon: "bi-flower1" },
                                    ].map(({ key, label, icon }) => (
                                        <ToggleSwitch key={key} id={key} label={label} icon={icon}
                                            checked={form[key]}
                                            onChange={(e) => set(key, e.target.checked)} />
                                    ))}
                                </div>

                                <hr className="divider" />

                                {/* ── Actions ── */}
                                <div className="d-flex justify-content-end gap-2">
                                    <button type="button" className="btn-cancel">Cancel</button>
                                    <button type="submit" className="btn-save">
                                        <i className="bi bi-cloud-upload me-2" />Save Product
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

// ── Styles (extracted to constant = not re-parsed on each render) ─────────────
