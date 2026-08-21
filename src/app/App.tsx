import { useState, useEffect } from "react";
import {
  ShoppingCart,
  Search,
  X,
  Menu,
  ChevronRight,
  ArrowRight,
  Instagram,
  Twitter,
  Youtube,
  Sparkles,
  Eye,
  Check,
  Flame,
  ShieldCheck,
  Truck,
  RefreshCw,
  SlidersHorizontal,
  Palette,
  Heart,
  CreditCard,
  Banknote,
  Smartphone,
  MapPin,
  Phone,
  User,
  PackageCheck,
  CheckCircle2,
} from "lucide-react";

// Asset imports
import cilvenLogo from "@/assets/cilven-logo.jpg";
import cilvenTeeMale from "@/assets/product-cilven-tee-male.jpg";
import cilvenTeeFemale from "@/assets/product-cilven-tee-female.jpg";
import auraSkullTee from "@/assets/product-aura-skull.jpg";
import monogramBlack from "@/assets/product-monogram-black.jpg";
import monogramBlue from "@/assets/product-monogram-blue.jpg";

// ─── Types ─────────────────────────────────────────────────────────────────────

type PageId = "home" | "shop" | "capsule" | "bestsellers" | "lookbook" | "about";

interface ProductVariant {
  label: string;
  colorKey: string;
  colorName: string;
  img: string;
  badge?: string;
  hex: string;
}

interface Product {
  id: number;
  name: string;
  category: "GRAPHIC TEES" | "MONOGRAM SETS" | "TWIN SETS" | "DENIM & PANTS";
  price: number; // in EGP
  originalPrice?: number;
  tag: string;
  colors: string[];
  img: string;
  altImg?: string;
  variants: ProductVariant[];
  description: string;
  details: string[];
  stockLeft: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  color: string;
  size: string;
  img: string;
  qty: number;
}

// ─── Currency Formatter (Egyptian Pounds) ──────────────────────────────────────

function formatEGP(amount: number): string {
  return `${amount.toLocaleString("en-US")} EGP`;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const COLORS: Record<string, string> = {
  black: "#111111",
  white: "#f8f8f8",
  charcoal: "#333333",
  cyan: "#3b82a6",
  red: "#e8111a",
  denim: "#4b6b88",
  sand: "#c4a882",
  grey: "#777777",
};

const ALL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "CILVEN 'KILL YOU' OVERSIZED TEE",
    category: "GRAPHIC TEES",
    price: 850,
    originalPrice: 950,
    tag: "10% OFF",
    colors: ["black", "charcoal", "white"],
    img: cilvenTeeMale,
    altImg: cilvenTeeFemale,
    variants: [
      {
        label: "Noir Editorial",
        colorKey: "black",
        colorName: "Pitch Black",
        img: cilvenTeeMale,
        badge: "CAMPAIGN FIT",
        hex: "#111111",
      },
      {
        label: "Urban Graffiti",
        colorKey: "charcoal",
        colorName: "Charcoal Grey",
        img: cilvenTeeFemale,
        badge: "FEMALE FIT",
        hex: "#333333",
      },
      {
        label: "Clean White",
        colorKey: "white",
        colorName: "Optical White",
        img: cilvenTeeMale,
        badge: "LIGHT DROP",
        hex: "#f5f5f5",
      },
    ],
    description:
      "Signature drop constructed from custom 280GSM heavyweight combed Egyptian cotton. Features high-density screenprinted balaclava graphic on the chest and distressed typography across sleeves and hem.",
    details: [
      "280GSM Ultra-Heavyweight 100% Egyptian Cotton",
      "Drop shoulder relaxed streetwear fit",
      "Pre-shrunk fabric to preserve structural drape",
      "Signature 'Cilven Kill You' printed artwork",
      "Reinforced ribbed collar with inner neck taping",
    ],
    stockLeft: 14,
    isNewArrival: true,
    isBestSeller: true,
  },
  {
    id: 2,
    name: "CILVEN GRAFFITI EDITORIAL TEE",
    category: "GRAPHIC TEES",
    price: 850,
    originalPrice: 950,
    tag: "NEW DROP",
    colors: ["black", "grey"],
    img: cilvenTeeFemale,
    altImg: cilvenTeeMale,
    variants: [
      {
        label: "Graffiti Studio",
        colorKey: "black",
        colorName: "Washed Noir",
        img: cilvenTeeFemale,
        badge: "FEATURED",
        hex: "#111111",
      },
      {
        label: "Street Outfit",
        colorKey: "grey",
        colorName: "Industrial Grey",
        img: cilvenTeeMale,
        badge: "OVERSIZED",
        hex: "#777777",
      },
    ],
    description:
      "Urban editorial edition highlighting the balaclava visual identity with layered street tags, raw sleeve accents, and a relaxed boxy silhouette.",
    details: [
      "Custom reactive black dye treatment",
      "Distressed multi-layer discharge print",
      "Wide double-stitched sleeve cuffs",
      "Unisex boxy streetwear drape",
      "Includes numbered verification certificate",
    ],
    stockLeft: 9,
    isNewArrival: true,
    isBestSeller: true,
  },
  {
    id: 3,
    name: "AURA 'ME VS ME' GRAPHIC SET",
    category: "GRAPHIC TEES",
    price: 1250,
    originalPrice: 1400,
    tag: "LIMITED",
    colors: ["black", "charcoal"],
    img: auraSkullTee,
    altImg: auraSkullTee,
    variants: [
      {
        label: "Anatomical Noir",
        colorKey: "black",
        colorName: "Pure Black",
        img: auraSkullTee,
        badge: "ART SERIES",
        hex: "#111111",
      },
    ],
    description:
      "High-concept anatomical sketch graphic tee exploring psychological dualism. Includes textured 'ME VS ME' heavyweight graphic street shorts with cream contrast drawstrings.",
    details: [
      "Custom hand-drawn fine line anatomical skull art",
      "Heavyweight loopback French Terry shorts",
      "Extra long raw-finish drawstrings",
      "Deep zipper-secured side pockets",
      "Limited batch of 200 units worldwide",
    ],
    stockLeft: 6,
    isNewArrival: true,
    isBestSeller: false,
  },
  {
    id: 4,
    name: "NOIR EMBOSSED MONOGRAM SET",
    category: "MONOGRAM SETS",
    price: 1650,
    originalPrice: 1850,
    tag: "BEST SELLER",
    colors: ["black", "charcoal", "cyan"],
    img: monogramBlack,
    altImg: monogramBlue,
    variants: [
      {
        label: "Noir Jacquard",
        colorKey: "black",
        colorName: "Pitch Black Jacquard",
        img: monogramBlack,
        badge: "NOIR EDITION",
        hex: "#111111",
      },
      {
        label: "Denim Cyan",
        colorKey: "cyan",
        colorName: "Stonewashed Indigo",
        img: monogramBlue,
        badge: "CYAN EDITION",
        hex: "#3b82a6",
      },
    ],
    description:
      "The pinnacle of Cilven luxury streetwear. An all-over monogram jacquard short-sleeve resort collar shirt paired with tailored matching shorts.",
    details: [
      "Custom-woven monogram jacquard fabric",
      "Camp / Cuban resort collar with matte buttons",
      "Elastic waistband with interior flat drawstring",
      "Silky breathable high-density weave",
      "Tailored fit with relaxed drape",
    ],
    stockLeft: 11,
    isNewArrival: true,
    isBestSeller: true,
  },
  {
    id: 5,
    name: "DENIM CYAN MONOGRAM TWO-PIECE",
    category: "MONOGRAM SETS",
    price: 1650,
    originalPrice: 1850,
    tag: "HOT DROP",
    colors: ["denim", "cyan", "black"],
    img: monogramBlue,
    altImg: monogramBlack,
    variants: [
      {
        label: "Denim Indigo",
        colorKey: "denim",
        colorName: "Stonewashed Cyan",
        img: monogramBlue,
        badge: "CYAN EDITION",
        hex: "#4b6b88",
      },
      {
        label: "Noir Jacquard",
        colorKey: "black",
        colorName: "Monochrome Black",
        img: monogramBlack,
        badge: "NOIR EDITION",
        hex: "#111111",
      },
    ],
    description:
      "Washed cyan denim interpretation of the iconic Cilven monogram. Combines casual indigo workwear durability with elevated high-fashion pattern work.",
    details: [
      "Stone-washed indigo cotton blend",
      "Woven white contrast monogram pattern",
      "Chest utility pocket with reinforced bar tacks",
      "Dual slant front pockets on shorts",
      "Double-needle tonal stitching throughout",
    ],
    stockLeft: 8,
    isNewArrival: false,
    isBestSeller: true,
  },
  {
    id: 6,
    name: "CILVEN BALACLAVA GRAPHIC TEE",
    category: "GRAPHIC TEES",
    price: 850,
    tag: "SIGNATURE",
    colors: ["black", "white"],
    img: cilvenTeeFemale,
    altImg: cilvenTeeMale,
    variants: [
      {
        label: "Balaclava Edition",
        colorKey: "black",
        colorName: "Dark Noir",
        img: cilvenTeeFemale,
        badge: "ICONIC",
        hex: "#111111",
      },
      {
        label: "Male Street Look",
        colorKey: "white",
        colorName: "Industrial Black",
        img: cilvenTeeMale,
        badge: "OVERSIZED",
        hex: "#f5f5f5",
      },
    ],
    description:
      "Deep noir edition of our cult balaclava graphic tee with high-contrast monochrome printing and subtle neon highlights.",
    details: [
      "100% organic heavyweight carded cotton",
      "Silk-screened by hand in limited batches",
      "Taped neck and shoulders for durability",
      "Woven Cilven hem label",
    ],
    stockLeft: 18,
    isNewArrival: false,
    isBestSeller: true,
  },
  {
    id: 7,
    name: "AURA ANATOMY OVERSIZED TEE",
    category: "GRAPHIC TEES",
    price: 800,
    tag: "ART SERIES",
    colors: ["black", "grey"],
    img: auraSkullTee,
    altImg: auraSkullTee,
    variants: [
      {
        label: "Anatomical Sketch",
        colorKey: "black",
        colorName: "Washed Charcoal",
        img: auraSkullTee,
        badge: "ART DROP",
        hex: "#111111",
      },
    ],
    description:
      "Standalone art piece tee featuring the detailed anatomical skull sketch on heavyweight washed black cotton.",
    details: [
      "280GSM heavy jersey cotton",
      "Distressed vintage enzyme wash",
      "Relaxed drop shoulder cut",
      "Soft breathable water-based inks",
    ],
    stockLeft: 15,
    isNewArrival: false,
    isBestSeller: true,
  },
  {
    id: 8,
    name: "CILVEN ACID WASH STREET SET",
    category: "DENIM & PANTS",
    price: 1950,
    originalPrice: 2200,
    tag: "EXCLUSIVE",
    colors: ["denim", "black"],
    img: cilvenTeeMale,
    altImg: cilvenTeeFemale,
    variants: [
      {
        label: "Full Ensemble",
        colorKey: "denim",
        colorName: "Acid Tint Denim",
        img: cilvenTeeMale,
        badge: "2-PIECE SET",
        hex: "#4b6b88",
      },
    ],
    description:
      "Complete editorial ensemble: 'Kill You' graphic tee paired with oversized vintage acid-wash baggy denim jeans.",
    details: [
      "14oz Heavyweight rigid denim",
      "Wide-leg stacked baggy skate silhouette",
      "Vintage dirty-wash tint finish",
      "Includes signature Cilven tee",
    ],
    stockLeft: 5,
    isNewArrival: true,
    isBestSeller: false,
  },
];

const LOOKBOOK_ENTRIES = [
  {
    id: "look-01",
    lookNumber: "LOOK 01",
    title: "COLD-STREET CAMPAIGN",
    subtitle: "SS25 Main Campaign — Industrial Fog",
    model: "Zack / 185cm wearing size L",
    img: cilvenTeeMale,
    productId: 1,
    productName: "Cilven 'Kill You' Heavyweight Tee + Acid Denim",
    price: 850,
    quote: "A study in post-industrial silhouettes and raw texture contrast.",
  },
  {
    id: "look-02",
    lookNumber: "LOOK 02",
    title: "URBAN ALLEYWAY EDITORIAL",
    subtitle: "SS25 Campaign — Night Graffiti",
    model: "Elena / 173cm wearing size M",
    img: cilvenTeeFemale,
    productId: 2,
    productName: "Cilven Graffiti Editorial Oversized Tee",
    price: 850,
    quote: "High-contrast street graphics meeting unisex relaxed proportions.",
  },
  {
    id: "look-03",
    lookNumber: "LOOK 03",
    title: "AURA PSYCHOLOGY DUALISM",
    subtitle: "Art Series Look 03",
    model: "Zack / 185cm wearing size L",
    img: auraSkullTee,
    productId: 3,
    productName: "Aura 'Me vs Me' Skull Graphic Set",
    price: 1250,
    quote: "Fine line anatomical illustration colliding with street collage.",
  },
  {
    id: "look-04",
    lookNumber: "LOOK 04",
    title: "NOIR MONOGRAM ELEVATION",
    subtitle: "Luxe Monogram Studio Look 04",
    model: "Zack / 185cm wearing size M",
    img: monogramBlack,
    productId: 4,
    productName: "Noir All-Over Monogram Shirt & Short Set",
    price: 1650,
    quote: "Subtle jacquard depth tailored for high-presence summer days.",
  },
  {
    id: "look-05",
    lookNumber: "LOOK 05",
    title: "DENIM CYAN ARCHIVE",
    subtitle: "Luxe Monogram Studio Look 05",
    model: "Zack / 185cm wearing size M",
    img: monogramBlue,
    productId: 5,
    productName: "Denim Cyan Monogram Two-Piece Set",
    price: 1650,
    quote: "Indigo heritage re-engineered with luxury monogram jacquard.",
  },
];

// ─── Standard Product Card (As in User's Reference Images) ───────────────────

function ProductCard({
  product,
  onSelectProduct,
}: {
  product: Product;
  onSelectProduct: (product: Product) => void;
}) {
  const [activeImg, setActiveImg] = useState(product.img);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  return (
    <div className="group flex flex-col transition-all duration-300">
      {/* ── Image Box with Badge & Hover "Choose Options" Overlay ── */}
      <div className="relative aspect-[3/4] bg-[#f2f2f2] rounded-xl overflow-hidden mb-3.5 cursor-pointer">
        <img
          src={activeImg}
          alt={product.name}
          onClick={() => onSelectProduct(product)}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />

        {/* Tag / Discount Badge (Top Left - High Contrast Red) */}
        <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#e8111a] text-white text-[11px] font-bold tracking-wider rounded uppercase shadow-sm">
          {product.tag}
        </div>

        {/* Hover Action Pill Button (Sliding Up from Bottom, Exactly Like User's Reference) */}
        <div className="absolute bottom-3 left-3 right-3 transition-all duration-300 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={() => onSelectProduct(product)}
            className="w-full py-3.5 bg-white/95 hover:bg-black hover:text-white text-black font-bold tracking-[0.2em] text-xs uppercase rounded-xl transition-all duration-200 shadow-xl backdrop-blur-md cursor-pointer border border-black/10 flex items-center justify-center gap-2"
            style={{ fontFamily: "Space Mono, monospace" }}
          >
            CHOOSE OPTIONS
          </button>
        </div>
      </div>

      {/* ── Color Swatches Immediately Under The Image (As in Reference) ── */}
      <div className="flex items-center gap-2 mb-2.5 px-0.5">
        {product.colors.map((c) => {
          const isSelected = selectedColor === c;
          const hex = COLORS[c] || "#000000";

          return (
            <button
              key={c}
              onClick={() => {
                setSelectedColor(c);
                const matched = product.variants.find((v) => v.colorKey === c);
                if (matched) setActiveImg(matched.img);
              }}
              title={c}
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                isSelected ? "ring-2 ring-black ring-offset-2 scale-110" : "hover:scale-110"
              }`}
            >
              <span
                className="w-full h-full rounded-full border border-black/20"
                style={{ background: hex }}
              />
            </button>
          );
        })}
      </div>

      {/* ── Product Title ── */}
      <h3
        onClick={() => onSelectProduct(product)}
        className="text-xs sm:text-sm font-bold tracking-wider text-black uppercase leading-tight line-clamp-1 mb-1.5 cursor-pointer hover:text-[#e8111a] transition-colors"
        style={{ fontFamily: "Space Mono, monospace" }}
      >
        {product.name}
      </h3>

      {/* ── Pricing Line (Egyptian Pounds) ── */}
      <div className="flex items-center gap-2 text-xs sm:text-sm">
        {product.originalPrice && (
          <span className="text-zinc-400 line-through font-medium">
            {product.originalPrice.toLocaleString()} EGP
          </span>
        )}
        <span className="text-[#e8111a] font-bold">
          {product.price.toLocaleString()} EGP
        </span>
      </div>

      {/* ── Mobile Direct Quick Action Button ── */}
      <button
        onClick={() => onSelectProduct(product)}
        className="mt-2.5 w-full py-2 bg-zinc-900 hover:bg-[#e8111a] text-white text-[10px] font-bold tracking-widest uppercase rounded-lg sm:hidden flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        style={{ fontFamily: "Space Mono, monospace" }}
      >
        <span>SELECT OPTIONS</span>
        <ArrowRight size={12} />
      </button>
    </div>
  );
}

// ─── Clean Light Product Modal ────────────────────────────────────────────────

function ProductModal({
  product,
  onClose,
  onAddToCart,
}: {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}) {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState("L");
  const [activeImg, setActiveImg] = useState(product.img);
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [added, setAdded] = useState(false);

  const sizes = ["S", "M", "L", "XL", "XXL"];
  const variants =
    product.variants && product.variants.length > 0
      ? product.variants
      : [
          {
            label: "Standard Edition",
            colorKey: product.colors[0] || "black",
            colorName: "Noir Black",
            img: product.img,
            badge: "PRIMARY",
            hex: "#111111",
          },
        ];

  function selectVariant(v: ProductVariant, index: number) {
    setActiveImg(v.img);
    setSelectedColor(v.colorKey);
    setActiveVariantIndex(index);
  }

  function handleAdd() {
    onAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      img: activeImg,
      qty: 1,
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-2xl text-black max-h-[92vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-zinc-100 hover:bg-black hover:text-white text-zinc-700 flex items-center justify-center transition-all shadow-md cursor-pointer border border-zinc-200"
        >
          <X size={20} />
        </button>

        {/* Left Column: Main Image & Color Options */}
        <div className="w-full md:w-1/2 p-5 sm:p-6 flex flex-col items-center justify-between bg-zinc-50 border-b md:border-b-0 md:border-r border-zinc-200">
          <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-white border border-zinc-200 shadow-sm mb-4">
            <img
              src={activeImg}
              alt={product.name}
              className="w-full h-full object-cover object-top transition-all duration-300"
            />
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#e8111a] text-white text-[11px] font-bold tracking-wider rounded uppercase">
              {product.tag}
            </div>
          </div>

          {/* Colorway Options Below Photo */}
          <div className="w-full">
            <span
              className="text-[11px] font-bold text-zinc-600 tracking-[0.2em] uppercase block mb-2"
              style={{ fontFamily: "Space Mono, monospace" }}
            >
              AVAILABLE COLORWAYS:
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {variants.map((v, i) => {
                const isSelected = activeVariantIndex === i;
                return (
                  <button
                    key={i}
                    onClick={() => selectVariant(v, i)}
                    className={`rounded-xl p-2 border transition-all text-left flex items-center gap-2.5 cursor-pointer ${
                      isSelected
                        ? "bg-white border-2 border-black shadow-md ring-1 ring-black/10"
                        : "bg-white/80 border-zinc-200 hover:border-zinc-400 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <div className="w-10 h-12 rounded-lg overflow-hidden shrink-0 border border-zinc-200 bg-zinc-100">
                      <img src={v.img} alt={v.label} className="w-full h-full object-cover" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0 border border-black/20"
                          style={{ background: v.hex }}
                        />
                        <span className="text-xs font-bold truncate uppercase">{v.label}</span>
                      </div>
                      <p className="text-[10px] text-zinc-500 truncate font-mono">{v.colorName}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Specs & Add to Bag */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-white">
          <div className="space-y-6">
            <div>
              <span
                className="text-[#e8111a] text-xs font-bold tracking-[0.3em] uppercase block mb-1"
                style={{ fontFamily: "Space Mono, monospace" }}
              >
                {product.category}
              </span>
              <h2
                className="text-2xl md:text-3xl font-bold uppercase leading-tight text-black"
                style={{ fontFamily: "Rajdhani, sans-serif" }}
              >
                {product.name}
              </h2>

              {/* Enhanced Price Line */}
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <div className="flex items-baseline gap-2.5">
                  <span
                    className="text-3xl font-extrabold text-black tracking-tight"
                    style={{ fontFamily: "Rajdhani, sans-serif" }}
                  >
                    {product.price.toLocaleString()} EGP
                  </span>
                  {product.originalPrice && (
                    <span
                      className="text-base text-zinc-400 line-through font-semibold"
                      style={{ fontFamily: "Rajdhani, sans-serif" }}
                    >
                      {product.originalPrice.toLocaleString()} EGP
                    </span>
                  )}
                </div>
                {product.originalPrice && (
                  <span className="text-[11px] font-bold text-[#e8111a] bg-red-50 border border-red-200 px-2 py-0.5 rounded font-mono">
                    SAVE {(product.originalPrice - product.price).toLocaleString()} EGP
                  </span>
                )}
                <span className="text-xs text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Only {product.stockLeft} left
                </span>
              </div>
            </div>

            <p className="text-sm text-zinc-600 leading-relaxed">{product.description}</p>

            {/* Size Selector */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  className="text-xs text-zinc-700 font-bold tracking-wider uppercase block"
                  style={{ fontFamily: "Space Mono, monospace" }}
                >
                  Size (Streetwear Fit):
                </label>
                <span className="text-[11px] text-zinc-500 underline cursor-pointer">
                  Size Guide
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-3 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      selectedSize === s
                        ? "bg-black text-white border-black shadow-sm"
                        : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-black"
                    }`}
                    style={{ fontFamily: "Space Mono, monospace" }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Garment Specifications */}
            <div className="pt-4 border-t border-zinc-100 space-y-1.5">
              <span
                className="text-[11px] text-zinc-700 font-bold tracking-wider uppercase block mb-1"
                style={{ fontFamily: "Space Mono, monospace" }}
              >
                Garment Specifications:
              </span>
              {product.details.map((d, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-zinc-600">
                  <Check size={13} className="text-[#e8111a] shrink-0" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Add to Bag Action */}
          <div className="pt-6 mt-6 border-t border-zinc-100">
            <button
              onClick={handleAdd}
              disabled={added}
              className="w-full py-4 bg-[#e8111a] hover:bg-black text-white font-bold tracking-[0.2em] text-xs uppercase rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              style={{ fontFamily: "Space Mono, monospace" }}
            >
              {added ? (
                <>
                  <Check size={16} /> ADDED TO CART!
                </>
              ) : (
                <>
                  <ShoppingCart size={16} /> ADD TO CART — {product.price.toLocaleString()} EGP
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main App Component (Clean Bright Aesthetic) ──────────────────────────────

export default function App() {
  const [activePage, setActivePage] = useState<PageId>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Shop filter & sort
  const [shopCategory, setShopCategory] = useState<string>("ALL");
  const [shopSort, setShopSort] = useState<string>("featured");

  const heroOutfits = [
    {
      title: "CILVEN 'KILL YOU'",
      tag: "OFFICIAL DROP 01",
      edition: "280GSM HEAVYWEIGHT TEE",
      price: 850,
      img: cilvenTeeMale,
      altImg: cilvenTeeFemale,
      badge: "SS25 SIGNATURE",
      desc: "Cold-weather industrial streetwear featuring distressed typography and signature masked balaclava print.",
      product: ALL_PRODUCTS[0],
    },
    {
      title: "NOIR MONOGRAM",
      tag: "LUXE CAPSULE",
      edition: "JACQUARD 2-PIECE SET",
      price: 1650,
      img: monogramBlack,
      altImg: monogramBlue,
      badge: "LIMITED JACQUARD",
      desc: "All-over tonal monogram jacquard short-sleeve shirt with matching relaxed tailored street shorts.",
      product: ALL_PRODUCTS[3],
    },
    {
      title: "AURA 'ME VS ME'",
      tag: "ART SERIES",
      edition: "ANATOMICAL SKULL SET",
      price: 1250,
      img: auraSkullTee,
      altImg: auraSkullTee,
      badge: "EXCLUSIVE NUMBERED",
      desc: "Fine-line psychological dualism sketch tee paired with French Terry contrast drawstring shorts.",
      product: ALL_PRODUCTS[2],
    },
    {
      title: "DENIM CYAN",
      tag: "SUMMER DROP",
      edition: "STONEWASHED TWO-PIECE",
      price: 1650,
      img: monogramBlue,
      altImg: monogramBlack,
      badge: "STONE-WASHED",
      desc: "Washed cyan denim set with woven white monogram pattern and relaxed resort collar.",
      product: ALL_PRODUCTS[4],
    },
  ];

  // Hero outfit switcher with auto-swap timer (every 4 seconds)
  const [heroIndex, setHeroIndex] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);

  useEffect(() => {
    if (activePage !== "home" || isHeroPaused) return;
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroOutfits.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [activePage, isHeroPaused, heroOutfits.length]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activePage]);

  function addToCart(item: CartItem) {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i.id === item.id && i.color === item.color && i.size === item.size
      );
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.color === item.color && i.size === item.size
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }
      return [...prev, item];
    });
    setCartOpen(true);
  }

  function removeFromCart(id: number) {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  const filteredProducts = ALL_PRODUCTS.filter((p) => {
    if (shopCategory === "ALL") return true;
    return p.category === shopCategory;
  }).sort((a, b) => {
    if (shopSort === "price-low") return a.price - b.price;
    if (shopSort === "price-high") return b.price - a.price;
    return a.id - b.id;
  });

  return (
    <div
      className="min-h-screen bg-[#ffffff] text-[#111111] overflow-x-hidden flex flex-col justify-between"
      style={{ fontFamily: "Rajdhani, sans-serif" }}
    >
      {/* ── Global Clean White Navbar ── */}
      <header
        className="sticky top-0 z-40 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-sm"
      >
        <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            onClick={() => setActivePage("home")}
            className="flex items-center gap-3.5 group cursor-pointer text-left"
          >
            <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-zinc-300 shadow-sm bg-black shrink-0 transition-transform duration-300 group-hover:scale-105">
              <img src={cilvenLogo} alt="Cilven Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="text-2xl sm:text-3xl font-normal tracking-[0.12em] text-black"
                style={{ fontFamily: "Anton, sans-serif" }}
              >
                CILVEN
              </span>
              <span
                className="text-[9px] tracking-[0.55em] text-zinc-500 -mt-0.5"
                style={{ fontFamily: "Space Mono, monospace" }}
              >
                STORE · CAIRO
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { id: "home", label: "Home" },
              { id: "shop", label: "Shop All" },
              { id: "capsule", label: "Monogram Capsule" },
              { id: "bestsellers", label: "Best Sellers" },
              { id: "lookbook", label: "Lookbook SS25" },
              { id: "about", label: "About" },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => setActivePage(link.id as PageId)}
                className={`text-xs font-bold tracking-[0.15em] uppercase transition-all duration-200 cursor-pointer py-1 relative ${
                  activePage === link.id
                    ? "text-[#e8111a] after:w-full"
                    : "text-zinc-700 hover:text-black after:w-0"
                } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#e8111a] after:transition-all after:duration-300 hover:after:w-full`}
                style={{ fontFamily: "Space Mono, monospace" }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 rounded-full bg-zinc-100 hover:bg-black hover:text-white text-zinc-800 transition-all flex items-center justify-center cursor-pointer shadow-sm"
              title="Search collection"
            >
              <Search size={18} />
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="relative px-4 py-2.5 rounded-full bg-[#e8111a] hover:bg-black text-white transition-all flex items-center gap-2.5 cursor-pointer shadow-md"
            >
              <ShoppingCart size={17} />
              <span
                className="text-xs font-bold tracking-wider"
                style={{ fontFamily: "Space Mono, monospace" }}
              >
                CART
              </span>
              {cartCount > 0 && (
                <span
                  className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold"
                  style={{ fontFamily: "Space Mono, monospace" }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            <button
              className="md:hidden text-black p-2 rounded-lg bg-zinc-100 cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden px-6 py-6 space-y-4 bg-white border-t border-zinc-200 text-black shadow-xl">
            {[
              { id: "home", label: "Home" },
              { id: "shop", label: "Shop All Products" },
              { id: "capsule", label: "The Monogram Capsule" },
              { id: "bestsellers", label: "Best Sellers" },
              { id: "lookbook", label: "SS25 Editorial Lookbook" },
              { id: "about", label: "About Cilven" },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActivePage(link.id as PageId);
                  setMenuOpen(false);
                }}
                className={`block w-full text-left text-xl font-bold tracking-[0.1em] uppercase py-2 transition-colors ${
                  activePage === link.id ? "text-[#e8111a]" : "text-zinc-800 hover:text-black"
                }`}
                style={{ fontFamily: "Anton, sans-serif" }}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ────────────────────────────────────────────────────────────────────────
          PAGE 1: HOME PAGE (Clean White High-Fashion Editorial)
      ──────────────────────────────────────────────────────────────────────── */}
      {activePage === "home" && (
        <main className="flex-1">
          {/* ── Fashion Editorial Hero (Clean Light Aesthetics with Auto-Swap) ── */}
          <section
            className="relative w-full bg-[#f8f8f8] border-b border-zinc-200 py-12 lg:py-16 overflow-hidden"
            onMouseEnter={() => setIsHeroPaused(true)}
            onMouseLeave={() => setIsHeroPaused(false)}
          >
            <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-white border border-zinc-300 rounded-full w-fit mb-5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#e8111a] animate-pulse" />
                  <span
                    className="text-[#e8111a] text-xs font-bold tracking-[0.25em] uppercase"
                    style={{ fontFamily: "Space Mono, monospace" }}
                  >
                    {heroOutfits[heroIndex].tag}
                  </span>
                  <span className="text-zinc-300">|</span>
                  <span className="text-zinc-700 text-xs font-mono font-bold">
                    {heroOutfits[heroIndex].edition}
                  </span>
                </div>

                {/* Locked Height Title Container */}
                <div className="h-[120px] sm:h-[140px] md:h-[155px] flex flex-col justify-end mb-4 overflow-hidden">
                  <h1
                    className="text-[clamp(2.6rem,5.2vw,5.2rem)] leading-[0.9] font-normal uppercase text-black transition-all duration-300"
                    style={{ fontFamily: "Anton, sans-serif", letterSpacing: "0.01em" }}
                  >
                    {heroOutfits[heroIndex].title}
                    <br />
                    <span className="text-[#e8111a]">COLLECTION.</span>
                  </h1>
                </div>

                {/* Locked Height Description Container */}
                <div className="h-[52px] sm:h-[58px] flex items-start mb-8 overflow-hidden">
                  <p className="text-zinc-600 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed transition-all duration-300 line-clamp-2">
                    {heroOutfits[heroIndex].desc}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 mb-10">
                  <button
                    onClick={() => setSelectedProduct(heroOutfits[heroIndex].product)}
                    className="px-8 py-4 bg-[#e8111a] hover:bg-black text-white font-bold tracking-[0.25em] text-xs uppercase rounded-xl transition-all duration-200 shadow-md flex items-center gap-2.5 cursor-pointer"
                    style={{ fontFamily: "Space Mono, monospace" }}
                  >
                    SHOP THIS PIECE (LE {heroOutfits[heroIndex].price.toFixed(2)}) <ArrowRight size={16} />
                  </button>

                  <button
                    onClick={() => setActivePage("shop")}
                    className="px-8 py-4 border border-zinc-300 bg-white text-black hover:bg-black hover:text-white hover:border-black font-bold tracking-[0.25em] text-xs uppercase rounded-xl transition-all duration-200 cursor-pointer shadow-sm"
                    style={{ fontFamily: "Space Mono, monospace" }}
                  >
                    VIEW ALL DROPS
                  </button>
                </div>

                {/* Outfit Selector Cards */}
                <div className="pt-6 border-t border-zinc-200">
                  <p
                    className="text-xs text-zinc-500 font-bold tracking-[0.25em] uppercase mb-3"
                    style={{ fontFamily: "Space Mono, monospace" }}
                  >
                    FEATURED LOOKS ({heroIndex + 1} / {heroOutfits.length}):
                  </p>
                  <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
                    {heroOutfits.map((outfit, i) => {
                      const isActive = heroIndex === i;
                      return (
                        <button
                          key={i}
                          onClick={() => setHeroIndex(i)}
                          className={`rounded-xl overflow-hidden p-1.5 border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                            isActive
                              ? "border-black bg-white ring-2 ring-black shadow-lg scale-102"
                              : "border-zinc-200 bg-white/70 hover:border-zinc-400 opacity-75 hover:opacity-100"
                          }`}
                        >
                          <div>
                            <div className="aspect-[3/4] w-full rounded-lg overflow-hidden mb-1.5 bg-zinc-100">
                              <img
                                src={outfit.img}
                                alt={outfit.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <p
                              className="text-[10px] font-bold text-black truncate px-1"
                              style={{ fontFamily: "Rajdhani, sans-serif" }}
                            >
                              {outfit.title}
                            </p>
                            <p className="text-[10px] text-[#e8111a] font-mono px-1 font-bold">
                              LE {outfit.price}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Fixed Height Framed Model Portrait */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[420px] aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-300 shadow-xl bg-white group shrink-0">
                  <img
                    key={heroIndex}
                    src={heroOutfits[heroIndex].img}
                    alt="Cilven Featured Editorial"
                    className="w-full h-full object-cover object-top transition-all duration-700 animate-fadeIn"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black text-white text-[11px] font-bold tracking-widest rounded uppercase shadow-sm">
                    {heroOutfits[heroIndex].badge}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-zinc-200 shadow-lg flex items-center justify-between">
                    <div>
                      <p
                        className="text-[10px] text-[#e8111a] font-bold tracking-widest uppercase"
                        style={{ fontFamily: "Space Mono, monospace" }}
                      >
                        LE {heroOutfits[heroIndex].price.toFixed(2)}
                      </p>
                      <h4 className="text-base font-bold text-black uppercase" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                        {heroOutfits[heroIndex].title}
                      </h4>
                    </div>
                    <button
                      onClick={() => setSelectedProduct(heroOutfits[heroIndex].product)}
                      className="px-3.5 py-2 bg-black text-white hover:bg-[#e8111a] rounded-lg text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
                      style={{ fontFamily: "Space Mono, monospace" }}
                    >
                      QUICK VIEW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Brand Trust Badges ── */}
          <section className="bg-white border-b border-zinc-200 py-8 px-6 md:px-16 text-black">
            <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <Flame className="text-[#e8111a] shrink-0" size={22} />
                <div>
                  <p className="text-xs font-bold tracking-wider" style={{ fontFamily: "Space Mono, monospace" }}>
                    LIMITED DROP SERIES
                  </p>
                  <p className="text-[11px] text-zinc-500">Strictly numbered production</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-[#e8111a] shrink-0" size={22} />
                <div>
                  <p className="text-xs font-bold tracking-wider" style={{ fontFamily: "Space Mono, monospace" }}>
                    280GSM HEAVYWEIGHT
                  </p>
                  <p className="text-[11px] text-zinc-500">Egyptian combed cotton</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="text-[#e8111a] shrink-0" size={22} />
                <div>
                  <p className="text-xs font-bold tracking-wider" style={{ fontFamily: "Space Mono, monospace" }}>
                    FREE CAIRO DELIVERY
                  </p>
                  <p className="text-[11px] text-zinc-500">On all orders over 2,000 EGP</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="text-[#e8111a] shrink-0" size={22} />
                <div>
                  <p className="text-xs font-bold tracking-wider" style={{ fontFamily: "Space Mono, monospace" }}>
                    DOOR-TO-DOOR EXCHANGES
                  </p>
                  <p className="text-[11px] text-zinc-500">14-day hassle-free returns</p>
                </div>
              </div>
            </div>
          </section>

          {/* ── Featured Products Grid (With Color Options Under Card) ── */}
          <section className="px-6 md:px-16 py-16 max-w-screen-xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span
                  className="text-[#e8111a] text-xs font-bold tracking-[0.35em] uppercase block mb-1"
                  style={{ fontFamily: "Space Mono, monospace" }}
                >
                  DROP 01 RELEASES
                </span>
                <h2
                  className="text-2xl sm:text-3xl font-bold uppercase tracking-wide text-black"
                  style={{ fontFamily: "Anton, sans-serif" }}
                >
                  NEW ARRIVALS
                </h2>
              </div>
              <button
                onClick={() => setActivePage("shop")}
                className="hidden md:flex items-center gap-2 text-xs font-bold tracking-[0.15em] text-zinc-600 hover:text-black transition-colors uppercase cursor-pointer"
                style={{ fontFamily: "Space Mono, monospace" }}
              >
                VIEW FULL COLLECTION <ChevronRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ALL_PRODUCTS.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={setSelectedProduct}
                />
              ))}
            </div>
          </section>

          {/* ── Monogram Capsule Feature Banner ── */}
          <section className="bg-zinc-950 text-white py-20 px-6 md:px-16">
            <div className="max-w-screen-xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span
                  className="text-[#ff4d55] text-xs font-bold tracking-[0.4em] uppercase block mb-2"
                  style={{ fontFamily: "Space Mono, monospace" }}
                >
                  FEATURED CAPSULE
                </span>
                <h2
                  className="text-[clamp(2.5rem,5vw,4.5rem)] font-normal uppercase leading-none mb-4"
                  style={{ fontFamily: "Anton, sans-serif" }}
                >
                  THE MONOGRAM SETS
                </h2>
                <p className="text-zinc-400 text-sm md:text-base">
                  Luxury resort collar shirt with matching relaxed shorts in Noir & Denim Cyan.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Noir Card */}
                <div className="rounded-2xl overflow-hidden border border-white/15 bg-zinc-900 flex flex-col group">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={monogramBlack}
                      alt="Noir Monogram"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-md rounded text-xs font-bold tracking-widest uppercase">
                      NOIR EDITION
                    </div>
                  </div>
                  <div className="p-6 flex items-center justify-between bg-zinc-900 border-t border-white/10">
                    <div>
                      <h4 className="text-xl font-bold uppercase text-white" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                        NOIR MONOGRAM 2-PIECE SET
                      </h4>
                      <p className="text-xs text-zinc-400 font-mono mt-0.5">{formatEGP(1650)} · Shirt + Short Set</p>
                    </div>
                    <button
                      onClick={() => setSelectedProduct(ALL_PRODUCTS[3])}
                      className="px-5 py-2.5 bg-white text-black hover:bg-[#e8111a] hover:text-white rounded-lg text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer"
                      style={{ fontFamily: "Space Mono, monospace" }}
                    >
                      BUY SET
                    </button>
                  </div>
                </div>

                {/* Denim Cyan Card */}
                <div className="rounded-2xl overflow-hidden border border-white/15 bg-zinc-900 flex flex-col group">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={monogramBlue}
                      alt="Denim Cyan Monogram"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-cyan-950/80 backdrop-blur-md border border-cyan-400/40 rounded text-cyan-200 text-xs font-bold tracking-widest uppercase">
                      DENIM CYAN
                    </div>
                  </div>
                  <div className="p-6 flex items-center justify-between bg-zinc-900 border-t border-white/10">
                    <div>
                      <h4 className="text-xl font-bold uppercase text-white" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                        DENIM CYAN 2-PIECE SET
                      </h4>
                      <p className="text-xs text-zinc-400 font-mono mt-0.5">{formatEGP(1650)} · Shirt + Short Set</p>
                    </div>
                    <button
                      onClick={() => setSelectedProduct(ALL_PRODUCTS[4])}
                      className="px-5 py-2.5 bg-white text-black hover:bg-[#e8111a] hover:text-white rounded-lg text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer"
                      style={{ fontFamily: "Space Mono, monospace" }}
                    >
                      BUY SET
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ────────────────────────────────────────────────────────────────────────
          PAGE 2: SHOP ALL PRODUCTS
      ──────────────────────────────────────────────────────────────────────── */}
      {activePage === "shop" && (
        <main className="flex-1 px-6 md:px-16 py-12 max-w-screen-xl mx-auto w-full">
          <div className="mb-8 pb-6 border-b border-zinc-200">
            <span
              className="text-[#e8111a] text-xs font-bold tracking-[0.35em] uppercase block mb-1"
              style={{ fontFamily: "Space Mono, monospace" }}
            >
              COLLECTION CATALOGUE
            </span>
            <h1
              className="text-2xl sm:text-3xl font-bold uppercase tracking-wide text-black mb-2"
              style={{ fontFamily: "Anton, sans-serif" }}
            >
              ALL PRODUCTS ({filteredProducts.length})
            </h1>
            <p className="text-zinc-500 text-xs sm:text-sm font-mono max-w-xl">
              Heavyweight 280GSM Egyptian cotton, monogram jacquards, and limited street graphics with door-to-door delivery.
            </p>
          </div>

          {/* Filter & Sort */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {["ALL", "GRAPHIC TEES", "MONOGRAM SETS", "DENIM & PANTS"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setShopCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    shopCategory === cat
                      ? "bg-[#e8111a] text-white shadow-sm"
                      : "bg-zinc-100 text-zinc-700 hover:bg-black hover:text-white"
                  }`}
                  style={{ fontFamily: "Space Mono, monospace" }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-zinc-500" />
              <select
                value={shopSort}
                onChange={(e) => setShopSort(e.target.value)}
                className="bg-zinc-50 border border-zinc-200 text-zinc-800 text-xs px-3 py-2 rounded-lg font-mono outline-none cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={setSelectedProduct}
              />
            ))}
          </div>
        </main>
      )}

      {/* ────────────────────────────────────────────────────────────────────────
          PAGE 3: MONOGRAM CAPSULE
      ──────────────────────────────────────────────────────────────────────── */}
      {activePage === "capsule" && (
        <main className="flex-1 bg-white">
          <section className="px-6 md:px-16 py-12 max-w-screen-xl mx-auto border-b border-zinc-200">
            <span
              className="text-[#e8111a] text-xs font-bold tracking-[0.4em] uppercase block mb-2"
              style={{ fontFamily: "Space Mono, monospace" }}
            >
              SPECIAL EDITION CAPSULE
            </span>
            <h1
              className="text-2xl sm:text-3xl font-bold uppercase tracking-wide text-black mb-3"
              style={{ fontFamily: "Anton, sans-serif" }}
            >
              THE MONOGRAM TWO-PIECE SUIT
            </h1>
            <p className="text-zinc-600 text-sm max-w-3xl leading-relaxed">
              Engineered for elevated streetwear presence. Woven from breathable high-density jacquard cotton with custom all-over monogram motif. Resort collar short-sleeve shirt + matching drawstring shorts.
            </p>
          </section>

          <section className="px-6 md:px-16 py-12 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Noir Card */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl overflow-hidden p-6 flex flex-col justify-between shadow-sm">
              <div>
                <div className="aspect-[4/5] rounded-xl overflow-hidden mb-6 bg-zinc-200 border border-zinc-300">
                  <img src={monogramBlack} alt="Noir Monogram Set" className="w-full h-full object-cover object-top" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#e8111a] font-mono font-bold tracking-widest uppercase">
                    COLORWAY 01 / NOIR
                  </span>
                  <span className="text-xl font-bold font-mono">LE 1,650.00</span>
                </div>
                <h3 className="text-2xl font-bold uppercase text-black mb-3" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                  NOIR MONOGRAM SHIRT & SHORT SET
                </h3>
                <p className="text-zinc-600 text-xs leading-relaxed mb-6">
                  Black on black tonal jacquard weave. Subtle texture that catches light with movement. Includes resort shirt and relaxed drawstring shorts.
                </p>
              </div>
              <button
                onClick={() => setSelectedProduct(ALL_PRODUCTS[3])}
                className="w-full py-4 bg-[#e8111a] hover:bg-black text-white font-bold tracking-[0.2em] text-xs uppercase rounded-xl transition-colors cursor-pointer"
                style={{ fontFamily: "Space Mono, monospace" }}
              >
                SELECT SIZE & BUY NOIR SET
              </button>
            </div>

            {/* Denim Cyan Card */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl overflow-hidden p-6 flex flex-col justify-between shadow-sm">
              <div>
                <div className="aspect-[4/5] rounded-xl overflow-hidden mb-6 bg-zinc-200 border border-zinc-300">
                  <img src={monogramBlue} alt="Denim Cyan Set" className="w-full h-full object-cover object-top" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-sky-700 font-mono font-bold tracking-widest uppercase">
                    COLORWAY 02 / DENIM CYAN
                  </span>
                  <span className="text-xl font-bold font-mono">LE 1,650.00</span>
                </div>
                <h3 className="text-2xl font-bold uppercase text-black mb-3" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                  DENIM CYAN MONOGRAM TWO-PIECE SET
                </h3>
                <p className="text-zinc-600 text-xs leading-relaxed mb-6">
                  Stone-washed indigo cotton with woven white monogram pattern. Vintage wash treatment creates a soft hand feel and effortless street drape.
                </p>
              </div>
              <button
                onClick={() => setSelectedProduct(ALL_PRODUCTS[4])}
                className="w-full py-4 bg-sky-700 hover:bg-black text-white font-bold tracking-[0.2em] text-xs uppercase rounded-xl transition-colors cursor-pointer"
                style={{ fontFamily: "Space Mono, monospace" }}
              >
                SELECT SIZE & BUY DENIM SET
              </button>
            </div>
          </section>
        </main>
      )}

      {/* ────────────────────────────────────────────────────────────────────────
          PAGE 4: BEST SELLERS
      ──────────────────────────────────────────────────────────────────────── */}
      {activePage === "bestsellers" && (
        <main className="flex-1 px-6 md:px-16 py-12 max-w-screen-xl mx-auto w-full">
          <div className="mb-8 pb-6 border-b border-zinc-200">
            <span
              className="text-[#e8111a] text-xs font-bold tracking-[0.35em] uppercase block mb-1.5"
              style={{ fontFamily: "Space Mono, monospace" }}
            >
              COMMUNITY FAVORITES
            </span>
            <h1
              className="text-2xl sm:text-3xl font-bold uppercase tracking-wide text-black mb-2"
              style={{ fontFamily: "Anton, sans-serif" }}
            >
              BEST SELLERS
            </h1>
            <p className="text-zinc-500 text-xs sm:text-sm font-mono max-w-xl">
              The most requested pieces from the Cilven SS25 drop with Egyptian pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ALL_PRODUCTS.filter((p) => p.isBestSeller).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={setSelectedProduct}
              />
            ))}
          </div>
        </main>
      )}

      {/* ────────────────────────────────────────────────────────────────────────
          PAGE 5: LOOKBOOK
      ──────────────────────────────────────────────────────────────────────── */}
      {activePage === "lookbook" && (
        <main className="flex-1 bg-white">
          <section className="px-6 md:px-16 py-12 max-w-screen-xl mx-auto border-b border-zinc-200">
            <span
              className="text-[#e8111a] text-xs font-bold tracking-[0.4em] uppercase block mb-2"
              style={{ fontFamily: "Space Mono, monospace" }}
            >
              SS25 CAMPAIGN ARCHIVE
            </span>
            <h1
              className="text-2xl sm:text-3xl font-bold uppercase tracking-wide text-black mb-2"
              style={{ fontFamily: "Anton, sans-serif" }}
            >
              EDITORIAL LOOKBOOK
            </h1>
            <p className="text-zinc-600 text-sm md:text-base max-w-2xl font-mono">
              Visual study on location. Exploring raw material weights, urban isolation, and tactile distressed typography.
            </p>
          </section>

          <section className="px-6 md:px-16 py-12 max-w-screen-xl mx-auto space-y-12">
            {LOOKBOOK_ENTRIES.map((look, i) => (
              <div
                key={look.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-50 border border-zinc-200 rounded-2xl overflow-hidden p-6 md:p-10 shadow-sm"
              >
                <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-white border border-zinc-300">
                    <img
                      src={look.img}
                      alt={look.title}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-black text-white text-xs font-bold tracking-widest rounded uppercase">
                      {look.lookNumber}
                    </div>
                  </div>
                </div>

                <div className={`lg:col-span-6 flex flex-col justify-center space-y-6 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div>
                    <span
                      className="text-[#e8111a] text-xs font-bold tracking-[0.3em] uppercase block mb-1"
                      style={{ fontFamily: "Space Mono, monospace" }}
                    >
                      {look.subtitle}
                    </span>
                    <h2
                      className="text-3xl md:text-4xl font-bold uppercase text-black"
                      style={{ fontFamily: "Anton, sans-serif" }}
                    >
                      {look.title}
                    </h2>
                  </div>

                  <blockquote className="border-l-2 border-[#e8111a] pl-4 text-zinc-600 italic text-sm md:text-base">
                    "{look.quote}"
                  </blockquote>

                  <div className="p-4 rounded-xl bg-white border border-zinc-200 space-y-3">
                    <p className="text-xs text-zinc-500 font-mono">
                      FEATURED ITEM IN THIS LOOK:
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-black text-base" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                        {look.productName}
                      </span>
                      <span className="font-bold text-black font-mono">LE {look.price.toFixed(2)}</span>
                    </div>
                    <button
                      onClick={() => {
                        const matched = ALL_PRODUCTS.find((p) => p.id === look.productId);
                        if (matched) setSelectedProduct(matched);
                      }}
                      className="w-full py-3 bg-[#e8111a] hover:bg-black text-white text-xs font-bold tracking-[0.2em] uppercase rounded-lg transition-colors cursor-pointer"
                      style={{ fontFamily: "Space Mono, monospace" }}
                    >
                      SHOP THIS LOOK
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </main>
      )}

      {/* ────────────────────────────────────────────────────────────────────────
          PAGE 6: ABOUT PAGE
      ──────────────────────────────────────────────────────────────────────── */}
      {activePage === "about" && (
        <main className="flex-1 bg-white">
          <section className="px-6 md:px-16 py-16 max-w-screen-xl mx-auto">
            <div className="max-w-3xl mx-auto text-center space-y-5">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-zinc-300 mx-auto shadow-md">
                <img src={cilvenLogo} alt="Cilven Brand" className="w-full h-full object-cover" />
              </div>
              <span
                className="text-[#e8111a] text-xs font-bold tracking-[0.4em] uppercase block"
                style={{ fontFamily: "Space Mono, monospace" }}
              >
                BRAND MANIFESTO · CAIRO STUDIO
              </span>
              <h1
                className="text-2xl sm:text-3xl font-bold uppercase tracking-wide text-black"
                style={{ fontFamily: "Anton, sans-serif" }}
              >
                QUALITY OVER HYPE. ZERO RESTOCK.
              </h1>
              <p className="text-zinc-600 text-base md:text-lg leading-relaxed pt-2">
                Cilven was founded on a simple conviction: streetwear has become disposable. We exist to restore weight, intention, and tactile presence to every garment we release.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="p-8 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
                <h3 className="text-2xl font-bold uppercase text-black" style={{ fontFamily: "Anton, sans-serif" }}>
                  01 / 280GSM COTTON
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  We custom-mill our carded heavyweight Egyptian cotton to create a distinct structural drape that retains its silhouette through years of wear.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
                <h3 className="text-2xl font-bold uppercase text-black" style={{ fontFamily: "Anton, sans-serif" }}>
                  02 / LIMITED BATCHES
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Every collection is manufactured in strictly numbered runs. When an item sells out, it enters our permanent archive.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
                <h3 className="text-2xl font-bold uppercase text-black" style={{ fontFamily: "Anton, sans-serif" }}>
                  03 / UNISEX TAILORING
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Our patterns are engineered with dropped shoulders, wide sleeves, and proportional hem crops to sit boldly on every body.
                </p>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ── Clean White Footer ── */}
      <footer className="px-6 md:px-16 py-16 bg-zinc-50 border-t border-zinc-200 text-black">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-zinc-300 shadow-sm">
                <img src={cilvenLogo} alt="Cilven Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <span
                  className="block text-2xl font-normal tracking-[0.12em] text-black leading-tight"
                  style={{ fontFamily: "Anton, sans-serif" }}
                >
                  CILVEN
                </span>
                <span
                  className="block text-[9px] tracking-[0.5em] text-zinc-500"
                  style={{ fontFamily: "Space Mono, monospace" }}
                >
                  STORE · EGYPT
                </span>
              </div>
            </div>
            <p
              className="text-zinc-600 text-xs leading-relaxed mb-6 max-w-xs"
              style={{ fontFamily: "Space Mono, monospace" }}
            >
              Streetwear engineered for high presence. Heavyweight materials, limited batch runs, zero restock.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:text-black hover:border-black transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {[
            {
              title: "NAVIGATION",
              items: [
                { label: "Home Page", id: "home" },
                { label: "Shop All Products", id: "shop" },
                { label: "The Monogram Capsule", id: "capsule" },
                { label: "Best Sellers", id: "bestsellers" },
                { label: "SS25 Lookbook", id: "lookbook" },
              ],
            },
            {
              title: "COLLECTIONS",
              items: [
                { label: "Kill You Series", id: "shop" },
                { label: "Monogram 2-Piece Sets", id: "capsule" },
                { label: "Aura Sketch Tops", id: "shop" },
                { label: "Acid Denim Pants", id: "shop" },
              ],
            },
            {
              title: "CUSTOMER CARE",
              items: [
                { label: "Shipping across Egypt", id: "about" },
                { label: "Door-to-Door Exchanges", id: "about" },
                { label: "Size & Fit Guide", id: "about" },
                { label: "About Cilven Cairo", id: "about" },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4
                className="text-[11px] tracking-[0.4em] text-black font-bold mb-4 uppercase"
                style={{ fontFamily: "Space Mono, monospace" }}
              >
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => setActivePage(item.id as PageId)}
                      className="text-zinc-600 hover:text-[#e8111a] transition-colors text-xs font-medium text-left cursor-pointer"
                      style={{ fontFamily: "Rajdhani, sans-serif", fontSize: "14px" }}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-zinc-200 pt-8 text-zinc-500 text-[10px] tracking-[0.2em]">
          <p style={{ fontFamily: "Space Mono, monospace" }}>
            © 2025 CILVEN STORE EGYPT. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6" style={{ fontFamily: "Space Mono, monospace" }}>
            <a href="#" className="hover:text-black">PRIVACY POLICY</a>
            <a href="#" className="hover:text-black">TERMS OF SERVICE</a>
            <a href="#" className="hover:text-black">COOKIE SETTINGS</a>
          </div>
        </div>
      </footer>

      {/* ── Product Quick View & Sizing Modal ── */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      {/* ── Clean White Shopping Bag Slide-Over ── */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      {/* ── Egyptian Streetwear Checkout Modal ── */}
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={() => {
          setCartItems([]);
        }}
      />

      {/* ── Live Product Search Modal ── */}
      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* ── Fixed Mobile Bottom Action Bar (App Style) ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200 py-2.5 px-4 flex items-center justify-around shadow-2xl safe-area-pb">
        <button
          onClick={() => {
            setActivePage("home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 cursor-pointer transition-colors ${
            activePage === "home" ? "text-[#e8111a]" : "text-zinc-500 hover:text-black"
          }`}
        >
          <span className="text-base font-bold">⚡</span>
          <span className="text-[9px] font-bold tracking-wider uppercase font-mono">HOME</span>
        </button>

        <button
          onClick={() => {
            setActivePage("shop");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 cursor-pointer transition-colors ${
            activePage === "shop" ? "text-[#e8111a]" : "text-zinc-500 hover:text-black"
          }`}
        >
          <span className="text-base font-bold">🛍️</span>
          <span className="text-[9px] font-bold tracking-wider uppercase font-mono">SHOP</span>
        </button>

        <button
          onClick={() => setSearchOpen(true)}
          className="flex flex-col items-center gap-0.5 py-1 px-3 text-zinc-500 hover:text-black cursor-pointer transition-colors"
        >
          <Search size={17} />
          <span className="text-[9px] font-bold tracking-wider uppercase font-mono">SEARCH</span>
        </button>

        <button
          onClick={() => setCartOpen(true)}
          className="relative flex flex-col items-center gap-0.5 py-1 px-3 text-zinc-500 hover:text-black cursor-pointer transition-colors"
        >
          <div className="relative">
            <ShoppingCart size={17} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 w-4 h-4 rounded-full bg-[#e8111a] text-white flex items-center justify-center text-[9px] font-bold">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[9px] font-bold tracking-wider uppercase font-mono">CART</span>
        </button>
      </div>
    </div>
  );
}

// ─── Cart Drawer Component (Clean Light Style) ────────────────────────────────

function CartDrawer({
  open,
  onClose,
  items,
  onRemove,
  onCheckout,
}: {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: number) => void;
  onCheckout: () => void;
}) {
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const freeShippingThreshold = 2000;
  const shippingCost = total >= freeShippingThreshold ? 0 : 80;

  return (
    <>
      <div
        className="fixed inset-0 z-50 transition-opacity duration-300"
        style={{
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        onClick={onClose}
      />

      <div
        className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md flex flex-col border-l transition-transform duration-300 bg-white border-zinc-200 text-black shadow-2xl"
        style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-zinc-300">
              <img src={cilvenLogo} alt="Cilven" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2
                className="text-lg font-bold tracking-[0.12em] leading-none text-black"
                style={{ fontFamily: "Anton, sans-serif" }}
              >
                YOUR CART
              </h2>
              <span
                className="text-[10px] text-zinc-500 tracking-[0.2em]"
                style={{ fontFamily: "Space Mono, monospace" }}
              >
                {items.reduce((s, i) => s + i.qty, 0)} ITEMS SELECTED
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-black hover:text-white flex items-center justify-center text-zinc-600 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="px-6 py-3 bg-zinc-50 border-b border-zinc-200 text-xs">
          {total >= freeShippingThreshold ? (
            <p className="text-emerald-700 font-bold flex items-center gap-1.5" style={{ fontFamily: "Space Mono, monospace" }}>
              <Check size={14} /> You unlocked FREE Delivery across Egypt!
            </p>
          ) : (
            <p className="text-zinc-600" style={{ fontFamily: "Space Mono, monospace" }}>
              Add <span className="text-[#e8111a] font-bold">{(freeShippingThreshold - total).toLocaleString()} EGP</span> more for FREE delivery
            </p>
          )}
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-12">
              <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                <ShoppingCart size={28} />
              </div>
              <div>
                <p
                  className="text-base font-bold tracking-[0.1em] text-black"
                  style={{ fontFamily: "Rajdhani, sans-serif" }}
                >
                  YOUR CART IS EMPTY
                </p>
                <p
                  className="text-xs text-zinc-500 mt-1 max-w-[220px]"
                  style={{ fontFamily: "Space Mono, monospace" }}
                >
                  Explore the SS25 drop and add your favorite Cilven pieces.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-black text-white font-bold text-xs tracking-[0.2em] rounded-lg uppercase mt-2 hover:bg-[#e8111a] transition-colors cursor-pointer"
                style={{ fontFamily: "Space Mono, monospace" }}
              >
                START SHOPPING
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.id}-${item.color}-${item.size}`}
                className="flex gap-4 p-3 rounded-xl bg-zinc-50 border border-zinc-200"
              >
                <div className="w-20 h-24 shrink-0 overflow-hidden rounded-lg bg-white border border-zinc-200">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p
                      className="text-xs font-bold tracking-[0.05em] text-black leading-tight line-clamp-2"
                      style={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 700 }}
                    >
                      {item.name}
                    </p>
                    <p
                      className="text-[11px] text-zinc-500 capitalize mt-1 flex items-center gap-2"
                      style={{ fontFamily: "Space Mono, monospace" }}
                    >
                      <span>Color: {item.color}</span>
                      <span>·</span>
                      <span className="font-bold text-black">Size: {item.size}</span>
                      <span>·</span>
                      <span>Qty: {item.qty}</span>
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span
                      className="text-sm font-bold text-black font-mono"
                    >
                      {(item.price * item.qty).toLocaleString()} EGP
                    </span>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-[11px] tracking-wider text-red-600 hover:text-red-800 transition-colors uppercase font-bold cursor-pointer"
                      style={{ fontFamily: "Space Mono, monospace" }}
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Action */}
        {items.length > 0 && (
          <div className="px-6 py-5 space-y-4 border-t border-zinc-200 bg-zinc-50">
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-zinc-600 font-mono">
                <span>DELIVERY (EGYPT)</span>
                <span className="text-emerald-700 font-bold">
                  {shippingCost === 0 ? "FREE" : `${shippingCost} EGP`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span
                  className="tracking-[0.1em] text-zinc-600 font-bold"
                  style={{ fontFamily: "Space Mono, monospace" }}
                >
                  TOTAL DUE
                </span>
                <span
                  className="font-bold text-xl text-black font-mono"
                >
                  {(total + shippingCost).toLocaleString()} EGP
                </span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full py-4 font-bold tracking-[0.2em] text-xs bg-[#e8111a] hover:bg-black text-white transition-all duration-200 uppercase shadow-md cursor-pointer rounded-xl flex items-center justify-center gap-2"
              style={{ fontFamily: "Space Mono, monospace" }}
            >
              <PackageCheck size={16} /> ORDER NOW (CASH ON DELIVERY / VISA)
            </button>
            <p
              className="text-[10px] text-center text-zinc-500 tracking-[0.1em]"
              style={{ fontFamily: "Space Mono, monospace" }}
            >
              🔒 Fast delivery within 2-4 business days across Egypt
            </p>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Egyptian Checkout Modal Component ────────────────────────────────────────

function CheckoutModal({
  open,
  onClose,
  items,
  onOrderSuccess,
}: {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Cairo");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card" | "instapay">("cod");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState("");

  if (!open) return null;

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const freeShippingThreshold = 2000;
  const shippingCost = total >= freeShippingThreshold ? 0 : 80;
  const grandTotal = total + shippingCost;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your full name");
      return;
    }

    if (!phone.trim() || phone.trim().length < 10) {
      setError("Please enter a valid Egyptian mobile number (e.g. 01012345678)");
      return;
    }

    if (!address.trim()) {
      setError("Please enter your detailed delivery address");
      return;
    }

    setLoading(true);

    // Simulate real order placement to Egyptian logistics
    setTimeout(() => {
      const generatedId = `CILVEN-EG-${Math.floor(10000 + Math.random() * 90000)}`;
      setOrderId(generatedId);
      setLoading(false);
      setOrderConfirmed(true);
      onOrderSuccess();
    }, 1200);
  }

  function handleCloseAll() {
    setOrderConfirmed(false);
    onClose();
  }

  const governorates = [
    "Cairo (القاهرة)",
    "Giza (الجيزة)",
    "Alexandria (الإسكندرية)",
    "Mansoura (المنصورة)",
    "Tanta (طنطا)",
    "Zagazig (الزقازيق)",
    "Ismailia (الإسماعيلية)",
    "Port Said (بور سعيد)",
    "Suez (السويس)",
    "Fayoum (الفيوم)",
    "Beni Suef (بني سويف)",
    "Minya (المنيا)",
    "Assiut (أسيوط)",
    "Sohag (سوهاج)",
    "Qena (قنا)",
    "Luxor & Aswan (الأقصر وأسوان)",
    "Hurghada & Red Sea (الغردقة والبحر الأحمر)",
    "Sharm El Sheikh (شرم الشيخ)",
    "North Coast (الساحل الشمالي)",
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
    >
      <div
        className="relative w-full max-w-2xl bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-2xl text-black my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-200 bg-zinc-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-zinc-300 shadow-sm bg-black">
              <img src={cilvenLogo} alt="Cilven" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2
                className="text-lg font-bold tracking-[0.1em] leading-none text-black"
                style={{ fontFamily: "Anton, sans-serif" }}
              >
                {orderConfirmed ? "ORDER CONFIRMED" : "EXPRESS EGYPT CHECKOUT"}
              </h2>
              <span
                className="text-[10px] text-zinc-500 tracking-[0.2em]"
                style={{ fontFamily: "Space Mono, monospace" }}
              >
                {orderConfirmed ? "THANK YOU FOR YOUR ORDER" : "CASH ON DELIVERY & ONLINE PAYMENT"}
              </span>
            </div>
          </div>
          <button
            onClick={handleCloseAll}
            className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-black hover:text-white flex items-center justify-center text-zinc-600 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Order Confirmed Success Screen ── */}
        {orderConfirmed ? (
          <div className="p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 size={36} />
            </div>

            <div>
              <span
                className="text-xs text-[#e8111a] font-bold tracking-[0.3em] uppercase block mb-1"
                style={{ fontFamily: "Space Mono, monospace" }}
              >
                OFFICIAL CILVEN DROP RECEIPT
              </span>
              <h3
                className="text-2xl sm:text-3xl font-bold uppercase text-black"
                style={{ fontFamily: "Anton, sans-serif" }}
              >
                ORDER PLACED SUCCESSFULLY!
              </h3>
              <p className="text-zinc-600 text-sm mt-1" style={{ fontFamily: "Space Mono, monospace" }}>
                Order ID: <span className="font-bold text-black font-mono">{orderId}</span>
              </p>
            </div>

            <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 text-left space-y-2 text-xs">
              <div className="flex justify-between border-b border-zinc-200/80 pb-2">
                <span className="text-zinc-500 font-mono">Recipient:</span>
                <span className="font-bold text-black">{name}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200/80 pb-2">
                <span className="text-zinc-500 font-mono">Mobile / WhatsApp:</span>
                <span className="font-bold text-black">{phone}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200/80 pb-2">
                <span className="text-zinc-500 font-mono">City / Governorate:</span>
                <span className="font-bold text-black">{city}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200/80 pb-2">
                <span className="text-zinc-500 font-mono">Delivery Address:</span>
                <span className="font-bold text-black">{address}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200/80 pb-2">
                <span className="text-zinc-500 font-mono">Payment Method:</span>
                <span className="font-bold text-black uppercase">
                  {paymentMethod === "cod"
                    ? "Cash on Delivery (الدفع عند الاستلام)"
                    : paymentMethod === "card"
                    ? "Credit / Debit Card"
                    : "InstaPay / Vodafone Cash"}
                </span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-bold">
                <span>Total to Pay:</span>
                <span className="text-[#e8111a] font-mono">{grandTotal.toLocaleString()} EGP</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-3 text-left">
              <Truck size={20} className="text-emerald-700 shrink-0" />
              <div>
                <p className="font-bold">Estimated Delivery: 2-3 Business Days</p>
                <p className="text-[11px] text-emerald-800">Our Cairo logistics courier will contact you via phone or WhatsApp prior to arrival.</p>
              </div>
            </div>

            <button
              onClick={handleCloseAll}
              className="w-full py-4 bg-black hover:bg-[#e8111a] text-white font-bold tracking-[0.2em] text-xs uppercase rounded-xl transition-colors cursor-pointer shadow-md"
              style={{ fontFamily: "Space Mono, monospace" }}
            >
              CONTINUE SHOPPING
            </button>
          </div>
        ) : (
          /* ── Checkout Form Screen ── */
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold font-mono">
                ⚠️ {error}
              </div>
            )}

            {/* Customer Details Section */}
            <div className="space-y-4">
              <span
                className="text-xs font-bold text-zinc-500 tracking-[0.2em] uppercase block"
                style={{ fontFamily: "Space Mono, monospace" }}
              >
                1. DELIVERY & CONTACT INFORMATION:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-3 top-3 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="e.g. Ahmed Hassan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-zinc-300 text-xs focus:border-black outline-none bg-zinc-50"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">
                    Mobile Phone (WhatsApp) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3 top-3 text-zinc-400" />
                    <input
                      type="tel"
                      placeholder="010XXXXXXXX / 011XXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-zinc-300 text-xs focus:border-black outline-none bg-zinc-50"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">
                    City / Governorate <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-zinc-300 text-xs focus:border-black outline-none bg-zinc-50 cursor-pointer font-sans"
                  >
                    {governorates.map((gov) => (
                      <option key={gov} value={gov}>
                        {gov}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">
                    Detailed Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin size={15} className="absolute left-3 top-3 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="Street, Building, Floor, Apartment"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-zinc-300 text-xs focus:border-black outline-none bg-zinc-50"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">
                  Delivery Notes / Landmarks (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Near City Stars Mall, ring the bell twice"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-xs focus:border-black outline-none bg-zinc-50"
                />
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="space-y-3 pt-4 border-t border-zinc-200">
              <span
                className="text-xs font-bold text-zinc-500 tracking-[0.2em] uppercase block"
                style={{ fontFamily: "Space Mono, monospace" }}
              >
                2. SELECT PAYMENT METHOD:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* COD */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    paymentMethod === "cod"
                      ? "border-black bg-zinc-900 text-white shadow-md"
                      : "border-zinc-200 bg-zinc-50 text-zinc-800 hover:border-zinc-400"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Banknote size={20} className={paymentMethod === "cod" ? "text-emerald-400" : "text-zinc-600"} />
                    {paymentMethod === "cod" && <Check size={14} className="text-emerald-400" />}
                  </div>
                  <p className="text-xs font-bold">Cash on Delivery</p>
                  <p className={`text-[10px] ${paymentMethod === "cod" ? "text-zinc-300" : "text-zinc-500"}`}>
                    الدفع عند الاستلام
                  </p>
                </button>

                {/* Visa / Mastercard */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    paymentMethod === "card"
                      ? "border-black bg-zinc-900 text-white shadow-md"
                      : "border-zinc-200 bg-zinc-50 text-zinc-800 hover:border-zinc-400"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <CreditCard size={20} className={paymentMethod === "card" ? "text-sky-400" : "text-zinc-600"} />
                    {paymentMethod === "card" && <Check size={14} className="text-sky-400" />}
                  </div>
                  <p className="text-xs font-bold">Credit / Debit Card</p>
                  <p className={`text-[10px] ${paymentMethod === "card" ? "text-zinc-300" : "text-zinc-500"}`}>
                    Visa & Mastercard
                  </p>
                </button>

                {/* InstaPay / Vodafone Cash */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("instapay")}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    paymentMethod === "instapay"
                      ? "border-black bg-zinc-900 text-white shadow-md"
                      : "border-zinc-200 bg-zinc-50 text-zinc-800 hover:border-zinc-400"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Smartphone size={20} className={paymentMethod === "instapay" ? "text-amber-400" : "text-zinc-600"} />
                    {paymentMethod === "instapay" && <Check size={14} className="text-amber-400" />}
                  </div>
                  <p className="text-xs font-bold">InstaPay / Wallets</p>
                  <p className={`text-[10px] ${paymentMethod === "instapay" ? "text-zinc-300" : "text-zinc-500"}`}>
                    Vodafone / InstaPay
                  </p>
                </button>
              </div>

              {/* InstaPay Details Info Box */}
              {paymentMethod === "instapay" && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                  <p className="font-bold font-mono">📱 InstaPay Username: <span className="text-black bg-white px-2 py-0.5 rounded border border-amber-300 font-bold">cilven.store@instapay</span></p>
                  <p className="text-[11px] text-amber-800">Transfer total amount and include your phone number in transfer notes.</p>
                </div>
              )}
            </div>

            {/* Order Summary Line */}
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-600 font-mono">
                <span>Items Subtotal ({items.reduce((s, i) => s + i.qty, 0)} pieces):</span>
                <span className="font-bold text-black">{total.toLocaleString()} EGP</span>
              </div>
              <div className="flex justify-between text-zinc-600 font-mono">
                <span>Shipping ({city}):</span>
                <span className="text-emerald-700 font-bold">
                  {shippingCost === 0 ? "FREE" : `${shippingCost} EGP`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-zinc-200">
                <span>Total Amount:</span>
                <span className="text-base text-[#e8111a] font-mono">{grandTotal.toLocaleString()} EGP</span>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#e8111a] hover:bg-black text-white font-bold tracking-[0.2em] text-xs uppercase rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              style={{ fontFamily: "Space Mono, monospace" }}
            >
              {loading ? (
                <span>PROCESSING YOUR ORDER...</span>
              ) : (
                <>
                  <Check size={16} /> CONFIRM ORDER — {grandTotal.toLocaleString()} EGP
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Interactive Search Modal Component ───────────────────────────────────────

function SearchModal({
  open,
  onClose,
  onSelectProduct,
}: {
  open: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}) {
  const [query, setQuery] = useState("");

  if (!open) return null;

  const q = query.trim().toLowerCase();

  const results = q
    ? ALL_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tag.toLowerCase().includes(q) ||
          p.colors.some((c) => c.toLowerCase().includes(q)) ||
          p.details.some((d) => d.toLowerCase().includes(q))
      )
    : ALL_PRODUCTS.slice(0, 4);

  const quickSearches = [
    "Kill You",
    "Noir Monogram",
    "Denim Cyan",
    "Aura Skull",
    "Graphic Tees",
    "Acid Denim",
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6 overflow-y-auto"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-2xl text-black animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-200 bg-zinc-50">
          <Search size={20} className="text-zinc-500 shrink-0" />
          <input
            type="text"
            placeholder="Search products by title, category, material, color..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-sm md:text-base font-medium outline-none text-black placeholder:text-zinc-400"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs font-mono text-zinc-400 hover:text-black px-2 py-1 bg-zinc-200/60 rounded cursor-pointer"
            >
              CLEAR
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-200/80 hover:bg-black hover:text-white flex items-center justify-center text-zinc-600 transition-colors cursor-pointer ml-1"
          >
            <X size={16} />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-5 py-3 bg-white border-b border-zinc-100 flex items-center gap-2 overflow-x-auto">
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider shrink-0">
            SUGGESTIONS:
          </span>
          {quickSearches.map((s) => (
            <button
              key={s}
              onClick={() => setQuery(s)}
              className="px-2.5 py-1 rounded-full text-xs font-mono bg-zinc-100 hover:bg-black hover:text-white text-zinc-700 transition-colors shrink-0 cursor-pointer"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Results Header */}
        <div className="px-5 py-2.5 bg-zinc-50 flex items-center justify-between text-xs text-zinc-500 font-mono border-b border-zinc-100">
          <span>{q ? `FOUND ${results.length} MATCHING PIECES` : "TRENDING STREETWEAR PIECES"}</span>
          <span className="text-[10px]">CLICK ITEM TO OPEN</span>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
          {results.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
                <Search size={22} />
              </div>
              <p className="text-sm font-bold text-black uppercase" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                No pieces found matching "{query}"
              </p>
              <p className="text-xs text-zinc-500 font-mono">
                Try searching for "Kill You", "Monogram", "Denim", or "Aura"
              </p>
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-50 border border-transparent hover:border-zinc-200 transition-all cursor-pointer group"
              >
                <div className="w-16 h-20 rounded-lg overflow-hidden shrink-0 border border-zinc-200 bg-zinc-100">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-bold text-[#e8111a] tracking-wider uppercase font-mono block">
                    {product.category} · {product.tag}
                  </span>
                  <h4 className="text-sm font-bold uppercase text-black group-hover:text-[#e8111a] transition-colors line-clamp-1" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                    {product.name}
                  </h4>
                  <p className="text-xs text-zinc-500 font-mono mt-0.5">
                    {product.colors.length} Colorways available
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-black font-mono">
                    {product.price.toLocaleString()} EGP
                  </p>
                  <span className="text-[11px] text-[#e8111a] font-bold tracking-wider uppercase font-mono flex items-center gap-1 mt-1 justify-end group-hover:underline">
                    VIEW PIECE <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}


