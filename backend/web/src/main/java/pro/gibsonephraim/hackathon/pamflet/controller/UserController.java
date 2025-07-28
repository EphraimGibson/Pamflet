package pro.gibsonephraim.hackathon.pamflet.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import pro.gibsonephraim.hackathon.pamflet.api.UserApi;
import pro.gibsonephraim.hackathon.pamflet.model.ApiLoginPostRequest;
import pro.gibsonephraim.hackathon.pamflet.model.UserModel;
import pro.gibsonephraim.hackathon.pamflet.service.UserService;

import java.util.List;

@RestController
public class UserController implements UserApi {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Override
    public ResponseEntity<String> apiLoginPost(ApiLoginPostRequest apiLoginPostRequest) {
        String token = userService.login(apiLoginPostRequest);
        return ResponseEntity.ok(token);
    }

    @Override
    public ResponseEntity<UserModel> apiRegisterPost(UserModel userModel) {
        return ResponseEntity.ok(userService.register(userModel));
    }

    @Override
    public ResponseEntity<List<UserModel>> apiUserGet() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @Override
    public ResponseEntity<UserModel> apiUserIdGet(Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @Override
    public ResponseEntity<UserModel> apiUserIdPatch(Long id, UserModel userModel) {
        return ResponseEntity.ok(userService.patchUser(id, userModel));
    }

    @Override
    public ResponseEntity<UserModel> apiUserIdPut(Long id, UserModel userModel) {
        return ResponseEntity.ok(userService.updateUser(id, userModel));
    }
}
