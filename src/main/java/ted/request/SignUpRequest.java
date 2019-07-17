package ted.request;
import javax.validation.constraints.*;

public class SignUpRequest {

    @NotBlank
    @Size(min = 2, max = 80)
    private String firstName;

    @NotBlank
    @Size(min = 2, max = 80)
    private String lastName;

    @NotBlank
    @Size(min = 4, max = 80)
    private String username;

    @NotBlank
    @Size(min = 8, max = 45)
    private String password;

    @NotBlank
    @Size(max = 80)
    @Email
    private String email;

    public String getFirstName() { return firstName; }

    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }

    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getUsername() { return username; }

    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }

    public void setPassword(String password) { this.password = password; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }
}