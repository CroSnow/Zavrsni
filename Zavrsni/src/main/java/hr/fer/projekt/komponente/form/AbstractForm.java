package hr.fer.projekt.komponente.form;

import java.util.HashMap;
import java.util.Map;

public abstract class AbstractForm {

    private Map<String, String> greske = new HashMap<>();

    protected void dodajGresku(String greska, String opis) {
        greske.put(greska, opis);
    }

    public boolean imaGresku(String greska) {
        return greske.containsKey(greska);
    }

    public boolean imaGresaka() {
        return !greske.isEmpty();
    }

    public String getGreska(String greska) {
        return greske.get(greska);
    }

}
