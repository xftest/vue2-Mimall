import Mock from "mockjs";

// Mock.mock("/api/user/login", {
//     status: 0,
//     data: {
//         list: [{
//                 "id|0-10": 0,
//                 resourceType: "0",
//                 deptName: "研发中心",
//                 isDefault: "0",
//                 username: "@cname",
//             },
//             {
//                 "id|11-20": 0,
//                 resourceType: "0",
//                 deptName: "运行管理中心",
//                 isDefault: "1",
//                 username: "@cname",
//             },
//         ],
//         age: 18,
//     },
// });

// 生成二维数组
const getRandomList = function() {
    return new Array(Math.floor(Math.random() * 5 + 1)).fill("").map(() => {
        return new Array(4).fill("").map(() => {
            return Mock.mock({
                img: "/imgs/item-box-@natural(1, 4).jpg",
                name: "小米C@natural(1,200)",
                id: "@natural(1,1000)",
            });
        });
    });
};

const menuList = [
    "手机 电话卡",
    "电视 盒子",
    "笔记本 平板",
    "家电 插线板",
    "出行 穿戴",
    "智能 路由器",
    "电源 配件",
    "生活 箱包",
];
Mock.mock("/api/getMenuList", {
    status: 0,
    data: {
        menuList: menuList.map((item) => ({ name: item, list: getRandomList() })),
    },
});

Mock.mock("/api/getSliderList", {
    status: 0,
    data: {
        "list|5": [{
            id: "@natural(1,200)",
            img: "/imgs/slider/slide-@natural(1,5).jpg",
        }, ],
    },
});