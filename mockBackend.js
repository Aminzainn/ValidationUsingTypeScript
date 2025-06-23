var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mockUsers = [
    { email: "amin@example.com", password: "password123", fullName: "Amin User" }
];
export function mockSignUp(_a) {
    return __awaiter(this, arguments, void 0, function* ({ fullName, email, password }) {
        yield new Promise(res => setTimeout(res, 700)); // Simulate network delay
        const exists = mockUsers.some(u => u.email === email);
        if (exists)
            throw new Error("Email already exists.");
        mockUsers.push({ email, password, fullName });
    });
}
export function mockSignIn(_a) {
    return __awaiter(this, arguments, void 0, function* ({ email, password }) {
        yield new Promise(res => setTimeout(res, 700));
        const user = mockUsers.find(u => u.email === email && u.password === password);
        if (!user)
            throw new Error("Invalid email or password.");
        return { fullName: user.fullName };
    });
}