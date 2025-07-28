package pro.gibsonephraim.hackathon.pamflet.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pro.gibsonephraim.hackathon.pamflet.converter.CustomerConverter;
import pro.gibsonephraim.hackathon.pamflet.model.ApiLoginPostRequest;
import pro.gibsonephraim.hackathon.pamflet.model.UserModel;
import pro.gibsonephraim.hackathon.pamflet.repository.UserRepository;
import pro.gibsonephraim.hackathon.pamflet.security.JwtService;
import pro.gibsonephraim.hackathon.persistence.model.Customer;

import java.util.List;

@Service
public class UserService {
    private final CustomerConverter converter;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;


    public UserService(UserRepository userRepository, CustomerConverter converter, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.converter = converter;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public String login(ApiLoginPostRequest request) {
        Customer user = userRepository.findUserByEmail(request.getEmail())
                .orElseThrow(()-> new EntityNotFoundException("User with email:" +request.getEmail()+ "not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new AccessDeniedException("Invalid password");
        }

        return jwtService.generateToken(user.getUsername());
    }
    public UserModel register(UserModel userModel) {
        if (userRepository.existsByEmail(userModel.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }

        Customer user = converter.convert(userModel);

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        if (user.getRole() == null) {
            user.setRole("USER");
        }

        Customer newUser = userRepository.save(user);
        return converter.convert(newUser);
    }
    public List<UserModel> getAllUsers() {
        // TODO: Implement logic to fetch all users
        return List.of();
    }
    public UserModel getUserById(Long id) {
        // TODO: Implement logic to fetch user by id
        return null;
    }
    public UserModel updateUser(Long id, UserModel userModel) {
        // TODO: Implement logic to update user
        return null;
    }
    public UserModel patchUser(Long id, UserModel userModel) {
        // TODO: Implement logic to patch user
        return null;
    }
}
