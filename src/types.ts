
export type House =
  | "Gryffindor"
  | "Slytherin"
  | "Ravenclaw"
  | "Hufflepuff";

export interface Wizard {
  id: number;
  name: string;
  house: House;
  level: number;
  active: boolean;
}

export type NewWizard = Omit<Wizard, "id">;

export interface Spell {
  id: number;
  name: string;
  category: "attack" | "defense" | "utility";
  power: number;
}

export type AcademyEvent =
  | {
      type: "spell-cast";
      wizardId: number;
      spellName: string;
    }
  | {
      type: "level-up";
      wizardId: number;
      newLevel: number;
    }
  | {
      type: "wizard-expelled";
      wizardId: number;
    };

export type SpellCastEvent = Extract<
  AcademyEvent,
  { type: "spell-cast" }
>;

export function isHouse(value: unknown): value is House {
  return (
    value === "Gryffindor" ||
    value === "Slytherin" ||
    value === "Ravenclaw" ||
    value === "Hufflepuff"
  );
}

export function isWizard(value: unknown): value is Wizard {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  if (!("id" in value) || typeof value.id !== "number") {
    return false;
  }

  if (!("name" in value) || typeof value.name !== "string") {
    return false;
  }

  if (!("house" in value) || !isHouse(value.house)) {
    return false;
  }

  if (!("level" in value) || typeof value.level !== "number") {
    return false;
  }

  if (!("active" in value) || typeof value.active !== "boolean") {
    return false;
  }

  return true;
}