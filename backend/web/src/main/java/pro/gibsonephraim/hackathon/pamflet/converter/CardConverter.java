package pro.gibsonephraim.hackathon.pamflet.converter;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import pro.gibsonephraim.hackathon.persistence.model.Card;
import pro.gibsonephraim.hackathon.pamflet.model.CardModel;

@Component
public class CardConverter {
    private final ModelMapper modelMapper = new ModelMapper();

    public CardModel convert(Card entity) {
        return modelMapper.map(entity, CardModel.class);
    }

    public Card convert(CardModel model) {
        return modelMapper.map(model, Card.class);
    }
}

