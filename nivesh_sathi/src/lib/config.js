const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const ML_URL = process.env.NEXT_PUBLIC_ML_API_URL;

console.log("BACKEND_URL =", BACKEND_URL);
console.log("ML_URL =", ML_URL);

export const API = {
  BACKEND: BACKEND_URL,
  ML: ML_URL,

  AUTH: {
    LOGIN: `${BACKEND_URL}/api/auth/login`,
    SIGNUP: `${BACKEND_URL}/api/auth/signup`,
    GOOGLE: `${BACKEND_URL}/api/auth/google`,
  },

  AI: {
    RECOMMEND: `${ML_URL}/predict`,
  },

  GROQ: {
    URL: process.env.GROQ_API_URL,
    MODEL: process.env.GROQ_MODEL,
  },
};