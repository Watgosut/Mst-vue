import request from "@/request/request";

export function create(numVertices) {
    return request({
        url: "/prim",
        method: "post",
        data:{
            'numVertices':numVertices
        }
    });
}