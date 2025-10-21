class AuthEnv {
   public static MONGO_URI: string = process.env.MONGO_URI || "";
   public static PORT: string | undefined = process.env.PORT || undefined;
   public static NODE_ENV: string  | undefined= process.env.NODE_ENV || undefined;
   public static APP_ORIGIN: string  | undefined= process.env.APP_ORIGIN || undefined;
   public static JWT_REFRESH_SECRET: string | undefined= process.env.JWT_REFRESH_SECRET || "";
   public static JWT_ACCESS_SECRET: string | undefined= process.env.JWT_ACCESS_SECRET || "";
}

export default AuthEnv;