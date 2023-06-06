package proyecto.tablerosandco2.domain.security;


public class LoginRequest {
    private String password;
    private String username;

    public String getPassword(){
        return this.password;
    }
    public String getUsername(){
        return this.username;
    }
    public void setUsername(String username){
        this.username = username;
    }
    public void setPassword(String password){
        this.password = password;
    }

}
