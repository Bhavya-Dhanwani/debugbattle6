import { Router } from "express";
import cartController from "../controllers/cart.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @openapi
 * /api/cart:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Cart
 *     summary: Retrieve user's cart
 *     description: Gets the currently authenticated user's shopping cart.
 *     operationId: getCart
 *     responses:
 *       200:
 *         description: Cart fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartResponse'
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 *   post:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Cart
 *     summary: Add item to cart
 *     description: Adds a product with a specified quantity to the authenticated user's cart.
 *     operationId: addItemToCart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddCartItemDTO'
 *     responses:
 *       200:
 *         description: Item added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartResponse'
 *       401:
 *         description: Not authorized
 *       400:
 *         description: Bad request (e.g. invalid product ID or insufficient stock)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *   put:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Cart
 *     summary: Update cart item quantity
 *     description: Updates the quantity of a product in the authenticated user's cart.
 *     operationId: updateCartItem
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddCartItemDTO'
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartResponse'
 *       400:
 *         description: Bad request (e.g. invalid product ID or insufficient stock)
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Cart or product not found
 *       500:
 *         description: Server error
 * /api/cart/{productId}:
 *   delete:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Cart
 *     summary: Remove item from cart
 *     description: Removes a product from the authenticated user's cart.
 *     operationId: removeItemFromCart
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB identifier of the product to remove
 *     responses:
 *       200:
 *         description: Item removed from cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartResponse'
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Server error
 */
router.post("/", protect, cartController.addItemToCart);
router.get("/", protect, cartController.getCart);
router.put("/", protect, cartController.updateCartItem);
router.delete("/:productId", protect, cartController.removeItem);

export default router;
