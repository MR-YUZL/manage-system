import api from "@/api/analysis";
export function getSkill(){
    let promise = new Promise((resolve,reject)=>{
        api.sessionServiceGroups().then(res=>{
            resolve(res.data.list);
        });
    })
    return promise
}
export default {getSkill}