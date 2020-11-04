// Tài khoản
const HTTK = () => import('@/views/DanhMuc/HTTK/Index')

// Cơ cấu tổ chức
// const PhongBan = () => import('@/views/DanhMuc/CCDC/PhongBan/Index')

// Đối tượng
const DoiTuong = () => import('@/views/DanhMuc/DoiTuong/Index')

// Loại CCDC
// const LoaiCCDC = () => import('@/views/DanhMuc/LoaiCCDC/Index')
// Loại TSCD
// const LoaiTSCD = () => import('@/views/DanhMuc/LoaiTSCD/Index')

export default [
    {
        path: 'danh-muc',
        meta: {
            label: 'Danh mục'
        },
        component: {
            render(c) { return c('router-view') }
        },
        children: [
            {
                path: 'httk',
                name: 'Hệ thống tài khoản',
                component: HTTK
            },
            {
                path: 'cctc',
                name: 'Cơ cấu tổ chức',
                redirect: 'cctc/phong-ban',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [
                    {
                        path: 'phong-ban',
                        name: 'Phòng ban',
                        // component: PhongBan,
                    },
                ],
            },
            {
                path: 'doi-tuong',
                name: 'Đối tượng',
                component: DoiTuong,
            },
            {
                path: 'loai-ccdc',
                name: 'Loại CCDC',
                // component: LoaiCCDC
            },
            {
                path: 'loai-tscd',
                name: 'Loại TSCD',
                // component: LoaiTSCD
            },
            {
                path: 'vthh',
                name: 'Vật tư hàng hóa',
            },
            {
                path: 'kmcp',
                name: 'Khoản mục chi phí',
            },
            {
                path: 'ngan-hang',
                name: 'Ngân hàng',
            },
            {
                path: 'khac',
                name: 'Khác',
            },
        ]
    },
]