import redaxios from "redaxios";

export default function setupCsrfToken(token) {
  const csrfToken =
    token || document.querySelector("meta[name=csrf-token]").content;

  redaxios.defaults.headers = { "X-CSRF-Token": csrfToken };
}
