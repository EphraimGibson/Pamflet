package pro.gibsonephraim.hackathon.pamflet.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import pro.gibsonephraim.hackathon.pamflet.converter.CardConverter;
import pro.gibsonephraim.hackathon.pamflet.model.CardModel;
import pro.gibsonephraim.hackathon.pamflet.repository.CardRepository;
import pro.gibsonephraim.hackathon.pamflet.security.AuthenticationService;
import pro.gibsonephraim.hackathon.persistence.model.Card;
import pro.gibsonephraim.hackathon.persistence.model.Customer;
import pro.gibsonephraim.hackathon.persistence.model.Deck;

import java.util.List;
import java.util.Objects;

@Service
public class CardService {

    private final CardConverter cardConverter;
    private final CardRepository cardRepository;
    private final DeckService deckService;
    private final AuthenticationService authenticationService;

    public CardService(CardConverter cardConverter, CardRepository cardRepository, DeckService deckService, AuthenticationService authenticationService) {
        this.cardConverter = cardConverter;
        this.cardRepository = cardRepository;
        this.deckService = deckService;
        this.authenticationService = authenticationService;
    }

    @Transactional
    public List<CardModel> getCardsByDeck(Long deckId) {

        Customer customer = authenticationService.getCustomer();

        Deck deck = deckService.getDeckById(deckId);

        if(!Objects.equals(deck.getUser().getId(), customer.getId())){
            throw new AccessDeniedException("User"  +customer.getName()+ "is not allowed to view this deck");
        }

        return cardConverter.convert(deck.getCards());
    }

    public CardModel getCardByDeckAndNumber(Long deckId, Integer cardNumber) {
        // TODO: Implement logic to fetch a specific card by deck and card number
        return null;
    }

    public CardModel getCardById(Long id) {
        Card card = cardRepository.findById(id)
                .orElseThrow(()-> new EntityNotFoundException(" Card with" +id+ "not found"));

        Deck deck = deckService.getDeckById(card.getDeck().getId());

        return cardConverter.convert(card);
    }

    public CardModel addCardToDeck(Long deckId, CardModel cardModel) {
        Card card = cardConverter.convert(cardModel);
        card.setDeck(deckService.getDeckById(deckId));
        cardRepository.save(card);
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

