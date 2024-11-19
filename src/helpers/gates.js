class Gates {

  static #permissions = []

  static setPermission(key){
    Gates.#permissions.push(key)
  }

  static hasPermission(key){
    return !!Gates.#permissions.find((val)=>val==key) ? true : false
  }

  static getAllPermissions(){
    return Gates.#permissions
  }

  static clearAllPermissions(){
    Gates.#permissions = []
  }

}

export default Gates;
