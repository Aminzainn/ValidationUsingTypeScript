export function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
export function validateSignUp(values) {
    const errors = {};
    if (!values.fullName.trim())
        errors.fullName = "Full name is required.";
    if (!values.email)
        errors.email = "Amin's email is required.";
    else if (!validateEmail(values.email))
        errors.email = "Invalid format for Amin's email.";
    if (!values.password)
        errors.password = "Password is required.";
    else if (values.password.length < 8)
        errors.password = "Password must be at least 8 characters.";
    if (!values.confirmPassword)
        errors.confirmPassword = "Please confirm your password.";
    else if (values.password !== values.confirmPassword)
        errors.confirmPassword = "Passwords do not match.";
    return errors;
}
export function validateSignIn(values) {
    const errors = {};
    if (!values.email)
        errors.email = "Amin's email is required.";
    else if (!validateEmail(values.email))
        errors.email = "Invalid format for Amin's email.";
    if (!values.password)
        errors.password = "Password is required.";
    return errors;
}