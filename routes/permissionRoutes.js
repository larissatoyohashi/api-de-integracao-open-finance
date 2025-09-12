import express from "express";
const permissionRoutes = express.Router();
import permissionController from "../controllers/permissionController.js";

permissionRoutes.get("/permissions", permissionController.getAllPermissions);

permissionRoutes.post("/permissions", permissionController.createPermission)

export default permissionRoutes