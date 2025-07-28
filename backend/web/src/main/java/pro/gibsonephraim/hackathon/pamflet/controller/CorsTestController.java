package pro.gibsonephraim.hackathon.pamflet.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cors-test")
@CrossOrigin(origins = "*", maxAge = 3600)
public class CorsTestController {

    @GetMapping
    public ResponseEntity<String> testCors() {
        return ResponseEntity.ok("CORS is working!");
    }
}
