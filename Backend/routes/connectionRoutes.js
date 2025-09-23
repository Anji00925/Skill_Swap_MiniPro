// import express from "express";
// import {
//   sendConnectionRequest,
//   acceptConnectionRequest,
//   rejectConnectionRequest,
//   getAcceptedConnections,
// } from "../controllers/connectionController.js";

// const router = express.Router();

// router.post("/", sendConnectionRequest);
// router.put("/accept/:id", acceptConnectionRequest);
// router.put("/reject/:id", rejectConnectionRequest);
// router.get("/accepted/:userId", getAcceptedConnections);

// export default router;


import express from "express";
import {
  sendConnectionRequest,
  acceptConnectionRequest,
  rejectConnectionRequest,
  getAcceptedConnections,
  getPendingConnections,
  getSentConnections,
} from "../controllers/connectionController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/request", authMiddleware, sendConnectionRequest);
router.put("/accept/:id", authMiddleware, acceptConnectionRequest);
router.put("/reject/:id", authMiddleware, rejectConnectionRequest);

router.get("/accepted/:userId", authMiddleware, getAcceptedConnections);
router.get("/pending/:userId", authMiddleware, getPendingConnections);
router.get("/sent/:userId", authMiddleware, getSentConnections);

export default router;
