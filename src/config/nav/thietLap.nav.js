const MenuHTTK = () => import('@/views/DanhMuc/HTTK/Menu')
// const MenuCCDC = () => import('@/views/DanhMuc/CCDC/Menu')
const MenuDoiTuong = () => import('@/views/DanhMuc/DoiTuong/Menu')
// const MenuLoaiCCDC = () => import('@/views/DanhMuc/LoaiCCDC/Menu')
// const MenuLoaiTSCD = () => import('@/views/DanhMuc/LoaiTSCD/Menu')

export default [
    {
        _name: 'CSidebarNavTitle',
        _children: ['Thiết lập'],
    },
    {
        _name: 'CSidebarNavDropdown',
        name: 'Danh mục',
        to: '/danh-muc',
        icon: 'cil-folder',
        items: [
            {
                name: 'HTTK',
                to: '/danh-muc/httk',
                menu: MenuHTTK,
            },
            {
                name: 'Cơ cấu tổ chức',
                to: '/danh-muc/cctc',
                // menu: MenuCCDC,
            },
            {
                name: 'Đối tượng',
                to: '/danh-muc/doi-tuong',
                menu: MenuDoiTuong,
            },
            {
                name: 'Loại CCDC',
                to: '/danh-muc/loai-ccdc',
                // menu: MenuLoaiCCDC,
            },
            {
                name: 'Loại TSCD',
                to: '/danh-muc/loai-tscd',
                // menu: MenuLoaiTSCD,
            },
            {
                name: 'Vật tư hàng hóa',
                to: '/danh-muc/vthh',
            },
            {
                name: 'Khoản mục chi phí',
                to: '/danh-muc/kmcp',
            },
            {
                name: 'Ngân hàng',
                to: '/danh-muc/ngan-hang',
            },
            {
                name: 'Khác',
                to: '/danh-muc/khac',
            },
        ],
    },
]