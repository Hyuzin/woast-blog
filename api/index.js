import express from "express";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
import { db } from "./db.js";

const app = express();

const corsOptions = {
  origin: ["https://woast-blog-production.up.railway.app", true],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

db.connect((err) => {
  if (err) throw err;
  console.log('Database Connected')
})

app.get('/db', (req, res) => {
  db.query('SELECT 1', (err) => {
    if (err) {
      res.status(500).json({message: "Database connected"})
    } else{
      res.json({message: "Database connected"})
    }
  })
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.get("/test", (req, res) => {
  res.json({ message: "Hello, World" });
});

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server connected on port ${process.env.PORT}`);
});
