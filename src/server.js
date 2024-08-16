import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import pg from "pg";
import bcrypt from "bcrypt";
//import passport from "passport";
import session from "express-session";
import env from "dotenv";
import cors from "cors";
import jwt from 'jsonwebtoken';
import { CollectionsBookmarkOutlined } from "@mui/icons-material";

//import pgSession from 'connect-pg-simple';


const app = express();
app.use(express.json())
app.use(
  cors({
    origin: ["http://localhost:3000"
      , "https://onlinetreasurehunt2024.netlify.app"
    ],
    // methods: ["GET", "POST"],
    credentials: true,
  })
);
// app.use(function(req, res, next) {
//   // res.header("Access-Control-Allow-Origin", "*");
//   const allowedOrigins = ['http://localhost:3000', 'https://66070d5c0798463d4bd9c713--magical-puffpuff-b5ca65.netlify.app/', 'https://66070d5c0798463d4bd9c713--magical-puffpuff-b5ca65.netlify.app/'];
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//        res.setHeader('Access-Control-Allow-Origin', origin);
//   }
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   res.header("Access-Control-Allow-credentials", true);
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
//   next();
//     });
// app.use((req, res, next) => {
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     "https://celebrated-lily-012407.netlify.app"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.setHeader("Access-Control-Allow-Private-Network", true);
//   //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
//   res.setHeader("Access-Control-Max-Age", 7200);

//   next();
// });
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.port || 3001;
const saltRounds = 10;
env.config();

// Database configuration
const db = new pg.Client({
  connectionString: process.env.DB_URL,
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: {
    rejectUnauthorized: true,

    // Other SSL/TLS options can be specified here if needed
  }
});
db.connect();
app.get('/sudhansu', (req, resp) => {
  resp.cookie("test", "sudhansu", {
    httpOnly: false,
    sameSite: "Node",
    secure: true
  });
  resp.send("data");
})
// const pgSessionStore = pgSession(session);

// const sessionOptions = {
//   store: new pgSessionStore({
//     conObject: {
//       connectionString: process.env.DB_URL, // Your PostgreSQL connection string
//       ssl: {
//         rejectUnauthorized: true,
//         // Other SSL/TLS options can be specified here if needed
//       }
//     },
//     tableName: 'sessions', // Name of the table to store sessions
//     ttl: 72 * 60 * 60,
//   }),
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     maxAge: 72 * 60 * 60 * 1000, // 72 hrs
//     httpOnly: true,
//     secure: true, // Enable this if using HTTPS
//     sameSite: "None",
//   }
// };

// app.use(session(sessionOptions));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 144 * 60 * 60 * 1000, // 72 hrs
      httpOnly: false,
      // secure: true, // Enable this if using HTTPS
      // sameSite: "strict",
    }
  })
);

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));

// app.use(passport.initialize());
// app.use(passport.session());

// Middleware function to initialize user progress in session
// const initializeUserProgress = (req, res, next) => {
//   if (!req.session.userProgress) {
//     req.session.userProgress = {};
//   }
//   console.log("Session object in initializeUserProgress:", req.session);
//   console.log("User ID in initializeUserProgress before:", req.session.userId);

//   const userId = req.session.userId;

//   console.log("User ID in initializeUserProgress:", userId);

//   if (!userId) {
//     console.log("User ID not found in session. Initializing progress for new user.");
//     // New user, initialize progress starting from question 1
//     req.session.userProgress = { 1: true }; // Example: Initialize progress for question 1
//   } else {
//     console.log("Returning user. Progress already initialized.");
//     // Returning user, retrieve progress from session
//     if (!req.session.userProgress[userId]) {
//       req.session.userProgress[userId] = {};
//     }
//   }

//   next();
// };



// app.use(initializeUserProgress);

// const requireLogin = (req, res, next) => {
//   console.log(req.session)
//   console.log(req.session.userId)
//   if (!req.session.userId) {
//     return res.status(401).send({ error: "Unauthorized" });
//   }
//   next();
// };

const requireLogin = async (req, res, next) => {
  const token = req.cookies['test'] || false;
  console.log("token got ", token);

  if (!token) {
    return res.status(401).send({ error: "Unauthorized: Token not provided" });
  }

  try {
    const data = jwt.verify(token, "shhhhhh");

    if (!data) {
      return res.status(401).send({ error: "Unauthorized: Invalid token" });
    }

    req.userId = data.userId;
    console.log("request user id: ", req.userId);

    // Optionally check for token expiry
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (data.exp && data.exp < currentTimestamp) {
      return res.status(401).send({ error: "Unauthorized: Token has expired" });
    }

    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).send({ error: "Unauthorized: Error verifying token" });
  }
};


// const requireLogin = async(req, res, next) => {
//   const token=req.cookies['test']||false;
//   console.log("token got ",token);
// if(!token)
// {return res.status(401).send({ error: "Unauthorized1" });}
// const data=jwt.verify(token,"shhhhhh");
//   if (!data) {

//     return res.status(401).send({ error: "Unauthorized2" });
//   }

//   req.userId=data.userId;
//   console.log("request user id: ",req.userId)
//   // console.log("userid: ",req.session.userId)
//   next();
// };

app.get("/Login", async (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

// Routes
app.post("/Login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedHashedPassword = user.password;

      const match = await bcrypt.compare(password, storedHashedPassword);
      if (match) {
        // req.session.userProgress[user.user_id] = req.session.userProgress[user.user_id] || {};
        // req.session.user = user;
        req.session.userId = user.user_id;
        console.log("userId assigned to session:", req.session.userId);

        const usernameResult = await db.query("SELECT username FROM users WHERE email = $1", [
          email,
        ]);
        const username = usernameResult.rows[0].username;

        //  /==============/= 
        const userinfo = {
          Uname: username,
          name: email,
          userId: user.user_id
        }
        var token = jwt.sign(userinfo, 'shhhhhh', { expiresIn: '144hr' });
        console.log(token);

        res.cookie("test", token, {
          // httpOnly:true,
          maxAge: 144 * 60 * 60 * 1000,
          httpOnly: false,
          sameSite: "None",
          secure: true
        });
        // console.log()
        // res.cookie("test","sudhansu");
        // var decoded = jwt.verify(token, 'shhhhh');
        // console.log(decoded.foo) // bar
        //  /==============/= 
        res.send({ status: true, userId: user.user_id, check: "hello" });

      } else {
        // console.log("this is error",err);
        res.send({ status: false, message: "Wrong username/password combination!" });
        //res.send({ message: "Wrong username/password combination!" });
      }
    } else {
      res.send({ message: "User doesn't exist" });
    }
  } catch (err) {
    console.log(err);
  }
});
app.post('/userData', requireLogin, async (req, res) => {
  try {
    const userId = req.userId
    // Query to fetch user data based on user ID
    const result = await db.query('SELECT username FROM users WHERE user_id = $1', [userId]);
    // Check if user data was found
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the username
    res.send({ status: true, username: result.rows[0].username });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// app.use(initializeUserProgress);

app.post("/SignUp", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  const checkcred = await db.query("SELECT * FROM users WHERE username = $1 OR email = $2", [
    username, email
  ]);
  console.log(checkcred.rowCount)
  //const user1=checkcred.rows[0];
  if (checkcred.rowCount > 0) {
    res.send({ status: 69 });
  }
  else {
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    try {
      const checkResult = await db.query("SELECT * FROM users WHERE (username, email) = ($1, $2)", [
        username, email
      ]);

      if (checkResult.rows.length > 0) {
        console.log("User already exists. Redirecting to login...");
        const user = checkResult.rows[0];
        const userinfo = {
          Uname: username,
          name: email,
          userId: user.user_id
        }
        var token = jwt.sign(userinfo, 'shhhhhh', { expiresIn: '144hr' });
        console.log(token);

        res.cookie("test", token, {
          // httpOnly:true,
          maxAge: 144 * 60 * 60 * 1000,
          httpOnly: false,
          sameSite: "None",
          secure: true
        });
        res.send({ status: true });
      } else {
        bcrypt.hash(password, saltRounds, async (err, hash) => {
          if (err) {
            console.error("Error hashing password:", err);
          } else {
            const result = await db.query(
              `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *`,
              [username, email, hash]
            );
            const user = result.rows[0];
            const userinfo = {
              Uname: username,
              name: email,
              userId: user.user_id
            }
            var token = jwt.sign(userinfo, 'shhhhhh', { expiresIn: '144hr' });

            res.cookie("test", token, {
              // httpOnly:true,
              maxAge: 144 * 60 * 60 * 1000,
              httpOnly: false,
              sameSite: "None",
              secure: true
            });
            if (err) {
              console.error("Error logging in:", err);
            } else {
              console.log("Success");
              res.send({ status: true });
            }
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
});

// Middleware function to check if user is logged in


// Define route to fetch questions  requireLogin,
app.get("/questions", requireLogin, async (req, res) => {
  console.log("Session in /questions route:", req.userId);
  try {
    // Retrieve user's ID from the session
    const userId = req.userId;
    //console.log("User ID:", userId);

    // Retrieve user's progress from the session
    // const userProgress = req.session.userProgress[userId] || {};
    // console.log("User Progress:", userProgress);

    // Retrieve the last answered question ID from the users table
    const lastAnsweredQuestionResult = await db.query(
      "SELECT last_answered_question_id FROM users WHERE user_id = $1",
      [userId]
    );
    const lastAnsweredQuestionId = lastAnsweredQuestionResult.rows[0]?.last_answered_question_id;
    //console.log("Last Answered Question ID1:", lastAnsweredQuestionId);

    // Find the next unanswered question ID, starting from the last answered question
    let nextQuestionId;
    if (lastAnsweredQuestionId !== null && lastAnsweredQuestionId !== undefined) {
      const nextQuestionResult = await db.query(
        "SELECT id FROM questions WHERE id > $1 AND id NOT IN (SELECT last_answered_question_id FROM users WHERE user_id = $2) ORDER BY id LIMIT 1",
        [lastAnsweredQuestionId, userId]
      );
      if (nextQuestionResult.rows.length > 0) {
        nextQuestionId = nextQuestionResult.rows[0].id;
      }
    } else {
      // If no last answered question ID is found, start from the first question
      const firstQuestionResult = await db.query(
        "SELECT id FROM questions ORDER BY id LIMIT 1"
      );
      if (firstQuestionResult.rows.length > 0) {
        nextQuestionId = firstQuestionResult.rows[0].id;
      }
    }
    //console.log("Next Question ID:", nextQuestionId);

    if (!nextQuestionId) {
      // If there's no next unanswered question, return an appropriate response
      //console.log("No next question found. Congratulations message sent.");
      return res.json({ message: "Congratulations! You have answered all the questions." });
    }

    // Retrieve the details of the next question from the database
    const nextQuestionResult = await db.query(
      "SELECT id, question_text, image_url FROM questions WHERE id = $1",
      [nextQuestionId]
    );
    const nextQuestion = nextQuestionResult.rows[0];
    //console.log("Next Question:", nextQuestion);

    // Send the details of the next question
    res.json(nextQuestion);
  } catch (err) {
    console.error("Error fetching next question:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});


// Add this function to update the last_correct_answer_timestamp in the users table
const updateLastCorrectAnswerTimestamp = async (userId, userAnswer) => {
  try {
    // Fetch the user's last answered question ID
    const queryResult = await db.query(
      "SELECT last_answered_question_id FROM users WHERE user_id = $1",
      [userId]
    );
    //console.log("Query Result:", queryResult.rows);

    if (queryResult.rows.length > 0) {
      const lastAnsweredQuestionId = queryResult.rows[0].last_answered_question_id;
      //console.log("Last Answered Question ID2:", lastAnsweredQuestionId);

      if (lastAnsweredQuestionId !== null && lastAnsweredQuestionId !== undefined) {
        // Fetch the correct answer for the last answered question
        const correctAnswerResult = await db.query(
          "SELECT correct_answer FROM questions WHERE id = $1",
          [lastAnsweredQuestionId]
        );
        //console.log("Correct Answer Result:", correctAnswerResult.rows);

        const correctAnswer = correctAnswerResult.rows[0].correct_answer;
        //console.log("Correct Answer:", correctAnswer);

        // Update the last_correct_answer_timestamp if the user's answer was correct
        if (userAnswer === correctAnswer) {
          await db.query(
            "UPDATE users SET last_correct_answer_timestamp = CURRENT_TIMESTAMP WHERE user_id = $1",
            [userId]
          );
          //console.log("Last correct answer timestamp updated successfully.");
        }
      }
    }
  } catch (error) {
    console.error("Error updating last_correct_answer_timestamp:", error);
    // Handle the error
  }
};

// Modify the route for handling answer submission to call the function for updating timestamp
app.post("/questions/:questionId/answer", requireLogin, async (req, res) => {
  console.log("this is called");
  const { questionId } = req.params;
  const userId = req.userId;
  console.log("USER ID2: ", userId)

  try {
    console.log("Handling answer submission...");

    const result = await db.query(
      "SELECT correct_answer FROM questions WHERE id = $1",
      [questionId]
    );
    //console.log("Query Result:", result.rows);

    const correctAnswer = result.rows[0].correct_answer;
    //console.log("Correct Answer:", correctAnswer);

    const userAnswer = req.body.answer;
    //console.log("User Answer:", userAnswer, "correct answer ", correctAnswer);

    if (userAnswer === correctAnswer) {
      // Update user progress and timestamp
      // req.session.userProgress[questionId] = true;
      await db.query(
        "UPDATE users SET last_answered_question_id = $1 WHERE user_id = $2",
        [questionId, userId]
      );
      //console.log("User progress and timestamp updated successfully.");

      // Call function to update timestamp
      await updateLastCorrectAnswerTimestamp(userId, userAnswer);
      //console.log("Last correct answer timestamp updated successfully.");

      res.send({ correct: true });
    } else {
      res.json({ correct: false });
    }
  } catch (error) {
    console.error("Error handling answer:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});


// Route to fetch leaderboard data
app.get("/Leaderboard", async (req, res) => {
  try {
    // SQL query to retrieve leaderboard data
    const query = `
      SELECT 
        username,
        last_answered_question_id,
        MIN(last_correct_answer_timestamp) AS first_correct_answer_timestamp
      FROM 
        users
      WHERE 
        last_correct_answer_timestamp IS NOT NULL
      GROUP BY 
        username, last_answered_question_id
      ORDER BY 
        last_answered_question_id DESC, 
        first_correct_answer_timestamp ASC
      LIMIT 50 
    `;

    // Execute the query
    const result = await db.query(query);

    // Assign ranks to the leaderboard entries
    const leaderboard = result.rows.map((row, index) => ({
      rank: index + 1,
      username: row.username,
      last_answered_question_id: row.last_answered_question_id,
      first_correct_answer_timestamp: row.first_correct_answer_timestamp,
    }));

    // Send the leaderboard data as a response
    res.json({ leaderboard });
  } catch (error) {
    //console.error("Error fetching leaderboard data:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});



// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});