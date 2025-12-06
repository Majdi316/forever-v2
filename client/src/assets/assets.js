
import p_img2_1 from "./p_img2_1.png";
import p_img2_2 from "./p_img2_2.png";
import p_img2_3 from "./p_img2_3.png";
import p_img2_4 from "./p_img2_4.png";
import p_img3 from "./p_img3.png";
import p_img4 from "./p_img4.png";
import p_img5 from "./p_img5.png";
import p_img6 from "./p_img6.png";
import p_img7 from "./p_img7.png";
import p_img8 from "./p_img8.png";
import p_img9 from "./p_img9.png";
import p_img10 from "./p_img10.png";
import p_img11 from "./p_img11.png";
import p_img12 from "./p_img12.png";
import p_img13 from "./p_img13.png";
import p_img14 from "./p_img14.png";
import p_img15 from "./p_img15.png";
import p_img16 from "./p_img16.png";

import cart_icon from "./cart_icon.png";
import bin_icon from "./bin_icon.png";
import dropdown_icon from "./dropdown_icon.png";
import exchange_icon from "./exchange_icon.png";
import profile_icon from "./profile_icon.png";
import quality_icon from "./quality_icon.png";
import search_icon from "./search_icon.png";
import star_dull_icon from "./star_dull_icon.png";
import star_icon from "./star_icon.png";
import support_img from "./support_img.png";
import menu_icon from "./menu_icon.png";
import about_img from "./about_img.png";
import contact_img from "./contact_img.png";
import razorpay_logo from "./razorpay_logo.png";
import stripe_logo from "./stripe_logo.png";
import cross_icon from "./cross_icon.png";
import parcel_icon from "./parcel_icon.svg";
export const assets = {
  parcel_icon,
  cart_icon,
  dropdown_icon,
  exchange_icon,
  profile_icon,
  quality_icon,
  search_icon,
  star_dull_icon,
  star_icon,
  bin_icon,
  support_img,
  menu_icon,
  about_img,
  contact_img,
  razorpay_logo,
  stripe_logo,
  cross_icon,
};

export const products = [
  {
    _id: "p001",
    name: "Girls Round Neck Cotton Top",
    description:
      "A lightweight, knitted cotton top perfect for casual wear with a comfortable round neckline.",
    price: 220,
    image: [
      { url: p_img2_1, alt: "image1" },
      { url: p_img2_2, alt: "image2" },
      { url: p_img2_3, alt: "image3" },
      { url: p_img2_4, alt: "image4" },
    ],
    likes: [],
    employee_id: "10",
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "L", "XL"],
    date: 1716234545448,
    bestseller: true,
    status: "Available",
  },
  {
    _id: "p002",
    name: "Men’s Classic Denim Jeans",
    description:
      "Stylish and durable denim jeans designed for everyday comfort and modern fit.",
    price: 450,
    image: [{ url: p_img3, alt: "denim" }],
    likes: [],
    employee_id: "11",
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["M", "L", "XL", "XXL"],
    date: 1716234545448,
    bestseller: false,
    status: "sold out",
  },
  {
    _id: "p003",
    name: "Women’s Floral Summer Dress",
    description:
      "A light, breezy summer dress with a floral pattern — ideal for warm days.",
    price: 520,
    image: [{ url: p_img4, alt: "dress" }],
    likes: [],
    employee_id: "12",
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: 1716234545448,
    bestseller: true,
    status: "Available",
  },
  {
    _id: "p004",
    name: "Men’s Fleece Hoodie",
    description:
      "Warm fleece hoodie with adjustable drawstring, perfect for cool evenings.",
    price: 390,
    image: [{ url: p_img5, alt: "hoodie" }],
    likes: [],
    employee_id: "13",
    category: "Men",
    subCategory: "Winterwear",
    sizes: ["M", "L", "XL", "XXL"],
    date: 1716234545448,
    bestseller: false,
    status: "Available",
  },
  {
    _id: "p005",
    name: "Kids Cotton Shorts",
    description:
      "Soft, breathable cotton shorts for everyday play and comfort.",
    price: 180,
    image: [{ url: p_img6, alt: "shorts" }],
    likes: [],
    employee_id: "10",
    category: "Kids",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L"],
    date: 1716234545448,
    bestseller: true,
    status: "Available",
  },
  {
    _id: "p006",
    name: "Women’s Knitted Sweater",
    description:
      "Elegant knitted sweater that provides warmth and style for winter days.",
    price: 610,
    image: [{ url: p_img7, alt: "sweater" }],
    likes: [],
    employee_id: "12",
    category: "Women",
    subCategory: "Winterwear",
    sizes: ["M", "L", "XL"],
    date: 1716234545448,
    bestseller: false,
    status: "Available",
  },
  {
    _id: "p007",
    name: "Men’s Casual Polo Shirt",
    description:
      "Classic polo shirt crafted from premium cotton with a relaxed fit.",
    price: 280,
    image: [{ url: p_img8, alt: "polo" }],
    likes: [],
    employee_id: "13",
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    date: 1716234545448,
    bestseller: true,
    status: "Available",
  },
  {
    _id: "p008",
    name: "Women’s High-Waist Jeans",
    description:
      "Comfortable high-waist denim jeans designed to accentuate your shape.",
    price: 540,
    image: [{ url: p_img9, alt: "jeans" }],
    likes: [],
    employee_id: "12",
    category: "Women",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    date: 1716234545448,
    bestseller: false,
    status: "Available",
  },
  {
    _id: "p009",
    name: "Kids Winter Jacket",
    description:
      "Cozy and water-resistant jacket to keep your kids warm during winter.",
    price: 400,
    image: [{ url: p_img10, alt: "jacket" }],
    likes: [],
    employee_id: "10",
    category: "Kids",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L"],
    date: 1716234545448,
    bestseller: true,
    status: "Available",
  },
  {
    _id: "p010",
    name: "Men’s Track Pants",
    description:
      "Lightweight track pants with elastic waistband — ideal for workouts and casual wear.",
    price: 320,
    image: [{ url: p_img11, alt: "track pants" }],
    likes: [],
    employee_id: "11",
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["M", "L", "XL", "XXL"],
    date: 1716234545448,
    bestseller: false,
    status: "Available",
  },
  {
    _id: "p011",
    name: "Women’s Casual Crop Top",
    description:
      "Trendy crop top with short sleeves, made from soft cotton fabric.",
    price: 250,
    image: [{ url: p_img12, alt: "crop top" }],
    likes: [],
    employee_id: "12",
    category: "Women",
    subCategory: "Topwear",
    sizes: ["XS", "S", "M"],
    date: 1716234545448,
    bestseller: true,
    status: "Available",
  },
  {
    _id: "p012",
    name: "Men’s Wool Jacket",
    description:
      "Stylish wool jacket with button closure and soft inner lining for warmth.",
    price: 670,
    image: [{ url: p_img13, alt: "wool jacket" }],
    likes: [],
    employee_id: "13",
    category: "Men",
    subCategory: "Winterwear",
    sizes: ["M", "L", "XL", "XXL"],
    date: 1716234545448,
    bestseller: true,
    status: "Available",
  },
  {
    _id: "p013",
    name: "Women’s Lounge Pants",
    description: "Relaxed fit lounge pants for home comfort or casual outings.",
    price: 310,
    image: [{ url: p_img14, alt: "lounge pants" }],
    likes: [],
    employee_id: "12",
    category: "Women",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    date: 1716234545448,
    bestseller: false,
    status: "Available",
  },
  {
    _id: "p014",
    name: "Kids Cotton Hoodie",
    description:
      "Soft cotton hoodie that keeps kids cozy and stylish in cooler weather.",
    price: 230,
    image: [{ url: p_img15, alt: "kids hoodie" }],
    likes: [],
    employee_id: "10",
    category: "Kids",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L"],
    date: 1716234545448,
    bestseller: true,
    status: "Available",
  },
  {
    _id: "p015",
    name: "Women’s Long Coat",
    description:
      "Chic long coat for winter days, made with premium wool blend fabric.",
    price: 720,
    image: [{ url: p_img16, alt: "long coat" }],
    likes: [],
    employee_id: "12",
    category: "Women",
    subCategory: "Winterwear",
    sizes: ["M", "L", "XL", "XXL"],
    date: 1716234545448,
    bestseller: true,
    status: "Available",
  },
];
// eslint-disable-next-line no-unused-vars
const contact = [
  {
    userId: "123",
    subject: "about the product",
    content: "it a very nice product",
    answer:"thank you for this Massage"
  },
];

// eslint-disable-next-line no-unused-vars
const users = [
  {
    "_id": "690f6a597c8aa1c742caad0e",
    "name": {
        "first": "majdi",
        "middle": "turke",
        "last": "hoseen",
        "_id": "690f6a597c8aa1c742caad0f"
    },
    "phone": "0556609514",
    "email": "majdioa7sh@gmail.com",
    "age": 29,
    "gender": "male",
    "password": "$2b$10$/sYEftznhuH0wbtP/WxZVu5kLgJuyU2ovUzEBRHkvWXkXxMKXvfO2",
    "image": {
        "url": "https://picsum.photos/id/201/200/300",
        "alt": "my profile",
        "_id": "690f6a597c8aa1c742caad10"
    },
    "address": {
        "state": "12312313",
        "country": "israel",
        "city": "majd al kurom",
        "street": "al manar",
        "houseNumber": 0,
        "zip": 0,
        "_id": "690f6a597c8aa1c742caad11"
    },
    "isEmployee": true,
    "isManager": true,
    "isVerified": true,
    "isBlocked": false,
    "lastLogin": "2025-12-03T17:37:55.743Z",
    "isSubscribe": true,
    "cartData": {},
    "createdAt": "2025-11-08T16:05:45.803Z",
    "lastActivity": "2025-12-03T18:51:12.807Z",
    "__v": 0
}
]