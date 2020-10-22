import redaxios from "redaxios";

export default function setupCsrfToken() {
  const csrfToken = document.querySelector("meta[name=csrf-token]").content;

  redaxios.defaults.headers = { "X-CSRF-Token": csrfToken };
}
