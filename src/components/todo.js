import fire from "./fire"

export function Save({ currentWeight , targetWeight , set__Msg__ , setWeightData}){
    const getUid = fire.auth().getUid()
    if(getUid){
        const todo = fire.database().ref(getUid) , 
        d = {
            date : Date.now(),
            currentWeight,
            targetWeight 
          }
          todo.push(d,e=>{
              if(set__Msg__){
                set__Msg__(e?.message ? e?.message : <span style={{color:'green'}}>Successfully submitted</span>)
              }
            if(setWeightData){ setWeightData({
                 currentWeight: '' , targetWeight : ''
              })}

          })
      }else if(set__Msg__){
          set__Msg__("You are not signin")
      }
}

export function Fetch(setEntries){
    const getUid = fire.auth().getUid()
    if(getUid){
        const todo = fire.database().ref(getUid)
        todo.on('value',(d)=>{
            if('function'===typeof setEntries){
                let e = Object.entries(d.val() || {})
                 setEntries(e)
            }
        })
    }
}

export function Delete(id){
    const getUid = fire.auth().getUid()
    if(getUid){
      fire.database().ref(getUid).child(id).remove()
    }
}

export function Update(id,payload={},cb){
    const getUid = fire.auth().getUid()
    if(getUid){  
        fire.database().ref(getUid)
        .child(id).update({
            date : Date.now(),
            ...payload
        },e=>{
           'function'===typeof cb && cb(e)
        })
    }
    
}

