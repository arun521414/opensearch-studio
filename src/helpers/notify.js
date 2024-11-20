import { Notify } from "quasar";

Notify.setDefaults({
  position: 'top-right',
  timeout: 2500,
  textColor: 'white'
})

export function successNotify(successMsg) {
  Notify.create({
    type: "positive",
    message: successMsg,
    timeout: 2000,
  });
}

export function errorNotify(errorMsg) {
  Notify.create({
    type: "negative",
    message: errorMsg,
    timeout: 2000,
  });
}

