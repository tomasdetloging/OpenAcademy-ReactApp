//helpers
import Alerts from "helpers/Alerts";
import DB from "helpers/db";

//store
import store from "store";
import { replace } from "connected-react-router/lib/actions";
import { setUserData } from "store/userData_store/actions";
import { replacePayReports } from "store/pay_reports_store/actions";

//models
import Model_admin from "_models";

//config
import { myRoutes } from "config";
import { reset } from "store/app_store/actions";

class Controller_admin {
  constructor() {
    this.alerts = new Alerts();
    this.db = new DB();
    this.modeladmin = new Model_admin();
  }

  /*!
  =========================================================
  * 
  =========================================================
  */

  initApp() {
    if (!store.getState().app.isBeenLoadedMainData) {
      this.modeladmin.loadMainData(
        (data) => {
          //store.dispatch(setNotifications(data.notifications));
          // store.dispatch(setUsers(data.users));
          store.dispatch(replacePayReports(data.pay_reports));
          store.dispatch(setUserData(data.user_data));
        },
        (error) => this.errorsHandler(error, () => this.initApp(), true)
      );
    }
  }

  /*!
  =========================================================
  * 
  =========================================================
  */

  clearData = () => {
    store.dispatch(replace(myRoutes.login));
    store.dispatch(reset());

    new DB().clear();
  };

  /*!
  =========================================================
  * 
  =========================================================
  */

  errorsHandler = (error, retryHandler, isStrict) => {
    console.error("%c Error > %c", "background:red; color:white", "", error);

    if (error.isAxiosError) {
      if (error.response) {
        if (error.response.status === 422) {
          Object.entries(error.response.data).forEach((error) => {
            error[1].forEach((msg) => {
              switch (msg) {
                case "error-unexist-email":
                  return this.alerts.showAlert(
                    "Revise el correo electrónico ingresado...",
                    "Correo electrónico no encontrado!",
                    true,
                    (e) => {
                      document.getElementById("input-email").focus();
                    }
                  );

                case "error-already-exist-email":
                  return this.alerts.showAlert(
                    "Ingrese otro correo...",
                    "Correo electrónico ya registrado!",
                    true,
                    (e) => {
                      document.getElementById("input-email").focus();
                    }
                  );

                case "error-already-exist-username":
                  return this.alerts.showAlert(
                    "Ingrese otro nombre...",
                    "nombre de cuenta ya registrado!",
                    true,
                    (e) => {
                      document.getElementById("input-username").focus();
                    }
                  );

                default:
                  return this.alerts.showAlert("Revise los datos ingresados");
              }
            });

            // return this.alerts.showAlert("Revise los datos ingresados :P");
          });
        } else if (error.response.status === 406) {
          return this.alerts.showWarning("Contraseña incorrecta");
        } else if (error.response.status === 401) {
          return this.alerts.showWarning(
            "Deve volver a iniciar sesión",
            "Ups... Su sesión caducó",
            true,
            () => {
              this.clearData();
            }
          );
        } else {
          return this.alerts.showErrorUnknow(retryHandler, isStrict);
        }
      } else {
        return this.alerts.showErrorConexion(retryHandler, isStrict);
      }
    } else {
      return this.alerts.showErrorUnknow(retryHandler, isStrict);
    }
  };
}

export default Controller_admin;
