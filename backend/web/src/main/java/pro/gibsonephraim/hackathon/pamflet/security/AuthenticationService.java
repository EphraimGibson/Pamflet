package pro.gibsonephraim.hackathon.pamflet.security;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pro.gibsonephraim.hackathon.pamflet.repository.UserRepository;
import pro.gibsonephraim.hackathon.persistence.model.Customer;


@Service
public class AuthenticationService {
    UserRepository userRepository;

    public AuthenticationService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String getUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    public Customer getCustomer(){
        return userRepository.findCustomerByUsername(this.getUsername())
                .orElseThrow(() -> new EntityNotFoundException("Authenticated user not found"));
    }

}
