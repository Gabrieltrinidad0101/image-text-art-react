const functionWait = (obj,element)=> new Promise((res)=>
    obj[element] = _=> res()
)

export default functionWait;