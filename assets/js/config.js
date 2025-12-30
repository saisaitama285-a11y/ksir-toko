const firebaseConfig = {
    apiKey: "AIzaSyCfvaQyjap_G1hAknz5VXMRQ7uzw2XKHrQ",
    authDomain: "mesin-kasir-1fa7e.firebaseapp.com",
    projectId: "mesin-kasir-1fa7e",
    storageBucket: "mesin-kasir-1fa7e.firebasestorage.app",
    messagingSenderId: "120089621210",
    appId: "1:120089621210:web:842fb99067be43d2eeebe3",
    measurementId: "G-1Q98BKHBL8"
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
