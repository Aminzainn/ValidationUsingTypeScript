var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { validateSignUp } from "./validators.js";
import { mockSignUp } from "./mockBackend.js";
const form = document.getElementById("signup-form");
const errorsDiv = document.getElementById("signup-errors");
form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    errorsDiv.innerHTML = "";
    const formData = new FormData(form);
    const values = {
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
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
        yield mockSignUp(values);
        errorsDiv.innerHTML = `<div style="color:green;">Sign up successful! You can now sign in.</div>`;
        form.reset();
    }
    catch (err) {
        errorsDiv.innerHTML = `<div class="error">${err.message}</div>`;
    }
}));