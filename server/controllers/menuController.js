const Restaurant = require('../models/Restaurant');

const getMenu = async (req, res) => {
  try {
    const menuData = {
      biryani: [
        { name: "HYDERABAD TANDOORI CHICKEN BIRYANI", price: 180 },
        { name: "CHICKEN BIRYANI", price: 150 },
        { name: "MUTTON BIRYANI", price: 200 },
        { name: "GILMA CHICKEN BIRYANI", price: 160 },
        { name: "EGG BIRYANI", price: 120 },
        { name: "HYDERABAD CHICKEN BIRYANI", price: 170 },
        { name: "TANDOORI CHICKEN BIRYANI", price: 190 },
        { name: "EMPTY BIRYANI", price: 100 }
      ],
      gravyItems: [
        { name: "BUTTER CHICKEN GRAVY", price: 150 },
        { name: "HYDERABAD CHICKEN GRAVY", price: 160 },
        { name: "REZALA CHICKEN GRAVY", price: 160 },
        { name: "KADAAI CHICKEN GRAVY", price: 160 },
        { name: "KONGINADU CHICKEN", price: 160 },
        { name: "KEEMA CHICKEN GRAVY", price: 160 },
        { name: "MUGHLAI CHICKEN GRAVY", price: 160 },
        { name: "CHICKEN KOLHAPUR GRAVY", price: 160 },
        { name: "PUNJABI CHICKEN GRAVY", price: 160 },
        { name: "CHILLY CHICKEN GRAVY", price: 160 },
        { name: "CHICKEN MANCHURIAN", price: 160 },
        { name: "SCHEZWAN CHICKEN GRAVY", price: 160 },
        { name: "DRAGON CHICKEN GRAVY", price: 160 },
        { name: "GARLIC CHICKEN GRAVY", price: 160 },
        { name: "CHICKEN CHETTIMAD GRAVY", price: 150 },
        { name: "PEPPER CHICKEN GRAVY", price: 150 },
        { name: "EGG MASALA GRAVY", price: 100 },
        { name: "PANEER BUTTER MASALA", price: 150 },
        { name: "KADAAI PANEER", price: 150 },
        { name: "MUSHROOM MASALA", price: 110 },
        { name: "GOPI MASALA", price: 110 },
        { name: "MIX VEG CURRY", price: 120 }
      ],
      dryItems: [
        { name: "CHILLY CHICKEN DRY", price: 140 },
        { name: "CHILLY CHICKEN BONELESS", price: 160 },
        { name: "GARLIC CHICKEN DRY", price: 170 },
        { name: "GINGER CHICKEN DRY", price: 170 },
        { name: "LEMON CHICKEN DRY", price: 170 },
        { name: "DRAGON CHICKEN DRY", price: 170 },
        { name: "SCHEZWAN CHICKEN DRY", price: 170 },
        { name: "CHICKEN MANCHURIAN DRY", price: 170 },
        { name: "PEPPER CHICKEN DRY", price: 160 },
        { name: "SALT & PEPPER CHICKEN", price: 170 },
        { name: "HOT PEPPER CHICKEN DRY", price: 170 },
        { name: "PEPPER LOLLIPOP", price: 200 },
        { name: "CHICKEN LOLLIPOP - 5 Pieces", price: 150 },
        { name: "CHILLY GOPI", price: 100 },
        { name: "CHILLY MUSHROOM", price: 100 },
        { name: "CHILLY PANEER", price: 150 },
        { name: "GOPI MANCHURIAN", price: 140 },
        { name: "MUSHROOM MANCHURIAN", price: 140 },
        { name: "PANEER MANCHURIAN", price: 170 }
      ],
      dosaItems: [
        { name: "PLAIN DOSA", price: 25 },
        { name: "KAL DOSA", price: 30 },
        { name: "ROAST", price: 40 },
        { name: "GHEE ROAST", price: 70 },
        { name: "ONION ROAST", price: 60 },
        { name: "PODI DOSA", price: 40 },
        { name: "PODI ROAST", price: 60 },
        { name: "EGG DOSA", price: 40 },
        { name: "EGG ROAST", price: 60 },
        { name: "IDLY - 2", price: 20 },
        { name: "CHAPPATHI", price: 20 },
        { name: "PLAIN NAAN", price: 40 },
        { name: "BUTTER NAAN", price: 45 },
        { name: "ROTTI", price: 35 },
        { name: "BUTTER ROTTI", price: 40 },
        { name: "KULCHA", price: 40 },
        { name: "PANEER / CHICKEN KULCHA", price: 60 },
        { name: "PAROTTA", price: 20 },
        { name: "THOOTHUKUDI PAROTTA", price: 25 },
        { name: "CHICKEN CHILLY PAROTTA", price: 130 },
        { name: "VEG. CHILLY PAROTTA", price: 100 },
        { name: "CHICKEN KOTIHU PAROTTA", price: 100 },
        { name: "EGG KOTIHU PAROTTA", price: 100 },
        { name: "VEG. KOTIHU PAROTTA", price: 100 }
      ],
      friedRice: [
        { name: "CHICKEN FRIED RICE", price: 120 },
        { name: "SCHEZWAN CHICKEN FRIED RICE", price: 140 },
        { name: "SINGAPORE CHICKEN FRIED RICE", price: 150 },
        { name: "EGG FRIED RICE", price: 100 },
        { name: "SCHEZWAN EGG FRIED RICE", price: 120 },
        { name: "SINGAPORE EGG FRIED RICE", price: 130 },
        { name: "CHICKEN MANCHURIAN RICE", price: 140 },
        { name: "GOPI MANCHURIAN RICE", price: 110 },
        { name: "VEG FRIED RICE", price: 90 },
        { name: "MUSHROOM RICE", price: 100 },
        { name: "JEERA RICE", price: 80 },
        { name: "GOPI RICE", price: 100 },
        { name: "SCHEZWAN VEG RICE", price: 110 },
        { name: "SINGAPORE VEG RICE", price: 120 },
        { name: "PANEER RICE", price: 130 },
        { name: "SCHEZWAN PANEER RICE", price: 140 },
        { name: "MANCHURIAN PANEER RICE", price: 150 }
      ],
      noodles: [
        { name: "CHICKEN NOODLES", price: 120 },
        { name: "SCHEZWAN CHICKEN NOODLES", price: 140 },
        { name: "SINGAPORE CHICKEN NOODLES", price: 150 },
        { name: "EGG NOODLES", price: 100 },
        { name: "SINGAPORE EGG NOODLES", price: 130 },
        { name: "SCHEZWAN EGG NOODLES", price: 120 },
        { name: "CHICKEN MANCHURIAN NOODLES", price: 140 },
        { name: "JEERA NOODLES", price: 80 },
        { name: "VEG FRIED NOODLES", price: 90 },
        { name: "MUSHROOM NOODLES", price: 100 },
        { name: "PANEER NOODLES", price: 130 },
        { name: "VEG SCHEZWAN NOODLES", price: 110 },
        { name: "VEG SINGAPORE NOODLES", price: 120 },
        { name: "GOPI NOODLES", price: 100 },
        { name: "GOPI MANCHURIAN NOODLES", price: 110 },
        { name: "PANEER MANCHURIAN NOODLES", price: 150 }
      ],
      meals: [
        { name: "VEG MEALS", price: 80 },
        { name: "VEG MEALS PARCEL", price: 90 }
      ],
      soups: [
        { name: "CHICKEN SOUP", price: 40 },
        { name: "VEGETABLE SOUP", price: 30 }
      ],
      alfaham: [
        { name: "ALFAHAM / B.B.Q - Qtr", price: 200 },
        { name: "ALFAHAM / B.B.Q - Half", price: 380 },
        { name: "ALFAHAM / B.B.Q - Full", price: 750 }
      ],
      eggItems: [
        { name: "BOLLED EGG", price: 15 },
        { name: "OMELETTE", price: 20 },
        { name: "FULL BOLL/HA LIF BOIL", price: 15 },
        { name: "KALAKKI", price: 15 },
        { name: "PEPPER KALAKKI", price: 20 },
        { name: "KOLAMPU KALAKKI", price: 20 },
        { name: "EGG PORIVAL", price: 40 }
      ]
    };

    res.json(menuData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMenu };