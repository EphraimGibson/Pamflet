package pro.gibsonephraim.hackathon.pamflet.controller;

import org.springframework.http.ResponseEntity;
import pro.gibsonephraim.hackathon.pamflet.api.DeckApi;
import pro.gibsonephraim.hackathon.pamflet.model.DeckModel;
import pro.gibsonephraim.hackathon.pamflet.service.DeckService;

import java.util.List;

public class DeckController implements DeckApi {
    private final DeckService deckService = new DeckService();
    @Override
    public ResponseEntity<List<DeckModel>> apiDeckGet() {
        return ResponseEntity.ok(deckService.getAllDecks());
    }

    @Override
    public ResponseEntity<DeckModel> apiDeckIdGet(Long id) {
        return ResponseEntity.ok(deckService.getDeckById(id));
    }

    @Override
    public ResponseEntity<DeckModel> apiDeckIdPatch(Long id, DeckModel deckModel) {
        return ResponseEntity.ok(deckService.patchDeck(id, deckModel));
    }

    @Override
    public ResponseEntity<DeckModel> apiDeckIdPut(Long id, DeckModel deckModel) {
        return ResponseEntity.ok(deckService.updateDeck(id, deckModel));
    }

    @Override
    public ResponseEntity<DeckModel> apiDeckPost(DeckModel deckModel) {
        return ResponseEntity.ok(deckService.createDeck(deckModel));
    }
}
