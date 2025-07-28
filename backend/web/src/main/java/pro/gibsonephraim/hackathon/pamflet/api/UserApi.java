package pro.gibsonephraim.hackathon.pamflet.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import pro.gibsonephraim.hackathon.pamflet.model.ApiLoginPostRequest;
import pro.gibsonephraim.hackathon.pamflet.model.TokenResponse;

public interface UserApi {

    @PostMapping("/api/login")
    ResponseEntity<TokenResponse> apiLoginPost(@RequestBody ApiLoginPostRequest apiLoginPostRequest);
}
