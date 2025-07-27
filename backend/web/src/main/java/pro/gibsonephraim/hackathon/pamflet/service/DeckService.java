package pro.gibsonephraim.hackathon.pamflet.service;

import org.springframework.stereotype.Service;
import pro.gibsonephraim.hackathon.pamflet.model.DeckModel;
import java.util.List;

@Service
public class DeckService {
    public List<DeckModel> getAllDecks() {
        // TODO: Implement logic to fetch all decks for authenticated user
        return List.of();
    }
    public DeckModel getDeckById(Long id) {
        // TODO: Implement logic to fetch deck by id
        return null;
    }
    public DeckModel createDeck(DeckModel deckModel) {
        // TODO: Implement logic to create a new deck
        return null;
    }
    public DeckModel updateDeck(Long id, DeckModel deckModel) {
        // TODO: Implement logic to update deck
        return null;
    }
    public DeckModel patchDeck(Long id, DeckModel deckModel) {
        // TODO: Implement logic to patch deck
        return null;
    }
}

