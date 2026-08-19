import { Request, Response, NextFunction } from "express";
import cartService from "../services/cart.service";
import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";

class CartController {
  async addItemToCart(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new ApiError(401, "Not authorized");
      const cart = await cartService.addItemToCart(req.user.id, req.body);
      res.status(200).json(new ApiResponse(200, cart, "Item added to cart successfully"));
    } catch (error) {
      next(error);
    }
  }

  async getCart(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new ApiError(401, "Not authorized");
      const cart = await cartService.getCart(req.user.id);
      const data = cart ?? { items: [] };
      res.status(200).json(new ApiResponse(200, data, "Cart fetched successfully"));
    } catch (error) {
      next(error);
    }
  }

  async updateCartItem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new ApiError(401, "Not authorized");
      const { productId, quantity } = req.body;
      const cart = await cartService.updateCartItem(req.user.id, productId, quantity);
      res.status(200).json(new ApiResponse(200, cart, "Cart item updated successfully"));
    } catch (error) {
      next(error);
    }
  }

  async removeItem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new ApiError(401, "Not authorized");
      const { productId } = req.params;
      const cart = await cartService.removeItemFromCart(req.user.id, productId);
      res.status(200).json(new ApiResponse(200, cart, "Item removed from cart successfully"));
    } catch (error) {
      next(error);
    }
  }
}

export default new CartController();
