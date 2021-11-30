import { environment }from '../../environments/environment'; 

export class AppConfig{
   /*
    * production AWS API URL: https://api.mtoca.net:8080
    * developments localhost api uri: http://localhost:8080
    */
   public static API_URL: string = environment.apiUrl;
}