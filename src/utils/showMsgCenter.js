import { router } from "./../routes/routes";
import Request from "./../api/api";

export function showMsgCenterEx() {
  router.push("newsCenter");
}
// export default showMsgCenterEx

export function setLoginStatus(status) {
  //status: 0离线，1在线，2忙碌
  Request.get("/api/chat/customer/status/update", {
    status: status
  }).then(res => {});
}
