// 支付方式
export const PAY_TYPE = {
    ALIPAY: 1, //支付宝支付
    WX: 2, // 微信支付
};

// 用户行为
export const USER_ACTION = {
    CREATE: 0, // 新增
    EDIT: 1, //编辑
    DELETE: 2, //删除
};

// 付款状态
export const PAY_STATUS = {
    CANCELLED: 0, // 已取消
    UNPAID: 10, // 未支付
    SUCCESS: 20, // 已付款
    SHIPPED: 40, // 已发货
    SUCCESSFUL_TRADE: 50, // 交易成功
    TRANSACTIONCLOSE: 60, // 交易关闭
};