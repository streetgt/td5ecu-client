import { createRouter, createWebHashHistory } from 'vue-router';

import ConnectView from '../views/ConnectView.vue'
import DashboardView from '../views/DashboardView.vue'
import InputsView from '../views/InputsView.vue'
import IntakeView from '../views/IntakeView.vue'
import FuelView from '../views/FuelView.vue'
import EngineView from '../views/EngineView.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'connect',
            component: ConnectView,
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: DashboardView,
        },
        {
            path: '/inputs',
            name: 'inputs',
            component: InputsView,
        },
        {
            path: '/intake',
            name: 'intake',
            component: IntakeView,
        },
        {
            path: '/fuel',
            name: 'fuel',
            component: FuelView,
        },
        {
            path: '/engine',
            name: 'engine',
            component: EngineView,
        }
    ]           
});

export default router;
