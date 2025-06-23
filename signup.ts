import { SignUpFormState } from "./types.js";
import { validateSignUp } from "./validators.js";
import { mockSignUp } from "./mockBackend.js";

const form = document.getElementById("signup-form") as HTMLFormElement;
const errorsDiv = document.getElementById("signup-errors") as HTMLDivElement;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorsDiv.innerHTML = "";
  const formData = new FormData(form);
  const values: SignUpFormState = {
    fullName: formData.get("fullName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };
  const errors = validateSignUp(values);
  if (Object.keys(errors).length > 0) {
    for (const key in errors) {
      errorsDiv.innerHTML += `<div class="error">${errors[key]}</div>`;
    }
    return;
  }
  try {
    errorsDiv.innerHTML = `<div>Signing up...</div>`;
    await mockSignUp(values);
    errorsDiv.innerHTML = `<div style="color:green;">Sign up successful! You can now sign in.</div>`;
    form.reset();
  } catch (err: any) {
    errorsDiv.innerHTML = `<div class="error">${err.message}</div>`;
  }
});