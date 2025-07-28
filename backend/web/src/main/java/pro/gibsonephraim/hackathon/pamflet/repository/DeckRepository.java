package pro.gibsonephraim.hackathon.pamflet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pro.gibsonephraim.hackathon.persistence.model.Customer;
import pro.gibsonephraim.hackathon.persistence.model.Deck;

import java.util.List;

public interface DeckRepository extends JpaRepository<Deck, Long> {

    List<Deck> findAllByUser(Customer customer);
}


