package proyecto.tablerosandco2.domain.security;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginRequest {
    private String password;
    private String email;
}
