package pro.gibsonephraim.hackathon.pamflet.converter;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import pro.gibsonephraim.hackathon.pamflet.model.UserModel;
import pro.gibsonephraim.hackathon.persistence.model.Customer;

@Component
public class CustomerConverter {
    private final ModelMapper modelMapper = new ModelMapper();

    public UserModel convert(Customer entity) {
        return modelMapper.map(entity, UserModel.class);
    }

    public Customer convert(UserModel model) {
        return modelMapper.map(model, Customer.class);
    }
}
