export type Rule = {
  title: string;
  description: string;
  players: {
    min: number;
    max: number;
  };
  roles: string[];
  turn?: {
    skipRoles: string[];
    turnTimeLimit?: {
      time: number;
      type: "persistent" | "reset";
    };
  };
  decks: {
    name: string;
    deck: {
      name: string;
      categoryName?: string;
      description: string | { h: string; p: string }[];
    }[];
    playableRoles: string[];
  }[];
  defaultHand: (
    | {
        type: "random";
        roleFor: string;
        number: number;
        deckFrom: string;
      }
    | {
        type: "fixed";
        roleFor: string;
        number: number;
        cards: string[];
      }
  )[];
  fields: {
    name: string;
    description: string;
    roleFor: "main" | (string & {});
    fieldSize: { width: number; height: number };
    field: {
      name: string;
      description: string;
      color: string;
      position: { x: number; y: number; width: number; height: number };
      operableRoles: string[];
      visibleRoles: string[];
    }[];
  }[];
  dice: {
    name: string;
    range: {
      min: number;
      max: number;
      step: number;
    };
  }[];
  rankingBy: "hands" | "points" | "manual" | "none";
};
