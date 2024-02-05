const express = require('express');
const mongoose = require('mongoose');
const restaurantRouter = require('./routes/RestaurantRouteS'); // Update this line

const app = express();
app.use(express.json());


//mongodb+srv://allanissumaya22:Allanismongopass22@cluster0.zap8277.mongodb.net/Restaurant?retryWrites=true&w=majority
const DB_HOST = "cluster0.zap8277.mongodb.net";
const DB_USER = "allanissumaya22";
const DB_PASSWORD = "Allanismongopass22";
const DB_NAME = "Restaurant";
const DB_CONNECTION_STRING = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(success => {
    console.log('Success Mongodb connection');
}).catch(err => {
    console.log('Error Mongodb connection:', err);
});

app.use('/restaurants', restaurantRouter); // Use the restaurantRouter for '/restaurants' path

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
