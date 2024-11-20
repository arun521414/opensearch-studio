import PaginationSizeSelect from "src/components/PaginationSizeSelect.vue";
import { routerBack } from "src/helpers/global-handlers";

export default (({app})=>{

  // component
  app.component('PaginationSizeSelect',PaginationSizeSelect)

  // handlers
  app.config.globalProperties.$routerBack = routerBack

})
