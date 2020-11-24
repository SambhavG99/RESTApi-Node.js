const helmet = require('helmet');
const userRouter = require('../routes/userRouter');
const childRouter = require('../routes/childRouter');
const stateRouter = require('../routes/stateRouter');
const districtRouter = require('../routes/districtRouter');

module.exports = function(express,app) {
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.use(helmet());
app.use('/api/users' , userRouter);
app.use('/api/children', childRouter);
app.use('/api/states', stateRouter);
app.use('/api/districts' ,districtRouter);
};