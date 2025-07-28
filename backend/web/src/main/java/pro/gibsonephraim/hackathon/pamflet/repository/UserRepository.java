package pro.gibsonephraim.hackathon.pamflet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pro.gibsonephraim.hackathon.persistence.model.Customer;

import javax.validation.constraints.NotNull;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Customer, Long> {
    boolean existsByEmail(@NotNull String email);

    Optional<Customer> findUserByEmail(String email);

    Optional<Customer> findCustomerByUsername(String username);
}

