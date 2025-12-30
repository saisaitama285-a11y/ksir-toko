const firebaseConfig = {
  apiKey: "AIzaSyCqlgi-B8nUBRuL8bHh10rBuAdIQ9EBk9U",
  authDomain: "kasir-toko-2eb38.firebaseapp.com",
  projectId: "kasir-toko-2eb38",
  storageBucket: "kasir-toko-2eb38.firebasestorage.app",
  messagingSenderId: "384536807400",
  appId: "1:384536807400:web:6e05e4677423449306865d",
  measurementId: "G-R9NMJNQVXG"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const appId = firebaseConfig.projectId;

let currentUser = null; 
let currentCart = [];
let selectedPayment = 'Tunai';

const OUTLETS = {
    'OUTLET-KARET': 'Outlet Karet',
    'OUTLET-TA1': 'Tanah Abang 1',
    'OUTLET-TA2': 'Tanah Abang 2',
    'OUTLET-DURI1': 'Duri 1',
    'OUTLET-DURI2': 'Duri 2',
    'OUTLET-GROGOL': 'Grogol'
};

const MENU = {
    roti: [
        { id: 'r1', name: 'Roti Original', price: 10000 },
        { id: 'r2', name: 'Roti Coklat', price: 11000 },
        { id: 'r3', name: 'Roti Coklat Kacang', price: 12000 },
        { id: 'r4', name: 'Roti Daging', price: 13000 }
    ],
    minuman: [
        { id: 'm1', name: 'Le Minerale', price: 5000 },
        { id: 'm2', name: 'Sari Apel', price: 8000 },
        { id: 'm3', name: 'Madu Salman', price: 5000 }
    ]
};

const SAOS_VARIANTS = ['Original', 'Coklat', 'Coklat Kacang', 'Daging'];
const getPublicCol = (name) => db.collection('artifacts').doc(appId).collection('public').doc('data').collection(name);
