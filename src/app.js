import express from 'express';
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import { create } from 'express-handlebars';
import route from './routes/index.js';
import session from 'express-session';

const app = express()
const port = 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Kết nối MongoDB
connectDB();

// Tạo một instance của Handlebars với `create()`
const hbs = create({
  extname: '.handlebars',
  helpers: {
    json: function (context) {
      return JSON.stringify(context);
    },
    join: function (array, separator) {
      return array ? array.join(separator) : '';
    },
    eq: function (v1, v2) {
      return v1 === v2;
    },
    times: function (n, block) {
      let accum = '';
      for (let i = 0; i < n; ++i) {
        accum += block.fn(i);
      }
      return accum;
    }
  },
  eq: function (v1, v2) {
    return v1 === v2;
  },
  times: function (n, block) {
    let accum = '';
    for (let i = 0; i < n; ++i) {
      accum += block.fn(i);
    }
    return accum;
  },
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  }
});

// Set up Handlebars làm template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24 giờ
  }
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});


// Cấu hình Express để phục vụ các file tĩnh từ thư mục 'public'
app.use(cors({
  origin: "*"
}));
app.use(express.static(path.join('public')));

// Lấy Data được gửi lên từ input phía client
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'resources', 'views'));

app.listen(port, () => {
  console.log(`Website đang chạy tại http://localhost:${port} 🚀`);
});

// Route các trang chính
route(app);



