const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');

// ... (existing routes)

// New route to insert data
router.post('/insertData', async (req, res) => {
    try {
        const insertedData = await Restaurant.insertMany(req.body);
        res.json({ success: true, insertedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//To get all restaurants
router.get('/', async (req, res) => {
    try {
        const allRestaurants = await Restaurant.find({});
        res.json(allRestaurants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Existing route to get restaurants by cuisine
router.get('/cuisine/:cuisine', async (req, res) => {
    const cuisine = req.params.cuisine;

    try {
        const restaurantsByCuisine = await Restaurant.find({ cuisine: cuisine });
        res.json(restaurantsByCuisine);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// New route to get restaurants with Delicatessen and city not equal to Brooklyn
router.get('/Delicatessen', async (req, res) => {
    try {
        const specificRestaurants = await Restaurant.find({
            cuisine: 'Delicatessen',
            city: { $ne: 'Brooklyn' }
        }, { _id: 0, cuisine: 1, name: 1, city: 1 }).sort({ name: 1 });

        res.json(specificRestaurants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//To get all restaurants by ASC or DESC order
router.get('/', async (req, res) => {
    try {
        const sortBy = req.query.sortBy;
        let projection = { _id: 1, cuisine: 1, name: 1, city: 1, restaurant_id: 1 };
        let sortOrder = sortBy === 'ASC' ? 1 : sortBy === 'DESC' ? -1 : 1;

        console.log('Sort Order:', sortOrder);

        const sortedRestaurants = await Restaurant.find({}, projection).sort({ restaurant_id: sortOrder });
        console.log('Sorted Restaurants:', sortedRestaurants);

        res.json(sortedRestaurants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;
