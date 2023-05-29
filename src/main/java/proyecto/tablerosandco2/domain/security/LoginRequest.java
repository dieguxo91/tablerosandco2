package proyecto.tablerosandco2.domain.security;

import lombok.*;


public class LoginRequest {
    private String password;
    private String email;

    public String getPassword(){
        return this.password;
    }
    public String getEmail(){
        return this.email;
    }
    public void setEmail(String email){
        this.email = email;
    }
    public void setPassword(String password){
        this.password = password;
    }

}
