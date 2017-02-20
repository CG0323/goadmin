
export interface Student {
    teacher: string;
    name: string;
    username: string;
    password: string;  //display initial password set by admin, once changed by teacher himself, this field will be "已被修改"
    expired_at: Date
}