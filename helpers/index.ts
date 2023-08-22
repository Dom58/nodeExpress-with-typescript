export function performHttpRequest(url: any, method: any, payload: any, successMsg = "success", errorMsg = "error") {
  fetch(url, {
    method: method,
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(successMsg, data);
    })
    .catch((error) => {
      console.error(errorMsg, error);
    });
}
