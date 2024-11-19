
import {models,modelGroups} from '../modules'

let moduleList = []

export default (({router})=>{

  router.addRoute('Home', models.routes)
  moduleList.push(models)

  router.addRoute('Home', modelGroups.routes)
  moduleList.push(modelGroups)

})

export {
  moduleList
}
