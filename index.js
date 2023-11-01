require("dotenv").config();
const express=require("express");
const app=express();
// const cors=require("cors");
const connection=require("./db");
const userRoutes=require("./routes/users");
const authRoutes=require("./routes/auth");
const createQuizRoutes=require('./routes/create_quiz');
const attemptQuizRoute=require('./routes/attempt_quiz');
const leaderboardRoute=require('./routes/leaderboard');
const filterRoute=require('./routes/filter');
const userControlRoute=require('./routes/user_control');
const recommendataion=require('./routes/recommendataion');
const path = require('path');



try {
    connection();
    
    app.use(express.json());
    // app.use(cors());

    const publicDirectory = path.join(__dirname, 'uploads');
    app.use('/uploads', express.static(publicDirectory));
    
    app.use("/api/users", userRoutes);
    app.use("/api/auth", authRoutes);
    app.use('/quiz', createQuizRoutes);
    app.use('/attempt_quiz', attemptQuizRoute);
    app.use('/leaderboard', leaderboardRoute);
    app.use('/filter', filterRoute);
    app.use('/user', userControlRoute);
    app.use('/recommend',recommendataion)
    
    const port = process.env.PORT || 8080;
    app.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (error) {
    console.error("An error occurred:", error);
  }