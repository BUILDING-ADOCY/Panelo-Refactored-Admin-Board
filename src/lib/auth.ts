import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNjEyOWNhZWMtOWY5ZC00YzhkLWIyYzYtZTY4NTlmZDkyMzgzIiwidGVuYW50X2lkIjoiMDhkYWZiNzllNTRlYzA1NTVjMTUxN2QzNzU4NDllY2JhODIxZGJkYzliOWUzZWUyYmQ1ZjhlMzUzY2Q5ZmNhZCIsImludGVybmFsX3NlY3JldCI6IjUyZmYwYTA4LTBiMzMtNGIzYy05NDQ3LTc3NTA3NWEyNzMxMCJ9.xy2h97TGmFJ8Dd5AF6uVRo14tyui9_duqfm8RmUjkL4"; 

export function generateToken(user: { id: string; email: string; role: string }) {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
  }

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}