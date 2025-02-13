import express from 'express';
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import { create } from 'express-handlebars';
import Handlebars from 'express-handlebars';
import homeRoutes from "./routes/homeRoutes.js";


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
      }
    },
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,  // Cho phép truy cập vào các thuộc tính của prototype
      allowProtoMethodsByDefault: true,     // Cho phép truy cập vào các phương thức của prototype
    }
});

// Cấu hình Express để phục vụ các file tĩnh từ thư mục 'public'
app.use(cors({
    origin: "*"
}));
app.use(express.static(path.join('public')));
// Set up Handlebars làm template engine
app.engine(
    'handlebars',
    Handlebars.engine({
        extname: '.handlebars',
        helpers: {
            times: function (n, block) {
                let accum = '';
                for (let i = 0; i < n; ++i) {
                    accum += block.fn(i);
                }
                return accum;
            }
        }
    })
);

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.listen(port, () => {
    console.log(`Website đang chạy tại http://localhost:${port} 🚀`);
});

app.use("/", homeRoutes);

// Route login
app.get('/login', async (req, res) => {
  try {
    
    res.render('login', { layout: false });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Server Error');
  }
});


