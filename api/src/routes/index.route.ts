import authRouter from "./auth.route";
import usersRouter from "./user.route";
import passport from "passport";
import productRoutes from "./product.route";
import orderRoutes from "./order.route";
import chatroomRoutes from "./chatroom.route";
import cartRoutes from "./cart.route";
import commoditiesRoutes from "./commodities.route";

export const routes = (app: any) => {
  app.use("/api/auth", authRouter);
  app.use(
    "/api/users",
    passport.authenticate("jwt", { session: false }),
    usersRouter
  );

  app.use(
    "/api/products",
    passport.authenticate("jwt", { session: false }),
    productRoutes
  );

  app.use(
    "/api/orders",
    passport.authenticate("jwt", { session: false }),
    orderRoutes
  );

  app.use(
    "/api/chatrooms",
    passport.authenticate("jwt", { session: false }),
    chatroomRoutes
  );
  app.use(
    "/api/cart",
    passport.authenticate("jwt", { session: false }),
    cartRoutes
  );
  app.use("/api/commodities", commoditiesRoutes);

  app.use("/api/ratings", passport.authenticate("jwt", { session: false }));
};
