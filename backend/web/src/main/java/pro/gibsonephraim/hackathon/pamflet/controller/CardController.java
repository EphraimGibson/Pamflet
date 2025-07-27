package pro.gibsonephraim.hackathon.pamflet.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pro.gibsonephraim.hackathon.pamflet.service.CardService;
import pro.gibsonephraim.hackathon.pamflet.model.CardModel;
import pro.gibsonephraim.hackathon.pamflet.api.CardApi;

import java.util.List;

@RestController
public class CardController implements CardApi {
    private final CardService cardService;

    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @Override
    public ResponseEntity<CardModel> apiCardDeckIdCardNumberGet(Long deckId, Integer cardNumber) {
        CardModel card = cardService.getCardByDeckAndNumber(deckId, cardNumber);
        return ResponseEntity.ok(card);
    }

    @Override
    public ResponseEntity<List<CardModel>> apiCardDeckIdGet(Long deckId) {
        List<CardModel> cards = cardService.getCardsByDeck(deckId);
        return ResponseEntity.ok(cards);
    }

    @Override
    public ResponseEntity<CardModel> apiCardDeckIdPost(Long deckId, CardModel cardModel) {
        CardModel created = cardService.addCardToDeck(deckId, cardModel);
        return ResponseEntity.ok(created);
    }

    @Override
    public ResponseEntity<Void> apiCardIdDelete(Long id) {
        cardService.deleteCard(id);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<CardModel> apiCardIdGet(Long id) {
        CardModel card = cardService.getCardById(id);
        return ResponseEntity.ok(card);
    }

    @Override
    public ResponseEntity<CardModel> apiCardIdPut(Long id, CardModel cardModel) {
        CardModel updated = cardService.updateCard(id, cardModel);
        return ResponseEntity.ok(updated);
    }

    @Override
    public ResponseEntity<CardModel> apiCardIdPatch(Long id, CardModel cardModel) {
        CardModel patched = cardService.patchCard(id, cardModel);
        return ResponseEntity.ok(patched);
    }
}
