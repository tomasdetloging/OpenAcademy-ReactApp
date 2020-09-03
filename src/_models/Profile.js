import { apiUrl } from "config";

import axios from "axios";
import DB from "helpers/db";

class Model_Profile {
  constructor() {
    this.db = new DB();
    this.axios = axios;
  }

  /* =========================================================
   *
   * ========================================================= */

  getProfile = (user_name, _success, _error) => {
    this.axios({
      method: "get",
      url: apiUrl + "/profile?user_name=" + user_name,
      headers: {
        "Content-Type": "application/json",
        "api-token": this.db.get("api-token"),
      },
    })
      .then((response) => {
        _success(response.data);
      })
      .catch((error) => {
        _error(error);
      });
  };

  /* =========================================================
   *
   * ========================================================= */

  uploadPic = (blob, onUploadProgress, _success, _error) => {
    var formData = new FormData();
    formData.append("blob", blob);

    this.axios({
      method: "post",
      url: apiUrl + "/user_pic",
      headers: {
        "api-token": this.db.get("api-token"),
      },
      data: formData,
      onUploadProgress,
    })
      .then((response) => {
        setTimeout(() => {
          _success(response);
        }, 500);
      })
      .catch((error) => {
        _error(error);
      });
  };

  /* =========================================================
   *
   * ========================================================= */

  deletePic = (_success, _error) => {
    this.axios({
      method: "delete",
      url: apiUrl + "/user_pic",
      headers: {
        "Content-Type": "application/json",
        "api-token": this.db.get("api-token"),
      },
    })
      .then((response) => {
        setTimeout(() => {
          _success(response);
        }, 100);
      })
      .catch((error) => {
        _error(error);
      });
  };

  /* =========================================================
   *
   * ========================================================= */

  getUserData = (_success, _error) => {
    this.axios({
      method: "get",
      url: apiUrl + "/user_data",
      headers: {
        "api-token": this.db.get("api-token"),
      },
    })
      .then((response) => {
        _success(response);
      })
      .catch((error) => {
        _error(error);
      });
  };

  /* =========================================================
   *
   * ========================================================= */

  updateUserData = (data, _success, _error) => {
    this.axios({
      method: "post",
      url: apiUrl + "/user_data",
      headers: {
        "Content-Type": "application/json",
        "api-token": this.db.get("api-token"),
      },
      data: data,
    })
      .then((response) => {
        setTimeout(() => {
          _success(response);
        }, 100);
      })
      .catch((error) => {
        _error(error);
      });
  };
}

export default Model_Profile;
