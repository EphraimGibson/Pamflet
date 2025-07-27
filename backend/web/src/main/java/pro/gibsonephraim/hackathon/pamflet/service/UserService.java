package pro.gibsonephraim.hackathon.pamflet.service;

import org.springframework.stereotype.Service;
import pro.gibsonephraim.hackathon.pamflet.model.ApiLoginPostRequest;
import pro.gibsonephraim.hackathon.pamflet.model.UserModel;
import java.util.List;

@Service
public class UserService {
    public Void login(ApiLoginPostRequest request) {
        // TODO: Implement login logic
        return null;
    }
    public UserModel register(UserModel userModel) {
        // TODO: Implement registration logic
        return null;
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

