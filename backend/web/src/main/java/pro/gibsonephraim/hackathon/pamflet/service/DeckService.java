package pro.gibsonephraim.hackathon.pamflet.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import pro.gibsonephraim.hackathon.pamflet.converter.DeckConverter;
import pro.gibsonephraim.hackathon.pamflet.model.DeckModel;
import pro.gibsonephraim.hackathon.pamflet.repository.DeckRepository;
import pro.gibsonephraim.hackathon.pamflet.security.AuthenticationService;
import pro.gibsonephraim.hackathon.persistence.model.Customer;
import pro.gibsonephraim.hackathon.persistence.model.Deck;

import java.util.List;
import java.util.Objects;

@Service
public class DeckService {
    private final DeckRepository deckRepository;
    private final DeckConverter deckConverter;
    private final AuthenticationService authenticationService;

    @Autowired
    public DeckService(DeckRepository deckRepository, DeckConverter deckConverter, AuthenticationService authenticationService) {
        this.deckRepository = deckRepository;
        this.deckConverter = deckConverter;
        this.authenticationService = authenticationService;
    }

    public List<DeckModel> getAllDecks() {
        List<Deck> allByUser = deckRepository.findAllByUser(authenticationService.getCustomer());

        return deckConverter.convert(allByUser);
    }

    public DeckModel getDeckModelById(Long id) {
        Customer customer = authenticationService.getCustomer();

        Deck deck = deckRepository.findById(id)
                .orElseThrow(()-> new EntityNotFoundException("Deck with" + id + "not found"));

        if(!Objects.equals(customer.getId(), deck.getUser().getId())){
            throw new AccessDeniedException("User "+ customer.getName() + "is not authorized to view this deck");
        }

        return deckConverter.convert(deck);
    }

    @Transactional
    public DeckModel createDeck(DeckModel deckModel) {
        Deck deck = deckConverter.convert(deckModel);
        deck.setUser(authenticationService.getCustomer());
        Deck savedDeck = deckRepository.save(deck);
        return deckConverter.convert(savedDeck);
    }

    @Transactional
    public DeckModel updateDeck(Long id, DeckModel deckModel) {
        Customer customer = authenticationService.getCustomer();
        Deck deck = deckRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Deck with id " + id + " not found"));
        if (!Objects.equals(customer.getId(), deck.getUser().getId())) {
            throw new AccessDeniedException("User " + customer.getName() + " is not authorized to update this deck");
        }
        deck.setName(deckModel.getName());
        Deck updatedDeck = deckRepository.save(deck);
        return deckConverter.convert(updatedDeck);
    }

    @Transactional
    public DeckModel patchDeck(Long id, DeckModel deckModel) {
        Customer customer = authenticationService.getCustomer();
        Deck deck = deckRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Deck with id " + id + " not found"));
        if (!Objects.equals(customer.getId(), deck.getUser().getId())) {
            throw new AccessDeniedException("User " + customer.getName() + " is not authorized to patch this deck");
        }
        if (deckModel.getName() != null) {
            deck.setName(deckModel.getName());
        }
        Deck patchedDeck = deckRepository.save(deck);
        return deckConverter.convert(patchedDeck);
    }

    public Deck getDeckById(Long id) {
        Customer customer = authenticationService.getCustomer();

        Deck deck = deckRepository.findById(id)
                .orElseThrow(()-> new EntityNotFoundException("Deck with" + id + "not found"));

        if(!Objects.equals(customer.getId(), deck.getUser().getId())){
            throw new AccessDeniedException("User "+ customer.getName() + "is not authorized to add to this deck");
        }

        return deck;
    }
}
