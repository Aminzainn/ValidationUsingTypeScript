import { SignInFormState } from "./types.js";
import { validateSignIn } from "./validators.js";
import { mockSignIn } from "./mockBackend.js";

const form = document.getElementById("signin-form") as HTMLFormElement;
const errorsDiv = document.getElementById("signin-errors") as HTMLDivElement;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorsDiv.innerHTML = "";
  const formData = new FormData(form);
  const values: SignInFormState = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const errors = validateSignIn(values);
  if (Object.keys(errors).length > 0) {
    for (const key in errors) {
      errorsDiv.innerHTML += `<div class="error">${errors[key]}</div>`;
    }
    return;
  }
  try {
    errorsDiv.innerHTML = `<div>Signing in...</div>`;
    const user = await mockSignIn(values);
    errorsDiv.innerHTML = `<div style="color:green;">Welcome, ${user.fullName}! (Fake dashboard...)</div>`;
    form.reset();
  } catch (err: any) {
    errorsDiv.innerHTML = `<div class="error">${err.message}</div>`;
  }
});