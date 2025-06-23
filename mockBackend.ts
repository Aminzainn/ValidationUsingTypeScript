import { SignUpFormState, SignInFormState } from "./types.js";

const mockUsers: { email: string; password: string; fullName: string }[] = [
  { email: "amin@example.com", password: "password123", fullName: "Amin User" }
];

export async function mockSignUp({ fullName, email, password }: SignUpFormState): Promise<void> {
  await new Promise(res => setTimeout(res, 700)); // Simulate network delay
  const exists = mockUsers.some(u => u.email === email);
  if (exists) throw new Error("Email already exists.");
  mockUsers.push({ email, password, fullName });
}

export async function mockSignIn({ email, password }: SignInFormState): Promise<{ fullName: string }> {
  await new Promise(res => setTimeout(res, 700));
  const user = mockUsers.find(u => u.email === email && u.password === password);
  if (!user) throw new Error("Invalid email or password.");
  return { fullName: user.fullName };
}