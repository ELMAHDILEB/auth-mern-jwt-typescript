import bcrypt from "bcrypt";
class BcryptUtil {
    public static async hashValue  (value: string, saltRounds?: number){
        return bcrypt.hash(value, saltRounds || 10);
    }
    public static async compareValue (value: string, hashedValue: string){
        return bcrypt.compare(value, hashedValue).catch(()=> false);
  }
}

export default BcryptUtil;
