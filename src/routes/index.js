import express from 'express'
import authRoutes from "./auth.route.js"
import successListRoutes from './successList.route.js'

const router = express.Router();

const routes = [
    {
        path: '/auth',
        route: authRoutes,
    },
    {
        path: '/success-list',
        route: successListRoutes,
    }
];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router
