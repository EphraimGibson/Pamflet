package pro.gibsonephraim.hackathon.pamflet.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pro.gibsonephraim.hackathon.pamflet.api.UserApi;
import pro.gibsonephraim.hackathon.pamflet.model.ApiLoginPostRequest;
import pro.gibsonephraim.hackathon.pamflet.model.TokenResponse;
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
    public ResponseEntity<TokenResponse> apiLoginPost(ApiLoginPostRequest apiLoginPostRequest) {
        String token = userService.login(apiLoginPostRequest);
        return ResponseEntity.ok(new TokenResponse(token));
    }

    // Additional controller methods (not in UserApi interface)

    @PostMapping("/api/register")
    public ResponseEntity<UserModel> apiRegisterPost(@RequestBody UserModel userModel) {
        return ResponseEntity.ok(userService.register(userModel));
    }

    @GetMapping("/api/user")
    public ResponseEntity<List<UserModel>> apiUserGet() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/api/user/{id}")
    public ResponseEntity<UserModel> apiUserIdGet(@PathVariable("id") Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PatchMapping("/api/user/{id}")
    public ResponseEntity<UserModel> apiUserIdPatch(@PathVariable("id") Long id, @RequestBody UserModel userModel) {
        return ResponseEntity.ok(userService.patchUser(id, userModel));
    }

    @PutMapping("/api/user/{id}")
    public ResponseEntity<UserModel> apiUserIdPut(@PathVariable("id") Long id, @RequestBody UserModel userModel) {
        return ResponseEntity.ok(userService.updateUser(id, userModel));
    }
}
