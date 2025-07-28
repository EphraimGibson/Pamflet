
package pro.gibsonephraim.hackathon.pamflet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pro.gibsonephraim.hackathon.persistence.model.Card;

public interface CardRepository extends JpaRepository<Card, Long> {
    // Add custom query methods if needed
}

