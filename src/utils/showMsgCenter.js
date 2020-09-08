import { router } from "./../routes/routes";
function showMsgCenterEx() {
  console.log('yemiantiaozhuan')
  // window.location.href = "/newsCenter";
  router.push("newsCenter");
};
export default showMsgCenterEx