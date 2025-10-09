const getEnv = (key:string, defaultValue?: string):string =>{
   const value = process.env[key] || defaultValue;

   if(value === undefined)  throw new Error(`Missing environement variable ${key}`);
     return value;
}
export const MONGO_URI = getEnv("MONGO_URI");
export const PORT = getEnv("PORT", "4001");
export const NODE_ENV = getEnv("NODE_ENV", "development");
export const APP_ORIGIN = getEnv("APP_ORIGIN", "http://localhost:5173/");