class DateUtil{
   public static  oneYearFromNow = (): Date => {
      return new Date(
         Date.now() + 365 * 24 * 60 * 60 * 1000
      )
 }
 public static  thirtyDaysFromNow = (): Date => {
      return new Date(
         Date.now() + 365 * 24 * 60 * 60 * 1000
      )
 }
}

export default DateUtil