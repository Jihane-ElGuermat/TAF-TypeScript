import { SpellRepository } from "./repository";
import type { SpellCastEvent } from "./types";
import { WizardRepository } from "./repository";
import { Cache } from "./decorators";
import { isHouse, isWizard } from "./types";

const wizardRepository = new WizardRepository();

const harry = wizardRepository.addWizard({
  name: "Harry Potter",
  house: "Gryffindor",
  level: 5,
  active: true,
});

const hermione = wizardRepository.addWizard({
  name: "Hermione Granger",
  house: "Gryffindor",
  level: 6,
  active: true,
});

wizardRepository.addWizard({
  name: "Luna Lovegood",
  house: "Ravenclaw",
  level: 4,
  active: true,
});

console.log("Tous les sorciers :", wizardRepository.getAll());

console.log(
  "Recherche par ID :",
  wizardRepository.findById(harry.id)
);

console.log(
  "Sorciers de Gryffondor :",
  wizardRepository.findByHouse("Gryffindor")
);


const spells = new SpellRepository();

spells.add({
  id: 102,
  name: "Protego",
  category: "defense",
  power: 50,
});

console.log("Sorts enregistrés :", spells.getAll());

try {
  spells.add({
    id: 103,
    name: "Invalid Spell",
    category: "attack",
    power: -10,
  });
} catch (error) {
  console.log((error as Error).message);
}

function handleSpellCast(event: SpellCastEvent): void {
  console.log(
    `Le sorcier ${event.wizardId} a lancé le sort ${event.spellName}.`
  );
}

const event: SpellCastEvent = {
  type: "spell-cast",
  wizardId: 1,
  spellName: "Expelliarmus",
};

handleSpellCast(event);


class Calculator {
  @Cache
  add(a: number, b: number): number {
    console.log("Calcul effectué...");
    return a + b;
  }
}

const calculator = new Calculator();

console.log("Premier appel :", calculator.add(2, 3));
console.log("Deuxième appel :", calculator.add(2, 3));
console.log("Troisième appel :", calculator.add(4, 6));

console.log("Gryffindor est une maison :", isHouse("Gryffindor"));
console.log("Durmstrang est une maison :", isHouse("Durmstrang"));

const candidate: unknown = {
  id: 10,
  name: "Neville Longbottom",
  house: "Gryffindor",
  level: 3,
  active: true,
};

console.log("Objet valide :", isWizard(candidate));