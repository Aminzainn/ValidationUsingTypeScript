var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { validateSignIn } from "./validators.js";
import { mockSignIn } from "./mockBackend.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signin-form");
    const errorsDiv = document.getElementById("signin-errors");
    if (!form || !errorsDiv) {
        console.error("Sign-in form or errors div not found");
        return;
    }
    form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
        alert("Sign In button clicked!"); // Temporary for debugging
        e.preventDefault();
        errorsDiv.innerHTML = "";
        const formData = new FormData(form);
        const values = {
            email: formData.get("email"),
            password: formData.get("password"),
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
            const user = yield mockSignIn(values);
            errorsDiv.innerHTML = `<div style="color:green;">Welcome, ${user.fullName}! (Fake dashboard...)</div>`;
            form.reset();
        }
        catch (err) {
            errorsDiv.innerHTML = `<div class="error">${err.message}</div>`;
        }
    }));
});