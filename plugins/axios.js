const localStorage = require("store");

export default function({ $axios }) {
  $axios.onRequest(config => {
    config.headers.common["x-access-token"] = localStorage.get("token");
  });
}
