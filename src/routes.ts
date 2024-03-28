export const routes = [
    {
        path: '/',
        children: [
            {
                path: '/',
                component: 'my-element',
                action: async () => import('./counter-element.js')
            },
            {
                path: '/counter',
                component: 'my-element',
                action: async () => import('./counter-element.js')
            },
            {
                path: '/todo-application',
                component: 'todo-element',
                action: async () => import('./todo-element.js')
            },
            {
                path: '/stopwatch-application',
                component: 'stopwatch-element',
                action: async () => import('./stopwatch-element.js')
            }
        ]
    }
]