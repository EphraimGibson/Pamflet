package pro.gibsonephraim.hackathon.pamflet.converter;

import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import pro.gibsonephraim.hackathon.pamflet.model.DeckModel;
import pro.gibsonephraim.hackathon.persistence.model.Deck;

@Component
public class DeckConverter {
    private final ModelMapper modelMapper = new ModelMapper();

    public DeckModel convert(Deck entity) {
        return modelMapper.map(entity, DeckModel.class);
    }

    public Deck convert(DeckModel model) {
        return modelMapper.map(model, Deck.class);
    }

    public List<DeckModel> convert(List<Deck> entities) {
        return entities.stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }
}
