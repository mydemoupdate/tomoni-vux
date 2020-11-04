const MenuQuy = () => import('../../views/PhanHe/Quy/Menu')
const MenuNganHang = () => import('../../views/PhanHe/NganHang/Menu')

export default [
    {
        _name: 'CSidebarNavTitle',
        _children: ['Phân hệ'],
    },
    {
        _name: 'CSidebarNavItem',
        name: 'Quỹ',
        to: '/phan-he/quy',
        icon: 'cil-folder',
        menu: MenuQuy
    },
    {
        _name: 'CSidebarNavItem',
        name: 'Ngân hàng',
        to: '/phan-he/ngan-hang',
        icon: 'cil-folder',
        menu: MenuNganHang
    },
    {
        _name: 'CSidebarNavItem',
        name: 'Mua hàng',
        to: '/phan-he/mua-hang',
        icon: 'cil-folder',
    },
    {
        _name: 'CSidebarNavItem',
        name: 'Bán hàng',
        to: '/phan-he/ban-hang',
        icon: 'cil-folder',
    },
    {
        _name: 'CSidebarNavItem',
        name: 'Kho',
        to: '/phan-he/kho',
        icon: 'cil-folder',
    },
    {
        _name: 'CSidebarNavItem',
        name: 'Thủ kho',
        to: '/phan-he/thu-kho',
        icon: 'cil-folder',
    },
    {
        _name: 'CSidebarNavItem',
        name: 'Tổng hợp',
        to: '/phan-he/tong-hop',
        icon: 'cil-folder',
    },
]
