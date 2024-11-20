import Router from "src/router";

export function routerBack({path,name,params}) {
  if (window.history.length > 2) {
    Router.back();
  } else {
    Router.replace({ path:path,name:name,params:params });
  }
}
