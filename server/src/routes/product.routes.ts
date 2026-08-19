import { Router } from "express";
import productController from "../controllers/product.controller";
import { protect, adminOnly } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @openapi
 * /api/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get all products
 *     description: Retrieve a list of products, optionally filtered by category or search term.
 *     operationId: getAllProducts
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter products by category name
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search query for product name or description
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductListResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   post:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Products
 *     summary: Create a new product (Admin Only)
 *     description: Adds a new product to the catalog.
 *     operationId: createProduct
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductDTO'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Forbidden (Admin only)
 *       500:
 *         description: Server error
 */
router.get("/", productController.getAllProducts);

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get product by ID
 *     description: Retrieves a single product by its MongoDB ObjectID.
 *     operationId: getProductById
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB identifier of the product
 *     responses:
 *       200:
 *         description: Product fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       404:
 *         description: Product not found
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
 *       - Products
 *     summary: Update product by ID (Admin Only)
 *     description: Updates specified fields for an existing product.
 *     operationId: updateProduct
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB identifier of the product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProductDTO'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Forbidden (Admin only)
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 *   delete:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Products
 *     summary: Delete product by ID (Admin Only)
 *     description: Removes a product from the database.
 *     operationId: deleteProduct
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB identifier of the product
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteProductResponse'
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Forbidden (Admin only)
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.get("/:id", productController.getProductById);
router.post("/", protect, adminOnly, productController.createProduct);
router.put("/:id", protect, adminOnly, productController.updateProduct);
router.delete("/:id", protect, adminOnly, productController.deleteProduct);

export default router;
