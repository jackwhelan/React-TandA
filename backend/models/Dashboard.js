const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DashboardSchema = new Schema({
    clearance: {
        type: String
    },
    dashboardItems: {
        type: [Object]
    }
});

const Dashboard = new mongoose.model('Dashboard', DashboardSchema);


module.exports = Dashboard;