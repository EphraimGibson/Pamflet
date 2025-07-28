package pro.gibsonephraim.hackathon.pamflet.service;

import org.springframework.stereotype.Service;
import pro.gibsonephraim.hackathon.pamflet.model.CardModel;
import java.util.List;

@Service
public class CardService {
    public List<CardModel> getCardsByDeck(Long deckId) {
        // TODO: Implement logic to fetch all cards in a deck
        return List.of();
    }

    public CardModel getCardByDeckAndNumber(Long deckId, Integer cardNumber) {
        // TODO: Implement logic to fetch a specific card by deck and card number
        return null;
    }

    public CardModel getCardById(Long id) {
        // TODO: Implement logic to fetch a card by its ID
        return null;
    }

    public CardModel addCardToDeck(Long deckId, CardModel cardModel) {
        // TODO: Implement logic to add a card to a deck
        return null;
    }

    public CardModel updateCard(Long id, CardModel cardModel) {
        // TODO: Implement logic to update a card
        return null;
    }

    public CardModel patchCard(Long id, CardModel cardModel) {
        // TODO: Implement logic to patch a card
        return null;
    }

    public void deleteCard(Long id) {
        // TODO: Implement logic to delete a card
    }
}

