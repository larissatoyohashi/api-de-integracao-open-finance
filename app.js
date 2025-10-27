import express from "express";
import mongoose from "mongoose";
import accountRoutes from "./routes/accountRoutes.js"
import customerRoutes from "./routes/customerRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js"
import permissionRoutes from "./routes/permissionRoutes.js"


const app = express();

app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use('/',customerRoutes);
app.use('/',accountRoutes);
app.use('/',transactionRoutes);
app.use('/',permissionRoutes)

app.get('/', (req, res) => { res.json({ status: 'API está rodando' });});


mongoose.connect("mongodb://127.0.0.1:27017/api");

const port = process.env.PORT || 4000;
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`API rodando em http://localhost:${port}.
        `);
});