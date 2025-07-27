package pro.gibsonephraim.hackathon.pamflet.controller;

import org.springframework.http.ResponseEntity;
import pro.gibsonephraim.hackathon.pamflet.api.UserApi;
import pro.gibsonephraim.hackathon.pamflet.model.ApiLoginPostRequest;
import pro.gibsonephraim.hackathon.pamflet.model.UserModel;
import pro.gibsonephraim.hackathon.pamflet.service.UserService;

import java.util.List;

public class UserController implements UserApi {
    private final UserService userService = new UserService();
    @Override
    public ResponseEntity<Void> apiLoginPost(ApiLoginPostRequest apiLoginPostRequest) {
        userService.login(apiLoginPostRequest);
        return ResponseEntity.ok().build();
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
