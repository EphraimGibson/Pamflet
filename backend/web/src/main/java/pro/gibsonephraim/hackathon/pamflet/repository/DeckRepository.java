package pro.gibsonephraim.hackathon.pamflet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pro.gibsonephraim.hackathon.persistence.model.Deck;

public interface DeckRepository extends JpaRepository<Deck, Long> {
    // Add custom query methods if needed
}

