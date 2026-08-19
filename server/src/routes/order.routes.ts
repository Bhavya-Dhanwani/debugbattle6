import { Router } from "express";
import orderController from "../controllers/order.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @openapi
 * /api/orders:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Orders
 *     summary: Retrieve user's order history
 *     description: Gets all orders placed by the authenticated user.
 *     operationId: getOrderHistory
 *     responses:
 *       200:
 *         description: Order history fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderListResponse'
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 *   post:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Orders
 *     summary: Place an order
 *     description: Creates a new order using the current items in the user's cart, and clears the cart.
 *     operationId: placeOrder
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       401:
 *         description: Not authorized
 *       400:
 *         description: Bad request (e.g. cart is empty)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 */
router.post("/", protect, orderController.placeOrder);
router.get("/", protect, orderController.getOrderHistory);

export default router;
