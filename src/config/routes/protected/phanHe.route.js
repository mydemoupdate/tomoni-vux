const PhieuThu = () => import('@/views/PhanHe/Quy/PhieuThu/Index')
const PhieuChi = () => import('@/views/PhanHe/Quy/PhieuChi/Index')
const PhieuThuNganHang = () => import('@/views/PhanHe/NganHang/PhieuThu/Index')
const PhieuChiNganHang = () => import('@/views/PhanHe/NganHang/PhieuChi/Index')

export default [
    {
        path: 'phan-he',
        meta: {
            label: 'Phân hệ'
        },
        component: {
            render(c) { return c('router-view') }
        },
        children: [
            {
                path: 'quy',
                name: 'Quỹ',
                redirect: 'quy/phieu-thu',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [
                    {
                        path: 'phieu-thu',
                        name: 'Phiếu thu',
                        component: PhieuThu,
                    },
                    {
                        path: 'phieu-chi',
                        name: 'Phiếu chi',
                        component: PhieuChi,
                    },
                ],
            },
            {
                path: 'ngan-hang',
                name: 'Ngân hàng',
                redirect: 'ngan-hang/phieu-thu',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [
                    {
                        path: 'phieu-thu',
                        name: 'Phiếu thu',
                        component: PhieuThuNganHang,
                    },
                    {
                        path: 'phieu-chi',
                        name: 'Phiếu chi',
                        component: PhieuChiNganHang,
                    }
                ],
            },
            {
                path: 'mua-hang',
                name: 'Mua hàng',
            },
            {
                path: 'ban-hang',
                name: 'Bán hàng',
            },
            {
                path: 'kho',
                name: 'Kho',
            },
            {
                path: 'thu-kho',
                name: 'Thủ kho',
            },
            {
                path: 'tong-hop',
                name: 'Tổng hợp',
            },
        ],
    },
]